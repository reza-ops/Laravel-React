<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    private $patch = 'Products/';

    public function index()
    {
        $getProduct = Product::select('id', 'name', 'description', 'price')->get();
        return Inertia::render($this->patch.'Index', ['product' => $getProduct]);
    }

    public function create()
    {
        return Inertia::render($this->patch.'Create');
    }

    public function store(Request $request)
    {
        Product::create($request->all());
        return redirect('products');
    }

    public function getData($page, $countperpage, $filter = null)
    {
        $skip = $page == 1 ? 0 : ($page - 1) * $countperpage;
        $getProduct = Product::select('id', 'name', 'description', 'price')
        ->orderBy('id','asc');

        if(!empty($filter)){
            $getProduct->where('name','like', '%'.$filter);
        }

        $data = [
            'data' => $getProduct
            ->skip($skip)
            ->take(10)
            ->get(),
            'total' => $getProduct->count(),
        ];
        return $data;
    }
}
