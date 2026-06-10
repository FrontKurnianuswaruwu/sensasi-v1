<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $twibbon->title }} | Twibbon SENSASI</title>
    <meta name="description" content="{{ $twibbon->description ?: 'Gunakan twibbon ini dan download hasilnya langsung.' }}">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta property="og:title" content="{{ $twibbon->title }}">
    <meta property="og:description" content="{{ $twibbon->description ?: 'Gunakan twibbon ini dan download hasilnya langsung.' }}">
    <meta property="og:image" content="{{ asset($twibbon->template_image) }}">
    <link rel="icon" type="image/png" href="{{ asset('img/logo sensasi.png') }}">
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        #canvasWrap { touch-action: none; }
    </style>
</head>
<body class="bg-[#111827] min-h-screen text-white">
    <nav class="bg-[#151f32] border-b border-white/10 sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
            <a href="{{ route('twibbon.index') }}" class="text-white/80 hover:text-white font-semibold"><i class="fas fa-arrow-left mr-2"></i>Twibbon</a>
            <button id="shareBtn" class="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 font-semibold"><i class="fas fa-share-alt mr-2"></i>Share</button>
        </div>
    </nav>

    <main class="max-w-7xl mx-auto px-4 py-8">
        @if(session('success'))
            <div class="mb-6 rounded-2xl bg-green-500/20 border border-green-400/40 text-green-100 px-5 py-4">
                <i class="fas fa-check-circle mr-2"></i>{{ session('success') }}
            </div>
        @endif

        <div class="grid lg:grid-cols-[1fr_420px] gap-8 items-start">
            <section class="bg-[#182235] rounded-3xl shadow-2xl p-4 md:p-8">
                <div class="max-w-[560px] mx-auto">
                    <div id="canvasWrap" class="relative aspect-square bg-black/30 rounded-3xl overflow-hidden border border-white/10 shadow-inner">
                        <canvas id="twibbonCanvas" class="w-full h-full block"></canvas>
                        <div id="uploadHint" class="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div class="text-center bg-black/50 backdrop-blur px-6 py-5 rounded-2xl">
                                <i class="fas fa-camera text-4xl mb-3 text-cyan-300"></i>
                                <p class="font-bold">Upload fotomu</p>
                                <p class="text-sm text-white/70">Lalu geser dan zoom foto sesuai keinginan.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <aside class="bg-[#182235] rounded-3xl shadow-2xl p-6 md:p-8 sticky top-24">
                <h1 class="text-2xl md:text-3xl font-extrabold mb-3">{{ $twibbon->title }}</h1>
                @if($twibbon->description)
                    <p class="text-white/70 mb-6">{{ $twibbon->description }}</p>
                @else
                    <p class="text-white/70 mb-6">Upload foto, atur posisi dan zoom, lalu download hasil twibbon.</p>
                @endif

                <div class="space-y-4">
                    <label class="block w-full cursor-pointer px-5 py-4 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-gray-950 text-center font-bold transition">
                        <i class="fas fa-camera mr-2"></i> Choose Your Photo
                        <input id="photoInput" type="file" accept="image/*" class="hidden">
                    </label>

                    <div id="controls" class="hidden space-y-4 rounded-2xl bg-white/5 border border-white/10 p-4">
                        <div>
                            <div class="flex items-center justify-between mb-2">
                                <label class="font-semibold text-sm">Zoom Foto</label>
                                <span id="zoomValue" class="text-xs text-white/60">100%</span>
                            </div>
                            <input id="zoomSlider" type="range" min="0.5" max="3" step="0.01" value="1" class="w-full">
                        </div>
                        <div>
                            <div class="flex items-center justify-between mb-2">
                                <label class="font-semibold text-sm">Rotate</label>
                                <span id="rotateValue" class="text-xs text-white/60">0°</span>
                            </div>
                            <input id="rotateSlider" type="range" min="-30" max="30" step="1" value="0" class="w-full">
                        </div>
                        <div class="grid grid-cols-2 gap-3">
                            <button id="resetBtn" class="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 font-semibold"><i class="fas fa-undo mr-2"></i>Reset</button>
                            <button id="centerBtn" class="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 font-semibold"><i class="fas fa-crosshairs mr-2"></i>Center</button>
                        </div>
                    </div>

                    <button id="downloadBtn" disabled class="w-full px-5 py-4 rounded-2xl bg-gray-600 text-white/60 font-bold cursor-not-allowed transition">
                        <i class="fas fa-download mr-2"></i> Download Twibbon
                    </button>

                    <button id="copyLinkBtn" class="w-full px-5 py-4 rounded-2xl bg-white/10 hover:bg-white/20 font-semibold transition">
                        <i class="fas fa-link mr-2"></i> Copy Campaign Link
                    </button>
                </div>

                <div class="mt-8 pt-6 border-t border-white/10 grid grid-cols-2 gap-4 text-sm text-white/60">
                    <div><i class="fas fa-eye mr-2"></i>{{ $twibbon->view_count }} views</div>
                    <div><i class="fas fa-download mr-2"></i>{{ $twibbon->download_count }} downloads</div>
                </div>
            </aside>
        </div>
    </main>

    <div id="toast" class="fixed bottom-6 right-6 px-5 py-3 rounded-2xl bg-green-500 text-white font-semibold shadow-lg hidden z-[9999]"></div>

    <script>
        const templateUrl = @json(asset($twibbon->template_image));
        const downloadTrackUrl = @json(route('twibbon.download', $twibbon->slug));
        const csrfToken = document.querySelector('meta[name="csrf-token"]').content;
        const canvas = document.getElementById('twibbonCanvas');
        const ctx = canvas.getContext('2d');
        const wrap = document.getElementById('canvasWrap');
        const templateImg = new Image();
        templateImg.crossOrigin = 'anonymous';
        templateImg.src = templateUrl;

        let userImg = null;
        let imgX = 0;
        let imgY = 0;
        let baseScale = 1;
        let zoom = 1;
        let rotation = 0;
        let dragging = false;
        let lastX = 0;
        let lastY = 0;
        let emptyArea = null; // {x, y, width, height} area kosong di template

        function setupCanvas() {
            const rect = wrap.getBoundingClientRect();
            const dpr = window.devicePixelRatio || 1;
            canvas.width = Math.round(rect.width * dpr);
            canvas.height = Math.round(rect.height * dpr);
            canvas.style.width = rect.width + 'px';
            canvas.style.height = rect.height + 'px';
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            detectEmptyArea();
            draw();
        }

        function canvasSize() {
            const rect = wrap.getBoundingClientRect();
            return { width: rect.width, height: rect.height };
        }

        // Detect area kosong (transparan) di template
        function detectEmptyArea() {
            if (!templateImg.complete) return;

            const { width, height } = canvasSize();
            const tempCanvas = document.createElement('canvas');
            tempCanvas.width = width;
            tempCanvas.height = height;
            const tempCtx = tempCanvas.getContext('2d');
            tempCtx.drawImage(templateImg, 0, 0, width, height);

            const imageData = tempCtx.getImageData(0, 0, width, height);
            const data = imageData.data;

            let minX = width, maxX = 0, minY = height, maxY = 0;
            let foundEmpty = false;

            // Cari pixel transparan (alpha < 128)
            for (let i = 3; i < data.length; i += 4) {
                if (data[i] < 128) { // Transparan
                    const pixelIndex = (i - 3) / 4;
                    const x = pixelIndex % width;
                    const y = Math.floor(pixelIndex / width);

                    minX = Math.min(minX, x);
                    maxX = Math.max(maxX, x);
                    minY = Math.min(minY, y);
                    maxY = Math.max(maxY, y);
                    foundEmpty = true;
                }
            }

            if (foundEmpty && maxX > minX && maxY > minY) {
                emptyArea = {
                    x: minX,
                    y: minY,
                    width: maxX - minX,
                    height: maxY - minY
                };
                console.log('Empty area detected:', emptyArea);
            } else {
                // Fallback: gunakan center area
                const margin = Math.min(width, height) * 0.1;
                emptyArea = {
                    x: margin,
                    y: margin,
                    width: width - margin * 2,
                    height: height - margin * 2
                };
                console.log('No transparent area found, using fallback center area:', emptyArea);
            }
        }

        function draw() {
            const { width, height } = canvasSize();
            ctx.clearRect(0, 0, width, height);
            ctx.fillStyle = '#0f172a';
            ctx.fillRect(0, 0, width, height);

            if (userImg && emptyArea) {
                const scale = baseScale * zoom;
                const drawW = userImg.width * scale;
                const drawH = userImg.height * scale;

                // Constrain posisi dalam batas emptyArea
                const minX = emptyArea.x;
                const maxX = emptyArea.x + emptyArea.width - drawW;
                const minY = emptyArea.y;
                const maxY = emptyArea.y + emptyArea.height - drawH;

                imgX = Math.max(minX, Math.min(imgX, maxX));
                imgY = Math.max(minY, Math.min(imgY, maxY));

                ctx.save();
                ctx.beginPath();
                ctx.rect(emptyArea.x, emptyArea.y, emptyArea.width, emptyArea.height);
                ctx.clip();

                ctx.translate(imgX + drawW / 2, imgY + drawH / 2);
                ctx.rotate(rotation * Math.PI / 180);
                ctx.drawImage(userImg, -drawW / 2, -drawH / 2, drawW, drawH);
                ctx.restore();
            }

            if (templateImg.complete) {
                ctx.drawImage(templateImg, 0, 0, width, height);
            }
        }

        function centerPhoto() {
            if (!userImg || !emptyArea) return;

            // Fit user image ke empty area dengan aspect ratio maintained
            const scaleX = emptyArea.width / userImg.width;
            const scaleY = emptyArea.height / userImg.height;
            baseScale = Math.max(scaleX, scaleY); // Cover mode

            zoom = 1;
            const drawW = userImg.width * baseScale * zoom;
            const drawH = userImg.height * baseScale * zoom;
            imgX = emptyArea.x + (emptyArea.width - drawW) / 2;
            imgY = emptyArea.y + (emptyArea.height - drawH) / 2;
            draw();
        }

        templateImg.onload = setupCanvas;
        window.addEventListener('resize', setupCanvas);
        setupCanvas();

        document.getElementById('photoInput').addEventListener('change', function () {
            const file = this.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = function (e) {
                userImg = new Image();
                userImg.onload = function () {
                    zoom = 1;
                    rotation = 0;
                    document.getElementById('zoomSlider').value = '1';
                    document.getElementById('rotateSlider').value = '0';
                    document.getElementById('zoomValue').textContent = '100%';
                    document.getElementById('rotateValue').textContent = '0°';
                    centerPhoto();
                    document.getElementById('uploadHint').classList.add('hidden');
                    document.getElementById('controls').classList.remove('hidden');
                    const btn = document.getElementById('downloadBtn');
                    btn.disabled = false;
                    btn.className = 'w-full px-5 py-4 rounded-2xl bg-green-500 hover:bg-green-400 text-gray-950 font-bold transition';
                };
                userImg.src = e.target.result;
            };
            reader.readAsDataURL(file);
        });

        document.getElementById('zoomSlider').addEventListener('input', function () {
            if (!userImg) return;
            const oldZoom = zoom;
            zoom = parseFloat(this.value);

            // Zoom dari center of empty area
            const centerX = emptyArea.x + emptyArea.width / 2;
            const centerY = emptyArea.y + emptyArea.height / 2;
            imgX = centerX - (centerX - imgX) * (zoom / oldZoom);
            imgY = centerY - (centerY - imgY) * (zoom / oldZoom);

            document.getElementById('zoomValue').textContent = Math.round(zoom * 100) + '%';
            draw();
        });

        document.getElementById('rotateSlider').addEventListener('input', function () {
            rotation = parseInt(this.value, 10);
            document.getElementById('rotateValue').textContent = rotation + '°';
            draw();
        });

        function pointerPos(e) {
            const rect = canvas.getBoundingClientRect();
            const p = e.touches ? e.touches[0] : e;
            return { x: p.clientX - rect.left, y: p.clientY - rect.top };
        }

        function startDrag(e) {
            if (!userImg || !emptyArea) return;
            const pos = pointerPos(e);

            // Check jika drag di dalam empty area
            if (pos.x >= emptyArea.x && pos.x <= emptyArea.x + emptyArea.width &&
                pos.y >= emptyArea.y && pos.y <= emptyArea.y + emptyArea.height) {
                e.preventDefault();
                dragging = true;
                lastX = pos.x;
                lastY = pos.y;
            }
        }

        function moveDrag(e) {
            if (!dragging || !userImg) return;
            e.preventDefault();
            const pos = pointerPos(e);
            imgX += pos.x - lastX;
            imgY += pos.y - lastY;
            lastX = pos.x;
            lastY = pos.y;
            draw();
        }

        function endDrag() { dragging = false; }

        canvas.addEventListener('mousedown', startDrag);
        window.addEventListener('mousemove', moveDrag);
        window.addEventListener('mouseup', endDrag);
        canvas.addEventListener('touchstart', startDrag, { passive: false });
        window.addEventListener('touchmove', moveDrag, { passive: false });
        window.addEventListener('touchend', endDrag);

        document.getElementById('resetBtn').addEventListener('click', function () {
            if (!userImg) return;
            zoom = 1;
            rotation = 0;
            document.getElementById('zoomSlider').value = '1';
            document.getElementById('rotateSlider').value = '0';
            document.getElementById('zoomValue').textContent = '100%';
            document.getElementById('rotateValue').textContent = '0°';
            centerPhoto();
        });

        document.getElementById('centerBtn').addEventListener('click', centerPhoto);

        document.getElementById('downloadBtn').addEventListener('click', function () {
            if (!userImg) return;
            draw();
            const link = document.createElement('a');
            link.download = '{{ \Illuminate\Support\Str::slug($twibbon->title) }}-twibbon.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
            fetch(downloadTrackUrl, { method: 'POST', headers: { 'X-CSRF-TOKEN': csrfToken } }).catch(() => {});
            showToast('Twibbon berhasil didownload.');
        });

        async function copyCurrentLink() {
            try {
                await navigator.clipboard.writeText(window.location.href);
                showToast('Link berhasil disalin.');
            } catch (e) {
                showToast(window.location.href);
            }
        }

        document.getElementById('copyLinkBtn').addEventListener('click', copyCurrentLink);
        document.getElementById('shareBtn').addEventListener('click', async function () {
            if (navigator.share) {
                try {
                    await navigator.share({ title: @json($twibbon->title), text: @json($twibbon->description), url: window.location.href });
                    return;
                } catch (e) {}
            }
            copyCurrentLink();
        });

        function showToast(message) {
            const toast = document.getElementById('toast');
            toast.textContent = message;
            toast.classList.remove('hidden');
            setTimeout(() => toast.classList.add('hidden'), 3000);
        }
    </script>
</body>
</html>
