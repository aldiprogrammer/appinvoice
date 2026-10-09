import{r as n,j as e,H as h,L as j}from"./app-B3jIaYhv.js";import{G as w}from"./GuestLayout-a2FSnzqA.js";/* empty css            */const k=[{label:"Invoice",desc:"Buat & kelola invoice",icon:"fa-file-invoice",grad:"linear-gradient(135deg,#34d399,#059669)",url:"/login/invoice"},{label:"Surat Jalan",desc:"Kelola surat jalan",icon:"fa-truck",grad:"linear-gradient(135deg,#fbbf24,#d97706)",url:"/login/suratjalan"},{label:"Inventaris",desc:"Stok & data barang",icon:"fa-boxes",grad:"linear-gradient(135deg,#a78bfa,#7c3aed)",url:"/login/inventaris"},{label:"Mapping Customer",desc:"Peta & lokasi toko",icon:"fa-map-marked-alt",grad:"linear-gradient(135deg,#3b82f6,#2563eb)",url:"/peta-customer"},{label:"Follow-up Customer",desc:"Pantau & notifikasi",icon:"fa-headset",grad:"linear-gradient(135deg,#2dd4bf,#0d9488)",url:"/follow-up-customer"},{label:"Admin",desc:"Pengguna & hak akses",icon:"fa-user-shield",grad:"linear-gradient(135deg,#f87171,#dc2626)",url:"/login/admin"}];function z(){const[t,s]=n.useState(null),[x,o]=n.useState(!1),[l,g]=n.useState(!1),[f,i]=n.useState(!1),[d,c]=n.useState(!1);n.useEffect(()=>{const a=window.matchMedia("(display-mode: standalone)").matches||window.navigator.standalone===!0;o(a),g(/iphone|ipad|ipod/i.test(window.navigator.userAgent));const r=p=>{p.preventDefault(),s(p)},m=()=>{s(null),o(!0),i(!1)};return window.addEventListener("beforeinstallprompt",r),window.addEventListener("appinstalled",m),()=>{window.removeEventListener("beforeinstallprompt",r),window.removeEventListener("appinstalled",m)}},[]);const u=async()=>{t&&(c(!0),t.prompt(),await t.userChoice,s(null),c(!1),i(!1))},b=!x&&(t||l);return e.jsxs(w,{children:[e.jsx(h,{title:"Menu"}),e.jsx("style",{children:`
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
            `}),e.jsxs("div",{className:"menu-wrap text-center",children:[e.jsx("div",{className:"menu-logo",children:e.jsx("img",{src:"/img/logoptsan.png",alt:"PT Sinar Aneka Niaga"})}),e.jsx("span",{className:"menu-badge",children:"Management System"}),e.jsx("h1",{className:"menu-brand",children:"PT. Sinar Aneka Niaga"}),e.jsx("div",{className:"menu-divider"}),e.jsx("p",{className:"menu-sub",children:"Silakan pilih menu layanan di bawah ini"}),b&&e.jsxs("div",{className:"menu-install",children:[e.jsx("div",{className:"menu-install-ic",children:e.jsx("i",{className:"fas fa-mobile-alt"})}),e.jsxs("div",{className:"menu-install-txt",children:[e.jsx("strong",{children:"Pasang Aplikasi"}),e.jsx("span",{children:"Akses lebih cepat langsung dari layar utama"})]}),e.jsx("button",{type:"button",className:"menu-install-btn",onClick:()=>i(!0),children:"Pasang"})]}),e.jsx("div",{className:"menu-grid",children:k.map((a,r)=>e.jsxs(j,{href:a.url,className:"menu-card-item",children:[e.jsx("div",{className:"menu-card-icon",style:{background:a.grad},children:e.jsx("i",{className:`fas ${a.icon}`})}),e.jsx("span",{className:"menu-card-label",children:a.label}),e.jsx("span",{className:"menu-card-desc",children:a.desc}),e.jsx("i",{className:"fas fa-chevron-right menu-card-arrow"})]},r))}),e.jsxs("p",{className:"menu-foot",children:["© ",new Date().getFullYear()," PTSAN · Management System"]})]}),f&&e.jsx("div",{className:"mi-overlay",onClick:()=>i(!1),children:e.jsxs("div",{className:"mi-modal",role:"dialog","aria-modal":"true",onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"mi-hero",children:[e.jsx("button",{type:"button",className:"mi-close",onClick:()=>i(!1),"aria-label":"Tutup",children:e.jsx("i",{className:"fas fa-times"})}),e.jsx("div",{className:"mi-app-ic",children:e.jsx("img",{src:"/img/logoptsan.png",alt:"PTSAN"})}),e.jsx("h3",{children:"Pasang Aplikasi PTSAN"}),e.jsx("p",{children:"Gunakan seperti aplikasi native di perangkat Anda"})]}),e.jsx("div",{className:"mi-body",children:t?e.jsxs(e.Fragment,{children:[e.jsxs("ul",{className:"mi-features",children:[e.jsxs("li",{children:[e.jsx("i",{className:"fas fa-bolt"})," Akses instan dari layar utama"]}),e.jsxs("li",{children:[e.jsx("i",{className:"fas fa-expand"})," Tampilan penuh tanpa browser"]}),e.jsxs("li",{children:[e.jsx("i",{className:"fas fa-bell"})," Terima notifikasi follow-up"]})]}),e.jsx("button",{type:"button",className:"mi-btn",onClick:u,disabled:d,children:d?"Memproses...":"Pasang Sekarang"}),e.jsx("button",{type:"button",className:"mi-btn mi-btn-ghost",onClick:()=>i(!1),children:"Nanti saja"})]}):e.jsxs(e.Fragment,{children:[e.jsx("ol",{className:"mi-steps",children:l?e.jsxs(e.Fragment,{children:[e.jsxs("li",{children:["Buka halaman ini di ",e.jsx("b",{children:"Safari"})]}),e.jsxs("li",{children:["Ketuk ikon ",e.jsx("i",{className:"fas fa-share-square"})," ",e.jsx("b",{children:"Bagikan"})]}),e.jsxs("li",{children:["Pilih ",e.jsx("b",{children:"Tambahkan ke Layar Utama"})]}),e.jsxs("li",{children:["Ketuk ",e.jsx("b",{children:"Tambah"})," untuk memasang"]})]}):e.jsxs(e.Fragment,{children:[e.jsxs("li",{children:["Klik ikon ",e.jsx("b",{children:"Install"})," di address bar browser"]}),e.jsxs("li",{children:["Atau menu browser → ",e.jsx("b",{children:"Install App"})," / ",e.jsx("b",{children:"Pasang aplikasi"})]}),e.jsxs("li",{children:["Tekan ",e.jsx("b",{children:"Install"})," untuk memasang"]})]})}),e.jsx("button",{type:"button",className:"mi-btn",onClick:()=>i(!1),children:"Mengerti"}),e.jsx("p",{className:"mi-note",children:"Belum bisa dipasang? Pastikan menggunakan browser Chrome / Safari terbaru."})]})})]})})]})}export{z as default};
