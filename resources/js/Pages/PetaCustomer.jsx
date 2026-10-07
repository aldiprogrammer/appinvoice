import { useEffect, useMemo, useRef, useState } from 'react';
import { Head } from '@inertiajs/react';

const LEAFLET_CSS = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
const LEAFLET_JS = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';

function loadLeaflet() {
    if (typeof window === 'undefined') return Promise.resolve(null);
    if (window.L) return Promise.resolve(window.L);

    if (!document.querySelector(`link[href="${LEAFLET_CSS}"]`)) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = LEAFLET_CSS;
        document.head.appendChild(link);
    }

    if (!window.__leafletPromise) {
        window.__leafletPromise = new Promise((resolve, reject) => {
            const existing = document.querySelector(`script[src="${LEAFLET_JS}"]`);
            if (existing) {
                existing.addEventListener('load', () => resolve(window.L));
                existing.addEventListener('error', reject);
                return;
            }
            const script = document.createElement('script');
            script.src = LEAFLET_JS;
            script.async = true;
            script.onload = () => resolve(window.L);
            script.onerror = reject;
            document.body.appendChild(script);
        });
    }

    return window.__leafletPromise;
}

function splitProduk(value) {
    return (value || '').split(',').map((v) => v.trim()).filter(Boolean);
}

function haversineKm(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const toRad = (d) => (d * Math.PI) / 180;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
    return 2 * R * Math.asin(Math.sqrt(a));
}

function fmtKm(km) {
    if (km == null || Number.isNaN(km)) return '';
    return km < 1 ? `${Math.round(km * 1000)} m` : `${km.toFixed(2)} km`;
}

function fmtAccuracy(m) {
    if (!m || m <= 0) return '';
    return m < 50 ? `±${Math.round(m)} m` : `±${(m / 1000).toFixed(1)} km`;
}

