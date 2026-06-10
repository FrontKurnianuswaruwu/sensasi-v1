import{$ as t}from"./jquery-CEr4rF5i.js";t.ajaxSetup({headers:{"X-CSRF-TOKEN":t('meta[name="csrf-token"]').attr("content")}});let l=1;const x=10;function M(n){if(!n)return"-";const a=["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"],e=new Date(n);return isNaN(e)?"-":`${e.getDate()} ${a[e.getMonth()]} ${e.getFullYear()}`}function h(n){if(!n)return"";let e=n.toString().replace(/[^,\d]/g,"").split(","),i=e[0].length%3,s=e[0].substr(0,i),r=e[0].substr(i).match(/\d{3}/gi);return r&&(s+=(i?".":"")+r.join(".")),s=e[1]!==void 0?s+","+e[1]:s,"Rp "+s}function C(n){const a=t("#tableBody");if(a.empty(),!n||n.length===0){a.append(`
            <tr>
                <td colspan="6" class="px-6 py-10 text-center text-gray-500">
                    <div class="flex flex-col items-center">
                        <i class="fas fa-folder-open text-4xl text-gray-300 mb-3"></i>
                        <p>Tidak ada data alumni ditemukan</p>
                    </div>
                </td>
            </tr>
        `);return}n.forEach((e,i)=>{const s=e.sumber_data==="resmi",r=s?e.nama_lengkap:e.user?.name,d=s?`Lulus: ${e.tahun_lulus}`:`NIM: ${e.nim}`,o=s?e.mitra?.nama_mitra:e.user?.akademik?.mitra?.nama_mitra,u=s?e.program_studi||"-":e.user?.email||"-",b=s?"bg-purple-100 text-purple-700 border-purple-200":"bg-blue-100 text-blue-700 border-blue-200",m=s?"Alumni Resmi":"Alumni (Transisi)",w=s?"fa-graduation-cap":"fa-user-clock",$=`
            <tr class="hover:bg-blue-50/30 transition-all duration-200 border-b border-gray-100">
                <td class="px-6 py-4 text-sm text-gray-500">${i+1}</td>
                <td class="px-6 py-4">
                    <div class="flex items-center">
                        <div class="flex-shrink-0 h-10 w-10">
                            ${s&&e.foto?`<img class="h-10 w-10 rounded-full object-cover border" src="/storage/${e.foto}">`:`<div class="h-10 w-10 rounded-full bg-gradient-to-br ${s?"from-purple-600 to-indigo-600":"from-blue-600 to-cyan-500"} flex items-center justify-center text-white font-bold shadow-sm">
                                    ${r?r.charAt(0).toUpperCase():"?"}
                                   </div>`}
                        </div>
                        <div class="ml-4">
                            <div class="text-sm font-bold text-gray-900">${r||"-"}</div>
                            <div class="text-xs text-gray-500 font-medium">${d}</div>
                        </div>
                    </div>
                </td>
                <td class="px-6 py-4 text-sm text-gray-700">${o||"-"}</td>
                <td class="px-6 py-4 text-sm text-gray-600">${u}</td>
                <td class="px-6 py-4">
                    <span class="px-3 py-1 inline-flex items-center text-xs font-bold rounded-full border ${b}">
                        <i class="fas ${w} mr-1.5"></i> ${m}
                    </span>
                </td>
                <td class="px-6 py-4 text-sm font-medium">
                    <div class="flex space-x-2">
                        ${s?`
                            <button class="p-2 bg-gray-50 text-gray-300 rounded-md cursor-not-allowed border border-gray-100" title="Arsip Permanen">
                                <i class="fas fa-check-double"></i>
                            </button>
                        `:`
                            <button class="detail-btn p-2 bg-white border border-gray-200 text-blue-600 rounded-md hover:shadow-md transition-all"
                                data-id="${e.id}" data-type="${e.sumber_data}" title="Lihat Profil">
                                <i class="fas fa-eye"></i>
                            </button>
                            <button class="aktif-btn p-2 bg-white border border-gray-200 text-green-600 rounded-md hover:bg-green-50 transition-all"
                                data-id="${e.user?.id}" data-name="${r}">
                                <i class="fas fa-undo-alt"></i>
                            </button>
                        `}
                    </div>
                </td>
            </tr>
        `;a.append($)})}function j(n){const a=t("#cardContainer");if(a.empty(),n.length===0){a.append(`
            <div class="p-6 text-center text-gray-500">
                <i class="fas fa-info-circle text-gray-400 mr-2"></i>
                Tidak ada data ditemukan
            </div>
        `);return}n.forEach(e=>{const i=e.sumber_data==="resmi",s=i?e.nama_lengkap:e.user?.name,r=i?e.mitra?.nama_mitra:e.user?.akademik?.mitra?.nama_mitra;i?e.program_studi:e.user?.email;const d=i?`Lulus: ${e.tahun_lulus}`:`NIM: ${e.nim}`,o=i?"bg-purple-100 text-purple-700 border-purple-200":"bg-blue-100 text-blue-700 border-blue-200",u=i?"Alumni Resmi":"Alumni (Transisi)",b=i?"fa-graduation-cap":"fa-user-clock",m=`
            <div class="p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200">
                <div class="flex items-start space-x-3">
                    <div class="flex-shrink-0 h-12 w-12 rounded-full bg-gradient-to-r ${i?"from-purple-600 to-indigo-600":"gradient-bg to-blue-light"} flex items-center justify-center text-white font-semibold text-lg">
                        ${s?s.charAt(0).toUpperCase():"?"}
                    </div>

                    <div class="flex-1 min-w-0">
                        <div class="flex items-center justify-between mb-2">
                            <h3 class="text-base font-bold text-gray-900 truncate">
                                ${s||"-"}
                            </h3>
                            <span class="px-2 py-0.5 inline-flex items-center text-xs leading-5 font-semibold rounded-full border ${o}">
                                <i class="fas ${b} mr-1"></i> ${u}
                            </span>
                        </div>

                        <div class="space-y-1 text-sm text-gray-600">
                            <div class="flex items-center">
                                <i class="fas fa-university w-4 mr-2 text-blue-500"></i>
                                <span class="truncate">${r||"-"}</span>
                            </div>
                            <div class="flex items-center">
                                <i class="fas fa-id-card w-4 mr-2 text-orange-primary"></i>
                                <span class="truncate">${d}</span>
                            </div>
                        </div>

                        <div class="flex mt-4 space-x-2">
                            ${i?`
                                <div class="flex-1 flex items-center justify-center px-3 py-2 bg-gray-100 text-gray-400 text-sm rounded-lg italic border border-dashed border-gray-300">
                                    <i class="fas fa-check-double mr-2"></i> Arsip Permanen
                                </div>
                            `:`
                                <button class="detail-btn flex-1 flex items-center justify-center px-3 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition-all"
                                    data-id="${e.id}">
                                    <i class="fas fa-eye mr-2"></i> Detail
                                </button>
                                <button class="aktif-btn flex-1 flex items-center justify-center px-3 py-2 bg-green-500 text-white text-sm font-medium rounded-lg hover:bg-green-600 transition-all"
                                    data-id="${e.user?.id}" data-name="${s}">
                                    <i class="fa-solid fa-circle-check mr-2"></i> Aktifkan
                                </button>
                            `}
                        </div>
                    </div>
                </div>
            </div>
        `;a.append(m)})}function f(n="",a=1){t.ajax({url:"/admin/getadminalumni",type:"GET",data:{search:n,page:a,limit:x},dataType:"json",success:function(e){const i=e.data;if(!Array.isArray(i)){console.error("Response data bukan array:",i);return}C(i),j(i),T(e.last_page,n),A(e.last_page,n);let s=(e.current_page-1)*x+1,r=s+i.length-1;t("#resultCount").html(`
                <i class="fas fa-info-circle mr-1"></i>
                Menampilkan ${s} - ${r} dari ${e.total} data
            `)},error:function(e,i,s){console.error("Gagal ambil data:",s,e.responseText)}})}function T(n,a){const e=t("#pagination");if(e.empty(),!(n<=1))for(let i=1;i<=n;i++){const s=t(`<button class="page-btn mx-1 px-3 py-1 rounded-lg border ${i===l?"bg-orange-primary text-white":"bg-white text-gray-700 hover:bg-gray-100"}">${i}</button>`);s.on("click",function(){l=i,f(a,l)}),e.append(s)}}function A(n,a){const e=t("#paginationMobile");if(e.empty(),!(n<=1))for(let i=1;i<=n;i++){const s=t(`<button class="px-3 py-1 rounded-lg border ${i===l?"bg-orange-primary text-white":"bg-white text-gray-700 hover:bg-gray-100"}">${i}</button>`);s.on("click",function(){l=i,f(a,l)}),e.append(s)}}t("#searchInputuser").on("input",function(){const n=t(this).val();l=1,f(n,l)});t(function(){f()});function N(n){const a=t("#"+n);a.removeClass("hidden"),setTimeout(()=>{a.find(".modal-content").addClass("show")},10),t("body").addClass("overflow-hidden")}function p(n){const a=t("#"+n);a.find(".modal-content").removeClass("show"),setTimeout(()=>{a.addClass("hidden"),t("body").removeClass("overflow-hidden")},300)}t(document).keydown(function(n){n.keyCode===27&&(t("#employeeModal").hasClass("hidden")?t("#activeModal").hasClass("hidden")||p("activeModal"):p("employeeModal"))});t("#employeeModal").on("shown",function(){t("#employeeName").focus()});t("#employeeForm input, #employeeForm select, #employeeForm textarea").on("focus",function(){t(this).removeClass("border-red-300 bg-red-50")});t("#employeeEmail").on("blur",function(){const n=t(this).val();n&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(n)?(t(this).addClass("border-red-300 bg-red-50"),v(this,"Format email tidak valid")):(t(this).removeClass("border-red-300 bg-red-50"),y(this))});t("#password").on("blur",function(){const n=t(this).val();n&&n.length<6?(t(this).addClass("border-red-300 bg-red-50"),v(this,"Password harus minimal 6 karakter")):(t(this).removeClass("border-red-300 bg-red-50"),y(this))});function v(n,a){const e=t(n),i=e.attr("id")+"-error";t("#"+i).remove(),e.after(`<div id="${i}" class="text-red-500 text-xs mt-1 animate-pulse"><i class="fas fa-exclamation-circle mr-1"></i>${a}</div>`)}function y(n){const e=t(n).attr("id")+"-error";t("#"+e).remove()}function g(n,a="info"){const s=t(`
        <div class="notification flex items-center space-x-3 ${a==="success"?"bg-green-500":a==="error"?"bg-red-500":"bg-blue-500"} text-white px-6 py-4 rounded-xl shadow-lg transform translate-x-full opacity-0 transition-all duration-300 cursor-pointer">
            <i class="fas ${a==="success"?"fa-check-circle":a==="error"?"fa-exclamation-circle":"fa-info-circle"} text-lg"></i>
            <span class="font-medium">${n}</span>
        </div>
    `);t("#notificationWrapper").append(s),setTimeout(()=>{s.removeClass("translate-x-full opacity-0")},100);const r=setTimeout(()=>{s.addClass("translate-x-full opacity-0"),setTimeout(()=>s.remove(),300)},4e3);s.on("click",function(){clearTimeout(r),t(this).addClass("translate-x-full opacity-0"),setTimeout(()=>t(this).remove(),300)})}function k(){t(window).width()<640?t(".modal-content").addClass("mx-4 max-h-[95vh]"):t(".modal-content").removeClass("mx-4 max-h-[95vh]")}t(window).on("resize",function(){k()});k();function E(){t("body").css({overflow:"hidden","padding-right":"15px"})}function F(){t("body").css({overflow:"","padding-right":""})}function _(n){N(n),E()}function c(n){p(n),F()}t("#closeModal, #cancelBtn").on("click",function(){c("employeeModal")});t("#cancelActiveBtn").on("click",function(){c("activeModal")});t("#cancelMahasiswaBtn").on("click",function(){c("detailMahasiswaModal")});t(".modal-overlay").on("click",function(n){n.target===this&&(t(this).closest("#employeeModal").length?c("employeeModal"):t(this).closest("#activeModal").length?c("activeModal"):t(this).closest("#detailMahasiswaModal").length&&c("detailMahasiswaModal"))});t(document).on("click",".aktif-btn",function(){const n=t(this).data("id"),a=t(this).data("name");t("#activeUserId").val(n),t("#activeUserName").text(a),_("activeModal")});t(document).on("click","#confirmActiveBtn",function(){const n=t(this),a=n.html();n.html('<i class="fas fa-spinner fa-spin mr-2"></i>Menyimpan...').prop("disabled",!0);const e=t("#activeUserId").val();t.ajax({url:`/admin/confirmpbsaktif/${e}`,type:"PUT",success:function(i){g(i.message,i.status),c("activeModal"),f()},error:function(i){let s=i.responseJSON&&i.responseJSON.message?i.responseJSON.message:"Gagal menyimpan data!";g(s,"error")},complete:function(){n.html(a).prop("disabled",!1)}})});t(document).on("click",".detail-btn",function(){const n=t(this).data("id");_("detailMahasiswaModal"),t.ajax({url:`/admin/mahasiswa/detail/${n}`,type:"GET",success:function(a){t("#detail_nama_mahasiswa").text(a.user.name),t("#detail_nim").text("NIM: "+a.nim),t("#det_jk").text(a.jenis_kelamin),t("#det_email").text(a.user.email),t("#det_agama").text(a.agama),t("#det_telp").text(a.no_wa),t("#det_alamat").text(a.alamat_ktp),t("#det_semester").text(a.user.akademik.semester),t("#det_ipk").text(a.user.akademik.ip_terakhir),t("#det_status").text(a.user.status_user),t("#det_ayah_nama").text(a.user.orangtua.nama_ayah),t("#det_ayah_kerja").text(a.user.orangtua.pekerjaan_ayah),t("#det_ibu_nama").text(a.user.orangtua.nama_ibu),t("#det_ibu_kerja").text(a.user.orangtua.pekerjaan_ibu),t("#det_tgllahir").text(M(a.tanggal_lahir)),t("#det_universitas").text(a.mitra.nama_mitra),t("#det_ayah_gaji").text(h(a.user.orangtua.penghasilan_ayah)),t("#det_ibu_gaji").text(h(a.user.orangtua.penghasilan_ibu)),t("#det_ortu_telp").text(a.user.orangtua.no_wa_ortu),t("#det_tanggungan").text(a.user.orangtua.jumlah_tanggungan);const e=t("#detail_foto_profil"),i=window.defaultAvatar;if(e.off("error"),a.foto){const o=window.location.origin+"/"+a.foto;e.one("error",function(){t(this).attr("src",i)}).attr("src",o)}else e.attr("src",i);const s=t("#document-list");s.empty();const r=[{field:"scan_ktp",label:"Scan KTP"},{field:"scan_kartu_mahasiswa",label:"Kartu Mahasiswa"},{field:"scan_kk",label:"Kartu Keluarga"},{field:"transkrip_nilai",label:"Transkrip Nilai"},{field:"surat_keterangan_aktif",label:"Surat Aktif"},{field:"essay_motivasi",label:"Essay Motivasi"}],d=a.user.dokumen;d?r.forEach(o=>{const u=d[o.field];if(u){const m=`
                            <a href="${window.location.origin+"/"+u}" target="_blank" class="flex items-center p-3 border-2 border-gray-100 rounded-xl hover:bg-gray-50 transition group">
                                <div class="w-10 h-10 bg-red-100 text-red-600 rounded-lg flex items-center justify-center mr-3 group-hover:bg-red-600 group-hover:text-white transition">
                                    <i class="fas fa-file-pdf"></i>
                                </div>
                                <div class="flex flex-col">
                                    <span class="text-xs text-gray-400 uppercase font-bold">${o.label}</span>
                                    <span class="text-sm font-medium text-gray-700 truncate max-w-[150px]">Lihat Dokumen</span>
                                </div>
                            </a>
                        `;s.append(m)}}):s.append('<p class="text-gray-500 italic text-sm">Belum ada dokumen yang diunggah.</p>')},error:function(){g("Gagal mengambil data detail","error")}})});t(document).on("click",".tab-btn",function(){const n=t(this).data("tab");t(".tab-btn").removeClass("active-tab border-blue-700 text-blue-700").addClass("border-transparent text-gray-500"),t(this).addClass("active-tab border-blue-700 text-blue-700").removeClass("border-transparent text-gray-500"),t(".tab-content").addClass("hidden"),t("#"+n).removeClass("hidden")});t(document).on("click",".detail-btn",function(){t('.tab-btn[data-tab="tab-biodata"]').trigger("click")});
