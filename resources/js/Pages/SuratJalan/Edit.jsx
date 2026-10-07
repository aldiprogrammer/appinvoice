import { useState, useEffect } from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';
import SearchableSelect from '../../Lib/SearchableSelect';

export default function Edit({ sj, customer, produk, list, total }) {
    const { data, setData, put, processing } = useForm({
        customer: sj?.id_customer || '',
        nomor_kendaraan: sj?.nomor_kendaraan || '',
        produk: sj?.id_produk || '',
        harga: sj?.harga || '',
        jml_sak: sj?.jml_sak || '',
        alamat: sj?.alamat || '',
    });

    const [alamat, setAlamat] = useState(sj?.customernew?.alamat || '');
    const [kemasan, setKemasan] = useState(sj?.produknew?.kemasan || '');
    const [totalKg, setTotalKg] = useState(sj ? sj.kemasan * sj.jml_sak : '');

    useEffect(() => {
        if (data.customer) {
            fetch(`/customer/${data.customer}`)
                .then(r => r.json())
                .then(c => setAlamat(c.alamat || ''));
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
        const kemasanVal = parseInt(kemasan, 10) || 0;
        const sak = parseInt(data.jml_sak, 10) || 0;
        setTotalKg(kemasanVal * sak);
    }, [data.jml_sak, kemasan]);

    const submit = (e) => {
        e.preventDefault();
        setData('alamat', alamat);
        put(`/suratjalan/${sj.id}`);
    };

    return (
        <AppLayout title="Edit Surat Jalan">
            <Head title="Edit Surat Jalan" />
            <div className="card bg-white border shadow-sm p-4" style={{ borderColor: '#e5e7eb' }}>
                <div className="d-flex align-items-center justify-content-between mb-4">
                    <div>
                        <h1 className="font-weight-bold" style={{ fontSize: '1.5rem' }}>Edit Surat Jalan</h1>
                        <p className="small text-muted">Ubah data item surat jalan #{sj?.no_sj}</p>
                    </div>
                </div>

                <div className="row">
                    {/* Form Edit */}
                    <div className="col-12 col-lg-6">
                        <div className="rounded border p-3" style={{ background: 'rgba(0,123,255,.05)', borderColor: 'rgba(0,123,255,.2)', borderRadius: '.75rem' }}>
                            <h5 className="font-weight-bold d-flex align-items-center mb-3" style={{ columnGap: '.5rem' }}>
                                <i className="fas fa-pencil-alt text-primary" />
                                Form Item SJ #{sj?.no_sj}
                            </h5>
                            <form onSubmit={submit}>
                                <div className="row">
                                    <div className="col-12 col-md-6 form-group">
                                        <label className="small font-weight-bold text-uppercase">Customer</label>
                                        <SearchableSelect
                                            options={customer.map((c) => ({ value: c.id, label: c.nama }))}
                                            value={data.customer}
                                            onChange={(val) => setData('customer', val)}
                                            placeholder="Pilih Customer..."
                                        />
                                    </div>
                                    <div className="col-12 form-group">
                                        <label className="small font-weight-bold text-uppercase">Alamat</label>
                                        <textarea className="form-control" rows={2} value={alamat} readOnly />
                                    </div>
                                    <div className="col-12 form-group">
                                        <label className="small font-weight-bold text-uppercase">Nomor Kendaraan</label>
                                        <input type="text" className="form-control form-control-sm" value={data.nomor_kendaraan} onChange={(e) => setData('nomor_kendaraan', e.target.value)} placeholder="Masukkan nomor kendaraan" />
                                    </div>
                                    <div className="col-12 col-md-6 form-group">
                                        <label className="small font-weight-bold text-uppercase">Produk</label>
                                        <SearchableSelect
                                            options={produk.map((p) => ({ value: p.id, label: `${p.produk} - ${p.kemasan}kg (${p.kualitas})` }))}
                                            value={data.produk}
                                            onChange={(val) => setData('produk', val)}
                                            placeholder="Pilih Produk..."
                                        />
                                    </div>
                                    <div className="col-12 col-md-6 form-group">
                                        <label className="small font-weight-bold text-uppercase">Kemasan</label>
                                        <input type="text" className="form-control form-control-sm" value={kemasan} readOnly />
                                    </div>
                                    <div className="col-12 col-md-6 form-group">
                                        <label className="small font-weight-bold text-uppercase">Harga/kg</label>
                                        <input type="text" className="form-control form-control-sm" value={data.harga} onChange={(e) => setData('harga', e.target.value)} required />
                                    </div>
                                    <div className="col-12 col-md-6 form-group">
                                        <label className="small font-weight-bold text-uppercase">Jumlah Sak</label>
                                        <input type="number" className="form-control form-control-sm" value={data.jml_sak} onChange={(e) => setData('jml_sak', e.target.value)} required />
                                    </div>
                                    <div className="col-12 col-md-6 form-group">
                                        <label className="small font-weight-bold text-uppercase">Total KG</label>
                                        <input type="text" className="form-control form-control-sm" value={totalKg} readOnly />
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-6">
                                        <button type="submit" disabled={processing} className="btn btn-primary btn-block">
                                            {processing ? <span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true" /> : <i className="fas fa-save mr-2" />}
                                            Edit data
                                        </button>
                                    </div>
                                    <div className="col-6">
                                        <a href={`/listsuratjalan/${sj?.no_sj}`} className="btn btn-light btn-block">
                                            <i className="fas fa-arrow-left mr-2" />
                                            Kembali
                                        </a>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Preview */}
                    <div className="col-12 col-lg-6">
                        <div className="rounded border p-3" style={{ background: 'rgba(0,123,255,.05)', borderColor: 'rgba(0,123,255,.2)', borderRadius: '.75rem' }}>
                            <h5 className="font-weight-bold d-flex align-items-center mb-3" style={{ columnGap: '.5rem' }}>
                                <i className="fas fa-eye text-primary" />
                                Preview Surat Jalan
                            </h5>

                            <div className="bg-white rounded border shadow-sm p-3 mb-3" style={{ borderRadius: '.75rem' }}>
                                <div className="row small mb-3">
                                    <div className="col-6">
                                        <span className="small font-weight-bold text-primary text-uppercase">No Surat Jalan</span>
                                        <p className="font-weight-bold text-primary">{sj?.no_sj}</p>
                                    </div>
                                    <div className="col-6 text-right">
                                        <span className="small font-weight-bold text-primary text-uppercase">Tanggal</span>
                                        <p className="font-weight-bold">{sj?.tanggal}</p>
                                    </div>
                                    <div className="col-12">
                                        <span className="small font-weight-bold text-primary text-uppercase">Customer</span>
                                        <p className="font-weight-bold">{sj?.customernew?.nama || sj?.customer}</p>
                                    </div>
                                    <div className="col-12">
                                        <span className="small font-weight-bold text-primary text-uppercase">Nomor Kendaraan</span>
                                        <p className="font-weight-bold">{sj?.nomor_kendaraan || '-'}</p>
                                    </div>
                                </div>
                                <div className="table-responsive rounded border">
                                    <table className="table table-sm mb-0">
                                        <thead style={{ background: '#3b82f6' }}>
                                            <tr>
                                                <th className="text-white">#</th>
                                                <th className="text-white">Barang</th>
                                                <th className="text-white">Harga/Kg</th>
                                                <th className="text-white">Jml Sak</th>
                                                <th className="text-white">Total KG</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {list.map((item, i) => (
                                                <tr key={item.id} className={item.id === sj?.id ? 'table-warning font-weight-bold' : ''}>
                                                    <td className="font-weight-bold">{i + 1}</td>
                                                    <td>{item.produk} ({item.kemasan}Kg)</td>
                                                    <td>Rp {Number(item.harga).toLocaleString('id-ID')}</td>
                                                    <td>{item.jml_sak}</td>
                                                    <td className="font-weight-bold">{Number(item.total_kg).toLocaleString('id-ID')} kg</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="d-flex justify-content-end" style={{ marginTop: '.75rem' }}>
                                    <div className="rounded border px-3 py-2" style={{ background: 'rgba(0,123,255,.05)', borderColor: 'rgba(0,123,255,.2)', borderRadius: '.5rem' }}>
                                        <span className="small text-muted font-weight-bold">Total KG: </span>
                                        <span className="font-weight-bold text-primary" style={{ fontSize: '1.125rem' }}>{Number(total).toLocaleString('id-ID')} kg</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}