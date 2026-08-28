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
            default: return 'badge-error';
        }
    };

    return (
        <AppLayout title="Pengguna">
            <Head title="Pengguna" />
            <div className="card bg-base-100 border border-base-300 shadow-sm p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3">
                    <div>
                        <h1 className="text-2xl font-bold">Data Pengguna</h1>
                        <p className="text-sm text-base-content/50">Kelola pengguna sistem</p>
                    </div>
                    <button className="btn btn-primary gap-2" onClick={() => setAddOpen(true)}>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                        Tambah Pengguna
                    </button>
                </div>

                <div className="mb-4">
                    <input type="text" placeholder="Cari pengguna..." className="input input-bordered w-full max-w-xs" value={search} onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }} />
                </div>

                <div className="overflow-x-auto rounded-xl border">
                    <table className="table table-zebra w-full mb-0">
                        <thead>
                            <tr className="bg-primary text-white">
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
                                <tr><td colSpan={6} className="text-center py-8 text-base-content/40">Tidak ada data</td></tr>
                            ) : paginated.map((item, idx) => (
                                <tr key={item.id} className="hover">
                                    <th>{(currentPage - 1) * perPage + idx + 1}</th>
                                    <td className="font-bold">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                                <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
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
                                        <div className="flex flex-wrap gap-1">
                                            {(item.hak_akses || '').split(',').filter(Boolean).map((m) => (
                                                <span key={m} className={`badge badge-sm ${m === 'pengguna' ? 'badge-error' : m === 'produk' ? 'badge-warning' : m === 'customer' ? 'badge-success' : 'badge-primary'}`}>
                                                    {m === 'home' ? 'Home' : m === 'listinvoice' ? 'List Invoice' : m === 'listsuratjalan' ? 'List SJ' : m === 'suratjalan' ? 'Surat Jalan' : m === 'inventaris' ? 'Inventaris' : m.charAt(0).toUpperCase() + m.slice(1)}
                                                </span>
                                            ))}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex justify-center gap-1">
                                            <button className="btn btn-primary btn-xs" onClick={() => setEditItem(item)}>
                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                                            </button>
                                            <button className="btn btn-error btn-xs" onClick={() => setDeleteItem(item)}>
                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {totalPages > 1 && (
                    <div className="flex justify-between items-center mt-4">
                        <span className="text-sm text-base-content/50">Menampilkan {(currentPage - 1) * perPage + 1}-{Math.min(currentPage * perPage, filtered.length)} dari {filtered.length} data</span>
                        <div className="join">
                            <button className="join-item btn btn-sm" disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>«</button>
                            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => (
                                <button key={i} className={`join-item btn btn-sm ${currentPage === i + 1 ? 'btn-primary' : ''}`} onClick={() => setCurrentPage(i + 1)}>{i + 1}</button>
                            ))}
                            <button className="join-item btn btn-sm" disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>»</button>
                        </div>
                    </div>
                )}
            </div>

            {addOpen && <PenggunaModal onClose={() => setAddOpen(false)} />}
            {editItem && <PenggunaModal item={editItem} onClose={() => setEditItem(null)} />}

            {deleteItem && (
                <dialog className="modal modal-open">
                    <div className="modal-box text-center">
                        <div className="w-20 h-20 rounded-full bg-error/10 flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-error" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </div>
                        <h3 className="font-bold text-lg">Hapus Pengguna</h3>
                        <p className="text-base-content/60 mt-2">Apakah anda yakin ingin menghapus pengguna ini?</p>
                        <p className="font-bold text-lg mt-1">{deleteItem.username}</p>
                        <div className="modal-action justify-center">
                            <button className="btn btn-ghost" onClick={() => setDeleteItem(null)}>Batal</button>
                            <button className="btn btn-error" onClick={(e) => { e.stopPropagation(); router.delete(`/pengguna/${deleteItem.id}`, { onFinish: () => setDeleteItem(null) }); }}>Hapus</button>
                        </div>
                    </div>
                    <div className="modal-backdrop" onClick={() => setDeleteItem(null)} />
                </dialog>
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
        <dialog className="modal modal-open">
            <div className="modal-box">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isEdit ? "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" : "M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"} />
                        </svg>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg">{isEdit ? 'Edit' : 'Tambah'} Pengguna</h3>
                        <p className="text-sm text-base-content/50">{isEdit ? 'Ubah data pengguna' : 'Masukkan data pengguna baru'}</p>
                    </div>
                </div>
                <form onSubmit={submit}>
                    <div className="space-y-3">
                        <div>
                            <label className="label"><span className="label-text font-medium">Username</span></label>
                            <input type="text" className="input input-bordered w-full" placeholder="Username" value={data.username} onChange={(e) => setData('username', e.target.value)} required />
                        </div>
                        <div>
                            <label className="label"><span className="label-text font-medium">Nama</span></label>
                            <input type="text" className="input input-bordered w-full" placeholder="Nama lengkap" value={data.nama} onChange={(e) => setData('nama', e.target.value)} />
                        </div>
                        <div>
                            <label className="label"><span className="label-text font-medium">{isEdit ? 'New Password' : 'Password'}</span></label>
                            <input type="password" className="input input-bordered w-full" placeholder="Password" value={data.password} onChange={(e) => setData('password', e.target.value)} required />
                        </div>
                        <div>
                            <label className="label"><span className="label-text font-medium">Level</span></label>
                            <select className="select select-bordered w-full" value={data.level} onChange={(e) => setData('level', e.target.value)} required>
                                <option value="" disabled>Pilih level</option>
                                <option value="super admin">Super admin</option>
                                <option value="admin">Admin</option>
                                <option value="staff">Staff</option>
                            </select>
                        </div>
                        <div>
                            <label className="label"><span className="label-text font-medium">Hak Akses Menu</span></label>
                            <div className="grid grid-cols-2 gap-2 mt-1">
                                {[
                                    { value: 'home', label: 'Home', color: 'text-blue-600' },
                                    { value: 'customer', label: 'Customer', color: 'text-green-600' },
                                    { value: 'produk', label: 'Produk', color: 'text-orange-600' },
                                    { value: 'invoice', label: 'Invoice', color: 'text-primary' },
                                    { value: 'listinvoice', label: 'List Invoice', color: 'text-primary' },
                                    { value: 'suratjalan', label: 'Surat Jalan', color: 'text-primary' },
                                    { value: 'inventaris', label: 'Inventaris', color: 'text-purple-600' },
                                    { value: 'listsuratjalan', label: 'List Surat Jalan', color: 'text-primary' },
                                    { value: 'pengguna', label: 'Pengguna', color: 'text-red-600' },
                                ].map((opt) => {
                                    const checked = (data.hak_akses || '').split(',').includes(opt.value);
                                    return (
                                        <label key={opt.value} className={`flex items-center gap-2 cursor-pointer px-3 py-2 rounded-lg border transition-all ${checked ? 'border-primary bg-primary/5 ring-1 ring-primary/30' : 'border-base-300 hover:border-base-content/30'}`}>
                                            <input type="checkbox" className="checkbox checkbox-primary checkbox-sm" checked={checked} onChange={() => {
                                                const current = (data.hak_akses || '').split(',').filter(Boolean);
                                                const next = checked ? current.filter((v) => v !== opt.value) : [...current, opt.value];
                                                setData('hak_akses', next.join(','));
                                            }} />
                                            <span className={`text-sm font-medium ${opt.color}`}>{opt.label}</span>
                                        </label>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="modal-action">
                        <button type="button" className="btn btn-ghost" onClick={onClose}>Batal</button>
                        <button type="submit" disabled={processing} className="btn btn-primary">
                            {processing && <span className="loading loading-spinner loading-sm" />}
                            Simpan
                        </button>
                    </div>
                </form>
            </div>
            <div className="modal-backdrop" onClick={onClose} />
        </dialog>
    );
}