export default function PetaCustomer({ mappings = [] }) {
    const mapEl = useRef(null);
    const mapRef = useRef(null);
    const layerRef = useRef(null);
    const userLayerRef = useRef(null);
    const fitNextRef = useRef(false);
    const markerRefs = useRef({});
    const focusedRef = useRef(0);
    const [ready, setReady] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [search, setSearch] = useState('');
    const [activeId, setActiveId] = useState(null);
    const [userLoc, setUserLoc] = useState(null);
    const [userAddress, setUserAddress] = useState('');
    const [locating, setLocating] = useState(false);
    const [manualMode, setManualMode] = useState(false);
    const [geoError, setGeoError] = useState('');
    const [locQuery, setLocQuery] = useState('');
    const [locResults, setLocResults] = useState([]);
    const [locSearching, setLocSearching] = useState(false);
    const [infoOpen, setInfoOpen] = useState(false);
    const [mobileListOpen, setMobileListOpen] = useState(false);
    const [nearOnly, setNearOnly] = useState(false);
    const pendingNearRef = useRef(false);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const mq = window.matchMedia('(max-width: 768px)');
        const update = () => setIsMobile(mq.matches);
        update();
        mq.addEventListener('change', update);
        return () => mq.removeEventListener('change', update);
    }, []);

    useEffect(() => {
        let cancelled = false;

        loadLeaflet().then((L) => {
            if (cancelled || !L || !mapEl.current || mapRef.current) return;

            const map = L.map(mapEl.current, {
                zoomControl: true,
                minZoom: 2,
                maxZoom: 22,
                worldCopyJump: true,
            }).setView([0, 0], 2);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxNativeZoom: 19,
                maxZoom: 22,
                minZoom: 2,
                attribution: '&copy; OpenStreetMap',
            }).addTo(map);

            mapRef.current = map;
            layerRef.current = L.layerGroup().addTo(map);
            userLayerRef.current = L.layerGroup().addTo(map);
            setReady(true);
        });

        return () => {
            cancelled = true;
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, []);

    const filtered = mappings.filter((m) =>
        (m.nama_toko || '').toLowerCase().includes(search.toLowerCase()) ||
        (m.alamat || '').toLowerCase().includes(search.toLowerCase()) ||
        (m.produk || '').toLowerCase().includes(search.toLowerCase())
    );

    const locatedItems = useMemo(() => {
        if (!userLoc) return [];
        return filtered
            .map((m) => {
                const lat = Number(m.latitude);
                const lng = Number(m.longitude);
                if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
                return { ...m, km: haversineKm(userLoc.lat, userLoc.lng, lat, lng) };
            })
            .filter(Boolean)
            .sort((a, b) => a.km - b.km);
    }, [userLoc, filtered]);

    const nearest = locatedItems[0] || null;
    const displayFiltered = nearOnly && nearest ? [nearest] : filtered;
    const displayKey = displayFiltered.map((m) => m.id).join(',');
    const listed = nearOnly && nearest ? [nearest] : userLoc ? locatedItems : filtered;

    const reverseGeocode = (lat, lng) => {
        fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`)
            .then((res) => res.json())
            .then((data) => setUserAddress(data?.display_name || ''))
            .catch(() => setUserAddress(''));
    };

    const searchLocation = () => {
        const q = locQuery.trim();
        if (!q || locSearching) return;
        setLocSearching(true);
        setLocResults([]);
        fetch(`https://nominatim.openstreetmap.org/search?format=jsonv2&limit=6&q=${encodeURIComponent(q)}`)
            .then((res) => res.json())
            .then((data) => setLocResults(Array.isArray(data) ? data : []))
            .catch(() => setLocResults([]))
            .finally(() => setLocSearching(false));
    };

    const pickLocation = (r) => {
        const lat = Number(r.lat);
        const lng = Number(r.lon);
        if (!Number.isFinite(lat) || !Number.isFinite(lng)) return;
        fitNextRef.current = true;
        setUserLoc({ lat, lng, accuracy: 0 });
        setUserAddress(r.display_name || '');
        setLocResults([]);
        setLocQuery(r.display_name || '');
    };

    const locateMe = () => {
        if (!('geolocation' in navigator)) {
            setGeoError('Browser ini tidak mendukung geolokasi');
            return;
        }
        setLocating(true);
        setGeoError('');
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const { latitude, longitude, accuracy } = pos.coords;
                fitNextRef.current = true;
                setUserLoc({ lat: latitude, lng: longitude, accuracy: accuracy || 0 });
                setUserAddress('');
                reverseGeocode(latitude, longitude);
                setLocating(false);
            },
            (err) => {
                setLocating(false);
                setGeoError(err.message || 'Gagal mendapatkan lokasi. Pastikan GPS/izin lokasi aktif.');
            },
            { enableHighAccuracy: true, timeout: 12000, maximumAge: 0 }
        );
    };

    const goNearest = () => {
        if (!userLoc) {
            pendingNearRef.current = true;
            setNearOnly(false);
            locateMe();
            return;
        }
        if (!nearest) {
            setGeoError('Tidak ada toko terdekat yang ditemukan');
            return;
        }
        setNearOnly(true);
        focusMarker(nearest);
    };

    useEffect(() => {
        if (pendingNearRef.current && nearest) {
            pendingNearRef.current = false;
            setNearOnly(true);
            focusMarker(nearest);
        }
    }, [nearest]);

    useEffect(() => {
        const L = typeof window !== 'undefined' ? window.L : null;
        if (!ready || !L || !mapRef.current || !layerRef.current) return;

        layerRef.current.clearLayers();
        const bounds = [];
        markerRefs.current = {};

        displayFiltered.forEach((m) => {
            const lat = parseFloat(m.latitude);
            const lng = parseFloat(m.longitude);
            if (Number.isNaN(lat) || Number.isNaN(lng)) return;

            bounds.push([lat, lng]);

            const isActive = (m.status || 'Aktif') === 'Aktif';
            const color = isActive ? '#16a34a' : '#94a3b8';
            const marker = L.marker([lat, lng], {
                icon: L.divIcon({
                    className: '',
                    html: `<div style="position:relative;width:34px;height:34px">
                        <div style="position:absolute;inset:0;border-radius:50% 50% 50% 0;transform:rotate(-45deg);background:${color};border:2px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,.35)"></div>
                        <i class="fas fa-store" style="position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);color:#fff;font-size:15px;z-index:1"></i>
                    </div>`,
                    iconSize: [34, 34],
                    iconAnchor: [17, 34],
                    popupAnchor: [0, -34],
                }),
            });

            const produkHtml = splitProduk(m.produk).length
                ? splitProduk(m.produk).map((p) => `<span style="display:inline-block;background:#eff6ff;color:#1d4ed8;border-radius:99px;padding:1px 8px;font-size:11px;margin:0 2px 2px 0">${p}</span>`).join('')
                : '<span style="color:#94a3b8;font-size:12px">-</span>';

            const popupHtml = `<div style="min-width:220px;font-family:'Instrument Sans',sans-serif">
                    <div style="font-weight:700;font-size:14px;margin-bottom:2px">${m.nama_toko ?? ''}</div>
                    <div style="font-size:12px;color:#64748b;margin-bottom:8px">${m.alamat ?? ''}</div>
                    <div style="margin-bottom:8px">${produkHtml}</div>
                    <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;border-top:1px solid #f1f5f9;padding-top:8px">
                        <span style="display:inline-flex;align-items:center;background:${isActive ? '#dcfce7' : '#e2e8f0'};color:${isActive ? '#15803d' : '#475569'};border-radius:99px;padding:2px 10px;font-size:11px;font-weight:600">${m.status ?? ''}</span>
                        ${m.km != null ? `<span style="font-size:11px;font-weight:700;color:#059669">${fmtKm(m.km)} dari lokasi Anda</span>` : ''}
                    </div>
                    <a href="https://www.google.com/maps?q=${lat},${lng}" target="_blank" rel="noopener noreferrer"
                       style="display:flex;align-items:center;justify-content:center;gap:6px;margin-top:10px;background:#4285F4;color:#fff;text-decoration:none;border-radius:8px;padding:7px 0;font-size:12px;font-weight:700;transition:background .15s">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polyline><line x1="8" y1="2" x2="8" y2="18"></line><line x1="16" y1="6" x2="16" y2="22"></line></svg>
                        Buka di Google Maps
                    </a>
                </div>`;

            marker.bindPopup(popupHtml, { offset: [0, -4], closeButton: true });
            marker.bindTooltip(m.nama_toko ?? 'Toko', {
                permanent: true,
                direction: 'top',
                offset: [0, -8],
                className: 'peta-marker-label',
                opacity: 1,
            });
            markerRefs.current[m.id] = marker;

            marker.on('click', () => {
                focusedRef.current = Date.now();
                setActiveId(m.id);
                mapRef.current.flyTo([lat, lng], 19, { animate: true, duration: 0.6 });
            });
            marker.addTo(layerRef.current);
        });

        const shouldFit = !focusedRef.current || Date.now() - focusedRef.current > 1500;
        if (bounds.length === 1) {
            if (shouldFit) mapRef.current.setView(bounds[0], 18);
        } else if (bounds.length > 1) {
            if (shouldFit) mapRef.current.fitBounds(bounds, { padding: [40, 40] });
        }
    }, [ready, displayKey, mappings]);

    useEffect(() => {
        const L = typeof window !== 'undefined' ? window.L : null;
        if (!ready || !L || !mapRef.current || !userLayerRef.current) return;

        userLayerRef.current.clearLayers();
        if (!userLoc) return;

        if (userLoc.accuracy > 0) {
            L.circle([userLoc.lat, userLoc.lng], {
                radius: Math.max(userLoc.accuracy, 10),
                color: '#3b82f6',
                weight: 1,
                fillColor: '#3b82f6',
                fillOpacity: 0.12,
            }).addTo(userLayerRef.current);
        }

        const icon = L.divIcon({
            className: '',
            html: `<style>@keyframes userPulse{0%{transform:scale(.6);opacity:.7}70%{transform:scale(1.6);opacity:0}100%{transform:scale(1.6);opacity:0}}</style>
                    <div style="position:relative;width:24px;height:24px">
                        <div style="position:absolute;inset:0;border-radius:50%;background:rgba(59,130,246,.4);animation:userPulse 1.8s infinite"></div>
                        <div style="position:absolute;inset:5px;border-radius:50%;background:#2563eb;border:3px solid #fff;box-shadow:0 0 6px rgba(37,99,235,.6)"></div>
                    </div>`,
            iconSize: [24, 24],
            iconAnchor: [12, 12],
            popupAnchor: [0, -8],
        });

        const userMarker = L.marker([userLoc.lat, userLoc.lng], { icon, draggable: true })
            .addTo(userLayerRef.current)
            .bindPopup('<div style="font-weight:700">Lokasi Saya</div><div style="font-size:12px;color:#64748b">Geser titik ini untuk menyesuaikan posisi</div>')
            .openPopup();

        userMarker.on('dragend', (e) => {
            const { lat, lng } = e.target.getLatLng();
            fitNextRef.current = false;
            setUserLoc({ lat, lng, accuracy: 0 });
            setUserAddress('');
            reverseGeocode(lat, lng);
        });

        if (nearest) {
            L.polyline(
                [
                    [userLoc.lat, userLoc.lng],
                    [Number(nearest.latitude), Number(nearest.longitude)],
                ],
                { color: '#3b82f6', weight: 3, dashArray: '6 8', opacity: 0.85 }
            ).addTo(userLayerRef.current);

            const shouldFit = fitNextRef.current;
            fitNextRef.current = false;
            if (shouldFit) {
                mapRef.current.fitBounds(
                    [
                        [userLoc.lat, userLoc.lng],
                        [Number(nearest.latitude), Number(nearest.longitude)],
                    ],
                    { padding: [60, 60], maxZoom: 16 }
                );
            }
        } else {
            const shouldFit = fitNextRef.current;
            fitNextRef.current = false;
            if (shouldFit) {
                mapRef.current.setView([userLoc.lat, userLoc.lng], 15);
            }
        }
    }, [ready, userLoc, nearest]);

    useEffect(() => {
        const L = typeof window !== 'undefined' ? window.L : null;
        if (!ready || !L || !mapRef.current || !manualMode) return;

        const handler = (e) => {
            setManualMode(false);
            fitNextRef.current = false;
            setUserLoc({ lat: e.latlng.lat, lng: e.latlng.lng, accuracy: 0 });
            setUserAddress('');
            reverseGeocode(e.latlng.lat, e.latlng.lng);
        };
        mapRef.current.on('click', handler);
        return () => mapRef.current.off('click', handler);
    }, [ready, manualMode]);

    useEffect(() => {
        if (nearest) setActiveId(nearest.id);
    }, [nearest?.id]);

    const focusMarker = (m) => {
        const L = typeof window !== 'undefined' ? window.L : null;
        if (!L || !mapRef.current) return;
        const lat = parseFloat(m.latitude);
        const lng = parseFloat(m.longitude);
        if (Number.isNaN(lat) || Number.isNaN(lng)) return;
        focusedRef.current = Date.now();
        setActiveId(m.id);
        mapRef.current.flyTo([lat, lng], 19, { animate: true, duration: 0.6 });
        const marker = markerRefs.current[m.id];
        if (marker) {
            setTimeout(() => marker.openPopup(), 450);
        }
        if (isMobile) setMobileListOpen(false);
    };

    const renderRow = (m) => {
        const isActive = (m.status || 'Aktif') === 'Aktif';
        const isNearest = nearest && nearest.id === m.id;
        return (
            <button
                key={m.id}
                type="button"
                onClick={() => focusMarker(m)}
                className="w-100 text-left"
                style={{
                    display: 'block',
                    width: '100%',
                    textAlign: 'left',
                    border: `1px solid ${isNearest ? '#059669' : activeId === m.id ? '#3b82f6' : '#f1f5f9'}`,
                    background: isNearest ? '#ecfdf5' : activeId === m.id ? '#eff6ff' : '#fff',
                    borderRadius: 10,
                    padding: '8px 10px',
                    marginBottom: 6,
                    cursor: 'pointer',
                }}
            >
                <div className="d-flex align-items-center" style={{ gap: 8 }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: isActive ? '#16a34a' : '#94a3b8', flexShrink: 0 }} />
                    <span style={{ fontWeight: 600, fontSize: 13, flex: 1 }}>{m.nama_toko}</span>
                    {m.km != null && <span style={{ fontSize: 11, color: isNearest ? '#059669' : '#94a3b8', fontWeight: 700, whiteSpace: 'nowrap' }}>{fmtKm(m.km)}</span>}
                </div>
                <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 2, marginLeft: 16, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{m.alamat}</div>
            </button>
        );
    };

    const headerStyle = isMobile
        ? { position: 'absolute', top: 12, left: 12, right: 12, zIndex: 1000, background: '#fff', borderRadius: 14, padding: '12px 14px', boxShadow: '0 10px 30px rgba(0,0,0,.15)' }
        : { position: 'absolute', top: 16, left: 16, zIndex: 1000, background: '#fff', borderRadius: 14, padding: '14px 18px', boxShadow: '0 10px 30px rgba(0,0,0,.15)', maxWidth: 360 };

    return (
        <div className="peta-shell" style={{ fontFamily: "'Instrument Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>
            <Head title="Peta Customer" />

            <div ref={mapEl} style={{ position: 'absolute', inset: 0, zIndex: 0 }} />

            {/* Header */}
            <div style={headerStyle}>
                <div className="d-flex align-items-center" style={{ gap: 10 }}>
                    <div className="d-flex align-items-center justify-content-center" style={{ width: 38, height: 38, borderRadius: 10, background: '#3b82f6', flexShrink: 0 }}>
                        <i className="fas fa-map-marker-alt" style={{ color: '#fff' }}></i>
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontWeight: 700, fontSize: isMobile ? 14 : 16, lineHeight: 1.1 }}></div>
                        <div style={{ fontSize: 12, color: '#94a3b8' }}>{displayFiltered.length} dari {mappings.length} lokasi</div>
                    </div>
                    <div className="d-flex" style={{ gap: 6 }}>

                        {!isMobile && (
                            <button
                                type="button"
                                onClick={goNearest}
                                disabled={locating}
                                className="btn btn-sm btn-outline-success d-flex align-items-center"
                                style={{ borderRadius: 10, whiteSpace: 'nowrap' }}
                                title="Tampilkan dan fokus ke toko terdekat"
                            >
                                <i className="fas fa-crosshairs mr-1"></i>Toko Terdekat
                            </button>
                        )}
                        <button
                            type="button"
                            onClick={() => { setManualMode(true); setGeoError(''); }}
                            className={`btn btn-sm ${manualMode ? 'btn-warning' : 'btn-outline-secondary'} d-flex align-items-center`}
                            style={{ borderRadius: 10, whiteSpace: 'nowrap', fontSize: isMobile ? 12 : undefined, padding: isMobile ? '4px 8px' : undefined }}
                            title="Tandai posisi secara manual dengan klik pada peta"
                        >
                            <i className="fas fa-hand-pointer mr-1"></i>{isMobile ? '' : 'Pilih'}
                        </button>
                        {isMobile && (
                            <button
                                type="button"
                                onClick={() => setInfoOpen(!infoOpen)}
                                className="btn btn-sm btn-outline-secondary d-flex align-items-center"
                                style={{ borderRadius: 10, whiteSpace: 'nowrap', padding: '4px 8px' }}
                                title="Info lokasi"
                            >
                                <i className={`fas ${infoOpen ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
                            </button>
                        )}
                    </div>
                </div>

                {/* Cari lokasi */}
                <div style={{ marginTop: 10 }}>
                    <div className="input-group input-group-sm">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Cari nama tempat/jalan..."
                            value={locQuery}
                            onChange={(e) => {
                                setLocQuery(e.target.value);
                                setLocResults([]);
                            }}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    searchLocation();
                                }
                            }}
                        />
                        <div className="input-group-append">
                            <button
                                type="button"
                                className="btn btn-outline-primary"
                                onClick={searchLocation}
                                disabled={locSearching}
                            >
                                <i className={`${locSearching ? 'fas fa-spinner fa-spin' : 'fas fa-search'}`}></i>
                            </button>
                        </div>
                    </div>

                    {locResults.length > 0 && (
                        <div style={{ marginTop: 6, border: '1px solid #e2e8f0', borderRadius: 10, overflow: 'hidden', background: '#fff' }}>
                            {locResults.map((r, i) => (
                                <button
                                    key={i}
                                    type="button"
                                    onClick={() => pickLocation(r)}
                                    className="w-100 text-left px-3 py-2"
                                    style={{ display: 'block', width: '100%', textAlign: 'left', border: 'none', borderBottom: i < locResults.length - 1 ? '1px solid #f1f5f9' : 'none', background: '#fff', fontSize: 12 }}
                                >
                                    <i className="fas fa-map-pin mr-1" style={{ color: '#3b82f6' }}></i>
                                    {r.display_name}
                                </button>
                            ))}
                        </div>
                    )}

                    {nearOnly && nearest && (
                        <div className="d-flex align-items-center" style={{ marginTop: 8, background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: 10, padding: '7px 10px', gap: 8 }}>
                            <i className="fas fa-crosshairs" style={{ color: '#059669' }}></i>
                            <span className="small" style={{ flex: 1, color: '#065f46', fontWeight: 600 }}>
                                Toko terdekat: {nearest.nama_toko} · {fmtKm(nearest.km)}
                            </span>
                            <button type="button" className="btn btn-sm btn-light px-2" style={{ borderRadius: 8 }} onClick={() => setNearOnly(false)} title="Batalkan filter">
                                <i className="fas fa-times"></i>
                            </button>
                        </div>
                    )}
                </div>

                {(!isMobile || infoOpen) && (
                    <>
                        {manualMode && (
                            <div className="small text-warning mt-2" style={{ fontWeight: 600 }}>
                                <i className="fas fa-mouse-pointer mr-1"></i>Klik titik posisi Anda di peta.
                            </div>
                        )}

                        {geoError && <div className="small text-danger mt-2">{geoError}</div>}

                        {userLoc && (
                            <div className="small mt-2" style={{ lineHeight: 1.5 }}>
                                <div className="text-success">
                                    <i className="fas fa-check-circle mr-1"></i>
                                    Posisi didapat{nearest ? `, toko terdekat: ${nearest.nama_toko} (${fmtKm(nearest.km)})` : ''}
                                    {userLoc.accuracy > 0 && <span className="text-muted"> · akurasi {fmtAccuracy(userLoc.accuracy)}</span>}
                                </div>
                                {userAddress && (
                                    <div className="text-muted" style={{ marginTop: 2 }}>
                                        <i className="fas fa-map-pin mr-1"></i>
                                        {userAddress}
                                    </div>
                                )}
                                <div className="text-muted" style={{ marginTop: 2 }}>
                                    <i className="fas fa-info-circle mr-1"></i>Geser titik biru untuk koreksi posisi.
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* Nearest card (desktop) */}
            {!isMobile && nearest && (
                <div style={{ position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)', zIndex: 1000, background: '#fff', borderRadius: 14, padding: '12px 18px', boxShadow: '0 10px 30px rgba(0,0,0,.18)', display: 'flex', alignItems: 'center', gap: 12, maxWidth: 'calc(100vw - 40px)' }}>
                    <div className="d-flex align-items-center justify-content-center" style={{ width: 40, height: 40, borderRadius: '50%', background: '#d1fae5', flexShrink: 0 }}>
                        <i className="fas fa-store" style={{ color: '#059669' }}></i>
                    </div>
                    <div>
                        <div className="text-uppercase" style={{ fontSize: 10, letterSpacing: '.4px', color: '#94a3b8', fontWeight: 700 }}>Toko Terdekat</div>
                        <div style={{ fontWeight: 700, fontSize: 14 }}>{nearest.nama_toko} <span style={{ color: '#059669', fontWeight: 700 }}>· {fmtKm(nearest.km)}</span></div>
                        <div style={{ fontSize: 12, color: '#64748b', maxWidth: 420, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{nearest.alamat}</div>
                    </div>
                    <button type="button" className="btn btn-sm btn-outline-primary ml-2" style={{ borderRadius: 10 }} onClick={() => focusMarker(nearest)}>
                        Lihat
                    </button>
                </div>
            )}

            {/* Desktop list panel */}
            {!isMobile && (
                <div style={{ position: 'absolute', top: 16, right: 16, zIndex: 1000, width: 300, maxHeight: 'calc(100vh - 32px)', background: '#fff', borderRadius: 14, boxShadow: '0 10px 30px rgba(0,0,0,.15)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                    <div style={{ padding: 12, borderBottom: '1px solid #f1f5f9' }}>
                        <input
                            type="text"
                            className="form-control form-control-sm"
                            placeholder="Cari toko, alamat, produk..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        {userLoc && <div className="text-muted mt-2" style={{ fontSize: 11 }}>Durutkan dari yang terdekat</div>}
                    </div>
                    <div style={{ overflowY: 'auto', padding: 8 }}>
                        {listed.length === 0 ? (
                            <div className="text-center text-muted small py-4">Tidak ada data</div>
                        ) : listed.map((m) => renderRow(m))}
                    </div>
                </div>
            )}

            {/* Mobile interactions */}
            {isMobile && (
                <>
                    {/* Nearest card (mobile) */}
                    {!mobileListOpen && nearest && (
                        <div className="peta-safe-bottom-above" style={{ position: 'absolute', left: 12, right: 12, zIndex: 1000, background: '#fff', borderRadius: 14, padding: '10px 14px', boxShadow: '0 10px 30px rgba(0,0,0,.18)', display: 'flex', alignItems: 'center', gap: 10 }}>
                            <div className="d-flex align-items-center justify-content-center" style={{ width: 36, height: 36, borderRadius: '50%', background: '#d1fae5', flexShrink: 0 }}>
                                <i className="fas fa-store" style={{ color: '#059669' }}></i>
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div className="text-uppercase" style={{ fontSize: 9, letterSpacing: '.4px', color: '#94a3b8', fontWeight: 700 }}>Toko Terdekat</div>
                                <div style={{ fontWeight: 700, fontSize: 13, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                    {nearest.nama_toko} <span style={{ color: '#059669', fontWeight: 700 }}>· {fmtKm(nearest.km)}</span>
                                </div>
                            </div>
                            <button type="button" className="btn btn-sm btn-outline-primary" style={{ borderRadius: 10, fontSize: 12 }} onClick={() => focusMarker(nearest)}>
                                Lihat
                            </button>
                        </div>
                    )}

                    {/* Shortcut Toko Terdekat (mobile) */}
                    <button
                        type="button"
                        onClick={goNearest}
                        disabled={locating}
                        title="Toko Terdekat"
                        className="peta-safe-bottom"
                        style={{
                            position: 'absolute',
                            left: 14,
                            zIndex: 1000,
                            background: nearOnly ? '#059669' : '#fff',
                            color: nearOnly ? '#fff' : '#059669',
                            border: '2px solid #059669',
                            borderRadius: 999,
                            width: 46,
                            height: 46,
                            fontSize: 16,
                            fontWeight: 700,
                            boxShadow: nearOnly ? '0 8px 24px rgba(5,150,105,.45)' : '0 8px 24px rgba(0,0,0,.15)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <i className={`${locating ? 'fas fa-spinner fa-spin' : 'fas fa-crosshairs'}`}></i>
                    </button>

                    {/* Bottom sheet toggle */}
                    <button
                        type="button"
                        onClick={() => setMobileListOpen(!mobileListOpen)}
                        className="peta-safe-bottom"
                        style={{
                            position: 'absolute',
                            right: 14,
                            zIndex: 1000,
                            background: '#3b82f6',
                            color: '#fff',
                            border: 'none',
                            borderRadius: 999,
                            padding: '11px 16px',
                            fontSize: 13,
                            fontWeight: 700,
                            boxShadow: '0 8px 24px rgba(59,130,246,.4)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 8,
                        }}
                    >
                        <i className={`fas ${mobileListOpen ? 'fa-times' : 'fa-store'}`}></i>
                        {mobileListOpen ? 'Tutup' : `Toko (${listed.length})`}
                    </button>

                    {/* Bottom sheet */}
                    {mobileListOpen && (
                        <div
                            style={{
                                position: 'absolute',
                                left: 0,
                                right: 0,
                                bottom: 0,
                                zIndex: 1000,
                                background: '#fff',
                                borderTopLeftRadius: 18,
                                borderTopRightRadius: 18,
                                boxShadow: '0 -8px 30px rgba(0,0,0,.18)',
                                display: 'flex',
                                flexDirection: 'column',
                                maxHeight: '58vh',
                                overflow: 'hidden',
                            }}
                        >
                            <div style={{ width: 44, height: 4, borderRadius: 99, background: '#e2e8f0', margin: '8px auto 4px', flexShrink: 0 }} />
                            <div className="d-flex align-items-center px-3 py-2" style={{ borderBottom: '1px solid #f1f5f9', flexShrink: 0 }}>
                                <div style={{ fontWeight: 700, fontSize: 14, flex: 1 }}>Daftar Toko <span style={{ color: '#94a3b8', fontWeight: 400 }}>({listed.length})</span></div>
                                <button type="button" className="btn btn-sm btn-light" style={{ borderRadius: 8 }} onClick={() => setMobileListOpen(false)}>
                                    <i className="fas fa-times"></i>
                                </button>
                            </div>
                            <div style={{ padding: 10, borderBottom: '1px solid #f1f5f9', flexShrink: 0 }}>
                                <input
                                    type="text"
                                    className="form-control form-control-sm"
                                    placeholder="Cari toko, alamat, produk..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                                {userLoc && <div className="text-muted mt-2" style={{ fontSize: 11 }}>Durutkan dari yang terdekat</div>}
                            </div>
                            <div style={{ overflowY: 'auto', padding: 8, paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 20px)', WebkitOverflowScrolling: 'touch' }}>
                                {listed.length === 0 ? (
                                    <div className="text-center text-muted small py-4">Tidak ada data</div>
                                ) : listed.map((m) => renderRow(m))}
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}