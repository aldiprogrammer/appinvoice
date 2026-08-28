import { useState } from 'react';
import { Head, router, usePage } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';

export default function Detail({ data: detailData, list, inv, total, cs, ls, total_tambahan }) {
    const { auth } = usePage().props;
    const [deleteItem, setDeleteItem] = useState(null);
    const [reviewOpen, setReviewOpen] = useState(false);
    const hasTambahan = list.some((item) => Number(item.harga_tambahan) > 0);

    if (!inv) {
        return (
            <AppLayout title="Detail Invoice">
                <Head title="Detail Invoice" />
                <div className="card bg-base-100 border border-base-300 shadow-sm p-6">
                    <div className="flex flex-col items-center py-12">
                        <div className="w-24 h-24 rounded-full bg-base-200 flex items-center justify-center mb-4">
                            <svg className="w-10 h-10 text-base-content/30" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                        </div>
                        <p className="text-base-content/50 font-bold">Data list invoice sudah tidak tersedia</p>
                        <a href="/listinvoice" className="btn btn-primary mt-4">Kembali</a>
                    </div>
                </div>
            </AppLayout>
        );
    }

    return (
        <AppLayout title="Detail Invoice">
            <Head title="Detail Invoice" />
            <div className="card bg-base-100 border border-base-300 shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-bold">Detail Invoice</h1>
                        <p className="text-sm text-base-content/50">Informasi lengkap invoice</p>
                    </div>
                </div>

                {/* Header Info */}
                <div className="bg-primary/5 rounded-xl p-4 border border-primary/20 mb-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                            <span className="text-xs font-bold text-primary uppercase">Kode Invoice</span>
                            <p className="font-bold text-primary text-lg mt-1">{inv.kode_invoice}</p>
                            {ls?.status == 1 ? (
                                <span className="badge badge-success gap-1">
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                    Disetujui
                                </span>
                            ) : (
                                <span className="badge badge-warning gap-1">
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" strokeWidth={2} stroke="currentColor" fill="none" /></svg>
                                    Menunggu
                                </span>
                            )}
                            {ls?.status == 1 && ls?.userSetujui && (
                                <p className="text-xs text-base-content/50 mt-2">Disetujui oleh: <span className="font-bold">{ls.userSetujui.username}</span></p>
                            )}
                        </div>
                        <div>
                            <span className="text-xs font-bold text-primary uppercase">No Po</span>
                            <p className="font-bold text-lg mt-1">{inv.no_po}</p>
                        </div>
                        <div>
                            <span className="text-xs font-bold text-primary uppercase">Customer</span>
                            <p className="font-bold text-lg mt-1">{inv.customernew?.nama || inv.customer}</p>
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto rounded-xl border bg-white mb-4">
                    <table className="table table-sm w-full mb-0">
                        <thead>
                            <tr className="bg-primary text-white">
                                <th className="text-white">No</th>
                                <th className="text-white">Barang</th>
                                <th className="text-white">Harga/Kg</th>
                                <th className="text-white">Jml Sak</th>
                                <th className="text-white">Total</th>
                                {hasTambahan && <th className="text-white">Hrg Tambahan</th>}
                                {hasTambahan && <th className="text-white">Total Tambahan</th>}
                                <th className="text-center text-white">Opsi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {list.map((item, idx) => (
                                <tr key={item.id}>
                                    <th>{idx + 1}</th>
                                    <td className="font-bold">{item.produk} ({item.kemasan}Kg)</td>
                                    <td>Rp {Number(item.harga).toLocaleString('id-ID')}</td>
                                    <td>{item.jml_sak}</td>
                                    <td className="font-bold">Rp {Number(item.total_harga).toLocaleString('id-ID')}</td>
                                    {hasTambahan && (
                                        <td className={Number(item.harga_tambahan) > 0 ? 'font-bold text-black' : ''}>
                                            {Number(item.harga_tambahan) > 0 ? `Rp ${Number(item.harga_tambahan).toLocaleString('id-ID')}` : '-'}
                                        </td>
                                    )}
                                    {hasTambahan && (
                                        <td className={Number(item.total_harga_tambahan) > 0 ? 'font-bold text-black' : ''}>
                                            {Number(item.total_harga_tambahan) > 0 ? `Rp ${Number(item.total_harga_tambahan).toLocaleString('id-ID')}` : '-'}
                                        </td>
                                    )}
                                    <td>
                                        <div className="flex justify-center gap-1">
                                            {(ls?.status != 1 || auth.level === 'super admin') && (
                                                <>
                                                    <a href={`/editinvoice/${item.id}`} className="btn btn-primary btn-xs">
                                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                                                    </a>
                                                    <button className="btn btn-error btn-xs" onClick={() => setDeleteItem(item)}>
                                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                                    </button>
                                                </>
                                            )}
                                            {(ls?.status == 1 && auth.level !== 'super admin') && (
                                                <span className="text-base-content/30" title="Invoice sudah disetujui">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Total & Actions */}
                <div className="p-4 border rounded-xl">
                    <div className="bg-primary/5 rounded-xl p-3 border border-primary/20 flex justify-between items-center mb-2">
                        <span className="text-base-content/50 font-bold">Total Harga</span>
                        <h3 className="text-xl font-bold text-primary">Rp {Number(total).toLocaleString('id-ID')}</h3>
                    </div>
                    {hasTambahan && total_tambahan > 0 && (
                        <div className="bg-warning/5 rounded-xl p-3 border border-warning/20 flex justify-between items-center mb-2">
                            <span className="text-base-content/50 font-bold">Total Harga Tambahan</span>
                            <h3 className="text-xl font-bold text-black">Rp {Number(total_tambahan).toLocaleString('id-ID')}</h3>
                        </div>
                    )}
                    {hasTambahan && total_tambahan > 0 && (
                        <div className="bg-success/5 rounded-xl p-3 border border-success/20 flex justify-between items-center mb-4">
                            <span className="font-bold">Grand Total</span>
                            <h3 className="text-xl font-bold text-black">Rp {Number(total + total_tambahan).toLocaleString('id-ID')}</h3>
                        </div>
                    )}

                    <div className="flex flex-wrap gap-2">
                        {ls?.status == 1 && (
                            <a href={`/review/${inv.kode}`} className="btn btn-primary gap-2" target="_blank">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
                                Cetak Invoice
                            </a>
                        )}
                        <a href={`/cetak/${inv.kode}`} className="btn btn-success gap-2" target="_blank">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                            Export PDF
                        </a>
                        <button className="btn btn-secondary gap-2" onClick={() => setReviewOpen(true)}>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                            Review
                        </button>
                        {auth.level === 'super admin' && (
                            <a href={`/statusinvoice/${inv.kode}`} className="btn btn-warning gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                Update status
                            </a>
                        )}
                    </div>
                </div>
            </div>

            {/* Delete Modal */}
            {deleteItem && (
                <dialog className="modal modal-open">
                    <div className="modal-box text-center">
                        <div className="w-20 h-20 rounded-full bg-error/10 flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-error" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </div>
                        <h3 className="font-bold text-lg">Hapus data</h3>
                        <p className="text-base-content/60 mt-2">Apakah anda ingin menghapus data ini?</p>
                        <div className="modal-action justify-center">
                            <button className="btn btn-ghost" onClick={() => setDeleteItem(null)}>Batal</button>
                            <button className="btn btn-error" onClick={(e) => { e.stopPropagation(); router.delete(`/listinvoice/${deleteItem.id}`, { onFinish: () => setDeleteItem(null) }); }}>Hapus</button>
                        </div>
                    </div>
                    <div className="modal-backdrop" onClick={() => setDeleteItem(null)} />
                </dialog>
            )}

            {/* Review Modal */}
            {reviewOpen && (
                <dialog className="modal modal-open">
                    <div className="modal-box max-w-5xl p-0">
                        <div className="modal-header border-0 pb-0">
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => setReviewOpen(false)}>✕</button>
                        </div>
                        <div className="modal-body overflow-auto" style={{ maxHeight: '80vh' }}>
                            <iframe src={`/review-preview/${inv.kode}`} className="w-full border-0" style={{ minHeight: '600px' }} title="Review Invoice" />
                        </div>
                    </div>
                </dialog>
            )}
        </AppLayout>
    );
}
