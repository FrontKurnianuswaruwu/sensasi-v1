import{$ as e}from"./jquery-BvxTx_lq.js";e.ajaxSetup({headers:{"X-CSRF-TOKEN":e('meta[name="csrf-token"]').attr("content")}});e(function(){c()});let r=1;const h=10;function T(t){const s=e("#tableSubmenu");if(s.empty(),t.length===0){s.append(`
            <tr>
                <td colspan="5" class="px-6 py-8 text-center text-gray-500">
                    <i class="fas fa-info-circle text-gray-400 mr-2"></i>
                    Tidak ada data ditemukan
                </td>
            </tr>
        `);return}t.forEach((n,a)=>{const o=`
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
                ${n.route||"-"}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                ${n.icon?`<i class="${n.icon}"></i>`:"-"}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm">
                <button class="edit-btn px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all mr-2" data-id="${n.id}">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="delete-btn px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all" data-id="${n.id}" data-name="${n.name}">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
            </tr>
        `;s.append(o)})}function I(t){const s=e("#cardContainer");if(s.empty(),t.length===0){s.append(`
            <div class="p-6 text-center text-gray-500">
                <i class="fas fa-info-circle text-gray-400 mr-2"></i>
                Tidak ada data ditemukan
            </div>
        `);return}t.forEach(n=>{const a=`
            <div class="p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200">
                <div class="flex items-start space-x-3">
                    <div class="flex-shrink-0 h-12 w-12 rounded-full bg-gradient-to-r gradient-bg to-blue-light flex items-center justify-center text-white font-semibold text-lg">
                        ${n.name.charAt(0)}
                    </div>
                    <div class="flex-1 min-w-0">
                        <div class="flex items-center justify-between mb-2">
                            <h3 class="text-lg font-semibold text-gray-900 truncate">${n.name}</h3>
                            <span class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full">
                                ${n.icon?`<i class="${n.icon}"></i>`:"-"}
                            </span>
                        </div>
                        <div class="space-y-1 text-sm text-gray-600">
                            <div class="flex items-center">
                                <i class="fas fa-link w-4 mr-2 text-orange-primary"></i>
                                <span class="truncate">${n.route||"-"}</span>
                            </div>
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
            </div>
        `;s.append(a)})}function k(t,s){const n=e("#pagination");if(n.empty(),!(t<=1))for(let a=1;a<=t;a++){const o=e(`<button class="page-btn mx-1 px-3 py-1 rounded-lg border ${a===r?"bg-orange-primary text-white":"bg-white text-gray-700 hover:bg-gray-100"}">${a}</button>`);o.on("click",function(){r=a,c(s,r)}),n.append(o)}}function S(t,s){const n=e("#paginationMobile");if(n.empty(),!(t<=1))for(let a=1;a<=t;a++){const o=e(`<button class="px-3 py-1 rounded-lg border ${a===r?"bg-orange-primary text-white":"bg-white text-gray-700 hover:bg-gray-100"}">${a}</button>`);o.on("click",function(){r=a,c(s,r)}),n.append(o)}}function c(t="",s=1){e.ajax({url:"/admin/getsubmenu",type:"GET",data:{search:t,page:s,limit:h},dataType:"json",success:function(n){const a=n.data;if(!Array.isArray(a)){console.error("Response data bukan array:",a);return}T(a),I(a),k(n.last_page,t),S(n.last_page,t);let o=(n.current_page-1)*h+1,u=o+a.length-1;e("#resultCount").html(`
                <i class="fas fa-info-circle mr-1"></i>
                Menampilkan ${o} - ${u} dari ${n.total} data
            `)},error:function(n,a,o){console.error("Gagal ambil data:",o,n.responseText)}})}e("#searchInputsubmenu").on("input",function(){const t=e(this).val();r=1,c(t,r)});function v(){e("#submenuForm")[0].reset(),e("#submenuForm input, #submenuForm select, #submenuForm textarea").removeClass("border-red-300 bg-red-50"),e("#submenuForm input, #submenuForm select").each(function(){e(this).removeClass("border-red-300 bg-red-50"),E(this)})}function y(t){x(t),j()}function x(t){const s=e("#"+t);s.removeClass("hidden"),setTimeout(()=>{s.find(".modal-content").addClass("show")},10),e("body").addClass("overflow-hidden")}function j(){e("body").css({overflow:"hidden","padding-right":""})}function E(t){const n=e(t).attr("id")+"-error";e("#"+n).remove()}e("#cancelDeleteBtn").on("click",function(){d("deleteModal")});function p(){e("#submenuMenuid").closest(".space-y-2, .form-group, .form-row, .mb-4, .mb-3").hide(),e("#submenuIcon").closest(".space-y-2, .form-group, .form-row, .mb-4, .mb-3").hide()}function w(){const t=e("#submenuIsparent").val();p(),t==="1"?e("#submenuMenuid").closest(".space-y-2, .form-group, .form-row, .mb-4, .mb-3").show():t==="0"&&e("#submenuIcon").closest(".space-y-2, .form-group, .form-row, .mb-4, .mb-3").show()}e(function(){p(),e("#submenuIsparent").on("change",w)});e("#closeModal, #cancelBtn").on("click",function(){d("submenuModal")});function d(t){N(t),F()}function N(t){const s=e("#"+t);s.find(".modal-content").removeClass("show"),setTimeout(()=>{s.addClass("hidden"),e("body").removeClass("overflow-hidden")},300)}function F(){e("body").css({overflow:"","padding-right":""})}e(".modal-overlay").on("click",function(t){t.target===this&&(e(this).closest("#submenuModal").length?d("submenuModal"):e(this).closest("#deleteModal").length&&d("deleteModal"))});function l(t,s="info"){const o=e(`
            <div class="notification flex items-center space-x-3 ${s==="success"?"bg-green-500":s==="error"?"bg-red-500":"bg-blue-500"} text-white px-6 py-4 rounded-xl shadow-lg transform translate-x-full opacity-0 transition-all duration-300 cursor-pointer">
            <i class="fas ${s==="success"?"fa-check-circle":s==="error"?"fa-exclamation-circle":"fa-info-circle"} text-lg"></i>
            <span class="font-medium">${t}</span>
            </div>
            `);e("#notificationWrapper").append(o),setTimeout(()=>{o.removeClass("translate-x-full opacity-0")},100);const u=setTimeout(()=>{o.addClass("translate-x-full opacity-0"),setTimeout(()=>o.remove(),300)},4e3);o.on("click",function(){clearTimeout(u),e(this).addClass("translate-x-full opacity-0"),setTimeout(()=>e(this).remove(),300)})}function A(){let t=!0;return["submenuName","submenuRoute","submenuIsparent","submenuRole"].forEach(function(n){const a=e("#"+n);!a.val()||!a.val().toString().trim()?(a.addClass("border-red-300 bg-red-50"),t=!1):a.removeClass("border-red-300 bg-red-50")}),t}let f=null;e("#addSubsubmenuBtn").on("click",function(){f=null,v(),e("#submenuId").val(""),e("#modalTitle").text("Tambah Submenu Baru"),e("#modalIcon").removeClass("fa-edit").addClass("fa-bars"),e("#submitText").text("Simpan Data"),e("#submitIcon").removeClass("fa-edit").addClass("fa-save"),$(),M(),y("submenuModal"),p(),e("#submenuIsparent").val("")});function $(t=""){e.get("/admin/submenu/getmenus",function(s){const n=Array.isArray(s)?s:Array.isArray(s.data)?s.data:[];e("#submenuMenuid").empty(),e("#submenuMenuid").append('<option value="">Pilih Menu</option>'),n.forEach(function(a){var o=a.id==t?"selected":"";e("#submenuMenuid").append(`<option value="${a.id}" ${o}>${a.name}</option>`)})}).fail(function(){alert("Gagal mengambil data menu. Pastikan API berjalan dengan benar.")})}function M(t=""){e.get("/admin/menu/getroles",function(s){const n=Array.isArray(s.data)?s.data:[];e("#submenuRole").empty(),e("#submenuRole").append('<option value="">Pilih Role</option>'),n.forEach(function(a){var o=a.id==t?"selected":"";e("#submenuRole").append(`<option value="${a.id}" ${o}>${a.name}</option>`)})}).fail(function(){alert("Gagal mengambil data role. Pastikan API berjalan dengan benar.")})}e("#submenuForm").on("submit",function(t){if(t.preventDefault(),!A()){l("Mohon lengkapi semua field yang wajib diisi!","error");return}const s=e("#submitBtn"),n=s.html();s.html('<i class="fas fa-spinner fa-spin mr-2"></i>Menyimpan...').prop("disabled",!0);const a=e("#submenuId").val(),o={name:e("#submenuName").val(),route:e("#submenuRoute").val(),icon:e("#submenuIcon").val(),type:e("#submenuRole").val(),type_menu:e("#submenuIsparent").val(),menu_id:e("#submenuMenuid").val()},u=a?`/admin/submenu/${a}`:"/admin/submenu",C=a?"PUT":"POST";e.ajax({url:u,type:C,data:JSON.stringify(o),contentType:"application/json",success:function(i){l(i.message,i.status),d("submenuModal"),s.html(n).prop("disabled",!1),c(e("#searchInputmenu").val(),r)},error:function(i){if(s.html(n).prop("disabled",!1),i.status===422&&i.responseJSON.errors){let m=i.responseJSON.errors,b=[];for(let g in m)m.hasOwnProperty(g)&&b.push(m[g].join(", "));l(b.join(" | "),"error")}else{let m=i.responseJSON&&i.responseJSON.message?i.responseJSON.message:"Terjadi kesalahan saat menyimpan data!";l(m,"error")}}})});e(document).on("click",".edit-btn",function(){f=e(this).data("id"),v(),e("#modalTitle").text("Edit Data Submenu"),e("#modalIcon").removeClass("fa-bars").addClass("fa-edit"),e("#submitText").text("Update Data"),e("#submitIcon").removeClass("fa-save").addClass("fa-edit"),e.ajax({url:"/admin/submenu/"+f,type:"GET",success:function(t){e("#submenuId").val(t.id),e("#submenuName").val(t.name),e("#submenuRoute").val(t.route),e("#submenuIcon").val(t.icon),M(t.type),$(t.menu_id),e("#submenuIsparent").val(t.type_menu),e("#submenuIsparent").val(t.type_menu),w(),x("submenuModal")},error:function(t){console.error("Gagal ambil data:",t.responseText),alert("Gagal ambil data submenu")}})});e(document).on("click",".delete-btn",function(){const t=e(this).data("id"),s=e(this).data("name");e("#deletesubmenuId").val(t),e("#deleteSubmenuName").text(s),y("deleteModal")});e(document).on("click","#confirmDeleteBtn",function(){const t=e(this),s=t.html();t.html('<i class="fas fa-spinner fa-spin mr-2"></i>Menghapus...').prop("disabled",!0);const n=e("#deletesubmenuId").val();e.ajax({url:`/admin/submenu/${n}`,type:"DELETE",success:function(a){l(a.message,a.status),d("deleteModal"),c()},error:function(a){let o=a.responseJSON&&a.responseJSON.message?a.responseJSON.message:"Gagal menghapus data!";l(o,"error")},complete:function(){t.html(s).prop("disabled",!1)}})});
