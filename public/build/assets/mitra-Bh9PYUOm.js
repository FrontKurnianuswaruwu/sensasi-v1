import{$ as e}from"./jquery-BvxTx_lq.js";e.ajaxSetup({headers:{"X-CSRF-TOKEN":e('meta[name="csrf-token"]').attr("content")}});e(function(){u()});let l=1;const v=10;function C(t){const a=e("#tableMitra");if(a.empty(),t.length===0){a.append(`
            <tr>
                <td colspan="5" class="px-6 py-8 text-center text-gray-500">
                    <i class="fas fa-info-circle text-gray-400 mr-2"></i>
                    Tidak ada data ditemukan
                </td>
            </tr>
        `);return}t.forEach((i,n)=>{const r=`
            <tr class="hover:bg-gray-50 transition-colors duration-200">
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${n+1}</td>
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10">
                        <div class="h-10 w-10 rounded-full bg-gradient-to-r gradient-bg to-blue-light flex items-center justify-center text-white font-semibold">
                        ${i.nama_mitra.charAt(0)}
                        </div>
                    </div>
                    <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">${i.nama_mitra}</div>
                    </div>
                </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                ${i.nama_admin}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                ${i.kontak}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                ${i.tahun_kerjasama}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm">
                <button class="edit-btn px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all mr-2" data-id="${i.id}">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="delete-btn px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all" data-id="${i.id}" data-name="${i.nama_mitra}">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
            </tr>
        `;a.append(r)})}function T(t){const a=e("#cardContainer");if(a.empty(),t.length===0){a.append(`
            <div class="p-6 text-center text-gray-500">
                <i class="fas fa-info-circle text-gray-400 mr-2"></i>
                Tidak ada data ditemukan
            </div>
        `);return}t.forEach(i=>{const n=`
            <div class="p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200">
            <div class="flex items-start space-x-3">
            <div class="flex-shrink-0 h-12 w-12 rounded-full bg-gradient-to-r gradient-bg to-blue-light flex items-center justify-center text-white font-semibold text-lg">
            ${i.nama_mitra.charAt(0)}
            </div>
            <div class="flex-1 min-w-0">
            <div class="flex items-center justify-between mb-2">
                <h3 class="text-lg font-semibold text-gray-900 truncate">${i.nama_mitra}</h3>
            </div>
            <div class="space-y-1 text-sm text-gray-600">
                <div class="flex items-center">
                <i class="fas fa-user-tie w-4 mr-2 text-orange-primary"></i>
                <span class="truncate">${i.nama_admin||"-"}</span>
                </div>
                <div class="flex items-center">
                <i class="fas fa-phone-alt w-4 mr-2 text-blue-500"></i>
                <span class="truncate">${i.kontak||"-"}</span>
                </div>
                <div class="flex mt-4 space-x-2">
                <button class="edit-btn flex-1 px-3 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all" data-id="${i.id}">
                <i class="fas fa-edit"></i> Edit
                </button>
                <button class="delete-btn flex-1 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all" data-id="${i.id}" data-name="${i.nama_mitra}">
                <i class="fas fa-trash"></i> Hapus
                </button>
                </div>
            </div>
            </div>
            </div>
            </div>
        `;a.append(n)})}function $(t,a){const i=e("#pagination");if(i.empty(),!(t<=1))for(let n=1;n<=t;n++){const r=e(`<button class="page-btn mx-1 px-3 py-1 rounded-lg border ${n===l?"bg-orange-primary text-white":"bg-white text-gray-700 hover:bg-gray-100"}">${n}</button>`);r.on("click",function(){l=n,u(a,l)}),i.append(r)}}function M(t,a){const i=e("#paginationMobile");if(i.empty(),!(t<=1))for(let n=1;n<=t;n++){const r=e(`<button class="px-3 py-1 rounded-lg border ${n===l?"bg-orange-primary text-white":"bg-white text-gray-700 hover:bg-gray-100"}">${n}</button>`);r.on("click",function(){l=n,u(a,l)}),i.append(r)}}function u(t="",a=1){e.ajax({url:"/admin/getmitra",type:"GET",data:{search:t,page:a,limit:v},dataType:"json",success:function(i){const n=i.data;if(!Array.isArray(n)){console.error("Response data bukan array:",n);return}C(n),T(n),$(i.last_page,t),M(i.last_page,t);let r=(i.current_page-1)*v+1,c=r+n.length-1;e("#resultCount").html(`
                <i class="fas fa-info-circle mr-1"></i>
                Menampilkan ${r} - ${c} dari ${i.total} data
            `)},error:function(i,n,r){console.error("Gagal ambil data:",r,i.responseText)}})}e("#searchInputmitra").on("input",function(){const t=e(this).val();l=1,u(t,l)});function b(){e("#mitraForm")[0].reset(),e("#mitraForm input, #mitraForm select, #mitraForm textarea").removeClass("border-red-300 bg-red-50"),e("#mitraForm input, #mitraForm select").each(function(){e(this).removeClass("border-red-300 bg-red-50"),_(this)}),typeof d<"u"&&d?d.setData(""):e("#mitraDescription").val(""),e("#preview").attr("src",""),e("#previewContainer").addClass("hidden")}function x(t){y(t),F()}function y(t){const a=e("#"+t);a.removeClass("hidden"),setTimeout(()=>{a.find(".modal-content").addClass("show")},10),e("body").addClass("overflow-hidden")}function F(){e("body").css({overflow:"hidden","padding-right":""})}function _(t){const i=e(t).attr("id")+"-error";e("#"+i).remove()}e("#cancelDeleteBtn").on("click",function(){m("deleteModal")});e("#closeModal, #cancelBtn").on("click",function(){m("mitraModal")});function m(t){j(t),D()}function j(t){const a=e("#"+t);a.find(".modal-content").removeClass("show"),setTimeout(()=>{a.addClass("hidden"),e("body").removeClass("overflow-hidden")},300)}function D(){e("body").css({overflow:"","padding-right":""})}e(".modal-overlay").on("click",function(t){t.target===this&&(e(this).closest("#mitraModal").length?m("mitraModal"):e(this).closest("#deleteModal").length&&m("deleteModal"))});function s(t,a="info"){const r=e(`
            <div class="notification flex items-center space-x-3 ${a==="success"?"bg-green-500":a==="error"?"bg-red-500":"bg-blue-500"} text-white px-6 py-4 rounded-xl shadow-lg transform translate-x-full opacity-0 transition-all duration-300 cursor-pointer">
            <i class="fas ${a==="success"?"fa-check-circle":a==="error"?"fa-exclamation-circle":"fa-info-circle"} text-lg"></i>
            <span class="font-medium">${t}</span>
            </div>
            `);e("#notificationWrapper").append(r),setTimeout(()=>{r.removeClass("translate-x-full opacity-0")},100);const c=setTimeout(()=>{r.addClass("translate-x-full opacity-0"),setTimeout(()=>r.remove(),300)},4e3);r.on("click",function(){clearTimeout(c),e(this).addClass("translate-x-full opacity-0"),setTimeout(()=>e(this).remove(),300)})}function E(){let t=!0;return["mitraName","adminName","mitraLinkwebsite","mitraKontak","mitraTahunkerjasama"].forEach(function(i){const n=e("#"+i);!n.val()||!n.val().toString().trim()?(n.addClass("border-red-300 bg-red-50"),t=!1):n.removeClass("border-red-300 bg-red-50")}),t}e("#mitraFoto").on("change",function(){const t=this;if(t.files&&t.files[0]){const a=new FileReader;a.onload=function(i){e("#preview").attr("src",i.target.result),e("#previewContainer").removeClass("hidden")},a.readAsDataURL(t.files[0])}});e("#dropzone").on("drop",function(t){t.preventDefault();const a=t.originalEvent.dataTransfer.files;e("#mitraFoto")[0].files=a,e("#mitraFoto").trigger("change")}).on("dragleave",function(){e(this).removeClass("border-blue-primary bg-blue-50")}).on("drop",function(t){t.preventDefault();const a=t.originalEvent.dataTransfer.files;e("#mitraFoto")[0].files=a,e("#mitraFoto").trigger("change")});e("#removeFoto").on("click",function(){let t=e("#mitraId").val();if(!t){s("ID Mitra tidak ditemukan.");return}e.ajax({url:"/mitra/deleteFoto",type:"POST",data:{id:t},success:function(a){a.success?(e("#mitraFoto").val(""),e("#previewContainer").addClass("hidden"),e("#preview").attr("src",""),s(a.message,"success")):s("Gagal menghapus foto.")},error:function(){s("Terjadi kesalahan.")}})});let d,f=null;e("#addSubmitraBtn").on("click",function(){f=null,b(),e("#mitraId").val(""),e("#modalTitle").text("Tambah Mitra Baru"),e("#modalIcon").removeClass().addClass("fas fa-plus-circle"),e("#submitText").text("Simpan Data"),e("#submitIcon").removeClass("fa-edit").addClass("fa-save"),x("mitraModal"),e("#mitraIsparent").val("")});e(function(){ClassicEditor.create(document.querySelector("#mitraDescription")).then(t=>{d=t,console.log("CKEditor siap dipakai!")}).catch(t=>{console.error(t)}),e("#mitraForm").on("submit",function(t){if(t.preventDefault(),!E()){s("Mohon lengkapi semua field yang wajib diisi!","error");return}if(!d){s("Editor belum siap, coba lagi!","error");return}const a=e("#submitBtn"),i=a.html();a.html('<i class="fas fa-spinner fa-spin mr-2"></i>Menyimpan...').prop("disabled",!0);const n=e("#mitraId").val(),r=new FormData;r.append("name",e("#mitraName").val()),r.append("nama_admin",e("#adminName").val()),r.append("logo_url",e("#mitraLogourl").val()),r.append("link_website",e("#mitraLinkwebsite").val()),r.append("tahun_kerjasama",e("#mitraTahunkerjasama").val()),r.append("kontak",e("#mitraKontak").val()),r.append("deskripsi",d.getData());const c=e("#mitraFoto")[0];c.files.length>0?r.append("foto",c.files[0]):r.append("oldFoto",e("#oldFoto").val());const w=n?`/admin/mitra/${n}`:"/admin/mitra",k="POST";n&&r.append("_method","PUT"),e.ajax({url:w,type:k,data:r,processData:!1,contentType:!1,success:function(o){s(o.message,o.status),m("mitraModal"),a.html(i).prop("disabled",!1),u(e("#searchInputmenu").val(),l)},error:function(o){if(a.html(i).prop("disabled",!1),o.status===422&&o.responseJSON.errors){let p=o.responseJSON.errors,g=[];for(let h in p)p.hasOwnProperty(h)&&g.push(p[h].join(", "));s(g.join(" | "),"error")}else{let p=o.responseJSON&&o.responseJSON.message?o.responseJSON.message:"Terjadi kesalahan saat menyimpan data!";s(p,"error")}}})})});e(document).on("click",".edit-btn",function(){f=e(this).data("id"),b(),e("#modalTitle").text("Edit Data Mitra"),e("#modalIcon").removeClass("fa-bars").addClass("fa-edit"),e("#submitText").text("Update Data"),e("#submitIcon").removeClass("fa-save").addClass("fa-edit"),e.ajax({url:"/admin/mitra/"+f,type:"GET",success:function(t){e("#mitraId").val(t.id),e("#mitraName").val(t.nama_mitra),e("#adminName").val(t.nama_admin),e("#mitraLogourl").val(t.logo_url),e("#mitraLinkwebsite").val(t.link_website),e("#mitraKontak").val(t.kontak),e("#mitraTahunkerjasama").val(t.tahun_kerjasama),d?d.setData(t.deskripsi||""):e("#mitraDescription").val(t.deskripsi),t.logo_url?(e("#preview").attr("src","/"+t.logo_url),e("#previewContainer").removeClass("hidden"),e("#oldFoto").val(t.logo_url)):(e("#preview").attr("src",""),e("#previewContainer").addClass("hidden"),e("#oldFoto").val("")),y("mitraModal")},error:function(t){console.error("Gagal ambil data:",t.responseText),alert("Gagal ambil data mitra")}})});e(document).on("click",".delete-btn",function(){const t=e(this).data("id"),a=e(this).data("name");e("#deletemitraId").val(t),e("#deleteMitraName").text(a),x("deleteModal")});e(document).on("click","#confirmDeleteBtn",function(){const t=e(this),a=t.html();t.html('<i class="fas fa-spinner fa-spin mr-2"></i>Menghapus...').prop("disabled",!0);const i=e("#deletemitraId").val();e.ajax({url:`/admin/mitra/${i}`,type:"DELETE",success:function(n){s(n.message,n.status),m("deleteModal"),u()},error:function(n){let r=n.responseJSON&&n.responseJSON.message?n.responseJSON.message:"Gagal menghapus data!";s(r,"error")},complete:function(){t.html(a).prop("disabled",!1)}})});
