import{$ as e}from"./jquery-BvxTx_lq.js";e.ajaxSetup({headers:{"X-CSRF-TOKEN":e('meta[name="csrf-token"]').attr("content")}});e(function(){u()});let c=1;const b=10;function C(t){const a=e("#tableNilai");if(a.empty(),t.length===0){a.append(`
            <tr>
                <td colspan="5" class="px-6 py-10 text-center text-gray-500">
                    <i class="fas fa-info-circle text-gray-300 text-4xl mb-3 block"></i>
                    Tidak ada data ditemukan
                </td>
            </tr>
        `);return}t.forEach((n,s)=>{const i=n.semester?`Semester ${n.semester}`:"-",r=n.tahunakademik?.tahun_akademik||"-",l=`
            <tr class="hover:bg-gray-50 transition-colors duration-200 border-b border-gray-100">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">${s+1}</td>
                
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                        <div class="flex-shrink-0 h-10 w-10">
                            <div class="h-10 w-10 rounded-full bg-gradient-to-r from-blue-600 to-blue-400 flex items-center justify-center text-white font-bold shadow-sm">
                                ${r.charAt(0)}
                            </div>
                        </div>
                        <div class="ml-4">
                            <div class="text-sm font-semibold text-gray-900">${r}</div>
                            <div class="text-xs text-gray-500">Tahun Akademik</div>
                        </div>
                    </div>
                </td>

                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-medium">
                    ${i}
                </td>

                <td class="px-6 py-4 whitespace-nowrap text-sm">
                    <span class="px-2 py-1 bg-gray-100 text-gray-700 font-bold rounded border border-gray-200">
                        ${n.ip_semester||"0.00"}
                    </span>
                </td>

                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button class="edit-btn inline-flex items-center px-3 py-1.5 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all shadow-sm mr-2" 
                        data-id="${n.id}">
                        <i class="fas fa-edit mr-1.5"></i> Edit
                    </button>
                    <button class="delete-btn inline-flex items-center px-3 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all shadow-sm" 
                        data-id="${n.id}" data-name="${i}">
                        <i class="fas fa-trash mr-1.5"></i> Hapus
                    </button>
                </td>
            </tr>
        `;a.append(l)})}function T(t){const a=e("#cardContainer");if(a.empty(),t.length===0){a.append(`
            <div class="p-8 text-center text-gray-500">
                <i class="fas fa-info-circle text-gray-400 text-2xl mb-2 block"></i>
                Tidak ada data ditemukan
            </div>
        `);return}t.forEach(n=>{const s=r=>{const l=parseInt(r);return l>=1&&l<=8?`Semester ${l}`:r||"-"},i=`
            <div class="p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200">
                <div class="flex items-start space-x-4">
                    <div class="flex-shrink-0 h-12 w-12 rounded-full bg-gradient-to-r from-blue-600 to-blue-400 flex items-center justify-center text-white font-bold text-lg shadow-sm">
                        ${n.semester.toString().charAt(0)}
                    </div>
                    
                    <div class="flex-1 min-w-0">
                        <div class="flex items-center justify-between mb-1">
                            <h3 class="text-base font-bold text-gray-900 truncate">
                                ${s(n.semester)}
                            </h3>
                            <span class="px-2.5 py-0.5 text-xs font-bold rounded-full bg-blue-100 text-blue-700 border border-blue-200">
                                IP ${n.ip_semester||"0.00"}
                            </span>
                        </div>
                        
                        <div class="space-y-2">
                            <div class="flex items-center text-sm text-gray-600">
                                <i class="fas fa-calendar-alt w-4 mr-2 text-blue-500"></i>
                                <span>Tahun: ${n.tahunakademik?.tahun_akademik||"-"}</span>
                            </div>
                            
                            <div class="flex space-x-2 pt-2">
                                <button class="edit-btn flex-1 py-2 bg-yellow-500 text-white rounded-lg text-sm font-semibold hover:bg-yellow-600 transition-all shadow-sm" data-id="${n.id}">
                                    <i class="fas fa-edit mr-1"></i> Edit
                                </button>
                                <button class="delete-btn flex-1 py-2 bg-red-500 text-white rounded-lg text-sm font-semibold hover:bg-red-600 transition-all shadow-sm" data-id="${n.id}" data-name="${n.semester}">
                                    <i class="fas fa-trash mr-1"></i> Hapus
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;a.append(i)})}function $(t,a){const n=e("#pagination");if(n.empty(),!(t<=1))for(let s=1;s<=t;s++){const i=e(`<button class="page-btn mx-1 px-3 py-1 rounded-lg border ${s===c?"bg-orange-primary text-white":"bg-white text-gray-700 hover:bg-gray-100"}">${s}</button>`);i.on("click",function(){c=s,u(a,c)}),n.append(i)}}function _(t,a){const n=e("#paginationMobile");if(n.empty(),!(t<=1))for(let s=1;s<=t;s++){const i=e(`<button class="px-3 py-1 rounded-lg border ${s===c?"bg-orange-primary text-white":"bg-white text-gray-700 hover:bg-gray-100"}">${s}</button>`);i.on("click",function(){c=s,u(a,c)}),n.append(i)}}function F(t=""){e.get("/admin/biodata/getmitra",function(a){const n=Array.isArray(a.data)?a.data:[];e("#universitas").empty(),e("#universitas").append('<option value="">Pilih Universitas</option>'),n.forEach(function(s){var i=s.id==t?"selected":"";e("#universitas").append(`<option value="${s.id}" ${i}>${s.nama_mitra}</option>`)})}).fail(function(){alert("Gagal mengambil data tahun akademik. Pastikan API berjalan dengan benar.")})}function v(t=""){e.get("/admin/biodata/gettahunakademik",function(a){const n=Array.isArray(a.data)?a.data:[];e("#tahun_akademik_id").empty(),e("#tahun_akademik_id").append('<option value="">Pilih Tahun Akademik</option>'),console.log(t),n.forEach(function(s){var i=s.id==t?"selected":"";e("#tahun_akademik_id").append(`<option value="${s.id}" ${i}>${s.tahun_akademik}</option>`)})}).fail(function(){alert("Gagal mengambil data tahun akademik. Pastikan API berjalan dengan benar.")})}function u(t="",a=1){e.ajax({url:"/admin/getnilaisemester",type:"GET",data:{search:t,page:a,limit:b},dataType:"json",success:function(n){const s=n.data,i=n.akademik_mahasiswa;if(!Array.isArray(s)){console.error("Response data bukan array:",s);return}C(s),T(s),$(n.last_page,t),_(n.last_page,t),F(i.mitra_id),v(),s.length>0&&s[0].mahasiswa&&e("#mahasiswa_id").val(s[0].mahasiswa.id);let r=(n.current_page-1)*b+1,l=r+s.length-1;e("#resultCount").html(`
                <i class="fas fa-info-circle mr-1"></i>
                Menampilkan ${r} - ${l} dari ${n.total} data
            `)},error:function(n,s,i){console.error("Gagal ambil data:",i,n.responseText)}})}e("#searchInputnilai").on("input",function(){const t=e(this).val();c=1,u(t,c)});function x(){e("#nilaiForm")[0].reset(),e("#nilaiForm input, #nilaiForm select, #nilaiForm textarea").removeClass("border-red-300 bg-red-50"),e("#nilaiForm input, #nilaiForm select").each(function(){e(this).removeClass("border-red-300 bg-red-50"),M(this)}),e("#preview").attr("src",""),e("#previewContainer").addClass("hidden")}function k(t){y(t),I()}function y(t){const a=e("#"+t);a.removeClass("hidden"),setTimeout(()=>{a.find(".modal-content").addClass("show")},10),e("body").addClass("overflow-hidden")}function I(){e("body").css({overflow:"hidden","padding-right":""})}function M(t){const n=e(t).attr("id")+"-error";e("#"+n).remove()}e("#cancelDeleteBtn").on("click",function(){m("deleteModal")});e("#closeModal, #cancelBtn").on("click",function(){m("nilaiModal")});function m(t){S(t),j()}function S(t){const a=e("#"+t);a.find(".modal-content").removeClass("show"),setTimeout(()=>{a.addClass("hidden"),e("body").removeClass("overflow-hidden")},300)}function j(){e("body").css({overflow:"","padding-right":""})}e(".modal-overlay").on("click",function(t){t.target===this&&(e(this).closest("#nilaiModal").length?m("nilaiModal"):e(this).closest("#deleteModal").length&&m("deleteModal"))});function o(t,a="info"){const i=e(`
            <div class="notification flex items-center space-x-3 ${a==="success"?"bg-green-500":a==="error"?"bg-red-500":"bg-blue-500"} text-white px-6 py-4 rounded-xl shadow-lg transform translate-x-full opacity-0 transition-all duration-300 cursor-pointer">
            <i class="fas ${a==="success"?"fa-check-circle":a==="error"?"fa-exclamation-circle":"fa-info-circle"} text-lg"></i>
            <span class="font-medium">${t}</span>
            </div>
            `);e("#notificationWrapper").append(i),setTimeout(()=>{i.removeClass("translate-x-full opacity-0")},100);const r=setTimeout(()=>{i.addClass("translate-x-full opacity-0"),setTimeout(()=>i.remove(),300)},4e3);i.on("click",function(){clearTimeout(r),e(this).addClass("translate-x-full opacity-0"),setTimeout(()=>e(this).remove(),300)})}function E(){let t=!0;return["semester"].forEach(function(n){const s=e("#"+n);!s.val()||!s.val().toString().trim()?(s.addClass("border-red-300 bg-red-50"),t=!1):s.removeClass("border-red-300 bg-red-50")}),t}e("#khsFoto").on("change",function(){const t=this;if(t.files&&t.files[0]){const a=new FileReader;a.onload=function(n){e("#preview").attr("src",n.target.result),e("#previewContainer").removeClass("hidden")},a.readAsDataURL(t.files[0])}});e("#dropzone").on("drop",function(t){t.preventDefault();const a=t.originalEvent.dataTransfer.files;e("#khsFoto")[0].files=a,e("#khsFoto").trigger("change")}).on("dragleave",function(){e(this).removeClass("border-blue-primary bg-blue-50")}).on("drop",function(t){t.preventDefault();const a=t.originalEvent.dataTransfer.files;e("#khsFoto")[0].files=a,e("#khsFoto").trigger("change")});e("#removeFoto").on("click",function(){let t=e("#khsId").val();if(!t){o("ID Alumni tidak ditemukan.");return}e.ajax({url:"/khs/deleteFoto",type:"POST",data:{id:t},success:function(a){a.success?(e("#khsFoto").val(""),e("#previewContainer").addClass("hidden"),e("#preview").attr("src",""),o(a.message,"success")):o("Gagal menghapus foto.")},error:function(){o("Terjadi kesalahan.")}})});let p=null;e("#addSubnilaiBtn").on("click",function(){p=null,x(),e("#nilaiId").val(""),e("#modalTitle").text("Tambah Nilai Baru"),e("#modalIcon").removeClass().addClass("fas fa-newspaper"),e("#submitText").text("Simpan Data"),e("#submitIcon").removeClass("fa-edit").addClass("fa-save"),k("nilaiModal"),e("#nilaiIsparent").val("")});e(function(){e("#nilaiForm").on("submit",function(t){if(t.preventDefault(),!E()){o("Mohon lengkapi semua field yang wajib diisi!","error");return}const a=e("#submitBtn"),n=a.html();a.html('<i class="fas fa-spinner fa-spin mr-2"></i>Menyimpan...').prop("disabled",!0);const s=e("#nilaiId").val(),i=new FormData;i.append("semester",e("#semester").val()),i.append("tahun_akademik_id",e("#tahun_akademik_id").val()),i.append("ip_semester",e("#ip_semester").val()),i.append("mahasiswa_id",e("#mahasiswa_id").val());const r=e("#khsFoto")[0];r.files.length>0?i.append("foto",r.files[0]):i.append("oldFoto",e("#oldFoto").val());const l=s?`/admin/nilaisemester/${s}`:"/admin/nilaisemester",w="POST";s&&i.append("_method","PUT"),e.ajax({url:l,type:w,data:i,processData:!1,contentType:!1,success:function(d){o(d.message,d.status),m("nilaiModal"),a.html(n).prop("disabled",!1),u(e("#searchInputnilai").val(),c)},error:function(d){if(a.html(n).prop("disabled",!1),d.status===422&&d.responseJSON.errors){let f=d.responseJSON.errors,h=[];for(let g in f)f.hasOwnProperty(g)&&h.push(f[g].join(", "));o(h.join(" | "),"error")}else{let f=d.responseJSON&&d.responseJSON.message?d.responseJSON.message:"Terjadi kesalahan saat menyimpan data!";o(f,"error")}}})})});e(document).on("click",".edit-btn",function(){p=e(this).data("id"),x(),e("#modalTitle").text("Edit Data Nilai"),e("#modalIcon").removeClass().addClass("fas fa-graduation-cap"),e("#submitText").text("Update Data"),e("#submitIcon").removeClass("fa-save").addClass("fa-edit"),e.ajax({url:"/admin/nilaisemester/"+p,type:"GET",success:function(t){e("#nilaiId").val(t.id),e("#semester").val(t.semester),e("#ip_semester").val(t.ip_semester),t.khs_file?(e("#preview").attr("src","/"+t.khs_file),e("#previewContainer").removeClass("hidden"),e("#oldFoto").val(t.khs_file)):(e("#preview").attr("src",""),e("#previewContainer").addClass("hidden"),e("#oldFoto").val("")),v(t.tahun_akademik_id),y("nilaiModal")},error:function(t){console.error("Gagal ambil data:",t.responseText),alert("Gagal ambil data nilai")}})});e(document).on("click",".delete-btn",function(){const t=e(this).data("id"),a=e(this).data("name");e("#deletenilaiId").val(t),e("#deleteNilaiName").text(a),k("deleteModal")});e(document).on("click","#confirmDeleteBtn",function(){const t=e(this),a=t.html();t.html('<i class="fas fa-spinner fa-spin mr-2"></i>Menghapus...').prop("disabled",!0);const n=e("#deletenilaiId").val();e.ajax({url:`/admin/nilaisemester/${n}`,type:"DELETE",success:function(s){o(s.message,s.status),m("deleteModal"),u()},error:function(s){let i=s.responseJSON&&s.responseJSON.message?s.responseJSON.message:"Gagal menghapus data!";o(i,"error")},complete:function(){t.html(a).prop("disabled",!1)}})});e("#removeFoto").on("click",function(){let t=e("#nilaiId").val();e.ajax({url:"/nilaisemester/deleteFoto",type:"POST",data:{id:t},success:function(a){a.success?(e("#khsFoto").val(""),e("#previewContainer").addClass("hidden"),e("#preview").attr("src",""),o(a.message,"success")):o("Gagal menghapus foto.")},error:function(){o("Terjadi kesalahan.")}})});e("#semester").on("change",function(){const t=e(this).val();t&&e.ajax({url:"/admin/get-semester-sebelumnya",type:"GET",data:{semester:t},success:function(a){if(a.status===!1){e("#semester").val(""),e("#pengajuandanaIpsemester").val(""),o(a.message,"error");return}a.status===!0&&(o(a.message,"success"),console.log("Semester terakhir:",a.last_semester))},error:function(){e("#pengajuandanaIpsemester").val(""),o("Gagal memvalidasi semester","error")}})});
