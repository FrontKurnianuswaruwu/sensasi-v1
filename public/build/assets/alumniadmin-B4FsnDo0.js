import{$ as t}from"./jquery-BvxTx_lq.js";tailwind.config={theme:{extend:{colors:{"orange-primary":"#FF6B35","orange-light":"#FF8A65","blue-primary":"#1E40AF","blue-light":"#3B82F6"}}}};t.ajaxSetup({headers:{"X-CSRF-TOKEN":t('meta[name="csrf-token"]').attr("content")}});let o=1;const p=10;function k(e){const a=t("#tableBody");if(a.empty(),e.length===0){a.append(`
            <tr>
                <td colspan="5" class="px-6 py-8 text-center text-gray-500">
                    <i class="fas fa-info-circle text-gray-400 mr-2"></i>
                    Tidak ada data ditemukan
                </td>
            </tr>
        `);return}e.forEach((i,s)=>{let n=i.user?.status_user;n==="Tidak Aktif"&&(n="Alumni");const r=n==="Aktif"?"bg-green-100 text-green-800":"bg-blue-100 text-blue-800",c=`
            <tr class="hover:bg-gray-50 transition-colors duration-200">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${s+1}</td>
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
                        ${n??"-"}
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
        `;a.append(c)})}function w(e){const a=t("#cardContainer");if(a.empty(),e.length===0){a.append(`
            <div class="p-6 text-center text-gray-500">
                <i class="fas fa-info-circle text-gray-400 mr-2"></i>
                Tidak ada data ditemukan
            </div>
        `);return}e.forEach(i=>{let s=i.user?.status_user;s==="Tidak Aktif"&&(s="Alumni");const n=s==="Aktif"?"bg-green-100 text-green-800":"bg-blue-100 text-blue-800",r=`
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
                            <span class="px-2 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${n}">
                                ${s??"-"}
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
        `;a.append(r)})}function d(e="",a=1){t.ajax({url:"/admin/getadminalumni",type:"GET",data:{search:e,page:a,limit:p},dataType:"json",success:function(i){const s=i.data;if(!Array.isArray(s)){console.error("Response data bukan array:",s);return}k(s),w(s),_(i.last_page,e),$(i.last_page,e);let n=(i.current_page-1)*p+1,r=n+s.length-1;t("#resultCount").html(`
                <i class="fas fa-info-circle mr-1"></i>
                Menampilkan ${n} - ${r} dari ${i.total} data
            `)},error:function(i,s,n){console.error("Gagal ambil data:",n,i.responseText)}})}function _(e,a){const i=t("#pagination");if(i.empty(),!(e<=1))for(let s=1;s<=e;s++){const n=t(`<button class="page-btn mx-1 px-3 py-1 rounded-lg border ${s===o?"bg-orange-primary text-white":"bg-white text-gray-700 hover:bg-gray-100"}">${s}</button>`);n.on("click",function(){o=s,d(a,o)}),i.append(n)}}function $(e,a){const i=t("#paginationMobile");if(i.empty(),!(e<=1))for(let s=1;s<=e;s++){const n=t(`<button class="px-3 py-1 rounded-lg border ${s===o?"bg-orange-primary text-white":"bg-white text-gray-700 hover:bg-gray-100"}">${s}</button>`);n.on("click",function(){o=s,d(a,o)}),i.append(n)}}t("#searchInputuser").on("input",function(){const e=t(this).val();o=1,d(e,o)});t(function(){d()});function C(e){const a=t("#"+e);a.removeClass("hidden"),setTimeout(()=>{a.find(".modal-content").addClass("show")},10),t("body").addClass("overflow-hidden")}function f(e){const a=t("#"+e);a.find(".modal-content").removeClass("show"),setTimeout(()=>{a.addClass("hidden"),t("body").removeClass("overflow-hidden")},300)}t(document).keydown(function(e){e.keyCode===27&&(t("#employeeModal").hasClass("hidden")?t("#activeModal").hasClass("hidden")||f("activeModal"):f("employeeModal"))});t("#employeeModal").on("shown",function(){t("#employeeName").focus()});t("#employeeForm input, #employeeForm select, #employeeForm textarea").on("focus",function(){t(this).removeClass("border-red-300 bg-red-50")});t("#employeeEmail").on("blur",function(){const e=t(this).val();e&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)?(t(this).addClass("border-red-300 bg-red-50"),x(this,"Format email tidak valid")):(t(this).removeClass("border-red-300 bg-red-50"),b(this))});t("#password").on("blur",function(){const e=t(this).val();e&&e.length<6?(t(this).addClass("border-red-300 bg-red-50"),x(this,"Password harus minimal 6 karakter")):(t(this).removeClass("border-red-300 bg-red-50"),b(this))});function x(e,a){const i=t(e),s=i.attr("id")+"-error";t("#"+s).remove(),i.after(`<div id="${s}" class="text-red-500 text-xs mt-1 animate-pulse"><i class="fas fa-exclamation-circle mr-1"></i>${a}</div>`)}function b(e){const i=t(e).attr("id")+"-error";t("#"+i).remove()}function m(e,a="info"){const n=t(`
        <div class="notification flex items-center space-x-3 ${a==="success"?"bg-green-500":a==="error"?"bg-red-500":"bg-blue-500"} text-white px-6 py-4 rounded-xl shadow-lg transform translate-x-full opacity-0 transition-all duration-300 cursor-pointer">
            <i class="fas ${a==="success"?"fa-check-circle":a==="error"?"fa-exclamation-circle":"fa-info-circle"} text-lg"></i>
            <span class="font-medium">${e}</span>
        </div>
    `);t("#notificationWrapper").append(n),setTimeout(()=>{n.removeClass("translate-x-full opacity-0")},100);const r=setTimeout(()=>{n.addClass("translate-x-full opacity-0"),setTimeout(()=>n.remove(),300)},4e3);n.on("click",function(){clearTimeout(r),t(this).addClass("translate-x-full opacity-0"),setTimeout(()=>t(this).remove(),300)})}function h(){t(window).width()<640?t(".modal-content").addClass("mx-4 max-h-[95vh]"):t(".modal-content").removeClass("mx-4 max-h-[95vh]")}t(window).on("resize",function(){h()});h();function M(){t("body").css({overflow:"hidden","padding-right":"15px"})}function T(){t("body").css({overflow:"","padding-right":""})}function v(e){C(e),M()}function l(e){f(e),T()}t("#closeModal, #cancelBtn").on("click",function(){l("employeeModal")});t("#cancelActiveBtn").on("click",function(){l("activeModal")});t("#cancelMahasiswaBtn").on("click",function(){l("detailMahasiswaModal")});t(".modal-overlay").on("click",function(e){e.target===this&&(t(this).closest("#employeeModal").length?l("employeeModal"):t(this).closest("#activeModal").length?l("activeModal"):t(this).closest("#detailMahasiswaModal").length&&l("detailMahasiswaModal"))});t(document).on("click",".aktif-btn",function(){const e=t(this).data("id"),a=t(this).data("name");t("#activeUserId").val(e),t("#activeUserName").text(a),v("activeModal")});t(document).on("click","#confirmActiveBtn",function(){const e=t(this),a=e.html();e.html('<i class="fas fa-spinner fa-spin mr-2"></i>Menyimpan...').prop("disabled",!0);const i=t("#activeUserId").val();t.ajax({url:`/admin/confirmpbsaktif/${i}`,type:"PUT",success:function(s){m(s.message,s.status),l("activeModal"),d()},error:function(s){let n=s.responseJSON&&s.responseJSON.message?s.responseJSON.message:"Gagal menyimpan data!";m(n,"error")},complete:function(){e.html(a).prop("disabled",!1)}})});t(document).on("click",".detail-btn",function(){const e=t(this).data("id");v("detailMahasiswaModal"),t.ajax({url:`/admin/mahasiswa/detail/${e}`,type:"GET",success:function(a){t("#detail_nama_mahasiswa").text(a.user.name),t("#detail_nim").text("NIM: "+a.nim),t("#det_jk").text(a.jenis_kelamin),t("#det_email").text(a.user.email),t("#det_agama").text(a.agama),t("#det_telp").text(a.no_wa),t("#det_alamat").text(a.alamat_ktp),t("#det_semester").text(a.user.akademik.semester),t("#det_ipk").text(a.user.akademik.ip_terakhir),t("#det_status").text(a.user.status_user),t("#det_ayah_nama").text(a.user.orangtua.nama_ayah),t("#det_ayah_kerja").text(a.user.orangtua.pekerjaan_ayah),t("#det_ibu_nama").text(a.user.orangtua.nama_ibu),t("#det_ibu_kerja").text(a.user.orangtua.pekerjaan_ibu),t("#det_tgllahir").text(formatTanggal(a.tanggal_lahir)),t("#det_universitas").text(a.mitra.nama_mitra),t("#det_ayah_gaji").text(formatRupiah(a.user.orangtua.penghasilan_ayah)),t("#det_ibu_gaji").text(formatRupiah(a.user.orangtua.penghasilan_ibu)),t("#det_ortu_telp").text(a.user.orangtua.no_wa_ortu),t("#det_tanggungan").text(a.user.orangtua.jumlah_tanggungan);const i=t("#detail_foto_profil"),s=window.defaultAvatar;if(i.off("error"),a.foto){const u=window.location.origin+"/"+a.foto;i.one("error",function(){t(this).attr("src",s)}).attr("src",u)}else i.attr("src",s);const n=t("#document-list");n.empty();const r=[{field:"scan_ktp",label:"Scan KTP"},{field:"scan_kartu_mahasiswa",label:"Kartu Mahasiswa"},{field:"scan_kk",label:"Kartu Keluarga"},{field:"transkrip_nilai",label:"Transkrip Nilai"},{field:"surat_keterangan_aktif",label:"Surat Aktif"},{field:"essay_motivasi",label:"Essay Motivasi"}],c=a.user.dokumen;c?r.forEach(u=>{const g=c[u.field];if(g){const y=`
                            <a href="${window.location.origin+"/"+g}" target="_blank" class="flex items-center p-3 border-2 border-gray-100 rounded-xl hover:bg-gray-50 transition group">
                                <div class="w-10 h-10 bg-red-100 text-red-600 rounded-lg flex items-center justify-center mr-3 group-hover:bg-red-600 group-hover:text-white transition">
                                    <i class="fas fa-file-pdf"></i>
                                </div>
                                <div class="flex flex-col">
                                    <span class="text-xs text-gray-400 uppercase font-bold">${u.label}</span>
                                    <span class="text-sm font-medium text-gray-700 truncate max-w-[150px]">Lihat Dokumen</span>
                                </div>
                            </a>
                        `;n.append(y)}}):n.append('<p class="text-gray-500 italic text-sm">Belum ada dokumen yang diunggah.</p>')},error:function(){m("Gagal mengambil data detail","error")}})});t(document).on("click",".tab-btn",function(){const e=t(this).data("tab");t(".tab-btn").removeClass("active-tab border-blue-700 text-blue-700").addClass("border-transparent text-gray-500"),t(this).addClass("active-tab border-blue-700 text-blue-700").removeClass("border-transparent text-gray-500"),t(".tab-content").addClass("hidden"),t("#"+e).removeClass("hidden")});t(document).on("click",".detail-btn",function(){t('.tab-btn[data-tab="tab-biodata"]').trigger("click")});
