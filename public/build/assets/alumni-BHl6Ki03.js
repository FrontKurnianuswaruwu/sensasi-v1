import{$ as a}from"./jquery-BvxTx_lq.js";a.ajaxSetup({headers:{"X-CSRF-TOKEN":a('meta[name="csrf-token"]').attr("content")}});a(function(){u()});let l=1;const h=10;function k(e){const t=a("#tableAlumni");if(t.empty(),e.length===0){t.append(`
            <tr>
                <td colspan="5" class="px-6 py-8 text-center text-gray-500">
                    <i class="fas fa-info-circle text-gray-400 mr-2"></i>
                    Tidak ada data ditemukan
                </td>
            </tr>
        `);return}e.forEach((n,i)=>{const s=`
            <tr class="hover:bg-gray-50 transition-colors duration-200">
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${i+1}</td>
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10">
                        <div class="h-10 w-10 rounded-full bg-gradient-to-r gradient-bg to-blue-light flex items-center justify-center text-white font-semibold">
                        ${n.nama_lengkap.charAt(0)}
                        </div>
                    </div>
                    <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">${n.nama_lengkap}</div>
                    </div>
                </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                ${n.mitra.nama_mitra||"-"}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                ${n.program_studi||"-"}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                ${n.tahun_lulus||"-"}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm">
                <button class="edit-btn px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all mr-2" data-id="${n.id}">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="delete-btn px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all" data-id="${n.id}" data-name="${n.nama_lengkap}">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
            </tr>
        `;t.append(s)})}function T(e){const t=a("#cardContainer");if(t.empty(),e.length===0){t.append(`
            <div class="p-6 text-center text-gray-500">
                <i class="fas fa-info-circle text-gray-400 mr-2"></i>
                Tidak ada data ditemukan
            </div>
        `);return}e.forEach(n=>{const i=`
            <div class="p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200">
                <div class="flex items-start space-x-3">
                    <div class="flex-shrink-0 h-12 w-12 rounded-full bg-gradient-to-r gradient-bg to-blue-light flex items-center justify-center text-white font-semibold text-lg">
                        ${n.nama_lengkap.charAt(0)}
                    </div>
                    <div class="flex-1 min-w-0">
                        <div class="flex items-center justify-between mb-2">
                        <h3 class="text-lg font-semibold text-gray-900 truncate">${n.nama_lengkap}</h3>
                    </div>
                    <div class="space-y-1 text-sm text-gray-600">
                    <div class="flex items-center">
                        <i class="fas fa-handshake w-4 mr-2 text-orange-primary"></i>
                        <span class="truncate">${n.mitra.nama_mitra||"-"}</span>
                    </div>
                    <div class="flex items-center">
                        <i class="fas fa-book w-4 mr-2 text-blue-500"></i>
                        <span class="truncate">${n.program_studi||"-"}</span>
                    </div>
                    <div class="flex mt-4 space-x-2">
                        <button class="edit-btn flex-1 px-3 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all" data-id="${n.id}">
                        <i class="fas fa-edit"></i> Edit
                        </button>
                        <button class="delete-btn flex-1 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all" data-id="${n.id}" data-name="${n.nama_lengkap}">
                        <i class="fas fa-trash"></i> Hapus
                        </button>
                    </div>
                    </div>
                    </div>
                </div>
            </div>
        `;t.append(i)})}function $(e,t){const n=a("#pagination");if(n.empty(),!(e<=1))for(let i=1;i<=e;i++){const s=a(`<button class="page-btn mx-1 px-3 py-1 rounded-lg border ${i===l?"bg-orange-primary text-white":"bg-white text-gray-700 hover:bg-gray-100"}">${i}</button>`);s.on("click",function(){l=i,u(t,l)}),n.append(s)}}function F(e,t){const n=a("#paginationMobile");if(n.empty(),!(e<=1))for(let i=1;i<=e;i++){const s=a(`<button class="px-3 py-1 rounded-lg border ${i===l?"bg-orange-primary text-white":"bg-white text-gray-700 hover:bg-gray-100"}">${i}</button>`);s.on("click",function(){l=i,u(t,l)}),n.append(s)}}function u(e="",t=1){a.ajax({url:"/admin/getalumni",type:"GET",data:{search:e,page:t,limit:h},dataType:"json",success:function(n){const i=n.data;if(!Array.isArray(i)){console.error("Response data bukan array:",i);return}k(i),T(i),$(n.last_page,e),F(n.last_page,e);let s=(n.current_page-1)*h+1,d=s+i.length-1;a("#resultCount").html(`
                <i class="fas fa-info-circle mr-1"></i>
                Menampilkan ${s} - ${d} dari ${n.total} data
            `)},error:function(n,i,s){console.error("Gagal ambil data:",s,n.responseText)}})}a("#searchInputalumni").on("input",function(){const e=a(this).val();l=1,u(e,l)});function v(){a("#alumniForm")[0].reset(),a("#alumniForm input, #alumniForm select, #alumniForm textarea").removeClass("border-red-300 bg-red-50"),a("#alumniForm input, #alumniForm select").each(function(){a(this).removeClass("border-red-300 bg-red-50"),_(this)}),a("#preview").attr("src",""),a("#previewContainer").addClass("hidden")}function b(e){x(e),M()}function x(e){const t=a("#"+e);t.removeClass("hidden"),setTimeout(()=>{t.find(".modal-content").addClass("show")},10),a("body").addClass("overflow-hidden")}function M(){a("body").css({overflow:"hidden","padding-right":""})}function _(e){const n=a(e).attr("id")+"-error";a("#"+n).remove()}a("#cancelDeleteBtn").on("click",function(){c("deleteModal")});a("#closeModal, #cancelBtn").on("click",function(){c("alumniModal")});function c(e){I(e),S()}function I(e){const t=a("#"+e);t.find(".modal-content").removeClass("show"),setTimeout(()=>{t.addClass("hidden"),a("body").removeClass("overflow-hidden")},300)}function S(){a("body").css({overflow:"","padding-right":""})}a(".modal-overlay").on("click",function(e){e.target===this&&(a(this).closest("#alumniModal").length?c("alumniModal"):a(this).closest("#deleteModal").length&&c("deleteModal"))});function o(e,t="info"){const s=a(`
            <div class="notification flex items-center space-x-3 ${t==="success"?"bg-green-500":t==="error"?"bg-red-500":"bg-blue-500"} text-white px-6 py-4 rounded-xl shadow-lg transform translate-x-full opacity-0 transition-all duration-300 cursor-pointer">
            <i class="fas ${t==="success"?"fa-check-circle":t==="error"?"fa-exclamation-circle":"fa-info-circle"} text-lg"></i>
            <span class="font-medium">${e}</span>
            </div>
            `);a("#notificationWrapper").append(s),setTimeout(()=>{s.removeClass("translate-x-full opacity-0")},100);const d=setTimeout(()=>{s.addClass("translate-x-full opacity-0"),setTimeout(()=>s.remove(),300)},4e3);s.on("click",function(){clearTimeout(d),a(this).addClass("translate-x-full opacity-0"),setTimeout(()=>a(this).remove(),300)})}function A(){let e=!0;return["alumniName","alumniMitraid","alumniTahunlulus","alumniProgramstudi"].forEach(function(n){const i=a("#"+n);!i.val()||!i.val().toString().trim()?(i.addClass("border-red-300 bg-red-50"),e=!1):i.removeClass("border-red-300 bg-red-50")}),e}a("#alumniFoto").on("change",function(){const e=this;if(e.files&&e.files[0]){const t=new FileReader;t.onload=function(n){a("#preview").attr("src",n.target.result),a("#previewContainer").removeClass("hidden")},t.readAsDataURL(e.files[0])}});a("#dropzone").on("drop",function(e){e.preventDefault();const t=e.originalEvent.dataTransfer.files;a("#alumniFoto")[0].files=t,a("#alumniFoto").trigger("change")}).on("dragleave",function(){a(this).removeClass("border-blue-primary bg-blue-50")}).on("drop",function(e){e.preventDefault();const t=e.originalEvent.dataTransfer.files;a("#alumniFoto")[0].files=t,a("#alumniFoto").trigger("change")});a("#removeFoto").on("click",function(){let e=a("#alumniId").val();if(!e){o("ID Alumni tidak ditemukan.");return}a.ajax({url:"/alumni/deleteFoto",type:"POST",data:{id:e},success:function(t){t.success?(a("#alumniFoto").val(""),a("#previewContainer").addClass("hidden"),a("#preview").attr("src",""),o(t.message,"success")):o("Gagal menghapus foto.")},error:function(){o("Terjadi kesalahan.")}})});let f=null;a("#addSubalumniBtn").on("click",function(){f=null,v(),a("#alumniId").val(""),a("#modalTitle").text("Tambah Alumni Baru"),a("#modalIcon").removeClass("fa-edit").addClass("fa-user-graduate"),a("#submitText").text("Simpan Data"),a("#submitIcon").removeClass("fa-edit").addClass("fa-save"),y(),b("alumniModal"),a("#alumniIsparent").val("")});function y(e=""){a.get("/admin/alumni/getmitras",function(t){const n=Array.isArray(t)?t:Array.isArray(t.data)?t.data:[];a("#alumniMitraid").empty(),a("#alumniMitraid").append('<option value="">Pilih Mitra</option>'),n.forEach(function(i){var s=i.id==e?"selected":"";a("#alumniMitraid").append(`<option value="${i.id}" ${s}>${i.nama_mitra}</option>`)})}).fail(function(){alert("Gagal mengambil data menu. Pastikan API berjalan dengan benar.")})}flatpickr("#alumniTahunlulus",{plugins:[new monthSelectPlugin({shorthand:!0,dateFormat:"Y",altFormat:"Y"})]});a(function(){a("#alumniForm").on("submit",function(e){if(e.preventDefault(),!A()){o("Mohon lengkapi semua field yang wajib diisi!","error");return}const t=a("#submitBtn"),n=t.html();t.html('<i class="fas fa-spinner fa-spin mr-2"></i>Menyimpan...').prop("disabled",!0);const i=a("#alumniId").val(),s=new FormData;s.append("nama_lengkap",a("#alumniName").val()),s.append("mitra_id",a("#alumniMitraid").val()),s.append("tahun_lulus",a("#alumniTahunlulus").val()),s.append("program_studi",a("#alumniProgramstudi").val());const d=a("#alumniFoto")[0];d.files.length>0?s.append("foto",d.files[0]):s.append("oldFoto",a("#oldFoto").val());const w=i?`/admin/alumni/${i}`:"/admin/alumni",C="POST";i&&s.append("_method","PUT"),a.ajax({url:w,type:C,data:s,processData:!1,contentType:!1,success:function(r){o(r.message,r.status),c("alumniModal"),t.html(n).prop("disabled",!1),u(a("#searchInputmenu").val(),l)},error:function(r){if(t.html(n).prop("disabled",!1),r.status===422&&r.responseJSON.errors){let m=r.responseJSON.errors,p=[];for(let g in m)m.hasOwnProperty(g)&&p.push(m[g].join(", "));o(p.join(" | "),"error")}else{let m=r.responseJSON&&r.responseJSON.message?r.responseJSON.message:"Terjadi kesalahan saat menyimpan data!";o(m,"error")}}})})});a(document).on("click",".edit-btn",function(){f=a(this).data("id"),v(),a("#modalTitle").text("Edit Data Alumni"),a("#modalIcon").removeClass("fa-bars").addClass("fa-edit"),a("#submitText").text("Update Data"),a("#submitIcon").removeClass("fa-save").addClass("fa-edit"),a.ajax({url:"/admin/alumni/"+f,type:"GET",success:function(e){a("#alumniId").val(e.id),a("#alumniName").val(e.nama_lengkap),a("#alumniTahunlulus").val(e.tahun_lulus),a("#alumniProgramstudi").val(e.program_studi),y(e.mitra_id),e.foto?(a("#preview").attr("src","/"+e.foto),a("#previewContainer").removeClass("hidden"),a("#oldFoto").val(e.foto)):(a("#preview").attr("src",""),a("#previewContainer").addClass("hidden"),a("#oldFoto").val("")),x("alumniModal")},error:function(e){console.error("Gagal ambil data:",e.responseText),alert("Gagal ambil data alumni")}})});a(document).on("click",".delete-btn",function(){const e=a(this).data("id"),t=a(this).data("name");a("#deletealumniId").val(e),a("#deleteAlumniName").text(t),b("deleteModal")});a(document).on("click","#confirmDeleteBtn",function(){const e=a(this),t=e.html();e.html('<i class="fas fa-spinner fa-spin mr-2"></i>Menghapus...').prop("disabled",!0);const n=a("#deletealumniId").val();a.ajax({url:`/admin/alumni/${n}`,type:"DELETE",success:function(i){o(i.message,i.status),c("deleteModal"),u()},error:function(i){let s=i.responseJSON&&i.responseJSON.message?i.responseJSON.message:"Gagal menghapus data!";o(s,"error")},complete:function(){e.html(t).prop("disabled",!1)}})});
