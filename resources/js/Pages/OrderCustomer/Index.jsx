import { useState } from 'react';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';

const FIELDS = [
    { key: 'tanggal', label: 'Tanggal', type: 'date', placeholder: 'YYYY-MM-DD', required: true },
    { key: 'nama_customer', label: 'Nama Customer', placeholder: 'Nama customer', required: true },
    { key: 'no_bon', label: 'No Bon', placeholder: 'No bon' },
    { key: 'no_sj', label: 'No SJ', placeholder: 'No surat jalan' },
    { key: 'kode_item', label: 'Kode Item', placeholder: 'Kode item', required: true },
    { key: 'barang', label: 'Barang', placeholder: 'Nama barang', required: true },
    { key: 'gudang', label: 'Gudang', placeholder: 'Gudang' },
    { key: 'zak', label: 'Zak', placeholder: 'Zak' },
    { key: 'kg', label: 'Kg', placeholder: 'Kg' },
    { key: 'total_kg', label: 'Total Kg', placeholder: 'Total kg' },
    { key: 'harga', label: 'Harga', placeholder: 'Harga' },
    { key: 'tambahan_harga_beras', label: 'Tambahan Harga Beras', placeholder: 'Tambahan harga beras' },
    { key: 'jumlah', label: 'Jumlah', placeholder: 'Jumlah' },
];

const COLUMNS = FIELDS.map((f) => ({ key: f.key, label: f.label }));

