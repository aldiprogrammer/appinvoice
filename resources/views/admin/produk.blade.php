@extends('layout.template')

@push('styles')
    <link rel="stylesheet" href="https://cdn.datatables.net/2.1.8/css/dataTables.dataTables.css" />
@endpush

@section('content')
    <div class="card-app p-4">
        <div class="d-flex flex-column flex-sm-row align-items-sm-center justify-content-between mb-4">
            <div>
                <h1 class="page-title">Data Produk</h1>
                <p class="page-subtitle">Kelola data produk</p>
            </div>
            <button class="btn btn-blue" data-toggle="modal" data-target="#modalTambah">
                <i class="fas fa-plus"></i> Tambah Produk
            </button>

            <div class="modal fade modal-app" id="modalTambah">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <div class="d-flex align-items-center">
                                <div class="d-flex align-items-center justify-content-center mr-3" style="width:40px;height:40px;border-radius:8px;background:#3b82f6;">
                                    <i class="fas fa-box text-white"></i>
                                </div>
                                <div>
                                    <h5 class="font-weight-bold mb-0">Tambah Produk</h5>
                                    <small class="text-muted">Masukkan data produk baru</small>
                                </div>
                            </div>
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                        </div>
                        <form action="{{ route('produk.store') }}" method="post">
                            @csrf
                            <div class="modal-body">
                                <div class="form-group">
                                    <label>Produk</label>
                                    <input type="text" placeholder="Produk" name="produk" required class="form-control" />
                                </div>

                                <div class="form-group">
                                    <label>Ukuran kemasan</label>
                                    <select class="form-control" name="kemasan">
                                        <option disabled selected>Ukuran kemasan</option>
                                        <option value="5">5kg</option>
                                        <option value="10">10kg</option>
                                        <option value="20">20kg</option>
                                        <option value="30">30kg</option>
                                        <option value="50">50kg</option>
                                    </select>
                                </div>

                                <div class="form-group">
                                    <label>Harga/Kg</label>
                                    <input type="number" placeholder="Harga" name="harga" required class="form-control" />
                                </div>

                                <div class="form-group">
                                    <label>Kualitas</label>
                                    <select class="form-control" name="kualitas">
                                        <option disabled selected>Pilih kualitas</option>
                                        <option>Super premium</option>
                                        <option>Premium</option>
                                        <option>Medium</option>
                                        <option>Medium LV2</option>
                                        <option>Medium LV3</option>
                                    </select>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-soft-border" data-dismiss="modal">Batal</button>
                                <button type="submit" class="btn btn-blue">Simpan</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <div class="table-responsive">
            <table id="produkTable" class="table table-app">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Produk</th>
                        <th>Kemasan</th>
                        <th>Harga/Kg</th>
                        <th>Kualitas</th>
                        <th class="text-center">Opsi</th>
                    </tr>
                </thead>
                <tbody>
                    @php
                        $no = 1;
                    @endphp
                    @foreach ($produk as $item)
                        <tr>
                            <th class="font-weight-medium">{{ $no++ }}</th>
                            <td class="font-weight-bold">{{ $item->produk }}</td>
                            <td><span class="badge badge-soft-blue">{{ $item->kemasan }} kg</span></td>
                            <td>Rp {{ number_format($item->harga, 0, ',', '.') }}</td>
                            <td>
                                @php
                                    $kualitasBg = match($item->kualitas) {
                                        'Super premium' => 'badge-soft-yellow',
                                        'Premium' => 'badge-soft-green',
                                        'Medium' => 'badge-soft-gray',
                                        'Medium LV2' => 'badge-soft-gray',
                                        'Medium LV3' => 'badge-soft-gray',
                                        default => 'badge-soft-gray'
                                    };
                                @endphp
                                <span class="badge {{ $kualitasBg }}">{{ $item->kualitas }}</span>
                            </td>

                            <td>
                                <div class="d-flex align-items-center justify-content-center">
                                    <button class="btn btn-sm btn-blue mr-1" data-toggle="modal" data-target="#modaledit_{{ $item->id }}" title="Edit"><i class="fas fa-pen"></i></button>
                                    <button class="btn btn-sm btn-red" data-toggle="modal" data-target="#modalhapus_{{ $item->id }}" title="Hapus"><i class="fas fa-trash"></i></button>
                                </div>
                            </td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </div>

        @foreach ($produk as $item)
            <div class="modal fade modal-app" id="modaledit_{{ $item->id }}">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <div class="d-flex align-items-center">
                                <div class="d-flex align-items-center justify-content-center mr-3" style="width:40px;height:40px;border-radius:8px;background:#3b82f6;">
                                    <i class="fas fa-pen text-white"></i>
                                </div>
                                <div>
                                    <h5 class="font-weight-bold mb-0">Edit Produk</h5>
                                    <small class="text-muted">Ubah data produk</small>
                                </div>
                            </div>
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                        </div>
                        <form action="{{ route('produk.update', $item->id) }}" method="post">
                            @csrf
                            @method('put')
                            <div class="modal-body">
                                <div class="form-group">
                                    <label>Produk</label>
                                    <input type="text" placeholder="Produk" value="{{ $item->produk }}" name="produk" required class="form-control" />
                                </div>

                                <div class="form-group">
                                    <label>Ukuran kemasan</label>
                                    <select class="form-control" name="kemasan">
                                        <option>{{ $item->kemasan }}</option>
                                        <option value="5">5kg</option>
                                        <option value="10">10kg</option>
                                        <option value="20">20kg</option>
                                        <option value="30">30kg</option>
                                        <option value="50">50kg</option>
                                    </select>
                                </div>

                                <div class="form-group">
                                    <label>Harga/Kg</label>
                                    <input type="number" value="{{ $item->harga }}" placeholder="Harga" name="harga" required class="form-control" />
                                </div>

                                <div class="form-group">
                                    <label>Kualitas</label>
                                    <select class="form-control" name="kualitas">
                                        <option>{{ $item->kualitas }}</option>
                                        <option>Super premium</option>
                                        <option>Premium</option>
                                        <option>Medium</option>
                                        <option>Medium LV2</option>
                                        <option>Medium LV3</option>
                                    </select>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-soft-border" data-dismiss="modal">Batal</button>
                                <button type="submit" class="btn btn-blue">Simpan Perubahan</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div class="modal fade modal-app" id="modalhapus_{{ $item->id }}">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-body text-center py-4">
                            <div class="delete-icon-wrap">
                                <i class="fas fa-trash"></i>
                            </div>
                            <h5 class="font-weight-bold">Hapus Produk</h5>
                            <p class="text-muted">Apakah anda yakin ingin menghapus data ini?</p>
                            <p class="font-weight-bold h5">{{ $item->produk }}</p>
                        </div>
                        <form action="{{ route('produk.delete', $item->id) }}" method="post">
                            @method('delete')
                            @csrf
                            <div class="modal-footer">
                                <button type="button" class="btn btn-soft-border" data-dismiss="modal">Batal</button>
                                <button class="btn btn-red">Hapus</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        @endforeach
    </div>
@push('scripts')
    <script src="https://cdn.datatables.net/2.1.8/js/dataTables.js"></script>
    <script>
        $(document).ready(function() {
            $('#produkTable').DataTable({
                paging: true,
                searching: true,
                info: true,
                order: [],
                columnDefs: [{
                    targets: 5,
                    orderable: false
                }],
                language: {
                    search: "Cari:",
                    lengthMenu: "Tampilkan _MENU_ data",
                    zeroRecords: "Data tidak ditemukan",
                    info: "Menampilkan _START_ s/d _END_ dari _TOTAL_ data",
                    infoEmpty: "Menampilkan 0 s/d 0 dari 0 data",
                    infoFiltered: "(difilter dari _MAX_ total data)",
                    paginate: {
                        first: "Pertama",
                        last: "Terakhir",
                        next: "Selanjutnya",
                        previous: "Sebelumnya"
                    }
                }
            });
        });
    </script>
@endpush
@endsection
