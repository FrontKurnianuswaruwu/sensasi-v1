import{$ as a}from"./jquery-BvxTx_lq.js";a.ajaxSetup({headers:{"X-CSRF-TOKEN":a('meta[name="csrf-token"]').attr("content")}});a(function(){c()});let d=1;const g=10;function y(e){const n=a("#tableTahunakademik");if(n.empty(),e.length===0){n.append(`
            <tr>
                <td colspan="5" class="px-6 py-8 text-center text-gray-500">
                    <i class="fas fa-info-circle text-gray-400 mr-2"></i>
                    Tidak ada data ditemukan
                </td>
            </tr>
        `);return}e.forEach((i,t)=>{const o=`
            <tr class="hover:bg-gray-50 transition-colors duration-200">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${t+1}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                        <div class="flex-shrink-0 h-10 w-10">
                            <div class="h-10 w-10 rounded-full bg-gradient-to-r gradient-bg to-blue-light flex items-center justify-center text-white font-semibold">
                                ${i.tahun_akademik.charAt(0)}
                            </div>
                        </div>
                        <div class="ml-4">
                            <div class="text-sm font-medium text-gray-900">${i.tahun_akademik}</div>
                        </div>
                    </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm">
                    <button class="edit-btn px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all mr-2" data-id="${i.id}">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="delete-btn px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all" data-id="${i.id}" data-name="${i.tahun_akademik}">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;n.append(o)})}function w(e){const n=a("#cardContainer");if(n.empty(),e.length===0){n.append(`
            <div class="p-6 text-center text-gray-500">
                <i class="fas fa-info-circle text-gray-400 mr-2"></i>
                Tidak ada data ditemukan
            </div>
        `);return}e.forEach(i=>{const t=`
            <div class="p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200">
                <div class="flex items-center space-x-3">
                    <div class="flex-shrink-0 h-12 w-12 rounded-full bg-gradient-to-r gradient-bg to-blue-light flex items-center justify-center text-white font-semibold text-lg">
                        ${i.tahun_akademik.charAt(0)}
                    </div>
                    <div class="flex-1 min-w-0">
                        <h3 class="text-lg font-semibold text-gray-900 truncate mb-2">${i.tahun_akademik}</h3>
                        <div class="flex mt-4 space-x-2">
                            <button class="edit-btn flex-1 px-3 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all" data-id="${i.id}">
                                <i class="fas fa-edit"></i> Edit
                            </button>
                            <button class="delete-btn flex-1 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all" data-id="${i.id}" data-name="${i.tahun_akademik}">
                                <i class="fas fa-trash"></i> Hapus
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;n.append(t)})}function T(e,n){const i=a("#pagination");if(i.empty(),!(e<=1))for(let t=1;t<=e;t++){const o=a(`<button class="page-btn mx-1 px-3 py-1 rounded-lg border ${t===d?"bg-orange-primary text-white":"bg-white text-gray-700 hover:bg-gray-100"}">${t}</button>`);o.on("click",function(){d=t,c(n,d)}),i.append(o)}}function C(e,n){const i=a("#paginationMobile");if(i.empty(),!(e<=1))for(let t=1;t<=e;t++){const o=a(`<button class="px-3 py-1 rounded-lg border ${t===d?"bg-orange-primary text-white":"bg-white text-gray-700 hover:bg-gray-100"}">${t}</button>`);o.on("click",function(){d=t,c(n,d)}),i.append(o)}}function c(e="",n=1){a.ajax({url:"/admin/gettahunakademik",type:"GET",data:{search:e,page:n,limit:g},dataType:"json",success:function(i){const t=i.data;if(!Array.isArray(t)){console.error("Response data bukan array:",t);return}y(t),w(t),T(i.last_page,e),C(i.last_page,e);let o=(i.current_page-1)*g+1,u=o+t.length-1;a("#resultCount").html(`
                <i class="fas fa-info-circle mr-1"></i>
                Menampilkan ${o} - ${u} dari ${i.total} data
            `)},error:function(i,t,o){console.error("Gagal ambil data:",o,i.responseText)}})}a("#searchInputtahunakademik").on("input",function(){const e=a(this).val();d=1,c(e,d)});function k(){a("#tahunakademikForm")[0].reset(),a("#tahunakademikForm input, #tahunakademikForm select, #tahunakademikForm textarea").removeClass("border-red-300 bg-red-50")}function b(e){x(e),$()}function $(){a("body").css({overflow:"hidden","padding-right":""})}function x(e){const n=a("#"+e);n.removeClass("hidden"),setTimeout(()=>{n.find(".modal-content").addClass("show")},10),a("body").addClass("overflow-hidden")}function M(){a("body").css({overflow:"","padding-right":""})}a("#closeModal, #cancelBtn").on("click",function(){l("tahunakademikModal")});function l(e){N(e),M()}function N(e){const n=a("#"+e);n.find(".modal-content").removeClass("show"),setTimeout(()=>{n.addClass("hidden"),a("body").removeClass("overflow-hidden")},300)}a(".modal-overlay").on("click",function(e){e.target===this&&(a(this).closest("#tahunakademikModal").length?l("tahunakademikModal"):a(this).closest("#deleteModal").length&&l("deleteModal"))});a("#cancelDeleteBtn").on("click",function(){l("deleteModal")});let f=null;a("#addTahunakademikBtn").on("click",function(){f=null,k(),a("#tahunakademikId").val(""),a("#modalTitle").text("Tambah Tahun Akademik Baru"),a("#modalIcon").removeClass("fa-edit").addClass("fa-calendar"),a("#submitText").text("Simpan Data"),a("#submitIcon").removeClass("fa-edit").addClass("fa-save"),b("tahunakademikModal")});function S(){let e=!0;return["tahunakademikName"].forEach(function(i){const t=a("#"+i);t.val().trim()?t.removeClass("border-red-300 bg-red-50"):(t.addClass("border-red-300 bg-red-50"),e=!1)}),e}function r(e,n="info"){const o=a(`
            <div class="notification flex items-center space-x-3 ${n==="success"?"bg-green-500":n==="error"?"bg-red-500":"bg-blue-500"} text-white px-6 py-4 rounded-xl shadow-lg transform translate-x-full opacity-0 transition-all duration-300 cursor-pointer">
            <i class="fas ${n==="success"?"fa-check-circle":n==="error"?"fa-exclamation-circle":"fa-info-circle"} text-lg"></i>
            <span class="font-medium">${e}</span>
            </div>
            `);a("#notificationWrapper").append(o),setTimeout(()=>{o.removeClass("translate-x-full opacity-0")},100);const u=setTimeout(()=>{o.addClass("translate-x-full opacity-0"),setTimeout(()=>o.remove(),300)},4e3);o.on("click",function(){clearTimeout(u),a(this).addClass("translate-x-full opacity-0"),setTimeout(()=>a(this).remove(),300)})}a("#tahunakademikForm").on("submit",function(e){if(e.preventDefault(),!S()){r("Mohon lengkapi semua field yang wajib diisi!","error");return}const n=a("#submitBtn"),i=n.html();n.html('<i class="fas fa-spinner fa-spin mr-2"></i>Menyimpan...').prop("disabled",!0);const t=a("#tahunakademikId").val(),o={tahun_akademik:a("#tahunakademikName").val()},u=t?`/admin/tahunakademik/${t}`:"/admin/tahunakademik",v=t?"PUT":"POST";a.ajax({url:u,type:v,data:JSON.stringify(o),contentType:"application/json",success:function(s){r(s.message,s.status),l("tahunakademikModal"),n.html(i).prop("disabled",!1),c(a("#searchInputtahunakademik").val(),d)},error:function(s){if(n.html(i).prop("disabled",!1),s.status===422&&s.responseJSON.errors){let m=s.responseJSON.errors,p=[];for(let h in m)m.hasOwnProperty(h)&&p.push(m[h].join(", "));r(p.join(" | "),"error")}else{let m=s.responseJSON&&s.responseJSON.message?s.responseJSON.message:"Terjadi kesalahan saat menyimpan data!";r(m,"error")}}})});a(document).on("click",".edit-btn",function(){f=a(this).data("id"),k(),a("#modalTitle").text("Edit Data Tahun akademik"),a("#modalIcon").removeClass("fa-calendar").addClass("fa-edit"),a("#submitText").text("Update Data"),a("#submitIcon").removeClass("fa-save").addClass("fa-edit"),a.ajax({url:"/admin/tahunakademik/"+f,type:"GET",success:function(e){a("#tahunakademikId").val(e.id),a("#tahunakademikName").val(e.tahun_akademik),x("tahunakademikModal")},error:function(e){console.error("Gagal ambil data:",e.responseText),alert("Gagal ambil data tahunakademik")}})});a(document).on("click",".delete-btn",function(){const e=a(this).data("id"),n=a(this).data("name");a("#deletetahunakademikId").val(e),a("#deleteTahunakademikName").text(n),b("deleteModal")});a(document).on("click","#confirmDeleteBtn",function(){const e=a(this),n=e.html();e.html('<i class="fas fa-spinner fa-spin mr-2"></i>Menghapus...').prop("disabled",!0);const i=a("#deletetahunakademikId").val();a.ajax({url:`/admin/tahunakademik/${i}`,type:"DELETE",success:function(t){r(t.message,t.status),l("deleteModal"),c()},error:function(t){let o=t.responseJSON&&t.responseJSON.message?t.responseJSON.message:"Gagal menghapus data!";r(o,"error")},complete:function(){e.html(n).prop("disabled",!1)}})});
