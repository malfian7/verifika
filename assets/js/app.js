(function(){
"use strict";
var $ = function(s,r){return (r||document).querySelector(s);};
var $$ = function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s));};
var S = function(v){return String(v).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});};

/* ---------- icon set ---------- */
var I = {
  id:'<rect x="2.5" y="4.5" width="19" height="15" rx="2.5"/><circle cx="8.5" cy="11" r="2"/><path d="M5.2 16.5c.6-1.5 1.9-2.2 3.3-2.2s2.7.7 3.3 2.2M15 10h4M15 13.5h4"/>',
  car:'<path d="M3 13.5 4.8 8A2 2 0 0 1 6.7 6.6h10.6A2 2 0 0 1 19.2 8L21 13.5"/><path d="M3 13.5h18v4a1 1 0 0 1-1 1h-1.5a1 1 0 0 1-1-1v-.5h-11v.5a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-4Z"/><path d="M6.5 16h1M16.5 16h1"/>',
  book:'<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H19v15H6.5A2.5 2.5 0 0 0 4 20.5V5.5Z"/><path d="M4 18.5A2.5 2.5 0 0 1 6.5 16H19v5H6.5A2.5 2.5 0 0 1 4 18.5Z"/><path d="M8 7.5h7M8 10.5h5"/>',
  land:'<path d="M3 20h18"/><path d="M4.5 20V9.5l7-5.5 8 5.5V20"/><path d="M9.5 20v-5.5h5V20"/>',
  gold:'<path d="M6 9.5h12l2.5 5.5H3.5L6 9.5Z"/><path d="M8.5 4.5h7L17 9.5H7l1.5-5Z"/><path d="M3.5 15v3.5h17V15"/>',
  invest:'<path d="M3 19h18"/><path d="m4.5 15 4.5-5 3.5 3 6.5-7.5"/><path d="M15 5.5h4v4"/><path d="M4.5 15v4M9 10v9M12.5 13v6M19 5.5V19"/>',
  passport:'<rect x="4.5" y="2.5" width="15" height="19" rx="2.5"/><circle cx="12" cy="10" r="3.5"/><path d="M8.5 10h7M12 6.5c1.4 1.9 1.4 5.1 0 7M12 6.5c-1.4 1.9-1.4 5.1 0 7M9 17.5h6"/>',
  family:'<circle cx="8" cy="7.5" r="2.6"/><circle cx="16.5" cy="9" r="2.1"/><path d="M3.5 19c0-2.8 2-4.6 4.5-4.6s4.5 1.8 4.5 4.6"/><path d="M14 19c0-2.2 1.2-3.6 2.8-3.6S20 16.8 20 19"/>',
  bank:'<path d="M3 10.5 12 4l9 6.5"/><path d="M5 10.5V19M19 10.5V19M9.5 10.5V19M14.5 10.5V19"/><path d="M3 19h18"/>',
  deed:'<path d="M14 3v5h5"/><path d="M19 8v11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7Z"/><path d="M8.5 12.5h7M8.5 16h4"/><circle cx="15.5" cy="16.5" r="2"/>',
  other:'<path d="M12 3l1.9 4.6L18.5 9.5l-4.6 1.9L12 16l-1.9-4.6L5.5 9.5l4.6-1.9L12 3Z"/><path d="M18 16.5l.8 1.9 1.9.8-1.9.8-.8 1.9-.8-1.9-1.9-.8 1.9-.8.8-1.9Z"/>'
};
function svg(p,w){return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="'+(w||1.7)+'" stroke-linecap="round" stroke-linejoin="round">'+p+'</svg>';}
var TICK='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>';
var BANG='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 8v5M12 16.5h.01"/></svg>';
var CROSS='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6 6l12 12M18 6 6 18"/></svg>';
var SPARK='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l1.9 4.6L18.5 9.5l-4.6 1.9L12 16l-1.9-4.6L5.5 9.5l4.6-1.9L12 3Z"/></svg>';

/* ---------- mode catalogue ---------- */
function f(k,v,c,o){o=o||{};return {k:k,v:v,c:c,mono:!!o.mono,note:o.note||''};}
var MODES=[
{
  id:'ktp', name:'KTP / e-KTP', code:'ID-KTP', icon:I.id, shape:'card',
  desc:'Kartu Tanda Penduduk. 14 field standar Dukcapil termasuk pembedahan NIK.',
  fileName:'ktp_raka_pratama.jpg · 1,8 MB', subject:'RAKA PRATAMA',
  tip:'Gunakan pencahayaan merata, hindari pantulan hologram, dan posisikan kartu mendatar.',
  verdict:['Identitas terverifikasi','NIK, nama, dan tanggal lahir konsisten dengan format e-KTP Dukcapil. Tidak ada jejak manipulasi gambar.'],
  conf:98.7, risk:12,
  fields:[
    f('NIK','3173051708940004',99.6,{mono:1}),
    f('Nama lengkap','RAKA PRATAMA',99.1),
    f('Tempat, tanggal lahir','JAKARTA, 17-08-1994',98.4),
    f('Jenis kelamin','LAKI-LAKI',99.8),
    f('Golongan darah','O',93.0),
    f('Alamat','JL. KEMANG RAYA NO. 18',96.2),
    f('RT / RW','004 / 006',95.5,{mono:1}),
    f('Kelurahan / desa','BANGKA',94.0),
    f('Kecamatan','MAMPNG PRAPATAN',87.2,{note:'Ejaan tidak baku. Saran perbaikan: MAMPANG PRAPATAN'}),
    f('Agama','ISLAM',99.0),
    f('Status perkawinan','BELUM KAWIN',98.0),
    f('Pekerjaan','KARYAWAN SWASTA',97.2),
    f('Kewarganegaraan','WNI',99.9),
    f('Berlaku hingga','SEUMUR HIDUP',99.5)
  ],
  ai:[
    ['Bedah &amp; validasi NIK','Memecah 16 digit NIK menjadi kode wilayah, tanggal lahir, dan jenis kelamin, lalu mencocokkannya dengan field yang terbaca.',1],
    ['Deteksi manipulasi gambar','Memeriksa jejak penyuntingan, ketidaksesuaian font, dan tanda foto yang ditempel ulang.',1],
    ['Tolak tangkapan layar &amp; fotokopi','Mengenali pola moiré dan pantulan layar agar hanya bidikan langsung yang diterima.',1],
    ['Pencocokan wajah dengan selfie','Membandingkan foto pada kartu dengan selfie pengaju dan mengembalikan skor kemiripan.',1],
    ['Deteksi NIK ganda &amp; daftar internal','Mencocokkan NIK ke pengajuan sebelumnya untuk menandai pengajuan berulang.',1],
    ['Normalisasi alamat','Merapikan singkatan dan memetakan alamat ke kode wilayah Kemendagri.',0]
  ],
  findings:[
    ['ok','Keaslian dokumen 99,2%','Tekstur kartu, posisi hologram, dan pola cetak sesuai spesifikasi e-KTP.'],
    ['ok','NIK konsisten dengan field lain','Digit 7–12 mengurai ke 17-08-1994, cocok dengan tanggal lahir yang terbaca.'],
    ['warn','Satu field perlu dikonfirmasi','Nama kecamatan terbaca "MAMPNG PRAPATAN". Kemungkinan huruf hilang karena lipatan kartu.'],
    ['ai','Wajah cocok 94,6%','Foto kartu dibandingkan dengan selfie pengaju. Di atas ambang penerimaan 90%.'],
    ['ok','Tidak ada pengajuan ganda','NIK ini belum pernah masuk dalam 90 hari terakhir.']
  ]
},
{
  id:'stnk', name:'STNK', code:'VEH-STNK', icon:I.car, shape:'card',
  desc:'Surat Tanda Nomor Kendaraan. Data kendaraan, pemilik, dan jatuh tempo pajak.',
  fileName:'stnk_b2481kzt.jpg · 2,4 MB', subject:'B 2481 KZT',
  tip:'Foto seluruh lembar termasuk kolom pajak di bagian bawah agar jatuh tempo terbaca.',
  verdict:['Data kendaraan terverifikasi','Nomor rangka dan mesin konsisten. Perhatikan masa berlaku pajak yang sudah dekat.'],
  conf:97.4, risk:28,
  fields:[
    f('Nomor registrasi','B 2481 KZT',99.4,{mono:1}),
    f('Nama pemilik','RAKA PRATAMA',98.6),
    f('Alamat','JL. KEMANG RAYA NO. 18, JAKARTA SELATAN',95.1),
    f('Merk / type','TOYOTA / AVANZA 1.3 G M/T',98.2),
    f('Jenis / model','MINIBUS',99.0),
    f('Tahun pembuatan','2019',99.5,{mono:1}),
    f('Nomor rangka','MHKA6GJ6JKJ004821',96.8,{mono:1}),
    f('Nomor mesin','K3VEJ21847',91.3,{mono:1}),
    f('Warna','PUTIH',99.2),
    f('Bahan bakar','BENSIN',98.8),
    f('Nomor BPKB','N-08245219',94.7,{mono:1}),
    f('Berlaku sampai','14-03-2027',98.1,{mono:1}),
    f('Pajak (PKB) terakhir','Rp 2.847.000',89.4,{mono:1,note:'Angka ribuan tertimpa stempel. Konfirmasi ke lembar pajak.'})
  ],
  ai:[
    ['Estimasi nilai pasar kendaraan','Menaksir harga pasar terkini dari merk, tipe, tahun, dan wilayah untuk keperluan penilaian agunan.',1],
    ['Pengingat jatuh tempo pajak','Membaca masa berlaku dan menjadwalkan notifikasi 30 hari sebelum jatuh tempo.',1],
    ['Cek plat blokir &amp; laporan hilang','Mencocokkan nomor registrasi ke daftar blokir internal dan laporan kendaraan hilang.',1],
    ['Konsistensi rangka &amp; mesin','Memeriksa format nomor rangka terhadap pola VIN pabrikan dan mendeteksi digit yang diubah.',1],
    ['Cocokkan dengan BPKB','Menyandingkan field STNK dengan BPKB pada pengajuan yang sama dan menandai selisihnya.',0]
  ],
  findings:[
    ['ok','Format nomor rangka valid','MHKA6GJ6JKJ004821 sesuai pola VIN Toyota Indonesia untuk perakitan 2019.'],
    ['warn','Pajak jatuh tempo 172 hari lagi','Masa berlaku 14-03-2027. Diberi tanda untuk pengingat otomatis.'],
    ['ai','Estimasi nilai pasar Rp 168–182 juta','Berdasarkan 1.284 listing sebanding di Jabodetabek, 30 hari terakhir.'],
    ['ok','Tidak masuk daftar blokir','Nomor registrasi bersih dari catatan blokir maupun laporan kehilangan.'],
    ['warn','Satu field tertutup stempel','Nominal pajak sebagian tertimpa. Disarankan verifikasi ke lembar pengesahan.']
  ]
},
{
  id:'bpkb', name:'BPKB', code:'VEH-BPKB', icon:I.book, shape:'book',
  desc:'Buku Pemilik Kendaraan Bermotor. Termasuk rantai kepemilikan dan status jaminan.',
  fileName:'bpkb_n08245219.pdf · 5,1 MB', subject:'N-08245219',
  tip:'Pindai halaman identitas kendaraan dan halaman riwayat pemilik sekaligus.',
  verdict:['Dokumen agunan layak','Rantai kepemilikan terbaca lengkap dan tidak ada catatan jaminan aktif.'],
  conf:96.1, risk:21,
  fields:[
    f('Nomor BPKB','N-08245219',98.9,{mono:1}),
    f('Nama pemilik','RAKA PRATAMA',98.4),
    f('Alamat pemilik','JL. KEMANG RAYA NO. 18, JAKARTA SELATAN',94.2),
    f('Merk / type','TOYOTA / AVANZA 1.3 G M/T',98.0),
    f('Nomor rangka','MHKA6GJ6JKJ004821',97.1,{mono:1}),
    f('Nomor mesin','K3VEJ21847',95.6,{mono:1}),
    f('Tahun pembuatan','2019',99.3,{mono:1}),
    f('Jumlah pemilik tercatat','2 orang',97.8),
    f('Pemilik pertama','PT ASTRA SEDAYA FINANCE',96.0),
    f('Tanggal peralihan terakhir','08-11-2022',95.2,{mono:1}),
    f('Diterbitkan oleh','POLDA METRO JAYA',98.5),
    f('Tanggal penerbitan','22-07-2019',97.4,{mono:1}),
    f('Catatan jaminan','TIDAK ADA CATATAN',88.6,{note:'Kolom catatan hampir kosong. Pastikan tidak ada halaman jaminan yang belum terpindai.'})
  ],
  ai:[
    ['Rekonstruksi rantai kepemilikan','Menyusun urutan pemilik beserta tanggal peralihan menjadi satu garis waktu yang bisa diaudit.',1],
    ['Cocokkan dengan STNK','Membandingkan rangka, mesin, dan identitas pemilik terhadap STNK pada pengajuan yang sama.',1],
    ['Verifikasi hologram &amp; watermark','Memeriksa unsur pengaman halaman BPKB untuk mendeteksi buku palsu atau halaman sisipan.',1],
    ['Penilaian agunan','Menghitung nilai agunan dan plafon maksimum dari estimasi harga pasar kendaraan.',1],
    ['Deteksi BPKB ganda','Menandai nomor rangka yang sudah pernah dijaminkan pada pengajuan lain.',1]
  ],
  findings:[
    ['ok','Rangka &amp; mesin cocok dengan STNK','Kedua nomor identik pada dua dokumen dalam pengajuan ini.'],
    ['ok','Unsur pengaman halaman terbaca','Hologram dan watermark pada halaman identitas sesuai spesimen Korlantas.'],
    ['warn','Halaman jaminan belum lengkap','Terbaca 4 dari perkiraan 6 halaman. Unggah halaman catatan jaminan untuk kepastian.'],
    ['ai','Nilai agunan Rp 168 juta · plafon 70%','Plafon indikatif Rp 117,6 juta mengikuti kebijakan LTV kendaraan bekas.'],
    ['ok','Tidak ada penjaminan ganda','Nomor rangka belum tercatat pada fasilitas aktif lain.']
  ]
},
{
  id:'tanah', name:'Surat Tanah', code:'LAND-SHM', icon:I.land, shape:'a4',
  desc:'Sertifikat hak atas tanah (SHM, SHGB, AJB). Luas, batas, dan hak tanggungan.',
  fileName:'shm_04127_bangka.pdf · 7,8 MB', subject:'SHM No. 04127',
  tip:'Sertakan halaman surat ukur dan halaman catatan perubahan di bagian belakang.',
  verdict:['Sertifikat terbaca — ada hak tanggungan','Objek masih terikat hak tanggungan peringkat I. Perlu keputusan manual sebelum diproses.'],
  conf:94.8, risk:58,
  fields:[
    f('Jenis hak','HAK MILIK (SHM)',98.7),
    f('Nomor hak','04127',98.2,{mono:1}),
    f('NIB','09.02.03.04.01234',95.4,{mono:1}),
    f('Pemegang hak','RAKA PRATAMA',97.9),
    f('Luas tanah','187 m²',96.8,{mono:1}),
    f('Kelurahan','BANGKA',97.1),
    f('Kecamatan','MAMPANG PRAPATAN',96.4),
    f('Kota / kabupaten','JAKARTA SELATAN',98.3),
    f('Nomor surat ukur','00214 / 2018',93.2,{mono:1}),
    f('Tanggal penerbitan','19-06-2018',96.0,{mono:1}),
    f('Diterbitkan oleh','KANTOR PERTANAHAN KOTA JAKARTA SELATAN',95.8),
    f('Hak tanggungan','PERINGKAT I — BANK PELITA, 2023',86.9,{note:'Catatan hak tanggungan aktif terbaca di halaman perubahan.'}),
    f('Batas utara','TANAH MILIK NO. 04128',89.1),
    f('Batas selatan','JALAN LINGKUNGAN 4 M',88.4)
  ],
  ai:[
    ['Parsing luas, batas, dan koordinat','Mengubah uraian batas dan surat ukur menjadi data terstruktur, termasuk luas dalam meter persegi.',1],
    ['Deteksi hak tanggungan &amp; sita','Menyisir halaman perubahan untuk catatan pembebanan, blokir, atau sita yang masih aktif.',1],
    ['Estimasi nilai tanah (ZNT / NJOP)','Menaksir nilai objek dari zona nilai tanah dan transaksi pembanding di sekitar lokasi.',1],
    ['Deteksi tumpang tindih bidang','Membandingkan NIB dan uraian batas dengan bidang lain yang pernah diajukan.',1],
    ['Ringkasan riwayat peralihan','Merangkum urutan peralihan hak beserta dasar hukumnya menjadi satu paragraf.',0]
  ],
  findings:[
    ['bad','Hak tanggungan aktif peringkat I','Objek terikat Bank Pelita sejak 2023. Pengajuan tidak dapat lanjut otomatis.'],
    ['ok','Luas &amp; surat ukur konsisten','187 m² pada halaman hak sama dengan gambar ukur 00214/2018.'],
    ['ai','Estimasi nilai Rp 3,9–4,4 miliar','Berdasarkan ZNT Mampang Prapatan dan 18 transaksi pembanding 12 bulan terakhir.'],
    ['warn','Uraian batas terbaca sebagian','Batas timur dan barat tertutup lipatan kertas. Unggah ulang halaman tersebut.'],
    ['ok','Tidak ada indikasi tumpang tindih','NIB tidak beririsan dengan bidang lain dalam basis data internal.']
  ]
},
{
  id:'emas', name:'Surat Emas', code:'GOLD-CERT', icon:I.gold, shape:'card',
  desc:'Sertifikat logam mulia. Berat, kadar, nomor seri, dan valuasi harga harian.',
  fileName:'sertifikat_antam_50g.jpg · 1,2 MB', subject:'Antam 50 g · 999,9',
  tip:'Foto sertifikat beserta batangan agar nomor seri pada keduanya bisa dicocokkan.',
  verdict:['Sertifikat terverifikasi','Nomor seri, kadar, dan berat konsisten dengan format sertifikat Antam CertiCard.'],
  conf:98.2, risk:9,
  fields:[
    f('Penerbit','PT ANTAM TBK — UBPP LOGAM MULIA',99.1),
    f('Nomor sertifikat','LM-2024-0918-44821',98.6,{mono:1}),
    f('Nomor seri batangan','AN50G-774219',97.2,{mono:1}),
    f('Berat','50,00 gram',99.4,{mono:1}),
    f('Kadar kemurnian','999,9 (24 karat)',99.0,{mono:1}),
    f('Dimensi','49 × 29 × 3,2 mm',94.6,{mono:1}),
    f('Tanggal terbit','18-09-2024',98.0,{mono:1}),
    f('Pemegang tercatat','RAKA PRATAMA',96.9),
    f('Jenis kemasan','CERTICARD BERSEGEL',97.5)
  ],
  ai:[
    ['Verifikasi nomor seri penerbit','Memeriksa pola nomor sertifikat dan seri batangan terhadap format resmi penerbit.',1],
    ['Valuasi harga emas harian','Mengalikan berat dan kadar dengan harga acuan hari ini untuk mendapat nilai agunan terkini.',1],
    ['Deteksi sertifikat palsu','Memeriksa mikroteks, hologram, dan konsistensi cetak terhadap spesimen asli.',1],
    ['Cocokkan seri kartu &amp; batangan','Membandingkan nomor seri pada sertifikat dengan yang terbaca pada batangan di foto.',1],
    ['Deteksi sertifikat kembar','Menandai nomor seri yang pernah diajukan sebagai agunan di tempat lain.',1]
  ],
  findings:[
    ['ok','Format sertifikat sesuai spesimen','Tata letak, mikroteks, dan posisi hologram cocok dengan CertiCard terbitan 2024.'],
    ['ai','Nilai wajar hari ini Rp 98.750.000','50 g × kadar 999,9 pada harga acuan Rp 1.975.000/gram, 17 Sep 2026.'],
    ['ok','Seri kartu &amp; batangan cocok','AN50G-774219 terbaca identik pada sertifikat dan batangan.'],
    ['ok','Segel kemasan utuh','Tidak ada tanda kemasan pernah dibuka atau disegel ulang.'],
    ['ok','Tidak ada pengajuan kembar','Nomor seri belum pernah dijadikan agunan pada 24 bulan terakhir.']
  ]
},
{
  id:'investasi', name:'Surat Investasi', code:'INV-DOC', icon:I.invest, shape:'a4',
  desc:'Bukti kepemilikan efek: obligasi, reksa dana, deposito, atau saham.',
  fileName:'konfirmasi_ori024.pdf · 640 KB', subject:'ORI024 · Rp 250 juta',
  tip:'Sertakan halaman konfirmasi kepemilikan dari kustodian, bukan hanya tangkapan layar aplikasi.',
  verdict:['Instrumen terverifikasi','Nilai nominal dan status penjaminan terbaca. Instrumen masih aktif hingga jatuh tempo.'],
  conf:97.1, risk:18,
  fields:[
    f('Jenis instrumen','OBLIGASI NEGARA RITEL — ORI024',98.4),
    f('Nama pemegang','RAKA PRATAMA',98.8),
    f('Nomor rekening efek','ID-KSEI-0048217734',96.2,{mono:1}),
    f('Nilai nominal','Rp 250.000.000',99.0,{mono:1}),
    f('Kupon / imbal hasil','6,15% p.a. — tetap',97.6,{mono:1}),
    f('Frekuensi pembayaran','BULANAN',98.1),
    f('Tanggal setelmen','15-04-2025',97.2,{mono:1}),
    f('Tanggal jatuh tempo','15-04-2028',97.9,{mono:1}),
    f('Kustodian','PT BANK CENTRAL ASIA TBK',96.4),
    f('Status','AKTIF — DAPAT DIJAMINKAN',92.8),
    f('Klausa pembatasan','TIDAK DAPAT DIPERDAGANGKAN DI PASAR SEKUNDER SEBELUM 15-07-2025',87.5,{note:'Klausa terbaca di lampiran halaman 2. Perlu dibaca petugas.'})
  ],
  ai:[
    ['Klasifikasi instrumen otomatis','Mengenali jenis efek dari bentuk dokumen dan istilah yang dipakai, lalu memilih skema field yang sesuai.',1],
    ['Hitung nilai wajar &amp; bunga berjalan','Menghitung nilai kini dan bunga yang sudah berjalan sejak pembayaran kupon terakhir.',1],
    ['Analisis jatuh tempo &amp; likuiditas','Menilai seberapa cepat instrumen bisa dicairkan dan memetakannya ke kebijakan agunan.',1],
    ['Ekstraksi klausa penjaminan','Menyisir lampiran untuk klausa larangan atau pembatasan penjaminan lalu merangkumnya.',1],
    ['Profil risiko instrumen','Memberi klasifikasi risiko berdasarkan penerbit, tenor, dan jenis imbal hasil.',0]
  ],
  findings:[
    ['ok','Instrumen aktif dan dapat dijaminkan','Status kepemilikan dikonfirmasi kustodian, jatuh tempo masih 19 bulan.'],
    ['ai','Bunga berjalan Rp 2.049.315','Dihitung dari kupon 6,15% untuk 48 hari sejak pembayaran terakhir.'],
    ['warn','Ada klausa pembatasan perdagangan','Larangan pasar sekunder sebelum 15-07-2025 sudah lewat, tetapi perlu dikonfirmasi petugas.'],
    ['ok','Penerbit berperingkat tinggi','Obligasi pemerintah, risiko gagal bayar dinilai sangat rendah.'],
    ['ai','Klasifikasi risiko: konservatif','Cocok sebagai agunan likuid dengan potongan nilai (haircut) 10%.']
  ]
},
{
  id:'passport', name:'Paspor', code:'ID-PASS', icon:I.passport, shape:'book',
  desc:'Paspor Indonesia maupun asing. Parsing MRZ lengkap dengan digit periksa.',
  fileName:'passport_page_bio.jpg · 2,1 MB', subject:'C4821937',
  tip:'Foto halaman biodata secara penuh, termasuk dua baris MRZ di bagian bawah.',
  verdict:['Paspor terverifikasi','Seluruh digit periksa MRZ valid dan konsisten dengan zona visual halaman biodata.'],
  conf:99.3, risk:14,
  fields:[
    f('Jenis dokumen','P — PASPOR BIASA',99.8,{mono:1}),
    f('Kode negara','IDN',99.9,{mono:1}),
    f('Nomor paspor','C4821937',99.6,{mono:1}),
    f('Nama lengkap','PRATAMA, RAKA',99.2),
    f('Kewarganegaraan','INDONESIA',99.7),
    f('Tanggal lahir','17-08-1994',99.4,{mono:1}),
    f('Tempat lahir','JAKARTA',98.6),
    f('Jenis kelamin','L / M',99.9,{mono:1}),
    f('Tanggal pengeluaran','13-08-2019',99.1,{mono:1}),
    f('Tanggal berakhir','12-08-2029',99.3,{mono:1}),
    f('Kantor penerbit','KANTOR IMIGRASI JAKARTA SELATAN',97.4),
    f('MRZ baris 1','P&lt;IDNPRATAMA&lt;&lt;RAKA&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;',99.5,{mono:1}),
    f('MRZ baris 2','C48219374IDN9408177M2908125&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;04',99.1,{mono:1})
  ],
  ai:[
    ['Parsing MRZ &amp; digit periksa','Membaca dua baris MRZ, menghitung ulang setiap digit periksa, dan menolak dokumen yang tidak lolos.',1],
    ['Cocokkan MRZ dengan zona visual','Membandingkan hasil MRZ dengan teks halaman biodata untuk menangkap data yang diubah.',1],
    ['Deteksi penggantian foto &amp; laminasi','Memeriksa tepi laminasi, pola guilloche, dan jejak foto yang diganti.',1],
    ['Peringatan masa berlaku','Menandai paspor yang akan berakhir dalam enam bulan sesuai aturan perjalanan umum.',1],
    ['Penyaringan daftar sanksi &amp; PEP','Mencocokkan nama dan tanggal lahir ke daftar sanksi serta daftar pejabat publik.',1],
    ['Pembacaan chip NFC','Membaca chip e-paspor bila perangkat pengaju mendukung, lalu membandingkannya dengan hasil OCR.',0]
  ],
  findings:[
    ['ok','Seluruh digit periksa MRZ valid','Nomor dokumen, tanggal lahir, tanggal berakhir, dan digit komposit lolos perhitungan.'],
    ['ok','MRZ cocok dengan zona visual','Tidak ada selisih antara baris mesin dan teks halaman biodata.'],
    ['warn','Masa berlaku tersisa 2 tahun 11 bulan','Masih aman, namun akan masuk peringatan otomatis pada Februari 2029.'],
    ['ok','Tidak ada kecocokan daftar sanksi','Nama dan tanggal lahir bersih dari daftar sanksi dan PEP yang dipantau.'],
    ['ai','Keaslian laminasi 98,8%','Pola guilloche dan tepi laminasi konsisten dengan paspor terbitan 2019.']
  ]
},
{
  id:'kk', name:'Kartu Keluarga', code:'ID-KK', icon:I.family, shape:'a4',
  desc:'Kartu Keluarga. Tabel anggota keluarga diubah menjadi graf hubungan.',
  fileName:'kk_3173052508190004.pdf · 1,1 MB', subject:'Keluarga PRATAMA',
  tip:'Pindai satu lembar penuh; tabel anggota keluarga harus terlihat sampai baris terakhir.',
  verdict:['Kartu Keluarga terbaca lengkap','Empat anggota terekstraksi beserta hubungan keluarga dan NIK masing-masing.'],
  conf:96.6, risk:16,
  fields:[
    f('Nomor Kartu Keluarga','3173052508190004',99.2,{mono:1}),
    f('Kepala keluarga','BAMBANG PRATAMA',98.4),
    f('Alamat','JL. KEMANG RAYA NO. 18',95.6),
    f('RT / RW','004 / 006',96.1,{mono:1}),
    f('Kelurahan / kecamatan','BANGKA / MAMPANG PRAPATAN',95.0),
    f('Kota / provinsi','JAKARTA SELATAN / DKI JAKARTA',97.8),
    f('Jumlah anggota','4 orang',98.9),
    f('Anggota 1','BAMBANG PRATAMA — KEPALA KELUARGA — 3173051203650002',96.8,{mono:1}),
    f('Anggota 2','SITI RAHAYU — ISTRI — 3173056607680003',96.2,{mono:1}),
    f('Anggota 3','RAKA PRATAMA — ANAK — 3173051708940004',97.5,{mono:1}),
    f('Anggota 4','DINDA PRATAMA — ANAK — 3173054512990008',89.7,{mono:1,note:'Dua digit terakhir NIK tertutup lipatan. Perlu konfirmasi.'}),
    f('Tanggal penerbitan','25-08-2019',97.0,{mono:1})
  ],
  ai:[
    ['Ekstraksi tabel anggota jadi graf','Mengubah baris tabel menjadi daftar anggota dengan hubungan keluarga, NIK, dan tanggal lahir.',1],
    ['Konsistensi KK dengan KTP','Mencocokkan NIK, nama, dan alamat terhadap KTP pada pengajuan yang sama.',1],
    ['Hitung jumlah tanggungan','Menurunkan jumlah tanggungan dari komposisi anggota untuk analisis kemampuan bayar.',1],
    ['Deteksi anggota tercatat ganda','Menandai NIK yang muncul pada lebih dari satu Kartu Keluarga.',1],
    ['Normalisasi hubungan keluarga','Menyeragamkan istilah hubungan ke daftar acuan Dukcapil.',0]
  ],
  findings:[
    ['ok','NIK pengaju cocok dengan KTP','3173051708940004 muncul sebagai anggota ketiga dengan hubungan "anak".'],
    ['ai','2 tanggungan terdeteksi','Dua anak tercatat dalam kartu; dipakai untuk perhitungan kemampuan bayar.'],
    ['warn','Satu NIK anggota terbaca sebagian','NIK anggota keempat perlu dikonfirmasi karena lipatan kertas.'],
    ['ok','Alamat konsisten antar dokumen','Alamat KK identik dengan KTP dan bukti domisili yang diunggah.'],
    ['ok','Tidak ada anggota tercatat ganda','Tidak ada NIK yang muncul di Kartu Keluarga lain dalam basis data internal.']
  ]
},
{
  id:'bank', name:'Rekening Koran', code:'FIN-STMT', icon:I.bank, shape:'a4',
  desc:'Mutasi rekening multi-halaman. Ringkasan arus kas dan deteksi penghasilan.',
  fileName:'rekening_koran_jan-mar.pdf · 3,6 MB', subject:'BCA ****7734',
  tip:'Unggah PDF asli dari layanan perbankan, bukan hasil pindaian cetakan, agar tabel terbaca utuh.',
  verdict:['Mutasi terbaca — ada anomali','148 transaksi terekstraksi. Sistem menemukan pola setoran melingkar yang perlu ditinjau.'],
  conf:95.4, risk:64,
  fields:[
    f('Nama pemilik rekening','RAKA PRATAMA',98.7),
    f('Nomor rekening','**** **** 7734',98.2,{mono:1}),
    f('Bank penerbit','PT BANK CENTRAL ASIA TBK',99.0),
    f('Periode','01-01-2026 s.d. 31-03-2026',98.4,{mono:1}),
    f('Saldo awal','Rp 42.118.400',97.8,{mono:1}),
    f('Total kredit','Rp 214.560.000',96.1,{mono:1}),
    f('Total debit','Rp 197.842.150',95.7,{mono:1}),
    f('Saldo akhir','Rp 58.836.250',97.4,{mono:1}),
    f('Rata-rata saldo harian','Rp 46.209.800',93.2,{mono:1}),
    f('Transaksi terbaca','148 dari 148 baris',96.8,{mono:1}),
    f('Indikasi penghasilan rutin','Rp 24.500.000 / bulan — 3 kali berurutan',94.0,{mono:1}),
    f('Halaman terbaca','12 dari 12',88.3,{note:'Halaman 7 dan 9 sedikit miring sehingga dua baris dibaca ulang manual.'})
  ],
  ai:[
    ['Ekstraksi tabel multi-halaman','Menyatukan tabel yang terpotong antar halaman menjadi satu daftar transaksi yang utuh.',1],
    ['Deteksi penghasilan rutin','Mengenali setoran berulang bernilai mirip pada tanggal yang serupa sebagai indikasi gaji.',1],
    ['Ringkasan arus kas &amp; kemampuan bayar','Menghitung arus masuk bersih, rata-rata saldo, dan rasio cicilan terhadap penghasilan.',1],
    ['Deteksi setoran melingkar','Menandai dana yang masuk lalu keluar dalam waktu singkat ke pihak yang sama.',1],
    ['Deteksi PDF yang disunting','Memeriksa metadata, lapisan teks, dan jejak penyuntingan pada berkas rekening koran.',1],
    ['Kategorisasi transaksi','Mengelompokkan transaksi menjadi gaji, cicilan, tagihan, dan transfer pribadi.',1]
  ],
  findings:[
    ['ai','Penghasilan rutin Rp 24,5 juta/bulan','Tiga setoran berurutan dari sumber yang sama pada tanggal 25 setiap bulan.'],
    ['bad','Pola setoran melingkar terdeteksi','Rp 85 juta masuk 12 Feb dan keluar ke pihak yang sama dalam 26 jam. Perlu ditinjau petugas.'],
    ['warn','Rasio cicilan 41% dari penghasilan','Di atas ambang internal 35%. Pengajuan diberi tanda untuk keputusan manual.'],
    ['ok','Berkas tidak menunjukkan penyuntingan','Metadata PDF asli dari penerbit, tidak ada lapisan teks yang ditimpa.'],
    ['ok','Seluruh 148 baris terbaca','Tidak ada transaksi yang terlewat antar halaman.']
  ]
},
{
  id:'akta', name:'Akta Pendirian', code:'CORP-DEED', icon:I.deed, shape:'a4',
  desc:'Akta pendirian dan perubahan PT. Struktur pemegang saham serta kewenangan direksi.',
  fileName:'akta_pendirian_kpn.pdf · 9,4 MB', subject:'PT KARYA PRIMA NUSANTARA',
  tip:'Unggah akta lengkap beserta SK Kemenkumham dan akta perubahan terakhir.',
  verdict:['Badan hukum terverifikasi','Struktur pemegang saham dan kewenangan direksi berhasil dipetakan dari 34 halaman.'],
  conf:93.7, risk:31,
  fields:[
    f('Nama perseroan','PT KARYA PRIMA NUSANTARA',98.6),
    f('Nomor akta','42',97.4,{mono:1}),
    f('Tanggal akta','11-05-2021',97.9,{mono:1}),
    f('Notaris','SUSILAWATI DARMAWAN, S.H., M.KN.',95.2),
    f('SK Kemenkumham','AHU-0034521.AH.01.01.TAHUN 2021',94.1,{mono:1}),
    f('NPWP','02.481.773.4-017.000',96.0,{mono:1}),
    f('Domisili','JAKARTA SELATAN, DKI JAKARTA',97.1),
    f('Bidang usaha (KBLI)','62019 — AKTIVITAS PEMROGRAMAN KOMPUTER LAINNYA',92.4),
    f('Modal dasar','Rp 5.000.000.000',97.8,{mono:1}),
    f('Modal ditempatkan &amp; disetor','Rp 1.250.000.000',96.9,{mono:1}),
    f('Direktur utama','RAKA PRATAMA',97.2),
    f('Komisaris','BAMBANG PRATAMA',96.4),
    f('Pemegang saham','RAKA PRATAMA 60% · PT SENTRA MODAL 40%',91.8),
    f('Perubahan terakhir','AKTA NO. 18, 04-02-2025 — PERUBAHAN DIREKSI',86.2,{note:'Halaman perubahan terbaca dengan keyakinan rendah. Disarankan tinjau manual.'})
  ],
  ai:[
    ['Peta pemegang saham &amp; UBO','Menyusun struktur kepemilikan berlapis dan menelusuri pemilik manfaat akhir di atas ambang 25%.',1],
    ['Ringkasan maksud, tujuan, dan kewenangan','Merangkum pasal maksud-tujuan serta batas kewenangan direksi dalam bahasa sederhana.',1],
    ['Rantai perubahan akta','Mengurutkan akta pendirian dan seluruh perubahannya menjadi satu garis waktu.',1],
    ['Cek nama &amp; SK badan hukum','Mencocokkan nama perseroan dan nomor SK terhadap catatan yang dimiliki perusahaan.',1],
    ['Deteksi klausa pembatasan pinjaman','Menandai pasal yang mewajibkan persetujuan komisaris atau RUPS sebelum berutang.',1],
    ['Ekstraksi tanda tangan &amp; stempel','Menemukan posisi tanda tangan notaris dan stempel, lalu memeriksa kelengkapannya.',0]
  ],
  findings:[
    ['ai','Pemilik manfaat akhir: 2 pihak','RAKA PRATAMA 60% langsung; PT SENTRA MODAL 40% dengan pemilik akhir SENTRA HOLDINGS (72%).'],
    ['bad','Ada klausa pembatasan pinjaman','Pasal 14 ayat 3 mewajibkan persetujuan komisaris untuk utang di atas Rp 2 miliar.'],
    ['warn','Akta perubahan terbaca rendah','Halaman perubahan direksi 2025 hanya 86,2%. Disarankan unggah salinan yang lebih jelas.'],
    ['ok','Nomor SK berformat valid','AHU-0034521.AH.01.01.TAHUN 2021 sesuai pola penomoran Kemenkumham.'],
    ['ok','Modal disetor memenuhi ketentuan','Rp 1,25 miliar, yakni 25% dari modal dasar sesuai UU Perseroan Terbatas.']
  ]
},
{
  id:'other', name:'Dokumen lainnya', code:'ZERO-SHOT', icon:I.other, shape:'a4', other:true,
  desc:'Belum ada modenya? Jelaskan field yang Anda butuhkan, AI yang menyusun skemanya.',
  fileName:'surat_keterangan_kerja.pdf · 420 KB', subject:'Surat Keterangan Kerja',
  tip:'Tuliskan field yang Anda perlukan dalam bahasa sehari-hari, misalnya "nama pemberi kerja, jabatan, masa kerja".',
  verdict:['Jenis dokumen dikenali','Sistem mengenali dokumen sebagai Surat Keterangan Kerja dan menyusun skema field sendiri.'],
  conf:92.1, risk:24,
  fields:[
    f('Jenis dokumen terdeteksi','SURAT KETERANGAN KERJA — keyakinan 92%',92.0),
    f('Nama pemberi kerja','PT KARYA PRIMA NUSANTARA',96.8),
    f('Nama karyawan','RAKA PRATAMA',97.9),
    f('Jabatan','SENIOR PRODUCT ANALYST',95.1),
    f('Status kepegawaian','KARYAWAN TETAP',94.6),
    f('Mulai bekerja','02-03-2021',96.2,{mono:1}),
    f('Penghasilan tercantum','Rp 24.500.000 / bulan',93.4,{mono:1}),
    f('Nama penanda tangan','SITI RAHAYU — HEAD OF PEOPLE',92.7),
    f('Tanggal surat','09-09-2026',95.8,{mono:1}),
    f('Stempel perusahaan','TERDETEKSI — kiri bawah',88.9,{note:'Stempel tumpang tindih dengan tanda tangan sehingga keyakinan turun.'})
  ],
  ai:[
    ['Klasifikasi dokumen otomatis','Mengenali jenis dokumen dari tata letak dan isinya, lalu memilih atau membuat skema field yang sesuai.',1],
    ['Ekstraksi berbasis instruksi','Sebutkan field yang Anda butuhkan dalam bahasa sehari-hari; AI mengembalikannya sebagai JSON terstruktur.',1],
    ['Tanya-jawab dokumen','Ajukan pertanyaan bebas tentang isi dokumen dan dapatkan jawaban beserta kutipan halamannya.',1],
    ['Deteksi tanda tangan &amp; stempel','Menemukan tanda tangan dan stempel, memeriksa kelengkapannya, dan menandai halaman yang kosong.',1],
    ['Ringkasan dokumen','Merangkum isi dokumen panjang menjadi beberapa poin untuk keperluan tinjauan cepat.',1],
    ['Simpan sebagai mode baru','Simpan skema hasil ekstraksi menjadi mode khusus milik tim Anda agar bisa dipakai berulang.',0]
  ],
  findings:[
    ['ai','Jenis dokumen: Surat Keterangan Kerja','Keyakinan 92%. Alternatif terdekat: Surat Referensi Kerja (6%).'],
    ['ai','Penghasilan cocok dengan rekening koran','Rp 24.500.000 sama dengan indikasi gaji pada mutasi rekening pengaju.'],
    ['warn','Stempel tumpang tindih tanda tangan','Keyakinan pembacaan stempel turun ke 88,9%. Disarankan tinjau visual.'],
    ['ok','Tanda tangan dan stempel lengkap','Keduanya terdeteksi pada halaman terakhir di posisi yang wajar.'],
    ['ai','Skema bisa disimpan sebagai mode baru','10 field hasil ekstraksi dapat dijadikan mode "Surat Keterangan Kerja" milik tim.']
  ]
}
];
var MODE_BY_ID={}; MODES.forEach(function(m){MODE_BY_ID[m.id]=m;});
var current=MODES[0];

/* ---------- toast ---------- */
var toastEl=$('#toast'), toastT;
function toast(msg){
  toastEl.innerHTML=TICK+'<span>'+S(msg)+'</span>';
  toastEl.classList.add('on'); clearTimeout(toastT);
  toastT=setTimeout(function(){toastEl.classList.remove('on');},2600);
}

/* ---------- captcha ---------- */
var capCode='';
function makeCaptcha(){
  var chars='ABCDEFGHJKLMNPQRSTUVWXYZ23456789', out='';
  for(var i=0;i<5;i++) out+=chars[Math.floor(Math.random()*chars.length)];
  capCode=out;
  var g='';
  for(var j=0;j<5;j++){
    var x=16+j*22+(Math.random()*4-2), y=30+(Math.random()*7-3.5), r=(Math.random()*22-11);
    g+='<text x="'+x.toFixed(1)+'" y="'+y.toFixed(1)+'" transform="rotate('+r.toFixed(1)+' '+x.toFixed(1)+' '+y.toFixed(1)+')" font-family="IBM Plex Mono, monospace" font-size="21" font-weight="600" fill="var(--ink-2)" letter-spacing="1">'+out[j]+'</text>';
  }
  for(var k=0;k<3;k++){
    g+='<path d="M0 '+(8+Math.random()*28).toFixed(0)+' C 40 '+(Math.random()*44).toFixed(0)+', 90 '+(Math.random()*44).toFixed(0)+', 138 '+(8+Math.random()*28).toFixed(0)+'" stroke="var(--brand)" stroke-width="1.1" fill="none" opacity=".45"/>';
  }
  for(var d=0;d<26;d++){
    g+='<circle cx="'+(Math.random()*138).toFixed(0)+'" cy="'+(Math.random()*44).toFixed(0)+'" r="1" fill="var(--muted-2)" opacity=".5"/>';
  }
  $('#capImg').innerHTML='<svg viewBox="0 0 138 44" preserveAspectRatio="none">'+g+'</svg>';
  $('#capImg').setAttribute('aria-label','Kode verifikasi bergambar. Gunakan tombol dengar bila sulit dibaca.');
}
makeCaptcha();
$('#capRefresh').addEventListener('click',function(){makeCaptcha(); $('#captcha').value=''; toast('Kode verifikasi diganti');});
$('#capAudio').addEventListener('click',function(){toast('Kode dibacakan: '+capCode.split('').join(' '));});

/* ---------- auth flow ---------- */
function showErr(inputId,errId,msg){
  var inp=$('#'+inputId), er=$('#'+errId);
  if(msg){ inp.setAttribute('aria-invalid','true'); er.innerHTML=BANG+'<span>'+S(msg)+'</span>'; er.hidden=false; }
  else { inp.removeAttribute('aria-invalid'); er.hidden=true; er.textContent=''; }
  return !msg;
}
$('#togglePass').addEventListener('click',function(){
  var p=$('#password'), on=p.type==='password';
  p.type=on?'text':'password';
  this.setAttribute('aria-pressed',String(on));
  this.setAttribute('aria-label',on?'Sembunyikan kata sandi':'Tampilkan kata sandi');
});
$$('[data-go]').forEach(function(b){
  b.addEventListener('click',function(){
    var t=b.getAttribute('data-go');
    $('#cardLogin').hidden = t!=='login';
    $('#cardForgot').hidden = t!=='forgot';
    $('#cardOtp').hidden = t!=='otp';
    var focusMap={login:'#email',forgot:'#fEmail',otp:'#otp1'};
    var el=$(focusMap[t]); if(el) el.focus();
  });
});
$('#loginForm').addEventListener('submit',function(e){
  e.preventDefault();
  var em=$('#email').value.trim(), pw=$('#password').value, cap=$('#captcha').value.trim();
  var ok=true;
  ok = showErr('email','emailErr', !em ? 'Masukkan email kerja Anda.' : (/^[^@\s]+@[^@\s.]+\.[^@\s]+$/.test(em)?'':'Format email belum benar. Contoh: nama@perusahaan.co.id')) && ok;
  ok = showErr('password','passErr', !pw ? 'Masukkan kata sandi.' : (pw.length<10?'Kata sandi minimal 10 karakter.':'')) && ok;
  ok = showErr('captcha','capErr', !cap ? 'Ketik kode verifikasi yang tampil.' : (cap.toUpperCase()!==capCode?'Kode tidak cocok. Coba lagi atau ganti kodenya.':'')) && ok;
  if(!ok){
    if(cap && cap.toUpperCase()!==capCode) makeCaptcha();
    var first=$('[aria-invalid="true"]'); if(first) first.focus();
    return;
  }
  var btn=$('#loginSubmit'); btn.disabled=true;
  btn.innerHTML='<span class="spin"></span><span>Memverifikasi…</span>';
  setTimeout(function(){
    btn.disabled=false; btn.textContent='Masuk';
    $('#authLayer').hidden=true;
    bootSequence();
  },700);
});
function bootSequence(){
  var boot=$('#boot'), bar=$('#bootBar'), txt=$('#bootTxt');
  var msgs=['Memverifikasi kredensial…','Memuat 11 mode dokumen…','Menyiapkan model OCR v4.2.1…','Hampir siap…'];
  boot.hidden=false; bar.style.width='0%'; var i=0;
  txt.textContent=msgs[0];
  var t=setInterval(function(){
    i++; bar.style.width=Math.min(100,i*26)+'%';
    if(msgs[i]) txt.textContent=msgs[i];
    if(i>=4){
      clearInterval(t);
      setTimeout(function(){
        boot.hidden=true; $('#appLayer').hidden=false;
        measureTopbar();
        window.scrollTo(0,0); go('dashboard',true);
        toast('Selamat datang kembali, M. Alfian');
      },240);
    }
  },230);
}
$('#ssoBtn').addEventListener('click',function(){toast('Mengalihkan ke penyedia identitas perusahaan…');});
$('#forgotForm').addEventListener('submit',function(e){
  e.preventDefault();
  var em=$('#fEmail').value.trim();
  if(!showErr('fEmail','fEmailErr', !em?'Masukkan email kerja Anda.':(/^[^@\s]+@[^@\s.]+\.[^@\s]+$/.test(em)?'':'Format email belum benar.'))) { $('#fEmail').focus(); return; }
  $('#otpTarget').textContent=em;
  $('#cardForgot').hidden=true; $('#cardOtp').hidden=false; $('#otp1').focus();
  startOtpTimer();
});
var otpInputs=$$('#otpRow input');
otpInputs.forEach(function(inp,i){
  inp.addEventListener('input',function(){
    inp.value=inp.value.replace(/\D/g,'').slice(0,1);
    if(inp.value && i<otpInputs.length-1) otpInputs[i+1].focus();
  });
  inp.addEventListener('keydown',function(e){
    if(e.key==='Backspace' && !inp.value && i>0) otpInputs[i-1].focus();
  });
  inp.addEventListener('paste',function(e){
    var d=(e.clipboardData||window.clipboardData).getData('text').replace(/\D/g,'');
    if(!d) return; e.preventDefault();
    for(var k=0;k<otpInputs.length;k++) otpInputs[k].value=d[k]||'';
    otpInputs[Math.min(d.length,otpInputs.length-1)].focus();
  });
});
var otpLeft=597, otpTick;
function startOtpTimer(){
  otpLeft=597; clearInterval(otpTick);
  otpTick=setInterval(function(){
    otpLeft--; if(otpLeft<0){clearInterval(otpTick); otpLeft=0;}
    var m=Math.floor(otpLeft/60), s=otpLeft%60;
    $('#otpTimer').textContent=(m<10?'0':'')+m+':'+(s<10?'0':'')+s;
  },1000);
}
$('#otpResend').addEventListener('click',function(){startOtpTimer(); toast('Kode baru dikirim');});
$('#otpForm').addEventListener('submit',function(e){
  e.preventDefault();
  var v=otpInputs.map(function(i){return i.value;}).join('');
  if(v.length<6){ toast('Lengkapi 6 angka kodenya'); otpInputs[v.length].focus(); return; }
  toast('Kode terverifikasi — silakan buat kata sandi baru');
  setTimeout(function(){ $('#cardOtp').hidden=true; $('#cardLogin').hidden=false; $('#email').focus(); },900);
});
$$('[data-logout]').forEach(function(b){
  b.addEventListener('click',function(){
    $('#appLayer').hidden=true; $('#authLayer').hidden=false;
    $('#cardLogin').hidden=false; $('#cardForgot').hidden=true; $('#cardOtp').hidden=true;
    $('#password').value=''; $('#captcha').value=''; makeCaptcha();
    window.scrollTo(0,0);
  });
});
$$('[data-noop]').forEach(function(b){
  b.addEventListener('click',function(e){ e.preventDefault(); toast('Contoh tampilan — aksi ini belum terhubung'); });
});

/* ---------- ukur tinggi navbar untuk dashboard satu layar ---------- */
function measureTopbar(){
  var tb=document.querySelector('.topbar');
  if(tb && tb.offsetHeight) document.documentElement.style.setProperty('--topbar-h', tb.offsetHeight+'px');
}
window.addEventListener('resize',measureTopbar);
window.addEventListener('load',measureTopbar);
setTimeout(measureTopbar,0);

/* ---------- popover navbar ---------- */
var POPS=[['notifBtn','notifPop'],['profileBtn','profilePop']];
function closePops(except){
  POPS.forEach(function(p){
    if(p[1]===except) return;
    $('#'+p[1]).hidden=true; $('#'+p[0]).setAttribute('aria-expanded','false');
  });
}
POPS.forEach(function(p){
  var btn=$('#'+p[0]), pop=$('#'+p[1]);
  btn.addEventListener('click',function(e){
    e.stopPropagation();
    var open=pop.hidden;
    closePops(open?p[1]:null);
    pop.hidden=!open; btn.setAttribute('aria-expanded',String(open));
  });
  pop.addEventListener('click',function(e){ e.stopPropagation(); });
});
document.addEventListener('click',function(){ closePops(); });
document.addEventListener('keydown',function(e){ if(e.key==='Escape') closePops(); });

/* ---------- pager helper ---------- */
var ARR_L='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 6-6 6 6 6"/></svg>';
var ARR_R='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>';
function pagerHTML(page,pages,key,label){
  var h='<span class="pager-info">'+label+'</span>';
  h+='<button class="pager-num" data-'+key+'="prev" aria-label="Halaman sebelumnya"'+(page===0?' disabled':'')+'>'+ARR_L+'</button>';
  var seq=[];
  if(pages<=6){ for(var i=0;i<pages;i++) seq.push(i); }
  else if(page<3){ seq=[0,1,2,3,'gap',pages-1]; }
  else if(page>pages-4){ seq=[0,'gap',pages-4,pages-3,pages-2,pages-1]; }
  else { seq=[0,'gap',page-1,page,page+1,'gap',pages-1]; }
  seq.forEach(function(v){
    if(v==='gap'){ h+='<span class="pager-gap">…</span>'; return; }
    h+='<button class="pager-num" data-'+key+'="'+v+'"'+(v===page?' aria-current="page"':'')+'>'+(v+1)+'</button>';
  });
  h+='<button class="pager-num" data-'+key+'="next" aria-label="Halaman berikutnya"'+(page>=pages-1?' disabled':'')+'>'+ARR_R+'</button>';
  return h;
}
function pagerClick(e,key,get,set,render){
  var b=e.target.closest('[data-'+key+']'); if(!b || b.disabled) return;
  var v=b.getAttribute('data-'+key);
  if(v==='prev') set(get()-1); else if(v==='next') set(get()+1); else set(+v);
  render();
}

/* ---------- notifikasi ---------- */
var NOTIF=[
  {kind:'bad', unread:true, tag:'ALERT', title:'Indikasi pemalsuan pada BPKB',
   sum:'bpkb_palsu_uji.pdf ditahan sistem. Skor risiko 88.', time:'5 menit yang lalu',
   mode:'bpkb', doc:'bpkb_palsu_uji.pdf',
   body:'Sistem menahan satu dokumen karena unsur pengaman halaman tidak lolos pemeriksaan. Pola hologram tidak sesuai spesimen Korlantas dan nomor rangka menunjukkan jejak penyuntingan digital. Dokumen tidak diteruskan ke core system dan menunggu keputusan petugas.',
   facts:[['Berkas','bpkb_palsu_uji.pdf'],['Skor risiko','88 — tinggi'],['Keyakinan OCR','71,2%'],['Diproses','17 Sep 2026 · 09:36']]},
  {kind:'warn', unread:true, tag:'NEW', title:'3 dokumen menunggu tinjauan Anda',
   sum:'Rekening koran, sertifikat tanah, dan surat keterangan kerja.', time:'15 menit yang lalu',
   mode:'bank', doc:'rekening_koran_jan-mar.pdf',
   body:'Tiga dokumen melewati ambang keyakinan namun memicu aturan validasi internal, sehingga perlu keputusan manual. Paling mendesak adalah rekening koran dengan pola setoran melingkar sebesar Rp 85 juta.',
   facts:[['Antrean tinjau','3 dokumen'],['Paling lama menunggu','41 menit'],['Pemicu terbanyak','Rasio cicilan > 35%'],['Ditugaskan ke','M. Alfian']]},
  {kind:'ok', unread:true, tag:'NEW', title:'Batch #B-260917-10 selesai',
   sum:'38 berkas diproses, 2 perlu tinjau.', time:'1 jam yang lalu',
   mode:'ktp', doc:'batch #B-260917-10',
   body:'Batch selesai dalam 1 menit 12 detik dengan keyakinan rata-rata 97,4%. Dua berkas masuk antrean tinjau karena nomor identitas terbaca sebagian.',
   facts:[['Total berkas','38'],['Selesai','36'],['Perlu tinjau','2'],['Durasi','1m 12s']]},
  {kind:'ai', unread:true, tag:'NEW', title:'Model OCR v4.2.1 aktif',
   sum:'Akurasi tabel rekening koran naik 1,8 poin.', time:'3 jam yang lalu',
   mode:'other', doc:'catatan rilis v4.2.1',
   body:'Pembaruan model diterapkan tanpa waktu henti. Peningkatan terbesar pada pembacaan tabel multi-halaman dan tulisan tangan pada akta. Tidak ada perubahan pada skema field, integrasi Anda tidak perlu disesuaikan.',
   facts:[['Versi','v4.2.1'],['Tabel rekening koran','96,2% (+1,8)'],['Tulisan tangan akta','88,4% (+3,1)'],['Diterapkan','16 Sep 2026 · 22:05']]},
  {kind:'ok', unread:true, tag:'NEW', title:'Webhook core system pulih',
   sum:'14 payload tertunda sudah dikirim ulang.', time:'4 jam yang lalu',
   mode:'other', doc:'log integrasi',
   body:'Endpoint core system sempat menolak koneksi selama 6 menit. Seluruh payload yang tertunda dikirim ulang otomatis dan semuanya mendapat respons 200 OK. Tidak ada data yang hilang.',
   facts:[['Gangguan','6 menit'],['Payload dikirim ulang','14'],['Gagal permanen','0'],['Pulih','16 Sep 2026 · 19:41']]},
  {kind:'warn', unread:false, tag:null, title:'Kuota halaman terpakai 68%',
   sum:'13.640 dari 20.000 halaman bulan ini.', time:'1 hari yang lalu',
   mode:'other', doc:'kuota langganan',
   body:'Pemakaian bulan ini sudah melewati dua pertiga kuota, sementara masih ada 13 hari tersisa. Dengan laju saat ini kuota diperkirakan habis tiga hari sebelum periode berakhir.',
   facts:[['Terpakai','13.640 halaman'],['Kuota','20.000 halaman'],['Perkiraan habis','27 Sep 2026'],['Rata-rata harian','455 halaman']]},
  {kind:'warn', unread:false, tag:null, title:'Sertifikat tanah dengan hak tanggungan',
   sum:'SHM No. 04127 terikat Bank Pelita sejak 2023.', time:'1 hari yang lalu',
   mode:'tanah', doc:'shm_04127_bangka.pdf',
   body:'Halaman perubahan pada sertifikat memuat catatan hak tanggungan peringkat I yang masih aktif. Pengajuan agunan tidak dapat dilanjutkan otomatis dan perlu keputusan bagian legal.',
   facts:[['Nomor hak','SHM 04127'],['Pemegang','RAKA PRATAMA'],['Pembebanan','Peringkat I · 2023'],['Skor risiko','58 — menengah']]},
  {kind:'ok', unread:false, tag:null, title:'Ekspor CSV riwayat selesai',
   sum:'1.284 baris riwayat 30 hari siap diunduh.', time:'2 hari yang lalu',
   mode:'other', doc:'riwayat-validasi-30hari.csv',
   body:'Permintaan ekspor riwayat validasi selesai diproses. Tautan unduhan berlaku 24 jam dan hanya dapat dibuka oleh akun yang memintanya.',
   facts:[['Baris','1.284'],['Periode','18 Ags – 17 Sep 2026'],['Ukuran','412 KB'],['Berlaku hingga','18 Sep 2026 · 08:00']]},
  {kind:'ai', unread:false, tag:null, title:'Mode baru tersimpan oleh tim',
   sum:'Skema "Surat Keterangan Kerja" kini tersedia.', time:'2 hari yang lalu',
   mode:'other', doc:'mode Surat Keterangan Kerja',
   body:'Hasil ekstraksi zero-shot disimpan menjadi mode khusus milik tim Anda. Sepuluh field beserta aturan validasinya sekarang bisa dipakai berulang tanpa menjelaskan ulang skemanya.',
   facts:[['Field tersimpan','10'],['Dibuat oleh','M. Alfian'],['Dipakai','24 dokumen'],['Keyakinan rata-rata','92,1%']]},
  {kind:'ok', unread:false, tag:null, title:'Pemeliharaan terjadwal 21 September',
   sum:'Minggu, 02:00–04:00 WIB. Layanan tetap berjalan.', time:'3 hari yang lalu',
   mode:'other', doc:'jadwal pemeliharaan',
   body:'Pemeliharaan basis data dilakukan pada jam sepi dengan mode baca-tulis terbatas. Unggahan baru tetap diterima dan diproses setelah jendela pemeliharaan selesai.',
   facts:[['Tanggal','21 Sep 2026'],['Jendela','02:00–04:00 WIB'],['Dampak','Antrean tertunda'],['Status','Terjadwal']]}
];
var NIC={ok:['f-ok',TICK],warn:['f-warn',BANG],bad:['f-bad',CROSS],ai:['f-ai',SPARK]};
function tagHTML(n){
  if(!n.tag) return '';
  return '<span class="np-tag '+(n.tag==='ALERT'?'np-alert':'np-new')+'">'+n.tag+'</span>';
}
function renderNotifBell(){
  $('#notifList').innerHTML=NOTIF.slice(0,5).map(function(n,i){
    var t=NIC[n.kind];
    return '<button class="n-item'+(n.unread?' unread':'')+'" data-notif="'+i+'">'+
      '<span class="n-ico '+t[0]+'">'+t[1]+'</span>'+
      '<span style="min-width:0"><b>'+S(n.title)+'</b><p>'+S(n.sum)+'</p>'+
        '<span class="n-meta">'+(n.unread?'<span class="n-dot"></span>':'')+'<time>'+S(n.time)+'</time>'+
        '<span style="font-size:10.5px;font-weight:700;color:var(--brand)">Lihat detail</span></span>'+
      '</span></button>';
  }).join('');
  var un=NOTIF.filter(function(n){return n.unread;}).length;
  var b=$('#notifBadge'); b.textContent=String(un); b.hidden=un===0;
}
renderNotifBell();

var npFilter='all', npPage=0, NP_PER=6;
function npRows(){
  return NOTIF.filter(function(n){
    if(npFilter==='unread') return n.unread;
    if(npFilter==='read') return !n.unread;
    return true;
  });
}
function renderNotifPage(){
  var un=NOTIF.filter(function(n){return n.unread;}).length;
  $$('#npFilters .chip').forEach(function(c){
    var f=c.getAttribute('data-nfilter');
    c.setAttribute('aria-pressed',String(f===npFilter));
    c.textContent = f==='all' ? 'Semua ('+NOTIF.length+')'
      : f==='unread' ? 'Belum Dibaca ('+un+')' : 'Sudah Dibaca ('+(NOTIF.length-un)+')';
  });
  var rows=npRows(), pages=Math.max(1,Math.ceil(rows.length/NP_PER));
  npPage=Math.max(0,Math.min(npPage,pages-1));
  var from=npPage*NP_PER, slice=rows.slice(from,from+NP_PER);
  $('#npList').innerHTML = slice.length ? slice.map(function(n){
    var i=NOTIF.indexOf(n);
    return '<button class="np-item'+(n.unread?' unread':'')+(n.tag==='ALERT'?' np-alert':'')+'" data-np="'+i+'">'+
      '<span class="np-mark"></span>'+
      '<span style="min-width:0">'+
        '<span class="np-top"><b>'+S(n.title)+'</b>'+tagHTML(n)+'</span>'+
        '<p>'+S(n.body.slice(0,120))+(n.body.length>120?'…':'')+'</p>'+
        '<time>'+S(n.time)+'</time>'+
      '</span></button>';
  }).join('') : '<div class="empty">Tidak ada notifikasi pada filter ini.</div>';
  $('#npFoot').innerHTML=pagerHTML(npPage,pages,'nppage','Halaman '+(npPage+1)+' dari '+pages+' · '+rows.length+' notifikasi');
  $('#npReadAll').hidden = un===0;
}
$('#npFilters').addEventListener('click',function(e){
  var c=e.target.closest('[data-nfilter]'); if(!c) return;
  npFilter=c.getAttribute('data-nfilter'); npPage=0; renderNotifPage();
});
$('#npFoot').addEventListener('click',function(e){
  pagerClick(e,'nppage',function(){return npPage;},function(v){npPage=v;},renderNotifPage);
});
$('#npReadAll').addEventListener('click',function(){
  NOTIF.forEach(function(n){n.unread=false;});
  renderNotifBell(); renderNotifPage(); toast('Semua notifikasi ditandai dibaca');
});

var ndIdx=null;
function showNotifList(){
  $('#npDetail').hidden=true; $('#npListWrap').hidden=false; renderNotifPage();
}
function openNotif(i){
  var n=NOTIF[i]; ndIdx=i;
  var t=NIC[n.kind];
  closePops();
  go('profile'); setPtab('notification');
  $('#ndIco').className='nd-ico '+t[0]; $('#ndIco').innerHTML=t[1];
  $('#ndTitle').textContent=n.title;
  $('#ndMeta').textContent=n.time+' · '+n.doc+(n.tag?' · '+n.tag:'');
  $('#ndBody').textContent=n.body;
  $('#ndFacts').innerHTML=n.facts.map(function(f){
    return '<div class="dcell"><span class="led-key">'+S(f[0])+'</span><span class="dv mono">'+S(f[1])+'</span></div>';
  }).join('');
  $('#ndDismiss').hidden=!n.unread;
  $('#npListWrap').hidden=true; $('#npDetail').hidden=false;
  $('#npDetail').classList.remove('rise'); void $('#npDetail').offsetWidth; $('#npDetail').classList.add('rise');
}
$('#notifList').addEventListener('click',function(e){
  var it=e.target.closest('[data-notif]'); if(!it) return;
  openNotif(+it.getAttribute('data-notif'));
});
$('#npList').addEventListener('click',function(e){
  var it=e.target.closest('[data-np]'); if(!it) return;
  openNotif(+it.getAttribute('data-np'));
});
$('#ndBack').addEventListener('click',showNotifList);
$('#ndDismiss').addEventListener('click',function(){
  if(ndIdx!==null){ NOTIF[ndIdx].unread=false; renderNotifBell(); }
  $('#ndDismiss').hidden=true; renderNotifPage(); toast('Notifikasi ditandai sudah dibaca');
});
$('#ndOpen').addEventListener('click',function(){
  var n=NOTIF[ndIdx];
  if(n.unread){ n.unread=false; renderNotifBell(); }
  setMode(n.mode); renderResult(); gotoStep(3); go('scan');
  toast('Membuka '+n.doc);
});
$('#notifReadAll').addEventListener('click',function(){
  NOTIF.forEach(function(n){n.unread=false;}); renderNotifBell(); renderNotifPage(); toast('Semua notifikasi ditandai dibaca');
});
$('#notifAll').addEventListener('click',function(){
  closePops(); go('profile'); setPtab('notification'); showNotifList();
});

/* ---------- tab profil ---------- */
var PTABS={
  profile:['Profil Saya','Kelola informasi akun dan foto profil Anda'],
  security:['Profil Saya','Atur kata sandi dan tinjau riwayat masuk'],
  notification:['Notifikasi','Kelola dan tinjau semua aktivitas sistem']
};
var curPtab='profile';
function setPtab(tab){
  curPtab=tab;
  $$('#profTabs .seg').forEach(function(s){ s.setAttribute('aria-pressed',String(s.getAttribute('data-ptab')===tab)); });
  $('#ptab-profile').hidden = tab!=='profile';
  $('#ptab-security').hidden = tab!=='security';
  $('#ptab-notification').hidden = tab!=='notification';
  var t=PTABS[tab]||PTABS.profile;
  $('#profTitle').textContent=t[0]; $('#profSub').textContent=t[1];
  $('#ctxTitle').textContent=t[0];
  if(tab==='notification') renderNotifPage();
}
$('#profTabs').addEventListener('click',function(e){
  var s=e.target.closest('[data-ptab]'); if(!s) return;
  if(s.getAttribute('data-ptab')==='notification') showNotifList();
  setPtab(s.getAttribute('data-ptab'));
});
$$('[data-pw-toggle]').forEach(function(b){
  b.addEventListener('click',function(){
    var inp=$('#'+b.getAttribute('data-pw-toggle'));
    var on=inp.type==='password';
    inp.type=on?'text':'password';
    b.setAttribute('aria-pressed',String(on));
  });
});
$('#uploadPhoto').addEventListener('click',function(){ toast('Pilih foto profil dari perangkat Anda'); });
$('#avCam').addEventListener('click',function(){ toast('Pilih foto profil dari perangkat Anda'); });
$('#saveProfile').addEventListener('click',function(){
  var btn=this; btn.disabled=true; btn.innerHTML='<span class="spin"></span><span>Menyimpan…</span>';
  setTimeout(function(){
    btn.disabled=false; btn.textContent='Simpan Perubahan';
    toast('Informasi pribadi tersimpan');
  },700);
});
$('#savePw').addEventListener('click',function(){
  var nw=$('#pwNew').value, re=$('#pwRe').value, er=$('#pwErr');
  var msg='';
  if(nw.length<8) msg='Password baru minimal 8 karakter.';
  else if(!/[A-Z]/.test(nw) || !/[0-9]/.test(nw) || !/[^A-Za-z0-9]/.test(nw)) msg='Sertakan huruf besar, angka, dan simbol.';
  else if(nw!==re) msg='Konfirmasi password belum sama.';
  if(msg){
    er.innerHTML=BANG+'<span>'+S(msg)+'</span>'; er.hidden=false;
    $('#pwRe').setAttribute('aria-invalid','true'); $('#pwNew').focus(); return;
  }
  er.hidden=true; $('#pwRe').removeAttribute('aria-invalid');
  var btn=this; btn.disabled=true; btn.innerHTML='<span class="spin"></span><span>Menyimpan…</span>';
  setTimeout(function(){
    btn.disabled=false; btn.textContent='Simpan Perubahan';
    $('#pwNew').value=''; $('#pwRe').value='';
    toast('Password berhasil diperbarui');
  },800);
});
$('#miProfile').addEventListener('click',function(){
  closePops(); go('profile'); setPtab('profile');
});

/* ---------- navigation ---------- */
var TITLES={
  dashboard:['','Dashboard'],
  modes:['Pilih mode','Mode dokumen'],
  scan:['Mode aktif','Pindai dokumen'],
  batch:['Antrean batch aktif','Unggah massal'],
  history:['90 hari terakhir','Riwayat validasi'],
  profile:['','Profil Saya'],
  rules:['Pengaturan','Aturan validasi'],
  api:['Pengaturan','Integrasi & API']
};
/* skeleton per halaman */
function skLine(w,h){return '<div class="sk sk-line" style="width:'+w+';height:'+(h||11)+'px"></div>';}
var SKEL={
  dashboard:'<div class="sk-head">'+skLine('240px',22)+skLine('380px')+'</div>'+
    '<div class="grid g-4" style="margin-bottom:16px">'+
    [0,1,2,3].map(function(){return '<div class="sk-card"><div class="sk-row">'+skLine('90px',10)+'<div class="sk sk-dot" style="margin-left:auto"></div></div>'+skLine('110px',24)+skLine('140px',9)+'</div>';}).join('')+'</div>'+
    '<div class="split"><div class="sk-card">'+skLine('200px',14)+skLine('300px',9)+'<div class="sk sk-chart"></div></div>'+
    '<div class="sk-card">'+skLine('180px',14)+[0,1,2,3,4].map(function(){return '<div>'+skLine('100%',9)+'</div>';}).join('')+'</div></div>',
  history:'<div class="sk-head">'+skLine('220px',22)+skLine('420px')+'</div>'+
    '<div class="sk-card">'+'<div class="sk-row">'+skLine('80px',26)+skLine('110px',26)+skLine('110px',26)+'</div>'+
    [0,1,2,3,4,5,6].map(function(){return '<div class="sk-row"><div class="sk sk-dot"></div>'+skLine('30%',10)+skLine('16%',10)+skLine('12%',10)+skLine('14%',10)+'</div>';}).join('')+'</div>',
  batch:'<div class="sk-head">'+skLine('210px',22)+skLine('400px')+'</div>'+
    '<div class="sk-card">'+[0,1,2,3,4,5].map(function(){return '<div class="sk-row"><div class="sk sk-dot"></div>'+skLine('26%',10)+skLine('30%',7)+skLine('70px',18)+'</div>';}).join('')+'</div>',
  modes:'<div class="sk-head">'+skLine('230px',22)+skLine('430px')+'</div>'+
    '<div class="mode-grid">'+[0,1,2,3,4,5,6,7,8].map(function(){return '<div class="sk-card"><div class="sk-row"><div class="sk sk-dot" style="width:38px;height:38px;border-radius:10px"></div><div style="flex:1">'+skLine('70%',11)+'</div></div>'+skLine('100%',9)+skLine('60%',9)+'</div>';}).join('')+'</div>',
  scan:'',
  rules:'<div class="sk-head">'+skLine('210px',22)+skLine('460px')+'</div>'+
    '<div class="grid g-4" style="margin-bottom:16px">'+[0,1,2,3].map(function(){return '<div class="sk-card">'+skLine('90px',10)+skLine('70px',24)+skLine('130px',9)+'</div>';}).join('')+'</div>'+
    '<div class="rl-top"><div class="sk-card">'+skLine('200px',14)+'<div class="sk" style="height:34px;border-radius:10px"></div>'+
      '<div class="sk-row">'+skLine('48%',30)+skLine('48%',30)+'</div><div class="sk-row">'+skLine('48%',30)+skLine('48%',30)+'</div></div>'+
    '<div class="sk-card">'+skLine('160px',14)+skLine('100%',38)+'<div class="sk" style="height:120px;border-radius:12px"></div></div></div>'+
    '<div class="sk-card">'+[0,1,2,3].map(function(){return '<div class="sk-row"><div class="sk" style="width:34px;height:20px;border-radius:99px"></div><div style="flex:1;display:flex;flex-direction:column;gap:7px">'+skLine('38%',11)+skLine('62%',9)+skLine('44%',20)+'</div>'+skLine('90px',18)+'</div>';}).join('')+'</div>',
  api:'<div class="sk-head">'+skLine('200px',22)+skLine('420px')+'</div>'+
    '<div class="grid g-4" style="margin-bottom:16px">'+[0,1,2,3].map(function(){return '<div class="sk-card">'+skLine('100px',10)+skLine('90px',24)+skLine('140px',9)+'</div>';}).join('')+'</div>'+
    '<div style="margin-bottom:16px">'+skLine('380px',40)+'</div>'+
    '<div class="ap-grid"><div class="sk-card">'+skLine('120px',14)+[0,1,2,3].map(function(){return '<div class="sk-row">'+skLine('18%',10)+skLine('30%',20)+skLine('20%',10)+skLine('12%',18)+'</div>';}).join('')+'</div>'+
    '<div class="sk-card">'+skLine('110px',14)+skLine('100%',38)+'<div class="sk" style="height:110px;border-radius:10px"></div><div class="sk" style="height:130px;border-radius:10px"></div></div></div>',
  profile:'<div class="sk-head">'+skLine('200px',22)+skLine('330px')+'</div>'+
    '<div class="prof-grid"><div class="sk-card">'+skLine('140px',14)+
      '<div style="display:flex;justify-content:center;padding:14px 0"><div class="sk" style="width:118px;height:118px;border-radius:50%"></div></div>'+
      skLine('100%',9)+skLine('80%',9)+'</div>'+
    '<div class="sk-card">'+skLine('170px',14)+
      '<div class="sk-row">'+skLine('48%',40)+skLine('48%',40)+'</div>'+skLine('100%',40)+skLine('100%',74)+'</div></div>'
};
var LOAD_MS={dashboard:820,history:640,batch:560,modes:420,scan:0,profile:520,rules:620,api:680};
var routeT;
function routeProgress(ms,done){
  var bar=$('#routeBar'), fill=$('#routeBar i');
  clearTimeout(routeT);
  bar.classList.add('on'); fill.style.transition='none'; fill.style.width='0%';
  requestAnimationFrame(function(){
    fill.style.transition='width .35s cubic-bezier(.4,0,.2,1)';
    fill.style.width='72%';
    setTimeout(function(){
      fill.style.width='100%';
      routeT=setTimeout(function(){ bar.classList.remove('on'); if(done) done(); },220);
    }, Math.max(120,ms-220));
  });
}
function applyView(view){
  measureTopbar();
  $$('.view').forEach(function(v){ v.hidden = v.id!=='view-'+view; });
  var el=$('#view-'+view);
  if(el){ el.classList.remove('rise'); void el.offsetWidth; el.classList.add('rise'); }
  if(view==='dashboard') setTimeout(function(){ fitAct(); drawVolChart(); },0);
  var t=TITLES[view]||TITLES.dashboard;
  var eb = view==='scan' ? 'Sesi #WS-PKP-0917-082 · '+current.code : t[0];
  $('#ctxEyebrow').textContent=eb; $('#ctxEyebrow').hidden=!eb;
  $('#ctxTitle').textContent = view==='scan' ? current.name : t[1];
  if(view==='profile'){ $('#ctxTitle').textContent=(PTABS[curPtab]||PTABS.profile)[0]; }
  measureTopbar();
  window.scrollTo(0,0);
}
var navBusy=false;
function go(view,instant){
  $$('.nav-item[data-view]').forEach(function(n){
    if(n.getAttribute('data-view')===view) n.setAttribute('aria-current','page'); else n.removeAttribute('aria-current');
  });
  var ms=LOAD_MS[view]||0;
  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(!ms || reduce || instant){ $('#pageSkel').hidden=true; applyView(view); return; }
  if(navBusy) return;
  navBusy=true;
  $$('.view').forEach(function(v){ v.hidden=true; });
  var sk=$('#pageSkel');
  sk.innerHTML=SKEL[view]||SKEL.dashboard; sk.hidden=false;
  window.scrollTo(0,0);
  routeProgress(ms,function(){
    sk.hidden=true; sk.innerHTML='';
    applyView(view); navBusy=false;
  });
}
$$('[data-view]').forEach(function(b){
  b.addEventListener('click',function(){ go(b.getAttribute('data-view')); });
});

/* ---------- dashboard: chart + bars + activity ---------- */
/* ---------- chart volume harian (kolom bertumpuk, digambar 1:1 piksel) ---------- */
var VOL={
  days:['4','5','6','7','8','9','10','11','12','13','14','15','16','17'],
  valid:[412,468,455,501,489,530,388,342,516,548,562,571,529,604],
  review:[9,14,11,17,12,21,7,6,15,19,23,18,14,22]
};
var VG=null;
function drawVolChart(){
  var host=$('#volChart'); if(!host) return;
  var W=host.clientWidth, H=host.clientHeight;
  if(W<80 || H<60) return;
  var L=40, R=18, T=20, B=22;
  var iw=W-L-R, ih=H-T-B;
  var yMax=700, n=VOL.valid.length;
  var y=function(v){ return T+ih-(v/yMax)*ih; };
  var x=function(i){ return L+(iw/(n-1))*i; };
  var g='';

  /* grid + label sumbu */
  [0,200,400,600].forEach(function(v){
    g+='<line x1="'+L+'" y1="'+y(v).toFixed(1)+'" x2="'+(W-R)+'" y2="'+y(v).toFixed(1)+
       '" stroke="var(--line)" stroke-width="1" shape-rendering="crispEdges"/>';
    g+='<text x="'+(L-10)+'" y="'+(y(v)+3.5).toFixed(1)+'" text-anchor="end" font-size="10" '+
       'font-family="IBM Plex Mono, monospace" fill="var(--muted-2)">'+v+'</text>';
  });
  g+='<line x1="'+L+'" y1="'+y(0).toFixed(1)+'" x2="'+(W-R)+'" y2="'+y(0).toFixed(1)+
     '" stroke="var(--line-2)" stroke-width="1" shape-rendering="crispEdges"/>';

  /* jalur */
  var xs=[], yValid=[], yTotal=[];
  for(var i=0;i<n;i++){ xs.push(x(i)); yValid.push(y(VOL.valid[i])); yTotal.push(y(VOL.valid[i]+VOL.review[i])); }
  function line(arr){ return arr.map(function(v,i){ return (i?'L':'M')+xs[i].toFixed(1)+' '+v.toFixed(1); }).join(' '); }
  var down=''; for(var k=n-1;k>=0;k--) down+='L'+xs[k].toFixed(1)+' '+yValid[k].toFixed(1)+' ';

  /* pita oranye: porsi perlu tinjau, ditumpuk di atas garis tervalidasi */
  g+='<path d="'+line(yTotal)+' '+down+'Z" fill="var(--warn)" opacity=".9"/>';
  /* area biru: tervalidasi */
  g+='<path d="'+line(yValid)+' L'+xs[n-1].toFixed(1)+' '+y(0).toFixed(1)+' L'+xs[0].toFixed(1)+' '+y(0).toFixed(1)+
     ' Z" fill="var(--brand)" opacity=".13"/>';
  g+='<path d="'+line(yValid)+'" fill="none" stroke="var(--brand)" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>';

  /* titik & label hari terakhir */
  var li=n-1, total=VOL.valid[li]+VOL.review[li];
  g+='<circle cx="'+xs[li].toFixed(1)+'" cy="'+yValid[li].toFixed(1)+'" r="4" fill="var(--brand)" stroke="var(--card)" stroke-width="2"/>';
  g+='<text x="'+(W-R)+'" y="'+(yTotal[li]-9).toFixed(1)+'" text-anchor="end" font-size="10.5" font-weight="700" '+
     'font-family="IBM Plex Mono, monospace" fill="var(--brand)">'+total+'</text>';

  /* label tanggal */
  var slot=iw/(n-1);
  var every = slot<30 ? 3 : (slot<46 ? 2 : 1);
  VOL.days.forEach(function(d,i){
    var last=i===li;
    if(i%every!==0 && !last) return;
    if(!last && i>=li-Math.floor(every/2)) return;
    g+='<text x="'+(last?W:(i===0?L-4:xs[i].toFixed(1)))+'" y="'+(H-6)+'" text-anchor="'+(last?'end':(i===0?'start':'middle'))+
       '" font-size="10" font-family="IBM Plex Mono, monospace" fill="var(--muted-2)">'+d+(last?' Sep':'')+'</text>';
  });

  /* pemandu hover */
  g+='<line id="vcGuide" x1="0" y1="'+T+'" x2="0" y2="'+y(0).toFixed(1)+'" stroke="var(--brand)" stroke-width="1" '+
     'stroke-dasharray="3 3" opacity="0"/>';
  g+='<circle id="vcDot" cx="0" cy="0" r="4.5" fill="var(--brand)" stroke="var(--card)" stroke-width="2" opacity="0"/>';
  g+='<circle id="vcDot2" cx="0" cy="0" r="3.5" fill="var(--warn)" stroke="var(--card)" stroke-width="2" opacity="0"/>';

  /* area hover per hari */
  for(var h2=0;h2<n;h2++){
    var left = h2===0 ? L : (xs[h2]+xs[h2-1])/2;
    var right = h2===n-1 ? (W-R) : (xs[h2]+xs[h2+1])/2;
    g+='<rect class="vc-hit" data-hit="'+h2+'" x="'+left.toFixed(1)+'" y="'+T+'" width="'+(right-left).toFixed(1)+
       '" height="'+ih.toFixed(1)+'"/>';
  }

  host.innerHTML='<svg width="'+W+'" height="'+H+'" viewBox="0 0 '+W+' '+H+'" role="img" '+
    'aria-label="Grafik area volume pemrosesan 14 hari. Tertinggi 626 dokumen pada 17 September, terdiri dari 604 tervalidasi dan 22 perlu tinjau.">'+g+'</svg>';
  VG={xs:xs, yValid:yValid, yTotal:yTotal};
}
(function volInteractions(){
  var host=$('#volChart'), tip=$('#volTip'), wrap=host.parentNode;
  function hideHover(){
    tip.classList.remove('on');
    ['vcGuide','vcDot','vcDot2'].forEach(function(id){ var e=$('#'+id); if(e) e.setAttribute('opacity','0'); });
  }
  host.addEventListener('mousemove',function(e){
    var h=e.target.closest('[data-hit]'); if(!h || !VG) return;
    var i=+h.getAttribute('data-hit');
    var gl=$('#vcGuide'), d1=$('#vcDot'), d2=$('#vcDot2');
    if(gl){ gl.setAttribute('x1',VG.xs[i]); gl.setAttribute('x2',VG.xs[i]); gl.setAttribute('opacity','.45'); }
    if(d1){ d1.setAttribute('cx',VG.xs[i]); d1.setAttribute('cy',VG.yValid[i]); d1.setAttribute('opacity','1'); }
    if(d2){ d2.setAttribute('cx',VG.xs[i]); d2.setAttribute('cy',VG.yTotal[i]); d2.setAttribute('opacity','1'); }
    var total=VOL.valid[i]+VOL.review[i];
    tip.innerHTML='<b>'+VOL.days[i]+' Sep 2026</b>'+
      '<span><i style="background:#8D93FF"></i>Tervalidasi '+VOL.valid[i].toLocaleString('id-ID')+'</span>'+
      '<span><i style="background:#F0B056"></i>Perlu tinjau '+VOL.review[i]+'</span>'+
      '<span style="opacity:.7;margin-top:4px">Total '+total.toLocaleString('id-ID')+' dokumen</span>';
    tip.classList.add('on');
    var wr=wrap.getBoundingClientRect(), hr=host.getBoundingClientRect();
    var tw=tip.offsetWidth, th=tip.offsetHeight;
    var cxp=(hr.left-wr.left)+VG.xs[i];
    var left=Math.min(Math.max(cxp, tw/2+6), wr.width-tw/2-6);
    var topAt=(hr.top-wr.top)+VG.yTotal[i]-10;
    var below = topAt-th < 4;
    tip.style.left=left+'px';
    tip.style.top=(below ? topAt+26 : topAt)+'px';
    tip.style.transform = below ? 'translate(-50%,0)' : 'translate(-50%,-100%)';
  });
  host.addEventListener('mouseleave',hideHover);
  var rt;
  window.addEventListener('resize',function(){ clearTimeout(rt); rt=setTimeout(drawVolChart,140); });
})();
drawVolChart();

(function buildBars(){
  var rows=[['KTP / e-KTP',5842],['Rekening koran',2914],['STNK',1806],['Kartu Keluarga',1288],['BPKB',742]];
  var max=5842;
  $('#modeBars').innerHTML=rows.map(function(r){
    return '<div class="bar-row"><span class="bl">'+S(r[0])+'</span><span class="bv">'+r[1].toLocaleString('id-ID')+'</span>'+
           '<span class="bar-track"><i style="width:'+(r[1]/max*100).toFixed(1)+'%"></i></span></div>';
  }).join('');
})();

var ACT=[
  ['ktp','RAKA PRATAMA','3173051708940004','valid','2 menit lalu'],
  ['bank','BCA ****7734','148 transaksi','review','14 menit lalu'],
  ['stnk','B 2481 KZT','Toyota Avanza 2019','valid','31 menit lalu'],
  ['tanah','SHM No. 04127','187 m² · Bangka','review','48 menit lalu'],
  ['passport','C4821937','PRATAMA, RAKA','valid','1 jam lalu'],
  ['akta','PT KARYA PRIMA NUSANTARA','Akta No. 42','valid','1 jam lalu'],
  ['kk','Keluarga PRATAMA','4 anggota','valid','2 jam lalu'],
  ['emas','Antam 50 g','999,9 · LM-2024','valid','2 jam lalu'],
  ['bpkb','N-08245219','MHKA6GJ6JKJ004821','rejected','3 jam lalu'],
  ['investasi','ORI024','Rp 250.000.000','valid','4 jam lalu']
];
var STATUS={valid:['pill-ok','Tervalidasi'],review:['pill-warn','Perlu tinjau'],rejected:['pill-bad','Ditahan']};
var ACT_PER=4, actPage=0;
function renderAct(){
  var pages=Math.ceil(ACT.length/ACT_PER);
  actPage=Math.max(0,Math.min(actPage,pages-1));
  var from=actPage*ACT_PER, rows=ACT.slice(from,from+ACT_PER);
  $('#actList').innerHTML=rows.map(function(a){
    var m=MODE_BY_ID[a[0]], st=STATUS[a[3]];
    return '<div class="act"><span class="t-ico">'+svg(m.icon,1.8)+'</span>'+
      '<span style="min-width:0"><b>'+S(a[1])+'</b><p class="mono">'+S(a[2])+'</p></span>'+
      '<span style="display:flex;align-items:center;gap:10px"><span class="pill '+st[0]+'">'+st[1]+'</span><time>'+S(a[4])+'</time></span></div>';
  }).join('');
  $('#actInfo').textContent=(from+1)+'–'+(from+rows.length)+' dari '+ACT.length;
  $('#actPrev').disabled=actPage===0;
  $('#actNext').disabled=actPage>=pages-1;
  $('#actSub').textContent = actPage===0
    ? rows.length+' pemrosesan terakhir di tim Anda'
    : 'Halaman '+(actPage+1)+' dari '+pages+' · urut dari yang terbaru';
}
$('#actPrev').addEventListener('click',function(){ actPage--; renderAct(); });
$('#actNext').addEventListener('click',function(){ actPage++; renderAct(); });
renderAct();
/* sesuaikan jumlah baris aktivitas dengan ruang yang tersedia */
function fitAct(){
  var list=$('#actList'); if(!list || $('#view-dashboard').hidden) return;
  var row=list.querySelector('.act'); if(!row) return;
  var rh=row.offsetHeight, avail=list.clientHeight;
  if(!rh || !avail) return;
  var n=Math.max(2,Math.min(6,Math.floor((avail+2)/rh)));
  if(n!==ACT_PER){ ACT_PER=n; actPage=0; renderAct(); }
}
var fitT;
window.addEventListener('resize',function(){ clearTimeout(fitT); fitT=setTimeout(fitAct,120); });

/* ---------- mode grid ---------- */
$('#modeGrid').innerHTML=MODES.map(function(m){
  return '<button class="mode'+(m.other?' is-other':'')+'" data-mode="'+m.id+'" aria-pressed="'+(m.id===current.id)+'">'+
    '<span class="mode-check" aria-hidden="true">'+TICK+'</span>'+
    '<span class="mode-top"><span class="mode-ico">'+svg(m.icon,1.7)+'</span>'+
      '<span><h3>'+m.name+'</h3><span class="code">'+m.code+'</span></span></span>'+
    '<p>'+m.desc+'</p>'+
    '<span class="mode-meta"><span class="pill pill-mute">'+m.fields.length+' field</span>'+
      '<span class="pill pill-ai">'+SPARK+m.ai.length+' fitur AI</span></span></button>';
}).join('');
$$('[data-mode]').forEach(function(b){
  b.addEventListener('click',function(){
    setMode(b.getAttribute('data-mode'));
    $$('[data-mode]').forEach(function(o){o.setAttribute('aria-pressed',String(o===b));});
    go('scan'); gotoStep(1);
  });
});

/* ---------- doc mock ---------- */
function docMock(m){
  var lines='', n = m.shape==='card'?7:12;
  for(var i=0;i<n;i++){
    lines+='<rect x="'+(m.shape==='card'?96:30)+'" y="'+(m.shape==='card'?(46+i*13):(56+i*16))+'" width="'+
      ((m.shape==='card'?150:196)-Math.random()*54).toFixed(0)+'" height="'+(m.shape==='card'?5:6)+'" rx="2.5" fill="#9AA6BE" opacity="'+(0.34+Math.random()*0.3).toFixed(2)+'"/>';
  }
  var docW = m.shape==='card'?300:236, docH = m.shape==='card'?190:290;
  var px=(400-docW)/2, py=(300-docH)/2;
  var inner='';
  if(m.shape==='card'){
    inner='<rect x="26" y="44" width="58" height="72" rx="4" fill="#B6C2D8"/>'+
      '<rect x="26" y="126" width="58" height="9" rx="3" fill="#9AA6BE" opacity=".5"/>'+
      '<rect x="248" y="112" width="34" height="46" rx="4" fill="#C3CEE0" opacity=".8"/>'+
      '<rect x="24" y="152" width="46" height="26" rx="4" fill="#D9C27A"/>';
  } else if(m.shape==='book'){
    inner='<rect x="20" y="42" width="52" height="64" rx="4" fill="#B6C2D8"/>'+
      '<circle cx="186" cy="248" r="26" fill="none" stroke="#9AA6BE" stroke-width="2.5" opacity=".6"/>'+
      '<path d="M162 258c12-14 36-14 48 0" stroke="#9AA6BE" stroke-width="2.5" fill="none" opacity=".6"/>';
  } else {
    inner='<rect x="30" y="238" width="90" height="30" rx="3" fill="none" stroke="#9AA6BE" stroke-width="2" opacity=".55"/>'+
      '<circle cx="176" cy="252" r="24" fill="none" stroke="#B0483E" stroke-width="2.5" opacity=".5"/>'+
      '<text x="176" y="256" text-anchor="middle" font-size="8" font-family="IBM Plex Mono, monospace" fill="#B0483E" opacity=".6">STEMPEL</text>';
  }
  return '<svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Pratinjau foto dokumen '+m.name+'">'+
    '<rect width="400" height="300" fill="#C9CBC7"/>'+
    '<rect width="400" height="300" fill="url(#gr)" opacity=".5"/>'+
    '<defs><linearGradient id="gr" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#E4E5E1"/><stop offset="1" stop-color="#B3B6B2"/></linearGradient></defs>'+
    '<g transform="translate('+px+','+py+') rotate(-1.4 '+(docW/2)+' '+(docH/2)+')">'+
      '<rect x="4" y="7" width="'+docW+'" height="'+docH+'" rx="10" fill="#000" opacity=".16"/>'+
      '<rect width="'+docW+'" height="'+docH+'" rx="10" fill="'+(m.shape==='card'?'#CFE4F0':'#F6F4EE')+'"/>'+
      '<rect x="20" y="16" width="'+(docW-40)+'" height="9" rx="3" fill="#41536E" opacity=".72"/>'+
      '<rect x="20" y="30" width="'+(docW-96)+'" height="7" rx="3" fill="#41536E" opacity=".45"/>'+
      inner+lines+
    '</g></svg>';
}

/* ---------- scan flow ---------- */
function setMode(id){
  current=MODE_BY_ID[id]||MODES[0];
  var m=current;
  $('#scanEyebrow').textContent='Sesi #WS-PKP-0917-082 · '+m.code;
  $('#scanTitle').textContent='Validasi '+m.name;
  $('#scanDesc').textContent=m.desc;
  $('#uploadTitle').textContent='Unggah dokumen: '+m.name;
  $('#uploadHint').textContent='Pastikan seluruh bagian dokumen terlihat jelas dan tidak terpotong.';
  $('#tipText').textContent=m.tip;
  $('#fileMeta').textContent=m.fileName;
  $('#docMockHost').innerHTML=docMock(m);
  $('#aiFeatureList').innerHTML=m.ai.map(function(a,i){
    return '<div class="ai-feat"><b>'+a[0]+'</b>'+
      '<button class="switch" role="switch" aria-checked="'+(a[2]?'true':'false')+'" aria-label="Aktifkan '+a[0].replace(/&amp;/g,'dan')+'"></button>'+
      '<p>'+a[1]+'</p></div>';
  }).join('');
  $$('#aiFeatureList .switch').forEach(function(sw){
    sw.addEventListener('click',function(){
      var on=sw.getAttribute('aria-checked')==='true';
      sw.setAttribute('aria-checked',String(!on));
    });
  });
  $('#ctxEyebrow').textContent='Sesi #WS-PKP-0917-082 · '+m.code;
  $('#ctxEyebrow').hidden=false;
  $('#ctxTitle').textContent=m.name;
}
function gotoStep(n){
  $('#stepProc').hidden=true;
  var setup=$('#aiSetupCard'); if(setup) setup.hidden=false;
  var pf=$('#previewFrame'); if(pf) pf.classList.remove('scanning');
  $('#step1').hidden=n!==1; $('#step2').hidden=n!==2; $('#step3').hidden=n!==3;
  $$('#stepper .step').forEach(function(s){
    var i=+s.getAttribute('data-step');
    s.classList.toggle('now', i===n);
    s.classList.toggle('done', i<n);
    s.querySelector('.step-dot').innerHTML = i<n ? TICK : String(i);
  });
  $$('#stepper .step-line').forEach(function(l){
    l.classList.toggle('on', +l.getAttribute('data-line') < n);
  });
}
$$('[data-goto-step]').forEach(function(b){
  b.addEventListener('click',function(){ gotoStep(+b.getAttribute('data-goto-step')); });
});
var drop=$('#drop'), dropHTML=drop.innerHTML, dropBusy=false;
function pick(){
  if(dropBusy) return; dropBusy=true;
  var name=current.fileName.split(' · ')[0];
  drop.innerHTML='<span class="spin spin-brand" style="width:30px;height:30px;border-width:3px"></span>'+
    '<h3 style="margin-top:14px">Mengunggah berkas…</h3>'+
    '<p class="mono" style="font-size:12.5px">'+S(name)+'</p>'+
    '<span class="boot-track" style="margin-top:14px"><i id="upBar" style="width:0"></i></span>'+
    '<p class="meta" id="upPct">0%</p>';
  var p=0, bar=$('#upBar'), pct=$('#upPct');
  var t=setInterval(function(){
    p=Math.min(100,p+Math.random()*22+10);
    bar.style.width=p+'%'; pct.textContent=Math.round(p)+'%';
    if(p>=100){
      clearInterval(t);
      setTimeout(function(){
        drop.innerHTML=dropHTML; dropBusy=false;
        gotoStep(2); toast('Berkas diterima: '+name);
      },260);
    }
  },130);
}
drop.addEventListener('click',pick);
drop.addEventListener('keydown',function(e){ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); pick(); } });
['dragenter','dragover'].forEach(function(ev){ drop.addEventListener(ev,function(e){ e.preventDefault(); drop.classList.add('hot'); }); });
['dragleave','drop'].forEach(function(ev){ drop.addEventListener(ev,function(e){ e.preventDefault(); drop.classList.remove('hot'); if(ev==='drop') pick(); }); });

