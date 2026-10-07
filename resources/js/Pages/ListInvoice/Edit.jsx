import { useState, useEffect } from 'react';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';
import { formatRupiah } from '../../Lib/utils';
import SearchableSelect from '../../Lib/SearchableSelect';

export default function Edit({ data: pageData, ls, customer, produk, list, total }) {
    const { data: formData, setData, put, processing } = useForm({
        kode_invoice: ls?.kode_invoice || '',
        no_po: ls?.no_po || '',
        customer: ls?.id_customer || '',
        produk: ls?.id_produk || '',
        harga: ls?.produknew?.harga || '',
        jml_sak: ls?.jml_sak || '',
        harga_tambahan: ls?.harga_tambahan || 0,
    });

    const [alamat, setAlamat] = useState(ls?.customernew?.alamat || '');
    const [kemasan, setKemasan] = useState(ls?.produknew?.kemasan || '');
    const [totalKg, setTotalKg] = useState(ls ? ls.kemasan * ls.jml_sak : '');
    const [totalHarga, setTotalHarga] = useState(ls?.total_harga || '');

    useEffect(() => {
        if (formData.customer) {
            fetch(`/customer/${formData.customer}`)
                .then(r => r.json())
                .then(c => setAlamat(c.alamat || ''));
        }
    }, [formData.customer]);

    useEffect(() => {
        if (formData.produk) {
            fetch(`/produk/${formData.produk}`)
                .then(r => r.json())
                .then(p => {
                    setData('harga', p.harga || '');
                    setKemasan(p.kemasan || '');
                });
        }
    }, [formData.produk]);

    useEffect(() => {
        const harga = parseInt(String(formData.harga).replace(/\./g, ''), 10) || 0;
        const sak = parseInt(formData.jml_sak, 10) || 0;
        const kemasanVal = parseInt(kemasan, 10) || 0;
        setTotalKg(kemasanVal * sak);
        setTotalHarga(harga * sak * kemasanVal);
    }, [formData.harga, formData.jml_sak, kemasan]);

    const submit = (e) => {
        e.preventDefault();
        put(`/listinvoice/${ls.id}`);
    };

    return (
        <AppLayout title="Edit Invoice">
            <Head title="Edit Invoice" />
            <div className="card bg-white border" style={{ borderColor: '#e5e7eb', padding: '1.5rem', boxShadow: '0 1px 2px rgba(0,0,0,.05)' }}>
                <div className="d-flex align-items-center justify-content-between mb-4">
                    <div>
                        <h1 className="font-weight-bold" style={{ fontSize: '1.5rem' }}>Edit Invoice</h1>
                        <p className="small text-muted">Ubah data invoice</p>
                    </div>
                </div>

                <div className="row">
                    {/* Edit Form */}
                    <div className="col-12 col-lg-6 mb-3 mb-lg-0">
                        <div style={{ background: 'rgba(0,123,255,.05)', borderRadius: '0.75rem', padding: '1rem', border: '1px solid rgba(0,123,255,.2)' }}>
                            <h5 className="font-weight-bold d-flex align-items-center mb-3" style={{ gap: '0.5rem' }}>
                                <svg style={{ width: 20, height: 20, color: '#007bff' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                                Form Invoice {ls?.kode}
                            </h5>
                            <form onSubmit={submit}>
                                <div className="row">
                                    <div className="col-12 col-md-6 mb-3">
                                        <div className="form-group">
                                            <label className="small font-weight-bold text-uppercase">Kode Invoice</label>
                                            <input type="text" className="form-control form-control-sm" value={formData.kode_invoice} onChange={(e) => setData('kode_invoice', e.target.value)} required />
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6 mb-3">
                                        <div className="form-group">
                                            <label className="small font-weight-bold text-uppercase">No.Po</label>
                                            <input type="text" className="form-control form-control-sm" value={formData.no_po} onChange={(e) => setData('no_po', e.target.value)} required />
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6 mb-3">
                                        <div className="form-group">
                                            <label className="small font-weight-bold text-uppercase">Customer</label>
                                            <SearchableSelect
                                                options={customer.map((c) => ({ value: c.id, label: c.nama }))}
                                                value={formData.customer}
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
                                            <label className="small font-weight-bold text-uppercase">Produk</label>
                                            <SearchableSelect
                                                options={produk.map((p) => ({ value: p.id, label: `${p.produk} - ${p.kemasan}kg (${p.kualitas})` }))}
                                                value={formData.produk}
                                                onChange={(val) => setData('produk', val)}
                                                placeholder="Pilih Produk..."
                                            />
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6 mb-3">
                                        <div className="form-group">
                                            <label className="small font-weight-bold text-uppercase">Harga/kg</label>
                                            <input type="text" className="form-control form-control-sm" value={formData.harga} onChange={(e) => setData('harga', e.target.value)} required />
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6 mb-3">
                                        <div className="form-group">
                                            <label className="small font-weight-bold text-uppercase">Jumlah Sak</label>
                                            <input type="number" className="form-control form-control-sm" value={formData.jml_sak} onChange={(e) => setData('jml_sak', e.target.value)} required />
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
                                            <input type="text" className="form-control form-control-sm" value={formatRupiah(totalHarga)} readOnly />
                                        </div>
                                    </div>
                                    <div className="col-12 mb-3">
                                        <div className="form-group">
                                            <label className="small font-weight-bold text-uppercase">Harga Tambahan</label>
                                            <input type="number" className="form-control form-control-sm" value={formData.harga_tambahan} onChange={(e) => setData('harga_tambahan', e.target.value)} />
                                            <label className="small text-muted">Masukan harga tambahan jika diperlukan</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="row mt-4">
                                    <div className="col-6">
                                        <button type="submit" disabled={processing} className="btn btn-primary btn-block">
                                            {processing ? <span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true" /> : <svg style={{ width: 16, height: 16 }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg>}
                                            Edit data
                                        </button>
                                    </div>
                                    <div className="col-6">
                                        <a href={`/listinvoice/${ls?.kode}`} className="btn btn-light btn-block">
                                            <svg style={{ width: 16, height: 16 }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" /></svg>
                                            Kembali
                                        </a>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Preview */}
                    <div className="col-12 col-lg-6">
                        <div style={{ background: 'rgba(0,123,255,.05)', borderRadius: '0.75rem', padding: '1rem', border: '1px solid rgba(0,123,255,.2)' }}>
                            <h5 className="font-weight-bold d-flex align-items-center mb-3" style={{ gap: '0.5rem' }}>
                                <svg style={{ width: 20, height: 20, color: '#007bff' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                Preview Invoice
                            </h5>

                            {(() => {
                                const grouped = {};
                                list.forEach((item) => {
                                    if (!grouped[item.kode_invoice]) grouped[item.kode_invoice] = [];
                                    grouped[item.kode_invoice].push(item);
                                });

                                return Object.entries(grouped).map(([kodeInv, items]) => (
                                    <div key={kodeInv} className="mb-3" style={{ background: '#fff', borderRadius: '0.75rem', padding: '0.75rem', border: '1px solid #dee2e6', boxShadow: '0 1px 2px rgba(0,0,0,.05)' }}>
                                        <div className="row mb-3" style={{ fontSize: '.875rem' }}>
                                            <div className="col-6">
                                                <span className="font-weight-bold text-primary text-uppercase" style={{ fontSize: '.75rem' }}>Kode Invoice</span>
                                                <p className="font-weight-bold text-primary">{kodeInv}</p>
                                            </div>
                                            <div className="col-6 text-right">
                                                <span className="font-weight-bold text-primary text-uppercase" style={{ fontSize: '.75rem' }}>No Po</span>
                                                <p className="font-weight-bold">{items[0]?.no_po}</p>
                                            </div>
                                            <div className="col-12">
                                                <span className="font-weight-bold text-primary text-uppercase" style={{ fontSize: '.75rem' }}>Customer</span>
                                                <p className="font-weight-bold">{items[0]?.customernew?.nama || items[0]?.customer}</p>
                                            </div>
                                        </div>
                                        <div className="table-responsive" style={{ border: '1px solid #dee2e6', borderRadius: '.25rem' }}>
                                            <table className="table table-sm w-100 mb-0">
                                                <thead style={{ background: '#3b82f6' }}>
                                                    <tr>
                                                        <th className="text-white">#</th>
                                                        <th className="text-white">Barang</th>
                                                        <th className="text-white">Harga/Kg</th>
                                                        <th className="text-white">Jml Sak</th>
                                                        <th className="text-white">Total</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {items.map((item, i) => (
                                                        <tr key={item.id} className={item.id === ls?.id ? 'bg-warning font-weight-bold' : ''}>
                                                            <td className="font-weight-bold">{i + 1}</td>
                                                            <td>{item.produk} ({item.kemasan}Kg)</td>
                                                            <td>Rp {Number(item.harga).toLocaleString('id-ID')}</td>
                                                            <td>{item.jml_sak}</td>
                                                            <td className="font-weight-bold">Rp {Number(item.total_harga).toLocaleString('id-ID')}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="d-flex justify-content-end mt-3">
                                            <div style={{ background: 'rgba(0,123,255,.05)', borderRadius: '.25rem', padding: '0.5rem 1rem', border: '1px solid rgba(0,123,255,.2)' }}>
                                                <span className="text-muted font-weight-bold" style={{ fontSize: '.75rem' }}>Total Harga: </span>
                                                <span className="font-weight-bold text-primary" style={{ fontSize: '1.125rem' }}>Rp {Number(total).toLocaleString('id-ID')}</span>
                                            </div>
                                        </div>
                                    </div>
                                ));
                            })()}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}