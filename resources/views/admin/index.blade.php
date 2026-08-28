@extends('layout.template')
@section('content')
    <div class="d-flex align-items-center justify-content-between mb-4">
        <div>
            <h1 class="page-title">Dashboard</h1>
            <p class="page-subtitle">Selamat datang, <span class="font-weight-bold text-primary">{{ session('username') }}</span></p>
        </div>
        <div class="small text-muted">
            {{ now()->format('l, d F Y') }}
        </div>
    </div>

    <div class="row">
        <div class="col-lg-3 col-md-6 mb-4">
            <div class="stat-card bg-grad-blue">
                <div class="d-flex align-items-center justify-content-between">
                    <div>
                        <p class="small font-weight-medium text-white">Total Invoice</p>
                        <p class="h3 font-weight-bold text-white mt-1">{{ $jmlinv }}</p>
                    </div>
                    <div class="info-icon">
                        <i class="fas fa-file-invoice text-white"></i>
                    </div>
                </div>
                <div class="mt-2 small text-white">
                    <i class="fas fa-arrow-up"></i> Data invoice tersimpan
                </div>
            </div>
        </div>

        <div class="col-lg-3 col-md-6 mb-4">
            <div class="stat-card bg-grad-green">
                <div class="d-flex align-items-center justify-content-between">
                    <div>
                        <p class="small font-weight-medium text-white">Total Pelanggan</p>
                        <p class="h3 font-weight-bold text-white mt-1">{{ $jmlc }}</p>
                    </div>
                    <div class="info-icon">
                        <i class="fas fa-users text-white"></i>
                    </div>
                </div>
                <div class="mt-2 small text-white">
                    <i class="fas fa-user-plus"></i> Pelanggan terdaftar
                </div>
            </div>
        </div>

        <div class="col-lg-3 col-md-6 mb-4">
            <div class="stat-card bg-grad-orange">
                <div class="d-flex align-items-center justify-content-between">
                    <div>
                        <p class="small font-weight-medium text-white">Total Produk</p>
                        <p class="h3 font-weight-bold text-white mt-1">{{ $jmlpr }}</p>
                    </div>
                    <div class="info-icon">
                        <i class="fas fa-box text-white"></i>
                    </div>
                </div>
                <div class="mt-2 small text-white">
                    <i class="fas fa-tag"></i> Produk tersedia
                </div>
            </div>
        </div>

        <div class="col-lg-3 col-md-6 mb-4">
            <div class="stat-card bg-grad-purple">
                <div class="d-flex align-items-center justify-content-between">
                    <div>
                        <p class="small font-weight-medium text-white">Total Pengguna</p>
                        <p class="h3 font-weight-bold text-white mt-1">{{ $jmlp }}</p>
                    </div>
                    <div class="info-icon">
                        <i class="fas fa-user-shield text-white"></i>
                    </div>
                </div>
                <div class="mt-2 small text-white">
                    <i class="fas fa-user-check"></i> Pengguna aktif
                </div>
            </div>
        </div>
    </div>

    <div class="row mt-4">
        <div class="col-lg-6 mb-4">
            <div class="card card-app">
                <div class="card-body">
                    <h5 class="font-weight-bold d-flex align-items-center mb-4">
                        <i class="fas fa-bolt text-primary mr-2"></i> Aksi Cepat
                    </h5>
                    <div class="row">
                        <div class="col-6 mb-3">
                            <a href="/invoice" class="btn btn-blue btn-block">
                                <i class="fas fa-plus"></i> Invoice Baru
                            </a>
                        </div>
                        <div class="col-6 mb-3">
                            <a href="/customer" class="btn btn-green btn-block">
                                <i class="fas fa-user-plus"></i> Customer Baru
                            </a>
                        </div>
                        <div class="col-6 mb-3">
                            <a href="/listinvoice" class="btn btn-orange btn-block">
                                <i class="fas fa-book"></i> Lihat Invoice
                            </a>
                        </div>
                        @if(session('level') == 'admin' || session('level') == 'super admin')
                            <div class="col-6 mb-3">
                                <a href="/produk" class="btn btn-purple btn-block">
                                    <i class="fas fa-box"></i> Kelola Produk
                                </a>
                            </div>
                        @endif
                    </div>
                </div>
            </div>
        </div>

        <div class="col-lg-6 mb-4">
            <div class="card card-app">
                <div class="card-body">
                    <h5 class="font-weight-bold d-flex align-items-center mb-4">
                        <i class="fas fa-info-circle text-primary mr-2"></i> Informasi
                    </h5>
                    <div>
                        <div class="info-card d-flex align-items-center p-3 mb-3">
                            <div class="info-icon bg-grad-blue mr-3">
                                <i class="fas fa-file-invoice text-white"></i>
                            </div>
                            <div>
                                <p class="font-weight-bold mb-0">Invoice Management</p>
                                <small class="text-muted">Buat, cetak, dan kelola invoice dengan mudah</small>
                            </div>
                        </div>
                        <div class="info-card d-flex align-items-center p-3 mb-3">
                            <div class="info-icon bg-grad-green mr-3">
                                <i class="fas fa-users text-white"></i>
                            </div>
                            <div>
                                <p class="font-weight-bold mb-0">Data Pelanggan</p>
                                <small class="text-muted">Kelola data pelanggan dengan cepat dan akurat</small>
                            </div>
                        </div>
                        <div class="info-card d-flex align-items-center p-3">
                            <div class="info-icon bg-grad-orange mr-3">
                                <i class="fas fa-download text-white"></i>
                            </div>
                            <div>
                                <p class="font-weight-bold mb-0">Export PDF</p>
                                <small class="text-muted">Download invoice dalam format PDF profesional</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
