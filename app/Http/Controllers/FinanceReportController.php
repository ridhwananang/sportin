<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Payment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class FinanceReportController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $totalKeseluruhan = Payment::sum('total_amount');

        $perHari = Payment::select(
            DB::raw('DATE(created_at) as tanggal'),
            DB::raw('SUM(total_amount) as total')
        )
            ->groupBy(DB::raw('DATE(created_at)'))
            ->orderBy('tanggal', 'desc')
            ->get();

        // Per Bulan
        $perBulan = Payment::select(
            DB::raw('YEAR(created_at) as tahun'),
            DB::raw('MONTH(created_at) as bulan'),
            DB::raw('SUM(total_amount) as total')
        )
            ->groupBy('tahun', 'bulan')
            ->orderBy('tahun', 'desc')
            ->orderBy('bulan', 'desc')
            ->get();

        // Per Sport
        $perSport = Payment::join('bookings', 'payments.booking_id', '=', 'bookings.id')
            ->join('sports', 'bookings.sport_id', '=', 'sports.id')
            ->select(
                'sports.name as sport_name',
                DB::raw('SUM(payments.total_amount) as total')
            )
            ->groupBy('sports.name')
            ->orderBy('total', 'desc')
            ->get();

        // Per Area
        $perArea = Payment::join('bookings', 'payments.booking_id', '=', 'bookings.id')
            ->join('areas', 'bookings.area_id', '=', 'areas.id')
            ->select(
                'areas.location as area_name',
                DB::raw('SUM(payments.total_amount) as total')
            )
            ->groupBy('areas.location')
            ->orderBy('total', 'desc')
            ->get();
        // Rekap Olahraga
        $rekapOlahraga = DB::table('bookings')
            ->join('sports', 'bookings.sport_id', '=', 'sports.id')
            ->join('areas', 'bookings.area_id', '=', 'areas.id')
            ->select(
                'sports.name as sport_name',
                'areas.location as area_name',
                DB::raw('COUNT(bookings.id) as total')
            )
            ->groupBy('sports.name', 'areas.location')
            ->orderBy('sport_name')
            ->get();
        return Inertia::render('Finance/Index', [
            'perHari' => $perHari,
            'perBulan' => $perBulan,
            'perSport' => $perSport,
            'perArea' => $perArea,
            'rekapOlahraga' => $rekapOlahraga,
            'totalKeseluruhan' => $totalKeseluruhan,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
