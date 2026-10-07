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
                <div className="card bg-white border" style={{ borderColor: '#e5e7eb', padding: '1.5rem', boxShadow: '0 1px 2px rgba(0,0,0,.05)' }}>
                    <div className="d-flex flex-column align-items-center" style={{ padding: '3rem 0' }}>
                        <div className="d-flex align-items-center justify-content-center mb-4" style={{ width: 96, height: 96, borderRadius: '50%', background: '#f0f2f5' }}>
                            <svg style={{ width: 40, height: 40, color: 'rgba(0,0,0,.3)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                        </div>
                        <p className="text-muted font-weight-bold">Data list invoice sudah tidak tersedia</p>
                        <a href="/listinvoice" className="btn btn-primary mt-4">Kembali</a>
                    </div>
                </div>
            </AppLayout>
        );
    }

    return (
        <AppLayout title="Detail Invoice">
            <Head title="Detail Invoice" />
            <div className="card bg-white border" style={{ borderColor: '#e5e7eb', padding: '1.5rem', boxShadow: '0 1px 2px rgba(0,0,0,.05)' }}>
                <div className="d-flex align-items-center justify-content-between mb-4">
                    <div>
                        <h1 className="font-weight-bold" style={{ fontSize: '1.5rem' }}>Detail Invoice</h1>
                        <p className="small text-muted">Informasi lengkap invoice</p>
                    </div>
                </div>

                {/* Header Info */}
                <div className="mb-4" style={{ background: 'rgba(0,123,255,.05)', borderRadius: '0.75rem', padding: '1rem', border: '1px solid rgba(0,123,255,.2)' }}>
                    <div className="row">
                        <div className="col-12 col-sm-4 mb-3 mb-sm-0">
                            <span className="font-weight-bold text-primary text-uppercase" style={{ fontSize: '.75rem' }}>Kode Invoice</span>
                            <p className="font-weight-bold text-primary mt-1" style={{ fontSize: '1.125rem' }}>{inv.kode_invoice}</p>
                            {ls?.status == 1 ? (
                                <span className="badge badge-success">
                                    <svg style={{ width: 12, height: 12 }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                    Disetujui
                                </span>
                            ) : (
                                <span className="badge badge-warning">
                                    <svg style={{ width: 12, height: 12 }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" strokeWidth={2} stroke="currentColor" fill="none" /></svg>
                                    Menunggu
                                </span>
                            )}
                            {ls?.status == 1 && ls?.userSetujui && (
                                <p className="text-muted mt-2" style={{ fontSize: '.75rem' }}>Disetujui oleh: <span className="font-weight-bold">{ls.userSetujui.username}</span></p>
                            )}
                        </div>
                        <div className="col-12 col-sm-4 mb-3 mb-sm-0">
                            <span className="font-weight-bold text-primary text-uppercase" style={{ fontSize: '.75rem' }}>No Po</span>
                            <p className="font-weight-bold mt-1" style={{ fontSize: '1.125rem' }}>{inv.no_po}</p>
                        </div>
                        <div className="col-12 col-sm-4">
                            <span className="font-weight-bold text-primary text-uppercase" style={{ fontSize: '.75rem' }}>Customer</span>
                            <p className="font-weight-bold mt-1" style={{ fontSize: '1.125rem' }}>{inv.customernew?.nama || inv.customer}</p>
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="table-responsive mb-4" style={{ border: '1px solid #dee2e6', borderRadius: '0.75rem', background: '#fff' }}>
                    <table className="table table-sm w-100 mb-0">
                        <thead style={{ background: '#3b82f6' }}>
                            <tr>
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
                                    <td className="font-weight-bold">{item.produk} ({item.kemasan}Kg)</td>
                                    <td>Rp {Number(item.harga).toLocaleString('id-ID')}</td>
                                    <td>{item.jml_sak}</td>
                                    <td className="font-weight-bold">Rp {Number(item.total_harga).toLocaleString('id-ID')}</td>
                                    {hasTambahan && (
                                        <td className={Number(item.harga_tambahan) > 0 ? 'font-weight-bold text-dark' : ''}>
                                            {Number(item.harga_tambahan) > 0 ? `Rp ${Number(item.harga_tambahan).toLocaleString('id-ID')}` : '-'}
                                        </td>
                                    )}
                                    {hasTambahan && (
                                        <td className={Number(item.total_harga_tambahan) > 0 ? 'font-weight-bold text-dark' : ''}>
                                            {Number(item.total_harga_tambahan) > 0 ? `Rp ${Number(item.total_harga_tambahan).toLocaleString('id-ID')}` : '-'}
                                        </td>
                                    )}
                                    <td>
                                        <div className="d-flex justify-content-center" style={{ gap: '.25rem' }}>
                                            {(ls?.status != 1 || auth.level === 'super admin') && (
                                                <>
                                                    <a href={`/editinvoice/${item.id}`} className="btn btn-primary btn-sm">
                                                        <svg style={{ width: 12, height: 12 }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                                                    </a>
                                                    <button className="btn btn-danger btn-sm" onClick={() => setDeleteItem(item)}>
                                                        <svg style={{ width: 12, height: 12 }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                                    </button>
                                                </>
                                            )}
                                            {(ls?.status == 1 && auth.level !== 'super admin') && (
                                                <span className="d-inline-flex" style={{ color: 'rgba(0,0,0,.3)' }} title="Invoice sudah disetujui">
                                                    <svg style={{ width: 16, height: 16 }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
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
                <div style={{ padding: '1rem', border: '1px solid #dee2e6', borderRadius: '0.75rem' }}>
                    <div className="d-flex justify-content-between align-items-center mb-2" style={{ background: 'rgba(0,123,255,.05)', borderRadius: '0.75rem', padding: '0.75rem', border: '1px solid rgba(0,123,255,.2)' }}>
                        <span className="text-muted font-weight-bold">Total Harga</span>
                        <h3 className="font-weight-bold text-primary" style={{ fontSize: '1.25rem' }}>Rp {Number(total).toLocaleString('id-ID')}</h3>
                    </div>
                    {hasTambahan && total_tambahan > 0 && (
                        <div className="d-flex justify-content-between align-items-center mb-2" style={{ background: 'rgba(255,193,7,.05)', borderRadius: '0.75rem', padding: '0.75rem', border: '1px solid rgba(255,193,7,.2)' }}>
                            <span className="text-muted font-weight-bold">Total Harga Tambahan</span>
                            <h3 className="font-weight-bold text-dark" style={{ fontSize: '1.25rem' }}>Rp {Number(total_tambahan).toLocaleString('id-ID')}</h3>
                        </div>
                    )}
                    {hasTambahan && total_tambahan > 0 && (
                        <div className="d-flex justify-content-between align-items-center mb-4" style={{ background: 'rgba(40,167,69,.05)', borderRadius: '0.75rem', padding: '0.75rem', border: '1px solid rgba(40,167,69,.2)' }}>
                            <span className="font-weight-bold">Grand Total</span>
                            <h3 className="font-weight-bold text-dark" style={{ fontSize: '1.25rem' }}>Rp {Number(total + total_tambahan).toLocaleString('id-ID')}</h3>
                        </div>
                    )}

                    <div className="d-flex flex-wrap">
                        {ls?.status == 1 && (
                            <a href={`/review/${inv.kode}`} className="btn btn-primary mr-2 mb-2" target="_blank">
                                <svg style={{ width: 16, height: 16 }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
                                Cetak Invoice
                            </a>
                        )}
                        <a href={`/cetak/${inv.kode}`} className="btn btn-success mr-2 mb-2" target="_blank">
                            <svg style={{ width: 16, height: 16 }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                            Export PDF
                        </a>
                        <button className="btn btn-secondary mr-2 mb-2" onClick={() => setReviewOpen(true)}>
                            <svg style={{ width: 16, height: 16 }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                            Review
                        </button>
                        {auth.level === 'super admin' && (
                            <a href={`/statusinvoice/${inv.kode}`} className="btn btn-warning mr-2 mb-2">
                                <svg style={{ width: 16, height: 16 }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                Update status
                            </a>
                        )}
                    </div>
                </div>
            </div>

            {/* Delete Modal */}
            {deleteItem && (
                <div className="modal d-block" style={{ zIndex: 1050, background: 'rgba(0,0,0,.5)', overflowY: 'auto' }} onClick={() => setDeleteItem(null)}>
                    <div className="modal-dialog modal-dialog-centered" role="document" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-content">
                            <div className="modal-body text-center">
                                <div className="d-flex align-items-center justify-content-center mx-auto mb-4" style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(220,53,69,.1)' }}>
                                    <svg style={{ width: 32, height: 32, color: '#dc3545' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                </div>
                                <h3 className="font-weight-bold" style={{ fontSize: '1.125rem' }}>Hapus data</h3>
                                <p className="mt-2" style={{ color: 'rgba(0,0,0,.6)' }}>Apakah anda ingin menghapus data ini?</p>
                                <div className="modal-footer justify-content-center">
                                    <button className="btn btn-light" onClick={() => setDeleteItem(null)}>Batal</button>
                                    <button className="btn btn-danger" onClick={(e) => { e.stopPropagation(); router.delete(`/listinvoice/${deleteItem.id}`, { onFinish: () => setDeleteItem(null) }); }}>Hapus</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Review Modal */}
            {reviewOpen && (
                <div className="modal d-block" style={{ zIndex: 1050, background: 'rgba(0,0,0,.5)', overflowY: 'auto' }} onClick={() => setReviewOpen(false)}>
                    <div className="modal-dialog modal-dialog-centered modal-lg" role="document" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-content">
                            <div className="modal-header justify-content-end" style={{ borderBottom: 0, paddingBottom: 0 }}>
                                <button type="button" className="close" aria-label="Close" onClick={() => setReviewOpen(false)}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
                                <iframe src={`/review-preview/${inv.kode}`} className="w-100 border-0" style={{ minHeight: '600px' }} title="Review Invoice" />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AppLayout>
    );
}