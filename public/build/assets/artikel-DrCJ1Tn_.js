import{$ as e}from"./jquery-BvxTx_lq.js";e.ajaxSetup({headers:{"X-CSRF-TOKEN":e('meta[name="csrf-token"]').attr("content")}});e(function(){p()});let c=1;const k=10;function T(t){const s=e("#tableArtikel");if(s.empty(),t.length===0){s.append(`
            <tr>
                <td colspan="5" class="px-6 py-10 text-center text-gray-500">
                    <i class="fas fa-info-circle text-gray-300 text-4xl mb-3 block"></i>
                    Tidak ada data ditemukan
                </td>
            </tr>
        `);return}t.forEach((r,a)=>{let n="";switch(r.status){case"pending":n='<span class="px-3 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-700 border border-yellow-300">Pending</span>';break;case"approved":n='<span class="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700 border border-green-300">Approved</span>';break;case"rejected":n='<span class="px-3 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-700 border border-red-300">Rejected</span>';break;default:n='<span class="px-3 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-700 border border-gray-300">Unknown</span>'}let o="";r.role===9?o=`
                <span class="inline-flex items-center px-3 py-1.5 text-gray-400 bg-gray-100 border border-gray-300 rounded-lg cursor-not-allowed shadow-sm" 
                    title="Data terkunci untuk role 9">
                    <i class="fas fa-lock mr-1.5"></i> Terkunci
                </span>
            `:o=`
                ${r.has_biodata?"":`<button class="approve-btn inline-flex items-center px-3 py-1.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all shadow-sm mr-2" 
                        data-id="${r.id}" title="Approve">
                        <i class="fas fa-check mr-1.5"></i> Approve
                </button>`}
                <button class="edit-btn inline-flex items-center px-3 py-1.5 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all shadow-sm mr-2" 
                        data-id="${r.id}" data-name="${r.nama}">
                    <i class="fas fa-edit mr-1.5"></i> Edit
                </button>
                <button class="delete-btn inline-flex items-center px-3 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all shadow-sm" 
                        data-id="${r.id}" data-name="${r.nama}">
                    <i class="fas fa-trash mr-1.5"></i> Hapus
                </button>
            `;const f=r.nama||"-",g=f.charAt(0).toUpperCase(),b=`
            <tr class="hover:bg-gray-50 transition-colors duration-200 border-b border-gray-100">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    ${a+1}
                </td>

                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                        <div class="flex-shrink-0 h-10 w-10">
                            <div class="h-10 w-10 rounded-full bg-gradient-to-r from-blue-600 to-blue-400 flex items-center justify-center text-white font-bold shadow-sm">
                                ${g}
                            </div>
                        </div>
                        <div class="ml-4">
                            <div class="text-sm font-semibold text-gray-900">${f}</div>
                            <div class="text-xs text-gray-500">Artikel</div>
                        </div>
                    </div>
                </td>

                <td class="px-6 py-4 text-sm text-gray-700">
                    ${r.deskripsi||"-"}
                </td>

                <td class="px-6 py-4 whitespace-nowrap text-sm">
                    ${n}
                </td>

                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    ${o}
                </td>
            </tr>
        `;s.append(b)})}function $(t){const s=e("#cardContainer");if(s.empty(),t.length===0){s.append(`
            <div class="p-10 text-center text-gray-500">
                <i class="fas fa-info-circle text-gray-300 text-4xl mb-3 block"></i>
                Tidak ada artikel ditemukan
            </div>
        `);return}t.forEach(r=>{let a="";switch(r.status){case"pending":a='<span class="px-3 py-1 text-[10px] font-bold rounded-full bg-yellow-100 text-yellow-700 border border-yellow-300 uppercase">Pending</span>';break;case"approved":a='<span class="px-3 py-1 text-[10px] font-bold rounded-full bg-green-100 text-green-700 border border-green-300 uppercase">Approved</span>';break;case"rejected":a='<span class="px-3 py-1 text-[10px] font-bold rounded-full bg-red-100 text-red-700 border border-red-300 uppercase">Rejected</span>';break;default:a='<span class="px-3 py-1 text-[10px] font-bold rounded-full bg-gray-100 text-gray-700 border border-gray-300 uppercase">Unknown</span>'}let n="";r.role===9?n=`
                <div class="w-full text-center py-2 bg-gray-100 text-gray-400 rounded-lg text-xs font-bold border border-gray-200">
                    <i class="fas fa-lock mr-1"></i> DATA TERKUNCI
                </div>
            `:n=`
                <button class="edit-btn flex-1 py-2.5 bg-yellow-50 text-yellow-600 rounded-xl text-xs font-bold hover:bg-yellow-100 transition-all active:scale-95" 
                    data-id="${r.id}" data-name="${r.nama}">
                    <i class="fas fa-edit mr-1"></i> EDIT
                </button>
                <button class="delete-btn flex-1 py-2.5 bg-red-50 text-red-600 rounded-xl text-xs font-bold hover:bg-red-100 transition-all active:scale-95" 
                    data-id="${r.id}" data-name="${r.nama}">
                    <i class="fas fa-trash mr-1"></i> HAPUS
                </button>
            `;const f=`
            <div class="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm mb-4 transition-all hover:shadow-md">
                <div class="flex justify-between items-start mb-4">
                    <div class="flex items-center space-x-3">
                        <div class="h-11 w-11 rounded-full bg-gradient-to-br from-blue-600 to-indigo-500 flex items-center justify-center text-white font-bold shadow-sm">
                            ${r.nama?r.nama.charAt(0).toUpperCase():"?"}
                        </div>
                        <div class="max-w-[150px]">
                            <h3 class="text-sm font-extrabold text-gray-900 truncate uppercase tracking-tight">${r.nama||"-"}</h3>
                            <p class="text-[11px] text-gray-400 font-medium">Kategori: Artikel</p>
                        </div>
                    </div>
                    ${a}
                </div>

                <div class="bg-gray-50 rounded-xl p-3 mb-4">
                    <p class="text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-1">Deskripsi Singkat</p>
                    <p class="text-xs text-gray-600 line-clamp-2 leading-relaxed italic">
                        "${r.deskripsi||"Tidak ada deskripsi."}"
                    </p>
                </div>

                <div class="flex space-x-2">
                    ${n}
                </div>
            </div>
        `;s.append(f)})}function P(t,s){const r=e("#pagination");if(r.empty(),!(t<=1))for(let a=1;a<=t;a++){const n=e(`<button class="page-btn mx-1 px-3 py-1 rounded-lg border ${a===c?"bg-orange-primary text-white":"bg-white text-gray-700 hover:bg-gray-100"}">${a}</button>`);n.on("click",function(){c=a,p(s,c)}),r.append(n)}}function j(t,s){const r=e("#paginationMobile");if(r.empty(),!(t<=1))for(let a=1;a<=t;a++){const n=e(`<button class="px-3 py-1 rounded-lg border ${a===c?"bg-orange-primary text-white":"bg-white text-gray-700 hover:bg-gray-100"}">${a}</button>`);n.on("click",function(){c=a,p(s,c)}),r.append(n)}}function p(t="",s=1){e.ajax({url:"/admin/getkreatif",type:"GET",data:{search:t,page:s,limit:k},dataType:"json",success:function(r){const a=r.data;if(!Array.isArray(a)){console.error("Response data bukan array:",a);return}T(a),$(a),P(r.last_page,t),j(r.last_page,t);let n=(r.current_page-1)*k+1,o=n+a.length-1;e("#resultCount").html(`
                <i class="fas fa-info-circle mr-1"></i>
                Menampilkan ${n} - ${o} dari ${r.total} data
            `)},error:function(r,a,n){console.error("Gagal ambil data:",n,r.responseText)}})}e("#searchInputartikel").on("input",function(){const t=e(this).val();c=1,p(t,c)});function w(){e("#artikelForm")[0].reset(),e("#artikelForm input, #artikelForm select, #artikelForm textarea").removeClass("border-red-300 bg-red-50"),e("#artikelForm input, #artikelForm select").each(function(){e(this).removeClass("border-red-300 bg-red-50"),M(this)}),e("#preview").attr("src",""),e("#pdfPreviewContainer").addClass("hidden")}function x(t){C(t),F()}function C(t){const s=e("#"+t);s.removeClass("hidden"),setTimeout(()=>{s.find(".modal-content").addClass("show")},10),e("body").addClass("overflow-hidden")}function F(){e("body").css({overflow:"hidden","padding-right":""})}function M(t){const r=e(t).attr("id")+"-error";e("#"+r).remove()}e("#cancelDeleteBtn").on("click",function(){d("deleteModal")});e("#cancelApproveBtn").on("click",function(){d("approveModal")});e("#closeModal, #cancelBtn").on("click",function(){d("artikelModal")});function d(t){S(t),I()}function S(t){const s=e("#"+t);s.find(".modal-content").removeClass("show"),setTimeout(()=>{s.addClass("hidden"),e("body").removeClass("overflow-hidden")},300)}function I(){e("body").css({overflow:"","padding-right":""})}e(".modal-overlay").on("click",function(t){t.target===this&&(e(this).closest("#artikelModal").length?d("artikelModal"):e(this).closest("#deleteModal").length?d("deleteModal"):e(this).closest("#approveModal").length&&d("approveModal"))});function i(t,s="info"){const n=e(`
            <div class="notification flex items-center space-x-3 ${s==="success"?"bg-green-500":s==="error"?"bg-red-500":"bg-blue-500"} text-white px-6 py-4 rounded-xl shadow-lg transform translate-x-full opacity-0 transition-all duration-300 cursor-pointer">
            <i class="fas ${s==="success"?"fa-check-circle":s==="error"?"fa-exclamation-circle":"fa-info-circle"} text-lg"></i>
            <span class="font-medium">${t}</span>
            </div>
            `);e("#notificationWrapper").append(n),setTimeout(()=>{n.removeClass("translate-x-full opacity-0")},100);const o=setTimeout(()=>{n.addClass("translate-x-full opacity-0"),setTimeout(()=>n.remove(),300)},4e3);n.on("click",function(){clearTimeout(o),e(this).addClass("translate-x-full opacity-0"),setTimeout(()=>e(this).remove(),300)})}function D(){let t=!0;["artikelNama"].forEach(function(n){const o=e("#"+n);!o.val()||!o.val().toString().trim()?(o.addClass("border-red-300 bg-red-50"),t=!1):o.removeClass("border-red-300 bg-red-50")});const r=m.getData().replace(/<[^>]*>/g,"").trim(),a=e("#artikelDeskripsi").closest(".ck-editor");return r?a.removeClass("border-red-300 bg-red-50"):(a.addClass("border-red-300 bg-red-50"),t=!1),t}e("#artikelPdf").on("change",function(){const t=this.files[0];t&&t.type==="application/pdf"?(e("#pdfPreview").attr("src",URL.createObjectURL(t)),e("#pdfPreviewContainer").removeClass("hidden")):(e("#pdfPreview").attr("src",""),e("#pdfPreviewContainer").addClass("hidden"),alert("File bukan PDF!"))});e("#artikelFoto").on("change",function(){const t=this.files[0];t&&t.type.startsWith("image/")?(e("#preview").attr("src",URL.createObjectURL(t)),e("#previewContainer").removeClass("hidden")):(e("#preview").attr("src",""),e("#previewContainer").addClass("hidden"),alert("File bukan gambar!"))});e("#dropzone").on("dragover",function(t){t.preventDefault(),e(this).addClass("border-blue-primary bg-blue-50")}).on("dragleave",function(){e(this).removeClass("border-blue-primary bg-blue-50")}).on("drop",function(t){t.preventDefault(),e(this).removeClass("border-blue-primary bg-blue-50");const s=t.originalEvent.dataTransfer.files;if(!s.length)return;const r=s[0];if(r.type.startsWith("image/")){const a=e("#artikelFoto")[0];a&&(a.files=s,e("#artikelFoto").trigger("change"))}else if(r.type==="application/pdf"){const a=e("#artikelPdf")[0];a&&(a.files=s,e("#artikelPdf").trigger("change"))}else alert("Hanya boleh upload PDF atau gambar!")});e("#removeFoto").on("click",function(){const t=e("#artikelFoto")[0];t&&(t.value=""),e("#preview").attr("src",""),e("#previewContainer").addClass("hidden"),e("#oldFoto").val("")});let m,v=null;e("#addSubartikelBtn").on("click",function(){v=null,w(),e("#artikelId").val(""),e("#modalTitle").text("Tambah Artikel Baru"),e("#modalIcon").removeClass().addClass("fas fa-newspaper"),e("#submitText").text("Simpan Data"),e("#submitIcon").removeClass("fa-edit").addClass("fa-save"),x("artikelModal"),e("#artikelIsparent").val("")});e(function(){ClassicEditor.create(document.querySelector("#artikelDeskripsi")).then(t=>{m=t,console.log("CKEditor siap dipakai!")}).catch(t=>{console.error(t)}),e("#artikelForm").on("submit",function(t){if(t.preventDefault(),!D()){i("Mohon lengkapi semua field yang wajib diisi!","error");return}const s=e("#submitBtn"),r=s.html();s.html('<i class="fas fa-spinner fa-spin mr-2"></i>Menyimpan...').prop("disabled",!0);const a=e("#artikelId").val(),n=new FormData;n.append("nama",e("#artikelNama").val()),n.append("deskripsi",m.getData());const o=e("#artikelPdf")[0];o&&o.files.length>0&&n.append("pdf",o.files[0]);const f=e("#artikelFoto")[0];f.files.length>0?n.append("foto",f.files[0]):n.append("oldFoto",e("#oldFoto").val());const g=a?`/admin/kreatif/${a}`:"/admin/kreatif",b="POST";a&&n.append("_method","PUT"),e.ajax({url:g,type:b,data:n,processData:!1,contentType:!1,success:function(l){i(l.message,l.status),d("artikelModal"),s.html(r).prop("disabled",!1),p(e("#searchInputartikel").val(),c)},error:function(l){if(s.html(r).prop("disabled",!1),l.status===422&&l.responseJSON.errors){let u=l.responseJSON.errors,h=[];for(let y in u)u.hasOwnProperty(y)&&h.push(u[y].join(", "));i(h.join(" | "),"error")}else{let u=l.responseJSON&&l.responseJSON.message?l.responseJSON.message:"Terjadi kesalahan saat menyimpan data!";i(u,"error")}}})})});e(document).on("click",".edit-btn",function(){v=e(this).data("id"),w(),e("#modalTitle").text("Edit Data Artikel"),e("#modalIcon").removeClass().addClass("fas fa-newspaper"),e("#submitText").text("Update Data"),e("#submitIcon").removeClass("fa-save").addClass("fa-edit"),e.ajax({url:"/admin/kreatif/"+v,type:"GET",success:function(t){e("#artikelId").val(t.id),e("#artikelNama").val(t.nama),m?m.setData(t.deskripsi||""):e("#artikelDeskripsi").val(t.deskripsi),t.pdf?(e("#pdfPreview").attr("src","/"+t.pdf),e("#pdfPreviewContainer").removeClass("hidden"),e("#oldPdf").val(t.pdf)):(e("#pdfPreview").attr("src",""),e("#pdfPreviewContainer").addClass("hidden"),e("#oldPdf").val("")),t.foto?(e("#preview").attr("src","/"+t.foto),e("#previewContainer").removeClass("hidden"),e("#oldFoto").val(t.foto)):(e("#preview").attr("src",""),e("#previewContainer").addClass("hidden"),e("#oldFoto").val("")),C("artikelModal")},error:function(t){console.error("Gagal ambil data:",t.responseText),alert("Gagal ambil data artikel")}})});e(document).on("click",".delete-btn",function(){const t=e(this).data("id"),s=e(this).data("name");e("#deleteartikelId").val(t),e("#deleteArtikelName").text(s),x("deleteModal")});e(document).on("click","#confirmDeleteBtn",function(){const t=e(this),s=t.html();t.html('<i class="fas fa-spinner fa-spin mr-2"></i>Menghapus...').prop("disabled",!0);const r=e("#deleteartikelId").val();e.ajax({url:`/admin/kreatif/${r}`,type:"DELETE",success:function(a){i(a.message,a.status),d("deleteModal"),p()},error:function(a){let n=a.responseJSON&&a.responseJSON.message?a.responseJSON.message:"Gagal menghapus data!";i(n,"error")},complete:function(){t.html(s).prop("disabled",!1)}})});e("#removePdf").on("click",function(){let t=e("#artikelId").val();if(!t){i("ID Pengurus tidak ditemukan.");return}e.ajax({url:"/kreatif/deletePdf",type:"POST",data:{id:t},success:function(s){s.success?(e("#artikelPdf").val(""),e("#pdfPreviewContainer").addClass("hidden"),e("#preview").attr("src",""),i(s.message,"success")):i("Gagal menghapus foto.")},error:function(){i("Terjadi kesalahan.")}})});e(document).on("click",".approve-btn",function(){const t=e(this).data("id"),s=e(this).data("name");e("#approveartikelId").val(t),e("#approveArtikelName").text(s),x("approveModal")});e(document).on("click","#confirmApproveBtn",function(){const t=e(this),s=t.html();t.html('<i class="fas fa-spinner fa-spin mr-2"></i>Menyetujui...').prop("disabled",!0);const r=e("#approveartikelId").val();e.ajax({url:`/admin/approvekreatif/${r}`,type:"POST",success:function(a){i(a.message,a.status),d("approveModal"),p()},error:function(a){let n=a.responseJSON&&a.responseJSON.message?a.responseJSON.message:"Gagal menyetujui data!";i(n,"error")},complete:function(){t.html(s).prop("disabled",!1)}})});e(document).on("click","#confirmRejectBtn",function(){const t=e(this),s=t.html();t.html('<i class="fas fa-spinner fa-spin mr-2"></i>Menyetujui...').prop("disabled",!0);const r=e("#approveartikelId").val();e.ajax({url:`/admin/rejectkreatif/${r}`,type:"POST",success:function(a){i(a.message,a.status),d("approveModal"),p()},error:function(a){let n=a.responseJSON&&a.responseJSON.message?a.responseJSON.message:"Gagal menyetujui data!";i(n,"error")},complete:function(){t.html(s).prop("disabled",!1)}})});e("#pendaftaranSwitch").click(function(){e.ajax({url:"/pendaftaran/toggle",type:"POST",success:function(t){const s=e("#pendaftaranBg"),r=e("#pendaftaranKnob");t.value==1?(s.removeClass("bg-gray-300").addClass("bg-green-500"),r.addClass("translate-x-8")):(s.removeClass("bg-green-500").addClass("bg-gray-300"),r.removeClass("translate-x-8"))},error:function(){alert("Gagal mengubah status pendaftaran.")}})});
