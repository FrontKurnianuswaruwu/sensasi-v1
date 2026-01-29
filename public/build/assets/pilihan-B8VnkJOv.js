import{$ as e}from"./jquery-BvxTx_lq.js";e.ajaxSetup({headers:{"X-CSRF-TOKEN":e('meta[name="csrf-token"]').attr("content")}});e(function(){c()});let l=1;const b=10;function T(t){const n=e("#tableSoal");if(n.empty(),t.length===0){n.append(`
            <tr>
                <td colspan="5" class="px-6 py-8 text-center text-gray-500">
                    <i class="fas fa-info-circle text-gray-400 mr-2"></i>
                    Tidak ada data ditemukan
                </td>
            </tr>
        `);return}t.forEach((o,a)=>{const s=`
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
                    <button class="goto-soal-btn px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
                        data-id="${o.id}"
                        data-name="${o.name}">
                        <i class="fas fa-list mr-1"></i>
                    </button>
                </td>
            </tr>
        `;n.append(s)})}function k(t){const n=e("#cardContainer");if(n.empty(),t.length===0){n.append(`
            <div class="p-6 text-center text-gray-500">
                <i class="fas fa-info-circle text-gray-400 mr-2"></i>
                Tidak ada data ditemukan
            </div>
        `);return}t.forEach(o=>{const a=`
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
        `;n.append(a)})}function C(t,n){const o=e("#pagination");if(o.empty(),!(t<=1))for(let a=1;a<=t;a++){const s=e(`<button class="page-btn mx-1 px-3 py-1 rounded-lg border ${a===l?"bg-orange-primary text-white":"bg-white text-gray-700 hover:bg-gray-100"}">${a}</button>`);s.on("click",function(){l=a,c(n,l)}),o.append(s)}}function $(t,n){const o=e("#paginationMobile");if(o.empty(),!(t<=1))for(let a=1;a<=t;a++){const s=e(`<button class="px-3 py-1 rounded-lg border ${a===l?"bg-orange-primary text-white":"bg-white text-gray-700 hover:bg-gray-100"}">${a}</button>`);s.on("click",function(){l=a,c(n,l)}),o.append(s)}}function c(t="",n=1){e.ajax({url:"/admin/getsoal",type:"GET",data:{search:t,page:n,limit:b},dataType:"json",success:function(o){const a=o.data;if(!Array.isArray(a)){console.error("Response data bukan array:",a);return}T(a),k(a),C(o.last_page,t),$(o.last_page,t);let s=(o.current_page-1)*b+1,u=s+a.length-1;e("#resultCount").html(`
                <i class="fas fa-info-circle mr-1"></i>
                Menampilkan ${s} - ${u} dari ${o.total} data
            `)},error:function(o,a,s){console.error("Gagal ambil data:",s,o.responseText)}})}e("#searchInputsoal").on("input",function(){const t=e(this).val();l=1,c(t,l)});function h(){e("#soalForm")[0].reset(),e("#soalForm input, #soalForm select, #soalForm textarea").removeClass("border-red-300 bg-red-50")}function x(t){y(t),M()}function M(){e("body").css({overflow:"hidden","padding-right":""})}function y(t){const n=e("#"+t);n.removeClass("hidden"),setTimeout(()=>{n.find(".modal-content").addClass("show")},10),e("body").addClass("overflow-hidden")}function S(){e("body").css({overflow:"","padding-right":""})}e("#closeModal, #cancelBtn").on("click",function(){d("soalModal")});function d(t){I(t),S()}function I(t){const n=e("#"+t);n.find(".modal-content").removeClass("show"),setTimeout(()=>{n.addClass("hidden"),e("body").removeClass("overflow-hidden")},300)}e(".modal-overlay").on("click",function(t){t.target===this&&(e(this).closest("#soalModal").length?d("soalModal"):e(this).closest("#deleteModal").length&&d("deleteModal"))});e("#cancelDeleteBtn").on("click",function(){d("deleteModal")});let m=null;e("#addSubsoalBtn").on("click",function(){m=null,h(),e("#soalId").val(""),e("#modalTitle").text("Tambah Soal Baru"),e("#modalIcon").removeClass("fa-edit").addClass("fa-layer-group"),e("#submitText").text("Simpan Data"),e("#submitIcon").removeClass("fa-edit").addClass("fa-save"),x("soalModal")});function j(){let t=!0;return["pertanyaan"].forEach(function(o){const a=e("#"+o);a.val().trim()?a.removeClass("border-red-300 bg-red-50"):(a.addClass("border-red-300 bg-red-50"),t=!1)}),t}function r(t,n="info"){const s=e(`
            <div class="notification flex items-center space-x-3 ${n==="success"?"bg-green-500":n==="error"?"bg-red-500":"bg-blue-500"} text-white px-6 py-4 rounded-xl shadow-lg transform translate-x-full opacity-0 transition-all duration-300 cursor-pointer">
            <i class="fas ${n==="success"?"fa-check-circle":n==="error"?"fa-exclamation-circle":"fa-info-circle"} text-lg"></i>
            <span class="font-medium">${t}</span>
            </div>
            `);e("#notificationWrapper").append(s),setTimeout(()=>{s.removeClass("translate-x-full opacity-0")},100);const u=setTimeout(()=>{s.addClass("translate-x-full opacity-0"),setTimeout(()=>s.remove(),300)},4e3);s.on("click",function(){clearTimeout(u),e(this).addClass("translate-x-full opacity-0"),setTimeout(()=>e(this).remove(),300)})}e("#soalForm").on("submit",function(t){if(t.preventDefault(),!j()){r("Mohon lengkapi semua field yang wajib diisi!","error");return}const n=e("#submitBtn"),o=n.html();n.html('<i class="fas fa-spinner fa-spin mr-2"></i>Menyimpan...').prop("disabled",!0);const a=e("#soalId").val(),s=e("#kategori_id").val(),u={name:e("#pertanyaan").val(),kategori_id:s},v=a?`/admin/pertanyaan/soal/${a}`:"/admin/pertanyaan/soal",w=a?"PUT":"POST";e.ajax({url:v,type:w,data:JSON.stringify(u),contentType:"application/json",success:function(i){r(i.message,i.status),d("soalModal"),n.html(o).prop("disabled",!1),c(e("#searchInputsoal").val(),l)},error:function(i){if(n.html(o).prop("disabled",!1),i.status===422&&i.responseJSON.errors){let f=i.responseJSON.errors,p=[];for(let g in f)f.hasOwnProperty(g)&&p.push(f[g].join(", "));r(p.join(" | "),"error")}else{let f=i.responseJSON&&i.responseJSON.message?i.responseJSON.message:"Terjadi kesalahan saat menyimpan data!";r(f,"error")}}})});e(document).on("click",".edit-btn",function(){m=e(this).data("id"),h(),e("#modalTitle").text("Edit Data Tahun akademik"),e("#modalIcon").removeClass("fa-calendar").addClass("fa-edit"),e("#submitText").text("Update Data"),e("#submitIcon").removeClass("fa-save").addClass("fa-edit"),e.ajax({url:"/admin/getpertanyaan/soal/"+m,type:"GET",success:function(t){e("#soalId").val(t.id),e("#pertanyaan").val(t.pertanyaan),y("soalModal")},error:function(t){console.error("Gagal ambil data:",t.responseText),alert("Gagal ambil data soal")}})});e(document).on("click",".delete-btn",function(){const t=e(this).data("id"),n=e(this).data("name");console.log(n),e("#deletesoalId").val(t),e("#deleteSoalsoalName").text(n),x("deleteModal")});e(document).on("click","#confirmDeleteBtn",function(){const t=e(this),n=t.html();t.html('<i class="fas fa-spinner fa-spin mr-2"></i>Menghapus...').prop("disabled",!0);const o=e("#deletesoalId").val();e.ajax({url:`/admin/pertanyaan/soal/${o}`,type:"DELETE",success:function(a){r(a.message,a.status),d("deleteModal"),c()},error:function(a){let s=a.responseJSON&&a.responseJSON.message?a.responseJSON.message:"Gagal menghapus data!";r(s,"error")},complete:function(){t.html(n).prop("disabled",!1)}})});e(document).on("click",".goto-soal-btn",function(){const t=e(this).data("id");window.location.href=`/admin/pilihan/soal/${t}`});
