import{$ as e}from"./jquery-BvxTx_lq.js";e.ajaxSetup({headers:{"X-CSRF-TOKEN":e('meta[name="csrf-token"]').attr("content")}});e(function(){p()});function i(t){if(!t)return"";let a=t.toString().replace(/[^,\d]/g,"").split(","),n=a[0].length%3,l=a[0].substr(0,n),r=a[0].substr(n).match(/\d{3}/gi);return r&&(l+=(n?".":"")+r.join(".")),l=a[1]!==void 0?l+","+a[1]:l,"Rp "+l}let d=1;const m=10;function b(t){const s=e("#tablePengajuandana");if(s.empty(),t.length===0){s.append(`
            <tr>
                <td colspan="5" class="px-6 py-8 text-center text-gray-500">
                    <i class="fas fa-info-circle text-gray-400 mr-2"></i>
                    Tidak ada data ditemukan
                </td>
            </tr>
        `);return}t.forEach((a,n)=>{const l=a.semester?`Semester ${a.semester}`:"-";let r="";switch(a.status){case 1:case"pending":r='<span class="px-3 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-700 border border-yellow-300">Pending</span>';break;case 2:case"approved":r='<span class="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700 border border-green-300">Approved</span>';break;case 3:case"rejected":r='<span class="px-3 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-700 border border-red-300">Rejected</span>';break;default:r='<span class="px-3 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-700 border border-gray-300">Unknown</span>'}const u=`
            <tr class="hover:bg-gray-50 transition-colors duration-200">
            <td class="px-6 py-4 text-sm text-gray-900">${n+1}</td>
            <td class="px-6 py-4">
                <div class="flex items-center">
                <div class="flex-shrink-0 h-10 w-10">
                    <div class="h-10 w-10 rounded-full bg-gradient-to-r gradient-bg to-blue-light flex items-center justify-center text-white font-semibold">
                    ${a.semester?"S"+a.semester:"-"}
                    </div>
                </div>
                <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">${l}</div>
                </div>
                </div>
            </td>
            <td class="px-6 py-4 text-sm text-gray-900">
                ${a.ip_semester||"-"}
            </td>
            <td class="px-6 py-4 text-sm text-gray-900">
                ${i(a.total)}
            </td>
            <td class="px-6 py-4 text-sm text-gray-900">
                ${r}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm">
                <button class="detail-btn px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all mr-2" data-id="${a.id}">
                    <i class="fas fa-info-circle"></i> Detail
                </button>
            </td>
            </tr>
        `;s.append(u)})}function k(t,s){const a=e("#pagination");if(a.empty(),!(t<=1))for(let n=1;n<=t;n++){const l=e(`<button class="page-btn mx-1 px-3 py-1 rounded-lg border ${n===d?"bg-orange-primary text-white":"bg-white text-gray-700 hover:bg-gray-100"}">${n}</button>`);l.on("click",function(){d=n,p(s,d)}),a.append(l)}}function p(t="",s=1){e.ajax({url:"/admin/getapprovalpengajuandana",type:"GET",data:{search:t,page:s,limit:m},dataType:"json",success:function(a){const n=a.data;if(!Array.isArray(n)){console.error("Response data bukan array:",n);return}b(n),k(a.last_page,t);let l=(a.current_page-1)*m+1,r=l+n.length-1;e("#resultCount").html(`
                <i class="fas fa-info-circle mr-1"></i>
                Menampilkan ${l} - ${r} dari ${a.total} data
            `)},error:function(a,n,l){console.error("Gagal ambil data:",l,a.responseText)}})}e("#searchInputapprovalpengajuandana").on("input",function(){const t=e(this).val();d=1,p(t,d)});function v(){e("#approvalpengajuandanaForm")[0].reset(),e("#approvalpengajuandanaForm input, #approvalpengajuandanaForm select, #approvalpengajuandanaForm textarea").removeClass("border-red-300 bg-red-50"),e("#approvalpengajuandanaForm input, #approvalpengajuandanaForm select").each(function(){e(this).removeClass("border-red-300 bg-red-50"),y(this)}),e("#approvalpengajuandanaPengajuandana").val("").trigger("change"),e("#preview").attr("src",""),e("#previewContainer").addClass("hidden")}function x(t){const s=e("#"+t);s.removeClass("hidden"),setTimeout(()=>{s.find(".modal-content").addClass("show")},10),e("body").addClass("overflow-hidden")}function y(t){const a=e(t).attr("id")+"-error";e("#"+a).remove()}e("#cancelDeleteBtn").on("click",function(){c("deleteModal")});e("#closeModal, #cancelBtn").on("click",function(){c("approvalpengajuandanaModal")});function c(t){C(t),w()}function C(t){const s=e("#"+t);s.find(".modal-content").removeClass("show"),setTimeout(()=>{s.addClass("hidden"),e("body").removeClass("overflow-hidden")},300)}function w(){e("body").css({overflow:"","padding-right":""})}e(".modal-overlay").on("click",function(t){t.target===this&&(e(this).closest("#approvalpengajuandanaModal").length?c("approvalpengajuandanaModal"):e(this).closest("#deleteModal").length&&c("deleteModal"))});function o(t){return parseInt(t.replace(/[^0-9]/g,""))||0}e("#approvalpengajuandanaPengajuandana").on("change",function(){const t=e(this).val();e("#paketFields input, #sksFields input").val(""),e("#totalPaket, #totalSks").val(""),t==="Paket"?(e("#paketFields").removeClass("hidden"),e("#sksFields").addClass("hidden")):t==="SKS"?(e("#sksFields").removeClass("hidden"),e("#paketFields").addClass("hidden")):e("#paketFields, #sksFields").addClass("hidden")});function g(){const t=o(e("#sppTetap").val()),s=o(e("#sppVariabel").val()),a=o(e("#praktikumPaket").val()),n=t+s+a;e("#totalPaket").val(i(n))}function h(){const t=o(e("#jumlahSks").val()),s=o(e("#nominal").val()),a=o(e("#praktikumSks").val()),n=t*s+a;e("#totalSks").val(i(n))}const S=["#sppTetap","#sppVariabel","#praktikumPaket","#jumlahSks","#nominal","#praktikumSks"];S.forEach(t=>{e(t).on("input",function(){let s=e(this).val();s=s.replace(/[^0-9]/g,""),e(this).val(i(s)),t.includes("Tetap")||t.includes("Variabel")||t.includes("Paket")?g():h()})});let f=null;e(document).on("click",".detail-btn",function(){f=e(this).data("id"),v(),e("#modalTitle").text("Detail Data Riwayat Pengajuan dana"),e("#modalIcon").removeClass().addClass("fas fa-money-bill"),e("#submitText").text("Update Data"),e("#submitIcon").removeClass("fa-save").addClass("fa-edit"),e.ajax({url:"/admin/approvalpengajuandana/"+f,type:"GET",success:function(t){e("#paketFields").addClass("hidden"),e("#sksFields").addClass("hidden"),e("#approvalpengajuandanaId").val(t.id),e("#approvalpengajuandanaSemester").val("Semester "+t.semester),e("#approvalpengajuandanaIpsemester").val(t.ip_semester);let s="";t.tipe==1?s="Paket":t.tipe==2?s="SKS":s="-",e("#approvalpengajuandanaPengajuandana").val(s).trigger("change"),Number(t.tipe)===1?(e("#paketFields").removeClass("hidden"),e("#sppTetap").val(i(t.spp_tetap)),e("#sppVariabel").val(i(t.spp_variabel)),e("#praktikumPaket").val(i(t.praktikum)),g()):Number(t.tipe)===2&&(e("#sksFields").removeClass("hidden"),e("#jumlahSks").val(t.jml_sks),e("#nominal").val(i(t.nominal)),e("#praktikumSks").val(i(t.praktikum)),h()),x("approvalpengajuandanaModal")},error:function(t){console.error("Gagal ambil data:",t.responseText),alert("Gagal ambil data approvalpengajuandana")}})});
