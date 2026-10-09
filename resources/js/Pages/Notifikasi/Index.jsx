import { Head, useForm } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';

export default function Index() {
    const { data, setData, post, processing, errors } = useForm({
        judul: '',
        pesan: '',
        url: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post('/kirim-notifikasi');
    };

    return (
        <AppLayout title="Kirim Notifikasi">
            <Head title="Kirim Notifikasi" />
            <div className="card bg-white border mb-3" style={{ borderColor: '#e5e7eb', boxShadow: '0 1px 2px rgba(0,0,0,.05)', padding: '1.5rem' }}>
                <div className="mb-4">
                    <h1 className="font-weight-bold" style={{ fontSize: '1.5rem' }}>Kirim Notifikasi</h1>
                    <p className="small text-muted mb-0">Kirim notifikasi push ke semua perangkat yang sudah menyetujui OneSignal</p>
                </div>

                <form onSubmit={submit} style={{ maxWidth: 520 }}>
                    <div className="form-group mb-3">
                        <label className="small font-weight-bold">Judul Notifikasi</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Contoh: Ada follow-up customer baru"
                            value={data.judul}
                            onChange={(e) => setData('judul', e.target.value)}
                            required
                        />
                        {errors.judul && <div className="text-danger small mt-1">{errors.judul}</div>}
                    </div>
                    <div className="form-group mb-3">
                        <label className="small font-weight-bold">Isi Pesan</label>
                        <textarea
                            className="form-control"
                            rows={5}
                            placeholder="Tulis isi notifikasi"
                            value={data.pesan}
                            onChange={(e) => setData('pesan', e.target.value)}
                            required
                        />
                        {errors.pesan && <div className="text-danger small mt-1">{errors.pesan}</div>}
                    </div>
                    <div className="form-group mb-4">
                        <label className="small font-weight-bold">URL (opsional)</label>
                        <input
                            type="url"
                            className="form-control"
                            placeholder="https://... halaman yang dibuka saat notifikasi diklik"
                            value={data.url}
                            onChange={(e) => setData('url', e.target.value)}
                        />
                        {errors.url && <div className="text-danger small mt-1">{errors.url}</div>}
                    </div>
                    <button type="submit" disabled={processing} className="btn btn-primary">
                        {processing && <span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true" />}
                        <i className="fas fa-paper-plane mr-2" />
                        Kirim Notifikasi
                    </button>
                </form>
            </div>
        </AppLayout>
    );
}