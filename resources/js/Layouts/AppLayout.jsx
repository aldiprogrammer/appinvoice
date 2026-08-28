import { useState, useEffect } from 'react';
import { Link, usePage, router } from '@inertiajs/react';

export default function AppLayout({ children, title }) {
    const { auth, flash } = usePage().props;
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
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

    const handleLogout = (e) => {
        e.preventDefault();
        router.get('/logout');
    };

    return (
        <div className="min-h-screen bg-base-200">
            {/* Mobile overlay */}
            {mobileOpen && (
                <div
                    className="fixed inset-0 bg-black/30 z-40 lg:hidden"
                    onClick={() => setMobileOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 bottom-0 z-50 w-64 bg-base-100 border-r border-base-300 flex flex-col transition-all duration-300
                    ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                    ${collapsed ? 'lg:w-16' : 'lg:w-64'}
                `}
            >
                <div className="h-16 flex items-center gap-3 px-4 border-b border-base-300 shrink-0">
                    <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
                        </svg>
                    </div>
                    {!collapsed && (
                        <div className="sidebar-text">
                            <div className="text-sm font-bold leading-tight">APP PT. SAN</div>
                            <div className="text-[10px] text-base-content/40">Management System</div>
                        </div>
                    )}
                </div>

                <nav className="flex-1 overflow-y-auto p-2">
                    <div className={`text-[11px] font-bold text-base-content/30 uppercase tracking-wider px-4 py-2 ${collapsed ? 'hidden' : ''}`}>
                        Menu
                    </div>

                    <Link
                        href="/dashboard"
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all
                            ${isActive('/dashboard') ? 'bg-primary text-white shadow-md shadow-primary/25' : 'text-base-content/60 hover:bg-base-200 hover:text-base-content/80'}
                        `}
                    >
                        <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        {!collapsed && <span className="sidebar-text">Home</span>}
                    </Link>

                    {(showAll || hasMenu('customer')) && (
                        <Link
                            href="/customer"
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all
                                ${isActive('/customer') ? 'bg-primary text-white shadow-md shadow-primary/25' : 'text-base-content/60 hover:bg-base-200 hover:text-base-content/80'}
                            `}
                        >
                            <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {!collapsed && <span className="sidebar-text">Customer</span>}
                        </Link>
                    )}

                    {(showAll || hasMenu('produk')) && (
                        <Link
                            href="/produk"
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all
                                ${isActive('/produk') ? 'bg-primary text-white shadow-md shadow-primary/25' : 'text-base-content/60 hover:bg-base-200 hover:text-base-content/80'}
                            `}
                        >
                            <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                            {!collapsed && <span className="sidebar-text">Produk</span>}
                        </Link>
                    )}

                    {(showAll || hasMenu('inventaris')) && (
                        <Link
                            href="/inventaris"
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all
                                ${isActive('/inventaris') ? 'bg-primary text-white shadow-md shadow-primary/25' : 'text-base-content/60 hover:bg-base-200 hover:text-base-content/80'}
                            `}
                        >
                            <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                            {!collapsed && <span className="sidebar-text">Inventaris</span>}
                        </Link>
                    )}

                    {(showAll || hasMenu('invoice') || hasMenu('listinvoice')) && (
                        <>
                            {hasMenu('invoice') && (
                                <Link
                                    href="/invoice"
                                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all
                                        ${isActive('/invoice') ? 'bg-primary text-white shadow-md shadow-primary/25' : 'text-base-content/60 hover:bg-base-200 hover:text-base-content/80'}
                                    `}
                                >
                                    <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    {!collapsed && <span className="sidebar-text">Invoice</span>}
                                </Link>
                            )}

                            {hasMenu('listinvoice') && (
                                <Link
                                    href="/listinvoice"
                                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all
                                        ${isActive('/listinvoice') || isActive('/editinvoice') ? 'bg-primary text-white shadow-md shadow-primary/25' : 'text-base-content/60 hover:bg-base-200 hover:text-base-content/80'}
                                    `}
                                >
                                    <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                    {!collapsed && <span className="sidebar-text">List Invoice</span>}
                                </Link>
                            )}
                        </>
                    )}

                    {(showAll || hasMenu('suratjalan') || hasMenu('listsuratjalan')) && (
                        <>
                            {hasMenu('suratjalan') && (
                                <Link
                                    href="/suratjalan"
                                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all
                                        ${isActive('/suratjalan') ? 'bg-primary text-white shadow-md shadow-primary/25' : 'text-base-content/60 hover:bg-base-200 hover:text-base-content/80'}
                                    `}
                                >
                                    <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    {!collapsed && <span className="sidebar-text">Surat Jalan</span>}
                                </Link>
                            )}

                            {hasMenu('listsuratjalan') && (
                                <Link
                                    href="/listsuratjalan"
                                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all
                                        ${isActive('/listsuratjalan') ? 'bg-primary text-white shadow-md shadow-primary/25' : 'text-base-content/60 hover:bg-base-200 hover:text-base-content/80'}
                                    `}
                                >
                                    <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                    {!collapsed && <span className="sidebar-text">List Surat Jalan</span>}
                                </Link>
                            )}
                        </>
                    )}

                    {(showAll || hasMenu('pengguna')) && (
                        <>
                            <div className={`text-[11px] font-bold text-base-content/30 uppercase tracking-wider px-4 py-2 mt-3 ${collapsed ? 'hidden' : ''}`}>
                                Administrator
                            </div>
                            <Link
                                href="/pengguna"
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all
                                    ${isActive('/pengguna') ? 'bg-primary text-white shadow-md shadow-primary/25' : 'text-base-content/60 hover:bg-base-200 hover:text-base-content/80'}
                                `}
                            >
                                <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                                {!collapsed && <span className="sidebar-text">Pengguna</span>}
                            </Link>
                        </>
                    )}
                </nav>
            </aside>

            {/* Main content */}
            <div className={`transition-all duration-300 ${collapsed ? 'lg:ml-16' : 'lg:ml-64'}`}>
                {/* Navbar */}
                <nav className="h-16 bg-base-100/85 backdrop-blur-lg border-b border-base-300 sticky top-0 z-30 flex items-center justify-between px-6">
                    <div className="flex items-center">
                        <button
                            className="hidden lg:flex w-10 h-10 items-center justify-center rounded-lg hover:bg-base-200 text-base-content/45 transition"
                            onClick={() => setCollapsed(!collapsed)}
                            title="Toggle sidebar"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                        <button
                            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-base-200 text-base-content/45 transition"
                            onClick={() => setMobileOpen(true)}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>

                    <div className="dropdown dropdown-end">
                        <button tabIndex={0} className="btn btn-ghost btn-sm gap-2">
                            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <span className="text-sm font-medium hidden sm:inline">{auth.username}</span>
                        </button>
                        <ul tabIndex={0} className="dropdown-content menu p-2 shadow-lg bg-base-100 rounded-xl w-52 border border-base-300 mt-2">
                            <li className="px-3 py-1 text-[11px] font-bold text-base-content/40 uppercase tracking-wider">
                                {auth.level}
                            </li>
                            <div className="divider my-0" />
                            <li>
                                <a onClick={handleLogout} className="text-error">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                    </svg>
                                    Logout
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>

                {/* Page content */}
                <main className="p-6">
                    {children}
                </main>
            </div>

            {/* Toast success */}
            {showSuccess && (
                <div className="toast toast-end z-[100]">
                    <div className="alert alert-success shadow-lg">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="font-semibold">{successMsg}</span>
                    </div>
                </div>
            )}

            {/* Toast error */}
            {showError && (
                <div className="toast toast-end z-[100]">
                    <div className="alert alert-error shadow-lg">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="font-semibold">{errorMsg}</span>
                    </div>
                </div>
            )}
        </div>
    );
}
