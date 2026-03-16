<?php

namespace App\Filament\Resources\DescripcionPegiResource\Pages;

use App\Filament\Resources\DescripcionPegiResource;
use Filament\Pages\Actions;
use Filament\Resources\Pages\EditRecord;

class EditDescripcionPegi extends EditRecord
{
    protected static string $resource = DescripcionPegiResource::class;

    protected function getActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
