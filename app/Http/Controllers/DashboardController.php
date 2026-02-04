<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Dashboard/Index', [
            'kpis' => [
                'total_items' => Product::sum('quantity'),
                'total_cost_value' => Product::sum(DB::raw('cost_price * quantity')),
                'low_stock_quantity' => Product::whereColumn('quantity', '<=', 'minimum_quantity')->count(),
            ],
            'low_stock_products' => Product::whereColumn('quantity', '<=', 'minimum_quantity')->orderBy('quantity', 'asc')->limit(5)->get()
        ]);
    }
}
