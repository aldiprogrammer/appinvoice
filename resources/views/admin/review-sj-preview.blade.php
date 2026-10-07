<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">

    <style>
        @page { size: 21cm 14cm; margin: 0; }
        * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
        body { margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif; font-weight: bold; text-rendering: geometricPrecision; -webkit-font-smoothing: none; }
    </style>
</head>

<body class="bg-white">
    @include('admin.review-sj-content', ['inv' => $inv, 'cs' => $cs, 'grand_total' => $grand_total, 'nama_setujui' => $nama_setujui])
</body>
</html>