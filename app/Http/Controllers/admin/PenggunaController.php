<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Pengguna;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class PenggunaController extends Controller
{
    public function index()
    {
        $user = Pengguna::all();

        return Inertia::render('Pengguna/Index', compact('user'));
    }

    public function store(Request $request)
    {
        $user = new Pengguna;
        $user->username = $request->username;
        $user->nama = $request->nama;
        $user->password = Hash::make($request->password);
        $user->level = $request->level;
        $user->hak_akses = $request->hak_akses;
        $user->save();

        return redirect()->route('pengguna')->with('success', 'Data berhasil disimpan');
    }

    public function update(Request $request, $id)
    {
        $user = Pengguna::find($id);
        $user->username = $request->username;
        $user->nama = $request->nama;
        if ($request->password) {
            $user->password = Hash::make($request->password);
        }
        $user->level = $request->level;
        $user->hak_akses = $request->hak_akses;
        $user->update();

        return redirect()->route('pengguna')->with('success', 'Data berhasil diubah');
    }

    public function delete($id)
    {
        $user = Pengguna::find($id);
        $user->delete();

        return redirect()->route('pengguna')->with('success', 'Data berhasil dihapus');
    }
}
