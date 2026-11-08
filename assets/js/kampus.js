document.addEventListener("DOMContentLoaded", function () {
  console.log('✅ Dashboard Kampus Loaded.');

  // --- "DATABASE MINI" UNTUK DATA DUMMY ---
  const dummyData = {
    mahasiswa: [
      { nama: 'Budi Santoso', nim: '12345678', jurusan: 'Teknik Informatika' },
      { nama: 'Siti Aminah', nim: '87654321', jurusan: 'Sistem Informasi' },
      { nama: 'Dewi Lestari', nim: '11223344', jurusan: 'DKV' },
      { nama: 'Ahmad Dahlan', nim: '55667788', jurusan: 'Teknik Elektro' },
      { nama: 'Rina Hartati', nim: '23456789', jurusan: 'Manajemen Bisnis' },
      { nama: 'Joko Susilo', nim: '98765432', jurusan: 'Teknik Sipil' },
    ],
    proyek: [
      { nama: 'Pengembangan Website UMKM', mahasiswa: 'Budi Santoso', status: 'Selesai' },
      { nama: 'Analisis Data Penjualan', mahasiswa: 'Siti Aminah', status: 'Selesai' },
      { nama: 'Desain UI/UX Aplikasi', mahasiswa: 'Dewi Lestari', status: 'Selesai' },
      { nama: 'Rancang Bangun Jembatan', mahasiswa: 'Joko Susilo', status: 'Selesai' },
    ],
    mitra: [
      { nama: 'PT Maju Jaya', industri: 'Teknologi' },
      { nama: 'Data Corp', industri: 'Analisis Data' },
      { nama: 'Kreatif Agency', industri: 'Pemasaran' },
      { nama: 'PT Nusa Digital', industri: 'Pengembangan Perangkat Lunak' },
      { nama: 'Konstruksi Abadi', industri: 'Infrastruktur' },
    ]
  };

  // --- FUNGSI UNTUK INISIALISASI GRAFIK ---
  function initAktivitasChart() {
    const ctx = document.getElementById("aktivitasChart")?.getContext("2d");
    if (!ctx) return;
    new Chart(ctx, {
      type: "line",
      data: {
        labels: ["Mei", "Juni", "Juli", "Agustus", "September", "Oktober"],
        datasets: [{
          label: "Proyek Dikerjakan",
          data: [12, 19, 25, 30, 28, 35],
          backgroundColor: "rgba(13, 110, 253, 0.1)",
          borderColor: "rgba(13, 110, 253, 1)",
          borderWidth: 2,
          fill: true,
          tension: 0.4,
        }],
      },
      options: { responsive: true, scales: { y: { beginAtZero: true } } },
    });
  }

  function initIndustriChart() {
    const ctx = document.getElementById("industriChart")?.getContext("2d");
    if (!ctx) return;
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Teknologi", "Pendidikan", "Keuangan", "Kreatif", "Retail"],
        datasets: [{
          label: "Jumlah Perusahaan",
          data: [35, 15, 20, 10, 5],
          backgroundColor: [
            "rgba(13, 110, 253, 0.7)", "rgba(25, 135, 84, 0.7)", "rgba(255, 193, 7, 0.7)",
            "rgba(220, 53, 69, 0.7)", "rgba(108, 117, 125, 0.7)"
          ],
        }],
      },
      options: { responsive: true, indexAxis: "y", plugins: { legend: { display: false } } },
    });
  }

  // Panggil fungsi chart saat halaman dimuat
  initAktivitasChart();
  initIndustriChart();

  // --- LOGIKA UNTUK MODAL DETAIL KPI ---
  const kpiDetailModalEl = document.getElementById('kpiDetailModal');
  if (kpiDetailModalEl) {
    kpiDetailModalEl.addEventListener('show.bs.modal', function (event) {
      const triggerElement = event.relatedTarget;
      const title = triggerElement.getAttribute('data-bs-title');
      const type = triggerElement.getAttribute('data-bs-type');

      const modalTitle = kpiDetailModalEl.querySelector('.modal-title');
      const modalBody = kpiDetailModalEl.querySelector('#kpiModalContent');

      modalTitle.textContent = title;
      modalBody.innerHTML = '<p class="text-center p-3">Memuat data...</p>'; // Teks sementara

      const data = dummyData[type];
      if (!data) {
        modalBody.innerHTML = '<p class="text-danger p-3">Gagal memuat data.</p>';
        return;
      }

      // Buat tabel HTML secara dinamis berdasarkan tipe data
      let tableHTML = '<div class="table-responsive"><table class="table table-striped table-hover mb-0">';
      
      if (type === 'mahasiswa') {
        tableHTML += '<thead><tr><th>Nama Mahasiswa</th><th>NIM</th><th>Jurusan</th></tr></thead><tbody>';
        data.forEach(item => {
          tableHTML += `<tr><td>${item.nama}</td><td>${item.nim}</td><td>${item.jurusan}</td></tr>`;
        });
      } else if (type === 'proyek') {
        tableHTML += '<thead><tr><th>Nama Proyek</th><th>Mahasiswa</th><th>Status</th></tr></thead><tbody>';
        data.forEach(item => {
          tableHTML += `<tr><td>${item.nama}</td><td>${item.mahasiswa}</td><td><span class="badge bg-success">${item.status}</span></td></tr>`;
        });
      } else if (type === 'mitra') {
        tableHTML += '<thead><tr><th>Nama Perusahaan</th><th>Industri</th></tr></thead><tbody>';
        data.forEach(item => {
          tableHTML += `<tr><td>${item.nama}</td><td>${item.industri}</td></tr>`;
        });
      }

      tableHTML += '</tbody></table></div>';
      modalBody.innerHTML = tableHTML;
    });
  }
});