import { useState, useEffect } from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';
import SearchableSelect from '../../Lib/SearchableSelect';

export default function Create({ customer, produk, no_sj, sj, listkode, total }) {
    const [saveModal, setSaveModal] = useState(false);
    const [deleteItem, setDeleteItem] = useState(null);

    return (
        <AppLayout title="Surat Jalan">
            <Head title="Buat Surat Jalan" />
            <div className="card bg-white border shadow-sm p-4" style={{ borderColor: '#e5e7eb' }}>
                <div className="d-flex align-items-center justify-content-between mb-4">
                    <div>
                        <h1 className="font-weight-bold" style={{ fontSize: '1.5rem' }}>Surat Jalan</h1>
                        <p className="small text-muted">Buat surat jalan baru</p>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12 col-lg-6">
                        <SJForm
                            customer={customer}
                            produk={produk}
                            no_sj={no_sj}
                            listkode={listkode}
                        />
                    </div>

                    <div className="col-12 col-lg-6">
                        <ItemList
                            sj={sj}
                            listkode={listkode}
                            total={total}
                            onDelete={(item) => setDeleteItem(item)}
                            onSave={() => setSaveModal(true)}
                        />
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
                                <button className="btn btn-danger" onClick={(e) => { e.stopPropagation(); router.delete(`/suratjalan/${deleteItem.id}`, { onFinish: () => setDeleteItem(null) }); }}>Hapus</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {saveModal && listkode && (
                <div className="modal d-block" style={{ zIndex: 1050, background: 'rgba(0,0,0,.5)', overflowY: 'auto' }} onClick={() => setSaveModal(false)}>
                    <div className="modal-dialog modal-dialog-centered" role="document" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title font-weight-bold">Simpan Surat Jalan</h5>
                                <button type="button" className="close" onClick={() => setSaveModal(false)}><span>&times;</span></button>
                            </div>
                            <div className="modal-body text-center">
                                <div className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: 80, height: 80, background: 'rgba(40,167,69,.1)' }}>
                                    <i className="fas fa-save" style={{ color: '#28a745', fontSize: '2rem' }} />
                                </div>
                                <p className="text-muted" style={{ marginTop: '.5rem' }}>Apakah anda ingin menyimpan surat jalan ini?</p>
                            </div>
                            <div className="modal-footer justify-content-center">
                                <button className="btn btn-light" onClick={() => setSaveModal(false)}>Batal</button>
                                <button className="btn btn-success" onClick={() => {
                                    router.post('/suratjalan-simpan', {
                                        no_sj: listkode.no_sj,
                                        status_cetak: 0,
                                    });
                                    setSaveModal(false);
                                }}>Simpan</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AppLayout>
    );
}

