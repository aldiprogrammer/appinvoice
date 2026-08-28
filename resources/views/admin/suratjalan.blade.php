@extends('layout.template')
@section('content')
    <div class="card-app p-4">
        <div class="d-flex align-items-center justify-content-between mb-4">
            <div>
                <h1 class="page-title">Surat Jalan</h1>
                <p class="page-subtitle">Buat surat jalan baru</p>
            </div>
        </div>

        <div class="row">
            <div class="col-lg-6 mb-3 mb-lg-0">
                <div class="bg-grad-lblue rounded-app p-4 border">
                    <h5 class="h5 font-weight-bold mb-3 d-flex align-items-center">
                        <i class="fas fa-truck text-primary mr-2"></i>
                        Form Surat Jalan #{{ $no_sj }}
                    </h5>
                    <form action="{{ route('suratjalan.create') }}" method="post">
                        @csrf
                        <input type="hidden" value="{{ $no_sj }}" name="no_sj">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="fld">
                                    <div class="fld-legend">No Surat Jalan</div>
                                    <input type="text" class="form-control" value="{{ $no_sj }}" readonly />
                                </div>
                            </div>

                            <div class="col-md-6">
                                <div class="fld">
                                    <div class="fld-legend">Customer</div>
                                    <select class="form-control select2" name="customer" id="customer" required>
                                        <option value="" disabled {{ $listkode ? '' : 'selected' }}>Pilih Customer</option>
                                        @foreach ($customer as $item)
                                            <option value="{{ $item->id }}" {{ $listkode && $listkode->id_customer == $item->id ? 'selected' : '' }}>
                                                {{ $item->nama }}
                                            </option>
                                        @endforeach
                                    </select>
                                </div>
                            </div>

                            <div class="col-12">
                                <div class="fld">
                                    <div class="fld-legend">Alamat</div>
                                    <textarea name="alamat" id="alamat" class="form-control" rows="3" required>{{ $listkode == true ? $listkode->customernew->alamat : '' }}</textarea>
                                </div>
                            </div>

                            <div class="col-md-6">
                                <div class="fld">
                                    <div class="fld-legend">Produk</div>
                                    <select class="form-control" name="produk" id="produk" required>
                                        <option disabled selected> Pilih Produk</option>
                                        @foreach ($produk as $item)
                                            <option value="{{ $item->id }}">{{ $item->produk }} -
                                                {{ $item->kemasan }}kg ({{ $item->kualitas }})
                                            </option>
                                        @endforeach
                                    </select>
                                </div>
                            </div>

                            <div class="col-md-6">
                                <div class="fld">
                                    <div class="fld-legend">Kemasan</div>
                                    <input type="text" class="form-control" readonly name="kemasan" id="kemasan"
                                        required />
                                </div>
                            </div>

                            <div class="col-md-6">
                                <div class="fld">
                                    <div class="fld-legend">Harga/kg</div>
                                    <input type="text" class="form-control" name="harga" id="harga" required />
                                </div>
                            </div>

                            <div class="col-md-6">
                                <div class="fld">
                                    <div class="fld-legend">Jumlah Sak</div>
                                    <input type="number" class="form-control" name="jml_sak" id="sak" required />
                                </div>
                            </div>

                            <div class="col-md-6">
                                <div class="fld">
                                    <div class="fld-legend">Total KG</div>
                                    <input type="text" class="form-control" readonly name="total_kg" id="totalkg"
                                        required />
                                </div>
                            </div>
                        </div>

                        <div class="row mt-4">
                            <div class="col-6">
                                <button class="btn btn-blue btn-block"><i class="fas fa-plus"></i> Tambah data</button>
                            </div>
                            <div class="col-6">
                                <a href="{{ route('suratjalan') }}" class="btn btn-gray btn-block"><i class="fas fa-sync-alt"></i> Refresh</a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <div class="col-lg-6">
                <div class="bg-grad-lblue rounded-app p-4 border">
                    <h5 class="h5 font-weight-bold mb-3 d-flex align-items-center">
                        <i class="fas fa-list text-primary mr-2"></i>
                        Daftar Item
                    </h5>
                    <div class="table-responsive rounded-app border shadow-app bg-white">
                        @if ($listkode != false)
                            <div class="px-3 py-2 bg-grad-lblue border-bottom">
                                <div class="row text-sm">
                                    <div class="col-6 font-weight-bold">
                                        <span class="text-primary">NO SJ :</span>
                                        <span class="text-primary font-weight-bold">{{ $listkode->no_sj }}</span>
                                    </div>
                                    <div class="col-6 font-weight-bold text-right">
                                        <span class="text-primary">TANGGAL :</span>
                                        <span>{{ $listkode->tanggal }}</span>
                                    </div>
                                    <div class="col-12 text-muted small">
                                        Customer : <span class="font-weight-bold">{{ $listkode->customer }}</span>
                                    </div>
                                </div>
                            </div>
                        @endif
                        <table class="table table-sm table-app mb-0">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Barang</th>
                                    <th>Jml sak</th>
                                    <th>Harga</th>
                                    <th>Total kg</th>
                                    <th class="text-center">Opsi</th>
                                </tr>
                            </thead>
                            <tbody>
                                @php
                                    $no = 1;
                                @endphp
                                @foreach ($sj as $item)
                                    <tr>
                                        <td class="font-weight-bold">{{ $no++ }}</td>
                                        <td class="font-weight-bold">
                                            {{ $item->produknew->produk . '-' . $item->produknew->kemasan . 'Kg' }}
                                        </td>
                                        <td>{{ $item->jml_sak }}</td>
                                        <td>Rp {{ number_format($item->harga, 0, ',', '.') }}</td>
                                        <td>{{ $item->total_kg }} kg</td>
                                        <td>
                                            <div class="d-flex justify-content-center">
                                                <button type="button" class="btn btn-sm btn-red" data-toggle="modal" data-target="#my_modalhapus_{{ $item->id }}">Hapus</button>
                                            </div>
                                        </td>
                                    </tr>
                                @endforeach
                            </tbody>
                        </table>
                    </div>

                    @foreach ($sj as $item)
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
                                <form action="{{ route('suratjalan.delete', $item->id) }}" method="post">
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

                    <div class="mt-4">
                        @if ($listkode == true)
                            <div class="bg-white rounded-app p-3 border shadow-sm mb-3">
                                <div class="d-flex justify-content-between align-items-center">
                                    <span class="text-muted small">Total KG</span>
                                    <h3 class="h5 font-weight-bold text-primary mb-0">{{ number_format($total, 0, ',', '.') }} kg</h3>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-12">
                                    <button class="btn btn-green btn-block" data-toggle="modal" data-target="#my_modalsimpan">
                                        <i class="fas fa-save"></i> SIMPAN
                                    </button>
                                </div>
                            </div>
                        @endif
                    </div>
                </div>
            </div>
        </div>
    </div>

    @if ($listkode == true)
    <div class="modal fade modal-app" id="my_modalsimpan" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header border-0 pb-0">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <div class="modal-body text-center py-4">
                    <div class="d-flex align-items-center justify-content-center mb-3">
                        <div class="delete-icon-wrap" style="background:#d1fae5">
                            <i class="fas fa-save" style="color:#059669"></i>
                        </div>
                    </div>
                    <h3 class="font-weight-bold">Simpan Surat Jalan</h3>
                    <p class="text-muted mt-2">Apakah anda ingin menyimpan surat jalan ini?</p>
                </div>
                <form action="{{ route('suratjalan.simpan') }}" method="post">
                    @method('post')
                    @csrf
                    <input type="hidden" name="no_sj" value="{{ $listkode->no_sj }}">
                    <input type="hidden" name="status_cetak" value="0">
                    <div class="modal-footer border-0">
                        <button type="button" class="btn btn-soft-border flex-fill" data-dismiss="modal">Batal</button>
                        <button class="btn btn-green flex-fill">Simpan</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    @endif
@endsection
