import{$ as e}from"./jquery-BvxTx_lq.js";e.ajaxSetup({headers:{"X-CSRF-TOKEN":e('meta[name="csrf-token"]').attr("content")}});e(function(){p()});function h(a){if(!a)return"-";const t=["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"],r=new Date(a);return isNaN(r)?"-":`${r.getDate()} ${t[r.getMonth()]} ${r.getFullYear()}`}let l=1;const v=10;function I(a){const t=e("#tableProgram");if(t.empty(),a.length===0){t.append(`
            <tr>
                <td colspan="5" class="px-6 py-8 text-center text-gray-500">
                    <i class="fas fa-info-circle text-gray-400 mr-2"></i>
                    Tidak ada data ditemukan
                </td>
            </tr>
        `);return}a.forEach((r,n)=>{const o=`
            <tr class="hover:bg-gray-50 transition-colors duration-200">
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${n+1}</td>
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10">
                        <div class="h-10 w-10 rounded-full bg-gradient-to-r gradient-bg to-blue-light flex items-center justify-center text-white font-semibold">
                        ${r.name.charAt(0)}
                        </div>
                    </div>
                    <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">${r.name}</div>
                    </div>
                </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                ${h(r.start_date)}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                ${h(r.end_date)}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm">
                <button class="edit-btn px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all mr-2" data-id="${r.id}">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="delete-btn px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all" data-id="${r.id}" data-name="${r.name}">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
            </tr>
        `;t.append(o)})}function $(a){const t=e("#cardContainer");if(t.empty(),a.length===0){t.append(`
            <div class="p-6 text-center text-gray-500">
                <i class="fas fa-info-circle text-gray-400 mr-2"></i>
                Tidak ada data ditemukan
            </div>
        `);return}a.forEach(r=>{const n=`
            <div class="p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200">
            <div class="flex items-start space-x-3">
                <div class="flex-shrink-0 h-12 w-12 rounded-full bg-gradient-to-r gradient-bg to-blue-light flex items-center justify-center text-white font-semibold text-lg">
                ${r.name.charAt(0)}
                </div>
                <div class="flex-1 min-w-0">
                <div class="flex items-center justify-between mb-2">
                    <h3 class="text-lg font-semibold text-gray-900 truncate">${r.name}</h3>
                </div>
                <div class="space-y-1 text-sm text-gray-600">
                    <div class="flex items-center">
                    <i class="fas fa-calendar-alt w-4 mr-2 text-orange-primary"></i>
                    <span class="truncate">${r.start_date||"-"}</span>
                    </div>
                    <div class="flex items-center">
                    <i class="fas fa-calendar-check w-4 mr-2 text-blue-500"></i>
                    <span class="truncate">${r.end_date||"-"}</span>
                    </div>
                    <div class="flex mt-4 space-x-2">
                    <button class="edit-btn flex-1 px-3 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all" data-id="${r.id}">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="delete-btn flex-1 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all" data-id="${r.id}" data-name="${r.name}">
                        <i class="fas fa-trash"></i> Hapus
                    </button>
                    </div>
                </div>
                </div>
            </div>
            </div>
        `;t.append(n)})}function k(a,t){const r=e("#pagination");if(r.empty(),!(a<=1))for(let n=1;n<=a;n++){const o=e(`<button class="page-btn mx-1 px-3 py-1 rounded-lg border ${n===l?"bg-orange-primary text-white":"bg-white text-gray-700 hover:bg-gray-100"}">${n}</button>`);o.on("click",function(){l=n,p(t,l)}),r.append(o)}}function M(a,t){const r=e("#paginationMobile");if(r.empty(),!(a<=1))for(let n=1;n<=a;n++){const o=e(`<button class="px-3 py-1 rounded-lg border ${n===l?"bg-orange-primary text-white":"bg-white text-gray-700 hover:bg-gray-100"}">${n}</button>`);o.on("click",function(){l=n,p(t,l)}),r.append(o)}}function p(a="",t=1){e.ajax({url:"/admin/getprogram",type:"GET",data:{search:a,page:t,limit:v},dataType:"json",success:function(r){const n=r.data;if(!Array.isArray(n)){console.error("Response data bukan array:",n);return}I(n),$(n),k(r.last_page,a),M(r.last_page,a);let o=(r.current_page-1)*v+1,c=o+n.length-1;e("#resultCount").html(`
                <i class="fas fa-info-circle mr-1"></i>
                Menampilkan ${o} - ${c} dari ${r.total} data
            `)},error:function(r,n,o){console.error("Gagal ambil data:",o,r.responseText)}})}e("#searchInputprogram").on("input",function(){const a=e(this).val();l=1,p(a,l)});function x(){e("#programForm")[0].reset(),e("#programForm input, #programForm select, #programForm textarea").removeClass("border-red-300 bg-red-50"),e("#programForm input, #programForm select").each(function(){e(this).removeClass("border-red-300 bg-red-50"),E(this)}),typeof d<"u"&&d?d.setData(""):e("#programDescription").val(""),e("#preview").attr("src",""),e("#previewContainer").addClass("hidden")}function y(a){w(a),D()}function w(a){const t=e("#"+a);t.removeClass("hidden"),setTimeout(()=>{t.find(".modal-content").addClass("show")},10),e("body").addClass("overflow-hidden")}function D(){e("body").css({overflow:"hidden","padding-right":""})}function E(a){const r=e(a).attr("id")+"-error";e("#"+r).remove()}e("#cancelDeleteBtn").on("click",function(){m("deleteModal")});e("#closeModal, #cancelBtn").on("click",function(){m("programModal")});function m(a){S(a),F()}function S(a){const t=e("#"+a);t.find(".modal-content").removeClass("show"),setTimeout(()=>{t.addClass("hidden"),e("body").removeClass("overflow-hidden")},300)}function F(){e("body").css({overflow:"","padding-right":""})}e(".modal-overlay").on("click",function(a){a.target===this&&(e(this).closest("#programModal").length?m("programModal"):e(this).closest("#deleteModal").length&&m("deleteModal"))});function s(a,t="info"){const o=e(`
            <div class="notification flex items-center space-x-3 ${t==="success"?"bg-green-500":t==="error"?"bg-red-500":"bg-blue-500"} text-white px-6 py-4 rounded-xl shadow-lg transform translate-x-full opacity-0 transition-all duration-300 cursor-pointer">
            <i class="fas ${t==="success"?"fa-check-circle":t==="error"?"fa-exclamation-circle":"fa-info-circle"} text-lg"></i>
            <span class="font-medium">${a}</span>
            </div>
            `);e("#notificationWrapper").append(o),setTimeout(()=>{o.removeClass("translate-x-full opacity-0")},100);const c=setTimeout(()=>{o.addClass("translate-x-full opacity-0"),setTimeout(()=>o.remove(),300)},4e3);o.on("click",function(){clearTimeout(c),e(this).addClass("translate-x-full opacity-0"),setTimeout(()=>e(this).remove(),300)})}function N(){let a=!0;return["programName","programEnddate","programStartdate"].forEach(function(r){const n=e("#"+r);!n.val()||!n.val().toString().trim()?(n.addClass("border-red-300 bg-red-50"),a=!1):n.removeClass("border-red-300 bg-red-50")}),a}e("#programImage").on("change",function(){const a=this;if(a.files&&a.files[0]){const t=new FileReader;t.onload=function(r){e("#preview").attr("src",r.target.result),e("#previewContainer").removeClass("hidden")},t.readAsDataURL(a.files[0])}});e("#dropzone").on("drop",function(a){a.preventDefault();const t=a.originalEvent.dataTransfer.files;e("#programImage")[0].files=t,e("#programImage").trigger("change")}).on("dragleave",function(){e(this).removeClass("border-blue-primary bg-blue-50")}).on("drop",function(a){a.preventDefault();const t=a.originalEvent.dataTransfer.files;e("#programImage")[0].files=t,e("#programImage").trigger("change")});e("#removeImage").on("click",function(){let a=e("#programId").val();if(!a){s("ID Program tidak ditemukan.");return}e.ajax({url:"/program/deleteImage",type:"POST",data:{id:a},success:function(t){t.success?(e("#programImage").val(""),e("#previewContainer").addClass("hidden"),e("#preview").attr("src",""),s(t.message,"success")):s("Gagal menghapus gambar.")},error:function(){s("Terjadi kesalahan.")}})});let d,u=null;e("#addSubprogramBtn").on("click",function(){u=null,x(),e("#programId").val(""),e("#modalTitle").text("Tambah Program Baru"),e("#modalIcon").removeClass("fa-edit").addClass("fa-layer-group"),e("#submitText").text("Simpan Data"),e("#submitIcon").removeClass("fa-edit").addClass("fa-save"),y("programModal"),e("#programIsparent").val("")});e(function(){ClassicEditor.create(document.querySelector("#programDescription")).then(a=>{d=a,console.log("CKEditor siap dipakai!")}).catch(a=>{console.error(a)}),e("#programForm").on("submit",function(a){if(a.preventDefault(),!N()){s("Mohon lengkapi semua field yang wajib diisi!","error");return}if(!d){s("Editor belum siap, coba lagi!","error");return}const t=e("#submitBtn"),r=t.html();t.html('<i class="fas fa-spinner fa-spin mr-2"></i>Menyimpan...').prop("disabled",!0);const n=e("#programId").val(),o=new FormData;o.append("name",e("#programName").val()),o.append("startdate",e("#programStartdate").val()),o.append("enddate",e("#programEnddate").val()),o.append("description",d.getData());const c=e("#programImage")[0];c.files.length>0?o.append("gambar",c.files[0]):o.append("oldImage",e("#oldImage").val());const C=n?`/admin/program/${n}`:"/admin/program",T="POST";n&&o.append("_method","PUT"),e.ajax({url:C,type:T,data:o,processData:!1,contentType:!1,success:function(i){s(i.message,i.status),m("programModal"),t.html(r).prop("disabled",!1),p(e("#searchInputmenu").val(),l)},error:function(i){if(t.html(r).prop("disabled",!1),i.status===422&&i.responseJSON.errors){let f=i.responseJSON.errors,g=[];for(let b in f)f.hasOwnProperty(b)&&g.push(f[b].join(", "));s(g.join(" | "),"error")}else{let f=i.responseJSON&&i.responseJSON.message?i.responseJSON.message:"Terjadi kesalahan saat menyimpan data!";s(f,"error")}}})})});e(document).on("click",".edit-btn",function(){u=e(this).data("id"),x(),e("#modalTitle").text("Edit Data Program"),e("#modalIcon").removeClass("fa-bars").addClass("fa-edit"),e("#submitText").text("Update Data"),e("#submitIcon").removeClass("fa-save").addClass("fa-edit"),e.ajax({url:"/admin/program/"+u,type:"GET",success:function(a){e("#programId").val(a.id),e("#programName").val(a.name),e("#programEnddate").val(a.end_date),e("#programStartdate").val(a.start_date),d?d.setData(a.description||""):e("#programDescription").val(a.description),a.gambar?(e("#preview").attr("src","/"+a.gambar),e("#previewContainer").removeClass("hidden"),e("#oldImage").val(a.gambar)):(e("#preview").attr("src",""),e("#previewContainer").addClass("hidden"),e("#oldImage").val("")),w("programModal")},error:function(a){console.error("Gagal ambil data:",a.responseText),alert("Gagal ambil data program")}})});e(document).on("click",".delete-btn",function(){const a=e(this).data("id"),t=e(this).data("name");e("#deleteprogramId").val(a),e("#deleteProgramName").text(t),y("deleteModal")});e(document).on("click","#confirmDeleteBtn",function(){const a=e(this),t=a.html();a.html('<i class="fas fa-spinner fa-spin mr-2"></i>Menghapus...').prop("disabled",!0);const r=e("#deleteprogramId").val();e.ajax({url:`/admin/program/${r}`,type:"DELETE",success:function(n){s(n.message,n.status),m("deleteModal"),p()},error:function(n){let o=n.responseJSON&&n.responseJSON.message?n.responseJSON.message:"Gagal menghapus data!";s(o,"error")},complete:function(){a.html(t).prop("disabled",!1)}})});
