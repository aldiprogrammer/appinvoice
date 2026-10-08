import { Head, Link } from '@inertiajs/react';
import GuestLayout from '../Layouts/GuestLayout';

export default function Menu() {
    const menus = [
        { label: 'Invoice', icon: 'fa-file-invoice', color: 'bg-grad-green', url: '/login/invoice' },
        { label: 'Surat Jalan', icon: 'fa-truck', color: 'bg-grad-orange', url: '/login/suratjalan' },
        { label: 'Inventaris', icon: 'fa-boxes', color: 'bg-grad-purple', url: '/login/inventaris' },
        { label: 'Mapping Customer', icon: 'fa-map', color: 'bg-grad-blue', url: '/peta-customer' },
        { label: 'Admin', icon: 'fa-user-shield', color: 'bg-grad-red', url: '/login/admin' },
    ];

    return (
        <GuestLayout>
            <Head title="Menu" />
            <div className="text-center px-4 py-5 w-100" style={{ maxWidth: 600 }}>
                <div
                    className="d-flex align-items-center justify-content-center rounded-circle bg-white mx-auto mb-5 shadow-lg overflow-hidden"
                    style={{ width: 110, height: 110, border: '4px solid rgba(255,255,255,.35)' }}
                >
                    <img src="/img/logoptsan.png" alt="PT SAN" className="h-100 w-100" style={{ objectFit: 'contain' }} />
                </div>
                <h1 className="text-white font-weight-bold" style={{ fontSize: '1.6rem', letterSpacing: '.5px' }}>MANAGEMENT SYSTEM PTSAN</h1>
                <p className="text-white mb-5" style={{ opacity: .65, fontSize: '.9rem' }}>&mdash; PT Sinar Aneka Niaga &mdash;</p>

                <div className="d-flex flex-wrap justify-content-center">
                    {menus.map((menu, idx) => (
                        <Link
                            key={idx}
                            href={menu.url}
                            className="d-flex flex-column align-items-center justify-content-center text-decoration-none m-3"
                            style={{ width: 150, height: 150, background: 'rgba(255,255,255,.95)', borderRadius: 20, boxShadow: '0 12px 24px rgba(0,0,0,.18)', transition: 'transform .2s ease, box-shadow .2s ease' }}
                            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-6px)'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
                        >
                            <div className={`icon-box ${menu.color} mb-3`} style={{ width: 64, height: 64, borderRadius: 18 }}>
                                <i className={`fas ${menu.icon}`} style={{ color: '#fff', fontSize: '1.7rem' }}></i>
                            </div>
                            <span className="font-weight-bold" style={{ color: 'rgba(0,0,0,.75)', fontSize: '.95rem' }}>{menu.label}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </GuestLayout>
    );
}