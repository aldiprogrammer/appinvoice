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
            default: return 'badge-secondary';
        }
    };

    return (
        <AppLayout title="Produk">
            <Head title="Produk" />
            <div className="card bg-white border mb-3" style={{ borderColor: '#e5e7eb', boxShadow: '0 1px 2px rgba(0,0,0,.05)', padding: '1.5rem' }}>
                <div className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center justify-content-between mb-4" style={{ gap: 12 }}>
                    <div>
                        <h1 className="font-weight-bold" style={{ fontSize: '1.5rem' }}>Data Produk</h1>
                        <p className="small text-muted">Kelola data produk</p>
                    </div>
                    <button className="btn btn-primary" onClick={() => setAddOpen(true)}>
                        <svg className="mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ width: 16, height: 16 }}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                        Tambah Produk
                    </button>
                </div>

                <div className="mb-4">
                    <input type="text" placeholder="Cari produk..." className="form-control" style={{ maxWidth: 320 }} value={search} onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }} />
                </div>

                <div className="table-responsive">
                    <table className="table table-striped table-sm w-100 mb-0">
                        <thead style={{ background: '#3b82f6' }}>
                            <tr>
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
                                <tr><td colSpan={6} className="text-center text-muted" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>Tidak ada data</td></tr>
                            ) : paginated.map((item, idx) => (
                                <tr key={item.id}>
                                    <th>{(currentPage - 1) * perPage + idx + 1}</th>
                                    <td className="font-weight-bold">{item.produk}</td>
                                    <td><span className="badge badge-primary">{item.kemasan} kg</span></td>
                                    <td>Rp {Number(item.harga).toLocaleString('id-ID')}</td>
                                    <td><span className={`badge ${kualitasBadge(item.kualitas)}`}>{item.kualitas}</span></td>
                                    <td>
                                        <div className="d-flex justify-content-center" style={{ gap: 0 }}>
                                            <button className="btn btn-primary btn-sm mr-1" onClick={() => setEditItem(item)}>
                                                <svg style={{ width: 12, height: 12 }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                                            </button>
                                            <button className="btn btn-danger btn-sm" onClick={() => setDeleteItem(item)}>
                                                <svg style={{ width: 12, height: 12 }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {totalPages > 1 && (
                    <div className="d-flex justify-content-between align-items-center mt-4">
                        <span className="small text-muted">Menampilkan {(currentPage - 1) * perPage + 1}-{Math.min(currentPage * perPage, filtered.length)} dari {filtered.length} data</span>
                        <ul className="pagination pagination-sm mb-0">
                            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}><button className="page-link" disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>«</button></li>
                            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => (
                                <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}><button className="page-link" onClick={() => setCurrentPage(i + 1)}>{i + 1}</button></li>
                            ))}
                            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}><button className="page-link" disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>»</button></li>
                        </ul>
                    </div>
                )}
            </div>

            {addOpen && <ProdukModal onClose={() => setAddOpen(false)} />}
            {editItem && <ProdukModal item={editItem} onClose={() => setEditItem(null)} />}

            {deleteItem && (
                <div className="modal d-block" style={{ zIndex: 1050, background: 'rgba(0,0,0,.5)', overflowY: 'auto' }} onClick={() => setDeleteItem(null)}>
                    <div className="modal-dialog modal-dialog-centered" role="document" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-content">
                            <div className="modal-body text-center" style={{ paddingTop: '2rem' }}>
                                <div className="d-flex align-items-center justify-content-center mx-auto mb-4" style={{ width: 60, height: 60, borderRadius: '50%', background: 'rgba(220,53,69,.1)' }}>
                                    <svg style={{ width: 32, height: 32 }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                </div>
                                <h5 className="font-weight-bold" style={{ fontSize: '1.125rem' }}>Hapus Produk</h5>
                                <p className="mt-2" style={{ color: 'rgba(0,0,0,.6)' }}>Apakah anda yakin ingin menghapus data ini?</p>
                                <p className="font-weight-bold" style={{ fontSize: '1.125rem' }}>{deleteItem.produk}</p>
                            </div>
                            <div className="modal-footer justify-content-center">
                                <button className="btn btn-light" onClick={() => setDeleteItem(null)}>Batal</button>
                                <button className="btn btn-danger" onClick={(e) => { e.stopPropagation(); router.delete(`/produk/${deleteItem.id}`, { onFinish: () => setDeleteItem(null) }); }}>Hapus</button>
                            </div>
                        </div>
                    </div>
                </div>
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
        <div className="modal d-block" style={{ zIndex: 1050, background: 'rgba(0,0,0,.5)', overflowY: 'auto' }} onClick={onClose}>
            <div className="modal-dialog modal-dialog-centered" role="document" onClick={(e) => e.stopPropagation()}>
                <div className="modal-content">
                    <div className="modal-header">
                        <div className="d-flex align-items-center" style={{ gap: 12 }}>
                            <div className="d-flex align-items-center justify-content-center" style={{ width: 40, height: 40, borderRadius: '.5rem', background: '#3b82f6' }}>
                                <svg style={{ width: 20, height: 20 }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isEdit ? "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" : "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"} /></svg>
                            </div>
                            <div>
                                <h5 className="font-weight-bold mb-0" style={{ fontSize: '1.125rem' }}>{isEdit ? 'Edit' : 'Tambah'} Produk</h5>
                                <span className="small text-muted">{isEdit ? 'Ubah data produk' : 'Masukkan data produk baru'}</span>
                            </div>
                        </div>
                        <button type="button" className="close" onClick={onClose}><span>&times;</span></button>
                    </div>
                    <form onSubmit={submit}>
                        <div className="modal-body">
                            <div className="form-group mb-3">
                                <label className="small font-weight-bold">Produk</label>
                                <input type="text" className="form-control" placeholder="Produk" value={data.produk} onChange={(e) => setData('produk', e.target.value)} required />
                            </div>
                            <div className="form-group mb-3">
                                <label className="small font-weight-bold">Ukuran Kemasan</label>
                                <select className="form-control" value={data.kemasan} onChange={(e) => setData('kemasan', e.target.value)} required>
                                    <option value="" disabled>Pilih kemasan</option>
                                    <option value="5">5kg</option>
                                    <option value="10">10kg</option>
                                    <option value="15">15kg</option>
                                    <option value="20">20kg</option>
                                    <option value="25">25kg</option>
                                    <option value="30">30kg</option>
                                    <option value="35">35kg</option>
                                    <option value="40">40kg</option>
                                    <option value="45">45kg</option>
                                    <option value="50">50kg</option>
                                </select>
                            </div>
                            <div className="form-group mb-3">
                                <label className="small font-weight-bold">Harga/Kg</label>
                                <input type="number" className="form-control" placeholder="Harga" value={data.harga} onChange={(e) => setData('harga', e.target.value)} required />
                            </div>
                            <div className="form-group mb-0">
                                <label className="small font-weight-bold">Kualitas</label>
                                <select className="form-control" value={data.kualitas} onChange={(e) => setData('kualitas', e.target.value)} required>
                                    <option value="" disabled>Pilih kualitas</option>
                                    <option>Super premium</option>
                                    <option>Premium</option>
                                    <option>Medium</option>
                                    <option>Medium LV2</option>
                                    <option>Medium LV3</option>
                                </select>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-light" onClick={onClose}>Batal</button>
                            <button type="submit" disabled={processing} className="btn btn-primary">
                                {processing && <span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true" />}
                                Simpan
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
