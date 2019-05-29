<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([

            'name' => 'Daniel',
            'surname' => 'de la Rosa Romero',
            'email' => 'daniel-dela@hotmail.com',
            'nick' => 'daniluco',
            'password' => '15e2b0d3c33891ebb0f1ef609ec419420c20e320ce94c65fbc8c3312448eb225', //123456789
            'rol' => 'Admin'

        ]);
    }
}
