/* Neon Cursor */
document.addEventListener("DOMContentLoaded", function() {
  const cursor = document.getElementById('cursorGlow');
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
});

/* Scroll Reveal */
window.addEventListener('scroll', reveal);
function reveal(){
  let reveals = document.querySelectorAll('.reveal');
  for(let i=0;i<reveals.length;i++){
    let windowHeight = window.innerHeight;
    let elementTop = reveals[i].getBoundingClientRect().top;
    let elementVisible = 100;
    if(elementTop < windowHeight - elementVisible){
      reveals[i].classList.add('active');
    }
  }
}

/* Scroll Progress Bar */
window.onscroll = function() {
  let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  let scrolled = (winScroll / height) * 100;
  document.getElementById("progressBar").style.width = scrolled + "%";
};

/*Scroll Shrink */

let lastScrollY = 0;
let ticking = false;

window.addEventListener("scroll", function() {
  lastScrollY = window.scrollY;

  if (!ticking) {
    window.requestAnimationFrame(() => {
      const navbar = document.querySelector(".navbar");
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

/* Quote Toggle */
function toggleQuote(){
  let quote = document.getElementById("animeQuote");
  quote.style.display = quote.style.display === "block" ? "none" : "block";
}

/* Music Button */
document.addEventListener("DOMContentLoaded", function () {

  const musicBtn = document.getElementById('musicToggle');
  const music = document.getElementById('aboutMusic');

  if (!musicBtn || !music) {
    console.log("Music elements not found.");
    return;
  }

  musicBtn.textContent = '🔇';
  musicBtn.classList.add('muted');

  musicBtn.addEventListener('click', () => {

    if (music.paused) {

      music.play().then(() => {
        musicBtn.textContent = '🔊';
        musicBtn.classList.remove('muted');
        musicBtn.classList.add('playing');
      }).catch(err => {
        console.log("Playback failed:", err);
      });

    } else {

      music.pause();
      musicBtn.textContent = '🔇';
      musicBtn.classList.remove('playing');
      musicBtn.classList.add('muted');

    }

  });

});

/* SerieZ Autoplay */
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

  // 🔊 Enable sound after first user interaction anywhere
  document.addEventListener('click', function enableSoundOnce() {
    bleachVideo.muted = false;
    document.removeEventListener('click', enableSoundOnce);
  });

}

/* MusicZ Player*/
document.addEventListener("DOMContentLoaded", function() {

  const musicTracks = document.querySelectorAll('.music-track');

  musicTracks.forEach(track => {

    track.addEventListener('play', function() {

      // Stop all other tracks
      musicTracks.forEach(otherTrack => {
        if (otherTrack !== track) {
          otherTrack.pause();
          otherTrack.currentTime = 0;

          const otherTitle = otherTrack.closest('.text-center')?.querySelector('.music-title');
          if (otherTitle) {
            otherTitle.classList.remove('playing');
          }
        }
      });

      // Activate current title animation
      const currentTitle = track.closest('.text-center')?.querySelector('.music-title');

      if (currentTitle) {
        currentTitle.classList.remove('playing');
        void currentTitle.offsetWidth; // restart animation
        currentTitle.classList.add('playing');
      }

    });

    track.addEventListener('pause', function() {

      const currentTitle = track.closest('.text-center')?.querySelector('.music-title');
      if (currentTitle) {
        currentTitle.classList.remove('playing');
      }

    });

  });

});

