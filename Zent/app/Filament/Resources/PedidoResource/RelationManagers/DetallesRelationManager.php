<?php

namespace App\Filament\Resources\PedidoResource\RelationManagers;

use Filament\Forms;
use Filament\Resources\Form;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Resources\Table;
use Filament\Tables;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Filament\Tables\Columns\TextColumn;

class DetallesRelationManager extends RelationManager
{
    protected static string $relationship = 'doDetalles';

    protected static ?string $recordTitleAttribute = 'id';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('id')
                    ->required()
                    ->maxLength(255),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('doproducto.titulo')
                    ->label('Producto')
                    ->searchable(),

                TextColumn::make('cantidad')
                    ->sortable(),

                TextColumn::make('precio_unitario')
                    ->label('Precio')
                    ->money('EUR')
                    ->sortable(),

                TextColumn::make('subtotal')
                    ->label('Subtotal')
                    ->getStateUsing(fn ($record) => ($record->cantidad * $record->precio_unitario)*100) 
                    ->money('EUR'),
            ])
            ->actions([]);
    }  

}

