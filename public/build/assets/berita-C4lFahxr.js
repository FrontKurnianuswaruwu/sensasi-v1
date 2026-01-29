import{$ as e}from"./jquery-BvxTx_lq.js";e.ajaxSetup({headers:{"X-CSRF-TOKEN":e('meta[name="csrf-token"]').attr("content")}});e(function(){u()});function v(t){if(!t)return"-";const a=["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"],i=new Date(t);return isNaN(i)?"-":`${i.getDate()} ${a[i.getMonth()]} ${i.getFullYear()}`}let l=1;const h=10;function T(t){const a=e("#tableBerita");if(a.empty(),t.length===0){a.append(`
            <tr>
                <td colspan="5" class="px-6 py-8 text-center text-gray-500">
                    <i class="fas fa-info-circle text-gray-400 mr-2"></i>
                    Tidak ada data ditemukan
                </td>
            </tr>
        `);return}t.forEach((i,r)=>{const n=`
            <tr class="hover:bg-gray-50 transition-colors duration-200">
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${r+1}</td>
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10">
                        <div class="h-10 w-10 rounded-full bg-gradient-to-r gradient-bg to-blue-light flex items-center justify-center text-white font-semibold">
                        ${i.judul.charAt(0)}
                        </div>
                    </div>
                    <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">${i.judul}</div>
                    </div>
                </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                ${i.ketegori||"-"}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                ${v(i.tanggal)||"-"}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm">
                <button class="edit-btn px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all mr-2" data-id="${i.id}">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="delete-btn px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all" data-id="${i.id}" data-name="${i.judul}">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
            </tr>
        `;a.append(n)})}function F(t){const a=e("#cardContainer");if(a.empty(),t.length===0){a.append(`
            <div class="p-6 text-center text-gray-500">
                <i class="fas fa-info-circle text-gray-400 mr-2"></i>
                Tidak ada data ditemukan
            </div>
        `);return}t.forEach(i=>{const r=`
            <div class="p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200">
            <div class="flex items-start space-x-3">
                <div class="flex-shrink-0 h-12 w-12 rounded-full bg-gradient-to-r gradient-bg to-blue-light flex items-center justify-center text-white font-semibold text-lg">
                ${i.judul.charAt(0)}
                </div>
                <div class="flex-1 min-w-0">
                <div class="flex items-center justify-between mb-2">
                    <h3 class="text-lg font-semibold text-gray-900 truncate">${i.judul}</h3>
                </div>
                <div class="space-y-1 text-sm text-gray-600">
                    <div class="flex items-center">
                    <i class="fas fa-tags w-4 mr-2 text-orange-primary"></i>
                    <span class="truncate">${i.ketegori}</span>
                    </div>
                    <div class="flex items-center">
                    <i class="fas fa-calendar-alt w-4 mr-2 text-blue-500"></i>
                    <span class="truncate">${v(i.tanggal)}</span>
                    </div>
                    <div class="flex mt-4 space-x-2">
                    <button class="edit-btn flex-1 px-3 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all" data-id="${i.id}">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="delete-btn flex-1 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all" data-id="${i.id}" data-name="${i.judul}">
                        <i class="fas fa-trash"></i> Hapus
                    </button>
                    </div>
                </div>
                </div>
            </div>
            </div>
        `;a.append(r)})}function $(t,a){const i=e("#pagination");if(i.empty(),!(t<=1))for(let r=1;r<=t;r++){const n=e(`<button class="page-btn mx-1 px-3 py-1 rounded-lg border ${r===l?"bg-orange-primary text-white":"bg-white text-gray-700 hover:bg-gray-100"}">${r}</button>`);n.on("click",function(){l=r,u(a,l)}),i.append(n)}}function j(t,a){const i=e("#paginationMobile");if(i.empty(),!(t<=1))for(let r=1;r<=t;r++){const n=e(`<button class="px-3 py-1 rounded-lg border ${r===l?"bg-orange-primary text-white":"bg-white text-gray-700 hover:bg-gray-100"}">${r}</button>`);n.on("click",function(){l=r,u(a,l)}),i.append(n)}}function u(t="",a=1){e.ajax({url:"/admin/getberita",type:"GET",data:{search:t,page:a,limit:h},dataType:"json",success:function(i){const r=i.data;if(!Array.isArray(r)){console.error("Response data bukan array:",r);return}T(r),F(r),$(i.last_page,t),j(i.last_page,t);let n=(i.current_page-1)*h+1,d=n+r.length-1;e("#resultCount").html(`
                <i class="fas fa-info-circle mr-1"></i>
                Menampilkan ${n} - ${d} dari ${i.total} data
            `)},error:function(i,r,n){console.error("Gagal ambil data:",n,i.responseText)}})}e("#searchInputberita").on("input",function(){const t=e(this).val();l=1,u(t,l)});function x(){e("#beritaForm")[0].reset(),e("#beritaForm input, #beritaForm select, #beritaForm textarea").removeClass("border-red-300 bg-red-50"),e("#beritaForm input, #beritaForm select").each(function(){e(this).removeClass("border-red-300 bg-red-50"),D(this)}),e("#preview").attr("src",""),e("#previewContainer").addClass("hidden")}function y(t){w(t),M()}function w(t){const a=e("#"+t);a.removeClass("hidden"),setTimeout(()=>{a.find(".modal-content").addClass("show")},10),e("body").addClass("overflow-hidden")}function M(){e("body").css({overflow:"hidden","padding-right":""})}function D(t){const i=e(t).attr("id")+"-error";e("#"+i).remove()}e("#cancelDeleteBtn").on("click",function(){c("deleteModal")});e("#closeModal, #cancelBtn").on("click",function(){c("beritaModal")});function c(t){I(t),E()}function I(t){const a=e("#"+t);a.find(".modal-content").removeClass("show"),setTimeout(()=>{a.addClass("hidden"),e("body").removeClass("overflow-hidden")},300)}function E(){e("body").css({overflow:"","padding-right":""})}e(".modal-overlay").on("click",function(t){t.target===this&&(e(this).closest("#beritaModal").length?c("beritaModal"):e(this).closest("#deleteModal").length&&c("deleteModal"))});function s(t,a="info"){const n=e(`
            <div class="notification flex items-center space-x-3 ${a==="success"?"bg-green-500":a==="error"?"bg-red-500":"bg-blue-500"} text-white px-6 py-4 rounded-xl shadow-lg transform translate-x-full opacity-0 transition-all duration-300 cursor-pointer">
            <i class="fas ${a==="success"?"fa-check-circle":a==="error"?"fa-exclamation-circle":"fa-info-circle"} text-lg"></i>
            <span class="font-medium">${t}</span>
            </div>
            `);e("#notificationWrapper").append(n),setTimeout(()=>{n.removeClass("translate-x-full opacity-0")},100);const d=setTimeout(()=>{n.addClass("translate-x-full opacity-0"),setTimeout(()=>n.remove(),300)},4e3);n.on("click",function(){clearTimeout(d),e(this).addClass("translate-x-full opacity-0"),setTimeout(()=>e(this).remove(),300)})}function S(){let t=!0;return["beritaJudul","beritaKategori","beritaTanggal"].forEach(function(i){const r=e("#"+i);!r.val()||!r.val().toString().trim()?(r.addClass("border-red-300 bg-red-50"),t=!1):r.removeClass("border-red-300 bg-red-50")}),t}e("#beritaFoto").on("change",function(){const t=this;if(t.files&&t.files[0]){const a=new FileReader;a.onload=function(i){e("#preview").attr("src",i.target.result),e("#previewContainer").removeClass("hidden")},a.readAsDataURL(t.files[0])}});e("#dropzone").on("drop",function(t){t.preventDefault();const a=t.originalEvent.dataTransfer.files;e("#beritaFoto")[0].files=a,e("#beritaFoto").trigger("change")}).on("dragleave",function(){e(this).removeClass("border-blue-primary bg-blue-50")}).on("drop",function(t){t.preventDefault();const a=t.originalEvent.dataTransfer.files;e("#beritaFoto")[0].files=a,e("#beritaFoto").trigger("change")});e("#removeFoto").on("click",function(){let t=e("#beritaId").val();if(!t){s("ID Berita tidak ditemukan.");return}e.ajax({url:"/berita/deleteFoto",type:"POST",data:{id:t},success:function(a){a.success?(e("#beritaFoto").val(""),e("#previewContainer").addClass("hidden"),e("#preview").attr("src",""),s(a.message,"success")):s("Gagal menghapus foto.")},error:function(){s("Terjadi kesalahan.")}})});let p,m=null;e("#addSubberitaBtn").on("click",function(){m=null,x(),e("#beritaId").val(""),e("#modalTitle").text("Tambah Berita Baru"),e("#modalIcon").removeClass("fa-edit").addClass("fa-user-graduate"),e("#submitText").text("Simpan Data"),e("#submitIcon").removeClass("fa-edit").addClass("fa-save"),y("beritaModal"),e("#beritaIsparent").val("")});e(function(){ClassicEditor.create(document.querySelector("#beritaDeskripsi")).then(t=>{p=t,console.log("CKEditor siap dipakai!")}).catch(t=>{console.error(t)}),e("#beritaForm").on("submit",function(t){if(t.preventDefault(),!S()){s("Mohon lengkapi semua field yang wajib diisi!","error");return}const a=e("#submitBtn"),i=a.html();a.html('<i class="fas fa-spinner fa-spin mr-2"></i>Menyimpan...').prop("disabled",!0);const r=e("#beritaId").val(),n=new FormData;n.append("judul",e("#beritaJudul").val()),n.append("kategori",e("#beritaKategori").val()),n.append("tanggal",e("#beritaTanggal").val()),n.append("deskripsi",p.getData());const d=e("#beritaFoto")[0];d.files.length>0?n.append("foto",d.files[0]):n.append("oldFoto",e("#oldFoto").val());const C=r?`/admin/berita/${r}`:"/admin/berita",k="POST";r&&n.append("_method","PUT"),e.ajax({url:C,type:k,data:n,processData:!1,contentType:!1,success:function(o){s(o.message,o.status),c("beritaModal"),a.html(i).prop("disabled",!1),u(e("#searchInputberita").val(),l)},error:function(o){if(a.html(i).prop("disabled",!1),o.status===422&&o.responseJSON.errors){let f=o.responseJSON.errors,g=[];for(let b in f)f.hasOwnProperty(b)&&g.push(f[b].join(", "));s(g.join(" | "),"error")}else{let f=o.responseJSON&&o.responseJSON.message?o.responseJSON.message:"Terjadi kesalahan saat menyimpan data!";s(f,"error")}}})})});e(document).on("click",".edit-btn",function(){m=e(this).data("id"),x(),e("#modalTitle").text("Edit Data Berita"),e("#modalIcon").removeClass().addClass("fas fa-newspaper"),e("#submitText").text("Update Data"),e("#submitIcon").removeClass("fa-save").addClass("fa-edit"),e.ajax({url:"/admin/berita/"+m,type:"GET",success:function(t){e("#beritaId").val(t.id),e("#beritaJudul").val(t.judul),e("#beritaKategori").val(t.ketegori),e("#beritaTanggal").val(t.tanggal),p?p.setData(t.deskripsi||""):e("#beritaDeskripsi").val(t.deskripsi),t.foto?(e("#preview").attr("src","/"+t.foto),e("#previewContainer").removeClass("hidden"),e("#oldFoto").val(t.foto)):(e("#preview").attr("src",""),e("#previewContainer").addClass("hidden"),e("#oldFoto").val("")),w("beritaModal")},error:function(t){console.error("Gagal ambil data:",t.responseText),alert("Gagal ambil data berita")}})});e(document).on("click",".delete-btn",function(){const t=e(this).data("id"),a=e(this).data("name");e("#deleteberitaId").val(t),e("#deleteBeritaName").text(a),y("deleteModal")});e(document).on("click","#confirmDeleteBtn",function(){const t=e(this),a=t.html();t.html('<i class="fas fa-spinner fa-spin mr-2"></i>Menghapus...').prop("disabled",!0);const i=e("#deleteberitaId").val();e.ajax({url:`/admin/berita/${i}`,type:"DELETE",success:function(r){s(r.message,r.status),c("deleteModal"),u()},error:function(r){let n=r.responseJSON&&r.responseJSON.message?r.responseJSON.message:"Gagal menghapus data!";s(n,"error")},complete:function(){t.html(a).prop("disabled",!1)}})});e("#removeFoto").on("click",function(){let t=e("#beritaId").val();if(!t){s("ID Berita tidak ditemukan.");return}e.ajax({url:"/berita/deleteFoto",type:"POST",data:{id:t},success:function(a){a.success?(e("#beritaFoto").val(""),e("#previewContainer").addClass("hidden"),e("#preview").attr("src",""),s(a.message,"success")):s("Gagal menghapus foto.")},error:function(){s("Terjadi kesalahan.")}})});
