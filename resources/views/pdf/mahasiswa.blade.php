<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="utf-8">
    <title>Biodata Mahasiswa</title>
    <style>
        /* Setup Dasar */
        body { 
            font-family: 'Helvetica', 'Arial', sans-serif; 
            font-size: 12px; 
            color: #334155; 
            line-height: 1.5;
            margin: 0;
            padding: 20px;
            background-color: #fff;
        }

        /* Header / Judul */
        .header {
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 3px solid #1D4ED8;
            padding-bottom: 10px;
        }
        .header h1 { 
            margin: 0; 
            color: #1D4ED8; 
            font-size: 24px; 
            text-transform: uppercase;
        }
        .header p { margin: 5px 0 0; color: #64748b; font-size: 14px; }

        /* Pengaturan Section */
        h2 { 
            background-color: #f1f5f9;
            color: #1e40af; 
            font-size: 14px;
            padding: 8px 12px;
            border-left: 4px solid #1D4ED8;
            margin-top: 20px;
            margin-bottom: 15px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        /* Grid System (Simulasi untuk PDF) */
        .row { width: 100%; display: block; clear: both; margin-bottom: 10px; }
        .col { float: left; width: 50%; padding-bottom: 8px; }
        .clear { clear: both; }

        /* Styling Label & Value */
        .field { margin-bottom: 8px; border-bottom: 1px dotted #e2e8f0; padding-bottom: 4px; margin-right: 15px; }
        .label { 
            font-weight: 600; 
            color: #64748b; 
            display: block; 
            font-size: 10px; 
            text-transform: uppercase;
        }
        .value { 
            color: #1e293b; 
            font-size: 12px; 
            font-weight: 500;
            display: block;
        }

        /* Badge untuk status/IPK */
        .badge {
            background-color: #dbeafe;
            color: #1e40af;
            padding: 2px 8px;
            border-radius: 4px;
            font-weight: bold;
        }

        /* Footer */
        .footer {
            margin-top: 40px;
            text-align: right;
            font-size: 10px;
            color: #94a3b8;
            border-top: 1px solid #e2e8f0;
            padding-top: 10px;
        }
        .table { 
            width: 100%; 
            border-collapse: collapse; 
            margin-top: 10px; 
            background-color: #fff;
        }
        .table th { 
            background-color: #f8fafc; 
            color: #475569; 
            font-size: 10px; 
            text-transform: uppercase; 
            padding: 10px; 
            border: 1px solid #e2e8f0;
        }
        .table td { 
            padding: 8px 10px; 
            border: 1px solid #e2e8f0; 
            font-size: 11px; 
            vertical-align: middle;
        }
        .table tr:nth-child(even) { background-color: #fcfcfc; }
        .keep-together {
            page-break-inside: avoid;
        }

        .new-page-if-needed {
            margin-top: 30px;
        }
    </style>
</head>
<body>

    <div class="header">
        <h1>Biodata Mahasiswa</h1>
        <p>Sistem Informasi Akademik & Data Mahasiswa</p>
    </div>

    <h2><span style="margin-right: 8px;"></span> Data Pribadi</h2>
    <div class="row">
        <div class="col">
            <div class="field"><span class="label">Nama Lengkap</span> <span class="value">{{ optional($biodata->user)->name ?? '-' }}</span></div>
            <div class="field"><span class="label">NIM</span> <span class="value">{{ $biodata->nim ?? '-' }}</span></div>
            <div class="field"><span class="label">NIK</span> <span class="value">{{ $biodata->nik ?? '-' }}</span></div>
            <div class="field"><span class="label">Jenis Kelamin</span> <span class="value">{{ $biodata->jenis_kelamin ?? '-' }}</span></div>
            <div class="field"><span class="label">Tempat, Tanggal Lahir</span> <span class="value">{{ $biodata->tempat_lahir ?? '-' }}, {{ $biodata->tgl_lahir ?? '-' }}</span></div>
        </div>
        <div class="col">
            <div class="field"><span class="label">Email</span> <span class="value">{{ optional($biodata->user)->email ?? '-' }}</span></div>
            <div class="field"><span class="label">No. Telepon / WA</span> <span class="value">{{ $biodata->no_wa ?? '-' }}</span></div>
            <div class="field"><span class="label">Status Perkawinan</span> <span class="value">{{ $biodata->status_perkawinan ?? '-' }}</span></div>
            <div class="field"><span class="label">Anak ke / Dari</span> <span class="value">{{ $biodata->anak_ke ?? '-' }} dari {{ $biodata->jumlah_saudara ?? '-' }} bersaudara</span></div>
            <div class="field"><span class="label">Alamat KTP</span> <span class="value">{{ $biodata->alamat_ktp ?? '-' }}</span></div>
        </div>
    </div>
    <div class="clear"></div>

    <h2><span style="margin-right: 8px;"></span> Data Akademik</h2>
    <div class="row">
        <div class="col">
            <div class="field"><span class="label">Universitas / Mitra</span> <span class="value">{{ optional(optional($biodata->user)->akademik)->mitra->nama_mitra ?? '-' }}</span></div>
            <div class="field"><span class="label">Fakultas</span> <span class="value">{{ optional(optional($biodata->user)->akademik)->fakultas ?? '-' }}</span></div>
            <div class="field"><span class="label">Program Studi</span> <span class="value">{{ optional(optional($biodata->user)->akademik)->program_studi ?? '-' }}</span></div>
        </div>
        <div class="col">
            <div class="field"><span class="label">Semester Saat Ini</span> <span class="value"><span class="badge">Semester {{ optional(optional($biodata->user)->akademik)->semester ?? '-' }}</span></span></div>
            <div class="field"><span class="label">IP Terakhir</span> <span class="value"><span class="badge" style="background-color: #fef3c7; color: #92400e;">{{ optional(optional($biodata->user)->akademik)->ip_terakhir ?? '0.00' }}</span></span></div>
        </div>
    </div>
    <div class="clear"></div>

    <h2><span style="margin-right: 8px;"></span> Data Orang Tua</h2>
    <div class="row">
        <div class="col">
            <div style="font-weight: bold; margin-bottom: 10px; color: #475569;">Data Ayah</div>
            <div class="field"><span class="label">Nama Ayah</span> <span class="value">{{ optional(optional($biodata->user)->orangtua)->nama_ayah ?? '-' }}</span></div>
            <div class="field"><span class="label">Pekerjaan</span> <span class="value">{{ optional(optional($biodata->user)->orangtua)->pekerjaan_ayah ?? '-' }}</span></div>
            <div class="field"><span class="label">Pendidikan</span> <span class="value">{{ optional(optional($biodata->user)->orangtua)->pendidikan_ayah ?? '-' }}</span></div>
            <div class="field"><span class="label">Penghasilan</span> 
                <span class="value">{{ optional(optional($biodata->user)->orangtua)->penghasilan_ayah ? 'Rp ' . number_format(optional($biodata->user)->orangtua->penghasilan_ayah, 0, ',', '.') : '-' }}</span>
            </div>
        </div>
        <div class="col">
            <div style="font-weight: bold; margin-bottom: 10px; color: #475569;">Data Ibu</div>
            <div class="field"><span class="label">Nama Ibu</span> <span class="value">{{ optional(optional($biodata->user)->orangtua)->nama_ibu ?? '-' }}</span></div>
            <div class="field"><span class="label">Pekerjaan</span> <span class="value">{{ optional(optional($biodata->user)->orangtua)->pekerjaan_ibu ?? '-' }}</span></div>
            <div class="field"><span class="label">Pendidikan</span> <span class="value">{{ optional(optional($biodata->user)->orangtua)->pendidikan_ibu ?? '-' }}</span></div>
            <div class="field"><span class="label">Penghasilan</span> 
                <span class="value">{{ optional(optional($biodata->user)->orangtua)->ibu_penghasilan ? 'Rp ' . number_format(optional($biodata->user)->orangtua->penghasilan_ibu, 0, ',', '.') : '-' }}</span>
            </div>
        </div>
    </div>
    <div class="clear"></div>
    <div class="field" style="margin-top: 10px;"><span class="label">No. Telp Orang Tua</span> <span class="value">{{ optional(optional($biodata->user)->orangtua)->no_wa_ortu ?? '-' }}</span></div>

    <div class="clear"></div>
    <div class="keep-together new-page-if-needed">
        <h2><span style="margin-right: 8px;"></span> Potensi Akademik (Hasil Ujian)</h2>
        <div class="section">
            <table class="table">
                <thead>
                    <tr>
                        <th style="text-align: left; width: 40%;">Kategori Ujian</th>
                        <th style="text-align: center;">Benar</th>
                        <th style="text-align: center;">Salah</th>
                        <th style="text-align: center;">Skor/Persentase</th>
                        <th style="text-align: center;">Tanggal</th>
                    </tr>
                </thead>
                <tbody>
                    @forelse(optional($biodata)->hasilUjian ?? [] as $ujian)
                    <tr>
                        <td style="text-align: left;">{{ $ujian->kategoriSoal->name ?? '-' }}</td>
                        <td style="text-align: center;">{{ $ujian->jumlah_benar }}</td>
                        <td style="text-align: center;">{{ $ujian->jumlah_salah }}</td>
                        <td style="text-align: center;">
                            <span class="badge" style="background-color: #ecfdf5; color: #065f46; border: 1px solid #a7f3d0;">
                                {{ number_format(($ujian->jumlah_benar / ($ujian->jumlah_benar + $ujian->jumlah_salah)) * 100, 1) }}%
                            </span>
                        </td>
                        <td style="text-align: center; color: #64748b;">{{ \Carbon\Carbon::parse($ujian->tanggal)->format('d/m/Y') }}</td>
                    </tr>
                    @empty
                    <tr>
                        <td colspan="5" style="text-align: center; color: #94a3b8; padding: 15px;">Belum ada data hasil ujian akademik.</td>
                    </tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </div>

    <div class="footer">
        Dicetak secara otomatis melalui Sistem Biodata Mahasiswa pada {{ date('d/m/Y H:i') }}
    </div>

</body>
</html>