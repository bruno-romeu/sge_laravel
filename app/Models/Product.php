<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'name',
        'quantity',
        'minimum_quantity',
        'price',
        'cost_price',
        'profit',
        'description',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'cost_price' => 'decimal:2',
        'profit' => 'decimal:2',
    ];
}
