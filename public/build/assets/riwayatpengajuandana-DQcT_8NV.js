import{$ as t}from"./jquery-BvxTx_lq.js";t.ajaxSetup({headers:{"X-CSRF-TOKEN":t('meta[name="csrf-token"]').attr("content")}});t(function(){c()});function i(e){if(!e)return"";let a=e.toString().replace(/[^,\d]/g,"").split(","),n=a[0].length%3,r=a[0].substr(0,n),o=a[0].substr(n).match(/\d{3}/gi);return o&&(r+=(n?".":"")+o.join(".")),r=a[1]!==void 0?r+","+a[1]:r,"Rp "+r}let d=1;const m=10;function k(e){const s=t("#tablePengajuandana");if(s.empty(),e.length===0){s.append(`
            <tr>
                <td colspan="8" class="px-6 py-10 text-center text-gray-500">
                    <i class="fas fa-info-circle text-gray-300 text-4xl mb-3 block"></i>
                    Tidak ada data ditemukan
                </td>
            </tr>
        `);return}e.forEach((a,n)=>{const r=f(a.status),o=a?.mahasiswa?.user?.name||"Unknown",u=o.charAt(0).toUpperCase(),h=a.mahasiswa?.user?.akademik?.mitra?.nama_mitra||"-",v=`
            <tr class="hover:bg-gray-50 transition-colors duration-200 border-b border-gray-100">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    ${n+1}
                </td>

                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                        <div class="flex-shrink-0 h-10 w-10">
                            <div class="h-10 w-10 rounded-full bg-gradient-to-r from-blue-600 to-blue-400 flex items-center justify-center text-white font-bold shadow-sm">
                                ${u}
                            </div>
                        </div>
                        <div class="ml-4">
                            <div class="text-sm font-semibold text-gray-900">${o}</div>
                            <div class="text-xs text-gray-500">Mahasiswa</div>
                        </div>
                    </div>
                </td>

                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm font-semibold text-gray-900">${h}</div>
                    <div class="text-xs text-gray-500">Mitra</div>
                </td>

                <td class="px-6 py-4 whitespace-nowrap text-sm">
                    <span class="px-2 py-1 bg-gray-100 text-gray-700 font-bold rounded border border-gray-200">
                        ${a.ip_semester||"0.00"}
                    </span>
                </td>

                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ${i(a.total)}
                </td>

                <td class="px-6 py-4 text-sm text-gray-700">
                    ${a.catatan||"-"}
                </td>

                <td class="px-6 py-4 whitespace-nowrap text-sm">
                    ${r}
                </td>

                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button class="detail-btn inline-flex items-center px-3 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all shadow-sm" data-id="${a.id}">
                        <i class="fas fa-info-circle mr-1.5"></i> Detail
                    </button>
                </td>
            </tr>
        `;s.append(v)})}function y(e){const s=t("#cardContainer");if(s.empty(),e.length===0){s.append('<div class="p-8 text-center text-gray-400">Data tidak tersedia</div>');return}e.forEach(a=>{let n=f(a.status);const r=`
            <div class="bg-white p-5 rounded-xl border border-gray-100 shadow-sm active:scale-[0.98] transition-transform">
                <div class="flex justify-between items-start mb-4">
                    <div class="flex items-center space-x-3">
                        <div class="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold">
                            ${a.mahasiswa?.user?.name.charAt(0)}
                        </div>
                        <div>
                            <h3 class="text-sm font-bold text-gray-900">${a.mahasiswa?.user?.name}</h3>
                            <p class="text-xs text-gray-500 line-clamp-1">${a.mahasiswa?.user?.akademik?.mitra?.nama_mitra||"-"}</p>
                        </div>
                    </div>
                    ${n}
                </div>
                
                <div class="grid grid-cols-2 gap-4 py-3 border-y border-dashed border-gray-100 my-3">
                    <div>
                        <p class="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Total Dana</p>
                        <p class="text-sm font-black text-blue-700">${i(a.total)}</p>
                    </div>
                    <div>
                        <p class="text-[10px] uppercase tracking-wider text-gray-400 font-bold">IP Semester</p>
                        <p class="text-sm font-bold text-gray-700">${a.ip_semester||"-"}</p>
                    </div>
                </div>

                <div class="flex space-x-2 mt-4">
                    <button class="detail-btn flex-1 py-2 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold hover:bg-blue-100 transition-colors" data-id="${a.id}">
                        <i class="fas fa-info-circle mr-1"></i> Detail
                    </button>
                    <button class="edit-btn px-4 py-2 bg-yellow-50 text-yellow-600 rounded-lg text-xs font-bold" data-id="${a.id}">
                        <i class="fas fa-edit"></i>
                    </button>
                </div>
            </div>
        `;s.append(r)})}function f(e){const s=String(e).toLowerCase();return s==="1"||s==="pending"?'<span class="px-2 py-1 text-[10px] font-bold rounded bg-yellow-100 text-yellow-700 border border-yellow-200">PENDING</span>':s==="2"||s==="approved"?'<span class="px-2 py-1 text-[10px] font-bold rounded bg-green-100 text-green-700 border border-green-200">APPROVED</span>':s==="3"||s==="rejected"?'<span class="px-2 py-1 text-[10px] font-bold rounded bg-red-100 text-red-700 border border-red-200">REJECTED</span>':'<span class="px-2 py-1 text-[10px] font-bold rounded bg-gray-100 text-gray-600">UNKNOWN</span>'}function w(e,s){const a=t("#pagination");if(a.empty(),!(e<=1))for(let n=1;n<=e;n++){const r=t(`<button class="page-btn mx-1 px-3 py-1 rounded-lg border ${n===d?"bg-orange-primary text-white":"bg-white text-gray-700 hover:bg-gray-100"}">${n}</button>`);r.on("click",function(){d=n,c(s,d)}),a.append(r)}}function C(e,s){const a=t("#paginationMobile");if(a.empty(),!(e<=1))for(let n=1;n<=e;n++){const r=t(`<button class="px-3 py-1 rounded-lg border ${n===d?"bg-orange-primary text-white":"bg-white text-gray-700 hover:bg-gray-100"}">${n}</button>`);r.on("click",function(){d=n,c(s,d)}),a.append(r)}}function c(e="",s=1){t.ajax({url:"/admin/getriwayatpengajuandana",type:"GET",data:{search:e,page:s,limit:m},dataType:"json",success:function(a){const n=a.data;if(!Array.isArray(n)){console.error("Response data bukan array:",n);return}k(n),y(n),w(a.last_page,e),C(a.last_page,e);let r=(a.current_page-1)*m+1,o=r+n.length-1;t("#resultCount").html(`
                <i class="fas fa-info-circle mr-1"></i>
                Menampilkan ${r} - ${o} dari ${a.total} data
            `)},error:function(a,n,r){console.error("Gagal ambil data:",r,a.responseText)}})}t("#searchInputriwayatpengajuandana").on("input",function(){const e=t(this).val();d=1,c(e,d)});function j(){t("#riwayatpengajuandanaForm")[0].reset(),t("#riwayatpengajuandanaForm input, #riwayatpengajuandanaForm select, #riwayatpengajuandanaForm textarea").removeClass("border-red-300 bg-red-50"),t("#riwayatpengajuandanaForm input, #riwayatpengajuandanaForm select").each(function(){t(this).removeClass("border-red-300 bg-red-50"),S(this)}),t("#riwayatpengajuandanaPengajuandana").val("").trigger("change"),t("#preview").attr("src",""),t("#previewContainer").addClass("hidden")}function $(e){const s=t("#"+e);s.removeClass("hidden"),setTimeout(()=>{s.find(".modal-content").addClass("show")},10),t("body").addClass("overflow-hidden")}function S(e){const a=t(e).attr("id")+"-error";t("#"+a).remove()}t("#cancelDeleteBtn").on("click",function(){p("deleteModal")});t("#closeModal, #cancelBtn").on("click",function(){p("riwayatpengajuandanaModal")});function p(e){P(e),T()}function P(e){const s=t("#"+e);s.find(".modal-content").removeClass("show"),setTimeout(()=>{s.addClass("hidden"),t("body").removeClass("overflow-hidden")},300)}function T(){t("body").css({overflow:"","padding-right":""})}t(".modal-overlay").on("click",function(e){e.target===this&&(t(this).closest("#riwayatpengajuandanaModal").length?p("riwayatpengajuandanaModal"):t(this).closest("#deleteModal").length&&p("deleteModal"))});function l(e){return parseInt(e.replace(/[^0-9]/g,""))||0}t("#riwayatpengajuandanaPengajuandana").on("change",function(){const e=t(this).val();t("#paketFields input, #sksFields input").val(""),t("#totalPaket, #totalSks").val(""),e==="Paket"?(t("#paketFields").removeClass("hidden"),t("#sksFields").addClass("hidden")):e==="SKS"?(t("#sksFields").removeClass("hidden"),t("#paketFields").addClass("hidden")):t("#paketFields, #sksFields").addClass("hidden")});function b(){const e=l(t("#sppTetap").val()),s=l(t("#sppVariabel").val()),a=l(t("#praktikumPaket").val()),n=e+s+a;t("#totalPaket").val(i(n))}function x(){const e=l(t("#jumlahSks").val()),s=l(t("#nominal").val()),a=l(t("#praktikumSks").val()),n=e*s+a;t("#totalSks").val(i(n))}const F=["#sppTetap","#sppVariabel","#praktikumPaket","#jumlahSks","#nominal","#praktikumSks"];F.forEach(e=>{t(e).on("input",function(){let s=t(this).val();s=s.replace(/[^0-9]/g,""),t(this).val(i(s)),e.includes("Tetap")||e.includes("Variabel")||e.includes("Paket")?b():x()})});let g=null;t(document).on("click",".detail-btn",function(){g=t(this).data("id"),j(),t("#modalTitle").text("Detail Data Riwayat Pengajuan dana"),t("#modalIcon").removeClass().addClass("fas fa-money-bill"),t("#submitText").text("Update Data"),t("#submitIcon").removeClass("fa-save").addClass("fa-edit"),t.ajax({url:"/admin/riwayatpengajuandana/"+g,type:"GET",success:function(e){t("#paketFields").addClass("hidden"),t("#sksFields").addClass("hidden"),t("#riwayatpengajuandanaId").val(e.id),t("#riwayatpengajuandanaSemester").val("Semester "+e.semester),t("#riwayatpengajuandanaIpsemester").val(e.ip_semester);let s="";e.tipe==1?s="Paket":e.tipe==2?s="SKS":s="-",t("#riwayatpengajuandanaPengajuandana").val(s).trigger("change"),Number(e.tipe)===1?(t("#paketFields").removeClass("hidden"),t("#sppTetap").val(i(e.spp_tetap)),t("#sppVariabel").val(i(e.spp_variabel)),t("#praktikumPaket").val(i(e.praktikum)),b()):Number(e.tipe)===2&&(t("#sksFields").removeClass("hidden"),t("#jumlahSks").val(e.jml_sks),t("#nominal").val(i(e.nominal)),t("#praktikumSks").val(i(e.praktikum)),x()),$("riwayatpengajuandanaModal")},error:function(e){console.error("Gagal ambil data:",e.responseText),alert("Gagal ambil data riwayatpengajuandana")}})});
