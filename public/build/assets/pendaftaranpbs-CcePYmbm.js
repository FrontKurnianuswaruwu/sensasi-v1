import{$ as t}from"./jquery-CEr4rF5i.js";t.ajaxSetup({headers:{"X-CSRF-TOKEN":t('meta[name="csrf-token"]').attr("content")}});let r=1;const b=10;function x(n){if(!n)return"-";const a=["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"],e=new Date(n);return isNaN(e)?"-":`${e.getDate()} ${a[e.getMonth()]} ${e.getFullYear()}`}function h(n){if(!n)return"";let e=n.toString().replace(/[^,\d]/g,"").split(","),i=e[0].length%3,s=e[0].substr(0,i),o=e[0].substr(i).match(/\d{3}/gi);return o&&(s+=(i?".":"")+o.join(".")),s=e[1]!==void 0?s+","+e[1]:s,"Rp "+s}function y(n){const a=t("#tableBody");if(a.empty(),n.length===0){a.append(`
            <tr>
                <td colspan="5" class="px-6 py-8 text-center text-gray-500">
                    <i class="fas fa-info-circle text-gray-400 mr-2"></i>
                    Tidak ada data ditemukan
                </td>
            </tr>
        `);return}n.forEach((e,i)=>{let s=e.user?.status_user;s==="Verifikasi"&&(s="Verifikasi PBS");const o=s==="Verifikasi"?"bg-green-100 text-green-800":"bg-blue-100 text-blue-800",c=`
            <tr class="hover:bg-gray-50 transition-colors duration-200">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${i+1}</td>
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
                    <span class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${o}">
                        ${s??"-"}
                    </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm">
                    ${e.user.status_user!=="Aktif"?`
                            <button class="detail-btn px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all mr-2" 
                                data-id="${e.id}" title="Lihat Detail">
                                <i class="fas fa-eye"></i>
                            </button>
                            <button class="download-pdf-btn inline-flex items-center px-3 py-1.5 bg-blue-300 text-white rounded-lg hover:bg-blue-400 transition-all shadow-sm mr-2" 
                                data-id="${e.id}" title="Download PDF">
                                <i class="fas fa-download"></i>
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
        `;a.append(c)})}function $(n){const a=t("#cardContainer");if(a.empty(),n.length===0){a.append(`
            <div class="p-6 text-center text-gray-500">
                <i class="fas fa-info-circle text-gray-400 mr-2"></i>
                Tidak ada data ditemukan
            </div>
        `);return}n.forEach(e=>{let i=e.user?.status_user;i==="Verifikasi"&&(i="Verifikasi PBS");const s=i==="Verifikasi"?"bg-green-100 text-green-800":"bg-blue-100 text-blue-800",o=`
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
                                ${i??"-"}
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
                                <button class="download-pdf-btn inline-flex items-center px-3 py-1.5 bg-blue-300 text-white rounded-lg hover:bg-blue-400 transition-all shadow-sm mr-2" 
                                    data-id="${e.id}" title="Download PDF">
                                    <i class="fas fa-download"></i>
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
        `;a.append(o)})}function d(n="",a=1){t.ajax({url:"/admin/getpendaftaranpbs",type:"GET",data:{search:n,page:a,limit:b},dataType:"json",success:function(e){const i=e.data;if(!Array.isArray(i)){console.error("Response data bukan array:",i);return}y(i),$(i),M(e.last_page,n),j(e.last_page,n);let s=(e.current_page-1)*b+1,o=s+i.length-1;t("#resultCount").html(`
                <i class="fas fa-info-circle mr-1"></i>
                Menampilkan ${s} - ${o} dari ${e.total} data
            `)},error:function(e,i,s){console.error("Gagal ambil data:",s,e.responseText)}})}function M(n,a){const e=t("#pagination");if(e.empty(),!(n<=1))for(let i=1;i<=n;i++){const s=t(`<button class="page-btn mx-1 px-3 py-1 rounded-lg border ${i===r?"bg-orange-primary text-white":"bg-white text-gray-700 hover:bg-gray-100"}">${i}</button>`);s.on("click",function(){r=i,d(a,r)}),e.append(s)}}function j(n,a){const e=t("#paginationMobile");if(e.empty(),!(n<=1))for(let i=1;i<=n;i++){const s=t(`<button class="px-3 py-1 rounded-lg border ${i===r?"bg-orange-primary text-white":"bg-white text-gray-700 hover:bg-gray-100"}">${i}</button>`);s.on("click",function(){r=i,d(a,r)}),e.append(s)}}t("#searchInputuser").on("input",function(){const n=t(this).val();r=1,d(n,r)});t(function(){d()});function C(n){const a=t("#"+n);a.removeClass("hidden"),setTimeout(()=>{a.find(".modal-content").addClass("show")},10),t("body").addClass("overflow-hidden")}function f(n){const a=t("#"+n);a.find(".modal-content").removeClass("show"),setTimeout(()=>{a.addClass("hidden"),t("body").removeClass("overflow-hidden")},300)}t(document).keydown(function(n){n.keyCode===27&&(t("#employeeModal").hasClass("hidden")?t("#activeModal").hasClass("hidden")||f("activeModal"):f("employeeModal"))});function m(n,a="info"){const s=t(`
        <div class="notification flex items-center space-x-3 ${a==="success"?"bg-green-500":a==="error"?"bg-red-500":"bg-blue-500"} text-white px-6 py-4 rounded-xl shadow-lg transform translate-x-full opacity-0 transition-all duration-300 cursor-pointer">
            <i class="fas ${a==="success"?"fa-check-circle":a==="error"?"fa-exclamation-circle":"fa-info-circle"} text-lg"></i>
            <span class="font-medium">${n}</span>
        </div>
    `);t("#notificationWrapper").append(s),setTimeout(()=>{s.removeClass("translate-x-full opacity-0")},100);const o=setTimeout(()=>{s.addClass("translate-x-full opacity-0"),setTimeout(()=>s.remove(),300)},4e3);s.on("click",function(){clearTimeout(o),t(this).addClass("translate-x-full opacity-0"),setTimeout(()=>t(this).remove(),300)})}function k(){t(window).width()<640?t(".modal-content").addClass("mx-4 max-h-[95vh]"):t(".modal-content").removeClass("mx-4 max-h-[95vh]")}t(window).on("resize",function(){k()});k();function T(){t("body").css({overflow:"hidden","padding-right":"15px"})}function S(){t("body").css({overflow:"","padding-right":""})}function v(n){C(n),T()}function l(n){f(n),S()}t("#closeModal, #cancelBtn").on("click",function(){l("employeeModal")});t("#cancelActiveBtn").on("click",function(){l("activeModal")});t("#cancelMahasiswaBtn").on("click",function(){l("detailMahasiswaModal")});t(".modal-overlay").on("click",function(n){n.target===this&&(t(this).closest("#employeeModal").length?l("employeeModal"):t(this).closest("#activeModal").length?l("activeModal"):t(this).closest("#detailMahasiswaModal").length&&l("detailMahasiswaModal"))});t(document).on("click",".aktif-btn",function(){const n=t(this).data("id"),a=t(this).data("name");t("#activeUserId").val(n),t("#activeUserName").text(a),v("activeModal")});function _(n){const a=t("#activeUserId").val();t.ajax({url:`/admin/confirmpbs/${a}`,type:"PUT",data:{status:n},success:function(e){m(e.message,e.status),l("activeModal"),d()},error:function(e){let i=e.responseJSON&&e.responseJSON.message?e.responseJSON.message:"Gagal menyimpan data!";m(i,"error")}})}t(document).on("click","#confirmActiveBtn",function(){_("Lolos")});t(document).on("click","#rejectActiveBtn",function(){_("Tidak Lolos")});t(document).on("click",".detail-btn",function(){const n=t(this).data("id");v("detailMahasiswaModal"),t.ajax({url:`/admin/mahasiswa/detail/${n}`,type:"GET",success:function(a){t("#detail_nama_mahasiswa").text(a.user.name),t("#detail_nim").text("NIM: "+a.nim),t("#det_jk").text(a.jenis_kelamin),t("#det_email").text(a.user.email),t("#det_agama").text(a.agama),t("#det_telp").text(a.no_wa),t("#det_alamatktp").text(a.alamat_ktp),t("#det_tempatlahir").text(a.tempat_lahir),t("#det_nik").text(a.nik),t("#det_statusperkawinan").text(a.status_perkawinan),t("#det_jumlahsaudara").text(a.jumlah_saudara),t("#det_anakke").text(a.anak_ke),t("#det_semester").text(a.user.akademik.semester),t("#det_ipk").text(a.user.akademik.ip_terakhir),t("#det_status").text(a.user.status_user),t("#det_ayah_nama").text(a.user.orangtua.nama_ayah),t("#det_ayah_kerja").text(a.user.orangtua.pekerjaan_ayah),t("#det_ibu_nama").text(a.user.orangtua.nama_ibu),t("#det_ibu_kerja").text(a.user.orangtua.pekerjaan_ibu),t("#det_ayah_pendidikan").text(a.user.orangtua.pendidikan_ayah),t("#det_ibu_pendidikan").text(a.user.orangtua.pendidikan_ibu),t("#det_tgllahir").text(x(a.tanggal_lahir)),t("#det_universitas").text(a.mitra.nama_mitra),t("#det_ayah_gaji").text(h(a.user.orangtua.penghasilan_ayah)),t("#det_ibu_gaji").text(h(a.user.orangtua.penghasilan_ibu)),t("#det_ortu_telp").text(a.user.orangtua.no_wa_ortu),t("#det_tanggungan").text(a.user.orangtua.jumlah_tanggungan);const e=a.hasilujian&&a.hasilujian.length>0?a.hasilujian[0]:null;t("#det_potensi_benar").text(e?e.jumlah_benar:"-"),t("#det_potensi_salah").text(e?e.jumlah_salah:"-"),t("#det_potensi_tanggal").text(x(e?e.tanggal:"-")),t("#det_potensi_status").text(e&&e.kategori_soal?e.kategori_soal.name:"-");const i=t("#detail_foto_profil"),s=window.defaultAvatar;if(i.off("error"),a.foto){const u=window.location.origin+"/"+a.foto;i.one("error",function(){t(this).attr("src",s)}).attr("src",u)}else i.attr("src",s);const o=t("#document-list");o.empty();const c=[{field:"scan_ktp",label:"Scan KTP"},{field:"scan_kartu_mahasiswa",label:"Kartu Mahasiswa"},{field:"scan_kk",label:"Kartu Keluarga"},{field:"transkrip_nilai",label:"Transkrip Nilai"},{field:"surat_keterangan_aktif",label:"Surat Aktif"},{field:"essay_motivasi",label:"Essay Motivasi"}],g=a.user.dokumen;g?c.forEach(u=>{const p=g[u.field];if(p){const w=`
                            <a href="${window.location.origin+"/"+p}" target="_blank" class="flex items-center p-3 border-2 border-gray-100 rounded-xl hover:bg-gray-50 transition group">
                                <div class="w-10 h-10 bg-red-100 text-red-600 rounded-lg flex items-center justify-center mr-3 group-hover:bg-red-600 group-hover:text-white transition">
                                    <i class="fas fa-file-pdf"></i>
                                </div>
                                <div class="flex flex-col">
                                    <span class="text-xs text-gray-400 uppercase font-bold">${u.label}</span>
                                    <span class="text-sm font-medium text-gray-700 truncate max-w-[150px]">Lihat Dokumen</span>
                                </div>
                            </a>
                        `;o.append(w)}}):o.append('<p class="text-gray-500 italic text-sm">Belum ada dokumen yang diunggah.</p>')},error:function(){m("Gagal mengambil data detail","error")}})});t(document).on("click",".tab-btn",function(){const n=t(this).data("tab");t(".tab-btn").removeClass("active-tab border-blue-700 text-blue-700").addClass("border-transparent text-gray-500"),t(this).addClass("active-tab border-blue-700 text-blue-700").removeClass("border-transparent text-gray-500"),t(".tab-content").addClass("hidden"),t("#"+n).removeClass("hidden")});t(document).on("click",".detail-btn",function(){t('.tab-btn[data-tab="tab-biodata"]').trigger("click")});t(document).on("click",".download-pdf-btn",function(){const n=t(this).data("id");n&&fetch(`/admin/mahasiswa/pdf/${n}`,{method:"GET"}).then(a=>a.blob()).then(a=>{const e=window.URL.createObjectURL(a),i=document.createElement("a");i.href=e,i.download=`Biodata_${n}.pdf`,document.body.appendChild(i),i.click(),i.remove(),window.URL.revokeObjectURL(e)}).catch(()=>alert("Gagal download PDF"))});
