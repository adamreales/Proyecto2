<?php

namespace App\Filament\Resources\ProductoResource\RelationManagers;

use Dom\Text;
use Filament\Forms;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Resources\Form;
use Filament\Resources\RelationManagers\HasManyRelationManager;
use Filament\Resources\Table;
use Filament\Tables;
use Filament\Tables\Columns\ImageColumn;

class ImagenesRelationManager extends HasManyRelationManager
{
    protected static string $relationship = 'doImagenes';

    protected static ?string $recordTitleAttribute = 'url';

    public static function form(Form $form): Form
    {
        return $form->schema([
            ImageColumn::make('url')
                ->getStateUsing(fn ($record) => 'https://zent.es/' . $record->url)
                ->height(80)
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('url')
                ->getStateUsing(fn ($record) => 'https://zent.es/' . $record->url)
                ->height(80),
            ])
            ->headerActions([
                Tables\Actions\CreateAction::make(),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ]);
    }
}