import{$ as e}from"./jquery-BvxTx_lq.js";e.ajaxSetup({headers:{"X-CSRF-TOKEN":e('meta[name="csrf-token"]').attr("content")}});e(function(){c()});let r=1;const b=10;function w(t){const n=e("#tableRole");if(n.empty(),t.length===0){n.append(`
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
                                ${o.name.charAt(0)}
                            </div>
                        </div>
                        <div class="ml-4">
                            <div class="text-sm font-medium text-gray-900">${o.name}</div>
                        </div>
                    </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm">
                    <button class="edit-btn px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all mr-2" data-id="${o.id}">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="delete-btn px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all" data-id="${o.id}" data-name="${o.name}">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;n.append(s)})}function T(t){const n=e("#cardContainer");if(n.empty(),t.length===0){n.append(`
            <div class="p-6 text-center text-gray-500">
                <i class="fas fa-info-circle text-gray-400 mr-2"></i>
                Tidak ada data ditemukan
            </div>
        `);return}t.forEach(o=>{const a=`
            <div class="p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200">
                <div class="flex items-center space-x-3">
                    <div class="flex-shrink-0 h-12 w-12 rounded-full bg-gradient-to-r gradient-bg to-blue-light flex items-center justify-center text-white font-semibold text-lg">
                        ${o.name.charAt(0)}
                    </div>
                    <div class="flex-1 min-w-0">
                        <h3 class="text-lg font-semibold text-gray-900 truncate mb-2">${o.name}</h3>
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
        `;n.append(a)})}function C(t,n){const o=e("#pagination");if(o.empty(),!(t<=1))for(let a=1;a<=t;a++){const s=e(`<button class="page-btn mx-1 px-3 py-1 rounded-lg border ${a===r?"bg-orange-primary text-white":"bg-white text-gray-700 hover:bg-gray-100"}">${a}</button>`);s.on("click",function(){r=a,c(n,r)}),o.append(s)}}function $(t,n){const o=e("#paginationMobile");if(o.empty(),!(t<=1))for(let a=1;a<=t;a++){const s=e(`<button class="px-3 py-1 rounded-lg border ${a===r?"bg-orange-primary text-white":"bg-white text-gray-700 hover:bg-gray-100"}">${a}</button>`);s.on("click",function(){r=a,c(n,r)}),o.append(s)}}function c(t="",n=1){e.ajax({url:"/admin/getroles",type:"GET",data:{search:t,page:n,limit:b},dataType:"json",success:function(o){const a=o.data;if(!Array.isArray(a)){console.error("Response data bukan array:",a);return}w(a),T(a),C(o.last_page,t),$(o.last_page,t);let s=(o.current_page-1)*b+1,u=s+a.length-1;e("#resultCount").html(`
                <i class="fas fa-info-circle mr-1"></i>
                Menampilkan ${s} - ${u} dari ${o.total} data
            `)},error:function(o,a,s){console.error("Gagal ambil data:",s,o.responseText)}})}e("#searchInputrole").on("input",function(){const t=e(this).val();r=1,c(t,r)});function h(){e("#roleForm")[0].reset(),e("#roleForm input, #roleForm select, #roleForm textarea").removeClass("border-red-300 bg-red-50")}function x(t){v(t),k()}function k(){e("body").css({overflow:"hidden","padding-right":""})}function v(t){const n=e("#"+t);n.removeClass("hidden"),setTimeout(()=>{n.find(".modal-content").addClass("show")},10),e("body").addClass("overflow-hidden")}function M(){e("body").css({overflow:"","padding-right":""})}e("#closeModal, #cancelBtn").on("click",function(){d("roleModal")});function d(t){N(t),M()}function N(t){const n=e("#"+t);n.find(".modal-content").removeClass("show"),setTimeout(()=>{n.addClass("hidden"),e("body").removeClass("overflow-hidden")},300)}e(".modal-overlay").on("click",function(t){t.target===this&&(e(this).closest("#roleModal").length?d("roleModal"):e(this).closest("#deleteModal").length&&d("deleteModal"))});e("#cancelDeleteBtn").on("click",function(){d("deleteModal")});let f=null;e("#addRoleBtn").on("click",function(){f=null,h(),e("#roleId").val(""),e("#modalTitle").text("Tambah Role Baru"),e("#modalIcon").removeClass("fa-edit").addClass("fa-user-plus"),e("#submitText").text("Simpan Data"),e("#submitIcon").removeClass("fa-edit").addClass("fa-save"),x("roleModal")});function S(){let t=!0;return["roleName"].forEach(function(o){const a=e("#"+o);a.val().trim()?a.removeClass("border-red-300 bg-red-50"):(a.addClass("border-red-300 bg-red-50"),t=!1)}),t}function l(t,n="info"){const s=e(`
            <div class="notification flex items-center space-x-3 ${n==="success"?"bg-green-500":n==="error"?"bg-red-500":"bg-blue-500"} text-white px-6 py-4 rounded-xl shadow-lg transform translate-x-full opacity-0 transition-all duration-300 cursor-pointer">
            <i class="fas ${n==="success"?"fa-check-circle":n==="error"?"fa-exclamation-circle":"fa-info-circle"} text-lg"></i>
            <span class="font-medium">${t}</span>
            </div>
            `);e("#notificationWrapper").append(s),setTimeout(()=>{s.removeClass("translate-x-full opacity-0")},100);const u=setTimeout(()=>{s.addClass("translate-x-full opacity-0"),setTimeout(()=>s.remove(),300)},4e3);s.on("click",function(){clearTimeout(u),e(this).addClass("translate-x-full opacity-0"),setTimeout(()=>e(this).remove(),300)})}e("#roleForm").on("submit",function(t){if(t.preventDefault(),!S()){l("Mohon lengkapi semua field yang wajib diisi!","error");return}const n=e("#submitBtn"),o=n.html();n.html('<i class="fas fa-spinner fa-spin mr-2"></i>Menyimpan...').prop("disabled",!0);const a=e("#roleId").val(),s={name:e("#roleName").val()},u=a?`/admin/user/${a}`:"/admin/role",y=a?"PUT":"POST";e.ajax({url:u,type:y,data:JSON.stringify(s),contentType:"application/json",success:function(i){l(i.message,i.status),d("roleModal"),n.html(o).prop("disabled",!1),c(e("#searchInputrole").val(),r)},error:function(i){if(n.html(o).prop("disabled",!1),i.status===422&&i.responseJSON.errors){let m=i.responseJSON.errors,p=[];for(let g in m)m.hasOwnProperty(g)&&p.push(m[g].join(", "));l(p.join(" | "),"error")}else{let m=i.responseJSON&&i.responseJSON.message?i.responseJSON.message:"Terjadi kesalahan saat menyimpan data!";l(m,"error")}}})});e(document).on("click",".edit-btn",function(){f=e(this).data("id"),h(),e("#modalTitle").text("Edit Data Role"),e("#modalIcon").removeClass("fa-user-plus").addClass("fa-edit"),e("#submitText").text("Update Data"),e("#submitIcon").removeClass("fa-save").addClass("fa-edit"),e.ajax({url:"/admin/role/"+f,type:"GET",success:function(t){e("#roleId").val(t.id),e("#roleName").val(t.name),v("roleModal")},error:function(t){console.error("Gagal ambil data:",t.responseText),alert("Gagal ambil data role")}})});e(document).on("click",".delete-btn",function(){const t=e(this).data("id"),n=e(this).data("name");e("#deleteroleId").val(t),e("#deleteRoleName").text(n),x("deleteModal")});e(document).on("click","#confirmDeleteBtn",function(){const t=e(this),n=t.html();t.html('<i class="fas fa-spinner fa-spin mr-2"></i>Menghapus...').prop("disabled",!0);const o=e("#deleteroleId").val();e.ajax({url:`/admin/role/${o}`,type:"DELETE",success:function(a){l(a.message,a.status),d("deleteModal"),c()},error:function(a){let s=a.responseJSON&&a.responseJSON.message?a.responseJSON.message:"Gagal menghapus data!";l(s,"error")},complete:function(){t.html(n).prop("disabled",!1)}})});
