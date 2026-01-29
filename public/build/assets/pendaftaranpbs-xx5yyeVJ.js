import{$ as t}from"./jquery-BvxTx_lq.js";tailwind.config={theme:{extend:{colors:{"orange-primary":"#FF6B35","orange-light":"#FF8A65","blue-primary":"#1E40AF","blue-light":"#3B82F6"}}}};t.ajaxSetup({headers:{"X-CSRF-TOKEN":t('meta[name="csrf-token"]').attr("content")}});let r=1;const u=10;function h(e){const a=t("#tableBody");if(a.empty(),e.length===0){a.append(`
            <tr>
                <td colspan="5" class="px-6 py-8 text-center text-gray-500">
                    <i class="fas fa-info-circle text-gray-400 mr-2"></i>
                    Tidak ada data ditemukan
                </td>
            </tr>
        `);return}e.forEach((n,i)=>{let s=n.user?.status_user;s==="Verifikasi"&&(s="Verifikasi PBS");const o=s==="Verifikasi"?"bg-green-100 text-green-800":"bg-blue-100 text-blue-800",p=`
            <tr class="hover:bg-gray-50 transition-colors duration-200">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${i+1}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                        <div class="flex-shrink-0 h-10 w-10">
                            <div class="h-10 w-10 rounded-full bg-gradient-to-r gradient-bg to-blue-light flex items-center justify-center text-white font-semibold">
                                ${n.user?.name.charAt(0)}
                            </div>
                        </div>
                        <div class="ml-4">
                            <div class="text-sm font-medium text-gray-900">${n.user?.name}</div>
                        </div>
                    </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${n.user?.akademik?.mitra?.nama_mitra||"-"}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${n.user?.email}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${o}">
                        ${s??"-"}
                    </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm">
                    ${n.user.status_user!=="Aktif"?`
                            <button class="aktif-btn px-3 py-1 text-green-600 hover:text-green-800 transition-all"
                                title="Set PBS Aktif" data-id="${n.user?.id}" data-name="${n.user.name}">
                                <i class="fa-solid fa-circle-check text-xl"></i>
                            </button>
                        `:`
                            <i class="fas fa-lock text-gray-400 text-xl" title="Aksi tidak tersedia"></i>
                        `}
                </td>
            </tr>
        `;a.append(p)})}function c(e="",a=1){t.ajax({url:"/admin/getpendaftaranpbs",type:"GET",data:{search:e,page:a,limit:u},dataType:"json",success:function(n){const i=n.data;if(!Array.isArray(i)){console.error("Response data bukan array:",i);return}h(i),g(n.last_page,e);let s=(n.current_page-1)*u+1,o=s+i.length-1;t("#resultCount").html(`
                <i class="fas fa-info-circle mr-1"></i>
                Menampilkan ${s} - ${o} dari ${n.total} data
            `)},error:function(n,i,s){console.error("Gagal ambil data:",s,n.responseText)}})}function g(e,a){const n=t("#pagination");if(n.empty(),!(e<=1))for(let i=1;i<=e;i++){const s=t(`<button class="page-btn mx-1 px-3 py-1 rounded-lg border ${i===r?"bg-orange-primary text-white":"bg-white text-gray-700 hover:bg-gray-100"}">${i}</button>`);s.on("click",function(){r=i,c(a,r)}),n.append(s)}}t("#searchInputuser").on("input",function(){const e=t(this).val();r=1,c(e,r)});t(function(){c()});function x(e){const a=t("#"+e);a.removeClass("hidden"),setTimeout(()=>{a.find(".modal-content").addClass("show")},10),t("body").addClass("overflow-hidden")}function d(e){const a=t("#"+e);a.find(".modal-content").removeClass("show"),setTimeout(()=>{a.addClass("hidden"),t("body").removeClass("overflow-hidden")},300)}t(document).keydown(function(e){e.keyCode===27&&(t("#employeeModal").hasClass("hidden")?t("#activeModal").hasClass("hidden")||d("activeModal"):d("employeeModal"))});function f(e,a="info"){const s=t(`
        <div class="notification flex items-center space-x-3 ${a==="success"?"bg-green-500":a==="error"?"bg-red-500":"bg-blue-500"} text-white px-6 py-4 rounded-xl shadow-lg transform translate-x-full opacity-0 transition-all duration-300 cursor-pointer">
            <i class="fas ${a==="success"?"fa-check-circle":a==="error"?"fa-exclamation-circle":"fa-info-circle"} text-lg"></i>
            <span class="font-medium">${e}</span>
        </div>
    `);t("#notificationWrapper").append(s),setTimeout(()=>{s.removeClass("translate-x-full opacity-0")},100);const o=setTimeout(()=>{s.addClass("translate-x-full opacity-0"),setTimeout(()=>s.remove(),300)},4e3);s.on("click",function(){clearTimeout(o),t(this).addClass("translate-x-full opacity-0"),setTimeout(()=>t(this).remove(),300)})}function m(){t(window).width()<640?t(".modal-content").addClass("mx-4 max-h-[95vh]"):t(".modal-content").removeClass("mx-4 max-h-[95vh]")}t(window).on("resize",function(){m()});m();function v(){t("body").css({overflow:"hidden","padding-right":"15px"})}function y(){t("body").css({overflow:"","padding-right":""})}function b(e){x(e),v()}function l(e){d(e),y()}t("#closeModal, #cancelBtn").on("click",function(){l("employeeModal")});t("#cancelActiveBtn").on("click",function(){l("activeModal")});t(".modal-overlay").on("click",function(e){e.target===this&&(t(this).closest("#employeeModal").length?l("employeeModal"):t(this).closest("#activeModal").length&&l("activeModal"))});t(document).on("click",".aktif-btn",function(){const e=t(this).data("id"),a=t(this).data("name");t("#activeUserId").val(e),t("#activeUserName").text(a),b("activeModal")});t(document).on("click","#confirmActiveBtn",function(){const e=t(this),a=e.html();e.html('<i class="fas fa-spinner fa-spin mr-2"></i>Menyimpan...').prop("disabled",!0);const n=t("#activeUserId").val();t.ajax({url:`/admin/confirmpbs/${n}`,type:"PUT",success:function(i){f(i.message,i.status),l("activeModal"),c()},error:function(i){let s=i.responseJSON&&i.responseJSON.message?i.responseJSON.message:"Gagal menyimpan data!";f(s,"error")},complete:function(){e.html(a).prop("disabled",!1)}})});
