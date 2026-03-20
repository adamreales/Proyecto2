<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ImagenProductoResource\Pages;
use App\Filament\Resources\ImagenProductoResource\RelationManagers;
use App\Models\ImagenProducto;
use Filament\Forms;
use Filament\Forms\Components\TextInput;
use Filament\Resources\Form;
use Filament\Resources\Resource;
use Filament\Resources\Table;
use Filament\Tables;
use Filament\Tables\Columns\TextColumn;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Filament\Forms\Components\Select;
use Filament\Tables\Columns\SelectColumn;

class ImagenProductoResource extends Resource
{
    protected static ?string $model = ImagenProducto::class;

    protected static ?string $navigationIcon = 'heroicon-o-collection';

    public static function form(Form $form): Form
    {

        return $form
            ->schema([
                Select::make('id_producto')
                ->relationship('doProducto', 'titulo')
                ->searchable()
                ->preload()
                ->required(),
                TextInput::make('url')->required()->maxLength(255)
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('id')->searchable(),
                TextColumn::make('doProducto.titulo')->label('Producto')->searchable()->sortable(),
                TextColumn::make('url')->searchable()->sortable()
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
            'index' => Pages\ListImagenProductos::route('/'),
            'create' => Pages\CreateImagenProducto::route('/create'),
            'edit' => Pages\EditImagenProducto::route('/{record}/edit'),
        ];
    }    
}
