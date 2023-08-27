<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        {
            $superadmin = User::create([
                'name'      => 'Super Admin',
                'role'      => 'superadmin',
                'email'     => 'superadmin@example.com',
                'password'  => Hash::make('tatonas123'),
            ]);

            $admin = User::create([
                'name'      => 'Admin User',
                'role'      => 'admin',
                'email'     => 'admin@example.com',
                'password'  => Hash::make('tatonas123'),
            ]);

            $user = User::create([
                'name'      => 'Regular User',
                'role'      => 'user',
                'email'     => 'user@example.com',
                'password'  => Hash::make('tatonas123'),
            ]);
        }
    }
}