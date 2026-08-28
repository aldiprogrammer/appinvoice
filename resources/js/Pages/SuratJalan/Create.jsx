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
            <div className="card bg-base-100 border border-base-300 shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-bold">Surat Jalan</h1>
                        <p className="text-sm text-base-content/50">Buat surat jalan baru</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <SJForm
                        customer={customer}
                        produk={produk}
                        no_sj={no_sj}
                        listkode={listkode}
                    />

                    <ItemList
                        sj={sj}
                        listkode={listkode}
                        total={total}
                        onDelete={(item) => setDeleteItem(item)}
                        onSave={() => setSaveModal(true)}
                    />
                </div>
            </div>

            {deleteItem && (
                <dialog className="modal modal-open">
                    <div className="modal-box text-center">
                        <div className="w-20 h-20 rounded-full bg-error/10 flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-error" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </div>
                        <h3 className="font-bold text-lg">Hapus data</h3>
                        <p className="text-base-content/60 mt-2">Apakah anda ingin menghapus data ini?</p>
                        <div className="modal-action justify-center">
                            <button className="btn btn-ghost" onClick={() => setDeleteItem(null)}>Batal</button>
                            <button className="btn btn-error" onClick={(e) => { e.stopPropagation(); router.delete(`/suratjalan/${deleteItem.id}`, { onFinish: () => setDeleteItem(null) }); }}>Hapus</button>
                        </div>
                    </div>
                    <div className="modal-backdrop" onClick={() => setDeleteItem(null)} />
                </dialog>
            )}

            {saveModal && listkode && (
                <dialog className="modal modal-open">
                    <div className="modal-box text-center">
                        <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg>
                        </div>
                        <h3 className="font-bold text-lg">Simpan Surat Jalan</h3>
                        <p className="text-base-content/60 mt-2">Apakah anda ingin menyimpan surat jalan ini?</p>
                        <div className="modal-action justify-center">
                            <button className="btn btn-ghost" onClick={() => setSaveModal(false)}>Batal</button>
                            <button className="btn btn-success" onClick={() => {
                                router.post('/suratjalan-simpan', {
                                    no_sj: listkode.no_sj,
                                    status_cetak: 0,
                                });
                                setSaveModal(false);
                            }}>Simpan</button>
                        </div>
                    </div>
                    <div className="modal-backdrop" onClick={() => setSaveModal(false)} />
                </dialog>
            )}
        </AppLayout>
    );
}

