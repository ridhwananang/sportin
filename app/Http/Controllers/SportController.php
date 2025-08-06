<?php

namespace App\Http\Controllers;

use App\Models\Area;
use Inertia\Inertia;
use App\Models\Sport;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class SportController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $sports = Sport::with('areas')->latest()->get(); // default pakai created_at


        return Inertia::render('Sports/Index', [
            'sports' => $sports,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $areas = Area::all();

        return Inertia::render('Sports/Create', [
            'areas' => $areas,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|in:team,individual',
            'description' => 'nullable|string',
            'price' => 'required|integer|min:0',
            'image' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'active' => 'nullable|boolean',
            'area_ids' => 'nullable|array',
            'area_ids.*' => 'exists:areas,id',
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('sports', 'public');
        }

        $sport = Sport::create($validated);

        // Sinkronisasi area ke pivot table
        if (isset($validated['area_ids'])) {
            $sport->areas()->sync($validated['area_ids']);
        }

        return redirect()->route('sports.index')->with('success', 'Sport created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Sport $sport)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Sport $sport)
    {
        $sport->load('areas');
        $areas = Area::all();

        return Inertia::render('Sports/Edit', [
            'sport' => $sport,
            'areas' => $areas,
            'selectedAreas' => $sport->areas->pluck('id'),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Sport $sport)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|in:team,individual',
            'description' => 'nullable|string',
            'price' => 'required|integer|min:0',
            'image' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'active' => 'nullable|boolean',
            'area_ids' => 'nullable|array',
            'area_ids.*' => 'exists:areas,id',
        ]);

        // Tangani file image
        if ($request->hasFile('image')) {
            if ($sport->image) {
                Storage::disk('public')->delete($sport->image);
            }
            $validated['image'] = $request->file('image')->store('sports', 'public');
        } else {
            // Hapus field image dari $validated agar tidak ikut diupdate
            unset($validated['image']);
        }

        $sport->update($validated);

        if (isset($validated['area_ids'])) {
            $sport->areas()->sync($validated['area_ids']);
        }

        return redirect()->route('sports.index')->with('success', 'Sport updated successfully.');
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Sport $sport)
    {
        if ($sport->image) {
            Storage::disk('public')->delete($sport->image);
        }

        $sport->areas()->detach();
        $sport->delete();

        return redirect()->route('sports.index')->with('success', 'Sport deleted successfully.');
    }
}
