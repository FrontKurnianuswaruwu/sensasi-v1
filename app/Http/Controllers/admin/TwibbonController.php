<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Twibbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class TwibbonController extends Controller
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
        return view('admin.twibbon.index', compact('nameuser', 'userstatus'));
    }

    public function getdata(Request $request)
    {
        $search = $request->input('search');
        $page   = $request->input('page', 1);
        $limit  = $request->input('limit', 10);

        $query = Twibbon::select('id', 'title', 'slug', 'status', 'view_count', 'download_count', 'created_at')
            ->with('user:id,name');

        if (!empty($search)) {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('slug', 'like', "%{$search}%");
            });
        }

        $query->orderBy('created_at', 'desc');

        $result = $query->paginate($limit, ['*'], 'page', $page);

        return response()->json([
            'data' => $result->items(),
            'total' => $result->total(),
            'current_page' => $result->currentPage(),
            'last_page' => $result->lastPage()
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:twibbons,slug',
            'description' => 'nullable|string',
            'template_image' => 'required|image|mimes:png,jpg,jpeg|max:2048',
            'status' => 'required|in:draft,published',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $templatePath = null;

        if ($request->hasFile('template_image')) {
            $template = $request->file('template_image');
            $templateName = time() . '.' . $template->getClientOriginalExtension();
            $destinationPath = $_SERVER['DOCUMENT_ROOT'] . '/' . 'img/twibbon';

            if (!file_exists($destinationPath)) {
                mkdir($destinationPath, 0755, true);
            }

            $template->move($destinationPath, $templateName);
            $templatePath = 'img/twibbon/' . $templateName;
        }

        $slug = $request->slug ?: Str::slug($request->title);

        // Cek jika slug sudah ada, tambahkan angka
        $originalSlug = $slug;
        $count = 1;
        while (Twibbon::where('slug', $slug)->exists()) {
            $slug = $originalSlug . '-' . $count;
            $count++;
        }

        $twibbon = Twibbon::create([
            'user_id' => auth()->id(),
            'title' => $request->title,
            'slug' => $slug,
            'description' => $request->description,
            'template_image' => $templatePath,
            'status' => $request->status,
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Twibbon berhasil ditambahkan',
            'data' => $twibbon
        ], 201);
    }

    public function show($id)
    {
        $twibbon = Twibbon::with('user:id,name')->find($id);

        if (!$twibbon) {
            return response()->json(['message' => 'Twibbon tidak ditemukan'], 404);
        }

        return response()->json($twibbon);
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:twibbons,slug,' . $id,
            'description' => 'nullable|string',
            'template_image' => 'nullable|image|mimes:png,jpg,jpeg|max:2048',
            'status' => 'required|in:draft,published',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $twibbon = Twibbon::findOrFail($id);

        $templatePath = $twibbon->template_image;

        if ($request->hasFile('template_image')) {
            // Hapus file lama
            if ($twibbon->template_image) {
                $oldTemplate = $_SERVER['DOCUMENT_ROOT'] . '/' . $twibbon->template_image;
                if (file_exists($oldTemplate)) {
                    unlink($oldTemplate);
                }
            }

            $template = $request->file('template_image');
            $templateName = time() . '.' . $template->getClientOriginalExtension();
            $destinationPath = $_SERVER['DOCUMENT_ROOT'] . '/' . 'img/twibbon';

            if (!file_exists($destinationPath)) {
                mkdir($destinationPath, 0755, true);
            }

            $template->move($destinationPath, $templateName);
            $templatePath = 'img/twibbon/' . $templateName;
        }

        $slug = $request->slug ?: Str::slug($request->title);

        // Cek jika slug sudah ada (kecuali milik sendiri)
        $originalSlug = $slug;
        $count = 1;
        while (Twibbon::where('slug', $slug)->where('id', '!=', $id)->exists()) {
            $slug = $originalSlug . '-' . $count;
            $count++;
        }

        $twibbon->update([
            'title' => $request->title,
            'slug' => $slug,
            'description' => $request->description,
            'template_image' => $templatePath,
            'status' => $request->status,
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Twibbon berhasil diperbarui',
            'data' => $twibbon
        ], 200);
    }

    public function delete($id)
    {
        $twibbon = Twibbon::find($id);

        if (!$twibbon) {
            return response()->json([
                'status' => 'error',
                'message' => 'Twibbon tidak ditemukan'
            ], 404);
        }

        // Hapus file template
        if ($twibbon->template_image) {
            $templatePath = $_SERVER['DOCUMENT_ROOT'] . '/' . $twibbon->template_image;
            if (file_exists($templatePath)) {
                unlink($templatePath);
            }
        }

        $twibbon->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Twibbon berhasil dihapus'
        ], 200);
    }

    public function deleteTemplate(Request $request)
    {
        $twibbon = Twibbon::find($request->id);

        if (!$twibbon) {
            return response()->json([
                'success' => false,
                'message' => 'Data tidak ditemukan'
            ]);
        }

        if ($twibbon->template_image) {
            $templatePath = $_SERVER['DOCUMENT_ROOT'] . '/' . $twibbon->template_image;
            if (file_exists($templatePath)) {
                unlink($templatePath);
            }
        }

        $twibbon->template_image = null;
        $twibbon->save();

        return response()->json([
            'success' => true,
            'message' => 'Template berhasil dihapus'
        ]);
    }
}
