<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class CkeditorImageUploadController extends Controller
{
    public function upload(Request $request)
    {
        if ($request->hasFile('upload')) {
            $file = $request->file('upload');
            $destinationPath = $_SERVER['DOCUMENT_ROOT'].'/img/sejarah';

            if (!file_exists($destinationPath)) {
                mkdir($destinationPath, 0755, true);
            }

            $fileName = time().'_'.uniqid().'.'.$file->getClientOriginalExtension();
            $file->move($destinationPath, $fileName);

            $url = asset('img/sejarah/'.$fileName);

            return response()->json([
                'url' => $url
            ]);
        }

        return response()->json(['error' => 'No file uploaded'], 400);
    }
}
