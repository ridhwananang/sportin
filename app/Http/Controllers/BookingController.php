<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Sport;
use App\Models\Booking;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BookingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Booking::with(['sport', 'area'])->latest();

        // Kalau role 'user' → hanya booking miliknya
        if (Auth::user()->role === 'user') {
            $query->where('user_id', Auth::id());
        }

        $bookings = $query->get();

        return Inertia::render('Bookings/Index', [
            'bookings' => $bookings,
            'userRole' => Auth::user()->role, // kirim role ke frontend
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Sport $sport)
    {
        $areas = $sport->areas()->get();

        return Inertia::render('Bookings/Create', [
            'sport' => $sport,
            'areas' => $areas,
            'user' => Auth::user(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */

    public function store(Request $request, Sport $sport)
    {
        $validated = $request->validate([
            'customer_name' => 'required|string|max:255',
            'area_id' => 'required|exists:areas,id',
            'start_at' => 'required|date|after_or_equal:now',
            'end_at' => 'required|date|after:start_at',
        ]);

        // Cek overlapping booking
        $overlap = Booking::where('area_id', $validated['area_id'])
            ->where(function ($query) use ($validated) {
                $query->whereBetween('start_at', [$validated['start_at'], $validated['end_at']])
                    ->orWhereBetween('end_at', [$validated['start_at'], $validated['end_at']])
                    ->orWhere(function ($q) use ($validated) {
                        $q->where('start_at', '<=', $validated['start_at'])
                            ->where('end_at', '>=', $validated['end_at']);
                    });
            })
            ->exists();

        if ($overlap) {
            return back()->withErrors(['start_at' => 'Waktu booking bertabrakan dengan jadwal lain.'])->withInput();
        }

        // Generate kode booking unik (contoh: ABC12345)
        do {
            $kode = strtoupper(Str::random(3)) . random_int(10000, 99999);
        } while (Booking::where('kode_booking', $kode)->exists());

        Booking::create([
            'customer_name' => $validated['customer_name'],
            'kode_booking' => $kode,
            'status' => 'pending',
            'payment_status' => 'unpaid',
            'start_at' => $validated['start_at'],
            'end_at' => $validated['end_at'],
            'created_by' => Auth::id(),   // ✅
            'user_id' => Auth::id(),      // ✅

            'sport_id' => $sport->id,
            'area_id' => $validated['area_id'],
        ]);

        return redirect()->route('dashboard')->with('success', 'Booking berhasil dibuat!');
    }


    /**
     * Display the specified resource.
     */
    public function show(Booking $booking)
    {
        $booking->load(['sport', 'area', 'createdBy']);

        return Inertia::render('Booking/Show', [
            'booking' => $booking,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Booking $booking)
    {
        $sports = Sport::with('areas')->get();

        return Inertia::render('Booking/Edit', [
            'booking' => $booking->load(['sport', 'area']),
            'sports' => $sports,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Booking $booking)
    {
        $validated = $request->validate([
            'customer_name' => 'required|string|max:255',
            'area_id' => 'required|exists:areas,id',
            'start_at' => 'required|date|after_or_equal:now',
            'end_at' => 'required|date|after:start_at',
        ]);

        $booking->update($validated);

        return redirect()->route('bookings.index')->with('success', 'Booking berhasil diperbarui!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Booking $booking)
    {
        $booking->delete();
        return back()->with('success', 'Booking berhasil dihapus.');
    }
}
