import { useState } from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';

export default function Index({ inventaris, nextKode }) {
    const [search, setSearch] = useState('');
    const [addOpen, setAddOpen] = useState(false);
    const [editItem, setEditItem] = useState(null);
    const [deleteItem, setDeleteItem] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [selected, setSelected] = useState(new Set());
    const perPage = 10;

    const filtered = inventaris.filter((it) =>
        it.kode_barang.toLowerCase().includes(search.toLowerCase()) ||
        it.nama_barang.toLowerCase().includes(search.toLowerCase()) ||
        it.kondisi.toLowerCase().includes(search.toLowerCase()) ||
        it.letak.toLowerCase().includes(search.toLowerCase())
    );
    const totalPages = Math.ceil(filtered.length / perPage);
    const paginated = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

    const kondisiBadge = (k) => {
        switch (k) {
            case 'Baik': return 'badge-success';
            case 'Rusak': return 'badge-error';
            case 'Perbaikan': return 'badge-warning';
            default: return 'badge-ghost';
        }
    };

    const formatDate = (d) => {
        if (!d) return '-';
        const date = new Date(d);
        return date.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
    };

    const allFilteredSelected = filtered.length > 0 && filtered.every((it) => selected.has(it.id));

    const toggleAll = () => {
        const next = new Set(selected);
        if (allFilteredSelected) {
            filtered.forEach((it) => next.delete(it.id));
        } else {
            filtered.forEach((it) => next.add(it.id));
        }
        setSelected(next);
    };

    const toggleItem = (id) => {
        const next = new Set(selected);
        if (next.has(id)) {
            next.delete(id);
        } else {
            next.add(id);
        }
        setSelected(next);
    };

    const handlePrint = () => {
        const ids = [...selected].join(',');
        window.open(`/inventaris/cetak-label?ids=${ids}`, '_blank');
    };

    return (
        <AppLayout title="Inventaris">
            <Head title="Inventaris" />
            <div className="card bg-base-100 border border-base-300 shadow-sm p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3">
                    <div>
                        <h1 className="text-2xl font-bold">Data Inventaris</h1>
                        <p className="text-sm text-base-content/50">Kelola data inventaris barang</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                        <button className="btn btn-secondary gap-2" disabled={selected.size === 0} onClick={handlePrint}>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4H7v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
                            Cetak Label
                            {selected.size > 0 && <span className="badge badge-ghost badge-sm">({selected.size})</span>}
                        </button>
                        <button className="btn btn-primary gap-2" onClick={() => setAddOpen(true)}>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                            Tambah Barang
                        </button>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                    <input type="text" placeholder="Cari barang..." className="input input-bordered w-full max-w-xs" value={search} onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }} />
                    {selected.size > 0 && (
                        <div className="flex items-center gap-2 text-sm text-base-content/60">
                            <span className="badge badge-primary badge-sm">{selected.size} dipilih</span>
                            <button className="btn btn-ghost btn-xs" onClick={() => setSelected(new Set())}>Batal semua</button>
                        </div>
                    )}
                </div>

                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        <thead>
                            <tr className="bg-primary text-white">
                                <th className="text-white w-10">
                                    <input type="checkbox" className="checkbox checkbox-sm border-white/40" checked={allFilteredSelected} onChange={toggleAll} title="Tandai semua" />
                                </th>
                                <th className="text-white">No</th>
                                <th className="text-white">Kode Barang</th>
                                <th className="text-white">Nama Barang</th>
                                <th className="text-white">Tanggal Masuk</th>
                                <th className="text-white">Kondisi</th>
                                <th className="text-white">Letak</th>
                                <th className="text-center text-white">Opsi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginated.length === 0 ? (
                                <tr><td colSpan={8} className="text-center py-8 text-base-content/40">Tidak ada data</td></tr>
                            ) : paginated.map((item, idx) => (
                                <tr key={item.id} className={selected.has(item.id) ? 'bg-primary/10' : ''}>
                                    <td>
                                        <input type="checkbox" className="checkbox checkbox-sm" checked={selected.has(item.id)} onChange={() => toggleItem(item.id)} />
                                    </td>
                                    <th>{(currentPage - 1) * perPage + idx + 1}</th>
                                    <td><span className="badge badge-primary badge-sm">{item.kode_barang}</span></td>
                                    <td className="font-bold">{item.nama_barang}</td>
                                    <td>{formatDate(item.tanggal_masuk)}</td>
                                    <td><span className={`badge ${kondisiBadge(item.kondisi)} badge-sm`}>{item.kondisi}</span></td>
                                    <td>{item.letak}</td>
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

            {addOpen && <InventarisModal onClose={() => setAddOpen(false)} nextKode={nextKode} />}
            {editItem && <InventarisModal item={editItem} onClose={() => setEditItem(null)} />}

            {deleteItem && (
                <dialog className="modal modal-open">
                    <div className="modal-box text-center">
                        <div className="w-20 h-20 rounded-full bg-error/10 flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-error" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </div>
                        <h3 className="font-bold text-lg">Hapus Barang</h3>
                        <p className="text-base-content/60 mt-2">Apakah anda yakin ingin menghapus data ini?</p>
                        <p className="font-bold text-lg mt-1">{deleteItem.nama_barang}</p>
                        <div className="modal-action justify-center">
                            <button className="btn btn-ghost" onClick={() => setDeleteItem(null)}>Batal</button>
                            <button className="btn btn-error" onClick={(e) => { e.stopPropagation(); router.delete(`/inventaris/${deleteItem.id}`, { onFinish: () => setDeleteItem(null) }); }}>Hapus</button>
                        </div>
                    </div>
                    <div className="modal-backdrop" onClick={() => setDeleteItem(null)} />
                </dialog>
            )}
        </AppLayout>
    );
}

