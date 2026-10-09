import { useEffect, useState } from 'react';
import { Head } from '@inertiajs/react';

const ONESIGNAL_SDK = 'https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js';

function initOneSignal(appId) {
    if (typeof window === 'undefined' || !appId) return Promise.resolve(null);
    if (window.__oneSignalInstance) return Promise.resolve(window.__oneSignalInstance);
    if (window.__oneSignalPromise) return window.__oneSignalPromise;

    window.__oneSignalPromise = new Promise((resolve, reject) => {
        window.OneSignalDeferred = window.OneSignalDeferred || [];
        if (!document.querySelector(`script[src="${ONESIGNAL_SDK}"]`)) {
            const script = document.createElement('script');
            script.src = ONESIGNAL_SDK;
            script.defer = true;
            script.onerror = () => {
                window.__oneSignalPromise = null;
                reject(new Error('Gagal memuat SDK OneSignal. Cek koneksi internet.'));
            };
            document.head.appendChild(script);
        }
        window.OneSignalDeferred.push(async (OneSignal) => {
            try {
                await OneSignal.init({
                    appId,
                    allowLocalhostAsSecureOrigin: true,
                    serviceWorkerPath: 'OneSignalSDKWorker.js',
                    serviceWorkerParam: { scope: '/' },
                });
            } catch (e) {
                if (!/already initialized/i.test((e && e.message) || '')) {
                    window.__oneSignalPromise = null;
                    reject(e);
                    return;
                }
            }
            window.__oneSignalInstance = OneSignal;
            resolve(OneSignal);
        });
    });

    return window.__oneSignalPromise;
}

