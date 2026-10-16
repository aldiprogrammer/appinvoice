import { useState } from 'react';
import { router } from '@inertiajs/react';

function waNumber(nohp) {
    let digits = (nohp || '').replace(/\D/g, '');
    if (digits.startsWith('0')) digits = '62' + digits.slice(1);
    return digits;
}

function daysLabel(days) {
    if (days === null || days === undefined) return '-';
    return `${days} hari`;
}

export default function SudahFollowupList({ followups = [] }) {
    const [search, setSearch] = useState('');
    const [visible, setVisible] = useState(10);
    const [undoingId, setUndoingId] = useState(null);

    const filtered = followups.filter((c) =>
        (c.nama_customer || '').toLowerCase().includes(search.toLowerCase()) ||
        (c.nohp || '').toLowerCase().includes(search.toLowerCase()) ||
        (c.last_no_bon || '').toLowerCase().includes(search.toLowerCase()) ||
        (c.last_no_sj || '').toLowerCase().includes(search.toLowerCase())
    );

    const visibleItems = filtered.slice(0, visible);
    const hasMore = filtered.length > visible;

    const undo = (item) => {
        if (!window.confirm(`Kembalikan "${item.nama_customer}" ke daftar follow-up?`)) return;
        setUndoingId(item.id);
        router.delete(`/follow-up-customer/sudah-followup/${item.id}`, {
            preserveScroll: true,
            preserveState: true,
            onFinish: () => setUndoingId(null),
        });
    };

    return (
        <>
            <style>{`
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
            `}</style>

            <div className="sf-toolbar">
                <div className="sf-count">
                    <div className="sf-count-num">{followups.length}</div>
                    <div className="sf-count-lbl">Customer sudah di-follow-up</div>
                </div>
                <div className="sf-pill"><i className="fas fa-check-circle"></i> Selesai</div>
            </div>

            <div className="sf-search">
                <i className="fas fa-search"></i>
                <input
                    type="text"
                    placeholder="Cari nama, no hp, no bon, no sj..."
                    value={search}
                    onChange={(e) => { setSearch(e.target.value); setVisible(10); }}
                />
            </div>

            {followups.length === 0 ? (
                <div className="sf-empty">
                    <div className="sf-empty-icon"><i className="fas fa-clipboard-check"></i></div>
                    <div className="sf-empty-title">Belum ada riwayat follow-up</div>
                    <p>Customer yang ditandai "Sudah Follow-up" akan muncul di sini.</p>
                </div>
            ) : filtered.length === 0 ? (
                <div className="sf-empty">
                    <div className="sf-empty-icon"><i className="fas fa-search"></i></div>
                    <div className="sf-empty-title">Tidak ada data yang cocok</div>
                    <p>Coba kata kunci lain untuk pencarian.</p>
                </div>
            ) : (
                <div className="sf-list">
                    {visibleItems.map((item) => {
                        const wa = waNumber(item.nohp);
                        return (
                            <div key={item.id} className="sf-card">
                                <div className="sf-top">
                                    <div className="sf-avatar">
                                        {(item.nama_customer || '?').charAt(0).toUpperCase()}
                                    </div>
                                    <div className="sf-id">
                                        <p className="sf-name">{item.nama_customer}</p>
                                        <p className="sf-hp">
                                            {wa ? (
                                                <a className="sf-wa" href={`https://wa.me/${wa}`} target="_blank" rel="noreferrer">
                                                    <span className="sf-wa-ic"><i className="fab fa-whatsapp"></i></span>
                                                    <span>{item.nohp}</span>
                                                    <span className="sf-wa-go"><i className="fas fa-chevron-right"></i></span>
                                                </a>
                                            ) : (
                                                <span className="sf-muted">Nomor HP tidak tersedia</span>
                                            )}
                                        </p>
                                    </div>
                                    <span className="sf-sev"><i className="fas fa-check"></i></span>
                                </div>

                                <div className="sf-meta">
                                    <div>
                                        <span className="sf-mk">Order terakhir</span>
                                        <span className="sf-mv">{item.last_tanggal}</span>
                                    </div>
                                    <div>
                                        <span className="sf-mk">Selisih</span>
                                        <span className="sf-mv">{daysLabel(item.days_since)}</span>
                                    </div>
                                </div>

                                <div className="sf-foot">
                                    <span className="sf-date">
                                        <i className="fas fa-check-circle"></i> Follow-up: {item.followed_up_at || '-'}
                                    </span>
                                    <button
                                        type="button"
                                        className="sf-undo"
                                        onClick={() => undo(item)}
                                        disabled={undoingId === item.id}
                                    >
                                        <i className="fas fa-undo"></i>
                                        {undoingId === item.id ? 'Memproses...' : 'Batalkan'}
                                    </button>
                                </div>
                            </div>
                        );
                    })}

                    {hasMore && (
                        <button className="sf-more-btn" onClick={() => setVisible(visible + 10)}>
                            <i className="fas fa-chevron-circle-down"></i> Lihat Lebih Banyak ({filtered.length - visible} lagi)
                        </button>
                    )}
                </div>
            )}
        </>
    );
}
