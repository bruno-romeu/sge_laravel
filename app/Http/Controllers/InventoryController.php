<?php

namespace App\Http\Controllers;

use App\Models\Inventory;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Enums\InventoryType;


class InventoryController extends Controller
{

    public function index()
    {
       
    }


    public function create()
    {
        //
    }


    public function store(Request $request)
    {

        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
            'type' => ['required', Rule::enum(InventoryType::class)],
            'description' => 'string|max:1000',
        ]);
        $product_quantity = Product::find($validated['product_id'])->quantity;

        if ($validated['type'] === 'removal' && $product_quantity < $validated['quantity']) {
            return redirect()->back()->with('error', 'A quantidade a ser removida excede o estoque disponível.');
        }

        try {
            DB::transaction(function() use ($validated, $product) {
                Inventory::create([
                    ...$validated,
                    'type' => $validated['type'],
                    ]);

                    match ($validated['type']) {
                        InventoryType::Addition =>
                            $product->increment('quantity', $validated['quantity']),

                        InventoryType::Removal =>
                            $product->decrement('quantity', $validated['quantity']),
                    };
            });
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Ocorreu um erro ao registrar a alteração no estoque. Tente novamente mais tarde. Erro: ' . $e->getMessage());
        }
        return redirect()->route('products.index')->with('success', 'Alteração no estoque registrada com sucesso!');
    }


    public function show($id)
    {
       //   
    }


    public function edit(Inventory $inventory)
    {
        //
    }


    public function update(Request $request, Inventory $inventory)
    {
        //
    }


    public function destroy(Inventory $inventory)
    {
        //
    }
}
