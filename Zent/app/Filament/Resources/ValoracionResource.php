<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ValoracionResource\Pages;
use App\Filament\Resources\ValoracionResource\RelationManagers;
use App\Models\Valoracion;
use Filament\Forms;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Resources\Form;
use Filament\Resources\Resource;
use Filament\Resources\Table;
use Filament\Tables;
use Filament\Tables\Columns\TextColumn;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class ValoracionResource extends Resource
{
    protected static ?string $model = Valoracion::class;

    protected static ?string $navigationIcon = 'heroicon-o-collection';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Select::make('id_usuario')->relationship('doUsuario','name')->required(),
                Select::make('id_producto')->relationship('doProducto','titulo')->required(),
                TextInput::make('estrellas')->numeric()->minValue(0)->maxValue(5)->required(),
                TextInput::make('comentario')->required()->maxLength(255),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('id')->sortable(),
                TextColumn::make('doUsuario.name')->searchable()->sortable(),
                TextColumn::make('doProducto.titulo')->searchable()->sortable(),
                TextColumn::make('comentario')->searchable()->sortable(),
                TextColumn::make('estrellas')->searchable()->sortable()
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\DeleteAction::make(),
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
            'index' => Pages\ListValoracions::route('/'),
            'create' => Pages\CreateValoracion::route('/create'),
            'edit' => Pages\EditValoracion::route('/{record}/edit'),
        ];
    }

    public static function canCreate(): bool
    {
        return false;
    }

    public static function canEdit($record): bool
    {
        return false;
    }

}
