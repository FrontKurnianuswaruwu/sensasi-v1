import{$ as e}from"./jquery-BvxTx_lq.js";e.ajaxSetup({headers:{"X-CSRF-TOKEN":e('meta[name="csrf-token"]').attr("content")}});e(function(){u()});let d=1;const b=10;function y(t){const a=e("#tableSejarah");if(a.empty(),t.length===0){a.append(`
            <tr>
                <td colspan="5" class="px-6 py-8 text-center text-gray-500">
                    <i class="fas fa-info-circle text-gray-400 mr-2"></i>
                    Tidak ada data ditemukan
                </td>
            </tr>
        `);return}t.forEach((r,s)=>{const i=r.deskripsi?r.deskripsi.replace(/<[^>]+>/g,"").trim():"",o=i?i.charAt(0):"",c=`
            <tr class="hover:bg-gray-50 transition-colors duration-200">
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${s+1}</td>
            <td class="px-6 py-4">
                <div class="flex items-center">
                <div class="flex-shrink-0 h-10 w-10">
                    <div class="h-10 w-10 rounded-full bg-gradient-to-r gradient-bg to-blue-light flex items-center justify-center text-white font-semibold">
                    ${o}
                    </div>
                </div>
                <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">${r.deskripsi||"-"}</div>
                </div>
                </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm">
                <button class="edit-btn px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all mr-2" data-id="${r.id}">
                <i class="fas fa-edit"></i>
                </button>
            </td>
            </tr>
        `;a.append(c)})}function w(t){const a=e("#cardContainer");if(a.empty(),t.length===0){a.append(`
            <div class="p-6 text-center text-gray-500">
                <i class="fas fa-info-circle text-gray-400 mr-2"></i>
                Tidak ada data ditemukan
            </div>
        `);return}t.forEach(r=>{const s=r.deskripsi?r.deskripsi.replace(/<[^>]+>/g,"").trim():"",o=`
            <div class="p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200">
                <div class="flex items-start space-x-3">
                    <div class="flex-shrink-0 h-10 w-10">
                        <div class="h-10 w-10 rounded-full bg-gradient-to-r gradient-bg to-blue-light flex items-center justify-center text-white font-semibold">
                        ${s?s.charAt(0):""}
                        </div>
                    </div>
                    <div class="flex-1 min-w-0">
                        <div class="flex items-center justify-between mb-2">
                        <h3 class="text-lg font-semibold text-gray-900 truncate">${r.deskripsi}</h3>
                    </div>
                    <div class="flex mt-4 space-x-2">
                        <button class="edit-btn flex-1 px-3 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all" data-id="${r.id}">
                        <i class="fas fa-edit"></i> Edit
                        </button>
                    </div>
                    </div>
                    </div>
                </div>
            </div>
        `;a.append(o)})}function C(t,a){const r=e("#pagination");if(r.empty(),!(t<=1))for(let s=1;s<=t;s++){const i=e(`<button class="page-btn mx-1 px-3 py-1 rounded-lg border ${s===d?"bg-orange-primary text-white":"bg-white text-gray-700 hover:bg-gray-100"}">${s}</button>`);i.on("click",function(){d=s,u(a,d)}),r.append(i)}}function j(t,a){const r=e("#paginationMobile");if(r.empty(),!(t<=1))for(let s=1;s<=t;s++){const i=e(`<button class="px-3 py-1 rounded-lg border ${s===d?"bg-orange-primary text-white":"bg-white text-gray-700 hover:bg-gray-100"}">${s}</button>`);i.on("click",function(){d=s,u(a,d)}),r.append(i)}}function u(t="",a=1){e.ajax({url:"/admin/getsejarah",type:"GET",data:{search:t,page:a,limit:b},dataType:"json",success:function(r){const s=r.data;if(!Array.isArray(s)){console.error("Response data bukan array:",s);return}y(s),w(s),C(r.last_page,t),j(r.last_page,t);let i=(r.current_page-1)*b+1,o=i+s.length-1;e("#resultCount").html(`
                <i class="fas fa-info-circle mr-1"></i>
                Menampilkan ${i} - ${o} dari ${r.total} data
            `)},error:function(r,s,i){console.error("Gagal ambil data:",i,r.responseText)}})}e("#searchInputsejarah").on("input",function(){const t=e(this).val();d=1,u(t,d)});function k(){e("#sejarahForm")[0].reset(),e("#sejarahForm input, #sejarahForm select, #sejarahForm textarea").removeClass("border-red-300 bg-red-50"),e("#sejarahForm input, #sejarahForm select").each(function(){e(this).removeClass("border-red-300 bg-red-50"),$(this)}),e("#preview").attr("src",""),e("#previewContainer").addClass("hidden")}function T(t){const a=e("#"+t);a.removeClass("hidden"),setTimeout(()=>{a.find(".modal-content").addClass("show")},10),e("body").addClass("overflow-hidden")}function $(t){const r=e(t).attr("id")+"-error";e("#"+r).remove()}e("#cancelDeleteBtn").on("click",function(){f("deleteModal")});e("#closeModal, #cancelBtn").on("click",function(){f("sejarahModal")});function f(t){D(t),F()}function D(t){const a=e("#"+t);a.find(".modal-content").removeClass("show"),setTimeout(()=>{a.addClass("hidden"),e("body").removeClass("overflow-hidden")},300)}function F(){e("body").css({overflow:"","padding-right":""})}e(".modal-overlay").on("click",function(t){t.target===this&&(e(this).closest("#sejarahModal").length?f("sejarahModal"):e(this).closest("#deleteModal").length&&f("deleteModal"))});function m(t,a="info"){const i=e(`
            <div class="notification flex items-center space-x-3 ${a==="success"?"bg-green-500":a==="error"?"bg-red-500":"bg-blue-500"} text-white px-6 py-4 rounded-xl shadow-lg transform translate-x-full opacity-0 transition-all duration-300 cursor-pointer">
            <i class="fas ${a==="success"?"fa-check-circle":a==="error"?"fa-exclamation-circle":"fa-info-circle"} text-lg"></i>
            <span class="font-medium">${t}</span>
            </div>
            `);e("#notificationWrapper").append(i),setTimeout(()=>{i.removeClass("translate-x-full opacity-0")},100);const o=setTimeout(()=>{i.addClass("translate-x-full opacity-0"),setTimeout(()=>i.remove(),300)},4e3);i.on("click",function(){clearTimeout(o),e(this).addClass("translate-x-full opacity-0"),setTimeout(()=>e(this).remove(),300)})}function E(){let t=!0;return p.getData().trim()?e("#sejarahDeskripsi").next(".ck-editor").removeClass("border border-red-300 bg-red-50"):(e("#sejarahDeskripsi").next(".ck-editor").addClass("border border-red-300 bg-red-50 rounded"),t=!1),t}e("#sejarahFoto").on("change",function(){const t=this;if(t.files&&t.files[0]){const a=new FileReader;a.onload=function(r){e("#preview").attr("src",r.target.result),e("#previewContainer").removeClass("hidden")},a.readAsDataURL(t.files[0])}});e("#sejarahFoto").on("change",function(){const t=this.files,a=e("#previewList");a.empty(),t.length>0?(e("#previewContainer").removeClass("hidden"),Array.from(t).forEach((r,s)=>{const i=new FileReader;i.onload=function(o){const c=e(`
                    <div class="relative">
                        <img src="${o.target.result}" class="w-32 h-32 object-cover rounded-lg shadow-md border" />
                        <button type="button" data-index="${s}" class="removeBtn absolute top-1 right-1 bg-red-500 text-white text-xs px-1 rounded hover:bg-red-600">X</button>
                    </div>
                `);a.append(c)},i.readAsDataURL(r)})):e("#previewContainer").addClass("hidden")});e(document).on("click",".removeBtn",function(){const t=e(this).data("index"),a=document.getElementById("sejarahFoto"),r=new DataTransfer;Array.from(a.files).forEach((s,i)=>{i!==t&&r.items.add(s)}),a.files=r.files,e(this).parent().remove(),a.files.length===0&&e("#previewContainer").addClass("hidden")});e("#dropzone").on("drop",function(t){t.preventDefault();const a=t.originalEvent.dataTransfer.files;e("#sejarahFoto")[0].files=a,e("#sejarahFoto").trigger("change")}).on("dragleave",function(){e(this).removeClass("border-blue-primary bg-blue-50")}).on("dragover",function(t){t.preventDefault(),e(this).addClass("border-blue-primary bg-blue-50")});let p,v=null;e(function(){ClassicEditor.create(document.querySelector("#sejarahDeskripsi")).then(t=>{p=t,console.log("CKEditor siap dipakai!")}).catch(t=>{console.error(t)}),e("#sejarahForm").on("submit",function(t){if(t.preventDefault(),!E()){m("Mohon lengkapi semua field yang wajib diisi!","error");return}const a=e("#submitBtn"),r=a.html();a.html('<i class="fas fa-spinner fa-spin mr-2"></i>Menyimpan...').prop("disabled",!0);const s=e("#sejarahId").val(),i=new FormData;i.append("deskripsi",p.getData());const o=e("#sejarahFoto")[0];o.files.length>0?Array.from(o.files).forEach((n,l)=>{i.append("foto[]",n)}):i.append("oldFoto",e("#oldFoto").val());const c=s?`/admin/sejarah/${s}`:"/admin/sejarah",x="POST";s&&i.append("_method","PUT"),e.ajax({url:c,type:x,data:i,processData:!1,contentType:!1,success:function(n){m(n.message,n.status),f("sejarahModal"),a.html(r).prop("disabled",!1),u(e("#searchInputsejarah").val(),d)},error:function(n){if(a.html(r).prop("disabled",!1),n.status===422&&n.responseJSON.errors){let l=n.responseJSON.errors,h=[];for(let g in l)l.hasOwnProperty(g)&&h.push(l[g].join(", "));m(h.join(" | "),"error")}else{let l=n.responseJSON&&n.responseJSON.message?n.responseJSON.message:"Terjadi kesalahan saat menyimpan data!";m(l,"error")}}})})});e(document).on("click",".edit-btn",function(){v=e(this).data("id"),k(),e("#modalTitle").text("Edit Data Sejarah"),e("#modalIcon").removeClass("fa-bars").addClass("fa-history"),e("#submitText").text("Update Data"),e("#submitIcon").removeClass("fa-save").addClass("fa-edit"),e.ajax({url:"/admin/sejarah/"+v,type:"GET",success:function(t){e("#sejarahId").val(t.id),p?p.setData(t.deskripsi||""):e("#sejarahDeskripsi").val(t.deskripsi);const a=e("#previewList");a.empty(),t.fotos&&t.fotos.length>0?(e("#previewContainer").removeClass("hidden"),t.fotos.forEach(function(r){const s=e(`
                        <div class="relative">
                            <img src="/${r.foto}"
                                class="w-32 h-32 object-cover rounded-lg shadow-md border" />
                        </div>
                    `);a.append(s)})):e("#previewContainer").addClass("hidden"),T("sejarahModal")},error:function(t){console.error("Gagal ambil data:",t.responseText),alert("Gagal ambil data sejarah")}})});
