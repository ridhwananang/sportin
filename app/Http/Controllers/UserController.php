<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Area;
use App\Models\Employee;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    public function index(): Response
    {
        $users = User::with('employee.area')->latest()->get();
        return Inertia::render('Users/Index', [
            'users' => $users
        ]);
    }

    public function create(): Response
    {
        $areas = Area::all();
        return Inertia::render('Users/Create', [
            'areas' => $areas
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'username' => 'required|string|max:255|unique:users',
            'email' => 'required|email|max:255|unique:users',
            'password' => 'required|string|confirmed|min:8',
            'role' => 'required|in:user,admin,employee,super_admin',
            'contact' => 'nullable|string|max:255',
            'address' => 'nullable|string|max:255',
            'area_id' => 'nullable|exists:areas,id',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'username' => $validated['username'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => $validated['role'],
            'contact' => $validated['contact'] ?? null,
            'address' => $validated['address'] ?? null,
        ]);

        if (in_array($validated['role'], ['admin', 'employee'])) {
            Employee::create([
                'user_id' => $user->id,
                'area_id' => $validated['area_id'],
                'role' => $validated['role'],
            ]);
        }

        return redirect()->route('users.index')->with('success', 'User created.');
    }

    public function edit(User $user): Response
    {
        $user->load('employee');
        $areas = Area::all();

        return Inertia::render('Users/Edit', [
            'user' => $user,
            'areas' => $areas,
        ]);
    }

    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'username' => 'required|string|max:255|unique:users,username,' . $user->id,
            'email' => 'required|email|max:255|unique:users,email,' . $user->id,
            'role' => 'required|in:user,admin,employee,super_admin',
            'contact' => 'nullable|string|max:255',
            'address' => 'nullable|string|max:255',
            'area_id' => 'nullable|exists:areas,id',
        ]);

        $user->update([
            'name' => $validated['name'],
            'username' => $validated['username'],
            'email' => $validated['email'],
            'role' => $validated['role'],
            'contact' => $validated['contact'] ?? null,
            'address' => $validated['address'] ?? null,
        ]);

        if (in_array($validated['role'], ['admin', 'employee'])) {
            $user->employee()->updateOrCreate([], [
                'area_id' => $validated['area_id'],
                'role' => $validated['role'],
            ]);
        } else {
            $user->employee()->delete();
        }

        return redirect()->route('users.index')->with('success', 'User updated.');
    }

    public function destroy(User $user)
    {
        $user->employee()->delete();
        $user->delete();
        return redirect()->route('users.index')->with('success', 'User deleted.');
    }
}
