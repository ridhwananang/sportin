<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'username' => 'testuser',
            'password' => bcrypt('Veena123'),
            'role' => 'super_admin',
            'contact' => '1234567890',
            'address' => '123 Test Street',
            'email' => 'test@example.com',
        ]);
    }
}
