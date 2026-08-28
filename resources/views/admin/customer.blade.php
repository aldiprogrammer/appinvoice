@extends('layout.template')

@push('styles')
    <link rel="stylesheet" href="https://cdn.datatables.net/2.1.8/css/dataTables.dataTables.css" />
@endpush

@section('content')
    <div class="card-app p-4">
        <div class="d-flex flex-column flex-sm-row align-items-sm-center justify-content-between mb-4">
            <div>
                <h1 class="page-title">Data Customer</h1>
                <p class="page-subtitle">Kelola data pelanggan</p>
            </div>
            <button class="btn btn-blue" data-toggle="modal" data-target="#modalTambah">
                <i class="fas fa-plus"></i> Tambah Customer
            </button>

            <div class="modal fade modal-app" id="modalTambah">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <div class="d-flex align-items-center">
                                <div class="d-flex align-items-center justify-content-center mr-3" style="width:40px;height:40px;border-radius:8px;background:#3b82f6;">
                                    <i class="fas fa-user-plus text-white"></i>
                                </div>
                                <div>
                                    <h5 class="font-weight-bold mb-0">Tambah Customer</h5>
                                    <small class="text-muted">Masukkan data customer baru</small>
                                </div>
                            </div>
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                        </div>
                        <form action="{{ route('customer.store') }}" method="post">
                            @csrf
                            <div class="modal-body">
                                <div class="form-group">
                                    <label>Customer</label>
                                    <input type="text" placeholder="Nama customer" name="nama" required class="form-control kapital" />
                                </div>

                                <div class="form-group">
                                    <label>Singkatan</label>
                                    <input type="text" placeholder="Singkatan nama" name="singkatan" required class="form-control kapital" />
                                </div>

                                <div class="form-group">
                                    <label>Alamat</label>
                                    <input type="text" placeholder="Alamat" name="alamat" id="alamat" required class="form-control kapital" />
                                </div>

                                <div class="form-group">
                                    <label>No Hp</label>
                                    <input type="number" placeholder="No hp" name="nohp" required class="form-control" maxlength="13" />
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
            <table id="customerTable" class="table table-app">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Nama</th>
                        <th>Singkatan</th>
                        <th>No Hp</th>
                        <th>Alamat</th>
                        <th class="text-center">Opsi</th>
                    </tr>
                </thead>
                <tbody>
                    @php
                        $no = 1;
                    @endphp
                    @foreach ($customer as $item)
                        <tr>
                            <th class="font-weight-medium">{{ $no++ }}</th>
                            <td class="font-weight-bold">{{ $item->nama }}</td>
                            <td><span class="badge badge-soft-blue">{{ $item->singkatan }}</span></td>
                            <td>{{ $item->nohp }}</td>
                            <td class="text-truncate" style="max-width:250px">{{ $item->alamat }}</td>
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

        @foreach ($customer as $item)
            <div class="modal fade modal-app" id="modaledit_{{ $item->id }}">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <div class="d-flex align-items-center">
                                <div class="d-flex align-items-center justify-content-center mr-3" style="width:40px;height:40px;border-radius:8px;background:#3b82f6;">
                                    <i class="fas fa-pen text-white"></i>
                                </div>
                                <div>
                                    <h5 class="font-weight-bold mb-0">Edit Customer</h5>
                                    <small class="text-muted">Ubah data customer</small>
                                </div>
                            </div>
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                        </div>
                        <form action="{{ route('customer.update', $item->id) }}" method="post">
                            @csrf
                            @method('put')
                            <div class="modal-body">
                                <div class="form-group">
                                    <label>Nama</label>
                                    <input type="text" placeholder="Nama" name="nama" id="customer" value="{{ $item->nama }}" required class="form-control kapital" />
                                </div>

                                <div class="form-group">
                                    <label>Singkatan</label>
                                    <input type="text" placeholder="Singkatan customer" name="singkatan" id="singkatan" value="{{ $item->singkatan }}" required class="form-control kapital" />
                                </div>

                                <div class="form-group">
                                    <label>Alamat</label>
                                    <input type="text" placeholder="Alamat" name="alamat" value="{{ $item->alamat }}" required class="form-control kapital" id="alamat" />
                                </div>

                                <div class="form-group">
                                    <label>No hp</label>
                                    <input type="number" placeholder="No hp" value="{{ $item->nohp }}" name="nohp" required class="form-control" />
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
                            <h5 class="font-weight-bold">Hapus Customer</h5>
                            <p class="text-muted">Apakah anda yakin ingin menghapus data ini?</p>
                            <p class="font-weight-bold h5">{{ $item->nama }}</p>
                        </div>
                        <form action="{{ route('customer.delete', $item->id) }}" method="post">
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
            $('#customerTable').DataTable({
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
