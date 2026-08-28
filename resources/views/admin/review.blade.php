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
                        <div class="text-[16px] font-bold underline mt-2">INVOICE</div>
                    </div>
                    <div>
                        <table class="w-full text-[12px] leading-[15px] font-bold text-black">
                            <tr><td class="w-[20%] py-[0px] whitespace-nowrap">NO. INVOICE</td><td class="w-[10%] text-center py-[1px]">:</td><td class="py-[0px]">{{ $cs->kode_invoice }}</td></tr>
                            <tr><td class="py-[1px]">TANGGAL</td><td class="text-center py-[1px]">:</td><td class="py-[1px]">{{ date('d/m/Y', strtotime($cs->tanggal)) }}</td></tr>
                            <tr><td class="py-[1px]">NO. PO</td><td class="text-center py-[1px]">:</td><td class="py-[1px]">{{ $cs->no_po }}</td></tr>
                            <tr><td class="py-[1px]">PENERIMA</td><td class="text-center py-[1px]">:</td><td class="py-[0px]">{{ $cs->customer }}</td></tr>
                            <tr><td class="py-[1px]">ALAMAT</td><td class="text-center py-[1px]">:</td><td class="py-[1px]">{{ $cs->customernew->alamat }}</td></tr>
                        </table>
                    </div>
                </div>

                <div class="mt-[3px]">
                    <table class="w-full border-collapse text-[13px] font-bold">
                        <thead>
                            <tr class="border-t-[2px] border-b-[2px] border-black">
                                <th class="py-[1px] text-center w-[5%]">No</th>
                                <th class="py-[1px] text-left w-[35%]">Nama Barang</th>
                                <th class="py-[1px] text-left w-[12%]">Kemasan</th>
                                <th class="py-[1px] text-right w-[10%]">Jumlah Sak</th>
                                <th class="py-[1px] text-right w-[10%]">Total KG</th>
                                <th class="py-[1px] text-right w-[12%]">Harga / KG</th>
                                <th class="py-[1px] text-right w-[15%]">Total Harga</th>
                            </tr>
                        </thead>
                        <tbody>
                            @foreach ($inv as $i => $item)
                                <tr class="text-[13px] font-bold">
                                    <td class="py-[1px] text-center">{{ $i + 1 }}</td>
                                    <td class="py-[1px]">{{ $item->produk }}</td>
                                    <td class="py-[1px]">{{ $item->kemasan }} Kg</td>
                                    <td class="py-[1px] text-right">{{ $item->jml_sak }}</td>
                                    <td class="py-[1px] text-right">{{ $item->jml_sak * $item->kemasan }}</td>
                                    <td class="py-[1px] text-right">{{ number_format($item->harga) }}</td>
                                    <td class="py-[1px] text-right">{{ number_format($item->total_harga) }}</td>
                                </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>

                <div class="flex justify-end mt-[2px]">
                    <div class="w-1/3 border-t-[2px] border-b-[2px] border-black py-[1px] flex justify-between font-bold">
                        <span class="text-[14px]">TOTAL</span>
                        <span class="text-[14px]">Rp {{ number_format($grand_total) }}</span>
                    </div>
                </div>

                <div class="mt-[2px] text-[11px] font-bold tracking-wide">
                    <div class="font-bold">Nomor Rekening :</div>
                    <table class="tracking-wide">
                        <tr>
                            <td width="54%">Bank BCA : 1909277777 a.n. PT Sinar Aneka Niaga</td>
                            <td width="70%" class="text-right">Bank Mandiri : 1400087886686 a.n. PT Sinar Aneka Niaga</td>
                        </tr>
                    </table>
                </div>

                <div class="mt-[2px] text-[9px] tracking-wide">
                    <div class="font-bold">Keterangan :</div>
                    <div class="font-semibold">- Pembayaran dinyatakan LUNAS apabila dana telah masuk ke rekening kami.</div>
                    <div>- Barang yang sudah dibeli tidak dapat dikembalikan.</div>
                    <div>- Cek / Giro hanya tertuju pada Bank BCA.</div>
                </div>

                <div class="mt-[6px] flex justify-between font-bold text-[12px]">
                    <div class="text-center w-1/4">Hormat Kami<br><br><br><br>@if(!empty($nama_setujui))<span class="">{{ $nama_setujui }}</span>@else(____________________)@endif</div>
                    <div class="text-center w-1/4">Penerima<br><br><br><br>(____________________)</div>
                </div>
            </div>
        </div>
        
        
    @if($total_tambahan != 0)
        <div class="w-[21cm] h-[14cm] p-[4mm] flex flex-col justify-between">
            <div>
                <div class="grid grid-cols-3 gap-1 mt-2">
                    <div>
                        <div class="text-[18px] font-bold">PT SINAR ANEKA NIAGA</div>
                        <div class="leading-tight text-[13px] font-bold">
                            JL. SETIA UJUNG NO. 38<br>MEDAN – BINJAI KM 13,5<br>KAB. DELI SERDANG<br>NO HP : 081367707788
                        </div>
                    </div>
                    <div class="flex items-start justify-center">
                        <div class="text-[16px] font-bold underline mt-2">INVOICE</div>
                    </div>
                    <div>
                        <table class="w-full text-[12px] leading-[15px] font-bold text-black">
                            <tr><td class="w-[20%] py-[0px] whitespace-nowrap">NO. INVOICE</td><td class="w-[10%] text-center py-[1px]">:</td><td class="py-[0px]">{{ $cs->kode_invoice }}</td></tr>
                            <tr><td class="py-[1px]">TANGGAL</td><td class="text-center py-[1px]">:</td><td class="py-[1px]">{{ date('d/m/Y', strtotime($cs->tanggal)) }}</td></tr>
                            <tr><td class="py-[1px]">NO. PO</td><td class="text-center py-[1px]">:</td><td class="py-[1px]">{{ $cs->no_po }}</td></tr>
                            <tr><td class="py-[1px]">PENERIMA</td><td class="text-center py-[1px]">:</td><td class="py-[0px]">{{ $cs->customer }}</td></tr>
                            <tr><td class="py-[1px]">ALAMAT</td><td class="text-center py-[1px]">:</td><td class="py-[1px]">{{ $cs->customernew->alamat }}</td></tr>
                        </table>
                    </div>
                </div>

                <div class="mt-[3px]">
                    <table class="w-full border-collapse text-[13px] font-bold">
                        <thead>
                            <tr class="border-t-[2px] border-b-[2px] border-black">
                                <th class="py-[1px] text-center w-[5%]">No</th>
                                <th class="py-[1px] text-left w-[35%]">Nama Barang</th>
                                <th class="py-[1px] text-left w-[12%]">Kemasan</th>
                                <th class="py-[1px] text-right w-[10%]">Jumlah Sak</th>
                                <th class="py-[1px] text-right w-[10%]">Total KG</th>
                                <th class="py-[1px] text-right w-[12%]">Harga / KG</th>
                                <th class="py-[1px] text-right w-[15%]">Total Harga</th>
                            </tr>
                        </thead>
                        <tbody>
                             <?php $no = 1; ?>
                            @foreach ($inv as $i => $item)
                                @if($item->harga_tambahan != 0)
                                
                                <tr class="text-[13px] font-bold">
                                    <td class="py-[1px] text-center">{{ $no++ }}</td>
                                    <td class="py-[1px]">Tambahan Harga {{ $item->produk }}</td>
                                    <td class="py-[1px]">{{ $item->kemasan }} Kg</td>
                                    <td class="py-[1px] text-right">{{ $item->jml_sak }}</td>
                                    <td class="py-[1px] text-right">{{ $item->jml_sak * $item->kemasan }}</td>
                                    <td class="py-[1px] text-right">{{ number_format($item->harga_tambahan) }}</td>
                                    <td class="py-[1px] text-right">{{ number_format($item->total_harga_tambahan) }}</td>
                                </tr>
                                @endif
                            @endforeach
                        </tbody>
                    </table>
                </div>

                <div class="flex justify-end mt-[2px]">
                    <div class="w-1/3 border-t-[2px] border-b-[2px] border-black py-[1px] flex justify-between font-bold">
                        <span class="text-[14px]">TOTAL</span>
                        <span class="text-[14px]">Rp {{ number_format($total_tambahan) }}</span>
                    </div>
                </div>

                <div class="mt-[2px] text-[11px] font-bold tracking-wide">
                    <div class="font-bold">Nomor Rekening :</div>
                    <table class="tracking-wide">
                        <tr>
                            <td width="54%">Bank BCA : 1909277777 a.n. PT Sinar Aneka Niaga</td>
                            <td width="70%" class="text-right">Bank Mandiri : 1400087886686 a.n. PT Sinar Aneka Niaga</td>
                        </tr>
                    </table>
                </div>

                <div class="mt-[2px] text-[9px] tracking-wide">
                    <div class="font-bold">Keterangan :</div>
                    <div class="font-semibold">- Pembayaran dinyatakan LUNAS apabila dana telah masuk ke rekening kami.</div>
                    <div>- Barang yang sudah dibeli tidak dapat dikembalikan.</div>
                    <div>- Cek / Giro hanya tertuju pada Bank BCA.</div>
                </div>

                <div class="mt-[6px] flex justify-between font-bold text-[12px]">
                    <div class="text-center w-1/4">Hormat Kami<br><br><br><br>@if(!empty($nama_setujui))<span class="">{{ $nama_setujui }}</span>@else(____________________)@endif</div>
                    <div class="text-center w-1/4">Penerima<br><br><br><br>(____________________)</div>
                </div>
            </div>
        </div>
    </div>
    @endif

    <script>
        window.addEventListener('load', function() {
            window.print();
        });
        window.onafterprint = function() {
            if (confirm('Apakah mesin prinan berjalan?')) {
                fetch('/cetak-status/{{ $cs->kode }}', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': '{{ csrf_token() }}',
                        'X-Requested-With': 'XMLHttpRequest'
                    }
                }).then(function() {
                    window.location.href = document.referrer || '/listinvoice';
                });
            } else {
                window.location.href = document.referrer || '/listinvoice';
            }
        };
    </script>
</body>
</html>
