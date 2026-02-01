<?php
namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class ProductController extends Controller {
    public function index() {
        $produtos = Product::all();
        $hasLowStock = Product::whereColumn('quantity', '<=', 'minimum_quantity')->exists();

        return Inertia::render('Products/Index', [
            'listaProdutos' => $produtos,
            'hasLowStock' => $hasLowStock
        ]);

    }

    public function create() {
        return Inertia::render('Products/Create');
    }

    public function store(Request $request) {

        $validated = $request->validate([
            'name' => 'required|max:255',
            'quantity' => 'required|integer',
            'minimum_quantity' => 'integer|nullable',
            'price' => 'required|numeric',
            'cost_price' => 'numeric|nullable',
            'profit' => 'numeric|nullable',
            'description' => 'string|max:1000|nullable',
        ]);

        if ($validated['cost_price'] > $validated['price']) {
            return with('error', 'O preço de custo não pode ser maior que o preço de venda.');
        }

        if (null !== $validated['cost_price'] && null !== ($validated['price'])) {
           $validated ['profit'] = (($validated['price'] - $validated['cost_price']) / $validated['cost_price']) * 100;
        } else if (null !== ($validated['cost_price']) && null !== ($validated['profit'])) {
            $validated['price'] = $validated['cost_price'] / (1 - ($validated['profit'] / 100));
        } 

        
        try {
            DB::transaction(function() use ($validated) {
                $new_product = Product::create($validated);

                $new_product->inventories()->create([
                    'quantity'=>$validated['quantity'],
                    'type'=>'addition',
                    'description'=> 'Inclusão manual via cadastro de produto no SGE.'
                ]);
                        
            
            });
        }catch (\Exception $e) {
            return redirect()->back()->with('error', 'Ocorreu um erro ao registrar o produto no estoque. Tente Novamente mais tarde. Erro: ' . $e->getMessage());
        }
        

        return redirect()->route('products.index')->with('success', 'Produto cadastrado com sucesso!');
    }

    public function show($id) {
        $product = Product::with('inventories')->findOrFail($id);

        if (!$product) {
            return redirect()->route('products.index')->with('error', 'Produto não encontrado.');
        }

        return Inertia::render('Products/Product/Show', [
            'product' => $product,
            'inventories' => $product->inventories->map(fn ($item) => [
                'id' => $item->id,
                'quantity' => $item->quantity,
                'type' => $item->type->value,
                'type_label' => $item->type->label(),
                'description' => $item->description,
                'created_at' => $item->created_at->format('d/m/Y H:i'),
            ]),
        ]);
    }

    public function edit($id, Request $request) {
        $product = Product::find($id);
        if (!$product) {
            return redirect()->route('products.index')->with('error', 'Produto não encontrado.');
        }

        $validated = $request->validate([
            'name' => 'required|max:255',
            'quantity' => 'required|integer',
            'minimum_quantity' => 'integer|nullable',
            'price' => 'required|numeric',
            'cost_price' => 'numeric|nullable',
            'profit' => 'numeric|nullable',
            'description' => 'string|max:1000|nullable',
        ]);
        
        if (!$validated) {
            return with('error', 'Dados Inválidos. Tente novamente mais tarde.');
        }

        $product->update($validated);
        return redirect()->route('products.index')->with('success', 'Produto atualizado com sucesso!');

    }

    public function destroy($id) {
        $product = Product::find($id);
        if (!$product) {
            return redirect()->route('products.index')->with('error', 'Produto não encontrado.');
        }

        $product->delete();
        return redirect()->route('products.index')->with('success', 'Produto excluído com sucesso!');

    }
}