function renderResult(){
  var m=current;
  var avg=m.conf;
  $('#confBig').textContent=avg.toFixed(1).replace('.',',')+'%';
  var vd=$('#verdict'), vIco=$('.verdict-ico',vd);
  var hasBad=m.findings.some(function(f){return f[0]==='bad';});
  var hasWarn=m.findings.some(function(f){return f[0]==='warn';});
  vd.style.borderColor = hasBad?'var(--bad-line)':(hasWarn?'var(--warn-line)':'var(--ok-line)');
  vd.style.background  = hasBad?'var(--bad-soft)':(hasWarn?'var(--warn-soft)':'var(--ok-soft)');
  vIco.style.background = hasBad?'var(--bad)':(hasWarn?'var(--warn)':'var(--ok)');
  vIco.innerHTML = hasBad?CROSS:(hasWarn?BANG:TICK);
  $('#verdictTitle').style.color = hasBad?'var(--bad)':(hasWarn?'var(--warn)':'var(--ok)');
  $('#confBig').style.color = avg>=96?'var(--ok)':(avg>=92?'var(--brand)':'var(--warn)');
  $('#verdictTitle').textContent=m.verdict[0];
  $('#verdictText').textContent=m.verdict[1];

  $('#ledger').innerHTML=m.fields.map(function(fd){
    var on=Math.max(1,Math.round(fd.c/20));
    var cls = fd.c>=95?'':(fd.c>=90?'mid':'low');
    var meter=''; for(var i=0;i<5;i++) meter+='<i class="'+(i<on?'on':'')+'"></i>';
    return '<div class="led-row'+(fd.c<90?' flag':'')+'">'+
      '<span class="led-conf"><span class="led-meter '+cls+'">'+meter+'</span><span class="led-pct">'+fd.c.toFixed(1).replace('.',',')+'%</span></span>'+
      '<span class="led-body"><span class="led-key">'+fd.k+'</span>'+
        '<span class="led-val'+(fd.mono?' mono':'')+'">'+fd.v+'</span>'+
        (fd.note?'<span class="led-note">Perlu konfirmasi — '+fd.note+'</span>':'')+
      '</span>'+
      '<span class="led-side">'+(fd.c<90?'<span class="pill pill-warn">Tinjau</span>':'<span class="pill pill-ok">'+TICK+'Valid</span>')+'</span>'+
    '</div>';
  }).join('');

  var r=m.risk;
  $('#gaugeVal').textContent=r;
  var arc=$('#gaugeArc'), C=207.3;
  arc.setAttribute('stroke-dashoffset', String((C*(1-r/100)).toFixed(1)));
  var rc = r<25?'var(--ok)':(r<50?'var(--warn)':'var(--bad)');
  arc.setAttribute('stroke',rc);
  $('#gaugeVal').style.color=rc;
  $('#riskLabel').textContent = r<25?'Risiko rendah':(r<50?'Risiko menengah':'Risiko tinggi');
  $('#riskLabel').style.color=rc;
  $('#aiSubtitle').textContent='Temuan otomatis untuk '+m.name;

  var FI={ok:['f-ok',TICK],warn:['f-warn',BANG],bad:['f-bad',CROSS],ai:['f-ai',SPARK]};
  $('#findings').innerHTML=m.findings.map(function(fn){
    var t=FI[fn[0]];
    return '<div class="finding"><span class="f-ico '+t[0]+'">'+t[1]+'</span><span><b>'+fn[1]+'</b><p>'+fn[2]+'</p></span></div>';
  }).join('');

  $('#auditList').innerHTML=[
    ['Berkas diunggah',m.fileName,'17 Sep 2026 · 09:41:02'],
    ['Pra-proses gambar','Deskew 1,4° · koreksi pantulan','09:41:03'],
    ['OCR dijalankan','Model v4.2.1 · '+m.fields.length+' field','09:41:04'],
    ['Analisis AI','Skor risiko '+m.risk+' · '+m.findings.length+' temuan','09:41:05'],
    ['Menunggu keputusan','M. Alfian · Analis Verifikasi','—']
  ].map(function(a){
    return '<div class="act"><span class="t-ico" style="background:var(--card-2);border-color:var(--line);color:var(--muted)">'+
      svg('<circle cx="12" cy="12" r="3.2"/>',1.8)+'</span>'+
      '<span><b>'+S(a[0])+'</b><p>'+a[1]+'</p></span><time>'+S(a[2])+'</time></div>';
  }).join('');

  var payload={
    session_id:'WS-PKP-0917-082',
    document_type:m.code,
    processed_at:'2026-09-17T09:41:05+07:00',
    confidence_avg:m.conf/100,
    risk_score:m.risk,
    decision: m.risk<25?'approved':(m.risk<50?'manual_review':'on_hold'),
    fields:{}, ai_findings:m.findings.length
  };
  m.fields.slice(0,6).forEach(function(fd){
    var key=fd.k.toLowerCase().replace(/[^a-z0-9]+/g,'_').replace(/^_|_$/g,'');
    payload.fields[key]={value:fd.v.replace(/&lt;/g,'<').replace(/&amp;/g,'&'), confidence:+(fd.c/100).toFixed(3)};
  });
  payload.fields['…']='('+(m.fields.length-6)+' field lainnya)';
  $('#jsonBody').textContent=JSON.stringify(payload,null,2);
}
/* ---------- loader pemrosesan ekstraksi ---------- */
function runProcessing(done){
  var m=current;
  var steps=[
    ['Pra-proses gambar','Deskew, koreksi pantulan, dan penajaman tepi',620],
    ['Membaca teks (OCR)','Model v4.2.1 · '+m.fields.length+' field pada skema '+m.code,980],
    ['Validasi aturan','Checksum, format, dan konsistensi antar-field',680],
    ['Analisis AI','Keaslian dokumen, anomali, dan skor risiko',900]
  ];
  $('#step1').hidden=true; $('#step3').hidden=true;
  $('#step2').hidden=false;
  $('#aiSetupCard').hidden=true;
  $('#stepProc').hidden=false;
  $('#previewFrame').classList.add('scanning');
  $('#procTitle').textContent='Mengekstraksi '+m.name+'…';
  $('#procSteps').innerHTML=steps.map(function(s,i){
    return '<li data-i="'+i+'"><span class="ps"></span><span>'+S(s[0])+'</span><time>—</time></li>';
  }).join('');
  window.scrollTo(0,0);
  var lis=$$('#procSteps li'), arc=$('#procArc'), C=195, total=0;
  steps.forEach(function(s){total+=s[2];});
  var elapsed=0, i=0;
  function setPct(p){
    arc.setAttribute('stroke-dashoffset', String((C*(1-p/100)).toFixed(1)));
    $('#procPct').textContent=Math.round(p)+'%';
  }
  setPct(0);
  function step(){
    if(i>=steps.length){
      setPct(100);
      setTimeout(function(){
        $('#stepProc').hidden=true;
        $('#aiSetupCard').hidden=false;
        $('#previewFrame').classList.remove('scanning');
        done();
      },420);
      return;
    }
    var li=lis[i];
    li.className='now';
    li.querySelector('time').textContent='memproses';
    li.querySelector('span:nth-child(2)').textContent=steps[i][0];
    var start=Date.now(), dur=steps[i][2], base=elapsed;
    var tick=setInterval(function(){
      var p=Math.min(1,(Date.now()-start)/dur);
      setPct(((base+dur*p)/total)*100);
      if(p>=1) clearInterval(tick);
    },60);
    setTimeout(function(){
      clearInterval(tick);
      li.className='ok';
      li.querySelector('.ps').innerHTML=TICK;
      li.querySelector('time').textContent=(dur/1000).toFixed(1).replace('.',',')+'s';
      elapsed+=dur; i++; step();
    },dur);
  }
  step();
}
$('#runExtract').addEventListener('click',function(){
  runProcessing(function(){
    renderResult(); gotoStep(3);
    toast('Ekstraksi selesai · '+current.fields.length+' field terbaca');
  });
});
$('#jsonBtn').addEventListener('click',function(){ $('#jsonCard').hidden=false; $('#jsonCard').scrollIntoView({behavior:'smooth',block:'nearest'}); });
$('#jsonClose').addEventListener('click',function(){ $('#jsonCard').hidden=true; });
$('#copyData').addEventListener('click',function(){
  var txt=current.fields.map(function(f){return f.k+': '+f.v.replace(/&lt;/g,'<');}).join('\n');
  if(navigator.clipboard) navigator.clipboard.writeText(txt).then(function(){toast('Data disalin ke papan klip');},function(){toast('Data disiapkan untuk disalin');});
  else toast('Data disiapkan untuk disalin');
});
$('#editData').addEventListener('click',function(){ toast('Mode ubah data — field dapat dikoreksi langsung'); });
$('#pushBtn').addEventListener('click',function(){ toast('Dikirim ke core system · webhook 200 OK'); });

