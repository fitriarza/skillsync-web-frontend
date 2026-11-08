document.addEventListener('DOMContentLoaded', () => {
    const roleSelection = document.getElementById('role-selection');
    const authContainer = document.getElementById('auth-container');
    const roleCards = document.querySelectorAll('.role-card');
    const formWrappers = document.querySelectorAll('.form-wrapper');

    // 1. Logika untuk memilih peran
    roleCards.forEach(card => {
        card.addEventListener('click', () => {
            const selectedRole = card.dataset.role;
            roleSelection.classList.add('hidden');
            authContainer.classList.remove('hidden');
            formWrappers.forEach(wrapper => wrapper.classList.add('hidden'));
            const targetFormWrapper = document.getElementById(`${selectedRole}-forms`);
            if (targetFormWrapper) {
                targetFormWrapper.classList.remove('hidden');
            }
        });
    });

    // 2. Logika untuk Tab (Daftar/Masuk)
    const allTabLinks = document.querySelectorAll('.tab-link');
    allTabLinks.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTabData = tab.dataset.tab;
            const authCard = tab.closest('.auth-card');
            authCard.querySelectorAll('.tab-link').forEach(link => link.classList.remove('active'));
            tab.classList.add('active');
            authCard.querySelectorAll('.form-panel').forEach(panel => panel.classList.remove('active'));
            const targetFormPanel = authCard.querySelector(`.form-panel[data-form="${targetTabData}"]`);
            if (targetFormPanel) {
                targetFormPanel.classList.add('active');
            }
        });
    });

    // 3. Logika untuk mengarahkan setelah login (BAGIAN BARU)
    // Fungsi ini akan menangani pengalihan halaman
    const handleLogin = (role) => {
        let dashboardUrl = '';
        if (role === 'kampus') {
            // Arahkan ke dashboard kampus
            dashboardUrl = 'dashboard-kampus/index.html';
        } else if (role === 'mahasiswa') {
            // Arahkan ke dashboard mahasiswa
            dashboardUrl = 'dashboard-mahasiswa/index.html';
        } else if (role === 'perusahaan') {
            // Arahkan ke dashboard perusahaan
            dashboardUrl = 'dashboard-perusahaan/index.html';
        }

        // Jika URL sudah ditentukan, pindah halaman
        if (dashboardUrl) {
            window.location.href = dashboardUrl;
        }
    };

    // Tambahkan event listener untuk setiap form login
    // Dapatkan semua form di dalam panel login
    const loginForms = document.querySelectorAll('.form-panel[data-form="login"] form');
    
    loginForms.forEach(form => {
        form.addEventListener('submit', (event) => {
            // Mencegah halaman refresh saat form disubmit
            event.preventDefault(); 
            
            // Cari tahu peran dari form yang sedang aktif
            const formWrapper = form.closest('.form-wrapper');
            const role = formWrapper.id.replace('-forms', ''); // Mendapatkan 'kampus', 'mahasiswa', atau 'perusahaan'
            
            // Panggil fungsi untuk mengarahkan
            handleLogin(role);
        });
    });
});