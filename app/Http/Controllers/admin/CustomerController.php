<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CustomerController extends Controller
{
    public function index()
    {
        $customers = Customer::orderBy('id', 'desc')->get();

        return Inertia::render('Customer/Index', compact('customers'));
    }

    public function store(Request $request)
    {
        $cs = new Customer;
        $cs->nama = $request->nama;
        $cs->nohp = $request->nohp;
        $cs->singkatan = $request->singkatan;
        $cs->alamat = $request->alamat;
        $cs->save();

        return redirect()->route('customer')->with('success', 'Customer berhasil ditambahkan');
    }

    public function update(Request $request, $id)
    {
        $cs = Customer::find($id);
        $cs->nama = $request->nama;
        $cs->singkatan = $request->singkatan;
        $cs->nohp = $request->nohp;
        $cs->alamat = $request->alamat;
        $cs->update();

        return redirect()->route('customer')->with('success', 'Customer berhasil diubah');
    }

    public function delete($id)
    {
        $cs = Customer::find($id);
        $cs->delete();

        return redirect()->route('customer')->with('success', 'Customer berhasil dihapus');
    }

    public function detail($id)
    {
        $cs = Customer::find($id);

        return response()->json($cs);
    }
}
