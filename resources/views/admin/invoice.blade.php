@extends('layout.template')
@section('content')
    <div class="card-app p-4">
        <div class="d-flex align-items-center justify-content-between mb-4">
            <div>
                <h1 class="page-title">Cetak Invoice</h1>
                <p class="page-subtitle">Buat invoice baru</p>
            </div>
        </div>

        <div class="row">
            <div class="col-lg-6 mb-3 mb-lg-0">
                <div class="bg-grad-lblue rounded-app p-4 border">
                    <h5 class="h5 font-weight-bold mb-3 d-flex align-items-center">
                        <i class="fas fa-file-invoice text-primary mr-2"></i>
                        Form Invoice #{{ $kode }}
                    </h5>
                    <form action="{{ route('invoice.create') }}" method="post">
                        @csrf
                        <input type="hidden" value="{{ $kode }}" name="kode">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="fld">
                                    <div class="fld-legend">No.Po</div>
                                    <input type="text" class="form-control" name="no_po"
                                        value="{{ $listkode == true ? $listkode->no_po : '' }}" required />
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
                                    <div class="fld-legend">Kode Invoice</div>
                                    <input type="text" class="form-control" name="kode_invoice"
                                        value="{{ $listkode == true ? $listkode->kode_invoice : '' }}" required
                                        id="kodeinv" />
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

                            <div class="col-md-6">
                                <div class="fld">
                                    <div class="fld-legend">Total Harga</div>
                                    <input type="text" class="form-control" name="total_harga" id="total"
                                        required />
                                </div>
                            </div>

                            <div class="col-12">
                                <div class="fld">
                                    <div class="fld-legend">Harga Tambahan</div>
                                    <input type="number" value="0" class="form-control" name="harga_tambahan" />
                                </div>
                                <small class="text-muted">Masukan harga tambahan jika diperlukan</small>
                            </div>
                        </div>

                        <div class="row mt-4">
                            <div class="col-6">
                                <button class="btn btn-blue btn-block"><i class="fas fa-plus"></i> Tambah data</button>
                            </div>
                            <div class="col-6">
                                <a href="" class="btn btn-gray btn-block"><i class="fas fa-sync-alt"></i> Refresh</a>
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
                                        <span class="text-primary">KODE :</span>
                                        <span class="text-primary font-weight-bold">{{ $listkode->kode_invoice }}</span>
                                    </div>
                                    <div class="col-6 font-weight-bold text-right">
                                        <span class="text-primary">PO :</span>
                                        <span>{{ $listkode->no_po }}</span>
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
                                    <th>Total Harga</th>
                                    <th class="text-center">Opsi</th>
                                </tr>
                            </thead>
                            <tbody>
                                @php
                                    $no = 1;
                                @endphp
                                @foreach ($invoice as $item)
                                    <tr>
                                        <td class="font-weight-bold">{{ $no++ }}</td>
                                        <td class="font-weight-bold">
                                            {{ $item->produknew->produk . '-' . $item->produknew->kemasan . 'Kg' }}
                                        </td>
                                        <td>{{ $item->jml_sak }}</td>
                                        <td>Rp {{ number_format($item->harga, 0, ',', '.') }}</td>
                                        <td>{{ $item->jml_sak * $item->kemasan }} kg</td>
                                        <td class="font-weight-bold">Rp {{ number_format($item->total_harga, 0, ',', '.') }}</td>
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

                    @foreach ($invoice as $item)
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
                                <form action="{{ route('invoice.delete', $item->id) }}" method="post">
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
                                    <span class="text-muted small">Total Harga</span>
                                    <h3 class="h5 font-weight-bold text-primary mb-0">Rp
                                        {{ number_format($total, 0, ',', '.') }}
                                    </h3>
                                </div>
                            </div>
                            <div class="row">
                                @if(session('level') == 'super admin')
                                <div class="col-6">
                                    <button class="btn btn-blue btn-block" data-toggle="modal" data-target="#my_modalcetak">
                                        <i class="fas fa-print"></i> CETAK INVOICE
                                    </button>
                                </div>
                                @endif
                                <div class="col-6">
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
                    <h3 class="font-weight-bold">Simpan invoice</h3>
                    <p class="text-muted mt-2">Apakah anda ingin menyimpan invoice ini?</p>
                </div>
                <form action="{{ route('listinvoice.create') }}" method="post">
                    @method('post')
                    @csrf
                    <input type="hidden" name="kode" value="{{ $listkode->kode }}">
                    <input type="hidden" value="{{ $listkode->kode_invoice }}" name="kode_invoice">
                    <input type="hidden" value="{{ $listkode->no_po }}" name="no_po">
                    <input type="hidden" name="status_cetak" value="0">
                    <div class="modal-footer border-0">
                        <button type="button" class="btn btn-soft-border flex-fill" data-dismiss="modal">Batal</button>
                        <button class="btn btn-green flex-fill">Simpan</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <div class="modal fade modal-app" id="my_modalcetak" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header border-0 pb-0">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <div class="modal-body text-center py-4">
                    <div class="d-flex align-items-center justify-content-center mb-3">
                        <div class="delete-icon-wrap" style="background:#eff6ff">
                            <i class="fas fa-print" style="color:#3b82f6"></i>
                        </div>
                    </div>
                    <h3 class="font-weight-bold">Cetak invoice</h3>
                    <p class="text-muted mt-2">Apakah anda ingin mencetak invoice ini?</p>
                </div>
                <form action="{{ route('listinvoice.create') }}" method="post">
                    @csrf
                    <input type="hidden" name="kode" id="kode" value="{{ $listkode->kode }}">
                    <input type="hidden" id="kodeinv" value="{{ $listkode->kode_invoice }}" name="kode_invoice">
                    <input type="hidden" id="nopo" value="{{ $listkode->no_po }}" name="no_po">
                    <input type="hidden" name="status_cetak" value="1">
                    <div class="modal-footer border-0">
                        <button type="button" class="btn btn-soft-border flex-fill" data-dismiss="modal">Batal</button>
                        <button class="btn btn-blue flex-fill">Cetak</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    @endif
@endsection