function SJForm({ customer, produk, no_sj, listkode }) {
    const { data, setData, post, processing } = useForm({
        no_sj: no_sj,
        customer: listkode?.id_customer || '',
        nomor_kendaraan: listkode?.nomor_kendaraan || '',
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
        <div className="bg-primary/5 rounded-xl p-4 border border-primary/20">
            <h5 className="font-bold flex items-center gap-2 mb-3">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                Form Surat Jalan #{no_sj}
            </h5>
            <form onSubmit={submit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                        <label className="label"><span className="label-text text-xs font-semibold uppercase text-black">No Surat Jalan</span></label>
                        <input type="text" className="input input-bordered w-full input-sm" value={no_sj} readOnly />
                    </div>
                    <div>
                        <label className="label"><span className="label-text text-xs font-semibold uppercase text-black">Customer</span></label>
                        <SearchableSelect
                            options={customer.map((c) => ({ value: c.id, label: c.nama }))}
                            value={data.customer}
                            onChange={(val) => setData('customer', val)}
                            placeholder="Pilih Customer..."
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className="label"><span className="label-text text-xs font-semibold uppercase text-black">Alamat</span></label>
                        <textarea className="textarea textarea-bordered w-full" rows={2} value={alamat} readOnly />
                    </div>
                    <div className="md:col-span-2">
                        <label className="label"><span className="label-text text-xs font-semibold uppercase text-black">Nomor Kendaraan</span></label>
                        <input type="text" className="input input-bordered w-full input-sm" name="nomor_kendaraan" value={data.nomor_kendaraan} onChange={(e) => setData('nomor_kendaraan', e.target.value)} placeholder="Masukkan nomor kendaraan" />
                    </div>
                    <div>
                        <label className="label"><span className="label-text text-xs font-semibold uppercase text-black">Produk</span></label>
                        <SearchableSelect
                            options={produk.map((p) => ({ value: p.id, label: `${p.produk} - ${p.kemasan}kg (${p.kualitas})` }))}
                            value={data.produk}
                            onChange={(val) => setData('produk', val)}
                            placeholder="Pilih Produk..."
                        />
                    </div>
                    <div>
                        <label className="label"><span className="label-text text-xs font-semibold uppercase text-black">Kemasan</span></label>
                        <input type="text" className="input input-bordered w-full input-sm" value={kemasan} readOnly />
                    </div>
                    <div>
                        <label className="label"><span className="label-text text-xs font-semibold uppercase text-black">Harga/kg</span></label>
                        <input type="text" className="input input-bordered w-full input-sm" name="harga" value={data.harga} onChange={(e) => setData('harga', e.target.value)} required />
                    </div>
                    <div>
                        <label className="label"><span className="label-text text-xs font-semibold uppercase text-black">Jumlah Sak</span></label>
                        <input type="number" className="input input-bordered w-full input-sm" name="jml_sak" value={data.jml_sak} onChange={(e) => setData('jml_sak', e.target.value)} required />
                    </div>
                    <div>
                        <label className="label"><span className="label-text text-xs font-semibold uppercase text-black">Total KG</span></label>
                        <input type="text" className="input input-bordered w-full input-sm" value={totalKg} readOnly />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-4">
                    <button type="submit" disabled={processing} className="btn btn-primary btn-block">
                        {processing ? <span className="loading loading-spinner loading-sm" /> : <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>}
                        Tambah data
                    </button>
                    <button type="button" className="btn btn-ghost btn-block" onClick={() => window.location.reload()}>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                        Refresh
                    </button>
                </div>
            </form>
        </div>
    );
}

function ItemList({ sj, listkode, total, onDelete, onSave }) {
    return (
        <div className="bg-primary/5 rounded-xl p-4 border border-primary/20">
            <h5 className="font-bold flex items-center gap-2 mb-3">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>
                Daftar Item
            </h5>

            <div className="overflow-x-auto rounded-xl border bg-white">
                {listkode && (
                    <div className="px-3 py-2 bg-primary/5 border-b">
                        <div className="flex justify-between text-sm font-bold">
                            <span className="text-primary">NO SJ : <span className="font-bold">{listkode.no_sj}</span></span>
                            <span className="text-primary">TANGGAL : {listkode.tanggal}</span>
                        </div>
                        <div className="text-xs text-base-content/50">
                            Customer : <span className="font-bold">{listkode.customer}</span>
                            {listkode.nomor_kendaraan && <span className="ml-3">Kendaraan : <span className="font-bold">{listkode.nomor_kendaraan}</span></span>}
                        </div>
                    </div>
                )}
                <table className="table table-sm w-full mb-0">
                    <thead>
                        <tr className="bg-primary text-white">
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
                            <tr><td colSpan={6} className="text-center py-6 text-base-content/40">Belum ada item</td></tr>
                        ) : sj.map((item, idx) => (
                            <tr key={item.id}>
                                <th>{idx + 1}</th>
                                <td className="font-bold">{item.produknew?.produk}-{item.produknew?.kemasan}Kg</td>
                                <td>{item.jml_sak}</td>
                                <td>Rp {Number(item.harga).toLocaleString('id-ID')}</td>
                                <td>{item.total_kg} kg</td>
                                <td>
                                    <button className="btn btn-error btn-xs" onClick={() => onDelete(item)}>Hapus</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {listkode && (
                <div className="mt-4">
                    <div className="bg-white rounded-xl p-3 border mb-3">
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-base-content/50">Total KG</span>
                            <h3 className="text-lg font-bold text-primary">{Number(total).toLocaleString('id-ID')} kg</h3>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-3">
                        <button className="btn btn-success btn-block" onClick={onSave}>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg>
                            SIMPAN
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
