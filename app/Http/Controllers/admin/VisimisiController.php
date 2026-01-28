<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Visimisi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class VisimisiController extends Controller
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
        return view('admin.visimisi.index', compact('nameuser', 'userstatus'));
    }

    public function getdata(Request $request)
    {
        $search = $request->input('search');
        $page   = $request->input('page', 1);
        $limit  = $request->input('limit', 10);

        $query = Visimisi::select('id', 'visi', 'misi');

        // filter search (kalau ada)
        if (!empty($search)) {
            $query->where(function($q) use ($search) {
                $q->where('visi', 'like', "%{$search}%");
            });
        }

        // pagination
        $visimisi = $query->paginate($limit, ['*'], 'page', $page);

        return response()->json([
            'data' => $visimisi->items(),
            'total' => $visimisi->total(),
            'current_page' => $visimisi->currentPage(),
            'last_page' => $visimisi->lastPage()
        ]);
    }

    public function show($id)
    {
        $visimisi = Visimisi::findOrFail($id);
        if (!$visimisi) {
            return response()->json(['message' => 'Visimisi tidak ditemukan'], 404);
        }

        return response()->json($visimisi);
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'visi' => 'nullable|string',
            'misi' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $visimisi = Visimisi::findOrFail($id);

        if (!$visimisi) {
            return response()->json(['message' => 'Visimisi tidak ditemukan'], 404);
        }

        $visimisi->update([
            'visi' => $request->visi,
            'misi' => $request->misi,
        ]);

        return response()->json([
            'status'  => 'success',
            'message' => 'Visimisi berhasil diperbarui',
            'visimisi' => $visimisi
        ], 200);
    }
}
