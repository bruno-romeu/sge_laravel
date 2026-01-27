<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'name',
        'quantity',
        'mininum_quantity',
        'price',
        'cost_price',
        'profit',
        'description',
    ];
}
