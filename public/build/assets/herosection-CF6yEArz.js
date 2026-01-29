import{$ as e}from"./jquery-BvxTx_lq.js";e.ajaxSetup({headers:{"X-CSRF-TOKEN":e('meta[name="csrf-token"]').attr("content")}});e(function(){f()});let r=1;const b=10;function k(t){const o=e("#tableHerosection");if(o.empty(),t.length===0){o.append(`
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
            <td class="px-6 py-4 text-sm text-gray-900">
                ${a.deskripsi}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm">
                <button class="edit-btn px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all mr-2" data-id="${a.id}">
                    <i class="fas fa-edit"></i>
                </button>
            </td>
            </tr>
        `;o.append(s)})}function T(t){const o=e("#cardContainer");if(o.empty(),t.length===0){o.append(`
            <div class="p-6 text-center text-gray-500">
                <i class="fas fa-info-circle text-gray-400 mr-2"></i>
                Tidak ada data ditemukan
            </div>
        `);return}t.forEach(a=>{const n=`
            <div class="p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200">
            <div class="flex items-start space-x-3">
            <div class="flex-shrink-0 h-12 w-12 rounded-full bg-gradient-to-r gradient-bg to-blue-light flex items-center justify-center text-white font-semibold text-lg">
            ${a.name.charAt(0)}
            </div>
            <div class="flex-1 min-w-0">
            <div class="flex items-center justify-between mb-2">
                <h3 class="text-lg font-semibold text-gray-900 truncate">${a.name}</h3>
            </div>
            <div class="space-y-1 text-sm text-gray-600">
                <div class="flex items-center">
                <i class="fas fa-user-tie w-4 mr-2 text-orange-primary"></i>
                <span class="truncate">${a.deksripsi||"-"}</span>
                </div>
                <div class="flex mt-4 space-x-2">
                <button class="edit-btn flex-1 px-3 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all" data-id="${a.id}">
                <i class="fas fa-edit"></i> Edit
                </button>
                <button class="delete-btn flex-1 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all" data-id="${a.id}" data-name="${a.nama_herosection}">
                <i class="fas fa-trash"></i> Hapus
                </button>
                </div>
            </div>
            </div>
            </div>
            </div>
        `;o.append(n)})}function $(t,o){const a=e("#pagination");if(a.empty(),!(t<=1))for(let n=1;n<=t;n++){const s=e(`<button class="page-btn mx-1 px-3 py-1 rounded-lg border ${n===r?"bg-orange-primary text-white":"bg-white text-gray-700 hover:bg-gray-100"}">${n}</button>`);s.on("click",function(){r=n,f(o,r)}),a.append(s)}}function E(t,o){const a=e("#paginationMobile");if(a.empty(),!(t<=1))for(let n=1;n<=t;n++){const s=e(`<button class="px-3 py-1 rounded-lg border ${n===r?"bg-orange-primary text-white":"bg-white text-gray-700 hover:bg-gray-100"}">${n}</button>`);s.on("click",function(){r=n,f(o,r)}),a.append(s)}}function f(t="",o=1){e.ajax({url:"/admin/getherosection",type:"GET",data:{search:t,page:o,limit:b},dataType:"json",success:function(a){const n=a.data;if(!Array.isArray(n)){console.error("Response data bukan array:",n);return}k(n),T(n),$(a.last_page,t),E(a.last_page,t);let s=(a.current_page-1)*b+1,c=s+n.length-1;e("#resultCount").html(`
                <i class="fas fa-info-circle mr-1"></i>
                Menampilkan ${s} - ${c} dari ${a.total} data
            `)},error:function(a,n,s){console.error("Gagal ambil data:",s,a.responseText)}})}e("#searchInputherosection").on("input",function(){const t=e(this).val();r=1,f(t,r)});function v(){e("#herosectionForm")[0].reset(),e("#herosectionForm input, #herosectionForm select, #herosectionForm textarea").removeClass("border-red-300 bg-red-50"),e("#herosectionForm input, #herosectionForm select").each(function(){e(this).removeClass("border-red-300 bg-red-50"),M(this)}),typeof l<"u"&&l?l.setData(""):e("#herosectionDescription").val(""),e("#preview").attr("src",""),e("#previewContainer").addClass("hidden")}function x(t){y(t),D()}function y(t){const o=e("#"+t);o.removeClass("hidden"),setTimeout(()=>{o.find(".modal-content").addClass("show")},10),e("body").addClass("overflow-hidden")}function D(){e("body").css({overflow:"hidden","padding-right":""})}function M(t){const a=e(t).attr("id")+"-error";e("#"+a).remove()}e("#cancelDeleteBtn").on("click",function(){u("deleteModal")});e("#closeModal, #cancelBtn").on("click",function(){u("herosectionModal")});function u(t){F(t),S()}function F(t){const o=e("#"+t);o.find(".modal-content").removeClass("show"),setTimeout(()=>{o.addClass("hidden"),e("body").removeClass("overflow-hidden")},300)}function S(){e("body").css({overflow:"","padding-right":""})}e(".modal-overlay").on("click",function(t){t.target===this&&(e(this).closest("#herosectionModal").length?u("herosectionModal"):e(this).closest("#deleteModal").length&&u("deleteModal"))});function d(t,o="info"){const s=e(`
            <div class="notification flex items-center space-x-3 ${o==="success"?"bg-green-500":o==="error"?"bg-red-500":"bg-blue-500"} text-white px-6 py-4 rounded-xl shadow-lg transform translate-x-full opacity-0 transition-all duration-300 cursor-pointer">
            <i class="fas ${o==="success"?"fa-check-circle":o==="error"?"fa-exclamation-circle":"fa-info-circle"} text-lg"></i>
            <span class="font-medium">${t}</span>
            </div>
            `);e("#notificationWrapper").append(s),setTimeout(()=>{s.removeClass("translate-x-full opacity-0")},100);const c=setTimeout(()=>{s.addClass("translate-x-full opacity-0"),setTimeout(()=>s.remove(),300)},4e3);s.on("click",function(){clearTimeout(c),e(this).addClass("translate-x-full opacity-0"),setTimeout(()=>e(this).remove(),300)})}function I(){let t=!0;return["herosectionName"].forEach(function(a){const n=e("#"+a);!n.val()||!n.val().toString().trim()?(n.addClass("border-red-300 bg-red-50"),t=!1):n.removeClass("border-red-300 bg-red-50")}),t}let l,m=null;e("#addSubherosectionBtn").on("click",function(){m=null,v(),e("#herosectionId").val(""),e("#modalTitle").text("Tambah Herosection Baru"),e("#modalIcon").removeClass().addClass("fas fa-plus-circle"),e("#submitText").text("Simpan Data"),e("#submitIcon").removeClass("fa-edit").addClass("fa-save"),x("herosectionModal"),e("#herosectionIsparent").val("")});e(function(){ClassicEditor.create(document.querySelector("#herosectionDescription")).then(t=>{l=t,console.log("CKEditor siap dipakai!")}).catch(t=>{console.error(t)}),e("#herosectionForm").on("submit",function(t){if(t.preventDefault(),!I()){d("Mohon lengkapi semua field yang wajib diisi!","error");return}if(!l){d("Editor belum siap, coba lagi!","error");return}const o=e("#submitBtn"),a=o.html();o.html('<i class="fas fa-spinner fa-spin mr-2"></i>Menyimpan...').prop("disabled",!0);const n=e("#herosectionId").val(),s=new FormData;s.append("name",e("#herosectionName").val()),s.append("deskripsi",l.getData());let c=e("#herosectionFoto")[0].files;for(let i=0;i<c.length;i++)s.append("gambar[]",c[i]);const w=n?`/admin/herosection/${n}`:"/admin/herosection",C="POST";n&&s.append("_method","PUT"),e.ajax({url:w,type:C,data:s,processData:!1,contentType:!1,success:function(i){d(i.message,i.status),u("herosectionModal"),o.html(a).prop("disabled",!1),f(e("#searchInputmenu").val(),r)},error:function(i){if(o.html(a).prop("disabled",!1),i.status===422&&i.responseJSON.errors){let p=i.responseJSON.errors,h=[];for(let g in p)p.hasOwnProperty(g)&&h.push(p[g].join(", "));d(h.join(" | "),"error")}else{let p=i.responseJSON&&i.responseJSON.message?i.responseJSON.message:"Terjadi kesalahan saat menyimpan data!";d(p,"error")}}})})});e(document).on("click",".edit-btn",function(){m=e(this).data("id"),v(),e("#modalTitle").text("Edit Data Herosection"),e("#modalIcon").removeClass("fa-bars").addClass("fa-edit"),e("#submitText").text("Update Data"),e("#submitIcon").removeClass("fa-save").addClass("fa-edit"),e.ajax({url:"/admin/herosection/"+m,type:"GET",success:function(t){const o=t.data;e("#herosectionId").val(o.id),e("#herosectionName").val(o.name),l?l.setData(o.deskripsi||""):e("#herosectionDescription").val(o.deskripsi),e("#previewList").html(""),o.herophotos&&o.herophotos.length>0&&(o.herophotos.forEach(a=>{e("#previewList").append(`
                        <div class="relative inline-block m-2">
                            <img src="/uploads/herosection/${a.foto}"
                                class="w-28 h-28 object-cover rounded-lg shadow border" />

                            <button type="button"
                                class="deleteOld absolute top-1 right-1 bg-red-500 text-white text-xs px-1 rounded"
                                data-id="${a.id}">
                                X
                            </button>
                        </div>
                    `)}),e("#previewContainer").removeClass("hidden")),y("herosectionModal")},error:function(t){console.error("Gagal ambil data:",t.responseText),alert("Gagal ambil data herosection")}})});e(document).on("click",".delete-btn",function(){const t=e(this).data("id"),o=e(this).data("name");e("#deleteherosectionId").val(t),e("#deleteHerosectionName").text(o),x("deleteModal")});e(document).on("click","#confirmDeleteBtn",function(){const t=e(this),o=t.html();t.html('<i class="fas fa-spinner fa-spin mr-2"></i>Menghapus...').prop("disabled",!0);const a=e("#deleteherosectionId").val();e.ajax({url:`/admin/herosection/${a}`,type:"DELETE",success:function(n){d(n.message,n.status),u("deleteModal"),f()},error:function(n){let s=n.responseJSON&&n.responseJSON.message?n.responseJSON.message:"Gagal menghapus data!";d(s,"error")},complete:function(){t.html(o).prop("disabled",!1)}})});e("#herosectionFoto").on("change",function(){const t=this.files;e("#previewContainer").removeClass("hidden"),Array.from(t).forEach((o,a)=>{const n=new FileReader;n.onload=function(s){e("#previewList").append(`
                <div class="relative inline-block m-2 new-photo" data-index="${a}">
                    <img src="${s.target.result}" class="w-28 h-28 object-cover rounded-lg shadow border" />
                    <button type="button" class="removeSingle absolute top-1 right-1 bg-red-500 text-white text-xs px-1 rounded" data-index="${a}">
                        X
                    </button>
                </div>
            `)},n.readAsDataURL(o)})});e("#dropzone").on("dragover",function(t){t.preventDefault(),e(this).addClass("border-blue-primary bg-blue-50")}).on("dragleave",function(){e(this).removeClass("border-blue-primary bg-blue-50")}).on("drop",function(t){t.preventDefault(),e(this).removeClass("border-blue-primary bg-blue-50");let o=t.originalEvent.dataTransfer.files;e("#herosectionFoto")[0].files=o,e("#herosectionFoto").trigger("change")});e(document).on("click",".removeSingle",function(){const t=e(this).data("index");let o=e("#herosectionFoto")[0],a=new DataTransfer;Array.from(o.files).forEach((n,s)=>{s!==t&&a.items.add(n)}),o.files=a.files,e(this).parent().remove()});e(document).on("click",".deleteOld",function(){let t=e(this).data("id");e.ajax({url:"/admin/herophoto/"+t,type:"DELETE",data:{_token:e('meta[name="csrf-token"]').attr("content")},success:function(){e("button[data-id='"+t+"']").parent().remove()}})});
