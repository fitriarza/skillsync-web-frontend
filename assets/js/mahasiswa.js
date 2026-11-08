document.addEventListener('DOMContentLoaded', () => {
  console.log('✅ DOM Loaded. Script mahasiswa.js is running.');

  const projectData = {
    'webdev': {
      judulProyek: 'Junior Web Developer (Intern)',
      namaPerusahaan: 'Startup Inovasi',
      lokasi: 'Jakarta, Indonesia (Remote)',
      skills: ['PHP', 'Laravel', 'MySQL'],
      deskripsi: 'Kami mencari seorang Junior Web Developer (Intern) yang bersemangat untuk belajar dan berkontribusi dalam tim kami. Anda akan terlibat langsung dalam siklus pengembangan produk, membantu tim backend dalam mengembangkan fitur--fitur baru untuk aplikasi web utama kami menggunakan framework Laravel.',
      tanggungJawab: ['Membantu dalam desain dan pengembangan fitur backend.','Menulis kode yang bersih, efisien, dan terdokumentasi dengan baik.','Berkolaborasi dengan tim frontend untuk mengintegrasikan antarmuka pengguna.','Melakukan debugging dan pemecahan masalah pada aplikasi yang ada.','Berpartisipasi dalam sesi code review untuk menjaga kualitas kode.',],
      kualifikasi: ['Mahasiswa tingkat akhir atau lulusan baru dari jurusan Teknik Informatika, Sistem Informasi, atau sejenisnya.','Memiliki pemahaman dasar tentang PHP dan framework Laravel.','Familiar dengan konsep database relasional (MySQL/PostgreSQL).','Memiliki keinginan kuat untuk belajar dan berkembang di dunia pengembangan web.','Mampu bekerja sama dalam tim dan memiliki komunikasi yang baik.',],
      logoPerusahaan: 'https://i.pravatar.cc/150?u=startupinovasi',
      industriPerusahaan: 'Teknologi & Informasi',
      tentangPerusahaan: 'Startup Inovasi adalah perusahaan rintisan yang berfokus pada penyediaan solusi SaaS (Software as a Service) untuk industri kreatif di Indonesia.'
    },
    'socmed': {
      judulProyek: 'Social Media Manager',
      namaPerusahaan: 'PT Digital Kreatif',
      lokasi: 'Bandung, Indonesia (Hybrid)',
      skills: ['SEO', 'Content', 'Marketing'],
      deskripsi: 'PT Digital Kreatif membuka kesempatan bagi talenta muda untuk mengelola strategi media sosial dari brand-brand ternama. Anda akan bertanggung jawab penuh terhadap pembuatan konten, analisis performa, dan interaksi dengan audiens.',
      tanggungJawab: ['Mengelola 3 akun media sosial utama perusahaan (Instagram, TikTok, Twitter).','Merencanakan dan membuat konten harian yang menarik dan relevan.','Menganalisis performa konten dan memberikan laporan mingguan.','Berinteraksi dengan followers dan membangun komunitas yang solid.','Menjalankan kampanye iklan di platform media sosial.',],
      kualifikasi: ['Pengalaman minimal 1 tahun dalam mengelola media sosial profesional.','Memahami metrik dan alat analisis media sosial.','Kreatif, proaktif, dan selalu update dengan tren terbaru.','Kemampuan copywriting yang baik adalah nilai plus.','Bisa menggunakan alat desain grafis dasar (Canva, dll).',],
      logoPerusahaan: 'https://i.pravatar.cc/150?u=digitalkreatif',
      industriPerusahaan: 'Agensi Pemasaran Digital',
      tentangPerusahaan: 'PT Digital Kreatif adalah agensi pemasaran digital yang telah membantu lebih dari 50 brand untuk bertumbuh di dunia online.'
    }
  };

  const tabContainer = document.getElementById('v-pills-tabContent');
  const tabLinks = document.querySelectorAll('.sidebar a[data-bs-toggle="pill"]');

  if (!tabContainer || tabLinks.length === 0) {
    console.error('❌ Error: Elemen penting tidak ditemukan.');
    return;
  }

  const loadPartial = (fileName, callback) => {
    fetch(fileName)
      .then(response => {
        if (!response.ok) throw new Error(`Gagal memuat ${fileName}. Status: ${response.status}`);
        return response.text();
      })
      .then(html => {
        if (callback) {
          callback(html);
        } else {
          tabContainer.innerHTML = html;
        }
      })
      .catch(error => {
        console.error(`❌❌❌ GAGAL:`, error);
        tabContainer.innerHTML = `<div class="alert alert-danger mx-3">Konten tidak dapat dimuat.</div>`;
      });
  };

  const handleSidebarClick = (targetId, clickedLink) => {
    const fileName = `_${targetId.replace('-content', '')}.html`;
    loadPartial(fileName, (html) => {
      tabContainer.innerHTML = html;
      tabLinks.forEach(link => link.classList.remove('active'));
      if (clickedLink) clickedLink.classList.add('active');
    });
  };
  
  const showProjectDetail = (projectId) => {
    const data = projectData[projectId];
    if (!data) return;

    loadPartial('_detail-proyek.html', (template) => {
      let renderedHtml = template;
      for (const key in data) {
        if (typeof data[key] === 'string') {
          renderedHtml = renderedHtml.replace(new RegExp(`{{${key}}}`, 'g'), data[key]);
        }
      }
      tabContainer.innerHTML = renderedHtml;

      const skillsContainer = document.getElementById('skills-container');
      if (skillsContainer) {
        data.skills.forEach(skill => {
          const span = document.createElement('span');
          span.className = 'badge bg-primary-subtle text-primary-emphasis p-2 me-1';
          span.textContent = skill;
          skillsContainer.appendChild(span);
        });
      }

      const tanggungJawabContainer = document.getElementById('tanggungJawab-container');
      if(tanggungJawabContainer) {
        data.tanggungJawab.forEach(item => {
          const li = document.createElement('li');
          li.textContent = item;
          tanggungJawabContainer.appendChild(li);
        });
      }

      const kualifikasiContainer = document.getElementById('kualifikasi-container');
      if(kualifikasiContainer) {
        data.kualifikasi.forEach(item => {
          const li = document.createElement('li');
          li.textContent = item;
          kualifikasiContainer.appendChild(li);
        });
      }
    });
  };

  tabLinks.forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      handleSidebarClick(targetId, link);
    });
  });

  tabContainer.addEventListener('click', (event) => {
    const clickedElement = event.target.closest('a, button');
    if (!clickedElement) return;

    if (clickedElement.classList.contains('btn-lihat-detail')) {
      event.preventDefault();
      const projectId = clickedElement.dataset.projectId;
      showProjectDetail(projectId);
    }

    if (clickedElement.id === 'btn-kembali-ke-daftar') {
      event.preventDefault();
      const temukanTab = document.getElementById('temukan-tab');
      handleSidebarClick('temukan-content', temukanTab);
    }
    
    if (clickedElement.id === 'btn-ajukan-lamaran') {
        event.preventDefault();
        const successModal = new bootstrap.Modal(document.getElementById('lamaranSuccessModal'));
        successModal.show();
    }
    
    if (clickedElement.id === 'submitReview') {
      event.preventDefault();
      const reviewModalEl = document.getElementById('reviewModal');
      const reviewModal = bootstrap.Modal.getInstance(reviewModalEl);
      if (reviewModal) reviewModal.hide();

      const reviewSuccessModal = new bootstrap.Modal(document.getElementById('reviewSuccessModal'));
      reviewSuccessModal.show();
    }
  });

  const defaultTabLink = document.getElementById('dasbor-tab');
  if(defaultTabLink) {
      handleSidebarClick('dasbor-content', defaultTabLink);
  }

  const certificateModalElement = document.getElementById('certificateModal');
  if (certificateModalElement) {
    certificateModalElement.addEventListener('show.bs.modal', function (event) {
      const button = event.relatedTarget; 
      const imageUrl = button.getAttribute('data-bs-image');
      const title = button.getAttribute('data-bs-title');
      const modalTitle = certificateModalElement.querySelector('.modal-title');
      const modalImage = certificateModalElement.querySelector('#certificateImage');
      if (modalTitle) modalTitle.textContent = title || 'Pratinjau Sertifikat';
      if (modalImage) modalImage.src = imageUrl;
    });
  }

  const reviewModalElement = document.getElementById('reviewModal');
  if (reviewModalElement) {
    reviewModalElement.addEventListener('show.bs.modal', function (event) {
      const button = event.relatedTarget;
      const projectName = button.getAttribute('data-project-name');
      const companyName = button.getAttribute('data-company-name');
      reviewModalElement.querySelector('#reviewProjectName').textContent = projectName;
      reviewModalElement.querySelector('#reviewCompanyName').textContent = companyName;
      reviewModalElement.querySelector('#reviewComment').value = '';
      const stars = reviewModalElement.querySelectorAll('.star-rating .fa-star');
      stars.forEach(s => s.classList.remove('selected'));
    });

    const stars = reviewModalElement.querySelectorAll('.star-rating .fa-star');
    stars.forEach(star => {
      star.addEventListener('click', () => {
        const value = parseInt(star.getAttribute('data-value'), 10);
        stars.forEach((s, index) => {
          if (index < value) {
            s.classList.add('selected');
          } else {
            s.classList.remove('selected');
          }
        });
      });
    });
  }
});