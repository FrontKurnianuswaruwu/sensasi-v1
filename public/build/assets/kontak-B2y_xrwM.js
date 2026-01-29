import{$ as t}from"./jquery-BvxTx_lq.js";t.ajaxSetup({headers:{"X-CSRF-TOKEN":t('meta[name="csrf-token"]').attr("content")}});t(function(){c()});let r=1;const k=10;function y(a){const o=t("#tableKontak");if(o.empty(),a.length===0){o.append(`
            <tr>
                <td colspan="5" class="px-6 py-8 text-center text-gray-500">
                    <i class="fas fa-info-circle text-gray-400 mr-2"></i>
                    Tidak ada data ditemukan
                </td>
            </tr>
        `);return}a.forEach((e,n)=>{const s=`
            <tr class="hover:bg-gray-50 transition-colors duration-200">
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${n+1}</td>
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10">
                        <div class="h-10 w-10 rounded-full bg-gradient-to-r gradient-bg to-blue-light flex items-center justify-center text-white font-semibold">
                        ${e.alamat.charAt(0)}
                        </div>
                    </div>
                    <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">${e.alamat}</div>
                    </div>
                </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                ${e.email}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                ${e.nomor}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm">
                <button class="edit-btn px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all mr-2" data-id="${e.id}">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="delete-btn px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all" data-id="${e.id}" data-name="${e.alamat}">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
            </tr>
        `;o.append(s)})}function w(a){const o=t("#cardContainer");if(o.empty(),a.length===0){o.append(`
            <div class="p-6 text-center text-gray-500">
                <i class="fas fa-info-circle text-gray-400 mr-2"></i>
                Tidak ada data ditemukan
            </div>
        `);return}a.forEach(e=>{const n=`
            <div class="p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200">
            <div class="flex items-start space-x-3">
            <div class="flex-shrink-0 h-12 w-12 rounded-full bg-gradient-to-r gradient-bg to-blue-light flex items-center justify-center text-white font-semibold text-lg">
            ${e.alamat.charAt(0)}
            </div>
            <div class="flex-1 min-w-0">
            <div class="flex items-center justify-between mb-2">
            <h3 class="text-lg font-semibold text-gray-900 truncate">${e.alamat}</h3>
            </div>
            <div class="space-y-1 text-sm text-gray-600">
            <div class="flex items-center">
            <i class="fas fa-phone-alt w-4 mr-2 text-blue-500"></i>
            <span class="truncate">${e.nomor||"-"}</span>
            </div>
            <div class="flex items-center">
            <i class="fas fa-envelope w-4 mr-2 text-green-500"></i>
            <span class="truncate">${e.email||"-"}</span>
            </div>
            <div class="flex mt-4 space-x-2">
            <button class="edit-btn flex-1 px-3 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all" data-id="${e.id}">
            <i class="fas fa-edit"></i> Edit
            </button>
            <button class="delete-btn flex-1 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all" data-id="${e.id}" data-name="${e.alamat}">
            <i class="fas fa-trash"></i> Hapus
            </button>
            </div>
            </div>
            </div>
            </div>
            </div>
        `;o.append(n)})}function T(a,o){const e=t("#pagination");if(e.empty(),!(a<=1))for(let n=1;n<=a;n++){const s=t(`<button class="page-btn mx-1 px-3 py-1 rounded-lg border ${n===r?"bg-orange-primary text-white":"bg-white text-gray-700 hover:bg-gray-100"}">${n}</button>`);s.on("click",function(){r=n,c(o,r)}),e.append(s)}}function C(a,o){const e=t("#paginationMobile");if(e.empty(),!(a<=1))for(let n=1;n<=a;n++){const s=t(`<button class="px-3 py-1 rounded-lg border ${n===r?"bg-orange-primary text-white":"bg-white text-gray-700 hover:bg-gray-100"}">${n}</button>`);s.on("click",function(){r=n,c(o,r)}),e.append(s)}}function c(a="",o=1){t.ajax({url:"/admin/getkontak",type:"GET",data:{search:a,page:o,limit:k},dataType:"json",success:function(e){const n=e.data;if(!Array.isArray(n)){console.error("Response data bukan array:",n);return}y(n),w(n),T(e.last_page,a),C(e.last_page,a);let s=(e.current_page-1)*k+1,m=s+n.length-1;t("#resultCount").html(`
                <i class="fas fa-info-circle mr-1"></i>
                Menampilkan ${s} - ${m} dari ${e.total} data
            `)},error:function(e,n,s){console.error("Gagal ambil data:",s,e.responseText)}})}t("#searchInputkontak").on("input",function(){const a=t(this).val();r=1,c(a,r)});function b(){t("#kontakForm")[0].reset(),t("#kontakForm input, #kontakForm select, #kontakForm textarea").removeClass("border-red-300 bg-red-50"),t("#kontakForm input, #kontakForm select").each(function(){t(this).removeClass("border-red-300 bg-red-50"),M(this)}),t("#preview").attr("src",""),t("#previewContainer").addClass("hidden")}function v(a){h(a),$()}function h(a){const o=t("#"+a);o.removeClass("hidden"),setTimeout(()=>{o.find(".modal-content").addClass("show")},10),t("body").addClass("overflow-hidden")}function $(){t("body").css({overflow:"hidden","padding-right":""})}function M(a){const e=t(a).attr("id")+"-error";t("#"+e).remove()}t("#cancelDeleteBtn").on("click",function(){d("deleteModal")});t("#closeModal, #cancelBtn").on("click",function(){d("kontakModal")});function d(a){I(a),E()}function I(a){const o=t("#"+a);o.find(".modal-content").removeClass("show"),setTimeout(()=>{o.addClass("hidden"),t("body").removeClass("overflow-hidden")},300)}function E(){t("body").css({overflow:"","padding-right":""})}t(".modal-overlay").on("click",function(a){a.target===this&&(t(this).closest("#kontakModal").length?d("kontakModal"):t(this).closest("#deleteModal").length&&d("deleteModal"))});function l(a,o="info"){const s=t(`
            <div class="notification flex items-center space-x-3 ${o==="success"?"bg-green-500":o==="error"?"bg-red-500":"bg-blue-500"} text-white px-6 py-4 rounded-xl shadow-lg transform translate-x-full opacity-0 transition-all duration-300 cursor-pointer">
            <i class="fas ${o==="success"?"fa-check-circle":o==="error"?"fa-exclamation-circle":"fa-info-circle"} text-lg"></i>
            <span class="font-medium">${a}</span>
            </div>
            `);t("#notificationWrapper").append(s),setTimeout(()=>{s.removeClass("translate-x-full opacity-0")},100);const m=setTimeout(()=>{s.addClass("translate-x-full opacity-0"),setTimeout(()=>s.remove(),300)},4e3);s.on("click",function(){clearTimeout(m),t(this).addClass("translate-x-full opacity-0"),setTimeout(()=>t(this).remove(),300)})}function S(){let a=!0;return["kontakAlamat","kontakNomor","kontakEmail","kontakMaps"].forEach(function(e){const n=t("#"+e);!n.val()||!n.val().toString().trim()?(n.addClass("border-red-300 bg-red-50"),a=!1):n.removeClass("border-red-300 bg-red-50")}),a}let f=null;t("#addSubkontakBtn").on("click",function(){f=null,b(),t("#kontakId").val(""),t("#modalTitle").text("Tambah Kontak Baru"),t("#modalIcon").removeClass().addClass("fas fa-address-book"),t("#submitText").text("Simpan Data"),t("#submitIcon").removeClass("fa-edit").addClass("fa-save"),v("kontakModal"),t("#kontakIsparent").val("")});t(function(){t("#kontakForm").on("submit",function(a){if(a.preventDefault(),!S()){l("Mohon lengkapi semua field yang wajib diisi!","error");return}const o=t("#submitBtn"),e=o.html();o.html('<i class="fas fa-spinner fa-spin mr-2"></i>Menyimpan...').prop("disabled",!0);const n=t("#kontakId").val();let s={alamat:t("#kontakAlamat").val(),nomor:t("#kontakNomor").val(),email:t("#kontakEmail").val(),maps:t("#kontakMaps").val(),instagram:t("#kontakInstagram").val(),fecebook:t("#kontakFecebook").val(),twitter:t("#kontakTwitter").val(),linkedin:t("#kontakLinkedin").val(),youtube:t("#kontakYoutube").val(),tiktok:t("#kontakTiktok").val(),_token:t('meta[name="csrf-token"]').attr("content")};const m=n?`/admin/kontak/${n}`:"/admin/kontak",x=n?"PUT":"POST";t.ajax({url:m,type:x,data:s,success:function(i){l(i.message,i.status),d("kontakModal"),o.html(e).prop("disabled",!1),c(t("#searchInputmenu").val(),r)},error:function(i){if(o.html(e).prop("disabled",!1),i.status===422&&i.responseJSON.errors){let u=i.responseJSON.errors,p=[];for(let g in u)u.hasOwnProperty(g)&&p.push(u[g].join(", "));l(p.join(" | "),"error")}else{let u=i.responseJSON&&i.responseJSON.message?i.responseJSON.message:"Terjadi kesalahan saat menyimpan data!";l(u,"error")}}})})});t(document).on("click",".edit-btn",function(){f=t(this).data("id"),b(),t("#modalTitle").text("Edit Data Kontak"),t("#modalIcon").removeClass().addClass("fas fa-address-book"),t("#submitText").text("Update Data"),t("#submitIcon").removeClass("fa-save").addClass("fa-edit"),t.ajax({url:"/admin/kontak/"+f,type:"GET",success:function(a){t("#kontakId").val(a.id),t("#kontakAlamat").val(a.alamat),t("#kontakNomor").val(a.nomor),t("#kontakEmail").val(a.email),t("#kontakMaps").val(a.maps),t("#kontakInstagram").val(a.instagram),t("#kontakFecebook").val(a.facebook),t("#kontakTwitter").val(a.twitter),t("#kontakLinkedin").val(a.linkedin),t("#kontakYoutube").val(a.youtube),t("#kontakTiktok").val(a.tiktok),h("kontakModal")},error:function(a){console.error("Gagal ambil data:",a.responseText),alert("Gagal ambil data kontak")}})});t(document).on("click",".delete-btn",function(){const a=t(this).data("id"),o=t(this).data("name");t("#deletekontakId").val(a),t("#deleteKontakName").text(o),v("deleteModal")});t(document).on("click","#confirmDeleteBtn",function(){const a=t(this),o=a.html();a.html('<i class="fas fa-spinner fa-spin mr-2"></i>Menghapus...').prop("disabled",!0);const e=t("#deletekontakId").val();t.ajax({url:`/admin/kontak/${e}`,type:"DELETE",success:function(n){l(n.message,n.status),d("deleteModal"),c()},error:function(n){let s=n.responseJSON&&n.responseJSON.message?n.responseJSON.message:"Gagal menghapus data!";l(s,"error")},complete:function(){a.html(o).prop("disabled",!1)}})});
