import{j as e,H as t,L as a}from"./app--LajBLcn.js";import i from"./SudahFollowupList-B19XXYrj.js";/* empty css            */function d({followups:s=[]}){return e.jsxs("div",{className:"sfpage",children:[e.jsx(t,{title:"Sudah di Follow-up"}),e.jsx("style",{children:`
                .sfpage {
                    min-height: 100vh;
                    background: #eef2f7;
                    font-family: 'Instrument Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                }
                .sfpage-shell {
                    position: relative;
                    max-width: 480px;
                    margin: 0 auto;
                    min-height: 100vh;
                    background: #f7f9fc;
                    box-shadow: 0 0 40px rgba(15,23,42,.10);
                    padding-bottom: 92px;
                    overflow-x: hidden;
                }
                .sfpage-header {
                    background: linear-gradient(135deg,#0d9488,#059669,#065f46);
                    color: #fff;
                    padding: 26px 22px 64px;
                    border-bottom-left-radius: 26px;
                    border-bottom-right-radius: 26px;
                }
                .sfpage-eyebrow { font-size: 11px; letter-spacing: .16em; text-transform: uppercase; opacity: .7; font-weight: 600; }
                .sfpage-header h1 { font-size: 1.4rem; font-weight: 700; margin: 4px 0 2px; }
                .sfpage-header p { font-size: .8rem; opacity: .8; margin: 0; }
                .sfpage-back {
                    width: 42px; height: 42px; border-radius: 14px;
                    background: rgba(255,255,255,.18);
                    display: flex; align-items: center; justify-content: center;
                    font-size: 18px; flex-shrink: 0; text-decoration: none; color: #fff;
                    backdrop-filter: blur(4px);
                }
                .sfpage-content { padding: 0 16px; }
                .sfpage-nav {
                    position: fixed; bottom: 0; left: 50%; transform: translateX(-50%);
                    width: 100%; max-width: 480px;
                    background: rgba(255,255,255,.94); backdrop-filter: blur(12px);
                    border-top: 1px solid rgba(15,23,42,.07);
                    display: flex; padding: 8px 0 calc(8px + env(safe-area-inset-bottom, 0px));
                    z-index: 20;
                }
                .sfpage-nav a {
                    flex: 1; text-align: center; color: #94a3b8; font-size: .68rem;
                    font-weight: 600; text-decoration: none; padding: 4px 0;
                }
                .sfpage-nav a i { display: block; font-size: 18px; margin-bottom: 2px; }
                .sfpage-nav a.active { color: #0d9488; }
                @media (min-width: 481px) {
                    .sfpage-shell { margin: 24px auto; min-height: calc(100vh - 48px); border-radius: 28px; }
                    .sfpage-header { border-top-left-radius: 28px; border-top-right-radius: 28px; }
                }
            `}),e.jsxs("div",{className:"sfpage-shell",children:[e.jsx("div",{className:"sfpage-header",children:e.jsxs("div",{className:"d-flex align-items-center",style:{gap:12},children:[e.jsx(a,{href:"/follow-up-customer",className:"sfpage-back",children:e.jsx("i",{className:"fas fa-arrow-left"})}),e.jsxs("div",{className:"flex-grow-1",children:[e.jsx("div",{className:"sfpage-eyebrow",children:"PTSAN"}),e.jsx("h1",{children:"Sudah di Follow-up"}),e.jsx("p",{children:"Riwayat customer yang sudah di-follow-up"})]})]})}),e.jsx("div",{className:"sfpage-content",children:e.jsx(i,{followups:s})}),e.jsxs("nav",{className:"sfpage-nav",children:[e.jsxs(a,{href:"/follow-up-customer",children:[e.jsx("i",{className:"fas fa-headset"}),"Follow-up"]}),e.jsxs(a,{href:"/follow-up-customer/sudah-followup",className:"active",children:[e.jsx("i",{className:"fas fa-clipboard-check"}),"Sudah"]}),e.jsxs(a,{href:"/peta-customer",children:[e.jsx("i",{className:"fas fa-map-marked-alt"}),"Peta"]})]})]})]})}export{d as default};
