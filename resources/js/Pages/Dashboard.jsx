import { Head, Link, usePage } from '@inertiajs/react';
import AppLayout from '../Layouts/AppLayout';

export default function Dashboard() {
    const { auth, jmlinv, jmlc, jmlpr, jmlp } = usePage().props;
    const today = new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    const stats = [
        { label: 'Total Invoice', value: jmlinv, icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', gradient: 'bg-grad-blue', sub: 'Data invoice tersimpan' },
        { label: 'Total Pelanggan', value: jmlc, icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z', gradient: 'bg-grad-green', sub: 'Pelanggan terdaftar' },
        { label: 'Total Produk', value: jmlpr, icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4', gradient: 'bg-grad-orange', sub: 'Produk tersedia' },
        { label: 'Total Pengguna', value: jmlp, icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', gradient: 'bg-grad-purple', sub: 'Pengguna aktif' },
    ];

    const actions = [
        { label: 'Invoice Baru', icon: 'M12 4v16m8-8H4', color: 'btn-primary', url: '/invoice', col: true },
        { label: 'Customer Baru', icon: 'M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z', color: 'btn-success', url: '/customer', col: true },
        { label: 'Lihat Invoice', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253', color: 'btn-warning', url: '/listinvoice', col: true },
    ];

    const infos = [
        { title: 'Invoice Management', desc: 'Buat, cetak, dan kelola invoice dengan mudah', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', gradient: 'bg-grad-blue' },
        { title: 'Data Pelanggan', desc: 'Kelola data pelanggan dengan cepat dan akurat', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z', gradient: 'bg-grad-green' },
        { title: 'Export PDF', desc: 'Download invoice dalam format PDF profesional', icon: 'M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', gradient: 'bg-grad-orange' },
    ];

    if (auth.level === 'admin' || auth.level === 'super admin') {
        actions.push({ label: 'Kelola Produk', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4', color: 'btn-secondary', url: '/produk', col: true });
    }

    return (
        <AppLayout title="Dashboard">
            <Head title="Dashboard" />

            <div className="d-flex flex-column flex-sm-row align-items-sm-center justify-content-between mb-4">
                <div>
                    <h1 className="font-weight-bold" style={{ fontSize: '1.5rem' }}>Dashboard</h1>
                    <p className="small text-muted">
                        Selamat datang, <span className="font-weight-bold text-primary">{auth.username}</span>
                    </p>
                </div>
                <div className="small" style={{ color: 'rgba(0,0,0,.4)' }}>{today}</div>
            </div>

            <div className="row mb-4">
                {stats.map((s, i) => (
                    <div key={i} className="col-12 col-sm-6 col-lg-3 mb-3">
                        <div className={`${s.gradient} p-4 text-white h-100`} style={{ borderRadius: '.75rem', marginBottom: 0, boxShadow: '0 1px 2px rgba(0,0,0,.05)' }}>
                            <div className="d-flex align-items-center justify-content-between">
                                <div>
                                    <p className="small mb-0" style={{ fontWeight: 500, opacity: .9 }}>{s.label}</p>
                                    <p className="font-weight-bold mb-0" style={{ fontSize: '1.875rem', marginTop: '.25rem' }}>{s.value}</p>
                                </div>
                                <div className="d-flex align-items-center justify-content-center" style={{ width: 48, height: 48, borderRadius: '.75rem', background: 'rgba(255,255,255,.2)' }}>
                                    <svg style={{ width: 24, height: 24 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={s.icon} />
                                    </svg>
                                </div>
                            </div>
                            <div className="small mt-3 d-flex align-items-center" style={{ opacity: .8, gap: 4 }}>
                                <svg style={{ width: 16, height: 16 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                                </svg>
                                {s.sub}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="row">
                <div className="col-12 col-lg-6 mb-3">
                    <div className="card bg-white border mb-0" style={{ borderColor: '#e5e7eb', boxShadow: '0 1px 2px rgba(0,0,0,.05)' }}>
                        <div className="card-body">
                            <h5 className="font-weight-bold d-flex align-items-center mb-4" style={{ gap: 8 }}>
                                <svg style={{ width: 20, height: 20 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                                Aksi Cepat
                            </h5>
                            <div className="row">
                                {actions.map((a, i) => (
                                    <div key={i} className="col-6 mb-3">
                                        <Link href={a.url} className={`btn ${a.color} btn-block d-flex align-items-center justify-content-center`} style={{ gap: 8 }}>
                                            <svg style={{ width: 16, height: 16 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={a.icon} />
                                            </svg>
                                            {a.label}
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-lg-6 mb-3">
                    <div className="card bg-white border mb-0" style={{ borderColor: '#e5e7eb', boxShadow: '0 1px 2px rgba(0,0,0,.05)' }}>
                        <div className="card-body">
                            <h5 className="font-weight-bold d-flex align-items-center mb-4" style={{ gap: 8 }}>
                                <svg style={{ width: 20, height: 20 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Informasi
                            </h5>
                            <div>
                                {infos.map((info, i) => (
                                    <div key={i} className="d-flex align-items-center p-3 mb-3" style={{ gap: 12, borderRadius: '.75rem', background: '#f0f2f5' }}>
                                        <div className={`${info.gradient} d-flex align-items-center justify-content-center flex-shrink-0`} style={{ width: 40, height: 40, borderRadius: '.5rem' }}>
                                            <svg style={{ width: 20, height: 20 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={info.icon} />
                                            </svg>
                                        </div>
                                        <div className="flex-grow-1">
                                            <p className="font-weight-bold small mb-0">{info.title}</p>
                                            <p className="small text-muted mb-0" style={{ fontSize: '.75rem' }}>{info.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
