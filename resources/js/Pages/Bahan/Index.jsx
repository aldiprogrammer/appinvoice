import { useState } from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';

export default function Index({ bahan }) {
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const perPage = 10;

    const filtered = bahan.filter((it) =>
        it.id_bahan.toLowerCase().includes(search.toLowerCase()) ||
        it.kode_bahan.toLowerCase().includes(search.toLowerCase())
    );
    const totalPages = Math.ceil(filtered.length / perPage);
    const paginated = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

    const formatDate = (d) => {
        if (!d) return '-';
        const date = new Date(d + 'T00:00:00');
        return date.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
    };

    return (
        <AppLayout title="Data Bahan">
            <Head title="Data Bahan" />
            <div className="card bg-white border shadow-sm p-4" style={{ borderColor: '#e5e7eb' }}>
                <div className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center justify-content-between mb-4" style={{ gap: '.75rem' }}>
                    <div>
                        <h1 className="font-weight-bold" style={{ fontSize: '1.5rem' }}>Data Bahan</h1>
                        <p className="small text-muted">Bahan yang sudah selesai bongkar</p>
                    </div>
                </div>

                <div className="d-flex flex-column flex-sm-row align-items-sm-center justify-content-between mb-3" style={{ gap: '.75rem' }}>
                    <input type="text" placeholder="Cari id bahan / kode bahan..." className="form-control" style={{ maxWidth: '20rem' }} value={search} onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }} />
                </div>

                <div className="table-responsive">
                    <table className="table table-striped table-sm">
                        <thead style={{ background: '#3b82f6' }}>
                            <tr>
                                <th className="text-white">No</th>
                                <th className="text-white">Id Bahan</th>
                                <th className="text-white">Kode Bahan</th>
                                <th className="text-white">Total Sak</th>
                                <th className="text-white">Tanggal Masuk</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginated.length === 0 ? (
                                <tr><td colSpan={5} className="text-center" style={{ padding: '2rem 0', color: 'rgba(0,0,0,.4)' }}>Tidak ada data</td></tr>
                            ) : paginated.map((item, idx) => (
                                <tr key={item.id}>
                                    <th>{(currentPage - 1) * perPage + idx + 1}</th>
                                    <td><span className="badge badge-success">{item.id_bahan}</span></td>
                                    <td><span className="badge badge-primary">{item.kode_bahan}</span></td>
                                    <td className="font-weight-bold">{item.total_sak}</td>
                                    <td>{formatDate(item.tanggal_masuk)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {totalPages > 1 && (
                    <div className="d-flex justify-content-between align-items-center mt-3">
                        <span className="small text-muted">Menampilkan {(currentPage-1)*perPage+1}-{Math.min(currentPage*perPage, filtered.length)} dari {filtered.length} data</span>
                        <nav>
                            <ul className="pagination pagination-sm mb-0">
                                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                    <button className="page-link" disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>«</button>
                                </li>
                                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => (
                                    <li key={i} className={`page-item ${currentPage === i+1 ? 'active' : ''}`}>
                                        <button className="page-link" onClick={() => setCurrentPage(i+1)}>{i+1}</button>
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
        </AppLayout>
    );
}