/* ---------- batch ---------- */
var batchSeq=0, batchNo=11;
function bi(mode,name,size,kind){
  batchSeq++;
  return {id:'f'+batchSeq, mode:mode, name:name, size:size, kind:kind, status:'queued', pct:0, open:false};
}
var BATCH=[
  bi('ktp','ktp_raka_pratama.jpg','1,8 MB','ok'),
  bi('kk','kk_3173052508190004.pdf','1,1 MB','ok'),
  bi('bank','rekening_koran_jan-mar.pdf','3,6 MB','review'),
  bi('stnk','stnk_b2481kzt.jpg','2,4 MB','ok'),
  bi('tanah','shm_04127_bangka.pdf','7,8 MB','review'),
  bi('akta','akta_pendirian_kpn.pdf','9,4 MB','ok')
];
var POOL=[
  ['passport','passport_page_bio.jpg','2,1 MB','ok'],
  ['emas','sertifikat_antam_50g.jpg','1,2 MB','ok'],
  ['bpkb','bpkb_n08245219.pdf','5,1 MB','ok'],
  ['investasi','konfirmasi_ori024.pdf','640 KB','ok'],
  ['other','surat_keterangan_kerja.pdf','420 KB','review'],
  ['ktp','ktp_dewi_anggraini.jpg','2,0 MB','ok'],
  ['kk','kk_keluarga_anggraini.pdf','1,4 MB','ok'],
  ['bank','mutasi_mandiri_q1.pdf','4,2 MB','review']
];
var BST={
  queued:['pill-mute','Menunggu'], processing:['pill-brand','Memproses'],
  done:['pill-ok','Selesai'], review:['pill-warn','Perlu tinjau']
};
var CHEV='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>';

