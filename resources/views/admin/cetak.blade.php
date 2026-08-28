<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">

    <style>
        @page {
            margin-top: 2mm;
            margin-bottom: 5mm;
            margin-left: 6.4mm;
            margin-right: 6.4mm;
        }

        body {
            /* font-family: Courier, monospace; */
            font-size: 11px;
        }

        table {
            width: 100%;
            border-collapse: collapse;
        }

        .header-table td {
            vertical-align: top;
        }

        .line {
            border-top: 1px solid black;
            margin: 5px 0;
        }

        .invoice-table {
            width: 100%;
            border-collapse: collapse;
        }

        .invoice-table th,
        .invoice-table td {
            padding: 4px;
            border-left: none;
            border-right: none;
        }

        .invoice-table thead tr {
            border-top: 1px solid black;
            border-bottom: 1px solid black;
        }

        .invoice-table tbody tr {
            border-bottom: 1px solid black;
        }

        .text-right {
            text-align: right;
        }

        .text-center {
            text-align: center;
        }

        .no-border td {
            border: none;
        }

        .section {
            margin-top: 5px;
        }

        .signature {
            margin-top: 40px;
        }

        .tbl-total {
            border-collapse: collapse;
        }

        /* .tbl-total,
        th,
        td {
            border: 1px solid black;
        } */
    </style>

</head>

