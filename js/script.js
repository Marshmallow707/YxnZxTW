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
  const music = document.getElementById('aboutMusic');
  const toggleBtn = document.getElementById('musicToggle');

  toggleBtn.addEventListener('click', () => {
    if (music.paused) {
    music.play();
    toggleBtn.classList.remove('muted');
    toggleBtn.textContent = '🔊';
  } else {
    music.pause();
    toggleBtn.classList.add('muted');
    toggleBtn.textContent = '🔇';
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
      if (lastScrollY > 50) {            // start shrinking after 50px
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

// Mobile toggle (menu)
const navToggle = document.getElementById('nav-toggle');
const mobileMenu = document.getElementById('mobile-menu');

navToggle.addEventListener('click', () => {
  mobileMenu.classList.toggle('active');
  
  if (mobileMenu.classList.contains('active')) {
    navToggle.textContent = "✖";
  } else {
    navToggle.textContent = "☰";
  }
});

// Mobile dropdown toggle inside floating menu
const mobileDropdowns = mobileMenu.querySelectorAll('.dropdown-toggle');
mobileDropdowns.forEach(btn => {
  btn.addEventListener('click', () => {
    const dropdown = btn.nextElementSibling;
    if (dropdown) {
      dropdown.classList.toggle('active');
    }
  });
});

/* ---------------- CharacterZ Slider ---------------- */
const slider = document.getElementById('makiSlider');
const slides = slider.children;
let index = 0;

function updateSlider() {
  slider.style.transform = `translateX(-${index * slider.offsetWidth}px)`;
}

document.getElementById('nextSlide').addEventListener('click', () => {
  index = (index + 1) % slides.length;
  updateSlider();
});

document.getElementById('prevSlide').addEventListener('click', () => {
  index = (index - 1 + slides.length) % slides.length;
  updateSlider();
});

// Optional: auto-slide every 3 seconds
setInterval(() => {
  index = (index + 1) % slides.length;
  updateSlider();
}, 3000);

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

/* ---------------- Quote Toggle ---------------- */
  const quote = document.getElementById("animeQuote");
  if (quote) {
    window.toggleQuote = function () {
      quote.style.display = quote.style.display === "block" ? "none" : "block";
    };
  }