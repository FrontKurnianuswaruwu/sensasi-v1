import{$ as e}from"./jquery-CEr4rF5i.js";e.ajaxSetup({headers:{"X-CSRF-TOKEN":e('meta[name="csrf-token"]').attr("content")}});e(function(){p()});let l=1;const C=10;function T(t){const n=e("#tableArtikel");if(n.empty(),t.length===0){n.append(`
            <tr>
                <td colspan="5" class="px-6 py-10 text-center text-gray-500">
                    <i class="fas fa-info-circle text-gray-300 text-4xl mb-3 block"></i>
                    Tidak ada data ditemukan
                </td>
            </tr>
        `);return}t.forEach((a,s)=>{let r="";switch(a.status){case"pending":r='<span class="px-3 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-700 border border-yellow-300">Pending</span>';break;case"waiting_approval":r='<span class="px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-700 border border-blue-300">Menunggu Approval</span>';break;case"approved":r='<span class="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700 border border-green-300">Approved</span>';break;case"rejected":r='<span class="px-3 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-700 border border-red-300">Rejected</span>';break;default:r='<span class="px-3 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-700 border border-gray-300">Unknown</span>'}let o="";a.role===9?a.status==="pending"||a.status==="rejected"?o=`
                    <button class="confirm-btn inline-flex items-center px-3 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all shadow-sm mr-2"
                            data-id="${a.id}" data-name="${a.nama}" title="Confirm">
                        <i class="fas fa-check-circle mr-1.5"></i> Confirm
                    </button>
                    <button class="edit-btn inline-flex items-center px-3 py-1.5 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all shadow-sm mr-2"
                            data-id="${a.id}" data-name="${a.nama}">
                        <i class="fas fa-edit mr-1.5"></i> Edit
                    </button>
                    <button class="delete-btn inline-flex items-center px-3 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all shadow-sm"
                            data-id="${a.id}" data-name="${a.nama}">
                        <i class="fas fa-trash mr-1.5"></i> Hapus
                    </button>
                `:a.status==="waiting_approval"?o=`
                    <span class="inline-flex items-center px-3 py-1.5 text-blue-600 bg-blue-50 border border-blue-300 rounded-lg">
                        <i class="fas fa-clock mr-1.5"></i> Menunggu Approval
                    </span>
                `:a.status==="approved"&&(o=`
                    <span class="inline-flex items-center px-3 py-1.5 text-green-600 bg-green-50 border border-green-300 rounded-lg">
                        <i class="fas fa-check-circle mr-1.5"></i> Sudah Disetujui
                    </span>
                `):a.status==="waiting_approval"?o=`
                    <button class="approve-btn inline-flex items-center px-3 py-1.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all shadow-sm mr-2"
                            data-id="${a.id}" data-name="${a.nama}" title="Approve/Reject">
                        <i class="fas fa-check mr-1.5"></i> Approve
                    </button>
                    <button class="edit-btn inline-flex items-center px-3 py-1.5 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all shadow-sm mr-2"
                            data-id="${a.id}" data-name="${a.nama}">
                        <i class="fas fa-edit mr-1.5"></i> Edit
                    </button>
                    <button class="delete-btn inline-flex items-center px-3 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all shadow-sm"
                            data-id="${a.id}" data-name="${a.nama}">
                        <i class="fas fa-trash mr-1.5"></i> Hapus
                    </button>
                `:o=`
                    <button class="edit-btn inline-flex items-center px-3 py-1.5 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all shadow-sm mr-2"
                            data-id="${a.id}" data-name="${a.nama}">
                        <i class="fas fa-edit mr-1.5"></i> Edit
                    </button>
                    <button class="delete-btn inline-flex items-center px-3 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all shadow-sm"
                            data-id="${a.id}" data-name="${a.nama}">
                        <i class="fas fa-trash mr-1.5"></i> Hapus
                    </button>
                `;const f=a.nama||"-",b=f.charAt(0).toUpperCase(),g=`
            <tr class="hover:bg-gray-50 transition-colors duration-200 border-b border-gray-100">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    ${s+1}
                </td>

                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                        <div class="flex-shrink-0 h-10 w-10">
                            <div class="h-10 w-10 rounded-full bg-gradient-to-r from-blue-600 to-blue-400 flex items-center justify-center text-white font-bold shadow-sm">
                                ${b}
                            </div>
                        </div>
                        <div class="ml-4">
                            <div class="text-sm font-semibold text-gray-900">${f}</div>
                            <div class="text-xs text-gray-500">Artikel</div>
                        </div>
                    </div>
                </td>

                <td class="px-6 py-4 text-sm text-gray-700">
                    ${a.deskripsi||"-"}
                </td>

                <td class="px-6 py-4 whitespace-nowrap text-sm">
                    ${r}
                </td>

                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    ${o}
                </td>
            </tr>
        `;n.append(g)})}function j(t){const n=e("#cardContainer");if(n.empty(),t.length===0){n.append(`
            <div class="p-10 text-center text-gray-500">
                <i class="fas fa-info-circle text-gray-300 text-4xl mb-3 block"></i>
                Tidak ada artikel ditemukan
            </div>
        `);return}t.forEach(a=>{let s="";switch(a.status){case"pending":s='<span class="px-3 py-1 text-[10px] font-bold rounded-full bg-yellow-100 text-yellow-700 border border-yellow-300 uppercase">Pending</span>';break;case"waiting_approval":s='<span class="px-3 py-1 text-[10px] font-bold rounded-full bg-blue-100 text-blue-700 border border-blue-300 uppercase">Menunggu Approval</span>';break;case"approved":s='<span class="px-3 py-1 text-[10px] font-bold rounded-full bg-green-100 text-green-700 border border-green-300 uppercase">Approved</span>';break;case"rejected":s='<span class="px-3 py-1 text-[10px] font-bold rounded-full bg-red-100 text-red-700 border border-red-300 uppercase">Rejected</span>';break;default:s='<span class="px-3 py-1 text-[10px] font-bold rounded-full bg-gray-100 text-gray-700 border border-gray-300 uppercase">Unknown</span>'}let r="";a.role===9?a.status==="pending"||a.status==="rejected"?r=`
                    <button class="confirm-btn flex-1 py-2.5 bg-blue-50 text-blue-600 rounded-xl text-xs font-bold hover:bg-blue-100 transition-all active:scale-95"
                        data-id="${a.id}" data-name="${a.nama}">
                        <i class="fas fa-check-circle mr-1"></i> CONFIRM
                    </button>
                    <button class="edit-btn flex-1 py-2.5 bg-yellow-50 text-yellow-600 rounded-xl text-xs font-bold hover:bg-yellow-100 transition-all active:scale-95"
                        data-id="${a.id}" data-name="${a.nama}">
                        <i class="fas fa-edit mr-1"></i> EDIT
                    </button>
                    <button class="delete-btn flex-1 py-2.5 bg-red-50 text-red-600 rounded-xl text-xs font-bold hover:bg-red-100 transition-all active:scale-95"
                        data-id="${a.id}" data-name="${a.nama}">
                        <i class="fas fa-trash mr-1"></i> HAPUS
                    </button>
                `:a.status==="waiting_approval"?r=`
                    <div class="w-full text-center py-2 bg-blue-100 text-blue-600 rounded-lg text-xs font-bold border border-blue-200">
                        <i class="fas fa-clock mr-1"></i> MENUNGGU APPROVAL
                    </div>
                `:a.status==="approved"&&(r=`
                    <div class="w-full text-center py-2 bg-green-100 text-green-600 rounded-lg text-xs font-bold border border-green-200">
                        <i class="fas fa-check-circle mr-1"></i> SUDAH DISETUJUI
                    </div>
                `):a.status==="waiting_approval"?r=`
                    <button class="approve-btn flex-1 py-2.5 bg-green-50 text-green-600 rounded-xl text-xs font-bold hover:bg-green-100 transition-all active:scale-95"
                        data-id="${a.id}" data-name="${a.nama}">
                        <i class="fas fa-check mr-1"></i> APPROVE
                    </button>
                    <button class="edit-btn flex-1 py-2.5 bg-yellow-50 text-yellow-600 rounded-xl text-xs font-bold hover:bg-yellow-100 transition-all active:scale-95"
                        data-id="${a.id}" data-name="${a.nama}">
                        <i class="fas fa-edit mr-1"></i> EDIT
                    </button>
                    <button class="delete-btn flex-1 py-2.5 bg-red-50 text-red-600 rounded-xl text-xs font-bold hover:bg-red-100 transition-all active:scale-95"
                        data-id="${a.id}" data-name="${a.nama}">
                        <i class="fas fa-trash mr-1"></i> HAPUS
                    </button>
                `:r=`
                    <button class="edit-btn flex-1 py-2.5 bg-yellow-50 text-yellow-600 rounded-xl text-xs font-bold hover:bg-yellow-100 transition-all active:scale-95"
                        data-id="${a.id}" data-name="${a.nama}">
                        <i class="fas fa-edit mr-1"></i> EDIT
                    </button>
                    <button class="delete-btn flex-1 py-2.5 bg-red-50 text-red-600 rounded-xl text-xs font-bold hover:bg-red-100 transition-all active:scale-95"
                        data-id="${a.id}" data-name="${a.nama}">
                        <i class="fas fa-trash mr-1"></i> HAPUS
                    </button>
                `;const f=`
            <div class="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm mb-4 transition-all hover:shadow-md">
                <div class="flex justify-between items-start mb-4">
                    <div class="flex items-center space-x-3">
                        <div class="h-11 w-11 rounded-full bg-gradient-to-br from-blue-600 to-indigo-500 flex items-center justify-center text-white font-bold shadow-sm">
                            ${a.nama?a.nama.charAt(0).toUpperCase():"?"}
                        </div>
                        <div class="max-w-[150px]">
                            <h3 class="text-sm font-extrabold text-gray-900 truncate uppercase tracking-tight">${a.nama||"-"}</h3>
                            <p class="text-[11px] text-gray-400 font-medium">Kategori: Artikel</p>
                        </div>
                    </div>
                    ${s}
                </div>

                <div class="bg-gray-50 rounded-xl p-3 mb-4">
                    <p class="text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-1">Deskripsi Singkat</p>
                    <p class="text-xs text-gray-600 line-clamp-2 leading-relaxed italic">
                        "${a.deskripsi||"Tidak ada deskripsi."}"
                    </p>
                </div>

                <div class="flex space-x-2">
                    ${r}
                </div>
            </div>
        `;n.append(f)})}function P(t,n){const a=e("#pagination");if(a.empty(),!(t<=1))for(let s=1;s<=t;s++){const r=e(`<button class="page-btn mx-1 px-3 py-1 rounded-lg border ${s===l?"bg-orange-primary text-white":"bg-white text-gray-700 hover:bg-gray-100"}">${s}</button>`);r.on("click",function(){l=s,p(n,l)}),a.append(r)}}function S(t,n){const a=e("#paginationMobile");if(a.empty(),!(t<=1))for(let s=1;s<=t;s++){const r=e(`<button class="px-3 py-1 rounded-lg border ${s===l?"bg-orange-primary text-white":"bg-white text-gray-700 hover:bg-gray-100"}">${s}</button>`);r.on("click",function(){l=s,p(n,l)}),a.append(r)}}function p(t="",n=1){e.ajax({url:"/admin/getkreatif",type:"GET",data:{search:t,page:n,limit:C},dataType:"json",success:function(a){const s=a.data;if(!Array.isArray(s)){console.error("Response data bukan array:",s);return}T(s),j(s),P(a.last_page,t),S(a.last_page,t);let r=(a.current_page-1)*C+1,o=r+s.length-1;e("#resultCount").html(`
                <i class="fas fa-info-circle mr-1"></i>
                Menampilkan ${r} - ${o} dari ${a.total} data
            `)},error:function(a,s,r){console.error("Gagal ambil data:",r,a.responseText)}})}e("#searchInputartikel").on("input",function(){const t=e(this).val();l=1,p(t,l)});function $(){e("#artikelForm")[0].reset(),e("#artikelForm input, #artikelForm select, #artikelForm textarea").removeClass("border-red-300 bg-red-50"),e("#artikelForm input, #artikelForm select").each(function(){e(this).removeClass("border-red-300 bg-red-50"),I(this)}),e("#preview").attr("src",""),e("#pdfPreviewContainer").addClass("hidden")}function v(t){h(t),M()}function h(t){const n=e("#"+t);n.removeClass("hidden"),setTimeout(()=>{n.find(".modal-content").addClass("show")},10),e("body").addClass("overflow-hidden")}function M(){e("body").css({overflow:"hidden","padding-right":""})}function I(t){const a=e(t).attr("id")+"-error";e("#"+a).remove()}e("#cancelDeleteBtn").on("click",function(){d("deleteModal")});e("#cancelApproveBtn").on("click",function(){d("approveModal")});e("#closeModal, #cancelBtn").on("click",function(){d("artikelModal")});function d(t){y(t),A()}function y(t){const n=e("#"+t);n.find(".modal-content").removeClass("show"),setTimeout(()=>{n.addClass("hidden"),e("body").removeClass("overflow-hidden")},300)}function A(){e("body").css({overflow:"","padding-right":""})}e(".modal-overlay").on("click",function(t){t.target===this&&(e(this).closest("#artikelModal").length?d("artikelModal"):e(this).closest("#deleteModal").length?d("deleteModal"):e(this).closest("#approveModal").length&&d("approveModal"))});function i(t,n="info"){const r=e(`
            <div class="notification flex items-center space-x-3 ${n==="success"?"bg-green-500":n==="error"?"bg-red-500":"bg-blue-500"} text-white px-6 py-4 rounded-xl shadow-lg transform translate-x-full opacity-0 transition-all duration-300 cursor-pointer">
            <i class="fas ${n==="success"?"fa-check-circle":n==="error"?"fa-exclamation-circle":"fa-info-circle"} text-lg"></i>
            <span class="font-medium">${t}</span>
            </div>
            `);e("#notificationWrapper").append(r),setTimeout(()=>{r.removeClass("translate-x-full opacity-0")},100);const o=setTimeout(()=>{r.addClass("translate-x-full opacity-0"),setTimeout(()=>r.remove(),300)},4e3);r.on("click",function(){clearTimeout(o),e(this).addClass("translate-x-full opacity-0"),setTimeout(()=>e(this).remove(),300)})}function F(){let t=!0;["artikelNama"].forEach(function(r){const o=e("#"+r);!o.val()||!o.val().toString().trim()?(o.addClass("border-red-300 bg-red-50"),t=!1):o.removeClass("border-red-300 bg-red-50")});const a=m.getData().replace(/<[^>]*>/g,"").trim(),s=e("#artikelDeskripsi").closest(".ck-editor");return a?s.removeClass("border-red-300 bg-red-50"):(s.addClass("border-red-300 bg-red-50"),t=!1),t}e("#artikelPdf").on("change",function(){const t=this.files[0];t&&t.type==="application/pdf"?(e("#pdfPreview").attr("src",URL.createObjectURL(t)),e("#pdfPreviewContainer").removeClass("hidden")):(e("#pdfPreview").attr("src",""),e("#pdfPreviewContainer").addClass("hidden"),alert("File bukan PDF!"))});e("#artikelFoto").on("change",function(){const t=this.files[0];t&&t.type.startsWith("image/")?(e("#preview").attr("src",URL.createObjectURL(t)),e("#previewContainer").removeClass("hidden")):(e("#preview").attr("src",""),e("#previewContainer").addClass("hidden"),alert("File bukan gambar!"))});e("#dropzone").on("dragover",function(t){t.preventDefault(),e(this).addClass("border-blue-primary bg-blue-50")}).on("dragleave",function(){e(this).removeClass("border-blue-primary bg-blue-50")}).on("drop",function(t){t.preventDefault(),e(this).removeClass("border-blue-primary bg-blue-50");const n=t.originalEvent.dataTransfer.files;if(!n.length)return;const a=n[0];if(a.type.startsWith("image/")){const s=e("#artikelFoto")[0];s&&(s.files=n,e("#artikelFoto").trigger("change"))}else if(a.type==="application/pdf"){const s=e("#artikelPdf")[0];s&&(s.files=n,e("#artikelPdf").trigger("change"))}else alert("Hanya boleh upload PDF atau gambar!")});e("#removeFoto").on("click",function(){const t=e("#artikelFoto")[0];t&&(t.value=""),e("#preview").attr("src",""),e("#previewContainer").addClass("hidden"),e("#oldFoto").val("")});let m,x=null;e("#addSubartikelBtn").on("click",function(){x=null,$(),e("#artikelId").val(""),e("#modalTitle").text("Tambah Artikel Baru"),e("#modalIcon").removeClass().addClass("fas fa-newspaper"),e("#submitText").text("Simpan Data"),e("#submitIcon").removeClass("fa-edit").addClass("fa-save"),v("artikelModal"),e("#artikelIsparent").val("")});e(function(){ClassicEditor.create(document.querySelector("#artikelDeskripsi")).then(t=>{m=t,console.log("CKEditor siap dipakai!")}).catch(t=>{console.error(t)}),e("#artikelForm").on("submit",function(t){if(t.preventDefault(),!F()){i("Mohon lengkapi semua field yang wajib diisi!","error");return}const n=e("#submitBtn"),a=n.html();n.html('<i class="fas fa-spinner fa-spin mr-2"></i>Menyimpan...').prop("disabled",!0);const s=e("#artikelId").val(),r=new FormData;r.append("nama",e("#artikelNama").val()),r.append("deskripsi",m.getData());const o=e("#artikelPdf")[0];o&&o.files.length>0&&r.append("pdf",o.files[0]);const f=e("#artikelFoto")[0];f.files.length>0?r.append("foto",f.files[0]):r.append("oldFoto",e("#oldFoto").val());const b=s?`/admin/kreatif/${s}`:"/admin/kreatif",g="POST";s&&r.append("_method","PUT"),e.ajax({url:b,type:g,data:r,processData:!1,contentType:!1,success:function(c){i(c.message,c.status),d("artikelModal"),n.html(a).prop("disabled",!1),p(e("#searchInputartikel").val(),l)},error:function(c){if(n.html(a).prop("disabled",!1),c.status===422&&c.responseJSON.errors){let u=c.responseJSON.errors,w=[];for(let k in u)u.hasOwnProperty(k)&&w.push(u[k].join(", "));i(w.join(" | "),"error")}else{let u=c.responseJSON&&c.responseJSON.message?c.responseJSON.message:"Terjadi kesalahan saat menyimpan data!";i(u,"error")}}})})});e(document).on("click",".edit-btn",function(){x=e(this).data("id"),$(),e("#modalTitle").text("Edit Data Artikel"),e("#modalIcon").removeClass().addClass("fas fa-newspaper"),e("#submitText").text("Update Data"),e("#submitIcon").removeClass("fa-save").addClass("fa-edit"),e.ajax({url:"/admin/kreatif/"+x,type:"GET",success:function(t){e("#artikelId").val(t.id),e("#artikelNama").val(t.nama),m?m.setData(t.deskripsi||""):e("#artikelDeskripsi").val(t.deskripsi),t.pdf?(e("#pdfPreview").attr("src","/"+t.pdf),e("#pdfPreviewContainer").removeClass("hidden"),e("#oldPdf").val(t.pdf)):(e("#pdfPreview").attr("src",""),e("#pdfPreviewContainer").addClass("hidden"),e("#oldPdf").val("")),t.foto?(e("#preview").attr("src","/"+t.foto),e("#previewContainer").removeClass("hidden"),e("#oldFoto").val(t.foto)):(e("#preview").attr("src",""),e("#previewContainer").addClass("hidden"),e("#oldFoto").val("")),h("artikelModal")},error:function(t){console.error("Gagal ambil data:",t.responseText),alert("Gagal ambil data artikel")}})});e(document).on("click",".delete-btn",function(){const t=e(this).data("id"),n=e(this).data("name");e("#deleteartikelId").val(t),e("#deleteArtikelName").text(n),v("deleteModal")});e(document).on("click","#confirmDeleteBtn",function(){const t=e(this),n=t.html();t.html('<i class="fas fa-spinner fa-spin mr-2"></i>Menghapus...').prop("disabled",!0);const a=e("#deleteartikelId").val();e.ajax({url:`/admin/kreatif/${a}`,type:"DELETE",success:function(s){i(s.message,s.status),d("deleteModal"),p()},error:function(s){let r=s.responseJSON&&s.responseJSON.message?s.responseJSON.message:"Gagal menghapus data!";i(r,"error")},complete:function(){t.html(n).prop("disabled",!1)}})});e("#removePdf").on("click",function(){let t=e("#artikelId").val();if(!t){i("ID Pengurus tidak ditemukan.");return}e.ajax({url:"/kreatif/deletePdf",type:"POST",data:{id:t},success:function(n){n.success?(e("#artikelPdf").val(""),e("#pdfPreviewContainer").addClass("hidden"),e("#preview").attr("src",""),i(n.message,"success")):i("Gagal menghapus foto.")},error:function(){i("Terjadi kesalahan.")}})});e(document).on("click",".approve-btn",function(){const t=e(this).data("id"),n=e(this).data("name");e("#approveartikelId").val(t),e("#approveArtikelName").text(n),v("approveModal")});e(document).on("click",".confirm-btn",function(){const t=e(this).data("id"),n=e(this).data("name");e("#confirmartikelId").val(t),e("#confirmArtikelName").text(n),h("confirmModal")});e(document).on("click","#cancelConfirmBtn",function(){y("confirmModal")});e(document).on("click","#confirmSubmitBtn",function(){const t=e("#confirmartikelId").val(),n=e(this),a=n.html();n.html('<i class="fas fa-spinner fa-spin mr-2"></i>Confirming...').prop("disabled",!0),e.ajax({url:`/admin/confirmkreatif/${t}`,type:"POST",success:function(s){y("confirmModal"),i(s.message,s.status),p(e("#searchInputartikel").val(),l),n.html(a).prop("disabled",!1)},error:function(s){let r=s.responseJSON&&s.responseJSON.message?s.responseJSON.message:"Gagal confirm data!";i(r,"error"),n.html(a).prop("disabled",!1)}})});e(document).on("click","#confirmApproveBtn",function(){const t=e(this),n=t.html();t.html('<i class="fas fa-spinner fa-spin mr-2"></i>Menyetujui...').prop("disabled",!0);const a=e("#approveartikelId").val();e.ajax({url:`/admin/approvekreatif/${a}`,type:"POST",success:function(s){i(s.message,s.status),d("approveModal"),p()},error:function(s){let r=s.responseJSON&&s.responseJSON.message?s.responseJSON.message:"Gagal menyetujui data!";i(r,"error")},complete:function(){t.html(n).prop("disabled",!1)}})});e(document).on("click","#confirmRejectBtn",function(){const t=e(this),n=t.html();t.html('<i class="fas fa-spinner fa-spin mr-2"></i>Menyetujui...').prop("disabled",!0);const a=e("#approveartikelId").val();e.ajax({url:`/admin/rejectkreatif/${a}`,type:"POST",success:function(s){i(s.message,s.status),d("approveModal"),p()},error:function(s){let r=s.responseJSON&&s.responseJSON.message?s.responseJSON.message:"Gagal menyetujui data!";i(r,"error")},complete:function(){t.html(n).prop("disabled",!1)}})});e("#pendaftaranSwitch").click(function(){e.ajax({url:"/pendaftaran/toggle",type:"POST",success:function(t){const n=e("#pendaftaranBg"),a=e("#pendaftaranKnob");t.value==1?(n.removeClass("bg-gray-300").addClass("bg-green-500"),a.addClass("translate-x-8")):(n.removeClass("bg-green-500").addClass("bg-gray-300"),a.removeClass("translate-x-8"))},error:function(){alert("Gagal mengubah status pendaftaran.")}})});e("#wajibBiodataSwitch").click(function(){e.ajax({url:"/wajib-biodata/toggle",type:"POST",success:function(t){const n=e("#wajibBiodataBg"),a=e("#wajibBiodataKnob");t.wajib_biodata==1?(n.removeClass("bg-gray-300").addClass("bg-green-500"),a.addClass("translate-x-8")):(n.removeClass("bg-green-500").addClass("bg-gray-300"),a.removeClass("translate-x-8"))},error:function(){alert("Gagal mengubah status wajib biodata.")}})});
