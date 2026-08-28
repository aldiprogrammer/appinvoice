# AppInvoice — Agent Guide

## Stack
- **Laravel 12** (PHP ^8.2)
- **Livewire 4**, **Tailwind CSS 4 + DaisyUI 5** (all loaded via CDN in `layout/template.blade.php` — Vite build is configured but unused for CSS/JS delivery)
- **barryvdh/laravel-dompdf** for PDF invoice generation
- **SQLite** default; session/cache/queue all use `database` driver

## Key commands
```bash
composer setup          # install, .env, key:generate, migrate, npm install + build
composer dev            # concurrent: artisan serve, queue:listen, pail (logs), vite
composer test           # config:clear && artisan test
./vendor/bin/pint       # Laravel Pint (PSR-12 linting)
```

Run `composer test` for all tests (SQLite in-memory). Single test: `php artisan test --filter=TestName`.

## App-specific architecture
- **Auth**: Custom session-based. `LoginController` uses `Pengguna` model + `Hash::check`. Middleware `Ceklogin` checks session `username`.
- **Routes**: All app routes in `routes/web.php`. Public: `/`, `/login`, `/logout`. Everything else behind `Ceklogin`.
- **Controllers**: `app/Http/Controllers/admin/` — Customer, Produk, Invoice, Listinvoice, Pengguna, Dashboard.
- **Models**: Customer, Produk, Invoice, Listinvoice, Pengguna (users), kode (invoice counter). `Kategori` and `Wisata` exist but are unused by routes.
- **Invoice flow**: Invoice creation uses a `kode` (integer counter from `kodes` table or last `listinvoices.kode`). PDF built via `barryvdh/laravel-dompdf`.

## Conventions
- 4-space indent (`.editorconfig`)
- All controller actions return `view('admin/...')` with Blade layouts extending `layout.template`
- Form validation is inline in controllers (no Form Requests)
- No factories/seeders for app tables (only the default Laravel ones exist)
- `Ceklogin` middleware registered in `bootstrap/app.php` (kernel-less Laravel 12)

## Testing quirks
- Tests use SQLite `:memory:` (see `phpunit.xml`)
- Only one example test exists (`tests/Feature/ExampleTest.php`)
