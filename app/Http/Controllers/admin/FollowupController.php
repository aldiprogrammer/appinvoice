<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Followup;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FollowupController extends Controller
{
    public function index()
    {
        $followup = Followup::first();

        return Inertia::render('Followup/Index', compact('followup'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'waktu' => 'required|integer|min:0',
            'status' => 'required|in:Aktif,Tidak Aktif',
        ]);

        $followup = Followup::first();

        if ($followup) {
            $followup->update($request->only('waktu', 'status'));
        } else {
            Followup::create($request->only('waktu', 'status'));
        }

        return redirect()->route('followup')->with('success', 'Waktu follow-up berhasil disimpan');
    }
}