function detailHTML(it){
  var m=MODE_BY_ID[it.mode];
  if(it.status==='queued'||it.status==='processing'){
    return '<div class="b-note">'+svg('<circle cx="12" cy="12" r="9"/><path d="M12 16v-4M12 8h.01"/>',1.9)+
      '<span>Data belum tersedia. '+(it.status==='processing'?'Berkas sedang diproses…':'Jalankan batch dulu untuk melihat hasil ekstraksi berkas ini.')+'</span></div>';
  }
  var rc = m.risk<25?'var(--ok)':(m.risk<50?'var(--warn)':'var(--bad)');
  var cells=m.fields.slice(0,8).map(function(fd){
    return '<div class="dcell"><span class="led-key">'+fd.k+'</span>'+
      '<span class="dv'+(fd.mono?' mono':'')+'">'+fd.v+'</span>'+
      '<span class="dc">keyakinan '+fd.c.toFixed(1).replace('.',',')+'%</span></div>';
  }).join('');
  var flagged=m.fields.filter(function(fd){return fd.c<90;}).length;
  return '<div class="b-detail-head">'+
      '<span class="pill pill-brand">'+m.code+'</span>'+
      '<span class="pill pill-mute">'+m.fields.length+' field terbaca</span>'+
      '<span class="pill '+(m.conf>=96?'pill-ok':'pill-warn')+'">Keyakinan '+m.conf.toFixed(1).replace('.',',')+'%</span>'+
      '<span class="pill pill-mute" style="color:'+rc+'">Risiko '+m.risk+'</span>'+
      (flagged?'<span class="pill pill-warn">'+flagged+' field perlu tinjau</span>':'')+
    '</div>'+
    '<div class="dgrid">'+cells+'</div>'+
    '<div class="b-detail-foot">'+
      '<button class="btn btn-ghost btn-sm" data-open-full="'+it.mode+'">Buka hasil lengkap</button>'+
      '<button class="btn btn-ghost btn-sm" data-copy-row="'+it.mode+'">Salin data</button>'+
      '<span class="hint" style="margin-left:auto">Menampilkan 8 dari '+m.fields.length+' field</span>'+
    '</div>';
}
function progCell(it){
  var m=MODE_BY_ID[it.mode];
  if(it.status==='done'||it.status==='review'){
    var cc = m.conf>=96?'var(--ok)':'var(--warn)';
    var rc = m.risk<25?'var(--ok)':(m.risk<50?'var(--warn)':'var(--bad)');
    return '<span class="b-sum"><span>'+m.fields.length+' field</span>'+
      '<span>·</span><b style="color:'+cc+'">'+m.conf.toFixed(1).replace('.',',')+'%</b>'+
      '<span>·</span><span>risiko</span><b style="color:'+rc+'">'+m.risk+'</b></span>';
  }
  var barCls = it.status==='processing'?'':'';
  return '<span class="b-prog'+barCls+'"><i style="width:'+it.pct+'%"></i></span>';
}
function rowHTML(it){
  var m=MODE_BY_ID[it.mode], st=BST[it.status];
  return '<div class="b-item" data-id="'+it.id+'">'+
    '<div class="b-row">'+
      '<span class="t-ico" style="width:28px;height:28px">'+svg(m.icon,1.8)+'</span>'+
      '<span class="t-doc"><span style="min-width:0"><span class="t-name">'+S(it.name)+'</span>'+
        '<span class="t-sub">'+(it.status==='queued'?'Belum dikenali':m.code)+' · '+it.size+'</span></span></span>'+
      '<span class="b-col-prog">'+progCell(it)+'</span>'+
      '<span class="b-col-pct b-pct">'+(it.status==='done'||it.status==='review'?'':Math.round(it.pct)+'%')+'</span>'+
      '<span class="pill '+st[0]+'" data-st>'+st[1]+'</span>'+
      '<button class="b-toggle" data-toggle="'+it.id+'" aria-expanded="'+(it.open?'true':'false')+'" aria-label="Lihat data '+S(it.name)+'">'+CHEV+'</button>'+
    '</div>'+
    '<div class="b-detail" data-detail="'+it.id+'"'+(it.open?'':' hidden')+'>'+(it.open?detailHTML(it):'')+'</div>'+
  '</div>';
}
function renderBatch(q){
  q=(q===undefined? $('#batchSearch').value : q||'').toLowerCase();
  var rows=BATCH.filter(function(b){return b.name.toLowerCase().indexOf(q)>-1;});
  $('#batchList').innerHTML = rows.length ? rows.map(rowHTML).join('')
    : '<div class="empty">Tidak ada berkas yang cocok dengan pencarian ini.</div>';
  $('#batchRun').textContent='Mulai proses '+BATCH.length+' berkas';
  $('#bTotal').textContent=String(BATCH.length);
  $('#bEta').textContent=Math.max(2,Math.round(BATCH.length*1.8))+'s';
  $('#batchLabel').textContent='Antrean · batch #B-260917-'+batchNo;
  recountBatch();
}
function recountBatch(){
  var d=0,r=0;
  BATCH.forEach(function(b){ if(b.status==='done')d++; if(b.status==='review')r++; });
  $('#bDone').textContent=String(d); $('#bReview').textContent=String(r);
}
function toggleDetail(id,force){
  var it=BATCH.filter(function(b){return b.id===id;})[0]; if(!it) return;
  it.open = force===undefined ? !it.open : force;
  var pane=$('[data-detail="'+id+'"]'), btn=$('[data-toggle="'+id+'"]');
  if(!pane) return;
  btn.setAttribute('aria-expanded',String(it.open));
  if(it.open){ pane.innerHTML=detailHTML(it); pane.hidden=false; pane.classList.add('rise'); }
  else { pane.hidden=true; pane.innerHTML=''; }
}
$('#batchList').addEventListener('click',function(e){
  var t=e.target.closest('[data-toggle]');
  if(t){ toggleDetail(t.getAttribute('data-toggle')); return; }
  var full=e.target.closest('[data-open-full]');
  if(full){
    var id=full.getAttribute('data-open-full');
    setMode(id); renderResult(); gotoStep(3); go('scan');
    toast('Membuka hasil lengkap '+MODE_BY_ID[id].name); return;
  }
  var cp=e.target.closest('[data-copy-row]');
  if(cp){
    var m=MODE_BY_ID[cp.getAttribute('data-copy-row')];
    var txt=m.fields.map(function(f){return f.k+': '+f.v.replace(/&lt;/g,'<');}).join('\n');
    if(navigator.clipboard) navigator.clipboard.writeText(txt).then(function(){toast('Data disalin');},function(){toast('Data disiapkan');});
    else toast('Data disiapkan');
  }
});
$('#batchExpandAll').addEventListener('click',function(){
  var open=this.getAttribute('aria-pressed')!=='true';
  this.setAttribute('aria-pressed',String(open));
  this.textContent=open?'Tutup semua detail':'Buka semua detail';
  BATCH.forEach(function(b){ toggleDetail(b.id,open); });
});
$('#batchSearch').addEventListener('input',function(){ renderBatch(this.value); });

