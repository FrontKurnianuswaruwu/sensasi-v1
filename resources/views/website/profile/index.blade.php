@extends('layouts.website')
@section('content')
@section('title', 'Profile Sensasi')

<!-- Profile Section -->
<section id="profile" class="py-20 px-4 bg-white">
    <style>
        .profile-rich-content {
            overflow: hidden;
            word-break: break-word;
            overflow-wrap: anywhere;
        }

        .profile-rich-content::after {
            content: "";
            display: block;
            clear: both;
        }

        .profile-rich-content img,
        .profile-rich-content img[style],
        .profile-rich-content img[width],
        .profile-rich-content img[height] {
            display: inline-block !important;
            float: left !important;
            clear: none !important;
            max-width: min(100%, 420px) !important;
            width: auto !important;
            height: auto !important;
            max-height: 520px;
            object-fit: contain;
            margin: 0.35rem 1rem 1rem 0 !important;
            border-radius: 0.5rem;
            box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        }

        .profile-rich-content p,
        .profile-rich-content div,
        .profile-rich-content span {
            max-width: 100%;
            word-break: break-word;
            overflow-wrap: anywhere;
        }

        @media (max-width: 768px) {
            .profile-rich-content img,
            .profile-rich-content img[style],
            .profile-rich-content img[width],
            .profile-rich-content img[height] {
                float: none !important;
                display: block !important;
                max-width: 100% !important;
                margin: 1rem 0 !important;
            }
        }
    </style>
    <div class="max-w-7xl mx-auto mt-5">
        <div class="text-center mb-12">
            <h2 class="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Profile Sensasi</h2>
            <div class="mt-8 flex items-center justify-center gap-2">
                <div class="w-16 h-0.5 bg-gradient-to-r from-transparent to-blue-500 rounded-full"></div>
                <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div class="w-16 h-0.5 bg-gradient-to-l from-transparent to-blue-500 rounded-full"></div>
            </div>
        </div>

        <!-- Pesan Founder -->
        @if($datapesanfounder)
        <div class="mb-24 animate-fade-in">
            <div class="mb-8">
                <h3 class="text-2xl md:text-3xl font-semibold text-gray-900">Pesan Founder</h3>
                <p class="text-sm text-gray-500 mt-1">Insight dan motivasi dari pendiri SENSASI</p>
            </div>

            <div class="bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg border border-slate-200 p-6 md:p-8 overflow-hidden">
                <div class="profile-rich-content prose prose-sm md:prose-base max-w-none prose-p:text-gray-700 prose-p:leading-relaxed">
                    <style>
                        .prose {
                            --tw-prose-body: rgb(55 65 81);
                            --tw-prose-headings: rgb(17 24 39);
                        }
                        .prose img,
                        .prose img[style],
                        .prose img[width],
                        .prose img[height] {
                            max-width: min(100%, 420px) !important;
                            width: auto !important;
                            height: auto !important;
                            border-radius: 0.5rem;
                            margin: 0.35rem 1rem 1rem 0 !important;
                            box-shadow: 0 2px 8px rgba(0,0,0,0.08);
                            display: inline-block !important;
                            float: left !important;
                        }
                        .prose p {
                            margin-bottom: 1rem;
                        }
                        .prose ul, .prose ol {
                            margin: 1rem 0;
                        }
                    </style>
                    {!! $datapesanfounder->deskripsi !!}
                </div>
            </div>
        </div>
        @endif

        <!-- Sejarah -->
        <div class="mb-24 animate-fade-in">
            <div class="mb-8">
                <h3 class="text-2xl md:text-3xl font-semibold text-gray-900">Sejarah</h3>
                <p class="text-sm text-gray-500 mt-1">Perjalanan dan latar belakang organisasi</p>
            </div>

            <div class="bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg border border-slate-200 p-6 md:p-8 overflow-hidden">
                <div class="profile-rich-content prose prose-sm md:prose-base max-w-none prose-p:text-gray-700 prose-p:leading-relaxed">
                    <style>
                        .prose {
                            --tw-prose-body: rgb(55 65 81);
                            --tw-prose-headings: rgb(17 24 39);
                        }
                        .prose img,
                        .prose img[style],
                        .prose img[width],
                        .prose img[height] {
                            max-width: min(100%, 420px) !important;
                            width: auto !important;
                            height: auto !important;
                            border-radius: 0.5rem;
                            margin: 0.35rem 1rem 1rem 0 !important;
                            box-shadow: 0 2px 8px rgba(0,0,0,0.08);
                            display: inline-block !important;
                            float: left !important;
                        }
                        .prose p {
                            margin-bottom: 1rem;
                        }
                        .prose ul, .prose ol {
                            margin: 1rem 0;
                        }
                    </style>
                    {!! $datasejarah->deskripsi !!}
                </div>
            </div>
        </div>

        <!-- Visi Misi -->
        <div class="mb-20 bg-gradient-to-r from-sky-50 to-blue-50 p-8 md:p-12 rounded-2xl">
            <div class="grid md:grid-cols-2 gap-12">
                <div>
                    <h3 class="text-3xl font-bold text-gray-800 mb-6">Visi</h3>
                    <p class="text-gray-700 text-lg leading-relaxed">
                        {{ strip_tags($datavisimisi->visi) }}
                    </p>
                </div>
                <div>
                    <h3 class="text-3xl font-bold text-gray-800 mb-6">Misi</h3>
                    <ul class="space-y-4 list-disc">
                       {!! $datavisimisi->misi !!}
                    </ul>
                </div>
            </div>
        </div>

        <!-- Pengurus -->
        <div>
            <h3 class="text-3xl font-bold text-gray-800 mb-8 text-center">Tim Pengurus</h3>
            <div class="flex flex-wrap justify-center gap-8">
                @foreach ($datapengurus as $pengurus)
                    <div class="card-hover bg-white rounded-xl shadow-lg overflow-hidden w-full sm:w-[calc(50%-2rem)] lg:w-[calc(25%-2rem)] min-w-[260px]">
                        <div class="bg-gray-200 h-64 flex items-center justify-center">
                            <img src="{{ $pengurus->foto }}" alt="{{ $pengurus->nama }}" class="w-full h-full object-cover">
                        </div>
                        <div class="p-6 text-center"> <h4 class="font-bold text-xl text-gray-800 mb-1">{{ $pengurus->nama }}</h4>
                            <p class="text-sky-600 font-medium mb-3">{{ $pengurus->jabatan }}</p>
                        </div>
                    </div>
                @endforeach
            </div>
        </div>
    </div>
</section>

@endsection