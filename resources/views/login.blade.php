<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login | Invoice PTSAN</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
    <style>
        body {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, #2563eb, #1d4ed8, #1e3a8a);
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        .card-login {
            border: none;
            border-radius: 16px;
            box-shadow: 0 24px 48px rgba(0,0,0,.25);
            width: 100%;
            max-width: 420px;
            padding: 40px 32px;
        }
        .brand-icon {
            width: 64px; height: 64px;
            border-radius: 16px;
            background: linear-gradient(135deg,#3b82f6,#2563eb);
            display: flex; align-items: center; justify-content: center;
            margin: 0 auto 16px;
            box-shadow: 0 8px 16px rgba(37,99,235,.3);
        }
        .brand-icon i { color: #fff; font-size: 1.75rem; }
        .login-title { font-size: 1.5rem; font-weight: 700; color: rgba(0,0,0,.85); }
        .login-subtitle { font-size: .875rem; color: rgba(0,0,0,.45); }
        .form-label-custom { font-weight: 600; font-size: .875rem; color: rgba(0,0,0,.7); }
        .form-control-custom {
            border-radius: 8px; border: 1px solid #e5e7eb;
            padding: 10px 16px; font-size: .875rem;
        }
        .form-control-custom:focus {
            border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(59,130,246,.12);
        }
        .btn-login {
            background: #2563eb; color: #fff; border: none;
            border-radius: 8px; padding: 10px; font-weight: 600;
            box-shadow: 0 4px 12px rgba(37,99,235,.3);
        }
        .btn-login:hover { background: #1d4ed8; color: #fff; transform: translateY(-1px); box-shadow: 0 6px 16px rgba(37,99,235,.4); }
        .alert-custom {
            border-radius: 8px; border: none;
            background: #fef2f2; color: #dc2626; font-size: .875rem;
            padding: 12px 16px;
        }
    </style>
</head>
<body>
    <div class="px-3" style="width:100%;max-width:420px">
        <div class="card-login bg-white text-center">
            <div class="brand-icon"><i class="fas fa-file-invoice"></i></div>
            <h1 class="login-title">INVOICE PTSAN</h1>
            <p class="login-subtitle">Management System</p>

            @if (session('error'))
            <div class="alert-custom d-flex align-items-center mt-3">
                <i class="fas fa-exclamation-circle mr-2"></i> {{ session('error') }}
            </div>
            @endif

            <form method="post" action="{{ route('login.auth') }}" class="mt-4 text-left">
                @csrf
                <div class="form-group">
                    <label class="form-label-custom">Username</label>
                    <input type="text" name="username" class="form-control form-control-custom" placeholder="Masukkan username" required>
                </div>
                <div class="form-group mt-3">
                    <label class="form-label-custom">Password</label>
                    <input type="password" name="password" class="form-control form-control-custom" placeholder="Masukkan password" required>
                </div>
                <button type="submit" class="btn btn-login btn-block mt-4">
                    <i class="fas fa-sign-in-alt mr-2"></i> Login
                </button>
            </form>
        </div>
        <p class="text-center text-white-50 mt-3" style="color:rgba(255,255,255,.5);font-size:.75rem">&copy; {{ date('Y') }} Invoice PTSAN. All rights reserved.</p>
    </div>
</body>
</html>
