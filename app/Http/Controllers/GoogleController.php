<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Str;

class GoogleController extends Controller
{
    public function redirectToGoogle()
    {
        return Socialite::driver('google')->redirect();
    }

    public function handleGoogleCallback()
    {
        try {
            $googleUser = Socialite::driver('google')->user();
        } catch (\Exception $e) {
            return redirect('/login')->with('error', 'Login Google gagal: ' . $e->getMessage());
        }

        // Cari user berdasarkan google_id atau email
        $user = User::where('google_id', $googleUser->getId())
            ->orWhere('email', $googleUser->getEmail())
            ->first();

        if (!$user) {
            // Kalau belum ada, buat user baru
            $user = User::create([
                'name' => $googleUser->getName(),
                'email' => $googleUser->getEmail(),
                'username' => strtolower(str_replace(' ', '', $googleUser->getName())), // contoh generate username
                'google_id' => $googleUser->getId(),
                'avatar' => $googleUser->getAvatar(),
                'email_verified_at' => now(),
                'password' => bcrypt(Str::random(16)),
                'role' => 'user',
            ]);
        } else {
            // Kalau user sudah ada tapi google_id belum terisi, update
            if (!$user->google_id) {
                $user->google_id = $googleUser->getId();
            }
            $user->avatar = $googleUser->getAvatar();
            $user->email_verified_at = now();
            $user->save();
        }

        Auth::login($user);

        return redirect('/dashboard');
    }
}
