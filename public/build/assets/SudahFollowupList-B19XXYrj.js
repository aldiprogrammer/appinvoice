import{r as o,j as e,a as h}from"./app--LajBLcn.js";/* empty css            */function u(i){let a=(i||"").replace(/\D/g,"");return a.startsWith("0")&&(a="62"+a.slice(1)),a}function g(i){return i==null?"-":`${i} hari`}function w({followups:i=[]}){const[a,f]=o.useState(""),[r,t]=o.useState(10),[l,c]=o.useState(null),n=i.filter(s=>(s.nama_customer||"").toLowerCase().includes(a.toLowerCase())||(s.nohp||"").toLowerCase().includes(a.toLowerCase())||(s.last_no_bon||"").toLowerCase().includes(a.toLowerCase())||(s.last_no_sj||"").toLowerCase().includes(a.toLowerCase())),p=n.slice(0,r),x=n.length>r,m=s=>{window.confirm(`Kembalikan "${s.nama_customer}" ke daftar follow-up?`)&&(c(s.id),h.delete(`/follow-up-customer/sudah-followup/${s.id}`,{preserveScroll:!0,preserveState:!0,onFinish:()=>c(null)}))};return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`
                .sf-toolbar { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin: 16px 0 14px; }
                .sf-count {
                    flex: 1; border-radius: 16px; padding: 14px 16px;
                    background: linear-gradient(135deg,#ecfdf5,#d1fae5);
                    border: 1px solid #a7f3d0;
                }
                .sf-count-num { font-size: 1.6rem; font-weight: 800; line-height: 1; color: #047857; }
                .sf-count-lbl { font-size: .72rem; font-weight: 600; color: #065f46; margin-top: 4px; }
                .sf-pill {
                    display: inline-flex; align-items: center; gap: 6px;
                    border-radius: 999px; padding: 6px 12px; font-size: .72rem; font-weight: 700; white-space: nowrap;
                    background: #eff6ff; color: #2563eb;
                }
                .sf-search { position: relative; margin-bottom: 14px; }
                .sf-search i {
                    position: absolute; left: 14px; top: 50%; transform: translateY(-50%);
                    color: #94a3b8; font-size: .85rem; pointer-events: none;
                }
                .sf-search input {
                    width: 100%; border: 1px solid rgba(15,23,42,.1); border-radius: 14px;
                    padding: 11px 14px 11px 38px; font-size: .82rem; color: #0f172a;
                    background: #fff; outline: none; box-shadow: 0 1px 3px rgba(15,23,42,.04);
                }
                .sf-search input:focus { border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(59,130,246,.15); }
                .sf-list { display: flex; flex-direction: column; gap: 12px; }
                .sf-card {
                    background: #fff; border: 1px solid rgba(15,23,42,.07);
                    border-radius: 18px; padding: 14px 16px;
                    box-shadow: 0 2px 10px rgba(15,23,42,.04);
                }
                .sf-top { display: flex; align-items: flex-start; gap: 12px; }
                .sf-avatar {
                    width: 46px; height: 46px; border-radius: 14px; flex-shrink: 0;
                    display: flex; align-items: center; justify-content: center;
                    color: #fff; font-weight: 800; font-size: 1.05rem;
                    background: linear-gradient(135deg,#10b981,#059669);
                }
                .sf-id { flex: 1; min-width: 0; }
                .sf-name { font-size: .95rem; font-weight: 700; color: #0f172a; margin: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
                .sf-hp { margin: 6px 0 0; padding: 0; }
                .sf-wa {
                    display: inline-flex; align-items: center; gap: 8px;
                    padding: 5px 10px 5px 5px; border-radius: 999px;
                    background: #dcfce7; border: 1px solid #bbf7d0;
                    color: #15803d; text-decoration: none; font-size: .72rem; font-weight: 700;
                }
                .sf-wa-ic {
                    width: 26px; height: 26px; border-radius: 50%;
                    background: #22c55e; color: #fff;
                    display: flex; align-items: center; justify-content: center; font-size: .78rem;
                }
                .sf-wa-go { color: #16a34a; font-size: .6rem; }
                .sf-muted { font-size: .72rem; font-style: italic; color: #94a3b8; }
                .sf-sev {
                    font-size: .66rem; font-weight: 800; color: #fff; padding: 5px 10px;
                    border-radius: 999px; white-space: nowrap; flex-shrink: 0; background: #10b981;
                }
                .sf-meta { display: flex; gap: 18px; margin-top: 12px; }
                .sf-meta > div { display: flex; flex-direction: column; }
                .sf-mk { font-size: .68rem; color: #94a3b8; }
                .sf-mv { font-size: .82rem; font-weight: 700; color: #0f172a; }
                .sf-foot { display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-top: 12px; }
                .sf-date { font-size: .7rem; color: #64748b; }
                .sf-date i { color: #10b981; }
                .sf-undo {
                    border: none; border-radius: 12px; padding: 8px 12px; font-size: .72rem; font-weight: 700;
                    cursor: pointer; background: #fef2f2; color: #b91c1c;
                    display: inline-flex; align-items: center; gap: 6px;
                }
                .sf-undo:disabled { opacity: .6; cursor: not-allowed; }
                .sf-empty {
                    background: #fff; border: 1px dashed rgba(15,23,42,.14);
                    border-radius: 18px; padding: 34px 20px; text-align: center; color: #64748b;
                }
                .sf-empty-icon {
                    width: 62px; height: 62px; border-radius: 50%;
                    background: #ecfdf5; color: #10b981;
                    display: flex; align-items: center; justify-content: center;
                    font-size: 24px; margin: 0 auto 12px;
                }
                .sf-empty p { margin: 0; font-size: .82rem; }
                .sf-empty-title { font-weight: 700; color: #0f172a; font-size: .9rem; margin-bottom: 4px; }
                .sf-more-btn {
                    width: 100%; border: 1px dashed rgba(15,23,42,.18); background: #fff;
                    border-radius: 14px; padding: 12px; font-size: .8rem; font-weight: 700;
                    color: #2563eb; cursor: pointer;
                }
            `}),e.jsxs("div",{className:"sf-toolbar",children:[e.jsxs("div",{className:"sf-count",children:[e.jsx("div",{className:"sf-count-num",children:i.length}),e.jsx("div",{className:"sf-count-lbl",children:"Customer sudah di-follow-up"})]}),e.jsxs("div",{className:"sf-pill",children:[e.jsx("i",{className:"fas fa-check-circle"})," Selesai"]})]}),e.jsxs("div",{className:"sf-search",children:[e.jsx("i",{className:"fas fa-search"}),e.jsx("input",{type:"text",placeholder:"Cari nama, no hp, no bon, no sj...",value:a,onChange:s=>{f(s.target.value),t(10)}})]}),i.length===0?e.jsxs("div",{className:"sf-empty",children:[e.jsx("div",{className:"sf-empty-icon",children:e.jsx("i",{className:"fas fa-clipboard-check"})}),e.jsx("div",{className:"sf-empty-title",children:"Belum ada riwayat follow-up"}),e.jsx("p",{children:'Customer yang ditandai "Sudah Follow-up" akan muncul di sini.'})]}):n.length===0?e.jsxs("div",{className:"sf-empty",children:[e.jsx("div",{className:"sf-empty-icon",children:e.jsx("i",{className:"fas fa-search"})}),e.jsx("div",{className:"sf-empty-title",children:"Tidak ada data yang cocok"}),e.jsx("p",{children:"Coba kata kunci lain untuk pencarian."})]}):e.jsxs("div",{className:"sf-list",children:[p.map(s=>{const d=u(s.nohp);return e.jsxs("div",{className:"sf-card",children:[e.jsxs("div",{className:"sf-top",children:[e.jsx("div",{className:"sf-avatar",children:(s.nama_customer||"?").charAt(0).toUpperCase()}),e.jsxs("div",{className:"sf-id",children:[e.jsx("p",{className:"sf-name",children:s.nama_customer}),e.jsx("p",{className:"sf-hp",children:d?e.jsxs("a",{className:"sf-wa",href:`https://wa.me/${d}`,target:"_blank",rel:"noreferrer",children:[e.jsx("span",{className:"sf-wa-ic",children:e.jsx("i",{className:"fab fa-whatsapp"})}),e.jsx("span",{children:s.nohp}),e.jsx("span",{className:"sf-wa-go",children:e.jsx("i",{className:"fas fa-chevron-right"})})]}):e.jsx("span",{className:"sf-muted",children:"Nomor HP tidak tersedia"})})]}),e.jsx("span",{className:"sf-sev",children:e.jsx("i",{className:"fas fa-check"})})]}),e.jsxs("div",{className:"sf-meta",children:[e.jsxs("div",{children:[e.jsx("span",{className:"sf-mk",children:"Order terakhir"}),e.jsx("span",{className:"sf-mv",children:s.last_tanggal})]}),e.jsxs("div",{children:[e.jsx("span",{className:"sf-mk",children:"Selisih"}),e.jsx("span",{className:"sf-mv",children:g(s.days_since)})]})]}),e.jsxs("div",{className:"sf-foot",children:[e.jsxs("span",{className:"sf-date",children:[e.jsx("i",{className:"fas fa-check-circle"})," Follow-up: ",s.followed_up_at||"-"]}),e.jsxs("button",{type:"button",className:"sf-undo",onClick:()=>m(s),disabled:l===s.id,children:[e.jsx("i",{className:"fas fa-undo"}),l===s.id?"Memproses...":"Batalkan"]})]})]},s.id)}),x&&e.jsxs("button",{className:"sf-more-btn",onClick:()=>t(r+10),children:[e.jsx("i",{className:"fas fa-chevron-circle-down"})," Lihat Lebih Banyak (",n.length-r," lagi)"]})]})]})}export{w as default};
