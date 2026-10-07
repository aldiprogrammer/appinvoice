import { useForm, Head, Link } from '@inertiajs/react';
import GuestLayout from '../Layouts/GuestLayout';

export default function Login({ menu, menuLabel }) {
    const { data, setData, post, processing, errors } = useForm({
        username: '',
        password: '',
        menu: menu,
    });

    const submit = (e) => {
        e.preventDefault();
        post('/login');
    };

    return (
        <GuestLayout>
            <Head title="Login" />
            <div className="px-3 w-100" style={{ maxWidth: 420 }}>
                <div className="bg-white text-center shadow-lg rounded-lg" style={{ padding: '40px 32px', borderRadius: 16 }}>
                    <div
                        className="d-flex align-items-center justify-content-center mx-auto mb-4"
                        style={{ width: 64, height: 64, borderRadius: 16, background: 'linear-gradient(135deg,#3b82f6,#2563eb)', boxShadow: '0 8px 16px rgba(37,99,235,.3)' }}
                    >
                        <i className="fas fa-file-invoice" style={{ color: '#fff', fontSize: '1.75rem' }}></i>
                    </div>
                    <h1 className="font-weight-bold" style={{ fontSize: '1.5rem', color: 'rgba(0,0,0,.85)' }}>{menuLabel} PT. SAN</h1>
                    <p className="mb-0" style={{ fontSize: '.875rem', color: 'rgba(0,0,0,.45)' }}>Management System</p>

                    {errors.username && (
                        <div className="alert alert-danger d-flex align-items-center text-left mt-4 mb-0" role="alert" style={{ fontSize: '.875rem', padding: '12px 16px' }}>
                            <i className="fas fa-exclamation-circle mr-2"></i>
                            <span>{errors.username || errors.password || 'Username atau password salah'}</span>
                        </div>
                    )}

                    <form onSubmit={submit} className="text-left" style={{ marginTop: 24 }}>
                        <input type="hidden" name="menu" value={menu} />
                        <div className="form-group">
                            <label htmlFor="username" className="font-weight-semibold small font-weight-bold">Username</label>
                            <input
                                id="username"
                                type="text"
                                className="form-control"
                                placeholder="Masukkan username"
                                value={data.username}
                                onChange={(e) => setData('username', e.target.value)}
                                style={{ minHeight: 42 }}
                                required
                                autoFocus
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password" className="font-weight-bold small">Password</label>
                            <input
                                id="password"
                                type="password"
                                className="form-control"
                                placeholder="Masukkan password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                style={{ minHeight: 42 }}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={processing}
                            className="btn btn-primary btn-block mt-4"
                            style={{ minHeight: 42, boxShadow: '0 4px 12px rgba(37,99,235,.3)' }}
                        >
                            {processing && <span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true" />}
                            <i className="fas fa-sign-in-alt mr-2"></i> Login
                        </button>
                        <Link href="/" className="btn btn-success btn-block mt-2 text-white">Kembali ke menu</Link>
                    </form>
                </div>
                <p className="text-center mt-3 mb-0" style={{ color: 'rgba(255,255,255,.5)', fontSize: '.75rem' }}>
                    &copy; {new Date().getFullYear()} {menuLabel} PTSAN. All rights reserved.
                </p>
            </div>
        </GuestLayout>
    );
}