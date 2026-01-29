import{$ as e}from"./jquery-BvxTx_lq.js";e.ajaxSetup({headers:{"X-CSRF-TOKEN":e('meta[name="csrf-token"]').attr("content")}});e(function(){u()});function c(a){if(!a)return"";let s=a.toString().replace(/[^,\d]/g,"").split(","),t=s[0].length%3,o=s[0].substr(0,t),i=s[0].substr(t).match(/\d{3}/gi);return i&&(o+=(t?".":"")+i.join(".")),o=s[1]!==void 0?o+","+s[1]:o,"Rp "+o}let m=1;const b=10;function T(a,n){const s=e("#tablePengajuandana");if(s.empty(),console.log(n),a.length===0){s.append(`
            <tr>
                <td colspan="8" class="px-6 py-8 text-center text-gray-500">
                    <i class="fas fa-info-circle text-gray-400 mr-2"></i>
                    Tidak ada data ditemukan
                </td>
            </tr>
        `);return}a.forEach((t,o)=>{const i=t.semester?`Semester ${t.semester}`:"-";let l="";n?t.status==="approved"?l=`
                    <i class="fas fa-lock text-gray-400" title="Aksi tidak tersedia"></i>
                `:t.status==="pending"?l=`
                    <button class="delete-btn px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all" 
                        data-id="${t.id}" data-name="${i}">
                        <i class="fas fa-trash"></i>
                    </button>
                `:l=`
                    <button class="edit-btn px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all mr-2" 
                            data-id="${t.id}">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="delete-btn px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all" 
                            data-id="${t.id}" data-name="${i}">
                        <i class="fas fa-trash"></i>
                    </button>
                `:n||(t.status==="approved"||t.status==="rejected"?l=`
                    <i class="fas fa-lock text-gray-400" title="Aksi tidak tersedia"></i>
                `:l=`
                    <button class="approve-btn px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all mr-2" 
                            data-id="${t.id}" title="Approve">
                        <i class="fas fa-check"></i>
                    </button>
                    <button class="reject-btn px-3 py-1 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all" 
                            data-id="${t.id}" title="Reject">
                        <i class="fas fa-times"></i>
                    </button>
                `);let p="";switch(t.status){case 1:case"pending":p='<span class="px-3 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-700 border border-yellow-300">Pending</span>';break;case 2:case"approved":p='<span class="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700 border border-green-300">Approved</span>';break;case 3:case"rejected":p='<span class="px-3 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-700 border border-red-300">Rejected</span>';break;default:p='<span class="px-3 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-700 border border-gray-300">Unknown</span>'}const C=`
            <tr class="hover:bg-gray-50 transition-colors duration-200">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${o+1}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                        <div class="flex-shrink-0 h-10 w-10">
                            <div class="h-10 w-10 rounded-full bg-gradient-to-r gradient-bg to-blue-light flex items-center justify-center text-white font-semibold">
                                ${t.mahasiswa.user.name.charAt(0)||"-"}
                            </div>
                        </div>
                        <div class="ml-4">
                            ${t.mahasiswa.user.name||"-"}
                        </div>
                    </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div class="text-sm font-medium text-gray-900">${i}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${t.ip_semester||"-"}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${c(t.total)}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${t.catatan||"-"}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${p}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm">
                    ${l}
                </td>
            </tr>
        `;s.append(C)})}function S(a,n){const s=e("#pagination");if(s.empty(),!(a<=1))for(let t=1;t<=a;t++){const o=e(`<button class="page-btn mx-1 px-3 py-1 rounded-lg border ${t===m?"bg-orange-primary text-white":"bg-white text-gray-700 hover:bg-gray-100"}">${t}</button>`);o.on("click",function(){m=t,u(n,m)}),s.append(o)}}function u(a="",n=1){e.ajax({url:"/admin/getpengajuandana",type:"GET",data:{search:a,page:n,limit:b},dataType:"json",success:function(s){const t=s.data,o=s.is_mahasiswa;if(!Array.isArray(t)){console.error("Response data bukan array:",t);return}T(t,o),S(s.last_page,a);let i=(s.current_page-1)*b+1,l=i+t.length-1;e("#resultCount").html(`
                <i class="fas fa-info-circle mr-1"></i>
                Menampilkan ${i} - ${l} dari ${s.total} data
            `)},error:function(s,t,o){console.error("Gagal ambil data:",o,s.responseText)}})}e("#searchInputpengajuandana").on("input",function(){const a=e(this).val();m=1,u(a,m)});function x(){e("#pengajuandanaForm")[0].reset(),e("#pengajuandanaForm input, #pengajuandanaForm select, #pengajuandanaForm textarea").removeClass("border-red-300 bg-red-50"),e("#pengajuandanaForm input, #pengajuandanaForm select").each(function(){e(this).removeClass("border-red-300 bg-red-50"),g(this)}),e("#pengajuandanaPengajuandana").val("").trigger("change"),e("#preview").attr("src",""),e("#previewContainer").addClass("hidden")}function v(a){j(a),M()}function j(a){const n=e("#"+a);n.removeClass("hidden"),setTimeout(()=>{n.find(".modal-content").addClass("show")},10),e("body").addClass("overflow-hidden")}function M(){e("body").css({overflow:"hidden","padding-right":""})}function g(a){const s=e(a).attr("id")+"-error";e("#"+s).remove()}e("#cancelDeleteBtn").on("click",function(){d("deleteModal")});e("#cancelDeleteBtnApprove").on("click",function(){d("approveModal")});e("#cancelRejectBtn").on("click",function(){d("rejectModal")});e("#closeModal, #cancelBtn").on("click",function(){d("pengajuandanaModal")});function d(a){$(a),I()}function $(a){const n=e("#"+a);n.find(".modal-content").removeClass("show"),setTimeout(()=>{n.addClass("hidden"),e("body").removeClass("overflow-hidden")},300)}function I(){e("body").css({overflow:"","padding-right":""})}e(".modal-overlay").on("click",function(a){a.target===this&&(e(this).closest("#pengajuandanaModal").length?d("pengajuandanaModal"):e(this).closest("#deleteModal").length?d("deleteModal"):e(this).closest("#approveModal").length?d("approveModal"):e(this).closest("#rejectModal").length&&d("rejectModal"))});function r(a,n="info"){const o=e(`
            <div class="notification flex items-center space-x-3 ${n==="success"?"bg-green-500":n==="error"?"bg-red-500":"bg-blue-500"} text-white px-6 py-4 rounded-xl shadow-lg transform translate-x-full opacity-0 transition-all duration-300 cursor-pointer">
            <i class="fas ${n==="success"?"fa-check-circle":n==="error"?"fa-exclamation-circle":"fa-info-circle"} text-lg"></i>
            <span class="font-medium">${a}</span>
            </div>
            `);e("#notificationWrapper").append(o),setTimeout(()=>{o.removeClass("translate-x-full opacity-0")},100);const i=setTimeout(()=>{o.addClass("translate-x-full opacity-0"),setTimeout(()=>o.remove(),300)},4e3);o.on("click",function(){clearTimeout(i),e(this).addClass("translate-x-full opacity-0"),setTimeout(()=>e(this).remove(),300)})}function P(){let a=!0;return["pengajuandanaSemester","pengajuandanaIpsemester"].forEach(function(s){const t=e("#"+s);!t.val()||!t.val().toString().trim()?(t.addClass("border-red-300 bg-red-50"),a=!1):t.removeClass("border-red-300 bg-red-50")}),a}function f(a){return parseInt(a.replace(/[^0-9]/g,""))||0}e("#pengajuandanaPengajuandana").on("change",function(){const a=e(this).val();e("#paketFields input, #sksFields input").val(""),e("#totalPaket, #totalSks").val(""),a==="1"?(e("#paketFields").removeClass("hidden"),e("#sksFields").addClass("hidden")):a==="2"?(e("#sksFields").removeClass("hidden"),e("#paketFields").addClass("hidden")):e("#paketFields, #sksFields").addClass("hidden")});function k(){const a=f(e("#sppTetap").val()),n=f(e("#sppVariabel").val()),s=f(e("#praktikumPaket").val()),t=a+n+s;e("#totalPaket").val(c(t))}function y(){const a=f(e("#jumlahSks").val()),n=f(e("#nominal").val()),s=f(e("#praktikumSks").val()),t=a*n+s;e("#totalSks").val(c(t))}const F=["#sppTetap","#sppVariabel","#praktikumPaket","#jumlahSks","#nominal","#praktikumSks"];F.forEach(a=>{e(a).on("input",function(){let n=e(this).val();n=n.replace(/[^0-9]/g,""),e(this).val(c(n)),a.includes("Tetap")||a.includes("Variabel")||a.includes("Paket")?k():y()})});e("#pengajuandanaSemester").on("change",function(){const a=e(this).val();a&&e.ajax({url:"/admin/get-ip-sebelumnya",type:"GET",data:{semester:a},success:function(n){n.ip?e("#pengajuandanaIpsemester").val(n.ip):(e("#pengajuandanaIpsemester").val(""),r(n.message,n.status))},error:function(){e("#pengajuandanaIpsemester").val(""),r("Gagal mengambil data IP Semester sebelumnya","error")}})});let h=null;e("#addSubpengajuandanaBtn").on("click",function(){h=null,x(),e("#pengajuandanaId").val(""),e("#modalTitle").text("Tambah Pengajuandana Baru"),e("#modalIcon").removeClass().addClass("fas fa-money-bill"),e("#submitText").text("Simpan Data"),e("#submitIcon").removeClass("fa-edit").addClass("fa-save"),v("pengajuandanaModal"),e("#pengajuandanaIsparent").val("")});e(function(){e("#pengajuandanaForm").on("submit",function(a){if(a.preventDefault(),!P()){r("Mohon lengkapi semua field yang wajib diisi!","error");return}const n=e("#submitBtn"),s=n.html();n.html('<i class="fas fa-spinner fa-spin mr-2"></i>Menyimpan...').prop("disabled",!0),e(".rupiah-input").each(function(){const i=e(this).val().replace(/[^0-9]/g,"");e(this).val(i||0)});const t=e("#pengajuandanaId").val(),o=t?`/admin/pengajuandana/${t}`:"/admin/pengajuandana";e.ajax({url:o,type:"POST",data:e("#pengajuandanaForm").serialize()+(t?"&_method=PUT":""),success:function(i){r(i.message,i.status),d("pengajuandanaModal"),n.html(s).prop("disabled",!1),u(e("#searchInputpengajuandana").val(),m)},error:function(i){if(n.html(s).prop("disabled",!1),i.status===422&&i.responseJSON.errors){const l=i.responseJSON.errors,p=Object.values(l).flat().join(" | ");r(p,"error")}else r("Terjadi kesalahan saat menyimpan data!","error")}})})});e(document).on("click",".edit-btn",function(){h=e(this).data("id"),x(),e("#modalTitle").text("Edit Data Pengajuandana"),e("#modalIcon").removeClass().addClass("fas fa-money-bill"),e("#submitText").text("Update Data"),e("#submitIcon").removeClass("fa-save").addClass("fa-edit"),e.ajax({url:"/admin/pengajuandana/"+h,type:"GET",success:function(a){e("#pengajuandanaId").val(a.id),e("#pengajuandanaSemester").val(a.semester),e("#pengajuandanaIpsemester").val(a.ip_semester),e("#pengajuandanaPengajuandana").val(a.tipe).trigger("change"),a.tipe===1?(e("#sppTetap").val(c(a.spp_tetap)),e("#sppVariabel").val(c(a.spp_variabel)),e("#praktikumPaket").val(c(a.praktikum)),k()):a.tipe===2&&(e("#jumlahSks").val(c(a.jml_sks)),e("#nominal").val(c(a.nominal)),e("#praktikumSks").val(c(a.praktikum)),y()),j("pengajuandanaModal")},error:function(a){console.error("Gagal ambil data:",a.responseText),alert("Gagal ambil data pengajuandana")}})});e(document).on("click",".delete-btn",function(){const a=e(this).data("id"),n=e(this).data("name");e("#deletepengajuandanaId").val(a),e("#deletePengajuandanaName").text(n),v("deleteModal")});e(document).on("click","#confirmDeleteBtn",function(){const a=e(this),n=a.html();a.html('<i class="fas fa-spinner fa-spin mr-2"></i>Menghapus...').prop("disabled",!0);const s=e("#deletepengajuandanaId").val();e.ajax({url:`/admin/pengajuandana/${s}`,type:"DELETE",success:function(t){r(t.message,t.status),d("deleteModal"),u()},error:function(t){let o=t.responseJSON&&t.responseJSON.message?t.responseJSON.message:"Gagal menghapus data!";r(o,"error")},complete:function(){a.html(n).prop("disabled",!1)}})});e("#removeFoto").on("click",function(){let a=e("#pengajuandanaId").val();if(!a){r("ID Pengajuandana tidak ditemukan.");return}e.ajax({url:"/pengajuandana/deleteFoto",type:"POST",data:{id:a},success:function(n){n.success?(e("#pengajuandanaFoto").val(""),e("#previewContainer").addClass("hidden"),e("#preview").attr("src",""),r(n.message,"success")):r("Gagal menghapus foto.")},error:function(){r("Terjadi kesalahan.")}})});e(document).on("input","#approveDanaDisetujui",function(){let a=e(this).val().replace(/[^0-9]/g,"");e(this).val(c(a))});e(document).on("click",".approve-btn",function(){const a=e(this).data("id");w(),e("#approvepengajuandanaId").val(a),v("approveModal")});e(document).on("click","#confirApproveBtn",function(){const a=e(this),n=a.html();a.html('<i class="fas fa-spinner fa-spin mr-2"></i>Menyimpan...').prop("disabled",!0);const s=e("#approvepengajuandanaId").val();let t=e("#approveDanaDisetujui").val(),o=e("#approveCatatan").val();t=t.replace(/[^0-9]/g,""),e.ajax({url:`/admin/pengajuandanaapprove/${s}`,type:"PUT",data:{nominal_disetujui:t,catatan:o},success:function(i){r(i.message,i.status),d("approveModal"),u()},error:function(i){let l=i.responseJSON&&i.responseJSON.message?i.responseJSON.message:"Gagal menyimpan data!";r(l,"error")},complete:function(){a.html(n).prop("disabled",!1)}})});e(document).on("click",".reject-btn",function(){const a=e(this).data("id");w(),e("#rejectpengajuandanaId").val(a),v("rejectModal")});e(document).on("click","#confirmRejectBtn",function(){const a=e(this),n=a.html();a.html('<i class="fas fa-spinner fa-spin mr-2"></i>Menyimpan...').prop("disabled",!0);const s=e("#rejectpengajuandanaId").val(),t=e("#rejectCatatan").val();e.ajax({url:`/admin/pengajuandanareject/${s}`,type:"PUT",data:{catatan:t},success:function(o){r(o.message,o.status),d("rejectModal"),u()},error:function(o){let i=o.responseJSON&&o.responseJSON.message?o.responseJSON.message:"Gagal menolak data!";r(i,"error")},complete:function(){a.html(n).prop("disabled",!1)}})});function w(){e("#approveDanaDisetujui").val("").removeClass("border-red-300 bg-red-50"),e("#approveCatatan").val("").removeClass("border-red-300 bg-red-50"),e("#rejectCatatan").val("").removeClass("border-red-300 bg-red-50"),e("#approvepengajuandanaId").val(""),typeof g=="function"&&(g("#approveDanaDisetujui"),g("#approveCatatan"),g("#rejectCatatan"))}
