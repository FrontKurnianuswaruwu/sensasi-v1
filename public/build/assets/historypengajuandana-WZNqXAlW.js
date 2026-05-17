import{$ as t}from"./jquery-BvxTx_lq.js";t.ajaxSetup({headers:{"X-CSRF-TOKEN":t('meta[name="csrf-token"]').attr("content")}});t(function(){m(),w()});function w(){t.ajax({url:"/admin/pengajuandana/gettahunakademik",type:"GET",success:function(e){const s=t("#filterTahunAkademikHistory");e.forEach(function(n){s.append(`<option value="${n.id}">${n.tahun_akademik}</option>`)})},error:function(e){console.error("Gagal load tahun akademik:",e)}})}t("#downloadExcelHistoryBtn").on("click",function(){const e=t("#filterTahunAkademikHistory").val();let s="/admin/pengajuandana/exportapproved";e&&(s+="?tahun_akademik_id="+e),window.location.href=s});t("#filterTahunAkademikHistory").on("change",function(){r=1,m(t("#searchInputpengajuandana").val(),r)});function d(e){if(!e)return"";let n=e.toString().replace(/[^,\d]/g,"").split(","),a=n[0].length%3,i=n[0].substr(0,a),o=n[0].substr(a).match(/\d{3}/gi);return o&&(i+=(a?".":"")+o.join(".")),i=n[1]!==void 0?i+","+n[1]:i,"Rp "+i}let r=1;const h=10;function _(e,s){const n=t("#tablePengajuandana");if(n.empty(),e.length===0){n.append(`
            <tr>
                <td colspan="8" class="px-6 py-10 text-center text-gray-500">
                    <i class="fas fa-info-circle text-gray-300 text-4xl mb-3 block"></i>
                    Tidak ada data ditemukan
                </td>
            </tr>
        `);return}e.forEach((a,i)=>{const o=a.semester?`Semester ${a.semester}`:"-",l='<span class="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700 border border-green-300">Approved</span>',p=a.mahasiswa?.user?.name??"-",v=p.charAt(0).toUpperCase(),y=a.mahasiswa?.mitra?.nama_mitra??"-",k=`
            <tr class="hover:bg-gray-50 transition-colors duration-200 border-b border-gray-100">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    ${i+1}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                        <div class="flex-shrink-0 h-10 w-10">
                            <div class="h-10 w-10 rounded-full bg-gradient-to-r from-blue-600 to-blue-400 flex items-center justify-center text-white font-bold shadow-sm">
                                ${v}
                            </div>
                        </div>
                        <div class="ml-4">
                            <div class="text-sm font-semibold text-gray-900">${p}</div>
                            <div class="text-xs text-gray-500">Mahasiswa</div>
                        </div>
                    </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center gap-2">
                        <div class="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                            <i class="fas fa-university text-blue-500 text-xs"></i>
                        </div>
                        <span class="text-sm text-gray-700 font-medium">${y}</span>
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
                    ${d(a.total)}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-green-700 font-medium">
                    ${d(a.nominal_disetujui)}
                </td>
                <td class="px-6 py-4 text-sm text-gray-700">
                    ${a.catatan??"-"}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm">
                    ${l}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button class="detail-btn inline-flex items-center px-3 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all shadow-sm" 
                        data-id="${a.id}" title="Lihat Detail">
                        <i class="fas fa-eye mr-1.5"></i> Detail
                    </button>
                </td>
            </tr>
        `;n.append(k)})}function $(e,s){const n=t("#cardContainer");if(n.empty(),e.length===0){n.append(`
            <div class="p-10 text-center text-gray-400 font-medium bg-white rounded-xl border border-dashed border-gray-300">
                Tidak ada data pengajuan.
            </div>
        `);return}e.forEach(a=>{const i=a.semester?`Semester ${a.semester}`:"-",o=a.status?.toString().toLowerCase();let l="";o==="1"||o==="pending"?l='<span class="px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-yellow-100 text-yellow-700 border border-yellow-200">Pending</span>':o==="2"||o==="approved"?l='<span class="px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-green-100 text-green-700 border border-green-200">Approved</span>':(o==="3"||o==="rejected")&&(l='<span class="px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-red-100 text-red-700 border border-red-200">Rejected</span>');const p=`
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
                        <span class="font-bold text-blue-600">${d(a.total)}</span>
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
        `;n.append(p)})}function C(e,s){const n=t("#pagination");if(n.empty(),!(e<=1))for(let a=1;a<=e;a++){const i=t(`<button class="page-btn mx-1 px-3 py-1 rounded-lg border ${a===r?"bg-orange-primary text-white":"bg-white text-gray-700 hover:bg-gray-100"}">${a}</button>`);i.on("click",function(){r=a,m(s,r)}),n.append(i)}}function T(e,s){const n=t("#paginationMobile");if(n.empty(),!(e<=1))for(let a=1;a<=e;a++){const i=t(`<button class="px-3 py-1 rounded-lg border ${a===r?"bg-orange-primary text-white":"bg-white text-gray-700 hover:bg-gray-100"}">${a}</button>`);i.on("click",function(){r=a,m(s,r)}),n.append(i)}}function m(e="",s=1){const n=t("#filterTahunAkademikHistory").val();t.ajax({url:"/admin/gethistorypengajuandana",type:"GET",data:{search:e,page:s,limit:h,tahun_akademik_id:n},dataType:"json",success:function(a){const i=a.data,o=a.is_mahasiswa;if(!Array.isArray(i)){console.error("Response data bukan array:",i);return}_(i),$(i,o),C(a.last_page,e),T(a.last_page,e);let l=(a.current_page-1)*h+1,p=l+i.length-1;t("#resultCount").html(`
                <i class="fas fa-info-circle mr-1"></i>
                Menampilkan ${l} - ${p} dari ${a.total} data
            `)},error:function(a,i,o){console.error("Gagal ambil data:",o,a.responseText)}})}t("#searchInputpengajuandana").on("input",function(){const e=t(this).val();r=1,m(e,r)});function x(e){j(e),M()}function j(e){const s=t("#"+e);s.removeClass("hidden"),setTimeout(()=>{s.find(".modal-content").addClass("show")},10),t("body").addClass("overflow-hidden")}function M(){t("body").css({overflow:"hidden","padding-right":""})}t("#tutupDetailBtn").on("click",function(){c("detailpengajuandanaModal")});t("#closeModal, #cancelBtn").on("click",function(){c("pengajuandanaModal"),c("detailpengajuandanaModal")});function c(e){S(e),I()}function S(e){const s=t("#"+e);s.find(".modal-content").removeClass("show"),setTimeout(()=>{s.addClass("hidden"),t("body").removeClass("overflow-hidden")},300)}function I(){t("body").css({overflow:"","padding-right":""})}t(".modal-overlay").on("click",function(e){e.target===this&&(t(this).closest("#pengajuandanaModal").length?c("pengajuandanaModal"):t(this).closest("#deleteModal").length?c("deleteModal"):t(this).closest("#approveModal").length?c("approveModal"):t(this).closest("#rejectModal").length?c("rejectModal"):t(this).closest("#detailpengajuandanaModal").length&&c("detailpengajuandanaModal"))});function f(e,s="info"){const i=t(`
            <div class="notification flex items-center space-x-3 ${s==="success"?"bg-green-500":s==="error"?"bg-red-500":"bg-blue-500"} text-white px-6 py-4 rounded-xl shadow-lg transform translate-x-full opacity-0 transition-all duration-300 cursor-pointer">
            <i class="fas ${s==="success"?"fa-check-circle":s==="error"?"fa-exclamation-circle":"fa-info-circle"} text-lg"></i>
            <span class="font-medium">${e}</span>
            </div>
            `);t("#notificationWrapper").append(i),setTimeout(()=>{i.removeClass("translate-x-full opacity-0")},100);const o=setTimeout(()=>{i.addClass("translate-x-full opacity-0"),setTimeout(()=>i.remove(),300)},4e3);i.on("click",function(){clearTimeout(o),t(this).addClass("translate-x-full opacity-0"),setTimeout(()=>t(this).remove(),300)})}function u(e){return parseInt(e.replace(/[^0-9]/g,""))||0}t("#pengajuandanaPengajuandana").on("change",function(){const e=t(this).val();t("#paketFields input, #sksFields input").val(""),t("#totalPaket, #totalSks").val(""),e==="1"?(t("#paketFields").removeClass("hidden"),t("#sksFields").addClass("hidden")):e==="2"?(t("#sksFields").removeClass("hidden"),t("#paketFields").addClass("hidden")):t("#paketFields, #sksFields").addClass("hidden")});function g(){const e=u(t("#det_spp_tetap").text()),s=u(t("#det_spp_variabel").text()),n=u(t("#det_praktikum_paket").text()),a=e+s+n;t("#det_total_paket").text(d(a))}function b(){const e=parseInt(t("#det_jml_sks").text())||0,s=u(t("#det_nominal").text()),n=u(t("#det_praktikum_sks").text()),a=e*s+n;t("#det_total_sks").text(d(a))}t(document).ready(function(){["#sppTetap","#sppVariabel","#praktikumPaket","#nominal","#praktikumSks"].forEach(s=>{t(s).on("input",function(){let n=t(this).val().replace(/[^0-9]/g,"");t(this).val(d(n)),s.includes("Sks")||s.includes("nominal")?b():g()})}),t("#jumlahSks").on("input",function(){let s=t(this).val().replace(/[^0-9]/g,"");t(this).val(s),b()})});t("#pengajuandanaSemester").on("change",function(){const e=t(this).val();e&&t.ajax({url:"/admin/get-ip-sebelumnya",type:"GET",data:{semester:e},success:function(s){s.ip?t("#pengajuandanaIpsemester").val(s.ip):(t("#pengajuandanaIpsemester").val(""),f(s.message,s.status))},error:function(){t("#pengajuandanaIpsemester").val(""),f("Gagal mengambil data IP Semester sebelumnya","error")}})});t("#addSubpengajuandanaBtn").on("click",function(){resetForm(),t("#pengajuandanaId").val(""),t("#modalTitle").text("Tambah Pengajuandana Baru"),t("#modalIcon").removeClass().addClass("fas fa-money-bill"),t("#submitText").text("Simpan Data"),t("#submitIcon").removeClass("fa-edit").addClass("fa-save"),x("pengajuandanaModal"),t("#pengajuandanaIsparent").val("")});t(document).on("click",".detail-btn",function(){const e=t(this).data("id");x("detailpengajuandanaModal"),t.ajax({url:`/admin/mahasiswa/pengajuandanadetail/${e}`,type:"GET",success:function(s){const n=parseInt(s.tipe);t("#det_semester").text(`Semester ${s.semester}`),t("#det_ip").text(s.ip_semester),t("#det_tipe").text(n===1?"Paket":"SKS"),t("#detailPaket").addClass("hidden"),t("#detailSks").addClass("hidden"),n===1?(t("#detailPaket").removeClass("hidden"),t("#det_spp_tetap").text(d(s.spp_tetap)),t("#det_spp_variabel").text(d(s.spp_variabel)),t("#det_praktikum_paket").text(d(s.praktikum)),g()):n===2&&(t("#detailSks").removeClass("hidden"),t("#det_jml_sks").text(d(s.jml_sks)),t("#det_nominal").text(d(s.nominal)),t("#det_praktikum_sks").text(d(s.praktikum)),b())},error:function(){f("Gagal mengambil data detail","error")}})});t(document).on("click",".tab-btn",function(){const e=t(this).data("tab");t(".tab-btn").removeClass("active-tab border-blue-700 text-blue-700").addClass("border-transparent text-gray-500"),t(this).addClass("active-tab border-blue-700 text-blue-700").removeClass("border-transparent text-gray-500"),t(".tab-content").addClass("hidden"),t("#"+e).removeClass("hidden")});t(document).on("click",".detail-btn",function(){t('.tab-btn[data-tab="tab-biodata"]').trigger("click")});
