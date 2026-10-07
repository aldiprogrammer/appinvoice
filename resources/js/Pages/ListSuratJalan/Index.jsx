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
        (item.no_sj || '').toLowerCase().includes(search.toLowerCase()) ||
        (item.nomor_kendaraan || '').toLowerCase().includes(search.toLowerCase()) ||
        (item.user?.username || '').toLowerCase().includes(search.toLowerCase()) ||
        (item.customer_nama || '').toLowerCase().includes(search.toLowerCase())
    );
    const totalPages = Math.ceil(filtered.length / perPage);
    const paginated = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

    return (
        <AppLayout title="List Surat Jalan">
            <Head title="List Surat Jalan" />
            <div className="card bg-white border shadow-sm p-4" style={{ borderColor: '#e5e7eb' }}>
                <div className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center justify-content-between mb-4" style={{ gap: '.75rem' }}>
                    <div>
                        <h1 className="font-weight-bold" style={{ fontSize: '1.5rem' }}>List Surat Jalan</h1>
                        <p className="small text-muted">Semua data surat jalan tersimpan</p>
                    </div>
                </div>

                <div className="mb-3">
                    <input type="text" placeholder="Cari surat jalan..." className="form-control" style={{ maxWidth: '20rem' }} value={search} onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }} />
                </div>

                <div className="table-responsive">
                    <table className="table table-striped table-sm">
                        <thead style={{ background: '#3b82f6' }}>
                            <tr>
                                <th className="text-white">No</th>
                                <th className="text-white">No SJ</th>
                                <th className="text-white">No. Kendaraan</th>
                                <th className="text-white">Customer</th>
                                <th className="text-white">Pengguna</th>
                                <th className="text-white">Tanggal</th>
                                <th className="text-white">Total KG</th>
                                <th className="text-white">S.Cetak</th>
                                <th className="text-white">Status</th>
                                <th className="text-white">Disetujui</th>
                                <th className="text-center text-white">Opsi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginated.length === 0 ? (
                                <tr>
                                    <td colSpan={11} className="text-center" style={{ padding: '3rem 0' }}>
                                        <div className="d-flex flex-column align-items-center">
                                            <div className="rounded-circle d-flex align-items-center justify-content-center mb-3" style={{ width: 64, height: 64, background: '#f0f2f5' }}>
                                                <i className="fas fa-file-alt" style={{ color: 'rgba(0,0,0,.3)', fontSize: '2rem' }} />
                                            </div>
                                            <p className="font-weight-bold" style={{ color: 'rgba(0,0,0,.4)' }}>Belum ada data surat jalan</p>
                                            <a href="/suratjalan" className="btn btn-primary btn-sm mt-2">Buat Surat Jalan Baru</a>
                                        </div>
                                    </td>
                                </tr>
                            ) : paginated.map((item, idx) => (
                                <tr key={item.id}>
                                    <th>{(currentPage - 1) * perPage + idx + 1}</th>
                                    <td className="font-weight-bold">{item.no_sj}</td>
                                    <td>{item.nomor_kendaraan || '-'}</td>
                                    <td>{item.customer_nama || '-'}</td>
                                    <td>{item.pengguna_username || '-'}</td>
                                    <td>{item.tanggal ? new Date(item.tanggal).toLocaleDateString('id-ID') : '-'}</td>
                                    <td className="font-weight-bold">{Number(item.total_kg || 0).toLocaleString('id-ID')} kg</td>
                                    <td>
                                        {item.status_cetak == 0 ? (
                                            <span className="badge badge-warning">
                                                <i className="fas fa-print mr-1" style={{ fontSize: 12 }} />
                                                Belum
                                            </span>
                                        ) : (
                                            <span className="badge badge-success">
                                                <i className="fas fa-check mr-1" style={{ fontSize: 12 }} />
                                                Dicetak
                                            </span>
                                        )}
                                    </td>
                                    <td>
                                        {item.status == 0 ? (
                                            <span className="badge badge-warning">
                                                <i className="fas fa-circle mr-1" style={{ fontSize: 12 }} />
                                                Menunggu
                                            </span>
                                        ) : (
                                            <span className="badge badge-success">
                                                <i className="fas fa-check mr-1" style={{ fontSize: 12 }} />
                                                Disetujui
                                            </span>
                                        )}
                                    </td>
                                    <td>{item.user_setujui_username || '-'}</td>
                                    <td>
                                        <div className="d-flex justify-content-center" style={{ gap: '.25rem' }}>
                                            <a href={`/listsuratjalan/${item.no_sj}`} className="btn btn-primary btn-sm">
                                                <i className="fas fa-eye" />
                                            </a>
                                            {(item.status != 1 || auth.level === 'super admin') && (
                                                <button className="btn btn-danger btn-sm" onClick={() => setDeleteItem(item)}>
                                                    <i className="fas fa-trash-alt" />
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {totalPages > 1 && (
                    <div className="d-flex justify-content-between align-items-center mt-3">
                        <span className="small text-muted">Menampilkan {(currentPage - 1) * perPage + 1}-{Math.min(currentPage * perPage, filtered.length)} dari {filtered.length} data</span>
                        <nav>
                            <ul className="pagination pagination-sm mb-0">
                                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                    <button className="page-link" disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>«</button>
                                </li>
                                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => (
                                    <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                                        <button className="page-link" onClick={() => setCurrentPage(i + 1)}>{i + 1}</button>
                                    </li>
                                ))}
                                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                    <button className="page-link" disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>»</button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                )}
            </div>

            {deleteItem && (
                <div className="modal d-block" style={{ zIndex: 1050, background: 'rgba(0,0,0,.5)', overflowY: 'auto' }} onClick={() => setDeleteItem(null)}>
                    <div className="modal-dialog modal-dialog-centered" role="document" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title font-weight-bold">Hapus Surat Jalan</h5>
                                <button type="button" className="close" onClick={() => setDeleteItem(null)}><span>&times;</span></button>
                            </div>
                            <div className="modal-body text-center">
                                <div className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: 80, height: 80, background: 'rgba(220,53,69,.1)' }}>
                                    <i className="fas fa-trash-alt" style={{ color: '#dc3545', fontSize: '2rem' }} />
                                </div>
                                <p className="text-muted" style={{ marginTop: '.5rem' }}>Apakah anda yakin ingin menghapus surat jalan ini?</p>
                                <p className="font-weight-bold" style={{ fontSize: '1.125rem', marginTop: '.25rem' }}>{deleteItem.no_sj}</p>
                            </div>
                            <div className="modal-footer justify-content-center">
                                <button className="btn btn-light" onClick={() => setDeleteItem(null)}>Batal</button>
                                <button className="btn btn-danger" onClick={() => { router.delete(`/listsuratjalan2/${deleteItem.id}`); setDeleteItem(null); }}>Hapus</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AppLayout>
    );
}