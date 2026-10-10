import { useState } from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';

function daysLabel(days) {
    return `${days} hari`;
}

function severity(days, waktu) {
    if (waktu > 0 && days >= waktu * 2) return { bg: '#dc2626', label: 'Terlambat' };
    return { bg: '#f59e0b', label: 'Perlu Follow-up' };
}

function waNumber(nohp) {
    let digits = (nohp || '').replace(/\D/g, '');
    if (digits.startsWith('0')) digits = '62' + digits.slice(1);
    return digits;
}

const ORDER_COLUMNS = [
    { key: 'tanggal', label: 'Tanggal' },
    { key: 'no_bon', label: 'No Bon' },
    { key: 'no_sj', label: 'No SJ' },
    { key: 'kode_item', label: 'Kode Item' },
    { key: 'barang', label: 'Barang' },
    { key: 'gudang', label: 'Gudang' },
    { key: 'zak', label: 'Zak' },
    { key: 'kg', label: 'Kg' },
    { key: 'total_kg', label: 'Total Kg' },
    { key: 'harga', label: 'Harga' },
    { key: 'tambahan_harga_beras', label: 'Tambahan Harga Beras' },
    { key: 'jumlah', label: 'Jumlah' },
];

export default function Index({ customers = [], waktu = 0, status = 'Tidak Aktif' }) {
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [detailItem, setDetailItem] = useState(null);
    const perPage = 10;

    const filtered = customers.filter((c) =>
        (c.nama_customer || '').toLowerCase().includes(search.toLowerCase()) ||
        (c.nohp || '').toLowerCase().includes(search.toLowerCase()) ||
        (c.last_barang || '').toLowerCase().includes(search.toLowerCase())
    );
    const totalPages = Math.ceil(filtered.length / perPage);
    const paginated = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

    return (
        <AppLayout title="Daftar Follow-up">
            <Head title="Daftar Follow-up" />
            <style>{`
                .fl-card {
                    background: #fff; border: 1px solid #e5e7eb; border-radius: 14px;
                    padding: 14px; margin-bottom: 12px;
                    box-shadow: 0 1px 3px rgba(0,0,0,.06);
                }
                .fl-avatar {
                    width: 44px; height: 44px; border-radius: 12px; flex-shrink: 0;
                    display: flex; align-items: center; justify-content: center;
                    background: linear-gradient(135deg,#f59e0b,#ea580c);
                    color: #fff; font-weight: 700; font-size: 1.1rem;
                }
                .fl-title { font-weight: 700; font-size: .95rem; color: #0f172a; line-height: 1.2; }
                .fl-sub { font-size: .76rem; color: #64748b; line-height: 1.3; }
                .fl-days { font-size: .72rem; color: #64748b; }
            `}</style>

            <div className="card bg-white border mb-3" style={{ borderColor: '#e5e7eb', boxShadow: '0 1px 2px rgba(0,0,0,.05)', padding: '1.5rem' }}>
                <div className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center justify-content-between mb-3" style={{ gap: 12 }}>
                    <div>
                        <h1 className="font-weight-bold" style={{ fontSize: '1.5rem' }}>Daftar Follow-up Customer</h1>
                        <p className="small text-muted mb-0">Customer yang order terakhirnya sudah melewati waktu follow-up</p>
                    </div>
                    <div className="d-flex align-items-center" style={{ gap: 8 }}>
                        <span className="badge" style={{ background: '#eff6ff', color: '#2563eb', fontSize: '.78rem', padding: '8px 12px' }}>
                            <i className="fas fa-clock mr-1"></i> Waktu: {waktu} hari
                        </span>
                        <span className="badge" style={{ background: status === 'Aktif' ? '#ecfdf5' : '#fef2f2', color: status === 'Aktif' ? '#16a34a' : '#dc2626', fontSize: '.78rem', padding: '8px 12px' }}>
                            <i className={`fas ${status === 'Aktif' ? 'fa-check-circle' : 'fa-times-circle'} mr-1`}></i> {status}
                        </span>
                    </div>
                </div>

                {status !== 'Aktif' && (
                    <div className="alert alert-warning small mb-3" style={{ borderRadius: '.5rem' }}>
                        <i className="fas fa-exclamation-triangle mr-2"></i>
                        Fitur follow-up sedang <b>Tidak Aktif</b>. Daftar di bawah tetap dihitung berdasarkan waktu <b>{waktu} hari</b>.
                    </div>
                )}

                <div className="d-flex flex-column flex-sm-row align-items-sm-center justify-content-between mb-4" style={{ gap: 12 }}>
                    <div className="p-3" style={{ background: '#fef2f2', borderRadius: '.5rem', minWidth: 200 }}>
                        <div className="small text-muted">Perlu di-follow-up</div>
                        <div className="font-weight-bold" style={{ fontSize: '1.5rem', color: '#dc2626' }}>{customers.length} customer</div>
                    </div>
                    <input
                        type="text"
                        placeholder="Cari nama, no hp, barang..."
                        className="form-control"
                        style={{ maxWidth: 320 }}
                        value={search}
                        onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                    />
                </div>

                {/* Table (desktop) */}
                <div className="table-responsive d-none d-md-block">
                    <table className="table table-striped table-sm w-100 mb-0">
                        <thead style={{ background: '#3b82f6' }}>
                            <tr>
                                <th className="text-white">No</th>
                                <th className="text-white">Nama Customer</th>
                                <th className="text-white">Order Terakhir</th>
                                <th className="text-white">Selisih</th>
                                <th className="text-white">Total Order</th>
                                <th className="text-white">No HP</th>
                                <th className="text-center text-white">Opsi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginated.length === 0 ? (
                                <tr><td colSpan={7} className="text-center text-muted" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
                                    {customers.length === 0 ? 'Tidak ada customer yang perlu di-follow-up' : 'Tidak ada data yang cocok'}
                                </td></tr>
                            ) : paginated.map((item, idx) => {
                                const sev = severity(item.days_since, waktu);
                                const wa = waNumber(item.nohp);
                                return (
                                    <tr key={`${item.nama_customer}-${idx}`}>
                                        <th>{(currentPage - 1) * perPage + idx + 1}</th>
                                        <td className="font-weight-bold">{item.nama_customer}</td>
                                        <td>{item.last_tanggal}</td>
                                        <td>
                                            <span className="badge" style={{ background: sev.bg, color: '#fff' }}>{daysLabel(item.days_since)}</span>
                                        </td>
                                        <td>{item.total_orders}</td>
                                        <td>{item.nohp || '-'}</td>
                                        <td className="text-center">
                                            <div className="d-flex justify-content-center" style={{ gap: 4 }}>
                                                <button className="btn btn-info btn-sm" onClick={() => setDetailItem(item)}>
                                                    <i className="fas fa-list mr-1"></i>Detail
                                                </button>
                                                {wa && (
                                                    <a href={`https://wa.me/${wa}`} target="_blank" rel="noreferrer" className="btn btn-success btn-sm">
                                                        <i className="fab fa-whatsapp"></i>
                                                    </a>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {/* Cards (mobile) */}
                <div className="d-md-none">
                    {paginated.length === 0 ? (
                        <div className="text-center text-muted py-4">
                            {customers.length === 0 ? 'Tidak ada customer yang perlu di-follow-up' : 'Tidak ada data yang cocok'}
                        </div>
                    ) : paginated.map((item, idx) => {
                        const sev = severity(item.days_since, waktu);
                        const wa = waNumber(item.nohp);
                        return (
                            <div key={`${item.nama_customer}-${idx}`} className="fl-card">
                                <div className="d-flex align-items-start justify-content-between" style={{ gap: 10 }}>
                                    <div className="d-flex align-items-center" style={{ gap: 10, minWidth: 0 }}>
                                        <div className="fl-avatar">{(item.nama_customer || '?').charAt(0).toUpperCase()}</div>
                                        <div style={{ minWidth: 0 }}>
                                            <div className="fl-title">{item.nama_customer}</div>
                                            <div className="fl-sub">{item.nohp || 'No HP belum ada'}</div>
                                        </div>
                                    </div>
                                    <span className="badge" style={{ background: sev.bg, color: '#fff', flexShrink: 0 }}>{daysLabel(item.days_since)}</span>
                                </div>

                                <div className="d-flex flex-wrap mt-3" style={{ gap: 12 }}>
                                    <div><div className="fl-sub">Order terakhir</div><div className="font-weight-bold small">{item.last_tanggal}</div></div>
                                    <div><div className="fl-sub">Total order</div><div className="font-weight-bold small">{item.total_orders}</div></div>
                                </div>
                                {item.last_barang && (
                                    <div className="fl-sub mt-2"><i className="fas fa-box mr-1"></i>{item.last_barang}</div>
                                )}

                                <div className="d-flex justify-content-between align-items-center mt-3" style={{ gap: 8 }}>
                                    <span className="badge" style={{ background: '#fef3c7', color: '#b45309' }}>{sev.label}</span>
                                    <div className="d-flex" style={{ gap: 6 }}>
                                        <button className="btn btn-info btn-sm" onClick={() => setDetailItem(item)}>
                                            <i className="fas fa-list mr-1"></i>Detail
                                        </button>
                                        {wa && (
                                            <a href={`https://wa.me/${wa}`} target="_blank" rel="noreferrer" className="btn btn-success btn-sm">
                                                <i className="fab fa-whatsapp mr-1"></i>Hubungi
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="d-flex flex-wrap justify-content-between align-items-center mt-4" style={{ gap: 8 }}>
                        <span className="small text-muted">Menampilkan {(currentPage-1)*perPage+1}-{Math.min(currentPage*perPage, filtered.length)} dari {filtered.length} data</span>
                        <ul className="pagination pagination-sm mb-0">
                            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}><button className="page-link" disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>«</button></li>
                            {Array.from({ length: totalPages }, (_, i) => (
                                <li key={i} className={`page-item ${currentPage === i+1 ? 'active' : ''}`}><button className="page-link" onClick={() => setCurrentPage(i+1)}>{i+1}</button></li>
                            )).slice(0, 5)}
                            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}><button className="page-link" disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>»</button></li>
                        </ul>
                    </div>
                )}
            </div>

            {/* Detail Modal */}
            {detailItem && (
                <div className="modal d-block" style={{ zIndex: 1050, background: 'rgba(0,0,0,.5)', overflowY: 'auto' }} onClick={() => setDetailItem(null)}>
                    <div className="modal-dialog modal-lg modal-dialog-centered" role="document" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <div className="d-flex align-items-center" style={{ gap: 12 }}>
                                    <div className="d-flex align-items-center justify-content-center" style={{ width: 40, height: 40, borderRadius: '.5rem', background: '#0ea5e9' }}>
                                        <i className="fas fa-list" style={{ color: '#fff', fontSize: 16 }}></i>
                                    </div>
                                    <div>
                                        <h5 className="font-weight-bold mb-0" style={{ fontSize: '1.125rem' }}>{detailItem.nama_customer}</h5>
                                        <span className="small text-muted">
                                            {detailItem.orders.length} order &middot; order terakhir {detailItem.last_tanggal}
                                            {detailItem.nohp ? ` · ${detailItem.nohp}` : ''}
                                        </span>
                                    </div>
                                </div>
                                <button type="button" className="close" onClick={() => setDetailItem(null)}><span>&times;</span></button>
                            </div>
                            <div className="modal-body">
                                {detailItem.orders.length === 0 ? (
                                    <div className="text-center text-muted py-4">Belum ada data order</div>
                                ) : (
                                    <div className="table-responsive">
                                        <table className="table table-striped table-sm w-100 mb-0" style={{ fontSize: '.82rem' }}>
                                            <thead style={{ background: '#0ea5e9' }}>
                                                <tr>
                                                    <th className="text-white">No</th>
                                                    {ORDER_COLUMNS.map((c) => <th key={c.key} className="text-white">{c.label}</th>)}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {detailItem.orders.map((o, i) => (
                                                    <tr key={i}>
                                                        <th>{i + 1}</th>
                                                        {ORDER_COLUMNS.map((c) => (
                                                            <td key={c.key} className={c.key === 'barang' ? 'font-weight-bold' : ''}>{o[c.key] || '-'}</td>
                                                        ))}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                            <div className="modal-footer">
                                {waNumber(detailItem.nohp) && (
                                    <a href={`https://wa.me/${waNumber(detailItem.nohp)}`} target="_blank" rel="noreferrer" className="btn btn-success">
                                        <i className="fab fa-whatsapp mr-1"></i>Hubungi
                                    </a>
                                )}
                                <button className="btn btn-light" onClick={() => setDetailItem(null)}>Tutup</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AppLayout>
    );
}
