import { Head, Link } from '@inertiajs/react';
import GuestLayout from '../Layouts/GuestLayout';

export default function Menu() {
    const menus = [
        { label: 'Invoice', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', color: 'bg-gradient-to-br from-green-400 to-green-600', url: '/login/invoice' },
        { label: 'Surat Jalan', icon: 'M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0', color: 'bg-gradient-to-br from-orange-400 to-orange-600', url: '/login/suratjalan' },
        { label: 'Inventaris', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4', color: 'bg-gradient-to-br from-purple-400 to-purple-600', url: '/login/inventaris' },
        { label: 'Admin', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', color: 'bg-gradient-to-br from-red-400 to-red-600', url: '/login/admin' },
    ];

    return (
        <GuestLayout>
            <Head title="Menu" />
            <div className="text-center px-4 py-8 w-full" style={{ maxWidth: 600 }}>
                <div className="w-25 h-25 rounded-full bg-white flex items-center justify-center mx-auto mb-5 shadow-2xl border-4 border-white/35 overflow-hidden">
                    <img src="/img/logoptsan.png" alt="PT SAN" className="w-full h-full object-contain" />
                </div>
                <h1 className="text-white font-bold text-2xl tracking-wide">MANAGEMENT SYSTEM PTSAN</h1>
                <p className="text-white/60 text-sm mb-10">&mdash; PT Sinar Aneka Niaga &mdash;</p>

                <div className="flex flex-wrap justify-center gap-4">
                    {menus.map((menu, idx) => (
                        <Link
                            key={idx}
                            href={menu.url}
                            className="flex flex-col items-center justify-center w-[150px] h-[150px] bg-white/95 rounded-2xl no-underline shadow-xl hover:-translate-y-1.5 hover:shadow-2xl transition-all duration-200"
                        >
                            <div className={`w-16 h-16 rounded-2xl ${menu.color} flex items-center justify-center mb-3`}>
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={menu.icon} />
                                </svg>
                            </div>
                            <span className="font-bold text-base-content/75 text-sm">{menu.label}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </GuestLayout>
    );
}
