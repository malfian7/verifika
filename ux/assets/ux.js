(function(){
  "use strict";
  var DATA = {"items": [{"id": "E1", "t": "e", "st": "done", "x": "Heuristic walkthrough 13 halaman & 5 alur prototipe di desktop dan ponsel", "note": "Sep 2026"}, {"id": "E2", "t": "e", "st": "assume", "x": "Pengetahuan umum proses e-KYC dan verifikasi agunan (STNK, BPKB, SHM) di lembaga pembiayaan"}, {"id": "E3", "t": "e", "st": "plan", "x": "Wawancara 6 analis verifikasi dan 2 kepala unit risiko, 45 menit per sesi"}, {"id": "E4", "t": "e", "st": "plan", "x": "Uji usability moderated: validasi KTP, tinjau batch, ubah ambang"}, {"id": "E5", "t": "e", "st": "plan", "x": "Analitik 30 hari pilot: waktu per dokumen, rasio koreksi, beban antrean"}, {"id": "F1", "t": "f", "st": "assume", "x": "Volume didominasi sedikit jenis dokumen; KTP dan rekening koran porsi terbesar", "from": ["E2", "E5"], "note": "data contoh: 5.842 & 2.914 / bulan"}, {"id": "F2", "t": "f", "st": "assume", "x": "Koreksi manual paling sering pada alamat, RT/RW, dan golongan darah yang keyakinan OCR-nya rendah", "from": ["E2", "E3", "E5"]}, {"id": "F3", "t": "f", "st": "seen", "x": "Hasil ekstraksi menampilkan keyakinan per field; field di bawah 90% ditandai kuning", "from": ["E1", "E4"]}, {"id": "F4", "t": "f", "st": "assume", "x": "Kredit kendaraan memuat STNK + BPKB; nomor rangka yang tak cocok adalah pola fraud umum", "from": ["E2"]}, {"id": "F5", "t": "f", "st": "assume", "x": "Mengubah aturan validasi di sistem lama butuh tiket ke tim IT", "from": ["E2", "E3"]}, {"id": "F6", "t": "f", "st": "seen", "x": "Menurunkan ambang tinjau 40 → 28 menambah ±23 dokumen tinjau per 7 hari", "from": ["E1", "E4"], "note": "simulasi data contoh"}, {"id": "F7", "t": "f", "st": "assume", "x": "Tim TI meminta sandbox dan contoh kode sebelum menyetujui integrasi vendor", "from": ["E2"]}, {"id": "F8", "t": "f", "st": "assume", "x": "Indikasi pemalsuan harus sampai ke tim fraud dalam hitungan menit", "from": ["E2", "E3"]}, {"id": "F9", "t": "f", "st": "seen", "x": "Batch berisi campuran jenis dokumen; berkas gagal dikenali masuk antrean tinjau", "from": ["E1", "E4"]}, {"id": "F10", "t": "f", "st": "assume", "x": "Auditor menanyakan siapa memutuskan, kapan, dan berdasarkan aturan apa", "from": ["E2", "E3"]}, {"id": "I1", "t": "i", "st": "assume", "x": "Analis memercayai otomasi bila sistem jujur tentang ketidakpastiannya", "from": ["F2", "F3"]}, {"id": "I2", "t": "i", "st": "assume", "x": "Validasi lintas dokumen lebih bernilai daripada validasi per dokumen", "from": ["F4", "F9"]}, {"id": "I3", "t": "i", "st": "assume", "x": "Pemilik kebijakan ingin mandiri mengubah aturan, tapi butuh bukti dampak dulu", "from": ["F5", "F6"]}, {"id": "I4", "t": "i", "st": "assume", "x": "Adopsi integrasi ditentukan waktu menuju permintaan pertama yang berhasil", "from": ["F7"]}, {"id": "I5", "t": "i", "st": "assume", "x": "Untuk fraud, kecepatan eskalasi dan jejak keputusan sama pentingnya", "from": ["F8", "F10"]}, {"id": "I6", "t": "i", "st": "assume", "x": "Mengoptimalkan dua jenis dokumen teratas memberi dampak terbesar", "from": ["F1"]}, {"id": "R1", "t": "r", "st": "built", "x": "Tampilkan keyakinan per field dan sorot field di bawah ambang", "from": ["I1"], "note": "Pindai › Hasil ekstraksi"}, {"id": "R2", "t": "r", "st": "built", "x": "Template aturan lintas dokumen STNK ↔ BPKB", "from": ["I2"], "note": "Aturan R-201, R-202"}, {"id": "R3", "t": "r", "st": "built", "x": "Simulasi dampak sebelum menyimpan ambang", "from": ["I3"], "note": "Aturan validasi › Simulasi"}, {"id": "R4", "t": "r", "st": "built", "x": "Sandbox, playground kode, dan key yang tampil sekali", "from": ["I4"], "note": "Integrasi & API"}, {"id": "R5", "t": "r", "st": "built", "x": "Event fraud.detected ke webhook + notifikasi lonceng", "from": ["I5"], "note": "Webhook & Notifikasi"}, {"id": "R6", "t": "r", "st": "next", "x": "Log audit per dokumen: siapa, kapan, aturan mana yang memicu", "from": ["I5"]}, {"id": "R7", "t": "r", "st": "next", "x": "Pintasan “Pindai KTP” dan “Rekening koran” langsung di Dashboard", "from": ["I6"]}, {"id": "R8", "t": "r", "st": "next", "x": "Cek kualitas foto (blur, silau) sebelum unggah", "from": ["I1"]}]};
  /* ---------- flow tabs ---------- */
  var tabs = document.querySelectorAll('[data-flow]');
  function showFlow(id, focus){
    tabs.forEach(function(t){
      var on = t.getAttribute('data-flow') === id;
      t.setAttribute('aria-selected', String(on)); t.tabIndex = on ? 0 : -1;
      if(on && focus) t.focus();
    });
    document.querySelectorAll('.fpanel').forEach(function(p){ p.hidden = p.id !== 'fp-' + id; });
  }
  tabs.forEach(function(t, i){
    t.addEventListener('click', function(){ showFlow(t.getAttribute('data-flow')); });
    t.addEventListener('keydown', function(e){
      if(e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      var n = (i + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length;
      showFlow(tabs[n].getAttribute('data-flow'), true);
    });
  });

  /* ---------- atomic board ---------- */
  var COLS = [['e','Sumber'],['f','Fakta'],['i','Insight'],['r','Rekomendasi']];
  var ST = {done:['Dilakukan','pp-ok'], plan:['Rencana','pp-mute'], assume:['Asumsi','pp-warn'], seen:['Diamati','pp-brand'], built:['Ada di prototipe','pp-ok'], next:['Usulan','pp-ai']};
  var byId = {}, up = {}, down = {};
  DATA.items.forEach(function(it){ byId[it.id] = it; up[it.id] = it.from || []; down[it.id] = down[it.id] || []; });
  DATA.items.forEach(function(it){ (it.from || []).forEach(function(p){ (down[p] = down[p] || []).push(it.id); }); });
  function esc(s){ return String(s).replace(/[&<>"]/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); }
  var board = document.getElementById('board');
  board.innerHTML = COLS.map(function(c){
    var list = DATA.items.filter(function(it){ return it.t === c[0]; });
    return '<div class="col"><div class="col-h"><b>' + c[1] + '</b><span>' + list.length + '</span></div>' +
      list.map(function(it){
        var st = ST[it.st];
        var rel = it.from && it.from.length ? '← ' + it.from.join(', ') : (down[it.id].length ? '→ ' + down[it.id].join(', ') : '');
        return '<button type="button" class="at ' + it.t + '" data-id="' + it.id + '" aria-pressed="false">' +
          '<span class="at-top"><span class="at-id">' + it.id + '</span><span class="pp ' + st[1] + '">' + st[0] + '</span></span>' +
          '<p>' + esc(it.x) + '</p>' + (it.note ? '<small>' + esc(it.note) + '</small>' : '') + (rel ? '<small>' + rel + '</small>' : '') + '</button>';
      }).join('') + '</div>';
  }).join('');
  function walk(id, map, acc){ (map[id] || []).forEach(function(n){ if(!acc[n]){ acc[n] = 1; walk(n, map, acc); } }); return acc; }
  var cur = null;
  function focusOn(id){
    cur = id;
    var acc = {}; acc[id] = 1; walk(id, up, acc); walk(id, down, acc);
    board.classList.toggle('focus', !!id);
    board.querySelectorAll('.at').forEach(function(b){
      var k = b.getAttribute('data-id');
      b.classList.toggle('sel', k === id); b.classList.toggle('hit', !!id && !!acc[k] && k !== id);
      b.setAttribute('aria-pressed', String(k === id));
    });
    document.getElementById('boardReset').disabled = !id;
    var n = Object.keys(acc).length - 1;
    document.getElementById('boardHint').textContent = id ? id + ' terhubung ke ' + n + ' item lain.' : 'Klik kartu untuk menelusuri hubungannya.';
  }
  board.addEventListener('click', function(e){
    var b = e.target.closest('.at'); if(!b) return;
    var id = b.getAttribute('data-id'); focusOn(cur === id ? null : id);
  });
  document.getElementById('boardReset').addEventListener('click', function(){ focusOn(null); });

  /* ---------- scrollspy ---------- */
  var links = document.querySelectorAll('[data-nav]');
  var secs = Array.prototype.map.call(links, function(a){ return document.getElementById(a.getAttribute('data-nav')); });
  function spy(){
    var y = window.scrollY + 120, active = null;
    secs.forEach(function(s){ if(s.offsetTop <= y) active = s.id; });
    links.forEach(function(a){ a.setAttribute('aria-current', String(a.getAttribute('data-nav') === active)); });
  }
  window.addEventListener('scroll', spy, {passive:true}); spy();
})();
