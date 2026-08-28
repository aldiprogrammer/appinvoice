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
            <div className="card bg-base-100 border border-base-300 shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-bold">Edit Surat Jalan</h1>
                        <p className="text-sm text-base-content/50">Ubah data item surat jalan #{sj?.no_sj}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Form Edit */}
                    <div className="bg-primary/5 rounded-xl p-4 border border-primary/20">
                        <h5 className="font-bold flex items-center gap-2 mb-3">
                            <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                            Form Item SJ #{sj?.no_sj}
                        </h5>
                        <form onSubmit={submit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
                                    <input type="text" className="input input-bordered w-full input-sm" value={data.nomor_kendaraan} onChange={(e) => setData('nomor_kendaraan', e.target.value)} placeholder="Masukkan nomor kendaraan" />
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
                                    <input type="text" className="input input-bordered w-full input-sm" value={data.harga} onChange={(e) => setData('harga', e.target.value)} required />
                                </div>
                                <div>
                                    <label className="label"><span className="label-text text-xs font-semibold uppercase text-black">Jumlah Sak</span></label>
                                    <input type="number" className="input input-bordered w-full input-sm" value={data.jml_sak} onChange={(e) => setData('jml_sak', e.target.value)} required />
                                </div>
                                <div>
                                    <label className="label"><span className="label-text text-xs font-semibold uppercase text-black">Total KG</span></label>
                                    <input type="text" className="input input-bordered w-full input-sm" value={totalKg} readOnly />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-3 mt-4">
                                <button type="submit" disabled={processing} className="btn btn-primary btn-block">
                                    {processing ? <span className="loading loading-spinner loading-sm" /> : <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg>}
                                    Edit data
                                </button>
                                <a href={`/listsuratjalan/${sj?.no_sj}`} className="btn btn-ghost btn-block gap-2">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" /></svg>
                                    Kembali
                                </a>
                            </div>
                        </form>
                    </div>

                    {/* Preview */}
                    <div className="bg-primary/5 rounded-xl p-4 border border-primary/20">
                        <h5 className="font-bold flex items-center gap-2 mb-3">
                            <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                            Preview Surat Jalan
                        </h5>

                        <div className="bg-white rounded-xl p-3 border shadow-sm mb-3">
                            <div className="grid grid-cols-2 text-sm mb-3">
                                <div>
                                    <span className="text-xs font-bold text-primary uppercase">No Surat Jalan</span>
                                    <p className="font-bold text-primary">{sj?.no_sj}</p>
                                </div>
                                <div className="text-right">
                                    <span className="text-xs font-bold text-primary uppercase">Tanggal</span>
                                    <p className="font-bold">{sj?.tanggal}</p>
                                </div>
                                <div className="col-span-2">
                                    <span className="text-xs font-bold text-primary uppercase">Customer</span>
                                    <p className="font-bold">{sj?.customernew?.nama || sj?.customer}</p>
                                </div>
                                <div className="col-span-2">
                                    <span className="text-xs font-bold text-primary uppercase">Nomor Kendaraan</span>
                                    <p className="font-bold">{sj?.nomor_kendaraan || '-'}</p>
                                </div>
                            </div>
                            <div className="overflow-x-auto rounded border">
                                <table className="table table-sm w-full mb-0">
                                    <thead>
                                        <tr className="bg-primary text-white">
                                            <th className="text-white">#</th>
                                            <th className="text-white">Barang</th>
                                            <th className="text-white">Harga/Kg</th>
                                            <th className="text-white">Jml Sak</th>
                                            <th className="text-white">Total KG</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {list.map((item, i) => (
                                            <tr key={item.id} className={item.id === sj?.id ? 'bg-warning font-bold' : ''}>
                                                <td className="font-bold">{i + 1}</td>
                                                <td>{item.produk} ({item.kemasan}Kg)</td>
                                                <td>Rp {Number(item.harga).toLocaleString('id-ID')}</td>
                                                <td>{item.jml_sak}</td>
                                                <td className="font-bold">{Number(item.total_kg).toLocaleString('id-ID')} kg</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="flex justify-end mt-3">
                                <div className="bg-primary/5 rounded-lg px-3 py-2 border border-primary/20">
                                    <span className="text-xs text-base-content/50 font-bold">Total KG: </span>
                                    <span className="text-lg font-bold text-primary">{Number(total).toLocaleString('id-ID')} kg</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
