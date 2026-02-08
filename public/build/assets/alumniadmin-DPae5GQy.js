import{$ as t}from"./jquery-BvxTx_lq.js";t.ajaxSetup({headers:{"X-CSRF-TOKEN":t('meta[name="csrf-token"]').attr("content")}});let o=1;const p=10;function w(a){if(!a)return"-";const e=["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"],i=new Date(a);return isNaN(i)?"-":`${i.getDate()} ${e[i.getMonth()]} ${i.getFullYear()}`}function b(a){if(!a)return"";let i=a.toString().replace(/[^,\d]/g,"").split(","),n=i[0].length%3,s=i[0].substr(0,n),r=i[0].substr(n).match(/\d{3}/gi);return r&&(s+=(n?".":"")+r.join(".")),s=i[1]!==void 0?s+","+i[1]:s,"Rp "+s}function _(a){const e=t("#tableBody");if(e.empty(),a.length===0){e.append(`
            <tr>
                <td colspan="5" class="px-6 py-8 text-center text-gray-500">
                    <i class="fas fa-info-circle text-gray-400 mr-2"></i>
                    Tidak ada data ditemukan
                </td>
            </tr>
        `);return}a.forEach((i,n)=>{let s=i.user?.status_user;s==="Tidak Aktif"&&(s="Alumni");const r=s==="Aktif"?"bg-green-100 text-green-800":"bg-blue-100 text-blue-800",d=`
            <tr class="hover:bg-gray-50 transition-colors duration-200">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${n+1}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                        <div class="flex-shrink-0 h-10 w-10">
                            <div class="h-10 w-10 rounded-full bg-gradient-to-r gradient-bg to-blue-light flex items-center justify-center text-white font-semibold">
                                ${i.user?.name.charAt(0)}
                            </div>
                        </div>
                        <div class="ml-4">
                            <div class="text-sm font-medium text-gray-900">${i.user?.name}</div>
                        </div>
                    </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${i.user?.akademik?.mitra?.nama_mitra||"-"}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${i.user?.email}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${r}">
                        ${s??"-"}
                    </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm">
                    ${i.user.status_user!=="Aktif"?`
                            <button class="detail-btn px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all mr-2" 
                                data-id="${i.id}" title="Lihat Detail">
                                <i class="fas fa-eye"></i>
                            </button>
                            <button class="aktif-btn px-3 py-1 text-green-600 hover:text-green-800 transition-all"
                                title="Set PBS Aktif" data-id="${i.user?.id}" data-name="${i.user.name}">
                                <i class="fa-solid fa-circle-check text-xl"></i>
                            </button>
                        `:`
                            <i class="fas fa-lock text-gray-400 text-xl" title="Aksi tidak tersedia"></i>
                        `}
                </td>
            </tr>
        `;e.append(d)})}function $(a){const e=t("#cardContainer");if(e.empty(),a.length===0){e.append(`
            <div class="p-6 text-center text-gray-500">
                <i class="fas fa-info-circle text-gray-400 mr-2"></i>
                Tidak ada data ditemukan
            </div>
        `);return}a.forEach(i=>{let n=i.user?.status_user;n==="Tidak Aktif"&&(n="Alumni");const s=n==="Aktif"?"bg-green-100 text-green-800":"bg-blue-100 text-blue-800",r=`
            <div class="p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200">
                <div class="flex items-start space-x-3">
                    <div class="flex-shrink-0 h-12 w-12 rounded-full bg-gradient-to-r gradient-bg to-blue-light flex items-center justify-center text-white font-semibold text-lg">
                        ${i.user?.name?i.user.name.charAt(0):"?"}
                    </div>

                    <div class="flex-1 min-w-0">
                        <div class="flex items-center justify-between mb-2">
                            <h3 class="text-base font-bold text-gray-900 truncate">
                                ${i.user?.name||"-"}
                            </h3>
                            <span class="px-2 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${s}">
                                ${n??"-"}
                            </span>
                        </div>

                        <div class="space-y-1 text-sm text-gray-600">
                            <div class="flex items-center">
                                <i class="fas fa-university w-4 mr-2 text-blue-500"></i>
                                <span class="truncate">${i.user?.akademik?.mitra?.nama_mitra||"-"}</span>
                            </div>
                            <div class="flex items-center">
                                <i class="fas fa-envelope w-4 mr-2 text-orange-primary"></i>
                                <span class="truncate">${i.user?.email||"-"}</span>
                            </div>
                        </div>

                        <div class="flex mt-4 space-x-2">
                            ${i.user?.status_user!=="Aktif"?`
                                <button class="detail-btn flex-1 flex items-center justify-center px-3 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition-all" 
                                    data-id="${i.id}">
                                    <i class="fas fa-eye mr-2"></i> Detail
                                </button>
                                <button class="aktif-btn flex-1 flex items-center justify-center px-3 py-2 bg-green-500 text-white text-sm font-medium rounded-lg hover:bg-green-600 transition-all"
                                    data-id="${i.user?.id}" data-name="${i.user?.name}">
                                    <i class="fa-solid fa-circle-check mr-2"></i> Aktifkan
                                </button>
                            `:`
                                <div class="flex-1 flex items-center justify-center px-3 py-2 bg-gray-100 text-gray-400 text-sm rounded-lg italic border border-dashed border-gray-300">
                                    <i class="fas fa-lock mr-2"></i> Aksi Terkunci (User Aktif)
                                </div>
                            `}
                        </div>
                    </div>
                </div>
            </div>
        `;e.append(r)})}function c(a="",e=1){t.ajax({url:"/admin/getadminalumni",type:"GET",data:{search:a,page:e,limit:p},dataType:"json",success:function(i){const n=i.data;if(!Array.isArray(n)){console.error("Response data bukan array:",n);return}_(n),$(n),M(i.last_page,a),C(i.last_page,a);let s=(i.current_page-1)*p+1,r=s+n.length-1;t("#resultCount").html(`
                <i class="fas fa-info-circle mr-1"></i>
                Menampilkan ${s} - ${r} dari ${i.total} data
            `)},error:function(i,n,s){console.error("Gagal ambil data:",s,i.responseText)}})}function M(a,e){const i=t("#pagination");if(i.empty(),!(a<=1))for(let n=1;n<=a;n++){const s=t(`<button class="page-btn mx-1 px-3 py-1 rounded-lg border ${n===o?"bg-orange-primary text-white":"bg-white text-gray-700 hover:bg-gray-100"}">${n}</button>`);s.on("click",function(){o=n,c(e,o)}),i.append(s)}}function C(a,e){const i=t("#paginationMobile");if(i.empty(),!(a<=1))for(let n=1;n<=a;n++){const s=t(`<button class="px-3 py-1 rounded-lg border ${n===o?"bg-orange-primary text-white":"bg-white text-gray-700 hover:bg-gray-100"}">${n}</button>`);s.on("click",function(){o=n,c(e,o)}),i.append(s)}}t("#searchInputuser").on("input",function(){const a=t(this).val();o=1,c(a,o)});t(function(){c()});function T(a){const e=t("#"+a);e.removeClass("hidden"),setTimeout(()=>{e.find(".modal-content").addClass("show")},10),t("body").addClass("overflow-hidden")}function f(a){const e=t("#"+a);e.find(".modal-content").removeClass("show"),setTimeout(()=>{e.addClass("hidden"),t("body").removeClass("overflow-hidden")},300)}t(document).keydown(function(a){a.keyCode===27&&(t("#employeeModal").hasClass("hidden")?t("#activeModal").hasClass("hidden")||f("activeModal"):f("employeeModal"))});t("#employeeModal").on("shown",function(){t("#employeeName").focus()});t("#employeeForm input, #employeeForm select, #employeeForm textarea").on("focus",function(){t(this).removeClass("border-red-300 bg-red-50")});t("#employeeEmail").on("blur",function(){const a=t(this).val();a&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(a)?(t(this).addClass("border-red-300 bg-red-50"),x(this,"Format email tidak valid")):(t(this).removeClass("border-red-300 bg-red-50"),h(this))});t("#password").on("blur",function(){const a=t(this).val();a&&a.length<6?(t(this).addClass("border-red-300 bg-red-50"),x(this,"Password harus minimal 6 karakter")):(t(this).removeClass("border-red-300 bg-red-50"),h(this))});function x(a,e){const i=t(a),n=i.attr("id")+"-error";t("#"+n).remove(),i.after(`<div id="${n}" class="text-red-500 text-xs mt-1 animate-pulse"><i class="fas fa-exclamation-circle mr-1"></i>${e}</div>`)}function h(a){const i=t(a).attr("id")+"-error";t("#"+i).remove()}function m(a,e="info"){const s=t(`
        <div class="notification flex items-center space-x-3 ${e==="success"?"bg-green-500":e==="error"?"bg-red-500":"bg-blue-500"} text-white px-6 py-4 rounded-xl shadow-lg transform translate-x-full opacity-0 transition-all duration-300 cursor-pointer">
            <i class="fas ${e==="success"?"fa-check-circle":e==="error"?"fa-exclamation-circle":"fa-info-circle"} text-lg"></i>
            <span class="font-medium">${a}</span>
        </div>
    `);t("#notificationWrapper").append(s),setTimeout(()=>{s.removeClass("translate-x-full opacity-0")},100);const r=setTimeout(()=>{s.addClass("translate-x-full opacity-0"),setTimeout(()=>s.remove(),300)},4e3);s.on("click",function(){clearTimeout(r),t(this).addClass("translate-x-full opacity-0"),setTimeout(()=>t(this).remove(),300)})}function v(){t(window).width()<640?t(".modal-content").addClass("mx-4 max-h-[95vh]"):t(".modal-content").removeClass("mx-4 max-h-[95vh]")}t(window).on("resize",function(){v()});v();function j(){t("body").css({overflow:"hidden","padding-right":"15px"})}function A(){t("body").css({overflow:"","padding-right":""})}function y(a){T(a),j()}function l(a){f(a),A()}t("#closeModal, #cancelBtn").on("click",function(){l("employeeModal")});t("#cancelActiveBtn").on("click",function(){l("activeModal")});t("#cancelMahasiswaBtn").on("click",function(){l("detailMahasiswaModal")});t(".modal-overlay").on("click",function(a){a.target===this&&(t(this).closest("#employeeModal").length?l("employeeModal"):t(this).closest("#activeModal").length?l("activeModal"):t(this).closest("#detailMahasiswaModal").length&&l("detailMahasiswaModal"))});t(document).on("click",".aktif-btn",function(){const a=t(this).data("id"),e=t(this).data("name");t("#activeUserId").val(a),t("#activeUserName").text(e),y("activeModal")});t(document).on("click","#confirmActiveBtn",function(){const a=t(this),e=a.html();a.html('<i class="fas fa-spinner fa-spin mr-2"></i>Menyimpan...').prop("disabled",!0);const i=t("#activeUserId").val();t.ajax({url:`/admin/confirmpbsaktif/${i}`,type:"PUT",success:function(n){m(n.message,n.status),l("activeModal"),c()},error:function(n){let s=n.responseJSON&&n.responseJSON.message?n.responseJSON.message:"Gagal menyimpan data!";m(s,"error")},complete:function(){a.html(e).prop("disabled",!1)}})});t(document).on("click",".detail-btn",function(){const a=t(this).data("id");y("detailMahasiswaModal"),t.ajax({url:`/admin/mahasiswa/detail/${a}`,type:"GET",success:function(e){t("#detail_nama_mahasiswa").text(e.user.name),t("#detail_nim").text("NIM: "+e.nim),t("#det_jk").text(e.jenis_kelamin),t("#det_email").text(e.user.email),t("#det_agama").text(e.agama),t("#det_telp").text(e.no_wa),t("#det_alamat").text(e.alamat_ktp),t("#det_semester").text(e.user.akademik.semester),t("#det_ipk").text(e.user.akademik.ip_terakhir),t("#det_status").text(e.user.status_user),t("#det_ayah_nama").text(e.user.orangtua.nama_ayah),t("#det_ayah_kerja").text(e.user.orangtua.pekerjaan_ayah),t("#det_ibu_nama").text(e.user.orangtua.nama_ibu),t("#det_ibu_kerja").text(e.user.orangtua.pekerjaan_ibu),t("#det_tgllahir").text(w(e.tanggal_lahir)),t("#det_universitas").text(e.mitra.nama_mitra),t("#det_ayah_gaji").text(b(e.user.orangtua.penghasilan_ayah)),t("#det_ibu_gaji").text(b(e.user.orangtua.penghasilan_ibu)),t("#det_ortu_telp").text(e.user.orangtua.no_wa_ortu),t("#det_tanggungan").text(e.user.orangtua.jumlah_tanggungan);const i=t("#detail_foto_profil"),n=window.defaultAvatar;if(i.off("error"),e.foto){const u=window.location.origin+"/"+e.foto;i.one("error",function(){t(this).attr("src",n)}).attr("src",u)}else i.attr("src",n);const s=t("#document-list");s.empty();const r=[{field:"scan_ktp",label:"Scan KTP"},{field:"scan_kartu_mahasiswa",label:"Kartu Mahasiswa"},{field:"scan_kk",label:"Kartu Keluarga"},{field:"transkrip_nilai",label:"Transkrip Nilai"},{field:"surat_keterangan_aktif",label:"Surat Aktif"},{field:"essay_motivasi",label:"Essay Motivasi"}],d=e.user.dokumen;d?r.forEach(u=>{const g=d[u.field];if(g){const k=`
                            <a href="${window.location.origin+"/"+g}" target="_blank" class="flex items-center p-3 border-2 border-gray-100 rounded-xl hover:bg-gray-50 transition group">
                                <div class="w-10 h-10 bg-red-100 text-red-600 rounded-lg flex items-center justify-center mr-3 group-hover:bg-red-600 group-hover:text-white transition">
                                    <i class="fas fa-file-pdf"></i>
                                </div>
                                <div class="flex flex-col">
                                    <span class="text-xs text-gray-400 uppercase font-bold">${u.label}</span>
                                    <span class="text-sm font-medium text-gray-700 truncate max-w-[150px]">Lihat Dokumen</span>
                                </div>
                            </a>
                        `;s.append(k)}}):s.append('<p class="text-gray-500 italic text-sm">Belum ada dokumen yang diunggah.</p>')},error:function(){m("Gagal mengambil data detail","error")}})});t(document).on("click",".tab-btn",function(){const a=t(this).data("tab");t(".tab-btn").removeClass("active-tab border-blue-700 text-blue-700").addClass("border-transparent text-gray-500"),t(this).addClass("active-tab border-blue-700 text-blue-700").removeClass("border-transparent text-gray-500"),t(".tab-content").addClass("hidden"),t("#"+a).removeClass("hidden")});t(document).on("click",".detail-btn",function(){t('.tab-btn[data-tab="tab-biodata"]').trigger("click")});
