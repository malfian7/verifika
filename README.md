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

## 🛠️ Tech Stack

Dibangun **tanpa build tool maupun framework**:

- **HTML5** — markup halaman (`index.html`, `ux/index.html`)
- **CSS3** — custom properties (design tokens), Flexbox & Grid, animasi CSS keyframes (`assets/css/style.css`)
- **Vanilla JavaScript** — seluruh interaksi, grafik SVG tanpa library charting, ikon inline SVG (`assets/js/app.js`)
- **Google Fonts** — [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) & [IBM Plex Mono](https://fonts.google.com/specimen/IBM+Plex+Mono)

Tidak ada dependensi npm dan tidak ada langkah build.

## 📁 Struktur Proyek

```
.
├── index.html               # Prototipe aplikasi Verifika
├── assets/
│   ├── css/style.css        # Semua style aplikasi
│   ├── js/app.js            # Semua logika & interaksi aplikasi
│   └── icons/               # Favicon SVG/PNG, apple-touch-icon, ikon PWA
├── ux/
│   ├── index.html           # Dokumen UX (IA, user flow, atomic research, persona)
│   └── assets/              # ux.css & ux.js
├── favicon.ico              # Favicon fallback (16/32/48 px)
├── site.webmanifest         # Nama & ikon aplikasi untuk browser/ponsel
├── .nojekyll                # Agar GitHub Pages menyajikan file apa adanya
└── README.md
```

Semua path ditulis **relatif** (tanpa `/` di depan), jadi tetap jalan saat di-deploy ke `https://<username>.github.io/<nama-repo>/`.

## 🚀 Menjalankan Secara Lokal

```bash
# Python
python3 -m http.server 8080

# atau Node.js
npx serve .
```

Buka `http://localhost:8080/` untuk aplikasi dan `http://localhost:8080/ux/` untuk dokumen UX.

Login memakai email berformat valid dan password apa pun, lalu isi captcha sesuai gambar — tidak ada validasi kredensial sungguhan karena ini prototipe.

## 🌐 Deploy ke GitHub Pages

1. Buat repositori baru di GitHub (mis. `verifika`), lalu unggah **isi** folder ini ke root repo — `index.html` harus berada di root, bukan di dalam subfolder.
   ```bash
   git init
   git add .
   git commit -m "Prototipe Verifika"
   git branch -M main
   git remote add origin https://github.com/<username>/verifika.git
   git push -u origin main
   ```
2. Di GitHub buka **Settings → Pages**.
3. Pada **Build and deployment**, pilih **Source: Deploy from a branch**, branch **main**, folder **/ (root)**, lalu **Save**.
4. Tunggu 1–2 menit, situs tersedia di `https://<username>.github.io/verifika/` dan dokumen UX di `https://<username>.github.io/verifika/ux/`.

> Favicon kadang tertahan cache browser. Jika ikon lama masih muncul, lakukan hard refresh (Ctrl/Cmd + Shift + R) atau buka di jendela incognito.

## 🗺️ Roadmap (jika dilanjutkan ke produk nyata)

- [ ] Integrasi engine OCR sungguhan (mis. Google Vision, AWS Textract, atau model custom)
- [ ] Backend & autentikasi nyata (JWT/OAuth, rate limiting, session management)
- [ ] Model deteksi pemalsuan & skor risiko berbasis machine learning
- [ ] Penyimpanan dokumen & riwayat yang persisten (database)
- [ ] Audit log & role-based access control
- [ ] Uji aksesibilitas (WCAG) & internasionalisasi (i18n)

## 📄 Lisensi

Belum ditentukan — tambahkan berkas `LICENSE` sesuai kebutuhan sebelum publikasi publik (mis. MIT, Apache-2.0, atau proprietary/all-rights-reserved jika tidak ingin dipakai ulang).

## 🙌 Kontribusi

Karena masih berupa prototipe desain, isu (issue) dan saran terkait UX, aksesibilitas, atau responsivitas sangat diterima.
