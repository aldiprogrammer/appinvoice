<?php

namespace App\Http\Middleware;

use App\Models\Pengguna;
use Closure;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

class HandleInertia
{
    public function handle(Request $request, Closure $next): Response
    {
        $hak_akses = null;
        if (session('id_user')) {
            $user = Pengguna::find(session('id_user'));
            $hak_akses = $user->hak_akses ?? session('menu_access');
        }

        Inertia::share([
            'auth' => [
                'username' => session('username'),
                'level' => session('level'),
                'id_user' => session('id_user'),
                'hak_akses' => $hak_akses,
            ],
            'flash' => [
                'success' => fn () => session('success'),
                'error' => fn () => session('error'),
            ],
        ]);

        $response = $next($request);

        $response->headers->set('Vary', 'X-Inertia');

        view()->share('hak_akses', $hak_akses);

        return $response;
    }
}
