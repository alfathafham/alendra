console.log("Alendra website siap jalan!");
// js/main.js

// Scroll to top on page load
window.onload = () => {
  window.scrollTo(0, 0);
};

// Toggle mobile nav (jika kamu pakai tombol burger)
const burger = document.querySelector('.burger');
const nav = document.querySelector('nav ul');

if (burger) {
  burger.addEventListener('click', () => {
    nav.classList.toggle('active');
    burger.classList.toggle('active');
  });
}

// Smooth scroll for anchor links (jika pakai #link)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

// Fungsi untuk FAQ Accordion
document.addEventListener('DOMContentLoaded', function() {
  const faqQuestions = document.querySelectorAll('.faq-question');
  
  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      // Toggle class active pada pertanyaan
      question.classList.toggle('active');
      
      // Dapatkan elemen jawaban yang sesuai
      const answer = question.nextElementSibling;
      
      // Toggle tampilan jawaban
      if (question.classList.contains('active')) {
        answer.classList.add('show');
      } else {
        answer.classList.remove('show');
      }
      
      // Tutup pertanyaan lain yang terbuka
      faqQuestions.forEach(otherQuestion => {
        if (otherQuestion !== question && otherQuestion.classList.contains('active')) {
          otherQuestion.classList.remove('active');
          otherQuestion.nextElementSibling.classList.remove('show');
        }
      });
    });
  });
});


/**
 * main.js - Script utama untuk Alendra IT Solutions
 * Fitur: Navbar mobile, animasi scroll, form validation, dan interaksi UI
 */

document.addEventListener('DOMContentLoaded', function() {
  // ==================== NAVBAR MOBILE TOGGLE ====================
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const navbar = document.querySelector('.navbar');

  hamburger.addEventListener('click', function() {
    // Toggle menu mobile
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
    
    // Lock scroll ketika menu terbuka
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
  });

  // Tutup menu saat klik di luar
  document.addEventListener('click', function(e) {
    if (!navbar.contains(e.target) && navLinks.classList.contains('active')) {
      navLinks.classList.remove('active');
      hamburger.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  // ==================== SCROLL ANIMATIONS ====================
  // Animasi elemen saat scroll
  const animateOnScroll = function() {
    const elements = document.querySelectorAll('section, .service-card, .benefit-card');
    
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.2;

      if (elementPosition < screenPosition) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  };

  // Set initial state
  document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'all 0.6s ease';
  });

  // Trigger on load and scroll
  window.addEventListener('load', animateOnScroll);
  window.addEventListener('scroll', animateOnScroll);

  // ==================== SERVICE PAGE SPECIFIC ====================
  // Active link highlight untuk halaman layanan
  if (document.querySelector('.service-page')) {
    const currentPage = window.location.pathname.split('/').pop();
    const navItems = document.querySelectorAll('.nav-links a');
    
    navItems.forEach(item => {
      if (item.getAttribute('href').includes(currentPage)) {
        item.classList.add('active-link');
      }
    });

    // Smooth scroll untuk anchor link di halaman yang sama
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
        });
      });
    });
  }

  // ==================== FORM VALIDATION ====================
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      const email = document.getElementById('email').value;
      const phone = document.getElementById('phone').value;
      let isValid = true;

      // Validasi email
      if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        alert('Email tidak valid!');
        isValid = false;
      }

      // Validasi nomor telepon (min 9 digit)
      if (phone && !phone.match(/^[0-9]{9,}$/)) {
        alert('Nomor telepon harus minimal 9 digit angka!');
        isValid = false;
      }

      if (!isValid) e.preventDefault();
    });
  }

  // ==================== INTERACTIVE ELEMENTS ====================
  // Tooltip untuk ikon layanan
  document.querySelectorAll('.item-layanan i').forEach(icon => {
    icon.addEventListener('mouseenter', function() {
      const tooltip = document.createElement('div');
      tooltip.className = 'tooltip';
      tooltip.textContent = this.parentElement.querySelector('h3').textContent;
      document.body.appendChild(tooltip);
      
      const rect = this.getBoundingClientRect();
      tooltip.style.left = `${rect.left + rect.width/2}px`;
      tooltip.style.top = `${rect.top - 40}px`;
    });

    icon.addEventListener('mouseleave', function() {
      document.querySelector('.tooltip')?.remove();
    });
  });
});

// ==================== LAZY LOADING IMAGES ====================
document.addEventListener('DOMContentLoaded', function() {
  const lazyImages = [].slice.call(document.querySelectorAll('img[loading="lazy"]'));
  
  if ('IntersectionObserver' in window) {
    const lazyImageObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          const lazyImage = entry.target;
          lazyImage.src = lazyImage.dataset.src;
          lazyImageObserver.unobserve(lazyImage);
        }
      });
    });

    lazyImages.forEach(function(lazyImage) {
      lazyImageObserver.observe(lazyImage);
    });
  }
});