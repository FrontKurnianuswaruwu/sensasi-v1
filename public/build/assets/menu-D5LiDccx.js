import{$ as e}from"./jquery-BvxTx_lq.js";e.ajaxSetup({headers:{"X-CSRF-TOKEN":e('meta[name="csrf-token"]').attr("content")}});e(function(){c()});let r=1;const v=10;function $(t){const i=e("#tableMenu");if(i.empty(),t.length===0){i.append(`
            <tr>
                <td colspan="5" class="px-6 py-8 text-center text-gray-500">
                    <i class="fas fa-info-circle text-gray-400 mr-2"></i>
                    Tidak ada data ditemukan
                </td>
            </tr>
        `);return}t.forEach((a,n)=>{const s=`
            <tr class="hover:bg-gray-50 transition-colors duration-200">
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${n+1}</td>
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10">
                        <div class="h-10 w-10 rounded-full bg-gradient-to-r gradient-bg to-blue-light flex items-center justify-center text-white font-semibold">
                        ${a.name.charAt(0)}
                        </div>
                    </div>
                    <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">${a.name}</div>
                    </div>
                </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                ${a.route||"-"}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                ${a.icon?`<i class="${a.icon}"></i>`:"-"}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm">
                <button class="edit-btn px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all mr-2" data-id="${a.id}">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="delete-btn px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all" data-id="${a.id}" data-name="${a.name}">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
            </tr>
        `;i.append(s)})}function M(t){const i=e("#cardContainer");if(i.empty(),t.length===0){i.append(`
            <div class="p-6 text-center text-gray-500">
                <i class="fas fa-info-circle text-gray-400 mr-2"></i>
                Tidak ada data ditemukan
            </div>
        `);return}t.forEach(a=>{const n=`
            <div class="p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200">
                <div class="flex items-center space-x-3">
                    <div class="flex-shrink-0 h-12 w-12 rounded-full bg-gradient-to-r gradient-bg to-blue-light flex items-center justify-center text-white font-semibold text-lg">
                        ${a.name.charAt(0)}
                    </div>
                    <div class="flex-1 min-w-0">
                        <div class="flex items-center justify-between mb-2">
                            <h3 class="text-lg font-semibold text-gray-900 truncate mb-2">${a.name}</h3>
                            <span class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full">
                                ${a.icon?`<i class="${a.icon}"></i>`:"-"}
                            </span>
                        </div>
                        <div class="flex mt-4 space-x-2">
                            <button class="edit-btn flex-1 px-3 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all" data-id="${a.id}">
                                <i class="fas fa-edit"></i> Edit
                            </button>
                            <button class="delete-btn flex-1 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all" data-id="${a.id}" data-name="${a.name}">
                                <i class="fas fa-trash"></i> Hapus
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;i.append(n)})}function k(t,i){const a=e("#pagination");if(a.empty(),!(t<=1))for(let n=1;n<=t;n++){const s=e(`<button class="page-btn mx-1 px-3 py-1 rounded-lg border ${n===r?"bg-orange-primary text-white":"bg-white text-gray-700 hover:bg-gray-100"}">${n}</button>`);s.on("click",function(){r=n,c(i,r)}),a.append(s)}}function I(t,i){const a=e("#paginationMobile");if(a.empty(),!(t<=1))for(let n=1;n<=t;n++){const s=e(`<button class="px-3 py-1 rounded-lg border ${n===r?"bg-orange-primary text-white":"bg-white text-gray-700 hover:bg-gray-100"}">${n}</button>`);s.on("click",function(){r=n,c(i,r)}),a.append(s)}}function c(t="",i=1){e.ajax({url:"/admin/getmenus",type:"GET",data:{search:t,page:i,limit:v},dataType:"json",success:function(a){const n=a.data;if(!Array.isArray(n))return;$(n),M(n),k(a.last_page,t),I(a.last_page,t);let s=(a.current_page-1)*v+1,m=s+n.length-1;e("#resultCount").html(`
                <i class="fas fa-info-circle mr-1"></i>
                Menampilkan ${s} - ${m} dari ${a.total} data
            `)},error:function(a,n,s){console.error("Gagal ambil data:",s,a.responseText)}})}function x(){e("#menuForm")[0].reset(),e("#menuForm input, #menuForm select, #menuForm textarea").removeClass("border-red-300 bg-red-50"),e("#menuForm input, #menuForm select").each(function(){e(this).removeClass("border-red-300 bg-red-50"),u(this)})}e("#searchInputmenu").on("input",function(){const t=e(this).val();r=1,c(t,r)});function y(t){w(t),j()}function w(t){const i=e("#"+t);i.removeClass("hidden"),setTimeout(()=>{i.find(".modal-content").addClass("show")},10),e("body").addClass("overflow-hidden")}function j(){e("body").css({overflow:"hidden","padding-right":""})}function C(t=""){e.get("/admin/menu/getroles",function(i){const a=Array.isArray(i.data)?i.data:[];e("#menuType").empty(),e("#menuType").append('<option value="">Pilih Type</option>'),a.forEach(function(n){var s=n.id==t?"selected":"";e("#menuType").append(`<option value="${n.id}" ${s}>${n.name}</option>`)})}).fail(function(){alert("Gagal mengambil data role. Pastikan API berjalan dengan benar.")})}e("#closeModal, #cancelBtn").on("click",function(){d("menuModal")});function d(t){N(t),E()}function N(t){const i=e("#"+t);i.find(".modal-content").removeClass("show"),setTimeout(()=>{i.addClass("hidden"),e("body").removeClass("overflow-hidden")},300)}function E(){e("body").css({overflow:"","padding-right":""})}e(".modal-overlay").on("click",function(t){t.target===this&&(e(this).closest("#menuModal").length?d("menuModal"):e(this).closest("#deleteModal").length&&d("deleteModal"))});function l(t,i="info"){const s=e(`
            <div class="notification flex items-center space-x-3 ${i==="success"?"bg-green-500":i==="error"?"bg-red-500":"bg-blue-500"} text-white px-6 py-4 rounded-xl shadow-lg transform translate-x-full opacity-0 transition-all duration-300 cursor-pointer">
            <i class="fas ${i==="success"?"fa-check-circle":i==="error"?"fa-exclamation-circle":"fa-info-circle"} text-lg"></i>
            <span class="font-medium">${t}</span>
            </div>
            `);e("#notificationWrapper").append(s),setTimeout(()=>{s.removeClass("translate-x-full opacity-0")},100);const m=setTimeout(()=>{s.addClass("translate-x-full opacity-0"),setTimeout(()=>s.remove(),300)},4e3);s.on("click",function(){clearTimeout(m),e(this).addClass("translate-x-full opacity-0"),setTimeout(()=>e(this).remove(),300)})}function S(){let t=!0;return["menuName","menuType","menuIsparent"].forEach(function(a){const n=e("#"+a);!n.val()||!n.val().toString().trim()?(n.addClass("border-red-300 bg-red-50"),t=!1):n.removeClass("border-red-300 bg-red-50")}),t}e("#menuName").on("blur",function(){const t=e(this).val();!t||!t.trim()?(e(this).addClass("border-red-300 bg-red-50"),p(this,"Nama menu wajib diisi")):(e(this).removeClass("border-red-300 bg-red-50"),u(this))});e("#menuRoute").on("blur",function(){const t=e(this).val();t&&t.length<3?(e(this).addClass("border-red-300 bg-red-50"),p(this,"Route minimal 3 karakter")):(e(this).removeClass("border-red-300 bg-red-50"),u(this))});e("#menuIcon").on("blur",function(){const t=e(this).val();t&&t.length<2?(e(this).addClass("border-red-300 bg-red-50"),p(this,"Icon minimal 2 karakter")):(e(this).removeClass("border-red-300 bg-red-50"),u(this))});e("#menuType").on("change blur",function(){e(this).val()?(e(this).removeClass("border-red-300 bg-red-50"),u(this)):(e(this).addClass("border-red-300 bg-red-50"),p(this,"Type menu wajib dipilih"))});e("#menuIsparent").on("change blur",function(){e(this).val()?(e(this).removeClass("border-red-300 bg-red-50"),u(this)):(e(this).addClass("border-red-300 bg-red-50"),p(this,"Menu Type wajib dipilih"))});function p(t,i){const a=e(t),n=a.attr("id")+"-error";e("#"+n).remove(),a.after(`<div id="${n}" class="text-red-500 text-xs mt-1 animate-pulse"><i class="fas fa-exclamation-circle mr-1"></i>${i}</div>`)}function u(t){const a=e(t).attr("id")+"-error";e("#"+a).remove()}e("#cancelDeleteBtn").on("click",function(){d("deleteModal")});let b=null;e("#addMenuBtn").on("click",function(){b=null,x(),e("#menuId").val(""),e("#modalTitle").text("Tambah Menu Baru"),e("#modalIcon").removeClass("fa-edit").addClass("fa-bars"),e("#submitText").text("Simpan Data"),e("#submitIcon").removeClass("fa-edit").addClass("fa-save"),C(),y("menuModal")});e("#menuForm").on("submit",function(t){if(t.preventDefault(),!S()){l("Mohon lengkapi semua field yang wajib diisi!","error");return}const i=e("#submitBtn"),a=i.html();i.html('<i class="fas fa-spinner fa-spin mr-2"></i>Menyimpan...').prop("disabled",!0);const n=e("#menuId").val(),s={name:e("#menuName").val(),route:e("#menuRoute").val(),icon:e("#menuIcon").val(),type:e("#menuType").val(),isparent:e("#menuIsparent").val()},m=n?`/admin/menu/${n}`:"/admin/menu",T=n?"PUT":"POST";e.ajax({url:m,type:T,data:JSON.stringify(s),contentType:"application/json",success:function(o){l(o.message,o.status),d("menuModal"),i.html(a).prop("disabled",!1),c(e("#searchInputmenu").val(),r)},error:function(o){if(i.html(a).prop("disabled",!1),o.status===422&&o.responseJSON.errors){let f=o.responseJSON.errors,g=[];for(let h in f)f.hasOwnProperty(h)&&g.push(f[h].join(", "));l(g.join(" | "),"error")}else{let f=o.responseJSON&&o.responseJSON.message?o.responseJSON.message:"Terjadi kesalahan saat menyimpan data!";l(f,"error")}}})});e(document).on("click",".edit-btn",function(){b=e(this).data("id"),x(),e("#modalTitle").text("Edit Data Menu"),e("#modalIcon").removeClass("fa-bars").addClass("fa-edit"),e("#submitText").text("Update Data"),e("#submitIcon").removeClass("fa-save").addClass("fa-edit"),e.ajax({url:"/admin/menu/"+b,type:"GET",success:function(t){e("#menuId").val(t.id),e("#menuName").val(t.name),e("#menuRoute").val(t.route),e("#menuIcon").val(t.icon),C(t.type),e("#menuIsparent").val(t.is_parent),w("menuModal")},error:function(t){console.error("Gagal ambil data:",t.responseText),alert("Gagal ambil data menu")}})});e(document).on("click",".delete-btn",function(){const t=e(this).data("id"),i=e(this).data("name");e("#deletemenuId").val(t),e("#deleteMenuName").text(i),y("deleteModal")});e(document).on("click","#confirmDeleteBtn",function(){const t=e(this),i=t.html();t.html('<i class="fas fa-spinner fa-spin mr-2"></i>Menghapus...').prop("disabled",!0);const a=e("#deletemenuId").val();e.ajax({url:`/admin/menu/${a}`,type:"DELETE",success:function(n){l(n.message,n.status),d("deleteModal"),c()},error:function(n){let s=n.responseJSON&&n.responseJSON.message?n.responseJSON.message:"Gagal menghapus data!";l(s,"error")},complete:function(){t.html(i).prop("disabled",!1)}})});
