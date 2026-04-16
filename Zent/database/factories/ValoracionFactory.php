<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class ValoracionFactory extends Factory
{
    public function definition(): array
    {
        return [
            'id_usuario' => $this->faker->numberBetween(1, 2),
            'id_producto' => $this->faker->numberBetween(2, 17), // según tus productos
            'estrellas' => $this->faker->numberBetween(1, 5),
            'comentario' => $this->faker->sentence(20),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}