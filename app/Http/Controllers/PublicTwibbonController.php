<?php

namespace App\Http\Controllers;

use App\Models\Twibbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class PublicTwibbonController extends Controller
{
    public function index()
    {
        $twibbons = Twibbon::where('status', 'published')
            ->orderBy('created_at', 'desc')
            ->paginate(12);

        return view('twibbon.index', compact('twibbons'));
    }

    public function create()
    {
        return view('twibbon.create');
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:twibbons,slug',
            'description' => 'nullable|string|max:1000',
            'template_image' => 'required|image|mimes:png,jpg,jpeg|max:2048',
        ], [
            'title.required' => 'Judul twibbon wajib diisi.',
            'template_image.required' => 'Template twibbon wajib diupload.',
            'template_image.image' => 'File template harus berupa gambar.',
            'template_image.max' => 'Ukuran template maksimal 2MB.',
            'slug.unique' => 'Link twibbon sudah digunakan, gunakan link lain.',
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        $template = $request->file('template_image');
        $templateName = time() . '_' . Str::random(8) . '.' . $template->getClientOriginalExtension();
        $destinationPath = $_SERVER['DOCUMENT_ROOT'] . '/' . 'img/twibbon';

        if (!file_exists($destinationPath)) {
            mkdir($destinationPath, 0755, true);
        }

        $template->move($destinationPath, $templateName);

        $slug = $request->slug ? Str::slug($request->slug) : Str::slug($request->title);
        $originalSlug = $slug;
        $count = 1;

        while (Twibbon::where('slug', $slug)->exists()) {
            $slug = $originalSlug . '-' . $count;
            $count++;
        }

        $twibbon = Twibbon::create([
            'user_id' => auth()->check() ? auth()->id() : null,
            'title' => $request->title,
            'slug' => $slug,
            'description' => $request->description,
            'template_image' => 'img/twibbon/' . $templateName,
            'status' => 'published',
        ]);

        return redirect()->route('twibbon.show', $twibbon->slug)
            ->with('success', 'Twibbon berhasil dibuat. Link sudah bisa dibagikan.');
    }

    public function show($slug)
    {
        $twibbon = Twibbon::where('slug', $slug)
            ->where('status', 'published')
            ->firstOrFail();

        $twibbon->incrementViews();

        return view('twibbon.show', compact('twibbon'));
    }

    public function incrementDownload($slug)
    {
        $twibbon = Twibbon::where('slug', $slug)
            ->where('status', 'published')
            ->firstOrFail();

        $twibbon->incrementDownloads();

        return response()->json(['status' => 'success']);
    }
}
