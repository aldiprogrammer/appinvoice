<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Bahan;
use Inertia\Inertia;

class BahanController extends Controller
{
    public function index()
    {
        $bahan = Bahan::orderBy('tanggal_masuk', 'desc')->orderBy('id', 'desc')->get();

        return Inertia::render('Bahan/Index', compact('bahan'));
    }
}
