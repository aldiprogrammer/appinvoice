<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>{{ $data == true ? $data['title'] : 'Home' }}</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
    <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />
    <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2-bootstrap4.min.css" rel="stylesheet" />
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    @stack('styles')
    <style>
        body {
            background: #f0f2f5;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            font-size: .875rem;
        }
        .sidebar-wrapper {
            position: fixed;
            left: 0;
            top: 0;
            bottom: 0;
            z-index: 1030;
            width: 260px;
            background: #fff;
            border-right: 1px solid rgba(0,0,0,.06);
            transition: width .25s ease, transform .25s ease;
            display: flex;
            flex-direction: column;
            overflow: hidden;
        }
        .sidebar-wrapper.collapsed { width: 64px; }
        .sidebar-wrapper.collapsed .sidebar-text,
        .sidebar-wrapper.collapsed .sidebar-header-text,
        .sidebar-wrapper.collapsed .menu-title { display: none; }
        .sidebar-header {
            display: flex;
            align-items: center;
            gap: 12px;
            height: 64px;
            padding: 0 16px;
            border-bottom: 1px solid rgba(0,0,0,.06);
            flex-shrink: 0;
        }
        .sidebar-header .brand-icon {
            width: 32px; height: 32px;
            border-radius: 8px;
            background: linear-gradient(135deg,#3b82f6,#2563eb);
            display: flex; align-items: center; justify-content: center;
            flex-shrink: 0;
        }
        .sidebar-header .brand-icon i { color: #fff; font-size: 14px; }
        .sidebar-nav {
            flex: 1; overflow-y: auto;
            padding: 16px 8px;
        }
        .menu-title {
            font-size: 11px; font-weight: 700;
            color: rgba(0,0,0,.3);
            text-transform: uppercase; letter-spacing: .1em;
            padding: 8px 16px 4px;
        }
        .nav-side {
            display: flex; align-items: center; gap: 12px;
            padding: 10px 12px; border-radius: 8px;
            color: rgba(0,0,0,.6); font-size: 14px; font-weight: 500;
            transition: all .2s; text-decoration: none;
        }
        .nav-side:hover { background: #f0f2f5; color: rgba(0,0,0,.85); text-decoration: none; }
        .nav-side.active { background: #3b82f6; color: #fff; box-shadow: 0 2px 8px rgba(59,130,246,.35); }
        .nav-side i { width: 20px; text-align: center; flex-shrink: 0; }
        .nav-side:not(.active) i { color: rgba(0,0,0,.3); }
        .nav-side:hover:not(.active) i { color: rgba(0,0,0,.65); }
        .nav-side.active i { color: #fff; }
        .main-wrapper {
            margin-left: 260px;
            transition: margin-left .25s ease;
            min-height: 100vh;
            display: flex; flex-direction: column;
        }
        .main-wrapper.expanded { margin-left: 64px; }
        .app-navbar {
            background: rgba(255,255,255,.85);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border-bottom: 1px solid rgba(0,0,0,.06);
            height: 64px;
            padding: 0 24px;
            display: flex; align-items: center; justify-content: space-between;
            position: sticky; top: 0; z-index: 1020;
        }
        .btn-toggle {
            background: none; border: none; width: 40px; height: 40px;
            border-radius: 8px; display: flex; align-items: center; justify-content: center;
            cursor: pointer; color: rgba(0,0,0,.45);
        }
        .btn-toggle:hover { background: #f0f2f5; color: rgba(0,0,0,.7); }
        .content-area { flex: 1; padding: 24px; }
        .card-app {
            background: #fff; border-radius: 12px;
            border: 1px solid rgba(0,0,0,.06);
            box-shadow: 0 1px 3px rgba(0,0,0,.04);
        }
        .page-title { font-size: 1.5rem; font-weight: 700; color: rgba(0,0,0,.88); }
        .page-subtitle { font-size: .875rem; color: rgba(0,0,0,.42); margin-top: 4px; }
        .stat-card {
            border-radius: 12px; padding: 20px 24px;
            transition: all .3s; position: relative; overflow: hidden;
        }
        .stat-card:hover { transform: translateY(-4px); box-shadow: 0 12px 24px rgba(0,0,0,.12) !important; }
        .stat-icon {
            width: 48px; height: 48px; border-radius: 10px;
            display: flex; align-items: center; justify-content: center;
            backdrop-filter: blur(4px); flex-shrink: 0;
        }
        .bg-grad-blue { background: linear-gradient(135deg,#3b82f6,#1d4ed8); }
        .bg-grad-green { background: linear-gradient(135deg,#10b981,#059669); }
        .bg-grad-orange { background: linear-gradient(135deg,#f97316,#ea580c); }
        .bg-grad-purple { background: linear-gradient(135deg,#8b5cf6,#7c3aed); }
        .bg-grad-lblue { background: linear-gradient(135deg,#eff6ff,#fff); }
        .bg-grad-lgreen { background: linear-gradient(135deg,#ecfdf5,#fff); }
        .bg-grad-lorange { background: linear-gradient(135deg,#fff7ed,#fff); }
        .bg-grad-lpurple { background: linear-gradient(135deg,#f5f3ff,#fff); }
        .badge-soft {
            padding: 4px 10px; border-radius: 6px;
            font-size: .75rem; font-weight: 600; display: inline-flex; align-items: center; gap: 4px;
        }
        .badge-soft-blue { background: #dbeafe; color: #1d40af; }
        .badge-soft-green { background: #d1fae5; color: #065f46; }
        .badge-soft-yellow { background: #fef3c7; color: #92400e; }
        .badge-soft-red { background: #fee2e2; color: #991b1b; }
        .badge-soft-gray { background: #f3f4f6; color: #4b5563; }
        .badge-soft-purple { background: #ede9fe; color: #5b21b6; }
        .btn-blue {
            color: #fff; background: #3b82f6; border: none;
            box-shadow: 0 2px 6px rgba(59,130,246,.25);
        }
        .btn-blue:hover { background: #2563eb; color: #fff; transform: translateY(-1px); box-shadow: 0 4px 12px rgba(59,130,246,.35); }
        .btn-green {
            color: #fff; background: #10b981; border: none;
            box-shadow: 0 2px 6px rgba(16,185,129,.25);
        }
        .btn-green:hover { background: #059669; color: #fff; transform: translateY(-1px); }
        .btn-red {
            color: #fff; background: #ef4444; border: none;
            box-shadow: 0 2px 6px rgba(239,68,68,.25);
        }
        .btn-red:hover { background: #dc2626; color: #fff; transform: translateY(-1px); }
        .btn-orange {
            color: #fff; background: #f97316; border: none;
            box-shadow: 0 2px 6px rgba(249,115,22,.25);
        }
        .btn-orange:hover { background: #ea580c; color: #fff; transform: translateY(-1px); }
        .btn-purple {
            color: #fff; background: #8b5cf6; border: none;
            box-shadow: 0 2px 6px rgba(139,92,246,.25);
        }
        .btn-purple:hover { background: #7c3aed; color: #fff; transform: translateY(-1px); }
        .btn-gray {
            color: #fff; background: #6b7280; border: none;
        }
        .btn-gray:hover { background: #4b5563; color: #fff; }
        .btn-soft-border {
            background: #fff; color: rgba(0,0,0,.55); border: 1px solid #e5e7eb;
        }
        .btn-soft-border:hover { background: #f9fafb; }
        .modal-app .modal-content {
            border-radius: 16px; border: none;
            box-shadow: 0 24px 48px rgba(0,0,0,.15);
        }
        .modal-app .modal-header {
            border-bottom: 1px solid rgba(0,0,0,.06); padding: 20px 24px 0;
        }
        .modal-app .modal-body { padding: 24px; }
        .modal-app .modal-footer {
            border-top: 1px solid rgba(0,0,0,.06); padding: 16px 24px;
        }
        .delete-icon-wrap {
            width: 80px; height: 80px; border-radius: 50%;
            background: #fef2f2;
            display: flex; align-items: center; justify-content: center;
            margin: 0 auto 16px;
        }
        .delete-icon-wrap i { font-size: 2rem; color: #ef4444; }
        .table-app thead th {
            background: #3b82f6; color: #fff;
            font-size: .8rem; font-weight: 600;
            text-transform: uppercase; letter-spacing: .04em;
            padding: 12px 16px; border: none;
        }
        .table-app tbody td {
            padding: 10px 16px;
            border-bottom: 1px solid rgba(0,0,0,.04);
            vertical-align: middle;
        }
        .table-app tbody tr:hover { background: rgba(59,130,246,.03); }
        .fld { margin-bottom: 12px; }
        .fld-legend {
            font-size: .75rem; font-weight: 600; color: rgba(0,0,0,.45);
            text-transform: uppercase; letter-spacing: .04em; margin-bottom: 4px;
        }
        .info-card {
            display: flex; align-items: center; gap: 12px;
            padding: 12px 16px; border-radius: 10px;
        }
        .info-icon {
            width: 40px; height: 40px; border-radius: 8px;
            display: flex; align-items: center; justify-content: center;
        }
        .dt-container .dt-length select,
        .dt-container .dt-search input {
            border-radius: 6px; border: 1px solid #e5e7eb;
            padding: 4px 8px; font-size: .875rem;
            background: #fff;
        }
        .dt-container .dt-paging nav { display: flex; gap: 2px; }
        .dt-container .dt-paging button {
            border: 1px solid #e5e7eb; background: #fff;
            padding: 6px 12px; border-radius: 6px;
            font-size: .875rem; cursor: pointer; color: rgba(0,0,0,.65);
        }
        .dt-container .dt-paging button.current { background: #3b82f6; color: #fff; border-color: #3b82f6; }
        .dt-container .dt-paging button:hover:not(.current) { background: #f3f4f6; }
        .dt-container .dt-info { font-size: .875rem; color: rgba(0,0,0,.42); }
        .dt-container table.dataTable thead th { border-bottom: 2px solid rgba(0,0,0,.06) !important; }
        .dt-container table.dataTable tbody td { border-bottom: 1px solid rgba(0,0,0,.03) !important; }
        .hover-lift { transition: all .2s; }
        .hover-lift:hover { transform: translateY(-2px); box-shadow: 0 6px 16px rgba(0,0,0,.08); }
        .rounded-app { border-radius: 12px; }
        .shadow-app { box-shadow: 0 1px 3px rgba(0,0,0,.04); }
        .sidebar-overlay {
            position: fixed; inset: 0; background: rgba(0,0,0,.3);
            z-index: 1029; display: none;
        }
        @media (max-width: 991.98px) {
            .sidebar-wrapper { transform: translateX(-100%); width: 280px !important; }
            .sidebar-wrapper.open { transform: translateX(0); }
            .sidebar-wrapper.collapsed { width: 280px !important; }
            .sidebar-wrapper.collapsed .sidebar-text,
            .sidebar-wrapper.collapsed .sidebar-header-text,
            .sidebar-wrapper.collapsed .menu-title { display: flex; }
            .main-wrapper, .main-wrapper.expanded { margin-left: 0; }
            .sidebar-overlay.show { display: block; }
        }
        @media (min-width: 992px) {
            .sidebar-overlay { display: none !important; }
            .sidebar-wrapper.collapsed .btn-toggle-collapse i { transform: rotate(180deg); }
        }
    </style>
</head>
<body>
    <div class="sidebar-overlay" id="sidebarOverlay" onclick="toggleSidebar()"></div>

    <div class="sidebar-wrapper" id="sidebar">
        <div class="sidebar-header">
            <div class="brand-icon"><i class="fas fa-file-invoice"></i></div>
            <div class="sidebar-header-text">
                <div style="font-size:14px;font-weight:700;color:rgba(0,0,0,.85);line-height:1.2">INVOICE PTSAN</div>
                <small style="color:rgba(0,0,0,.4);font-size:10px">Management System</small>
            </div>
        </div>
        <nav class="sidebar-nav">
            <div class="menu-title">Menu</div>

            <a href="/dashboard" class="nav-side {{ request()->is('dashboard') ? 'active' : '' }}">
                <i class="fas fa-home"></i><span class="sidebar-text">Home</span>
            </a>

            @if (empty($hak_akses) || in_array('customer', explode(',', $hak_akses)))
            <a href="/customer" class="nav-side {{ request()->is('customer') ? 'active' : '' }}">
                <i class="fas fa-users"></i><span class="sidebar-text">Customer</span>
            </a>
            @endif

            @if (empty($hak_akses) || in_array('produk', explode(',', $hak_akses)))
            <a href="/produk" class="nav-side {{ request()->is('produk') ? 'active' : '' }}">
                <i class="fas fa-box"></i><span class="sidebar-text">Produk</span>
            </a>
            @endif

            @if (empty($hak_akses) || in_array('invoice', explode(',', $hak_akses)))
            <a href="/invoice" class="nav-side {{ request()->is('invoice') ? 'active' : '' }}">
                <i class="fas fa-file-invoice"></i><span class="sidebar-text">Invoice</span>
            </a>
            @endif

            @if (empty($hak_akses) || in_array('listinvoice', explode(',', $hak_akses)))
            <a href="/listinvoice" class="nav-side {{ request()->is('listinvoice') || request()->is('listinvoice/*') || request()->is('editinvoice/*') ? 'active' : '' }}">
                <i class="fas fa-book"></i><span class="sidebar-text">List Invoice</span>
            </a>
            @endif

            @if (empty($hak_akses) || in_array('suratjalan', explode(',', $hak_akses)))
            <a href="/suratjalan" class="nav-side {{ request()->is('suratjalan') ? 'active' : '' }}">
                <i class="fas fa-truck"></i><span class="sidebar-text">Surat Jalan</span>
            </a>
            @endif

            @if (empty($hak_akses) || in_array('listsuratjalan', explode(',', $hak_akses)))
            <a href="/listsuratjalan" class="nav-side {{ request()->is('listsuratjalan') || request()->is('listsuratjalan/*') ? 'active' : '' }}">
                <i class="fas fa-clipboard-list"></i><span class="sidebar-text">List Surat Jalan</span>
            </a>
            @endif

            @if (empty($hak_akses) || in_array('pengguna', explode(',', $hak_akses)))
            <div class="menu-title" style="margin-top:12px">Administrator</div>
            <a href="/pengguna" class="nav-side {{ request()->is('pengguna') ? 'active' : '' }}">
                <i class="fas fa-user-shield"></i><span class="sidebar-text">Pengguna</span>
            </a>
            @endif
        </nav>
    </div>

    <div class="main-wrapper" id="mainWrapper">
        <nav class="app-navbar">
            <div class="d-flex align-items-center">
                <button class="btn-toggle d-none d-lg-flex" onclick="toggleCollapse()" title="Toggle sidebar">
                    <i class="fas fa-bars"></i>
                </button>
                <button class="btn-toggle d-lg-none" onclick="toggleSidebar()" title="Open sidebar">
                    <i class="fas fa-bars"></i>
                </button>
            </div>

            <div class="dropdown">
                <button class="btn btn-link dropdown-toggle d-flex align-items-center text-decoration-none px-3" data-toggle="dropdown" style="border-radius:50px;">
                    <div class="d-flex align-items-center" style="width:32px;height:32px;border-radius:50%;background:#3b82f6;display:flex;align-items:center;justify-content:center;margin-right:8px">
                        <i class="fas fa-user text-white" style="font-size:12px"></i>
                    </div>
                    <span class="d-none d-sm-inline" style="font-size:14px;font-weight:500;color:rgba(0,0,0,.8)">{{ session('username') }}</span>
                    {{-- <i class="fas fa-chevron-down ml-2" style="font-size:10px;color:rgba(0,0,0,.35)"></i> --}}
                </button>
                <div class="dropdown-menu dropdown-menu-right shadow-sm" style="border-radius:12px;border:1px solid rgba(0,0,0,.06);padding:6px;min-width:180px">
                    <div style="padding:6px 12px 4px;font-size:11px;color:rgba(0,0,0,.4);font-weight:600;text-transform:uppercase;letter-spacing:.04em">
                        {{ session('level') }}
                    </div>
                    <div class="dropdown-divider"></div>
                    <a href="/logout" class="dropdown-item" style="color:#ef4444;border-radius:8px;">
                        <i class="fas fa-sign-out-alt mr-2"></i> Logout
                    </a>
                </div>
            </div>
        </nav>

        <main class="content-area">
            @yield('content')
        </main>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    @stack('scripts')
    <script>
        function toggleSidebar() {
            document.getElementById('sidebar').classList.toggle('open');
            document.getElementById('sidebarOverlay').classList.toggle('show');
        }
        function toggleCollapse() {
            document.getElementById('sidebar').classList.toggle('collapsed');
            document.getElementById('mainWrapper').classList.toggle('expanded');
        }
        $(document).ready(function() {
            $('.select2').select2({ width: '100%', theme: 'bootstrap4' });

            $("#customer").change(function() {
                var id = $(this).val();
                if (id) {
                    $.get('/customer/' + id, function(data) {
                        $("#alamat").val(data.alamat);
                        var singkatan = data.singkatan;
                        var bulan = "{{ $bulan ?? '' }}";
                        var tahun = "{{ $tahun ?? '' }}";
                        var kode = "{{ $kode ?? '' }}";
                        $kodeinv = kode + "/" + bulan + "/SAN/" + singkatan + '/' + tahun;
                        $("#kodeinv").val($kodeinv);
                    })
                }
            });

            $("#produk").change(function() {
                var id = $(this).val();
                if (id) {
                    $.get('/produk/' + id, function(data) {
                        $("#harga").val(data.harga);
                        $("#kemasan").val(data.kemasan);
                    })
                }
            });

            function formatRupiah(angka) {
                let number_string = angka.toString().replace(/[^,\d]/g, '');
                let split = number_string.split(',');
                let sisa = split[0].length % 3;
                let rupiah = split[0].substr(0, sisa);
                let ribuan = split[0].substr(sisa).match(/\d{3}/gi);
                if (ribuan) {
                    let separator = sisa ? '.' : '';
                    rupiah += separator + ribuan.join('.');
                }
                return rupiah;
            };

            $("#sak").keyup(function() {
                let sak = $(this).val();
                let harga = $("#harga").val();
                let produk = $("#produk").val();
                let kemasan = $("#kemasan").val();
                harga = harga.replace(/\./g, "");
                harga = parseInt(harga);
                kemasan = parseInt(kemasan);
                var hasil = harga * sak;
                var hasil2 = hasil * kemasan;
                $("#total").val(formatRupiah(hasil2));
                $.get('/produk/' + produk, function(data) {
                    var kg = data.kemasan;
                    var hasilkg = parseInt(kg) * sak;
                    $("#totalkg").val(hasilkg);
                });
            });

            $("#harga").keyup(function() {
                let harga = $(this).val();
                let sak = $("#sak").val();
                let produk = $("#produk").val();
                let kemasan = $("#kemasan").val();
                harga = harga.replace(/\./g, "");
                harga = parseInt(harga);
                kemasan = parseInt(kemasan);
                var hasil = harga * sak;
                var hasil2 = hasil * kemasan;
                $("#total").val(formatRupiah(hasil2));
                $.get('/produk/' + produk, function(data) {
                    var kg = data.kemasan;
                    var hasilkg = parseInt(kg) * sak;
                    $("#totalkg").val(hasilkg);
                });
            });

            if ($("#customer").val()) {
                $("#customer").trigger('change');
            }
        });
    </script>
    <script>
        $(document).ready(function() {
            $('.kapital').on('input', function() {
                $(this).val($(this).val().toUpperCase());
            });
        });
    </script>
    @if (session('success'))
    <script>
        Swal.fire({ title: 'Berhasil!', text: '{{ session('success') }}', icon: 'success', confirmButtonText: 'OK', confirmButtonColor: '#2563eb' })
    </script>
    @endif
    @if (session('error'))
    <script>
        Swal.fire({ title: 'Opps!', text: '{{ session('error') }}', icon: 'error', confirmButtonText: 'OK', confirmButtonColor: '#2563eb' })
    </script>
    @endif
</body>
</html>
