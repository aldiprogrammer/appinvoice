@extends('layout.template')
@section('content')
    <div class="card-app p-4">
        <div class="d-flex align-items-center justify-content-between mb-4">
            <div>
                <h1 class="page-title">Detail Surat Jalan</h1>
                <p class="page-subtitle">Informasi lengkap surat jalan</p>
            </div>
        </div>

        @if ($sj == false)
            <div class="d-flex justify-content-center align-items-center py-5">
                <div class="text-center">
                    <div class="d-flex align-items-center justify-content-center mx-auto mb-4" style="width:96px;height:96px;border-radius:50%;background:#f3f4f6">
                        <i class="fas fa-truck text-muted"></i>
                    </div>
                    <div class="text-muted">Data surat jalan sudah tidak tersedia</div>
                    <a href="/listsuratjalan" class="btn btn-blue mt-4"><i class="fas fa-angle-left"></i> Kembali</a>
                </div>
            </div>
        @else
            <div class="bg-grad-lblue rounded-app p-4 border mb-4">
                <div class="row">
                    <div class="col-sm-3">
                        <span class="text-primary text-uppercase small font-weight-bold">No Surat Jalan</span>
                        <p class="font-weight-bold text-primary h5 mt-1">{{ $sj->no_sj }}</p>
                        @if($ls && $ls->status == 1)
                            <button class="btn btn-success btn-sm"><i class="fas fa-circle-check"></i> Disetujui</button>
                            <p class="text-muted small mt-2 mb-0" style="font-size: 15px">Disetujui oleh: <span class="font-weight-bold">{{ $ls->userSetujui->username ?? '-' }}</span></p>
                        @else
                            <button class="btn btn-warning btn-sm"><i class="fas fa-circle"></i> Menunggu</button>
                        @endif
                    </div>
                    <div class="col-sm-3">
                        <span class="text-primary text-uppercase small font-weight-bold">Customer</span>
                        <p class="font-weight-bold h5 mt-1">{{ $sj->customernew->nama ?? $sj->customer }}</p>
                    </div>
                    <div class="col-sm-3">
                        <span class="text-primary text-uppercase small font-weight-bold">Alamat</span>
                        <p class="font-weight-bold h5 mt-1">{{ $sj->alamat }}</p>
                    </div>
                    <div class="col-sm-3">
                        <span class="text-primary text-uppercase small font-weight-bold">Nomor Kendaraan</span>
                        <p class="font-weight-bold h5 mt-1">{{ $sj->nomor_kendaraan ?? '-' }}</p>
                    </div>
                </div>
            </div>

            <div class="table-responsive rounded-app border shadow-app bg-white">
                <table class="table table-sm table-app mb-0">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Barang</th>
                            <th>Harga/Kg</th>
                            <th>Jml Sak</th>
                            <th>Total KG</th>
                            <th class="text-center">Opsi</th>
                        </tr>
                    </thead>
                    <tbody>
                        @php
                            $no = 1;
                        @endphp
                        @foreach ($list as $item)
                            <tr>
                                <th class="font-weight-bold">{{ $no++ }}</th>
                                <td class="font-weight-bold">{{ $item->produk }} ({{ $item->kemasan }}Kg)</td>
                                <td>Rp {{ number_format($item->harga, 0, ',', '.') }}</td>
                                <td>{{ $item->jml_sak }}</td>
                                <td class="font-weight-bold">{{ number_format($item->total_kg, 0, ',', '.') }} kg</td>
                                <td>
                                    <div class="d-flex align-items-center justify-content-center">
                                        @if (!$ls || $ls->status != 1 || session('level') == 'super admin')
                                            <button class="btn btn-sm btn-red" title="Hapus"
                                                data-toggle="modal" data-target="#my_modalhapus_{{ $item->id }}">
                                                <i class="fas fa-trash"></i>
                                            </button>
                                        @else
                                            <span class="text-muted" title="Surat jalan sudah disetujui"><i class="fas fa-lock"></i></span>
                                        @endif
                                    </div>
                                </td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>

                @foreach ($list as $item)
                <div class="modal fade modal-app" id="my_modalhapus_{{ $item->id }}" tabindex="-1" role="dialog">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="modal-header border-0 pb-0">
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div class="modal-body text-center py-4">
                                <div class="delete-icon-wrap">
                                    <i class="fas fa-trash"></i>
                                </div>
                                <h3 class="font-weight-bold">Hapus data</h3>
                                <p class="text-muted mt-2">Apakah anda ingin menghapus data ini?</p>
                            </div>
                            <form action="{{ route('listsuratjalan.delete', $item->id) }}" method="post">
                                @method('delete')
                                @csrf
                                <div class="modal-footer border-0">
                                    <button type="button" class="btn btn-soft-border flex-fill" data-dismiss="modal">Batal</button>
                                    <button class="btn btn-red flex-fill">Hapus</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                @endforeach

                <div class="p-4 border-top">
                    <div class="bg-grad-lblue rounded-app p-3 border d-flex justify-content-between align-items-center mb-3">
                        <span class="text-muted font-weight-bold">Total KG</span>
                        <h3 class="h3 font-weight-bold text-primary mb-0">{{ number_format($total, 0, ',', '.') }} kg</h3>
                    </div>

                    <div class="d-flex flex-wrap">
                        @if($ls && $ls->status == 1)
                            <a href="/review-sj/{{ $sj->no_sj }}" class="btn btn-blue mr-2 mb-1">
                                <i class="fas fa-print"></i> Cetak Surat Jalan
                            </a>
                        @endif
                        <button type="button" class="btn btn-purple mr-2 mb-1" data-toggle="modal" data-target="#reviewModalSJ">
                            <i class="fas fa-eye"></i> Review
                        </button>
                        @if(session('level') == 'super admin')
                            <a href="/statusesj/{{ $sj->no_sj }}" class="btn btn-warning mr-2 mb-1"><i class="fas fa-circle-check"></i> Update status</a>
                        @endif
                    </div>
                </div>
            </div>
        @endif

        <div class="modal fade modal-app" id="reviewModalSJ" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-dialog-centered modal-lg" role="document" style="max-width:1100px">
                <div class="modal-content p-0">
                    <div class="modal-header border-0 pb-0">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                    </div>
                    <div class="modal-body overflow-auto" style="max-height:80vh">
                        @include('admin.review-sj-content', ['inv' => $list, 'cs' => $sj, 'grand_total' => $total, 'nama_setujui' => isset($ls->userSetujui) ? ucwords(strtolower($ls->userSetujui->nama ?: $ls->userSetujui->username)) : ''])
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
