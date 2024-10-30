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

        for ($i = 0; $i < 100000; $i++) {
            try {
                User::factory()->create();
                echo "1000 users generated \n";
            } catch (\Exception $exception) {

            }
        }
    }
}
