<?php

namespace App\Filament\Resources\ImagenProductoResource\Pages;

use App\Filament\Resources\ImagenProductoResource;
use Filament\Pages\Actions;
use Filament\Resources\Pages\EditRecord;

class EditImagenProducto extends EditRecord
{
    protected static string $resource = ImagenProductoResource::class;

    protected function getActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
