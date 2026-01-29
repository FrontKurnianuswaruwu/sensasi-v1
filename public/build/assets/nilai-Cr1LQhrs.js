import{$ as e}from"./jquery-BvxTx_lq.js";e.ajaxSetup({headers:{"X-CSRF-TOKEN":e('meta[name="csrf-token"]').attr("content")}});e(function(){u()});let d=1;const b=10;function C(a){const t=e("#tableNilai");if(t.empty(),a.length===0){t.append(`
            <tr>
                <td colspan="5" class="px-6 py-8 text-center text-gray-500">
                    <i class="fas fa-info-circle text-gray-400 mr-2"></i>
                    Tidak ada data ditemukan
                </td>
            </tr>
        `);return}a.forEach((i,s)=>{const n=c=>{const f=parseInt(c);return f>=1&&f<=8?`Semester ${f}`:c||"-"},r=`
            <tr class="hover:bg-gray-50 transition-colors duration-200">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${s+1}</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <div class="flex items-center">
                            <div class="flex-shrink-0 h-10 w-10">
                            <div class="h-10 w-10 rounded-full bg-gradient-to-r gradient-bg to-blue-light flex items-center justify-center text-white font-semibold">
                            ${i.tahunakademik.tahun_akademik.charAt(0)}
                            </div>
                            </div>
                            <div class="ml-4">
                            <div class="text-sm font-medium text-gray-900">${i.tahunakademik.tahun_akademik}</div>
                            </div>
                        </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${n(i.semester)}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${i.ip_semester||"-"}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm">
                        <button class="edit-btn px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all mr-2" data-id="${i.id}">
                            <i class="fas fa-edit"></i>
                        </button>
                    <button class="delete-btn px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all" data-id="${i.id}" data-name="${i.semester}">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;t.append(r)})}function T(a){const t=e("#cardContainer");if(t.empty(),a.length===0){t.append(`
            <div class="p-6 text-center text-gray-500">
                <i class="fas fa-info-circle text-gray-400 mr-2"></i>
                Tidak ada data ditemukan
            </div>
        `);return}a.forEach(i=>{const s=`
            <div class="p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200">
                <div class="flex items-start space-x-3">
                    <div class="flex-shrink-0 h-12 w-12 rounded-full bg-gradient-to-r gradient-bg to-blue-light flex items-center justify-center text-white font-semibold text-lg">
                        ${i.semester.charAt(0)}
                    </div>
                    <div class="flex-1 min-w-0">
                        <div class="flex items-center justify-between mb-2">
                            <h3 class="text-lg font-semibold text-gray-900 truncate">${i.semester}</h3>
                            <span class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full">
                                ${i.ip_semester||"-"}
                            </span>
                        </div>
                        <div class="space-y-1 text-sm text-gray-600">
                            <div class="flex items-center">
                                <i class="fas fa-calendar-alt w-4 mr-2 text-orange-primary"></i>
                                <span>${i.tahunakademik.tahun_akademik}</span>
                            </div>
                            <div class="flex mt-4 space-x-2">
                                <button class="edit-btn flex-1 px-3 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all" data-id="${i.id}">
                                    <i class="fas fa-edit"></i> Edit
                                </button>
                                <button class="delete-btn flex-1 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all" data-id="${i.id}" data-name="${i.semester}">
                                    <i class="fas fa-trash"></i> Hapus
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;t.append(s)})}function $(a,t){const i=e("#pagination");if(i.empty(),!(a<=1))for(let s=1;s<=a;s++){const n=e(`<button class="page-btn mx-1 px-3 py-1 rounded-lg border ${s===d?"bg-orange-primary text-white":"bg-white text-gray-700 hover:bg-gray-100"}">${s}</button>`);n.on("click",function(){d=s,u(t,d)}),i.append(n)}}function _(a,t){const i=e("#paginationMobile");if(i.empty(),!(a<=1))for(let s=1;s<=a;s++){const n=e(`<button class="px-3 py-1 rounded-lg border ${s===d?"bg-orange-primary text-white":"bg-white text-gray-700 hover:bg-gray-100"}">${s}</button>`);n.on("click",function(){d=s,u(t,d)}),i.append(n)}}function F(a=""){e.get("/admin/biodata/getmitra",function(t){const i=Array.isArray(t.data)?t.data:[];e("#universitas").empty(),e("#universitas").append('<option value="">Pilih Universitas</option>'),i.forEach(function(s){var n=s.id==a?"selected":"";e("#universitas").append(`<option value="${s.id}" ${n}>${s.nama_mitra}</option>`)})}).fail(function(){alert("Gagal mengambil data tahun akademik. Pastikan API berjalan dengan benar.")})}function x(a=""){e.get("/admin/biodata/gettahunakademik",function(t){const i=Array.isArray(t.data)?t.data:[];e("#tahun_akademik_id").empty(),e("#tahun_akademik_id").append('<option value="">Pilih Tahun Akademik</option>'),console.log(a),i.forEach(function(s){var n=s.id==a?"selected":"";e("#tahun_akademik_id").append(`<option value="${s.id}" ${n}>${s.tahun_akademik}</option>`)})}).fail(function(){alert("Gagal mengambil data tahun akademik. Pastikan API berjalan dengan benar.")})}function u(a="",t=1){e.ajax({url:"/admin/getnilaisemester",type:"GET",data:{search:a,page:t,limit:b},dataType:"json",success:function(i){const s=i.data,n=i.akademik_mahasiswa;if(!Array.isArray(s)){console.error("Response data bukan array:",s);return}C(s),T(s),$(i.last_page,a),_(i.last_page,a),F(n.mitra_id),x(),s.length>0&&s[0].mahasiswa&&e("#mahasiswa_id").val(s[0].mahasiswa.id);let r=(i.current_page-1)*b+1,c=r+s.length-1;e("#resultCount").html(`
                <i class="fas fa-info-circle mr-1"></i>
                Menampilkan ${r} - ${c} dari ${i.total} data
            `)},error:function(i,s,n){console.error("Gagal ambil data:",n,i.responseText)}})}e("#searchInputnilai").on("input",function(){const a=e(this).val();d=1,u(a,d)});function k(){e("#nilaiForm")[0].reset(),e("#nilaiForm input, #nilaiForm select, #nilaiForm textarea").removeClass("border-red-300 bg-red-50"),e("#nilaiForm input, #nilaiForm select").each(function(){e(this).removeClass("border-red-300 bg-red-50"),M(this)}),e("#preview").attr("src",""),e("#previewContainer").addClass("hidden")}function y(a){w(a),I()}function w(a){const t=e("#"+a);t.removeClass("hidden"),setTimeout(()=>{t.find(".modal-content").addClass("show")},10),e("body").addClass("overflow-hidden")}function I(){e("body").css({overflow:"hidden","padding-right":""})}function M(a){const i=e(a).attr("id")+"-error";e("#"+i).remove()}e("#cancelDeleteBtn").on("click",function(){m("deleteModal")});e("#closeModal, #cancelBtn").on("click",function(){m("nilaiModal")});function m(a){j(a),S()}function j(a){const t=e("#"+a);t.find(".modal-content").removeClass("show"),setTimeout(()=>{t.addClass("hidden"),e("body").removeClass("overflow-hidden")},300)}function S(){e("body").css({overflow:"","padding-right":""})}e(".modal-overlay").on("click",function(a){a.target===this&&(e(this).closest("#nilaiModal").length?m("nilaiModal"):e(this).closest("#deleteModal").length&&m("deleteModal"))});function o(a,t="info"){const n=e(`
            <div class="notification flex items-center space-x-3 ${t==="success"?"bg-green-500":t==="error"?"bg-red-500":"bg-blue-500"} text-white px-6 py-4 rounded-xl shadow-lg transform translate-x-full opacity-0 transition-all duration-300 cursor-pointer">
            <i class="fas ${t==="success"?"fa-check-circle":t==="error"?"fa-exclamation-circle":"fa-info-circle"} text-lg"></i>
            <span class="font-medium">${a}</span>
            </div>
            `);e("#notificationWrapper").append(n),setTimeout(()=>{n.removeClass("translate-x-full opacity-0")},100);const r=setTimeout(()=>{n.addClass("translate-x-full opacity-0"),setTimeout(()=>n.remove(),300)},4e3);n.on("click",function(){clearTimeout(r),e(this).addClass("translate-x-full opacity-0"),setTimeout(()=>e(this).remove(),300)})}function E(){let a=!0;return["semester"].forEach(function(i){const s=e("#"+i);!s.val()||!s.val().toString().trim()?(s.addClass("border-red-300 bg-red-50"),a=!1):s.removeClass("border-red-300 bg-red-50")}),a}e("#khsFoto").on("change",function(){const a=this;if(a.files&&a.files[0]){const t=new FileReader;t.onload=function(i){e("#preview").attr("src",i.target.result),e("#previewContainer").removeClass("hidden")},t.readAsDataURL(a.files[0])}});e("#dropzone").on("drop",function(a){a.preventDefault();const t=a.originalEvent.dataTransfer.files;e("#khsFoto")[0].files=t,e("#khsFoto").trigger("change")}).on("dragleave",function(){e(this).removeClass("border-blue-primary bg-blue-50")}).on("drop",function(a){a.preventDefault();const t=a.originalEvent.dataTransfer.files;e("#khsFoto")[0].files=t,e("#khsFoto").trigger("change")});e("#removeFoto").on("click",function(){let a=e("#khsId").val();if(!a){o("ID Alumni tidak ditemukan.");return}e.ajax({url:"/khs/deleteFoto",type:"POST",data:{id:a},success:function(t){t.success?(e("#khsFoto").val(""),e("#previewContainer").addClass("hidden"),e("#preview").attr("src",""),o(t.message,"success")):o("Gagal menghapus foto.")},error:function(){o("Terjadi kesalahan.")}})});let h=null;e("#addSubnilaiBtn").on("click",function(){h=null,k(),e("#nilaiId").val(""),e("#modalTitle").text("Tambah Nilai Baru"),e("#modalIcon").removeClass().addClass("fas fa-newspaper"),e("#submitText").text("Simpan Data"),e("#submitIcon").removeClass("fa-edit").addClass("fa-save"),y("nilaiModal"),e("#nilaiIsparent").val("")});e(function(){e("#nilaiForm").on("submit",function(a){if(a.preventDefault(),!E()){o("Mohon lengkapi semua field yang wajib diisi!","error");return}const t=e("#submitBtn"),i=t.html();t.html('<i class="fas fa-spinner fa-spin mr-2"></i>Menyimpan...').prop("disabled",!0);const s=e("#nilaiId").val(),n=new FormData;n.append("semester",e("#semester").val()),n.append("tahun_akademik_id",e("#tahun_akademik_id").val()),n.append("ip_semester",e("#ip_semester").val()),n.append("mahasiswa_id",e("#mahasiswa_id").val());const r=e("#khsFoto")[0];r.files.length>0?n.append("foto",r.files[0]):n.append("oldFoto",e("#oldFoto").val());const c=s?`/admin/nilaisemester/${s}`:"/admin/nilaisemester",f="POST";s&&n.append("_method","PUT"),e.ajax({url:c,type:f,data:n,processData:!1,contentType:!1,success:function(l){o(l.message,l.status),m("nilaiModal"),t.html(i).prop("disabled",!1),u(e("#searchInputnilai").val(),d)},error:function(l){if(t.html(i).prop("disabled",!1),l.status===422&&l.responseJSON.errors){let p=l.responseJSON.errors,g=[];for(let v in p)p.hasOwnProperty(v)&&g.push(p[v].join(", "));o(g.join(" | "),"error")}else{let p=l.responseJSON&&l.responseJSON.message?l.responseJSON.message:"Terjadi kesalahan saat menyimpan data!";o(p,"error")}}})})});e(document).on("click",".edit-btn",function(){h=e(this).data("id"),k(),e("#modalTitle").text("Edit Data Nilai"),e("#modalIcon").removeClass().addClass("fas fa-graduation-cap"),e("#submitText").text("Update Data"),e("#submitIcon").removeClass("fa-save").addClass("fa-edit"),e.ajax({url:"/admin/nilaisemester/"+h,type:"GET",success:function(a){e("#nilaiId").val(a.id),e("#semester").val(a.semester),e("#ip_semester").val(a.ip_semester),a.khs_file?(e("#preview").attr("src","/"+a.khs_file),e("#previewContainer").removeClass("hidden"),e("#oldFoto").val(a.khs_file)):(e("#preview").attr("src",""),e("#previewContainer").addClass("hidden"),e("#oldFoto").val("")),x(a.tahun_akademik_id),w("nilaiModal")},error:function(a){console.error("Gagal ambil data:",a.responseText),alert("Gagal ambil data nilai")}})});e(document).on("click",".delete-btn",function(){const a=e(this).data("id"),t=e(this).data("name");e("#deletenilaiId").val(a),e("#deleteNilaiName").text(t),y("deleteModal")});e(document).on("click","#confirmDeleteBtn",function(){const a=e(this),t=a.html();a.html('<i class="fas fa-spinner fa-spin mr-2"></i>Menghapus...').prop("disabled",!0);const i=e("#deletenilaiId").val();e.ajax({url:`/admin/nilaisemester/${i}`,type:"DELETE",success:function(s){o(s.message,s.status),m("deleteModal"),u()},error:function(s){let n=s.responseJSON&&s.responseJSON.message?s.responseJSON.message:"Gagal menghapus data!";o(n,"error")},complete:function(){a.html(t).prop("disabled",!1)}})});e("#removeFoto").on("click",function(){let a=e("#nilaiId").val();e.ajax({url:"/nilaisemester/deleteFoto",type:"POST",data:{id:a},success:function(t){t.success?(e("#khsFoto").val(""),e("#previewContainer").addClass("hidden"),e("#preview").attr("src",""),o(t.message,"success")):o("Gagal menghapus foto.")},error:function(){o("Terjadi kesalahan.")}})});e("#semester").on("change",function(){const a=e(this).val();a&&e.ajax({url:"/admin/get-semester-sebelumnya",type:"GET",data:{semester:a},success:function(t){if(t.status===!1){e("#semester").val(""),e("#pengajuandanaIpsemester").val(""),o(t.message,"error");return}t.status===!0&&(o(t.message,"success"),console.log("Semester terakhir:",t.last_semester))},error:function(){e("#pengajuandanaIpsemester").val(""),o("Gagal memvalidasi semester","error")}})});
