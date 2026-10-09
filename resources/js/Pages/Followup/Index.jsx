import { Head, useForm } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';

export default function Index({ followup }) {
    const { data, setData, post, processing, errors, recentlySuccessful } = useForm({
        waktu: followup?.waktu ?? '',
        status: followup?.status || 'Tidak Aktif',
    });

    const submit = (e) => {
        e.preventDefault();
        post('/followup');
    };

    return (
        <AppLayout title="Waktu Follow-up">
            <Head title="Waktu Follow-up" />
            <div className="card bg-white border mb-3" style={{ borderColor: '#e5e7eb', boxShadow: '0 1px 2px rgba(0,0,0,.05)', padding: '1.5rem' }}>
                <div className="mb-4">
                    <h1 className="font-weight-bold" style={{ fontSize: '1.5rem' }}>Waktu Follow-up</h1>
                    <p className="small text-muted mb-0">Atur waktu dan status follow-up</p>
                </div>

                <form onSubmit={submit} style={{ maxWidth: 420 }}>
                    <div className="form-group mb-3">
                        <label className="small font-weight-bold">Waktu</label>
                        <input
                            type="number"
                            className="form-control"
                            placeholder="Masukkan waktu"
                            value={data.waktu}
                            onChange={(e) => setData('waktu', e.target.value)}
                            required
                        />
                        {errors.waktu && <div className="text-danger small mt-1">{errors.waktu}</div>}
                    </div>
                    <div className="form-group mb-4">
                        <label className="small font-weight-bold">Status</label>
                        <select className="form-control" value={data.status} onChange={(e) => setData('status', e.target.value)} required>
                            <option value="Aktif">Aktif</option>
                            <option value="Tidak Aktif">Tidak Aktif</option>
                        </select>
                        {errors.status && <div className="text-danger small mt-1">{errors.status}</div>}
                    </div>
                    <button type="submit" disabled={processing} className="btn btn-primary">
                        {processing && <span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true" />}
                        Simpan
                    </button>
                </form>
            </div>
        </AppLayout>
    );
}
