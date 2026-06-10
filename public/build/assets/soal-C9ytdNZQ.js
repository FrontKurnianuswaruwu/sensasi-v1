import{$ as e}from"./jquery-CEr4rF5i.js";e.ajaxSetup({headers:{"X-CSRF-TOKEN":e('meta[name="csrf-token"]').attr("content")}});let u=1;const k=10;let h=0,o=[];e(function(){p()});function p(t="",a=1){const n=e("#kategori_id").val();e.ajax({url:`/admin/getsoal/${n}`,type:"GET",data:{search:t,page:a,limit:k},dataType:"json",success:function(i){if(!Array.isArray(i.data))return;$(i.data,i.current_page),M(i.data),S(i.last_page,t),T(i.last_page,t);const s=(i.current_page-1)*k+1,d=s+i.data.length-1;e("#resultCount").html(`
                <i class="fas fa-info-circle mr-1"></i>
                Menampilkan ${s}–${d} dari ${i.total} data
            `)},error:function(i){console.error("Gagal ambil data:",i.responseText)}})}function $(t,a){const n=e("#tableSoal");if(n.empty(),t.length===0){n.append(`
            <tr>
                <td colspan="5" class="px-6 py-8 text-center text-gray-500">
                    <i class="fas fa-info-circle text-gray-400 mr-2"></i>Tidak ada data ditemukan
                </td>
            </tr>
        `);return}t.forEach((i,s)=>{const d=(a-1)*k+s+1,b=o.includes(i.id)?"checked":"";n.append(`
            <tr class="hover:bg-gray-50 transition-colors duration-200">
                <td class="px-6 py-4">
                    <input type="checkbox" class="soal-checkbox w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                           data-id="${i.id}" ${b}>
                </td>
                <td class="px-6 py-4 text-sm text-gray-900">${d}</td>
                <td class="px-6 py-4">
                    <div class="flex items-center gap-3">
                        <div class="h-9 w-9 rounded-full bg-gradient-to-r gradient-bg to-blue-light
                                    flex items-center justify-center text-white font-semibold flex-shrink-0">
                            ${i.pertanyaan.charAt(0).toUpperCase()}
                        </div>
                        <span class="text-sm font-medium text-gray-900">${i.pertanyaan}</span>
                    </div>
                </td>
                <td class="px-6 py-4 text-sm">
                    <span class="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                        ${i.pilihan_count??0} opsi
                    </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm">
                    <div class="flex items-center gap-2">
                        <button class="edit-btn px-3 py-1.5 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all text-xs"
                                data-id="${i.id}">
                            <i class="fas fa-edit mr-1"></i>Edit
                        </button>
                        <button class="delete-btn px-3 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all text-xs"
                                data-id="${i.id}">
                            <i class="fas fa-trash mr-1"></i>Hapus
                        </button>
                    </div>
                </td>
            </tr>
        `)})}function M(t){const a=e("#cardContainer");if(a.empty(),t.length===0){a.append(`
            <div class="p-6 text-center text-gray-500">
                <i class="fas fa-info-circle text-gray-400 mr-2"></i>Tidak ada data ditemukan
            </div>
        `);return}t.forEach(n=>{a.append(`
            <div class="p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200">
                <div class="flex items-start gap-3">
                    <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-r gradient-bg to-blue-light
                                flex items-center justify-center text-white font-semibold">
                        ${n.pertanyaan.charAt(0).toUpperCase()}
                    </div>
                    <div class="flex-1 min-w-0">
                        <p class="text-sm font-semibold text-gray-900 mb-1">${n.pertanyaan}</p>
                        <span class="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                            ${n.pilihan_count??0} opsi
                        </span>
                        <div class="flex mt-3 gap-2">
                            <button class="edit-btn flex-1 px-3 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all text-sm"
                                    data-id="${n.id}">
                                <i class="fas fa-edit"></i> Edit
                            </button>
                            <button class="delete-btn flex-1 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all text-sm"
                                    data-id="${n.id}">
                                <i class="fas fa-trash"></i> Hapus
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `)})}function S(t,a){const n=e("#pagination");if(n.empty(),!(t<=1))for(let i=1;i<=t;i++){const s=e(`<button class="page-btn mx-1 px-3 py-1 rounded-lg border
            ${i===u?"bg-orange-primary text-white":"bg-white text-gray-700 hover:bg-gray-100"}">${i}</button>`);s.on("click",()=>{u=i,p(a,i)}),n.append(s)}}function T(t,a){const n=e("#paginationMobile");if(n.empty(),!(t<=1))for(let i=1;i<=t;i++){const s=e(`<button class="px-3 py-1 rounded-lg border
            ${i===u?"bg-orange-primary text-white":"bg-white text-gray-700 hover:bg-gray-100"}">${i}</button>`);s.on("click",()=>{u=i,p(a,i)}),n.append(s)}}e("#searchInputsoal").on("input",function(){u=1,p(e(this).val(),1)});function y(){const t=o.length;e("#selectedCount").text(t),t>0?e("#bulkDeleteBtn").removeClass("hidden"):e("#bulkDeleteBtn").addClass("hidden");const a=e(".soal-checkbox").length,n=e(".soal-checkbox:checked").length;n===0?e("#checkAll").prop("checked",!1).prop("indeterminate",!1):n===a?e("#checkAll").prop("checked",!0).prop("indeterminate",!1):e("#checkAll").prop("checked",!1).prop("indeterminate",!0)}e(document).on("change","#checkAll",function(){const t=e(this).prop("checked");e(".soal-checkbox").each(function(){const a=parseInt(e(this).data("id"));if(e(this).prop("checked",t),t)o.includes(a)||o.push(a);else{const n=o.indexOf(a);n>-1&&o.splice(n,1)}}),y()});e(document).on("change",".soal-checkbox",function(){const t=parseInt(e(this).data("id"));if(e(this).prop("checked"))o.includes(t)||o.push(t);else{const a=o.indexOf(t);a>-1&&o.splice(a,1)}y()});e("#bulkDeleteBtn").on("click",function(){if(o.length===0){l("Pilih minimal satu soal untuk dihapus","error");return}e("#bulkDeleteCount").text(o.length),m("bulkDeleteModal")});e("#cancelBulkDeleteBtn").on("click",()=>r("bulkDeleteModal"));e("#confirmBulkDeleteBtn").on("click",function(){const t=e(this),a=t.html();t.html('<i class="fas fa-spinner fa-spin mr-2"></i>Menghapus...').prop("disabled",!0),e.ajax({url:"/admin/pertanyaan/soal/bulk-delete",type:"POST",contentType:"application/json",data:JSON.stringify({ids:o}),success:function(n){l(n.message,n.status),r("bulkDeleteModal"),o=[],y(),p(e("#searchInputsoal").val(),u)},error:function(n){l(n.responseJSON?.message??"Gagal menghapus data!","error")},complete:function(){t.html(a).prop("disabled",!1)}})});e(".modal-overlay").on("click",function(t){t.target===this&&(e(this).closest("#soalModal").length&&r("soalModal"),e(this).closest("#deleteModal").length&&r("deleteModal"),e(this).closest("#bulkDeleteModal").length&&r("bulkDeleteModal"))});function f(t="",a=!1){h++;const n=h,i=a?"bg-green-500 border-green-500 text-white":"bg-gray-200 border-gray-300 text-gray-400",s=a?"fa-check":"fa-times",d=a?"Jawaban Benar (klik untuk ubah)":"Jawaban Salah (klik untuk ubah)";e("#pilihanContainer").append(`
        <div class="pilihan-row flex items-center gap-2" id="pilihan-row-${n}">
            <button type="button"
                    class="toggle-benar flex-shrink-0 w-8 h-8 rounded-lg border-2 flex items-center justify-center
                           transition-all duration-200 ${i}"
                    data-uid="${n}"
                    data-benar="${a?"1":"0"}"
                    title="${d}">
                <i class="fas ${s} text-xs"></i>
            </button>

            <input type="text"
                   id="pilihan-teks-${n}"
                   class="pilihan-teks flex-1 px-3 py-2 border-2 border-gray-200 rounded-xl
                          focus:border-blue-primary focus:ring-0 transition-all duration-300 text-sm text-gray-900"
                   placeholder="Masukkan teks opsi jawaban..."
                   value="${j(t)}">

            <button type="button"
                    class="remove-pilihan flex-shrink-0 w-8 h-8 rounded-lg bg-red-100 text-red-500
                           hover:bg-red-500 hover:text-white transition-all duration-200 flex items-center justify-center"
                    data-uid="${n}"
                    title="Hapus opsi ini">
                <i class="fas fa-trash text-xs"></i>
            </button>
        </div>
    `)}function j(t){return e("<div>").text(t).html()}e("#addPilihanBtn").on("click",function(){f()});e(document).on("click",".toggle-benar",function(){const a=!(e(this).data("benar")==="1"||e(this).data("benar")===1);e(this).data("benar",a?"1":"0"),a?e(this).removeClass("bg-gray-200 border-gray-300 text-gray-400").addClass("bg-green-500 border-green-500 text-white").attr("title","Jawaban Benar (klik untuk ubah)").find("i").removeClass("fa-times").addClass("fa-check"):e(this).removeClass("bg-green-500 border-green-500 text-white").addClass("bg-gray-200 border-gray-300 text-gray-400").attr("title","Jawaban Salah (klik untuk ubah)").find("i").removeClass("fa-check").addClass("fa-times")});e(document).on("click",".remove-pilihan",function(){if(e("#pilihanContainer .pilihan-row").length<=2){l("Minimal harus ada 2 opsi jawaban.","error");return}e(`#pilihan-row-${e(this).data("uid")}`).remove()});function v(){const t=[];return e("#pilihanContainer .pilihan-row").each(function(){const a=e(this).find(".toggle-benar").data("uid"),n=e(`#pilihan-teks-${a}`).val().trim(),i=e(this).find(".toggle-benar").data("benar");t.push({teks:n,is_true:i==="1"||i===1})}),t}function I(){let t=!0;e("#teksSoal").val().trim()?e("#teksSoal").removeClass("border-red-300 bg-red-50"):(e("#teksSoal").addClass("border-red-300 bg-red-50"),t=!1);const a=v(),n=a.some(s=>!s.teks),i=a.filter(s=>s.is_true).length;return e("#pilihanError").addClass("hidden"),a.length<2?(x("Minimal harus ada 2 opsi jawaban."),t=!1):n?(x("Semua teks opsi jawaban wajib diisi."),t=!1):i===0&&(x("Minimal satu opsi harus ditandai sebagai jawaban benar."),t=!1),t}function x(t){e("#pilihanErrorMsg").text(t),e("#pilihanError").removeClass("hidden")}function w(){e("#soalForm")[0].reset(),e("#soalId").val(""),e("#teksSoal").removeClass("border-red-300 bg-red-50"),e("#pilihanContainer").empty(),e("#pilihanError").addClass("hidden"),h=0,f("",!0),f("",!1)}function m(t){const a=e("#"+t);a.removeClass("hidden"),setTimeout(()=>a.find(".modal-content").addClass("show"),10),e("body").addClass("overflow-hidden")}function r(t){const a=e("#"+t);a.find(".modal-content").removeClass("show"),setTimeout(()=>{a.addClass("hidden"),e("body").removeClass("overflow-hidden")},300)}e(".modal-overlay").on("click",function(t){t.target===this&&(e(this).closest("#soalModal").length&&r("soalModal"),e(this).closest("#deleteModal").length&&r("deleteModal"))});e("#closeModal, #cancelBtn").on("click",()=>r("soalModal"));e("#cancelDeleteBtn").on("click",()=>r("deleteModal"));e("#addSoalBtn").on("click",function(){w(),e("#modalTitle").text("Tambah Soal Baru"),e("#modalIcon").attr("class","fas fa-plus-circle text-white text-lg"),e("#submitText").text("Simpan Data"),e("#submitIcon").attr("class","fas fa-save mr-2"),m("soalModal")});e(document).on("click",".edit-btn",function(){const t=e(this).data("id");w(),e("#modalTitle").text("Edit Soal"),e("#modalIcon").attr("class","fas fa-edit text-white text-lg"),e("#submitText").text("Update Data"),e("#submitIcon").attr("class","fas fa-edit mr-2"),e.ajax({url:`/admin/getpertanyaan/soal/${t}`,type:"GET",success:function(a){e("#soalId").val(a.id),e("#teksSoal").val(a.pertanyaan),e("#pilihanContainer").empty(),h=0,a.pilihan&&a.pilihan.length>0?a.pilihan.forEach(n=>f(n.teks,n.is_true==1)):(f("",!0),f("",!1)),m("soalModal")},error:function(a){console.error("Gagal ambil data:",a.responseText),l("Gagal memuat data soal.","error")}})});e("#soalForm").on("submit",function(t){if(t.preventDefault(),!I()){l("Mohon lengkapi semua field yang wajib diisi!","error");return}const a=e("#submitBtn"),n=a.html();a.html('<i class="fas fa-spinner fa-spin mr-2"></i>Menyimpan...').prop("disabled",!0);const i=e("#soalId").val(),s=e("#kategori_id").val(),d={name:e("#teksSoal").val().trim(),kategori_id:s,pilihan:v()},b=i?`/admin/pertanyaan/soal/${i}`:"/admin/pertanyaan/soal",C=i?"PUT":"POST";e.ajax({url:b,type:C,data:JSON.stringify(d),contentType:"application/json",success:function(c){l(c.message,c.status),r("soalModal"),a.html(n).prop("disabled",!1),p(e("#searchInputsoal").val(),u)},error:function(c){if(a.html(n).prop("disabled",!1),c.status===422&&c.responseJSON){const g=c.responseJSON;g.errors?l(Object.values(g.errors).flat().join(" | "),"error"):l(g.message??"Validasi gagal.","error")}else l(c.responseJSON?.message??"Terjadi kesalahan saat menyimpan!","error")}})});e(document).on("click",".delete-btn",function(){e("#deleteSoalId").val(e(this).data("id")),m("deleteModal")});e(document).on("click","#confirmDeleteBtn",function(){const t=e(this),a=t.html();t.html('<i class="fas fa-spinner fa-spin mr-2"></i>Menghapus...').prop("disabled",!0),e.ajax({url:`/admin/pertanyaan/soal/${e("#deleteSoalId").val()}`,type:"DELETE",success:function(n){l(n.message,n.status),r("deleteModal"),p()},error:function(n){l(n.responseJSON?.message??"Gagal menghapus data!","error")},complete:function(){t.html(a).prop("disabled",!1)}})});function l(t,a="info"){const s=e(`
        <div class="notification flex items-center space-x-3 ${a==="success"?"bg-green-500":a==="error"?"bg-red-500":"bg-blue-500"} text-white px-6 py-4
                    rounded-xl shadow-lg transform translate-x-full opacity-0 transition-all duration-300 cursor-pointer">
            <i class="fas ${a==="success"?"fa-check-circle":a==="error"?"fa-exclamation-circle":"fa-info-circle"} text-lg"></i>
            <span class="font-medium">${t}</span>
        </div>
    `);e("#notificationWrapper").append(s),setTimeout(()=>s.removeClass("translate-x-full opacity-0"),100);const d=setTimeout(()=>{s.addClass("translate-x-full opacity-0"),setTimeout(()=>s.remove(),300)},4e3);s.on("click",function(){clearTimeout(d),e(this).addClass("translate-x-full opacity-0"),setTimeout(()=>e(this).remove(),300)})}
