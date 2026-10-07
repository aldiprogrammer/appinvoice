import { useState } from 'react';
import { Head, router, usePage } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';

export default function Detail({ list, sj, total, ls }) {
    const { auth } = usePage().props;
    const [deleteItem, setDeleteItem] = useState(null);
    const [reviewOpen, setReviewOpen] = useState(false);

    if (!sj) {
        return (
            <AppLayout title="Detail Surat Jalan">
                <Head title="Detail Surat Jalan" />
                <div className="card bg-white border shadow-sm p-4" style={{ borderColor: '#e5e7eb' }}>
                    <div className="d-flex flex-column align-items-center" style={{ padding: '3rem 0' }}>
                        <div className="rounded-circle d-flex align-items-center justify-content-center mb-4" style={{ width: 96, height: 96, background: '#f0f2f5' }}>
                            <i className="fas fa-file-alt" style={{ color: 'rgba(0,0,0,.3)', fontSize: '2.5rem' }} />
                        </div>
                        <p className="text-muted font-weight-bold">Data surat jalan sudah tidak tersedia</p>
                        <a href="/listsuratjalan" className="btn btn-primary mt-3">Kembali</a>
                    </div>
                </div>
            </AppLayout>
        );
    }

    return (
        <AppLayout title="Detail Surat Jalan">
            <Head title="Detail Surat Jalan" />
            <div className="card bg-white border shadow-sm p-4" style={{ borderColor: '#e5e7eb' }}>
                <div className="d-flex align-items-center justify-content-between mb-4">
                    <div>
                        <h1 className="font-weight-bold" style={{ fontSize: '1.5rem' }}>Detail Surat Jalan</h1>
                        <p className="small text-muted">Informasi lengkap surat jalan</p>
                    </div>
                </div>

                <div className="rounded border p-4 mb-3" style={{ background: 'rgba(0,123,255,.05)', borderColor: 'rgba(0,123,255,.2)', borderRadius: '.75rem' }}>
                    <div className="row">
                        <div className="col-12 col-sm-4">
                            <span className="small font-weight-bold text-primary text-uppercase">No Surat Jalan</span>
                            <p className="font-weight-bold text-primary mt-1" style={{ fontSize: '1.125rem' }}>{sj.no_sj}</p>
                            {ls?.status == 1 ? (
                                <span className="badge badge-success">
                                    <i className="fas fa-check mr-1" style={{ fontSize: 12 }} />
                                    Disetujui
                                </span>
                            ) : (
                                <span className="badge badge-warning">
                                    <i className="fas fa-circle mr-1" style={{ fontSize: 12 }} />
                                    Menunggu
                                </span>
                            )}
                            {ls?.status == 1 && ls?.userSetujui && (
                                <p className="small text-muted mt-2">Disetujui oleh: <span className="font-weight-bold">{ls.userSetujui.username}</span></p>
                            )}
                        </div>
                        <div className="col-12 col-sm-4">
                            <span className="small font-weight-bold text-primary text-uppercase">Customer</span>
                            <p className="font-weight-bold mt-1" style={{ fontSize: '1.125rem' }}>{sj.customernew?.nama || sj.customer}</p>
                        </div>
                        <div className="col-12 col-sm-4">
                            <span className="small font-weight-bold text-primary text-uppercase">Alamat</span>
                            <p className="font-weight-bold mt-1" style={{ fontSize: '1.125rem' }}>{sj.alamat}</p>
                        </div>
                        <div className="col-12 col-sm-4">
                            <span className="small font-weight-bold text-primary text-uppercase">Nomor Kendaraan</span>
                            <p className="font-weight-bold mt-1" style={{ fontSize: '1.125rem' }}>{sj.nomor_kendaraan || '-'}</p>
                        </div>
                    </div>
                </div>

                <div className="table-responsive rounded border bg-white mb-3">
                    <table className="table table-sm mb-0">
                        <thead style={{ background: '#3b82f6' }}>
                            <tr>
                                <th className="text-white">No</th>
                                <th className="text-white">Barang</th>
                                <th className="text-white">Harga/Kg</th>
                                <th className="text-white">Jml Sak</th>
                                <th className="text-white">Total KG</th>
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
                                    <td className="font-weight-bold">{Number(item.total_kg).toLocaleString('id-ID')} kg</td>
                                    <td>
                                        <div className="d-flex justify-content-center" style={{ gap: '.25rem' }}>
                                            {(ls?.status != 1 || auth.level === 'super admin') && (
                                                <a href={`/suratjalan/edit/${sj.id}`} className="btn btn-info btn-sm">
                                                    <i className="fas fa-pencil-alt mr-1" />
                                                    Edit
                                                </a>
                                            )}
                                            {(!ls || ls?.status != 1 || auth.level === 'super admin') && (
                                                <button className="btn btn-danger btn-sm" onClick={() => setDeleteItem(item)}>
                                                    <i className="fas fa-trash-alt" />
                                                </button>
                                            )}
                                            {ls?.status == 1 && auth.level !== 'super admin' && (
                                                <span style={{ color: 'rgba(0,0,0,.3)' }} title="Surat jalan sudah disetujui">
                                                    <i className="fas fa-lock" />
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="rounded border p-4" style={{ borderRadius: '.75rem' }}>
                    <div className="rounded d-flex justify-content-between align-items-center p-3 mb-2 border" style={{ background: 'rgba(0,123,255,.05)', borderColor: 'rgba(0,123,255,.2)' }}>
                        <span className="text-muted font-weight-bold">Total KG</span>
                        <h3 className="font-weight-bold text-primary" style={{ fontSize: '1.25rem' }}>{Number(total).toLocaleString('id-ID')} kg</h3>
                    </div>

                    <div className="d-flex flex-wrap" style={{ gap: '.5rem' }}>
                        {ls?.status == 1 && (
                            <a href={`/review-sj/${sj.no_sj}`} className="btn btn-primary" target="_blank">
                                <i className="fas fa-print mr-2" />
                                Cetak Surat Jalan
                            </a>
                        )}
                        <button className="btn btn-secondary" onClick={() => setReviewOpen(true)}>
                            <i className="fas fa-eye mr-2" />
                            Review
                        </button>
                        {auth.level === 'super admin' && (
                            <a href={`/statusesj/${sj.no_sj}`} className="btn btn-warning">
                                <i className="fas fa-check-circle mr-2" />
                                Update status
                            </a>
                        )}
                    </div>
                </div>
            </div>

            {deleteItem && (
                <div className="modal d-block" style={{ zIndex: 1050, background: 'rgba(0,0,0,.5)', overflowY: 'auto' }} onClick={() => setDeleteItem(null)}>
                    <div className="modal-dialog modal-dialog-centered" role="document" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title font-weight-bold">Hapus data</h5>
                                <button type="button" className="close" onClick={() => setDeleteItem(null)}><span>&times;</span></button>
                            </div>
                            <div className="modal-body text-center">
                                <div className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: 80, height: 80, background: 'rgba(220,53,69,.1)' }}>
                                    <i className="fas fa-trash-alt" style={{ color: '#dc3545', fontSize: '2rem' }} />
                                </div>
                                <p className="text-muted" style={{ marginTop: '.5rem' }}>Apakah anda ingin menghapus data ini?</p>
                            </div>
                            <div className="modal-footer justify-content-center">
                                <button className="btn btn-light" onClick={() => setDeleteItem(null)}>Batal</button>
                                <button className="btn btn-danger" onClick={(e) => { e.stopPropagation(); router.delete(`/listsuratjalan/${deleteItem.id}`, { onFinish: () => setDeleteItem(null) }); }}>Hapus</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {reviewOpen && (
                <div className="modal d-block" style={{ zIndex: 1050, background: 'rgba(0,0,0,.5)', overflowY: 'auto' }} onClick={() => setReviewOpen(false)}>
                    <div className="modal-dialog modal-dialog-centered" role="document" style={{ maxWidth: '64rem' }} onClick={(e) => e.stopPropagation()}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" onClick={() => setReviewOpen(false)}><span>&times;</span></button>
                            </div>
                            <div className="modal-body" style={{ overflow: 'auto', maxHeight: '80vh', padding: 0 }}>
                                <iframe src={`/review-preview-sj/${sj.no_sj}`} className="w-100 border-0" style={{ minHeight: '600px' }} title="Review Surat Jalan" />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AppLayout>
    );
}