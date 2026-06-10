import{$ as e}from"./jquery-CEr4rF5i.js";e.ajaxSetup({headers:{"X-CSRF-TOKEN":e('meta[name="csrf-token"]').attr("content")}});e(function(){m(),M()});function M(){e.ajax({url:"/admin/pengajuandana/gettahunakademik",type:"GET",success:function(a){const n=e("#filterTahunAkademik");a.forEach(function(s){n.append(`<option value="${s.id}">${s.tahun_akademik}</option>`)})},error:function(a){console.error("Gagal load tahun akademik:",a)}})}e("#downloadExcelBtn").on("click",function(){const a=e("#filterTahunAkademik").val();let n="/admin/pengajuandana/exportall";a&&(n+="?tahun_akademik_id="+a),window.location.href=n});e("#filterTahunAkademik").on("change",function(){u=1,m(e("#searchInputpengajuandana").val(),u)});function l(a){if(!a)return"";let s=a.toString().replace(/[^,\d]/g,"").split(","),t=s[0].length%3,i=s[0].substr(0,t),o=s[0].substr(t).match(/\d{3}/gi);return o&&(i+=(t?".":"")+o.join(".")),i=s[1]!==void 0?i+","+s[1]:i,"Rp "+i}let u=1;const k=10;function _(a,n){const s=e("#tablePengajuandana");if(s.empty(),a.length===0){s.append(`
            <tr>
                <td colspan="8" class="px-6 py-10 text-center text-gray-500">
                    <i class="fas fa-info-circle text-gray-300 text-4xl mb-3 block"></i>
                    Tidak ada data ditemukan
                </td>
            </tr>
        `);return}a.forEach((t,i)=>{const o=t.semester?`Semester ${t.semester}`:"-";let r="";switch(t.status){case 1:case"pending":r='<span class="px-3 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-700 border border-yellow-300">Pending</span>';break;case 2:case"approved":r='<span class="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700 border border-green-300">Approved</span>';break;case 3:case"rejected":r='<span class="px-3 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-700 border border-red-300">Rejected</span>';break;default:r='<span class="px-3 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-700 border border-gray-300">Unknown</span>'}let p="";n?t.status==="approved"?p=`
                    <i class="fas fa-lock text-gray-400" title="Aksi tidak tersedia"></i>
                `:t.status==="pending"?p=`
                    <button class="delete-btn inline-flex items-center px-3 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all shadow-sm" 
                        data-id="${t.id}" data-name="${o}">
                        <i class="fas fa-trash mr-1.5"></i> Hapus
                    </button>
                `:p=`
                    <button class="edit-btn inline-flex items-center px-3 py-1.5 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all shadow-sm mr-2" 
                        data-id="${t.id}">
                        <i class="fas fa-edit mr-1.5"></i> Edit
                    </button>
                    <button class="delete-btn inline-flex items-center px-3 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all shadow-sm" 
                        data-id="${t.id}" data-name="${o}">
                        <i class="fas fa-trash mr-1.5"></i> Hapus
                    </button>
                `:t.status==="approved"||t.status==="rejected"?p=`
                    <button class="detail-btn inline-flex items-center px-3 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all shadow-sm mr-2" 
                        data-id="${t.id}" title="Lihat Detail">
                        <i class="fas fa-eye mr-1.5"></i> Detail
                    </button>
                    <i class="fas fa-lock text-gray-400" title="Aksi tidak tersedia"></i>
                `:p=`
                    <button class="detail-btn inline-flex items-center px-3 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all shadow-sm mr-2" 
                        data-id="${t.id}" title="Lihat Detail">
                        <i class="fas fa-eye mr-1.5"></i> Detail
                    </button>
                    <button class="approve-btn inline-flex items-center px-3 py-1.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all shadow-sm mr-2" 
                            data-id="${t.id}" title="Approve">
                        <i class="fas fa-check mr-1.5"></i> Approve
                    </button>
                    <button class="reject-btn inline-flex items-center px-3 py-1.5 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all shadow-sm" 
                            data-id="${t.id}" title="Reject">
                        <i class="fas fa-times mr-1.5"></i> Reject
                    </button>
                `;const x=t.mahasiswa?.user?.name??"-",$=x.charAt(0).toUpperCase(),T=t.mahasiswa?.mitra?.nama_mitra??"-",S=`
            <tr class="hover:bg-gray-50 transition-colors duration-200 border-b border-gray-100">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    ${i+1}
                </td>

                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                        <div class="flex-shrink-0 h-10 w-10">
                            <div class="h-10 w-10 rounded-full bg-gradient-to-r from-blue-600 to-blue-400 flex items-center justify-center text-white font-bold shadow-sm">
                                ${$}
                            </div>
                        </div>
                        <div class="ml-4">
                            <div class="text-sm font-semibold text-gray-900">${x}</div>
                            <div class="text-xs text-gray-500">Mahasiswa</div>
                        </div>
                    </div>
                </td>

                ${n?"":`
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-medium">
                    ${T}
                </td>
                `}

                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-medium">
                    ${o}
                </td>

                <td class="px-6 py-4 whitespace-nowrap text-sm">
                    <span class="px-2 py-1 bg-gray-100 text-gray-700 font-bold rounded border border-gray-200">
                        ${t.ip_semester??"0.00"}
                    </span>
                </td>

                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                    ${l(t.total)}
                </td>

                <td class="px-6 py-4 text-sm text-gray-700">
                    ${t.catatan??"-"}
                </td>

                <td class="px-6 py-4 whitespace-nowrap text-sm">
                    ${r}
                </td>

                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    ${p}
                </td>
            </tr>
        `;s.append(S)})}function I(a,n){const s=e("#cardContainer");if(s.empty(),a.length===0){s.append(`
            <div class="p-10 text-center text-gray-400 font-medium bg-white rounded-xl border border-dashed border-gray-300">
                Tidak ada data pengajuan.
            </div>
        `);return}a.forEach(t=>{const i=t.semester?`Semester ${t.semester}`:"-",o=t.status?.toString().toLowerCase();let r="";o==="1"||o==="pending"?r='<span class="px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-yellow-100 text-yellow-700 border border-yellow-200">Pending</span>':o==="2"||o==="approved"?r='<span class="px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-green-100 text-green-700 border border-green-200">Approved</span>':(o==="3"||o==="rejected")&&(r='<span class="px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-red-100 text-red-700 border border-red-200">Rejected</span>');const p=`
            <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-4 hover:shadow-md transition-shadow">
                <div class="flex items-start justify-between mb-3">
                    <div class="flex items-center">
                        <div class="h-10 w-10 rounded-full bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center text-white font-bold shadow-sm mr-3">
                            ${(t.mahasiswa?.user?.name||"M").charAt(0)}
                        </div>
                        <div>
                            <h3 class="text-sm font-bold text-gray-900">${t.mahasiswa?.user?.name??"Mahasiswa"}</h3>
                            <p class="text-xs text-gray-500">${i}</p>
                        </div>
                    </div>
                    ${r}
                </div>

                <div class="bg-gray-50 rounded-lg p-3 mb-4 space-y-2">
                    ${n?"":`
                    <div class="flex justify-between text-sm">
                        <span class="text-gray-500">Universitas:</span>
                        <span class="font-bold text-gray-800">${t.mahasiswa?.mitra?.nama_mitra??"-"}</span>
                    </div>
                    `}
                    <div class="flex justify-between text-sm">
                        <span class="text-gray-500">Total Dana:</span>
                        <span class="font-bold text-blue-600">${l(t.total)}</span>
                    </div>
                    <div class="text-xs text-gray-500 italic">
                        <i class="fas fa-quote-left mr-1 opacity-50"></i>${t.catatan||"-"}
                    </div>
                </div>

                <div class="flex gap-2">
                    ${n?o==="approved"||o==="2"?'<div class="w-full py-2 bg-gray-100 text-gray-400 text-center rounded-lg text-sm italic"><i class="fas fa-lock mr-2"></i>Pengajuan Selesai</div>':`
                            <button class="edit-btn flex-1 py-2.5 bg-yellow-500 text-white rounded-lg text-sm font-bold shadow-sm" data-id="${t.id}"><i class="fas fa-edit mr-1"></i> Edit</button>
                            <button class="delete-btn flex-1 py-2.5 bg-red-500 text-white rounded-lg text-sm font-bold shadow-sm" data-id="${t.id}" data-name="${i}"><i class="fas fa-trash mr-1"></i> Hapus</button>
                        `:`
                        <button class="detail-btn flex-1 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-bold shadow-sm" data-id="${t.id}"><i class="fas fa-eye mr-1"></i> Detail</button>
                        ${o==="pending"||o==="1"?`
                            <button class="approve-btn flex-1 py-2.5 bg-green-500 text-white rounded-lg text-sm font-bold shadow-sm" data-id="${t.id}"><i class="fas fa-check"></i></button>
                            <button class="reject-btn flex-1 py-2.5 bg-gray-600 text-white rounded-lg text-sm font-bold shadow-sm" data-id="${t.id}"><i class="fas fa-times"></i></button>
                        `:""}
                    `}
                </div>
            </div>
        `;s.append(p)})}function P(a,n){const s=e("#pagination");if(s.empty(),!(a<=1))for(let t=1;t<=a;t++){const i=e(`<button class="page-btn mx-1 px-3 py-1 rounded-lg border ${t===u?"bg-orange-primary text-white":"bg-white text-gray-700 hover:bg-gray-100"}">${t}</button>`);i.on("click",function(){u=t,m(n,u)}),s.append(i)}}function D(a,n){const s=e("#paginationMobile");if(s.empty(),!(a<=1))for(let t=1;t<=a;t++){const i=e(`<button class="px-3 py-1 rounded-lg border ${t===u?"bg-orange-primary text-white":"bg-white text-gray-700 hover:bg-gray-100"}">${t}</button>`);i.on("click",function(){u=t,m(n,u)}),s.append(i)}}function m(a="",n=1){const s=e("#filterTahunAkademik").val();e.ajax({url:"/admin/getpengajuandana",type:"GET",data:{search:a,page:n,limit:k,tahun_akademik_id:s},dataType:"json",success:function(t){const i=t.data,o=t.is_mahasiswa;if(!Array.isArray(i)){console.error("Response data bukan array:",i);return}_(i,o),I(i,o),P(t.last_page,a),D(t.last_page,a);let r=(t.current_page-1)*k+1,p=r+i.length-1;e("#resultCount").html(`
                <i class="fas fa-info-circle mr-1"></i>
                Menampilkan ${r} - ${p} dari ${t.total} data
            `)},error:function(t,i,o){console.error("Gagal ambil data:",o,t.responseText)}})}e("#searchInputpengajuandana").on("input",function(){const a=e(this).val();u=1,m(a,u)});function y(){e("#pengajuandanaForm")[0].reset(),e("#pengajuandanaForm input, #pengajuandanaForm select, #pengajuandanaForm textarea").removeClass("border-red-300 bg-red-50"),e("#pengajuandanaForm input, #pengajuandanaForm select").each(function(){e(this).removeClass("border-red-300 bg-red-50"),f(this)}),e("#pengajuandanaPengajuandana").val("").trigger("change"),e("#preview").attr("src",""),e("#previewContainer").addClass("hidden")}function b(a){w(a),F()}function w(a){const n=e("#"+a);n.removeClass("hidden"),setTimeout(()=>{n.find(".modal-content").addClass("show")},10),e("body").addClass("overflow-hidden")}function F(){e("body").css({overflow:"hidden","padding-right":""})}function f(a){const s=e(a).attr("id")+"-error";e("#"+s).remove()}e("#cancelDeleteBtn").on("click",function(){c("deleteModal")});e("#cancelDeleteBtnApprove").on("click",function(){c("approveModal")});e("#cancelMahasiswaBtn").on("click",function(){c("detailMahasiswaModal")});e("#cancelRejectBtn").on("click",function(){c("rejectModal")});e("#tutupDetailBtn").on("click",function(){c("detailpengajuandanaModal")});e("#closeModal, #cancelBtn").on("click",function(){c("pengajuandanaModal"),c("detailpengajuandanaModal")});function c(a){B(a),E()}function B(a){const n=e("#"+a);n.find(".modal-content").removeClass("show"),setTimeout(()=>{n.addClass("hidden"),e("body").removeClass("overflow-hidden")},300)}function E(){e("body").css({overflow:"","padding-right":""})}e(".modal-overlay").on("click",function(a){a.target===this&&(e(this).closest("#pengajuandanaModal").length?c("pengajuandanaModal"):e(this).closest("#deleteModal").length?c("deleteModal"):e(this).closest("#approveModal").length?c("approveModal"):e(this).closest("#rejectModal").length?c("rejectModal"):e(this).closest("#detailpengajuandanaModal").length&&c("detailpengajuandanaModal"))});function d(a,n="info"){const i=e(`
            <div class="notification flex items-center space-x-3 ${n==="success"?"bg-green-500":n==="error"?"bg-red-500":"bg-blue-500"} text-white px-6 py-4 rounded-xl shadow-lg transform translate-x-full opacity-0 transition-all duration-300 cursor-pointer">
            <i class="fas ${n==="success"?"fa-check-circle":n==="error"?"fa-exclamation-circle":"fa-info-circle"} text-lg"></i>
            <span class="font-medium">${a}</span>
            </div>
            `);e("#notificationWrapper").append(i),setTimeout(()=>{i.removeClass("translate-x-full opacity-0")},100);const o=setTimeout(()=>{i.addClass("translate-x-full opacity-0"),setTimeout(()=>i.remove(),300)},4e3);i.on("click",function(){clearTimeout(o),e(this).addClass("translate-x-full opacity-0"),setTimeout(()=>e(this).remove(),300)})}function A(){let a=!0;return["pengajuandanaSemester","pengajuandanaIpsemester"].forEach(function(s){const t=e("#"+s);!t.val()||!t.val().toString().trim()?(t.addClass("border-red-300 bg-red-50"),a=!1):t.removeClass("border-red-300 bg-red-50")}),a}function g(a){return parseInt(a.replace(/[^0-9]/g,""))||0}e("#pengajuandanaPengajuandana").on("change",function(){const a=e(this).val();e("#paketFields input, #sksFields input").val(""),e("#totalPaket, #totalSks").val(""),a==="1"?(e("#paketFields").removeClass("hidden"),e("#sksFields").addClass("hidden")):a==="2"?(e("#sksFields").removeClass("hidden"),e("#paketFields").addClass("hidden")):e("#paketFields, #sksFields").addClass("hidden")});function j(){const a=g(e("#sppTetap").val()),n=g(e("#sppVariabel").val()),s=g(e("#praktikumPaket").val()),t=a+n+s;e("#totalPaket").val(l(t))}function h(){const a=parseInt(e("#jumlahSks").val())||0,n=g(e("#nominal").val()),s=g(e("#praktikumSks").val()),t=a*n+s;e("#totalSks").val(l(t))}e(document).ready(function(){["#sppTetap","#sppVariabel","#praktikumPaket","#nominal","#praktikumSks"].forEach(n=>{e(n).on("input",function(){let s=e(this).val().replace(/[^0-9]/g,"");e(this).val(l(s)),n.includes("Sks")||n.includes("nominal")?h():j()})}),e("#jumlahSks").on("input",function(){let n=e(this).val().replace(/[^0-9]/g,"");e(this).val(n),h()})});e("#pengajuandanaSemester").on("change",function(){const a=e(this).val();a&&e.ajax({url:"/admin/get-ip-sebelumnya",type:"GET",data:{semester:a},success:function(n){n.ip?e("#pengajuandanaIpsemester").val(n.ip):(e("#pengajuandanaIpsemester").val(""),d(n.message,n.status))},error:function(){e("#pengajuandanaIpsemester").val(""),d("Gagal mengambil data IP Semester sebelumnya","error")}})});let v=null;e("#addSubpengajuandanaBtn").on("click",function(){v=null,y(),e("#pengajuandanaId").val(""),e("#modalTitle").text("Tambah Pengajuandana Baru"),e("#modalIcon").removeClass().addClass("fas fa-money-bill"),e("#submitText").text("Simpan Data"),e("#submitIcon").removeClass("fa-edit").addClass("fa-save"),b("pengajuandanaModal"),e("#pengajuandanaIsparent").val("")});e(function(){e("#pengajuandanaForm").on("submit",function(a){if(a.preventDefault(),!A()){d("Mohon lengkapi semua field yang wajib diisi!","error");return}const n=e("#submitBtn"),s=n.html();n.html('<i class="fas fa-spinner fa-spin mr-2"></i>Menyimpan...').prop("disabled",!0),e(".rupiah-input").each(function(){const o=e(this).val().replace(/[^0-9]/g,"");e(this).val(o||0)});const t=e("#pengajuandanaId").val(),i=t?`/admin/pengajuandana/${t}`:"/admin/pengajuandana";e.ajax({url:i,type:"POST",data:e("#pengajuandanaForm").serialize()+(t?"&_method=PUT":""),success:function(o){d(o.message,o.status),c("pengajuandanaModal"),n.html(s).prop("disabled",!1),m(e("#searchInputpengajuandana").val(),u)},error:function(o){if(n.html(s).prop("disabled",!1),o.status===422&&o.responseJSON.errors){const r=o.responseJSON.errors,p=Object.values(r).flat().join(" | ");d(p,"error")}else d("Terjadi kesalahan saat menyimpan data!","error")}})})});e(document).on("click",".edit-btn",function(){v=e(this).data("id"),y(),e("#modalTitle").text("Edit Data Pengajuandana"),e("#modalIcon").removeClass().addClass("fas fa-money-bill"),e("#submitText").text("Update Data"),e("#submitIcon").removeClass("fa-save").addClass("fa-edit"),e.ajax({url:"/admin/pengajuandana/"+v,type:"GET",success:function(a){e("#pengajuandanaId").val(a.id),e("#pengajuandanaSemester").val(a.semester),e("#pengajuandanaIpsemester").val(a.ip_semester),e("#pengajuandanaPengajuandana").val(a.tipe).trigger("change"),a.tipe===1?(e("#sppTetap").val(l(a.spp_tetap)),e("#sppVariabel").val(l(a.spp_variabel)),e("#praktikumPaket").val(l(a.praktikum)),j()):a.tipe===2&&(e("#jumlahSks").val(l(a.jml_sks)),e("#nominal").val(l(a.nominal)),e("#praktikumSks").val(l(a.praktikum)),h()),w("pengajuandanaModal")},error:function(a){console.error("Gagal ambil data:",a.responseText),alert("Gagal ambil data pengajuandana")}})});e(document).on("click",".delete-btn",function(){const a=e(this).data("id"),n=e(this).data("name");e("#deletepengajuandanaId").val(a),e("#deletePengajuandanaName").text(n),b("deleteModal")});e(document).on("click","#confirmDeleteBtn",function(){const a=e(this),n=a.html();a.html('<i class="fas fa-spinner fa-spin mr-2"></i>Menghapus...').prop("disabled",!0);const s=e("#deletepengajuandanaId").val();e.ajax({url:`/admin/pengajuandana/${s}`,type:"DELETE",success:function(t){d(t.message,t.status),c("deleteModal"),m()},error:function(t){let i=t.responseJSON&&t.responseJSON.message?t.responseJSON.message:"Gagal menghapus data!";d(i,"error")},complete:function(){a.html(n).prop("disabled",!1)}})});e("#removeFoto").on("click",function(){let a=e("#pengajuandanaId").val();if(!a){d("ID Pengajuandana tidak ditemukan.");return}e.ajax({url:"/pengajuandana/deleteFoto",type:"POST",data:{id:a},success:function(n){n.success?(e("#pengajuandanaFoto").val(""),e("#previewContainer").addClass("hidden"),e("#preview").attr("src",""),d(n.message,"success")):d("Gagal menghapus foto.")},error:function(){d("Terjadi kesalahan.")}})});e(document).on("input","#approveDanaDisetujui",function(){let a=e(this).val().replace(/[^0-9]/g,"");e(this).val(l(a))});e(document).on("click",".approve-btn",function(){const a=e(this).data("id");C(),e("#approvepengajuandanaId").val(a),e.ajax({url:`/admin/mahasiswa/pengajuandanadetail/${a}`,type:"GET",success:function(n){n.total&&e("#approveDanaDisetujui").val(l(n.total))}}),b("approveModal")});e(document).on("click","#confirApproveBtn",function(){const a=e(this),n=a.html();a.html('<i class="fas fa-spinner fa-spin mr-2"></i>Menyimpan...').prop("disabled",!0);const s=e("#approvepengajuandanaId").val();let t=e("#approveDanaDisetujui").val(),i=e("#approveCatatan").val();t=t.replace(/[^0-9]/g,""),e.ajax({url:`/admin/pengajuandanaapprove/${s}`,type:"PUT",data:{nominal_disetujui:t,catatan:i},success:function(o){d(o.message,o.status),c("approveModal"),m()},error:function(o){let r=o.responseJSON&&o.responseJSON.message?o.responseJSON.message:"Gagal menyimpan data!";d(r,"error")},complete:function(){a.html(n).prop("disabled",!1)}})});e(document).on("click",".reject-btn",function(){const a=e(this).data("id");C(),e("#rejectpengajuandanaId").val(a),b("rejectModal")});e(document).on("click","#confirmRejectBtn",function(){const a=e(this),n=a.html();a.html('<i class="fas fa-spinner fa-spin mr-2"></i>Menyimpan...').prop("disabled",!0);const s=e("#rejectpengajuandanaId").val(),t=e("#rejectCatatan").val();e.ajax({url:`/admin/pengajuandanareject/${s}`,type:"PUT",data:{catatan:t},success:function(i){d(i.message,i.status),c("rejectModal"),m()},error:function(i){let o=i.responseJSON&&i.responseJSON.message?i.responseJSON.message:"Gagal menolak data!";d(o,"error")},complete:function(){a.html(n).prop("disabled",!1)}})});function C(){e("#approveDanaDisetujui").val("").removeClass("border-red-300 bg-red-50"),e("#approveCatatan").val("").removeClass("border-red-300 bg-red-50"),e("#rejectCatatan").val("").removeClass("border-red-300 bg-red-50"),e("#approvepengajuandanaId").val(""),typeof f=="function"&&(f("#approveDanaDisetujui"),f("#approveCatatan"),f("#rejectCatatan"))}e(document).on("click",".detail-btn",function(){const a=e(this).data("id");b("detailpengajuandanaModal"),e.ajax({url:`/admin/mahasiswa/pengajuandanadetail/${a}`,type:"GET",success:function(n){const s=parseInt(n.tipe);e("#det_semester").text(`Semester ${n.semester}`),e("#det_ip").text(n.ip_semester),e("#det_tipe").text(s===1?"Paket":"SKS"),e("#det_universitas").length&&e("#det_universitas").text(n.mahasiswa?.mitra?.nama_mitra??"-"),e("#detailPaket").addClass("hidden"),e("#detailSks").addClass("hidden"),s===1?(e("#detailPaket").removeClass("hidden"),e("#det_spp_tetap").text(l(n.spp_tetap)),e("#det_spp_variabel").text(l(n.spp_variabel)),e("#det_praktikum_paket").text(l(n.praktikum)),e("#det_total_paket").text(l(n.total))):s===2&&(e("#detailSks").removeClass("hidden"),e("#det_jml_sks").text(n.jml_sks),e("#det_nominal").text(l(n.nominal)),e("#det_praktikum_sks").text(l(n.praktikum)),e("#det_total_sks").text(l(n.total)))},error:function(){d("Gagal mengambil data detail","error")}})});e(document).on("click",".tab-btn",function(){const a=e(this).data("tab");e(".tab-btn").removeClass("active-tab border-blue-700 text-blue-700").addClass("border-transparent text-gray-500"),e(this).addClass("active-tab border-blue-700 text-blue-700").removeClass("border-transparent text-gray-500"),e(".tab-content").addClass("hidden"),e("#"+a).removeClass("hidden")});e(document).on("click",".detail-btn",function(){e('.tab-btn[data-tab="tab-biodata"]').trigger("click")});
