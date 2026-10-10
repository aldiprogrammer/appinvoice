import{r as n,j as e,H as q}from"./app-DPMoDsKf.js";/* empty css            */const L="https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js";function S(l){return typeof window>"u"||!l?Promise.resolve(null):window.__oneSignalInstance?Promise.resolve(window.__oneSignalInstance):(window.__oneSignalPromise||(window.__oneSignalPromise=new Promise((s,f)=>{if(window.OneSignalDeferred=window.OneSignalDeferred||[],!document.querySelector(`script[src="${L}"]`)){const t=document.createElement("script");t.src=L,t.defer=!0,t.onerror=()=>{window.__oneSignalPromise=null,f(new Error("Gagal memuat SDK OneSignal. Cek koneksi internet."))},document.head.appendChild(t)}window.OneSignalDeferred.push(async t=>{try{await t.init({appId:l,allowLocalhostAsSecureOrigin:!0,serviceWorkerPath:"OneSignalSDKWorker.js",serviceWorkerParam:{scope:"/"}})}catch(d){if(!/already initialized/i.test(d&&d.message||"")){window.__oneSignalPromise=null,f(d);return}}window.__oneSignalInstance=t,s(t)})})),window.__oneSignalPromise)}function V(l){return`${l} hari`}function X(l,s){return s>0&&l>=s*2?{bg:"linear-gradient(135deg,#ef4444,#dc2626)",label:"Terlambat"}:{bg:"linear-gradient(135deg,#f59e0b,#d97706)",label:"Perlu Follow-up"}}function z(l){let s=(l||"").replace(/\D/g,"");return s.startsWith("0")&&(s="62"+s.slice(1)),s}const E=[{key:"tanggal",label:"Tanggal"},{key:"no_bon",label:"No Bon"},{key:"no_sj",label:"No SJ"},{key:"kode_item",label:"Kode Item"},{key:"barang",label:"Barang"},{key:"gudang",label:"Gudang"},{key:"zak",label:"Zak"},{key:"kg",label:"Kg"},{key:"total_kg",label:"Total Kg"},{key:"harga",label:"Harga"},{key:"jumlah",label:"Jumlah"}];function ee({jmlOrder:l=0,followups:s=[],waktu:f=0,status:t="Tidak Aktif"}){const d="42864419-3f08-49d3-9457-1c22d96b5205",[D,_]=n.useState(!1),[v,U]=n.useState(!1),[T,$]=n.useState(!1),[g,w]=n.useState(!1),[P,p]=n.useState(""),[r,I]=n.useState(null),[x,N]=n.useState(null),[O,C]=n.useState(!1),[F,K]=n.useState(!1),[j,R]=n.useState(""),[k,A]=n.useState(5),[o,y]=n.useState(null),H=a=>{try{I({appId:"42864419-3f08-49d3-9457-1c22d96b5205",url:window.location.href,permission:a.Notifications.permission,isPushSupported:a.Notifications.isPushSupported(),optedIn:a.User.PushSubscription.optedIn,subId:a.User.PushSubscription.id||"(kosong)"})}catch(i){I({appId:"42864419-3f08-49d3-9457-1c22d96b5205",url:window.location.href,error:i.message})}},b=a=>{try{U(a.Notifications.permission),$(a.User.PushSubscription.optedIn&&!!a.User.PushSubscription.id)}catch{}H(a)};n.useEffect(()=>{let a=!0;return S(d).then(i=>{!a||!i||(_(!0),p(""),b(i),i.Notifications.addEventListener("permissionChange",()=>{a&&b(i)}),i.User.PushSubscription.addEventListener("change",()=>{a&&b(i)}))}).catch(i=>{a&&p(i&&i.message||"OneSignal gagal diinisialisasi.")}),()=>{a=!1}},[d]),n.useEffect(()=>{const a=window.matchMedia("(display-mode: standalone)").matches||window.navigator.standalone===!0;C(a),K(/iphone|ipad|ipod/i.test(window.navigator.userAgent));const i=u=>{u.preventDefault(),N(u)},c=()=>{N(null),C(!0)};return window.addEventListener("beforeinstallprompt",i),window.addEventListener("appinstalled",c),()=>{window.removeEventListener("beforeinstallprompt",i),window.removeEventListener("appinstalled",c)}},[]);const B=async()=>{x&&(x.prompt(),await x.userChoice,N(null))},M=async()=>{if(!g){w(!0),p("");try{const a=await S(d);if(!a)return;_(!0);let i=a.Notifications.permission;i||(i=await a.Notifications.requestPermission()),i&&await a.User.PushSubscription.optIn(),b(a)}catch(a){console.error("OneSignal error:",a),p(a&&a.message||"Gagal mengaktifkan notifikasi. Lihat console browser.")}finally{w(!1)}}},G=async()=>{if(!g){w(!0),p("");try{const a=await S(d);if(!a)return;await a.User.PushSubscription.optOut(),b(a)}catch(a){console.error("OneSignal error:",a),p(a&&a.message||"Gagal menonaktifkan notifikasi. Lihat console browser.")}finally{w(!1)}}},m=v&&T,h=s.filter(a=>(a.nama_customer||"").toLowerCase().includes(j.toLowerCase())||(a.nohp||"").toLowerCase().includes(j.toLowerCase())||(a.last_barang||"").toLowerCase().includes(j.toLowerCase())),W=h.slice(0,k),J=h.length>k,Y=[{label:"Jumlah Follow-up",value:s.length,icon:"fa-headset",grad:"linear-gradient(135deg,#10b981,#059669)",sub:"Customer perlu follow-up"},{label:"Jumlah Order",value:l,icon:"fa-shopping-cart",grad:"linear-gradient(135deg,#3b82f6,#2563eb)",sub:"Total order masuk"}];return e.jsxs("div",{className:"fc-page",children:[e.jsx(q,{title:"Follow-up Customer"}),e.jsx("style",{children:`
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
            `}),e.jsxs("div",{className:"fc-shell",children:[e.jsx("div",{className:"fc-header",children:e.jsxs("div",{className:"d-flex align-items-center",style:{gap:12},children:[e.jsx("div",{className:"fc-header-avatar",children:e.jsx("i",{className:"fas fa-headset"})}),e.jsxs("div",{className:"flex-grow-1",children:[e.jsx("div",{className:"fc-eyebrow",children:"PTSAN"}),e.jsx("h1",{children:"Follow-up Customer"}),e.jsx("p",{children:"Ringkasan customer & order"})]})]})}),e.jsxs("div",{className:"fc-content",children:[e.jsx("div",{className:"fc-stats",children:Y.map((a,i)=>e.jsxs("div",{className:"fc-stat",style:{background:a.grad},children:[e.jsx("div",{className:"fc-stat-icon",children:e.jsx("i",{className:`fas ${a.icon}`})}),e.jsx("div",{className:"fc-stat-value",children:a.value}),e.jsx("div",{className:"fc-stat-label",children:a.label}),e.jsx("div",{className:"fc-stat-sub",children:a.sub})]},i))}),!O&&(x||F)&&e.jsxs("div",{className:"fc-install",children:[e.jsx("div",{className:"fc-install-icon",children:e.jsx("i",{className:"fas fa-mobile-alt"})}),e.jsxs("div",{className:"fc-install-body",children:[e.jsx("p",{className:"fc-install-title",children:"Pasang Aplikasi"}),e.jsx("p",{className:"fc-install-sub",children:x?"Pasang di layar utama untuk akses cepat.":'Ketuk Bagikan lalu "Tambahkan ke Layar Utama".'})]}),x&&e.jsx("button",{type:"button",className:"fc-install-btn",onClick:B,children:"Pasang"})]}),e.jsxs("div",{className:"fc-notif",children:[e.jsx("div",{className:`fc-notif-icon ${m?"is-on":""}`,children:e.jsx("i",{className:`fas ${m?"fa-bell":"fa-bell-slash"}`})}),e.jsxs("div",{className:"fc-notif-body",children:[e.jsx("p",{className:"fc-notif-title",children:m?"Notifikasi Aktif":"Notifikasi Follow-up"}),e.jsx("p",{className:"fc-notif-sub",children:m?"Anda akan menerima notifikasi follow-up customer.":D?v?"Perangkat diizinkan, tapi belum berlangganan. Aktifkan ulang.":"Aktifkan untuk menerima notifikasi follow-up customer.":"Memuat OneSignal..."})]}),!m&&e.jsx("button",{type:"button",className:"fc-notif-btn",onClick:M,disabled:g,children:g?"Memproses...":v?"Aktifkan ulang":"Aktifkan"}),m&&e.jsx("button",{type:"button",className:"fc-notif-btn fc-notif-btn-off",onClick:G,disabled:g,children:"Nonaktifkan"})]}),P&&e.jsxs("div",{className:"fc-notif-error",children:[e.jsx("i",{className:"fas fa-exclamation-triangle"})," ",P]}),r&&e.jsxs("details",{className:"fc-diag",children:[e.jsx("summary",{children:"Status teknis OneSignal (debug)"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["App ID dipakai: ",e.jsx("b",{children:r.appId})]}),e.jsxs("li",{children:["URL halaman: ",e.jsx("b",{children:r.url})]}),e.jsxs("li",{children:["Permission: ",e.jsx("b",{children:String(r.permission)})]}),r.isPushSupported!==void 0&&e.jsxs("li",{children:["Push supported: ",e.jsx("b",{children:String(r.isPushSupported)})]}),r.optedIn!==void 0&&e.jsxs("li",{children:["OptedIn (subscribed): ",e.jsx("b",{children:String(r.optedIn)})]}),r.subId&&e.jsxs("li",{children:["Subscription ID: ",e.jsx("b",{children:r.subId})]}),r.error&&e.jsxs("li",{children:["Error: ",e.jsx("b",{children:r.error})]})]})]}),e.jsxs("div",{className:"fc-section",children:[e.jsxs("div",{className:"fc-section-head",children:[e.jsx("h2",{children:"Daftar Follow-up Customer"}),e.jsxs("span",{children:[s.length," customer"]})]}),t!=="Aktif"&&e.jsxs("div",{className:"fc-alert",children:[e.jsx("i",{className:"fas fa-exclamation-triangle"}),e.jsxs("div",{children:["Fitur follow-up sedang ",e.jsx("b",{children:"Tidak Aktif"}),". Daftar di bawah dihitung berdasarkan waktu ",e.jsxs("b",{children:[f," hari"]}),"."]})]}),e.jsxs("div",{className:"fc-fl-toolbar",children:[e.jsxs("div",{className:"fc-fl-count",children:[e.jsx("div",{className:"fc-fl-count-num",children:s.length}),e.jsx("div",{className:"fc-fl-count-lbl",children:"Perlu di-follow-up"})]}),e.jsxs("div",{className:"fc-fl-pills",children:[e.jsxs("span",{className:"fc-pill fc-pill-blue",children:[e.jsx("i",{className:"fas fa-clock"})," ",f," hari"]}),e.jsxs("span",{className:`fc-pill ${t==="Aktif"?"fc-pill-green":"fc-pill-red"}`,children:[e.jsx("i",{className:`fas ${t==="Aktif"?"fa-check-circle":"fa-times-circle"}`})," ",t]})]})]}),e.jsxs("div",{className:"fc-search",children:[e.jsx("i",{className:"fas fa-search"}),e.jsx("input",{type:"text",placeholder:"Cari nama, no hp, barang...",value:j,onChange:a=>{R(a.target.value),A(5)}})]}),s.length===0?e.jsxs("div",{className:"fc-empty",children:[e.jsx("div",{className:"fc-empty-icon",children:e.jsx("i",{className:"fas fa-clipboard-check"})}),e.jsx("div",{className:"fc-empty-title",children:"Tidak ada yang perlu di-follow-up"}),e.jsx("p",{children:"Semua customer masih dalam jangka waktu follow-up."})]}):h.length===0?e.jsxs("div",{className:"fc-empty",children:[e.jsx("div",{className:"fc-empty-icon",children:e.jsx("i",{className:"fas fa-search"})}),e.jsx("div",{className:"fc-empty-title",children:"Tidak ada data yang cocok"}),e.jsx("p",{children:"Coba kata kunci lain untuk pencarian."})]}):e.jsx("div",{className:"fc-fl-list",children:W.map((a,i)=>{const c=X(a.days_since,f),u=z(a.nohp);return e.jsxs("div",{className:"fc-fl-card",children:[e.jsxs("div",{className:"fc-fl-top",children:[e.jsx("div",{className:"fc-fl-avatar",style:{background:c.bg},children:(a.nama_customer||"?").charAt(0).toUpperCase()}),e.jsxs("div",{className:"fc-fl-id",children:[e.jsx("p",{className:"fc-fl-name",children:a.nama_customer}),e.jsxs("p",{className:"fc-fl-hp",children:[e.jsx("i",{className:"fas fa-phone-alt"}),a.nohp||"No HP belum ada"]})]}),e.jsx("span",{className:"fc-sev",style:{background:c.bg},children:c.label})]}),e.jsxs("div",{className:"fc-fl-meta",children:[e.jsxs("div",{children:[e.jsx("span",{className:"fc-fl-mk",children:"Order terakhir"}),e.jsx("span",{className:"fc-fl-mv",children:a.last_tanggal})]}),e.jsxs("div",{children:[e.jsx("span",{className:"fc-fl-mk",children:"Selisih"}),e.jsx("span",{className:"fc-fl-mv",children:V(a.days_since)})]}),e.jsxs("div",{children:[e.jsx("span",{className:"fc-fl-mk",children:"Total order"}),e.jsxs("span",{className:"fc-fl-mv",children:[a.total_orders,"×"]})]})]}),a.last_barang&&e.jsxs("div",{className:"fc-fl-last",children:[e.jsx("i",{className:"fas fa-box"})," ",a.last_barang]}),e.jsxs("div",{className:"fc-fl-actions",children:[e.jsxs("button",{className:"fc-btn fc-btn-detail",onClick:()=>y(a),children:[e.jsx("i",{className:"fas fa-list-ul"}),"Detail"]}),u&&e.jsxs("a",{className:"fc-btn fc-btn-wa",href:`https://wa.me/${u}`,target:"_blank",rel:"noreferrer",children:[e.jsx("i",{className:"fab fa-whatsapp"}),"Hubungi"]})]})]},`${a.nama_customer}-${i}`)})}),h.length>5&&e.jsx("div",{className:"fc-more",children:J?e.jsxs("button",{className:"fc-more-btn",onClick:()=>A(k+5),children:[e.jsx("i",{className:"fas fa-chevron-circle-down"}),"Lihat Lebih Banyak",e.jsxs("span",{className:"fc-more-rem",children:[h.length-k," lagi"]})]}):e.jsxs("div",{className:"fc-more-all",children:[e.jsx("i",{className:"fas fa-check-circle"})," Semua ",h.length," customer ditampilkan"]})})]})]}),o&&e.jsx("div",{className:"fc-modal",onClick:()=>y(null),children:e.jsxs("div",{className:"fc-modal-box",onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"fc-modal-head",children:[e.jsx("div",{className:"fc-modal-avatar",children:(o.nama_customer||"?").charAt(0).toUpperCase()}),e.jsxs("div",{style:{minWidth:0},children:[e.jsx("p",{className:"fc-modal-name",children:o.nama_customer}),e.jsxs("p",{className:"fc-modal-sub",children:[o.orders.length," order · terakhir ",o.last_tanggal,o.nohp?` · ${o.nohp}`:""]})]}),e.jsx("button",{type:"button",className:"fc-modal-close",onClick:()=>y(null),children:"×"})]}),e.jsx("div",{className:"fc-modal-body",children:o.orders.length===0?e.jsx("div",{className:"text-center text-muted py-4",children:"Belum ada data order"}):e.jsx("div",{className:"table-responsive",children:e.jsxs("table",{className:"table table-striped table-sm w-100 mb-0",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"No"}),E.map(a=>e.jsx("th",{children:a.label},a.key))]})}),e.jsx("tbody",{children:o.orders.map((a,i)=>e.jsxs("tr",{children:[e.jsx("th",{children:i+1}),E.map(c=>e.jsx("td",{className:c.key==="barang"?"font-weight-bold":"",children:a[c.key]||"-"},c.key))]},i))})]})})}),e.jsxs("div",{className:"fc-modal-foot",children:[z(o.nohp)&&e.jsxs("a",{className:"fc-btn fc-btn-wa",href:`https://wa.me/${z(o.nohp)}`,target:"_blank",rel:"noreferrer",children:[e.jsx("i",{className:"fab fa-whatsapp"}),"Hubungi"]}),e.jsx("button",{className:"fc-btn fc-btn-detail",onClick:()=>y(null),children:"Tutup"})]})]})}),e.jsxs("nav",{className:"fc-bottomnav",children:[e.jsxs("a",{href:"/follow-up-customer",className:"active",children:[e.jsx("i",{className:"fas fa-headset"}),"Follow-up"]}),e.jsxs("a",{href:"/peta-customer",children:[e.jsx("i",{className:"fas fa-map-marked-alt"}),"Peta"]})]})]})]})}export{ee as default};