function SJForm({ customer, produk, no_sj, listkode }) {
    const { data, setData, post, processing } = useForm({
        no_sj: no_sj,
        customer: listkode?.id_customer || '',
        nomor_kendaraan: listkode?.nomor_kendaraan || '',
        no_do: listkode?.no_do || '',
        gudang: listkode?.gudang || 'A',
        produk: '',
        harga: '',
        jml_sak: '',
    });

    const [alamat, setAlamat] = useState(listkode?.customernew?.alamat || '');
    const [kemasan, setKemasan] = useState('');
    const [totalKg, setTotalKg] = useState('');

    useEffect(() => {
        if (data.customer) {
            fetch(`/customer/${data.customer}`)
                .then(r => r.json())
                .then(c => {
                    setAlamat(c.alamat || '');
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
        const kemasanVal = parseInt(kemasan, 10) || 0;
        const sak = parseInt(data.jml_sak, 10) || 0;
        setTotalKg(kemasanVal * sak);
    }, [data.jml_sak, kemasan]);

    const submit = (e) => {
        e.preventDefault();
        setData('alamat', alamat);
        setData('kemasan', kemasan);
        setData('total_kg', totalKg);
        post('/suratjalan');
    };

    return (
        <div className="rounded border p-3" style={{ background: 'rgba(0,123,255,.05)', borderColor: 'rgba(0,123,255,.2)', borderRadius: '.75rem' }}>
            <h5 className="font-weight-bold d-flex align-items-center mb-3" style={{ columnGap: '.5rem' }}>
                <i className="fas fa-file-invoice text-primary" />
                Form Surat Jalan #{no_sj}
            </h5>
            <form onSubmit={submit}>
                <div className="row">
                    <div className="col-12 col-md-6 form-group">
                        <label className="small font-weight-bold text-uppercase">No Surat Jalan</label>
                        <input type="text" className="form-control form-control-sm" value={no_sj} readOnly />
                    </div>
                    <div className="col-12 col-md-6 form-group">
                        <label className="small font-weight-bold text-uppercase">No Do</label>
                        <input type="text" className="form-control form-control-sm" name="no_do" value={data.no_do} onChange={(e) => setData('no_do', e.target.value)} placeholder="Kosongkan jika tidak ada" />
                    </div>
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
                    <div className="col-12 col-md-6 form-group">
                        <label className="small font-weight-bold text-uppercase">Nomor Kendaraan</label>
                        <input type="text" className="form-control form-control-sm" name="nomor_kendaraan" value={data.nomor_kendaraan} onChange={(e) => setData('nomor_kendaraan', e.target.value)} placeholder="Masukkan nomor kendaraan" />
                    </div>
                    <div className="col-12 col-md-6 form-group">
                        <label className="small font-weight-bold text-uppercase">Gudang</label>
                        <select className="form-control form-control-sm" name="gudang" value={data.gudang} onChange={(e) => setData('gudang', e.target.value)}>
                            <option value="A">A</option>
                            <option value="B">B</option>
                        </select>
                    </div>
                    <div className="col-12 col-md-6 form-group">
                        <label className="small font-weight-bold text-uppercase">Produk</label>
                        <SearchableSelect
                            options={produk.map((p) => ({ value: p.id, label: `${p.produk} - ${p.kemasan}kg${p.kualitas ? ` (${p.kualitas})` : ''}` }))}
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
                        <input type="text" className="form-control form-control-sm" name="harga" value={data.harga} onChange={(e) => setData('harga', e.target.value)} required />
                    </div>
                    <div className="col-12 col-md-6 form-group">
                        <label className="small font-weight-bold text-uppercase">Jumlah Sak</label>
                        <input type="number" className="form-control form-control-sm" name="jml_sak" value={data.jml_sak} onChange={(e) => setData('jml_sak', e.target.value)} required />
                    </div>
                    <div className="col-12 col-md-6 form-group">
                        <label className="small font-weight-bold text-uppercase">Total KG</label>
                        <input type="text" className="form-control form-control-sm" value={totalKg} readOnly />
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-6">
                        <button type="submit" disabled={processing} className="btn btn-primary btn-block">
                            {processing ? <span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true" /> : <i className="fas fa-plus mr-2" />}
                            Tambah data
                        </button>
                    </div>
                    <div className="col-6">
                        <button type="button" className="btn btn-light btn-block" onClick={() => window.location.reload()}>
                            <i className="fas fa-sync-alt mr-2" />
                            Refresh
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

function ItemList({ sj, listkode, total, onDelete, onSave }) {
    return (
        <div className="rounded border p-3" style={{ background: 'rgba(0,123,255,.05)', borderColor: 'rgba(0,123,255,.2)', borderRadius: '.75rem' }}>
            <h5 className="font-weight-bold d-flex align-items-center mb-3" style={{ columnGap: '.5rem' }}>
                <i className="fas fa-list text-primary" />
                Daftar Item
            </h5>

            <div className="table-responsive rounded border bg-white">
                {listkode && (
                    <div className="border-bottom px-3 py-2" style={{ background: 'rgba(0,123,255,.05)' }}>
                        <div className="d-flex justify-content-between small font-weight-bold">
                            <span className="text-primary">NO SJ : <span className="font-weight-bold">{listkode.no_sj}</span></span>
                            <span className="text-primary">TANGGAL : {listkode.tanggal}</span>
                        </div>
                        <div className="text-muted" style={{ fontSize: '.75rem' }}>
                            Customer : <span className="font-weight-bold">{listkode.customer}</span>
                            {listkode.nomor_kendaraan && <span className="ml-3">Kendaraan : <span className="font-weight-bold">{listkode.nomor_kendaraan}</span></span>}
                            {listkode.no_do && <span className="ml-3">No Do : <span className="font-weight-bold">{listkode.no_do}</span></span>}
                            {listkode.gudang && <span className="ml-3">Gudang : <span className="font-weight-bold">{listkode.gudang}</span></span>}
                        </div>
                    </div>
                )}
                <table className="table table-sm mb-0">
                    <thead style={{ background: '#3b82f6' }}>
                        <tr>
                            <th className="text-white">#</th>
                            <th className="text-white">Barang</th>
                            <th className="text-white">Jml sak</th>
                            <th className="text-white">Harga</th>
                            <th className="text-white">Total kg</th>
                            <th className="text-center text-white">Opsi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sj.length === 0 ? (
                            <tr><td colSpan={6} className="text-center text-muted" style={{ padding: '1.5rem 0' }}>Belum ada item</td></tr>
                        ) : sj.map((item, idx) => (
                            <tr key={item.id}>
                                <th>{idx + 1}</th>
                                <td className="font-weight-bold">{item.produknew?.produk}-{item.produknew?.kemasan}Kg</td>
                                <td>{item.jml_sak}</td>
                                <td>Rp {Number(item.harga).toLocaleString('id-ID')}</td>
                                <td>{item.total_kg} kg</td>
                                <td>
                                    <button className="btn btn-danger btn-sm" onClick={() => onDelete(item)}>Hapus</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {listkode && (
                <div className="mt-3">
                    <div className="bg-white rounded border p-3 mb-3" style={{ borderRadius: '.75rem' }}>
                        <div className="d-flex justify-content-between align-items-center">
                            <span className="small text-muted">Total KG</span>
                            <h3 className="font-weight-bold text-primary" style={{ fontSize: '1.125rem' }}>{Number(total).toLocaleString('id-ID')} kg</h3>
                        </div>
                    </div>
                    <button className="btn btn-success btn-block" onClick={onSave}>
                        <i className="fas fa-save mr-2" />
                        SIMPAN
                    </button>
                </div>
            )}
        </div>
    );
}