function InventarisModal({ item = null, onClose, nextKode }) {
    const isEdit = !!item;
    const { data, setData, post, put, processing } = useForm({
        kode_barang: item?.kode_barang || nextKode || '',
        nama_barang: item?.nama_barang || '',
        tanggal_masuk: item?.tanggal_masuk || '',
        kondisi: item?.kondisi || '',
        letak: item?.letak || '',
    });

    const submit = (e) => {
        e.preventDefault();
        if (isEdit) {
            put(`/inventaris/${item.id}`, { onSuccess: onClose });
        } else {
            post('/inventaris', { onSuccess: onClose });
        }
    };

    return (
        <dialog className="modal modal-open">
            <div className="modal-box">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg">{isEdit ? 'Edit' : 'Tambah'} Inventaris</h3>
                        <p className="text-sm text-base-content/50">{isEdit ? 'Ubah data barang' : 'Masukkan data barang baru'}</p>
                    </div>
                </div>
                <form onSubmit={submit}>
                    <div className="space-y-3">
                        <div>
                            <label className="label"><span className="label-text font-medium">Kode Barang <span className="badge badge-ghost badge-xs ml-1">otomatis</span></span></label>
                            <input type="text" className="input input-bordered w-full bg-base-200" placeholder="Kode barang" value={data.kode_barang} onChange={(e) => setData('kode_barang', e.target.value)} readOnly />
                        </div>
                        <div>
                            <label className="label"><span className="label-text font-medium">Nama Barang</span></label>
                            <input type="text" className="input input-bordered w-full" placeholder="Nama barang" value={data.nama_barang} onChange={(e) => setData('nama_barang', e.target.value)} required />
                        </div>
                        <div>
                            <label className="label"><span className="label-text font-medium">Tanggal Masuk</span></label>
                            <input type="date" className="input input-bordered w-full" value={data.tanggal_masuk} onChange={(e) => setData('tanggal_masuk', e.target.value)} required />
                        </div>
                        <div>
                            <label className="label"><span className="label-text font-medium">Kondisi Barang</span></label>
                            <select className="select select-bordered w-full" value={data.kondisi} onChange={(e) => setData('kondisi', e.target.value)} required>
                                <option value="" disabled>Pilih kondisi</option>
                                <option>Baik</option>
                                <option>Perbaikan</option>
                                <option>Rusak</option>
                            </select>
                        </div>
                        <div>
                            <label className="label"><span className="label-text font-medium">Letak Barang</span></label>
                            <input type="text" className="input input-bordered w-full" placeholder="Letak barang" value={data.letak} onChange={(e) => setData('letak', e.target.value)} required />
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