import{$ as t}from"./jquery-BvxTx_lq.js";t.ajaxSetup({headers:{"X-CSRF-TOKEN":t('meta[name="csrf-token"]').attr("content")}});let c=1;const b=10;let f=0;t(function(){p()});function p(e="",a=1){const i=t("#kategori_id").val();t.ajax({url:`/admin/getsoal/${i}`,type:"GET",data:{search:e,page:a,limit:b},dataType:"json",success:function(n){if(!Array.isArray(n.data))return;w(n.data,n.current_page),C(n.data),$(n.last_page,e),M(n.last_page,e);const s=(n.current_page-1)*b+1,o=s+n.data.length-1;t("#resultCount").html(`
                <i class="fas fa-info-circle mr-1"></i>
                Menampilkan ${s}–${o} dari ${n.total} data
            `)},error:function(n){console.error("Gagal ambil data:",n.responseText)}})}function w(e,a){const i=t("#tableSoal");if(i.empty(),e.length===0){i.append(`
            <tr>
                <td colspan="4" class="px-6 py-8 text-center text-gray-500">
                    <i class="fas fa-info-circle text-gray-400 mr-2"></i>Tidak ada data ditemukan
                </td>
            </tr>
        `);return}e.forEach((n,s)=>{const o=(a-1)*b+s+1;i.append(`
            <tr class="hover:bg-gray-50 transition-colors duration-200">
                <td class="px-6 py-4 text-sm text-gray-900">${o}</td>
                <td class="px-6 py-4">
                    <div class="flex items-center gap-3">
                        <div class="h-9 w-9 rounded-full bg-gradient-to-r gradient-bg to-blue-light
                                    flex items-center justify-center text-white font-semibold flex-shrink-0">
                            ${n.pertanyaan.charAt(0).toUpperCase()}
                        </div>
                        <span class="text-sm font-medium text-gray-900">${n.pertanyaan}</span>
                    </div>
                </td>
                <td class="px-6 py-4 text-sm">
                    <span class="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                        ${n.pilihan_count??0} opsi
                    </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm">
                    <div class="flex items-center gap-2">
                        <button class="edit-btn px-3 py-1.5 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all text-xs"
                                data-id="${n.id}">
                            <i class="fas fa-edit mr-1"></i>Edit
                        </button>
                        <button class="delete-btn px-3 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all text-xs"
                                data-id="${n.id}">
                            <i class="fas fa-trash mr-1"></i>Hapus
                        </button>
                    </div>
                </td>
            </tr>
        `)})}function C(e){const a=t("#cardContainer");if(a.empty(),e.length===0){a.append(`
            <div class="p-6 text-center text-gray-500">
                <i class="fas fa-info-circle text-gray-400 mr-2"></i>Tidak ada data ditemukan
            </div>
        `);return}e.forEach(i=>{a.append(`
            <div class="p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200">
                <div class="flex items-start gap-3">
                    <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-r gradient-bg to-blue-light
                                flex items-center justify-center text-white font-semibold">
                        ${i.pertanyaan.charAt(0).toUpperCase()}
                    </div>
                    <div class="flex-1 min-w-0">
                        <p class="text-sm font-semibold text-gray-900 mb-1">${i.pertanyaan}</p>
                        <span class="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                            ${i.pilihan_count??0} opsi
                        </span>
                        <div class="flex mt-3 gap-2">
                            <button class="edit-btn flex-1 px-3 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all text-sm"
                                    data-id="${i.id}">
                                <i class="fas fa-edit"></i> Edit
                            </button>
                            <button class="delete-btn flex-1 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all text-sm"
                                    data-id="${i.id}">
                                <i class="fas fa-trash"></i> Hapus
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `)})}function $(e,a){const i=t("#pagination");if(i.empty(),!(e<=1))for(let n=1;n<=e;n++){const s=t(`<button class="page-btn mx-1 px-3 py-1 rounded-lg border
            ${n===c?"bg-orange-primary text-white":"bg-white text-gray-700 hover:bg-gray-100"}">${n}</button>`);s.on("click",()=>{c=n,p(a,n)}),i.append(s)}}function M(e,a){const i=t("#paginationMobile");if(i.empty(),!(e<=1))for(let n=1;n<=e;n++){const s=t(`<button class="px-3 py-1 rounded-lg border
            ${n===c?"bg-orange-primary text-white":"bg-white text-gray-700 hover:bg-gray-100"}">${n}</button>`);s.on("click",()=>{c=n,p(a,n)}),i.append(s)}}t("#searchInputsoal").on("input",function(){c=1,p(t(this).val(),1)});function d(e="",a=!1){f++;const i=f,n=a?"bg-green-500 border-green-500 text-white":"bg-gray-200 border-gray-300 text-gray-400",s=a?"fa-check":"fa-times",o=a?"Jawaban Benar (klik untuk ubah)":"Jawaban Salah (klik untuk ubah)";t("#pilihanContainer").append(`
        <div class="pilihan-row flex items-center gap-2" id="pilihan-row-${i}">
            <button type="button"
                    class="toggle-benar flex-shrink-0 w-8 h-8 rounded-lg border-2 flex items-center justify-center
                           transition-all duration-200 ${n}"
                    data-uid="${i}"
                    data-benar="${a?"1":"0"}"
                    title="${o}">
                <i class="fas ${s} text-xs"></i>
            </button>

            <input type="text"
                   id="pilihan-teks-${i}"
                   class="pilihan-teks flex-1 px-3 py-2 border-2 border-gray-200 rounded-xl
                          focus:border-blue-primary focus:ring-0 transition-all duration-300 text-sm text-gray-900"
                   placeholder="Masukkan teks opsi jawaban..."
                   value="${S(e)}">

            <button type="button"
                    class="remove-pilihan flex-shrink-0 w-8 h-8 rounded-lg bg-red-100 text-red-500
                           hover:bg-red-500 hover:text-white transition-all duration-200 flex items-center justify-center"
                    data-uid="${i}"
                    title="Hapus opsi ini">
                <i class="fas fa-trash text-xs"></i>
            </button>
        </div>
    `)}function S(e){return t("<div>").text(e).html()}t("#addPilihanBtn").on("click",function(){d()});t(document).on("click",".toggle-benar",function(){const a=!(t(this).data("benar")==="1"||t(this).data("benar")===1);t(this).data("benar",a?"1":"0"),a?t(this).removeClass("bg-gray-200 border-gray-300 text-gray-400").addClass("bg-green-500 border-green-500 text-white").attr("title","Jawaban Benar (klik untuk ubah)").find("i").removeClass("fa-times").addClass("fa-check"):t(this).removeClass("bg-green-500 border-green-500 text-white").addClass("bg-gray-200 border-gray-300 text-gray-400").attr("title","Jawaban Salah (klik untuk ubah)").find("i").removeClass("fa-check").addClass("fa-times")});t(document).on("click",".remove-pilihan",function(){if(t("#pilihanContainer .pilihan-row").length<=2){r("Minimal harus ada 2 opsi jawaban.","error");return}t(`#pilihan-row-${t(this).data("uid")}`).remove()});function x(){const e=[];return t("#pilihanContainer .pilihan-row").each(function(){const a=t(this).find(".toggle-benar").data("uid"),i=t(`#pilihan-teks-${a}`).val().trim(),n=t(this).find(".toggle-benar").data("benar");e.push({teks:i,is_true:n==="1"||n===1})}),e}function T(){let e=!0;t("#teksSoal").val().trim()?t("#teksSoal").removeClass("border-red-300 bg-red-50"):(t("#teksSoal").addClass("border-red-300 bg-red-50"),e=!1);const a=x(),i=a.some(s=>!s.teks),n=a.filter(s=>s.is_true).length;return t("#pilihanError").addClass("hidden"),a.length<2?(g("Minimal harus ada 2 opsi jawaban."),e=!1):i?(g("Semua teks opsi jawaban wajib diisi."),e=!1):n===0&&(g("Minimal satu opsi harus ditandai sebagai jawaban benar."),e=!1),e}function g(e){t("#pilihanErrorMsg").text(e),t("#pilihanError").removeClass("hidden")}function y(){t("#soalForm")[0].reset(),t("#soalId").val(""),t("#teksSoal").removeClass("border-red-300 bg-red-50"),t("#pilihanContainer").empty(),t("#pilihanError").addClass("hidden"),f=0,d("",!0),d("",!1)}function h(e){const a=t("#"+e);a.removeClass("hidden"),setTimeout(()=>a.find(".modal-content").addClass("show"),10),t("body").addClass("overflow-hidden")}function u(e){const a=t("#"+e);a.find(".modal-content").removeClass("show"),setTimeout(()=>{a.addClass("hidden"),t("body").removeClass("overflow-hidden")},300)}t(".modal-overlay").on("click",function(e){e.target===this&&(t(this).closest("#soalModal").length&&u("soalModal"),t(this).closest("#deleteModal").length&&u("deleteModal"))});t("#closeModal, #cancelBtn").on("click",()=>u("soalModal"));t("#cancelDeleteBtn").on("click",()=>u("deleteModal"));t("#addSoalBtn").on("click",function(){y(),t("#modalTitle").text("Tambah Soal Baru"),t("#modalIcon").attr("class","fas fa-plus-circle text-white text-lg"),t("#submitText").text("Simpan Data"),t("#submitIcon").attr("class","fas fa-save mr-2"),h("soalModal")});t(document).on("click",".edit-btn",function(){const e=t(this).data("id");y(),t("#modalTitle").text("Edit Soal"),t("#modalIcon").attr("class","fas fa-edit text-white text-lg"),t("#submitText").text("Update Data"),t("#submitIcon").attr("class","fas fa-edit mr-2"),t.ajax({url:`/admin/getpertanyaan/soal/${e}`,type:"GET",success:function(a){t("#soalId").val(a.id),t("#teksSoal").val(a.pertanyaan),t("#pilihanContainer").empty(),f=0,a.pilihan&&a.pilihan.length>0?a.pilihan.forEach(i=>d(i.teks,!!i.is_true)):(d("",!0),d("",!1)),h("soalModal")},error:function(a){console.error("Gagal ambil data:",a.responseText),r("Gagal memuat data soal.","error")}})});t("#soalForm").on("submit",function(e){if(e.preventDefault(),!T()){r("Mohon lengkapi semua field yang wajib diisi!","error");return}const a=t("#submitBtn"),i=a.html();a.html('<i class="fas fa-spinner fa-spin mr-2"></i>Menyimpan...').prop("disabled",!0);const n=t("#soalId").val(),s=t("#kategori_id").val(),o={name:t("#teksSoal").val().trim(),kategori_id:s,pilihan:x()},v=n?`/admin/pertanyaan/soal/${n}`:"/admin/pertanyaan/soal",k=n?"PUT":"POST";t.ajax({url:v,type:k,data:JSON.stringify(o),contentType:"application/json",success:function(l){r(l.message,l.status),u("soalModal"),a.html(i).prop("disabled",!1),p(t("#searchInputsoal").val(),c)},error:function(l){if(a.html(i).prop("disabled",!1),l.status===422&&l.responseJSON){const m=l.responseJSON;m.errors?r(Object.values(m.errors).flat().join(" | "),"error"):r(m.message??"Validasi gagal.","error")}else r(l.responseJSON?.message??"Terjadi kesalahan saat menyimpan!","error")}})});t(document).on("click",".delete-btn",function(){t("#deleteSoalId").val(t(this).data("id")),h("deleteModal")});t(document).on("click","#confirmDeleteBtn",function(){const e=t(this),a=e.html();e.html('<i class="fas fa-spinner fa-spin mr-2"></i>Menghapus...').prop("disabled",!0),t.ajax({url:`/admin/pertanyaan/soal/${t("#deleteSoalId").val()}`,type:"DELETE",success:function(i){r(i.message,i.status),u("deleteModal"),p()},error:function(i){r(i.responseJSON?.message??"Gagal menghapus data!","error")},complete:function(){e.html(a).prop("disabled",!1)}})});function r(e,a="info"){const s=t(`
        <div class="notification flex items-center space-x-3 ${a==="success"?"bg-green-500":a==="error"?"bg-red-500":"bg-blue-500"} text-white px-6 py-4
                    rounded-xl shadow-lg transform translate-x-full opacity-0 transition-all duration-300 cursor-pointer">
            <i class="fas ${a==="success"?"fa-check-circle":a==="error"?"fa-exclamation-circle":"fa-info-circle"} text-lg"></i>
            <span class="font-medium">${e}</span>
        </div>
    `);t("#notificationWrapper").append(s),setTimeout(()=>s.removeClass("translate-x-full opacity-0"),100);const o=setTimeout(()=>{s.addClass("translate-x-full opacity-0"),setTimeout(()=>s.remove(),300)},4e3);s.on("click",function(){clearTimeout(o),t(this).addClass("translate-x-full opacity-0"),setTimeout(()=>t(this).remove(),300)})}
