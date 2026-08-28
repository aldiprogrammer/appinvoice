import { useState } from 'react';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';

export default function Index({ customers }) {
    const [search, setSearch] = useState('');
    const [addOpen, setAddOpen] = useState(false);
    const [editItem, setEditItem] = useState(null);
    const [deleteItem, setDeleteItem] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const perPage = 10;

    const filtered = customers.filter((c) =>
        c.nama.toLowerCase().includes(search.toLowerCase()) ||
        c.singkatan.toLowerCase().includes(search.toLowerCase()) ||
        (c.nohp && c.nohp.includes(search))
    );
    const totalPages = Math.ceil(filtered.length / perPage);
    const paginated = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

    return (
        <AppLayout title="Customer">
            <Head title="Customer" />
            <div className="card bg-base-100 border border-base-300 shadow-sm p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3">
                    <div>
                        <h1 className="text-2xl font-bold">Data Customer</h1>
                        <p className="text-sm text-base-content/50">Kelola data pelanggan</p>
                    </div>
                    <button className="btn btn-primary gap-2" onClick={() => setAddOpen(true)}>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                        Tambah Customer
                    </button>
                </div>

                {/* Search */}
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Cari customer..."
                        className="input input-bordered w-full max-w-xs"
                        value={search}
                        onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                    />
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        <thead>
                            <tr className="bg-primary text-white">
                                <th className="text-white">No</th>
                                <th className="text-white">Nama</th>
                                <th className="text-white">Singkatan</th>
                                <th className="text-white">No Hp</th>
                                <th className="text-white">Alamat</th>
                                <th className="text-center text-white">Opsi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginated.length === 0 ? (
                                <tr><td colSpan={6} className="text-center py-8 text-base-content/40">Tidak ada data</td></tr>
                            ) : paginated.map((item, idx) => (
                                <tr key={item.id}>
                                    <th>{(currentPage - 1) * perPage + idx + 1}</th>
                                    <td className="font-bold">{item.nama}</td>
                                    <td><span className="badge badge-primary badge-sm">{item.singkatan}</span></td>
                                    <td>{item.nohp}</td>
                                    <td className="max-w-[250px] truncate">{item.alamat}</td>
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

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex justify-between items-center mt-4">
                        <span className="text-sm text-base-content/50">Menampilkan {(currentPage-1)*perPage+1}-{Math.min(currentPage*perPage, filtered.length)} dari {filtered.length} data</span>
                        <div className="join">
                            <button className="join-item btn btn-sm" disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>«</button>
                            {Array.from({ length: totalPages }, (_, i) => (
                                <button key={i} className={`join-item btn btn-sm ${currentPage === i+1 ? 'btn-primary' : ''}`} onClick={() => setCurrentPage(i+1)}>{i+1}</button>
                            )).slice(0, 5)}
                            <button className="join-item btn btn-sm" disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>»</button>
                        </div>
                    </div>
                )}
            </div>

            {/* Add Modal */}
            {addOpen && <CustomerModal onClose={() => setAddOpen(false)} />}

            {/* Edit Modal */}
            {editItem && <CustomerModal item={editItem} onClose={() => setEditItem(null)} />}

            {/* Delete Modal */}
            {deleteItem && (
                <dialog className="modal modal-open">
                    <div className="modal-box text-center">
                        <div className="w-20 h-20 rounded-full bg-error/10 flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-error" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </div>
                        <h3 className="font-bold text-lg">Hapus Customer</h3>
                        <p className="text-base-content/60 mt-2">Apakah anda yakin ingin menghapus data ini?</p>
                        <p className="font-bold text-lg mt-1">{deleteItem.nama}</p>
                        <div className="modal-action justify-center">
                            <button className="btn btn-ghost" onClick={() => setDeleteItem(null)}>Batal</button>
                            <button className="btn btn-error" onClick={(e) => { e.stopPropagation(); router.delete(`/customer/${deleteItem.id}`, { onFinish: () => setDeleteItem(null) }); }}>Hapus</button>
                        </div>
                    </div>
                    <div className="modal-backdrop" onClick={() => setDeleteItem(null)} />
                </dialog>
            )}
        </AppLayout>
    );
}

function CustomerModal({ item = null, onClose }) {
    const isEdit = !!item;
    const { data, setData, post, put, processing, errors } = useForm({
        nama: item?.nama || '',
        singkatan: item?.singkatan || '',
        alamat: item?.alamat || '',
        nohp: item?.nohp || '',
    });

    const submit = (e) => {
        e.preventDefault();
        if (isEdit) {
            put(`/customer/${item.id}`, { onSuccess: onClose });
        } else {
            post('/customer', { onSuccess: onClose });
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
                        <h3 className="font-bold text-lg">{isEdit ? 'Edit' : 'Tambah'} Customer</h3>
                        <p className="text-sm text-base-content/50">{isEdit ? 'Ubah data customer' : 'Masukkan data customer baru'}</p>
                    </div>
                </div>
                <form onSubmit={submit}>
                    <div className="space-y-3">
                        <div>
                            <label className="label"><span className="label-text font-medium">Customer</span></label>
                            <input type="text" className="input input-bordered w-full uppercase" placeholder="Nama customer" value={data.nama} onChange={(e) => setData('nama', e.target.value.toUpperCase())} required />
                        </div>
                        <div>
                            <label className="label"><span className="label-text font-medium">Singkatan</span></label>
                            <input type="text" className="input input-bordered w-full uppercase" placeholder="Singkatan nama" value={data.singkatan} onChange={(e) => setData('singkatan', e.target.value.toUpperCase())} required />
                        </div>
                        <div>
                            <label className="label"><span className="label-text font-medium">Alamat</span></label>
                            <input type="text" className="input input-bordered w-full uppercase" placeholder="Alamat" value={data.alamat} onChange={(e) => setData('alamat', e.target.value.toUpperCase())} required />
                        </div>
                        <div>
                            <label className="label"><span className="label-text font-medium">No Hp</span></label>
                            <input type="number" className="input input-bordered w-full" placeholder="No hp" value={data.nohp} onChange={(e) => setData('nohp', e.target.value)} required maxLength={13} />
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
