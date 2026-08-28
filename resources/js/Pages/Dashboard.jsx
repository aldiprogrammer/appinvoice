import { Head, Link, usePage } from '@inertiajs/react';
import AppLayout from '../Layouts/AppLayout';

export default function Dashboard() {
    const { auth, jmlinv, jmlc, jmlpr, jmlp } = usePage().props;
    const today = new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    const stats = [
        { label: 'Total Invoice', value: jmlinv, icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', gradient: 'bg-gradient-to-br from-blue-500 to-blue-700', sub: 'Data invoice tersimpan' },
        { label: 'Total Pelanggan', value: jmlc, icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z', gradient: 'bg-gradient-to-br from-green-500 to-green-700', sub: 'Pelanggan terdaftar' },
        { label: 'Total Produk', value: jmlpr, icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4', gradient: 'bg-gradient-to-br from-orange-500 to-orange-700', sub: 'Produk tersedia' },
        { label: 'Total Pengguna', value: jmlp, icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', gradient: 'bg-gradient-to-br from-purple-500 to-purple-700', sub: 'Pengguna aktif' },
    ];

    const actions = [
        { label: 'Invoice Baru', icon: 'M12 4v16m8-8H4', color: 'btn-primary', url: '/invoice', col: true },
        { label: 'Customer Baru', icon: 'M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z', color: 'btn-success', url: '/customer', col: true },
        { label: 'Lihat Invoice', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253', color: 'btn-warning', url: '/listinvoice', col: true },
    ];

    const infos = [
        { title: 'Invoice Management', desc: 'Buat, cetak, dan kelola invoice dengan mudah', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', gradient: 'bg-gradient-to-br from-blue-500 to-blue-600' },
        { title: 'Data Pelanggan', desc: 'Kelola data pelanggan dengan cepat dan akurat', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z', gradient: 'bg-gradient-to-br from-green-500 to-green-600' },
        { title: 'Export PDF', desc: 'Download invoice dalam format PDF profesional', icon: 'M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', gradient: 'bg-gradient-to-br from-orange-500 to-orange-600' },
    ];

    if (auth.level === 'admin' || auth.level === 'super admin') {
        actions.push({ label: 'Kelola Produk', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4', color: 'btn-secondary', url: '/produk', col: true });
    }

    return (
        <AppLayout title="Dashboard">
            <Head title="Dashboard" />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold">Dashboard</h1>
                    <p className="text-sm text-base-content/50">
                        Selamat datang, <span className="font-bold text-primary">{auth.username}</span>
                    </p>
                </div>
                <div className="text-sm text-base-content/40">{today}</div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {stats.map((s, i) => (
                    <div key={i} className={`${s.gradient} rounded-xl p-5 text-white hover:-translate-y-1 transition-all shadow-lg`}>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium opacity-90">{s.label}</p>
                                <p className="text-3xl font-bold mt-1">{s.value}</p>
                            </div>
                            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={s.icon} />
                                </svg>
                            </div>
                        </div>
                        <div className="mt-3 text-sm opacity-80 flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                            </svg>
                            {s.sub}
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="card bg-base-100 border border-base-300 shadow-sm">
                    <div className="card-body">
                        <h5 className="font-bold flex items-center gap-2 mb-4">
                            <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            Aksi Cepat
                        </h5>
                        <div className="grid grid-cols-2 gap-3">
                            {actions.map((a, i) => (
                                <Link key={i} href={a.url} className={`btn ${a.color} btn-block gap-2`}>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={a.icon} />
                                    </svg>
                                    {a.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="card bg-base-100 border border-base-300 shadow-sm">
                    <div className="card-body">
                        <h5 className="font-bold flex items-center gap-2 mb-4">
                            <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Informasi
                        </h5>
                        <div className="space-y-3">
                            {infos.map((info, i) => (
                                <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-base-200/50">
                                    <div className={`w-10 h-10 rounded-lg ${info.gradient} flex items-center justify-center shrink-0`}>
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={info.icon} />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm">{info.title}</p>
                                        <p className="text-xs text-base-content/50">{info.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
