import { useState, useEffect } from 'react';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';
import { formatRupiah } from '../../Lib/utils';
import SearchableSelect from '../../Lib/SearchableSelect';

export default function Create({ customer, produk, kode, invoice, listkode, total, total_tambahan, bulan, tahun }) {
    const [saveModal, setSaveModal] = useState(false);
    const [printModal, setPrintModal] = useState(false);
    const [deleteItem, setDeleteItem] = useState(null);

    const handlePrint = (kode) => {
        window.open(`/review/${kode}`, '_blank');
    };

    return (
        <AppLayout title="Invoice">
            <Head title="Buat Invoice" />
            <div className="card bg-white border" style={{ borderColor: '#e5e7eb', padding: '1.5rem', boxShadow: '0 1px 2px rgba(0,0,0,.05)' }}>
                <div className="d-flex align-items-center justify-content-between mb-4">
                    <div>
                        <h1 className="font-weight-bold" style={{ fontSize: '1.5rem' }}>Cetak Invoice</h1>
                        <p className="small text-muted">Buat invoice baru</p>
                    </div>
                </div>

                <div className="row">
                    {/* Form */}
                    <div className="col-12 col-lg-6 mb-3 mb-lg-0">
                        <InvoiceForm
                            customer={customer}
                            produk={produk}
                            kode={kode}
                            listkode={listkode}
                            bulan={bulan}
                            tahun={tahun}
                        />
                    </div>

                    {/* Item List */}
                    <div className="col-12 col-lg-6">
                        <ItemList
                            invoice={invoice}
                            listkode={listkode}
                            total={total}
                            totalTambahan={total_tambahan}
                            onDelete={(item) => setDeleteItem(item)}
                            onSave={() => setSaveModal(true)}
                            onPrint={() => setPrintModal(true)}
                            onPrintDirect={handlePrint}
                        />
                    </div>
                </div>
            </div>

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
                                    <button className="btn btn-danger" onClick={(e) => { e.stopPropagation(); router.delete(`/invoice/${deleteItem.id}`, { onFinish: () => setDeleteItem(null) }); }}>Hapus</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Save Modal */}
            {saveModal && listkode && (
                <div className="modal d-block" style={{ zIndex: 1050, background: 'rgba(0,0,0,.5)', overflowY: 'auto' }} onClick={() => setSaveModal(false)}>
                    <div className="modal-dialog modal-dialog-centered" role="document" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-content">
                            <div className="modal-body text-center">
                                <div className="d-flex align-items-center justify-content-center mx-auto mb-4" style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(40,167,69,.1)' }}>
                                    <svg style={{ width: 32, height: 32, color: '#28a745' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg>
                                </div>
                                <h3 className="font-weight-bold" style={{ fontSize: '1.125rem' }}>Simpan invoice</h3>
                                <p className="mt-2" style={{ color: 'rgba(0,0,0,.6)' }}>Apakah anda ingin menyimpan invoice ini?</p>
                                <div className="modal-footer justify-content-center">
                                    <button className="btn btn-light" onClick={() => setSaveModal(false)}>Batal</button>
                                    <button className="btn btn-success" onClick={() => {
                                        router.post('/listinvoice', {
                                            kode: listkode.kode,
                                            kode_invoice: listkode.kode_invoice,
                                            no_po: listkode.no_po,
                                            status_cetak: 0,
                                        });
                                        setSaveModal(false);
                                    }}>Simpan</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Print Modal */}
            {printModal && listkode && (
                <div className="modal d-block" style={{ zIndex: 1050, background: 'rgba(0,0,0,.5)', overflowY: 'auto' }} onClick={() => setPrintModal(false)}>
                    <div className="modal-dialog modal-dialog-centered" role="document" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-content">
                            <div className="modal-body text-center">
                                <div className="d-flex align-items-center justify-content-center mx-auto mb-4" style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(0,123,255,.1)' }}>
                                    <svg style={{ width: 32, height: 32, color: '#007bff' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
                                </div>
                                <h3 className="font-weight-bold" style={{ fontSize: '1.125rem' }}>Cetak invoice</h3>
                                <p className="mt-2" style={{ color: 'rgba(0,0,0,.6)' }}>Apakah anda ingin mencetak invoice ini?</p>
                                <div className="modal-footer justify-content-center">
                                    <button className="btn btn-light" onClick={() => setPrintModal(false)}>Batal</button>
                                    <button className="btn btn-primary" onClick={() => {
                                        router.post('/listinvoice', {
                                            kode: listkode.kode,
                                            kode_invoice: listkode.kode_invoice,
                                            no_po: listkode.no_po,
                                            status_cetak: 1,
                                        });
                                        setPrintModal(false);
                                    }}>Cetak</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AppLayout>
    );
}

function InvoiceForm({ customer, produk, kode, listkode, bulan, tahun }) {
    const { data, setData, post, processing } = useForm({
        kode: kode,
        kode_invoice: listkode?.kode_invoice || '',
        no_po: listkode?.no_po || '',
        customer: listkode?.id_customer || '',
        produk: '',
        harga: '',
        jml_sak: '',
        harga_tambahan: 0,
    });

    const [alamat, setAlamat] = useState(listkode?.customernew?.alamat || '');
    const [kemasan, setKemasan] = useState('');
    const [totalHarga, setTotalHarga] = useState('');
    const [totalKg, setTotalKg] = useState('');

    useEffect(() => {
        if (data.customer) {
            fetch(`/customer/${data.customer}`)
                .then(r => r.json())
                .then(c => {
                    setAlamat(c.alamat || '');
                    if (c.singkatan && bulan && tahun && kode) {
                        setData('kode_invoice', `${kode}/${bulan}/SAN/${c.singkatan}/${tahun}`);
                    }
                });
        }
    }, [data.customer]);

    useEffect(() => {
        if (data.produk) {
            fetch(`/produk/${data.produk}`)
                .then(r => r.json())
                .then(p => {
                    setData('harga', p.harga || '');
                    setKemasan(p.kemasan || '');
                });
        }
    }, [data.produk]);

    useEffect(() => {
        const harga = parseInt(String(data.harga).replace(/\./g, ''), 10) || 0;
        const sak = parseInt(data.jml_sak, 10) || 0;
        const kemasanVal = parseInt(kemasan, 10) || 0;
        setTotalHarga(formatRupiah(harga * sak * kemasanVal));
        setTotalKg(kemasanVal * sak);
    }, [data.harga, data.jml_sak, kemasan]);

    const submit = (e) => {
        e.preventDefault();
        post('/invoice');
    };

    return (
        <div style={{ background: 'rgba(0,123,255,.05)', borderRadius: '0.75rem', padding: '1rem', border: '1px solid rgba(0,123,255,.2)' }}>
            <h5 className="font-weight-bold d-flex align-items-center mb-3" style={{ gap: '0.5rem' }}>
                <svg style={{ width: 20, height: 20, color: '#007bff' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                Form Invoice #{kode}
            </h5>
            <form onSubmit={submit}>
                <div className="row">
                    <div className="col-12 col-md-6 mb-3">
                        <div className="form-group">
                            <label className="small font-weight-bold text-uppercase">No.Po</label>
                            <input type="text" className="form-control form-control-sm" name="no_po" value={data.no_po} onChange={(e) => setData('no_po', e.target.value)} required />
                        </div>
                    </div>
                    <div className="col-12 col-md-6 mb-3">
                        <div className="form-group">
                            <label className="small font-weight-bold text-uppercase">Customer</label>
                            <SearchableSelect
                                options={customer.map((c) => ({ value: c.id, label: c.nama }))}
                                value={data.customer}
                                onChange={(val) => setData('customer', val)}
                                placeholder="Pilih Customer..."
                            />
                        </div>
                    </div>
                    <div className="col-12 mb-3">
                        <div className="form-group">
                            <label className="small font-weight-bold text-uppercase">Alamat</label>
                            <textarea className="form-control" rows={2} value={alamat} readOnly />
                        </div>
                    </div>
                    <div className="col-12 col-md-6 mb-3">
                        <div className="form-group">
                            <label className="small font-weight-bold text-uppercase">Kode Invoice</label>
                            <input type="text" className="form-control form-control-sm" name="kode_invoice" value={data.kode_invoice} onChange={(e) => setData('kode_invoice', e.target.value)} required />
                        </div>
                    </div>
                    <div className="col-12 col-md-6 mb-3">
                        <div className="form-group">
                            <label className="small font-weight-bold text-uppercase">Produk</label>
                            <SearchableSelect
                                options={produk.map((p) => ({ value: p.id, label: `${p.produk} - ${p.kemasan}kg (${p.kualitas})` }))}
                                value={data.produk}
                                onChange={(val) => setData('produk', val)}
                                placeholder="Pilih Produk..."
                            />
                        </div>
                    </div>
                    <div className="col-12 col-md-6 mb-3">
                        <div className="form-group">
                            <label className="small font-weight-bold text-uppercase">Kemasan</label>
                            <input type="text" className="form-control form-control-sm" value={kemasan} readOnly />
                        </div>
                    </div>
                    <div className="col-12 col-md-6 mb-3">
                        <div className="form-group">
                            <label className="small font-weight-bold text-uppercase">Harga/kg</label>
                            <input type="text" className="form-control form-control-sm" name="harga" value={data.harga} onChange={(e) => setData('harga', e.target.value)} required />
                        </div>
                    </div>
                    <div className="col-12 col-md-6 mb-3">
                        <div className="form-group">
                            <label className="small font-weight-bold text-uppercase">Jumlah Sak</label>
                            <input type="number" className="form-control form-control-sm" name="jml_sak" value={data.jml_sak} onChange={(e) => setData('jml_sak', e.target.value)} required />
                        </div>
                    </div>
                    <div className="col-12 col-md-6 mb-3">
                        <div className="form-group">
                            <label className="small font-weight-bold text-uppercase">Total KG</label>
                            <input type="text" className="form-control form-control-sm" value={totalKg} readOnly />
                        </div>
                    </div>
                    <div className="col-12 col-md-6 mb-3">
                        <div className="form-group">
                            <label className="small font-weight-bold text-uppercase">Total Harga</label>
                            <input type="text" className="form-control form-control-sm" value={totalHarga} readOnly />
                        </div>
                    </div>
                    <div className="col-12 mb-3">
                        <div className="form-group">
                            <label className="small font-weight-bold text-uppercase">Harga Tambahan</label>
                            <input type="number" className="form-control form-control-sm" name="harga_tambahan" value={data.harga_tambahan} onChange={(e) => setData('harga_tambahan', e.target.value)} />
                            <label className="small text-muted">Masukan harga tambahan jika diperlukan</label>
                        </div>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-6">
                        <button type="submit" disabled={processing} className="btn btn-primary btn-block">
                            {processing ? <span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true" /> : <svg style={{ width: 16, height: 16 }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>}
                            Tambah data
                        </button>
                    </div>
                    <div className="col-6">
                        <button type="button" className="btn btn-light btn-block" onClick={() => window.location.reload()}>
                            <svg style={{ width: 16, height: 16 }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                            Refresh
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

function ItemList({ invoice, listkode, total, totalTambahan, onDelete, onSave, onPrint, onPrintDirect }) {
    const hasTambahan = invoice.some((item) => Number(item.harga_tambahan) > 0);
    const grandTotal = Number(total) + Number(totalTambahan || 0);

    return (
        <div style={{ background: 'rgba(0,123,255,.05)', borderRadius: '0.75rem', padding: '1rem', border: '1px solid rgba(0,123,255,.2)' }}>
            <h5 className="font-weight-bold d-flex align-items-center mb-3" style={{ gap: '0.5rem' }}>
                <svg style={{ width: 20, height: 20, color: '#007bff' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>
                Daftar Item
            </h5>

            <div className="table-responsive" style={{ border: '1px solid #dee2e6', borderRadius: '0.75rem', background: '#fff' }}>
                {listkode && (
                    <div style={{ padding: '0.5rem 1rem', background: 'rgba(0,123,255,.05)', borderBottom: '1px solid #dee2e6' }}>
                        <div className="d-flex justify-content-between small font-weight-bold">
                            <span className="text-primary">KODE : <span className="font-weight-bold">{listkode.kode_invoice}</span></span>
                            <span className="text-primary">PO : {listkode.no_po}</span>
                        </div>
                        <div className="text-muted" style={{ fontSize: '.75rem' }}>
                            Customer : <span className="font-weight-bold">{listkode.customer}</span>
                        </div>
                    </div>
                )}
                <table className="table table-sm w-100 mb-0">
                    <thead style={{ background: '#3b82f6' }}>
                        <tr>
                            <th className="text-white">#</th>
                            <th className="text-white">Barang</th>
                            <th className="text-white">Jml sak</th>
                            <th className="text-white">Harga</th>
                            <th className="text-white">Total kg</th>
                            <th className="text-white">Total Harga</th>
                            {hasTambahan && <th className="text-white">Hrg Tambahan</th>}
                            {hasTambahan && <th className="text-white">Total Hrg Tambahan</th>}
                            <th className="text-center text-white">Opsi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoice.length === 0 ? (
                            <tr><td colSpan={hasTambahan ? 9 : 7} className="text-center" style={{ padding: '1.5rem 0', color: 'rgba(0,0,0,.4)' }}>Belum ada item</td></tr>
                        ) : invoice.map((item, idx) => (
                            <tr key={item.id}>
                                <th>{idx + 1}</th>
                                <td className="font-weight-bold">{item.produknew?.produk}-{item.produknew?.kemasan}Kg</td>
                                <td>{item.jml_sak}</td>
                                <td>Rp {Number(item.harga).toLocaleString('id-ID')}</td>
                                <td>{item.jml_sak * item.kemasan} kg</td>
                                <td className="font-weight-bold">Rp {Number(item.total_harga).toLocaleString('id-ID')}</td>
                                {hasTambahan && <td>{Number(item.harga_tambahan) > 0 ? `Rp ${Number(item.harga_tambahan).toLocaleString('id-ID')}` : '-'}</td>}
                                {hasTambahan && <td>{Number(item.harga_tambahan) > 0 ? `Rp ${Number(item.total_harga_tambahan || 0).toLocaleString('id-ID')}` : '-'}</td>}
                                <td>
                                    <button className="btn btn-danger btn-sm" onClick={() => onDelete(item)}>Hapus</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {listkode && (
                <div className="mt-4">
                    <div className="mb-3" style={{ background: '#fff', borderRadius: '0.75rem', padding: '0.75rem', border: '1px solid #dee2e6' }}>
                        <div className="d-flex justify-content-between align-items-center mb-2">
                            <span className="small text-muted">Total Harga</span>
                            <h3 className="font-weight-bold text-primary" style={{ fontSize: '1.125rem' }}>Rp {Number(total).toLocaleString('id-ID')}</h3>
                        </div>
                        {hasTambahan && Number(totalTambahan) > 0 && (
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <span className="small text-muted">Total Harga Tambahan</span>
                                <h3 className="font-weight-bold text-primary" style={{ fontSize: '1.125rem' }}>Rp {Number(totalTambahan).toLocaleString('id-ID')}</h3>
                            </div>
                        )}
                        {hasTambahan && Number(totalTambahan) > 0 && (
                            <div className="d-flex justify-content-between align-items-center" style={{ borderTop: '1px solid #dee2e6', paddingTop: '0.5rem' }}>
                                <span className="small font-weight-bold">Grand Total</span>
                                <h3 className="font-weight-bold text-primary" style={{ fontSize: '1.25rem' }}>Rp {Number(grandTotal).toLocaleString('id-ID')}</h3>
                            </div>
                        )}
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <button className="btn btn-success btn-block" onClick={onSave}>
                                <svg style={{ width: 16, height: 16 }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg>
                                SIMPAN
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}