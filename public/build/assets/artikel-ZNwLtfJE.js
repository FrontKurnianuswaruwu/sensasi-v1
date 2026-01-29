import{$ as e}from"./jquery-BvxTx_lq.js";e.ajaxSetup({headers:{"X-CSRF-TOKEN":e('meta[name="csrf-token"]').attr("content")}});e(function(){p()});let c=1;const y=10;function T(t){const n=e("#tableArtikel");if(n.empty(),t.length===0){n.append(`
            <tr>
                <td colspan="5" class="px-6 py-8 text-center text-gray-500">
                    <i class="fas fa-info-circle text-gray-400 mr-2"></i>
                    Tidak ada data ditemukan
                </td>
            </tr>
        `);return}t.forEach((r,a)=>{let s="";switch(r.status){case"pending":s='<span class="px-3 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-700 border border-yellow-300">Pending</span>';break;case"approved":s='<span class="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700 border border-green-300">Approved</span>';break;case"rejected":s='<span class="px-3 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-700 border border-red-300">Rejected</span>';break;default:s='<span class="px-3 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-700 border border-gray-300">Unknown</span>'}let i="";r.role===9?i=`
                <span class="inline-flex items-center px-3 py-1 text-gray-400 bg-gray-100 border border-gray-300 rounded-lg cursor-not-allowed" 
                    title="Data terkunci untuk role 9">
                    <i class="fas fa-lock mr-1"></i> Terkunci
                </span>
            `:i=`
                ${r.has_biodata?"":`<button class="approve-btn px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all" 
                        data-id="${r.id}" title="Approve">
                        <i class="fas fa-check"></i>
                </button>`}
                <button class="edit-btn px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all" 
                        data-id="${r.id}" data-name="${r.nama}">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="delete-btn px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all" 
                        data-id="${r.id}" data-name="${r.nama}">
                    <i class="fas fa-trash"></i>
                </button>
            `;const m=`
            <tr class="hover:bg-gray-50 transition-colors duration-200">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${a+1}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                        <div class="flex-shrink-0 h-10 w-10">
                            <div class="h-10 w-10 rounded-full bg-gradient-to-r gradient-bg to-blue-light flex items-center justify-center text-white font-semibold">
                                ${r.nama.charAt(0)}
                            </div>
                        </div>
                        <div class="ml-4">
                            <div class="text-sm font-medium text-gray-900">${r.nama}</div>
                        </div>
                    </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${r.deskripsi||"-"}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${s}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm">
                    ${i}
                </td>
            </tr>
        `;n.append(m)})}function $(t){const n=e("#cardContainer");if(n.empty(),t.length===0){n.append(`
            <div class="p-6 text-center text-gray-500">
                <i class="fas fa-info-circle text-gray-400 mr-2"></i>
                Tidak ada data ditemukan
            </div>
        `);return}t.forEach(r=>{const a=`
            <div class="p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200">
            <div class="flex items-start space-x-3">
                <div class="flex-shrink-0 h-12 w-12 rounded-full bg-gradient-to-r gradient-bg to-blue-light flex items-center justify-center text-white font-semibold text-lg">
                ${r.nama.charAt(0)}
                </div>
                <div class="flex-1 min-w-0">
                <div class="flex items-center justify-between mb-2">
                    <h3 class="text-lg font-semibold text-gray-900 truncate">${r.nama}</h3>
                </div>
                <div class="space-y-1 text-sm text-gray-600">
                    <div class="flex mt-4 space-x-2">
                    <button class="edit-btn flex-1 px-3 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all" data-id="${r.id}">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="delete-btn flex-1 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all" data-id="${r.id}" data-name="${r.nama}">
                        <i class="fas fa-trash"></i> Hapus
                    </button>
                    </div>
                </div>
                </div>
            </div>
            </div>
        `;n.append(a)})}function P(t,n){const r=e("#pagination");if(r.empty(),!(t<=1))for(let a=1;a<=t;a++){const s=e(`<button class="page-btn mx-1 px-3 py-1 rounded-lg border ${a===c?"bg-orange-primary text-white":"bg-white text-gray-700 hover:bg-gray-100"}">${a}</button>`);s.on("click",function(){c=a,p(n,c)}),r.append(s)}}function F(t,n){const r=e("#paginationMobile");if(r.empty(),!(t<=1))for(let a=1;a<=t;a++){const s=e(`<button class="px-3 py-1 rounded-lg border ${a===c?"bg-orange-primary text-white":"bg-white text-gray-700 hover:bg-gray-100"}">${a}</button>`);s.on("click",function(){c=a,p(n,c)}),r.append(s)}}function p(t="",n=1){e.ajax({url:"/admin/getkreatif",type:"GET",data:{search:t,page:n,limit:y},dataType:"json",success:function(r){const a=r.data;if(!Array.isArray(a)){console.error("Response data bukan array:",a);return}T(a),$(a),P(r.last_page,t),F(r.last_page,t);let s=(r.current_page-1)*y+1,i=s+a.length-1;e("#resultCount").html(`
                <i class="fas fa-info-circle mr-1"></i>
                Menampilkan ${s} - ${i} dari ${r.total} data
            `)},error:function(r,a,s){console.error("Gagal ambil data:",s,r.responseText)}})}e("#searchInputartikel").on("input",function(){const t=e(this).val();c=1,p(t,c)});function k(){e("#artikelForm")[0].reset(),e("#artikelForm input, #artikelForm select, #artikelForm textarea").removeClass("border-red-300 bg-red-50"),e("#artikelForm input, #artikelForm select").each(function(){e(this).removeClass("border-red-300 bg-red-50"),j(this)}),e("#preview").attr("src",""),e("#pdfPreviewContainer").addClass("hidden")}function b(t){w(t),M()}function w(t){const n=e("#"+t);n.removeClass("hidden"),setTimeout(()=>{n.find(".modal-content").addClass("show")},10),e("body").addClass("overflow-hidden")}function M(){e("body").css({overflow:"hidden","padding-right":""})}function j(t){const r=e(t).attr("id")+"-error";e("#"+r).remove()}e("#cancelDeleteBtn").on("click",function(){l("deleteModal")});e("#cancelApproveBtn").on("click",function(){l("approveModal")});e("#closeModal, #cancelBtn").on("click",function(){l("artikelModal")});function l(t){S(t),I()}function S(t){const n=e("#"+t);n.find(".modal-content").removeClass("show"),setTimeout(()=>{n.addClass("hidden"),e("body").removeClass("overflow-hidden")},300)}function I(){e("body").css({overflow:"","padding-right":""})}e(".modal-overlay").on("click",function(t){t.target===this&&(e(this).closest("#artikelModal").length?l("artikelModal"):e(this).closest("#deleteModal").length?l("deleteModal"):e(this).closest("#approveModal").length&&l("approveModal"))});function o(t,n="info"){const s=e(`
            <div class="notification flex items-center space-x-3 ${n==="success"?"bg-green-500":n==="error"?"bg-red-500":"bg-blue-500"} text-white px-6 py-4 rounded-xl shadow-lg transform translate-x-full opacity-0 transition-all duration-300 cursor-pointer">
            <i class="fas ${n==="success"?"fa-check-circle":n==="error"?"fa-exclamation-circle":"fa-info-circle"} text-lg"></i>
            <span class="font-medium">${t}</span>
            </div>
            `);e("#notificationWrapper").append(s),setTimeout(()=>{s.removeClass("translate-x-full opacity-0")},100);const i=setTimeout(()=>{s.addClass("translate-x-full opacity-0"),setTimeout(()=>s.remove(),300)},4e3);s.on("click",function(){clearTimeout(i),e(this).addClass("translate-x-full opacity-0"),setTimeout(()=>e(this).remove(),300)})}function D(){let t=!0;["artikelNama"].forEach(function(s){const i=e("#"+s);!i.val()||!i.val().toString().trim()?(i.addClass("border-red-300 bg-red-50"),t=!1):i.removeClass("border-red-300 bg-red-50")});const r=u.getData().replace(/<[^>]*>/g,"").trim(),a=e("#artikelDeskripsi").closest(".ck-editor");return r?a.removeClass("border-red-300 bg-red-50"):(a.addClass("border-red-300 bg-red-50"),t=!1),t}e("#artikelPdf").on("change",function(){const t=this.files[0];t&&t.type==="application/pdf"?(e("#pdfPreview").attr("src",URL.createObjectURL(t)),e("#pdfPreviewContainer").removeClass("hidden")):(e("#pdfPreview").attr("src",""),e("#pdfPreviewContainer").addClass("hidden"),alert("File bukan PDF!"))});e("#artikelFoto").on("change",function(){const t=this.files[0];t&&t.type.startsWith("image/")?(e("#preview").attr("src",URL.createObjectURL(t)),e("#previewContainer").removeClass("hidden")):(e("#preview").attr("src",""),e("#previewContainer").addClass("hidden"),alert("File bukan gambar!"))});e("#dropzone").on("dragover",function(t){t.preventDefault(),e(this).addClass("border-blue-primary bg-blue-50")}).on("dragleave",function(){e(this).removeClass("border-blue-primary bg-blue-50")}).on("drop",function(t){t.preventDefault(),e(this).removeClass("border-blue-primary bg-blue-50");const n=t.originalEvent.dataTransfer.files;if(!n.length)return;const r=n[0];if(r.type.startsWith("image/")){const a=e("#artikelFoto")[0];a&&(a.files=n,e("#artikelFoto").trigger("change"))}else if(r.type==="application/pdf"){const a=e("#artikelPdf")[0];a&&(a.files=n,e("#artikelPdf").trigger("change"))}else alert("Hanya boleh upload PDF atau gambar!")});e("#removeFoto").on("click",function(){const t=e("#artikelFoto")[0];t&&(t.value=""),e("#preview").attr("src",""),e("#previewContainer").addClass("hidden"),e("#oldFoto").val("")});let u,g=null;e("#addSubartikelBtn").on("click",function(){g=null,k(),e("#artikelId").val(""),e("#modalTitle").text("Tambah Artikel Baru"),e("#modalIcon").removeClass().addClass("fas fa-newspaper"),e("#submitText").text("Simpan Data"),e("#submitIcon").removeClass("fa-edit").addClass("fa-save"),b("artikelModal"),e("#artikelIsparent").val("")});e(function(){ClassicEditor.create(document.querySelector("#artikelDeskripsi")).then(t=>{u=t,console.log("CKEditor siap dipakai!")}).catch(t=>{console.error(t)}),e("#artikelForm").on("submit",function(t){if(t.preventDefault(),!D()){o("Mohon lengkapi semua field yang wajib diisi!","error");return}const n=e("#submitBtn"),r=n.html();n.html('<i class="fas fa-spinner fa-spin mr-2"></i>Menyimpan...').prop("disabled",!0);const a=e("#artikelId").val(),s=new FormData;s.append("nama",e("#artikelNama").val()),s.append("deskripsi",u.getData());const i=e("#artikelPdf")[0];i&&i.files.length>0&&s.append("pdf",i.files[0]);const m=e("#artikelFoto")[0];m.files.length>0?s.append("foto",m.files[0]):s.append("oldFoto",e("#oldFoto").val());const v=a?`/admin/kreatif/${a}`:"/admin/kreatif",C="POST";a&&s.append("_method","PUT"),e.ajax({url:v,type:C,data:s,processData:!1,contentType:!1,success:function(d){o(d.message,d.status),l("artikelModal"),n.html(r).prop("disabled",!1),p(e("#searchInputartikel").val(),c)},error:function(d){if(n.html(r).prop("disabled",!1),d.status===422&&d.responseJSON.errors){let f=d.responseJSON.errors,h=[];for(let x in f)f.hasOwnProperty(x)&&h.push(f[x].join(", "));o(h.join(" | "),"error")}else{let f=d.responseJSON&&d.responseJSON.message?d.responseJSON.message:"Terjadi kesalahan saat menyimpan data!";o(f,"error")}}})})});e(document).on("click",".edit-btn",function(){g=e(this).data("id"),k(),e("#modalTitle").text("Edit Data Artikel"),e("#modalIcon").removeClass().addClass("fas fa-newspaper"),e("#submitText").text("Update Data"),e("#submitIcon").removeClass("fa-save").addClass("fa-edit"),e.ajax({url:"/admin/kreatif/"+g,type:"GET",success:function(t){e("#artikelId").val(t.id),e("#artikelNama").val(t.nama),u?u.setData(t.deskripsi||""):e("#artikelDeskripsi").val(t.deskripsi),t.pdf?(e("#pdfPreview").attr("src","/"+t.pdf),e("#pdfPreviewContainer").removeClass("hidden"),e("#oldPdf").val(t.pdf)):(e("#pdfPreview").attr("src",""),e("#pdfPreviewContainer").addClass("hidden"),e("#oldPdf").val("")),t.foto?(e("#preview").attr("src","/"+t.foto),e("#previewContainer").removeClass("hidden"),e("#oldFoto").val(t.foto)):(e("#preview").attr("src",""),e("#previewContainer").addClass("hidden"),e("#oldFoto").val("")),w("artikelModal")},error:function(t){console.error("Gagal ambil data:",t.responseText),alert("Gagal ambil data artikel")}})});e(document).on("click",".delete-btn",function(){const t=e(this).data("id"),n=e(this).data("name");e("#deleteartikelId").val(t),e("#deleteArtikelName").text(n),b("deleteModal")});e(document).on("click","#confirmDeleteBtn",function(){const t=e(this),n=t.html();t.html('<i class="fas fa-spinner fa-spin mr-2"></i>Menghapus...').prop("disabled",!0);const r=e("#deleteartikelId").val();e.ajax({url:`/admin/kreatif/${r}`,type:"DELETE",success:function(a){o(a.message,a.status),l("deleteModal"),p()},error:function(a){let s=a.responseJSON&&a.responseJSON.message?a.responseJSON.message:"Gagal menghapus data!";o(s,"error")},complete:function(){t.html(n).prop("disabled",!1)}})});e("#removePdf").on("click",function(){let t=e("#artikelId").val();if(!t){o("ID Pengurus tidak ditemukan.");return}e.ajax({url:"/kreatif/deletePdf",type:"POST",data:{id:t},success:function(n){n.success?(e("#artikelPdf").val(""),e("#pdfPreviewContainer").addClass("hidden"),e("#preview").attr("src",""),o(n.message,"success")):o("Gagal menghapus foto.")},error:function(){o("Terjadi kesalahan.")}})});e(document).on("click",".approve-btn",function(){const t=e(this).data("id"),n=e(this).data("name");e("#approveartikelId").val(t),e("#approveArtikelName").text(n),b("approveModal")});e(document).on("click","#confirmApproveBtn",function(){const t=e(this),n=t.html();t.html('<i class="fas fa-spinner fa-spin mr-2"></i>Menyetujui...').prop("disabled",!0);const r=e("#approveartikelId").val();e.ajax({url:`/admin/approvekreatif/${r}`,type:"POST",success:function(a){o(a.message,a.status),l("approveModal"),p()},error:function(a){let s=a.responseJSON&&a.responseJSON.message?a.responseJSON.message:"Gagal menyetujui data!";o(s,"error")},complete:function(){t.html(n).prop("disabled",!1)}})});e(document).on("click","#confirmRejectBtn",function(){const t=e(this),n=t.html();t.html('<i class="fas fa-spinner fa-spin mr-2"></i>Menyetujui...').prop("disabled",!0);const r=e("#approveartikelId").val();e.ajax({url:`/admin/rejectkreatif/${r}`,type:"POST",success:function(a){o(a.message,a.status),l("approveModal"),p()},error:function(a){let s=a.responseJSON&&a.responseJSON.message?a.responseJSON.message:"Gagal menyetujui data!";o(s,"error")},complete:function(){t.html(n).prop("disabled",!1)}})});e("#pendaftaranSwitch").click(function(){e.ajax({url:"/pendaftaran/toggle",type:"POST",success:function(t){const n=e("#pendaftaranBg"),r=e("#pendaftaranKnob");t.value==1?(n.removeClass("bg-gray-300").addClass("bg-green-500"),r.addClass("translate-x-8")):(n.removeClass("bg-green-500").addClass("bg-gray-300"),r.removeClass("translate-x-8"))},error:function(){alert("Gagal mengubah status pendaftaran.")}})});
