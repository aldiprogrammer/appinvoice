<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Menu | Invoice PTSAN</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
    <style>
        body {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, #2563eb, #1d4ed8, #1e3a8a);
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        .menu-logo {
            width: 110px; height: 110px;
            border-radius: 50%;
            background: #fff;
            display: flex; flex-direction: column;
            align-items: center; justify-content: center;
            margin: 0 auto 18px;
            box-shadow: 0 16px 32px rgba(0,0,0,.25);
            border: 4px solid rgba(255,255,255,.35);
        }
        .menu-logo span { font-weight: 800; color: #1d4ed8; line-height: 1.1; }
        .menu-title { color: #fff; font-weight: 700; font-size: 1.6rem; letter-spacing: .5px; }
        .menu-subtitle { color: rgba(255,255,255,.65); font-size: .9rem; }
        .menu-card {
            display: flex; flex-direction: column;
            align-items: center; justify-content: center;
            width: 150px; height: 150px;
            background: rgba(255,255,255,.95);
            border-radius: 20px;
            text-decoration: none;
            box-shadow: 0 12px 24px rgba(0,0,0,.18);
            transition: transform .2s ease, box-shadow .2s ease;
        }
        .menu-card:hover {
            transform: translateY(-6px);
            box-shadow: 0 20px 36px rgba(0,0,0,.28);
            text-decoration: none;
        }
        .menu-icon {
            width: 64px; height: 64px;
            border-radius: 18px;
            display: flex; align-items: center; justify-content: center;
            margin-bottom: 12px;
        }
        .menu-icon i { color: #fff; font-size: 1.7rem; }
        .icon-blue { background: linear-gradient(135deg,#3b82f6,#2563eb); }
        .icon-green { background: linear-gradient(135deg,#34d399,#059669); }
        .icon-purple { background: linear-gradient(135deg,#a78bfa,#7c3aed); }
        .icon-orange { background: linear-gradient(135deg,#fbbf24,#d97706); }
        .icon-red { background: linear-gradient(135deg,#f87171,#dc2626); }
        .icon-teal { background: linear-gradient(135deg,#2dd4bf,#0d9488); }
        .menu-label { font-weight: 700; color: rgba(0,0,0,.75); font-size: .95rem; }
    </style>
</head>
<body>
    <div class="text-center px-3 py-5" style="width:100%">
        @php
            $menus = [
               
                ['label' => 'Invoice', 'icon' => 'fa-file-invoice', 'color' => 'icon-green', 'url' => route('login')],
                ['label' => 'Surat Jalan', 'icon' => 'fa-truck', 'color' => 'icon-orange', 'url' => '#'],
                ['label' => 'Inventaris', 'icon' => 'fa-users', 'color' => 'icon-purple', 'url' => '#'],
                // ['label' => 'Produk', 'icon' => 'fa-boxes', 'color' => 'icon-teal', 'url' => route('produk')],
                // ['label' => 'Pengguna', 'icon' => 'fa-user-shield', 'color' => 'icon-red', 'url' => route('pengguna')],
            ];
        @endphp

        <div class="menu-logo">
            <span style="font-size:1.6rem">PT SAN</span>
            <span style="font-size:.55rem;color:#64748b">SINAR ANEKA NIAGA</span>
        </div>
        <h1 class="menu-title">MANAGEMENT SYSTEM PTSAN</h1>
        <p class="menu-subtitle mb-5">&mdash; PT Sinar Aneka Niaga &mdash;</p>

        <div class="d-flex flex-wrap justify-content-center mx-auto" style="max-width:560px">
            @foreach ($menus as $menu)
                <a href="{{ $menu['url'] }}" class="menu-card m-3">
                    <div class="menu-icon {{ $menu['color'] }}">
                        <i class="fas {{ $menu['icon'] }}"></i>
                    </div>
                    <span class="menu-label">{{ $menu['label'] }}</span>
                </a>
            @endforeach
        </div>

       
    </div>
</body>
</html>
