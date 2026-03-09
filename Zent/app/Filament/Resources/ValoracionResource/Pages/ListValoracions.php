<?php

namespace App\Filament\Resources\ValoracionResource\Pages;

use App\Filament\Resources\ValoracionResource;
use Filament\Pages\Actions;
use Filament\Resources\Pages\ListRecords;

class ListValoracions extends ListRecords
{
    protected static string $resource = ValoracionResource::class;

    protected function getActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
