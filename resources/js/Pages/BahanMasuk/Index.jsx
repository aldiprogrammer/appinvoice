import { useState } from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';

export default function Index({ bahan }) {
    const [search, setSearch] = useState('');
    const [addOpen, setAddOpen] = useState(false);
    const [editItem, setEditItem] = useState(null);
    const [deleteItem, setDeleteItem] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const perPage = 10;

    const filtered = bahan.filter((it) =>
        it.kode_bahan.toLowerCase().includes(search.toLowerCase()) ||
        it.jenis_bahan.toLowerCase().includes(search.toLowerCase()) ||
        it.no_kendaraan.toLowerCase().includes(search.toLowerCase()) ||
        it.status_kontainer.toLowerCase().includes(search.toLowerCase())
    );
    const totalPages = Math.ceil(filtered.length / perPage);
    const paginated = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

    const statusBadge = (s) => {
        switch (s) {
            case 'Dalam Perjalanan': return 'badge-warning';
            case 'Sudah Tiba': return 'badge-info';
            case 'Proses Bongkar': return 'badge-primary';
            case 'Selesai Bongkar': return 'badge-success';
            default: return 'badge-light';
        }
    };

    const formatDate = (d) => {
        if (!d) return '-';
        const date = new Date(d + 'T00:00:00');
        return date.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
    };

    return (
        <AppLayout title="Bahan Masuk">
            <Head title="Bahan Masuk" />
            <div className="card bg-white border shadow-sm p-4" style={{ borderColor: '#e5e7eb' }}>
                <div className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center justify-content-between mb-4" style={{ gap: '.75rem' }}>
                    <div>
                        <h1 className="font-weight-bold" style={{ fontSize: '1.5rem' }}>Data Bahan Masuk</h1>
                        <p className="small text-muted">Kelola data bahan masuk kontainer</p>
                    </div>
                    <button className="btn btn-primary" onClick={() => setAddOpen(true)}>
                        <i className="fas fa-plus mr-2" />
                        Tambah Bahan
                    </button>
                </div>

                <div className="d-flex flex-column flex-sm-row align-items-sm-center justify-content-between mb-3" style={{ gap: '.75rem' }}>
                    <input type="text" placeholder="Cari bahan masuk..." className="form-control" style={{ maxWidth: '20rem' }} value={search} onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }} />
                </div>

                <div className="table-responsive">
                    <table className="table table-striped table-sm">
                        <thead style={{ background: '#3b82f6' }}>
                            <tr>
                                <th className="text-white">No</th>
                                <th className="text-white">Tgl</th>
                                <th className="text-white">Estimasi Sampai</th>
                                <th className="text-white">Kode Bahan</th>
                                <th className="text-white">Jenis Bahan</th>
                                <th className="text-white">Kemasan</th>
                                <th className="text-white">Jumlah Sak</th>
                                <th className="text-white">No Kendaraan</th>
                                <th className="text-white">Status Kontainer</th>
                                <th className="text-center text-white">Opsi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginated.length === 0 ? (
                                <tr><td colSpan={10} className="text-center" style={{ padding: '2rem 0', color: 'rgba(0,0,0,.4)' }}>Tidak ada data</td></tr>
                            ) : paginated.map((item, idx) => (
                                <tr key={item.id}>
                                    <th>{(currentPage - 1) * perPage + idx + 1}</th>
                                    <td>{formatDate(item.tanggal)}</td>
                                    <td>{formatDate(item.estimasi_sampai)}</td>
                                    <td><span className="badge badge-primary">{item.kode_bahan}</span></td>
                                    <td className="font-weight-bold">{item.jenis_bahan}</td>
                                    <td>{item.kemasan}</td>
                                    <td>{item.jumlah_sak}</td>
                                    <td>{item.no_kendaraan}</td>
                                    <td><span className={`badge ${statusBadge(item.status_kontainer)}`}>{item.status_kontainer}</span></td>
                                    <td>
                                        <div className="d-flex justify-content-center" style={{ gap: '.25rem' }}>
                                            <button className="btn btn-primary btn-sm" onClick={() => setEditItem(item)}>
                                                <i className="fas fa-pencil-alt" />
                                            </button>
                                            <button className="btn btn-danger btn-sm" onClick={() => setDeleteItem(item)}>
                                                <i className="fas fa-trash-alt" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {totalPages > 1 && (
                    <div className="d-flex justify-content-between align-items-center mt-3">
                        <span className="small text-muted">Menampilkan {(currentPage-1)*perPage+1}-{Math.min(currentPage*perPage, filtered.length)} dari {filtered.length} data</span>
                        <nav>
                            <ul className="pagination pagination-sm mb-0">
                                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                    <button className="page-link" disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>«</button>
                                </li>
                                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => (
                                    <li key={i} className={`page-item ${currentPage === i+1 ? 'active' : ''}`}>
                                        <button className="page-link" onClick={() => setCurrentPage(i+1)}>{i+1}</button>
                                    </li>
                                ))}
                                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                    <button className="page-link" disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>»</button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                )}
            </div>

            {addOpen && <BahanMasukModal onClose={() => setAddOpen(false)} />}
            {editItem && <BahanMasukModal item={editItem} onClose={() => setEditItem(null)} />}

            {deleteItem && (
                <div className="modal d-block" style={{ zIndex: 1050, background: 'rgba(0,0,0,.5)', overflowY: 'auto' }} onClick={() => setDeleteItem(null)}>
                    <div className="modal-dialog modal-dialog-centered" role="document" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title font-weight-bold">Hapus Bahan Masuk</h5>
                                <button type="button" className="close" onClick={() => setDeleteItem(null)}><span>&times;</span></button>
                            </div>
                            <div className="modal-body text-center">
                                <div className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: 80, height: 80, background: 'rgba(220,53,69,.1)' }}>
                                    <i className="fas fa-trash-alt" style={{ color: '#dc3545', fontSize: '2rem' }} />
                                </div>
                                <p className="text-muted" style={{ marginTop: '.5rem' }}>Apakah anda yakin ingin menghapus data ini?</p>
                                <p className="font-weight-bold" style={{ fontSize: '1.125rem', marginTop: '.25rem' }}>{deleteItem.jenis_bahan} ({deleteItem.kode_bahan})</p>
                            </div>
                            <div className="modal-footer justify-content-center">
                                <button className="btn btn-light" onClick={() => setDeleteItem(null)}>Batal</button>
                                <button className="btn btn-danger" onClick={(e) => { e.stopPropagation(); router.delete(`/bahanmasuk/${deleteItem.id}`, { onFinish: () => setDeleteItem(null) }); }}>Hapus</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AppLayout>
    );
}

