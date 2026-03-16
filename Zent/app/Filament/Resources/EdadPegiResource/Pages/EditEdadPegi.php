<?php

namespace App\Filament\Resources\EdadPegiResource\Pages;

use App\Filament\Resources\EdadPegiResource;
use Filament\Pages\Actions;
use Filament\Resources\Pages\EditRecord;

class EditEdadPegi extends EditRecord
{
    protected static string $resource = EdadPegiResource::class;

    protected function getActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
