import{$ as e}from"./jquery-BvxTx_lq.js";e.ajaxSetup({headers:{"X-CSRF-TOKEN":e('meta[name="csrf-token"]').attr("content")}});e(function(){c()});function l(a){if(!a)return"";let t=a.toString().replace(/[^,\d]/g,"").split(","),n=t[0].length%3,r=t[0].substr(0,n),i=t[0].substr(n).match(/\d{3}/gi);return i&&(r+=(n?".":"")+i.join(".")),r=t[1]!==void 0?r+","+t[1]:r,"Rp "+r}let d=1;const u=10;function h(a){const s=e("#tablePengajuandana");if(s.empty(),a.length===0){s.append(`
            <tr>
                <td colspan="8" class="px-6 py-8 text-center text-gray-500">
                    <i class="fas fa-info-circle text-gray-400 mr-2"></i>
                    Tidak ada data ditemukan
                </td>
            </tr>
        `);return}a.forEach((t,n)=>{let r="";switch(t.status){case 1:case"pending":r='<span class="px-3 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-700 border border-yellow-300">Pending</span>';break;case 2:case"approved":r='<span class="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700 border border-green-300">Approved</span>';break;case 3:case"rejected":r='<span class="px-3 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-700 border border-red-300">Rejected</span>';break;default:r='<span class="px-3 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-700 border border-gray-300">Unknown</span>'}const i=`
            <tr class="hover:bg-gray-50 transition-colors duration-200">
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${n+1}</td>
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                <div class="flex-shrink-0 h-10 w-10">
                    <div class="h-10 w-10 rounded-full bg-gradient-to-r gradient-bg to-blue-light flex items-center justify-center text-white font-semibold">
                    ${t?.mahasiswa?.user?.name.charAt(0)}
                    </div>
                </div>
                <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">${t?.mahasiswa?.user?.name}</div>
                </div>
                </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                ${t.mahasiswa?.user?.akademik?.mitra?.nama_mitra||"-"}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                ${t.ip_semester||"-"}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                ${l(t.total)}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                ${t.catatan||"-"}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                ${r}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm">
                <button class="detail-btn px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all mr-2" data-id="${t.id}">
                    <i class="fas fa-info-circle"></i> Detail
                </button>
            </td>
            </tr>
        `;s.append(i)})}function b(a,s){const t=e("#pagination");if(t.empty(),!(a<=1))for(let n=1;n<=a;n++){const r=e(`<button class="page-btn mx-1 px-3 py-1 rounded-lg border ${n===d?"bg-orange-primary text-white":"bg-white text-gray-700 hover:bg-gray-100"}">${n}</button>`);r.on("click",function(){d=n,c(s,d)}),t.append(r)}}function c(a="",s=1){e.ajax({url:"/admin/getriwayatpengajuandana",type:"GET",data:{search:a,page:s,limit:u},dataType:"json",success:function(t){const n=t.data;if(!Array.isArray(n)){console.error("Response data bukan array:",n);return}h(n),b(t.last_page,a);let r=(t.current_page-1)*u+1,i=r+n.length-1;e("#resultCount").html(`
                <i class="fas fa-info-circle mr-1"></i>
                Menampilkan ${r} - ${i} dari ${t.total} data
            `)},error:function(t,n,r){console.error("Gagal ambil data:",r,t.responseText)}})}e("#searchInputriwayatpengajuandana").on("input",function(){const a=e(this).val();d=1,c(a,d)});function k(){e("#riwayatpengajuandanaForm")[0].reset(),e("#riwayatpengajuandanaForm input, #riwayatpengajuandanaForm select, #riwayatpengajuandanaForm textarea").removeClass("border-red-300 bg-red-50"),e("#riwayatpengajuandanaForm input, #riwayatpengajuandanaForm select").each(function(){e(this).removeClass("border-red-300 bg-red-50"),v(this)}),e("#riwayatpengajuandanaPengajuandana").val("").trigger("change"),e("#preview").attr("src",""),e("#previewContainer").addClass("hidden")}function x(a){const s=e("#"+a);s.removeClass("hidden"),setTimeout(()=>{s.find(".modal-content").addClass("show")},10),e("body").addClass("overflow-hidden")}function v(a){const t=e(a).attr("id")+"-error";e("#"+t).remove()}e("#cancelDeleteBtn").on("click",function(){p("deleteModal")});e("#closeModal, #cancelBtn").on("click",function(){p("riwayatpengajuandanaModal")});function p(a){y(a),w()}function y(a){const s=e("#"+a);s.find(".modal-content").removeClass("show"),setTimeout(()=>{s.addClass("hidden"),e("body").removeClass("overflow-hidden")},300)}function w(){e("body").css({overflow:"","padding-right":""})}e(".modal-overlay").on("click",function(a){a.target===this&&(e(this).closest("#riwayatpengajuandanaModal").length?p("riwayatpengajuandanaModal"):e(this).closest("#deleteModal").length&&p("deleteModal"))});function o(a){return parseInt(a.replace(/[^0-9]/g,""))||0}e("#riwayatpengajuandanaPengajuandana").on("change",function(){const a=e(this).val();e("#paketFields input, #sksFields input").val(""),e("#totalPaket, #totalSks").val(""),a==="Paket"?(e("#paketFields").removeClass("hidden"),e("#sksFields").addClass("hidden")):a==="SKS"?(e("#sksFields").removeClass("hidden"),e("#paketFields").addClass("hidden")):e("#paketFields, #sksFields").addClass("hidden")});function f(){const a=o(e("#sppTetap").val()),s=o(e("#sppVariabel").val()),t=o(e("#praktikumPaket").val()),n=a+s+t;e("#totalPaket").val(l(n))}function g(){const a=o(e("#jumlahSks").val()),s=o(e("#nominal").val()),t=o(e("#praktikumSks").val()),n=a*s+t;e("#totalSks").val(l(n))}const C=["#sppTetap","#sppVariabel","#praktikumPaket","#jumlahSks","#nominal","#praktikumSks"];C.forEach(a=>{e(a).on("input",function(){let s=e(this).val();s=s.replace(/[^0-9]/g,""),e(this).val(l(s)),a.includes("Tetap")||a.includes("Variabel")||a.includes("Paket")?f():g()})});let m=null;e(document).on("click",".detail-btn",function(){m=e(this).data("id"),k(),e("#modalTitle").text("Detail Data Riwayat Pengajuan dana"),e("#modalIcon").removeClass().addClass("fas fa-money-bill"),e("#submitText").text("Update Data"),e("#submitIcon").removeClass("fa-save").addClass("fa-edit"),e.ajax({url:"/admin/riwayatpengajuandana/"+m,type:"GET",success:function(a){e("#paketFields").addClass("hidden"),e("#sksFields").addClass("hidden"),e("#riwayatpengajuandanaId").val(a.id),e("#riwayatpengajuandanaSemester").val("Semester "+a.semester),e("#riwayatpengajuandanaIpsemester").val(a.ip_semester);let s="";a.tipe==1?s="Paket":a.tipe==2?s="SKS":s="-",e("#riwayatpengajuandanaPengajuandana").val(s).trigger("change"),Number(a.tipe)===1?(e("#paketFields").removeClass("hidden"),e("#sppTetap").val(l(a.spp_tetap)),e("#sppVariabel").val(l(a.spp_variabel)),e("#praktikumPaket").val(l(a.praktikum)),f()):Number(a.tipe)===2&&(e("#sksFields").removeClass("hidden"),e("#jumlahSks").val(a.jml_sks),e("#nominal").val(l(a.nominal)),e("#praktikumSks").val(l(a.praktikum)),g()),x("riwayatpengajuandanaModal")},error:function(a){console.error("Gagal ambil data:",a.responseText),alert("Gagal ambil data riwayatpengajuandana")}})});