$('#batchRun').addEventListener('click',function(){
  var btn=this; if(btn.disabled) return;
  btn.disabled=true; btn.innerHTML='<span class="spin"></span><span>Memproses…</span>';
  $('#batchStatus').className='pill pill-brand'; $('#batchStatus').textContent='Sedang diproses';
  var items=BATCH.slice(), fin=0;
  items.forEach(function(it,i){
    it.status='queued'; it.pct=0;
    setTimeout(function(){
      var row=$('[data-id="'+it.id+'"]'); if(!row){ fin++; return; }
      var cell=$('.b-col-prog',row), pct=$('.b-pct',row), st=$('[data-st]',row);
      it.status='processing'; cell.innerHTML=progCell(it);
      var fill=$('.b-prog i',row);
      st.className='pill pill-brand'; st.textContent='Memproses';
      var t=setInterval(function(){
        it.pct=Math.min(100,it.pct+Math.random()*16+6);
        fill.style.width=it.pct+'%'; if(pct) pct.textContent=Math.round(it.pct)+'%';
        if(it.pct>=100){
          clearInterval(t);
          it.status = it.kind==='review' ? 'review' : 'done';
          var s=BST[it.status];
          cell.innerHTML=progCell(it);
          if(pct) pct.textContent='';
          st.className='pill '+s[0]; st.textContent=s[1];
          $('.t-sub',row).textContent=MODE_BY_ID[it.mode].code+' · '+it.size;
          if(it.open) $('[data-detail="'+it.id+'"]').innerHTML=detailHTML(it);
          recountBatch(); fin++;
          if(fin===items.length){
            btn.disabled=false; btn.textContent='Proses ulang '+BATCH.length+' berkas';
            $('#batchStatus').className='pill pill-ok'; $('#batchStatus').textContent='Batch selesai';
            $('#bEta').textContent='0s';
            var rv=BATCH.filter(function(b){return b.status==='review';}).length;
            toast('Batch selesai · '+rv+' berkas perlu tinjau');
          }
        }
      },170);
    }, i*320);
  });
});

/* ---------- sheet: tambah berkas ---------- */
var sheet=$('#addSheet'), picked=[], lastFocus=null;
function openSheet(){
  lastFocus=document.activeElement;
  picked=[]; $('#pickWrap').hidden=true; $('#pickList').innerHTML='';
  $('#pickCount').textContent='Belum ada berkas dipilih';
  $('#addSheetConfirm').disabled=true;
  $('#pickAll').setAttribute('aria-pressed','true'); $('#pickAll').textContent='Pilih semua';
  sheet.hidden=false; $('#sheetDrop').focus();
}
function closeSheet(){ sheet.hidden=true; if(lastFocus) lastFocus.focus(); }
function simulatePicker(){
  var d=$('#sheetDrop');
  d.innerHTML='<span class="spin spin-brand" style="width:22px;height:22px"></span><h4 style="margin-top:8px">Membaca berkas dari perangkat…</h4><p>Memeriksa ukuran dan format</p>';
  setTimeout(function(){
    d.innerHTML='<span class="drop-ico" aria-hidden="true">'+svg('<path d="M12 16V8m0 0-3 3m3-3 3 3"/><path d="M20 16.5A3.5 3.5 0 0 0 18 10h-.7A6 6 0 1 0 6 14.5"/>',1.7)+'</span>'+
      '<h4>Pilih berkas lain</h4><p>Klik untuk mengganti daftar di bawah</p>';
    var n=4+Math.floor(Math.random()*3);
    picked=[];
    var pool=POOL.slice();
    for(var i=0;i<n && pool.length;i++){
      picked.push(pool.splice(Math.floor(Math.random()*pool.length),1)[0].concat([true]));
    }
    renderPicks();
    $('#pickWrap').hidden=false;
  },720);
}
function renderPicks(){
  $('#pickList').innerHTML=picked.map(function(p,i){
    var m=MODE_BY_ID[p[0]];
    return '<label class="pick"><input type="checkbox" data-pick="'+i+'"'+(p[4]?' checked':'')+'>'+
      '<span class="t-ico">'+svg(m.icon,1.8)+'</span>'+
      '<span style="min-width:0;flex:1"><b>'+S(p[1])+'</b><small>'+p[2]+' · perkiraan '+m.code+'</small></span></label>';
  }).join('');
  updatePickCount();
}
function updatePickCount(){
  var n=picked.filter(function(p){return p[4];}).length;
  $('#pickCount').textContent = n? n+' berkas siap ditambahkan' : 'Belum ada berkas dipilih';
  $('#addSheetConfirm').disabled = n===0;
}
$('#pickList').addEventListener('change',function(e){
  var c=e.target.closest('[data-pick]'); if(!c) return;
  picked[+c.getAttribute('data-pick')][4]=c.checked; updatePickCount();
});
$('#pickAll').addEventListener('click',function(){
  var on=this.getAttribute('aria-pressed')!=='true';
  this.setAttribute('aria-pressed',String(on));
  this.textContent=on?'Pilih semua':'Hapus pilihan';
  picked.forEach(function(p){p[4]=on;}); renderPicks();
});
$('#batchAdd').addEventListener('click',openSheet);
$('#addSheetClose').addEventListener('click',closeSheet);
$('#addSheetCancel').addEventListener('click',closeSheet);
sheet.addEventListener('click',function(e){ if(e.target===sheet) closeSheet(); });
document.addEventListener('keydown',function(e){ if(e.key==='Escape' && !sheet.hidden) closeSheet(); });
$('#sheetDrop').addEventListener('click',simulatePicker);
$('#sheetDrop').addEventListener('keydown',function(e){ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); simulatePicker(); } });
['dragenter','dragover'].forEach(function(ev){ $('#sheetDrop').addEventListener(ev,function(e){e.preventDefault(); this.classList.add('hot');}); });
['dragleave','drop'].forEach(function(ev){ $('#sheetDrop').addEventListener(ev,function(e){e.preventDefault(); this.classList.remove('hot'); if(ev==='drop') simulatePicker();}); });
$('#addSheetConfirm').addEventListener('click',function(){
  var sel=picked.filter(function(p){return p[4];});
  if(!sel.length) return;
  var btn=this; btn.disabled=true; btn.innerHTML='<span class="spin"></span><span>Mengunggah…</span>';
  setTimeout(function(){
    sel.forEach(function(p){ BATCH.push(bi(p[0],p[1],p[2],p[3])); });
    batchNo++;
    $('#batchStatus').className='pill pill-mute'; $('#batchStatus').textContent='Siap diproses';
    $('#batchExpandAll').setAttribute('aria-pressed','false');
    $('#batchExpandAll').textContent='Buka semua detail';
    $('#batchSearch').value='';
    btn.disabled=false; btn.textContent='Tambahkan ke antrean';
    closeSheet(); renderBatch('');
    toast(sel.length+' berkas ditambahkan ke antrean');
  },780);
});

/* ---------- history ---------- */
var HIST=[
  ['ktp','ktp_raka_pratama.jpg','RAKA PRATAMA','3173051708940004',98.7,12,'valid','17 Sep 09:41'],
  ['bank','rekening_koran_jan-mar.pdf','RAKA PRATAMA','BCA ****7734',95.4,64,'review','17 Sep 09:28'],
  ['stnk','stnk_b2481kzt.jpg','B 2481 KZT','Toyota Avanza 2019',97.4,28,'valid','17 Sep 09:11'],
  ['tanah','shm_04127_bangka.pdf','SHM No. 04127','187 m² · Bangka',94.8,58,'review','17 Sep 08:54'],
  ['passport','passport_page_bio.jpg','PRATAMA, RAKA','C4821937',99.3,14,'valid','17 Sep 08:32'],
  ['akta','akta_pendirian_kpn.pdf','PT KARYA PRIMA NUSANTARA','Akta No. 42',93.7,31,'valid','17 Sep 08:05'],
  ['kk','kk_3173052508190004.pdf','Keluarga PRATAMA','4 anggota',96.6,16,'valid','16 Sep 17:22'],
  ['emas','sertifikat_antam_50g.jpg','Antam 50 g','LM-2024-0918-44821',98.2,9,'valid','16 Sep 16:40'],
  ['bpkb','bpkb_palsu_uji.pdf','DEWI ANGGRAINI','N-00114872',71.2,88,'rejected','16 Sep 15:58'],
  ['investasi','konfirmasi_ori024.pdf','RAKA PRATAMA','ORI024 · Rp 250 juta',97.1,18,'valid','16 Sep 14:19'],
  ['other','surat_keterangan_kerja.pdf','RAKA PRATAMA','PT Karya Prima Nusantara',92.1,24,'valid','16 Sep 11:03'],
  ['ktp','ktp_screenshot.png','—','Tangkapan layar terdeteksi',44.6,95,'rejected','16 Sep 10:47']
];
var histFilter='all', histT, histPage=0, HIST_PER=6;
function histLoading(then){
  var sk='';
  for(var i=0;i<4;i++){
    sk+='<tr><td colspan="7" style="padding:13px 14px"><div class="sk-row">'+
      '<div class="sk sk-dot"></div>'+skLine('26%',10)+skLine('14%',10)+skLine('10%',10)+skLine('12%',10)+'</div></td></tr>';
  }
  $('#histBody').innerHTML=sk; $('#histEmpty').hidden=true;
  clearTimeout(histT); histT=setTimeout(then,380);
}
function renderHist(){
  var q=$('#histSearch').value.trim().toLowerCase();
  var rows=HIST.filter(function(h){
    if(histFilter!=='all' && h[6]!==histFilter) return false;
    if(!q) return true;
    return (h[1]+' '+h[2]+' '+h[3]).toLowerCase().indexOf(q)>-1;
  });
  $('#histEmpty').hidden = rows.length>0;
  var pages=Math.max(1,Math.ceil(rows.length/HIST_PER));
  histPage=Math.max(0,Math.min(histPage,pages-1));
  var from=histPage*HIST_PER;
  var total=rows.length;
  rows=rows.slice(from,from+HIST_PER);
  $('#histFoot').hidden = total===0;
  $('#histFoot').innerHTML = total? pagerHTML(histPage,pages,'hpage',
    'Menampilkan '+(from+1)+'–'+(from+rows.length)+' dari '+total+' dokumen') : '';
  $('#histBody').innerHTML=rows.map(function(h){
    var m=MODE_BY_ID[h[0]], st=STATUS[h[6]];
    var rc = h[5]<25?'var(--ok)':(h[5]<50?'var(--warn)':'var(--bad)');
    var cc = h[4]>=96?'var(--ok)':(h[4]>=90?'var(--ink)':'var(--warn)');
    return '<tr><td><span class="t-doc"><span class="t-ico">'+svg(m.icon,1.8)+'</span>'+
      '<span style="min-width:0"><span class="t-name">'+S(h[1])+'</span><span class="t-sub">'+S(h[3])+'</span></span></span></td>'+
      '<td><span class="pill pill-mute">'+m.code+'</span></td>'+
      '<td style="font-weight:600">'+S(h[2])+'</td>'+
      '<td class="mono" style="color:'+cc+';font-weight:600">'+h[4].toFixed(1).replace('.',',')+'%</td>'+
      '<td><span class="mono" style="color:'+rc+';font-weight:600">'+h[5]+'</span></td>'+
      '<td><span class="pill '+st[0]+'">'+st[1]+'</span></td>'+
      '<td class="mono" style="color:var(--muted)">'+S(h[7])+'</td></tr>';
  }).join('');
}
$$('#histFilters .chip').forEach(function(c){
  c.addEventListener('click',function(){
    histFilter=c.getAttribute('data-filter'); histPage=0;
    $$('#histFilters .chip').forEach(function(o){o.setAttribute('aria-pressed',String(o===c));});
    histLoading(renderHist);
  });
});
$('#histSearch').addEventListener('input',function(){ histPage=0; histLoading(renderHist); });
$('#histFoot').addEventListener('click',function(e){
  pagerClick(e,'hpage',function(){return histPage;},function(v){histPage=v;},function(){ histLoading(renderHist); });
});
renderHist();

/* ---------- boot ---------- */
setMode('ktp');
renderResult();
gotoStep(1);
renderBatch('');
applyView('dashboard');

/* =====================================================================
   PENGATURAN: helper bersama
   ===================================================================== */
var IC={
  edit:'<path d="M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16v4Z"/><path d="m13.5 6.5 4 4"/>',
  dup:'<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>',
  trash:'<path d="M4 7h16M10 11v6M14 11v6"/><path d="M5.5 7l1 12a2 2 0 0 0 2 1.8h7a2 2 0 0 0 2-1.8l1-12M9 7V4.5h6V7"/>',
  copy:'<rect x="8.5" y="8.5" width="11.5" height="11.5" rx="2.2"/><path d="M15.5 8.5V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v7.5a2 2 0 0 0 2 2h2.5"/>',
  eye:'<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>',
  eyeOff:'<path d="M3 3l18 18"/><path d="M10.6 5.1A10.8 10.8 0 0 1 12 5c6.4 0 10 7 10 7a17.6 17.6 0 0 1-3.2 4.1M6.6 6.6A17.3 17.3 0 0 0 2 12s3.6 7 10 7a10 10 0 0 0 5.4-1.6"/><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2"/>',
  rot:'<path d="M20 11a8 8 0 0 0-14.9-3M4 5v3h3M4 13a8 8 0 0 0 14.9 3M20 19v-3h-3"/>',
  ban:'<circle cx="12" cy="12" r="9"/><path d="m5.7 5.7 12.6 12.6"/>',
  x:'<path d="M6 6l12 12M18 6 6 18"/>',
  plug:'<path d="M9 2v5M15 2v5M6 7h12v4a6 6 0 0 1-12 0V7Z"/><path d="M12 17v5"/>',
  cloud:'<path d="M7 18.5a4.5 4.5 0 0 1-.6-9A6 6 0 0 1 18 8a4.5 4.5 0 0 1-.5 10.5H7Z"/><path d="M12 11v5M9.5 13.5 12 11l2.5 2.5"/>',
  mail:'<rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="m3.5 7 8.5 6 8.5-6"/>',
  chat:'<path d="M20 14.5a2 2 0 0 1-2 2H8.5L4 20V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8.5Z"/><path d="M8 9h8M8 12.5h5"/>',
  server:'<rect x="3.5" y="4" width="17" height="7" rx="2"/><rect x="3.5" y="13" width="17" height="7" rx="2"/><path d="M7.5 7.5h.01M7.5 16.5h.01M11 7.5h6M11 16.5h6"/>',
  credit:'<rect x="2.5" y="5" width="19" height="14" rx="2.5"/><path d="M2.5 9.5h19M6.5 15h4"/>',
  logo:'<rect x="2" y="4" width="20" height="16" rx="3"/><circle cx="8.5" cy="11" r="2.2"/><path d="M5 17c.7-1.7 2-2.5 3.5-2.5S11.3 15.3 12 17M15 9.5h4M15 13h4"/>',
  globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3Z"/>'
};
function ico(p,w){ return svg(p,w||1.9); }
function fmtN(n){ return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g,'.'); }
function fmtP(n,d){ return n.toFixed(d==null?1:d).replace('.',','); }
function busy(btn,label,brand){
  btn._html=btn.innerHTML; btn.disabled=true;
  btn.innerHTML='<span class="spin'+(brand?' spin-brand':'')+'"></span>'+(label?'<span>'+label+'</span>':'');
}
function unbusy(btn){ btn.disabled=false; if(btn._html!=null) btn.innerHTML=btn._html; }
function countUp(el,to,ms,fmt){
  var from=0, t0=performance.now(); fmt=fmt||fmtN;
  (function step(t){
    var p=Math.min(1,(t-t0)/ms), e=1-Math.pow(1-p,3);
    el.textContent=fmt(from+(to-from)*e);
    if(p<1) requestAnimationFrame(step);
  })(t0);
}
function swapVal(el,html){ el.innerHTML=html; el.classList.remove('swap'); void el.offsetWidth; el.classList.add('swap'); }
function copyText(txt,btn,msg){
  try{ if(navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).catch(function(){}); }catch(e){}
  if(btn){
    if(btn._copyT) clearTimeout(btn._copyT); else btn._old=btn.innerHTML;
    btn.classList.add('is-ok');
    btn.innerHTML = btn.classList.contains('ic-sm') ? TICK : TICK.replace('<svg','<svg width="14" height="14"')+'<span>Disalin</span>';
    btn._copyT=setTimeout(function(){ btn.innerHTML=btn._old; btn.classList.remove('is-ok'); btn._copyT=null; },1500);
  }
  toast(msg||'Disalin ke clipboard');
}
var SCR='ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz0123456789';
function randStr(n){ var s=''; for(var i=0;i<n;i++) s+=SCR[Math.floor(Math.random()*SCR.length)]; return s; }
function scramble(el,final,ms,done){
  var t0=Date.now(); el.classList.add('scr');
  (function step(){
    var p=(Date.now()-t0)/ms;
    if(p>=1){ el.textContent=final; el.classList.remove('scr'); if(done) done(); return; }
    var n=Math.floor(final.length*p), s=final.slice(0,n);
    for(var i=n;i<final.length;i++){ var ch=final[i]; s+=(/[_•\-]/.test(ch)?ch:SCR[Math.floor(Math.random()*SCR.length)]); }
    el.textContent=s; setTimeout(step,38);
  })();
}
function rng(seed){ return function(){ seed|=0; seed=seed+0x6D2B79F5|0; var t=Math.imul(seed^seed>>>15,1|seed); t=t+Math.imul(t^t>>>7,61|t)^t; return ((t^t>>>14)>>>0)/4294967296; }; }
function strHash(s){ var h=2166136261; for(var i=0;i<s.length;i++){ h^=s.charCodeAt(i); h=Math.imul(h,16777619); } return h>>>0; }
function nowClock(){ var d=new Date(); return [d.getHours(),d.getMinutes(),d.getSeconds()].map(function(v){return (v<10?'0':'')+v;}).join(':'); }
function flashEl(el){ if(!el) return; el.classList.remove('flash'); void el.offsetWidth; el.classList.add('flash'); setTimeout(function(){ el.classList.remove('flash'); },1900); }