export default function Index({ orders }) {
    const [search, setSearch] = useState('');
    const [addOpen, setAddOpen] = useState(false);
    const [importOpen, setImportOpen] = useState(false);
    const [editItem, setEditItem] = useState(null);
    const [deleteItem, setDeleteItem] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const perPage = 10;

    const filtered = orders.filter((o) =>
        COLUMNS.some((c) => (o[c.key] || '').toString().toLowerCase().includes(search.toLowerCase()))
    );
    const totalPages = Math.ceil(filtered.length / perPage);
    const paginated = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

    return (
        <AppLayout title="Order Customer">
            <Head title="Order Customer" />
            <div className="card bg-white border mb-3" style={{ borderColor: '#e5e7eb', boxShadow: '0 1px 2px rgba(0,0,0,.05)', padding: '1.5rem' }}>
                <div className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center justify-content-between mb-4" style={{ gap: 12 }}>
                    <div>
                        <h1 className="font-weight-bold" style={{ fontSize: '1.5rem' }}>Data Order Customer</h1>
                        <p className="small text-muted">Kelola data order customer, input manual atau import excel</p>
                    </div>
                    <div className="d-flex flex-wrap" style={{ gap: 8 }}>
                        <a href="/ordercustomer/template" className="btn btn-outline-secondary">
                            <i className="fas fa-file-download mr-2"></i>Template
                        </a>
                        <button className="btn btn-outline-success" onClick={() => setImportOpen(true)}>
                            <i className="fas fa-file-excel mr-2"></i>Import Excel
                        </button>
                        <button className="btn btn-primary" onClick={() => setAddOpen(true)}>
                            <svg className="mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ width: 16, height: 16 }}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                            Tambah Data
                        </button>
                    </div>
                </div>

                {/* Search */}
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Cari data order..."
                        className="form-control"
                        style={{ maxWidth: 320 }}
                        value={search}
                        onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                    />
                </div>

                {/* Table */}
                <div className="table-responsive">
                    <table className="table table-striped table-sm w-100 mb-0">
                        <thead style={{ background: '#3b82f6' }}>
                            <tr>
                                <th className="text-white">No</th>
                                {COLUMNS.map((c) => <th key={c.key} className="text-white">{c.label}</th>)}
                                <th className="text-center text-white">Opsi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginated.length === 0 ? (
                                <tr><td colSpan={COLUMNS.length + 2} className="text-center text-muted" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>Tidak ada data</td></tr>
                            ) : paginated.map((item, idx) => (
                                <tr key={item.id}>
                                    <th>{(currentPage - 1) * perPage + idx + 1}</th>
                                    {COLUMNS.map((c) => (
                                        <td key={c.key} className={c.key === 'nama_customer' || c.key === 'barang' ? 'font-weight-bold' : ''}>
                                            {item[c.key]}
                                        </td>
                                    ))}
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

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="d-flex justify-content-between align-items-center mt-4">
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

            {/* Add Modal */}
            {addOpen && <OrderModal onClose={() => setAddOpen(false)} />}

            {/* Edit Modal */}
            {editItem && <OrderModal item={editItem} onClose={() => setEditItem(null)} />}

            {/* Import Modal */}
            {importOpen && <ImportModal onClose={() => setImportOpen(false)} />}

            {/* Delete Modal */}
            {deleteItem && (
                <div className="modal d-block" style={{ zIndex: 1050, background: 'rgba(0,0,0,.5)', overflowY: 'auto' }} onClick={() => setDeleteItem(null)}>
                    <div className="modal-dialog modal-dialog-centered" role="document" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-content">
                            <div className="modal-body text-center" style={{ paddingTop: '2rem' }}>
                                <div className="d-flex align-items-center justify-content-center mx-auto mb-4" style={{ width: 60, height: 60, borderRadius: '50%', background: 'rgba(220,53,69,.1)' }}>
                                    <svg style={{ width: 32, height: 32 }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                </div>
                                <h5 className="font-weight-bold" style={{ fontSize: '1.125rem' }}>Hapus Data Order</h5>
                                <p className="mt-2" style={{ color: 'rgba(0,0,0,.6)' }}>Apakah anda yakin ingin menghapus data ini?</p>
                                <p className="font-weight-bold" style={{ fontSize: '1.125rem' }}>{deleteItem.nama_customer} - {deleteItem.barang}</p>
                            </div>
                            <div className="modal-footer justify-content-center">
                                <button className="btn btn-light" onClick={() => setDeleteItem(null)}>Batal</button>
                                <button className="btn btn-danger" onClick={(e) => { e.stopPropagation(); router.delete(`/ordercustomer/${deleteItem.id}`, { onFinish: () => setDeleteItem(null) }); }}>Hapus</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AppLayout>
    );
}

function OrderModal({ item = null, onClose }) {
    const isEdit = !!item;
    const initial = {};
    FIELDS.forEach((f) => { initial[f.key] = item?.[f.key] || ''; });

    const { data, setData, post, put, processing, errors } = useForm(initial);

    const submit = (e) => {
        e.preventDefault();
        if (isEdit) {
            put(`/ordercustomer/${item.id}`, { onSuccess: onClose });
        } else {
            post('/ordercustomer', { onSuccess: onClose });
        }
    };

    return (
        <div className="modal d-block" style={{ zIndex: 1050, background: 'rgba(0,0,0,.5)', overflowY: 'auto' }} onClick={onClose}>
            <div className="modal-dialog modal-lg modal-dialog-centered" role="document" onClick={(e) => e.stopPropagation()}>
                <div className="modal-content">
                    <div className="modal-header">
                        <div className="d-flex align-items-center" style={{ gap: 12 }}>
                            <div className="d-flex align-items-center justify-content-center" style={{ width: 40, height: 40, borderRadius: '.5rem', background: '#3b82f6' }}>
                                <svg style={{ width: 20, height: 20 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isEdit ? "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" : "M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"} />
                                </svg>
                            </div>
                            <div>
                                <h5 className="font-weight-bold mb-0" style={{ fontSize: '1.125rem' }}>{isEdit ? 'Edit' : 'Tambah'} Order Customer</h5>
                                <span className="small text-muted">{isEdit ? 'Ubah data order customer' : 'Masukkan data order customer baru'}</span>
                            </div>
                        </div>
                        <button type="button" className="close" onClick={onClose}><span>&times;</span></button>
                    </div>
                    <form onSubmit={submit}>
                        <div className="modal-body">
                            <div className="row">
                                {FIELDS.map((f) => (
                                    <div key={f.key} className="col-md-6 col-12 form-group mb-3">
                                        <label className="small font-weight-bold">
                                            {f.label} {f.required && <span style={{ color: '#ef4444' }}>*</span>}
                                        </label>
                                        <input
                                            type={f.type || 'text'}
                                            className="form-control"
                                            placeholder={f.placeholder}
                                            value={data[f.key]}
                                            onChange={(e) => setData(f.key, e.target.value)}
                                            required={f.required}
                                        />
                                        {errors[f.key] && <div className="small mt-1" style={{ color: '#ef4444' }}>{errors[f.key]}</div>}
                                    </div>
                                ))}
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

function ImportModal({ onClose }) {
    const { data, setData, post, processing, errors } = useForm({ file: null });

    const submit = (e) => {
        e.preventDefault();
        post('/ordercustomer/import', { forceFormData: true, onSuccess: onClose });
    };

    return (
        <div className="modal d-block" style={{ zIndex: 1050, background: 'rgba(0,0,0,.5)', overflowY: 'auto' }} onClick={onClose}>
            <div className="modal-dialog modal-dialog-centered" role="document" onClick={(e) => e.stopPropagation()}>
                <div className="modal-content">
                    <div className="modal-header">
                        <div className="d-flex align-items-center" style={{ gap: 12 }}>
                            <div className="d-flex align-items-center justify-content-center" style={{ width: 40, height: 40, borderRadius: '.5rem', background: '#16a34a' }}>
                                <i className="fas fa-file-excel" style={{ color: '#fff', fontSize: 18 }}></i>
                            </div>
                            <div>
                                <h5 className="font-weight-bold mb-0" style={{ fontSize: '1.125rem' }}>Import Excel</h5>
                                <span className="small text-muted">Format .xlsx, .xls atau .csv</span>
                            </div>
                        </div>
                        <button type="button" className="close" onClick={onClose}><span>&times;</span></button>
                    </div>
                    <form onSubmit={submit}>
                        <div className="modal-body">
                            <div className="alert alert-info small mb-3" style={{ borderRadius: '.5rem' }}>
                                <i className="fas fa-info-circle mr-2"></i>
                                Baris pertama harus berisi nama kolom (header). Pastikan kolom
                                <b> Tanggal, Nama Customer, Kode Item</b> dan <b>Barang</b> terisi.
                                <a href="/ordercustomer/template" className="font-weight-bold ml-1">Download template</a>
                            </div>
                            <div className="form-group mb-0">
                                <label className="small font-weight-bold">File Excel</label>
                                <input
                                    type="file"
                                    className="form-control"
                                    accept=".xlsx,.xls,.csv"
                                    onChange={(e) => setData('file', e.target.files[0])}
                                    required
                                />
                                {errors.file && <div className="small mt-1" style={{ color: '#ef4444' }}>{errors.file}</div>}
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-light" onClick={onClose}>Batal</button>
                            <button type="submit" disabled={processing || !data.file} className="btn btn-success">
                                {processing && <span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true" />}
                                Import
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
