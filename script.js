// Toggle Mobile Menu
const menuToggle = document.getElementById('menuToggle');
if (menuToggle) {
  menuToggle.addEventListener('click', function() {
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.toggle('show');
  });
}

// Open Detail Modal
function openDetail(title, img, desc, tanggal, peserta, lokasi) {
  const modal = document.getElementById('detail');
  const detailTitle = document.getElementById('detailTitle');
  const detailImg = document.getElementById('detailImg');
  const detailDesc = document.getElementById('detailDesc');
  const detailTanggal = document.getElementById('detailTanggal');
  const detailPeserta = document.getElementById('detailPeserta');
  const detailLokasi = document.getElementById('detailLokasi');

  detailTitle.textContent = title;
  detailImg.src = img;
  detailImg.alt = title;
  detailDesc.textContent = desc;
  detailTanggal.textContent = tanggal;
  detailPeserta.textContent = peserta;
  detailLokasi.textContent = lokasi;

  modal.classList.remove('hidden');
  modal.classList.add('show');
  document.body.style.overflow = 'hidden';
}

// Close Detail Modal
function closeDetail() {
  const modal = document.getElementById('detail');
  modal.classList.remove('show');
  setTimeout(() => {
    modal.classList.add('hidden');
  }, 300);
  document.body.style.overflow = 'auto';
}

// Close modal button
const closeModalBtn = document.getElementById('closeModal');
if (closeModalBtn) {
  closeModalBtn.addEventListener('click', closeDetail);
}

// Close modal when clicking outside
window.onclick = function(event) {
  const modal = document.getElementById('detail');
  if (event.target === modal) {
    closeDetail();
  }
}

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    closeDetail();
  }
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
  const navbar = document.querySelector('header');
  if (navbar) {
    if (window.scrollY > 50) {
      navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
      navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
    }
  }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    
    // Skip if it's just #
    if (targetId === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    const target = document.querySelector(targetId);
    if (target) {
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      // Close mobile menu after clicking
      const mobileMenu = document.getElementById('mobileMenu');
      if (mobileMenu && mobileMenu.classList.contains('show')) {
        mobileMenu.classList.remove('show');
      }
    }
  });
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// DOM Content Loaded - Initialize everything
document.addEventListener('DOMContentLoaded', function() {
  
  // Setup gallery items animation
  const galleryItems = document.querySelectorAll('.glow-hover');
  galleryItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(item);
  });

  // IMPORTANT: Add click event to each gallery item
  const galleryCards = document.querySelectorAll('.gallery-item');
  galleryCards.forEach(card => {
    card.addEventListener('click', function() {
      const title = this.getAttribute('data-title');
      const img = this.getAttribute('data-img');
      const desc = this.getAttribute('data-desc');
      const tanggal = this.getAttribute('data-tanggal');
      const peserta = this.getAttribute('data-peserta');
      const lokasi = this.getAttribute('data-lokasi');
      
      openDetail(title, img, desc, tanggal, peserta, lokasi);
    });
  });
});