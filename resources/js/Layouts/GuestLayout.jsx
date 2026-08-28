export default function GuestLayout({ children }) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 font-sans">
            {children}
        </div>
    );
}
