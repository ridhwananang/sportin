<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Booking;
use App\Models\Payment;
use App\Models\Discount;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Booking $booking)
    {
        $discounts = Discount::all();
        $ppnRate = 0.11; // 11% PPN
        $price = $booking->sport->price;
        $ppn = $price * $ppnRate;
        $total = $price + $ppn;

        return Inertia::render('Payments/Create', [
            'booking' => $booking->load('sport'),
            'discounts' => $discounts,
            'ppn' => $ppn,
            'total' => $total,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Booking $booking)
    {
        $data = $request->validate([
            'discount_id' => 'nullable|exists:discounts,id',
            'ppn' => 'required|numeric',
            'total_amount' => 'required|integer',
        ]);

        Payment::create([
            'booking_id' => $booking->id,
            'discount_id' => $data['discount_id'],
            'ppn' => $data['ppn'],
            'total_amount' => $data['total_amount'],
        ]);

        // Update status booking jadi paid dan confirmed
        $booking->update([
            'payment_status' => 'paid',
            'status' => 'confirmed'
        ]);

        return to_route('bookings.index')->with('success', 'Pembayaran berhasil! Booking telah dikonfirmasi.');
    }



    /**
     * Display the specified resource.
     */
    public function show(Payment $payment)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Payment $payment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Payment $payment)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Payment $payment)
    {
        //
    }
}
