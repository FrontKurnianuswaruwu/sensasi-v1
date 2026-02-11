<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\AkademikMahasiswa;
use App\Models\BiodataMahasiswa;
use App\Models\DokumenMahasiswa;
use App\Models\Mitra;
use App\Models\OrangtuaMahasiswa;
use App\Models\TahunAkademik;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BiodatamahasiswaController extends Controller
{
    protected $nameuser;
    protected $userstatus;

    public function __construct()
    {
        $this->nameuser = auth()->user()->name;
        $this->userstatus = auth()->user()->status_user;
    }
    public function index()
    {
        $nameuser = $this->nameuser;
        $userstatus = $this->userstatus;
        return view('admin.biodatamahasiswa.index', compact('nameuser', 'userstatus'));
    }

    public function getdata(Request $request)
    {
        $id = $request->session()->get('user_id');
        if (!$id) {
            return response()->json([
                'status' => 'error',
                'message' => 'User tidak ditemukan dalam session'
            ], 401);
        }
        $data = User::with('biodataMahasiswa','akademik','orangtua','dokumen')->where('id', $id)->first();

        if(!$data) {
            return response()->json([
                'status' => 'error',
                'message' => 'Data tidak ditemukan'
            ], 404);
        }
        return response()->json([
            'status' => 'success',
            'message' => 'Data berhasil diambil',
            'data' => $data
        ]);
    }

    public function gettahunakademik(Request $request)
    {
        $tahunAkademik = TahunAkademik::select('id','tahun_akademik')->get();

        return response()->json([
            'status' => 'success',
            'data' => $tahunAkademik
        ]);
    }

    public function getmitra(Request $request)
    {
        $mitra = Mitra::select('id','nama_mitra')->get();

        return response()->json([
            'status' => 'success',
            'data' => $mitra
        ]);
    }

    public function update(Request $request)
    {
        $request->validate([
            'foto' => 'nullable|image|mimes:jpg,jpeg,png|max:500'
        ], [
            'foto.image' => 'File harus berupa gambar.',
            'foto.mimes' => 'Format gambar harus jpg, jpeg, atau png.',
            'foto.max' => 'Ukuran gambar maksimal 500KB.'
        ]);

        $id = $request->session()->get('user_id');
        if (!$id) {
            return response()->json([
                'status' => 'error',
                'message' => 'User tidak ditemukan dalam session'
            ], 401);
        }
        $user = User::find($id);
        $biodata = BiodataMahasiswa::where('user_id', $id)->first();

        if (!$biodata) {
            return response()->json([
                'status' => 'error',
                'message' => 'Biodata tidak ditemukan'
            ], 404);
        }

        if ($request->nim) {
            $cekNim = BiodataMahasiswa::where('nim', trim($request->nim))
                ->where('user_id', '!=', $id)
                ->whereNotNull('nim')
                ->first();

            if ($cekNim) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'NIM sudah digunakan oleh mahasiswa lain'
                ], 400);
            }
        }

        if ($biodata->nik != $request->nik) {
            $cekNik = BiodataMahasiswa::where('nik', $request->nik)->first();
            if ($cekNik) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'NIK sudah digunakan'
                ], 400);
            }
        }
        $user->name = $request->nama;
        $biodata->nik = $request->nik;
        $biodata->tempat_lahir = $request->tempat_lahir;
        $biodata->tanggal_lahir = $request->tanggal_lahir;
        $biodata->jenis_kelamin = $request->jenis_kelamin;
        $biodata->agama = $request->agama;
        $biodata->alamat_ktp = $request->alamat_ktp;
        $biodata->no_wa = $request->no_wa;
        $biodata->status_pernikahan = $request->status_pernikahan;
        $biodata->nim = $request->nim;
        $biodata->jumlah_saudara = $request->jumlah_saudara;
        $biodata->anak_ke = $request->anak_ke;

        if ($request->hasFile('foto')) {
            $file = $request->file('foto');

            $destinationPath = $_SERVER['DOCUMENT_ROOT'].'/img/mahasiswa';
            if (!file_exists($destinationPath)) {
                mkdir($destinationPath, 0755, true);
            }

            if ($biodata->foto) {
                $oldFotoPath = $_SERVER['DOCUMENT_ROOT'].'/'.$biodata->foto;
                if (file_exists($oldFotoPath)) {
                    unlink($oldFotoPath);
                }
            }

            $filename = time() . '_' . $file->getClientOriginalName();
            $file->move($destinationPath, $filename);

            $biodata->foto = 'img/mahasiswa/' . $filename;
        }

        $biodata->save();
        $user->save();

        return response()->json([
            'status' => 'success',
            'message' => 'Biodata berhasil diperbarui',
            'data' => $biodata
        ]);
    }
    public function updateakademik(Request $request)
    {
        $id = $request->session()->get('user_id');
        if (!$id) {
            return response()->json([
                'status' => 'error',
                'message' => 'User tidak ditemukan dalam session'
            ], 401);
        }

        $akademik = AkademikMahasiswa::where('user_id', $id)->first();
        $user = User::find($id);
        $biodata = BiodataMahasiswa::where('user_id', $id)->first();

        //cek kalo ada nim yang sama maka gak boleh tapi kalo nim dia sama nggak apa apa
        if ($request->nim) {
            $cekNim = BiodataMahasiswa::where('nim', trim($request->nim))
                ->where('user_id', '!=', $id)
                ->whereNotNull('nim')
                ->first();
            if ($cekNim) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'NIM sudah digunakan oleh mahasiswa lain'
                ], 400);
            }
        }


        $isNew = false;
        if (!$akademik) {
            $akademik = new AkademikMahasiswa();
            $akademik->user_id = $id;
            $isNew = true;
        }
        $akademik->tahun_akademik_id = $request->tahun_akademik;
        $akademik->mitra_id = $request->universitas;
        $akademik->fakultas = $request->fakultas;
        $akademik->program_studi = $request->program_studi;
        $akademik->semester = $request->semester;
        $akademik->ip_terakhir = $request->ip_terakhir;
        $biodata->nim = $request->nim;

        $akademik->save();
        $biodata->save();

        return response()->json([
            'status' => 'success',
            'message' => $isNew ? 'Akademik berhasil dibuat' : 'Akademik berhasil diperbarui',
            'data' => $akademik
        ]);
    }
    public function updateorangtua(Request $request)
    {
        $id = $request->session()->get('user_id');
        if (!$id) {
            return response()->json([
                'status' => 'error',
                'message' => 'Orangtua tidak ditemukan dalam session'
            ], 401);
        }

        $orangtua = OrangtuaMahasiswa::where('user_id', $id)->first();
        $isNew = false;
        if (!$orangtua) {
            $orangtua = new OrangtuaMahasiswa();
            $orangtua->user_id = $id;
            $isNew = true;
        }

        $orangtua->nama_ayah = $request->nama_ayah;
        $orangtua->pekerjaan_ayah = $request->pekerjaan_ayah;
        $orangtua->pendidikan_ayah = $request->pendidikan_ayah;
        $orangtua->penghasilan_ayah = $request->penghasilan_ayah;
        $orangtua->nama_ibu = $request->nama_ibu;
        $orangtua->pekerjaan_ibu = $request->pekerjaan_ibu;
        $orangtua->pendidikan_ibu = $request->pendidikan_ibu;
        $orangtua->penghasilan_ibu = $request->penghasilan_ibu;
        $orangtua->jumlah_tanggungan = $request->jumlah_tanggungan;
        $orangtua->no_wa_ortu = $request->no_wa_ortu;

        $orangtua->save();    

        return response()->json([
            'status' => 'success',
            'message' => $isNew ? 'Orangtua berhasil dibuat' : 'Orangtua berhasil diperbarui',
            'data' => $orangtua
        ]);
    }
    public function updatedokumen(Request $request)
    {
        $id = $request->session()->get('user_id');
        if (!$id) {
            return response()->json([
                'status' => 'error',
                'message' => 'User tidak ditemukan dalam session'
            ], 401);
        }

        $fields = [
            'scan_ktp', 'scan_kartu_mahasiswa', 'scan_kk', 'transkrip_nilai',
            'surat_keterangan_aktif', 'foto_profil', 'essay_motivasi', 'sertifikat_prestasi'
        ];

        $rules = [];
        $messages = [];
        foreach ($fields as $field) {
            $rules[$field] = $field === 'foto_profil' 
                ? 'nullable|image|mimes:jpg,jpeg,png|max:500' 
                : 'nullable|mimes:pdf|max:500';
            
            $messages[$field . '.max'] = 'File ' . str_replace('_', ' ', $field) . ' tidak boleh lebih dari 500 KB.';
        }

        $validator = Validator::make($request->all(), $rules, $messages);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => $validator->errors()->first()
            ], 422);
        }

        $dokumen = DokumenMahasiswa::where('user_id', $id)->first();
        $isNew = false;
        if (!$dokumen) {
            $dokumen = new DokumenMahasiswa();
            $dokumen->user_id = $id;
            $isNew = true;
        }

        foreach ($fields as $field) {
            if ($request->hasFile($field)) {
                if (!empty($dokumen->$field)) {
                    $oldFilePath = $_SERVER['DOCUMENT_ROOT'].'/'.$dokumen->$field;
                    if (file_exists($oldFilePath)) {
                        unlink($oldFilePath);
                    }
                }

                $file = $request->file($field);
                $ext = $field === 'foto_profil' ? $file->getClientOriginalExtension() : 'pdf';
                $folder = 'pdf/dokumen/';
                $destinationPath = $_SERVER['DOCUMENT_ROOT'].'/'.$folder;

                if (!file_exists($destinationPath)) {
                    mkdir($destinationPath, 0755, true);
                }

                $filename = $id.'_'.$field.'_'.time().'.'.$ext;
                $file->move($destinationPath, $filename);
                $dokumen->$field = $folder.$filename;
            }
        }

        $user = User::find($id);
        if ($user->status_user == 'Biodata') {
            $user->status_user = 'Potensi Akademik';
            $user->save();
        }

        $dokumen->save();

        return response()->json([
            'status' => 'success',
            'message' => $isNew ? 'Dokumen berhasil diunggah' : 'Dokumen berhasil diperbarui',
            'data' => $dokumen
        ]);
    }

    public function detailMahasiswa($id)
    {
        $biodata = BiodataMahasiswa::with(['user', 'user.akademik', 'user.orangtua', 'user.dokumen', 'mitra', 'hasilujian', 'hasilujian.kategoriSoal'])->where('id', $id)->first();

        if (!$biodata) {
            return response()->json([
                'status' => 'error',
                'message' => 'Data mahasiswa tidak ditemukan.'
            ], 404);
        }

        return response()->json($biodata);
    }
}