/* ---------- modal manager untuk sheet pengaturan ---------- */
var modalStack=[];
function openModal(id,focusSel){
  var s=$('#'+id); s._last=document.activeElement; s.hidden=false;
  var box=$('.sheet-box',s); box.style.animation='none'; void box.offsetWidth; box.style.animation='';
  modalStack.push(s);
  var f=focusSel?$(focusSel,s):null;
  setTimeout(function(){ if(f) f.focus(); },40);
}
function closeModal(s){
  if(typeof s==='string') s=$('#'+s);
  if(!s || s.hidden) return;
  s.hidden=true; modalStack=modalStack.filter(function(x){return x!==s;});
  if(s._onclose){ var fn=s._onclose; s._onclose=null; fn(); }
  if(s._last && s._last.focus) s._last.focus();
}
['ruleSheet','keySheet','hookSheet','confirmSheet'].forEach(function(id){
  var s=$('#'+id);
  s.addEventListener('click',function(e){
    if(e.target===s || e.target.closest('[data-close-sheet]')) closeModal(s);
  });
});
document.addEventListener('keydown',function(e){ if(e.key==='Escape' && modalStack.length) closeModal(modalStack[modalStack.length-1]); });
function confirmBox(title,msg,okLabel,cb){
  $('#cfTitle').textContent=title; $('#cfMsg').innerHTML=msg; $('#cfOk').textContent=okLabel||'Hapus';
  $('#cfOk').onclick=function(){ closeModal('confirmSheet'); cb(); };
  openModal('confirmSheet','#cfOk');
}

/* =====================================================================
   ATURAN VALIDASI
   ===================================================================== */
var RCAT={id:'Identitas',veh:'Kendaraan',fin:'Keuangan',prop:'Properti & aset',custom:'Kustom'};
var RACT={lolos:['Loloskan','pill-ok','LOLOSKAN'],tandai:['Tandai saja','pill-brand','TANDAI'],tinjau:['Tinjau manual','pill-warn','TINJAU'],tahan:['Tahan','pill-bad','TAHAN']};
var RFIELDS=['ocr.keyakinan','risiko.skor','wajah.kecocokan','ktp.nik.panjang','ktp.kode_wilayah','ktp.usia','paspor.sisa_berlaku',
  'stnk.no_rangka','stnk.masa_pajak','bpkb.no_rangka','bank.rasio_cicilan','bank.setoran_melingkar','bank.nominal_melingkar',
  'tanah.selisih_luas','emas.kadar','akta.nomor_ahu','gambar.dpi','gambar.blur'];
var ROPS=['<','≤','>','≥','=','≠','kosong','ada di'];
function R(id,cat,name,desc,join,conds,act,modes,on,hits){ return {id:id,cat:cat,name:name,desc:desc,join:join,conds:conds,act:act,modes:modes,on:on,notify:act==='tahan',hits:hits}; }
var RULES=[
  R('R-101','id','Format NIK & kode wilayah','Menahan NIK yang panjangnya salah atau kode provinsi/kabupaten tidak terdaftar di referensi wilayah.','ATAU',[['ktp.nik.panjang','≠','16'],['ktp.kode_wilayah','ada di','daftar_tidak_valid']],'tahan',['ktp','kk'],true,[1,2,1,0,2,1,1]),
  R('R-102','id','Kecocokan wajah rendah','Selfie tidak cukup mirip dengan foto pada dokumen identitas.','DAN',[['wajah.kecocokan','<','82%']],'tinjau',['ktp','passport'],true,[4,3,5,2,4,3,4]),
  R('R-103','id','Usia pemohon di luar batas','Pemohon di bawah 21 tahun atau di atas 65 tahun saat jatuh tempo.','ATAU',[['ktp.usia','<','21'],['ktp.usia','>','65']],'tinjau',['ktp'],true,[2,1,3,1,2,2,1]),
  R('R-104','id','Paspor hampir kedaluwarsa','Masa berlaku paspor kurang dari 6 bulan.','DAN',[['paspor.sisa_berlaku','<','180 hari']],'tandai',['passport'],true,[2,1,3,0,2,1,2]),
  R('R-201','veh','Nomor rangka STNK ≠ BPKB','Nomor rangka pada STNK dan BPKB dalam pengajuan yang sama berbeda.','DAN',[['stnk.no_rangka','≠','bpkb.no_rangka']],'tahan',['stnk','bpkb'],true,[1,0,1,1,0,1,2]),
  R('R-202','veh','BPKB sedang dijaminkan','Nomor rangka sudah tercatat sebagai agunan pada fasilitas aktif lain.','DAN',[['bpkb.no_rangka','ada di','jaminan_aktif']],'tahan',['bpkb'],true,[0,0,1,0,0,1,0]),
  R('R-203','veh','Pajak kendaraan terlambat','Masa pajak tahunan pada STNK sudah lewat.','DAN',[['stnk.masa_pajak','<','hari_ini']],'tandai',['stnk'],true,[5,4,6,3,5,4,6]),
  R('R-301','fin','Rasio cicilan di atas 35%','Total cicilan bulanan melebihi 35% dari rata-rata pemasukan di rekening koran.','DAN',[['bank.rasio_cicilan','>','35%']],'tinjau',['bank'],true,[3,4,2,5,3,4,3]),
  R('R-302','fin','Pola setoran melingkar','Dana masuk lalu keluar dengan nominal serupa berulang kali untuk menggelembungkan saldo.','DAN',[['bank.setoran_melingkar','≥','3 kali'],['bank.nominal_melingkar','≥','Rp 50 jt']],'tahan',['bank'],true,[1,0,1,1,0,2,1]),
  R('R-401','prop','Selisih luas sertifikat','Luas di SHM berbeda lebih dari 5% dibanding hasil ukur atau PBB.','DAN',[['tanah.selisih_luas','>','5%']],'tinjau',['tanah'],true,[1,1,0,2,1,0,1]),
  R('R-402','prop','Kadar emas di bawah standar','Sertifikat emas batangan menyatakan kadar kurang dari 99,9%.','DAN',[['emas.kadar','<','99,9%']],'tandai',['emas'],true,[1,2,1,0,1,2,1]),
  R('R-501','custom','Akta belum disahkan AHU','Akta pendirian tanpa nomor pengesahan Kemenkumham.','DAN',[['akta.nomor_ahu','kosong','']],'tinjau',['akta'],false,[0,1,0,0,1,0,0]),
  R('R-502','custom','Kualitas gambar rendah','Resolusi di bawah 200 dpi atau gambar buram, minta unggah ulang.','ATAU',[['gambar.dpi','<','200'],['gambar.blur','>','0,4']],'tinjau',['ktp','stnk','bpkb','kk','passport'],false,[4,3,5,2,4,3,3])
];
var rcat='all', ruleSeq=503, rpage=0, RPER=10;
function sum(a){ return a.reduce(function(s,v){return s+v;},0); }
function exprHTML(r){
  var parts=r.conds.map(function(c){
    return '<span class="rx-f">'+S(c[0])+'</span> <span class="rx-o">'+S(c[1])+'</span>'+(c[1]==='kosong'?'':' <span class="rx-v">'+S(c[2]||'…')+'</span>');
  });
  return '<span class="rx-kw">JIKA</span> '+parts.join(' <span class="rx-kw">'+r.join+'</span> ')+
    ' <span class="rx-kw">→</span> <span class="rx-a '+r.act+'">'+RACT[r.act][2]+'</span>';
}
function spark(v,color){
  var W=120,H=22,mx=Math.max.apply(null,v.concat([1]));
  var pts=v.map(function(x,i){ return (i*(W/(v.length-1))).toFixed(1)+','+(H-2-(x/mx)*(H-5)).toFixed(1); }).join(' ');
  return '<svg viewBox="0 0 '+W+' '+H+'" preserveAspectRatio="none" aria-hidden="true"><polyline points="'+pts+'" fill="none" stroke="'+color+'" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round" vector-effect="non-scaling-stroke"/></svg>';
}
var ACT_COL={lolos:'var(--ok)',tandai:'var(--brand)',tinjau:'var(--warn)',tahan:'var(--bad)'};
function ruleHTML(r){
  var nm=S(r.name);
  return '<div class="rl-item'+(r.on?'':' off')+'" data-rid="'+r.id+'">'+
    '<button class="switch sw-brand" role="switch" data-rtoggle aria-checked="'+r.on+'" aria-label="Aktifkan aturan '+nm+'"></button>'+
    '<div class="rl-main">'+
      '<div class="rl-head"><b>'+nm+'</b><span class="pill '+RACT[r.act][1]+'">'+RACT[r.act][0]+'</span><span class="rl-id">'+r.id+' · '+RCAT[r.cat]+'</span></div>'+
      (r.desc?'<p>'+S(r.desc)+'</p>':'')+
      '<code class="rl-expr">'+exprHTML(r)+'</code>'+
      '<div class="rl-modes">'+r.modes.map(function(m){ return '<span>'+S(MODE_BY_ID[m]?MODE_BY_ID[m].name:m)+'</span>'; }).join('')+'</div>'+
    '</div>'+
    '<div class="rl-stat"><b>'+sum(r.hits)+'</b><small>dipicu · 7 hari</small>'+spark(r.hits,ACT_COL[r.act])+'</div>'+
    '<div class="rl-acts">'+
      '<button class="ic-sm" data-redit aria-label="Ubah aturan '+nm+'" title="Ubah">'+ico(IC.edit)+'</button>'+
      '<button class="ic-sm" data-rdup aria-label="Duplikat aturan '+nm+'" title="Duplikat">'+ico(IC.dup)+'</button>'+
      '<button class="ic-sm danger" data-rdel aria-label="Hapus aturan '+nm+'" title="Hapus">'+ico(IC.trash)+'</button>'+
    '</div></div>';
}
function renderRules(flashId){
  var q=($('#ruleSearch').value||'').trim().toLowerCase();
  var list=RULES.filter(function(r){
    return (rcat==='all'||r.cat===rcat) && (!q || (r.name+' '+r.id+' '+r.desc).toLowerCase().indexOf(q)>-1);
  });
  var pages=Math.max(1,Math.ceil(list.length/RPER));
  if(flashId){ for(var fi=0;fi<list.length;fi++){ if(list[fi].id===flashId){ rpage=Math.floor(fi/RPER); break; } } }
  if(rpage>pages-1) rpage=pages-1; if(rpage<0) rpage=0;
  var rows=list.slice(rpage*RPER,rpage*RPER+RPER);
  $('#ruleList').innerHTML=rows.map(ruleHTML).join('');
  $('#ruleEmpty').hidden=list.length>0;
  var from=list.length?rpage*RPER+1:0, to=Math.min(list.length,rpage*RPER+RPER);
  var on=RULES.filter(function(r){return r.on;}).length;
  $('#rulePager').innerHTML=pagerHTML(rpage,pages,'rpage',from+'–'+to+' dari '+list.length+' aturan · <span data-ron>'+on+'</span> aktif');
  $$('#ruleFilters [data-rcat]').forEach(function(c){
    var k=c.getAttribute('data-rcat'), n=k==='all'?RULES.length:RULES.filter(function(r){return r.cat===k;}).length;
    c.textContent=(k==='all'?'Semua':RCAT[k])+' ('+n+')';
  });
  if(flashId) flashEl($('#ruleList [data-rid="'+flashId+'"]'));
  updateRuleKpis();
}
function updateRuleKpis(){
  var on=RULES.filter(function(r){return r.on;});
  $('#rkActive').textContent=on.length;
  $('#rkActiveFoot').textContent='dari '+RULES.length+' aturan · '+(RULES.length-on.length)+' nonaktif';
  $('#rkHits').textContent=fmtN(sum(on.map(function(r){return sum(r.hits);})));
}
$('#ruleFilters').addEventListener('click',function(e){
  var c=e.target.closest('[data-rcat]'); if(!c) return;
  rcat=c.getAttribute('data-rcat'); rpage=0;
  $$('#ruleFilters [data-rcat]').forEach(function(x){ x.setAttribute('aria-pressed',String(x===c)); });
  renderRules(); riseList('#ruleList');
});
$('#ruleSearch').addEventListener('input',function(){ rpage=0; renderRules(); });
function riseList(sel){ var el=$(sel); if(!el) return; el.classList.remove('rise'); void el.offsetWidth; el.classList.add('rise'); }
$('#rulePager').addEventListener('click',function(e){
  pagerClick(e,'rpage',function(){return rpage;},function(v){rpage=v;},function(){
    renderRules(); riseList('#ruleList');
    var c=$('#ruleFilters'); if(c && c.getBoundingClientRect().top<0) c.scrollIntoView({block:'start',behavior:'smooth'});
  });
});
function ruleById(id){ for(var i=0;i<RULES.length;i++) if(RULES[i].id===id) return RULES[i]; return null; }
$('#ruleList').addEventListener('click',function(e){
  var row=e.target.closest('[data-rid]'); if(!row) return;
  var r=ruleById(row.getAttribute('data-rid')); if(!r) return;
  if(e.target.closest('[data-rtoggle]')){
    r.on=!r.on;
    var sw=e.target.closest('[data-rtoggle]'); sw.setAttribute('aria-checked',String(r.on));
    row.classList.toggle('off',!r.on);
    var on=RULES.filter(function(x){return x.on;}).length;
    var ron=$('#rulePager [data-ron]'); if(ron) ron.textContent=on;
    updateRuleKpis(); markSimStale();
    toast(r.id+' '+(r.on?'diaktifkan':'dinonaktifkan'));
  } else if(e.target.closest('[data-redit]')){
    openRuleEditor(r);
  } else if(e.target.closest('[data-rdup]')){
    var c=JSON.parse(JSON.stringify(r));
    c.id='R-'+(ruleSeq++); c.name=r.name+' (salinan)'; c.on=false; c.hits=[0,0,0,0,0,0,0];
    RULES.splice(RULES.indexOf(r)+1,0,c);
    renderRules(c.id); toast('Aturan diduplikat sebagai '+c.id+' (nonaktif)');
  } else if(e.target.closest('[data-rdel]')){
    confirmBox('Hapus aturan ini?','Aturan <b>'+S(r.name)+'</b> ('+r.id+') akan dihapus dan berhenti dievaluasi pada dokumen baru. Riwayat pemicu lama tetap tersimpan.','Hapus aturan',function(){
      row.classList.add('leaving');
      setTimeout(function(){ RULES.splice(RULES.indexOf(r),1); renderRules(); markSimStale(); toast('Aturan '+r.id+' dihapus'); },300);
    });
  }
});
$('#ruleExport').addEventListener('click',function(){
  var btn=this; busy(btn,'Menyiapkan…',true);
  setTimeout(function(){
    unbusy(btn);
    var data={dibuat:new Date().toISOString(),ambang:thrSaved,aturan:RULES.map(function(r){
      return {id:r.id,kategori:r.cat,nama:r.name,aktif:r.on,gabung:r.join,kondisi:r.conds.map(function(c){return {field:c[0],operator:c[1],nilai:c[2]};}),aksi:r.act,mode:r.modes,notifikasi:r.notify};
    })};
    try{
      var a=document.createElement('a');
      a.href=URL.createObjectURL(new Blob([JSON.stringify(data,null,2)],{type:'application/json'}));
      a.download='aturan-validasi-verifika.json'; document.body.appendChild(a); a.click();
      setTimeout(function(){ URL.revokeObjectURL(a.href); a.remove(); },500);
    }catch(err){}
    toast('aturan-validasi-verifika.json diunduh · '+RULES.length+' aturan');
  },650);
});

/* ---------- ambang keputusan ---------- */
var thrSaved={review:40,hold:75,ocr:90,face:82}, thr={review:40,hold:75,ocr:90,face:82};
var THR_IN={review:'rReview',hold:'rHold',ocr:'rOcr',face:'rFace'};
function paintRange(el){ var p=(el.value-el.min)/(el.max-el.min)*100; el.style.setProperty('--p',p+'%'); }
function syncThr(src){
  var rv=+$('#rReview').value, hd=+$('#rHold').value;
  if(hd<rv+5){ if(src==='hold') rv=Math.max(10,hd-5); else hd=Math.min(95,rv+5); if(hd<rv+5) rv=hd-5; }
  $('#rReview').value=rv; $('#rHold').value=hd;
  var nt={review:rv,hold:hd,ocr:+$('#rOcr').value,face:+$('#rFace').value};
  Object.keys(THR_IN).forEach(function(k){
    var el=$('#'+THR_IN[k]); paintRange(el);
    var out=$('#o'+k.charAt(0).toUpperCase()+k.slice(1));
    var txt=nt[k]+((k==='ocr'||k==='face')?'%':'');
    if(out.textContent!==txt){ out.textContent=txt; if(src){ out.classList.add('bump'); clearTimeout(out._t); out._t=setTimeout(function(){out.classList.remove('bump');},420); } }
  });
  thr=nt;
  $('#zOk').style.flexBasis=nt.review+'%'; $('#zWarn').style.flexBasis=(nt.hold-nt.review)+'%'; $('#zBad').style.flexBasis=(100-nt.hold)+'%';
  $('#zOk span').textContent='Lolos 0–'+(nt.review-1);
  $('#zWarn span').textContent='Tinjau '+nt.review+'–'+(nt.hold-1);
  $('#zBad span').textContent='Tahan '+nt.hold+'+';
  var dirty=Object.keys(thr).some(function(k){return thr[k]!==thrSaved[k];});
  $('#thrDirty').hidden=!dirty; $('#thrSave').disabled=!dirty; $('#thrReset').disabled=!dirty;
  if(src) markSimStale();
}
Object.keys(THR_IN).forEach(function(k){ $('#'+THR_IN[k]).addEventListener('input',function(){ syncThr(k); }); });
$('#thrReset').addEventListener('click',function(){
  Object.keys(THR_IN).forEach(function(k){ $('#'+THR_IN[k]).value=thrSaved[k]; });
  syncThr('reset'); toast('Ambang dikembalikan ke konfigurasi tersimpan');
});
$('#thrSave').addEventListener('click',function(){
  var btn=this; busy(btn,'Menyimpan…'); $('#thrReset').disabled=true;
  setTimeout(function(){
    btn._html='Simpan ambang'; unbusy(btn);
    thrSaved={review:thr.review,hold:thr.hold,ocr:thr.ocr,face:thr.face};
    $('#thrMeta').textContent='Terakhir diubah oleh M. Alfian · baru saja';
    syncThr(); flashEl($('#thrCard .rl-band-track'));
    if(!$('#simRes').hidden) runSim(true);
    toast('Ambang keputusan disimpan · berlaku untuk dokumen berikutnya');
  },800);
});

/* ---------- simulasi dampak ---------- */
var SIM_N=600, SIM_DOCS=(function(){
  var r=rng(20260917), out=[];
  for(var i=0;i<SIM_N;i++){
    out.push({risk:Math.round(Math.pow(r(),22)*100), conf:99.9-Math.pow(r(),60)*30, face:r()<.45?99-Math.pow(r(),30)*45:null});
  }
  return out;
})();
function evalSim(t){
  var c=[0,0,0];
  SIM_DOCS.forEach(function(d,i){
    var lv=0;
    if(d.risk>=t.review) lv=1;
    if(d.risk>=t.hold) lv=2;
    if(d.conf<t.ocr) lv=Math.max(lv,1);
    if(d.face!=null && d.face<t.face) lv=Math.max(lv,1);
    RULES.forEach(function(ru){
      if(!ru.on || (ru.act!=='tinjau' && ru.act!=='tahan')) return;
      var p=sum(ru.hits)/1248*0.8;
      if(rng(i*7919+strHash(ru.id))()<p) lv=Math.max(lv, ru.act==='tahan'?2:1);
    });
    c[lv]++;
  });
  return c;
}
var simT=null;
function markSimStale(){
  if($('#simRes').hidden) return;
  $('#simRes').style.opacity='.45';
  $('#simGo').lastChild.textContent=' Jalankan ulang';
}
function runSim(quick){
  var N=+$('#simSet').value, btn=$('#simGo');
  clearInterval(simT);
  $('#simIdle').hidden=true; $('#simRes').hidden=true; $('#simRun').hidden=false;
  btn.disabled=true;
  var stages=['Memuat hasil OCR historis','Menerapkan ambang skor risiko','Mengevaluasi '+RULES.filter(function(r){return r.on;}).length+' aturan aktif','Membandingkan dengan konfigurasi tersimpan'];
  var dur=quick?700:Math.min(2400,1200+N/6), t0=Date.now();
  simT=setInterval(function(){
    var p=Math.min(1,(Date.now()-t0)/dur);
    $('#simBar').style.width=(p*100)+'%';
    $('#simCount').textContent=fmtN(N*p)+' / '+fmtN(N);
    $('#simStage').textContent=stages[Math.min(stages.length-1,Math.floor(p*stages.length))];
    if(p>=1){ clearInterval(simT); showSim(N); btn.disabled=false; }
  },60);
}
function showSim(N){
  var cur=evalSim(thrSaved), nxt=evalSim(thr);
  var sc=function(v){ return Math.round(v/SIM_N*N); };
  var OUT=[['Lolos otomatis','var(--ok)'],['Tinjau manual','var(--warn)'],['Tahan','var(--bad)']];
  var h='<div class="rl-legend"><span><i class="cur"></i>Tersimpan</span><span><i></i>Usulan</span><span style="margin-left:auto" class="mono">n = '+fmtN(N)+'</span></div>';
  OUT.forEach(function(o,i){
    var a=sc(cur[i]), b=sc(nxt[i]), d=b-a, mx=Math.max(a,b,1);
    var cls=d===0?'eq':((i===0?d<0:d>0)?'up':'dn');
    h+='<div class="rl-out"><span><i style="background:'+o[1]+'"></i>'+o[0]+'</span>'+
      '<span class="rl-nums"><span data-cu="'+a+'">0</span><span aria-hidden="true">→</span><b data-cu="'+b+'">0</b>'+
      '<span class="delta '+cls+'">'+(d>0?'+':d<0?'−':'±')+fmtN(Math.abs(d))+'</span></span>'+
      '<div class="rl-bars"><div class="cur"><i style="background:'+o[1]+'" data-w="'+(a/mx*100)+'"></i></div><div><i style="background:'+o[1]+'" data-w="'+(b/mx*100)+'"></i></div></div></div>';
  });
  var dRev=sc(nxt[1])-sc(cur[1]), dHold=sc(nxt[2])-sc(cur[2]);
  var per=N===1248?7:N===5310?30:0;
  var msg;
  if(dRev===0 && dHold===0) msg='Usulan menghasilkan keputusan yang sama dengan konfigurasi tersimpan.';
  else msg='Beban tinjau manual '+(dRev>=0?'naik ':'turun ')+'<b>'+fmtN(Math.abs(dRev))+' dokumen</b>'+(per?' (≈ '+fmtP(Math.abs(dRev)/per,1)+'/hari)':'')+
    ', dokumen ditahan '+(dHold>=0?'bertambah ':'berkurang ')+'<b>'+fmtN(Math.abs(dHold))+'</b>.';
  h+='<div class="rl-sum">'+SPARK.replace('<svg','<svg aria-hidden="true"')+'<span>'+msg+'</span></div>';
  var res=$('#simRes'); res.innerHTML=h; res.style.opacity=''; res.hidden=false; $('#simRun').hidden=true;
  res.classList.remove('rise'); void res.offsetWidth; res.classList.add('rise');
  $$('[data-cu]',res).forEach(function(el){ countUp(el,+el.getAttribute('data-cu'),700); });
  requestAnimationFrame(function(){ requestAnimationFrame(function(){ $$('[data-w]',res).forEach(function(el){ el.style.width=el.getAttribute('data-w')+'%'; }); }); });
  $('#simGo').lastChild.textContent=' Jalankan ulang';
}
$('#simGo').addEventListener('click',function(){ runSim(false); });
$('#simSet').addEventListener('change',function(){ markSimStale(); });

