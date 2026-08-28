@extends('layout.template')

@push('styles')
    <link rel="stylesheet" href="https://cdn.datatables.net/2.1.8/css/dataTables.bootstrap4.css" />
@endpush

@section('content')
    <div class="card-app p-4">
        <div class="d-flex align-items-center justify-content-between mb-4">
            <div>
                <h1 class="page-title">List Invoice</h1>
                <p class="page-subtitle">Semua data invoice tersimpan</p>
            </div>
        </div>

        <div class="table-responsive">
            <table id="listinvoiceTable" class="table table-sm table-app mt-2">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Kode Invoice</th>
                        <th>No Po</th>
                        <th>Customer</th>
                        <th>Pengguna</th>
                        <th>Tanggal</th>
                        <th>S.Cetak</th>
                        <th>Status</th>
                        <th>Disetujui</th>
                        <th class="text-center">Opsi</th>
                    </tr>
                </thead>
                <tbody>
                    @php
                        $no = 1;
                    @endphp
                    @forelse ($list as $item)
                        <tr>
                            <th class="font-weight-bold">{{ $no++ }}</th>
                            <td class="font-weight-bold">{{ $item->kode_invoice }}</td>
                            <td>{{ $item->no_po }}</td>
                            <td>{{ $item->inv->customer ?? '-' }}</td>
                            <td>{{ $item->user->username ?? '-' }}</td>
                            <td>{{ $item->inv && $item->inv->tanggal ? \Carbon\Carbon::parse($item->inv->tanggal)->format('d/m/Y') : '-' }}</td>
                            <td>
                                @if ($item->status_cetak == 0)
                                    <span class="badge badge-soft-yellow">
                                        <i class="fas fa-print"></i> Belum dicetak
                                    </span>
                                @else
                                    <span class="badge badge-soft-green">
                                        <i class="fas fa-check"></i> Dicetak
                                    </span>
                                @endif
                            </td>

                              <td>
                                @if ($item->status == 0)
                                    <span class="badge badge-soft-yellow">
                                        <i class="fas fa-circle"></i> Menunggu
                                    </span>
                                @else
                                    <span class="badge badge-soft-green">
                                        <i class="fas fa-check"></i> Disetujui
                                    </span>
                                @endif
                            </td>
                            <td>{{ $item->userSetujui->username ?? '-' }}</td>
                            <td>
                                <div class="d-flex align-items-center justify-content-center">
                                    <a href="/listinvoice/{{ $item->inv->kode ?? $item->kode }}" class="btn btn-sm btn-blue mr-1">
                                        <i class="fas fa-eye"></i>
                                    </a>
                                    @if ($item->status != 1 || session('level') == 'super admin')
                                        <button class="btn btn-sm btn-red"
                                            data-toggle="modal" data-target="#my_modalhapus_{{ $item->id }}"><i class="fas fa-trash"></i></button>
                                    @endif
                                </div>
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="10" class="text-center py-10">
                                <div class="d-flex flex-column align-items-center">
                                    <div class="d-flex align-items-center justify-content-center mb-3" style="width:64px;height:64px;border-radius:50%;background:#f3f4f6">
                                        <i class="fas fa-file-invoice text-muted"></i>
                                    </div>
                                    <p class="text-muted font-weight-bold">Belum ada data invoice</p>
                                    <a href="/invoice" class="btn btn-sm btn-blue mt-2">Buat Invoice Baru</a>
                                </div>
                            </td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </div>

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
                    <h3 class="font-weight-bold">Hapus Invoice</h3>
                    <p class="text-muted mt-2">Apakah anda yakin ingin menghapus invoice ini?</p>
                    <p class="font-weight-bold h5 mt-1">{{ $item->kode_invoice }}</p>
                </div>
                <form action="{{ route('listinvoice2.delete2', $item->id) }}" method="post">
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
@push('scripts')
    <script src="https://cdn.datatables.net/2.1.8/js/dataTables.js"></script>
    <script src="https://cdn.datatables.net/2.1.8/js/dataTables.bootstrap4.js"></script>
    <script>
        $(document).ready(function() {
            $('#listinvoiceTable').DataTable({
                paging: true,
                searching: true,
                info: true,
                order: [],
                columnDefs: [{
                    targets: 9,
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
