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

/* ---------------- Feedback / Comments ---------------- */
let selectedRating = 0;
let currentPlatform = '';

window.openModal = function(platform) {
  currentPlatform = platform;
  document.getElementById('loggedInAs').textContent = '✅ Logged in via ' + platform;
  const modal = document.getElementById('feedbackModal');
  modal.style.display = 'flex';
}

window.closeModal = function() {
  document.getElementById('feedbackModal').style.display = 'none';
  resetForm();
}

// Close modal when clicking outside
document.getElementById('feedbackModal').addEventListener('click', function(e) {
  if (e.target === this) closeModal();
});

window.submitFeedback = function() {
  const name = document.getElementById('nameInput').value.trim();
  const email = document.getElementById('emailInput').value.trim();
  const message = document.getElementById('messageInput').value.trim();
  const rating = document.getElementById('ratingInput').value;

  if (!name || !email || !message || rating === '0') {
    alert('Please fill in all fields and select a rating! 🥹');
    return;
  }

  const commentsList = document.getElementById('commentsList');

  // Remove "no comments" placeholder
  const placeholder = commentsList.querySelector('p');
  if (placeholder) placeholder.remove();

  // Build stars
  let stars = '';
  for (let i = 1; i <= 5; i++) {
    stars += i <= rating ? '★' : '☆';
  }

  // Create comment card
  const card = document.createElement('div');
  card.className = 'comment-card';
  card.innerHTML = `
    <div class="comment-header">
      <span class="comment-name">${name}</span>
      <span class="comment-platform">via ${currentPlatform}</span>
    </div>
    <div class="comment-stars">${stars}</div>
    <p class="comment-message">${message}</p>
  `;

  commentsList.prepend(card);

  // Reset form
  resetForm();
  closeModal();
}

function resetForm() {
  document.getElementById('nameInput').value = '';
  document.getElementById('emailInput').value = '';
  document.getElementById('messageInput').value = '';
  document.getElementById('ratingInput').value = '0';
  selectedRating = 0;
  document.querySelectorAll('.star').forEach(s => s.classList.remove('active'));
}

// Star rating interaction
document.querySelectorAll('.star').forEach(star => {
  star.addEventListener('click', function() {
    selectedRating = parseInt(this.dataset.value);
    document.getElementById('ratingInput').value = selectedRating;
    document.querySelectorAll('.star').forEach(s => {
      s.classList.toggle('active', parseInt(s.dataset.value) <= selectedRating);
    });
  });

  star.addEventListener('mouseover', function() {
    const val = parseInt(this.dataset.value);
    document.querySelectorAll('.star').forEach(s => {
      s.classList.toggle('active', parseInt(s.dataset.value) <= val);
    });
  });

  star.addEventListener('mouseout', function() {
    document.querySelectorAll('.star').forEach(s => {
      s.classList.toggle('active', parseInt(s.dataset.value) <= selectedRating);
    });
  });
});