# Verifika — OCR & Document Validation

**Verifika** adalah prototipe UI/UX untuk aplikasi verifikasi dokumen berbasis OCR + AI. Prototipe ini mensimulasikan alur end-to-end mulai dari login, pemilihan jenis dokumen, pemindaian/unggah, ekstraksi data, analisis risiko, hingga dashboard dan riwayat validasi — semuanya berjalan di sisi klien (front-end only) dengan data simulasi (mock data), tanpa backend maupun engine OCR sungguhan.

> ⚠️ **Catatan penting**: Ini adalah *design prototype*, bukan aplikasi produksi. Tidak ada proses OCR, autentikasi, atau penyimpanan data yang nyata — semua hasil ekstraksi, skor risiko, notifikasi, dan riwayat adalah data contoh (dummy) untuk keperluan demonstrasi alur dan tampilan.

## ✨ Fitur

### Autentikasi
- Form login (email, password, captcha) dengan validasi
- Alur lupa password + verifikasi OTP
- Loading/boot sequence saat masuk ke aplikasi

### 11 Mode Dokumen
Setiap mode memiliki field ekstraksi, rekomendasi fitur AI, dan contoh temuan yang berbeda sesuai karakteristik dokumennya:

| Mode | Contoh Fitur AI |
|---|---|
| KTP / e-KTP | Deteksi wajah & pencocokan foto, validasi NIK |
| STNK | Pencocokan silang dengan BPKB |
| BPKB | Verifikasi hologram & watermark, deteksi BPKB ganda |
| Surat Tanah (SHM) | Deteksi manipulasi dokumen |
| Surat Emas | Verifikasi sertifikat keaslian |
| Surat Investasi | Validasi tanda tangan & stempel |
| Paspor | Pembacaan MRZ, deteksi pemalsuan |
| Kartu Keluarga (KK) | Pencocokan anggota keluarga |
| Rekening Koran | Deteksi anomali transaksi |
| Akta Pendirian Perusahaan | Ekstraksi struktur kepemilikan |
| Lainnya (zero-shot) | Ekstraksi dokumen generik tanpa template |

### Alur Pemindaian & Ekstraksi
- Ambil foto / unggah dokumen dengan preview real-time
- Animasi pemindaian (scanning overlay, grid, corner bracket) selama proses ekstraksi
- Panel hasil ekstraksi per-field lengkap dengan tingkat keyakinan (confidence score)
- Analisis risiko & temuan (findings) otomatis dengan status ok/warn/bad

### Unggah Massal (Batch Upload)
- Unggah banyak dokumen sekaligus
- Detail per berkas (per-file detail view)
- Simulasi tambah berkas / unggah ulang

### Dashboard
- Ringkasan KPI (jumlah validasi, tingkat keberhasilan, dsb.)
- Grafik volume pemrosesan harian (stacked area chart, interaktif dengan tooltip)
- Daftar aktivitas terbaru dengan paginasi
- Layout menyesuaikan tinggi layar secara dinamis (fit-to-screen, tanpa scroll di desktop)

### Riwayat Validasi
- Tabel riwayat dengan paginasi

### Notifikasi & Profil
- Dropdown notifikasi di navbar, detail notifikasi terintegrasi ke halaman Profil
- Halaman Profil dengan tab Profil / Keamanan / Notifikasi
- Dropdown akun (Profil, Keluar)

### Aturan Validasi
- Ambang keputusan global (tinjau manual, tahan otomatis, keyakinan OCR, kecocokan wajah) dengan slider dan pita zona risiko
- Simulasi dampak terhadap data historis sebelum ambang disimpan
- Daftar aturan dengan filter kategori, pencarian, toggle aktif, duplikat, hapus, dan pagination (10 per halaman)
- Editor aturan (JIKA … MAKA …) dengan pratinjau ekspresi dan ekspor JSON

### Integrasi & API
- Lingkungan Produksi / Sandbox
- API Keys: tampilkan/sembunyikan, salin, putar, cabut, buat key baru, dan pagination
- Playground "Coba API" (cURL, Node.js, Python) dengan respons JSON
- Webhook dengan animasi kirim tes, konektor (Dukcapil, Core Banking, LOS, dll.), dan log permintaan dengan mode streaming

### Dokumen UX (`/ux/`)
- Information Architecture, User Flow (5 alur), Atomic Research, dan Proto Persona — berbasis asumsi, perlu divalidasi dengan riset pengguna

### Lainnya
- Sepenuhnya responsif (mobile, tablet, desktop, hingga layar ultra-lebar)
- Animasi loading/skeleton di setiap perpindahan halaman yang memerlukan pemrosesan
- Tema terang (light theme) yang konsisten, brand color indigo

## 🙌 Kontribusi

Karena masih berupa prototipe desain, isu (issue) dan saran terkait UX, aksesibilitas, atau responsivitas sangat diterima.