/* ---------- editor aturan ---------- */
var ed=null;
function openRuleEditor(r){
  ed=r?JSON.parse(JSON.stringify(r)):{id:null,cat:'custom',name:'',desc:'',join:'DAN',conds:[['ocr.keyakinan','<','85%']],act:'tinjau',modes:[current?current.id:'ktp'],on:true,notify:true,hits:[0,0,0,0,0,0,0]};
  $('#ruleSheetTitle').textContent=r?'Ubah aturan '+r.id:'Buat aturan validasi';
  $('#ruleSheetSub').textContent=r?'Perubahan berlaku untuk dokumen yang diproses setelah disimpan.':'Aturan dijalankan setelah OCR dan analisis AI selesai.';
  $('#reName').value=ed.name; $('#reName').removeAttribute('aria-invalid');
  $('#reCat').value=ed.cat; $('#reErr').hidden=true;
  $('#reNotify').setAttribute('aria-checked',String(!!ed.notify));
  $('#reSave').textContent=r?'Simpan perubahan':'Simpan aturan';
  renderEd(); openModal('ruleSheet','#reName');
}
function renderEd(){
  $('#reModes').innerHTML=MODES.map(function(m){
    return '<button type="button" class="chip" data-emode="'+m.id+'" aria-pressed="'+(ed.modes.indexOf(m.id)>-1)+'">'+S(m.name)+'</button>';
  }).join('');
  $$('#reJoin [data-join]').forEach(function(b){ b.setAttribute('aria-pressed',String(b.getAttribute('data-join')===ed.join)); });
  $$('#reAct [data-act]').forEach(function(b){ b.setAttribute('aria-pressed',String(b.getAttribute('data-act')===ed.act)); });
  renderConds(); renderPrev();
}
function renderConds(){
  $('#reConds').innerHTML=ed.conds.map(function(c,i){
    var fields=RFIELDS.indexOf(c[0])<0?RFIELDS.concat([c[0]]):RFIELDS;
    return '<div class="cond" data-ci="'+i+'">'+
      '<select class="select" data-cf aria-label="Field kondisi '+(i+1)+'">'+fields.map(function(f){return '<option'+(f===c[0]?' selected':'')+'>'+f+'</option>';}).join('')+'</select>'+
      '<select class="select" data-co aria-label="Operator kondisi '+(i+1)+'">'+ROPS.map(function(o){return '<option'+(o===c[1]?' selected':'')+'>'+S(o)+'</option>';}).join('')+'</select>'+
      '<input class="input mono" data-cv value="'+S(c[2])+'" placeholder="nilai"'+(c[1]==='kosong'?' disabled':'')+' aria-label="Nilai kondisi '+(i+1)+'">'+
      '<button type="button" class="ic-sm danger" data-cdel aria-label="Hapus kondisi '+(i+1)+'"'+(ed.conds.length<2?' disabled':'')+'>'+ico(IC.x,2.2)+'</button>'+
    '</div>';
  }).join('');
}
function renderPrev(){ $('#rePrev').innerHTML=exprHTML(ed); }
$('#reConds').addEventListener('input',function(e){
  var row=e.target.closest('[data-ci]'); if(!row) return;
  var c=ed.conds[+row.getAttribute('data-ci')];
  if(e.target.matches('[data-cf]')) c[0]=e.target.value;
  if(e.target.matches('[data-co]')){ c[1]=e.target.value; var v=$('[data-cv]',row); v.disabled=c[1]==='kosong'; if(v.disabled){ v.value=''; c[2]=''; } }
  if(e.target.matches('[data-cv]')){ c[2]=e.target.value; e.target.removeAttribute('aria-invalid'); }
  renderPrev();
});
$('#reConds').addEventListener('click',function(e){
  var d=e.target.closest('[data-cdel]'); if(!d || d.disabled) return;
  var row=d.closest('[data-ci]'); row.classList.add('leaving');
  setTimeout(function(){ ed.conds.splice(+row.getAttribute('data-ci'),1); renderConds(); renderPrev(); },220);
});
$('#reAddCond').addEventListener('click',function(){
  if(ed.conds.length>=5){ toast('Maksimal 5 kondisi per aturan'); return; }
  ed.conds.push(['risiko.skor','≥','']); renderConds(); renderPrev();
  var rows=$$('#reConds .cond'), last=rows[rows.length-1]; last.classList.add('slide-in'); $('[data-cv]',last).focus();
});
$('#reModes').addEventListener('click',function(e){
  var c=e.target.closest('[data-emode]'); if(!c) return;
  var id=c.getAttribute('data-emode'), i=ed.modes.indexOf(id);
  if(i>-1) ed.modes.splice(i,1); else ed.modes.push(id);
  c.setAttribute('aria-pressed',String(i<0));
});
$('#reJoin').addEventListener('click',function(e){
  var b=e.target.closest('[data-join]'); if(!b) return; ed.join=b.getAttribute('data-join');
  $$('#reJoin [data-join]').forEach(function(x){ x.setAttribute('aria-pressed',String(x===b)); }); renderPrev();
});
$('#reAct').addEventListener('click',function(e){
  var b=e.target.closest('[data-act]'); if(!b) return; ed.act=b.getAttribute('data-act');
  $$('#reAct [data-act]').forEach(function(x){ x.setAttribute('aria-pressed',String(x===b)); }); renderPrev();
});
$('#reNotify').addEventListener('click',function(){ ed.notify=this.getAttribute('aria-checked')!=='true'; this.setAttribute('aria-checked',String(ed.notify)); });
$('#reSave').addEventListener('click',function(){
  var btn=this, name=$('#reName').value.trim(), err='';
  var emptyV=ed.conds.filter(function(c){return c[1]!=='kosong' && !String(c[2]).trim();});
  if(!name){ err='Nama aturan wajib diisi.'; $('#reName').setAttribute('aria-invalid','true'); $('#reName').focus(); }
  else if(!ed.modes.length) err='Pilih minimal satu mode dokumen.';
  else if(emptyV.length){ err='Lengkapi nilai pada setiap kondisi.'; $$('#reConds [data-cv]').forEach(function(v){ if(!v.disabled && !v.value.trim()) v.setAttribute('aria-invalid','true'); }); }
  if(err){ $('#reErr').innerHTML=BANG.replace('<svg','<svg width="14" height="14"')+S(err); $('#reErr').hidden=false; return; }
  $('#reErr').hidden=true;
  ed.name=name; ed.cat=$('#reCat').value;
  busy(btn,'Menyimpan…');
  setTimeout(function(){
    unbusy(btn);
    var id;
    if(ed.id){ var r=ruleById(ed.id); if(r){ Object.keys(ed).forEach(function(k){ r[k]=ed[k]; }); } id=ed.id; toast('Aturan '+id+' diperbarui'); }
    else {
      ed.id='R-'+(ruleSeq++); ed.desc='Aturan kustom dibuat oleh M. Alfian.';
      ed.hits=[0,0,0,0,0,0,0].map(function(){return Math.floor(Math.random()*3);});
      RULES.unshift(ed); id=ed.id;
      rcat='all'; $('#ruleSearch').value='';
      $$('#ruleFilters [data-rcat]').forEach(function(x){ x.setAttribute('aria-pressed',String(x.getAttribute('data-rcat')==='all')); });
      toast('Aturan '+id+' dibuat dan langsung aktif');
    }
    $('#ruleSheet')._onclose=function(){
      renderRules(id); markSimStale();
      var el=$('#ruleList [data-rid="'+id+'"]'); if(el) el.scrollIntoView({block:'nearest',behavior:'smooth'});
    };
    closeModal('ruleSheet');
  },700);
});
$('#ruleNew').addEventListener('click',function(){ openRuleEditor(null); });
$('#reName').addEventListener('input',function(){ this.removeAttribute('aria-invalid'); });
$('#kName').addEventListener('input',function(){ this.removeAttribute('aria-invalid'); });

/* =====================================================================
   INTEGRASI & API
   ===================================================================== */
var env='live';
var KEYS={
  live:[
    {name:'LOS Produksi',key:'vk_live_8Fq2Lm7Rt4Wz9Xc3Vb6Nh1Jk5Pd09c2e',scopes:['ocr:write','validate:read'],used:'2 menit lalu',created:'03 Jan 2026',st:'on'},
    {name:'Core Banking Sync',key:'vk_live_Qe4Ty8Ui2Op6As1Df5Gh9Jk3Lz7a41b',scopes:['validate:read','webhook:manage'],used:'14 menit lalu',created:'11 Feb 2026',st:'on'},
    {name:'Mobile Onboarding',key:'vk_live_Zx3Cv7Bn1Mq5Wr9Et2Yu6Io4Pa8d7f0',scopes:['ocr:write'],used:'1 jam lalu',created:'26 Des 2025',st:'exp'},
    {name:'Uji Vendor Lama',key:'vk_live_Hj6Kl0Mn4Bv8Cx2Za7Sd1Fg5Hj9e3a8',scopes:['ocr:write','validate:write'],used:'21 Agu 2026',created:'02 Mar 2026',st:'off'}
  ],
  test:[
    {name:'Sandbox QA',key:'vk_test_Pa2Sd6Fg0Hj4Kl8Zx1Cv5Bn9Mq3b6c1',scopes:['ocr:write','validate:read','validate:write'],used:'5 menit lalu',created:'14 Agu 2026',st:'on'},
    {name:'Developer Lokal',key:'vk_test_Wr7Et1Yu5Io9Pa3Sd8Fg2Hj6Kl0f2d9',scopes:['ocr:write','validate:read'],used:'kemarin',created:'01 Sep 2026',st:'on'}
  ]
};
var KST={on:['Aktif','pill-ok'],exp:['Berakhir 9 hari','pill-warn'],off:['Dicabut','pill-mute']};
function maskKey(k){ return k.slice(0,12)+'••••••••'+k.slice(-4); }
var KPER=5, kpage={live:0,test:0};
function renderKeys(){
  var all=KEYS[env], pages=Math.max(1,Math.ceil(all.length/KPER));
  if(kpage[env]>pages-1) kpage[env]=pages-1;
  var st=kpage[env]*KPER;
  $('#keyBody').innerHTML=all.slice(st,st+KPER).map(function(k,j){
    var i=st+j;
    var off=k.st==='off';
    return '<tr data-ki="'+i+'"'+(off?' class="revoked"':'')+'>'+
      '<td><span class="t-name">'+S(k.name)+'</span><span class="t-sub">dibuat '+k.created+'</span></td>'+
      '<td><span class="ap-key"><code data-kval>'+(k.show?k.key:maskKey(k.key))+'</code>'+
        '<button class="ic-sm" data-kshow aria-label="'+(k.show?'Sembunyikan':'Tampilkan')+' kunci '+S(k.name)+'"'+(off?' disabled':'')+'>'+ico(k.show?IC.eyeOff:IC.eye,1.8)+'</button>'+
        '<button class="ic-sm" data-kcopy aria-label="Salin kunci '+S(k.name)+'"'+(off?' disabled':'')+'>'+ico(IC.copy,1.8)+'</button></span></td>'+
      '<td><span class="scopes">'+k.scopes.map(function(s){return '<span>'+s+'</span>';}).join('')+'</span></td>'+
      '<td class="mono" style="font-size:12px;white-space:nowrap">'+k.used+'</td>'+
      '<td><span class="pill '+KST[k.st][1]+'">'+KST[k.st][0]+'</span></td>'+
      '<td><span class="rl-acts" style="justify-content:flex-end">'+
        '<button class="ic-sm" data-krot title="Putar kunci" aria-label="Putar kunci '+S(k.name)+'"'+(off?' disabled':'')+'>'+ico(IC.rot,1.9)+'</button>'+
        '<button class="ic-sm danger" data-krev title="Cabut kunci" aria-label="Cabut kunci '+S(k.name)+'"'+(off?' disabled':'')+'>'+ico(IC.ban,1.9)+'</button>'+
      '</span></td></tr>';
  }).join('');
  KEYS[env].forEach(function(k,i){ if(k.fresh){ k.fresh=false; flashEl($('#keyBody [data-ki="'+i+'"]')); } });
  var act=all.filter(function(k){return k.st!=='off';}).length;
  $('#keyPager').innerHTML=pagerHTML(kpage[env],pages,'kpage',(all.length?st+1:0)+'–'+Math.min(all.length,st+KPER)+' dari '+all.length+' kunci · '+act+' aktif');
  $('#keySub').textContent= env==='live' ? 'Kunci untuk lingkungan produksi. Jangan simpan di kode sisi klien.' : 'Kunci sandbox — data uji, tidak ditagih, tidak menyentuh core system.';
}
$('#keyPager').addEventListener('click',function(e){
  pagerClick(e,'kpage',function(){return kpage[env];},function(v){kpage[env]=v;},function(){ renderKeys(); riseList('#keyBody'); });
});
$('#keyBody').addEventListener('click',function(e){
  var tr=e.target.closest('[data-ki]'); if(!tr) return;
  var k=KEYS[env][+tr.getAttribute('data-ki')], b;
  if((b=e.target.closest('[data-kshow]'))){
    k.show=!k.show; clearTimeout(k._t);
    var code=$('[data-kval]',tr); scramble(code,k.show?k.key:maskKey(k.key),320);
    b.innerHTML=ico(k.show?IC.eyeOff:IC.eye,1.8);
    if(k.show) k._t=setTimeout(function(){ k.show=false; if(!$('#view-api').hidden) renderKeys(); },8000);
  } else if((b=e.target.closest('[data-kcopy]'))){
    copyText(k.key,b,'Kunci '+k.name+' disalin');
  } else if((b=e.target.closest('[data-krot]'))){
    busy(b,'',true);
    var nk=k.key.slice(0,8)+randStr(32), code2=$('[data-kval]',tr);
    scramble(code2,k.show?nk:maskKey(nk),900,function(){
      k.key=nk; k.used='belum dipakai'; k.created='hari ini'; if(k.st==='exp') k.st='on';
      renderKeys(); flashEl($('#keyBody [data-ki="'+tr.getAttribute('data-ki')+'"]'));
      toast('Kunci diputar · kunci lama tetap berlaku 24 jam');
    });
  } else if(e.target.closest('[data-krev]')){
    confirmBox('Cabut API key?','Semua permintaan dengan kunci <b>'+S(k.name)+'</b> akan langsung ditolak dengan <span class="mono">401 Unauthorized</span>. Tindakan ini tidak bisa dibatalkan.','Cabut kunci',function(){
      k.st='off'; k.show=false; renderKeys(); flashEl(tr); toast('Kunci '+k.name+' dicabut');
    });
  }
});
/* buat kunci */
var newKey='';
$('#keyNew').addEventListener('click',function(){
  $('#kName').value=''; $('#kName').removeAttribute('aria-invalid'); $('#kIp').value=''; $('#kExp').value='90'; $('#kErr').hidden=true;
  $$('#kScopes input').forEach(function(c,i){ c.checked=i<2; });
  $('#keyForm').hidden=false; $('#keyDone').hidden=true; $('#kSave').hidden=false; $('#kCancel').textContent='Batal';
  $('#keySheetTitle').textContent='Buat API key';
  $('#keySheetSub').textContent='Lingkungan: '+(env==='live'?'Produksi':'Sandbox')+' · beri cakupan seminimal mungkin.';
  openModal('keySheet','#kName');
});
$('#kSave').addEventListener('click',function(){
  var btn=this, name=$('#kName').value.trim(), sc=$$('#kScopes input').filter(function(c){return c.checked;}).map(function(c){return c.value;});
  var err=!name?'Nama kunci wajib diisi.':!sc.length?'Pilih minimal satu cakupan akses.':'';
  if(err){ $('#kErr').innerHTML=BANG.replace('<svg','<svg width="14" height="14"')+err; $('#kErr').hidden=false; if(!name){ $('#kName').setAttribute('aria-invalid','true'); $('#kName').focus(); } return; }
  $('#kErr').hidden=true; busy(btn,'Membuat kunci…');
  setTimeout(function(){
    btn._html='Buat kunci'; unbusy(btn);
    newKey='vk_'+env+'_'+randStr(32);
    KEYS[env].unshift({name:name,key:newKey,scopes:sc,used:'belum dipakai',created:'hari ini',st:'on',fresh:true}); kpage[env]=0;
    $('#keyForm').hidden=true; $('#keyDone').hidden=false; $('#kSave').hidden=true; $('#kCancel').textContent='Selesai';
    $('#keySheetTitle').textContent='Kunci siap dipakai'; $('#keySheetSub').textContent='Lingkungan: '+(env==='live'?'Produksi':'Sandbox')+' · aktif sejak sekarang.';
    scramble($('#kNewVal'),newKey,700);
    $('#keySheet')._onclose=function(){ renderKeys(); };
  },900);
});
$('#kCopyNew').addEventListener('click',function(){ copyText(newKey,this,'API key baru disalin'); });

/* playground */
var BASE='https://api.verifika.pkp.co.id/v1';
var EP={
  extract:{m:'POST',p:'/documents/extract',ms:[1180,1650]},
  get:{m:'GET',p:'/validations/val_7Hq2Kp9',ms:[140,260]},
  decide:{m:'POST',p:'/validations/val_7Hq2Kp9/decision',ms:[180,320]}
};
function snippet(ep,lang){
  var e=EP[ep], url=BASE+e.p;
  if(lang==='curl'){
    if(ep==='extract') return 'curl -X POST '+url+' \\\n  -H "Authorization: Bearer $VERIFIKA_KEY" \\\n  -F "mode=ktp" \\\n  -F "file=@ktp_raka_pratama.jpg" \\\n  -F "features=face_match,tamper_check"';
    if(ep==='get') return 'curl '+url+' \\\n  -H "Authorization: Bearer $VERIFIKA_KEY"';
    return 'curl -X POST '+url+' \\\n  -H "Authorization: Bearer $VERIFIKA_KEY" \\\n  -H "Content-Type: application/json" \\\n  -d \'{"decision": "approve", "note": "Dokumen sesuai"}\'';
  }
  if(lang==='node'){
    var body = ep==='extract' ? '  body: form, // FormData: mode, file, features\n' : ep==='decide' ? '  body: JSON.stringify({ decision: "approve" }),\n' : '';
    return 'const res = await fetch("'+url+'", {\n  method: "'+e.m+'",\n  headers: { Authorization: `Bearer ${process.env.VERIFIKA_KEY}` },\n'+body+'});\nconst data = await res.json();';
  }
  var py='import os, requests\n\nres = requests.'+e.m.toLowerCase()+'(\n    "'+url+'",\n    headers={"Authorization": f"Bearer {os.environ[\'VERIFIKA_KEY\']}"},\n';
  if(ep==='extract') py+='    data={"mode": "ktp", "features": "face_match,tamper_check"},\n    files={"file": open("ktp_raka_pratama.jpg", "rb")},\n';
  if(ep==='decide') py+='    json={"decision": "approve", "note": "Dokumen sesuai"},\n';
  return py+')\nprint(res.json())';
}
function respJSON(ep){
  if(ep==='extract') return {id:'val_7Hq2Kp9',status:'validated',mode:'ktp',confidence:0.987,risk_score:12,
    fields:{nik:'3173051708940004',nama:'RAKA PRATAMA',ttl:'JAKARTA, 17-08-1994',jenis_kelamin:'LAKI-LAKI'},
    checks:{face_match:0.93,tamper:'pass',nik_format:'pass'},rules_triggered:[],processed_ms:1284};
  if(ep==='get') return {id:'val_7Hq2Kp9',status:'validated',decision:null,risk_score:12,created_at:'2026-09-17T09:31:44+07:00',reviewer:null};
  return {id:'val_7Hq2Kp9',status:'approved',decision:'approve',decided_by:'m.alfian',decided_at:'2026-09-17T09:42:10+07:00'};
}
function hl(src){
  var re=/("(?:[^"\\\n]|\\.)*"|`[^`\n]*`|'[^'\n]*'|\/\/[^\n]*|#[^\n]*|\b(?:const|await|import|print|curl|true|false|null)\b|(?:^|[ ])-[A-Za-z](?= )|\b\d+(?:\.\d+)?\b)/gm;
  var out='', last=0, m;
  while((m=re.exec(src))){
    var t=m[0], after=src.charAt(m.index+t.length);
    var cls=/^["`']/.test(t)?(after===':'?'ck':'cs'):/^(\/\/|#)/.test(t)?'cc':/^[ ]?-/.test(t)?'cn':/^\d/.test(t)?'cn':'ck';
    out+=S(src.slice(last,m.index))+'<span class="'+cls+'">'+S(t)+'</span>'; last=m.index+t.length;
  }
  return out+S(src.slice(last));
}
var pgLang='curl', pgBusy=false;
function renderCode(){ $('#pgCode').innerHTML=hl(snippet($('#pgEp').value,pgLang)); }
$('#pgCopy').innerHTML=ico(IC.copy,1.8);
$('#hCopySecret').innerHTML=ico(IC.copy,1.8);
$('#pgLangs').addEventListener('click',function(e){
  var c=e.target.closest('[data-lang]'); if(!c) return; pgLang=c.getAttribute('data-lang');
  $$('#pgLangs [data-lang]').forEach(function(x){ x.setAttribute('aria-pressed',String(x===c)); });
  renderCode();
});
$('#pgEp').addEventListener('change',renderCode);
$('#pgCopy').addEventListener('click',function(){ copyText(snippet($('#pgEp').value,pgLang),this,'Contoh kode disalin'); });
$('#pgSend').addEventListener('click',function(){
  if(pgBusy) return; pgBusy=true;
  var btn=this, ep=$('#pgEp').value, e=EP[ep];
  busy(btn,'Mengirim…');
  $('#pgStatus').innerHTML='<span class="wait-dots"><i></i><i></i><i></i></span> <span style="margin-left:4px">'+e.m+' '+e.p+'</span>';
  $('#pgLine').hidden=false;
  $('#pgOut').innerHTML='<span class="cc">// menunggu respons dari sandbox…</span>';
  var ms=Math.round(e.ms[0]+Math.random()*(e.ms[1]-e.ms[0]));
  setTimeout(function(){
    $('#pgLine').hidden=true;
    $('#pgStatus').innerHTML='<span class="code-pill c2" style="display:inline-block;padding:1px 7px">'+(ep==='decide'?'200 OK':'200 OK')+'</span> <span>'+fmtN(ms)+' ms</span>';
    var txt=JSON.stringify(respJSON(ep),null,2), i=0, out=$('#pgOut');
    (function type(){
      i=Math.min(txt.length,i+18);
      out.innerHTML='<span class="caret">'+S(txt.slice(0,i))+'</span>';
      out.scrollTop=out.scrollHeight;
      if(i<txt.length) setTimeout(type,16);
      else { out.innerHTML=hl(txt); out.scrollTop=0; unbusy(btn); pgBusy=false; addLog(e.m,e.p,200,ms,'Sandbox QA','test'); }
    })();
  },ms);
});

