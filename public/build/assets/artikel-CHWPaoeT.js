import{$ as e}from"./jquery-CEr4rF5i.js";import"./summernote-lite.min-Dso9tUEj.js";e.ajaxSetup({headers:{"X-CSRF-TOKEN":e('meta[name="csrf-token"]').attr("content")}});e(function(){p()});let l=1;const k=10;function $(a){const n=e("#tableArtikel");if(n.empty(),a.length===0){n.append(`
            <tr>
                <td colspan="5" class="px-6 py-10 text-center text-gray-500">
                    <i class="fas fa-info-circle text-gray-300 text-4xl mb-3 block"></i>
                    Tidak ada data ditemukan
                </td>
            </tr>
        `);return}a.forEach((t,s)=>{let r="";switch(t.status){case"pending":r='<span class="px-3 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-700 border border-yellow-300">Pending</span>';break;case"waiting_approval":r='<span class="px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-700 border border-blue-300">Menunggu Approval</span>';break;case"approved":r='<span class="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700 border border-green-300">Approved</span>';break;case"rejected":r='<span class="px-3 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-700 border border-red-300">Rejected</span>';break;default:r='<span class="px-3 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-700 border border-gray-300">Unknown</span>'}let o="";t.role===9?t.status==="pending"||t.status==="rejected"?o=`
                    <button class="confirm-btn inline-flex items-center px-3 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all shadow-sm mr-2"
                            data-id="${t.id}" data-name="${t.nama}" title="Confirm">
                        <i class="fas fa-check-circle mr-1.5"></i> Confirm
                    </button>
                    <button class="edit-btn inline-flex items-center px-3 py-1.5 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all shadow-sm mr-2"
                            data-id="${t.id}" data-name="${t.nama}">
                        <i class="fas fa-edit mr-1.5"></i> Edit
                    </button>
                    <button class="delete-btn inline-flex items-center px-3 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all shadow-sm"
                            data-id="${t.id}" data-name="${t.nama}">
                        <i class="fas fa-trash mr-1.5"></i> Hapus
                    </button>
                `:t.status==="waiting_approval"?o=`
                    <span class="inline-flex items-center px-3 py-1.5 text-blue-600 bg-blue-50 border border-blue-300 rounded-lg">
                        <i class="fas fa-clock mr-1.5"></i> Menunggu Approval
                    </span>
                `:t.status==="approved"&&(o=`
                    <span class="inline-flex items-center px-3 py-1.5 text-green-600 bg-green-50 border border-green-300 rounded-lg">
                        <i class="fas fa-check-circle mr-1.5"></i> Sudah Disetujui
                    </span>
                `):t.status==="waiting_approval"?o=`
                    <button class="approve-btn inline-flex items-center px-3 py-1.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all shadow-sm mr-2"
                            data-id="${t.id}" data-name="${t.nama}" title="Approve/Reject">
                        <i class="fas fa-check mr-1.5"></i> Approve
                    </button>
                    <button class="edit-btn inline-flex items-center px-3 py-1.5 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all shadow-sm mr-2"
                            data-id="${t.id}" data-name="${t.nama}">
                        <i class="fas fa-edit mr-1.5"></i> Edit
                    </button>
                    <button class="delete-btn inline-flex items-center px-3 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all shadow-sm"
                            data-id="${t.id}" data-name="${t.nama}">
                        <i class="fas fa-trash mr-1.5"></i> Hapus
                    </button>
                `:o=`
                    <button class="edit-btn inline-flex items-center px-3 py-1.5 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all shadow-sm mr-2"
                            data-id="${t.id}" data-name="${t.nama}">
                        <i class="fas fa-edit mr-1.5"></i> Edit
                    </button>
                    <button class="delete-btn inline-flex items-center px-3 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all shadow-sm"
                            data-id="${t.id}" data-name="${t.nama}">
                        <i class="fas fa-trash mr-1.5"></i> Hapus
                    </button>
                `;const f=t.nama||"-",m=f.charAt(0).toUpperCase(),b=`
            <tr class="hover:bg-gray-50 transition-colors duration-200 border-b border-gray-100">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    ${s+1}
                </td>

                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                        <div class="flex-shrink-0 h-10 w-10">
                            <div class="h-10 w-10 rounded-full bg-gradient-to-r from-blue-600 to-blue-400 flex items-center justify-center text-white font-bold shadow-sm">
                                ${m}
                            </div>
                        </div>
                        <div class="ml-4">
                            <div class="text-sm font-semibold text-gray-900">${f}</div>
                            <div class="text-xs text-gray-500">Artikel</div>
                        </div>
                    </div>
                </td>

                <td class="px-6 py-4 text-sm text-gray-700">
                    ${t.deskripsi||"-"}
                </td>

                <td class="px-6 py-4 whitespace-nowrap text-sm">
                    ${r}
                </td>

                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    ${o}
                </td>
            </tr>
        `;n.append(b)})}function T(a){const n=e("#cardContainer");if(n.empty(),a.length===0){n.append(`
            <div class="p-10 text-center text-gray-500">
                <i class="fas fa-info-circle text-gray-300 text-4xl mb-3 block"></i>
                Tidak ada artikel ditemukan
            </div>
        `);return}a.forEach(t=>{let s="";switch(t.status){case"pending":s='<span class="px-3 py-1 text-[10px] font-bold rounded-full bg-yellow-100 text-yellow-700 border border-yellow-300 uppercase">Pending</span>';break;case"waiting_approval":s='<span class="px-3 py-1 text-[10px] font-bold rounded-full bg-blue-100 text-blue-700 border border-blue-300 uppercase">Menunggu Approval</span>';break;case"approved":s='<span class="px-3 py-1 text-[10px] font-bold rounded-full bg-green-100 text-green-700 border border-green-300 uppercase">Approved</span>';break;case"rejected":s='<span class="px-3 py-1 text-[10px] font-bold rounded-full bg-red-100 text-red-700 border border-red-300 uppercase">Rejected</span>';break;default:s='<span class="px-3 py-1 text-[10px] font-bold rounded-full bg-gray-100 text-gray-700 border border-gray-300 uppercase">Unknown</span>'}let r="";t.role===9?t.status==="pending"||t.status==="rejected"?r=`
                    <button class="confirm-btn flex-1 py-2.5 bg-blue-50 text-blue-600 rounded-xl text-xs font-bold hover:bg-blue-100 transition-all active:scale-95"
                        data-id="${t.id}" data-name="${t.nama}">
                        <i class="fas fa-check-circle mr-1"></i> CONFIRM
                    </button>
                    <button class="edit-btn flex-1 py-2.5 bg-yellow-50 text-yellow-600 rounded-xl text-xs font-bold hover:bg-yellow-100 transition-all active:scale-95"
                        data-id="${t.id}" data-name="${t.nama}">
                        <i class="fas fa-edit mr-1"></i> EDIT
                    </button>
                    <button class="delete-btn flex-1 py-2.5 bg-red-50 text-red-600 rounded-xl text-xs font-bold hover:bg-red-100 transition-all active:scale-95"
                        data-id="${t.id}" data-name="${t.nama}">
                        <i class="fas fa-trash mr-1"></i> HAPUS
                    </button>
                `:t.status==="waiting_approval"?r=`
                    <div class="w-full text-center py-2 bg-blue-100 text-blue-600 rounded-lg text-xs font-bold border border-blue-200">
                        <i class="fas fa-clock mr-1"></i> MENUNGGU APPROVAL
                    </div>
                `:t.status==="approved"&&(r=`
                    <div class="w-full text-center py-2 bg-green-100 text-green-600 rounded-lg text-xs font-bold border border-green-200">
                        <i class="fas fa-check-circle mr-1"></i> SUDAH DISETUJUI
                    </div>
                `):t.status==="waiting_approval"?r=`
                    <button class="approve-btn flex-1 py-2.5 bg-green-50 text-green-600 rounded-xl text-xs font-bold hover:bg-green-100 transition-all active:scale-95"
                        data-id="${t.id}" data-name="${t.nama}">
                        <i class="fas fa-check mr-1"></i> APPROVE
                    </button>
                    <button class="edit-btn flex-1 py-2.5 bg-yellow-50 text-yellow-600 rounded-xl text-xs font-bold hover:bg-yellow-100 transition-all active:scale-95"
                        data-id="${t.id}" data-name="${t.nama}">
                        <i class="fas fa-edit mr-1"></i> EDIT
                    </button>
                    <button class="delete-btn flex-1 py-2.5 bg-red-50 text-red-600 rounded-xl text-xs font-bold hover:bg-red-100 transition-all active:scale-95"
                        data-id="${t.id}" data-name="${t.nama}">
                        <i class="fas fa-trash mr-1"></i> HAPUS
                    </button>
                `:r=`
                    <button class="edit-btn flex-1 py-2.5 bg-yellow-50 text-yellow-600 rounded-xl text-xs font-bold hover:bg-yellow-100 transition-all active:scale-95"
                        data-id="${t.id}" data-name="${t.nama}">
                        <i class="fas fa-edit mr-1"></i> EDIT
                    </button>
                    <button class="delete-btn flex-1 py-2.5 bg-red-50 text-red-600 rounded-xl text-xs font-bold hover:bg-red-100 transition-all active:scale-95"
                        data-id="${t.id}" data-name="${t.nama}">
                        <i class="fas fa-trash mr-1"></i> HAPUS
                    </button>
                `;const f=`
            <div class="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm mb-4 transition-all hover:shadow-md">
                <div class="flex justify-between items-start mb-4">
                    <div class="flex items-center space-x-3">
                        <div class="h-11 w-11 rounded-full bg-gradient-to-br from-blue-600 to-indigo-500 flex items-center justify-center text-white font-bold shadow-sm">
                            ${t.nama?t.nama.charAt(0).toUpperCase():"?"}
                        </div>
                        <div class="max-w-[150px]">
                            <h3 class="text-sm font-extrabold text-gray-900 truncate uppercase tracking-tight">${t.nama||"-"}</h3>
                            <p class="text-[11px] text-gray-400 font-medium">Kategori: Artikel</p>
                        </div>
                    </div>
                    ${s}
                </div>

                <div class="bg-gray-50 rounded-xl p-3 mb-4">
                    <p class="text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-1">Deskripsi Singkat</p>
                    <p class="text-xs text-gray-600 line-clamp-2 leading-relaxed italic">
                        "${t.deskripsi||"Tidak ada deskripsi."}"
                    </p>
                </div>

                <div class="flex space-x-2">
                    ${r}
                </div>
            </div>
        `;n.append(f)})}function j(a,n){const t=e("#pagination");if(t.empty(),!(a<=1))for(let s=1;s<=a;s++){const r=e(`<button class="page-btn mx-1 px-3 py-1 rounded-lg border ${s===l?"bg-orange-primary text-white":"bg-white text-gray-700 hover:bg-gray-100"}">${s}</button>`);r.on("click",function(){l=s,p(n,l)}),t.append(r)}}function P(a,n){const t=e("#paginationMobile");if(t.empty(),!(a<=1))for(let s=1;s<=a;s++){const r=e(`<button class="px-3 py-1 rounded-lg border ${s===l?"bg-orange-primary text-white":"bg-white text-gray-700 hover:bg-gray-100"}">${s}</button>`);r.on("click",function(){l=s,p(n,l)}),t.append(r)}}function p(a="",n=1){e.ajax({url:"/admin/getkreatif",type:"GET",data:{search:a,page:n,limit:k},dataType:"json",success:function(t){const s=t.data;if(!Array.isArray(s)){console.error("Response data bukan array:",s);return}$(s),T(s),j(t.last_page,a),P(t.last_page,a);let r=(t.current_page-1)*k+1,o=r+s.length-1;e("#resultCount").html(`
                <i class="fas fa-info-circle mr-1"></i>
                Menampilkan ${r} - ${o} dari ${t.total} data
            `)},error:function(t,s,r){console.error("Gagal ambil data:",r,t.responseText)}})}e("#searchInputartikel").on("input",function(){const a=e(this).val();l=1,p(a,l)});function C(){e("#artikelForm")[0].reset(),e("#artikelForm input, #artikelForm select, #artikelForm textarea").removeClass("border-red-300 bg-red-50"),e("#artikelForm input, #artikelForm select").each(function(){e(this).removeClass("border-red-300 bg-red-50"),M(this)}),e("#preview").attr("src",""),e("#pdfPreviewContainer").addClass("hidden")}function x(a){v(a),S()}function v(a){const n=e("#"+a);n.removeClass("hidden"),setTimeout(()=>{n.find(".modal-content").addClass("show")},10),e("body").addClass("overflow-hidden")}function S(){e("body").css({overflow:"hidden","padding-right":""})}function M(a){const t=e(a).attr("id")+"-error";e("#"+t).remove()}e("#cancelDeleteBtn").on("click",function(){d("deleteModal")});e("#cancelApproveBtn").on("click",function(){d("approveModal")});e("#closeModal, #cancelBtn").on("click",function(){d("artikelModal")});function d(a){h(a),I()}function h(a){const n=e("#"+a);n.find(".modal-content").removeClass("show"),setTimeout(()=>{n.addClass("hidden"),e("body").removeClass("overflow-hidden")},300)}function I(){e("body").css({overflow:"","padding-right":""})}e(".modal-overlay").on("click",function(a){a.target===this&&(e(this).closest("#artikelModal").length?d("artikelModal"):e(this).closest("#deleteModal").length?d("deleteModal"):e(this).closest("#approveModal").length&&d("approveModal"))});function i(a,n="info"){const r=e(`
            <div class="notification flex items-center space-x-3 ${n==="success"?"bg-green-500":n==="error"?"bg-red-500":"bg-blue-500"} text-white px-6 py-4 rounded-xl shadow-lg transform translate-x-full opacity-0 transition-all duration-300 cursor-pointer">
            <i class="fas ${n==="success"?"fa-check-circle":n==="error"?"fa-exclamation-circle":"fa-info-circle"} text-lg"></i>
            <span class="font-medium">${a}</span>
            </div>
            `);e("#notificationWrapper").append(r),setTimeout(()=>{r.removeClass("translate-x-full opacity-0")},100);const o=setTimeout(()=>{r.addClass("translate-x-full opacity-0"),setTimeout(()=>r.remove(),300)},4e3);r.on("click",function(){clearTimeout(o),e(this).addClass("translate-x-full opacity-0"),setTimeout(()=>e(this).remove(),300)})}function A(){let a=!0;["artikelNama"].forEach(function(r){const o=e("#"+r);!o.val()||!o.val().toString().trim()?(o.addClass("border-red-300 bg-red-50"),a=!1):o.removeClass("border-red-300 bg-red-50")});const t=e("#artikelDeskripsi").summernote("code").replace(/<[^>]*>/g,"").trim(),s=e("#artikelDeskripsi");return t?s.removeClass("border-red-300 bg-red-50"):(s.addClass("border-red-300 bg-red-50"),a=!1),a}e("#artikelPdf").on("change",function(){const a=this.files[0];a&&a.type==="application/pdf"?(e("#pdfPreview").attr("src",URL.createObjectURL(a)),e("#pdfPreviewContainer").removeClass("hidden")):(e("#pdfPreview").attr("src",""),e("#pdfPreviewContainer").addClass("hidden"),alert("File bukan PDF!"))});e("#artikelFoto").on("change",function(){const a=this.files[0];a&&a.type.startsWith("image/")?(e("#preview").attr("src",URL.createObjectURL(a)),e("#previewContainer").removeClass("hidden")):(e("#preview").attr("src",""),e("#previewContainer").addClass("hidden"),alert("File bukan gambar!"))});e("#dropzone").on("dragover",function(a){a.preventDefault(),e(this).addClass("border-blue-primary bg-blue-50")}).on("dragleave",function(){e(this).removeClass("border-blue-primary bg-blue-50")}).on("drop",function(a){a.preventDefault(),e(this).removeClass("border-blue-primary bg-blue-50");const n=a.originalEvent.dataTransfer.files;if(!n.length)return;const t=n[0];if(t.type.startsWith("image/")){const s=e("#artikelFoto")[0];s&&(s.files=n,e("#artikelFoto").trigger("change"))}else if(t.type==="application/pdf"){const s=e("#artikelPdf")[0];s&&(s.files=n,e("#artikelPdf").trigger("change"))}else alert("Hanya boleh upload PDF atau gambar!")});e("#removeFoto").on("click",function(){const a=e("#artikelFoto")[0];a&&(a.value=""),e("#preview").attr("src",""),e("#previewContainer").addClass("hidden"),e("#oldFoto").val("")});let g=null;e("#addSubartikelBtn").on("click",function(){g=null,C(),e("#artikelId").val(""),e("#modalTitle").text("Tambah Artikel Baru"),e("#modalIcon").removeClass().addClass("fas fa-newspaper"),e("#submitText").text("Simpan Data"),e("#submitIcon").removeClass("fa-edit").addClass("fa-save"),x("artikelModal"),e("#artikelIsparent").val("")});e("#artikelDeskripsi").summernote({height:300,placeholder:"Masukkan deskripsi artikel...",toolbar:[["style",["style"]],["font",["bold","italic","underline","clear"]],["color",["color"]],["para",["ul","ol","paragraph"]],["table",["table"]],["insert",["link","picture"]],["view",["fullscreen","codeview","help"]]]});e("#artikelForm").on("submit",function(a){if(a.preventDefault(),!A()){i("Mohon lengkapi semua field yang wajib diisi!","error");return}const n=e("#submitBtn"),t=n.html();n.html('<i class="fas fa-spinner fa-spin mr-2"></i>Menyimpan...').prop("disabled",!0);const s=e("#artikelId").val(),r=new FormData;r.append("nama",e("#artikelNama").val()),r.append("deskripsi",e("#artikelDeskripsi").summernote("code"));const o=e("#artikelPdf")[0];o&&o.files.length>0&&r.append("pdf",o.files[0]);const f=e("#artikelFoto")[0];f.files.length>0&&r.append("foto",f.files[0]);const m=s?`/admin/kreatif/${s}`:"/admin/kreatif",b="POST";s&&r.append("_method","PUT"),e.ajax({url:m,type:b,data:r,processData:!1,contentType:!1,success:function(c){i(c.message,c.status),d("artikelModal"),n.html(t).prop("disabled",!1),p(e("#searchInputartikel").val(),l)},error:function(c){if(n.html(t).prop("disabled",!1),c.status===422&&c.responseJSON.errors){let u=c.responseJSON.errors,y=[];for(let w in u)u.hasOwnProperty(w)&&y.push(u[w].join(", "));i(y.join(" | "),"error")}else{let u=c.responseJSON&&c.responseJSON.message?c.responseJSON.message:"Terjadi kesalahan saat menyimpan data!";i(u,"error")}}})});e(document).on("click",".edit-btn",function(){g=e(this).data("id"),C(),e("#modalTitle").text("Edit Data Artikel"),e("#modalIcon").removeClass().addClass("fas fa-newspaper"),e("#submitText").text("Update Data"),e("#submitIcon").removeClass("fa-save").addClass("fa-edit"),e.ajax({url:"/admin/kreatif/"+g,type:"GET",success:function(a){e("#artikelId").val(a.id),e("#artikelNama").val(a.nama),e("#artikelDeskripsi").summernote("code",a.deskripsi||""),a.pdf?(e("#pdfPreview").attr("src","/"+a.pdf),e("#pdfPreviewContainer").removeClass("hidden"),e("#oldPdf").val(a.pdf)):(e("#pdfPreview").attr("src",""),e("#pdfPreviewContainer").addClass("hidden"),e("#oldPdf").val("")),a.foto?(e("#preview").attr("src","/"+a.foto),e("#previewContainer").removeClass("hidden"),e("#oldFoto").val(a.foto)):(e("#preview").attr("src",""),e("#previewContainer").addClass("hidden"),e("#oldFoto").val("")),v("artikelModal")},error:function(a){console.error("Gagal ambil data:",a.responseText),alert("Gagal ambil data artikel")}})});e(document).on("click",".delete-btn",function(){const a=e(this).data("id"),n=e(this).data("name");e("#deleteartikelId").val(a),e("#deleteArtikelName").text(n),x("deleteModal")});e(document).on("click","#confirmDeleteBtn",function(){const a=e(this),n=a.html();a.html('<i class="fas fa-spinner fa-spin mr-2"></i>Menghapus...').prop("disabled",!0);const t=e("#deleteartikelId").val();e.ajax({url:`/admin/kreatif/${t}`,type:"DELETE",success:function(s){i(s.message,s.status),d("deleteModal"),p()},error:function(s){let r=s.responseJSON&&s.responseJSON.message?s.responseJSON.message:"Gagal menghapus data!";i(r,"error")},complete:function(){a.html(n).prop("disabled",!1)}})});e("#removePdf").on("click",function(){let a=e("#artikelId").val();if(!a){i("ID Pengurus tidak ditemukan.");return}e.ajax({url:"/kreatif/deletePdf",type:"POST",data:{id:a},success:function(n){n.success?(e("#artikelPdf").val(""),e("#pdfPreviewContainer").addClass("hidden"),e("#preview").attr("src",""),i(n.message,"success")):i("Gagal menghapus foto.")},error:function(){i("Terjadi kesalahan.")}})});e(document).on("click",".approve-btn",function(){const a=e(this).data("id"),n=e(this).data("name");e("#approveartikelId").val(a),e("#approveArtikelName").text(n),x("approveModal")});e(document).on("click",".confirm-btn",function(){const a=e(this).data("id"),n=e(this).data("name");e("#confirmartikelId").val(a),e("#confirmArtikelName").text(n),v("confirmModal")});e(document).on("click","#cancelConfirmBtn",function(){h("confirmModal")});e(document).on("click","#confirmSubmitBtn",function(){const a=e("#confirmartikelId").val(),n=e(this),t=n.html();n.html('<i class="fas fa-spinner fa-spin mr-2"></i>Confirming...').prop("disabled",!0),e.ajax({url:`/admin/confirmkreatif/${a}`,type:"POST",success:function(s){h("confirmModal"),i(s.message,s.status),p(e("#searchInputartikel").val(),l),n.html(t).prop("disabled",!1)},error:function(s){let r=s.responseJSON&&s.responseJSON.message?s.responseJSON.message:"Gagal confirm data!";i(r,"error"),n.html(t).prop("disabled",!1)}})});e(document).on("click","#confirmApproveBtn",function(){const a=e(this),n=a.html();a.html('<i class="fas fa-spinner fa-spin mr-2"></i>Menyetujui...').prop("disabled",!0);const t=e("#approveartikelId").val();e.ajax({url:`/admin/approvekreatif/${t}`,type:"POST",success:function(s){i(s.message,s.status),d("approveModal"),p()},error:function(s){let r=s.responseJSON&&s.responseJSON.message?s.responseJSON.message:"Gagal menyetujui data!";i(r,"error")},complete:function(){a.html(n).prop("disabled",!1)}})});e(document).on("click","#confirmRejectBtn",function(){const a=e(this),n=a.html();a.html('<i class="fas fa-spinner fa-spin mr-2"></i>Menyetujui...').prop("disabled",!0);const t=e("#approveartikelId").val();e.ajax({url:`/admin/rejectkreatif/${t}`,type:"POST",success:function(s){i(s.message,s.status),d("approveModal"),p()},error:function(s){let r=s.responseJSON&&s.responseJSON.message?s.responseJSON.message:"Gagal menyetujui data!";i(r,"error")},complete:function(){a.html(n).prop("disabled",!1)}})});e("#pendaftaranSwitch").click(function(){e.ajax({url:"/pendaftaran/toggle",type:"POST",success:function(a){const n=e("#pendaftaranBg"),t=e("#pendaftaranKnob");a.value==1?(n.removeClass("bg-gray-300").addClass("bg-green-500"),t.addClass("translate-x-8")):(n.removeClass("bg-green-500").addClass("bg-gray-300"),t.removeClass("translate-x-8"))},error:function(){alert("Gagal mengubah status pendaftaran.")}})});e("#wajibBiodataSwitch").click(function(){e.ajax({url:"/wajib-biodata/toggle",type:"POST",success:function(a){const n=e("#wajibBiodataBg"),t=e("#wajibBiodataKnob");a.wajib_biodata==1?(n.removeClass("bg-gray-300").addClass("bg-green-500"),t.addClass("translate-x-8")):(n.removeClass("bg-green-500").addClass("bg-gray-300"),t.removeClass("translate-x-8"))},error:function(){alert("Gagal mengubah status wajib biodata.")}})});
