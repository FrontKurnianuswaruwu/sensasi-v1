import{$ as e}from"./jquery-BvxTx_lq.js";e.ajaxSetup({headers:{"X-CSRF-TOKEN":e('meta[name="csrf-token"]').attr("content")}});e(function(){m()});function M(a){if(!a)return"-";const n=["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"],s=new Date(a);return isNaN(s)?"-":`${s.getDate()} ${n[s.getMonth()]} ${s.getFullYear()}`}function c(a){if(!a)return"";let s=a.toString().replace(/[^,\d]/g,"").split(","),t=s[0].length%3,i=s[0].substr(0,t),o=s[0].substr(t).match(/\d{3}/gi);return o&&(i+=(t?".":"")+o.join(".")),i=s[1]!==void 0?i+","+s[1]:i,"Rp "+i}let p=1;const w=10;function T(a,n){const s=e("#tablePengajuandana");if(s.empty(),a.length===0){s.append(`
            <tr>
                <td colspan="8" class="px-6 py-10 text-center text-gray-500">
                    <i class="fas fa-info-circle text-gray-300 text-4xl mb-3 block"></i>
                    Tidak ada data ditemukan
                </td>
            </tr>
        `);return}a.forEach((t,i)=>{const o=t.semester?`Semester ${t.semester}`:"-";let r="";switch(t.status){case 1:case"pending":r='<span class="px-3 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-700 border border-yellow-300">Pending</span>';break;case 2:case"approved":r='<span class="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700 border border-green-300">Approved</span>';break;case 3:case"rejected":r='<span class="px-3 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-700 border border-red-300">Rejected</span>';break;default:r='<span class="px-3 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-700 border border-gray-300">Unknown</span>'}let d="";n?t.status==="approved"?d=`
                    <i class="fas fa-lock text-gray-400" title="Aksi tidak tersedia"></i>
                `:t.status==="pending"?d=`
                    <button class="delete-btn inline-flex items-center px-3 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all shadow-sm" 
                        data-id="${t.id}" data-name="${o}">
                        <i class="fas fa-trash mr-1.5"></i> Hapus
                    </button>
                `:d=`
                    <button class="edit-btn inline-flex items-center px-3 py-1.5 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all shadow-sm mr-2" 
                        data-id="${t.id}">
                        <i class="fas fa-edit mr-1.5"></i> Edit
                    </button>
                    <button class="delete-btn inline-flex items-center px-3 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all shadow-sm" 
                        data-id="${t.id}" data-name="${o}">
                        <i class="fas fa-trash mr-1.5"></i> Hapus
                    </button>
                `:t.status==="approved"||t.status==="rejected"?d=`
                    <button class="detail-btn inline-flex items-center px-3 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all shadow-sm mr-2" 
                        data-id="${t.mahasiswa_id}" title="Lihat Detail">
                        <i class="fas fa-eye mr-1.5"></i> Detail
                    </button>
                    <i class="fas fa-lock text-gray-400" title="Aksi tidak tersedia"></i>
                `:d=`
                    <button class="detail-btn inline-flex items-center px-3 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all shadow-sm mr-2" 
                        data-id="${t.mahasiswa_id}" title="Lihat Detail">
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
                `;const f=t.mahasiswa?.user?.name??"-",k=f.charAt(0).toUpperCase(),x=`
            <tr class="hover:bg-gray-50 transition-colors duration-200 border-b border-gray-100">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    ${i+1}
                </td>

                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                        <div class="flex-shrink-0 h-10 w-10">
                            <div class="h-10 w-10 rounded-full bg-gradient-to-r from-blue-600 to-blue-400 flex items-center justify-center text-white font-bold shadow-sm">
                                ${k}
                            </div>
                        </div>
                        <div class="ml-4">
                            <div class="text-sm font-semibold text-gray-900">${f}</div>
                            <div class="text-xs text-gray-500">Mahasiswa</div>
                        </div>
                    </div>
                </td>

                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-medium">
                    ${o}
                </td>

                <td class="px-6 py-4 whitespace-nowrap text-sm">
                    <span class="px-2 py-1 bg-gray-100 text-gray-700 font-bold rounded border border-gray-200">
                        ${t.ip_semester??"0.00"}
                    </span>
                </td>

                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                    ${c(t.total)}
                </td>

                <td class="px-6 py-4 text-sm text-gray-700">
                    ${t.catatan??"-"}
                </td>

                <td class="px-6 py-4 whitespace-nowrap text-sm">
                    ${r}
                </td>

                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    ${d}
                </td>
            </tr>
        `;s.append(x)})}function S(a,n){const s=e("#cardContainer");if(s.empty(),a.length===0){s.append(`
            <div class="p-10 text-center text-gray-400 font-medium bg-white rounded-xl border border-dashed border-gray-300">
                Tidak ada data pengajuan.
            </div>
        `);return}a.forEach(t=>{const i=t.semester?`Semester ${t.semester}`:"-",o=t.status?.toString().toLowerCase();let r="";o==="1"||o==="pending"?r='<span class="px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-yellow-100 text-yellow-700 border border-yellow-200">Pending</span>':o==="2"||o==="approved"?r='<span class="px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-green-100 text-green-700 border border-green-200">Approved</span>':(o==="3"||o==="rejected")&&(r='<span class="px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-red-100 text-red-700 border border-red-200">Rejected</span>');const d=`
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
                    <div class="flex justify-between text-sm">
                        <span class="text-gray-500">Total Dana:</span>
                        <span class="font-bold text-blue-600">${c(t.total)}</span>
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
                        <button class="detail-btn flex-1 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-bold shadow-sm" data-id="${t.mahasiswa_id}"><i class="fas fa-eye mr-1"></i> Detail</button>
                        ${o==="pending"||o==="1"?`
                            <button class="approve-btn flex-1 py-2.5 bg-green-500 text-white rounded-lg text-sm font-bold shadow-sm" data-id="${t.id}"><i class="fas fa-check"></i></button>
                            <button class="reject-btn flex-1 py-2.5 bg-gray-600 text-white rounded-lg text-sm font-bold shadow-sm" data-id="${t.id}"><i class="fas fa-times"></i></button>
                        `:""}
                    `}
                </div>
            </div>
        `;s.append(d)})}function I(a,n){const s=e("#pagination");if(s.empty(),!(a<=1))for(let t=1;t<=a;t++){const i=e(`<button class="page-btn mx-1 px-3 py-1 rounded-lg border ${t===p?"bg-orange-primary text-white":"bg-white text-gray-700 hover:bg-gray-100"}">${t}</button>`);i.on("click",function(){p=t,m(n,p)}),s.append(i)}}function P(a,n){const s=e("#paginationMobile");if(s.empty(),!(a<=1))for(let t=1;t<=a;t++){const i=e(`<button class="px-3 py-1 rounded-lg border ${t===p?"bg-orange-primary text-white":"bg-white text-gray-700 hover:bg-gray-100"}">${t}</button>`);i.on("click",function(){p=t,m(n,p)}),s.append(i)}}function m(a="",n=1){e.ajax({url:"/admin/getpengajuandana",type:"GET",data:{search:a,page:n,limit:w},dataType:"json",success:function(s){const t=s.data,i=s.is_mahasiswa;if(!Array.isArray(t)){console.error("Response data bukan array:",t);return}T(t,i),S(t,i),I(s.last_page,a),P(s.last_page,a);let o=(s.current_page-1)*w+1,r=o+t.length-1;e("#resultCount").html(`
                <i class="fas fa-info-circle mr-1"></i>
                Menampilkan ${o} - ${r} dari ${s.total} data
            `)},error:function(s,t,i){console.error("Gagal ambil data:",i,s.responseText)}})}e("#searchInputpengajuandana").on("input",function(){const a=e(this).val();p=1,m(a,p)});function j(){e("#pengajuandanaForm")[0].reset(),e("#pengajuandanaForm input, #pengajuandanaForm select, #pengajuandanaForm textarea").removeClass("border-red-300 bg-red-50"),e("#pengajuandanaForm input, #pengajuandanaForm select").each(function(){e(this).removeClass("border-red-300 bg-red-50"),g(this)}),e("#pengajuandanaPengajuandana").val("").trigger("change"),e("#preview").attr("src",""),e("#previewContainer").addClass("hidden")}function h(a){_(a),D()}function _(a){const n=e("#"+a);n.removeClass("hidden"),setTimeout(()=>{n.find(".modal-content").addClass("show")},10),e("body").addClass("overflow-hidden")}function D(){e("body").css({overflow:"hidden","padding-right":""})}function g(a){const s=e(a).attr("id")+"-error";e("#"+s).remove()}e("#cancelDeleteBtn").on("click",function(){u("deleteModal")});e("#cancelDeleteBtnApprove").on("click",function(){u("approveModal")});e("#cancelMahasiswaBtn").on("click",function(){u("detailMahasiswaModal")});e("#cancelRejectBtn").on("click",function(){u("rejectModal")});e("#closeModal, #cancelBtn").on("click",function(){u("pengajuandanaModal")});function u(a){F(a),B()}function F(a){const n=e("#"+a);n.find(".modal-content").removeClass("show"),setTimeout(()=>{n.addClass("hidden"),e("body").removeClass("overflow-hidden")},300)}function B(){e("body").css({overflow:"","padding-right":""})}e(".modal-overlay").on("click",function(a){a.target===this&&(e(this).closest("#pengajuandanaModal").length?u("pengajuandanaModal"):e(this).closest("#deleteModal").length?u("deleteModal"):e(this).closest("#approveModal").length?u("approveModal"):e(this).closest("#rejectModal").length?u("rejectModal"):e(this).closest("#detailMahasiswaModal").length&&u("detailMahasiswaModal"))});function l(a,n="info"){const i=e(`
            <div class="notification flex items-center space-x-3 ${n==="success"?"bg-green-500":n==="error"?"bg-red-500":"bg-blue-500"} text-white px-6 py-4 rounded-xl shadow-lg transform translate-x-full opacity-0 transition-all duration-300 cursor-pointer">
            <i class="fas ${n==="success"?"fa-check-circle":n==="error"?"fa-exclamation-circle":"fa-info-circle"} text-lg"></i>
            <span class="font-medium">${a}</span>
            </div>
            `);e("#notificationWrapper").append(i),setTimeout(()=>{i.removeClass("translate-x-full opacity-0")},100);const o=setTimeout(()=>{i.addClass("translate-x-full opacity-0"),setTimeout(()=>i.remove(),300)},4e3);i.on("click",function(){clearTimeout(o),e(this).addClass("translate-x-full opacity-0"),setTimeout(()=>e(this).remove(),300)})}function E(){let a=!0;return["pengajuandanaSemester","pengajuandanaIpsemester"].forEach(function(s){const t=e("#"+s);!t.val()||!t.val().toString().trim()?(t.addClass("border-red-300 bg-red-50"),a=!1):t.removeClass("border-red-300 bg-red-50")}),a}function b(a){return parseInt(a.replace(/[^0-9]/g,""))||0}e("#pengajuandanaPengajuandana").on("change",function(){const a=e(this).val();e("#paketFields input, #sksFields input").val(""),e("#totalPaket, #totalSks").val(""),a==="1"?(e("#paketFields").removeClass("hidden"),e("#sksFields").addClass("hidden")):a==="2"?(e("#sksFields").removeClass("hidden"),e("#paketFields").addClass("hidden")):e("#paketFields, #sksFields").addClass("hidden")});function C(){const a=b(e("#sppTetap").val()),n=b(e("#sppVariabel").val()),s=b(e("#praktikumPaket").val()),t=a+n+s;e("#totalPaket").val(c(t))}function v(){const a=parseInt(e("#jumlahSks").val())||0,n=b(e("#nominal").val()),s=b(e("#praktikumSks").val()),t=a*n+s;e("#totalSks").val(c(t))}e(document).ready(function(){["#sppTetap","#sppVariabel","#praktikumPaket","#nominal","#praktikumSks"].forEach(n=>{e(n).on("input",function(){let s=e(this).val().replace(/[^0-9]/g,"");e(this).val(c(s)),n.includes("Sks")||n.includes("nominal")?v():C()})}),e("#jumlahSks").on("input",function(){let n=e(this).val().replace(/[^0-9]/g,"");e(this).val(n),v()})});e("#pengajuandanaSemester").on("change",function(){const a=e(this).val();a&&e.ajax({url:"/admin/get-ip-sebelumnya",type:"GET",data:{semester:a},success:function(n){n.ip?e("#pengajuandanaIpsemester").val(n.ip):(e("#pengajuandanaIpsemester").val(""),l(n.message,n.status))},error:function(){e("#pengajuandanaIpsemester").val(""),l("Gagal mengambil data IP Semester sebelumnya","error")}})});let y=null;e("#addSubpengajuandanaBtn").on("click",function(){y=null,j(),e("#pengajuandanaId").val(""),e("#modalTitle").text("Tambah Pengajuandana Baru"),e("#modalIcon").removeClass().addClass("fas fa-money-bill"),e("#submitText").text("Simpan Data"),e("#submitIcon").removeClass("fa-edit").addClass("fa-save"),h("pengajuandanaModal"),e("#pengajuandanaIsparent").val("")});e(function(){e("#pengajuandanaForm").on("submit",function(a){if(a.preventDefault(),!E()){l("Mohon lengkapi semua field yang wajib diisi!","error");return}const n=e("#submitBtn"),s=n.html();n.html('<i class="fas fa-spinner fa-spin mr-2"></i>Menyimpan...').prop("disabled",!0),e(".rupiah-input").each(function(){const o=e(this).val().replace(/[^0-9]/g,"");e(this).val(o||0)});const t=e("#pengajuandanaId").val(),i=t?`/admin/pengajuandana/${t}`:"/admin/pengajuandana";e.ajax({url:i,type:"POST",data:e("#pengajuandanaForm").serialize()+(t?"&_method=PUT":""),success:function(o){l(o.message,o.status),u("pengajuandanaModal"),n.html(s).prop("disabled",!1),m(e("#searchInputpengajuandana").val(),p)},error:function(o){if(n.html(s).prop("disabled",!1),o.status===422&&o.responseJSON.errors){const r=o.responseJSON.errors,d=Object.values(r).flat().join(" | ");l(d,"error")}else l("Terjadi kesalahan saat menyimpan data!","error")}})})});e(document).on("click",".edit-btn",function(){y=e(this).data("id"),j(),e("#modalTitle").text("Edit Data Pengajuandana"),e("#modalIcon").removeClass().addClass("fas fa-money-bill"),e("#submitText").text("Update Data"),e("#submitIcon").removeClass("fa-save").addClass("fa-edit"),e.ajax({url:"/admin/pengajuandana/"+y,type:"GET",success:function(a){e("#pengajuandanaId").val(a.id),e("#pengajuandanaSemester").val(a.semester),e("#pengajuandanaIpsemester").val(a.ip_semester),e("#pengajuandanaPengajuandana").val(a.tipe).trigger("change"),a.tipe===1?(e("#sppTetap").val(c(a.spp_tetap)),e("#sppVariabel").val(c(a.spp_variabel)),e("#praktikumPaket").val(c(a.praktikum)),C()):a.tipe===2&&(e("#jumlahSks").val(c(a.jml_sks)),e("#nominal").val(c(a.nominal)),e("#praktikumSks").val(c(a.praktikum)),v()),_("pengajuandanaModal")},error:function(a){console.error("Gagal ambil data:",a.responseText),alert("Gagal ambil data pengajuandana")}})});e(document).on("click",".delete-btn",function(){const a=e(this).data("id"),n=e(this).data("name");e("#deletepengajuandanaId").val(a),e("#deletePengajuandanaName").text(n),h("deleteModal")});e(document).on("click","#confirmDeleteBtn",function(){const a=e(this),n=a.html();a.html('<i class="fas fa-spinner fa-spin mr-2"></i>Menghapus...').prop("disabled",!0);const s=e("#deletepengajuandanaId").val();e.ajax({url:`/admin/pengajuandana/${s}`,type:"DELETE",success:function(t){l(t.message,t.status),u("deleteModal"),m()},error:function(t){let i=t.responseJSON&&t.responseJSON.message?t.responseJSON.message:"Gagal menghapus data!";l(i,"error")},complete:function(){a.html(n).prop("disabled",!1)}})});e("#removeFoto").on("click",function(){let a=e("#pengajuandanaId").val();if(!a){l("ID Pengajuandana tidak ditemukan.");return}e.ajax({url:"/pengajuandana/deleteFoto",type:"POST",data:{id:a},success:function(n){n.success?(e("#pengajuandanaFoto").val(""),e("#previewContainer").addClass("hidden"),e("#preview").attr("src",""),l(n.message,"success")):l("Gagal menghapus foto.")},error:function(){l("Terjadi kesalahan.")}})});e(document).on("input","#approveDanaDisetujui",function(){let a=e(this).val().replace(/[^0-9]/g,"");e(this).val(c(a))});e(document).on("click",".approve-btn",function(){const a=e(this).data("id");$(),e("#approvepengajuandanaId").val(a),h("approveModal")});e(document).on("click","#confirApproveBtn",function(){const a=e(this),n=a.html();a.html('<i class="fas fa-spinner fa-spin mr-2"></i>Menyimpan...').prop("disabled",!0);const s=e("#approvepengajuandanaId").val();let t=e("#approveDanaDisetujui").val(),i=e("#approveCatatan").val();t=t.replace(/[^0-9]/g,""),e.ajax({url:`/admin/pengajuandanaapprove/${s}`,type:"PUT",data:{nominal_disetujui:t,catatan:i},success:function(o){l(o.message,o.status),u("approveModal"),m()},error:function(o){let r=o.responseJSON&&o.responseJSON.message?o.responseJSON.message:"Gagal menyimpan data!";l(r,"error")},complete:function(){a.html(n).prop("disabled",!1)}})});e(document).on("click",".reject-btn",function(){const a=e(this).data("id");$(),e("#rejectpengajuandanaId").val(a),h("rejectModal")});e(document).on("click","#confirmRejectBtn",function(){const a=e(this),n=a.html();a.html('<i class="fas fa-spinner fa-spin mr-2"></i>Menyimpan...').prop("disabled",!0);const s=e("#rejectpengajuandanaId").val(),t=e("#rejectCatatan").val();e.ajax({url:`/admin/pengajuandanareject/${s}`,type:"PUT",data:{catatan:t},success:function(i){l(i.message,i.status),u("rejectModal"),m()},error:function(i){let o=i.responseJSON&&i.responseJSON.message?i.responseJSON.message:"Gagal menolak data!";l(o,"error")},complete:function(){a.html(n).prop("disabled",!1)}})});function $(){e("#approveDanaDisetujui").val("").removeClass("border-red-300 bg-red-50"),e("#approveCatatan").val("").removeClass("border-red-300 bg-red-50"),e("#rejectCatatan").val("").removeClass("border-red-300 bg-red-50"),e("#approvepengajuandanaId").val(""),typeof g=="function"&&(g("#approveDanaDisetujui"),g("#approveCatatan"),g("#rejectCatatan"))}e(document).on("click",".detail-btn",function(){const a=e(this).data("id");h("detailMahasiswaModal"),e.ajax({url:`/admin/mahasiswa/detail/${a}`,type:"GET",success:function(n){e("#detail_nama_mahasiswa").text(n.user.name),e("#detail_nim").text("NIM: "+n.nim),e("#det_jk").text(n.jenis_kelamin),e("#det_email").text(n.user.email),e("#det_agama").text(n.agama),e("#det_telp").text(n.no_wa),e("#det_alamat").text(n.alamat_ktp),e("#det_semester").text(n.user.akademik.semester),e("#det_ipk").text(n.user.akademik.ip_terakhir),e("#det_status").text(n.user.status_user),e("#det_ayah_nama").text(n.user.orangtua.nama_ayah),e("#det_ayah_kerja").text(n.user.orangtua.pekerjaan_ayah),e("#det_ibu_nama").text(n.user.orangtua.nama_ibu),e("#det_ibu_kerja").text(n.user.orangtua.pekerjaan_ibu),e("#det_tgllahir").text(M(n.tanggal_lahir)),e("#det_universitas").text(n.mitra.nama_mitra),e("#det_ayah_gaji").text(c(n.user.orangtua.penghasilan_ayah)),e("#det_ibu_gaji").text(c(n.user.orangtua.penghasilan_ibu)),e("#det_ortu_telp").text(n.user.orangtua.no_wa_ortu),e("#det_tanggungan").text(n.user.orangtua.jumlah_tanggungan);const s=e("#detail_foto_profil"),t=window.defaultAvatar;if(s.off("error"),n.foto){const d=window.location.origin+"/"+n.foto;s.one("error",function(){e(this).attr("src",t)}).attr("src",d)}else s.attr("src",t);const i=e("#document-list");i.empty();const o=[{field:"scan_ktp",label:"Scan KTP"},{field:"scan_kartu_mahasiswa",label:"Kartu Mahasiswa"},{field:"scan_kk",label:"Kartu Keluarga"},{field:"transkrip_nilai",label:"Transkrip Nilai"},{field:"surat_keterangan_aktif",label:"Surat Aktif"},{field:"essay_motivasi",label:"Essay Motivasi"}],r=n.user.dokumen;r?o.forEach(d=>{const f=r[d.field];if(f){const x=`
                            <a href="${window.location.origin+"/"+f}" target="_blank" class="flex items-center p-3 border-2 border-gray-100 rounded-xl hover:bg-gray-50 transition group">
                                <div class="w-10 h-10 bg-red-100 text-red-600 rounded-lg flex items-center justify-center mr-3 group-hover:bg-red-600 group-hover:text-white transition">
                                    <i class="fas fa-file-pdf"></i>
                                </div>
                                <div class="flex flex-col">
                                    <span class="text-xs text-gray-400 uppercase font-bold">${d.label}</span>
                                    <span class="text-sm font-medium text-gray-700 truncate max-w-[150px]">Lihat Dokumen</span>
                                </div>
                            </a>
                        `;i.append(x)}}):i.append('<p class="text-gray-500 italic text-sm">Belum ada dokumen yang diunggah.</p>')},error:function(){l("Gagal mengambil data detail","error")}})});e(document).on("click",".tab-btn",function(){const a=e(this).data("tab");e(".tab-btn").removeClass("active-tab border-blue-700 text-blue-700").addClass("border-transparent text-gray-500"),e(this).addClass("active-tab border-blue-700 text-blue-700").removeClass("border-transparent text-gray-500"),e(".tab-content").addClass("hidden"),e("#"+a).removeClass("hidden")});e(document).on("click",".detail-btn",function(){e('.tab-btn[data-tab="tab-biodata"]').trigger("click")});
