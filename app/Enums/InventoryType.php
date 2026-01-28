<?php

namespace App\Enums;

enum InventoryType: string
{
    case Addition = 'addition';
    case Removal = 'removal';

    public function label(): string
    {
        return match ($this) {
            self::Addition => 'Entrada',
            self::Removal => 'Saída',
        };
    }
}
