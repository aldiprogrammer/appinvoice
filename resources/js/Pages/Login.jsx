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
            <div className="px-4 w-full max-w-[420px]">
                <div className="bg-base-100 rounded-2xl shadow-2xl p-8 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/30">
                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
                        </svg>
                    </div>
                    <h1 className="text-xl font-bold text-base-content">{menuLabel} PT. SAN</h1>
                    <p className="text-sm text-base-content/45">Management System</p>

                    {errors.username && (
                        <div className="alert alert-error mt-4 text-sm py-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{errors.username || errors.password || 'Username atau password salah'}</span>
                        </div>
                    )}

                    <form onSubmit={submit} className="mt-6 text-left">
                        <input type="hidden" name="menu" value={menu} />
                        <div className="mb-3">
                            <label className="label">
                                <span className="label-text font-semibold text-sm">Username</span>
                            </label>
                            <input
                                type="text"
                                className="input input-bordered w-full"
                                placeholder="Masukkan username"
                                value={data.username}
                                onChange={(e) => setData('username', e.target.value)}
                                required
                                autoFocus
                            />
                        </div>
                        <div className="mb-3">
                            <label className="label">
                                <span className="label-text font-semibold text-sm">Password</span>
                            </label>
                            <input
                                type="password"
                                className="input input-bordered w-full"
                                placeholder="Masukkan password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={processing}
                            className="btn btn-primary w-full mt-4"
                        >
                            {processing ? <span className="loading loading-spinner loading-sm" /> : (
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                </svg>
                            )}
                            Login
                        </button>
                        <Link href='/' className="btn btn-success w-full mt-2 text-white" >Kembali ke menu</Link>
                    </form>
                </div>
                <p className="text-center text-white/40 mt-3 text-xs">
                    &copy; {new Date().getFullYear()} {menuLabel} PTSAN. All rights reserved.
                </p>
            </div>
        </GuestLayout>
    );
}
