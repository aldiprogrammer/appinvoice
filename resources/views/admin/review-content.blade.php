<style>
    @page { size: 21cm 14cm; margin: 0; }
    * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
    .review-body { font-family: Arial, Helvetica, sans-serif; font-weight: bold; }
    .review-body .rc { font-size:13px; line-height:1.375; margin:0; padding:0; }
    .review-body .rc-page { width:21cm; min-height:14cm; padding:6mm; display:flex; flex-direction:column; justify-content:space-between; }
    .review-body .rc-header { display:grid; grid-template-columns:1fr 1fr 1fr; gap:4px; }
    .review-body .rc-table { width:100%; border-collapse:collapse; font-size:12px; font-weight:bold; }
    .review-body .rc-table thead tr { border-top:2px solid #000; border-bottom:2px solid #000; }
    .review-body .rc-table thead th { padding:2px 4px; text-align:center; }
    .review-body .rc-table thead th.left { text-align:left; }
    .review-body .rc-table thead th.right { text-align:right; }
    .review-body .rc-table tbody td { padding:2px 4px; font-size:13px; font-weight:bold; }
    .review-body .rc-table tbody td.c { text-align:center; }
    .review-body .rc-table tbody td.l { text-align:left; }
    .review-body .rc-table tbody td.r { text-align:right; }
    .review-body .rc-total { display:flex; justify-content:flex-end; margin-top:4px; }
    .review-body .rc-total-box { width:33.333%; border-top:2px solid #000; border-bottom:2px solid #000; padding:2px 0; display:flex; justify-content:space-between; font-weight:bold; font-size:15px; }
    .review-body .rc-ttd { margin-top:20px; display:flex; justify-content:space-between; font-weight:bold; font-size:13px; }
    .review-body .rc-ttd div { text-align:center; width:25%; }
</style>

<div class="review-body rc">
    <div class="rc-page" style="page-break-after:always">
        <div>
            <div class="rc-header">
                <div>
                    <div style="font-size:18px;font-weight:bold">PT SINAR ANEKA NIAGA</div>
                    <div style="font-size:13px;font-weight:bold;line-height:1.3">
                        JL. SETIA UJUNG NO. 38<br>MEDAN – BINJAI KM 13,5<br>KAB. DELI SERDANG<br>NO HP : 081367707788
                    </div>
                </div>
                <div style="display:flex;align-items:flex-start;justify-content:center">
                    <div style="font-size:16px;font-weight:bold;text-decoration:underline;margin-top:8px">INVOICE</div>
                </div>
                <div>
                    <table style="width:100%;font-size:12px;line-height:15px;font-weight:bold;color:#000">
                        <tr><td style="width:20%;padding:0;white-space:nowrap">NO. INVOICE rtrt</td><td style="width:10%;text-align:center;padding:1px 0">:</td><td style="padding:0">{{ $cs->kode_invoice }}</td></tr>
                        <tr><td style="padding:1px 0">TANGGAL</td><td style="text-align:center;padding:1px 0">:</td><td style="padding:1px 0">{{ date('d/m/Y', strtotime($cs->tanggal)) }}</td></tr>
                        <tr><td style="padding:1px 0">NO. PO</td><td style="text-align:center;padding:1px 0">:</td><td style="padding:1px 0">{{ $cs->no_po }}</td></tr>
                        <tr><td style="padding:1px 0">PENERIMA</td><td style="text-align:center;padding:1px 0">:</td><td style="padding:0">{{ $cs->customer }}</td></tr>
                        <tr><td style="padding:1px 0">ALAMAT</td><td style="text-align:center;padding:1px 0">:</td><td style="padding:1px 0">{{ $cs->customernew->alamat }}</td></tr>
                    </table>
                </div>
            </div>

            <div style="margin-top:6px">
                <table class="rc-table">
                    <thead>
                        <tr>
                            <th style="width:5%">No</th>
                            <th class="left" style="width:30%">Nama Barang</th>
                            <th class="left" style="width:12%">Kemasan</th>
                            <th class="right" style="width:10%">Jumlah Sak</th>
                            <th class="right" style="width:10%">Total KG</th>
                            <th class="right" style="width:12%">Harga / KG</th>
                            <th class="right" style="width:15%">Total Harga</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($inv as $i => $item)
                            <tr>
                                <td class="c">{{ $i + 1 }}</td>
                                <td class="l">{{ $item->produk }}</td>
                                <td class="l">{{ $item->kemasan }} Kg</td>
                                <td class="r">{{ $item->jml_sak }}</td>
                                <td class="r">{{ $item->jml_sak * $item->kemasan }}</td>
                                <td class="r">{{ number_format($item->harga) }}</td>
                                <td class="r">{{ number_format($item->total_harga) }}</td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>

            <div class="rc-total">
                <div class="rc-total-box">
                    <span>TOTAL</span>
                    <span>Rp {{ number_format($grand_total) }}</span>
                </div>
            </div>

            <div style="margin-top:4px;font-size:12px;font-weight:bold">
                <div style="font-weight:bold">Nomor Rekening :</div>
                <table style="width:100%">
                    <tr>
                        <td width="54%">Bank BCA : 1909277777 a.n. PT Sinar Aneka Niaga</td>
                        <td width="70%" style="text-align:right">Bank Mandiri : 1400087886686 a.n. PT Sinar Aneka Niaga</td>
                    </tr>
                </table>
            </div>

            <div style="margin-top:5px;font-size:10px">
                <div style="font-weight:bold">Keterangan :</div>
                <div style="font-weight:600">- Pembayaran dinyatakan LUNAS apabila dana telah masuk ke rekening kami.</div>
                <div>- Barang yang sudah dibeli tidak dapat dikembalikan.</div>
                <div>- Cek / Giro hanya tertuju pada Bank BCA.</div>
            </div>

            <div class="rc-ttd">
                <div>Hormat Kami<br><br><br><br>@if(!empty($nama_setujui))<span style="font-weight:bold">{{ $nama_setujui }}</span>@else(____________________)@endif</div>
                <div>Penerima<br><br><br><br>(____________________)</div>
            </div>
        </div>
    </div>
    
    
    @if($total_tambahan != 0)

    <div class="rc-page">
        <div>
            <div class="rc-header">
                <div>
                    <div style="font-size:18px;font-weight:bold">PT SINAR ANEKA NIAGA</div>
                    <div style="font-size:13px;font-weight:bold;line-height:1.3">
                        JL. SETIA UJUNG NO. 38<br>MEDAN – BINJAI KM 13,5<br>KAB. DELI SERDANG<br>NO HP : 081367707788
                    </div>
                </div>
                <div style="display:flex;align-items:flex-start;justify-content:center">
                    <div style="font-size:16px;font-weight:bold;text-decoration:underline;margin-top:8px">INVOICE</div>
                </div>
                <div>
                    <table style="width:100%;font-size:12px;line-height:15px;font-weight:bold;color:#000">
                        <tr><td style="width:20%;padding:0;white-space:nowrap">NO. INVOICE</td><td style="width:10%;text-align:center;padding:1px 0">:</td><td style="padding:0">{{ $cs->kode_invoice }}</td></tr>
                        <tr><td style="padding:1px 0">TANGGAL</td><td style="text-align:center;padding:1px 0">:</td><td style="padding:1px 0">{{ date('d/m/Y', strtotime($cs->tanggal)) }}</td></tr>
                        <tr><td style="padding:1px 0">NO. PO</td><td style="text-align:center;padding:1px 0">:</td><td style="padding:1px 0">{{ $cs->no_po }}</td></tr>
                        <tr><td style="padding:1px 0">PENERIMA</td><td style="text-align:center;padding:1px 0">:</td><td style="padding:0">{{ $cs->customer }}</td></tr>
                        <tr><td style="padding:1px 0">ALAMAT</td><td style="text-align:center;padding:1px 0">:</td><td style="padding:1px 0">{{ $cs->customernew->alamat }}</td></tr>
                    </table>
                </div>
            </div>

            <div style="margin-top:6px">
                <table class="rc-table">
                    <thead>
                        <tr>
                            <th style="width:5%">No</th>
                            <th class="left" style="width:35%">Nama Barang</th>
                            <th class="left" style="width:12%">Kemasan</th>
                            <th class="right" style="width:10%">Jumlah Sak</th>
                            <th class="right" style="width:10%">Total KG</th>
                            <th class="right" style="width:12%">Harga / KG</th>
                            <th class="right" style="width:15%">Total Harga</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php $no = 1; ?>
                        @foreach ($inv as $i => $item)
                         @if($item->harga_tambahan != 0)
                            <tr>
                                <td class="c">{{ $no++}}</td>
                                <td class="l">Tambahan Harga {{ $item->produk }}</td>
                                <td class="l">{{ $item->kemasan }} Kg</td>
                                <td class="r">{{ $item->jml_sak }}</td>
                                <td class="r">{{ $item->jml_sak * $item->kemasan }}</td>
                                <td class="r">{{ number_format($item->harga_tambahan) }}</td>
                                <td class="r">{{ number_format($item->total_harga_tambahan) }}</td>
                            </tr>
                            @endif
                        @endforeach
                    </tbody>
                </table>
            </div>

            <div class="rc-total">
                <div class="rc-total-box">
                    <span>TOTAL</span>
                    <span>Rp {{ number_format($total_tambahan) }}</span>
                </div>
            </div>

            <div style="margin-top:4px;font-size:12px;font-weight:bold">
                <div style="font-weight:bold">Nomor Rekening :</div>
                <table style="width:100%">
                    <tr>
                        <td width="54%">Bank BCA : 1909277777 a.n. PT Sinar Aneka Niaga</td>
                        <td width="70%" style="text-align:right">Bank Mandiri : 1400087886686 a.n. PT Sinar Aneka Niaga</td>
                    </tr>
                </table>
            </div>

            <div style="margin-top:5px;font-size:10px">
                <div style="font-weight:bold">Keterangan :</div>
                <div style="font-weight:600">- Pembayaran dinyatakan LUNAS apabila dana telah masuk ke rekining kami.</div>
                <div>- Barang yang sudah dibeli tidak dapat dikembalikan.</div>
                <div>- Cek / Giro hanya tertuju pada Bank BCA.</div>
            </div>

            <div class="rc-ttd">
                <div>Hormat Kami<br><br><br><br>@if(!empty($nama_setujui))<span style="font-weight:bold">{{ $nama_setujui }}</span>@else(____________________)@endif</div>
                <div>Penerima<br><br><br><br>(____________________)</div>
            </div>
        </div>
    </div>
    @endif
</div>
