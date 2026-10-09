export default function GuestLayout({ children }) {
    return (
        <div
            style={{
                minHeight: '100vh',
                display: 'flex',
                background: 'linear-gradient(135deg,#2563eb,#1d4ed8,#1e3a8a)',
                fontFamily: "'Instrument Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                padding: '28px 16px',
                boxSizing: 'border-box',
            }}
        >
            <div style={{ margin: 'auto', width: '100%', display: 'flex', justifyContent: 'center' }}>
                {children}
            </div>
        </div>
    );
}
