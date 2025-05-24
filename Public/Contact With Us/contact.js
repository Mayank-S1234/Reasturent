//  Music Toggle
const music = document.getElementById('bg-music');
const musicToggle = document.getElementById('music-toggle');

let isPlaying = false;

musicToggle.addEventListener('click', () => {
  if (isPlaying) {
    music.pause();
    musicToggle.textContent = '🎵';
  } else {
    music.play();
    musicToggle.textContent = '🔇';
  }
  isPlaying = !isPlaying;
});

// Language Toggle
const languageSelect = document.getElementById('language');
const translatableElements = document.querySelectorAll('[data-en]');

languageSelect.addEventListener('change', () => {
  const selectedLang = languageSelect.value;

  translatableElements.forEach(el => {
    el.textContent = el.getAttribute(`data-${selectedLang}`);
  });
});

// Form Submission (Fake example with success message)
document.getElementById('contact-form').addEventListener('submit', function(e) {
  e.preventDefault();
  document.getElementById('form-status').textContent = 'Message sent successfully!';
  this.reset();
});

document.getElementById('reservation-form').addEventListener('submit', function(e) {
  e.preventDefault();
  document.getElementById('res-status').textContent = 'Reservation submitted!';
  this.reset();
});

document.getElementById("language").addEventListener("change", () => {
  const lang = document.getElementById("language").value;
  document.querySelectorAll("[data-en]").forEach(el => {
    el.textContent = lang === "hi" ? el.getAttribute("data-hi") : el.getAttribute("data-en");
  });
  window.scrollTo({ top: 0, behavior: 'smooth' }); // scroll to top on language change
});

//From Server
        document.addEventListener('DOMContentLoaded', () => {
            const jwtToken = localStorage.getItem('jwt_token'); // get Token from server

            if (!jwtToken) {
                alert('Pleasse Login to use for site Features'); // Send Messge to user
                window.location.href = '../Bemone a member/member.html'; // Render in Login Page
            } 
        });