<?php

namespace App\Filament\Resources\ImagenProductoResource\Pages;

use App\Filament\Resources\ImagenProductoResource;
use Filament\Pages\Actions;
use Filament\Resources\Pages\ListRecords;

class ListImagenProductos extends ListRecords
{
    protected static string $resource = ImagenProductoResource::class;

    protected function getActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
