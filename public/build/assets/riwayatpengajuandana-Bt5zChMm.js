import{$ as a}from"./jquery-CEr4rF5i.js";a.ajaxSetup({headers:{"X-CSRF-TOKEN":a('meta[name="csrf-token"]').attr("content")}});a(function(){v(),c()});function v(){a.ajax({url:"/admin/riwayatpengajuandana-tahun-akademik",type:"GET",dataType:"json",success:function(t){const e=a("#filterTahunAkademikRiwayat");e.length!==0&&t.forEach(function(n){e.append(`<option value="${n.id}">${n.tahun_akademik}</option>`)})},error:function(t){console.error("Gagal load tahun akademik:",t.responseText)}})}a(document).on("change","#filterTahunAkademikRiwayat",function(){o=1,c(a("#searchInputriwayatpengajuandana").val(),o)});a(document).on("click","#downloadExcelRiwayatBtn",function(){const t=a("#filterTahunAkademikRiwayat").val()||"";window.location.href=`/admin/riwayatpengajuandana-export?tahun_akademik_id=${t}`});function d(t){if(!t)return"";let n=t.toString().replace(/[^,\d]/g,"").split(","),s=n[0].length%3,i=n[0].substr(0,s),r=n[0].substr(s).match(/\d{3}/gi);return r&&(i+=(s?".":"")+r.join(".")),i=n[1]!==void 0?i+","+n[1]:i,"Rp "+i}let o=1;const m=10;function y(t){const e=a("#tablePengajuandana");if(e.empty(),t.length===0){e.append(`
            <tr>
                <td colspan="8" class="px-6 py-10 text-center text-gray-500">
                    <i class="fas fa-info-circle text-gray-300 text-4xl mb-3 block"></i>
                    Tidak ada data ditemukan
                </td>
            </tr>
        `);return}t.forEach((n,s)=>{const i=f(n.status),r=n?.mahasiswa?.user?.name||"Unknown",p=r.charAt(0).toUpperCase(),x=n.mahasiswa?.user?.akademik?.mitra?.nama_mitra||"-",k=`
            <tr class="hover:bg-gray-50 transition-colors duration-200 border-b border-gray-100">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    ${s+1}
                </td>

                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                        <div class="flex-shrink-0 h-10 w-10">
                            <div class="h-10 w-10 rounded-full bg-gradient-to-r from-blue-600 to-blue-400 flex items-center justify-center text-white font-bold shadow-sm">
                                ${p}
                            </div>
                        </div>
                        <div class="ml-4">
                            <div class="text-sm font-semibold text-gray-900">${r}</div>
                            <div class="text-xs text-gray-500">Mahasiswa</div>
                        </div>
                    </div>
                </td>

                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm font-semibold text-gray-900">${x}</div>
                    <div class="text-xs text-gray-500">Mitra</div>
                </td>

                <td class="px-6 py-4 whitespace-nowrap text-sm">
                    <span class="px-2 py-1 bg-gray-100 text-gray-700 font-bold rounded border border-gray-200">
                        ${n.ip_semester||"0.00"}
                    </span>
                </td>

                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ${d(n.total)}
                </td>

                <td class="px-6 py-4 text-sm text-gray-700">
                    ${n.catatan||"-"}
                </td>

                <td class="px-6 py-4 whitespace-nowrap text-sm">
                    ${i}
                </td>

                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button class="detail-btn inline-flex items-center px-3 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all shadow-sm" data-id="${n.id}">
                        <i class="fas fa-info-circle mr-1.5"></i> Detail
                    </button>
                </td>
            </tr>
        `;e.append(k)})}function w(t){const e=a("#cardContainer");if(e.empty(),t.length===0){e.append('<div class="p-8 text-center text-gray-400">Data tidak tersedia</div>');return}t.forEach(n=>{let s=f(n.status);const i=`
            <div class="bg-white p-5 rounded-xl border border-gray-100 shadow-sm active:scale-[0.98] transition-transform">
                <div class="flex justify-between items-start mb-4">
                    <div class="flex items-center space-x-3">
                        <div class="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold">
                            ${n.mahasiswa?.user?.name.charAt(0)}
                        </div>
                        <div>
                            <h3 class="text-sm font-bold text-gray-900">${n.mahasiswa?.user?.name}</h3>
                            <p class="text-xs text-gray-500 line-clamp-1">${n.mahasiswa?.user?.akademik?.mitra?.nama_mitra||"-"}</p>
                        </div>
                    </div>
                    ${s}
                </div>
                
                <div class="grid grid-cols-2 gap-4 py-3 border-y border-dashed border-gray-100 my-3">
                    <div>
                        <p class="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Total Dana</p>
                        <p class="text-sm font-black text-blue-700">${d(n.total)}</p>
                    </div>
                    <div>
                        <p class="text-[10px] uppercase tracking-wider text-gray-400 font-bold">IP Semester</p>
                        <p class="text-sm font-bold text-gray-700">${n.ip_semester||"-"}</p>
                    </div>
                </div>

                <div class="flex space-x-2 mt-4">
                    <button class="detail-btn flex-1 py-2 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold hover:bg-blue-100 transition-colors" data-id="${n.id}">
                        <i class="fas fa-info-circle mr-1"></i> Detail
                    </button>
                    <button class="edit-btn px-4 py-2 bg-yellow-50 text-yellow-600 rounded-lg text-xs font-bold" data-id="${n.id}">
                        <i class="fas fa-edit"></i>
                    </button>
                </div>
            </div>
        `;e.append(i)})}function f(t){const e=String(t).toLowerCase();return e==="1"||e==="pending"?'<span class="px-2 py-1 text-[10px] font-bold rounded bg-yellow-100 text-yellow-700 border border-yellow-200">PENDING</span>':e==="2"||e==="approved"?'<span class="px-2 py-1 text-[10px] font-bold rounded bg-green-100 text-green-700 border border-green-200">APPROVED</span>':e==="3"||e==="rejected"?'<span class="px-2 py-1 text-[10px] font-bold rounded bg-red-100 text-red-700 border border-red-200">REJECTED</span>':'<span class="px-2 py-1 text-[10px] font-bold rounded bg-gray-100 text-gray-600">UNKNOWN</span>'}function j(t,e){const n=a("#pagination");if(n.empty(),!(t<=1))for(let s=1;s<=t;s++){const i=a(`<button class="page-btn mx-1 px-3 py-1 rounded-lg border ${s===o?"bg-orange-primary text-white":"bg-white text-gray-700 hover:bg-gray-100"}">${s}</button>`);i.on("click",function(){o=s,c(e,o)}),n.append(i)}}function C(t,e){const n=a("#paginationMobile");if(n.empty(),!(t<=1))for(let s=1;s<=t;s++){const i=a(`<button class="px-3 py-1 rounded-lg border ${s===o?"bg-orange-primary text-white":"bg-white text-gray-700 hover:bg-gray-100"}">${s}</button>`);i.on("click",function(){o=s,c(e,o)}),n.append(i)}}function c(t="",e=1){const n=a("#filterTahunAkademikRiwayat").val()||"";a.ajax({url:"/admin/getriwayatpengajuandana",type:"GET",data:{search:t,page:e,limit:m,tahun_akademik_id:n},dataType:"json",success:function(s){const i=s.data;if(!Array.isArray(i)){console.error("Response data bukan array:",i);return}y(i),w(i),j(s.last_page,t),C(s.last_page,t);let r=(s.current_page-1)*m+1,p=r+i.length-1;a("#resultCount").html(`
                <i class="fas fa-info-circle mr-1"></i>
                Menampilkan ${r} - ${p} dari ${s.total} data
            `)},error:function(s,i,r){console.error("Gagal ambil data:",r,s.responseText)}})}a("#searchInputriwayatpengajuandana").on("input",function(){const t=a(this).val();o=1,c(t,o)});function T(){a("#riwayatpengajuandanaForm")[0].reset(),a("#riwayatpengajuandanaForm input, #riwayatpengajuandanaForm select, #riwayatpengajuandanaForm textarea").removeClass("border-red-300 bg-red-50"),a("#riwayatpengajuandanaForm input, #riwayatpengajuandanaForm select").each(function(){a(this).removeClass("border-red-300 bg-red-50"),S(this)}),a("#riwayatpengajuandanaPengajuandana").val("").trigger("change"),a("#preview").attr("src",""),a("#previewContainer").addClass("hidden")}function $(t){const e=a("#"+t);e.removeClass("hidden"),setTimeout(()=>{e.find(".modal-content").addClass("show")},10),a("body").addClass("overflow-hidden")}function S(t){const n=a(t).attr("id")+"-error";a("#"+n).remove()}a("#cancelDeleteBtn").on("click",function(){u("deleteModal")});a("#closeModal, #cancelBtn").on("click",function(){u("riwayatpengajuandanaModal")});function u(t){P(t),F()}function P(t){const e=a("#"+t);e.find(".modal-content").removeClass("show"),setTimeout(()=>{e.addClass("hidden"),a("body").removeClass("overflow-hidden")},300)}function F(){a("body").css({overflow:"","padding-right":""})}a(".modal-overlay").on("click",function(t){t.target===this&&(a(this).closest("#riwayatpengajuandanaModal").length?u("riwayatpengajuandanaModal"):a(this).closest("#deleteModal").length&&u("deleteModal"))});function l(t){return parseInt(t.replace(/[^0-9]/g,""))||0}a("#riwayatpengajuandanaPengajuandana").on("change",function(){const t=a(this).val();a("#paketFields input, #sksFields input").val(""),a("#totalPaket, #totalSks").val(""),t==="Paket"?(a("#paketFields").removeClass("hidden"),a("#sksFields").addClass("hidden")):t==="SKS"?(a("#sksFields").removeClass("hidden"),a("#paketFields").addClass("hidden")):a("#paketFields, #sksFields").addClass("hidden")});function h(){const t=l(a("#sppTetap").val()),e=l(a("#sppVariabel").val()),n=l(a("#praktikumPaket").val()),s=t+e+n;a("#totalPaket").val(d(s))}function b(){const t=l(a("#jumlahSks").val()),e=l(a("#nominal").val()),n=l(a("#praktikumSks").val()),s=t*e+n;a("#totalSks").val(d(s))}const M=["#sppTetap","#sppVariabel","#praktikumPaket","#jumlahSks","#nominal","#praktikumSks"];M.forEach(t=>{a(t).on("input",function(){let e=a(this).val();e=e.replace(/[^0-9]/g,""),a(this).val(d(e)),t.includes("Tetap")||t.includes("Variabel")||t.includes("Paket")?h():b()})});let g=null;a(document).on("click",".detail-btn",function(){g=a(this).data("id"),T(),a("#modalTitle").text("Detail Data Riwayat Pengajuan dana"),a("#modalIcon").removeClass().addClass("fas fa-money-bill"),a("#submitText").text("Update Data"),a("#submitIcon").removeClass("fa-save").addClass("fa-edit"),a.ajax({url:"/admin/riwayatpengajuandana/"+g,type:"GET",success:function(t){a("#paketFields").addClass("hidden"),a("#sksFields").addClass("hidden"),a("#riwayatpengajuandanaId").val(t.id),a("#riwayatpengajuandanaSemester").val("Semester "+t.semester),a("#riwayatpengajuandanaIpsemester").val(t.ip_semester);let e="";t.tipe==1?e="Paket":t.tipe==2?e="SKS":e="-",a("#riwayatpengajuandanaPengajuandana").val(e).trigger("change"),Number(t.tipe)===1?(a("#paketFields").removeClass("hidden"),a("#sppTetap").val(d(t.spp_tetap)),a("#sppVariabel").val(d(t.spp_variabel)),a("#praktikumPaket").val(d(t.praktikum)),h()):Number(t.tipe)===2&&(a("#sksFields").removeClass("hidden"),a("#jumlahSks").val(t.jml_sks),a("#nominal").val(d(t.nominal)),a("#praktikumSks").val(d(t.praktikum)),b()),$("riwayatpengajuandanaModal")},error:function(t){console.error("Gagal ambil data:",t.responseText),alert("Gagal ambil data riwayatpengajuandana")}})});
