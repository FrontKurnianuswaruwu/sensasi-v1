import{$ as e}from"./jquery-BvxTx_lq.js";e.ajaxSetup({headers:{"X-CSRF-TOKEN":e('meta[name="csrf-token"]').attr("content")}});e(function(){u()});function o(t){if(!t)return"";let a=t.toString().replace(/[^,\d]/g,"").split(","),n=a[0].length%3,r=a[0].substr(0,n),l=a[0].substr(n).match(/\d{3}/gi);return l&&(r+=(n?".":"")+l.join(".")),r=a[1]!==void 0?r+","+a[1]:r,"Rp "+r}let d=1;const b=10;function h(t){const s=e("#tablePengajuandana");if(s.empty(),t.length===0){s.append(`
            <tr>
                <td colspan="5" class="px-6 py-10 text-center text-gray-500">
                    <i class="fas fa-info-circle text-gray-300 text-4xl mb-3 block"></i>
                    Tidak ada data ditemukan
                </td>
            </tr>
        `);return}t.forEach((a,n)=>{const r=a.semester?`Semester ${a.semester}`:"-";let l="";switch(a.status){case 1:case"pending":l='<span class="px-3 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-700 border border-yellow-300">Pending</span>';break;case 2:case"approved":l='<span class="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700 border border-green-300">Approved</span>';break;case 3:case"rejected":l='<span class="px-3 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-700 border border-red-300">Rejected</span>';break;default:l='<span class="px-3 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-700 border border-gray-300">Unknown</span>'}const c=a.semester?"S"+a.semester:"-",x=`
            <tr class="hover:bg-gray-50 transition-colors duration-200 border-b border-gray-100">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    ${n+1}
                </td>

                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                        <div class="flex-shrink-0 h-10 w-10">
                            <div class="h-10 w-10 rounded-full bg-gradient-to-r from-blue-600 to-blue-400 flex items-center justify-center text-white font-bold shadow-sm">
                                ${c}
                            </div>
                        </div>
                        <div class="ml-4">
                            <div class="text-sm font-semibold text-gray-900">${r}</div>
                            <div class="text-xs text-gray-500">Semester</div>
                        </div>
                    </div>
                </td>

                <td class="px-6 py-4 whitespace-nowrap text-sm">
                    <span class="px-2 py-1 bg-gray-100 text-gray-700 font-bold rounded border border-gray-200">
                        ${a.ip_semester||"0.00"}
                    </span>
                </td>

                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ${o(a.total)}
                </td>

                <td class="px-6 py-4 whitespace-nowrap text-sm">
                    ${l}
                </td>

                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button class="detail-btn inline-flex items-center px-3 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all shadow-sm" data-id="${a.id}">
                        <i class="fas fa-info-circle mr-1.5"></i> Detail
                    </button>
                </td>
            </tr>
        `;s.append(x)})}function v(t){const s=e("#cardContainer");if(s.empty(),t.length===0){s.append(`
            <div class="p-10 text-center text-gray-500">
                <i class="fas fa-info-circle text-gray-300 text-4xl mb-3 block"></i>
                Tidak ada data ditemukan
            </div>
        `);return}t.forEach(a=>{const n=a.semester?`Semester ${a.semester}`:"-",r=a.semester?"S"+a.semester:"-";let l="";switch(a.status){case 1:case"pending":l='<span class="px-3 py-1 text-[10px] font-bold rounded-full bg-yellow-100 text-yellow-700 border border-yellow-300">PENDING</span>';break;case 2:case"approved":l='<span class="px-3 py-1 text-[10px] font-bold rounded-full bg-green-100 text-green-700 border border-green-300">APPROVED</span>';break;case 3:case"rejected":l='<span class="px-3 py-1 text-[10px] font-bold rounded-full bg-red-100 text-red-700 border border-red-300">REJECTED</span>';break;default:l='<span class="px-3 py-1 text-[10px] font-bold rounded-full bg-gray-100 text-gray-700 border border-gray-300">UNKNOWN</span>'}const c=`
            <div class="bg-white p-5 rounded-xl border border-gray-100 shadow-sm active:scale-[0.98] transition-transform mb-4">
                <div class="flex justify-between items-start mb-4">
                    <div class="flex items-center space-x-3">
                        <div class="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold">
                            ${r}
                        </div>
                        <div>
                            <h3 class="text-sm font-bold text-gray-900">${n}</h3>
                            <p class="text-xs text-gray-500 line-clamp-1">Pengajuan Dana Mahasiswa</p>
                        </div>
                    </div>
                    ${l}
                </div>
                
                <div class="grid grid-cols-2 gap-4 py-3 border-y border-dashed border-gray-100 my-3">
                    <div>
                        <p class="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Total Dana</p>
                        <p class="text-sm font-black text-blue-700">${o(a.total)}</p>
                    </div>
                    <div>
                        <p class="text-[10px] uppercase tracking-wider text-gray-400 font-bold">IP Semester</p>
                        <p class="text-sm font-bold text-gray-700">${a.ip_semester||"0.00"}</p>
                    </div>
                </div>

                <div class="flex space-x-2 mt-4">
                    <button class="detail-btn flex-1 py-2 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold hover:bg-blue-100 transition-colors" 
                        data-id="${a.id}">
                        <i class="fas fa-info-circle mr-1"></i> Detail
                    </button>
                    <button class="edit-btn px-4 py-2 bg-yellow-50 text-yellow-600 rounded-lg text-xs font-bold hover:bg-yellow-100 transition-colors" 
                        data-id="${a.id}">
                        <i class="fas fa-edit"></i>
                    </button>
                </div>
            </div>
        `;s.append(c)})}function y(t,s){const a=e("#pagination");if(a.empty(),!(t<=1))for(let n=1;n<=t;n++){const r=e(`<button class="page-btn mx-1 px-3 py-1 rounded-lg border ${n===d?"bg-orange-primary text-white":"bg-white text-gray-700 hover:bg-gray-100"}">${n}</button>`);r.on("click",function(){d=n,u(s,d)}),a.append(r)}}function k(t,s){const a=e("#paginationMobile");if(a.empty(),!(t<=1))for(let n=1;n<=t;n++){const r=e(`<button class="px-3 py-1 rounded-lg border ${n===d?"bg-orange-primary text-white":"bg-white text-gray-700 hover:bg-gray-100"}">${n}</button>`);r.on("click",function(){d=n,u(s,d)}),a.append(r)}}function u(t="",s=1){e.ajax({url:"/admin/getapprovalpengajuandana",type:"GET",data:{search:t,page:s,limit:b},dataType:"json",success:function(a){const n=a.data;if(!Array.isArray(n)){console.error("Response data bukan array:",n);return}h(n),v(n),y(a.last_page,t),k(a.last_page,t);let r=(a.current_page-1)*b+1,l=r+n.length-1;e("#resultCount").html(`
                <i class="fas fa-info-circle mr-1"></i>
                Menampilkan ${r} - ${l} dari ${a.total} data
            `)},error:function(a,n,r){console.error("Gagal ambil data:",r,a.responseText)}})}e("#searchInputapprovalpengajuandana").on("input",function(){const t=e(this).val();d=1,u(t,d)});function w(){e("#approvalpengajuandanaForm")[0].reset(),e("#approvalpengajuandanaForm input, #approvalpengajuandanaForm select, #approvalpengajuandanaForm textarea").removeClass("border-red-300 bg-red-50"),e("#approvalpengajuandanaForm input, #approvalpengajuandanaForm select").each(function(){e(this).removeClass("border-red-300 bg-red-50"),S(this)}),e("#approvalpengajuandanaPengajuandana").val("").trigger("change"),e("#preview").attr("src",""),e("#previewContainer").addClass("hidden")}function C(t){const s=e("#"+t);s.removeClass("hidden"),setTimeout(()=>{s.find(".modal-content").addClass("show")},10),e("body").addClass("overflow-hidden")}function S(t){const a=e(t).attr("id")+"-error";e("#"+a).remove()}e("#cancelDeleteBtn").on("click",function(){p("deleteModal")});e("#closeModal, #cancelBtn").on("click",function(){p("approvalpengajuandanaModal")});function p(t){$(t),j()}function $(t){const s=e("#"+t);s.find(".modal-content").removeClass("show"),setTimeout(()=>{s.addClass("hidden"),e("body").removeClass("overflow-hidden")},300)}function j(){e("body").css({overflow:"","padding-right":""})}e(".modal-overlay").on("click",function(t){t.target===this&&(e(this).closest("#approvalpengajuandanaModal").length?p("approvalpengajuandanaModal"):e(this).closest("#deleteModal").length&&p("deleteModal"))});function i(t){return parseInt(t.replace(/[^0-9]/g,""))||0}e("#approvalpengajuandanaPengajuandana").on("change",function(){const t=e(this).val();e("#paketFields input, #sksFields input").val(""),e("#totalPaket, #totalSks").val(""),t==="Paket"?(e("#paketFields").removeClass("hidden"),e("#sksFields").addClass("hidden")):t==="SKS"?(e("#sksFields").removeClass("hidden"),e("#paketFields").addClass("hidden")):e("#paketFields, #sksFields").addClass("hidden")});function f(){const t=i(e("#sppTetap").val()),s=i(e("#sppVariabel").val()),a=i(e("#praktikumPaket").val()),n=t+s+a;e("#totalPaket").val(o(n))}function g(){const t=i(e("#jumlahSks").val()),s=i(e("#nominal").val()),a=i(e("#praktikumSks").val()),n=t*s+a;e("#totalSks").val(o(n))}const P=["#sppTetap","#sppVariabel","#praktikumPaket","#jumlahSks","#nominal","#praktikumSks"];P.forEach(t=>{e(t).on("input",function(){let s=e(this).val();s=s.replace(/[^0-9]/g,""),e(this).val(o(s)),t.includes("Tetap")||t.includes("Variabel")||t.includes("Paket")?f():g()})});let m=null;e(document).on("click",".detail-btn",function(){m=e(this).data("id"),w(),e("#modalTitle").text("Detail Data Riwayat Pengajuan dana"),e("#modalIcon").removeClass().addClass("fas fa-money-bill"),e("#submitText").text("Update Data"),e("#submitIcon").removeClass("fa-save").addClass("fa-edit"),e.ajax({url:"/admin/approvalpengajuandana/"+m,type:"GET",success:function(t){e("#paketFields").addClass("hidden"),e("#sksFields").addClass("hidden"),e("#approvalpengajuandanaId").val(t.id),e("#approvalpengajuandanaSemester").val("Semester "+t.semester),e("#approvalpengajuandanaIpsemester").val(t.ip_semester);let s="";t.tipe==1?s="Paket":t.tipe==2?s="SKS":s="-",e("#approvalpengajuandanaPengajuandana").val(s).trigger("change"),Number(t.tipe)===1?(e("#paketFields").removeClass("hidden"),e("#sppTetap").val(o(t.spp_tetap)),e("#sppVariabel").val(o(t.spp_variabel)),e("#praktikumPaket").val(o(t.praktikum)),f()):Number(t.tipe)===2&&(e("#sksFields").removeClass("hidden"),e("#jumlahSks").val(t.jml_sks),e("#nominal").val(o(t.nominal)),e("#praktikumSks").val(o(t.praktikum)),g()),C("approvalpengajuandanaModal")},error:function(t){console.error("Gagal ambil data:",t.responseText),alert("Gagal ambil data approvalpengajuandana")}})});
