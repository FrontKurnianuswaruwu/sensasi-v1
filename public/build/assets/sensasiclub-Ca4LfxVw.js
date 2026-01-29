import{$ as e}from"./jquery-BvxTx_lq.js";e.ajaxSetup({headers:{"X-CSRF-TOKEN":e('meta[name="csrf-token"]').attr("content")}});e(function(){u()});let d=1;const v=10;function T(a){const t=e("#tableSensasiclub");if(t.empty(),a.length===0){t.append(`
            <tr>
                <td colspan="5" class="px-6 py-8 text-center text-gray-500">
                    <i class="fas fa-info-circle text-gray-400 mr-2"></i>
                    Tidak ada data ditemukan
                </td>
            </tr>
        `);return}a.forEach((s,i)=>{const n=s.jenis==="artikel",l=n?"bg-green-100 text-green-800":"bg-red-100 text-red-800",p=`
            <tr class="hover:bg-gray-50 transition-colors duration-200">
                <td class="px-6 py-4 text-sm text-gray-900">${i+1}</td>

                <td class="px-6 py-4">
                    <div class="flex items-center">
                        <div class="flex-shrink-0 h-10 w-10">
                            <div class="h-10 w-10 rounded-full bg-gradient-to-r gradient-bg to-blue-light flex items-center justify-center text-white font-semibold">
                                ${s?.mahasiswa?.user?.name?.charAt(0)??"-"}
                            </div>
                        </div>
                        <div class="ml-4">
                            <div class="text-sm font-medium text-gray-900">
                                ${s?.mahasiswa?.user?.name??"-"}
                            </div>
                        </div>
                    </div>
                </td>

                <td class="px-6 py-4 text-sm text-gray-900">
                    ${s?.mahasiswa?.mitra?.nama_mitra||"-"}
                </td>

                <td class="px-6 py-4 text-sm text-gray-900">
                    ${s.judul||"-"}
                </td>

                <td class="px-6 py-4">
                    <span class="px-2 py-1 inline-flex text-xs font-semibold rounded-full ${l}">
                        ${n?"Artikel":"Youtube"}
                    </span>
                </td>

                <td class="px-6 py-4 whitespace-nowrap text-sm">
                    <button class="edit-btn px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 mr-2" data-id="${s.id}">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="delete-btn px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600" data-id="${s.id}" data-name="${s.judul}">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;t.append(p)})}function $(a){const t=e("#cardContainer");if(t.empty(),a.length===0){t.append(`
            <div class="p-6 text-center text-gray-500">
                <i class="fas fa-info-circle text-gray-400 mr-2"></i>
                Tidak ada data ditemukan
            </div>
        `);return}a.forEach(s=>{const i=`
            <div class="p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200">
                <div class="flex items-start space-x-3">
                    <div class="flex-shrink-0 h-12 w-12 rounded-full bg-gradient-to-r gradient-bg to-blue-light flex items-center justify-center text-white font-semibold text-lg">
                        ${s?.mahasiswa?.user?.name.charAt(0)}
                    </div>
                    <div class="flex-1 min-w-0">
                        <div class="flex items-center justify-between mb-2">
                            <h3 class="text-lg font-semibold text-gray-900 truncate">
                                ${s?.mahasiswa?.user?.name}
                            </h3>
                            <!-- Badge Tipe Konten -->
                            <span class="inline-block px-2 py-1 text-xs font-semibold rounded-full 
                                        ${s.jenis==="youtube"?"bg-red-100 text-red-800":"bg-green-100 text-green-800"}">
                                ${s.jenis==="youtube"?"YouTube":"Artikel"}
                            </span>
                        </div>
                        <div class="space-y-1 text-sm text-gray-600">
                            <div class="flex items-center">
                                <i class="fas fa-handshake w-4 mr-2 text-orange-primary"></i>
                                <span class="truncate">${s?.mahasiswa?.mitra?.nama_mitra}</span>
                            </div>
                            <div class="flex items-center">
                                <i class="fas fa-bookmark w-4 mr-2 text-blue-500"></i>
                                <span class="truncate">${s.judul}</span>
                            </div>
                            <div class="flex mt-4 space-x-2">
                                <button class="edit-btn flex-1 px-3 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all" data-id="${s.id}">
                                    <i class="fas fa-edit"></i> Edit
                                </button>
                                <button class="delete-btn flex-1 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all" data-id="${s.id}" data-name="${s.judul}">
                                    <i class="fas fa-trash"></i> Hapus
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;t.append(i)})}function F(a,t){const s=e("#pagination");if(s.empty(),!(a<=1))for(let i=1;i<=a;i++){const n=e(`<button class="page-btn mx-1 px-3 py-1 rounded-lg border ${i===d?"bg-orange-primary text-white":"bg-white text-gray-700 hover:bg-gray-100"}">${i}</button>`);n.on("click",function(){d=i,u(t,d)}),s.append(n)}}function M(a,t){const s=e("#paginationMobile");if(s.empty(),!(a<=1))for(let i=1;i<=a;i++){const n=e(`<button class="px-3 py-1 rounded-lg border ${i===d?"bg-orange-primary text-white":"bg-white text-gray-700 hover:bg-gray-100"}">${i}</button>`);n.on("click",function(){d=i,u(t,d)}),s.append(n)}}function u(a="",t=1){e.ajax({url:"/admin/getsensasiclub",type:"GET",data:{search:a,page:t,limit:v},dataType:"json",success:function(s){const i=s.data;if(!Array.isArray(i)){console.error("Response data bukan array:",i);return}T(i),$(i),F(s.last_page,a),M(s.last_page,a);let n=(s.current_page-1)*v+1,l=n+i.length-1;e("#resultCount").html(`
                <i class="fas fa-info-circle mr-1"></i>
                Menampilkan ${n} - ${l} dari ${s.total} data
            `)},error:function(s,i,n){console.error("Gagal ambil data:",n,s.responseText)}})}e("#searchInputsensasiclub").on("input",function(){const a=e(this).val();d=1,u(a,d)});function x(){e("#sensasiclubForm")[0].reset(),e("#sensasiclubForm input, #sensasiclubForm select, #sensasiclubForm textarea").removeClass("border-red-300 bg-red-50"),e("#sensasiclubForm input, #sensasiclubForm select").each(function(){D(this)}),window.deskripsiEditor&&window.deskripsiEditor.setData(""),e("#pdfPreview").attr("src",""),e("#pdfPreviewContainer").addClass("hidden")}function y(a){w(a),j()}function w(a){const t=e("#"+a);t.removeClass("hidden"),setTimeout(()=>{t.find(".modal-content").addClass("show")},10),e("body").addClass("overflow-hidden")}function j(){e("body").css({overflow:"hidden","padding-right":""})}function D(a){const s=e(a).attr("id")+"-error";e("#"+s).remove()}e("#cancelDeleteBtn").on("click",function(){c("deleteModal")});e("#closeModal, #cancelBtn").on("click",function(){c("sensasiclubModal")});function c(a){S(a),E()}function S(a){const t=e("#"+a);t.find(".modal-content").removeClass("show"),setTimeout(()=>{t.addClass("hidden"),e("body").removeClass("overflow-hidden")},300)}function E(){e("body").css({overflow:"","padding-right":""})}e(".modal-overlay").on("click",function(a){a.target===this&&(e(this).closest("#sensasiclubModal").length?c("sensasiclubModal"):e(this).closest("#deleteModal").length&&c("deleteModal"))});function o(a,t="info"){const n=e(`
            <div class="notification flex items-center space-x-3 ${t==="success"?"bg-green-500":t==="error"?"bg-red-500":"bg-blue-500"} text-white px-6 py-4 rounded-xl shadow-lg transform translate-x-full opacity-0 transition-all duration-300 cursor-pointer">
            <i class="fas ${t==="success"?"fa-check-circle":t==="error"?"fa-exclamation-circle":"fa-info-circle"} text-lg"></i>
            <span class="font-medium">${a}</span>
            </div>
            `);e("#notificationWrapper").append(n),setTimeout(()=>{n.removeClass("translate-x-full opacity-0")},100);const l=setTimeout(()=>{n.addClass("translate-x-full opacity-0"),setTimeout(()=>n.remove(),300)},4e3);n.on("click",function(){clearTimeout(l),e(this).addClass("translate-x-full opacity-0"),setTimeout(()=>e(this).remove(),300)})}function I(){let a=!0;return["sensasiclubMahasiswa","sensasiclubJudul"].forEach(function(s){const i=e("#"+s);!i.val()||!i.val().toString().trim()?(i.addClass("border-red-300 bg-red-50"),a=!1):i.removeClass("border-red-300 bg-red-50")}),a}e("#sensasiclubFoto").on("change",function(){const a=this;if(a.files&&a.files[0]){const t=new FileReader;t.onload=function(s){e("#preview").attr("src",s.target.result),e("#previewContainer").removeClass("hidden")},t.readAsDataURL(a.files[0])}});e("#sensasiclubPdf").on("change",function(){const a=this.files[0];if(a&&a.type==="application/pdf"){const t=URL.createObjectURL(a);e("#pdfPreview").attr("src",t),e("#pdfPreviewContainer").removeClass("hidden")}else e("#pdfPreview").attr("src",""),e("#pdfPreviewContainer").addClass("hidden"),alert("File bukan PDF!")});e("#dropzone").on("dragover",function(a){a.preventDefault(),e(this).addClass("border-blue-primary bg-blue-50")}).on("dragleave",function(){e(this).removeClass("border-blue-primary bg-blue-50")}).on("drop",function(a){a.preventDefault(),e(this).removeClass("border-blue-primary bg-blue-50");const t=a.originalEvent.dataTransfer.files;if(!t.length)return;const s=t[0];s.type.startsWith("image/")?(e("#sensasiclubFoto")[0].files=t,e("#sensasiclubFoto").trigger("change")):s.type==="application/pdf"?(e("#sensasiclubPdf")[0].files=t,e("#sensasiclubPdf").trigger("change")):alert("Hanya boleh upload gambar atau PDF!")});function C(a=""){e.get("/admin/getmahasiswa/sensasiclub",function(t){const s=Array.isArray(t)?t:[];e("#sensasiclubMahasiswa").empty(),e("#sensasiclubMahasiswa").append('<option value="">Pilih Mahasiswa</option>'),s.forEach(function(i){const n=i.id==a?"selected":"",l=i.user?i.user.name:"Nama tidak tersedia";e("#sensasiclubMahasiswa").append(`<option value="${i.id}" ${n}>${l}</option>`)})}).fail(function(){alert("Gagal mengambil data mahasiswa. Pastikan API berjalan dengan benar.")})}let m,b=null;e("#addSubsensasiclubBtn").on("click",function(){b=null,x(),e("#sensasiclubId").val(""),e("#modalTitle").text("Tambah Sensasiclub Baru"),e("#modalIcon").removeClass("fa-edit").addClass("fa-bookmark"),e("#submitText").text("Simpan Data"),e("#submitIcon").removeClass("fa-edit").addClass("fa-save"),y("sensasiclubModal"),C(),e("#sensasiclubIsparent").val("")});e(function(){ClassicEditor.create(document.querySelector("#sensasiclubDeskripsi")).then(a=>{m=a,console.log("CKEditor siap dipakai!")}).catch(a=>{console.error(a)}),e("#sensasiclubForm").on("submit",function(a){if(a.preventDefault(),!I()){o("Mohon lengkapi semua field yang wajib diisi!","error");return}const t=e("#submitBtn"),s=t.html();t.html('<i class="fas fa-spinner fa-spin mr-2"></i>Menyimpan...').prop("disabled",!0);const i=e("#sensasiclubId").val(),n=new FormData;n.append("mahasiswa_id",e("#sensasiclubMahasiswa").val()),n.append("judul",e("#sensasiclubJudul").val()),n.append("jenis",e("#sensasiclubTipe").val()),n.append("link_youtube",e("#sensasiclubYoutube").val()),n.append("deskripsi",m.getData());const l=e("#sensasiclubPdf")[0];l&&l.files.length>0&&n.append("pdf",l.files[0]);const p=e("#sensasiclubFoto")[0];p.files.length>0?n.append("foto",p.files[0]):n.append("oldFoto",e("#oldFoto").val());const k=i?`/admin/sensasiclub/${i}`:"/admin/sensasiclub",P="POST";i&&n.append("_method","PUT"),e.ajax({url:k,type:P,data:n,processData:!1,contentType:!1,success:function(r){o(r.message,r.status),c("sensasiclubModal"),t.html(s).prop("disabled",!1),u(e("#searchInputsensasiclub").val(),d)},error:function(r){if(t.html(s).prop("disabled",!1),r.status===422&&r.responseJSON.errors){let f=r.responseJSON.errors,g=[];for(let h in f)f.hasOwnProperty(h)&&g.push(f[h].join(", "));o(g.join(" | "),"error")}else{let f=r.responseJSON&&r.responseJSON.message?r.responseJSON.message:"Terjadi kesalahan saat menyimpan data!";o(f,"error")}}})})});e(document).on("click",".edit-btn",function(){b=e(this).data("id"),x(),e("#modalTitle").text("Edit Data Sensasiclub"),e("#modalIcon").removeClass().addClass("fa-bookmark"),e("#submitText").text("Update Data"),e("#submitIcon").removeClass("fa-save").addClass("fa-edit"),e.ajax({url:"/admin/sensasiclub/"+b,type:"GET",success:function(a){e("#sensasiclubId").val(a.id),C(a.mahasiswa_id),e("#sensasiclubJudul").val(a.judul),e("#sensasiclubTipe").val(a.jenis).trigger("change"),e("#sensasiclubYoutube").val(a.link_youtube),m?m.setData(a.deskripsi||""):e("#sensasiclubDeskripsi").val(a.deskripsi),a.pdf?(e("#pdfPreview").attr("src","/"+a.pdf),e("#pdfPreviewContainer").removeClass("hidden"),e("#oldPdf").val(a.pdf)):(e("#pdfPreview").attr("src",""),e("#pdfPreviewContainer").addClass("hidden"),e("#oldPdf").val("")),a.foto?(e("#preview").attr("src","/"+a.foto),e("#previewContainer").removeClass("hidden"),e("#oldFoto").val(a.foto)):(e("#preview").attr("src",""),e("#previewContainer").addClass("hidden"),e("#oldFoto").val("")),w("sensasiclubModal")},error:function(a){console.error("Gagal ambil data:",a.responseText),alert("Gagal ambil data sensasiclub")}})});e(document).on("click",".delete-btn",function(){const a=e(this).data("id"),t=e(this).data("name");e("#deletesensasiclubId").val(a),e("#deleteSensasiclubName").text(t),y("deleteModal")});e(document).on("click","#confirmDeleteBtn",function(){const a=e(this),t=a.html();a.html('<i class="fas fa-spinner fa-spin mr-2"></i>Menghapus...').prop("disabled",!0);const s=e("#deletesensasiclubId").val();e.ajax({url:`/admin/sensasiclub/${s}`,type:"DELETE",success:function(i){o(i.message,i.status),c("deleteModal"),u()},error:function(i){let n=i.responseJSON&&i.responseJSON.message?i.responseJSON.message:"Gagal menghapus data!";o(n,"error")},complete:function(){a.html(t).prop("disabled",!1)}})});e("#removePdf").on("click",function(){let a=e("#sensasiclubId").val();if(!a){e("#sensasiclubPdf").val(""),e("#pdfPreview").attr("src",""),e("#pdfPreviewContainer").addClass("hidden"),o("PDF dihapus.","success");return}e.ajax({url:"/sensasiclub/deletePdf",type:"POST",data:{id:a},success:function(t){t.success?(e("#sensasiclubPdf").val(""),e("#pdfPreviewContainer").addClass("hidden"),e("#preview").attr("src",""),o(t.message,"success")):o("Gagal menghapus pdf.")},error:function(){o("Terjadi kesalahan.")}})});e("#sensasiclubTipe").on("change",function(){const a=e(this).val();a==="youtube"?(e("#youtubeField").removeClass("hidden"),e("#artikelFields").addClass("hidden"),e("#sensasiclubPdf").val(""),e("#sensasiclubDeskripsi").val("")):a==="artikel"?(e("#youtubeField").addClass("hidden"),e("#artikelFields").removeClass("hidden"),e("#sensasiclubYoutube").val("")):(e("#youtubeField").addClass("hidden"),e("#artikelFields").addClass("hidden"),e("#sensasiclubYoutube").val(""),e("#sensasiclubPdf").val(""),e("#sensasiclubDeskripsi").val(""))});
