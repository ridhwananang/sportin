<?php

namespace App\Http\Controllers;

use App\Models\Area;
use Inertia\Inertia;
use App\Models\Sport;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class SportController extends Controller
{
    public function index()
    {
        $sports = Sport::with('areas')->latest()->get();

        return Inertia::render('Sports/Index', [
            'sports' => $sports,
            'auth' => [
                'user' => Auth::user(),
            ]
        ]);
    }

    public function create()
    {
        $areas = Area::all();
        return Inertia::render('Sports/Create', [
            'areas' => $areas,
        ]);
    }

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

        if (isset($validated['area_ids'])) {
            $sport->areas()->sync($validated['area_ids']);
        }

        return redirect()->route('sports.index')->with('success', 'Sport created successfully.');
    }

    public function show(Sport $sport)
    {
        $sport->load('areas');

        $recommendations = Sport::with('areas')
            ->where('id', '!=', $sport->id)
            ->inRandomOrder()
            ->limit(4)
            ->get();

        return Inertia::render('Sports/Show', [
            'sport' => $sport,
            'recommendations' => $recommendations,
            'auth' => [
                'user' => Auth::user(),
            ]
        ]);
    }

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

        if ($request->hasFile('image')) {
            if ($sport->image) {
                Storage::disk('public')->delete($sport->image);
            }
            $validated['image'] = $request->file('image')->store('sports', 'public');
        } else {
            unset($validated['image']);
        }

        $sport->update($validated);

        if (isset($validated['area_ids'])) {
            $sport->areas()->sync($validated['area_ids']);
        }

        return redirect()->route('sports.index')->with('success', 'Sport updated successfully.');
    }

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
