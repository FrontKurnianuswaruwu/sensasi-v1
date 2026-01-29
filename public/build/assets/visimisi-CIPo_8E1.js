import{$ as i}from"./jquery-BvxTx_lq.js";i.ajaxSetup({headers:{"X-CSRF-TOKEN":i('meta[name="csrf-token"]').attr("content")}});i(function(){p()});let d=1;const h=10;function y(e){const t=i("#tableVisimisi");if(t.empty(),e.length===0){t.append(`
            <tr>
                <td colspan="5" class="px-6 py-8 text-center text-gray-500">
                    <i class="fas fa-info-circle text-gray-400 mr-2"></i>
                    Tidak ada data ditemukan
                </td>
            </tr>
        `);return}e.forEach((s,a)=>{const n=s.visi.replace(/<[^>]+>/g,"").trim().charAt(0),g=`
            <tr class="hover:bg-gray-50 transition-colors duration-200">
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${a+1}</td>
            <td class="px-6 py-4">
                <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10">
                        <div class="h-10 w-10 rounded-full bg-gradient-to-r gradient-bg to-blue-light flex items-center justify-center text-white font-semibold">
                        ${n}
                        </div>
                    </div>
                    <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">${s.visi}</div>
                    </div>
                </div>
            </td>
            <td class="px-6 py-4 text-sm text-gray-900">
                ${s.misi}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm">
                <button class="edit-btn px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all mr-2" data-id="${s.id}">
                    <i class="fas fa-edit"></i>
                </button>
            </td>
            </tr>
        `;t.append(g)})}function w(e){const t=i("#cardContainer");if(t.empty(),e.length===0){t.append(`
            <div class="p-6 text-center text-gray-500">
                <i class="fas fa-info-circle text-gray-400 mr-2"></i>
                Tidak ada data ditemukan
            </div>
        `);return}e.forEach(s=>{const a=s.visi?s.visi.replace(/<[^>]+>/g,"").trim():"",n=`
            <div class="p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200">
            <div class="flex items-start space-x-3">
            <div class="flex-shrink-0 h-12 w-12 rounded-full bg-gradient-to-r gradient-bg to-blue-light flex items-center justify-center text-white font-semibold text-lg">
            ${a?a.charAt(0):""}
            </div>
            <div class="flex-1 min-w-0">
            <div class="flex items-center justify-between mb-2">
                <h3 class="text-lg font-semibold text-gray-900 truncate">${s.visi}</h3>
            </div>
            <div class="space-y-1 text-sm text-gray-600">
                <div class="flex items-center">
                <i class="fas fa-user-tie w-4 mr-2 text-orange-primary"></i>
                <span class="truncate">${s.misi||"-"}</span>
                </div>
                <div class="flex mt-4 space-x-2">
                <button class="edit-btn flex-1 px-3 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all" data-id="${s.id}">
                <i class="fas fa-edit"></i> Edit
                </button>
                </div>
            </div>
            </div>
            </div>
            </div>
        `;t.append(n)})}function C(e,t){const s=i("#pagination");if(s.empty(),!(e<=1))for(let a=1;a<=e;a++){const r=i(`<button class="page-btn mx-1 px-3 py-1 rounded-lg border ${a===d?"bg-orange-primary text-white":"bg-white text-gray-700 hover:bg-gray-100"}">${a}</button>`);r.on("click",function(){d=a,p(t,d)}),s.append(r)}}function T(e,t){const s=i("#paginationMobile");if(s.empty(),!(e<=1))for(let a=1;a<=e;a++){const r=i(`<button class="px-3 py-1 rounded-lg border ${a===d?"bg-orange-primary text-white":"bg-white text-gray-700 hover:bg-gray-100"}">${a}</button>`);r.on("click",function(){d=a,p(t,d)}),s.append(r)}}function p(e="",t=1){i.ajax({url:"/admin/getvisimisi",type:"GET",data:{search:e,page:t,limit:h},dataType:"json",success:function(s){const a=s.data;if(!Array.isArray(a)){console.error("Response data bukan array:",a);return}y(a),w(a),C(s.last_page,e),T(s.last_page,e);let r=(s.current_page-1)*h+1,n=r+a.length-1;i("#resultCount").html(`
                <i class="fas fa-info-circle mr-1"></i>
                Menampilkan ${r} - ${n} dari ${s.total} data
            `)},error:function(s,a,r){console.error("Gagal ambil data:",r,s.responseText)}})}i("#searchInputvisimisi").on("input",function(){const e=i(this).val();d=1,p(e,d)});function k(){i("#visimisiForm")[0].reset(),i("#visimisiForm input, #visimisiForm select, #visimisiForm textarea").removeClass("border-red-300 bg-red-50"),i("#visimisiForm input, #visimisiForm select").each(function(){i(this).removeClass("border-red-300 bg-red-50"),M(this)}),typeof o<"u"&&o?o.setData(""):i("#visimisiDescription").val(""),i("#preview").attr("src",""),i("#previewContainer").addClass("hidden")}function $(e){const t=i("#"+e);t.removeClass("hidden"),setTimeout(()=>{t.find(".modal-content").addClass("show")},10),i("body").addClass("overflow-hidden")}function M(e){const s=i(e).attr("id")+"-error";i("#"+s).remove()}i("#cancelDeleteBtn").on("click",function(){u("deleteModal")});i("#closeModal, #cancelBtn").on("click",function(){u("visimisiModal")});function u(e){E(e),D()}function E(e){const t=i("#"+e);t.find(".modal-content").removeClass("show"),setTimeout(()=>{t.addClass("hidden"),i("body").removeClass("overflow-hidden")},300)}function D(){i("body").css({overflow:"","padding-right":""})}i(".modal-overlay").on("click",function(e){e.target===this&&(i(this).closest("#visimisiModal").length?u("visimisiModal"):i(this).closest("#deleteModal").length&&u("deleteModal"))});function f(e,t="info"){const r=i(`
            <div class="notification flex items-center space-x-3 ${t==="success"?"bg-green-500":t==="error"?"bg-red-500":"bg-blue-500"} text-white px-6 py-4 rounded-xl shadow-lg transform translate-x-full opacity-0 transition-all duration-300 cursor-pointer">
            <i class="fas ${t==="success"?"fa-check-circle":t==="error"?"fa-exclamation-circle":"fa-info-circle"} text-lg"></i>
            <span class="font-medium">${e}</span>
            </div>
            `);i("#notificationWrapper").append(r),setTimeout(()=>{r.removeClass("translate-x-full opacity-0")},100);const n=setTimeout(()=>{r.addClass("translate-x-full opacity-0"),setTimeout(()=>r.remove(),300)},4e3);r.on("click",function(){clearTimeout(n),i(this).addClass("translate-x-full opacity-0"),setTimeout(()=>i(this).remove(),300)})}function j(){let e=!0;return!c||!c.getData().trim()?(i("#visimisivisi").addClass("border-red-300 bg-red-50"),e=!1):i("#visimisivisi").removeClass("border-red-300 bg-red-50"),!o||!o.getData().trim()?(i("#visimisimisi").addClass("border-red-300 bg-red-50"),e=!1):i("#visimisimisi").removeClass("border-red-300 bg-red-50"),e}let c,o,x=null;i(function(){ClassicEditor.create(document.querySelector("#visimisivisi"),{toolbar:["heading","|","bold","italic","link","|","numberedList","bulletedList","|","undo","redo"]}).then(e=>{c=e,console.log("CKEditor Visi siap dipakai!")}).catch(e=>console.error(e)),ClassicEditor.create(document.querySelector("#visimisimisi"),{toolbar:["heading","|","bold","italic","link","|","numberedList","bulletedList","|","undo","redo"]}).then(e=>{o=e,console.log("CKEditor Misi siap dipakai!")}).catch(e=>console.error(e)),i("#visimisiForm").on("submit",function(e){if(e.preventDefault(),!j()){f("Mohon lengkapi semua field yang wajib diisi!","error");return}if(!c||!o){f("Editor belum siap, coba lagi!","error");return}const t=i("#submitBtn"),s=t.html();t.html('<i class="fas fa-spinner fa-spin mr-2"></i>Menyimpan...').prop("disabled",!0);const a=i("#visimisiId").val(),r={visi:c.getData(),misi:o.getData(),_method:a?"PUT":"POST"},n=a?`/admin/visimisi/${a}`:"/admin/visimisi";i.ajax({url:n,type:"POST",data:r,success:function(l){f(l.message,l.status),u("visimisiModal"),t.html(s).prop("disabled",!1),p(i("#searchInputvisimisi").val(),d)},error:function(l){if(t.html(s).prop("disabled",!1),l.status===422&&l.responseJSON.errors){let m=l.responseJSON.errors,b=[];for(let v in m)m.hasOwnProperty(v)&&b.push(m[v].join(", "));f(b.join(" | "),"error")}else{let m=l.responseJSON&&l.responseJSON.message?l.responseJSON.message:"Terjadi kesalahan saat menyimpan data!";f(m,"error")}}})})});i(document).on("click",".edit-btn",function(){x=i(this).data("id"),k(),i("#modalTitle").text("Edit Data Visi Misi"),i("#modalIcon").removeClass("fa-bars fa-bullseye fa-lightbulb").addClass("fa-bullseye"),i("#submitText").text("Update Data"),i("#submitIcon").removeClass("fa-save").addClass("fa-edit"),i.ajax({url:"/admin/visimisi/"+x,type:"GET",success:function(e){i("#visimisiId").val(e.id),c&&c.setData(e.visi||""),o&&o.setData(e.misi||""),$("visimisiModal")},error:function(e){console.error("Gagal ambil data:",e.responseText),alert("Gagal ambil data visimisi")}})});
