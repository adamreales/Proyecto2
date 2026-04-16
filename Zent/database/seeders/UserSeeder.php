<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'name' => 'Adrian',
            'email' => 'adrian@test.com',
            'password' => Hash::make('12345678'),
            'email_verified_at' => now()
        ]);
        User::create([
            'name' => 'Ainhoa',
            'email' => 'ainhoa@test.com',
            'password' => Hash::make('12345678'),
            'email_verified_at' => now()
        ]);
        User::create([
            'name' => 'AdrianReal',
            'email' => 'anguloadrian2003@gmail.com',
            'password' => Hash::make('1234'),
            'email_verified_at' => now()
        ]);
    }
}
