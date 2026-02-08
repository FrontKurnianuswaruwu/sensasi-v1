import{$ as e}from"./jquery-BvxTx_lq.js";e.ajaxSetup({headers:{"X-CSRF-TOKEN":e('meta[name="csrf-token"]').attr("content")}});let l=1;const y=10;function T(t){if(!t)return"-";const a=["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"],s=new Date(t);return isNaN(s)?"-":`${s.getDate()} ${a[s.getMonth()]} ${s.getFullYear()}`}function v(t){if(!t)return"";let s=t.toString().replace(/[^,\d]/g,"").split(","),n=s[0].length%3,i=s[0].substr(0,n),r=s[0].substr(n).match(/\d{3}/gi);return r&&(i+=(n?".":"")+r.join(".")),i=s[1]!==void 0?i+","+s[1]:i,"Rp "+i}function j(t){const a=e("#tableBody");if(a.empty(),t.length===0){a.append(`
            <tr>
                <td colspan="5" class="px-6 py-8 text-center text-gray-500">
                    <i class="fas fa-info-circle text-gray-400 mr-2"></i>
                    Tidak ada data ditemukan
                </td>
            </tr>
        `);return}t.forEach((s,n)=>{const i=s.user?.status_user==="Aktif"?"bg-green-100 text-green-800":"bg-red-100 text-red-800",r=`
            <tr class="hover:bg-gray-50 transition-colors duration-200">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${n+1}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                        <div class="flex-shrink-0 h-10 w-10">
                            <div class="h-10 w-10 rounded-full bg-gradient-to-r gradient-bg to-blue-light flex items-center justify-center text-white font-semibold">
                                ${s.user?.name.charAt(0)}
                            </div>
                        </div>
                        <div class="ml-4">
                            <div class="text-sm font-medium text-gray-900">${s.user?.name}</div>
                        </div>
                    </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${s.user?.akademik?.mitra?.nama_mitra||"-"}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${s.user?.email}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${i}">
                        ${s.user?.status_user}
                    </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm">
                    ${s.user.status_user!=="Tidak Aktif"?`
                            <button class="detail-btn px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all mr-2" 
                                data-id="${s.id}" title="Lihat Detail">
                                <i class="fas fa-eye"></i>
                            </button>
                            <button class="alumni-btn px-3 py-1 text-blue-600 hover:text-blue-800 transition-all"
                                title="Set Alumni" data-id="${s.user?.id}" data-name="${s.user.name}">
                                <i class="fas fa-user-graduate text-xl"></i>
                            </button>
                        `:`
                            <i class="fas fa-lock text-gray-400 text-xl" title="Aksi tidak tersedia"></i>
                        `}
                </td>
            </tr>
        `;a.append(r)})}function E(t){const a=e("#cardContainer");if(a.empty(),t.length===0){a.append(`
            <div class="p-6 text-center text-gray-500">
                <i class="fas fa-info-circle text-gray-400 mr-2"></i>
                Tidak ada data ditemukan
            </div>
        `);return}t.forEach(s=>{const n=s.user?.status_user,i=n==="Aktif"?"bg-green-100 text-green-800":"bg-red-100 text-red-800",r=`
            <div class="p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200">
                <div class="flex items-start space-x-3">
                    <div class="flex-shrink-0 h-12 w-12 rounded-full bg-gradient-to-r gradient-bg to-blue-light flex items-center justify-center text-white font-semibold text-lg shadow-sm">
                        ${s.user?.name?s.user.name.charAt(0):"?"}
                    </div>
                    
                    <div class="flex-1 min-w-0">
                        <div class="flex items-center justify-between mb-1">
                            <h3 class="text-base font-bold text-gray-900 truncate">
                                ${s.user?.name||"-"}
                            </h3>
                            <span class="px-2 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${i}">
                                ${n||"-"}
                            </span>
                        </div>
                        
                        <div class="space-y-1 text-sm text-gray-600">
                            <div class="flex items-center">
                                <i class="fas fa-university w-4 mr-2 text-blue-500"></i>
                                <span class="truncate">${s.user?.akademik?.mitra?.nama_mitra||"-"}</span>
                            </div>
                            <div class="flex items-center">
                                <i class="fas fa-envelope w-4 mr-2 text-orange-primary"></i>
                                <span class="truncate">${s.user?.email||"-"}</span>
                            </div>
                        </div>

                        <div class="flex mt-4 space-x-2">
                            ${n!=="Tidak Aktif"?`
                                <button class="detail-btn flex-1 flex items-center justify-center px-3 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition-all" 
                                    data-id="${s.id}">
                                    <i class="fas fa-eye mr-2"></i> Detail
                                </button>
                                <button class="alumni-btn flex-1 flex items-center justify-center px-3 py-2 border border-blue-600 text-blue-600 text-sm font-medium rounded-lg hover:bg-blue-50 transition-all"
                                    data-id="${s.user?.id}" data-name="${s.user?.name}">
                                    <i class="fas fa-user-graduate mr-2"></i> Alumni
                                </button>
                            `:`
                                <div class="flex-1 flex items-center justify-center px-3 py-2 bg-gray-100 text-gray-400 text-sm rounded-lg italic">
                                    <i class="fas fa-lock mr-2"></i> Akses Terkunci
                                </div>
                            `}
                        </div>
                    </div>
                </div>
            </div>
        `;a.append(r)})}function m(t="",a=1){e.ajax({url:"/admin/getpbsaktif",type:"GET",data:{search:t,page:a,limit:y},dataType:"json",success:function(s){const n=s.data;if(!Array.isArray(n)){console.error("Response data bukan array:",n);return}j(n),E(n),S(s.last_page,t),A(s.last_page,t);let i=(s.current_page-1)*y+1,r=i+n.length-1;e("#resultCount").html(`
                <i class="fas fa-info-circle mr-1"></i>
                Menampilkan ${i} - ${r} dari ${s.total} data
            `)},error:function(s,n,i){console.error("Gagal ambil data:",i,s.responseText)}})}function S(t,a){const s=e("#pagination");if(s.empty(),!(t<=1))for(let n=1;n<=t;n++){const i=e(`<button class="page-btn mx-1 px-3 py-1 rounded-lg border ${n===l?"bg-orange-primary text-white":"bg-white text-gray-700 hover:bg-gray-100"}">${n}</button>`);i.on("click",function(){l=n,m(a,l)}),s.append(i)}}function A(t,a){const s=e("#paginationMobile");if(s.empty(),!(t<=1))for(let n=1;n<=t;n++){const i=e(`<button class="px-3 py-1 rounded-lg border ${n===l?"bg-orange-primary text-white":"bg-white text-gray-700 hover:bg-gray-100"}">${n}</button>`);i.on("click",function(){l=n,m(a,l)}),s.append(i)}}e("#searchInputuser").on("input",function(){const t=e(this).val();l=1,m(t,l)});e(function(){m()});let b=null;function w(t){const a=e("#"+t);a.removeClass("hidden"),setTimeout(()=>{a.find(".modal-content").addClass("show")},10),e("body").addClass("overflow-hidden")}function x(t){const a=e("#"+t);a.find(".modal-content").removeClass("show"),setTimeout(()=>{a.addClass("hidden"),e("body").removeClass("overflow-hidden")},300)}function k(){e("#employeeForm")[0].reset(),e("#employeeForm input, #employeeForm select, #employeeForm textarea").removeClass("border-red-300")}e(document).keydown(function(t){t.keyCode===27&&(e("#employeeModal").hasClass("hidden")?e("#alumniModal").hasClass("hidden")||x("alumniModal"):x("employeeModal"))});function F(){let t=!0;["employeeName","employeeEmail","password"].forEach(function(i){const r=e("#"+i);r.val().trim()?r.removeClass("border-red-300 bg-red-50"):(r.addClass("border-red-300 bg-red-50"),t=!1)});const s=e("#employeeEmail").val();return s&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)&&(e("#employeeEmail").addClass("border-red-300 bg-red-50"),t=!1),t}e("#employeeForm").on("submit",function(t){if(t.preventDefault(),!F()){u("Mohon lengkapi semua field yang wajib diisi!","error");return}const a=e("#submitBtn"),s=a.html();a.html('<i class="fas fa-spinner fa-spin mr-2"></i>Menyimpan...').prop("disabled",!0);const n=e("#employeeId").val(),i={name:e("#employeeName").val(),email:e("#employeeEmail").val(),password:e("#password").val(),status:e("#employeeStatus").val(),role:e("#employeeRole").val()},r=n?`/user/${n}`:"/user",f=n?"PUT":"POST";e.ajax({url:r,type:f,data:JSON.stringify(i),contentType:"application/json",success:function(o){u(o.message,o.status),c("employeeModal"),a.html(s).prop("disabled",!1),m(e("#searchInputuser").val(),l)},error:function(o){if(a.html(s).prop("disabled",!1),o.status===422&&o.responseJSON.errors){let d=o.responseJSON.errors,g=[];for(let p in d)d.hasOwnProperty(p)&&g.push(d[p].join(", "));u(g.join(" | "),"error")}else{let d=o.responseJSON&&o.responseJSON.message?o.responseJSON.message:"Terjadi kesalahan saat menyimpan data!";u(d,"error")}}})});e("#employeeModal").on("shown",function(){e("#employeeName").focus()});e("#employeeForm input, #employeeForm select, #employeeForm textarea").on("focus",function(){e(this).removeClass("border-red-300 bg-red-50")});e("#employeeEmail").on("blur",function(){const t=e(this).val();t&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t)?(e(this).addClass("border-red-300 bg-red-50"),_(this,"Format email tidak valid")):(e(this).removeClass("border-red-300 bg-red-50"),$(this))});e("#password").on("blur",function(){const t=e(this).val();t&&t.length<6?(e(this).addClass("border-red-300 bg-red-50"),_(this,"Password harus minimal 6 karakter")):(e(this).removeClass("border-red-300 bg-red-50"),$(this))});function _(t,a){const s=e(t),n=s.attr("id")+"-error";e("#"+n).remove(),s.after(`<div id="${n}" class="text-red-500 text-xs mt-1 animate-pulse"><i class="fas fa-exclamation-circle mr-1"></i>${a}</div>`)}function $(t){const s=e(t).attr("id")+"-error";e("#"+s).remove()}function u(t,a="info"){const i=e(`
        <div class="notification flex items-center space-x-3 ${a==="success"?"bg-green-500":a==="error"?"bg-red-500":"bg-blue-500"} text-white px-6 py-4 rounded-xl shadow-lg transform translate-x-full opacity-0 transition-all duration-300 cursor-pointer">
            <i class="fas ${a==="success"?"fa-check-circle":a==="error"?"fa-exclamation-circle":"fa-info-circle"} text-lg"></i>
            <span class="font-medium">${t}</span>
        </div>
    `);e("#notificationWrapper").append(i),setTimeout(()=>{i.removeClass("translate-x-full opacity-0")},100);const r=setTimeout(()=>{i.addClass("translate-x-full opacity-0"),setTimeout(()=>i.remove(),300)},4e3);i.on("click",function(){clearTimeout(r),e(this).addClass("translate-x-full opacity-0"),setTimeout(()=>e(this).remove(),300)})}function C(){e(window).width()<640?e(".modal-content").addClass("mx-4 max-h-[95vh]"):e(".modal-content").removeClass("mx-4 max-h-[95vh]")}e(window).on("resize",function(){C()});C();function N(){e("body").css({overflow:"hidden","padding-right":"15px"})}function I(){e("body").css({overflow:"","padding-right":""})}function h(t){w(t),N()}function c(t){x(t),I()}function M(t=""){e.get("/admin/menu/getroles",function(a){const s=Array.isArray(a.data)?a.data:[];e("#employeeRole").empty(),e("#employeeRole").append('<option value="">Pilih Role</option>'),s.forEach(function(n){var i=n.id==t?"selected":"";e("#employeeRole").append(`<option value="${n.id}" ${i}>${n.name}</option>`)})}).fail(function(){alert("Gagal mengambil data role. Pastikan API berjalan dengan benar.")})}e("#addEmployeeBtn").on("click",function(){b=null,k(),e("#modalTitle").text("Tambah User Baru"),e("#modalIcon").removeClass("fa-edit").addClass("fa-user-plus"),e("#submitText").text("Simpan Data"),e("#submitIcon").removeClass("fa-edit").addClass("fa-save"),M(),h("employeeModal")});e(document).on("click",".edit-btn",function(){b=e(this).data("id"),k(),e("#modalTitle").text("Edit Data User"),e("#modalIcon").removeClass("fa-user-plus").addClass("fa-edit"),e("#submitText").text("Update Data"),e("#submitIcon").removeClass("fa-save").addClass("fa-edit"),e.ajax({url:"/admin/user/"+b,type:"GET",success:function(t){e("#employeeId").val(t.id),e("#employeeName").val(t.name),e("#employeeEmail").val(t.email),e("#employeeStatus").val(t.status_user),M(t.role),e("#employeeJoinDate").val(t.join_date||""),e("#employeeSalary").val(t.salary||""),e("#employeeAddress").val(t.address||""),w("employeeModal")},error:function(t){console.error("Gagal ambil data:",t.responseText),alert("Gagal ambil data user")}})});e("#closeModal, #cancelBtn").on("click",function(){c("employeeModal")});e("#cancelAlumniBtn").on("click",function(){c("alumniModal")});e("#cancelMahasiswaBtn").on("click",function(){c("detailMahasiswaModal")});e(".modal-overlay").on("click",function(t){t.target===this&&(e(this).closest("#employeeModal").length?c("employeeModal"):e(this).closest("#alumniModal").length?c("alumniModal"):e(this).closest("#detailMahasiswaModal").length&&c("detailMahasiswaModal"))});e(document).on("click",".alumni-btn",function(){const t=e(this).data("id"),a=e(this).data("name");e("#alumniUserId").val(t),e("#alumniUserName").text(a),h("alumniModal")});e(document).on("click","#confirmAlumniBtn",function(){const t=e(this),a=t.html();t.html('<i class="fas fa-spinner fa-spin mr-2"></i>Menyimpan...').prop("disabled",!0);const s=e("#alumniUserId").val();e.ajax({url:`/admin/confirmalumni/${s}`,type:"PUT",success:function(n){u(n.message,n.status),c("alumniModal"),m()},error:function(n){let i=n.responseJSON&&n.responseJSON.message?n.responseJSON.message:"Gagal menyimpan data!";u(i,"error")},complete:function(){t.html(a).prop("disabled",!1)}})});e(document).on("click",".detail-btn",function(){const t=e(this).data("id");h("detailMahasiswaModal"),e.ajax({url:`/admin/mahasiswa/detail/${t}`,type:"GET",success:function(a){e("#detail_nama_mahasiswa").text(a.user.name),e("#detail_nim").text("NIM: "+a.nim),e("#det_jk").text(a.jenis_kelamin),e("#det_email").text(a.user.email),e("#det_agama").text(a.agama),e("#det_telp").text(a.no_wa),e("#det_alamat").text(a.alamat_ktp),e("#det_semester").text(a.user.akademik.semester),e("#det_ipk").text(a.user.akademik.ip_terakhir),e("#det_status").text(a.user.status_user),e("#det_ayah_nama").text(a.user.orangtua.nama_ayah),e("#det_ayah_kerja").text(a.user.orangtua.pekerjaan_ayah),e("#det_ibu_nama").text(a.user.orangtua.nama_ibu),e("#det_ibu_kerja").text(a.user.orangtua.pekerjaan_ibu),e("#det_tgllahir").text(T(a.tanggal_lahir)),e("#det_universitas").text(a.mitra.nama_mitra),e("#det_ayah_gaji").text(v(a.user.orangtua.penghasilan_ayah)),e("#det_ibu_gaji").text(v(a.user.orangtua.penghasilan_ibu)),e("#det_ortu_telp").text(a.user.orangtua.no_wa_ortu),e("#det_tanggungan").text(a.user.orangtua.jumlah_tanggungan);const s=e("#detail_foto_profil"),n=window.defaultAvatar;if(s.off("error"),a.foto){const o=window.location.origin+"/"+a.foto;s.one("error",function(){e(this).attr("src",n)}).attr("src",o)}else s.attr("src",n);const i=e("#document-list");i.empty();const r=[{field:"scan_ktp",label:"Scan KTP"},{field:"scan_kartu_mahasiswa",label:"Kartu Mahasiswa"},{field:"scan_kk",label:"Kartu Keluarga"},{field:"transkrip_nilai",label:"Transkrip Nilai"},{field:"surat_keterangan_aktif",label:"Surat Aktif"},{field:"essay_motivasi",label:"Essay Motivasi"}],f=a.user.dokumen;f?r.forEach(o=>{const d=f[o.field];if(d){const p=`
                            <a href="${window.location.origin+"/"+d}" target="_blank" class="flex items-center p-3 border-2 border-gray-100 rounded-xl hover:bg-gray-50 transition group">
                                <div class="w-10 h-10 bg-red-100 text-red-600 rounded-lg flex items-center justify-center mr-3 group-hover:bg-red-600 group-hover:text-white transition">
                                    <i class="fas fa-file-pdf"></i>
                                </div>
                                <div class="flex flex-col">
                                    <span class="text-xs text-gray-400 uppercase font-bold">${o.label}</span>
                                    <span class="text-sm font-medium text-gray-700 truncate max-w-[150px]">Lihat Dokumen</span>
                                </div>
                            </a>
                        `;i.append(p)}}):i.append('<p class="text-gray-500 italic text-sm">Belum ada dokumen yang diunggah.</p>')},error:function(){u("Gagal mengambil data detail","error")}})});e(document).on("click",".tab-btn",function(){const t=e(this).data("tab");e(".tab-btn").removeClass("active-tab border-blue-700 text-blue-700").addClass("border-transparent text-gray-500"),e(this).addClass("active-tab border-blue-700 text-blue-700").removeClass("border-transparent text-gray-500"),e(".tab-content").addClass("hidden"),e("#"+t).removeClass("hidden")});e(document).on("click",".detail-btn",function(){e('.tab-btn[data-tab="tab-biodata"]').trigger("click")});
