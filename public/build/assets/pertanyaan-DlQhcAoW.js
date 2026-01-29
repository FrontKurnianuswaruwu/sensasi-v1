import{$ as e}from"./jquery-BvxTx_lq.js";e.ajaxSetup({headers:{"X-CSRF-TOKEN":e('meta[name="csrf-token"]').attr("content")}});e(function(){u()});let r=1;const b=10;function k(t){const o=e("#tableKategorisoal");if(o.empty(),t.length===0){o.append(`
            <tr>
                <td colspan="5" class="px-6 py-8 text-center text-gray-500">
                    <i class="fas fa-info-circle text-gray-400 mr-2"></i>
                    Tidak ada data ditemukan
                </td>
            </tr>
        `);return}t.forEach((n,a)=>{let s=n.is_active?'<span class="px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">Aktif</span>':'<span class="px-2 py-1 bg-red-100 text-red-800 text-xs font-semibold rounded-full">Tidak Aktif</span>';const l=`
            <tr class="hover:bg-gray-50 transition-colors duration-200">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${a+1}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                        <div class="flex-shrink-0 h-10 w-10">
                            <div class="h-10 w-10 rounded-full bg-gradient-to-r gradient-bg to-blue-light flex items-center justify-center text-white font-semibold">
                                ${n.name.charAt(0)}
                            </div>
                        </div>
                        <div class="ml-4">
                            <div class="text-sm font-medium text-gray-900">${n.name}</div>
                        </div>
                    </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${n.waktu_pengerjaan} menit
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${s}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm">
                    <button class="goto-soal-btn px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
                        data-id="${n.id}"
                        data-name="${n.name}">
                        <i class="fas fa-list mr-1"></i>
                    </button>
                </td>
            </tr>
        `;o.append(l)})}function w(t){const o=e("#cardContainer");if(o.empty(),t.length===0){o.append(`
            <div class="p-6 text-center text-gray-500">
                <i class="fas fa-info-circle text-gray-400 mr-2"></i>
                Tidak ada data ditemukan
            </div>
        `);return}t.forEach(n=>{const a=`
            <div class="p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200">
                <div class="flex items-center space-x-3">
                    <div class="flex-shrink-0 h-12 w-12 rounded-full bg-gradient-to-r gradient-bg to-blue-light flex items-center justify-center text-white font-semibold text-lg">
                        ${n.name.charAt(0)}
                    </div>
                    <div class="flex-1 min-w-0">
                        <h3 class="text-lg font-semibold text-gray-900 truncate mb-2">${n.name}</h3>
                        <div class="flex mt-4 space-x-2">
                            <button class="edit-btn flex-1 px-3 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all" data-id="${n.id}">
                                <i class="fas fa-edit"></i> Edit
                            </button>
                            <button class="delete-btn flex-1 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all" data-id="${n.id}" data-name="${n.name}">
                                <i class="fas fa-trash"></i> Hapus
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;o.append(a)})}function T(t,o){const n=e("#pagination");if(n.empty(),!(t<=1))for(let a=1;a<=t;a++){const s=e(`<button class="page-btn mx-1 px-3 py-1 rounded-lg border ${a===r?"bg-orange-primary text-white":"bg-white text-gray-700 hover:bg-gray-100"}">${a}</button>`);s.on("click",function(){r=a,u(o,r)}),n.append(s)}}function C(t,o){const n=e("#paginationMobile");if(n.empty(),!(t<=1))for(let a=1;a<=t;a++){const s=e(`<button class="px-3 py-1 rounded-lg border ${a===r?"bg-orange-primary text-white":"bg-white text-gray-700 hover:bg-gray-100"}">${a}</button>`);s.on("click",function(){r=a,u(o,r)}),n.append(s)}}function u(t="",o=1){e.ajax({url:"/admin/getpertanyaan",type:"GET",data:{search:t,page:o,limit:b},dataType:"json",success:function(n){const a=n.data;if(!Array.isArray(a)){console.error("Response data bukan array:",a);return}k(a),w(a),T(n.last_page,t),C(n.last_page,t);let s=(n.current_page-1)*b+1,l=s+a.length-1;e("#resultCount").html(`
                <i class="fas fa-info-circle mr-1"></i>
                Menampilkan ${s} - ${l} dari ${n.total} data
            `)},error:function(n,a,s){console.error("Gagal ambil data:",s,n.responseText)}})}e("#searchInputkategorisoal").on("input",function(){const t=e(this).val();r=1,u(t,r)});function h(){e("#kategorisoalForm")[0].reset(),e("#kategorisoalForm input, #kategorisoalForm select, #kategorisoalForm textarea").removeClass("border-red-300 bg-red-50")}function x(t){v(t),$()}function $(){e("body").css({overflow:"hidden","padding-right":""})}function v(t){const o=e("#"+t);o.removeClass("hidden"),setTimeout(()=>{o.find(".modal-content").addClass("show")},10),e("body").addClass("overflow-hidden")}function M(){e("body").css({overflow:"","padding-right":""})}e("#closeModal, #cancelBtn").on("click",function(){c("kategorisoalModal")});function c(t){S(t),M()}function S(t){const o=e("#"+t);o.find(".modal-content").removeClass("show"),setTimeout(()=>{o.addClass("hidden"),e("body").removeClass("overflow-hidden")},300)}e(".modal-overlay").on("click",function(t){t.target===this&&(e(this).closest("#kategorisoalModal").length?c("kategorisoalModal"):e(this).closest("#deleteModal").length&&c("deleteModal"))});e("#cancelDeleteBtn").on("click",function(){c("deleteModal")});let f=null;e("#addKategorisoalBtn").on("click",function(){f=null,h(),e("#kategorisoalId").val(""),e("#modalTitle").text("Tambah Kategori Baru"),e("#modalIcon").removeClass("fa-edit").addClass("fa-layer-group"),e("#submitText").text("Simpan Data"),e("#submitIcon").removeClass("fa-edit").addClass("fa-save"),x("kategorisoalModal")});function j(){let t=!0;return["kategorisoalName"].forEach(function(n){const a=e("#"+n);a.val().trim()?a.removeClass("border-red-300 bg-red-50"):(a.addClass("border-red-300 bg-red-50"),t=!1)}),t}function d(t,o="info"){const s=e(`
            <div class="notification flex items-center space-x-3 ${o==="success"?"bg-green-500":o==="error"?"bg-red-500":"bg-blue-500"} text-white px-6 py-4 rounded-xl shadow-lg transform translate-x-full opacity-0 transition-all duration-300 cursor-pointer">
            <i class="fas ${o==="success"?"fa-check-circle":o==="error"?"fa-exclamation-circle":"fa-info-circle"} text-lg"></i>
            <span class="font-medium">${t}</span>
            </div>
            `);e("#notificationWrapper").append(s),setTimeout(()=>{s.removeClass("translate-x-full opacity-0")},100);const l=setTimeout(()=>{s.addClass("translate-x-full opacity-0"),setTimeout(()=>s.remove(),300)},4e3);s.on("click",function(){clearTimeout(l),e(this).addClass("translate-x-full opacity-0"),setTimeout(()=>e(this).remove(),300)})}e("#kategorisoalForm").on("submit",function(t){if(t.preventDefault(),!j()){d("Mohon lengkapi semua field yang wajib diisi!","error");return}const o=e("#submitBtn"),n=o.html();o.html('<i class="fas fa-spinner fa-spin mr-2"></i>Menyimpan...').prop("disabled",!0);const a=e("#kategorisoalId").val(),s={name:e("#kategorisoalName").val(),waktu_pengerjaan:e("#kategorisoalWaktu").val(),is_active:e("#kategorisoalStatus").val()},l=a?`/admin/kategorisoal/${a}`:"/admin/kategorisoal",y=a?"PUT":"POST";e.ajax({url:l,type:y,data:JSON.stringify(s),contentType:"application/json",success:function(i){d(i.message,i.status),c("kategorisoalModal"),o.html(n).prop("disabled",!1),u(e("#searchInputkategorisoal").val(),r)},error:function(i){if(o.html(n).prop("disabled",!1),i.status===422&&i.responseJSON.errors){let m=i.responseJSON.errors,p=[];for(let g in m)m.hasOwnProperty(g)&&p.push(m[g].join(", "));d(p.join(" | "),"error")}else{let m=i.responseJSON&&i.responseJSON.message?i.responseJSON.message:"Terjadi kesalahan saat menyimpan data!";d(m,"error")}}})});e(document).on("click",".edit-btn",function(){f=e(this).data("id"),h(),e("#modalTitle").text("Edit Data Tahun akademik"),e("#modalIcon").removeClass("fa-calendar").addClass("fa-edit"),e("#submitText").text("Update Data"),e("#submitIcon").removeClass("fa-save").addClass("fa-edit"),e.ajax({url:"/admin/kategorisoal/"+f,type:"GET",success:function(t){e("#kategorisoalId").val(t.id),e("#kategorisoalName").val(t.name),e("#kategorisoalWaktu").val(t.waktu_pengerjaan),e("#kategorisoalStatus").val(t.is_active?"1":"0"),v("kategorisoalModal")},error:function(t){console.error("Gagal ambil data:",t.responseText),alert("Gagal ambil data kategorisoal")}})});e(document).on("click",".delete-btn",function(){const t=e(this).data("id"),o=e(this).data("name");e("#deletekategorisoalId").val(t),e("#deleteKategorisoalName").text(o),x("deleteModal")});e(document).on("click","#confirmDeleteBtn",function(){const t=e(this),o=t.html();t.html('<i class="fas fa-spinner fa-spin mr-2"></i>Menghapus...').prop("disabled",!0);const n=e("#deletekategorisoalId").val();e.ajax({url:`/admin/kategorisoal/${n}`,type:"DELETE",success:function(a){d(a.message,a.status),c("deleteModal"),u()},error:function(a){let s=a.responseJSON&&a.responseJSON.message?a.responseJSON.message:"Gagal menghapus data!";d(s,"error")},complete:function(){t.html(o).prop("disabled",!1)}})});e(document).on("click",".goto-soal-btn",function(){const t=e(this).data("id");window.location.href=`/admin/pertanyaan/soal/${t}`});
