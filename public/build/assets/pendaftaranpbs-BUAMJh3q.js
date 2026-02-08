import{$ as t}from"./jquery-BvxTx_lq.js";tailwind.config={theme:{extend:{colors:{"orange-primary":"#FF6B35","orange-light":"#FF8A65","blue-primary":"#1E40AF","blue-light":"#3B82F6"}}}};t.ajaxSetup({headers:{"X-CSRF-TOKEN":t('meta[name="csrf-token"]').attr("content")}});let o=1;const x=10;function b(i){if(!i)return"-";const a=["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"],e=new Date(i);return isNaN(e)?"-":`${e.getDate()} ${a[e.getMonth()]} ${e.getFullYear()}`}function h(i){if(!i)return"";let e=i.toString().replace(/[^,\d]/g,"").split(","),n=e[0].length%3,s=e[0].substr(0,n),r=e[0].substr(n).match(/\d{3}/gi);return r&&(s+=(n?".":"")+r.join(".")),s=e[1]!==void 0?s+","+e[1]:s,"Rp "+s}function _(i){const a=t("#tableBody");if(a.empty(),i.length===0){a.append(`
            <tr>
                <td colspan="5" class="px-6 py-8 text-center text-gray-500">
                    <i class="fas fa-info-circle text-gray-400 mr-2"></i>
                    Tidak ada data ditemukan
                </td>
            </tr>
        `);return}i.forEach((e,n)=>{let s=e.user?.status_user;s==="Verifikasi"&&(s="Verifikasi PBS");const r=s==="Verifikasi"?"bg-green-100 text-green-800":"bg-blue-100 text-blue-800",c=`
            <tr class="hover:bg-gray-50 transition-colors duration-200">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${n+1}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                        <div class="flex-shrink-0 h-10 w-10">
                            <div class="h-10 w-10 rounded-full bg-gradient-to-r gradient-bg to-blue-light flex items-center justify-center text-white font-semibold">
                                ${e.user?.name.charAt(0)}
                            </div>
                        </div>
                        <div class="ml-4">
                            <div class="text-sm font-medium text-gray-900">${e.user?.name}</div>
                        </div>
                    </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${e.user?.akademik?.mitra?.nama_mitra||"-"}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${e.user?.email}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${r}">
                        ${s??"-"}
                    </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm">
                    ${e.user.status_user!=="Aktif"?`
                            <button class="detail-btn px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all mr-2" 
                                data-id="${e.id}" title="Lihat Detail">
                                <i class="fas fa-eye"></i>
                            </button>
                            <button class="aktif-btn px-3 py-1 text-green-600 hover:text-green-800 transition-all"
                                title="Set PBS Aktif" data-id="${e.user?.id}" data-name="${e.user.name}">
                                <i class="fa-solid fa-circle-check text-xl"></i>
                            </button>
                        `:`
                            <i class="fas fa-lock text-gray-400 text-xl" title="Aksi tidak tersedia"></i>
                        `}
                </td>
            </tr>
        `;a.append(c)})}function w(i){const a=t("#cardContainer");if(a.empty(),i.length===0){a.append(`
            <div class="p-6 text-center text-gray-500">
                <i class="fas fa-info-circle text-gray-400 mr-2"></i>
                Tidak ada data ditemukan
            </div>
        `);return}i.forEach(e=>{let n=e.user?.status_user;n==="Verifikasi"&&(n="Verifikasi PBS");const s=n==="Verifikasi"?"bg-green-100 text-green-800":"bg-blue-100 text-blue-800",r=`
            <div class="p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200">
                <div class="flex items-start space-x-3">
                    <div class="flex-shrink-0 h-12 w-12 rounded-full bg-gradient-to-r gradient-bg to-blue-light flex items-center justify-center text-white font-semibold text-lg">
                        ${e.user?.name?e.user.name.charAt(0):"?"}
                    </div>

                    <div class="flex-1 min-w-0">
                        <div class="flex items-center justify-between mb-2">
                            <h3 class="text-base font-bold text-gray-900 truncate">
                                ${e.user?.name||"-"}
                            </h3>
                            <span class="px-2 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${s}">
                                ${n??"-"}
                            </span>
                        </div>

                        <div class="space-y-1 text-sm text-gray-600">
                            <div class="flex items-center">
                                <i class="fas fa-university w-4 mr-2 text-blue-500"></i>
                                <span class="truncate">${e.user?.akademik?.mitra?.nama_mitra||"-"}</span>
                            </div>
                            <div class="flex items-center">
                                <i class="fas fa-envelope w-4 mr-2 text-orange-primary"></i>
                                <span class="truncate">${e.user?.email||"-"}</span>
                            </div>
                        </div>

                        <div class="flex mt-4 space-x-2">
                            ${e.user?.status_user!=="Aktif"?`
                                <button class="detail-btn flex-1 flex items-center justify-center px-3 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition-all" 
                                    data-id="${e.id}">
                                    <i class="fas fa-eye mr-2"></i> Detail
                                </button>
                                <button class="aktif-btn flex-1 flex items-center justify-center px-3 py-2 bg-green-500 text-white text-sm font-medium rounded-lg hover:bg-green-600 transition-all"
                                    data-id="${e.user?.id}" data-name="${e.user?.name}">
                                    <i class="fa-solid fa-circle-check mr-2"></i> Aktifkan
                                </button>
                            `:`
                                <div class="flex-1 flex items-center justify-center px-3 py-2 bg-gray-100 text-gray-400 text-sm rounded-lg italic border border-dashed border-gray-300">
                                    <i class="fas fa-lock mr-2"></i> User Sudah Aktif
                                </div>
                            `}
                        </div>
                    </div>
                </div>
            </div>
        `;a.append(r)})}function d(i="",a=1){t.ajax({url:"/admin/getpendaftaranpbs",type:"GET",data:{search:i,page:a,limit:x},dataType:"json",success:function(e){const n=e.data;if(!Array.isArray(n)){console.error("Response data bukan array:",n);return}_(n),w(n),$(e.last_page,i),M(e.last_page,i);let s=(e.current_page-1)*x+1,r=s+n.length-1;t("#resultCount").html(`
                <i class="fas fa-info-circle mr-1"></i>
                Menampilkan ${s} - ${r} dari ${e.total} data
            `)},error:function(e,n,s){console.error("Gagal ambil data:",s,e.responseText)}})}function $(i,a){const e=t("#pagination");if(e.empty(),!(i<=1))for(let n=1;n<=i;n++){const s=t(`<button class="page-btn mx-1 px-3 py-1 rounded-lg border ${n===o?"bg-orange-primary text-white":"bg-white text-gray-700 hover:bg-gray-100"}">${n}</button>`);s.on("click",function(){o=n,d(a,o)}),e.append(s)}}function M(i,a){const e=t("#paginationMobile");if(e.empty(),!(i<=1))for(let n=1;n<=i;n++){const s=t(`<button class="px-3 py-1 rounded-lg border ${n===o?"bg-orange-primary text-white":"bg-white text-gray-700 hover:bg-gray-100"}">${n}</button>`);s.on("click",function(){o=n,d(a,o)}),e.append(s)}}t("#searchInputuser").on("input",function(){const i=t(this).val();o=1,d(i,o)});t(function(){d()});function C(i){const a=t("#"+i);a.removeClass("hidden"),setTimeout(()=>{a.find(".modal-content").addClass("show")},10),t("body").addClass("overflow-hidden")}function f(i){const a=t("#"+i);a.find(".modal-content").removeClass("show"),setTimeout(()=>{a.addClass("hidden"),t("body").removeClass("overflow-hidden")},300)}t(document).keydown(function(i){i.keyCode===27&&(t("#employeeModal").hasClass("hidden")?t("#activeModal").hasClass("hidden")||f("activeModal"):f("employeeModal"))});function m(i,a="info"){const s=t(`
        <div class="notification flex items-center space-x-3 ${a==="success"?"bg-green-500":a==="error"?"bg-red-500":"bg-blue-500"} text-white px-6 py-4 rounded-xl shadow-lg transform translate-x-full opacity-0 transition-all duration-300 cursor-pointer">
            <i class="fas ${a==="success"?"fa-check-circle":a==="error"?"fa-exclamation-circle":"fa-info-circle"} text-lg"></i>
            <span class="font-medium">${i}</span>
        </div>
    `);t("#notificationWrapper").append(s),setTimeout(()=>{s.removeClass("translate-x-full opacity-0")},100);const r=setTimeout(()=>{s.addClass("translate-x-full opacity-0"),setTimeout(()=>s.remove(),300)},4e3);s.on("click",function(){clearTimeout(r),t(this).addClass("translate-x-full opacity-0"),setTimeout(()=>t(this).remove(),300)})}function v(){t(window).width()<640?t(".modal-content").addClass("mx-4 max-h-[95vh]"):t(".modal-content").removeClass("mx-4 max-h-[95vh]")}t(window).on("resize",function(){v()});v();function j(){t("body").css({overflow:"hidden","padding-right":"15px"})}function T(){t("body").css({overflow:"","padding-right":""})}function y(i){C(i),j()}function l(i){f(i),T()}t("#closeModal, #cancelBtn").on("click",function(){l("employeeModal")});t("#cancelActiveBtn").on("click",function(){l("activeModal")});t("#cancelMahasiswaBtn").on("click",function(){l("detailMahasiswaModal")});t(".modal-overlay").on("click",function(i){i.target===this&&(t(this).closest("#employeeModal").length?l("employeeModal"):t(this).closest("#activeModal").length?l("activeModal"):t(this).closest("#detailMahasiswaModal").length&&l("detailMahasiswaModal"))});t(document).on("click",".aktif-btn",function(){const i=t(this).data("id"),a=t(this).data("name");t("#activeUserId").val(i),t("#activeUserName").text(a),y("activeModal")});t(document).on("click","#confirmActiveBtn",function(){const i=t(this),a=i.html();i.html('<i class="fas fa-spinner fa-spin mr-2"></i>Menyimpan...').prop("disabled",!0);const e=t("#activeUserId").val();t.ajax({url:`/admin/confirmpbs/${e}`,type:"PUT",success:function(n){m(n.message,n.status),l("activeModal"),d()},error:function(n){let s=n.responseJSON&&n.responseJSON.message?n.responseJSON.message:"Gagal menyimpan data!";m(s,"error")},complete:function(){i.html(a).prop("disabled",!1)}})});t(document).on("click",".detail-btn",function(){const i=t(this).data("id");y("detailMahasiswaModal"),t.ajax({url:`/admin/mahasiswa/detail/${i}`,type:"GET",success:function(a){t("#detail_nama_mahasiswa").text(a.user.name),t("#detail_nim").text("NIM: "+a.nim),t("#det_jk").text(a.jenis_kelamin),t("#det_email").text(a.user.email),t("#det_agama").text(a.agama),t("#det_telp").text(a.no_wa),t("#det_alamat").text(a.alamat_ktp),t("#det_semester").text(a.user.akademik.semester),t("#det_ipk").text(a.user.akademik.ip_terakhir),t("#det_status").text(a.user.status_user),t("#det_ayah_nama").text(a.user.orangtua.nama_ayah),t("#det_ayah_kerja").text(a.user.orangtua.pekerjaan_ayah),t("#det_ibu_nama").text(a.user.orangtua.nama_ibu),t("#det_ibu_kerja").text(a.user.orangtua.pekerjaan_ibu),t("#det_tgllahir").text(b(a.tanggal_lahir)),t("#det_universitas").text(a.mitra.nama_mitra),t("#det_ayah_gaji").text(h(a.user.orangtua.penghasilan_ayah)),t("#det_ibu_gaji").text(h(a.user.orangtua.penghasilan_ibu)),t("#det_ortu_telp").text(a.user.orangtua.no_wa_ortu),t("#det_tanggungan").text(a.user.orangtua.jumlah_tanggungan);const e=a.hasilujian&&a.hasilujian.length>0?a.hasilujian[0]:null;t("#det_potensi_benar").text(e?e.jumlah_benar:"-"),t("#det_potensi_salah").text(e?e.jumlah_salah:"-"),t("#det_potensi_tanggal").text(b(e?e.tanggal:"-")),t("#det_potensi_status").text(e&&e.kategori_soal?e.kategori_soal.name:"-");const n=t("#detail_foto_profil"),s=window.defaultAvatar;if(n.off("error"),a.foto){const u=window.location.origin+"/"+a.foto;n.one("error",function(){t(this).attr("src",s)}).attr("src",u)}else n.attr("src",s);const r=t("#document-list");r.empty();const c=[{field:"scan_ktp",label:"Scan KTP"},{field:"scan_kartu_mahasiswa",label:"Kartu Mahasiswa"},{field:"scan_kk",label:"Kartu Keluarga"},{field:"transkrip_nilai",label:"Transkrip Nilai"},{field:"surat_keterangan_aktif",label:"Surat Aktif"},{field:"essay_motivasi",label:"Essay Motivasi"}],g=a.user.dokumen;g?c.forEach(u=>{const p=g[u.field];if(p){const k=`
                            <a href="${window.location.origin+"/"+p}" target="_blank" class="flex items-center p-3 border-2 border-gray-100 rounded-xl hover:bg-gray-50 transition group">
                                <div class="w-10 h-10 bg-red-100 text-red-600 rounded-lg flex items-center justify-center mr-3 group-hover:bg-red-600 group-hover:text-white transition">
                                    <i class="fas fa-file-pdf"></i>
                                </div>
                                <div class="flex flex-col">
                                    <span class="text-xs text-gray-400 uppercase font-bold">${u.label}</span>
                                    <span class="text-sm font-medium text-gray-700 truncate max-w-[150px]">Lihat Dokumen</span>
                                </div>
                            </a>
                        `;r.append(k)}}):r.append('<p class="text-gray-500 italic text-sm">Belum ada dokumen yang diunggah.</p>')},error:function(){m("Gagal mengambil data detail","error")}})});t(document).on("click",".tab-btn",function(){const i=t(this).data("tab");t(".tab-btn").removeClass("active-tab border-blue-700 text-blue-700").addClass("border-transparent text-gray-500"),t(this).addClass("active-tab border-blue-700 text-blue-700").removeClass("border-transparent text-gray-500"),t(".tab-content").addClass("hidden"),t("#"+i).removeClass("hidden")});t(document).on("click",".detail-btn",function(){t('.tab-btn[data-tab="tab-biodata"]').trigger("click")});
