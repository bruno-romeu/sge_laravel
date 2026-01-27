<?php
namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller {
    public function index() {
        $produtos = Product::all();

        return Inertia::render('Products/Index', [
            'listaProdutos' => $produtos
        ]);
    }

    public function create() {
        return Inertia::render('Products/Create');
    }

    public function store(Request $request) {

        // validação dos dados
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
        } else if (null !== ($validated['price']) && null !== ($validated['profit'])) {
            $validated['cost_price'] = $validated['price'] * (1 - ($validated['profit'] / 100));
        }

        // salvar no banco 
        Product::create($validated);
        echo "Produdo cadastrado com sucesso!";

        return redirect()->route('products.index')->with('success', 'Produto cadastrado com sucesso!');
    }

    public function show($id) {
        $product = Product::find($id);

        if (!$product) {
            return redirect()->route('products.index')->with('error', 'Produto não encontrado.');
        }

        return Inertia::render('Products/Product/Show', [
            'product' => $product
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
            'minimum_quantity' => 'integer',
            'price' => 'required|numeric',
            'cost_price' => 'numeric',
            'profit' => 'numeric',
            'description' => 'string|max:1000',
        ]);

        $product->update($validated);
        echo "Produto atualizado com sucesso!";
        return redirect()->route('products.index')->with('success', 'Produto atualizado com sucesso!');

    }

    public function destroy($id) {
        $product = Product::find($id);
        if (!$product) {
            return redirect()->route('products.index')->with('error', 'Produto não encontrado.');
        }

        $product::destroy($id);
        echo "Produdo excluído com sucesso!";
        return redirect()->route('products.index')->with('success', 'Produto excluído com sucesso!');

    }
}