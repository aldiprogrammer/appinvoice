import{r as c,j as e,H as ke,u as se}from"./app-g5ggE764.js";/* empty css            */const Z="https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js";function H(r){return typeof window>"u"||!r?Promise.resolve(null):window.__oneSignalInstance?Promise.resolve(window.__oneSignalInstance):(window.__oneSignalPromise||(window.__oneSignalPromise=new Promise((s,i)=>{if(window.OneSignalDeferred=window.OneSignalDeferred||[],!document.querySelector(`script[src="${Z}"]`)){const l=document.createElement("script");l.src=Z,l.defer=!0,l.onerror=()=>{window.__oneSignalPromise=null,i(new Error("Gagal memuat SDK OneSignal. Cek koneksi internet."))},document.head.appendChild(l)}window.OneSignalDeferred.push(async l=>{try{await l.init({appId:r,allowLocalhostAsSecureOrigin:!0,serviceWorkerPath:"OneSignalSDKWorker.js",serviceWorkerParam:{scope:"/"}})}catch(f){if(!/already initialized/i.test(f&&f.message||"")){window.__oneSignalPromise=null,i(f);return}}window.__oneSignalInstance=l,s(l)})})),window.__oneSignalPromise)}function ye(r){return`${r} hari`}function Se(r,s){return s>0&&r>=s*2?{bg:"linear-gradient(135deg,#ef4444,#dc2626)",label:"Terlambat"}:{bg:"linear-gradient(135deg,#f59e0b,#d97706)",label:"Perlu Follow-up"}}function M(r){let s=(r||"").replace(/\D/g,"");return s.length<9?"":(s.startsWith("0")&&(s="62"+s.slice(1)),s)}const ze=["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];function y(r){const s=(r||"").toString().trim();if(!s)return null;let i=s.match(/^(\d{4})[-/](\d{1,2})[-/](\d{1,2})/);if(i)return`${i[1]}-${i[2].padStart(2,"0")}-${i[3].padStart(2,"0")}`;if(i=s.match(/^(\d{1,2})[-/](\d{1,2})[-/](\d{4})/),i)return`${i[3]}-${i[2].padStart(2,"0")}-${i[1].padStart(2,"0")}`;const l=new Date(s);return isNaN(l.getTime())?null:`${l.getFullYear()}-${String(l.getMonth()+1).padStart(2,"0")}-${String(l.getDate()).padStart(2,"0")}`}function Q(r){const s=y(r);return s?s.slice(0,7):null}function ee(r){const[s,i]=r.split("-");return`${ze[parseInt(i,10)-1]} ${s}`}const Ce=["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agu","Sep","Okt","Nov","Des"];function _e(r){const s=y(r);if(!s)return r||"-";const[i,l,f]=s.split("-");return`${parseInt(f,10)} ${Ce[parseInt(l,10)-1]} ${i}`}function ae(r){const s=parseFloat((r||"").toString().replace(/[^\d.-]/g,""));return isNaN(s)?0:s}const B=new Intl.NumberFormat("id-ID",{maximumFractionDigits:2}),T=[{key:"tanggal",label:"Tanggal"},{key:"no_bon",label:"No Bon"},{key:"no_sj",label:"No SJ"},{key:"kode_item",label:"Kode Item"},{key:"barang",label:"Barang"},{key:"gudang",label:"Gudang"},{key:"zak",label:"Zak"},{key:"kg",label:"Kg"},{key:"total_kg",label:"Total Kg"},{key:"harga",label:"Harga"},{key:"jumlah",label:"Jumlah"}];function Le({jmlOrder:r=0,followups:s=[],orders:i=[],waktu:l=0,status:f="Tidak Aktif"}){const x="42864419-3f08-49d3-9457-1c22d96b5205",[p,g]=c.useState(!1),[o,te]=c.useState(!1),[ne,re]=c.useState(!1),[S,_]=c.useState(!1),[U,b]=c.useState(""),[Ae,K]=c.useState(null),[u,E]=c.useState(null),[ie,J]=c.useState(!1),[le,oe]=c.useState(!1),[P,ce]=c.useState(""),[D,Y]=c.useState(5),[m,A]=c.useState(null),[R,W]=c.useState(null),[G,q]=c.useState(null),[j,I]=c.useState("followup"),[V,de]=c.useState(""),[z,fe]=c.useState(""),[$,O]=c.useState(10),[N,L]=c.useState(null),pe=a=>{try{K({appId:"42864419-3f08-49d3-9457-1c22d96b5205",url:window.location.href,permission:a.Notifications.permission,isPushSupported:a.Notifications.isPushSupported(),optedIn:a.User.PushSubscription.optedIn,subId:a.User.PushSubscription.id||"(kosong)"})}catch(t){K({appId:"42864419-3f08-49d3-9457-1c22d96b5205",url:window.location.href,error:t.message})}},C=a=>{try{te(a.Notifications.permission),re(a.User.PushSubscription.optedIn&&!!a.User.PushSubscription.id)}catch{}pe(a)};c.useEffect(()=>{let a=!0;return H(x).then(t=>{!a||!t||(g(!0),b(""),C(t),t.Notifications.addEventListener("permissionChange",()=>{a&&C(t)}),t.User.PushSubscription.addEventListener("change",()=>{a&&C(t)}))}).catch(t=>{a&&b(t&&t.message||"OneSignal gagal diinisialisasi.")}),()=>{a=!1}},[x]),c.useEffect(()=>{const a=window.matchMedia("(display-mode: standalone)").matches||window.navigator.standalone===!0;J(a),oe(/iphone|ipad|ipod/i.test(window.navigator.userAgent));const t=d=>{d.preventDefault(),E(d)},n=()=>{E(null),J(!0)};return window.addEventListener("beforeinstallprompt",t),window.addEventListener("appinstalled",n),()=>{window.removeEventListener("beforeinstallprompt",t),window.removeEventListener("appinstalled",n)}},[]);const me=async()=>{u&&(u.prompt(),await u.userChoice,E(null))},xe=async()=>{if(!S){_(!0),b("");try{const a=await H(x);if(!a)return;g(!0);let t=a.Notifications.permission;t||(t=await a.Notifications.requestPermission()),t&&await a.User.PushSubscription.optIn(),C(a)}catch(a){console.error("OneSignal error:",a),b(a&&a.message||"Gagal mengaktifkan notifikasi. Lihat console browser.")}finally{_(!1)}}},he=async()=>{if(!S){_(!0),b("");try{const a=await H(x);if(!a)return;await a.User.PushSubscription.optOut(),C(a)}catch(a){console.error("OneSignal error:",a),b(a&&a.message||"Gagal menonaktifkan notifikasi. Lihat console browser.")}finally{_(!1)}}},w=o&&ne,v=s.filter(a=>(a.nama_customer||"").toLowerCase().includes(P.toLowerCase())||(a.nohp||"").toLowerCase().includes(P.toLowerCase())||(a.last_barang||"").toLowerCase().includes(P.toLowerCase())),ge=v.slice(0,D),be=v.length>D,ue=[{label:"Jumlah Follow-up",value:s.length,icon:"fa-headset",grad:"linear-gradient(135deg,#10b981,#059669)",sub:"Customer perlu follow-up"},{label:"Jumlah Order",value:r,icon:"fa-shopping-cart",grad:"linear-gradient(135deg,#3b82f6,#2563eb)",sub:"Total order masuk"}],je=Array.from(new Set(i.map(a=>Q(a.tanggal)).filter(Boolean))).sort().reverse(),F=z?i.filter(a=>Q(a.tanggal)===z):i,Ne=F.filter(a=>["tanggal","nama_customer","no_bon","no_sj","kode_item","barang","gudang"].some(t=>(a[t]||"").toString().toLowerCase().includes(V.toLowerCase()))),k=(()=>{const a=new Map;Ne.forEach(n=>{const d=(n.no_sj||"").trim()||"(Tanpa No SJ)";a.has(d)||a.set(d,{key:d,no_sj:d,nama:(n.nama_customer||"-").trim()||"-",tanggal:n.tanggal,totalKg:0,items:[]});const h=a.get(d);h.items.push(n),h.totalKg+=ae(n.total_kg),(y(n.tanggal)||"")>(y(h.tanggal)||"")&&(h.tanggal=n.tanggal),(!h.nama||h.nama==="-")&&(n.nama_customer||"").trim()&&(h.nama=n.nama_customer.trim())});const t=(n,d)=>(y(d.tanggal)||"").localeCompare(y(n.tanggal)||"");return Array.from(a.values()).map(n=>(n.items.sort(t),{...n,totalOrders:n.items.length})).sort(t)})(),X=k.slice(0,$),we=k.length>$,ve=F.reduce((a,t)=>a+ae(t.total_kg),0);return e.jsxs("div",{className:"fc-page",children:[e.jsx(ke,{title:"Follow-up Customer"}),e.jsx("style",{children:`
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
                .fc-fl-hp { margin: 6px 0 0; padding: 0; }
                .fc-hp-unavail-wrap { display: flex; flex-direction: column; align-items: flex-start; gap: 6px; }
                .fc-hp-unavail {
                    display: inline-flex; align-items: center; gap: 6px;
                    font-size: .72rem; font-style: italic; color: #94a3b8;
                }
                .fc-hp-unavail i { color: #94a3b8; }
                .fc-hp-add {
                    display: inline-flex; align-items: center; gap: 8px;
                    padding: 5px 8px 5px 5px; border-radius: 999px;
                    background: #eef2ff; border: 1px dashed #6366f1; cursor: pointer;
                    color: #4338ca; box-shadow: 0 3px 10px rgba(99,102,241,.18);
                    transition: transform .15s ease, box-shadow .15s ease, background .15s ease;
                }
                .fc-hp-add:hover { transform: translateY(-1px); box-shadow: 0 6px 16px rgba(99,102,241,.28); background: #e0e7ff; }
                .fc-hp-add:active { transform: translateY(0) scale(.97); }
                .fc-hp-add-ic {
                    width: 26px; height: 26px; border-radius: 50%;
                    background: #6366f1; color: #fff;
                    display: flex; align-items: center; justify-content: center; font-size: .72rem;
                }
                .fc-hp-add-txt { font-size: .72rem; font-weight: 700; }
                .fc-hp-add-go {
                    width: 18px; height: 18px; border-radius: 50%;
                    background: rgba(99,102,241,.2);
                    display: flex; align-items: center; justify-content: center; font-size: .55rem;
                }
                .fc-hp-edit {
                    display: inline-flex; align-items: center; gap: 8px;
                    padding: 5px 8px 5px 5px; border-radius: 999px;
                    background: #fffbeb; border: 1px dashed #f59e0b; cursor: pointer;
                    color: #b45309; box-shadow: 0 3px 10px rgba(245,158,11,.18);
                    transition: transform .15s ease, box-shadow .15s ease, background .15s ease;
                }
                .fc-hp-edit:hover { transform: translateY(-1px); box-shadow: 0 6px 16px rgba(245,158,11,.28); background: #fef3c7; }
                .fc-hp-edit:active { transform: translateY(0) scale(.97); }
                .fc-hp-edit-ic {
                    width: 26px; height: 26px; border-radius: 50%;
                    background: #f59e0b; color: #fff;
                    display: flex; align-items: center; justify-content: center; font-size: .72rem;
                }
                .fc-hp-edit-txt { font-size: .72rem; font-weight: 700; }
                .fc-hp-edit-go {
                    width: 18px; height: 18px; border-radius: 50%;
                    background: rgba(245,158,11,.2);
                    display: flex; align-items: center; justify-content: center; font-size: .55rem;
                }
                .fc-wa-btn {
                    display: inline-flex; align-items: center; gap: 8px;
                    padding: 5px 8px 5px 5px; border-radius: 999px;
                    background: linear-gradient(135deg,#25d366,#128c7e);
                    color: #fff; text-decoration: none;
                    box-shadow: 0 4px 12px rgba(18,140,126,.35);
                    transition: transform .15s ease, box-shadow .15s ease, filter .15s ease;
                }
                .fc-wa-btn:hover { transform: translateY(-1px); box-shadow: 0 7px 18px rgba(18,140,126,.45); filter: brightness(1.05); }
                .fc-wa-btn:active { transform: translateY(0) scale(.97); }
                .fc-wa-btn-ic {
                    width: 26px; height: 26px; border-radius: 50%;
                    background: rgba(255,255,255,.22);
                    display: flex; align-items: center; justify-content: center;
                    font-size: .8rem;
                }
                .fc-wa-btn-txt { font-size: .76rem; font-weight: 700; letter-spacing: .01em; white-space: nowrap; }
                .fc-wa-btn-go {
                    width: 18px; height: 18px; border-radius: 50%;
                    background: rgba(255,255,255,.25);
                    display: flex; align-items: center; justify-content: center;
                    font-size: .55rem;
                }
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
                .fc-ord-list { display: flex; flex-direction: column; gap: 14px; }
                .fc-ord-card {
                    position: relative;
                    background: #fff;
                    border: 1px solid rgba(15,23,42,.08);
                    border-radius: 18px;
                    box-shadow: 0 6px 18px rgba(15,23,42,.06);
                    overflow: hidden;
                    transition: transform .18s ease, box-shadow .18s ease;
                }
                .fc-ord-card:hover { transform: translateY(-2px); box-shadow: 0 12px 28px rgba(15,23,42,.10); }
                .fc-ord-strip { height: 5px; background: linear-gradient(90deg,#3b82f6,#6366f1,#8b5cf6); }
                .fc-ord-head { display: flex; align-items: center; gap: 12px; padding: 14px 16px; }
                .fc-ord-ic {
                    width: 46px; height: 46px; border-radius: 14px; flex-shrink: 0;
                    background: linear-gradient(135deg,#3b82f6,#2563eb);
                    color: #fff; display: flex; align-items: center; justify-content: center;
                    font-size: 18px; box-shadow: 0 6px 14px rgba(37,99,235,.32);
                }
                .fc-ord-id { flex: 1; min-width: 0; }
                .fc-ord-name { font-size: .95rem; font-weight: 700; color: #0f172a; margin: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
                .fc-ord-sj {
                    display: inline-flex; align-items: center; gap: 5px; margin-top: 6px;
                    font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
                    font-size: .72rem; font-weight: 700; letter-spacing: .02em;
                    color: #1d4ed8; background: #eff6ff; border: 1px solid #dbeafe;
                    border-radius: 999px; padding: 3px 10px; max-width: 100%;
                }
                .fc-ord-sj i { font-size: .62rem; opacity: .8; }
                .fc-ord-sj span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
                .fc-ord-badge {
                    flex-shrink: 0; display: inline-flex; align-items: center; gap: 5px;
                    background: linear-gradient(135deg,#eff6ff,#dbeafe); color: #2563eb;
                    border-radius: 999px; padding: 6px 11px; font-size: .68rem; font-weight: 800; white-space: nowrap;
                }
                .fc-ord-meta { display: grid; grid-template-columns: repeat(3, 1fr); border-top: 1px dashed rgba(15,23,42,.12); }
                .fc-ord-meta > div { padding: 13px 8px; text-align: center; border-right: 1px dashed rgba(15,23,42,.12); }
                .fc-ord-meta > div:last-child { border-right: none; }
                .fc-ord-mk { display: block; font-size: .6rem; text-transform: uppercase; letter-spacing: .05em; color: #94a3b8; font-weight: 700; }
                .fc-ord-mv {
                    display: flex; align-items: center; justify-content: center; gap: 5px;
                    font-size: .84rem; font-weight: 800; color: #0f172a; margin-top: 4px; white-space: nowrap;
                }
                .fc-ord-mv i { color: #3b82f6; font-size: .72rem; }
                .fc-ord-foot { padding: 12px 16px 15px; }
                .fc-ord-btn {
                    width: 100%; border: none; cursor: pointer; border-radius: 12px; padding: 11px 14px;
                    font-size: .8rem; font-weight: 700; color: #fff;
                    background: linear-gradient(135deg,#3b82f6,#2563eb);
                    box-shadow: 0 6px 14px rgba(37,99,235,.22);
                    display: inline-flex; align-items: center; justify-content: center; gap: 7px;
                    transition: transform .15s ease, box-shadow .15s ease;
                }
                .fc-ord-btn:hover { transform: translateY(-1px); box-shadow: 0 10px 20px rgba(37,99,235,.3); }
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
                .fc-tabs {
                    display: flex; gap: 6px; margin-top: 18px;
                    background: #fff; border: 1px solid rgba(15,23,42,.07);
                    border-radius: 14px; padding: 5px;
                    box-shadow: 0 2px 10px rgba(15,23,42,.04);
                }
                .fc-tabs button {
                    flex: 1; border: none; background: transparent; cursor: pointer;
                    border-radius: 10px; padding: 10px 8px;
                    font-size: .78rem; font-weight: 700; color: #64748b;
                    display: inline-flex; align-items: center; justify-content: center; gap: 6px;
                }
                .fc-tabs button.active {
                    background: linear-gradient(135deg,#3b82f6,#2563eb); color: #fff;
                    box-shadow: 0 4px 12px rgba(37,99,235,.25);
                }
                .fc-fl-count-blue {
                    background: linear-gradient(135deg,#eff6ff,#dbeafe);
                    border-color: #bfdbfe;
                }
                .fc-fl-count-blue .fc-fl-count-num { color: #1d4ed8; }
                .fc-fl-count-blue .fc-fl-count-lbl { color: #1e40af; }
                .fc-select {
                    width: 100%; border: 1px solid rgba(15,23,42,.1); border-radius: 14px;
                    padding: 11px 14px; font-size: .82rem; color: #0f172a;
                    background: #fff; outline: none; margin-bottom: 10px;
                    box-shadow: 0 1px 3px rgba(15,23,42,.04);
                }
                .fc-select:focus { border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(59,130,246,.15); }
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
            `}),e.jsxs("div",{className:"fc-shell",children:[e.jsx("div",{className:"fc-header",children:e.jsxs("div",{className:"d-flex align-items-center",style:{gap:12},children:[e.jsx("div",{className:"fc-header-avatar",children:e.jsx("i",{className:"fas fa-headset"})}),e.jsxs("div",{className:"flex-grow-1",children:[e.jsx("div",{className:"fc-eyebrow",children:"PTSAN"}),e.jsx("h1",{children:"Follow-up Customer"}),e.jsx("p",{children:"Ringkasan customer & order"})]})]})}),e.jsxs("div",{className:"fc-content",children:[e.jsx("div",{className:"fc-stats",children:ue.map((a,t)=>e.jsxs("div",{className:"fc-stat",style:{background:a.grad},children:[e.jsx("div",{className:"fc-stat-icon",children:e.jsx("i",{className:`fas ${a.icon}`})}),e.jsx("div",{className:"fc-stat-value",children:a.value}),e.jsx("div",{className:"fc-stat-label",children:a.label}),e.jsx("div",{className:"fc-stat-sub",children:a.sub})]},t))}),e.jsxs("div",{className:"fc-tabs",children:[e.jsxs("button",{type:"button",className:j==="followup"?"active":"",onClick:()=>I("followup"),children:[e.jsx("i",{className:"fas fa-headset"})," Follow-up"]}),e.jsxs("button",{type:"button",className:j==="order"?"active":"",onClick:()=>I("order"),children:[e.jsx("i",{className:"fas fa-shopping-cart"})," Data Order"]})]}),!ie&&(u||le)&&e.jsxs("div",{className:"fc-install",children:[e.jsx("div",{className:"fc-install-icon",children:e.jsx("i",{className:"fas fa-mobile-alt"})}),e.jsxs("div",{className:"fc-install-body",children:[e.jsx("p",{className:"fc-install-title",children:"Pasang Aplikasi"}),e.jsx("p",{className:"fc-install-sub",children:u?"Pasang di layar utama untuk akses cepat.":'Ketuk Bagikan lalu "Tambahkan ke Layar Utama".'})]}),u&&e.jsx("button",{type:"button",className:"fc-install-btn",onClick:me,children:"Pasang"})]}),e.jsxs("div",{className:"fc-notif",children:[e.jsx("div",{className:`fc-notif-icon ${w?"is-on":""}`,children:e.jsx("i",{className:`fas ${w?"fa-bell":"fa-bell-slash"}`})}),e.jsxs("div",{className:"fc-notif-body",children:[e.jsx("p",{className:"fc-notif-title",children:w?"Notifikasi Aktif":"Notifikasi Follow-up"}),e.jsx("p",{className:"fc-notif-sub",children:w?"Anda akan menerima notifikasi follow-up customer.":p?o?"Perangkat diizinkan, tapi belum berlangganan. Aktifkan ulang.":"Aktifkan untuk menerima notifikasi follow-up customer.":"Memuat OneSignal..."})]}),!w&&e.jsx("button",{type:"button",className:"fc-notif-btn",onClick:xe,disabled:S,children:S?"Memproses...":o?"Aktifkan ulang":"Aktifkan"}),w&&e.jsx("button",{type:"button",className:"fc-notif-btn fc-notif-btn-off",onClick:he,disabled:S,children:"Nonaktifkan"})]}),U&&e.jsxs("div",{className:"fc-notif-error",children:[e.jsx("i",{className:"fas fa-exclamation-triangle"})," ",U]}),j==="followup"&&e.jsxs("div",{className:"fc-section",children:[e.jsxs("div",{className:"fc-section-head",children:[e.jsx("h2",{children:"Daftar Follow-up Customer"}),e.jsxs("span",{children:[s.length," customer"]})]}),f!=="Aktif"&&e.jsxs("div",{className:"fc-alert",children:[e.jsx("i",{className:"fas fa-exclamation-triangle"}),e.jsxs("div",{children:["Fitur follow-up sedang ",e.jsx("b",{children:"Tidak Aktif"}),". Daftar di bawah dihitung berdasarkan waktu ",e.jsxs("b",{children:[l," hari"]}),"."]})]}),e.jsxs("div",{className:"fc-fl-toolbar",children:[e.jsxs("div",{className:"fc-fl-count",children:[e.jsx("div",{className:"fc-fl-count-num",children:s.length}),e.jsx("div",{className:"fc-fl-count-lbl",children:"Perlu di-follow-up"})]}),e.jsxs("div",{className:"fc-fl-pills",children:[e.jsxs("span",{className:"fc-pill fc-pill-blue",children:[e.jsx("i",{className:"fas fa-clock"})," ",l," hari"]}),e.jsxs("span",{className:`fc-pill ${f==="Aktif"?"fc-pill-green":"fc-pill-red"}`,children:[e.jsx("i",{className:`fas ${f==="Aktif"?"fa-check-circle":"fa-times-circle"}`})," ",f]})]})]}),e.jsxs("div",{className:"fc-search",children:[e.jsx("i",{className:"fas fa-search"}),e.jsx("input",{type:"text",placeholder:"Cari nama, no hp, barang...",value:P,onChange:a=>{ce(a.target.value),Y(5)}})]}),s.length===0?e.jsxs("div",{className:"fc-empty",children:[e.jsx("div",{className:"fc-empty-icon",children:e.jsx("i",{className:"fas fa-clipboard-check"})}),e.jsx("div",{className:"fc-empty-title",children:"Tidak ada yang perlu di-follow-up"}),e.jsx("p",{children:"Semua customer masih dalam jangka waktu follow-up."})]}):v.length===0?e.jsxs("div",{className:"fc-empty",children:[e.jsx("div",{className:"fc-empty-icon",children:e.jsx("i",{className:"fas fa-search"})}),e.jsx("div",{className:"fc-empty-title",children:"Tidak ada data yang cocok"}),e.jsx("p",{children:"Coba kata kunci lain untuk pencarian."})]}):e.jsx("div",{className:"fc-fl-list",children:ge.map((a,t)=>{const n=Se(a.days_since,l),d=M(a.nohp);return e.jsxs("div",{className:"fc-fl-card",children:[e.jsxs("div",{className:"fc-fl-top",children:[e.jsx("div",{className:"fc-fl-avatar",style:{background:n.bg},children:(a.nama_customer||"?").charAt(0).toUpperCase()}),e.jsxs("div",{className:"fc-fl-id",children:[e.jsx("p",{className:"fc-fl-name",children:a.nama_customer}),e.jsx("p",{className:"fc-fl-hp",children:d?e.jsxs("a",{className:"fc-wa-btn",href:`https://wa.me/${d}`,target:"_blank",rel:"noreferrer",children:[e.jsx("span",{className:"fc-wa-btn-ic",children:e.jsx("i",{className:"fab fa-whatsapp"})}),e.jsx("span",{className:"fc-wa-btn-txt",children:a.nohp}),e.jsx("span",{className:"fc-wa-btn-go",children:e.jsx("i",{className:"fas fa-chevron-right"})})]}):a.nohp?e.jsxs("button",{type:"button",className:"fc-hp-edit",onClick:()=>W(a),children:[e.jsx("span",{className:"fc-hp-edit-ic",children:e.jsx("i",{className:"fas fa-pen"})}),e.jsxs("span",{className:"fc-hp-edit-txt",children:["Nomor HP tidak valid (",a.nohp,")"]}),e.jsx("span",{className:"fc-hp-edit-go",children:e.jsx("i",{className:"fas fa-edit"})})]}):e.jsxs("span",{className:"fc-hp-unavail-wrap",children:[e.jsxs("span",{className:"fc-hp-unavail",children:[e.jsx("i",{className:"fas fa-phone-slash"})," Nomor HP tidak tersedia"]}),e.jsxs("button",{type:"button",className:"fc-hp-add",onClick:()=>q(a),children:[e.jsx("span",{className:"fc-hp-add-ic",children:e.jsx("i",{className:"fas fa-user-plus"})}),e.jsx("span",{className:"fc-hp-add-txt",children:"Tambah Customer"}),e.jsx("span",{className:"fc-hp-add-go",children:e.jsx("i",{className:"fas fa-plus"})})]})]})})]}),e.jsx("span",{className:"fc-sev",style:{background:n.bg},children:n.label})]}),e.jsxs("div",{className:"fc-fl-meta",children:[e.jsxs("div",{children:[e.jsx("span",{className:"fc-fl-mk",children:"Order terakhir"}),e.jsx("span",{className:"fc-fl-mv",children:a.last_tanggal})]}),e.jsxs("div",{children:[e.jsx("span",{className:"fc-fl-mk",children:"Selisih"}),e.jsx("span",{className:"fc-fl-mv",children:ye(a.days_since)})]}),e.jsxs("div",{children:[e.jsx("span",{className:"fc-fl-mk",children:"Total order"}),e.jsxs("span",{className:"fc-fl-mv",children:[a.total_orders,"×"]})]})]}),a.last_barang&&e.jsxs("div",{className:"fc-fl-last",children:[e.jsx("i",{className:"fas fa-box"})," ",a.last_barang]}),e.jsxs("div",{className:"fc-fl-actions",children:[e.jsxs("button",{className:"fc-btn fc-btn-detail",onClick:()=>A(a),children:[e.jsx("i",{className:"fas fa-list-ul"}),"Detail"]}),d&&e.jsxs("a",{className:"fc-btn fc-btn-wa",href:`https://wa.me/${d}`,target:"_blank",rel:"noreferrer",children:[e.jsx("i",{className:"fab fa-whatsapp"}),"Hubungi"]})]})]},`${a.nama_customer}-${t}`)})}),v.length>5&&e.jsx("div",{className:"fc-more",children:be?e.jsxs("button",{className:"fc-more-btn",onClick:()=>Y(D+5),children:[e.jsx("i",{className:"fas fa-chevron-circle-down"}),"Lihat Lebih Banyak",e.jsxs("span",{className:"fc-more-rem",children:[v.length-D," lagi"]})]}):e.jsxs("div",{className:"fc-more-all",children:[e.jsx("i",{className:"fas fa-check-circle"})," Semua ",v.length," customer ditampilkan"]})})]}),j==="order"&&e.jsxs("div",{className:"fc-section",children:[e.jsxs("div",{className:"fc-section-head",children:[e.jsx("h2",{children:"Data Order Customer"}),e.jsxs("span",{children:[k.length," No SJ"]})]}),e.jsxs("div",{className:"fc-fl-toolbar",children:[e.jsxs("div",{className:"fc-fl-count fc-fl-count-blue",children:[e.jsx("div",{className:"fc-fl-count-num",children:F.length}),e.jsxs("div",{className:"fc-fl-count-lbl",children:["Order ",z?`- ${ee(z)}`:"(Semua Bulan)"]})]}),e.jsx("div",{className:"fc-fl-pills",children:e.jsxs("span",{className:"fc-pill fc-pill-blue",children:[e.jsx("i",{className:"fas fa-weight-hanging"})," ",B.format(ve)," Kg"]})})]}),e.jsxs("select",{className:"fc-select",value:z,onChange:a=>{fe(a.target.value),O(10)},children:[e.jsx("option",{value:"",children:"Semua Bulan"}),je.map(a=>e.jsx("option",{value:a,children:ee(a)},a))]}),e.jsxs("div",{className:"fc-search",children:[e.jsx("i",{className:"fas fa-search"}),e.jsx("input",{type:"text",placeholder:"Cari customer, barang, no bon...",value:V,onChange:a=>{de(a.target.value),O(10)}})]}),X.length===0?e.jsxs("div",{className:"fc-empty",children:[e.jsx("div",{className:"fc-empty-icon",children:e.jsx("i",{className:"fas fa-shopping-cart"})}),e.jsx("div",{className:"fc-empty-title",children:"Tidak ada data order"}),e.jsx("p",{children:"Coba ubah bulan atau kata kunci pencarian."})]}):e.jsx("div",{className:"fc-ord-list",children:X.map(a=>e.jsxs("div",{className:"fc-ord-card",children:[e.jsx("div",{className:"fc-ord-strip"}),e.jsxs("div",{className:"fc-ord-head",children:[e.jsx("div",{className:"fc-ord-ic",children:e.jsx("i",{className:"fas fa-shopping-bag"})}),e.jsxs("div",{className:"fc-ord-id",children:[e.jsx("p",{className:"fc-ord-name",children:a.nama}),e.jsxs("span",{className:"fc-ord-sj",children:[e.jsx("i",{className:"fas fa-hashtag"}),e.jsx("span",{children:a.no_sj})]})]}),e.jsxs("span",{className:"fc-ord-badge",children:[e.jsx("i",{className:"fas fa-layer-group"}),a.items.length," item"]})]}),e.jsxs("div",{className:"fc-ord-meta",children:[e.jsxs("div",{children:[e.jsx("span",{className:"fc-ord-mk",children:"Tanggal"}),e.jsxs("span",{className:"fc-ord-mv",children:[e.jsx("i",{className:"fas fa-calendar-day"}),_e(a.tanggal)]})]}),e.jsxs("div",{children:[e.jsx("span",{className:"fc-ord-mk",children:"Item"}),e.jsxs("span",{className:"fc-ord-mv",children:[e.jsx("i",{className:"fas fa-box"}),a.items.length,"×"]})]}),e.jsxs("div",{children:[e.jsx("span",{className:"fc-ord-mk",children:"Total Berat"}),e.jsxs("span",{className:"fc-ord-mv",children:[e.jsx("i",{className:"fas fa-weight-hanging"}),B.format(a.totalKg)," Kg"]})]})]}),e.jsx("div",{className:"fc-ord-foot",children:e.jsxs("button",{className:"fc-ord-btn",onClick:()=>L(a),children:[e.jsx("i",{className:"fas fa-list-ul"}),"Lihat Detail Order"]})})]},a.key))}),k.length>10&&e.jsx("div",{className:"fc-more",children:we?e.jsxs("button",{className:"fc-more-btn",onClick:()=>O($+10),children:[e.jsx("i",{className:"fas fa-chevron-circle-down"}),"Lihat Lebih Banyak",e.jsxs("span",{className:"fc-more-rem",children:[k.length-$," lagi"]})]}):e.jsxs("div",{className:"fc-more-all",children:[e.jsx("i",{className:"fas fa-check-circle"})," Semua ",k.length," No SJ ditampilkan"]})})]})]}),m&&e.jsx("div",{className:"fc-modal",onClick:()=>A(null),children:e.jsxs("div",{className:"fc-modal-box",onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"fc-modal-head",children:[e.jsx("div",{className:"fc-modal-avatar",children:(m.nama_customer||"?").charAt(0).toUpperCase()}),e.jsxs("div",{style:{minWidth:0},children:[e.jsx("p",{className:"fc-modal-name",children:m.nama_customer}),e.jsxs("p",{className:"fc-modal-sub",children:[m.orders.length," order · terakhir ",m.last_tanggal,m.nohp?` · ${m.nohp}`:""]})]}),e.jsx("button",{type:"button",className:"fc-modal-close",onClick:()=>A(null),children:"×"})]}),e.jsx("div",{className:"fc-modal-body",children:m.orders.length===0?e.jsx("div",{className:"text-center text-muted py-4",children:"Belum ada data order"}):e.jsx("div",{className:"table-responsive",children:e.jsxs("table",{className:"table table-striped table-sm w-100 mb-0",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"No"}),T.map(a=>e.jsx("th",{children:a.label},a.key))]})}),e.jsx("tbody",{children:m.orders.map((a,t)=>e.jsxs("tr",{children:[e.jsx("th",{children:t+1}),T.map(n=>e.jsx("td",{className:n.key==="barang"?"font-weight-bold":"",children:a[n.key]||"-"},n.key))]},t))})]})})}),e.jsxs("div",{className:"fc-modal-foot",children:[M(m.nohp)&&e.jsxs("a",{className:"fc-btn fc-btn-wa",href:`https://wa.me/${M(m.nohp)}`,target:"_blank",rel:"noreferrer",children:[e.jsx("i",{className:"fab fa-whatsapp"}),"Hubungi"]}),e.jsx("button",{className:"fc-btn fc-btn-detail",onClick:()=>A(null),children:"Tutup"})]})]})}),N&&e.jsx("div",{className:"fc-modal",onClick:()=>L(null),children:e.jsxs("div",{className:"fc-modal-box",onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"fc-modal-head",children:[e.jsx("div",{className:"fc-modal-avatar",children:e.jsx("i",{className:"fas fa-truck"})}),e.jsxs("div",{style:{minWidth:0},children:[e.jsx("p",{className:"fc-modal-name",children:N.no_sj}),e.jsxs("p",{className:"fc-modal-sub",children:[N.nama," · ",N.items.length," item · ",B.format(N.totalKg)," Kg"]})]}),e.jsx("button",{type:"button",className:"fc-modal-close",onClick:()=>L(null),children:"×"})]}),e.jsx("div",{className:"fc-modal-body",children:e.jsx("div",{className:"table-responsive",children:e.jsxs("table",{className:"table table-striped table-sm w-100 mb-0",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"No"}),T.map(a=>e.jsx("th",{children:a.label},a.key))]})}),e.jsx("tbody",{children:N.items.map((a,t)=>e.jsxs("tr",{children:[e.jsx("th",{children:t+1}),T.map(n=>e.jsx("td",{className:n.key==="barang"?"font-weight-bold":"",children:a[n.key]||"-"},n.key))]},a.id))})]})})}),e.jsx("div",{className:"fc-modal-foot",children:e.jsx("button",{className:"fc-btn fc-btn-detail",onClick:()=>L(null),children:"Tutup"})})]})}),R&&e.jsx(De,{item:R,onClose:()=>W(null)}),G&&e.jsx(Pe,{item:G,onClose:()=>q(null)}),e.jsxs("nav",{className:"fc-bottomnav",children:[e.jsxs("a",{href:"#",className:j==="followup"?"active":"",onClick:a=>{a.preventDefault(),I("followup")},children:[e.jsx("i",{className:"fas fa-headset"}),"Follow-up"]}),e.jsxs("a",{href:"#",className:j==="order"?"active":"",onClick:a=>{a.preventDefault(),I("order")},children:[e.jsx("i",{className:"fas fa-shopping-cart"}),"Data Order"]}),e.jsxs("a",{href:"/peta-customer",children:[e.jsx("i",{className:"fas fa-map-marked-alt"}),"Peta"]})]})]})]})}function Pe({item:r,onClose:s}){const{data:i,setData:l,post:f,processing:x,errors:p}=se({customer_id:r.customer_id||"",nama:r.nama_customer||"",singkatan:"",nohp:"",alamat:""}),g=o=>{o.preventDefault(),f("/follow-up-customer/customer",{onSuccess:()=>s()})};return e.jsx("div",{className:"fc-modal",onClick:s,children:e.jsxs("div",{className:"fc-modal-box",onClick:o=>o.stopPropagation(),children:[e.jsxs("div",{className:"fc-modal-head",children:[e.jsx("div",{className:"fc-modal-avatar",children:e.jsx("i",{className:"fas fa-user-plus"})}),e.jsxs("div",{style:{minWidth:0},children:[e.jsx("p",{className:"fc-modal-name",children:"Tambah Customer"}),e.jsx("p",{className:"fc-modal-sub",children:"Simpan ke data customer"})]}),e.jsx("button",{type:"button",className:"fc-modal-close",onClick:s,children:"×"})]}),e.jsxs("form",{onSubmit:g,children:[e.jsxs("div",{className:"fc-modal-body",children:[e.jsxs("div",{className:"form-group mb-3",children:[e.jsxs("label",{className:"small font-weight-bold d-block mb-1",style:{color:"#475569"},children:["Nama Customer ",e.jsx("span",{style:{color:"#ef4444"},children:"*"})]}),e.jsx("input",{type:"text",className:"form-control",placeholder:"Nama customer",style:{minHeight:44},value:i.nama,onChange:o=>l("nama",o.target.value),required:!0}),p.nama&&e.jsx("div",{className:"small mt-1",style:{color:"#ef4444"},children:p.nama})]}),e.jsxs("div",{className:"form-group mb-3",children:[e.jsxs("label",{className:"small font-weight-bold d-block mb-1",style:{color:"#475569"},children:["Singkatan ",e.jsx("span",{style:{color:"#ef4444"},children:"*"})]}),e.jsx("input",{type:"text",className:"form-control",placeholder:"Singkatan customer",style:{minHeight:44},value:i.singkatan,onChange:o=>l("singkatan",o.target.value),required:!0}),p.singkatan&&e.jsx("div",{className:"small mt-1",style:{color:"#ef4444"},children:p.singkatan})]}),e.jsxs("div",{className:"form-group mb-3",children:[e.jsxs("label",{className:"small font-weight-bold d-block mb-1",style:{color:"#475569"},children:["Nomor HP ",e.jsx("span",{style:{color:"#ef4444"},children:"*"})]}),e.jsx("input",{type:"tel",className:"form-control",placeholder:"Contoh: 081234567890",style:{minHeight:44},value:i.nohp,onChange:o=>l("nohp",o.target.value),required:!0,autoFocus:!0}),p.nohp&&e.jsx("div",{className:"small mt-1",style:{color:"#ef4444"},children:p.nohp})]}),e.jsxs("div",{className:"form-group mb-0",children:[e.jsx("label",{className:"small font-weight-bold d-block mb-1",style:{color:"#475569"},children:"Alamat (opsional)"}),e.jsx("input",{type:"text",className:"form-control",placeholder:"Alamat customer",style:{minHeight:44},value:i.alamat,onChange:o=>l("alamat",o.target.value)}),p.alamat&&e.jsx("div",{className:"small mt-1",style:{color:"#ef4444"},children:p.alamat})]})]}),e.jsxs("div",{className:"fc-modal-foot",children:[e.jsx("button",{type:"button",className:"fc-btn fc-btn-detail",onClick:s,children:"Batal"}),e.jsxs("button",{type:"submit",disabled:x,className:"fc-btn fc-btn-wa",children:[x&&e.jsx("span",{className:"spinner-border spinner-border-sm mr-2",role:"status","aria-hidden":"true"}),e.jsx("i",{className:"fas fa-save mr-1"}),"Simpan"]})]})]})]})})}function De({item:r,onClose:s}){const{data:i,setData:l,put:f,processing:x,errors:p}=se({nohp:r.nohp||""}),g=o=>{o.preventDefault(),f(`/follow-up-customer/nohp/${r.customer_id}`,{onSuccess:()=>s()})};return e.jsx("div",{className:"fc-modal",onClick:s,children:e.jsxs("div",{className:"fc-modal-box",onClick:o=>o.stopPropagation(),children:[e.jsxs("div",{className:"fc-modal-head",children:[e.jsx("div",{className:"fc-modal-avatar",children:(r.nama_customer||"?").charAt(0).toUpperCase()}),e.jsxs("div",{style:{minWidth:0},children:[e.jsx("p",{className:"fc-modal-name",children:"Edit Nomor HP"}),e.jsx("p",{className:"fc-modal-sub",children:r.nama_customer})]}),e.jsx("button",{type:"button",className:"fc-modal-close",onClick:s,children:"×"})]}),e.jsxs("form",{onSubmit:g,children:[e.jsxs("div",{className:"fc-modal-body",children:[e.jsxs("label",{className:"small font-weight-bold d-block mb-1",style:{color:"#475569"},children:["Nomor HP ",e.jsx("span",{style:{color:"#ef4444"},children:"*"})]}),e.jsx("input",{type:"tel",className:"form-control",placeholder:"Contoh: 081234567890",style:{minHeight:44},value:i.nohp,onChange:o=>l("nohp",o.target.value),required:!0,autoFocus:!0}),p.nohp&&e.jsx("div",{className:"small mt-1",style:{color:"#ef4444"},children:p.nohp}),e.jsxs("p",{className:"small text-muted mt-2 mb-0",children:[e.jsx("i",{className:"fas fa-info-circle mr-1"}),"Nomor ini akan tersimpan langsung ke data customer."]})]}),e.jsxs("div",{className:"fc-modal-foot",children:[e.jsx("button",{type:"button",className:"fc-btn fc-btn-detail",onClick:s,children:"Batal"}),e.jsxs("button",{type:"submit",disabled:x,className:"fc-btn fc-btn-wa",children:[x&&e.jsx("span",{className:"spinner-border spinner-border-sm mr-2",role:"status","aria-hidden":"true"}),e.jsx("i",{className:"fas fa-save mr-1"}),"Simpan"]})]})]})]})})}export{Le as default};
