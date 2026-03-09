<?php

namespace App\Filament\Resources\EdadPegiResource\Pages;

use App\Filament\Resources\EdadPegiResource;
use Filament\Pages\Actions;
use Filament\Resources\Pages\ListRecords;

class ListEdadPegis extends ListRecords
{
    protected static string $resource = EdadPegiResource::class;

    protected function getActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
