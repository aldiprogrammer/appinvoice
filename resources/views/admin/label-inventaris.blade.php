<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <script src="https://cdn.tailwindcss.com"></script>

    <style>
        @page { size: 21cm 29.7cm; margin: 4mm; }
        * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
        body { font-family: Arial, Helvetica, sans-serif; font-weight: bold; text-rendering: geometricPrecision; -webkit-font-smoothing: none; }
        .label-page { display: grid; grid-template-columns: 1fr 1fr; gap: 2mm; margin-bottom: 2mm; page-break-after: always; }
        .label-page:last-child { page-break-after: auto; }
        .label-card { height: 55mm; border: 0.5mm solid #000; border-radius: 2mm; padding: 2mm 3mm; display: flex; flex-direction: column; page-break-inside: avoid; }
    </style>
</head>

<body class="bg-white m-0 p-0">
    @forelse ($items->chunk(10) as $chunk)
        <div class="label-page">
            @foreach ($chunk as $item)
                <div class="label-card">
                    <div class="flex items-center gap-2 border-b-2 border-black pb-1 mb-1">
                        <img src="{{ asset('img/logoptsan.png') }}" class="w-[7mm] h-[7mm] rounded-full object-contain" />
                        <div class="leading-tight text-[8px] font-bold">
                            <div class="text-[11px] font-bold">PT SINAR ANEKA NIAGA</div>
                            <div>JL. SETIA UJUNG NO. 38<br>MEDAN &ndash; BINJAI KM 13,5</div>
                        </div>
                    </div>
                    <div class="text-center text-[8px] tracking-[2px] text-black/60 font-bold">LABEL BARANG</div>
                    <div class="text-center text-[20px] font-bold tracking-wide leading-tight mt-0.5">{{ $item->kode_barang }}</div>
                    <div class="text-center text-[10px] font-bold tracking-wide mt-1">TGL. MASUK : {{ date('d/m/Y', strtotime($item->tanggal_masuk)) }}</div>
                    <div class="text-center text-[13px] font-bold mt-auto leading-snug">{{ $item->nama_barang }}</div>
                </div>
            @endforeach
        </div>
    @empty
        <div class="text-center text-sm font-bold mt-10">Tidak ada data label yang dipilih</div>
    @endforelse

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