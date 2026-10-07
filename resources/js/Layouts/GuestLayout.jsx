export default function GuestLayout({ children }) {
    return (
        <div
            className="d-flex align-items-center justify-content-center"
            style={{ minHeight: '100vh', background: 'linear-gradient(135deg,#2563eb,#1d4ed8,#1e3a8a)', fontFamily: "'Instrument Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
        >
            {children}
        </div>
    );
}