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
            <div className="card bg-base-100 border border-base-300 shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-bold">Edit Invoice</h1>
                        <p className="text-sm text-base-content/50">Ubah data invoice</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Edit Form */}
                    <div className="bg-primary/5 rounded-xl p-4 border border-primary/20">
                        <h5 className="font-bold flex items-center gap-2 mb-3">
                            <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                            Form Invoice {ls?.kode}
                        </h5>
                        <form onSubmit={submit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div>
                                    <label className="label"><span className="label-text text-xs font-semibold uppercase text-black">Kode Invoice</span></label>
                                    <input type="text" className="input input-bordered w-full input-sm" value={formData.kode_invoice} onChange={(e) => setData('kode_invoice', e.target.value)} required />
                                </div>
                                <div>
                                    <label className="label"><span className="label-text text-xs font-semibold uppercase text-black">No.Po</span></label>
                                    <input type="text" className="input input-bordered w-full input-sm" value={formData.no_po} onChange={(e) => setData('no_po', e.target.value)} required />
                                </div>
                                <div>
                                    <label className="label"><span className="label-text text-xs font-semibold uppercase text-black">Customer</span></label>
                                    <SearchableSelect
                                        options={customer.map((c) => ({ value: c.id, label: c.nama }))}
                                        value={formData.customer}
                                        onChange={(val) => setData('customer', val)}
                                        placeholder="Pilih Customer..."
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="label"><span className="label-text text-xs font-semibold uppercase text-black">Alamat</span></label>
                                    <textarea className="textarea textarea-bordered w-full" rows={2} value={alamat} readOnly />
                                </div>
                                <div>
                                    <label className="label"><span className="label-text text-xs font-semibold uppercase text-black">Produk</span></label>
                                    <SearchableSelect
                                        options={produk.map((p) => ({ value: p.id, label: `${p.produk} - ${p.kemasan}kg (${p.kualitas})` }))}
                                        value={formData.produk}
                                        onChange={(val) => setData('produk', val)}
                                        placeholder="Pilih Produk..."
                                    />
                                </div>
                                <div>
                                    <label className="label"><span className="label-text text-xs font-semibold uppercase text-black">Harga/kg</span></label>
                                    <input type="text" className="input input-bordered w-full input-sm" value={formData.harga} onChange={(e) => setData('harga', e.target.value)} required />
                                </div>
                                <div>
                                    <label className="label"><span className="label-text text-xs font-semibold uppercase text-black">Jumlah Sak</span></label>
                                    <input type="number" className="input input-bordered w-full input-sm" value={formData.jml_sak} onChange={(e) => setData('jml_sak', e.target.value)} required />
                                </div>
                                <div>
                                    <label className="label"><span className="label-text text-xs font-semibold uppercase text-black">Total KG</span></label>
                                    <input type="text" className="input input-bordered w-full input-sm" value={totalKg} readOnly />
                                </div>
                                <div>
                                    <label className="label"><span className="label-text text-xs font-semibold uppercase text-black">Total Harga</span></label>
                                    <input type="text" className="input input-bordered w-full input-sm" value={formatRupiah(totalHarga)} readOnly />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="label"><span className="label-text text-xs font-semibold uppercase text-black">Harga Tambahan</span></label>
                                    <input type="number" className="input input-bordered w-full input-sm" value={formData.harga_tambahan} onChange={(e) => setData('harga_tambahan', e.target.value)} />
                                    <label className="label"><span className="label-text text-xs text-gray-500">Masukan harga tambahan jika diperlukan</span></label>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-3 mt-4">
                                <button type="submit" disabled={processing} className="btn btn-primary btn-block">
                                    {processing ? <span className="loading loading-spinner loading-sm" /> : <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg>}
                                    Edit data
                                </button>
                                <a href={`/listinvoice/${ls?.kode}`} className="btn btn-ghost btn-block gap-2">
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
                            Preview Invoice
                        </h5>

                        {(() => {
                            const grouped = {};
                            list.forEach((item) => {
                                if (!grouped[item.kode_invoice]) grouped[item.kode_invoice] = [];
                                grouped[item.kode_invoice].push(item);
                            });

                            return Object.entries(grouped).map(([kodeInv, items]) => (
                                <div key={kodeInv} className="bg-white rounded-xl p-3 border shadow-sm mb-3">
                                    <div className="grid grid-cols-2 text-sm mb-3">
                                        <div>
                                            <span className="text-xs font-bold text-primary uppercase">Kode Invoice</span>
                                            <p className="font-bold text-primary">{kodeInv}</p>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-xs font-bold text-primary uppercase">No Po</span>
                                            <p className="font-bold">{items[0]?.no_po}</p>
                                        </div>
                                        <div className="col-span-2">
                                            <span className="text-xs font-bold text-primary uppercase">Customer</span>
                                            <p className="font-bold">{items[0]?.customernew?.nama || items[0]?.customer}</p>
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
                                                    <th className="text-white">Total</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {items.map((item, i) => (
                                                    <tr key={item.id} className={item.id === ls?.id ? 'bg-warning font-bold' : ''}>
                                                        <td className="font-bold">{i + 1}</td>
                                                        <td>{item.produk} ({item.kemasan}Kg)</td>
                                                        <td>Rp {Number(item.harga).toLocaleString('id-ID')}</td>
                                                        <td>{item.jml_sak}</td>
                                                        <td className="font-bold">Rp {Number(item.total_harga).toLocaleString('id-ID')}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="flex justify-end mt-3">
                                        <div className="bg-primary/5 rounded-lg px-3 py-2 border border-primary/20">
                                            <span className="text-xs text-base-content/50 font-bold">Total Harga: </span>
                                            <span className="text-lg font-bold text-primary">Rp {Number(total).toLocaleString('id-ID')}</span>
                                        </div>
                                    </div>
                                </div>
                            ));
                        })()}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
