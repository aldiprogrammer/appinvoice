import{j as e,H as i,L as n}from"./app-CLF2YYxa.js";import{G as t}from"./GuestLayout-By5tKqW-.js";/* empty css            */const o=[{label:"Invoice",desc:"Buat & kelola invoice",icon:"fa-file-invoice",grad:"linear-gradient(135deg,#34d399,#059669)",url:"/login/invoice"},{label:"Surat Jalan",desc:"Kelola surat jalan",icon:"fa-truck",grad:"linear-gradient(135deg,#fbbf24,#d97706)",url:"/login/suratjalan"},{label:"Inventaris",desc:"Stok & data barang",icon:"fa-boxes",grad:"linear-gradient(135deg,#a78bfa,#7c3aed)",url:"/login/inventaris"},{label:"Mapping Customer",desc:"Peta & lokasi toko",icon:"fa-map-marked-alt",grad:"linear-gradient(135deg,#3b82f6,#2563eb)",url:"/peta-customer"},{label:"Follow-up Customer",desc:"Pantau & notifikasi",icon:"fa-headset",grad:"linear-gradient(135deg,#2dd4bf,#0d9488)",url:"/follow-up-customer"},{label:"Admin",desc:"Pengguna & hak akses",icon:"fa-user-shield",grad:"linear-gradient(135deg,#f87171,#dc2626)",url:"/login/admin"}];function c(){return e.jsxs(t,{children:[e.jsx(i,{title:"Menu"}),e.jsx("style",{children:`
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
                .menu-grid {
                    display: grid;
                    grid-template-columns: repeat(2, minmax(0, 1fr));
                    gap: 12px;
                    margin-top: 26px;
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
            `}),e.jsxs("div",{className:"menu-wrap text-center",children:[e.jsx("div",{className:"menu-logo",children:e.jsx("img",{src:"/img/logoptsan.png",alt:"PT Sinar Aneka Niaga"})}),e.jsx("span",{className:"menu-badge",children:"Management System"}),e.jsx("h1",{className:"menu-brand",children:"PT. Sinar Aneka Niaga"}),e.jsx("div",{className:"menu-divider"}),e.jsx("p",{className:"menu-sub",children:"Silakan pilih menu layanan di bawah ini"}),e.jsx("div",{className:"menu-grid",children:o.map((a,r)=>e.jsxs(n,{href:a.url,className:"menu-card-item",children:[e.jsx("div",{className:"menu-card-icon",style:{background:a.grad},children:e.jsx("i",{className:`fas ${a.icon}`})}),e.jsx("span",{className:"menu-card-label",children:a.label}),e.jsx("span",{className:"menu-card-desc",children:a.desc}),e.jsx("i",{className:"fas fa-chevron-right menu-card-arrow"})]},r))}),e.jsxs("p",{className:"menu-foot",children:["© ",new Date().getFullYear()," PTSAN · Management System"]})]})]})}export{c as default};
