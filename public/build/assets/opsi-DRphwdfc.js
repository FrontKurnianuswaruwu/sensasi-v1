import{$ as t}from"./jquery-BvxTx_lq.js";t.ajaxSetup({headers:{"X-CSRF-TOKEN":t('meta[name="csrf-token"]').attr("content")}});t(function(){p()});let r=1;const b=10;function T(e){const n=t("#tableSoal");if(n.empty(),e.length===0){n.append(`
            <tr>
                <td colspan="5" class="px-6 py-8 text-center text-gray-500">
                    <i class="fas fa-info-circle text-gray-400 mr-2"></i>
                    Tidak ada data ditemukan
                </td>
            </tr>
        `);return}e.forEach((i,a)=>{let s=i.is_true?'<span class="px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">Benar</span>':'<span class="px-2 py-1 bg-red-100 text-red-800 text-xs font-semibold rounded-full">Salah</span>';const o=`
            <tr class="hover:bg-gray-50 transition-colors duration-200">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${a+1}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                        <div class="flex-shrink-0 h-10 w-10">
                            <div class="h-10 w-10 rounded-full bg-gradient-to-r gradient-bg to-blue-light flex items-center justify-center text-white font-semibold">
                                ${i.teks.charAt(0)}
                            </div>
                        </div>
                        <div class="ml-4">
                            <div class="text-sm font-medium text-gray-900">${i.teks}</div>
                        </div>
                    </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${s}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm">
                    <button class="edit-btn px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all mr-2" data-id="${i.id}">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="delete-btn px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all" data-id="${i.id}" data-name="${i.teks}">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;n.append(o)})}function k(e){const n=t("#cardContainer");if(n.empty(),e.length===0){n.append(`
            <div class="p-6 text-center text-gray-500">
                <i class="fas fa-info-circle text-gray-400 mr-2"></i>
                Tidak ada data ditemukan
            </div>
        `);return}e.forEach(i=>{const a=`
            <div class="p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200">
                <div class="flex items-center space-x-3">
                    <div class="flex-shrink-0 h-12 w-12 rounded-full bg-gradient-to-r gradient-bg to-blue-light flex items-center justify-center text-white font-semibold text-lg">
                        ${i.pertanyaan.charAt(0)}
                    </div>
                    <div class="flex-1 min-w-0">
                        <h3 class="text-lg font-semibold text-gray-900 truncate mb-2">${i.pertanyaan}</h3>
                        <div class="flex mt-4 space-x-2">
                            <button class="edit-btn flex-1 px-3 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all" data-id="${i.id}">
                                <i class="fas fa-edit"></i> Edit
                            </button>
                            <button class="delete-btn flex-1 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all" data-id="${i.id}" data-name="${i.name}">
                                <i class="fas fa-trash"></i> Hapus
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;n.append(a)})}function C(e,n){const i=t("#pagination");if(i.empty(),!(e<=1))for(let a=1;a<=e;a++){const s=t(`<button class="page-btn mx-1 px-3 py-1 rounded-lg border ${a===r?"bg-orange-primary text-white":"bg-white text-gray-700 hover:bg-gray-100"}">${a}</button>`);s.on("click",function(){r=a,p(n,r)}),i.append(s)}}function $(e,n){const i=t("#paginationMobile");if(i.empty(),!(e<=1))for(let a=1;a<=e;a++){const s=t(`<button class="px-3 py-1 rounded-lg border ${a===r?"bg-orange-primary text-white":"bg-white text-gray-700 hover:bg-gray-100"}">${a}</button>`);s.on("click",function(){r=a,p(n,r)}),i.append(s)}}function p(e="",n=1){let i=t("#soal_id").val();t.ajax({url:"/admin/pilihan/getpilihan/"+i,type:"GET",data:{search:e,page:n,limit:b},dataType:"json",success:function(a){const s=a.data;if(!Array.isArray(s)){console.error("Response data bukan array:",s);return}T(s),k(s),C(a.last_page,e),$(a.last_page,e);let o=(a.current_page-1)*b+1,f=o+s.length-1;t("#resultCount").html(`
                <i class="fas fa-info-circle mr-1"></i>
                Menampilkan ${o} - ${f} dari ${a.total} data
            `)},error:function(a,s,o){console.error("Gagal ambil data:",o,a.responseText)}})}t("#searchInputsoal").on("input",function(){const e=t(this).val();r=1,p(e,r)});function x(){t("#pilihanForm")[0].reset(),t("#pilihanForm input, #pilihanForm select, #pilihanForm textarea").removeClass("border-red-300 bg-red-50")}function v(e){y(e),S()}function S(){t("body").css({overflow:"hidden","padding-right":""})}function y(e){const n=t("#"+e);n.removeClass("hidden"),setTimeout(()=>{n.find(".modal-content").addClass("show")},10),t("body").addClass("overflow-hidden")}function M(){t("body").css({overflow:"","padding-right":""})}t("#closeModal, #cancelBtn").on("click",function(){c("pilihanModal")});function c(e){I(e),M()}function I(e){const n=t("#"+e);n.find(".modal-content").removeClass("show"),setTimeout(()=>{n.addClass("hidden"),t("body").removeClass("overflow-hidden")},300)}t(".modal-overlay").on("click",function(e){e.target===this&&(t(this).closest("#pilihanModal").length?c("pilihanModal"):t(this).closest("#deleteModal").length&&c("deleteModal"))});t("#cancelDeleteBtn").on("click",function(){c("deleteModal")});let m=null;t("#addSubsoalBtn").on("click",function(){m=null,x(),t("#soalId").val(""),t("#modalTitle").text("Tambah Pilihan Soal Baru"),t("#modalIcon").removeClass("fa-edit").addClass("fa-list-ul"),t("#submitText").text("Simpan Data"),t("#submitIcon").removeClass("fa-edit").addClass("fa-save"),v("pilihanModal")});function j(){let e=!0;return["pilihan"].forEach(function(i){const a=t("#"+i);a.val().trim()?a.removeClass("border-red-300 bg-red-50"):(a.addClass("border-red-300 bg-red-50"),e=!1)}),e}function d(e,n="info"){const s=t(`
            <div class="notification flex items-center space-x-3 ${n==="success"?"bg-green-500":n==="error"?"bg-red-500":"bg-blue-500"} text-white px-6 py-4 rounded-xl shadow-lg transform translate-x-full opacity-0 transition-all duration-300 cursor-pointer">
            <i class="fas ${n==="success"?"fa-check-circle":n==="error"?"fa-exclamation-circle":"fa-info-circle"} text-lg"></i>
            <span class="font-medium">${e}</span>
            </div>
            `);t("#notificationWrapper").append(s),setTimeout(()=>{s.removeClass("translate-x-full opacity-0")},100);const o=setTimeout(()=>{s.addClass("translate-x-full opacity-0"),setTimeout(()=>s.remove(),300)},4e3);s.on("click",function(){clearTimeout(o),t(this).addClass("translate-x-full opacity-0"),setTimeout(()=>t(this).remove(),300)})}t("#pilihanForm").on("submit",function(e){if(e.preventDefault(),!j()){d("Mohon lengkapi semua field yang wajib diisi!","error");return}const n=t("#submitBtn"),i=n.html();n.html('<i class="fas fa-spinner fa-spin mr-2"></i>Menyimpan...').prop("disabled",!0);const a=t("#pilihanId").val(),s=t("#soal_id").val(),o={teks:t("#pilihan").val(),is_true:t("#status").val(),soal_id:s},f=a?`/admin/pertanyaan/pilihan/${a}`:"/admin/pertanyaan/pilihan",w=a?"PUT":"POST";t.ajax({url:f,type:w,data:JSON.stringify(o),contentType:"application/json",success:function(l){d(l.message,l.status),c("pilihanModal"),n.html(i).prop("disabled",!1),p(t("#searchInputsoal").val(),r)},error:function(l){if(n.html(i).prop("disabled",!1),l.status===422&&l.responseJSON.errors){let u=l.responseJSON.errors,g=[];for(let h in u)u.hasOwnProperty(h)&&g.push(u[h].join(", "));d(g.join(" | "),"error")}else{let u=l.responseJSON&&l.responseJSON.message?l.responseJSON.message:"Terjadi kesalahan saat menyimpan data!";d(u,"error")}}})});t(document).on("click",".edit-btn",function(){m=t(this).data("id"),x(),t("#modalTitle").text("Edit Pilihan Soal"),t("#modalIcon").removeClass("fa-list-ul").addClass("fa-edit"),t("#submitText").text("Update Data"),t("#submitIcon").removeClass("fa-save").addClass("fa-edit"),t.ajax({url:"/admin/getpilihan/"+m,type:"GET",success:function(e){t("#pilihanId").val(e.id),t("#pilihan").val(e.teks),t("#status").val(e.is_true?"1":"0"),y("pilihanModal")},error:function(e){console.error("Gagal ambil data:",e.responseText),alert("Gagal ambil data soal")}})});t(document).on("click",".delete-btn",function(){const e=t(this).data("id"),n=t(this).data("name");console.log(n),t("#deletepilihanId").val(e),t("#deleteSoalsoalName").text(n),v("deleteModal")});t(document).on("click","#confirmDeleteBtn",function(){const e=t(this),n=e.html();e.html('<i class="fas fa-spinner fa-spin mr-2"></i>Menghapus...').prop("disabled",!0);const i=t("#deletepilihanId").val();t.ajax({url:`/admin/pertanyaan/pilihan/${i}`,type:"DELETE",success:function(a){d(a.message,a.status),c("deleteModal"),p()},error:function(a){let s=a.responseJSON&&a.responseJSON.message?a.responseJSON.message:"Gagal menghapus data!";d(s,"error")},complete:function(){e.html(n).prop("disabled",!1)}})});t(document).on("click",".goto-soal-btn",function(){const e=t(this).data("id");window.location.href=`/admin/pertanyaan/soal/${e}`});
