<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <script src="https://cdn.tailwindcss.com"></script>

    <style>
        @page { size: 21cm 14cm; margin: 0; }
        * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
        body { font-family: Arial, Helvetica, sans-serif; font-weight: bold; text-rendering: geometricPrecision; -webkit-font-smoothing: none; }
    </style>
</head>

<body class="bg-white text-[13px] leading-snug m-0 p-0">
    @include('admin.review-sj-content', ['inv' => $inv, 'cs' => $cs, 'grand_total' => $grand_total, 'nama_setujui' => $nama_setujui])
</body>
</html>
