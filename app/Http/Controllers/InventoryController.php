<?php

namespace App\Http\Controllers;

use App\Models\Inventory;
use Illuminate\Http\Request;

class InventoryController extends Controller
{

    public function index()
    {
       //
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
            'type' => 'required|in:addition,removal',
            'date' => 'required|date',
            'description' => 'string|max:1000',
        ]);

        if (!$validated) {
            return with('error', 'Dados Inválidos. Verifique e tente novamente mais tarde.');
        }

        

        Inventory::create($validated);
        return redirect()->route('dashboard')->with('success', 'Alteração no estoque registrada com sucesso!');
    }


    public function show($id)
    {
        $inventory = Inventory::with(['product'])->findOrFail($id);

        return Inertia::render('Inventory/Show', [
            'inventory' => $inventory,
        ]);
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
