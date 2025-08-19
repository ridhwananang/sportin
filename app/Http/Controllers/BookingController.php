<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
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

        if (Auth::user()->role === 'user') {
            $query->where('user_id', Auth::id());
        }

        $bookings = $query->get();

        return Inertia::render('Bookings/Index', [
            'bookings' => $bookings,
            'userRole' => Auth::user()->role,
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
            'area_id'       => 'required|exists:areas,id',
            'date'          => 'required|date|after_or_equal:today',
            'time_slot'     => 'required|string',
        ]);

        // Pecah time_slot jadi start & end
        [$start, $end] = explode('-', $validated['time_slot']);
        $start = trim($start);
        $end = trim($end);

        try {
            $startAt = Carbon::parse($validated['date'] . ' ' . $start)->format('Y-m-d H:i:s');

            if ($end === '24' || $end === '24:00') {
                $endAt = Carbon::parse($validated['date'] . ' +1 day 00:00')->format('Y-m-d H:i:s');
            } else {
                $endAt = Carbon::parse($validated['date'] . ' ' . $end)->format('Y-m-d H:i:s');
            }
        } catch (\Exception $e) {
            return back()->withErrors(['time_slot' => 'Format waktu tidak valid'])->withInput();
        }

        // Cek overlap booking
        $overlap = Booking::where('area_id', $validated['area_id'])
            ->where(function ($query) use ($startAt, $endAt) {
                $query->whereBetween('start_at', [$startAt, $endAt])
                    ->orWhereBetween('end_at', [$startAt, $endAt])
                    ->orWhere(function ($q) use ($startAt, $endAt) {
                        $q->where('start_at', '<=', $startAt)
                            ->where('end_at', '>=', $endAt);
                    });
            })
            ->exists();

        if ($overlap) {
            return back()
                ->withErrors(['start_at' => 'Waktu booking bertabrakan dengan jadwal lain.'])
                ->withInput();
        }

        // Generate kode unik booking
        do {
            $kode = strtoupper(Str::random(3)) . random_int(10000, 99999);
        } while (Booking::where('kode_booking', $kode)->exists());

        // Simpan booking
        Booking::create([
            'customer_name'  => $validated['customer_name'],
            'kode_booking'   => $kode,
            'status'         => 'pending',
            'payment_status' => 'unpaid',
            'start_at'       => $startAt,
            'end_at'         => $endAt,
            'created_by'     => Auth::id(),
            'user_id'        => Auth::id(),
            'sport_id'       => $sport->id,
            'area_id'        => $validated['area_id'],
        ]);

        return redirect()
            ->route('bookings.index')
            ->with('success', 'Booking berhasil dibuat!');
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
            'area_id'       => 'required|exists:areas,id',
            'date'          => 'required|date|after_or_equal:today',
            'time_slot'     => 'required|string',
        ]);

        // Pecah time_slot jadi start & end
        [$start, $end] = explode('-', $validated['time_slot']);

        $startAt = $validated['date'] . ' ' . str_pad(trim($start), 2, '0', STR_PAD_LEFT) . ':00:00';

        if ((int) trim($end) === 24) {
            // kalau 24 berarti jam 00:00 besoknya
            $endAt = date('Y-m-d H:i:s', strtotime($validated['date'] . ' +1 day 00:00:00'));
        } else {
            $endAt = $validated['date'] . ' ' . str_pad(trim($end), 2, '0', STR_PAD_LEFT) . ':00:00';
        }

        // Cek overlap booking (kecuali booking dirinya sendiri)
        $overlap = Booking::where('area_id', $validated['area_id'])
            ->where('id', '!=', $booking->id) // exclude current booking
            ->where(function ($query) use ($startAt, $endAt) {
                $query->whereBetween('start_at', [$startAt, $endAt])
                    ->orWhereBetween('end_at', [$startAt, $endAt])
                    ->orWhere(function ($q) use ($startAt, $endAt) {
                        $q->where('start_at', '<=', $startAt)
                            ->where('end_at', '>=', $endAt);
                    });
            })
            ->exists();

        if ($overlap) {
            return back()->withErrors(['start_at' => 'Waktu booking bertabrakan dengan jadwal lain.'])->withInput();
        }

        $booking->update([
            'customer_name' => $validated['customer_name'],
            'area_id'       => $validated['area_id'],
            'start_at'      => $startAt,
            'end_at'        => $endAt,
        ]);

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
