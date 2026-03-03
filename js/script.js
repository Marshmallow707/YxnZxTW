document.addEventListener("DOMContentLoaded", function () {

  /* ---------------- Cursor Glow ---------------- */
  const cursor = document.getElementById('cursorGlow');
  if (cursor) {
    let mouseX = 0, mouseY = 0;
    let posX = 0, posY = 0;
    const speed = 0.2;

    document.addEventListener('mousemove', e => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.opacity = '1';
    });

    document.addEventListener('mouseleave', () => {
      cursor.style.opacity = '0';
    });

    function animateCursor() {
      posX += (mouseX - posX) * speed;
      posY += (mouseY - posY) * speed;
      cursor.style.transform = `translate(${posX}px, ${posY}px) translate(-50%, -50%)`;
      requestAnimationFrame(animateCursor);
    }

    animateCursor();
  }

  /* ---------------- Music Button ---------------- */
const musicBtn = document.getElementById('musicToggle');
const music = document.getElementById('aboutMusic');

musicBtn.textContent = '🔇';
musicBtn.classList.add('muted');

musicBtn.addEventListener('click', () => {
  if (music.paused) {
    music.play().then(() => {
      musicBtn.textContent = '🔊';
      musicBtn.classList.remove('muted');
      musicBtn.classList.add('playing');
    });
  } else {
    music.pause();
    musicBtn.textContent = '🔇';
    musicBtn.classList.remove('playing');
    musicBtn.classList.add('muted');
  }
});

  /* ---------------- Scroll Reveal ---------------- */
  function revealElements() {
    let reveals = document.querySelectorAll('.reveal');
    const windowHeight = window.innerHeight;
    reveals.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;
      const elementVisible = 100;
      if (elementTop < windowHeight - elementVisible) {
        el.classList.add('active');
      }
    });
  }
  window.addEventListener('scroll', revealElements);
  revealElements(); // run on page load

  /* ---------------- Scroll Progress Bar ---------------- */
  const progressBar = document.getElementById("progressBar");
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      progressBar.style.width = scrolled + "%";
    });
  }

// Navbar shrink on scroll
const navbar = document.querySelector(".navbar");
let lastScrollY = 0;
let ticking = false;
window.addEventListener("scroll", () => {
  lastScrollY = window.scrollY;
  if (!ticking) {
    requestAnimationFrame(() => {
      if (lastScrollY > 50) {
        navbar.classList.add("shrink");
      } else {
        navbar.classList.remove("shrink");
      }
      ticking = false;
    });
    ticking = true;
  }
});

// Active menu link
const navLinks = document.querySelectorAll('#nav-links .nav-link');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
  });
});

// Dropdown active links
const dropdownLinks = document.querySelectorAll('.dropdown-link');
dropdownLinks.forEach(link => {
  link.addEventListener('click', () => {
    dropdownLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
  });
});

// Mobile toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-links');
navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('mobile-open');
});

  /* ---------------- Quote Toggle ---------------- */
  const quote = document.getElementById("animeQuote");
  if (quote) {
    window.toggleQuote = function () {
      quote.style.display = quote.style.display === "block" ? "none" : "block";
    };
  }

  /* ---------------- SerieZ Autoplay Video ---------------- */
  const bleachVideo = document.getElementById('bleachVideo');
  const container = document.getElementById('serieVideoContainer');
  if (bleachVideo && container) {
    bleachVideo.muted = true;

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          bleachVideo.play().catch(() => {});
        } else {
          bleachVideo.pause();
        }
      });
    }, { threshold: 0.4 });

    observer.observe(container);

    // Enable sound after first click anywhere
    document.addEventListener('click', function enableSoundOnce() {
      bleachVideo.muted = false;
      document.removeEventListener('click', enableSoundOnce);
    });
  }

  /* ---------------- MusicZ Player ---------------- */
  const musicTracks = document.querySelectorAll('.music-track');
  musicTracks.forEach(track => {
    track.addEventListener('play', function () {
      // Stop other tracks
      musicTracks.forEach(otherTrack => {
        if (otherTrack !== track) {
          otherTrack.pause();
          otherTrack.currentTime = 0;
          const otherTitle = otherTrack.closest('.text-center')?.querySelector('.music-title');
          if (otherTitle) otherTitle.classList.remove('playing');
        }
      });
      // Animate current title
      const currentTitle = track.closest('.text-center')?.querySelector('.music-title');
      if (currentTitle) {
        currentTitle.classList.remove('playing');
        void currentTitle.offsetWidth; // restart animation
        currentTitle.classList.add('playing');
      }
    });

    track.addEventListener('pause', function () {
      const currentTitle = track.closest('.text-center')?.querySelector('.music-title');
      if (currentTitle) currentTitle.classList.remove('playing');
    });
  });

}); 