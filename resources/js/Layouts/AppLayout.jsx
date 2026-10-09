import { useState, useEffect } from 'react';
import { Link, usePage, router } from '@inertiajs/react';

export default function AppLayout({ children, title }) {
    const { auth, flash } = usePage().props;
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [dropOpen, setDropOpen] = useState(false);
    const [openFollowup, setOpenFollowup] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
    const hakAkses = auth.hak_akses || '';
    const hasMenu = (menu) => hakAkses.split(',').includes(menu);
    const showAll = !hakAkses;

    useEffect(() => {
        if (flash?.success) {
            setSuccessMsg(flash.success);
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 4000);
        }
        if (flash?.error) {
            setErrorMsg(flash.error);
            setShowError(true);
            setTimeout(() => setShowError(false), 4000);
        }
    }, [flash]);

    const isActive = (path) => currentPath === path || currentPath.startsWith(path + '/');

    const followupActive = isActive('/ordercustomer') || isActive('/followup') || isActive('/kirim-notifikasi');
    useEffect(() => {
        if (followupActive) {
            setOpenFollowup(true);
        }
    }, [currentPath]);

    const handleLogout = (e) => {
        e.preventDefault();
        router.get('/logout');
    };

    const navLink = (href, icon, label) => (
        <Link
            href={href}
            className={`nav-side ${isActive(href) ? 'active' : ''}`}
            onClick={() => setMobileOpen(false)}
        >
            <i className={`fas ${icon}`}></i>
            <span className="sidebar-text">{label}</span>
        </Link>
    );

    const subLink = (href, icon, label) => (
        <Link
            href={href}
            className={`nav-side nav-sub ${isActive(href) ? 'active' : ''}`}
            onClick={() => setMobileOpen(false)}
        >
            <i className={`fas ${icon}`}></i>
            <span className="sidebar-text">{label}</span>
        </Link>
    );

    return (
        <div className="d-flex flex-column" style={{ minHeight: '100vh' }}>
            {/* Mobile overlay */}
            <div className={`sidebar-overlay ${mobileOpen ? 'show' : ''}`} onClick={() => setMobileOpen(false)} />

            {/* Sidebar */}
            <div className={`sidebar-wrapper ${mobileOpen ? 'open' : ''} ${collapsed ? 'collapsed' : ''}`} id="sidebar">
                <div className="sidebar-header">
                    <div className="brand-icon"><i className="fas fa-file-invoice"></i></div>
                    <div className="sidebar-header-text">
                        <div className="font-weight-bold" style={{ fontSize: 14, lineHeight: 1.2 }}>INVOICE PTSAN</div>
                        <small style={{ color: 'rgba(0,0,0,.4)', fontSize: 10 }}>Management System</small>
                    </div>
                </div>
                <nav className="sidebar-nav">
                    <div className="menu-title">Menu</div>

                    {navLink('/dashboard', 'fa-home', 'Home')}

                    {(showAll || hasMenu('customer')) && navLink('/customer', 'fa-users', 'Customer')}
                    {(showAll || hasMenu('customermapping')) && navLink('/customer-mapping', 'fa-map-marker-alt', 'Customer Mapping')}
                    {(showAll || hasMenu('ordercustomer') || hasMenu('followup') || hasMenu('kirimnotif')) && (
                        <div>
                            <div
                                role="button"
                                className={`nav-side ${followupActive ? 'active' : ''}`}
                                style={{ cursor: 'pointer' }}
                                onClick={() => setOpenFollowup(!openFollowup)}
                            >
                                <i className="fas fa-headset"></i>
                                <span className="sidebar-text">Followup Customer</span>
                                <i className={`fas fa-chevron-${openFollowup ? 'down' : 'right'} sidebar-text`} style={{ width: 'auto', marginLeft: 'auto' }}></i>
                            </div>
                            {openFollowup && (
                                <div className="nav-submenu">
                                    {(showAll || hasMenu('ordercustomer')) && subLink('/ordercustomer', 'fa-shopping-cart', 'Order Customer')}
                                    {(showAll || hasMenu('followup')) && subLink('/followup', 'fa-clock', 'Waktu Follow-up')}
                                    {(showAll || hasMenu('kirimnotif')) && subLink('/kirim-notifikasi', 'fa-paper-plane', 'Kirim Notifikasi')}
                                </div>
                            )}
                        </div>
                    )}
                    {(showAll || hasMenu('produk')) && navLink('/produk', 'fa-box', 'Produk')}
                    {(showAll || hasMenu('bahanmasuk')) && navLink('/bahanmasuk', 'fa-cubes', 'Bahan Masuk')}
                    {(showAll || hasMenu('bahan')) && navLink('/bahan', 'fa-layer-group', 'Data Bahan')}
                    {(showAll || hasMenu('inventaris')) && navLink('/inventaris', 'fa-boxes', 'Inventaris')}

                    {(showAll || hasMenu('invoice') || hasMenu('listinvoice')) && (
                        <>
                            {hasMenu('invoice') && navLink('/invoice', 'fa-file-invoice', 'Invoice')}
                            {hasMenu('listinvoice') && (
                                <Link
                                    href="/listinvoice"
                                    className={`nav-side ${isActive('/listinvoice') || isActive('/editinvoice') ? 'active' : ''}`}
                                    onClick={() => setMobileOpen(false)}
                                >
                                    <i className="fas fa-book"></i>
                                    <span className="sidebar-text">List Invoice</span>
                                </Link>
                            )}
                        </>
                    )}

                    {(showAll || hasMenu('suratjalan') || hasMenu('listsuratjalan')) && (
                        <>
                            {hasMenu('suratjalan') && navLink('/suratjalan', 'fa-truck', 'Surat Jalan')}
                            {hasMenu('listsuratjalan') && navLink('/listsuratjalan', 'fa-clipboard-list', 'List Surat Jalan')}
                        </>
                    )}

                    {(showAll || hasMenu('pengguna')) && (
                        <>
                            <div className="menu-title mt-3">Administrator</div>
                            {navLink('/pengguna', 'fa-user-shield', 'Pengguna')}
                        </>
                    )}
                </nav>
            </div>

            {/* Main content */}
            <div className={`main-wrapper ${collapsed ? 'expanded' : ''}`}>
                {/* Navbar */}
                <nav className="app-navbar">
                    <div className="d-flex align-items-center">
                        <button className="btn-toggle d-none d-lg-flex" onClick={() => setCollapsed(!collapsed)} title="Toggle sidebar">
                            <i className="fas fa-bars"></i>
                        </button>
                        <button className="btn-toggle d-lg-none" onClick={() => setMobileOpen(true)} title="Open sidebar">
                            <i className="fas fa-bars"></i>
                        </button>
                    </div>

                    <div className="dropdown" style={{ position: 'relative' }}>
                        <button
                            className="btn btn-link dropdown-toggle d-flex align-items-center text-decoration-none px-3"
                            onClick={() => setDropOpen(!dropOpen)}
                            style={{ borderRadius: 50 }}
                        >
                            <div
                                className="d-flex align-items-center justify-content-center rounded-circle mr-2"
                                style={{ width: 32, height: 32, background: '#3b82f6', color: '#fff', fontSize: 12 }}
                            >
                                <i className="fas fa-user"></i>
                            </div>
                            <span className="d-none d-sm-inline" style={{ fontSize: 14, fontWeight: 500, color: 'rgba(0,0,0,.8)' }}>{auth.username}</span>
                        </button>
                        {dropOpen && (
                            <div
                                className="dropdown-menu show shadow-sm"
                                style={{ borderRadius: 12, border: '1px solid rgba(0,0,0,.06)', padding: 6, minWidth: 180, position: 'absolute', right: 0, left: 'auto' }}
                                onClick={() => setDropOpen(false)}
                            >
                                <div className="px-3 py-1 text-uppercase" style={{ fontSize: 11, color: 'rgba(0,0,0,.4)', fontWeight: 600 }}>
                                    {auth.level}
                                </div>
                                <div className="dropdown-divider"></div>
                                <a href="/logout" className="dropdown-item" style={{ color: '#ef4444', borderRadius: 8 }} onClick={handleLogout}>
                                    <i className="fas fa-sign-out-alt mr-2"></i> Logout
                                </a>
                            </div>
                        )}
                    </div>
                </nav>

                {/* Page content */}
                <main className="content-area">
                    {children}
                </main>
            </div>

            {/* Toast success */}
            {showSuccess && (
                <div className="app-toast">
                    <div className="alert alert-success shadow d-flex align-items-center mb-0" role="alert">
                        <i className="fas fa-check-circle mr-2"></i>
                        <span className="font-weight-bold">{successMsg}</span>
                    </div>
                </div>
            )}

            {/* Toast error */}
            {showError && (
                <div className="app-toast">
                    <div className="alert alert-danger shadow d-flex align-items-center mb-0" role="alert">
                        <i className="fas fa-exclamation-circle mr-2"></i>
                        <span className="font-weight-bold">{errorMsg}</span>
                    </div>
                </div>
            )}
        </div>
    );
}