<body>

    <!-- HEADER -->
    <br/>
     <br/>
      <br/>
    <table width="100%">
        <tr>

            <!-- KOLOM KIRI -->
            <td width="50%" valign="top" style="border: 0px solid black; font-size: 14px">
                <div style="font-size:16px; font-weight:bold; margin-bottom:0px">PT SINAR ANEKA NIAGA</div>
                
                JL. SETIA UJUNG NO. 38<br>
                MEDAN – BINJAI KM 13,5<br>
                KAB. DELI SERDANG<br>
                NO HP : 081367707788
            </td>

            <!-- KOLOM TENGAH -->
            <td width="50%" valign="top" align="center" style="border: 0px solid black; font-size: 20px">

                <!-- Turunkan supaya sejajar baris ke-3 -->
                <br>

                <strong style="font-size:16px; text-decoration: underline;">
                    INVOICE
                </strong>

            </td>

            <!-- KOLOM KANAN -->
            <td width="50%" valign="top" style="border: 0px solid black; font-size: ">

                <table width="100%" style="font-size:13px;">
                    <tr>
                        <td width="35%">NO. INVOICE</td>
                        <td width="5%" align="center">:</td>
                        <td width="60%">{{ $cs->kode_invoice }}</td>
                    </tr>
                    <tr>
                        <td>TANGGAL</td>
                        <td align="center">:</td>
                        <td>{{ $cs->tanggal }}</td>
                    </tr>
                    <tr>
                        <td>NO. PO</td>
                        <td align="center">:</td>
                        <td>{{ $cs->no_po }}</td>
                    </tr>
                    <tr>
                        <td>PENERIMA</td>
                        <td align="center">:</td>
                        <td>{{ $cs->customer }}</td>
                    </tr>
                    <tr>
                        <td>ALAMAT</td>
                        <td align="center">:</td>
                        <td>{{ $cs->customernew->alamat }}</td>
                    </tr>
                </table>

            </td>

        </tr>
    </table>

    {{-- <div class="line"></div> --}}


    <!-- TABLE BARANG -->
    <table class="invoice-table" style="margin-top: 16px; ">
        <thead>
            <tr>
                <th style="border: 0px solid black; font-size: 13px; text-align:center" width="3%">No</th>
                <th style="border: 0px solid black; font-size: 13px; text-align:center" width="15%">Nama Barang</th>
                <th style="border: 0px solid black; font-size: 13px; text-align:center" width="10%">Ukuran kemasan</th>
                <th style="border: 0px solid black; font-size: 13px; text-align:center" width="10%">Jumlah Sak</th>
                <th style="border: 0px solid black; font-size: 13px; text-align:center" width="10%">Total KG</th>
                <th style="border: 0px solid black; font-size: 13px; text-align:center" width="10%">Harga / KG</th>
                <th style="border: 0px solid black; font-size: 13px; text-align:center" width="10%">Total Harga</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($inv as $i => $item)
                <tr class=''>
                    <td class="text-center">{{ $i + 1 }}</td>
                    <td class="text-center">{{ $item->produk }}</td>
                    <td class="text-center; font-size: 15px" style="text-align: center">{{ $item->kemasan }} Kg</td>
                    <td class="text-center; font-size: 15px" style="text-align: center">{{ $item->jml_sak }}</td>
                    <td class="text-center; font-size: 15px" style="text-align: center">{{ $item->jml_sak * $item->kemasan }}</td>
                    <td class="text-center; font-size: 15px" style="text-align: center">{{ number_format($item->harga) }}</td>
                    <td class="text-center; font-size: 18px"  style="text-align: center">{{ number_format($item->total_harga) }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>

    <!-- TOTAL -->
    <table class="tbl-total">
        <tr>
            <td width="70%"><strong></strong></td>
            <td width="90" style="border: 1px solid black; border-left: none;
            border-right: none; text-align:center">
                <strong>TOTAL</strong>
            </td>
            <td width="10"
                style="border: 1px solid black; border-left: none;
            border-right: none; text-align:center
           ">
                <strong>Rp </strong>
            </td>
            <td width=""
                style="text-align: center;  border: 1px solid black; border-left: none;
            border-right: none;">
                <strong>{{ number_format($grand_total) }}</strong>
            </td>
        </tr>
    </table>

    <!-- REKENING -->
    <div class="section" style="font-weight: bold">
        <strong>Nomor Rekening :</strong><br>
        <table>
            <tr style="border: 0px solid black;">
                <td width="100%"> Bank BCA : 1909277777 a.n. PT Sinar Aneka Niaga</td>
                <td width="70%"> Bank Mandiri : 1400087886686 a.n. PT Sinar Aneka Niaga</td>
            </tr>
        </table>
    </div>

    <!-- KETERANGAN -->
    <div class="section" style="font-weight: bold">
        <strong>Keterangan :</strong><br>
        - Pembayaran dinyatakan LUNAS apabila dana telah masuk ke rekening kami.<br>
        - Barang yang sudah dibeli tidak dapat dikembalikan.<br>
        - Cek / Giro hanya tertuju pada Bank BCA.
    </div>

    <!-- TTD -->
      <br>
      <br/>
      <br/>
    <table style="border: 0px solid black; font-weight:bold">
        <tr>
            <td width="15%" style="border: 0px solid black; text-align: center">
                Hormat Kami,<br><br><br><br><br><br>
                (__________________)
            </td>
            <td width="50%">

            </td>

            <td width="15%" style="border: 0px solid black; text-align: center">
                Penerima,<br><br><br><br><br><br>
                (__________________)
            </td>
        </tr>
    </table>


    
    
     <table width="100%">
       
        <tr>

            <!-- KOLOM KIRI -->
            <td width="50%" valign="top" style="border: 0px solid black; font-size: 14px; margin-top: 200px">
                <br />
                <br />
                <div style="font-size:16px; font-weight:bold; margin-bottom:0px">PT SINAR ANEKA NIAGA</div>
                
                JL. SETIA UJUNG NO. 38<br>
                MEDAN – BINJAI KM 13,5<br>
                KAB. DELI SERDANG<br>
                NO HP : 081367707788
            </td>

            <!-- KOLOM TENGAH -->
            <td width="50%" valign="top" align="center" style="border: 0px solid black; font-size: 20px">

                <!-- Turunkan supaya sejajar baris ke-3 -->
                
 <br />
                    <br />
                <strong style="font-size:16px; text-decoration: underline;">
                    INVOICE
                </strong>

            </td>

            <!-- KOLOM KANAN -->
            <td width="50%" valign="top" style="border: 0px solid black; font-size: ">

                <table width="100%" style="font-size:13px;">
                    <br />
                    <br />
                    
                    <tr>
                        <td width="35%">NO. INVOICE</td>
                        <td width="5%" align="center">:</td>
                        <td width="60%">{{ $cs->kode_invoice }}</td>
                    </tr>
                    <tr>
                        <td>TANGGAL</td>
                        <td align="center">:</td>
                        <td>{{ $cs->tanggal }}</td>
                    </tr>
                    <tr>
                        <td>NO. PO</td>
                        <td align="center">:</td>
                        <td>{{ $cs->no_po }}</td>
                    </tr>
                    <tr>
                        <td>PENERIMA</td>
                        <td align="center">:</td>
                        <td>{{ $cs->customer }}</td>
                    </tr>
                    <tr>
                        <td>ALAMAT</td>
                        <td align="center">:</td>
                        <td>{{ $cs->customernew->alamat }}</td>
                    </tr>
                </table>

            </td>

        </tr>
    </table>

     <!-- TABLE BARANG -->
    <table class="invoice-table" style="margin-top: 16px; ">
        <thead>
            <tr>
                <th style="border: 0px solid black; font-size: 13px; text-align:center" width="3%">No</th>
                <th style="border: 0px solid black; font-size: 13px; text-align:center" width="15%">Nama Barang</th>
                <th style="border: 0px solid black; font-size: 13px; text-align:center" width="10%">Ukuran kemasan</th>
                <th style="border: 0px solid black; font-size: 13px; text-align:center" width="10%">Jumlah Sak</th>
                <th style="border: 0px solid black; font-size: 13px; text-align:center" width="10%">Total KG</th>
                <th style="border: 0px solid black; font-size: 13px; text-align:center" width="10%">Harga / KG</th>
                <th style="border: 0px solid black; font-size: 13px; text-align:center" width="10%">Total Harga</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($inv as $i => $item)
                <tr class=''>
                    <td class="text-center">{{ $i + 1 }}</td>
                    <td class="text-center">Tambahan {{ $item->produk }}</td>
                    <td class="text-center; font-size: 15px" style="text-align: center">{{ $item->kemasan }} Kg</td>
                    <td class="text-center; font-size: 15px" style="text-align: center">{{ $item->jml_sak }}</td>
                    <td class="text-center; font-size: 15px" style="text-align: center">{{ $item->jml_sak * $item->kemasan }}</td>
                    <td class="text-center; font-size: 15px" style="text-align: center">{{ number_format($item->harga_tambahan) }}</td>
                    <td class="text-center; font-size: 18px"  style="text-align: center">{{ number_format($item->total_harga_tambahan) }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>

    <!-- TOTAL -->
    <table class="tbl-total">
        <tr>
            <td width="70%"><strong></strong></td>
            <td width="90" style="border: 1px solid black; border-left: none;
            border-right: none; text-align:center">
                <strong>TOTAL</strong>
            </td>
            <td width="10"
                style="border: 1px solid black; border-left: none;
            border-right: none; text-align:center
           ">
                <strong>Rp </strong>
            </td>
            <td width=""
                style="text-align: center;  border: 1px solid black; border-left: none;
            border-right: none;">
                <strong>{{ number_format($grand_total) }}</strong>
            </td>
        </tr>
    </table>

    <!-- REKENING -->
    <div class="section" style="font-weight: bold">
        <strong>Nomor Rekening :</strong><br>
        <table>
            <tr style="border: 0px solid black;">
                <td width="100%"> Bank BCA : 1909277777 a.n. PT Sinar Aneka Niaga</td>
                <td width="70%"> Bank Mandiri : 1400087886686 a.n. PT Sinar Aneka Niaga</td>
            </tr>
        </table>
    </div>

    <!-- KETERANGAN -->
    <div class="section" style="font-weight: bold">
        <strong>Keterangan :</strong><br>
        - Pembayaran dinyatakan LUNAS apabila dana telah masuk ke rekening kami.<br>
        - Barang yang sudah dibeli tidak dapat dikembalikan.<br>
        - Cek / Giro hanya tertuju pada Bank BCA.
    </div>

    <!-- TTD -->
      <br>
      <br/>
      <br/>
      
    <table style="border: 0px solid black; font-weight:bold">
        <tr>
            <td width="15%" style="border: 0px solid black; text-align: center">
                Hormat Kami,<br><br><br><br><br><br>
                (__________________)
            </td>
            <td width="50%">

            </td>

            <td width="15%" style="border: 0px solid black; text-align: center">
                Penerima,<br><br><br><br><br><br>
                (__________________)
            </td>
        </tr>
    </table>

</body>

</html>
