<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Program;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;

class ProgramController extends Controller
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

        return view('admin.programs.index', compact('nameuser', 'userstatus'));
    }

    public function getdata(Request $request)
    {
        $search = $request->input('search');
        $page   = $request->input('page', 1);
        $limit  = $request->input('limit', 10);

        $query = Program::select('id', 'name', 'start_date', 'end_date');

        // filter search (kalau ada)
        if (!empty($search)) {
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%");
            });
        }

        // pagination
        $program = $query->paginate($limit, ['*'], 'page', $page);

        return response()->json([
            'data' => $program->items(),
            'total' => $program->total(),
            'current_page' => $program->currentPage(),
            'last_page' => $program->lastPage()
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name'        => 'required|string|max:255',
            'description' => 'nullable|string',
            'startdate'   => 'nullable|date',
            'enddate'     => 'nullable|date|after_or_equal:startdate',
            'gambar'      => 'nullable|image|mimes:jpg,jpeg,png,gif|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $imagePath = null;

        if ($request->hasFile('gambar')) {
            $image      = $request->file('gambar');
            $imageName  = time() . '.' . $image->getClientOriginalExtension();
            $destinationPath = $_SERVER['DOCUMENT_ROOT'].'/'.'img/program';
            $image->move($destinationPath, $imageName);
            $imagePath = 'img/program/' . $imageName;
        } else {
            $imagePath = $request->oldImage;
        }

        $program = Program::create([
            'name'        => $request->name,
            'description' => $request->description,
            'start_date'  => $request->startdate, 
            'end_date'    => $request->enddate, 
            'gambar'       => $imagePath,
        ]);

        return response()->json([
            'status'  => 'success',
            'message' => 'Program berhasil ditambahkan',
            'program' => $program
        ], 201);
    }

    public function show($id)
    {
        $program = Program::find($id);
        if (!$program) {
            return response()->json(['message' => 'Program tidak ditemukan'], 404);
        }

        return response()->json($program);
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'name'        => 'required|string|max:255',
            'description' => 'nullable|string',
            'startdate'   => 'nullable|date',
            'enddate'     => 'nullable|date|after_or_equal:startdate',
            'gambar'      => 'nullable|image|mimes:jpg,jpeg,png,gif|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $program = Program::findOrFail($id);

        $imagePath = $program->gambar;

        if ($request->hasFile('gambar')) {
            if ($program->gambar) {
                $oldGambar = $_SERVER['DOCUMENT_ROOT'].'/'.$program->gambar;
                if (file_exists($oldGambar)) {
                    unlink($oldGambar);
                }
            }

            $image      = $request->file('gambar');
            $imageName  = time() . '.' . $image->getClientOriginalExtension();
            $destinationPath = public_path('img/program');
            $image->move($destinationPath, $imageName);

            $imagePath = 'img/program/' . $imageName;
        }

        $program->update([
            'name'        => $request->name,
            'description' => $request->description,
            'start_date'  => $request->startdate,
            'end_date'    => $request->enddate,
            'gambar'      => $imagePath,
        ]);

        return response()->json([
            'status'  => 'success',
            'message' => 'Program berhasil diperbarui',
            'program' => $program
        ], 200);
    }

    public function deleteImage(Request $request)
    {
        $program = Program::find($request->id);
        if (!$program) {
            return response()->json(['success' => false, 'message' => 'Data tidak ditemukan']);
        }

        if ($program->gambar) {
            $oldGambar = $_SERVER['DOCUMENT_ROOT'].'/'.$program->gambar;
            if (file_exists($oldGambar)) {
                unlink($oldGambar);
            }
        }

        $program->gambar = null;
        $program->save();

        return response()->json(['success' => true, 'message' => 'Gambar berhasil dihapus']);
    }

    public function delete($id)
    {
        $program = Program::find($id);

        if (!$program) {
            return response()->json([
                'status' => 'error',
                'message' => 'Program tidak ditemukan'
            ], 404);
        }

        if ($program->gamba) {
            $oldGambar = $_SERVER['DOCUMENT_ROOT'].'/'.$program->gambar;
            if (file_exists($oldGambar)) {
                unlink($oldGambar);
            }
        }

        $program->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Data Program dan gambar berhasil dihapus'
        ], 200);
    }

}
