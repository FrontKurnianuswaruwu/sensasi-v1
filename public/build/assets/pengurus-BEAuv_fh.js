import{$ as e}from"./jquery-BvxTx_lq.js";e.ajaxSetup({headers:{"X-CSRF-TOKEN":e('meta[name="csrf-token"]').attr("content")}});e(function(){u()});let d=1;const h=10;function T(t){const a=e("#tablePengurus");if(a.empty(),t.length===0){a.append(`
            <tr>
                <td colspan="5" class="px-6 py-8 text-center text-gray-500">
                    <i class="fas fa-info-circle text-gray-400 mr-2"></i>
                    Tidak ada data ditemukan
                </td>
            </tr>
        `);return}t.forEach((s,n)=>{const o=`
            <tr class="hover:bg-gray-50 transition-colors duration-200">
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${n+1}</td>
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10">
                        <div class="h-10 w-10 rounded-full bg-gradient-to-r gradient-bg to-blue-light flex items-center justify-center text-white font-semibold">
                        ${s.nama.charAt(0)}
                        </div>
                    </div>
                    <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">${s.nama}</div>
                    </div>
                </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                ${s.jabatan||"-"}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm">
                <button class="edit-btn px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all mr-2" data-id="${s.id}">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="delete-btn px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all" data-id="${s.id}" data-name="${s.nama}">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
            </tr>
        `;a.append(o)})}function k(t){const a=e("#cardContainer");if(a.empty(),t.length===0){a.append(`
            <div class="p-6 text-center text-gray-500">
                <i class="fas fa-info-circle text-gray-400 mr-2"></i>
                Tidak ada data ditemukan
            </div>
        `);return}t.forEach(s=>{let n="fa-user-tie";if(s.jabatan){const i=s.jabatan.toLowerCase();i.includes("ketua")?n="fa-crown":i.includes("wakil")?n="fa-user-friends":i.includes("sekretaris")?n="fa-file-signature":i.includes("bendahara")?n="fa-wallet":i.includes("anggota")&&(n="fa-users")}const o=`
            <div class="p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200">
            <div class="flex items-start space-x-3">
                <div class="flex-shrink-0 h-12 w-12 rounded-full bg-gradient-to-r gradient-bg to-blue-light flex items-center justify-center text-white font-semibold text-lg">
                ${s.nama.charAt(0)}
                </div>
                <div class="flex-1 min-w-0">
                <div class="flex items-center justify-between mb-2">
                    <h3 class="text-lg font-semibold text-gray-900 truncate">${s.nama}</h3>
                </div>
                <div class="space-y-1 text-sm text-gray-600">
                    <div class="flex items-center">
                    <i class="fas ${n} w-4 mr-2 text-orange-primary"></i>
                    <span class="truncate">${s.jabatan||"-"}</span>
                    </div>
                    <div class="flex mt-4 space-x-2">
                    <button class="edit-btn flex-1 px-3 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all" data-id="${s.id}">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="delete-btn flex-1 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all" data-id="${s.id}" data-name="${s.nama}">
                        <i class="fas fa-trash"></i> Hapus
                    </button>
                    </div>
                </div>
                </div>
            </div>
            </div>
        `;a.append(o)})}function F(t,a){const s=e("#pagination");if(s.empty(),!(t<=1))for(let n=1;n<=t;n++){const o=e(`<button class="page-btn mx-1 px-3 py-1 rounded-lg border ${n===d?"bg-orange-primary text-white":"bg-white text-gray-700 hover:bg-gray-100"}">${n}</button>`);o.on("click",function(){d=n,u(a,d)}),s.append(o)}}function $(t,a){const s=e("#paginationMobile");if(s.empty(),!(t<=1))for(let n=1;n<=t;n++){const o=e(`<button class="px-3 py-1 rounded-lg border ${n===d?"bg-orange-primary text-white":"bg-white text-gray-700 hover:bg-gray-100"}">${n}</button>`);o.on("click",function(){d=n,u(a,d)}),s.append(o)}}function u(t="",a=1){e.ajax({url:"/admin/getpengurus",type:"GET",data:{search:t,page:a,limit:h},dataType:"json",success:function(s){const n=s.data;if(!Array.isArray(n)){console.error("Response data bukan array:",n);return}T(n),k(n),F(s.last_page,t),$(s.last_page,t);let o=(s.current_page-1)*h+1,i=o+n.length-1;e("#resultCount").html(`
                <i class="fas fa-info-circle mr-1"></i>
                Menampilkan ${o} - ${i} dari ${s.total} data
            `)},error:function(s,n,o){console.error("Gagal ambil data:",o,s.responseText)}})}e("#searchInputpengurus").on("input",function(){const t=e(this).val();d=1,u(t,d)});function v(){e("#pengurusForm")[0].reset(),e("#pengurusForm input, #pengurusForm select, #pengurusForm textarea").removeClass("border-red-300 bg-red-50"),e("#pengurusForm input, #pengurusForm select").each(function(){e(this).removeClass("border-red-300 bg-red-50"),I(this)}),e("#preview").attr("src",""),e("#previewContainer").addClass("hidden")}function x(t){y(t),j()}function y(t){const a=e("#"+t);a.removeClass("hidden"),setTimeout(()=>{a.find(".modal-content").addClass("show")},10),e("body").addClass("overflow-hidden")}function j(){e("body").css({overflow:"hidden","padding-right":""})}function I(t){const s=e(t).attr("id")+"-error";e("#"+s).remove()}e("#cancelDeleteBtn").on("click",function(){c("deleteModal")});e("#closeModal, #cancelBtn").on("click",function(){c("pengurusModal")});function c(t){M(t),E()}function M(t){const a=e("#"+t);a.find(".modal-content").removeClass("show"),setTimeout(()=>{a.addClass("hidden"),e("body").removeClass("overflow-hidden")},300)}function E(){e("body").css({overflow:"","padding-right":""})}e(".modal-overlay").on("click",function(t){t.target===this&&(e(this).closest("#pengurusModal").length?c("pengurusModal"):e(this).closest("#deleteModal").length&&c("deleteModal"))});function r(t,a="info"){const o=e(`
            <div class="notification flex items-center space-x-3 ${a==="success"?"bg-green-500":a==="error"?"bg-red-500":"bg-blue-500"} text-white px-6 py-4 rounded-xl shadow-lg transform translate-x-full opacity-0 transition-all duration-300 cursor-pointer">
            <i class="fas ${a==="success"?"fa-check-circle":a==="error"?"fa-exclamation-circle":"fa-info-circle"} text-lg"></i>
            <span class="font-medium">${t}</span>
            </div>
            `);e("#notificationWrapper").append(o),setTimeout(()=>{o.removeClass("translate-x-full opacity-0")},100);const i=setTimeout(()=>{o.addClass("translate-x-full opacity-0"),setTimeout(()=>o.remove(),300)},4e3);o.on("click",function(){clearTimeout(i),e(this).addClass("translate-x-full opacity-0"),setTimeout(()=>e(this).remove(),300)})}function S(){let t=!0;return["pengurusNama","pengurusJabatan"].forEach(function(s){const n=e("#"+s);!n.val()||!n.val().toString().trim()?(n.addClass("border-red-300 bg-red-50"),t=!1):n.removeClass("border-red-300 bg-red-50")}),t}e("#pengurusFoto").on("change",function(){const t=this;if(t.files&&t.files[0]){const a=new FileReader;a.onload=function(s){e("#preview").attr("src",s.target.result),e("#previewContainer").removeClass("hidden")},a.readAsDataURL(t.files[0])}});e("#dropzone").on("drop",function(t){t.preventDefault();const a=t.originalEvent.dataTransfer.files;e("#pengurusFoto")[0].files=a,e("#pengurusFoto").trigger("change")}).on("dragleave",function(){e(this).removeClass("border-blue-primary bg-blue-50")}).on("drop",function(t){t.preventDefault();const a=t.originalEvent.dataTransfer.files;e("#pengurusFoto")[0].files=a,e("#pengurusFoto").trigger("change")});e("#removeFoto").on("click",function(){let t=e("#pengurusId").val();if(!t){r("ID Pengurus tidak ditemukan.");return}e.ajax({url:"/pengurus/deleteFoto",type:"POST",data:{id:t},success:function(a){a.success?(e("#pengurusFoto").val(""),e("#previewContainer").addClass("hidden"),e("#preview").attr("src",""),r(a.message,"success")):r("Gagal menghapus foto.")},error:function(){r("Terjadi kesalahan.")}})});let p,g=null;e("#addSubpengurusBtn").on("click",function(){g=null,v(),e("#pengurusId").val(""),e("#modalTitle").text("Tambah Pengurus Baru"),e("#modalIcon").removeClass().addClass("fas fa-users"),e("#submitText").text("Simpan Data"),e("#submitIcon").removeClass("fa-edit").addClass("fa-save"),x("pengurusModal"),e("#pengurusIsparent").val("")});e(function(){ClassicEditor.create(document.querySelector("#pengurusBiodata")).then(t=>{p=t,console.log("CKEditor siap dipakai!")}).catch(t=>{console.error(t)}),e("#pengurusForm").on("submit",function(t){if(t.preventDefault(),!S()){r("Mohon lengkapi semua field yang wajib diisi!","error");return}const a=e("#submitBtn"),s=a.html();a.html('<i class="fas fa-spinner fa-spin mr-2"></i>Menyimpan...').prop("disabled",!0);const n=e("#pengurusId").val(),o=new FormData;o.append("nama",e("#pengurusNama").val()),o.append("jabatan",e("#pengurusJabatan").val()),o.append("biodata",p.getData());const i=e("#pengurusFoto")[0];i.files.length>0?o.append("foto",i.files[0]):o.append("oldFoto",e("#oldFoto").val());const w=n?`/admin/pengurus/${n}`:"/admin/pengurus",C="POST";n&&o.append("_method","PUT"),e.ajax({url:w,type:C,data:o,processData:!1,contentType:!1,success:function(l){r(l.message,l.status),c("pengurusModal"),a.html(s).prop("disabled",!1),u(e("#searchInputpengurus").val(),d)},error:function(l){if(a.html(s).prop("disabled",!1),l.status===422&&l.responseJSON.errors){let f=l.responseJSON.errors,m=[];for(let b in f)f.hasOwnProperty(b)&&m.push(f[b].join(", "));r(m.join(" | "),"error")}else{let f=l.responseJSON&&l.responseJSON.message?l.responseJSON.message:"Terjadi kesalahan saat menyimpan data!";r(f,"error")}}})})});e(document).on("click",".edit-btn",function(){g=e(this).data("id"),v(),e("#modalTitle").text("Edit Data Pengurus"),e("#modalIcon").removeClass().addClass("fas fa-users"),e("#submitText").text("Update Data"),e("#submitIcon").removeClass("fa-save").addClass("fa-edit"),e.ajax({url:"/admin/pengurus/"+g,type:"GET",success:function(t){e("#pengurusId").val(t.id),e("#pengurusNama").val(t.nama),e("#pengurusJabatan").val(t.jabatan),p?p.setData(t.biodata||""):e("#pengurusBiodata").val(t.biodata),t.foto?(e("#preview").attr("src","/"+t.foto),e("#previewContainer").removeClass("hidden"),e("#oldFoto").val(t.foto)):(e("#preview").attr("src",""),e("#previewContainer").addClass("hidden"),e("#oldFoto").val("")),y("pengurusModal")},error:function(t){console.error("Gagal ambil data:",t.responseText),alert("Gagal ambil data pengurus")}})});e(document).on("click",".delete-btn",function(){const t=e(this).data("id"),a=e(this).data("name");e("#deletepengurusId").val(t),e("#deletePengurusName").text(a),x("deleteModal")});e(document).on("click","#confirmDeleteBtn",function(){const t=e(this),a=t.html();t.html('<i class="fas fa-spinner fa-spin mr-2"></i>Menghapus...').prop("disabled",!0);const s=e("#deletepengurusId").val();e.ajax({url:`/admin/pengurus/${s}`,type:"DELETE",success:function(n){r(n.message,n.status),c("deleteModal"),u()},error:function(n){let o=n.responseJSON&&n.responseJSON.message?n.responseJSON.message:"Gagal menghapus data!";r(o,"error")},complete:function(){t.html(a).prop("disabled",!1)}})});e("#removeFoto").on("click",function(){let t=e("#pengurusId").val();if(!t){r("ID Pengurus tidak ditemukan.");return}e.ajax({url:"/pengurus/deleteFoto",type:"POST",data:{id:t},success:function(a){a.success?(e("#pengurusFoto").val(""),e("#previewContainer").addClass("hidden"),e("#preview").attr("src",""),r(a.message,"success")):r("Gagal menghapus foto.")},error:function(){r("Terjadi kesalahan.")}})});