function BahanMasukModal({ item = null, onClose }) {
    const isEdit = !!item;
    const { data, setData, post, put, processing } = useForm({
        tanggal: item?.tanggal || '',
        estimasi_sampai: item?.estimasi_sampai || '',
        kode_bahan: item?.kode_bahan || '',
        jenis_bahan: item?.jenis_bahan || '',
        kemasan: item?.kemasan || '',
        jumlah_sak: item?.jumlah_sak || '',
        no_kendaraan: item?.no_kendaraan || '',
        status_kontainer: item?.status_kontainer || '',
    });

    const submit = (e) => {
        e.preventDefault();
        if (isEdit) {
            put(`/bahanmasuk/${item.id}`, { onSuccess: onClose });
        } else {
            post('/bahanmasuk', { onSuccess: onClose });
        }
    };

    return (
        <div className="modal d-block" style={{ zIndex: 1050, background: 'rgba(0,0,0,.5)', overflowY: 'auto' }} onClick={onClose}>
            <div className="modal-dialog modal-dialog-centered" role="document" onClick={(e) => e.stopPropagation()}>
                <div className="modal-content">
                    <div className="modal-header d-flex align-items-center" style={{ gap: '.75rem' }}>
                        <div className="rounded d-flex align-items-center justify-content-center" style={{ width: 40, height: 40, background: '#007bff' }}>
                            <i className="fas fa-cubes text-white" />
                        </div>
                        <div>
                            <h5 className="modal-title font-weight-bold">{isEdit ? 'Edit' : 'Tambah'} Bahan Masuk</h5>
                            <p className="small text-muted mb-0">{isEdit ? 'Ubah data bahan masuk' : 'Masukkan data bahan masuk baru'}</p>
                        </div>
                        <button type="button" className="close ml-auto" onClick={onClose}><span>&times;</span></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={submit}>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="font-weight-bold">Tanggal</label>
                                        <input type="date" className="form-control" value={data.tanggal} onChange={(e) => setData('tanggal', e.target.value)} required />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="font-weight-bold">Estimasi Sampai</label>
                                        <input type="date" className="form-control" value={data.estimasi_sampai} onChange={(e) => setData('estimasi_sampai', e.target.value)} required />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="font-weight-bold">Kode Bahan</label>
                                        <input type="text" className="form-control" placeholder="Kode bahan" value={data.kode_bahan} onChange={(e) => setData('kode_bahan', e.target.value)} required />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="font-weight-bold">Jenis Bahan</label>
                                        <input type="text" className="form-control" placeholder="Jenis bahan" value={data.jenis_bahan} onChange={(e) => setData('jenis_bahan', e.target.value)} required />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="font-weight-bold">Kemasan</label>
                                        <input type="text" className="form-control" placeholder="Contoh: 50 Kg" value={data.kemasan} onChange={(e) => setData('kemasan', e.target.value)} required />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="font-weight-bold">Jumlah Sak</label>
                                        <input type="number" min="1" className="form-control" placeholder="Jumlah sak" value={data.jumlah_sak} onChange={(e) => setData('jumlah_sak', e.target.value)} required />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="font-weight-bold">No Kendaraan</label>
                                        <input type="text" className="form-control" placeholder="No kendaraan (plat)" value={data.no_kendaraan} onChange={(e) => setData('no_kendaraan', e.target.value)} required />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="font-weight-bold">Status Kontainer</label>
                                        <select className="form-control" value={data.status_kontainer} onChange={(e) => setData('status_kontainer', e.target.value)} required>
                                            <option value="" disabled>Pilih status</option>
                                            <option>Dalam Perjalanan</option>
                                            <option>Sudah Tiba</option>
                                            <option>Proses Bongkar</option>
                                            <option>Selesai Bongkar</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer px-0 pb-0">
                                <button type="button" className="btn btn-light" onClick={onClose}>Batal</button>
                                <button type="submit" disabled={processing} className="btn btn-primary">
                                    {processing && <span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true" />}
                                    Simpan
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}