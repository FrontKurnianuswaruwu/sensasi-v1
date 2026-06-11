import{$ as e}from"./jquery-CEr4rF5i.js";import"./summernote-lite.min-Dso9tUEj.js";e.ajaxSetup({headers:{"X-CSRF-TOKEN":e('meta[name="csrf-token"]').attr("content")}});e(function(){u()});let l=1;const g=10;function v(t){const s=e("#tableSejarah");if(s.empty(),t.length===0){s.append(`
            <tr>
                <td colspan="5" class="px-6 py-8 text-center text-gray-500">
                    <i class="fas fa-info-circle text-gray-400 mr-2"></i>
                    Tidak ada data ditemukan
                </td>
            </tr>
        `);return}t.forEach((a,r)=>{const i=a.deskripsi?a.deskripsi.replace(/<[^>]+>/g,"").trim():"",o=i?i.charAt(0):"",f=`
            <tr class="hover:bg-gray-50 transition-colors duration-200">
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${r+1}</td>
            <td class="px-6 py-4">
                <div class="flex items-center">
                <div class="flex-shrink-0 h-10 w-10">
                    <div class="h-10 w-10 rounded-full bg-gradient-to-r gradient-bg to-blue-light flex items-center justify-center text-white font-semibold">
                    ${o}
                    </div>
                </div>
                <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">${a.deskripsi||"-"}</div>
                </div>
                </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm">
                <button class="edit-btn px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all mr-2" data-id="${a.id}">
                <i class="fas fa-edit"></i>
                </button>
            </td>
            </tr>
        `;s.append(f)})}function y(t){const s=e("#cardContainer");if(s.empty(),t.length===0){s.append(`
            <div class="p-6 text-center text-gray-500">
                <i class="fas fa-info-circle text-gray-400 mr-2"></i>
                Tidak ada data ditemukan
            </div>
        `);return}t.forEach(a=>{const r=a.deskripsi?a.deskripsi.replace(/<[^>]+>/g,"").trim():"",o=`
            <div class="p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200">
                <div class="flex items-start space-x-3">
                    <div class="flex-shrink-0 h-10 w-10">
                        <div class="h-10 w-10 rounded-full bg-gradient-to-r gradient-bg to-blue-light flex items-center justify-center text-white font-semibold">
                        ${r?r.charAt(0):""}
                        </div>
                    </div>
                    <div class="flex-1 min-w-0">
                        <div class="flex items-center justify-between mb-2">
                        <h3 class="text-lg font-semibold text-gray-900 truncate">${a.deskripsi}</h3>
                    </div>
                    <div class="flex mt-4 space-x-2">
                        <button class="edit-btn flex-1 px-3 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all" data-id="${a.id}">
                        <i class="fas fa-edit"></i> Edit
                        </button>
                    </div>
                    </div>
                    </div>
                </div>
            </div>
        `;s.append(o)})}function k(t,s){const a=e("#pagination");if(a.empty(),!(t<=1))for(let r=1;r<=t;r++){const i=e(`<button class="page-btn mx-1 px-3 py-1 rounded-lg border ${r===l?"bg-orange-primary text-white":"bg-white text-gray-700 hover:bg-gray-100"}">${r}</button>`);i.on("click",function(){l=r,u(s,l)}),a.append(i)}}function j(t,s){const a=e("#paginationMobile");if(a.empty(),!(t<=1))for(let r=1;r<=t;r++){const i=e(`<button class="px-3 py-1 rounded-lg border ${r===l?"bg-orange-primary text-white":"bg-white text-gray-700 hover:bg-gray-100"}">${r}</button>`);i.on("click",function(){l=r,u(s,l)}),a.append(i)}}function u(t="",s=1){e.ajax({url:"/admin/getsejarah",type:"GET",data:{search:t,page:s,limit:g},dataType:"json",success:function(a){const r=a.data;if(!Array.isArray(r)){console.error("Response data bukan array:",r);return}v(r),y(r),k(a.last_page,t),j(a.last_page,t);let i=(a.current_page-1)*g+1,o=i+r.length-1;e("#resultCount").html(`
                <i class="fas fa-info-circle mr-1"></i>
                Menampilkan ${i} - ${o} dari ${a.total} data
            `)},error:function(a,r,i){console.error("Gagal ambil data:",i,a.responseText)}})}e("#searchInputsejarah").on("input",function(){const t=e(this).val();l=1,u(t,l)});function w(){e("#sejarahForm")[0].reset(),e("#sejarahForm input, #sejarahForm select, #sejarahForm textarea").removeClass("border-red-300 bg-red-50"),e("#sejarahForm input, #sejarahForm select").each(function(){e(this).removeClass("border-red-300 bg-red-50"),T(this)}),e("#sejarahDeskripsi").summernote("code","")}function C(t){const s=e("#"+t);s.removeClass("hidden"),setTimeout(()=>{s.find(".modal-content").addClass("show")},10),e("body").addClass("overflow-hidden")}function T(t){const a=e(t).attr("id")+"-error";e("#"+a).remove()}e("#cancelDeleteBtn").on("click",function(){p("deleteModal")});e("#closeModal, #cancelBtn").on("click",function(){p("sejarahModal")});function p(t){$(t),D()}function $(t){const s=e("#"+t);s.find(".modal-content").removeClass("show"),setTimeout(()=>{s.addClass("hidden"),e("body").removeClass("overflow-hidden")},300)}function D(){e("body").css({overflow:"","padding-right":""})}e(".modal-overlay").on("click",function(t){t.target===this&&(e(this).closest("#sejarahModal").length?p("sejarahModal"):e(this).closest("#deleteModal").length&&p("deleteModal"))});function d(t,s="info"){const i=e(`
            <div class="notification flex items-center space-x-3 ${s==="success"?"bg-green-500":s==="error"?"bg-red-500":"bg-blue-500"} text-white px-6 py-4 rounded-xl shadow-lg transform translate-x-full opacity-0 transition-all duration-300 cursor-pointer">
            <i class="fas ${s==="success"?"fa-check-circle":s==="error"?"fa-exclamation-circle":"fa-info-circle"} text-lg"></i>
            <span class="font-medium">${t}</span>
            </div>
            `);e("#notificationWrapper").append(i),setTimeout(()=>{i.removeClass("translate-x-full opacity-0")},100);const o=setTimeout(()=>{i.addClass("translate-x-full opacity-0"),setTimeout(()=>i.remove(),300)},4e3);i.on("click",function(){clearTimeout(o),e(this).addClass("translate-x-full opacity-0"),setTimeout(()=>e(this).remove(),300)})}function M(){let t=!0;const s=e("#sejarahDeskripsi").summernote("code").trim();return(!s||s==="<p><br></p>")&&(d("Deskripsi tidak boleh kosong!","error"),t=!1),t}let b=null;e(function(){function t(s){const a=new FormData;return a.append("upload",s),e.ajax({url:"/admin/ckeditor/upload",type:"POST",data:a,processData:!1,contentType:!1,headers:{"X-CSRF-TOKEN":e('meta[name="csrf-token"]').attr("content")}})}e("#sejarahDeskripsi").summernote({height:300,placeholder:"Masukkan deskripsi sejarah...",toolbar:[["style",["style"]],["font",["bold","italic","underline","clear"]],["color",["color"]],["para",["ul","ol","paragraph"]],["table",["table"]],["insert",["link","picture"]],["view",["fullscreen","codeview","help"]]],callbacks:{onImageUpload:function(s){for(let a=0;a<s.length;a++)t(s[a]).done(function(r){e("#sejarahDeskripsi").summernote("insertImage",r.url)}).fail(function(){d("Upload gambar gagal!","error")})}}}),e("#sejarahForm").on("submit",function(s){if(s.preventDefault(),!M()){d("Mohon lengkapi semua field yang wajib diisi!","error");return}const a=e("#submitBtn"),r=a.html();a.html('<i class="fas fa-spinner fa-spin mr-2"></i>Menyimpan...').prop("disabled",!0);const i=e("#sejarahId").val(),o=new FormData;o.append("deskripsi",e("#sejarahDeskripsi").summernote("code"));const f=i?`/admin/sejarah/${i}`:"/admin/sejarah",x="POST";i&&o.append("_method","PUT"),e.ajax({url:f,type:x,data:o,processData:!1,contentType:!1,success:function(n){d(n.message,n.status),p("sejarahModal"),a.html(r).prop("disabled",!1),u(e("#searchInputsejarah").val(),l)},error:function(n){if(a.html(r).prop("disabled",!1),n.status===422&&n.responseJSON.errors){let c=n.responseJSON.errors,m=[];for(let h in c)c.hasOwnProperty(h)&&m.push(c[h].join(", "));d(m.join(" | "),"error")}else{let c=n.responseJSON&&n.responseJSON.message?n.responseJSON.message:"Terjadi kesalahan saat menyimpan data!";d(c,"error")}}})})});e(document).on("click",".edit-btn",function(){b=e(this).data("id"),w(),e("#modalTitle").text("Edit Data Sejarah"),e("#modalIcon").removeClass("fa-bars").addClass("fa-history"),e("#submitText").text("Update Data"),e("#submitIcon").removeClass("fa-save").addClass("fa-edit"),e.ajax({url:"/admin/sejarah/"+b,type:"GET",success:function(t){e("#sejarahId").val(t.id),e("#sejarahDeskripsi").summernote("code",t.deskripsi||""),C("sejarahModal")},error:function(t){console.error("Gagal ambil data:",t.responseText),alert("Gagal ambil data sejarah")}})});
