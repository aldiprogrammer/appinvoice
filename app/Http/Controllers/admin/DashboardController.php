<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Models\Listinvoice;
use App\Models\Pengguna;
use App\Models\Produk;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $jmlp = Pengguna::count();
        $jmlc = Customer::count();
        $jmlpr = Produk::count();
        $jmlinv = Listinvoice::count();

        return Inertia::render('Dashboard', compact('jmlp', 'jmlc', 'jmlpr', 'jmlinv'));
    }
}
