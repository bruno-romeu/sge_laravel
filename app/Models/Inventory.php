<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Enums\InventoryType;



class Inventory extends Model
{
    protected $fillable  = [
        'product_id',
        'quantity',
        'type',
        'description',
    ];

    protected $casts = [
        'type' => InventoryType::class,
    ];

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }
}
