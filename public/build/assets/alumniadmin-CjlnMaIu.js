import{$ as e}from"./jquery-BvxTx_lq.js";tailwind.config={theme:{extend:{colors:{"orange-primary":"#FF6B35","orange-light":"#FF8A65","blue-primary":"#1E40AF","blue-light":"#3B82F6"}}}};e.ajaxSetup({headers:{"X-CSRF-TOKEN":e('meta[name="csrf-token"]').attr("content")}});let r=1;const m=10;function x(t){const a=e("#tableBody");if(a.empty(),t.length===0){a.append(`
            <tr>
                <td colspan="5" class="px-6 py-8 text-center text-gray-500">
                    <i class="fas fa-info-circle text-gray-400 mr-2"></i>
                    Tidak ada data ditemukan
                </td>
            </tr>
        `);return}t.forEach((s,i)=>{let o=s.user?.status_user;o==="Tidak Aktif"&&(o="Alumni");const n=o==="Aktif"?"bg-green-100 text-green-800":"bg-blue-100 text-blue-800",g=`
            <tr class="hover:bg-gray-50 transition-colors duration-200">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${i+1}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                        <div class="flex-shrink-0 h-10 w-10">
                            <div class="h-10 w-10 rounded-full bg-gradient-to-r gradient-bg to-blue-light flex items-center justify-center text-white font-semibold">
                                ${s.user?.name.charAt(0)}
                            </div>
                        </div>
                        <div class="ml-4">
                            <div class="text-sm font-medium text-gray-900">${s.user?.name}</div>
                        </div>
                    </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${s.user?.akademik?.mitra?.nama_mitra||"-"}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${s.user?.email}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${n}">
                        ${o??"-"}
                    </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm">
                    ${s.user.status_user!=="Aktif"?`
                            <button class="aktif-btn px-3 py-1 text-green-600 hover:text-green-800 transition-all"
                                title="Set PBS Aktif" data-id="${s.user?.id}" data-name="${s.user.name}">
                                <i class="fa-solid fa-circle-check text-xl"></i>
                            </button>
                        `:`
                            <i class="fas fa-lock text-gray-400 text-xl" title="Aksi tidak tersedia"></i>
                        `}
                </td>
            </tr>
        `;a.append(g)})}function d(t="",a=1){e.ajax({url:"/admin/getadminalumni",type:"GET",data:{search:t,page:a,limit:m},dataType:"json",success:function(s){const i=s.data;if(!Array.isArray(i)){console.error("Response data bukan array:",i);return}x(i),v(s.last_page,t);let o=(s.current_page-1)*m+1,n=o+i.length-1;e("#resultCount").html(`
                <i class="fas fa-info-circle mr-1"></i>
                Menampilkan ${o} - ${n} dari ${s.total} data
            `)},error:function(s,i,o){console.error("Gagal ambil data:",o,s.responseText)}})}function v(t,a){const s=e("#pagination");if(s.empty(),!(t<=1))for(let i=1;i<=t;i++){const o=e(`<button class="page-btn mx-1 px-3 py-1 rounded-lg border ${i===r?"bg-orange-primary text-white":"bg-white text-gray-700 hover:bg-gray-100"}">${i}</button>`);o.on("click",function(){r=i,d(a,r)}),s.append(o)}}e("#searchInputuser").on("input",function(){const t=e(this).val();r=1,d(t,r)});e(function(){d()});function b(t){const a=e("#"+t);a.removeClass("hidden"),setTimeout(()=>{a.find(".modal-content").addClass("show")},10),e("body").addClass("overflow-hidden")}function c(t){const a=e("#"+t);a.find(".modal-content").removeClass("show"),setTimeout(()=>{a.addClass("hidden"),e("body").removeClass("overflow-hidden")},300)}e(document).keydown(function(t){t.keyCode===27&&(e("#employeeModal").hasClass("hidden")?e("#activeModal").hasClass("hidden")||c("activeModal"):c("employeeModal"))});e("#employeeModal").on("shown",function(){e("#employeeName").focus()});e("#employeeForm input, #employeeForm select, #employeeForm textarea").on("focus",function(){e(this).removeClass("border-red-300 bg-red-50")});e("#employeeEmail").on("blur",function(){const t=e(this).val();t&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t)?(e(this).addClass("border-red-300 bg-red-50"),f(this,"Format email tidak valid")):(e(this).removeClass("border-red-300 bg-red-50"),p(this))});e("#password").on("blur",function(){const t=e(this).val();t&&t.length<6?(e(this).addClass("border-red-300 bg-red-50"),f(this,"Password harus minimal 6 karakter")):(e(this).removeClass("border-red-300 bg-red-50"),p(this))});function f(t,a){const s=e(t),i=s.attr("id")+"-error";e("#"+i).remove(),s.after(`<div id="${i}" class="text-red-500 text-xs mt-1 animate-pulse"><i class="fas fa-exclamation-circle mr-1"></i>${a}</div>`)}function p(t){const s=e(t).attr("id")+"-error";e("#"+s).remove()}function u(t,a="info"){const o=e(`
        <div class="notification flex items-center space-x-3 ${a==="success"?"bg-green-500":a==="error"?"bg-red-500":"bg-blue-500"} text-white px-6 py-4 rounded-xl shadow-lg transform translate-x-full opacity-0 transition-all duration-300 cursor-pointer">
            <i class="fas ${a==="success"?"fa-check-circle":a==="error"?"fa-exclamation-circle":"fa-info-circle"} text-lg"></i>
            <span class="font-medium">${t}</span>
        </div>
    `);e("#notificationWrapper").append(o),setTimeout(()=>{o.removeClass("translate-x-full opacity-0")},100);const n=setTimeout(()=>{o.addClass("translate-x-full opacity-0"),setTimeout(()=>o.remove(),300)},4e3);o.on("click",function(){clearTimeout(n),e(this).addClass("translate-x-full opacity-0"),setTimeout(()=>e(this).remove(),300)})}function h(){e(window).width()<640?e(".modal-content").addClass("mx-4 max-h-[95vh]"):e(".modal-content").removeClass("mx-4 max-h-[95vh]")}e(window).on("resize",function(){h()});h();function y(){e("body").css({overflow:"hidden","padding-right":"15px"})}function w(){e("body").css({overflow:"","padding-right":""})}function k(t){b(t),y()}function l(t){c(t),w()}e("#closeModal, #cancelBtn").on("click",function(){l("employeeModal")});e("#cancelActiveBtn").on("click",function(){l("activeModal")});e(".modal-overlay").on("click",function(t){t.target===this&&(e(this).closest("#employeeModal").length?l("employeeModal"):e(this).closest("#activeModal").length&&l("activeModal"))});e(document).on("click",".aktif-btn",function(){const t=e(this).data("id"),a=e(this).data("name");e("#activeUserId").val(t),e("#activeUserName").text(a),k("activeModal")});e(document).on("click","#confirmActiveBtn",function(){const t=e(this),a=t.html();t.html('<i class="fas fa-spinner fa-spin mr-2"></i>Menyimpan...').prop("disabled",!0);const s=e("#activeUserId").val();e.ajax({url:`/admin/confirmpbsaktif/${s}`,type:"PUT",success:function(i){u(i.message,i.status),l("activeModal"),d()},error:function(i){let o=i.responseJSON&&i.responseJSON.message?i.responseJSON.message:"Gagal menyimpan data!";u(o,"error")},complete:function(){t.html(a).prop("disabled",!1)}})});
