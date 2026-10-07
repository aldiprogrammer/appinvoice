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
            case 'Rusak': return 'badge-danger';
            case 'Perbaikan': return 'badge-warning';
            default: return 'badge-light';
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
            <div className="card bg-white border shadow-sm p-4" style={{ borderColor: '#e5e7eb' }}>
                <div className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center justify-content-between mb-4" style={{ gap: '.75rem' }}>
                    <div>
                        <h1 className="font-weight-bold" style={{ fontSize: '1.5rem' }}>Data Inventaris</h1>
                        <p className="small text-muted">Kelola data inventaris barang</p>
                    </div>
                    <div className="d-flex flex-wrap align-items-center" style={{ gap: '.5rem' }}>
                        <button className="btn btn-secondary" disabled={selected.size === 0} onClick={handlePrint}>
                            <i className="fas fa-print mr-2" />
                            Cetak Label
                            {selected.size > 0 && <span className="badge badge-light ml-1">({selected.size})</span>}
                        </button>
                        <button className="btn btn-primary" onClick={() => setAddOpen(true)}>
                            <i className="fas fa-plus mr-2" />
                            Tambah Barang
                        </button>
                    </div>
                </div>

                <div className="d-flex flex-column flex-sm-row align-items-sm-center justify-content-between mb-3" style={{ gap: '.75rem' }}>
                    <input type="text" placeholder="Cari barang..." className="form-control" style={{ maxWidth: '20rem' }} value={search} onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }} />
                    {selected.size > 0 && (
                        <div className="d-flex align-items-center small text-muted" style={{ gap: '.5rem' }}>
                            <span className="badge badge-primary">{selected.size} dipilih</span>
                            <button className="btn btn-light btn-sm" onClick={() => setSelected(new Set())}>Batal semua</button>
                        </div>
                    )}
                </div>

                <div className="table-responsive">
                    <table className="table table-striped table-sm inventaris-table">
                        <thead style={{ background: '#3b82f6' }}>
                            <tr>
                                <th className="text-white text-nowrap" style={{ width: 90 }}>
                                    <span className="mr-1">No</span>
                                    <input type="checkbox" className="form-check-input position-static" checked={allFilteredSelected} onChange={toggleAll} title="Tandai semua" />
                                </th>
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
                                <tr><td colSpan={7} className="text-center" style={{ padding: '2rem 0', color: 'rgba(0,0,0,.4)' }}>Tidak ada data</td></tr>
                            ) : paginated.map((item, idx) => (
                                <tr key={item.id} className={selected.has(item.id) ? 'table-primary' : ''}>
                                    <th className="text-nowrap font-weight-normal">
                                        <input type="checkbox" className="form-check-input position-static" style={{ marginRight: '6px' }} checked={selected.has(item.id)} onChange={() => toggleItem(item.id)} />
                                        {(currentPage - 1) * perPage + idx + 1}
                                    </th>
                                    <td><span className="badge badge-primary">{item.kode_barang}</span></td>
                                    <td className="font-weight-bold">{item.nama_barang}</td>
                                    <td>{formatDate(item.tanggal_masuk)}</td>
                                    <td><span className={`badge ${kondisiBadge(item.kondisi)}`}>{item.kondisi}</span></td>
                                    <td>{item.letak}</td>
                                    <td>
                                        <div className="d-flex justify-content-center" style={{ gap: '.25rem' }}>
                                            <button className="btn btn-primary btn-sm" onClick={() => setEditItem(item)}>
                                                <i className="fas fa-pencil-alt" />
                                            </button>
                                            <button className="btn btn-danger btn-sm" onClick={() => setDeleteItem(item)}>
                                                <i className="fas fa-trash-alt" />
                                            </button>
                                        </div>
                                    </td>
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

            {addOpen && <InventarisModal onClose={() => setAddOpen(false)} nextKode={nextKode} />}
            {editItem && <InventarisModal item={editItem} onClose={() => setEditItem(null)} />}

            {deleteItem && (
                <div className="modal d-block" style={{ zIndex: 1050, background: 'rgba(0,0,0,.5)', overflowY: 'auto' }} onClick={() => setDeleteItem(null)}>
                    <div className="modal-dialog modal-dialog-centered" role="document" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title font-weight-bold">Hapus Barang</h5>
                                <button type="button" className="close" onClick={() => setDeleteItem(null)}><span>&times;</span></button>
                            </div>
                            <div className="modal-body text-center">
                                <div className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: 80, height: 80, background: 'rgba(220,53,69,.1)' }}>
                                    <i className="fas fa-trash-alt" style={{ color: '#dc3545', fontSize: '2rem' }} />
                                </div>
                                <p className="text-muted" style={{ marginTop: '.5rem' }}>Apakah anda yakin ingin menghapus data ini?</p>
                                <p className="font-weight-bold" style={{ fontSize: '1.125rem', marginTop: '.25rem' }}>{deleteItem.nama_barang}</p>
                            </div>
                            <div className="modal-footer justify-content-center">
                                <button className="btn btn-light" onClick={() => setDeleteItem(null)}>Batal</button>
                                <button className="btn btn-danger" onClick={(e) => { e.stopPropagation(); router.delete(`/inventaris/${deleteItem.id}`, { onFinish: () => setDeleteItem(null) }); }}>Hapus</button>
                            </div>
                        </div>
                    </div>
                </div>
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
        <div className="modal d-block" style={{ zIndex: 1050, background: 'rgba(0,0,0,.5)', overflowY: 'auto' }} onClick={onClose}>
            <div className="modal-dialog modal-dialog-centered" role="document" onClick={(e) => e.stopPropagation()}>
                <div className="modal-content">
                    <div className="modal-header d-flex align-items-center" style={{ gap: '.75rem' }}>
                        <div className="rounded d-flex align-items-center justify-content-center" style={{ width: 40, height: 40, background: '#007bff' }}>
                            <i className="fas fa-box text-white" />
                        </div>
                        <div>
                            <h5 className="modal-title font-weight-bold">{isEdit ? 'Edit' : 'Tambah'} Inventaris</h5>
                            <p className="small text-muted mb-0">{isEdit ? 'Ubah data barang' : 'Masukkan data barang baru'}</p>
                        </div>
                        <button type="button" className="close ml-auto" onClick={onClose}><span>&times;</span></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={submit}>
                            <div className="form-group">
                                <label className="font-weight-bold">Kode Barang <span className="badge badge-light ml-1">otomatis</span></label>
                                <input type="text" className="form-control" style={{ background: '#f0f2f5' }} placeholder="Kode barang" value={data.kode_barang} onChange={(e) => setData('kode_barang', e.target.value)} readOnly />
                            </div>
                            <div className="form-group">
                                <label className="font-weight-bold">Nama Barang</label>
                                <input type="text" className="form-control" placeholder="Nama barang" value={data.nama_barang} onChange={(e) => setData('nama_barang', e.target.value)} required />
                            </div>
                            <div className="form-group">
                                <label className="font-weight-bold">Tanggal Masuk</label>
                                <input type="date" className="form-control" value={data.tanggal_masuk} onChange={(e) => setData('tanggal_masuk', e.target.value)} required />
                            </div>
                            <div className="form-group">
                                <label className="font-weight-bold">Kondisi Barang</label>
                                <select className="form-control" value={data.kondisi} onChange={(e) => setData('kondisi', e.target.value)} required>
                                    <option value="" disabled>Pilih kondisi</option>
                                    <option>Baik</option>
                                    <option>Perbaikan</option>
                                    <option>Rusak</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="font-weight-bold">Letak Barang</label>
                                <input type="text" className="form-control" placeholder="Letak barang" value={data.letak} onChange={(e) => setData('letak', e.target.value)} required />
                            </div>
                            <div className="modal-footer px-0 pb-0">
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
        </div>
    );
}