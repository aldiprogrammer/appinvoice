import { useState } from 'react';
import { Head, router, usePage } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';

export default function Index({ list }) {
    const { auth } = usePage().props;
    const [search, setSearch] = useState('');
    const [deleteItem, setDeleteItem] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const perPage = 10;

    const filtered = list.filter((item) =>
        (item.kode_invoice || '').toLowerCase().includes(search.toLowerCase()) ||
        (item.inv?.customer || '').toLowerCase().includes(search.toLowerCase()) ||
        (item.no_po || '').toLowerCase().includes(search.toLowerCase())
    );
    const totalPages = Math.ceil(filtered.length / perPage);
    const paginated = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

    return (
        <AppLayout title="List Invoice">
            <Head title="List Invoice" />
            <div className="card bg-base-100 border border-base-300 shadow-sm p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3">
                    <div>
                        <h1 className="text-2xl font-bold">List Invoice</h1>
                        <p className="text-sm text-base-content/50">Semua data invoice tersimpan</p>
                    </div>
                </div>

                <div className="mb-4">
                    <input type="text" placeholder="Cari invoice..." className="input input-bordered w-full max-w-xs" value={search} onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }} />
                </div>

                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        <thead>
                            <tr className="bg-primary text-white">
                                <th className="text-white">No</th>
                                <th className="text-white">Kode Invoice</th>
                                <th className="text-white">No Po</th>
                                <th className="text-white">Customer</th>
                                <th className="text-white">Pengguna</th>
                                <th className="text-white">Tanggal</th>
                                <th className="text-white">S.Cetak</th>
                                <th className="text-white">Status</th>
                                <th className="text-white">Disetujui</th>
                                <th className="text-center text-white">Opsi</th>
                                {/* <th className="text-center text-white">Cetak</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {paginated.length === 0 ? (
                                <tr>
                                    <td colSpan={11} className="text-center py-12">
                                        <div className="flex flex-col items-center">
                                            <div className="w-16 h-16 rounded-full bg-base-200 flex items-center justify-center mb-3">
                                                <svg className="w-8 h-8 text-base-content/30" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                            </div>
                                            <p className="font-bold text-base-content/40">Belum ada data invoice</p>
                                            <a href="/invoice" className="btn btn-primary btn-sm mt-2">Buat Invoice Baru</a>
                                        </div>
                                    </td>
                                </tr>
                            ) : paginated.map((item, idx) => (
                                <tr key={item.id}>
                                    <th>{(currentPage - 1) * perPage + idx + 1}</th>
                                    <td className="font-bold">{item.kode_invoice}</td>
                                    <td>{item.no_po}</td>
                                    <td>{item.inv?.customer || '-'}</td>
                                    <td>{item.user?.username || '-'}</td>
                                    <td>{item.inv?.tanggal ? new Date(item.inv.tanggal).toLocaleDateString('id-ID') : '-'}</td>
                                    <td>
                                        {item.status_cetak == 0 ? (
                                            <span className="badge badge-warning badge-sm gap-1">
                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
                                                Belum
                                            </span>
                                        ) : (
                                            <span className="badge badge-success badge-sm gap-1">
                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                                Dicetak
                                            </span>
                                        )}
                                    </td>
                                    <td>
                                        {item.status == 0 ? (
                                            <span className="badge badge-warning badge-sm gap-1">
                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" strokeWidth={2} stroke="currentColor" fill="none" /></svg>
                                                Menunggu
                                            </span>
                                        ) : (
                                            <span className="badge badge-success badge-sm gap-1">
                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                                Disetujui
                                            </span>
                                        )}
                                    </td>
                                    <td>{item.user_setujui_username || '-'}</td>
                                    <td>
                                        <div className="flex justify-center gap-1">
                                            <a href={`/listinvoice/${item.inv?.kode || item.kode}`} className="btn btn-primary btn-xs">
                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                            </a>
                                            {(item.status != 1 || auth.level === 'super admin') && (
                                                <button className="btn btn-error btn-xs" onClick={() => setDeleteItem(item)}>
                                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                    {/* <td>
                                        <button className="btn btn-accent btn-xs" onClick={() => window.open(`/review/${item.inv?.kode || item.kode}`, '_blank')}>
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
                                        </button>
                                    </td> */}
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

            {deleteItem && (
                <dialog className="modal modal-open">
                    <div className="modal-box text-center">
                        <div className="w-20 h-20 rounded-full bg-error/10 flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-error" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </div>
                        <h3 className="font-bold text-lg">Hapus Invoice</h3>
                        <p className="text-base-content/60 mt-2">Apakah anda yakin ingin menghapus invoice ini?</p>
                        <p className="font-bold text-lg mt-1">{deleteItem.kode_invoice}</p>
                        <div className="modal-action justify-center">
                            <button className="btn btn-ghost" onClick={() => setDeleteItem(null)}>Batal</button>
                            <button className="btn btn-error" onClick={() => { router.delete(`/listinvoice2/${deleteItem.id}`); setDeleteItem(null); }}>Hapus</button>
                        </div>
                    </div>
                    <form method="dialog" className="modal-backdrop" onClick={() => setDeleteItem(null)}><button>close</button></form>
                </dialog>
            )}
        </AppLayout>
    );
}
