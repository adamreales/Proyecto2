<?php

namespace App\Filament\Resources\ValoracionResource\Pages;

use App\Filament\Resources\ValoracionResource;
use Filament\Pages\Actions;
use Filament\Resources\Pages\EditRecord;

class EditValoracion extends EditRecord
{
    protected static string $resource = ValoracionResource::class;

    protected function getActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
