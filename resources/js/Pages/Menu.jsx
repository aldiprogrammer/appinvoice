import { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import GuestLayout from '../Layouts/GuestLayout';

const menus = [
    { label: 'Invoice', desc: 'Buat & kelola invoice', icon: 'fa-file-invoice', grad: 'linear-gradient(135deg,#34d399,#059669)', url: '/login/invoice' },
    { label: 'Surat Jalan', desc: 'Kelola surat jalan', icon: 'fa-truck', grad: 'linear-gradient(135deg,#fbbf24,#d97706)', url: '/login/suratjalan' },
    { label: 'Inventaris', desc: 'Stok & data barang', icon: 'fa-boxes', grad: 'linear-gradient(135deg,#a78bfa,#7c3aed)', url: '/login/inventaris' },
    { label: 'Mapping Customer', desc: 'Peta & lokasi toko', icon: 'fa-map-marked-alt', grad: 'linear-gradient(135deg,#3b82f6,#2563eb)', url: '/peta-customer' },
    { label: 'Follow-up Customer', desc: 'Pantau & notifikasi', icon: 'fa-headset', grad: 'linear-gradient(135deg,#2dd4bf,#0d9488)', url: '/follow-up-customer' },
    { label: 'Sudah Follow-up', desc: 'Riwayat follow-up', icon: 'fa-clipboard-check', grad: 'linear-gradient(135deg,#34d399,#047857)', url: '/follow-up-customer/sudah-followup' },
    { label: 'Admin', desc: 'Pengguna & hak akses', icon: 'fa-user-shield', grad: 'linear-gradient(135deg,#f87171,#dc2626)', url: '/login/admin' },
];

export default function Menu() {
    const [installEvent, setInstallEvent] = useState(null);
    const [isStandalone, setIsStandalone] = useState(false);
    const [isIos, setIsIos] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [installing, setInstalling] = useState(false);

    useEffect(() => {
        const standalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
        setIsStandalone(standalone);
        setIsIos(/iphone|ipad|ipod/i.test(window.navigator.userAgent));

        const onPrompt = (e) => {
            e.preventDefault();
            setInstallEvent(e);
        };
        const onInstalled = () => {
            setInstallEvent(null);
            setIsStandalone(true);
            setShowModal(false);
        };
        window.addEventListener('beforeinstallprompt', onPrompt);
        window.addEventListener('appinstalled', onInstalled);
        return () => {
            window.removeEventListener('beforeinstallprompt', onPrompt);
            window.removeEventListener('appinstalled', onInstalled);
        };
    }, []);

    const installApp = async () => {
        if (!installEvent) return;
        setInstalling(true);
        installEvent.prompt();
        await installEvent.userChoice;
        setInstallEvent(null);
        setInstalling(false);
        setShowModal(false);
    };

    const canInstall = !isStandalone && (installEvent || isIos);

    return (
        <GuestLayout>
            <Head title="Menu" />
            <style>{`
                .menu-wrap { width: 100%; max-width: 660px; margin: 0 auto; }
                .menu-logo {
                    width: 88px; height: 88px; border-radius: 24px;
                    background: #fff; display: flex; align-items: center; justify-content: center;
                    margin: 0 auto 16px; overflow: hidden;
                    box-shadow: 0 18px 34px rgba(2,6,23,.32);
                    border: 4px solid rgba(255,255,255,.35);
                }
                .menu-logo img { width: 100%; height: 100%; object-fit: contain; }
                .menu-badge {
                    display: inline-block; padding: 5px 14px; border-radius: 999px;
                    background: rgba(255,255,255,.16); border: 1px solid rgba(255,255,255,.28);
                    color: #e0ecff; font-size: .68rem; font-weight: 700;
                    letter-spacing: 2px; text-transform: uppercase; margin-bottom: 12px;
                    backdrop-filter: blur(4px);
                }
                .menu-brand { color: #fff; font-weight: 800; font-size: 1.45rem; letter-spacing: .3px; line-height: 1.2; margin: 0; text-shadow: 0 2px 12px rgba(2,6,23,.3); }
                .menu-divider { width: 54px; height: 3px; border-radius: 3px; background: rgba(255,255,255,.55); margin: 14px auto; }
                .menu-sub { color: rgba(255,255,255,.72); font-size: .85rem; margin: 0; }
                .menu-install {
                    position: relative; display: flex; align-items: center; gap: 12px;
                    width: 100%; text-align: left; margin-top: 22px;
                    background: linear-gradient(135deg, rgba(255,255,255,.99), rgba(238,245,255,.99));
                    border: 1px solid rgba(255,255,255,.75);
                    border-radius: 18px; padding: 14px 16px; overflow: hidden;
                    box-shadow: 0 16px 32px rgba(2,6,23,.24);
                }
                .menu-install::before {
                    content: ''; position: absolute; inset: 0; pointer-events: none;
                    background: linear-gradient(115deg, transparent 42%, rgba(255,255,255,.85) 50%, transparent 58%);
                    transform: translateX(-130%); animation: mi-shine 3.4s ease-in-out infinite;
                }
                @keyframes mi-shine { 0% { transform: translateX(-130%); } 55%, 100% { transform: translateX(130%); } }
                .menu-install-ic {
                    width: 46px; height: 46px; border-radius: 14px; flex-shrink: 0;
                    display: flex; align-items: center; justify-content: center;
                    color: #fff; font-size: 1.15rem;
                    background: linear-gradient(135deg,#3b82f6,#2563eb);
                    box-shadow: 0 8px 16px rgba(37,99,235,.35);
                }
                .menu-install-txt { flex: 1; min-width: 0; display: flex; flex-direction: column; }
                .menu-install-txt strong { color: #0f172a; font-size: .92rem; font-weight: 800; line-height: 1.2; }
                .menu-install-txt span { color: #64748b; font-size: .74rem; line-height: 1.3; }
                .menu-install-btn {
                    flex-shrink: 0; border: none; cursor: pointer; color: #fff; font-weight: 700; font-size: .8rem;
                    padding: 9px 16px; border-radius: 11px;
                    background: linear-gradient(135deg,#22c55e,#16a34a);
                    box-shadow: 0 8px 16px rgba(22,163,74,.35);
                    transition: transform .15s ease;
                }
                .menu-install-btn:active { transform: scale(.95); }
                .menu-grid {
                    display: grid;
                    grid-template-columns: repeat(2, minmax(0, 1fr));
                    gap: 12px;
                    margin-top: 22px;
                }
                @media (min-width: 640px) {
                    .menu-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; }
                }
                .menu-card-item {
                    position: relative;
                    display: flex; flex-direction: column; align-items: flex-start; gap: 10px;
                    background: rgba(255,255,255,.97);
                    border: 1px solid rgba(255,255,255,.6);
                    border-radius: 18px;
                    padding: 16px;
                    text-decoration: none; color: inherit; overflow: hidden;
                    box-shadow: 0 10px 24px rgba(2,6,23,.18);
                    transition: transform .18s ease, box-shadow .18s ease;
                }
                .menu-card-item:hover, .menu-card-item:active {
                    transform: translateY(-3px);
                    box-shadow: 0 18px 34px rgba(2,6,23,.28);
                    text-decoration: none; color: inherit;
                }
                .menu-card-icon {
                    width: 50px; height: 50px; border-radius: 15px;
                    display: flex; align-items: center; justify-content: center;
                    color: #fff; font-size: 1.2rem;
                    box-shadow: 0 8px 16px rgba(2,6,23,.18);
                }
                .menu-card-label { font-weight: 700; font-size: .95rem; color: #0f172a; line-height: 1.2; }
                .menu-card-desc { font-size: .72rem; color: #64748b; line-height: 1.3; margin-top: -4px; }
                .menu-card-arrow { position: absolute; right: 14px; bottom: 12px; color: #cbd5e1; font-size: .78rem; }
                .menu-foot { text-align: center; color: rgba(255,255,255,.45); font-size: .72rem; margin-top: 26px; }

                .mi-overlay {
                    position: fixed; inset: 0; z-index: 1000;
                    display: flex; align-items: center; justify-content: center;
                    padding: 20px; background: rgba(2,6,23,.62);
                    -webkit-backdrop-filter: blur(5px); backdrop-filter: blur(5px);
                    animation: mi-fade .2s ease;
                }
                @keyframes mi-fade { from { opacity: 0; } to { opacity: 1; } }
                .mi-modal {
                    width: 100%; max-width: 380px; background: #fff; border-radius: 22px;
                    overflow: hidden; text-align: left;
                    box-shadow: 0 30px 60px rgba(2,6,23,.45);
                    animation: mi-pop .26s cubic-bezier(.2,.8,.3,1.1);
                }
                @keyframes mi-pop { from { opacity: 0; transform: translateY(18px) scale(.96); } to { opacity: 1; transform: none; } }
                .mi-hero {
                    position: relative; padding: 26px 22px 22px; text-align: center; color: #fff;
                    background: linear-gradient(135deg,#2563eb,#1d4ed8 55%,#1e3a8a);
                }
                .mi-hero::before, .mi-hero::after { content: ''; position: absolute; border-radius: 50%; background: rgba(255,255,255,.08); }
                .mi-hero::before { width: 150px; height: 150px; right: -45px; top: -55px; }
                .mi-hero::after { width: 110px; height: 110px; left: -35px; bottom: -55px; }
                .mi-close {
                    position: absolute; top: 12px; right: 12px; z-index: 2;
                    width: 30px; height: 30px; border-radius: 9px; border: none; cursor: pointer;
                    background: rgba(255,255,255,.18); color: #fff; font-size: .9rem;
                    display: flex; align-items: center; justify-content: center;
                }
                .mi-app-ic {
                    position: relative; z-index: 1;
                    width: 74px; height: 74px; border-radius: 20px; margin: 0 auto 12px;
                    background: #fff; display: flex; align-items: center; justify-content: center; overflow: hidden;
                    box-shadow: 0 12px 24px rgba(2,6,23,.3);
                }
                .mi-app-ic img { width: 100%; height: 100%; object-fit: contain; }
                .mi-hero h3 { position: relative; z-index: 1; color: #fff; font-size: 1.15rem; font-weight: 800; margin: 0; }
                .mi-hero p { position: relative; z-index: 1; color: rgba(255,255,255,.8); font-size: .8rem; margin: 5px 0 0; }
                .mi-body { padding: 20px 22px 22px; }
                .mi-features { list-style: none; padding: 0; margin: 0 0 18px; display: flex; flex-direction: column; gap: 10px; }
                .mi-features li { display: flex; align-items: center; gap: 10px; font-size: .85rem; color: #334155; }
                .mi-features i {
                    width: 30px; height: 30px; border-radius: 9px; flex-shrink: 0; font-size: .78rem;
                    display: flex; align-items: center; justify-content: center;
                    color: #2563eb; background: rgba(37,99,235,.1);
                }
                .mi-steps { list-style: none; padding: 0; margin: 0 0 18px; display: flex; flex-direction: column; gap: 10px; counter-reset: mi; }
                .mi-steps li { display: flex; align-items: flex-start; gap: 10px; font-size: .84rem; color: #334155; line-height: 1.35; }
                .mi-steps li::before {
                    counter-increment: mi; content: counter(mi);
                    width: 24px; height: 24px; border-radius: 50%; flex-shrink: 0;
                    display: flex; align-items: center; justify-content: center;
                    font-size: .72rem; font-weight: 700; color: #fff;
                    background: linear-gradient(135deg,#3b82f6,#2563eb);
                }
                .mi-steps b { color: #0f172a; }
                .mi-btn {
                    width: 100%; border: none; cursor: pointer; color: #fff; font-weight: 700; font-size: .92rem;
                    padding: 13px; border-radius: 13px; margin-bottom: 8px;
                    background: linear-gradient(135deg,#22c55e,#16a34a);
                    box-shadow: 0 10px 20px rgba(22,163,74,.3);
                    transition: transform .15s ease;
                }
                .mi-btn:disabled { opacity: .7; cursor: default; }
                .mi-btn:active { transform: scale(.98); }
                .mi-btn-ghost { background: transparent; color: #64748b; box-shadow: none; font-weight: 600; margin-bottom: 0; }
                .mi-note { font-size: .72rem; color: #94a3b8; text-align: center; margin: 8px 0 0; }
            `}</style>

            <div className="menu-wrap text-center">
                <div className="menu-logo">
                    <img src="/img/logoptsan.png" alt="PT Sinar Aneka Niaga" />
                </div>
                <span className="menu-badge">Management System</span>
                <h1 className="menu-brand">PT. Sinar Aneka Niaga</h1>
                <div className="menu-divider"></div>
                <p className="menu-sub">Silakan pilih menu layanan di bawah ini</p>

                {canInstall && (
                    <div className="menu-install">
                        <div className="menu-install-ic"><i className="fas fa-mobile-alt"></i></div>
                        <div className="menu-install-txt">
                            <strong>Pasang Aplikasi</strong>
                            <span>Akses lebih cepat langsung dari layar utama</span>
                        </div>
                        <button type="button" className="menu-install-btn" onClick={() => setShowModal(true)}>
                            Pasang
                        </button>
                    </div>
                )}

                <div className="menu-grid">
                    {menus.map((menu, idx) => (
                        <Link key={idx} href={menu.url} className="menu-card-item">
                            <div className="menu-card-icon" style={{ background: menu.grad }}>
                                <i className={`fas ${menu.icon}`}></i>
                            </div>
                            <span className="menu-card-label">{menu.label}</span>
                            <span className="menu-card-desc">{menu.desc}</span>
                            <i className="fas fa-chevron-right menu-card-arrow"></i>
                        </Link>
                    ))}
                </div>

                <p className="menu-foot">&copy; {new Date().getFullYear()} PTSAN &middot; Management System</p>
            </div>

            {showModal && (
                <div className="mi-overlay" onClick={() => setShowModal(false)}>
                    <div className="mi-modal" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
                        <div className="mi-hero">
                            <button type="button" className="mi-close" onClick={() => setShowModal(false)} aria-label="Tutup">
                                <i className="fas fa-times"></i>
                            </button>
                            <div className="mi-app-ic">
                                <img src="/img/logoptsan.png" alt="PTSAN" />
                            </div>
                            <h3>Pasang Aplikasi PTSAN</h3>
                            <p>Gunakan seperti aplikasi native di perangkat Anda</p>
                        </div>

                        <div className="mi-body">
                            {installEvent ? (
                                <>
                                    <ul className="mi-features">
                                        <li><i className="fas fa-bolt"></i> Akses instan dari layar utama</li>
                                        <li><i className="fas fa-expand"></i> Tampilan penuh tanpa browser</li>
                                        <li><i className="fas fa-bell"></i> Terima notifikasi follow-up</li>
                                    </ul>
                                    <button type="button" className="mi-btn" onClick={installApp} disabled={installing}>
                                        {installing ? 'Memproses...' : 'Pasang Sekarang'}
                                    </button>
                                    <button type="button" className="mi-btn mi-btn-ghost" onClick={() => setShowModal(false)}>
                                        Nanti saja
                                    </button>
                                </>
                            ) : (
                                <>
                                    <ol className="mi-steps">
                                        {isIos ? (
                                            <>
                                                <li>Buka halaman ini di <b>Safari</b></li>
                                                <li>Ketuk ikon <i className="fas fa-share-square"></i> <b>Bagikan</b></li>
                                                <li>Pilih <b>Tambahkan ke Layar Utama</b></li>
                                                <li>Ketuk <b>Tambah</b> untuk memasang</li>
                                            </>
                                        ) : (
                                            <>
                                                <li>Klik ikon <b>Install</b> di address bar browser</li>
                                                <li>Atau menu browser &rarr; <b>Install App</b> / <b>Pasang aplikasi</b></li>
                                                <li>Tekan <b>Install</b> untuk memasang</li>
                                            </>
                                        )}
                                    </ol>
                                    <button type="button" className="mi-btn" onClick={() => setShowModal(false)}>
                                        Mengerti
                                    </button>
                                    <p className="mi-note">Belum bisa dipasang? Pastikan menggunakan browser Chrome / Safari terbaru.</p>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </GuestLayout>
    );
}
