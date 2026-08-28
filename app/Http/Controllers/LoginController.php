<?php

namespace App\Http\Controllers;

use App\Models\Pengguna;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class LoginController extends Controller
{
    private $menuLabels = [
        'invoice' => 'Invoice',
        'suratjalan' => 'Surat Jalan',
        'inventaris' => 'Inventaris',
        'admin' => 'Admin',
    ];

    public function index()
    {
        return Inertia::render('Menu');
    }

    public function showLogin($menu)
    {
        if (session()->has('username')) {
            return redirect()->route('dashboard');
        }

        $label = $this->menuLabels[$menu] ?? ucfirst($menu);

        return Inertia::render('Login', ['menu' => $menu, 'menuLabel' => $label]);
    }

    public function actlogin(Request $request)
    {
        $user = Pengguna::where('username', $request->username)->first();
        if ($user && Hash::check($request->password, $user->password)) {
            session([
                'login' => true,
                'id_user' => $user->id,
                'username' => $user->username,
                'level' => $user->level,
                'menu_access' => $request->menu,
            ]);

            return redirect('/dashboard');
        } else {
            return redirect()->route('login', ['menu' => $request->menu])->withErrors([
                'username' => 'Username atau password anda salah',
            ]);
        }
    }

    public function logout(Request $request)
    {
        $menu = session('menu_access');
        Auth::guard('pengguna')->logout();
        $request->session()->forget(['login', 'username', 'level', 'id_user', 'menu_access']);
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/login/'.($menu ?? 'invoice'));
    }
}
