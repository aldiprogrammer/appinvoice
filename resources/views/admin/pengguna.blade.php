@extends('layout.template')
@section('content')
    <div class="card card-app">
        <div class="card-body">
            <div class="d-flex flex-column flex-sm-row align-items-sm-center justify-content-between mb-4">
                <div>
                    <h1 class="page-title">Data Pengguna</h1>
                    <p class="page-subtitle">Kelola pengguna sistem</p>
                </div>
                <button class="btn btn-blue" data-toggle="modal" data-target="#modalTambah">
                    <i class="fas fa-plus"></i> Tambah Pengguna
                </button>
            </div>

            <div class="modal fade modal-app" id="modalTambah" tabindex="-1" role="dialog" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header border-bottom-0 pb-0">
                            <div class="d-flex align-items-center">
                                <div class="info-icon bg-grad-blue mr-3">
                                    <i class="fas fa-user-shield text-white"></i>
                                </div>
                                <div>
                                    <h5 class="font-weight-bold mb-0">Tambah Pengguna</h5>
                                    <small class="text-muted">Masukkan data pengguna baru</small>
                                </div>
                            </div>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <form action="{{ route('pengguna.create') }}" method="post">
                            @csrf
                            <div class="modal-body">
                                <div class="form-group">
                                    <label>Username</label>
                                    <input type="text" class="form-control" placeholder="Nama" name="username" required>
                                </div>
                                <div class="form-group">
                                    <label>Nama</label>
                                    <input type="text" class="form-control" placeholder="Nama lengkap" name="nama">
                                </div>
                                <div class="form-group">
                                    <label>Password</label>
                                    <input type="password" class="form-control" placeholder="Password" name="password" required>
                                </div>
                                <div class="form-group">
                                    <label>Level</label>
                                    <select name="level" class="form-control">
                                        <option value="">-- Pilih level --</option>
                                        <option value="super admin">Super admin</option>
                                        <option value="admin">Admin</option>
                                        <option value="staff">Staff</option>
                                    </select>
                                </div>
                            </div>
                            <div class="modal-footer border-top-0 pt-0">
                                <button type="button" class="btn btn-gray" data-dismiss="modal">Batal</button>
                                <button type="submit" class="btn btn-blue">Simpan</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div class="table-responsive rounded-app shadow-app">
                <table class="table table-app mb-0">
                    <thead>
                        <tr>
                            <th class="align-middle">No</th>
                            <th class="align-middle">Username</th>
                            <th class="align-middle">Nama</th>
                            <th class="align-middle">Level</th>
                            <th class="text-center align-middle">Opsi</th>
                        </tr>
                    </thead>
                    <tbody>
                        @php
                            $no = 1;
                        @endphp
                        @foreach ($user as $item)
                            <tr class="hover-lift">
                                <th class="font-weight-normal align-middle" scope="row">{{ $no++ }}</th>
                                <td class="font-weight-bold align-middle">
                                    <div class="d-flex align-items-center">
                                        <div class="rounded-circle d-flex align-items-center justify-content-center mr-2" style="width:32px;height:32px;background:#dbeafe;">
                                            <i class="fas fa-user text-primary fa-xs"></i>
                                        </div>
                                        {{ $item->username }}
                                    </div>
                                </td>
                                <td class="align-middle">{{ $item->nama ?? '-' }}</td>
                                <td class="align-middle">
                                    @if ($item->level == 'super admin')
                                        <span class="badge badge-soft-yellow">
                                            <i class="fas fa-crown"></i> Super Admin
                                        </span>
                                    @elseif($item->level == 'admin')
                                        <span class="badge badge-soft-green">
                                            <i class="fas fa-user"></i> Admin
                                        </span>
                                    @else
                                        <span class="badge badge-soft-danger">
                                            <i class="fas fa-users"></i> Staff
                                        </span>
                                    @endif
                                </td>
                                <td class="align-middle">
                                    <div class="d-flex justify-content-center">
                                        <button class="btn btn-sm btn-blue mr-1" data-toggle="modal" data-target="#modaledit_{{ $item->id }}" title="Edit">
                                            <i class="fas fa-pen"></i>
                                        </button>
                                        <button class="btn btn-sm btn-red" data-toggle="modal" data-target="#modalhapus_{{ $item->id }}" title="Hapus">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    @foreach ($user as $item)
    <div class="modal fade modal-app" id="modaledit_{{ $item->id }}" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header border-bottom-0 pb-0">
                    <div class="d-flex align-items-center">
                        <div class="info-icon bg-grad-blue mr-3">
                            <i class="fas fa-pen text-white"></i>
                        </div>
                        <div>
                            <h5 class="font-weight-bold mb-0">Edit Pengguna</h5>
                            <small class="text-muted">Ubah data pengguna</small>
                        </div>
                    </div>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form action="{{ route('pengguna.update', $item->id) }}" method="post">
                    @csrf
                    @method('put')
                    <div class="modal-body">
                        <div class="form-group">
                            <label>Username</label>
                            <input type="text" class="form-control" placeholder="Nama" name="username" required value="{{ $item->username }}">
                        </div>
                        <div class="form-group">
                            <label>Nama</label>
                            <input type="text" class="form-control" placeholder="Nama lengkap" name="nama" value="{{ $item->nama }}">
                        </div>
                        <div class="form-group">
                            <label>New Password</label>
                            <input type="password" class="form-control" placeholder="Password" name="password" required value="">
                        </div>
                        <div class="form-group">
                            <label>Level</label>
                            <select name="level" class="form-control">
                                <option value="{{ $item->level }}">{{ $item->level }}</option>
                                <option value="admin">Admin</option>
                                <option value="super admin">Super admin</option>
                            </select>
                        </div>
                    </div>
                    <div class="modal-footer border-top-0 pt-0">
                        <button type="button" class="btn btn-gray" data-dismiss="modal">Batal</button>
                        <button type="submit" class="btn btn-blue">Simpan Perubahan</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <div class="modal fade modal-app" id="modalhapus_{{ $item->id }}" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-body text-center py-4">
                    <div class="delete-icon-wrap mx-auto mb-3">
                        <i class="fas fa-trash text-danger"></i>
                    </div>
                    <h5 class="font-weight-bold">Hapus Pengguna</h5>
                    <p class="text-muted">Apakah anda yakin ingin menghapus pengguna ini?</p>
                    <p class="font-weight-bold h5">{{ $item->username }}</p>
                </div>
                <form action="{{ route('pengguna.delete', $item->id) }}" method="post">
                    @method('delete')
                    @csrf
                    <div class="modal-footer border-top-0 pt-0 justify-content-center">
                        <button type="button" class="btn btn-gray" data-dismiss="modal">Batal</button>
                        <button class="btn btn-red">Hapus</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    @endforeach
@endsection
