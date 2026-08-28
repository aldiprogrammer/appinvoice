import { useState } from 'react';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';

export default function Index({ produk }) {
    const { auth } = usePage().props;
    const [search, setSearch] = useState('');
    const [addOpen, setAddOpen] = useState(false);
    const [editItem, setEditItem] = useState(null);
    const [deleteItem, setDeleteItem] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const perPage = 10;

    const filtered = produk.filter((p) =>
        p.produk.toLowerCase().includes(search.toLowerCase()) ||
        p.kualitas.toLowerCase().includes(search.toLowerCase())
    );
    const totalPages = Math.ceil(filtered.length / perPage);
    const paginated = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

    const kualitasBadge = (k) => {
        switch (k) {
            case 'Super premium': return 'badge-warning';
            case 'Premium': return 'badge-success';
            default: return 'badge-ghost';
        }
    };

    return (
        <AppLayout title="Produk">
            <Head title="Produk" />
            <div className="card bg-base-100 border border-base-300 shadow-sm p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3">
                    <div>
                        <h1 className="text-2xl font-bold">Data Produk</h1>
                        <p className="text-sm text-base-content/50">Kelola data produk</p>
                    </div>
                    <button className="btn btn-primary gap-2" onClick={() => setAddOpen(true)}>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                        Tambah Produk
                    </button>
                </div>

                <div className="mb-4">
                    <input type="text" placeholder="Cari produk..." className="input input-bordered w-full max-w-xs" value={search} onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }} />
                </div>

                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        <thead>
                            <tr className="bg-primary text-white">
                                <th className="text-white">No</th>
                                <th className="text-white">Produk</th>
                                <th className="text-white">Kemasan</th>
                                <th className="text-white">Harga/Kg</th>
                                <th className="text-white">Kualitas</th>
                                <th className="text-center text-white">Opsi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginated.length === 0 ? (
                                <tr><td colSpan={6} className="text-center py-8 text-base-content/40">Tidak ada data</td></tr>
                            ) : paginated.map((item, idx) => (
                                <tr key={item.id}>
                                    <th>{(currentPage - 1) * perPage + idx + 1}</th>
                                    <td className="font-bold">{item.produk}</td>
                                    <td><span className="badge badge-primary badge-sm">{item.kemasan} kg</span></td>
                                    <td>Rp {Number(item.harga).toLocaleString('id-ID')}</td>
                                    <td><span className={`badge ${kualitasBadge(item.kualitas)} badge-sm`}>{item.kualitas}</span></td>
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
                        <span className="text-sm text-base-content/50">Menampilkan {(currentPage-1)*perPage+1}-{Math.min(currentPage*perPage, filtered.length)} dari {filtered.length} data</span>
                        <div className="join">
                            <button className="join-item btn btn-sm" disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>«</button>
                            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => (
                                <button key={i} className={`join-item btn btn-sm ${currentPage === i+1 ? 'btn-primary' : ''}`} onClick={() => setCurrentPage(i+1)}>{i+1}</button>
                            ))}
                            <button className="join-item btn btn-sm" disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>»</button>
                        </div>
                    </div>
                )}
            </div>

            {addOpen && <ProdukModal onClose={() => setAddOpen(false)} />}
            {editItem && <ProdukModal item={editItem} onClose={() => setEditItem(null)} />}

            {deleteItem && (
                <dialog className="modal modal-open">
                    <div className="modal-box text-center">
                        <div className="w-20 h-20 rounded-full bg-error/10 flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-error" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </div>
                        <h3 className="font-bold text-lg">Hapus Produk</h3>
                        <p className="text-base-content/60 mt-2">Apakah anda yakin ingin menghapus data ini?</p>
                        <p className="font-bold text-lg mt-1">{deleteItem.produk}</p>
                        <div className="modal-action justify-center">
                            <button className="btn btn-ghost" onClick={() => setDeleteItem(null)}>Batal</button>
                            <button className="btn btn-error" onClick={(e) => { e.stopPropagation(); router.delete(`/produk/${deleteItem.id}`, { onFinish: () => setDeleteItem(null) }); }}>Hapus</button>
                        </div>
                    </div>
                    <div className="modal-backdrop" onClick={() => setDeleteItem(null)} />
                </dialog>
            )}
        </AppLayout>
    );
}

function ProdukModal({ item = null, onClose }) {
    const isEdit = !!item;
    const { data, setData, post, put, processing } = useForm({
        produk: item?.produk || '',
        kemasan: item?.kemasan || '',
        harga: item?.harga || '',
        kualitas: item?.kualitas || '',
    });

    const submit = (e) => {
        e.preventDefault();
        if (isEdit) {
            put(`/produk/${item.id}`, { onSuccess: onClose });
        } else {
            post('/produk', { onSuccess: onClose });
        }
    };

    return (
        <dialog className="modal modal-open">
            <div className="modal-box">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isEdit ? "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" : "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"} /></svg>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg">{isEdit ? 'Edit' : 'Tambah'} Produk</h3>
                        <p className="text-sm text-base-content/50">{isEdit ? 'Ubah data produk' : 'Masukkan data produk baru'}</p>
                    </div>
                </div>
                <form onSubmit={submit}>
                    <div className="space-y-3">
                        <div>
                            <label className="label"><span className="label-text font-medium">Produk</span></label>
                            <input type="text" className="input input-bordered w-full" placeholder="Produk" value={data.produk} onChange={(e) => setData('produk', e.target.value)} required />
                        </div>
                        <div>
                            <label className="label"><span className="label-text font-medium">Ukuran Kemasan</span></label>
                            <select className="select select-bordered w-full" value={data.kemasan} onChange={(e) => setData('kemasan', e.target.value)} required>
                                <option value="" disabled>Pilih kemasan</option>
                                <option value="5">5kg</option>
                                <option value="10">10kg</option>
                                <option value="20">20kg</option>
                                <option value="30">30kg</option>
                                <option value="50">50kg</option>
                            </select>
                        </div>
                        <div>
                            <label className="label"><span className="label-text font-medium">Harga/Kg</span></label>
                            <input type="number" className="input input-bordered w-full" placeholder="Harga" value={data.harga} onChange={(e) => setData('harga', e.target.value)} required />
                        </div>
                        <div>
                            <label className="label"><span className="label-text font-medium">Kualitas</span></label>
                            <select className="select select-bordered w-full" value={data.kualitas} onChange={(e) => setData('kualitas', e.target.value)} required>
                                <option value="" disabled>Pilih kualitas</option>
                                <option>Super premium</option>
                                <option>Premium</option>
                                <option>Medium</option>
                                <option>Medium LV2</option>
                                <option>Medium LV3</option>
                            </select>
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
