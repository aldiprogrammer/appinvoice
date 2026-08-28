@extends('layout.template')
@section('content')
    <div class="card-app p-4">
        <div class="d-flex align-items-center justify-content-between mb-4">
            <div>
                <h1 class="page-title">Edit Invoice</h1>
                <p class="page-subtitle">Ubah data invoice</p>
            </div>
        </div>

        <div class="row">
            <div class="col-lg-6 mb-3 mb-lg-0">
                <div class="bg-grad-lblue rounded-app p-4 border">
                    <h5 class="h5 font-weight-bold mb-3 d-flex align-items-center">
                        <i class="fas fa-edit text-primary mr-2"></i>
                        Form Invoice {{ $ls->kode }}
                    </h5>
                    <form action="{{ route('listinvoice.update', $ls->id) }}" method="post">
                        @csrf
                        @method('put')

                        <div class="row">
                            <div class="col-md-6">
                                <div class="fld">
                                    <div class="fld-legend">Kode Invoice</div>
                                    <input type="text" class="form-control" name="kode_invoice"
                                        value="{{ $ls->kode_invoice }}" required />
                                </div>
                            </div>

                            <div class="col-md-6">
                                <div class="fld">
                                    <div class="fld-legend">No.Po</div>
                                    <input type="text" class="form-control" name="no_po" value="{{ $ls->no_po }}"
                                        required />
                                </div>
                            </div>

                            <div class="col-md-6">
                                <div class="fld">
                                    <div class="fld-legend">Customer</div>
                                    <select class="form-control select2" name="customer" id="customer" required>
                                        <option value="" disabled>Pilih Customer</option>
                                        @foreach ($customer as $item)
                                            <option value="{{ $item->id }}" {{ $ls->id_customer == $item->id ? 'selected' : '' }}>
                                                {{ $item->nama }}
                                            </option>
                                        @endforeach
                                    </select>
                                </div>
                            </div>

                            <div class="col-12">
                                <div class="fld">
                                    <div class="fld-legend">Alamat</div>
                                    <textarea name="alamat" id="alamat" class="form-control" rows="3" required>{{ $ls->customernew->alamat }}</textarea>
                                </div>
                            </div>

                            <div class="col-md-6">
                                <div class="fld">
                                    <div class="fld-legend">Produk</div>
                                    <select class="form-control" name="produk" id="produk" required>
                                        <option value="{{ $ls->produknew->id }}">{{ $ls->produk }} -
                                            {{ $ls->kemasan }}kg ({{ $ls->produknew->kualitas }})</option>
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
                                    <div class="fld-legend">Harga/kg</div>
                                    <input type="text" value="{{ $ls->produknew->harga }}" class="form-control"
                                        name="harga" id="harga" required />
                                    <input type="hidden" id="kemasan" value="{{ $ls->produknew->kemasan }}" />
                                </div>
                            </div>

                            <div class="col-md-6">
                                <div class="fld">
                                    <div class="fld-legend">Jumlah Sak</div>
                                    <input type="number" class="form-control" value="{{ $ls->jml_sak }}" name="jml_sak"
                                        id="sak" required />
                                </div>
                            </div>

                            <div class="col-md-6">
                                <div class="fld">
                                    <div class="fld-legend">Total KG</div>
                                    <input type="text" class="form-control" value="{{ $ls->kemasan * $ls->jml_sak }}"
                                        name="total_kg" id="totalkg" required />
                                </div>
                            </div>

                            <div class="col-md-6">
                                <div class="fld">
                                    <div class="fld-legend">Total Harga</div>
                                    <input type="text" class="form-control" name="total_harga" id="total" required
                                        value="{{ $ls->total_harga }}" />
                                </div>
                            </div>

                            <div class="col-12">
                                <div class="fld">
                                    <div class="fld-legend">Harga Tambahan</div>
                                    <input type="number" value="{{ $ls->harga_tambahan }}" class="form-control" name="harga_tambahan" />
                                </div>
                                <small class="text-muted">Masukan harga tambahan jika diperlukan</small>
                            </div>
                        </div>

                        <div class="row mt-4">
                            <div class="col-6">
                                <button class="btn btn-blue btn-block"><i class="fas fa-save"></i> Edit data</button>
                            </div>
                            <div class="col-6">
                                <a href="/listinvoice/{{ $ls->kode }}" class="btn btn-gray btn-block"><i class="fas fa-arrow-left"></i> Kembali</a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div class="col-lg-6">
                <div class="bg-grad-lblue rounded-app p-4 border">
                    <h5 class="h5 font-weight-bold mb-3 d-flex align-items-center">
                        <i class="fas fa-file-invoice text-primary mr-2"></i>
                        Preview Invoice
                    </h5>

                    @php
                        $grouped = $list->groupBy('kode_invoice');
                    @endphp

                    @foreach ($grouped as $kodeInv => $items)
                        @php $first = $items->first(); @endphp
                        <div class="bg-white rounded-app p-3 border shadow-sm mb-3">
                            <div class="row text-sm mb-3">
                                <div class="col-6">
                                    <span class="text-primary text-uppercase small font-weight-bold">Kode Invoice</span>
                                    <p class="font-weight-bold text-primary font-weight-bold">{{ $kodeInv }}</p>
                                </div>
                                <div class="col-6 text-right">
                                    <span class="text-primary text-uppercase small font-weight-bold">No Po</span>
                                    <p class="font-weight-bold">{{ $first->no_po }}</p>
                                </div>
                                <div class="col-12">
                                    <span class="text-primary text-uppercase small font-weight-bold">Customer</span>
                                    <p class="font-weight-bold">{{ $first->customernew->nama ?? $first->customer }}</p>
                                </div>
                            </div>

                            <div class="table-responsive rounded-app border">
                                <table class="table table-sm table-app mb-0">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Barang</th>
                                            <th>Harga/Kg</th>
                                            <th>Jml Sak</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        @foreach ($items as $i => $item)
                                            <tr class="{{ $item->id == $ls->id ? 'table-warning font-weight-bold' : '' }}">
                                                <td class="font-weight-bold">{{ $i + 1 }}</td>
                                                <td>{{ $item->produk }} ({{ $item->kemasan }}Kg)</td>
                                                <td>Rp {{ number_format($item->harga, 0, ',', '.') }}</td>
                                                <td>{{ $item->jml_sak }}</td>
                                                <td class="font-weight-bold">Rp {{ number_format($item->total_harga, 0, ',', '.') }}</td>
                                            </tr>
                                        @endforeach
                                    </tbody>
                                </table>
                            </div>

                            <div class="d-flex justify-content-end mt-3">
                                <div class="bg-grad-lblue rounded-app px-3 py-2 border">
                                    <span class="text-muted small font-weight-bold">Total Harga: </span>
                                    <span class="h5 font-weight-bold text-primary">Rp {{ number_format($total, 0, ',', '.') }}</span>
                                </div>
                            </div>
                        </div>
                    @endforeach
                </div>
            </div>
        </div>
    </div>
@push('scripts')
    <script>
        $(document).ready(function() {
            function hitungTotal() {
                var harga = parseInt($('#harga').val().replace(/\./g, '')) || 0;
                var sak = parseInt($('#sak').val()) || 0;
                var kemasan = parseInt($('#kemasan').val()) || 0;
                var totalkg = sak * kemasan;
                var total = harga * sak * kemasan;
                $('#totalkg').val(totalkg);
                $('#total').val(total);
            }

            $('#produk').change(function() {
                var id = $(this).val();
                if (id) {
                    $.get('/produk/' + id, function(data) {
                        $('#harga').val(data.harga);
                        $('#kemasan').val(data.kemasan);
                        hitungTotal();
                    });
                }
            });

            $('#harga').on('keyup', hitungTotal);
            $('#sak').on('keyup', hitungTotal);
        });
    </script>
@endpush
@endsection
