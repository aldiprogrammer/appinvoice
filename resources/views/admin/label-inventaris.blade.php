<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/qrcode-generator@1.4.4/qrcode.js"></script>

    <style>
        @page { size: 21cm 29.7cm; margin: 4mm; }
        * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
        body { margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif; font-weight: bold; text-rendering: geometricPrecision; -webkit-font-smoothing: none; }
        .label-table { width: 100%; border-collapse: separate; border-spacing: 2mm; }
        .label-page { page-break-after: always; }
        .label-page:last-child { page-break-after: auto; }
        .label-card { height: 55mm; display: flex; flex-direction: column; border: 0.5mm solid #000; border-radius: 2mm; padding: 2mm 3mm; page-break-inside: avoid; vertical-align: top; }
    </style>
</head>

<body class="bg-white">
    @forelse ($items->chunk(10) as $chunk)
        <table class="label-table label-page">
            @for ($r = 0; $r < 5; $r++)
                <tr>
                    @for ($c = 0; $c < 2; $c++)
                        @php $idx = $r * 2 + $c; $item = $chunk[$idx] ?? null; @endphp
                        <td class="label-card">
                            @if ($item)
                                <table class="mb-1" style="width:100%;border-bottom:0.5mm solid #000">
                                    <tr>
                                        <td class="pb-1 align-middle" style="width:8mm">
                                            <img src="{{ asset('img/logoptsan.png') }}" style="width:7mm;height:7mm;border-radius:50%;object-fit:contain;" />
                                        </td>
                                        <td class="pb-1 align-middle" style="line-height:1.2;font-size:8px">
                                            <div style="font-size:11px;font-weight:bold">PT SINAR ANEKA NIAGA</div>
                                            <div>JL. SETIA UJUNG NO. 38<br>MEDAN &ndash; BINJAI KM 13,5</div>
                                        </td>
                                    </tr>
                                </table>
                                <div class="text-center" style="font-size:8px;letter-spacing:2px;color:#666;font-weight:bold">LABEL BARANG</div>
                                <div class="text-center" style="font-size:20px;font-weight:bold;letter-spacing:1px;line-height:1.1;margin-top:1mm">{{ $item->kode_barang }}</div>
                                <div class="text-center" style="font-size:10px;font-weight:bold;letter-spacing:1px;margin-top:1mm">TGL. MASUK : {{ date('d/m/Y', strtotime($item->tanggal_masuk)) }}</div>
                                <div style="display:flex;align-items:flex-end;justify-content:space-between;gap:2mm;margin-top:auto">
                                    <div class="text-center" style="font-size:13px;font-weight:bold;line-height:1.2;flex:1">{{ $item->nama_barang }}</div>
                                    <div class="qr-code" data-qr="{{ $item->kode_barang }}" style="width:17mm;height:17mm;flex:none"></div>
                                </div>
                            @endif
                        </td>
                    @endfor
                </tr>
            @endfor
        </table>
    @empty
        <div class="text-center" style="font-size:14px;font-weight:bold;margin-top:10mm">Tidak ada data label yang dipilih</div>
    @endforelse

    <script>
        document.querySelectorAll('.qr-code').forEach(function(el) {
            var qr = qrcode(0, 'M');
            qr.addData(el.getAttribute('data-qr'));
            qr.make();
            var img = document.createElement('img');
            img.src = qr.createDataURL(3, 1);
            img.style.width = '100%';
            img.style.height = '100%';
            el.appendChild(img);
        });
    </script>
    <script>
        window.addEventListener('load', function() {
            window.print();
        });
        window.onafterprint = function() {
            window.location.href = document.referrer || '/inventaris';
        };
    </script>
</body>
</html>