<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ProductoResource\Pages;
use App\Filament\Resources\ProductoResource\RelationManagers\DoCategoriasRelationManager;
use App\Models\DescripcionPegi;
use App\Models\Producto;
use App\Models\EdadPegi;
use Filament\Forms;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Placeholder;
use Filament\Forms\Components\ViewField;
use Filament\Resources\Form;
use Filament\Resources\Resource;
use Filament\Resources\Table;
use Filament\Tables;
use Filament\Tables\Columns\TextColumn;

class ProductoResource extends Resource
{
    protected static ?string $model = Producto::class;

    protected static ?string $navigationIcon = 'heroicon-o-collection';
    protected static ?string $navigationLabel = 'Productos';
    protected static ?string $pluralModelLabel = 'Productos';

    /* =======================
       FORMULARIO
       =======================*/
    public static function form(Form $form): Form
    {
        return $form->schema([

            TextInput::make('titulo')
                ->required()
                ->maxLength(50),

            TextInput::make('subtitulo')
                ->required()
                ->maxLength(50),

            Textarea::make('descripcion')
                ->rows(3)
                ->columnSpanFull(),

            TextInput::make('precio')
                ->numeric()
                ->minValue(0)
                ->required()
                ->prefix('€'),

            TextInput::make('valoracion')
                ->numeric()
                ->default(0)
                ->disabled(),

            TextInput::make('stock')
                ->numeric()
                ->minValue(1)
                ->default(1)
                ->required(),

            TextInput::make('ventas')
                ->numeric()
                ->default(0)
                ->disabled(),

            Select::make('pegi_id')
                ->label('PEGI')
                ->relationship('doPegi', 'edad')
                ->reactive()
                ->required(),
            

            Repeater::make('doPlataformaProductos')
                ->relationship('doPlataformaProductos')
                ->label('Plataformas')
                ->schema([

                    Select::make('plataforma_id')
                        ->label('Plataforma')
                        ->relationship('doPlataforma', 'nombre')
                        ->required()
                        ->preload(),

                    TextInput::make('stock')
                        ->numeric()
                        ->minValue(0)
                        ->required()
                        ->default(0),

                ])
                ->columns(2)
                ->defaultItems(1)
                ->collapsible()
                ->columnSpanFull(),

            Select::make('doCategorias')
                ->relationship('doCategorias', 'nombre')
                ->multiple()
                ->preload()
                ->required(),
           
            Repeater::make('doImagenes')
                ->relationship('doImagenes')
                ->schema([
                    TextInput::make('url')
                        ->label('URL Imagen')
                        ->url()
                        ->required()
                ])
                ->defaultItems(1)
                ->maxItems(4)
                ->collapsible()
                ->columnSpanFull()

        ]);
    }

    /* =======================
       TABLA
       =======================*/
    public static function table(Table $table): Table
    {
        return $table
            ->columns([

                TextColumn::make('id')->sortable(),

                TextColumn::make('titulo')
                    ->searchable()
                    ->sortable(),

                TextColumn::make('precio')
                    ->money('EUR')
                    ->sortable(),

                TextColumn::make('stock_total')
                    ->label('Stock Total')
                    ->getStateUsing(fn ($record) => 
                        $record->doPlataformaProductos->sum('stock')
                ),

                TextColumn::make('valoracion')->sortable(),

                TextColumn::make('ventas')->sortable(),

            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
                Tables\Actions\RestoreAction::make(),
                Tables\Actions\ForceDeleteAction::make()
            ])
            ->bulkActions([
                Tables\Actions\DeleteBulkAction::make(),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListProductos::route('/'),
            'create' => Pages\CreateProducto::route('/create'),
            'edit' => Pages\EditProducto::route('/{record}/edit'),
        ];
    }

    public static function getRelations(): array
    {
        return [
        ];
    }
}
