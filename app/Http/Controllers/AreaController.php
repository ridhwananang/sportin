<?php

namespace App\Http\Controllers;

use App\Models\Area;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;

class AreaController extends Controller
{

    public function index(): Response
    {
        $areas = Area::latest()->get();

        return Inertia::render('Areas/Index', [
            'areas' => $areas,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Areas/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'location' => 'required|string|max:255',
            'address' => 'required|string',
        ]);

        Area::create($validated);

        return redirect()->route('areas.index')->with('success', 'Area created successfully.');
    }

    public function show(string $id)
    {
        //
    }

    public function edit(Area $area): Response
    {
        return Inertia::render('Areas/Edit', [
            'area' => $area,
        ]);
    }

    public function update(Request $request, Area $area)
    {
        $validated = $request->validate([
            'location' => 'required|string|max:255',
            'address' => 'required|string',
        ]);

        $area->update($validated);

        return redirect()->route('areas.index')->with('success', 'Area updated successfully.');
    }

    public function destroy(Area $area)
    {
        $area->delete();

        return redirect()->route('areas.index')->with('success', 'Area deleted successfully.');
    }
}
