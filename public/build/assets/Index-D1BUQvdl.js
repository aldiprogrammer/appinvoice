import{r as n,j as e,H as F}from"./app-DAkNktJJ.js";/* empty css            */const S="https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js";function b(m){return typeof window>"u"||!m?Promise.resolve(null):window.__oneSignalInstance?Promise.resolve(window.__oneSignalInstance):(window.__oneSignalPromise||(window.__oneSignalPromise=new Promise((u,r)=>{if(window.OneSignalDeferred=window.OneSignalDeferred||[],!document.querySelector(`script[src="${S}"]`)){const t=document.createElement("script");t.src=S,t.defer=!0,t.onerror=()=>{window.__oneSignalPromise=null,r(new Error("Gagal memuat SDK OneSignal. Cek koneksi internet."))},document.head.appendChild(t)}window.OneSignalDeferred.push(async t=>{try{await t.init({appId:m,allowLocalhostAsSecureOrigin:!0,serviceWorkerPath:"OneSignalSDKWorker.js",serviceWorkerParam:{scope:"/"}})}catch(d){if(!/already initialized/i.test(d&&d.message||"")){window.__oneSignalPromise=null,r(d);return}}window.__oneSignalInstance=t,u(t)})})),window.__oneSignalPromise)}function B({jmlCustomer:m=0,jmlOrder:u=0,followups:r=[]}){const t="42864419-3f08-49d3-9457-1c22d96b5205",[d,w]=n.useState(!1),[g,P]=n.useState(!1),[z,I]=n.useState(!1),[f,x]=n.useState(!1),[j,o]=n.useState(""),[s,v]=n.useState(null),[c,h]=n.useState(null),[_,k]=n.useState(!1),[E,A]=n.useState(!1),D=i=>{try{v({appId:"42864419-3f08-49d3-9457-1c22d96b5205",url:window.location.href,permission:i.Notifications.permission,isPushSupported:i.Notifications.isPushSupported(),optedIn:i.User.PushSubscription.optedIn,subId:i.User.PushSubscription.id||"(kosong)"})}catch(a){v({appId:"42864419-3f08-49d3-9457-1c22d96b5205",url:window.location.href,error:a.message})}},p=i=>{try{P(i.Notifications.permission),I(i.User.PushSubscription.optedIn&&!!i.User.PushSubscription.id)}catch{}D(i)};n.useEffect(()=>{let i=!0;return b(t).then(a=>{!i||!a||(w(!0),o(""),p(a),a.Notifications.addEventListener("permissionChange",()=>{i&&p(a)}),a.User.PushSubscription.addEventListener("change",()=>{i&&p(a)}))}).catch(a=>{i&&o(a&&a.message||"OneSignal gagal diinisialisasi.")}),()=>{i=!1}},[t]),n.useEffect(()=>{const i=window.matchMedia("(display-mode: standalone)").matches||window.navigator.standalone===!0;k(i),A(/iphone|ipad|ipod/i.test(window.navigator.userAgent));const a=N=>{N.preventDefault(),h(N)},y=()=>{h(null),k(!0)};return window.addEventListener("beforeinstallprompt",a),window.addEventListener("appinstalled",y),()=>{window.removeEventListener("beforeinstallprompt",a),window.removeEventListener("appinstalled",y)}},[]);const C=async()=>{c&&(c.prompt(),await c.userChoice,h(null))},L=async()=>{if(!f){x(!0),o("");try{const i=await b(t);if(!i)return;w(!0);let a=i.Notifications.permission;a||(a=await i.Notifications.requestPermission()),a&&await i.User.PushSubscription.optIn(),p(i)}catch(i){console.error("OneSignal error:",i),o(i&&i.message||"Gagal mengaktifkan notifikasi. Lihat console browser.")}finally{x(!1)}}},U=async()=>{if(!f){x(!0),o("");try{const i=await b(t);if(!i)return;await i.User.PushSubscription.optOut(),p(i)}catch(i){console.error("OneSignal error:",i),o(i&&i.message||"Gagal menonaktifkan notifikasi. Lihat console browser.")}finally{x(!1)}}},l=g&&z,O=[{label:"Jumlah Customer",value:m,icon:"fa-users",grad:"linear-gradient(135deg,#10b981,#059669)",sub:"Customer terdaftar"},{label:"Jumlah Order",value:u,icon:"fa-shopping-cart",grad:"linear-gradient(135deg,#3b82f6,#2563eb)",sub:"Total order masuk"}];return e.jsxs("div",{className:"fc-page",children:[e.jsx(F,{title:"Follow-up Customer"}),e.jsx("style",{children:`
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
            `}),e.jsxs("div",{className:"fc-shell",children:[e.jsx("div",{className:"fc-header",children:e.jsxs("div",{className:"d-flex align-items-center",style:{gap:12},children:[e.jsx("div",{className:"fc-header-avatar",children:e.jsx("i",{className:"fas fa-headset"})}),e.jsxs("div",{className:"flex-grow-1",children:[e.jsx("div",{className:"fc-eyebrow",children:"PTSAN"}),e.jsx("h1",{children:"Follow-up Customer"}),e.jsx("p",{children:"Ringkasan customer & order"})]})]})}),e.jsxs("div",{className:"fc-content",children:[e.jsx("div",{className:"fc-stats",children:O.map((i,a)=>e.jsxs("div",{className:"fc-stat",style:{background:i.grad},children:[e.jsx("div",{className:"fc-stat-icon",children:e.jsx("i",{className:`fas ${i.icon}`})}),e.jsx("div",{className:"fc-stat-value",children:i.value}),e.jsx("div",{className:"fc-stat-label",children:i.label}),e.jsx("div",{className:"fc-stat-sub",children:i.sub})]},a))}),!_&&(c||E)&&e.jsxs("div",{className:"fc-install",children:[e.jsx("div",{className:"fc-install-icon",children:e.jsx("i",{className:"fas fa-mobile-alt"})}),e.jsxs("div",{className:"fc-install-body",children:[e.jsx("p",{className:"fc-install-title",children:"Pasang Aplikasi"}),e.jsx("p",{className:"fc-install-sub",children:c?"Pasang di layar utama untuk akses cepat.":'Ketuk Bagikan lalu "Tambahkan ke Layar Utama".'})]}),c&&e.jsx("button",{type:"button",className:"fc-install-btn",onClick:C,children:"Pasang"})]}),e.jsxs("div",{className:"fc-notif",children:[e.jsx("div",{className:`fc-notif-icon ${l?"is-on":""}`,children:e.jsx("i",{className:`fas ${l?"fa-bell":"fa-bell-slash"}`})}),e.jsxs("div",{className:"fc-notif-body",children:[e.jsx("p",{className:"fc-notif-title",children:l?"Notifikasi Aktif":"Notifikasi Follow-up"}),e.jsx("p",{className:"fc-notif-sub",children:l?"Anda akan menerima notifikasi follow-up customer.":d?g?"Perangkat diizinkan, tapi belum berlangganan. Aktifkan ulang.":"Aktifkan untuk menerima notifikasi follow-up customer.":"Memuat OneSignal..."})]}),!l&&e.jsx("button",{type:"button",className:"fc-notif-btn",onClick:L,disabled:f,children:f?"Memproses...":g?"Aktifkan ulang":"Aktifkan"}),l&&e.jsx("button",{type:"button",className:"fc-notif-btn fc-notif-btn-off",onClick:U,disabled:f,children:"Nonaktifkan"})]}),j&&e.jsxs("div",{className:"fc-notif-error",children:[e.jsx("i",{className:"fas fa-exclamation-triangle"})," ",j]}),s&&e.jsxs("details",{className:"fc-diag",children:[e.jsx("summary",{children:"Status teknis OneSignal (debug)"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["App ID dipakai: ",e.jsx("b",{children:s.appId})]}),e.jsxs("li",{children:["URL halaman: ",e.jsx("b",{children:s.url})]}),e.jsxs("li",{children:["Permission: ",e.jsx("b",{children:String(s.permission)})]}),s.isPushSupported!==void 0&&e.jsxs("li",{children:["Push supported: ",e.jsx("b",{children:String(s.isPushSupported)})]}),s.optedIn!==void 0&&e.jsxs("li",{children:["OptedIn (subscribed): ",e.jsx("b",{children:String(s.optedIn)})]}),s.subId&&e.jsxs("li",{children:["Subscription ID: ",e.jsx("b",{children:s.subId})]}),s.error&&e.jsxs("li",{children:["Error: ",e.jsx("b",{children:s.error})]})]})]}),e.jsxs("div",{className:"fc-section",children:[e.jsxs("div",{className:"fc-section-head",children:[e.jsx("h2",{children:"Data Follow-up Customer"}),e.jsxs("span",{children:[r.length," data"]})]}),r.length===0?e.jsxs("div",{className:"fc-empty",children:[e.jsx("div",{className:"fc-empty-icon",children:e.jsx("i",{className:"fas fa-clipboard-list"})}),e.jsx("div",{className:"fc-empty-title",children:"Belum ada data follow-up"}),e.jsx("p",{children:"Data follow-up customer akan tampil di sini."})]}):e.jsx("div",{className:"fc-list",children:r.map((i,a)=>e.jsxs("div",{className:"fc-item",children:[e.jsx("div",{className:"fc-item-avatar",children:(i.nama_customer||"?").charAt(0).toUpperCase()}),e.jsxs("div",{className:"fc-item-body",children:[e.jsx("p",{className:"fc-item-title",children:i.nama_customer}),e.jsx("p",{className:"fc-item-sub",children:[i.barang,i.jumlah,i.tanggal].filter(Boolean).join(" · ")})]}),e.jsx("i",{className:"fas fa-chevron-right",style:{color:"#cbd5e1"}})]},i.id??a))})]})]}),e.jsxs("nav",{className:"fc-bottomnav",children:[e.jsxs("a",{href:"/follow-up-customer",className:"active",children:[e.jsx("i",{className:"fas fa-headset"}),"Follow-up"]}),e.jsxs("a",{href:"/peta-customer",children:[e.jsx("i",{className:"fas fa-map-marked-alt"}),"Peta"]})]})]})]})}export{B as default};
