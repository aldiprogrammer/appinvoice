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

function daysLabel(days) {
    return `${days} hari`;
}

function severity(days, waktu) {
    if (waktu > 0 && days >= waktu * 2) {
        return { bg: 'linear-gradient(135deg,#ef4444,#dc2626)', label: 'Terlambat' };
    }
    return { bg: 'linear-gradient(135deg,#f59e0b,#d97706)', label: 'Perlu Follow-up' };
}

function waNumber(nohp) {
    let digits = (nohp || '').replace(/\D/g, '');
    if (digits.startsWith('0')) digits = '62' + digits.slice(1);
    return digits;
}

const ORDER_COLUMNS = [
    { key: 'tanggal', label: 'Tanggal' },
    { key: 'no_bon', label: 'No Bon' },
    { key: 'no_sj', label: 'No SJ' },
    { key: 'kode_item', label: 'Kode Item' },
    { key: 'barang', label: 'Barang' },
    { key: 'gudang', label: 'Gudang' },
    { key: 'zak', label: 'Zak' },
    { key: 'kg', label: 'Kg' },
    { key: 'total_kg', label: 'Total Kg' },
    { key: 'harga', label: 'Harga' },
    { key: 'jumlah', label: 'Jumlah' },
];

export default function Index({ jmlOrder = 0, followups = [], waktu = 0, status = 'Tidak Aktif' }) {
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
    const [search, setSearch] = useState('');
    const [visible, setVisible] = useState(5);
    const [detailItem, setDetailItem] = useState(null);

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

    const filtered = followups.filter((c) =>
        (c.nama_customer || '').toLowerCase().includes(search.toLowerCase()) ||
        (c.nohp || '').toLowerCase().includes(search.toLowerCase()) ||
        (c.last_barang || '').toLowerCase().includes(search.toLowerCase())
    );
    const visibleItems = filtered.slice(0, visible);
    const hasMore = filtered.length > visible;

    const stats = [
        { label: 'Jumlah Follow-up', value: followups.length, icon: 'fa-headset', grad: 'linear-gradient(135deg,#10b981,#059669)', sub: 'Customer perlu follow-up' },
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
                .fc-alert {
                    display: flex; align-items: flex-start; gap: 10px;
                    background: #fffbeb; border: 1px solid #fde68a; color: #92400e;
                    border-radius: 14px; padding: 12px 14px; font-size: .78rem;
                    line-height: 1.45; margin-bottom: 14px;
                }
                .fc-alert i { margin-top: 2px; flex-shrink: 0; }
                .fc-fl-toolbar { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 14px; }
                .fc-fl-count {
                    flex: 1; border-radius: 16px; padding: 14px 16px;
                    background: linear-gradient(135deg,#fff1f2,#ffe4e6);
                    border: 1px solid #fecdd3;
                }
                .fc-fl-count-num { font-size: 1.6rem; font-weight: 800; line-height: 1; color: #e11d48; }
                .fc-fl-count-lbl { font-size: .72rem; font-weight: 600; color: #9f1239; margin-top: 4px; }
                .fc-fl-pills { display: flex; flex-direction: column; gap: 6px; align-items: flex-end; }
                .fc-pill {
                    display: inline-flex; align-items: center; gap: 6px;
                    border-radius: 999px; padding: 6px 12px; font-size: .72rem; font-weight: 700; white-space: nowrap;
                }
                .fc-pill-blue { background: #eff6ff; color: #2563eb; }
                .fc-pill-green { background: #ecfdf5; color: #059669; }
                .fc-pill-red { background: #fef2f2; color: #dc2626; }
                .fc-search { position: relative; margin-bottom: 14px; }
                .fc-search i {
                    position: absolute; left: 14px; top: 50%; transform: translateY(-50%);
                    color: #94a3b8; font-size: .85rem; pointer-events: none;
                }
                .fc-search input {
                    width: 100%; border: 1px solid rgba(15,23,42,.1); border-radius: 14px;
                    padding: 11px 14px 11px 38px; font-size: .82rem; color: #0f172a;
                    background: #fff; outline: none; box-shadow: 0 1px 3px rgba(15,23,42,.04);
                }
                .fc-search input:focus { border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(59,130,246,.15); }
                .fc-fl-list { display: flex; flex-direction: column; gap: 12px; }
                .fc-fl-card {
                    background: #fff; border: 1px solid rgba(15,23,42,.07);
                    border-radius: 18px; padding: 14px 16px;
                    box-shadow: 0 2px 10px rgba(15,23,42,.04);
                }
                .fc-fl-top { display: flex; align-items: flex-start; gap: 12px; }
                .fc-fl-avatar {
                    width: 46px; height: 46px; border-radius: 14px; flex-shrink: 0;
                    display: flex; align-items: center; justify-content: center;
                    color: #fff; font-weight: 800; font-size: 1.05rem;
                }
                .fc-fl-id { flex: 1; min-width: 0; }
                .fc-fl-name { font-size: .95rem; font-weight: 700; color: #0f172a; margin: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
                .fc-fl-hp { font-size: .74rem; color: #64748b; margin: 3px 0 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
                .fc-fl-hp i { color: #16a34a; margin-right: 4px; }
                .fc-sev {
                    flex-shrink: 0; border-radius: 999px; padding: 5px 10px;
                    font-size: .68rem; font-weight: 700; color: #fff; white-space: nowrap;
                }
                .fc-fl-meta {
                    display: grid; grid-template-columns: repeat(3, 1fr);
                    gap: 8px; margin-top: 14px;
                    background: #f8fafc; border-radius: 12px; padding: 10px 12px;
                }
                .fc-fl-mk { display: block; font-size: .65rem; text-transform: uppercase; letter-spacing: .04em; color: #94a3b8; font-weight: 700; }
                .fc-fl-mv { display: block; font-size: .82rem; font-weight: 700; color: #0f172a; margin-top: 2px; }
                .fc-fl-last {
                    margin-top: 10px; font-size: .75rem; color: #475569;
                    display: flex; align-items: center; gap: 6px;
                    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
                }
                .fc-fl-last i { color: #f59e0b; }
                .fc-fl-actions { display: flex; gap: 8px; margin-top: 14px; }
                .fc-btn {
                    flex: 1; border: none; border-radius: 12px; padding: 10px 12px;
                    font-size: .78rem; font-weight: 700; cursor: pointer; text-decoration: none;
                    display: inline-flex; align-items: center; justify-content: center; gap: 6px;
                }
                .fc-btn-detail { background: #eef2ff; color: #4338ca; }
                .fc-btn-wa { background: #dcfce7; color: #15803d; }
                .fc-more { display: flex; justify-content: center; margin-top: 16px; }
                .fc-more-btn {
                    display: inline-flex; align-items: center; gap: 8px;
                    border: 1px solid rgba(59,130,246,.3); background: #eff6ff; color: #2563eb;
                    border-radius: 999px; padding: 11px 22px; font-size: .82rem; font-weight: 700;
                    cursor: pointer; box-shadow: 0 4px 12px rgba(37,99,235,.12);
                    transition: background .15s ease, transform .15s ease;
                }
                .fc-more-btn:hover { background: #dbeafe; transform: translateY(-1px); }
                .fc-more-rem { font-size: .68rem; font-weight: 700; background: #2563eb; color: #fff; border-radius: 999px; padding: 2px 8px; }
                .fc-more-all {
                    display: inline-flex; align-items: center; gap: 8px;
                    font-size: .76rem; font-weight: 600; color: #16a34a;
                    background: #f0fdf4; border: 1px solid #bbf7d0;
                    border-radius: 999px; padding: 8px 16px;
                }
                .fc-modal {
                    position: fixed; inset: 0; z-index: 1060;
                    background: rgba(15,23,42,.55);
                    display: flex; align-items: flex-end; justify-content: center;
                }
                .fc-modal-box {
                    width: 100%; max-width: 480px; max-height: 88vh;
                    background: #f7f9fc; border-top-left-radius: 24px; border-top-right-radius: 24px;
                    display: flex; flex-direction: column; overflow: hidden;
                    animation: fcSlideUp .25s ease;
                }
                @keyframes fcSlideUp { from { transform: translateY(30px); opacity: .6; } to { transform: translateY(0); opacity: 1; } }
                .fc-modal-head {
                    display: flex; align-items: center; gap: 12px;
                    padding: 18px 18px 14px; background: linear-gradient(135deg,#2563eb,#1d4ed8);
                    color: #fff;
                }
                .fc-modal-avatar {
                    width: 44px; height: 44px; border-radius: 14px; flex-shrink: 0;
                    background: rgba(255,255,255,.2);
                    display: flex; align-items: center; justify-content: center;
                    font-weight: 800; font-size: 1.05rem;
                }
                .fc-modal-name { font-size: .98rem; font-weight: 700; margin: 0; }
                .fc-modal-sub { font-size: .72rem; opacity: .85; margin: 2px 0 0; }
                .fc-modal-close {
                    margin-left: auto; background: rgba(255,255,255,.16); border: none;
                    width: 32px; height: 32px; border-radius: 10px; color: #fff;
                    font-size: 1.3rem; line-height: 1; cursor: pointer; flex-shrink: 0;
                }
                .fc-modal-body { padding: 16px 18px; overflow-y: auto; }
                .fc-modal-foot {
                    display: flex; gap: 8px; padding: 14px 18px calc(14px + env(safe-area-inset-bottom, 0px));
                    border-top: 1px solid rgba(15,23,42,.07); background: #fff;
                }
                @media (min-width: 481px) {
                    .fc-modal { align-items: center; }
                    .fc-modal-box { border-radius: 24px; max-height: 84vh; }
                }
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
                            <h2>Daftar Follow-up Customer</h2>
                            <span>{followups.length} customer</span>
                        </div>

                        {status !== 'Aktif' && (
                            <div className="fc-alert">
                                <i className="fas fa-exclamation-triangle"></i>
                                <div>
                                    Fitur follow-up sedang <b>Tidak Aktif</b>. Daftar di bawah dihitung berdasarkan
                                    waktu <b>{waktu} hari</b>.
                                </div>
                            </div>
                        )}

                        <div className="fc-fl-toolbar">
                            <div className="fc-fl-count">
                                <div className="fc-fl-count-num">{followups.length}</div>
                                <div className="fc-fl-count-lbl">Perlu di-follow-up</div>
                            </div>
                            <div className="fc-fl-pills">
                                <span className="fc-pill fc-pill-blue"><i className="fas fa-clock"></i> {waktu} hari</span>
                                <span className={`fc-pill ${status === 'Aktif' ? 'fc-pill-green' : 'fc-pill-red'}`}>
                                    <i className={`fas ${status === 'Aktif' ? 'fa-check-circle' : 'fa-times-circle'}`}></i> {status}
                                </span>
                            </div>
                        </div>

                        <div className="fc-search">
                            <i className="fas fa-search"></i>
                            <input
                                type="text"
                                placeholder="Cari nama, no hp, barang..."
                                value={search}
                                onChange={(e) => { setSearch(e.target.value); setVisible(5); }}
                            />
                        </div>

                        {followups.length === 0 ? (
                            <div className="fc-empty">
                                <div className="fc-empty-icon"><i className="fas fa-clipboard-check"></i></div>
                                <div className="fc-empty-title">Tidak ada yang perlu di-follow-up</div>
                                <p>Semua customer masih dalam jangka waktu follow-up.</p>
                            </div>
                        ) : filtered.length === 0 ? (
                            <div className="fc-empty">
                                <div className="fc-empty-icon"><i className="fas fa-search"></i></div>
                                <div className="fc-empty-title">Tidak ada data yang cocok</div>
                                <p>Coba kata kunci lain untuk pencarian.</p>
                            </div>
                        ) : (
                            <div className="fc-fl-list">
                                {visibleItems.map((item, idx) => {
                                    const sev = severity(item.days_since, waktu);
                                    const wa = waNumber(item.nohp);
                                    return (
                                        <div key={`${item.nama_customer}-${idx}`} className="fc-fl-card">
                                            <div className="fc-fl-top">
                                                <div className="fc-fl-avatar" style={{ background: sev.bg }}>
                                                    {(item.nama_customer || '?').charAt(0).toUpperCase()}
                                                </div>
                                                <div className="fc-fl-id">
                                                    <p className="fc-fl-name">{item.nama_customer}</p>
                                                    <p className="fc-fl-hp">
                                                        <i className="fas fa-phone-alt"></i>{item.nohp || 'No HP belum ada'}
                                                    </p>
                                                </div>
                                                <span className="fc-sev" style={{ background: sev.bg }}>{sev.label}</span>
                                            </div>

                                            <div className="fc-fl-meta">
                                                <div>
                                                    <span className="fc-fl-mk">Order terakhir</span>
                                                    <span className="fc-fl-mv">{item.last_tanggal}</span>
                                                </div>
                                                <div>
                                                    <span className="fc-fl-mk">Selisih</span>
                                                    <span className="fc-fl-mv">{daysLabel(item.days_since)}</span>
                                                </div>
                                                <div>
                                                    <span className="fc-fl-mk">Total order</span>
                                                    <span className="fc-fl-mv">{item.total_orders}×</span>
                                                </div>
                                            </div>

                                            {item.last_barang && (
                                                <div className="fc-fl-last"><i className="fas fa-box"></i> {item.last_barang}</div>
                                            )}

                                            <div className="fc-fl-actions">
                                                <button className="fc-btn fc-btn-detail" onClick={() => setDetailItem(item)}>
                                                    <i className="fas fa-list-ul"></i>Detail
                                                </button>
                                                {wa && (
                                                    <a className="fc-btn fc-btn-wa" href={`https://wa.me/${wa}`} target="_blank" rel="noreferrer">
                                                        <i className="fab fa-whatsapp"></i>Hubungi
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                        {filtered.length > 5 && (
                            <div className="fc-more">
                                {hasMore ? (
                                    <button className="fc-more-btn" onClick={() => setVisible(visible + 5)}>
                                        <i className="fas fa-chevron-circle-down"></i>
                                        Lihat Lebih Banyak
                                        <span className="fc-more-rem">{filtered.length - visible} lagi</span>
                                    </button>
                                ) : (
                                    <div className="fc-more-all">
                                        <i className="fas fa-check-circle"></i> Semua {filtered.length} customer ditampilkan
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {detailItem && (
                    <div className="fc-modal" onClick={() => setDetailItem(null)}>
                        <div className="fc-modal-box" onClick={(e) => e.stopPropagation()}>
                            <div className="fc-modal-head">
                                <div className="fc-modal-avatar">
                                    {(detailItem.nama_customer || '?').charAt(0).toUpperCase()}
                                </div>
                                <div style={{ minWidth: 0 }}>
                                    <p className="fc-modal-name">{detailItem.nama_customer}</p>
                                    <p className="fc-modal-sub">
                                        {detailItem.orders.length} order &middot; terakhir {detailItem.last_tanggal}
                                        {detailItem.nohp ? ` · ${detailItem.nohp}` : ''}
                                    </p>
                                </div>
                                <button type="button" className="fc-modal-close" onClick={() => setDetailItem(null)}>&times;</button>
                            </div>
                            <div className="fc-modal-body">
                                {detailItem.orders.length === 0 ? (
                                    <div className="text-center text-muted py-4">Belum ada data order</div>
                                ) : (
                                    <div className="table-responsive">
                                        <table className="table table-striped table-sm w-100 mb-0">
                                            <thead>
                                                <tr>
                                                    <th>No</th>
                                                    {ORDER_COLUMNS.map((c) => <th key={c.key}>{c.label}</th>)}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {detailItem.orders.map((o, i) => (
                                                    <tr key={i}>
                                                        <th>{i + 1}</th>
                                                        {ORDER_COLUMNS.map((c) => (
                                                            <td key={c.key} className={c.key === 'barang' ? 'font-weight-bold' : ''}>{o[c.key] || '-'}</td>
                                                        ))}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                            <div className="fc-modal-foot">
                                {waNumber(detailItem.nohp) && (
                                    <a className="fc-btn fc-btn-wa" href={`https://wa.me/${waNumber(detailItem.nohp)}`} target="_blank" rel="noreferrer">
                                        <i className="fab fa-whatsapp"></i>Hubungi
                                    </a>
                                )}
                                <button className="fc-btn fc-btn-detail" onClick={() => setDetailItem(null)}>Tutup</button>
                            </div>
                        </div>
                    </div>
                )}

                <nav className="fc-bottomnav">
                    <a href="/follow-up-customer" className="active"><i className="fas fa-headset"></i>Follow-up</a>
                    <a href="/peta-customer"><i className="fas fa-map-marked-alt"></i>Peta</a>
                </nav>
            </div>
        </div>
    );
}
