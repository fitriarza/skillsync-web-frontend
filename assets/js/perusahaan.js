document.addEventListener('DOMContentLoaded', () => {
  console.log('✅ Dashboard Perusahaan Loaded.');

  // "DATABASE MINI" UNTUK PROFIL PELAMAR
  const applicantData = {
    'budi': {
      nama: 'Budi Santoso',
      universitas: 'Universitas Gadjah Mada',
      foto: 'https://i.pravatar.cc/150?u=budi',
      tentang: 'Mahasiswa tingkat akhir Teknik Informatika dengan minat kuat pada pengembangan web back-end. Berpengalaman dalam membangun aplikasi berbasis PHP dan familiar dengan arsitektur MVC.',
      skills: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL', 'CodeIgniter'],
      cv_url: '#', // Ganti dengan link CV asli jika ada
      portfolio_url: '#' // Ganti dengan link portofolio asli jika ada
    },
    'rina': {
      nama: 'Rina Hartati',
      universitas: 'Institut Teknologi Bandung',
      foto: 'https://i.pravatar.cc/150?u=rina',
      tentang: 'Lulusan baru Desain Komunikasi Visual dengan spesialisasi UI/UX. Saya antusias dalam menciptakan pengalaman pengguna yang intuitif dan menarik secara visual, serta mampu menerjemahkan kebutuhan bisnis menjadi desain yang fungsional.',
      skills: ['React', 'Node.js', 'Figma', 'UI/UX Research', 'Prototyping', 'Adobe XD'],
      cv_url: '#',
      portfolio_url: '#'
    }
  };

  // --- LOGIKA UNTUK MODAL LIHAT PELAMAR ---
  const lihatPelamarModalEl = document.getElementById('lihatPelamarModal');
  if (lihatPelamarModalEl) {
    lihatPelamarModalEl.addEventListener('show.bs.modal', function (event) {
      const button = event.relatedTarget;
      const projectTitle = button.getAttribute('data-project-title');
      const modalTitle = lihatPelamarModalEl.querySelector('.modal-title');
      modalTitle.textContent = 'Daftar Pelamar untuk: ' + projectTitle;
    });
  }

  // --- LOGIKA UNTUK MODAL BUAT PROYEK ---
  const btnPublikasi = document.getElementById('btn-publikasikan-proyek');
  if(btnPublikasi) {
    btnPublikasi.addEventListener('click', () => {
        const buatProyekModalEl = document.getElementById('buatProyekModal');
        const modal = bootstrap.Modal.getInstance(buatProyekModalEl);
        if(modal) { modal.hide(); }
        alert('Proyek baru berhasil dipublikasikan! (Ini hanya simulasi)');
    });
  }

  // ========== [BARU] LOGIKA UNTUK MODAL PROFIL PELAMAR ==========
  const profilPelamarModalEl = document.getElementById('profilPelamarModal');
  if (profilPelamarModalEl) {
    profilPelamarModalEl.addEventListener('show.bs.modal', function(event) {
      const button = event.relatedTarget;
      const applicantId = button.getAttribute('data-applicant-id');
      const data = applicantData[applicantId];

      if (!data) {
        console.error('Data untuk pelamar tidak ditemukan!');
        return;
      }

      // Mengisi data ke dalam elemen-elemen modal
      profilPelamarModalEl.querySelector('#modalApplicantName').textContent = data.nama;
      profilPelamarModalEl.querySelector('#modalApplicantUniv').textContent = data.universitas;
      profilPelamarModalEl.querySelector('#modalApplicantPhoto').src = data.foto;
      profilPelamarModalEl.querySelector('#modalApplicantAbout').textContent = data.tentang;
      
      // Mengisi link unduh CV dan Portofolio
      profilPelamarModalEl.querySelector('#btn-unduh-cv').href = data.cv_url;
      profilPelamarModalEl.querySelector('#btn-lihat-portofolio').href = data.portfolio_url;

      // Mengisi daftar skill secara dinamis
      const skillsContainer = profilPelamarModalEl.querySelector('#modalApplicantSkills');
      skillsContainer.innerHTML = ''; // Kosongkan dulu skill sebelumnya
      data.skills.forEach(skill => {
        const badge = document.createElement('span');
        badge.className = 'badge bg-primary-subtle text-primary-emphasis me-1 mb-1';
        badge.textContent = skill;
        skillsContainer.appendChild(badge);
      });
    });
  }
  // =============================================================
});