import { useState } from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';

export default function Index({ user }) {
    const [search, setSearch] = useState('');
    const [addOpen, setAddOpen] = useState(false);
    const [editItem, setEditItem] = useState(null);
    const [deleteItem, setDeleteItem] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const perPage = 10;

    const filtered = user.filter((u) =>
        (u.username || '').toLowerCase().includes(search.toLowerCase()) ||
        (u.nama || '').toLowerCase().includes(search.toLowerCase()) ||
        (u.level || '').toLowerCase().includes(search.toLowerCase())
    );
    const totalPages = Math.ceil(filtered.length / perPage);
    const paginated = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

    const levelBadge = (level) => {
        switch (level) {
            case 'super admin': return 'badge-warning';
            case 'admin': return 'badge-success';
            default: return 'badge-danger';
        }
    };

    return (
        <AppLayout title="Pengguna">
            <Head title="Pengguna" />
            <div className="card bg-white border mb-3" style={{ borderColor: '#e5e7eb', boxShadow: '0 1px 2px rgba(0,0,0,.05)', padding: '1.5rem' }}>
                <div className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center justify-content-between mb-4" style={{ gap: 12 }}>
                    <div>
                        <h1 className="font-weight-bold" style={{ fontSize: '1.5rem' }}>Data Pengguna</h1>
                        <p className="small text-muted">Kelola pengguna sistem</p>
                    </div>
                    <button className="btn btn-primary" onClick={() => setAddOpen(true)}>
                        <svg className="mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ width: 16, height: 16 }}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                        Tambah Pengguna
                    </button>
                </div>

                <div className="mb-4">
                    <input type="text" placeholder="Cari pengguna..." className="form-control" style={{ maxWidth: 320 }} value={search} onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }} />
                </div>

                <div className="table-responsive border rounded" style={{ borderRadius: '.75rem' }}>
                    <table className="table table-striped table-sm w-100 mb-0">
                        <thead style={{ background: '#3b82f6' }}>
                            <tr>
                                <th className="text-white">No</th>
                                <th className="text-white">Username</th>
                                <th className="text-white">Nama</th>
                                <th className="text-white">Level</th>
                                <th className="text-white">Hak Akses</th>
                                <th className="text-center text-white">Opsi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginated.length === 0 ? (
                                <tr><td colSpan={6} className="text-center text-muted" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>Tidak ada data</td></tr>
                            ) : paginated.map((item, idx) => (
                                <tr key={item.id} className="hover">
                                    <th>{(currentPage - 1) * perPage + idx + 1}</th>
                                    <td className="font-weight-bold">
                                        <div className="d-flex align-items-center" style={{ gap: 8 }}>
                                            <div className="d-flex align-items-center justify-content-center" style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(59,130,246,.1)' }}>
                                                <svg style={{ width: 16, height: 16 }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                            </div>
                                            {item.username}
                                        </div>
                                    </td>
                                    <td>{item.nama || '-'}</td>
                                    <td>
                                        <span>

                                            {item.level}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="d-flex flex-wrap" style={{ gap: 0 }}>
                                            {(item.hak_akses || '').split(',').filter(Boolean).map((m) => (
                                                <span key={m} className={`badge mr-1 ${m === 'pengguna' ? 'badge-danger' : m === 'produk' ? 'badge-warning' : m === 'customer' ? 'badge-success' : 'badge-primary'}`}>
                                                    {m === 'home' ? 'Home' : m === 'listinvoice' ? 'List Invoice' : m === 'listsuratjalan' ? 'List SJ' : m === 'suratjalan' ? 'Surat Jalan' : m === 'inventaris' ? 'Inventaris' : m === 'followup' ? 'Waktu Follow-up' : m === 'kirimnotif' ? 'Kirim Notifikasi' : m === 'bahanmasuk' ? 'Bahan Masuk' : m === 'bahan' ? 'Data Bahan' : m === 'customermapping' ? 'Customer Mapping' : m.charAt(0).toUpperCase() + m.slice(1)}
                                                </span>
                                            ))}
                                        </div>
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

                {totalPages > 1 && (
                    <div className="d-flex justify-content-between align-items-center mt-4">
                        <span className="small text-muted">Menampilkan {(currentPage - 1) * perPage + 1}-{Math.min(currentPage * perPage, filtered.length)} dari {filtered.length} data</span>
                        <ul className="pagination pagination-sm mb-0">
                            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}><button className="page-link" disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>«</button></li>
                            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => (
                                <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}><button className="page-link" onClick={() => setCurrentPage(i + 1)}>{i + 1}</button></li>
                            ))}
                            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}><button className="page-link" disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>»</button></li>
                        </ul>
                    </div>
                )}
            </div>

            {addOpen && <PenggunaModal onClose={() => setAddOpen(false)} />}
            {editItem && <PenggunaModal item={editItem} onClose={() => setEditItem(null)} />}

            {deleteItem && (
                <div className="modal d-block" style={{ zIndex: 1050, background: 'rgba(0,0,0,.5)', overflowY: 'auto' }} onClick={() => setDeleteItem(null)}>
                    <div className="modal-dialog modal-dialog-centered" role="document" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-content">
                            <div className="modal-body text-center" style={{ paddingTop: '2rem' }}>
                                <div className="d-flex align-items-center justify-content-center mx-auto mb-4" style={{ width: 60, height: 60, borderRadius: '50%', background: 'rgba(220,53,69,.1)' }}>
                                    <svg style={{ width: 32, height: 32 }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                </div>
                                <h5 className="font-weight-bold" style={{ fontSize: '1.125rem' }}>Hapus Pengguna</h5>
                                <p className="mt-2" style={{ color: 'rgba(0,0,0,.6)' }}>Apakah anda yakin ingin menghapus pengguna ini?</p>
                                <p className="font-weight-bold" style={{ fontSize: '1.125rem' }}>{deleteItem.username}</p>
                            </div>
                            <div className="modal-footer justify-content-center">
                                <button className="btn btn-light" onClick={() => setDeleteItem(null)}>Batal</button>
                                <button className="btn btn-danger" onClick={(e) => { e.stopPropagation(); router.delete(`/pengguna/${deleteItem.id}`, { onFinish: () => setDeleteItem(null) }); }}>Hapus</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AppLayout>
    );
}

function PenggunaModal({ item = null, onClose }) {
    const isEdit = !!item;
    const { data, setData, post, put, processing } = useForm({
        username: item?.username || '',
        nama: item?.nama || '',
        password: '',
        level: item?.level || '',
        hak_akses: item?.hak_akses || 'invoice',
    });

    const submit = (e) => {
        e.preventDefault();
        if (isEdit) {
            put(`/pengguna/${item.id}`, { onSuccess: onClose });
        } else {
            post('/pengguna', { onSuccess: onClose });
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
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isEdit ? "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" : "M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"} />
                                </svg>
                            </div>
                            <div>
                                <h5 className="font-weight-bold mb-0" style={{ fontSize: '1.125rem' }}>{isEdit ? 'Edit' : 'Tambah'} Pengguna</h5>
                                <span className="small text-muted">{isEdit ? 'Ubah data pengguna' : 'Masukkan data pengguna baru'}</span>
                            </div>
                        </div>
                        <button type="button" className="close" onClick={onClose}><span>&times;</span></button>
                    </div>
                    <form onSubmit={submit}>
                        <div className="modal-body">
                            <div className="form-group mb-3">
                                <label className="small font-weight-bold">Username</label>
                                <input type="text" className="form-control" placeholder="Username" value={data.username} onChange={(e) => setData('username', e.target.value)} required />
                            </div>
                            <div className="form-group mb-3">
                                <label className="small font-weight-bold">Nama</label>
                                <input type="text" className="form-control" placeholder="Nama lengkap" value={data.nama} onChange={(e) => setData('nama', e.target.value)} />
                            </div>
                            <div className="form-group mb-3">
                                <label className="small font-weight-bold">{isEdit ? 'New Password' : 'Password'}</label>
                                <input type="password" className="form-control" placeholder="Password" value={data.password} onChange={(e) => setData('password', e.target.value)} required />
                            </div>
                            <div className="form-group mb-3">
                                <label className="small font-weight-bold">Level</label>
                                <select className="form-control" value={data.level} onChange={(e) => setData('level', e.target.value)} required>
                                    <option value="" disabled>Pilih level</option>
                                    <option value="super admin">Super admin</option>
                                    <option value="admin">Admin</option>
                                    <option value="staff">Staff</option>
                                </select>
                            </div>
                            <div className="form-group mb-0">
                                <label className="small font-weight-bold">Hak Akses Menu</label>
                                <div className="row mt-1">
                                    {[
                                        { value: 'home', label: 'Home', color: '#2563eb' },
                                        { value: 'customer', label: 'Customer', color: '#16a34a' },
                                        { value: 'customermapping', label: 'Customer Mapping', color: '#16a34a' },
                                        { value: 'ordercustomer', label: 'Order Customer', color: '#0891b2' },
                                        { value: 'produk', label: 'Produk', color: '#ea580c' },
                                        { value: 'bahanmasuk', label: 'Bahan Masuk', color: '#ea580c' },
                                        { value: 'bahan', label: 'Data Bahan', color: '#2563eb' },
                                        { value: 'invoice', label: 'Invoice', color: '#3b82f6' },
                                        { value: 'listinvoice', label: 'List Invoice', color: '#3b82f6' },
                                        { value: 'suratjalan', label: 'Surat Jalan', color: '#3b82f6' },
                                        { value: 'inventaris', label: 'Inventaris', color: '#9333ea' },
                                        { value: 'followup', label: 'Waktu Follow-up', color: '#0891b2' },
                                        { value: 'kirimnotif', label: 'Kirim Notifikasi', color: '#0891b2' },
                                        { value: 'listsuratjalan', label: 'List Surat Jalan', color: '#3b82f6' },
                                        { value: 'pengguna', label: 'Pengguna', color: '#dc2626' },
                                    ].map((opt) => {
                                        const checked = (data.hak_akses || '').split(',').includes(opt.value);
                                        return (
                                            <div key={opt.value} className="col-6 mb-2">
                                                <label className="d-flex align-items-center w-100 m-0" style={{ gap: 8, cursor: 'pointer', padding: '.5rem .75rem', borderRadius: '.5rem', border: `1px solid ${checked ? '#3b82f6' : '#e5e7eb'}`, background: checked ? 'rgba(59,130,246,.05)' : 'transparent', transition: 'all .15s' }}>
                                                    <input type="checkbox" className="form-check-input m-0" checked={checked} onChange={() => {
                                                        const current = (data.hak_akses || '').split(',').filter(Boolean);
                                                        const next = checked ? current.filter((v) => v !== opt.value) : [...current, opt.value];
                                                        setData('hak_akses', next.join(','));
                                                    }} />
                                                    <span className="small" style={{ fontWeight: 500, color: opt.color }}>{opt.label}</span>
                                                </label>
                                            </div>
                                        );
                                    })}
                                </div>
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
