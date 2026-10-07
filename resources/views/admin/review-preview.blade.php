<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <style>
        @page { size: 21cm 14cm; margin: 0; }
        * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
        body { margin:0; padding:0; background:#fff; font-family:Arial,Helvetica,sans-serif; font-weight:bold; text-rendering:geometricPrecision; -webkit-font-smoothing:none; }
    </style>
</head>
<body>
    @include('admin.review-content', ['inv' => $inv, 'cs' => $cs, 'grand_total' => $grand_total, 'nama_setujui' => $nama_setujui])
</body>
</html>