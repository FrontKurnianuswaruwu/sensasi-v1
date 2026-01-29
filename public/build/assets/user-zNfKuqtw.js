import{$ as e}from"./jquery-BvxTx_lq.js";const x=e('meta[name="permission-edit-user"]').attr("content")==="1",v=e('meta[name="permission-delete-user"]').attr("content")==="1";tailwind.config={theme:{extend:{colors:{"orange-primary":"#FF6B35","orange-light":"#FF8A65","blue-primary":"#1E40AF","blue-light":"#3B82F6"}}}};e.ajaxSetup({headers:{"X-CSRF-TOKEN":e('meta[name="csrf-token"]').attr("content")}});let r=1;const b=10;function I(t){const s=e("#tableBody");if(s.empty(),t.length===0){s.append(`
            <tr>
                <td colspan="5" class="px-6 py-8 text-center text-gray-500">
                    <i class="fas fa-info-circle text-gray-400 mr-2"></i>
                    Tidak ada data ditemukan
                </td>
            </tr>
        `);return}t.forEach((a,o)=>{const n=a.status_user==="Aktif"?"bg-green-100 text-green-800":"bg-red-100 text-red-800",i=`
            <tr class="hover:bg-gray-50 transition-colors duration-200">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${o+1}</td>
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
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${a.email}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${n}">
                        ${a.status_user}
                    </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm">
                    ${x?`
                        <button class="edit-btn px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all mr-2" data-id="${a.id}">
                            <i class="fas fa-edit"></i>
                        </button>
                    `:""}
                    ${v?`
                        <button class="delete-btn px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all" data-id="${a.id}" data-name="${a.name}">
                            <i class="fas fa-trash"></i>
                        </button>
                    `:""}
                </td>
            </tr>
        `;s.append(i)})}function S(t){const s=e("#cardContainer");if(s.empty(),t.length===0){s.append(`
            <div class="p-6 text-center text-gray-500">
                <i class="fas fa-info-circle text-gray-400 mr-2"></i>
                Tidak ada data ditemukan
            </div>
        `);return}t.forEach(a=>{const o=a.status_user==="Aktif"?"bg-green-100 text-green-800":"bg-red-100 text-red-800",n=`
            <div class="p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200">
                <div class="flex items-start space-x-3">
                    <div class="flex-shrink-0 h-12 w-12 rounded-full bg-gradient-to-r gradient-bg to-blue-light flex items-center justify-center text-white font-semibold text-lg">
                        ${a.name.charAt(0)}
                    </div>
                    <div class="flex-1 min-w-0">
                        <div class="flex items-center justify-between mb-2">
                            <h3 class="text-lg font-semibold text-gray-900 truncate">${a.name}</h3>
                            <span class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${o}">
                                ${a.status_user}
                            </span>
                        </div>
                        <div class="space-y-1 text-sm text-gray-600">
                            <div class="flex items-center">
                                <i class="fas fa-envelope w-4 mr-2 text-orange-primary"></i>
                                <span>${a.email}</span>
                            </div>
                            <div class="flex mt-4 space-x-2">
                                ${x?`
                                    <button class="edit-btn flex-1 px-3 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all" data-id="${a.id}">
                                        <i class="fas fa-edit"></i> Edit
                                    </button>
                                `:""}
                                ${v?`
                                    <button class="delete-btn flex-1 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all" data-id="${a.id}">
                                        <i class="fas fa-trash"></i> Hapus
                                    </button>
                                `:""}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;s.append(n)})}function m(t="",s=1){e.ajax({url:"/admin/getuser",type:"GET",data:{search:t,page:s,limit:b},dataType:"json",success:function(a){const o=a.data;if(!Array.isArray(o)){console.error("Response data bukan array:",o);return}I(o),S(o),j(a.last_page,t),N(a.last_page,t);let n=(a.current_page-1)*b+1,i=n+o.length-1;e("#resultCount").html(`
                <i class="fas fa-info-circle mr-1"></i>
                Menampilkan ${n} - ${i} dari ${a.total} data
            `)},error:function(a,o,n){console.error("Gagal ambil data:",n,a.responseText)}})}function j(t,s){const a=e("#pagination");if(a.empty(),!(t<=1))for(let o=1;o<=t;o++){const n=e(`<button class="page-btn mx-1 px-3 py-1 rounded-lg border ${o===r?"bg-orange-primary text-white":"bg-white text-gray-700 hover:bg-gray-100"}">${o}</button>`);n.on("click",function(){r=o,m(s,r)}),a.append(n)}}function N(t,s){const a=e("#paginationMobile");if(a.empty(),!(t<=1))for(let o=1;o<=t;o++){const n=e(`<button class="px-3 py-1 rounded-lg border ${o===r?"bg-orange-primary text-white":"bg-white text-gray-700 hover:bg-gray-100"}">${o}</button>`);n.on("click",function(){r=o,m(s,r)}),a.append(n)}}e("#searchInputuser").on("input",function(){const t=e(this).val();r=1,m(t,r)});e(function(){m()});let p=null;function w(t){const s=e("#"+t);s.removeClass("hidden"),setTimeout(()=>{s.find(".modal-content").addClass("show")},10),e("body").addClass("overflow-hidden")}function f(t){const s=e("#"+t);s.find(".modal-content").removeClass("show"),setTimeout(()=>{s.addClass("hidden"),e("body").removeClass("overflow-hidden")},300)}function M(){e("#employeeForm")[0].reset(),e("#employeeForm input, #employeeForm select, #employeeForm textarea").removeClass("border-red-300")}e(document).keydown(function(t){t.keyCode===27&&(e("#employeeModal").hasClass("hidden")?e("#deleteModal").hasClass("hidden")||f("deleteModal"):f("employeeModal"))});function A(){let t=!0;["employeeName","employeeEmail","password"].forEach(function(n){const i=e("#"+n);i.val().trim()?i.removeClass("border-red-300 bg-red-50"):(i.addClass("border-red-300 bg-red-50"),t=!1)});const a=e("#employeeEmail").val();return a&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(a)&&(e("#employeeEmail").addClass("border-red-300 bg-red-50"),t=!1),t}e("#employeeForm").on("submit",function(t){if(t.preventDefault(),!A()){d("Mohon lengkapi semua field yang wajib diisi!","error");return}const s=e("#submitBtn"),a=s.html();s.html('<i class="fas fa-spinner fa-spin mr-2"></i>Menyimpan...').prop("disabled",!0);const o=e("#employeeId").val(),n={name:e("#employeeName").val(),email:e("#employeeEmail").val(),password:e("#password").val(),status:e("#employeeStatus").val(),role:e("#employeeRole").val(),mitra_id:e("#employeeMitra").val()},i=o?`/user/${o}`:"/user",F=o?"PUT":"POST";e.ajax({url:i,type:F,data:JSON.stringify(n),contentType:"application/json",success:function(l){d(l.message,l.status),c("employeeModal"),s.html(a).prop("disabled",!1),m(e("#searchInputuser").val(),r)},error:function(l){if(s.html(a).prop("disabled",!1),l.status===422&&l.responseJSON.errors){let u=l.responseJSON.errors,h=[];for(let y in u)u.hasOwnProperty(y)&&h.push(u[y].join(", "));d(h.join(" | "),"error")}else{let u=l.responseJSON&&l.responseJSON.message?l.responseJSON.message:"Terjadi kesalahan saat menyimpan data!";d(u,"error")}}})});e("#employeeModal").on("shown",function(){e("#employeeName").focus()});e("#employeeForm input, #employeeForm select, #employeeForm textarea").on("focus",function(){e(this).removeClass("border-red-300 bg-red-50")});e("#employeeEmail").on("blur",function(){const t=e(this).val();t&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t)?(e(this).addClass("border-red-300 bg-red-50"),$(this,"Format email tidak valid")):(e(this).removeClass("border-red-300 bg-red-50"),C(this))});e("#password").on("blur",function(){const t=e(this).val();t&&t.length<6?(e(this).addClass("border-red-300 bg-red-50"),$(this,"Password harus minimal 6 karakter")):(e(this).removeClass("border-red-300 bg-red-50"),C(this))});function $(t,s){const a=e(t),o=a.attr("id")+"-error";e("#"+o).remove(),a.after(`<div id="${o}" class="text-red-500 text-xs mt-1 animate-pulse"><i class="fas fa-exclamation-circle mr-1"></i>${s}</div>`)}function C(t){const a=e(t).attr("id")+"-error";e("#"+a).remove()}function d(t,s="info"){const n=e(`
        <div class="notification flex items-center space-x-3 ${s==="success"?"bg-green-500":s==="error"?"bg-red-500":"bg-blue-500"} text-white px-6 py-4 rounded-xl shadow-lg transform translate-x-full opacity-0 transition-all duration-300 cursor-pointer">
            <i class="fas ${s==="success"?"fa-check-circle":s==="error"?"fa-exclamation-circle":"fa-info-circle"} text-lg"></i>
            <span class="font-medium">${t}</span>
        </div>
    `);e("#notificationWrapper").append(n),setTimeout(()=>{n.removeClass("translate-x-full opacity-0")},100);const i=setTimeout(()=>{n.addClass("translate-x-full opacity-0"),setTimeout(()=>n.remove(),300)},4e3);n.on("click",function(){clearTimeout(i),e(this).addClass("translate-x-full opacity-0"),setTimeout(()=>e(this).remove(),300)})}function k(){e(window).width()<640?e(".modal-content").addClass("mx-4 max-h-[95vh]"):e(".modal-content").removeClass("mx-4 max-h-[95vh]")}e(window).on("resize",function(){k()});k();function B(){e("body").css({overflow:"hidden","padding-right":"15px"})}function P(){e("body").css({overflow:"","padding-right":""})}function T(t){w(t),B()}function c(t){f(t),P()}function E(t=""){e.get("/admin/menu/getroles",function(s){const a=Array.isArray(s.data)?s.data:[];e("#employeeRole").empty(),e("#employeeRole").append('<option value="">Pilih Role</option>'),a.forEach(function(o){var n=o.id==t?"selected":"";e("#employeeRole").append(`<option value="${o.id}" ${n}>${o.name}</option>`)})}).fail(function(){alert("Gagal mengambil data role. Pastikan API berjalan dengan benar.")})}function g(t=""){e.get("/admin/getmitra/user",function(s){const a=Array.isArray(s.data)?s.data:[];e("#employeeMitra").empty(),e("#employeeMitra").append('<option value="">Pilih Mitra</option>'),a.forEach(function(o){var n=o.id==t?"selected":"";e("#employeeMitra").append(`<option value="${o.id}" ${n}>${o.nama_mitra}</option>`)})}).fail(function(){alert("Gagal mengambil data mitra. Pastikan API berjalan dengan benar.")})}e("#addEmployeeBtn").on("click",function(){p=null,M(),e("#modalTitle").text("Tambah User Baru"),e("#modalIcon").removeClass("fa-edit").addClass("fa-user-plus"),e("#submitText").text("Simpan Data"),e("#submitIcon").removeClass("fa-edit").addClass("fa-save"),e("#employeeMitra").closest(".space-y-2").hide(),E(),g(),T("employeeModal")});e("#employeeRole").on("change",function(){const t=e(this).val();[9,19].includes(parseInt(t))?(e("#employeeMitra").closest(".space-y-2").show(),g()):(e("#employeeMitra").closest(".space-y-2").hide(),e("#employeeMitra").val(""))});function R(t,s=""){t==9||t==19?(e("#employeeMitra").closest(".space-y-2").show(),g(s)):(e("#employeeMitra").val(""),e("#employeeMitra").closest(".space-y-2").hide())}e(document).on("click",".edit-btn",function(){p=e(this).data("id"),M(),e("#modalTitle").text("Edit Data User"),e("#modalIcon").removeClass("fa-user-plus").addClass("fa-edit"),e("#submitText").text("Update Data"),e("#submitIcon").removeClass("fa-save").addClass("fa-edit"),e.ajax({url:"/admin/user/"+p,type:"GET",success:function(t){e("#employeeId").val(t.id),e("#employeeName").val(t.name),e("#employeeEmail").val(t.email),e("#employeeStatus").val(t.status_user),E(t.role);const s=t.role,a=t?.mitra_id||"";R(s,a),e("#employeeJoinDate").val(t.join_date||""),e("#employeeSalary").val(t.salary||""),e("#employeeAddress").val(t.address||""),w("employeeModal")},error:function(t){console.error("Gagal ambil data:",t.responseText),alert("Gagal ambil data user")}})});e(document).on("click",".delete-btn",function(){const t=e(this).data("id"),s=e(this).data("name");e("#deleteemployeeId").val(t),e("#deleteEmployeeName").text(s),T("deleteModal")});e("#closeModal, #cancelBtn").on("click",function(){c("employeeModal")});e("#cancelDeleteBtn").on("click",function(){c("deleteModal")});e(document).on("click","#confirmDeleteBtn",function(){const t=e(this),s=t.html();t.html('<i class="fas fa-spinner fa-spin mr-2"></i>Menghapus...').prop("disabled",!0);const a=e("#deleteemployeeId").val();e.ajax({url:`/user/${a}`,type:"DELETE",success:function(o){d(o.message,o.status),c("deleteModal"),m()},error:function(o){let n=o.responseJSON&&o.responseJSON.message?o.responseJSON.message:"Gagal menghapus data!";d(n,"error")},complete:function(){t.html(s).prop("disabled",!1)}})});e(".modal-overlay").on("click",function(t){t.target===this&&(e(this).closest("#employeeModal").length?c("employeeModal"):e(this).closest("#deleteModal").length&&c("deleteModal"))});
