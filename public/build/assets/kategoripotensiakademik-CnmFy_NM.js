import{$ as e}from"./jquery-CEr4rF5i.js";e.ajaxSetup({headers:{"X-CSRF-TOKEN":e('meta[name="csrf-token"]').attr("content")}});e(function(){g()});let c=1;const v=10;function T(t){const s=e("#tableKategorisoal");if(s.empty(),t.length===0){s.append(`
            <tr>
                <td colspan="5" class="px-6 py-10 text-center text-gray-500">
                    <i class="fas fa-info-circle text-gray-300 text-4xl mb-3 block"></i>
                    Tidak ada data ditemukan
                </td>
            </tr>
        `);return}const n=t.some(a=>a.hasil_ujians&&a.hasil_ujians.length>0&&a.hasil_ujians[0].status==="selesai");t.forEach((a,o)=>{const l=CURRENT_USER_ID,u=CURRENT_USER_ROLE;let r=!1;a.hasil_ujians&&a.hasil_ujians.length>0&&(u==9?r=a.hasil_ujians[0].status==="selesai":r=a.hasil_ujians.some(y=>y.mahasiswa_id===l&&y.status==="selesai"));let i="",d="";r?(i='<span class="px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-700 border border-blue-300">Selesai</span>',d=`
                <span class="inline-flex items-center px-3 py-1.5 bg-gray-100 text-gray-400 border border-gray-300 rounded-lg cursor-not-allowed shadow-sm">
                    <i class="fas fa-lock mr-1.5"></i> Terkunci
                </span>`):n?(i='<span class="px-3 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-700 border border-gray-300">Terkunci</span>',d=`
                <span class="inline-flex items-center px-3 py-1.5 bg-gray-100 text-gray-400 border border-gray-300 rounded-lg cursor-not-allowed shadow-sm">
                    <i class="fas fa-lock mr-1.5"></i> Terkunci
                </span>`):a.is_active==1?(i='<span class="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700 border border-green-300">Aktif</span>',d=`
                <button class="start-btn inline-flex items-center px-3 py-1.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all shadow-sm"
                    data-id="${a.id}"
                    data-name="${a.name}"
                    data-waktu="${a.waktu_pengerjaan}">
                    <i class="fas fa-play mr-1.5"></i> Kerjakan
                </button>`):(i='<span class="px-3 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-700 border border-red-300">Tidak Aktif</span>',d=`
                <span class="inline-flex items-center px-3 py-1.5 bg-gray-100 text-gray-400 border border-gray-300 rounded-lg cursor-not-allowed shadow-sm">
                    <i class="fas fa-ban mr-1.5"></i> Tidak tersedia
                </span>`);const f=a.name?a.name.charAt(0).toUpperCase():"-",b=`
            <tr class="hover:bg-gray-50 transition-colors duration-200 border-b border-gray-100">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    ${o+1}
                </td>

                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                        <div class="flex-shrink-0 h-10 w-10">
                            <div class="h-10 w-10 rounded-full bg-gradient-to-r from-blue-600 to-blue-400 flex items-center justify-center text-white font-bold shadow-sm">
                                ${f}
                            </div>
                        </div>
                        <div class="ml-4">
                            <div class="text-sm font-semibold text-gray-900">${a.name}</div>
                            <div class="text-xs text-gray-500">Kategori Soal</div>
                        </div>
                    </div>
                </td>

                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-medium">
                    ${a.waktu_pengerjaan} menit
                </td>

                <td class="px-6 py-4 whitespace-nowrap text-sm">
                    ${i}
                </td>

                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    ${d}
                </td>
            </tr>
        `;s.append(b)})}function _(t){const s=e("#cardContainer");if(s.empty(),t.length===0){s.append(`
            <div class="p-10 text-center text-gray-500 bg-white rounded-2xl border border-dashed border-gray-300">
                <i class="fas fa-folder-open text-gray-300 text-4xl mb-3 block"></i>
                Tidak ada kategori soal ditemukan
            </div>
        `);return}const n=t.some(a=>a.hasil_ujians&&a.hasil_ujians.length>0&&a.hasil_ujians[0].status==="selesai");t.forEach(a=>{const o=CURRENT_USER_ID,l=CURRENT_USER_ROLE;let u=!1;a.hasil_ujians&&a.hasil_ujians.length>0&&(l==9?u=a.hasil_ujians[0].status==="selesai":u=a.hasil_ujians.some(b=>b.mahasiswa_id===o&&b.status==="selesai"));let r="",i="";u?(r='<span class="px-2.5 py-1 text-[10px] font-bold rounded-lg bg-blue-100 text-blue-700 border border-blue-200 uppercase">Selesai</span>',i='<button disabled class="w-full py-2.5 bg-gray-100 text-gray-400 rounded-xl text-xs font-bold border border-gray-200 cursor-not-allowed uppercase"><i class="fas fa-lock mr-1"></i> Terkunci</button>'):n?(r='<span class="px-2.5 py-1 text-[10px] font-bold rounded-lg bg-gray-100 text-gray-600 border border-gray-200 uppercase">Terkunci</span>',i='<button disabled class="w-full py-2.5 bg-gray-100 text-gray-400 rounded-xl text-xs font-bold border border-gray-200 cursor-not-allowed uppercase"><i class="fas fa-lock mr-1"></i> Terkunci</button>'):a.is_active==1?(r='<span class="px-2.5 py-1 text-[10px] font-bold rounded-lg bg-green-100 text-green-700 border border-green-200 uppercase">Aktif</span>',i=`
                <button class="start-btn block w-full text-center py-2.5 bg-green-500 text-white rounded-xl text-xs font-bold hover:bg-green-600 shadow-md shadow-green-100 transition-all active:scale-95 uppercase"
                    data-id="${a.id}"
                    data-name="${a.name}"
                    data-waktu="${a.waktu_pengerjaan}">
                    <i class="fas fa-play mr-1"></i> Kerjakan
                </button>`):(r='<span class="px-2.5 py-1 text-[10px] font-bold rounded-lg bg-red-100 text-red-700 border border-red-200 uppercase">Non-Aktif</span>',i='<button disabled class="w-full py-2.5 bg-gray-50 text-gray-300 rounded-xl text-xs font-bold border border-gray-100 cursor-not-allowed uppercase">Tidak Tersedia</button>');const f=`
            <div class="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm mb-4 transition-all hover:shadow-md">
                <div class="flex justify-between items-start mb-4">
                    <div class="flex items-center space-x-3">
                        <div class="h-12 w-12 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center text-white font-bold shadow-sm transform -rotate-3 text-lg">
                            ${a.name?a.name.charAt(0).toUpperCase():"?"}
                        </div>
                        <div class="max-w-[160px]">
                            <h3 class="text-sm font-extrabold text-gray-900 truncate uppercase tracking-tight">${a.name}</h3>
                            <div class="flex items-center text-[11px] text-gray-400 font-medium mt-0.5">
                                <i class="far fa-clock mr-1"></i> ${a.waktu_pengerjaan} Menit
                            </div>
                        </div>
                    </div>
                    ${r}
                </div>

                <div class="flex space-x-2 mt-2">
                    ${i}
                </div>
            </div>
        `;s.append(f)})}function C(t,s){const n=e("#pagination");if(n.empty(),!(t<=1))for(let a=1;a<=t;a++){const o=e(`<button class="page-btn mx-1 px-3 py-1 rounded-lg border ${a===c?"bg-orange-primary text-white":"bg-white text-gray-700 hover:bg-gray-100"}">${a}</button>`);o.on("click",function(){c=a,g(s,c)}),n.append(o)}}function j(t,s){const n=e("#paginationMobile");if(n.empty(),!(t<=1))for(let a=1;a<=t;a++){const o=e(`<button class="px-3 py-1 rounded-lg border ${a===c?"bg-orange-primary text-white":"bg-white text-gray-700 hover:bg-gray-100"}">${a}</button>`);o.on("click",function(){c=a,g(s,c)}),n.append(o)}}function g(t="",s=1){e.ajax({url:"/admin/getkategoripotensiakademik",type:"GET",data:{search:t,page:s,limit:v},dataType:"json",success:function(n){const a=n.data;if(!Array.isArray(a)){console.error("Response data bukan array:",a);return}T(a),_(a),C(n.last_page,t),j(n.last_page,t);let o=(n.current_page-1)*v+1,l=o+a.length-1;e("#resultCount").html(`
                <i class="fas fa-info-circle mr-1"></i>
                Menampilkan ${o} - ${l} dari ${n.total} data
            `)},error:function(n,a,o){console.error("Gagal ambil data:",o,n.responseText)}})}e("#searchInputkategorisoal").on("input",function(){const t=e(this).val();c=1,g(t,c)});function w(){e("#kategorisoalForm")[0].reset(),e("#kategorisoalForm input, #kategorisoalForm select, #kategorisoalForm textarea").removeClass("border-red-300 bg-red-50")}function h(t){k(t),$()}function $(){e("body").css({overflow:"hidden","padding-right":""})}function k(t){const s=e("#"+t);s.removeClass("hidden"),setTimeout(()=>{s.find(".modal-content").addClass("show")},10),e("body").addClass("overflow-hidden")}function S(){e("body").css({overflow:"","padding-right":""})}e("#closeModal, #cancelBtn").on("click",function(){p("kategorisoalModal")});function p(t){M(t),S()}function M(t){const s=e("#"+t);s.find(".modal-content").removeClass("show"),setTimeout(()=>{s.addClass("hidden"),e("body").removeClass("overflow-hidden")},300)}e(".modal-overlay").on("click",function(t){t.target===this&&(e(this).closest("#kategorisoalModal").length?p("kategorisoalModal"):e(this).closest("#deleteModal").length&&p("deleteModal"))});e("#cancelDeleteBtn").on("click",function(){p("deleteModal")});let x=null;e("#addKategorisoalBtn").on("click",function(){x=null,w(),e("#kategorisoalId").val(""),e("#modalTitle").text("Tambah Kategori Baru"),e("#modalIcon").removeClass("fa-edit").addClass("fa-layer-group"),e("#submitText").text("Simpan Data"),e("#submitIcon").removeClass("fa-edit").addClass("fa-save"),h("kategorisoalModal")});function E(){let t=!0;return["kategorisoalName"].forEach(function(n){const a=e("#"+n);a.val().trim()?a.removeClass("border-red-300 bg-red-50"):(a.addClass("border-red-300 bg-red-50"),t=!1)}),t}function m(t,s="info"){const o=e(`
            <div class="notification flex items-center space-x-3 ${s==="success"?"bg-green-500":s==="error"?"bg-red-500":"bg-blue-500"} text-white px-6 py-4 rounded-xl shadow-lg transform translate-x-full opacity-0 transition-all duration-300 cursor-pointer">
            <i class="fas ${s==="success"?"fa-check-circle":s==="error"?"fa-exclamation-circle":"fa-info-circle"} text-lg"></i>
            <span class="font-medium">${t}</span>
            </div>
            `);e("#notificationWrapper").append(o),setTimeout(()=>{o.removeClass("translate-x-full opacity-0")},100);const l=setTimeout(()=>{o.addClass("translate-x-full opacity-0"),setTimeout(()=>o.remove(),300)},4e3);o.on("click",function(){clearTimeout(l),e(this).addClass("translate-x-full opacity-0"),setTimeout(()=>e(this).remove(),300)})}e("#kategorisoalForm").on("submit",function(t){if(t.preventDefault(),!E()){m("Mohon lengkapi semua field yang wajib diisi!","error");return}const s=e("#submitBtn"),n=s.html();s.html('<i class="fas fa-spinner fa-spin mr-2"></i>Menyimpan...').prop("disabled",!0);const a=e("#kategorisoalId").val(),o={name:e("#kategorisoalName").val(),waktu_pengerjaan:e("#kategorisoalWaktu").val(),is_active:e("#kategorisoalStatus").val()},l=a?`/admin/kategorisoal/${a}`:"/admin/kategorisoal",u=a?"PUT":"POST";e.ajax({url:l,type:u,data:JSON.stringify(o),contentType:"application/json",success:function(r){m(r.message,r.status),p("kategorisoalModal"),s.html(n).prop("disabled",!1),g(e("#searchInputkategorisoal").val(),c)},error:function(r){if(s.html(n).prop("disabled",!1),r.status===422&&r.responseJSON.errors){let i=r.responseJSON.errors,d=[];for(let f in i)i.hasOwnProperty(f)&&d.push(i[f].join(", "));m(d.join(" | "),"error")}else{let i=r.responseJSON&&r.responseJSON.message?r.responseJSON.message:"Terjadi kesalahan saat menyimpan data!";m(i,"error")}}})});e(document).on("click",".edit-btn",function(){x=e(this).data("id"),w(),e("#modalTitle").text("Edit Data Tahun akademik"),e("#modalIcon").removeClass("fa-calendar").addClass("fa-edit"),e("#submitText").text("Update Data"),e("#submitIcon").removeClass("fa-save").addClass("fa-edit"),e.ajax({url:"/admin/kategorisoal/"+x,type:"GET",success:function(t){e("#kategorisoalId").val(t.id),e("#kategorisoalName").val(t.name),e("#kategorisoalWaktu").val(t.waktu_pengerjaan),e("#kategorisoalStatus").val(t.is_active?"1":"0"),k("kategorisoalModal")},error:function(t){console.error("Gagal ambil data:",t.responseText),alert("Gagal ambil data kategorisoal")}})});e(document).on("click",".delete-btn",function(){const t=e(this).data("id"),s=e(this).data("name");e("#deletekategorisoalId").val(t),e("#deleteKategorisoalName").text(s),h("deleteModal")});e(document).on("click","#confirmDeleteBtn",function(){const t=e(this),s=t.html();t.html('<i class="fas fa-spinner fa-spin mr-2"></i>Menghapus...').prop("disabled",!0);const n=e("#deletekategorisoalId").val();e.ajax({url:`/admin/kategorisoal/${n}`,type:"DELETE",success:function(a){m(a.message,a.status),p("deleteModal"),g()},error:function(a){let o=a.responseJSON&&a.responseJSON.message?a.responseJSON.message:"Gagal menghapus data!";m(o,"error")},complete:function(){t.html(s).prop("disabled",!1)}})});e(document).on("click",".start-btn",function(){const t=e(this).data("id"),s=e(this).data("name"),n=e(this).data("waktu");e("#startKategoriId").val(t),e("#startKategoriName").text(s),e("#startKategoriWaktu").text(n),h("startModal")});e("#cancelStartBtn").on("click",function(){p("startModal")});e("#confirmStartBtn").on("click",function(){const t=e("#startKategoriId").val();window.location.href=`/admin/potensiakademik/soal?kategori_id=${t}`});