/* webhook */
var HEV=[['validation.completed','Validasi selesai'],['validation.review_required','Butuh tinjauan manual'],['document.rejected','Dokumen ditahan'],['fraud.detected','Indikasi pemalsuan'],['batch.completed','Batch selesai'],['rule.triggered','Aturan dipicu']];
var HOOKS=[
  {id:'wh1',url:'https://los.pkp.co.id/hooks/verifika',ev:['validation.completed','validation.review_required'],on:true,rate:'99,8%',last:'2 menit lalu'},
  {id:'wh2',url:'https://corebank.pkp.co.id/api/v2/kyc-callback',ev:['validation.completed','document.rejected'],on:true,rate:'100%',last:'9 menit lalu'},
  {id:'wh3',url:'https://alerts.pkp.co.id/fraud/ingest',ev:['document.rejected','fraud.detected'],on:true,rate:'92,4%',last:'31 menit lalu',fail:true}
];
var hookSeq=4;
function hostOf(u){ return u.replace(/^https?:\/\//,'').split('/')[0]; }
function hookHTML(h){
  return '<div class="wh-item'+(h.on?'':' off')+'" data-hid="'+h.id+'">'+
    '<div class="wh-top"><span class="wh-url">'+S(h.url)+'</span>'+
      '<span class="pill '+(h.on?(h.fail?'pill-warn':'pill-ok'):'pill-mute')+'">'+(h.on?(h.fail?'Ada kegagalan':'Aktif'):'Dijeda')+'</span>'+
      '<button class="switch sw-brand" role="switch" data-htoggle aria-checked="'+h.on+'" aria-label="Aktifkan endpoint '+S(hostOf(h.url))+'"></button></div>'+
    '<div class="wh-events">'+h.ev.map(function(v){return '<span>'+v+'</span>';}).join('')+'</div>'+
    '<div class="wh-meta" style="align-items:center"><span>Sukses 7 hari <b>'+h.rate+'</b></span><span>Terakhir <b>'+h.last+'</b></span>'+
      '<span style="margin-left:auto;display:flex;gap:4px">'+
        '<button class="btn btn-ghost btn-sm" data-htest>'+ico('<path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7Z"/>',2).replace('<svg','<svg width="14" height="14"')+'Kirim tes</button>'+
        '<button class="ic-sm danger" data-hdel aria-label="Hapus endpoint '+S(hostOf(h.url))+'" title="Hapus">'+ico(IC.trash)+'</button>'+
      '</span></div>'+
    '<div class="wh-flow" hidden>'+
      '<span class="wh-node"><span>'+ico(IC.logo,2)+'</span>Verifika</span>'+
      '<span class="wh-wire"><i></i></span>'+
      '<span class="wh-node dest"><span>'+ico(IC.globe,1.9)+'</span>'+S(hostOf(h.url))+'</span>'+
      '<span class="wh-res"></span>'+
    '</div></div>';
}
function renderHooks(flashId){
  $('#hookList').innerHTML=HOOKS.length?HOOKS.map(hookHTML).join(''):'<div class="empty">Belum ada endpoint. Tambahkan untuk menerima event.</div>';
  if(flashId) flashEl($('#hookList [data-hid="'+flashId+'"]'));
}
var DL=[
  {code:200,ev:'validation.completed',host:'los.pkp.co.id',ms:188,att:1,t:'09:41:12'},
  {code:503,ev:'fraud.detected',host:'alerts.pkp.co.id',ms:10002,att:3,t:'09:36:40'},
  {code:200,ev:'document.rejected',host:'corebank.pkp.co.id',ms:241,att:1,t:'09:36:39'},
  {code:200,ev:'validation.review_required',host:'los.pkp.co.id',ms:176,att:1,t:'09:27:05'},
  {code:200,ev:'validation.completed',host:'corebank.pkp.co.id',ms:205,att:1,t:'09:19:52'},
  {code:410,ev:'batch.completed',host:'legacy.pkp.co.id',ms:92,att:1,t:'08:58:17'},
  {code:200,ev:'validation.completed',host:'los.pkp.co.id',ms:163,att:1,t:'08:51:30'}
];
var dlOpen=-1;
(function(){ var nd=new Date(), base=nd.getHours()*3600+nd.getMinutes()*60+nd.getSeconds(), off=[58,330,331,880,1320,2575,2982];
  DL.forEach(function(d,i){ var x=(base-off[i]+86400)%86400; d.t=[Math.floor(x/3600),Math.floor(x%3600/60),x%60].map(function(v){return (v<10?'0':'')+v;}).join(':'); }); })();
function codeCls(c){ return c<300?'c2':c<500?'c4':'c5'; }
function dlPayload(d){
  return JSON.stringify({id:'evt_'+(strHash(d.t+d.ev)%1e8).toString(36),type:d.ev,created:'2026-09-17T'+d.t+'+07:00',data:{validation_id:'val_7Hq2Kp9',mode:'ktp',status:d.ev.split('.')[1],risk_score:d.ev==='fraud.detected'?88:12}},null,2);
}
function renderDl(newTop){
  $('#dlCount').textContent=DL.length+' event';
  $('#dlList').innerHTML=DL.slice(0,8).map(function(d,i){
    return '<button class="dl-item'+(i===0&&newTop?' slide-in':'')+'" data-dl="'+i+'" aria-expanded="'+(i===dlOpen)+'">'+
      '<span class="code-pill '+codeCls(d.code)+'">'+d.code+'</span>'+
      '<span style="min-width:0"><b>'+d.ev+'</b><small>'+d.host+' · '+fmtN(d.ms)+' ms · percobaan '+d.att+'</small></span>'+
      '<time>'+d.t+'</time></button>'+
      (i===dlOpen?'<div class="dl-pay slide-in"><pre class="ap-code">'+hl(dlPayload(d))+'</pre></div>':'');
  }).join('');
}
$('#dlList').addEventListener('click',function(e){
  var b=e.target.closest('[data-dl]'); if(!b) return;
  var i=+b.getAttribute('data-dl'); dlOpen=dlOpen===i?-1:i; renderDl();
});
$('#hookList').addEventListener('click',function(e){
  var it=e.target.closest('[data-hid]'); if(!it) return;
  var h=HOOKS.filter(function(x){return x.id===it.getAttribute('data-hid');})[0]; if(!h) return;
  var b;
  if((b=e.target.closest('[data-htoggle]'))){
    h.on=!h.on; renderHooks(); toast('Endpoint '+hostOf(h.url)+(h.on?' diaktifkan':' dijeda'));
  } else if((b=e.target.closest('[data-htest]'))){
    if(!h.on){ toast('Aktifkan endpoint terlebih dahulu'); return; }
    var flow=$('.wh-flow',it), wire=$('.wh-wire',it), dest=$('.wh-node.dest',it), res=$('.wh-res',it);
    busy(b,'Mengirim…',true);
    flow.hidden=false; flow.classList.remove('slide-in'); void flow.offsetWidth; flow.classList.add('slide-in');
    dest.classList.remove('ok','bad'); wire.classList.remove('go','back'); void wire.offsetWidth;
    res.innerHTML='<span class="wait-dots"><i></i><i></i><i></i></span><span>Mengirim event uji <span class="mono">'+h.ev[0]+'</span>…</span>';
    wire.classList.add('go');
    setTimeout(function(){
      var ms=h.fail?10002:Math.round(150+Math.random()*140), code=h.fail?503:200;
      if(h.fail){
        dest.classList.add('bad');
        res.innerHTML='<span class="code-pill c5" style="padding:1px 7px">503</span><span>Service Unavailable · batas waktu 10 dtk · dicoba ulang dalam 30 dtk</span>';
      } else {
        wire.classList.remove('go'); void wire.offsetWidth; wire.classList.add('go','back');
        dest.classList.add('ok');
        res.innerHTML='<span class="code-pill c2" style="padding:1px 7px">200</span><span>OK · '+ms+' ms · tanda tangan HMAC valid</span>';
        h.last='baru saja';
      }
      unbusy(b);
      DL.unshift({code:code,ev:h.ev[0],host:hostOf(h.url),ms:ms,att:1,t:nowClock()}); dlOpen=-1; renderDl(true);
      toast(h.fail?'Tes gagal · endpoint membalas 503':'Tes terkirim · endpoint membalas 200 OK');
    },h.fail?1300:950);
  } else if(e.target.closest('[data-hdel]')){
    confirmBox('Hapus endpoint?','Event tidak akan dikirim lagi ke <span class="mono">'+S(h.url)+'</span>. Pengiriman yang tertunda dibatalkan.','Hapus endpoint',function(){
      it.classList.add('leaving');
      setTimeout(function(){ HOOKS.splice(HOOKS.indexOf(h),1); renderHooks(); toast('Endpoint dihapus'); },300);
    });
  }
});
var hSecret='';
$('#hookNew').addEventListener('click',function(){
  $('#hUrl').value=''; $('#hUrl').removeAttribute('aria-invalid'); $('#hErr').hidden=true;
  $('#hEvents').innerHTML=HEV.map(function(v,i){
    return '<label class="pick"><input type="checkbox" value="'+v[0]+'"'+(i<2?' checked':'')+'><span style="min-width:0;flex:1"><b>'+v[0]+'</b><small>'+v[1]+'</small></span></label>';
  }).join('');
  hSecret='whsec_'+randStr(28); $('#hSecret').textContent=hSecret;
  openModal('hookSheet','#hUrl');
});
$('#hRegen').addEventListener('click',function(){ hSecret='whsec_'+randStr(28); scramble($('#hSecret'),hSecret,500); });
$('#hCopySecret').addEventListener('click',function(){ copyText(hSecret,this,'Signing secret disalin'); });
$('#hSave').addEventListener('click',function(){
  var btn=this, url=$('#hUrl').value.trim(), ev=$$('#hEvents input').filter(function(c){return c.checked;}).map(function(c){return c.value;});
  var err=!/^https:\/\/[a-z0-9.-]+\.[a-z]{2,}(\/\S*)?$/i.test(url)?'Masukkan URL HTTPS yang valid.':!ev.length?'Pilih minimal satu event.':'';
  if(err){ $('#hErr').innerHTML=BANG.replace('<svg','<svg width="14" height="14"')+err; $('#hErr').hidden=false; if(err.indexOf('URL')>-1){ $('#hUrl').setAttribute('aria-invalid','true'); $('#hUrl').focus(); } return; }
  busy(btn,'Memverifikasi…');
  setTimeout(function(){
    btn._html='Simpan endpoint'; unbusy(btn);
    var id='wh'+(hookSeq++);
    HOOKS.unshift({id:id,url:url,ev:ev,on:true,rate:'—',last:'belum ada'});
    $('#hookSheet')._onclose=function(){ renderHooks(id); };
    closeModal('hookSheet'); toast('Endpoint ditambahkan · coba "Kirim tes"');
  },900);
});
$('#hUrl').addEventListener('input',function(){ this.removeAttribute('aria-invalid'); });

/* konektor */
var CX=[
  {id:'dukcapil',name:'Dukcapil',sub:'Verifikasi NIK & biometrik',desc:'Mencocokkan NIK, nama, dan foto wajah dengan data kependudukan secara real time.',on:true,sync:'3 mnt lalu',ico:I.id},
  {id:'core',name:'Core Banking',sub:'Sinkron data nasabah',desc:'Mengirim hasil e-KYC tervalidasi ke CIF nasabah dan mencegah duplikasi data.',on:true,sync:'12 mnt lalu',ico:IC.server},
  {id:'los',name:'Loan Origination System',sub:'Pengajuan kredit',desc:'Meneruskan dokumen agunan (STNK, BPKB, SHM) beserta keputusan validasi ke LOS.',on:true,sync:'1 mnt lalu',ico:IC.credit},
  {id:'s3',name:'Penyimpanan objek',sub:'Kompatibel S3',desc:'Mengarsipkan dokumen asli terenkripsi AES-256 sesuai kebijakan retensi 90 hari.',on:true,sync:'baru saja',ico:IC.cloud},
  {id:'ahu',name:'AHU Online',sub:'Badan hukum',desc:'Memvalidasi nomor pengesahan akta pendirian beserta susunan pengurus perusahaan.',on:false,ico:I.deed},
  {id:'slik',name:'SLIK OJK',sub:'Riwayat kredit',desc:'Menarik kolektibilitas dan fasilitas aktif debitur untuk melengkapi skor risiko.',on:false,ico:I.bank},
  {id:'smtp',name:'Email SMTP',sub:'Notifikasi',desc:'Mengirim ringkasan harian dan peringatan antrean tinjau ke kotak masuk analis.',on:false,ico:IC.mail},
  {id:'chat',name:'Slack / Teams',sub:'Peringatan real time',desc:'Mengirim peringatan indikasi pemalsuan ke kanal tim fraud dalam hitungan detik.',on:false,ico:IC.chat}
];
var cxFilter='all';
function cxHTML(c){
  var foot;
  if(c.busy) foot='<div class="cx-prog"><span><span class="spin spin-brand" style="width:12px;height:12px;border-width:2px"></span><span data-cxstep>Mengautentikasi kredensial…</span></span><div class="b-prog"><i data-cxbar style="width:6%"></i></div></div>';
  else if(c.on) foot='<span class="hint">Sinkron '+c.sync+'</span>'+
    '<button class="ic-sm" data-cxtest title="Uji koneksi" aria-label="Uji koneksi '+S(c.name)+'">'+ico(IC.rot,1.9)+'</button>'+
    '<button class="btn btn-ghost btn-sm" data-cxoff>Putuskan</button>';
  else foot='<span class="hint">Belum terhubung</span><button class="btn btn-primary btn-sm" data-cxon>'+ico(IC.plug,2).replace('<svg','<svg width="14" height="14"')+'Hubungkan</button>';
  return '<div class="cx'+(c.on?' on':'')+'" data-cx="'+c.id+'">'+
    '<div class="cx-top"><span class="cx-ico">'+ico(c.ico,1.8)+'</span><div style="min-width:0"><h4>'+S(c.name)+'</h4><small>'+S(c.sub)+'</small></div>'+
      (c.on?'<span class="pill pill-ok">'+(c.justOn?'<span class="pop-ok">'+TICK.replace('<svg','<svg width="11" height="11"')+'</span>':'')+'Terhubung</span>':'<span class="pill pill-mute">Nonaktif</span>')+'</div>'+
    '<p>'+S(c.desc)+'</p><div class="cx-foot">'+foot+'</div></div>';
}
function renderCx(){
  var list=CX.filter(function(c){ return cxFilter==='all' || (cxFilter==='on'?c.on:!c.on); });
  $('#cxGrid').innerHTML=list.length?list.map(cxHTML).join(''):'<div class="empty card" style="grid-column:1/-1">Tidak ada konektor di kategori ini.</div>';
  CX.forEach(function(c){ c.justOn=false; });
  var on=CX.filter(function(c){return c.on;}).length;
  $$('#cxFilters [data-cx]').forEach(function(b){
    var k=b.getAttribute('data-cx'); b.textContent=(k==='all'?'Semua':k==='on'?'Terhubung':'Belum terhubung')+' ('+(k==='all'?CX.length:k==='on'?on:CX.length-on)+')';
  });
}
function cxById(id){ return CX.filter(function(c){return c.id===id;})[0]; }
$('#cxFilters').addEventListener('click',function(e){
  var b=e.target.closest('[data-cx]'); if(!b) return; cxFilter=b.getAttribute('data-cx');
  $$('#cxFilters [data-cx]').forEach(function(x){ x.setAttribute('aria-pressed',String(x===b)); });
  renderCx(); $('#cxGrid').classList.remove('rise'); void $('#cxGrid').offsetWidth; $('#cxGrid').classList.add('rise');
});
$('#cxGrid').addEventListener('click',function(e){
  var card=e.target.closest('[data-cx]'); if(!card) return;
  var c=cxById(card.getAttribute('data-cx')), b;
  if(e.target.closest('[data-cxon]')){
    c.busy=true; card.outerHTML=cxHTML(c);
    var steps=['Mengautentikasi kredensial…','Menguji koneksi endpoint…','Menyinkronkan skema data…'], k=0;
    var tick=function(){
      var el=$('#cxGrid [data-cx="'+c.id+'"]');
      if(k<steps.length){
        if(el){ $('[data-cxstep]',el).textContent=steps[k]; $('[data-cxbar]',el).style.width=((k+1)/steps.length*100)+'%'; }
        k++; setTimeout(tick,620);
      } else {
        c.busy=false; c.on=true; c.justOn=true; c.sync='baru saja';
        if(el){ el.outerHTML=cxHTML(c); c.justOn=false; flashEl($('#cxGrid [data-cx="'+c.id+'"]')); }
        renderCxCounts(); toast(c.name+' berhasil terhubung');
      }
    };
    setTimeout(tick,80);
  } else if((b=e.target.closest('[data-cxtest]'))){
    busy(b,'',true);
    setTimeout(function(){
      c.sync='baru saja'; var el=$('#cxGrid [data-cx="'+c.id+'"]'); if(el) el.outerHTML=cxHTML(c);
      toast('Koneksi '+c.name+' sehat · '+Math.round(90+Math.random()*120)+' ms');
    },900);
  } else if(e.target.closest('[data-cxoff]')){
    confirmBox('Putuskan '+S(c.name)+'?','Verifika berhenti mengirim dan menarik data dari '+S(c.name)+'. Kredensial tersimpan akan dihapus.','Putuskan',function(){
      c.on=false; renderCx(); toast(c.name+' diputuskan');
    });
  }
});
function renderCxCounts(){
  var on=CX.filter(function(c){return c.on;}).length;
  $$('#cxFilters [data-cx]').forEach(function(b){
    var k=b.getAttribute('data-cx'); b.textContent=(k==='all'?'Semua':k==='on'?'Terhubung':'Belum terhubung')+' ('+(k==='all'?CX.length:k==='on'?on:CX.length-on)+')';
  });
}

/* log permintaan */
var LOG_EP=[['POST','/v1/documents/extract',900,2300],['GET','/v1/validations/val_{id}',40,190],['POST','/v1/validations/val_{id}/decision',70,240],['GET','/v1/rules',30,90],['POST','/v1/batches',160,420],['GET','/v1/batches/b_{id}',40,130],['PATCH','/v1/webhooks/wh_{id}',60,160]];
var LOG_KEYS={live:['LOS Produksi','Core Banking Sync','Mobile Onboarding'],test:['Sandbox QA','Developer Lokal']};
function mkLog(r,envk,t){
  var e=LOG_EP[Math.floor(r()*LOG_EP.length)], x=r(), code;
  if(envk==='live') code = x<.93?(e[0]==='POST'&&e[1]==='/v1/batches'?201:200) : x<.955?422 : x<.97?401 : x<.98?404 : x<.99?429 : x<.996?500:503;
  else code = x<.8?200 : x<.9?422 : x<.95?400 : x<.98?401:404;
  var ms = code>=400&&code<500 ? Math.round(20+r()*60) : code>=500 ? Math.round(3000+r()*7000) : Math.round(e[2]+r()*(e[3]-e[2]));
  var id=Math.floor(r()*1e9).toString(36);
  return {t:t,m:e[0],p:e[1].replace('{id}',id.slice(0,6)),code:code,ms:ms,key:LOG_KEYS[envk][Math.floor(r()*LOG_KEYS[envk].length)],rid:'req_'+Math.floor(r()*1e12).toString(36).slice(0,8)};
}
var LOGS={live:[],test:[]};
['live','test'].forEach(function(k){
  var r=rng(k==='live'?91:17), nd=new Date(), sec=nd.getHours()*3600+nd.getMinutes()*60+nd.getSeconds()-4;
  for(var i=0;i<(k==='live'?64:28);i++){
    sec-=Math.floor(2+r()*(k==='live'?18:80));
    var sx=(sec+86400)%86400, hh=Math.floor(sx/3600), mm=Math.floor(sx%3600/60), ss=sx%60;
    LOGS[k].push(mkLog(r,k,[hh,mm,ss].map(function(v){return (v<10?'0':'')+v;}).join(':')));
  }
});
var lcode='all', lpage=0, lOpen=null, LPER=10, liveT=null, liveRng=rng(4242);
function logFiltered(){
  var q=($('#logSearch').value||'').trim().toLowerCase();
  return LOGS[env].filter(function(l){
    return (lcode==='all'||String(l.code).charAt(0)===lcode) && (!q || (l.p+' '+l.rid+' '+l.key).toLowerCase().indexOf(q)>-1);
  });
}
function logDetail(l){
  var req={method:l.m,path:l.p,headers:{authorization:'Bearer vk_'+env+'_••••'+l.rid.slice(-4),'x-request-id':l.rid}};
  if(l.m!=='GET') req.body = l.p.indexOf('extract')>-1 ? {mode:'ktp',file:'ktp_raka_pratama.jpg (1,8 MB)'} : {decision:'approve'};
  var res = l.code<300 ? {status:l.code,id:'val_7Hq2Kp9',risk_score:12} :
    l.code===422 ? {status:422,error:'unprocessable_document',message:'Gambar terlalu buram untuk dibaca (blur 0,62).'} :
    l.code===401 ? {status:401,error:'invalid_api_key',message:'Kunci tidak dikenali atau sudah dicabut.'} :
    l.code===429 ? {status:429,error:'rate_limited',message:'Melebihi 120 permintaan/menit.',retry_after:18} :
    l.code===404 ? {status:404,error:'not_found',message:'Sumber daya tidak ditemukan.'} :
    l.code===400 ? {status:400,error:'bad_request',message:'Field "mode" wajib diisi.'} :
    {status:l.code,error:'upstream_unavailable',message:'Layanan OCR sedang sibuk, silakan coba ulang.'};
  return '<tr class="lg-det"><td colspan="7"><div class="lg-det-grid slide-in">'+
    '<div><span class="eyebrow">Permintaan</span><pre class="ap-code">'+hl(JSON.stringify(req,null,2))+'</pre></div>'+
    '<div><span class="eyebrow">Respons · '+fmtN(l.ms)+' ms</span><pre class="ap-code">'+hl(JSON.stringify(res,null,2))+'</pre></div>'+
  '</div></td></tr>';
}
function renderLogs(newRid){
  var list=logFiltered(), pages=Math.max(1,Math.ceil(list.length/LPER));
  if(lpage>pages-1) lpage=pages-1;
  var rows=list.slice(lpage*LPER,lpage*LPER+LPER);
  $('#logBody').innerHTML=rows.map(function(l){
    var w=Math.round(6+Math.min(1,Math.sqrt(l.ms/10000))*58);
    return '<tr data-rid="'+l.rid+'" class="'+(l.rid===newRid?'slide-in ':'')+(l.rid===lOpen?'lg-open':'')+'">'+
      '<td class="mono" style="font-size:12px;white-space:nowrap">'+l.t+'</td>'+
      '<td><span class="meth '+l.m.toLowerCase()+'">'+l.m+'</span></td>'+
      '<td class="mono" style="font-size:12px;white-space:nowrap">'+S(l.p)+'</td>'+
      '<td><span class="code-pill '+codeCls(l.code)+'" style="display:inline-block;width:40px">'+l.code+'</span></td>'+
      '<td><span class="lat"><i class="'+(l.ms>1500?'slow':'')+'" style="width:'+w+'px"></i>'+fmtN(l.ms)+' ms</span></td>'+
      '<td style="white-space:nowrap;font-size:12.5px">'+S(l.key)+'</td>'+
      '<td class="mono" style="font-size:11.5px;color:var(--muted-2)">'+l.rid+'</td></tr>'+
      (l.rid===lOpen?logDetail(l):'');
  }).join('');
  $('#logEmpty').hidden=list.length>0;
  var from=list.length?lpage*LPER+1:0, to=Math.min(list.length,lpage*LPER+LPER);
  $('#logFoot').innerHTML=pagerHTML(lpage,pages,'lpage',from+'–'+to+' dari '+fmtN(list.length)+' permintaan');
}
function logSkeleton(){
  $('#logBody').innerHTML=[0,1,2,3,4,5].map(function(){
    return '<tr><td colspan="7"><div class="sk-row">'+skLine('64px',10)+skLine('44px',16)+skLine('28%',10)+skLine('40px',16)+skLine('14%',10)+skLine('12%',10)+'</div></td></tr>';
  }).join('');
  $('#logFoot').innerHTML='<span class="pager-info">Memuat log…</span>';
  setTimeout(function(){ renderLogs(); },460);
}
$('#logFoot').addEventListener('click',function(e){ pagerClick(e,'lpage',function(){return lpage;},function(v){lpage=v;},function(){ renderLogs(); }); });
$('#logFilters').addEventListener('click',function(e){
  var c=e.target.closest('[data-lcode]'); if(!c) return; lcode=c.getAttribute('data-lcode'); lpage=0; lOpen=null;
  $$('#logFilters [data-lcode]').forEach(function(x){ x.setAttribute('aria-pressed',String(x===c)); });
  renderLogs();
});
$('#logSearch').addEventListener('input',function(){ lpage=0; renderLogs(); });
$('#logBody').addEventListener('click',function(e){
  var tr=e.target.closest('tr[data-rid]'); if(!tr) return;
  var id=tr.getAttribute('data-rid'); lOpen=lOpen===id?null:id; renderLogs();
});
function addLog(m,p,code,ms,key,envk){
  var l={t:nowClock(),m:m,p:p,code:code,ms:ms,key:key,rid:'req_'+randStr(8).toLowerCase()};
  LOGS[envk].unshift(l);
  if(envk===env && !$('#atab-logs').hidden && lpage===0) renderLogs(l.rid);
  return l;
}
$('#liveSw').addEventListener('click',function(){
  var on=this.getAttribute('aria-checked')!=='true';
  this.setAttribute('aria-checked',String(on)); $('#liveLbl').classList.toggle('on',on);
  clearInterval(liveT);
  if(on){
    toast('Streaming log langsung aktif');
    liveT=setInterval(function(){
      if($('#view-api').hidden || $('#atab-logs').hidden) return;
      var l=mkLog(liveRng,env,nowClock()); LOGS[env].unshift(l);
      if(lpage===0) renderLogs(l.rid);
      else $('#logFoot .pager-info').textContent='+'+1+' permintaan baru · kembali ke halaman 1';
      var kv=$('#akReq'), n=+kv.textContent.replace(/\./g,'')+1; kv.textContent=fmtN(n);
    },1900);
  } else toast('Streaming log dihentikan');
});

/* tab & lingkungan */
var AKPI={
  live:{req:18420,reqF:'<span class="trend trend-up">'+svg('<path d="m6 15 6-6 6 6"/>',2.4)+'6,2%</span> dibanding kemarin',ok:'99,62<small>%</small>',okF:'70 error 5xx · 24 jam',lat:'412<small> ms</small>',latF:'SLA 800 ms · aman',wh:'2.184',whF:'3 gagal · dicoba ulang otomatis'},
  test:{req:1206,reqF:'<span class="trend trend-up">'+svg('<path d="m6 15 6-6 6 6"/>',2.4)+'18,4%</span> dibanding kemarin',ok:'97,41<small>%</small>',okF:'31 error 4xx · mayoritas 422',lat:'388<small> ms</small>',latF:'Tanpa SLA di sandbox',wh:'146',whF:'0 gagal'}
};
function paintApiKpi(anim){
  var d=AKPI[env];
  if(anim){ countUp($('#akReq'),d.req,650); $('#akReq').classList.remove('swap'); void $('#akReq').offsetWidth; $('#akReq').classList.add('swap'); }
  else $('#akReq').textContent=fmtN(d.req);
  $('#akReqF').innerHTML=d.reqF; $('#akOkF').textContent=d.okF; $('#akLatF').textContent=d.latF; $('#akWhF').textContent=d.whF;
  if(anim){ swapVal($('#akOk'),d.ok); swapVal($('#akLat'),d.lat); swapVal($('#akWh'),d.wh); }
  else { $('#akOk').innerHTML=d.ok; $('#akLat').innerHTML=d.lat; $('#akWh').innerHTML=d.wh; }
}
$('#envTabs').addEventListener('click',function(e){
  var b=e.target.closest('[data-env]'); if(!b || b.getAttribute('data-env')===env) return;
  env=b.getAttribute('data-env');
  $$('#envTabs [data-env]').forEach(function(x){ x.setAttribute('aria-pressed',String(x===b)); });
  paintApiKpi(true); renderKeys(); lpage=0; lOpen=null;
  if(!$('#atab-logs').hidden) logSkeleton(); else renderLogs();
  var pane=$('#view-api .tabpane:not([hidden])'); if(pane){ pane.classList.remove('rise'); void pane.offsetWidth; pane.classList.add('rise'); }
  toast('Beralih ke lingkungan '+(env==='live'?'Produksi':'Sandbox'));
});
var curAtab='keys';
function setAtab(t){
  curAtab=t;
  $$('#apTabs [data-atab]').forEach(function(x){ x.setAttribute('aria-pressed',String(x.getAttribute('data-atab')===t)); });
  ['keys','hooks','conn','logs'].forEach(function(k){
    var p=$('#atab-'+k); p.hidden=k!==t;
    if(k===t){ p.classList.remove('rise'); void p.offsetWidth; p.classList.add('rise'); }
  });
  if(t==='logs'){ lOpen=null; logSkeleton(); }
}
$('#apTabs').addEventListener('click',function(e){
  var b=e.target.closest('[data-atab]'); if(!b) return; setAtab(b.getAttribute('data-atab'));
});

/* render awal */
syncThr(); renderRules(); renderKeys(); renderCode(); renderHooks(); renderDl(); renderCx(); renderLogs(); paintApiKpi(false);

})();
