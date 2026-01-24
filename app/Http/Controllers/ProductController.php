<?php
namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller {
    public function index() {
        if (product::count() == 0) {
            return redirect()->route('products.create');
        }
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
            'price' => 'required|numeric',
        ]);

        // salvar no banco 
        Product::create($validated);

        return redirect()->route('products.index');
    }

    public function show($id) {
        $produto = Product::find($id);

        if (!$produto) {
            return redirect()->route('products.index')->with('error', 'Produto não encontrado.');
        }

        return Inertia::render('Products/Product/{id}', [
            'produto' => $produto
        ]);
    }
}