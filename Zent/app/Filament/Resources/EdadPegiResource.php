<?php

namespace App\Filament\Resources;

use App\Filament\Resources\EdadPegiResource\Pages;
use App\Filament\Resources\EdadPegiResource\RelationManagers;
use App\Models\EdadPegi;
use Dom\Text;
use Filament\Forms;
use Filament\Forms\Components\TextInput;
use Filament\Resources\Form;
use Filament\Resources\Resource;
use Filament\Resources\Table;
use Filament\Tables;
use Filament\Tables\Columns\TextColumn;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class EdadPegiResource extends Resource
{
    protected static ?string $model = EdadPegi::class;

    protected static ?string $navigationIcon = 'heroicon-o-collection';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                TextInput::make('edad')->required()->maxLength(2),
                TextInput::make('color')->required()->maxLength(30),
                TextInput::make('descripcion')->required()->maxLength(255)
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('id')->sortable(),
                TextColumn::make('edad')->searchable()->sortable(),
                TextColumn::make('color')->searchable()->sortable(),
                TextColumn::make('descripcion')->searchable()->sortable()
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\DeleteBulkAction::make(),
            ]);
    }
    
    public static function getRelations(): array
    {
        return [
            //
        ];
    }
    
    public static function getPages(): array
    {
        return [
            'index' => Pages\ListEdadPegis::route('/'),
            'create' => Pages\CreateEdadPegi::route('/create'),
            'edit' => Pages\EditEdadPegi::route('/{record}/edit'),
        ];
    }    
}
