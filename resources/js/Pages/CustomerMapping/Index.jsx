import { useState } from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';

export default function Index({ mappings, produkOptions = [] }) {
    const [search, setSearch] = useState('');
    const [addOpen, setAddOpen] = useState(false);
    const [editItem, setEditItem] = useState(null);
    const [deleteItem, setDeleteItem] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const perPage = 10;

    const filtered = mappings.filter((m) =>
        (m.nama_toko || '').toLowerCase().includes(search.toLowerCase()) ||
        (m.alamat || '').toLowerCase().includes(search.toLowerCase()) ||
        (m.produk || '').toLowerCase().includes(search.toLowerCase()) ||
        (m.status || '').toLowerCase().includes(search.toLowerCase())
    );
    const totalPages = Math.ceil(filtered.length / perPage);
    const paginated = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

    return (
        <AppLayout title="Customer Mapping">
            <Head title="Customer Mapping" />
            <style>{`
                .cm-card {
                    background: #fff; border: 1px solid #e5e7eb; border-radius: 14px;
                    padding: 14px; margin-bottom: 12px;
                    box-shadow: 0 1px 3px rgba(0,0,0,.06);
                }
                .cm-avatar {
                    width: 44px; height: 44px; border-radius: 12px; flex-shrink: 0;
                    display: flex; align-items: center; justify-content: center;
                    background: linear-gradient(135deg,#3b82f6,#2563eb);
                    color: #fff; font-weight: 700; font-size: 1.1rem;
                }
                .cm-title { font-weight: 700; font-size: .95rem; color: #0f172a; line-height: 1.2; }
                .cm-sub {
                    font-size: .78rem; color: #64748b; line-height: 1.3;
                    display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
                }
                .cm-coord { font-size: .72rem; color: #64748b; font-variant-numeric: tabular-nums; }
            `}</style>
            <div className="card bg-white border mb-3" style={{ borderColor: '#e5e7eb', boxShadow: '0 1px 2px rgba(0,0,0,.05)', padding: '1.5rem' }}>
                <div className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center justify-content-between mb-4" style={{ gap: 12 }}>
                    <div>
                        <h1 className="font-weight-bold" style={{ fontSize: '1.5rem' }}>Customer Mapping</h1>
                        <p className="small text-muted">Pemetaan toko, lokasi, dan produk</p>
                    </div>
                    <button className="btn btn-primary" onClick={() => setAddOpen(true)}>
                        <svg className="mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ width: 16, height: 16 }}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                        Tambah Data
                    </button>
                </div>

                {/* Search */}
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Cari nama toko, alamat, produk..."
                        className="form-control"
                        style={{ maxWidth: 320 }}
                        value={search}
                        onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                    />
                </div>

                {/* Table (desktop) */}
                <div className="table-responsive d-none d-md-block">
                    <table className="table table-striped table-sm w-100 mb-0">
                        <thead style={{ background: '#3b82f6' }}>
                            <tr>
                                <th className="text-white">No</th>
                                <th className="text-white">Nama Toko</th>
                                <th className="text-white">Alamat</th>
                                <th className="text-white">Produk</th>
                                <th className="text-white">Latitude</th>
                                <th className="text-white">Longitude</th>
                                <th className="text-white">Status</th>
                                <th className="text-center text-white">Opsi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginated.length === 0 ? (
                                <tr><td colSpan={8} className="text-center text-muted" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>Tidak ada data</td></tr>
                            ) : paginated.map((item, idx) => (
                                <tr key={item.id}>
                                    <th>{(currentPage - 1) * perPage + idx + 1}</th>
                                    <td className="font-weight-bold">{item.nama_toko}</td>
                                    <td className="small" style={{ maxWidth: 220, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.alamat}</td>
                                    <td>
                                        <div className="d-flex flex-wrap" style={{ gap: 4 }}>
                                            {splitProduk(item.produk).length === 0
                                                ? <span className="text-muted small">-</span>
                                                : splitProduk(item.produk).map((p) => (
                                                    <span key={p} className="badge badge-primary">{p}</span>
                                                ))}
                                        </div>
                                    </td>
                                    <td>{item.latitude ?? '-'}</td>
                                    <td>{item.longitude ?? '-'}</td>
                                    <td>
                                        <span className={`badge ${item.status === 'Aktif' ? 'badge-success' : 'badge-secondary'}`}>{item.status}</span>
                                    </td>
                                    <td>
                                        <div className="d-flex justify-content-center" style={{ gap: 0 }}>
                                            <button className="btn btn-primary btn-sm mr-1" onClick={() => setEditItem(item)}>
                                                <svg style={{ width: 12, height: 12 }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                                            </button>
                                            <button className="btn btn-danger btn-sm" onClick={() => setDeleteItem(item)}>
                                                <svg style={{ width: 12, height: 12 }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Cards (mobile) */}
                <div className="d-md-none">
                    {paginated.length === 0 ? (
                        <div className="text-center text-muted py-4">Tidak ada data</div>
                    ) : paginated.map((item) => (
                        <div key={item.id} className="cm-card">
                            <div className="d-flex align-items-start justify-content-between" style={{ gap: 10 }}>
                                <div className="d-flex align-items-center" style={{ gap: 10, minWidth: 0 }}>
                                    <div className="cm-avatar">{(item.nama_toko || '?').charAt(0).toUpperCase()}</div>
                                    <div style={{ minWidth: 0 }}>
                                        <div className="cm-title">{item.nama_toko}</div>
                                        <div className="cm-sub">{item.alamat || '-'}</div>
                                    </div>
                                </div>
                                <span className={`badge ${item.status === 'Aktif' ? 'badge-success' : 'badge-secondary'}`} style={{ flexShrink: 0 }}>{item.status}</span>
                            </div>

                            <div className="d-flex flex-wrap mt-2" style={{ gap: 4 }}>
                                {splitProduk(item.produk).length === 0
                                    ? <span className="text-muted small">-</span>
                                    : splitProduk(item.produk).map((p) => <span key={p} className="badge badge-primary">{p}</span>)}
                            </div>

                            <div className="d-flex align-items-center justify-content-between mt-3">
                                <div className="cm-coord">
                                    <i className="fas fa-map-marker-alt mr-1"></i>{item.latitude ?? '-'}, {item.longitude ?? '-'}
                                </div>
                                <div className="d-flex" style={{ gap: 6 }}>
                                    <button className="btn btn-primary btn-sm" onClick={() => setEditItem(item)}>Edit</button>
                                    <button className="btn btn-danger btn-sm" onClick={() => setDeleteItem(item)}>Hapus</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="d-flex flex-wrap justify-content-between align-items-center mt-4" style={{ gap: 8 }}>
                        <span className="small text-muted">Menampilkan {(currentPage-1)*perPage+1}-{Math.min(currentPage*perPage, filtered.length)} dari {filtered.length} data</span>
                        <ul className="pagination pagination-sm mb-0">
                            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}><button className="page-link" disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>«</button></li>
                            {Array.from({ length: totalPages }, (_, i) => (
                                <li key={i} className={`page-item ${currentPage === i+1 ? 'active' : ''}`}><button className="page-link" onClick={() => setCurrentPage(i+1)}>{i+1}</button></li>
                            )).slice(0, 5)}
                            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}><button className="page-link" disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>»</button></li>
                        </ul>
                    </div>
                )}
            </div>

            {/* Add Modal */}
            {addOpen && <MappingModal produkOptions={produkOptions} onClose={() => setAddOpen(false)} />}

            {/* Edit Modal */}
            {editItem && <MappingModal item={editItem} produkOptions={produkOptions} onClose={() => setEditItem(null)} />}

            {/* Delete Modal */}
            {deleteItem && (
                <div className="modal d-block" style={{ zIndex: 1050, background: 'rgba(0,0,0,.5)', overflowY: 'auto' }} onClick={() => setDeleteItem(null)}>
                    <div className="modal-dialog modal-dialog-centered" role="document" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-content">
                            <div className="modal-body text-center" style={{ paddingTop: '2rem' }}>
                                <div className="d-flex align-items-center justify-content-center mx-auto mb-4" style={{ width: 60, height: 60, borderRadius: '50%', background: 'rgba(220,53,69,.1)' }}>
                                    <svg style={{ width: 32, height: 32 }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                </div>
                                <h5 className="font-weight-bold" style={{ fontSize: '1.125rem' }}>Hapus Data</h5>
                                <p className="mt-2" style={{ color: 'rgba(0,0,0,.6)' }}>Apakah anda yakin ingin menghapus data ini?</p>
                                <p className="font-weight-bold" style={{ fontSize: '1.125rem' }}>{deleteItem.nama_toko}</p>
                            </div>
                            <div className="modal-footer justify-content-center">
                                <button className="btn btn-light" onClick={() => setDeleteItem(null)}>Batal</button>
                                <button className="btn btn-danger" onClick={(e) => { e.stopPropagation(); router.delete(`/customer-mapping/${deleteItem.id}`, { onFinish: () => setDeleteItem(null) }); }}>Hapus</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AppLayout>
    );
}

function splitProduk(value) {
    return (value || '').split(',').map((v) => v.trim()).filter(Boolean);
}

function MappingModal({ item = null, produkOptions = [], onClose }) {
    const isEdit = !!item;
    const { data, setData, post, put, processing, errors } = useForm({
        nama_toko: item?.nama_toko || '',
        alamat: item?.alamat || '',
        produk: item?.produk || '',
        latitude: item?.latitude ?? '',
        longitude: item?.longitude ?? '',
        status: item?.status || 'Aktif',
    });

    const selectedProduk = splitProduk(data.produk);
    const toggleProduk = (value) => {
        const next = selectedProduk.includes(value)
            ? selectedProduk.filter((v) => v !== value)
            : [...selectedProduk, value];
        setData('produk', next.join(', '));
    };

    const submit = (e) => {
        e.preventDefault();
        if (isEdit) {
            put(`/customer-mapping/${item.id}`, { onSuccess: onClose });
        } else {
            post('/customer-mapping', { onSuccess: onClose });
        }
    };

    return (
        <div className="modal d-block" style={{ zIndex: 1050, background: 'rgba(0,0,0,.5)', overflowY: 'auto' }} onClick={onClose}>
            <div className="modal-dialog modal-dialog-centered" role="document" onClick={(e) => e.stopPropagation()}>
                <div className="modal-content">
                    <div className="modal-header">
                        <div className="d-flex align-items-center" style={{ gap: 12 }}>
                            <div className="d-flex align-items-center justify-content-center" style={{ width: 40, height: 40, borderRadius: '.5rem', background: '#3b82f6' }}>
                                <svg style={{ width: 20, height: 20 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isEdit ? "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" : "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"} />
                                </svg>
                            </div>
                            <div>
                                <h5 className="font-weight-bold mb-0" style={{ fontSize: '1.125rem' }}>{isEdit ? 'Edit' : 'Tambah'} Customer Mapping</h5>
                                <span className="small text-muted">{isEdit ? 'Ubah data customer mapping' : 'Masukkan data customer mapping baru'}</span>
                            </div>
                        </div>
                        <button type="button" className="close" onClick={onClose}><span>&times;</span></button>
                    </div>
                    <form onSubmit={submit}>
                        <div className="modal-body">
                            <div className="form-group mb-3">
                                <label className="small font-weight-bold">Nama Toko</label>
                                <input type="text" className="form-control" placeholder="Nama toko" value={data.nama_toko} onChange={(e) => setData('nama_toko', e.target.value)} required />
                                {errors.nama_toko && <div className="text-danger small mt-1">{errors.nama_toko}</div>}
                            </div>
                            <div className="form-group mb-3">
                                <label className="small font-weight-bold">Alamat</label>
                                <textarea className="form-control" placeholder="Alamat" rows={2} value={data.alamat} onChange={(e) => setData('alamat', e.target.value)} required />
                                {errors.alamat && <div className="text-danger small mt-1">{errors.alamat}</div>}
                            </div>
                            <div className="form-group mb-3">
                                <label className="small font-weight-bold">Produk</label>
                                <div className="row mt-1">
                                    {produkOptions.map((opt, i) => {
                                        const checked = selectedProduk.includes(opt);
                                        const colors = ['#3b82f6', '#16a34a', '#ea580c', '#9333ea', '#0ea5e9', '#f59e0b', '#dc2626'];
                                        const color = colors[i % colors.length];
                                        return (
                                            <div key={opt} className="col-6 mb-2">
                                                <label className="d-flex align-items-center w-100 m-0" style={{ gap: 8, cursor: 'pointer', padding: '.5rem .75rem', borderRadius: '.5rem', border: `1px solid ${checked ? '#3b82f6' : '#e5e7eb'}`, background: checked ? 'rgba(59,130,246,.05)' : 'transparent', transition: 'all .15s' }}>
                                                    <input type="checkbox" className="form-check-input" style={{ position: 'static', margin: 0, flexShrink: 0 }} checked={checked} onChange={() => toggleProduk(opt)} />
                                                    <span className="small" style={{ fontWeight: 500, color }}>{opt}</span>
                                                </label>
                                            </div>
                                        );
                                    })}
                                </div>
                                {selectedProduk.length === 0 && <div className="small text-muted mt-1">Pilih minimal satu produk</div>}
                                {errors.produk && <div className="text-danger small mt-1">{errors.produk}</div>}
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6 mb-3">
                                    <label className="small font-weight-bold">Latitude</label>
                                    <input type="number" step="any" className="form-control" placeholder="Contoh: 3.5952" value={data.latitude} onChange={(e) => setData('latitude', e.target.value)} />
                                    {errors.latitude && <div className="text-danger small mt-1">{errors.latitude}</div>}
                                </div>
                                <div className="form-group col-md-6 mb-3">
                                    <label className="small font-weight-bold">Longitude</label>
                                    <input type="number" step="any" className="form-control" placeholder="Contoh: 98.6722" value={data.longitude} onChange={(e) => setData('longitude', e.target.value)} />
                                    {errors.longitude && <div className="text-danger small mt-1">{errors.longitude}</div>}
                                </div>
                            </div>
                            <div className="form-group mb-0">
                                <label className="small font-weight-bold">Status</label>
                                <select className="form-control" value={data.status} onChange={(e) => setData('status', e.target.value)} required>
                                    <option value="Aktif">Aktif</option>
                                    <option value="Nonaktif">Nonaktif</option>
                                </select>
                            </div>
                        </div>
                        <div className="modal-footer">
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
    );
}
