<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <script src="https://cdn.tailwindcss.com"></script>

    <style>
        @page { size: 21cm 14cm; margin: 0; }
        * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
        body { font-family: Arial, Helvetica, sans-serif; font-weight: bold; text-rendering: geometricPrecision; -webkit-font-smoothing: none; }
        .review-body { font-family: Arial, Helvetica, sans-serif; font-weight: bold; }
    </style>
</head>

<body class="bg-white text-[13px] leading-snug m-0 p-0">
    <div class="review-body text-[13px] leading-snug m-0 p-0">
        <div class="w-[21cm] h-[14cm] p-[4mm] flex flex-col justify-between" style="page-break-after: always;">
            <div>
                <div class="grid grid-cols-3 gap-1 mt-2">
                    <div>
                        <div class="text-[18px] font-bold">PT SINAR ANEKA NIAGA</div>
                        <div class="leading-tight text-[13px] font-bold">
                            JL. SETIA UJUNG NO. 38<br>MEDAN – BINJAI KM 13,5<br>KAB. DELI SERDANG<br>NO HP : 081367707788
                        </div>
                    </div>
                    <div class="flex items-start justify-center">
                        <div class="text-[16px] font-bold underline mt-2">SURAT JALAN</div>
                    </div>
                    <div>
                        <table class="w-full text-[12px] leading-[15px] font-bold text-black">
                            <tr><td class="w-[20%] py-[0px] whitespace-nowrap">NO. SJ</td><td class="w-[10%] text-center py-[1px]">:</td><td class="py-[0px]">{{ $cs->no_sj }}</td></tr>
                            <tr><td class="py-[1px]">TANGGAL</td><td class="text-center py-[1px]">:</td><td class="py-[1px]">{{ date('d/m/Y', strtotime($cs->tanggal)) }}</td></tr>
                            <tr><td class="py-[1px]">PENERIMA</td><td class="text-center py-[1px]">:</td><td class="py-[0px]">{{ $cs->customer }}</td></tr>
                            <tr><td class="py-[1px]">ALAMAT</td><td class="text-center py-[1px]">:</td><td class="py-[1px]">{{ $cs->alamat }}</td></tr>
                            {{-- <tr><td class="py-[1px]">NO. KENDARAAN</td><td class="text-center py-[1px]">:</td><td class="py-[1px]">{{ $cs->nomor_kendaraan ?? '-' }}</td></tr> --}}
                        </table>
                    </div>
                </div>

                <div style="font-style: italic; margin-top : 8px">
                       Dengan nomor kendaraan <b>{{ $cs->nomor_kendaraan ?? '-' }}</b> Kami kirimkan barang-barang tersebut di bawah ini :
                    </div>

                <div class="mt-[3px]">
                    <table class="w-full border-collapse text-[13px] font-bold">
                        <thead>
                            <tr class="border-t-[2px] border-b-[2px] border-black">
                                <th class="py-[1px] text-center w-[5%]">No</th>
                                <th class="py-[1px] text-left w-[35%]">Nama Barang</th>
                                <th class="py-[1px] text-left w-[15%]">Kemasan</th>
                                <th class="py-[1px] text-right w-[15%]">Jumlah Sak</th>
                                <th class="py-[1px] text-right w-[15%]">Total KG</th>
                            </tr>
                        </thead>
                        <tbody>
                            @foreach ($inv as $i => $item)
                                <tr class="text-[13px] font-bold">
                                    <td class="py-[1px] text-center">{{ $i + 1 }}</td>
                                    <td class="py-[1px]">{{ $item->produk }}</td>
                                    <td class="py-[1px]">{{ $item->kemasan }} Kg</td>
                                    <td class="py-[1px] text-right">{{ $item->jml_sak }}</td>
                                    <td class="py-[1px] text-right">{{ $item->total_kg }}</td>
                                </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>

                <div class="flex justify-end mt-[2px]">
                    <div class="w-1/3 border-t-[2px] border-b-[2px] border-black py-[1px] flex justify-between font-bold">
                        <span class="text-[14px]">TOTAL KG</span>
                        <span class="text-[14px]">{{ number_format($grand_total) }} kg</span>
                    </div>
                </div>

                

                <div class="mt-[2px] text-[11px] font-bold tracking-wide">
                    <div class="font-bold">Keterangan :</div>
                    <div class="font-semibold">- Barang yang sudah dibeli tidak dapat dikembalikan / ditolak.</div>
                    <div>- Dan jika terjadi kekurangan / hilang ditak dapat di di klaim.</div>
                </div>

                <div class="mt-[6px] flex justify-between font-bold text-[12px]">
                     <div class="text-center w-1/4">TANDA TERIMA<br><br><br><br>(____________________)</div>
                     <div class="text-center w-1/4">TELI<br><br><br><br>(____________________)</div>

                     <div class="text-center w-1/4">HORMAT KAMI<br><br><br><br>@if(!empty($nama_setujui))<span class="">{{ $nama_setujui }}</span>@else(____________________)@endif
                        @if(!empty($cetak) && $cetak > 0)<br><span class="text-[11px]">Copy {{ $cetak }}</span>@endif
                    </div>
                   
                </div>
            </div>
        </div>
    </div>

    <script>
        window.addEventListener('load', function() {
            window.print();
        });
        window.onafterprint = function() {
            if (confirm('Apakah mesin cetak berjalan?')) {
                fetch('/cetak-status-sj/{{ $cs->no_sj }}', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': '{{ csrf_token() }}',
                        'X-Requested-With': 'XMLHttpRequest'
                    }
                }).then(function() {
                    window.location.href = document.referrer || '/listsuratjalan';
                });
            } else {
                window.location.href = document.referrer || '/listsuratjalan';
            }
        };
    </script>
</body>
</html>
