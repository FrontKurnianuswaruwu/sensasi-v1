import{$ as e}from"./jquery-BvxTx_lq.js";e.ajaxSetup({headers:{"X-CSRF-TOKEN":e('meta[name="csrf-token"]').attr("content")}});e(function(){m()});function r(t){if(!t)return"";let n=t.toString().replace(/[^,\d]/g,"").split(","),a=n[0].length%3,i=n[0].substr(0,a),o=n[0].substr(a).match(/\d{3}/gi);return o&&(i+=(a?".":"")+o.join(".")),i=n[1]!==void 0?i+","+n[1]:i,"Rp "+i}let u=1;const k=10;function T(t,s){const n=e("#tablePengajuandana");if(n.empty(),t.length===0){n.append(`
            <tr>
                <td colspan="8" class="px-6 py-10 text-center text-gray-500">
                    <i class="fas fa-info-circle text-gray-300 text-4xl mb-3 block"></i>
                    Tidak ada data ditemukan
                </td>
            </tr>
        `);return}t.forEach((a,i)=>{const o=a.semester?`Semester ${a.semester}`:"-";let l="";switch(a.status){case 1:case"pending":l='<span class="px-3 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-700 border border-yellow-300">Pending</span>';break;case 2:case"approved":l='<span class="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700 border border-green-300">Approved</span>';break;case 3:case"rejected":l='<span class="px-3 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-700 border border-red-300">Rejected</span>';break;default:l='<span class="px-3 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-700 border border-gray-300">Unknown</span>'}let p="";s?a.status==="approved"?p=`
                    <i class="fas fa-lock text-gray-400" title="Aksi tidak tersedia"></i>
                `:a.status==="pending"?p=`
                    <button class="delete-btn inline-flex items-center px-3 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all shadow-sm" 
                        data-id="${a.id}" data-name="${o}">
                        <i class="fas fa-trash mr-1.5"></i> Hapus
                    </button>
                `:p=`
                    <button class="edit-btn inline-flex items-center px-3 py-1.5 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all shadow-sm mr-2" 
                        data-id="${a.id}">
                        <i class="fas fa-edit mr-1.5"></i> Edit
                    </button>
                    <button class="delete-btn inline-flex items-center px-3 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all shadow-sm" 
                        data-id="${a.id}" data-name="${o}">
                        <i class="fas fa-trash mr-1.5"></i> Hapus
                    </button>
                `:a.status==="approved"||a.status==="rejected"?p=`
                    <button class="detail-btn inline-flex items-center px-3 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all shadow-sm mr-2" 
                        data-id="${a.id}" title="Lihat Detail">
                        <i class="fas fa-eye mr-1.5"></i> Detail
                    </button>
                    <i class="fas fa-lock text-gray-400" title="Aksi tidak tersedia"></i>
                `:p=`
                    <button class="detail-btn inline-flex items-center px-3 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all shadow-sm mr-2" 
                        data-id="${a.id}" title="Lihat Detail">
                        <i class="fas fa-eye mr-1.5"></i> Detail
                    </button>
                    <button class="approve-btn inline-flex items-center px-3 py-1.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all shadow-sm mr-2" 
                            data-id="${a.id}" title="Approve">
                        <i class="fas fa-check mr-1.5"></i> Approve
                    </button>
                    <button class="reject-btn inline-flex items-center px-3 py-1.5 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all shadow-sm" 
                            data-id="${a.id}" title="Reject">
                        <i class="fas fa-times mr-1.5"></i> Reject
                    </button>
                `;const y=a.mahasiswa?.user?.name??"-",$=y.charAt(0).toUpperCase(),M=`
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
                            <div class="text-sm font-semibold text-gray-900">${y}</div>
                            <div class="text-xs text-gray-500">Mahasiswa</div>
                        </div>
                    </div>
                </td>

                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-medium">
                    ${o}
                </td>

                <td class="px-6 py-4 whitespace-nowrap text-sm">
                    <span class="px-2 py-1 bg-gray-100 text-gray-700 font-bold rounded border border-gray-200">
                        ${a.ip_semester??"0.00"}
                    </span>
                </td>

                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                    ${r(a.total)}
                </td>

                <td class="px-6 py-4 text-sm text-gray-700">
                    ${a.catatan??"-"}
                </td>

                <td class="px-6 py-4 whitespace-nowrap text-sm">
                    ${l}
                </td>

                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    ${p}
                </td>
            </tr>
        `;n.append(M)})}function S(t,s){const n=e("#cardContainer");if(n.empty(),t.length===0){n.append(`
            <div class="p-10 text-center text-gray-400 font-medium bg-white rounded-xl border border-dashed border-gray-300">
                Tidak ada data pengajuan.
            </div>
        `);return}t.forEach(a=>{const i=a.semester?`Semester ${a.semester}`:"-",o=a.status?.toString().toLowerCase();let l="";o==="1"||o==="pending"?l='<span class="px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-yellow-100 text-yellow-700 border border-yellow-200">Pending</span>':o==="2"||o==="approved"?l='<span class="px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-green-100 text-green-700 border border-green-200">Approved</span>':(o==="3"||o==="rejected")&&(l='<span class="px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-red-100 text-red-700 border border-red-200">Rejected</span>');const p=`
            <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-4 hover:shadow-md transition-shadow">
                <div class="flex items-start justify-between mb-3">
                    <div class="flex items-center">
                        <div class="h-10 w-10 rounded-full bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center text-white font-bold shadow-sm mr-3">
                            ${(a.mahasiswa?.user?.name||"M").charAt(0)}
                        </div>
                        <div>
                            <h3 class="text-sm font-bold text-gray-900">${a.mahasiswa?.user?.name??"Mahasiswa"}</h3>
                            <p class="text-xs text-gray-500">${i}</p>
                        </div>
                    </div>
                    ${l}
                </div>

                <div class="bg-gray-50 rounded-lg p-3 mb-4 space-y-2">
                    <div class="flex justify-between text-sm">
                        <span class="text-gray-500">Total Dana:</span>
                        <span class="font-bold text-blue-600">${r(a.total)}</span>
                    </div>
                    <div class="text-xs text-gray-500 italic">
                        <i class="fas fa-quote-left mr-1 opacity-50"></i>${a.catatan||"-"}
                    </div>
                </div>

                <div class="flex gap-2">
                    ${s?o==="approved"||o==="2"?'<div class="w-full py-2 bg-gray-100 text-gray-400 text-center rounded-lg text-sm italic"><i class="fas fa-lock mr-2"></i>Pengajuan Selesai</div>':`
                            <button class="edit-btn flex-1 py-2.5 bg-yellow-500 text-white rounded-lg text-sm font-bold shadow-sm" data-id="${a.id}"><i class="fas fa-edit mr-1"></i> Edit</button>
                            <button class="delete-btn flex-1 py-2.5 bg-red-500 text-white rounded-lg text-sm font-bold shadow-sm" data-id="${a.id}" data-name="${i}"><i class="fas fa-trash mr-1"></i> Hapus</button>
                        `:`
                        <button class="detail-btn flex-1 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-bold shadow-sm" data-id="${a.id}"><i class="fas fa-eye mr-1"></i> Detail</button>
                        ${o==="pending"||o==="1"?`
                            <button class="approve-btn flex-1 py-2.5 bg-green-500 text-white rounded-lg text-sm font-bold shadow-sm" data-id="${a.id}"><i class="fas fa-check"></i></button>
                            <button class="reject-btn flex-1 py-2.5 bg-gray-600 text-white rounded-lg text-sm font-bold shadow-sm" data-id="${a.id}"><i class="fas fa-times"></i></button>
                        `:""}
                    `}
                </div>
            </div>
        `;n.append(p)})}function _(t,s){const n=e("#pagination");if(n.empty(),!(t<=1))for(let a=1;a<=t;a++){const i=e(`<button class="page-btn mx-1 px-3 py-1 rounded-lg border ${a===u?"bg-orange-primary text-white":"bg-white text-gray-700 hover:bg-gray-100"}">${a}</button>`);i.on("click",function(){u=a,m(s,u)}),n.append(i)}}function I(t,s){const n=e("#paginationMobile");if(n.empty(),!(t<=1))for(let a=1;a<=t;a++){const i=e(`<button class="px-3 py-1 rounded-lg border ${a===u?"bg-orange-primary text-white":"bg-white text-gray-700 hover:bg-gray-100"}">${a}</button>`);i.on("click",function(){u=a,m(s,u)}),n.append(i)}}function m(t="",s=1){e.ajax({url:"/admin/getpengajuandana",type:"GET",data:{search:t,page:s,limit:k},dataType:"json",success:function(n){const a=n.data,i=n.is_mahasiswa;if(!Array.isArray(a)){console.error("Response data bukan array:",a);return}T(a,i),S(a,i),_(n.last_page,t),I(n.last_page,t);let o=(n.current_page-1)*k+1,l=o+a.length-1;e("#resultCount").html(`
                <i class="fas fa-info-circle mr-1"></i>
                Menampilkan ${o} - ${l} dari ${n.total} data
            `)},error:function(n,a,i){console.error("Gagal ambil data:",i,n.responseText)}})}e("#searchInputpengajuandana").on("input",function(){const t=e(this).val();u=1,m(t,u)});function w(){e("#pengajuandanaForm")[0].reset(),e("#pengajuandanaForm input, #pengajuandanaForm select, #pengajuandanaForm textarea").removeClass("border-red-300 bg-red-50"),e("#pengajuandanaForm input, #pengajuandanaForm select").each(function(){e(this).removeClass("border-red-300 bg-red-50"),f(this)}),e("#pengajuandanaPengajuandana").val("").trigger("change"),e("#preview").attr("src",""),e("#previewContainer").addClass("hidden")}function b(t){j(t),P()}function j(t){const s=e("#"+t);s.removeClass("hidden"),setTimeout(()=>{s.find(".modal-content").addClass("show")},10),e("body").addClass("overflow-hidden")}function P(){e("body").css({overflow:"hidden","padding-right":""})}function f(t){const n=e(t).attr("id")+"-error";e("#"+n).remove()}e("#cancelDeleteBtn").on("click",function(){c("deleteModal")});e("#cancelDeleteBtnApprove").on("click",function(){c("approveModal")});e("#cancelMahasiswaBtn").on("click",function(){c("detailMahasiswaModal")});e("#cancelRejectBtn").on("click",function(){c("rejectModal")});e("#tutupDetailBtn").on("click",function(){c("detailpengajuandanaModal")});e("#closeModal, #cancelBtn").on("click",function(){c("pengajuandanaModal"),c("detailpengajuandanaModal")});function c(t){D(t),F()}function D(t){const s=e("#"+t);s.find(".modal-content").removeClass("show"),setTimeout(()=>{s.addClass("hidden"),e("body").removeClass("overflow-hidden")},300)}function F(){e("body").css({overflow:"","padding-right":""})}e(".modal-overlay").on("click",function(t){t.target===this&&(e(this).closest("#pengajuandanaModal").length?c("pengajuandanaModal"):e(this).closest("#deleteModal").length?c("deleteModal"):e(this).closest("#approveModal").length?c("approveModal"):e(this).closest("#rejectModal").length?c("rejectModal"):e(this).closest("#detailpengajuandanaModal").length&&c("detailpengajuandanaModal"))});function d(t,s="info"){const i=e(`
            <div class="notification flex items-center space-x-3 ${s==="success"?"bg-green-500":s==="error"?"bg-red-500":"bg-blue-500"} text-white px-6 py-4 rounded-xl shadow-lg transform translate-x-full opacity-0 transition-all duration-300 cursor-pointer">
            <i class="fas ${s==="success"?"fa-check-circle":s==="error"?"fa-exclamation-circle":"fa-info-circle"} text-lg"></i>
            <span class="font-medium">${t}</span>
            </div>
            `);e("#notificationWrapper").append(i),setTimeout(()=>{i.removeClass("translate-x-full opacity-0")},100);const o=setTimeout(()=>{i.addClass("translate-x-full opacity-0"),setTimeout(()=>i.remove(),300)},4e3);i.on("click",function(){clearTimeout(o),e(this).addClass("translate-x-full opacity-0"),setTimeout(()=>e(this).remove(),300)})}function B(){let t=!0;return["pengajuandanaSemester","pengajuandanaIpsemester"].forEach(function(n){const a=e("#"+n);!a.val()||!a.val().toString().trim()?(a.addClass("border-red-300 bg-red-50"),t=!1):a.removeClass("border-red-300 bg-red-50")}),t}function g(t){return parseInt(t.replace(/[^0-9]/g,""))||0}e("#pengajuandanaPengajuandana").on("change",function(){const t=e(this).val();e("#paketFields input, #sksFields input").val(""),e("#totalPaket, #totalSks").val(""),t==="1"?(e("#paketFields").removeClass("hidden"),e("#sksFields").addClass("hidden")):t==="2"?(e("#sksFields").removeClass("hidden"),e("#paketFields").addClass("hidden")):e("#paketFields, #sksFields").addClass("hidden")});function v(){const t=g(e("#det_spp_tetap").text()),s=g(e("#det_spp_variabel").text()),n=g(e("#det_praktikum_paket").text()),a=t+s+n;e("#det_total_paket").text(r(a))}function h(){const t=parseInt(e("#det_jml_sks").text())||0,s=g(e("#det_nominal").text()),n=g(e("#det_praktikum_sks").text()),a=t*s+n;e("#det_total_sks").text(r(a))}e(document).ready(function(){["#sppTetap","#sppVariabel","#praktikumPaket","#nominal","#praktikumSks"].forEach(s=>{e(s).on("input",function(){let n=e(this).val().replace(/[^0-9]/g,"");e(this).val(r(n)),s.includes("Sks")||s.includes("nominal")?h():v()})}),e("#jumlahSks").on("input",function(){let s=e(this).val().replace(/[^0-9]/g,"");e(this).val(s),h()})});e("#pengajuandanaSemester").on("change",function(){const t=e(this).val();t&&e.ajax({url:"/admin/get-ip-sebelumnya",type:"GET",data:{semester:t},success:function(s){s.ip?e("#pengajuandanaIpsemester").val(s.ip):(e("#pengajuandanaIpsemester").val(""),d(s.message,s.status))},error:function(){e("#pengajuandanaIpsemester").val(""),d("Gagal mengambil data IP Semester sebelumnya","error")}})});let x=null;e("#addSubpengajuandanaBtn").on("click",function(){x=null,w(),e("#pengajuandanaId").val(""),e("#modalTitle").text("Tambah Pengajuandana Baru"),e("#modalIcon").removeClass().addClass("fas fa-money-bill"),e("#submitText").text("Simpan Data"),e("#submitIcon").removeClass("fa-edit").addClass("fa-save"),b("pengajuandanaModal"),e("#pengajuandanaIsparent").val("")});e(function(){e("#pengajuandanaForm").on("submit",function(t){if(t.preventDefault(),!B()){d("Mohon lengkapi semua field yang wajib diisi!","error");return}const s=e("#submitBtn"),n=s.html();s.html('<i class="fas fa-spinner fa-spin mr-2"></i>Menyimpan...').prop("disabled",!0),e(".rupiah-input").each(function(){const o=e(this).val().replace(/[^0-9]/g,"");e(this).val(o||0)});const a=e("#pengajuandanaId").val(),i=a?`/admin/pengajuandana/${a}`:"/admin/pengajuandana";e.ajax({url:i,type:"POST",data:e("#pengajuandanaForm").serialize()+(a?"&_method=PUT":""),success:function(o){d(o.message,o.status),c("pengajuandanaModal"),s.html(n).prop("disabled",!1),m(e("#searchInputpengajuandana").val(),u)},error:function(o){if(s.html(n).prop("disabled",!1),o.status===422&&o.responseJSON.errors){const l=o.responseJSON.errors,p=Object.values(l).flat().join(" | ");d(p,"error")}else d("Terjadi kesalahan saat menyimpan data!","error")}})})});e(document).on("click",".edit-btn",function(){x=e(this).data("id"),w(),e("#modalTitle").text("Edit Data Pengajuandana"),e("#modalIcon").removeClass().addClass("fas fa-money-bill"),e("#submitText").text("Update Data"),e("#submitIcon").removeClass("fa-save").addClass("fa-edit"),e.ajax({url:"/admin/pengajuandana/"+x,type:"GET",success:function(t){e("#pengajuandanaId").val(t.id),e("#pengajuandanaSemester").val(t.semester),e("#pengajuandanaIpsemester").val(t.ip_semester),e("#pengajuandanaPengajuandana").val(t.tipe).trigger("change"),t.tipe===1?(e("#sppTetap").val(r(t.spp_tetap)),e("#sppVariabel").val(r(t.spp_variabel)),e("#praktikumPaket").val(r(t.praktikum)),v()):t.tipe===2&&(e("#jumlahSks").val(r(t.jml_sks)),e("#nominal").val(r(t.nominal)),e("#praktikumSks").val(r(t.praktikum)),h()),j("pengajuandanaModal")},error:function(t){console.error("Gagal ambil data:",t.responseText),alert("Gagal ambil data pengajuandana")}})});e(document).on("click",".delete-btn",function(){const t=e(this).data("id"),s=e(this).data("name");e("#deletepengajuandanaId").val(t),e("#deletePengajuandanaName").text(s),b("deleteModal")});e(document).on("click","#confirmDeleteBtn",function(){const t=e(this),s=t.html();t.html('<i class="fas fa-spinner fa-spin mr-2"></i>Menghapus...').prop("disabled",!0);const n=e("#deletepengajuandanaId").val();e.ajax({url:`/admin/pengajuandana/${n}`,type:"DELETE",success:function(a){d(a.message,a.status),c("deleteModal"),m()},error:function(a){let i=a.responseJSON&&a.responseJSON.message?a.responseJSON.message:"Gagal menghapus data!";d(i,"error")},complete:function(){t.html(s).prop("disabled",!1)}})});e("#removeFoto").on("click",function(){let t=e("#pengajuandanaId").val();if(!t){d("ID Pengajuandana tidak ditemukan.");return}e.ajax({url:"/pengajuandana/deleteFoto",type:"POST",data:{id:t},success:function(s){s.success?(e("#pengajuandanaFoto").val(""),e("#previewContainer").addClass("hidden"),e("#preview").attr("src",""),d(s.message,"success")):d("Gagal menghapus foto.")},error:function(){d("Terjadi kesalahan.")}})});e(document).on("input","#approveDanaDisetujui",function(){let t=e(this).val().replace(/[^0-9]/g,"");e(this).val(r(t))});e(document).on("click",".approve-btn",function(){const t=e(this).data("id");C(),e("#approvepengajuandanaId").val(t),b("approveModal")});e(document).on("click","#confirApproveBtn",function(){const t=e(this),s=t.html();t.html('<i class="fas fa-spinner fa-spin mr-2"></i>Menyimpan...').prop("disabled",!0);const n=e("#approvepengajuandanaId").val();let a=e("#approveDanaDisetujui").val(),i=e("#approveCatatan").val();a=a.replace(/[^0-9]/g,""),e.ajax({url:`/admin/pengajuandanaapprove/${n}`,type:"PUT",data:{nominal_disetujui:a,catatan:i},success:function(o){d(o.message,o.status),c("approveModal"),m()},error:function(o){let l=o.responseJSON&&o.responseJSON.message?o.responseJSON.message:"Gagal menyimpan data!";d(l,"error")},complete:function(){t.html(s).prop("disabled",!1)}})});e(document).on("click",".reject-btn",function(){const t=e(this).data("id");C(),e("#rejectpengajuandanaId").val(t),b("rejectModal")});e(document).on("click","#confirmRejectBtn",function(){const t=e(this),s=t.html();t.html('<i class="fas fa-spinner fa-spin mr-2"></i>Menyimpan...').prop("disabled",!0);const n=e("#rejectpengajuandanaId").val(),a=e("#rejectCatatan").val();e.ajax({url:`/admin/pengajuandanareject/${n}`,type:"PUT",data:{catatan:a},success:function(i){d(i.message,i.status),c("rejectModal"),m()},error:function(i){let o=i.responseJSON&&i.responseJSON.message?i.responseJSON.message:"Gagal menolak data!";d(o,"error")},complete:function(){t.html(s).prop("disabled",!1)}})});function C(){e("#approveDanaDisetujui").val("").removeClass("border-red-300 bg-red-50"),e("#approveCatatan").val("").removeClass("border-red-300 bg-red-50"),e("#rejectCatatan").val("").removeClass("border-red-300 bg-red-50"),e("#approvepengajuandanaId").val(""),typeof f=="function"&&(f("#approveDanaDisetujui"),f("#approveCatatan"),f("#rejectCatatan"))}e(document).on("click",".detail-btn",function(){const t=e(this).data("id");b("detailpengajuandanaModal"),e.ajax({url:`/admin/mahasiswa/pengajuandanadetail/${t}`,type:"GET",success:function(s){const n=parseInt(s.tipe);e("#det_semester").text(`Semester ${s.semester}`),e("#det_ip").text(s.ip_semester),e("#det_tipe").text(n===1?"Paket":"SKS"),e("#detailPaket").addClass("hidden"),e("#detailSks").addClass("hidden"),n===1?(e("#detailPaket").removeClass("hidden"),e("#det_spp_tetap").text(r(s.spp_tetap)),e("#det_spp_variabel").text(r(s.spp_variabel)),e("#det_praktikum_paket").text(r(s.praktikum)),v()):n===2&&(e("#detailSks").removeClass("hidden"),e("#det_jml_sks").text(r(s.jml_sks)),e("#det_nominal").text(r(s.nominal)),e("#det_praktikum_sks").text(r(s.praktikum)),h())},error:function(){d("Gagal mengambil data detail","error")}})});e(document).on("click",".tab-btn",function(){const t=e(this).data("tab");e(".tab-btn").removeClass("active-tab border-blue-700 text-blue-700").addClass("border-transparent text-gray-500"),e(this).addClass("active-tab border-blue-700 text-blue-700").removeClass("border-transparent text-gray-500"),e(".tab-content").addClass("hidden"),e("#"+t).removeClass("hidden")});e(document).on("click",".detail-btn",function(){e('.tab-btn[data-tab="tab-biodata"]').trigger("click")});