export default function Index({ jmlCustomer = 0, jmlOrder = 0, followups = [] }) {
    const onesignalAppId = import.meta.env.VITE_ONESIGNAL_APP_ID;
    const [osReady, setOsReady] = useState(false);
    const [permission, setPermission] = useState(false);
    const [subscribed, setSubscribed] = useState(false);
    const [enabling, setEnabling] = useState(false);
    const [osError, setOsError] = useState('');
    const [diag, setDiag] = useState(null);
    const [installEvent, setInstallEvent] = useState(null);
    const [isStandalone, setIsStandalone] = useState(false);
    const [isIos, setIsIos] = useState(false);

    const refreshDiag = (OneSignal) => {
        try {
            setDiag({
                appId: import.meta.env.VITE_ONESIGNAL_APP_ID,
                url: window.location.href,
                permission: OneSignal.Notifications.permission,
                isPushSupported: OneSignal.Notifications.isPushSupported(),
                optedIn: OneSignal.User.PushSubscription.optedIn,
                subId: OneSignal.User.PushSubscription.id || '(kosong)',
            });
        } catch (e) {
            setDiag({ appId: import.meta.env.VITE_ONESIGNAL_APP_ID, url: window.location.href, error: e.message });
        }
    };

    const syncStatus = (OneSignal) => {
        try {
            setPermission(OneSignal.Notifications.permission);
            setSubscribed(OneSignal.User.PushSubscription.optedIn && !!OneSignal.User.PushSubscription.id);
        } catch (e) {
            /* ignore */
        }
        refreshDiag(OneSignal);
    };

    useEffect(() => {
        if (!onesignalAppId) return;
        let mounted = true;
        initOneSignal(onesignalAppId)
            .then((OneSignal) => {
                if (!mounted || !OneSignal) return;
                setOsReady(true);
                setOsError('');
                syncStatus(OneSignal);
                OneSignal.Notifications.addEventListener('permissionChange', () => {
                    if (mounted) syncStatus(OneSignal);
                });
                OneSignal.User.PushSubscription.addEventListener('change', () => {
                    if (mounted) syncStatus(OneSignal);
                });
            })
            .catch((e) => {
                if (mounted) setOsError((e && e.message) || 'OneSignal gagal diinisialisasi.');
            });
        return () => { mounted = false; };
    }, [onesignalAppId]);

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
        installEvent.prompt();
        await installEvent.userChoice;
        setInstallEvent(null);
    };

    const enableNotifications = async () => {
        if (!onesignalAppId || enabling) return;
        setEnabling(true);
        setOsError('');
        try {
            const OneSignal = await initOneSignal(onesignalAppId);
            if (!OneSignal) return;
            setOsReady(true);
            let granted = OneSignal.Notifications.permission;
            if (!granted) {
                granted = await OneSignal.Notifications.requestPermission();
            }
            if (granted) {
                await OneSignal.User.PushSubscription.optIn();
            }
            syncStatus(OneSignal);
        } catch (e) {
            console.error('OneSignal error:', e);
            setOsError((e && e.message) || 'Gagal mengaktifkan notifikasi. Lihat console browser.');
        } finally {
            setEnabling(false);
        }
    };

    const disableNotifications = async () => {
        if (!onesignalAppId || enabling) return;
        setEnabling(true);
        setOsError('');
        try {
            const OneSignal = await initOneSignal(onesignalAppId);
            if (!OneSignal) return;
            await OneSignal.User.PushSubscription.optOut();
            syncStatus(OneSignal);
        } catch (e) {
            console.error('OneSignal error:', e);
            setOsError((e && e.message) || 'Gagal menonaktifkan notifikasi. Lihat console browser.');
        } finally {
            setEnabling(false);
        }
    };

    const active = permission && subscribed;

    const stats = [
        { label: 'Jumlah Customer', value: jmlCustomer, icon: 'fa-users', grad: 'linear-gradient(135deg,#10b981,#059669)', sub: 'Customer terdaftar' },
        { label: 'Jumlah Order', value: jmlOrder, icon: 'fa-shopping-cart', grad: 'linear-gradient(135deg,#3b82f6,#2563eb)', sub: 'Total order masuk' },
    ];

    return (
        <div className="fc-page">
            <Head title="Follow-up Customer" />
            <style>{`
                .fc-page {
                    min-height: 100vh;
                    background: #eef2f7;
                    font-family: 'Instrument Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                }
                .fc-shell {
                    position: relative;
                    max-width: 480px;
                    margin: 0 auto;
                    min-height: 100vh;
                    background: #f7f9fc;
                    box-shadow: 0 0 40px rgba(15,23,42,.10);
                    padding-bottom: 92px;
                    overflow-x: hidden;
                }
                .fc-header {
                    background: linear-gradient(135deg,#2563eb,#1d4ed8,#1e3a8a);
                    color: #fff;
                    padding: 26px 22px 64px;
                    border-bottom-left-radius: 26px;
                    border-bottom-right-radius: 26px;
                }
                .fc-header .fc-eyebrow { font-size: 11px; letter-spacing: .16em; text-transform: uppercase; opacity: .7; font-weight: 600; }
                .fc-header h1 { font-size: 1.4rem; font-weight: 700; margin: 4px 0 2px; }
                .fc-header p { font-size: .8rem; opacity: .8; margin: 0; }
                .fc-header-avatar {
                    width: 42px; height: 42px; border-radius: 14px;
                    background: rgba(255,255,255,.18);
                    display: flex; align-items: center; justify-content: center;
                    font-size: 18px; flex-shrink: 0;
                    backdrop-filter: blur(4px);
                }
                .fc-content { padding: 0 16px; }
                .fc-stats {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 12px;
                    margin-top: -46px;
                }
                .fc-stat {
                    border-radius: 18px;
                    padding: 16px;
                    color: #fff;
                    box-shadow: 0 10px 24px rgba(15,23,42,.16);
                    position: relative;
                    overflow: hidden;
                }
                .fc-stat .fc-stat-icon {
                    width: 40px; height: 40px; border-radius: 12px;
                    background: rgba(255,255,255,.22);
                    display: flex; align-items: center; justify-content: center;
                    font-size: 16px; margin-bottom: 12px;
                }
                .fc-stat .fc-stat-value { font-size: 1.75rem; font-weight: 700; line-height: 1; }
                .fc-stat .fc-stat-label { font-size: .78rem; font-weight: 600; opacity: .95; margin-top: 4px; }
                .fc-stat .fc-stat-sub { font-size: .68rem; opacity: .8; margin-top: 6px; }
                .fc-notif {
                    margin-top: 16px;
                    background: #fff;
                    border: 1px solid rgba(15,23,42,.06);
                    border-radius: 16px;
                    padding: 14px 16px;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    box-shadow: 0 2px 10px rgba(15,23,42,.04);
                }
                .fc-notif-icon {
                    width: 44px; height: 44px; border-radius: 14px; flex-shrink: 0;
                    background: #eef2f7; color: #94a3b8;
                    display: flex; align-items: center; justify-content: center;
                    font-size: 18px;
                }
                .fc-notif-icon.is-on {
                    background: linear-gradient(135deg,#d1fae5,#a7f3d0);
                    color: #059669;
                }
                .fc-notif-body { flex: 1; min-width: 0; }
                .fc-notif-title { font-size: .9rem; font-weight: 700; color: #0f172a; margin: 0; }
                .fc-notif-sub { font-size: .74rem; color: #64748b; margin: 2px 0 0; }
                .fc-notif-btn {
                    flex-shrink: 0;
                    border: none;
                    border-radius: 999px;
                    padding: 8px 16px;
                    font-size: .78rem;
                    font-weight: 700;
                    color: #fff;
                    background: linear-gradient(135deg,#3b82f6,#2563eb);
                    box-shadow: 0 4px 12px rgba(37,99,235,.3);
                    cursor: pointer;
                }
                .fc-notif-btn:disabled { opacity: .6; cursor: not-allowed; box-shadow: none; }
                .fc-notif-btn-off {
                    background: #fff;
                    color: #b91c1c;
                    border: 1px solid #fecaca;
                    box-shadow: none;
                }
                .fc-install {
                    margin-top: 16px;
                    background: linear-gradient(135deg,#eef2ff,#e0e7ff);
                    border: 1px solid #c7d2fe;
                    border-radius: 16px;
                    padding: 14px 16px;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }
                .fc-install-icon {
                    width: 44px; height: 44px; border-radius: 14px; flex-shrink: 0;
                    background: linear-gradient(135deg,#6366f1,#4338ca);
                    color: #fff;
                    display: flex; align-items: center; justify-content: center;
                    font-size: 18px;
                }
                .fc-install-body { flex: 1; min-width: 0; }
                .fc-install-title { font-size: .9rem; font-weight: 700; color: #312e81; margin: 0; }
                .fc-install-sub { font-size: .74rem; color: #4f46e5; margin: 2px 0 0; line-height: 1.45; }
                .fc-install-btn {
                    flex-shrink: 0;
                    border: none;
                    border-radius: 999px;
                    padding: 8px 16px;
                    font-size: .78rem;
                    font-weight: 700;
                    color: #fff;
                    background: linear-gradient(135deg,#6366f1,#4338ca);
                    box-shadow: 0 4px 12px rgba(79,70,229,.3);
                    cursor: pointer;
                }
                .fc-notif-error {
                    margin-top: 10px;
                    background: #fef2f2;
                    color: #b91c1c;
                    border: 1px solid #fecaca;
                    border-radius: 12px;
                    padding: 10px 14px;
                    font-size: .76rem;
                    font-weight: 600;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }
                .fc-diag {
                    margin-top: 12px;
                    background: #fff;
                    border: 1px dashed rgba(15,23,42,.15);
                    border-radius: 12px;
                    padding: 10px 14px;
                    font-size: .72rem;
                    color: #475569;
                }
                .fc-diag summary {
                    cursor: pointer;
                    font-weight: 700;
                    color: #334155;
                }
                .fc-diag ul {
                    margin: 8px 0 0;
                    padding-left: 16px;
                    line-height: 1.7;
                }
                .fc-section {
                    margin-top: 24px;
                }
                .fc-section-head {
                    display: flex; align-items: center; justify-content: space-between;
                    margin-bottom: 12px;
                }
                .fc-section-head h2 { font-size: 1rem; font-weight: 700; margin: 0; color: #0f172a; }
                .fc-section-head span { font-size: .72rem; color: #64748b; }
                .fc-list { display: flex; flex-direction: column; gap: 12px; }
                .fc-item {
                    background: #fff;
                    border-radius: 16px;
                    padding: 14px 16px;
                    border: 1px solid rgba(15,23,42,.06);
                    box-shadow: 0 2px 10px rgba(15,23,42,.04);
                    display: flex; align-items: center; gap: 12px;
                }
                .fc-item-avatar {
                    width: 44px; height: 44px; border-radius: 14px; flex-shrink: 0;
                    background: linear-gradient(135deg,#dbeafe,#bfdbfe);
                    color: #1d4ed8;
                    display: flex; align-items: center; justify-content: center;
                    font-weight: 700; font-size: .95rem;
                }
                .fc-item-body { flex: 1; min-width: 0; }
                .fc-item-body .fc-item-title { font-size: .9rem; font-weight: 700; color: #0f172a; margin: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
                .fc-item-body .fc-item-sub { font-size: .75rem; color: #64748b; margin: 2px 0 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
                .fc-empty {
                    background: #fff;
                    border: 1px dashed rgba(15,23,42,.14);
                    border-radius: 18px;
                    padding: 34px 20px;
                    text-align: center;
                    color: #64748b;
                }
                .fc-empty .fc-empty-icon {
                    width: 62px; height: 62px; border-radius: 50%;
                    background: #eff6ff; color: #3b82f6;
                    display: flex; align-items: center; justify-content: center;
                    font-size: 24px; margin: 0 auto 12px;
                }
                .fc-empty p { margin: 0; font-size: .82rem; }
                .fc-empty .fc-empty-title { font-weight: 700; color: #0f172a; font-size: .9rem; margin-bottom: 4px; }
                .fc-bottomnav {
                    position: fixed;
                    bottom: 0; left: 50%;
                    transform: translateX(-50%);
                    width: 100%;
                    max-width: 480px;
                    background: rgba(255,255,255,.94);
                    backdrop-filter: blur(12px);
                    border-top: 1px solid rgba(15,23,42,.07);
                    display: flex;
                    padding: 8px 0 calc(8px + env(safe-area-inset-bottom, 0px));
                    z-index: 20;
                }
                .fc-bottomnav a {
                    flex: 1;
                    text-align: center;
                    color: #94a3b8;
                    font-size: .68rem;
                    font-weight: 600;
                    text-decoration: none;
                    padding: 4px 0;
                }
                .fc-bottomnav a i { display: block; font-size: 18px; margin-bottom: 2px; }
                .fc-bottomnav a.active { color: #2563eb; }
                @media (min-width: 481px) {
                    .fc-shell { margin: 24px auto; min-height: calc(100vh - 48px); border-radius: 28px; }
                    .fc-header { border-top-left-radius: 28px; border-top-right-radius: 28px; }
                }
            `}</style>

            <div className="fc-shell">
                <div className="fc-header">
                    <div className="d-flex align-items-center" style={{ gap: 12 }}>
                        <div className="fc-header-avatar"><i className="fas fa-headset"></i></div>
                        <div className="flex-grow-1">
                            <div className="fc-eyebrow">PTSAN</div>
                            <h1>Follow-up Customer</h1>
                            <p>Ringkasan customer &amp; order</p>
                        </div>
                    </div>
                </div>

                <div className="fc-content">
                    <div className="fc-stats">
                        {stats.map((s, i) => (
                            <div key={i} className="fc-stat" style={{ background: s.grad }}>
                                <div className="fc-stat-icon"><i className={`fas ${s.icon}`}></i></div>
                                <div className="fc-stat-value">{s.value}</div>
                                <div className="fc-stat-label">{s.label}</div>
                                <div className="fc-stat-sub">{s.sub}</div>
                            </div>
                        ))}
                    </div>

                    {!isStandalone && (installEvent || isIos) && (
                        <div className="fc-install">
                            <div className="fc-install-icon"><i className="fas fa-mobile-alt"></i></div>
                            <div className="fc-install-body">
                                <p className="fc-install-title">Pasang Aplikasi</p>
                                <p className="fc-install-sub">
                                    {installEvent
                                        ? 'Pasang di layar utama untuk akses cepat.'
                                        : 'Ketuk Bagikan lalu "Tambahkan ke Layar Utama".'}
                                </p>
                            </div>
                            {installEvent && (
                                <button type="button" className="fc-install-btn" onClick={installApp}>
                                    Pasang
                                </button>
                            )}
                        </div>
                    )}

                    <div className="fc-notif">
                        <div className={`fc-notif-icon ${active ? 'is-on' : ''}`}>
                            <i className={`fas ${active ? 'fa-bell' : 'fa-bell-slash'}`}></i>
                        </div>
                        <div className="fc-notif-body">
                            <p className="fc-notif-title">
                                {active ? 'Notifikasi Aktif' : 'Notifikasi Follow-up'}
                            </p>
                            <p className="fc-notif-sub">
                                {!onesignalAppId
                                    ? 'OneSignal belum dikonfigurasi (isi VITE_ONESIGNAL_APP_ID).'
                                    : active
                                        ? 'Anda akan menerima notifikasi follow-up customer.'
                                        : !osReady
                                            ? 'Memuat OneSignal...'
                                            : permission
                                                ? 'Perangkat diizinkan, tapi belum berlangganan. Aktifkan ulang.'
                                                : 'Aktifkan untuk menerima notifikasi follow-up customer.'}
                            </p>
                        </div>
                        {onesignalAppId && !active && (
                            <button
                                type="button"
                                className="fc-notif-btn"
                                onClick={enableNotifications}
                                disabled={enabling}
                            >
                                {enabling ? 'Memproses...' : permission ? 'Aktifkan ulang' : 'Aktifkan'}
                            </button>
                        )}
                        {onesignalAppId && active && (
                            <button
                                type="button"
                                className="fc-notif-btn fc-notif-btn-off"
                                onClick={disableNotifications}
                                disabled={enabling}
                            >
                                Nonaktifkan
                            </button>
                        )}
                    </div>
                    {osError && (
                        <div className="fc-notif-error">
                            <i className="fas fa-exclamation-triangle"></i> {osError}
                        </div>
                    )}

                    {diag && (
                        <details className="fc-diag">
                            <summary>Status teknis OneSignal (debug)</summary>
                            <ul>
                                <li>App ID dipakai: <b>{diag.appId}</b></li>
                                <li>URL halaman: <b>{diag.url}</b></li>
                                <li>Permission: <b>{String(diag.permission)}</b></li>
                                {diag.isPushSupported !== undefined && (
                                    <li>Push supported: <b>{String(diag.isPushSupported)}</b></li>
                                )}
                                {diag.optedIn !== undefined && (
                                    <li>OptedIn (subscribed): <b>{String(diag.optedIn)}</b></li>
                                )}
                                {diag.subId && (
                                    <li>Subscription ID: <b>{diag.subId}</b></li>
                                )}
                                {diag.error && (
                                    <li>Error: <b>{diag.error}</b></li>
                                )}
                            </ul>
                        </details>
                    )}

                    <div className="fc-section">
                        <div className="fc-section-head">
                            <h2>Data Follow-up Customer</h2>
                            <span>{followups.length} data</span>
                        </div>

                        {followups.length === 0 ? (
                            <div className="fc-empty">
                                <div className="fc-empty-icon"><i className="fas fa-clipboard-list"></i></div>
                                <div className="fc-empty-title">Belum ada data follow-up</div>
                                <p>Data follow-up customer akan tampil di sini.</p>
                            </div>
                        ) : (
                            <div className="fc-list">
                                {followups.map((f, i) => (
                                    <div key={f.id ?? i} className="fc-item">
                                        <div className="fc-item-avatar">
                                            {(f.nama_customer || '?').charAt(0).toUpperCase()}
                                        </div>
                                        <div className="fc-item-body">
                                            <p className="fc-item-title">{f.nama_customer}</p>
                                            <p className="fc-item-sub">
                                                {[f.barang, f.jumlah, f.tanggal].filter(Boolean).join(' · ')}
                                            </p>
                                        </div>
                                        <i className="fas fa-chevron-right" style={{ color: '#cbd5e1' }}></i>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <nav className="fc-bottomnav">
                    <a href="/follow-up-customer" className="active"><i className="fas fa-headset"></i>Follow-up</a>
                    <a href="/peta-customer"><i className="fas fa-map-marked-alt"></i>Peta</a>
                </nav>
            </div>
        </div>
    );
}
