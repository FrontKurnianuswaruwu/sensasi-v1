import{$ as t}from"./jquery-BvxTx_lq.js";t.ajaxSetup({headers:{"X-CSRF-TOKEN":t('meta[name="csrf-token"]').attr("content")}});t(function(){u()});let l=1;const h=10;function k(e){const n=t("#tableSoal");if(n.empty(),e.length===0){n.append(`
            <tr>
                <td colspan="5" class="px-6 py-8 text-center text-gray-500">
                    <i class="fas fa-info-circle text-gray-400 mr-2"></i>
                    Tidak ada data ditemukan
                </td>
            </tr>
        `);return}e.forEach((o,a)=>{const s=`
            <tr class="hover:bg-gray-50 transition-colors duration-200">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${a+1}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                        <div class="flex-shrink-0 h-10 w-10">
                            <div class="h-10 w-10 rounded-full bg-gradient-to-r gradient-bg to-blue-light flex items-center justify-center text-white font-semibold">
                                ${o.pertanyaan.charAt(0)}
                            </div>
                        </div>
                        <div class="ml-4">
                            <div class="text-sm font-medium text-gray-900">${o.pertanyaan}</div>
                        </div>
                    </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm">
                    <button class="edit-btn px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all mr-2" data-id="${o.id}">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="delete-btn px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all" data-id="${o.id}" data-name="${o.pertanyaan}">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;n.append(s)})}function T(e){const n=t("#cardContainer");if(n.empty(),e.length===0){n.append(`
            <div class="p-6 text-center text-gray-500">
                <i class="fas fa-info-circle text-gray-400 mr-2"></i>
                Tidak ada data ditemukan
            </div>
        `);return}e.forEach(o=>{const a=`
            <div class="p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200">
                <div class="flex items-center space-x-3">
                    <div class="flex-shrink-0 h-12 w-12 rounded-full bg-gradient-to-r gradient-bg to-blue-light flex items-center justify-center text-white font-semibold text-lg">
                        ${o.pertanyaan.charAt(0)}
                    </div>
                    <div class="flex-1 min-w-0">
                        <h3 class="text-lg font-semibold text-gray-900 truncate mb-2">${o.pertanyaan}</h3>
                        <div class="flex mt-4 space-x-2">
                            <button class="edit-btn flex-1 px-3 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all" data-id="${o.id}">
                                <i class="fas fa-edit"></i> Edit
                            </button>
                            <button class="delete-btn flex-1 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all" data-id="${o.id}" data-name="${o.name}">
                                <i class="fas fa-trash"></i> Hapus
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;n.append(a)})}function C(e,n){const o=t("#pagination");if(o.empty(),!(e<=1))for(let a=1;a<=e;a++){const s=t(`<button class="page-btn mx-1 px-3 py-1 rounded-lg border ${a===l?"bg-orange-primary text-white":"bg-white text-gray-700 hover:bg-gray-100"}">${a}</button>`);s.on("click",function(){l=a,u(n,l)}),o.append(s)}}function $(e,n){const o=t("#paginationMobile");if(o.empty(),!(e<=1))for(let a=1;a<=e;a++){const s=t(`<button class="px-3 py-1 rounded-lg border ${a===l?"bg-orange-primary text-white":"bg-white text-gray-700 hover:bg-gray-100"}">${a}</button>`);s.on("click",function(){l=a,u(n,l)}),o.append(s)}}function u(e="",n=1){let o=t("#kategori_id").val();t.ajax({url:"/admin/getsoal/"+o,type:"GET",data:{search:e,page:n,limit:h},dataType:"json",success:function(a){const s=a.data;if(!Array.isArray(s)){console.error("Response data bukan array:",s);return}k(s),T(s),C(a.last_page,e),$(a.last_page,e);let r=(a.current_page-1)*h+1,m=r+s.length-1;t("#resultCount").html(`
                <i class="fas fa-info-circle mr-1"></i>
                Menampilkan ${r} - ${m} dari ${a.total} data
            `)},error:function(a,s,r){console.error("Gagal ambil data:",r,a.responseText)}})}t("#searchInputsoal").on("input",function(){const e=t(this).val();l=1,u(e,l)});function y(){t("#soalForm")[0].reset(),t("#soalForm input, #soalForm select, #soalForm textarea").removeClass("border-red-300 bg-red-50")}function x(e){v(e),M()}function M(){t("body").css({overflow:"hidden","padding-right":""})}function v(e){const n=t("#"+e);n.removeClass("hidden"),setTimeout(()=>{n.find(".modal-content").addClass("show")},10),t("body").addClass("overflow-hidden")}function S(){t("body").css({overflow:"","padding-right":""})}t("#closeModal, #cancelBtn").on("click",function(){c("soalModal")});function c(e){I(e),S()}function I(e){const n=t("#"+e);n.find(".modal-content").removeClass("show"),setTimeout(()=>{n.addClass("hidden"),t("body").removeClass("overflow-hidden")},300)}t(".modal-overlay").on("click",function(e){e.target===this&&(t(this).closest("#soalModal").length?c("soalModal"):t(this).closest("#deleteModal").length&&c("deleteModal"))});t("#cancelDeleteBtn").on("click",function(){c("deleteModal")});let p=null;t("#addSubsoalBtn").on("click",function(){p=null,y(),t("#soalId").val(""),t("#modalTitle").text("Tambah Soal Baru"),t("#modalIcon").removeClass("fa-edit").addClass("fa-layer-group"),t("#submitText").text("Simpan Data"),t("#submitIcon").removeClass("fa-edit").addClass("fa-save"),x("soalModal")});function j(){let e=!0;return["pertanyaan"].forEach(function(o){const a=t("#"+o);a.val().trim()?a.removeClass("border-red-300 bg-red-50"):(a.addClass("border-red-300 bg-red-50"),e=!1)}),e}function d(e,n="info"){const s=t(`
            <div class="notification flex items-center space-x-3 ${n==="success"?"bg-green-500":n==="error"?"bg-red-500":"bg-blue-500"} text-white px-6 py-4 rounded-xl shadow-lg transform translate-x-full opacity-0 transition-all duration-300 cursor-pointer">
            <i class="fas ${n==="success"?"fa-check-circle":n==="error"?"fa-exclamation-circle":"fa-info-circle"} text-lg"></i>
            <span class="font-medium">${e}</span>
            </div>
            `);t("#notificationWrapper").append(s),setTimeout(()=>{s.removeClass("translate-x-full opacity-0")},100);const r=setTimeout(()=>{s.addClass("translate-x-full opacity-0"),setTimeout(()=>s.remove(),300)},4e3);s.on("click",function(){clearTimeout(r),t(this).addClass("translate-x-full opacity-0"),setTimeout(()=>t(this).remove(),300)})}t("#soalForm").on("submit",function(e){if(e.preventDefault(),!j()){d("Mohon lengkapi semua field yang wajib diisi!","error");return}const n=t("#submitBtn"),o=n.html();n.html('<i class="fas fa-spinner fa-spin mr-2"></i>Menyimpan...').prop("disabled",!0);const a=t("#soalId").val(),s=t("#kategori_id").val(),r={name:t("#pertanyaan").val(),kategori_id:s},m=a?`/admin/pertanyaan/soal/${a}`:"/admin/pertanyaan/soal",w=a?"PUT":"POST";t.ajax({url:m,type:w,data:JSON.stringify(r),contentType:"application/json",success:function(i){d(i.message,i.status),c("soalModal"),n.html(o).prop("disabled",!1),u(t("#searchInputsoal").val(),l)},error:function(i){if(n.html(o).prop("disabled",!1),i.status===422&&i.responseJSON.errors){let f=i.responseJSON.errors,g=[];for(let b in f)f.hasOwnProperty(b)&&g.push(f[b].join(", "));d(g.join(" | "),"error")}else{let f=i.responseJSON&&i.responseJSON.message?i.responseJSON.message:"Terjadi kesalahan saat menyimpan data!";d(f,"error")}}})});t(document).on("click",".edit-btn",function(){p=t(this).data("id"),y(),t("#modalTitle").text("Edit Data Tahun akademik"),t("#modalIcon").removeClass("fa-calendar").addClass("fa-edit"),t("#submitText").text("Update Data"),t("#submitIcon").removeClass("fa-save").addClass("fa-edit"),t.ajax({url:"/admin/getpertanyaan/soal/"+p,type:"GET",success:function(e){t("#soalId").val(e.id),t("#pertanyaan").val(e.pertanyaan),v("soalModal")},error:function(e){console.error("Gagal ambil data:",e.responseText),alert("Gagal ambil data soal")}})});t(document).on("click",".delete-btn",function(){const e=t(this).data("id"),n=t(this).data("name");console.log(n),t("#deletesoalId").val(e),t("#deleteSoalsoalName").text(n),x("deleteModal")});t(document).on("click","#confirmDeleteBtn",function(){const e=t(this),n=e.html();e.html('<i class="fas fa-spinner fa-spin mr-2"></i>Menghapus...').prop("disabled",!0);const o=t("#deletesoalId").val();t.ajax({url:`/admin/pertanyaan/soal/${o}`,type:"DELETE",success:function(a){d(a.message,a.status),c("deleteModal"),u()},error:function(a){let s=a.responseJSON&&a.responseJSON.message?a.responseJSON.message:"Gagal menghapus data!";d(s,"error")},complete:function(){e.html(n).prop("disabled",!1)}})});t(document).on("click",".goto-soal-btn",function(){const e=t(this).data("id");window.location.href=`/admin/pertanyaan/soal/${e}`});
