function startExperience() {
      // Play music
      const music = document.getElementById('bgMusic');
      music.play().catch(error => {
        console.log("Audio play failed:", error);
      });

      // Hide overlay
      document.getElementById('overlay').classList.add('hidden');
    }

    /* Scroll fade-in */
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.12 });
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    /* Countdown */
    let targetDate = null; // ✏ Hardcode here e.g. new Date('2025-12-25T00:00:00')
    let countdownInterval = null;

    function setCountdown() {
      const dateVal = document.getElementById('targetDate').value;
      const label   = document.getElementById('countdownLabel').value.trim();
      if (!dateVal) return;
      targetDate = new Date(dateVal + 'T00:00:00');
      if (label) document.getElementById('countdownTitle').textContent = label + ' ✈';
      if (countdownInterval) clearInterval(countdownInterval);
      tick();
      countdownInterval = setInterval(tick, 1000);
    }

    function tick() {
      if (!targetDate) return;
      const diff = targetDate - new Date();
      if (diff <= 0) {
        ['cd-days','cd-hours','cd-mins','cd-secs'].forEach(id => document.getElementById(id).textContent = '0');
        clearInterval(countdownInterval);
        return;
      }
      document.getElementById('cd-days').textContent  = Math.floor(diff / 86400000);
      document.getElementById('cd-hours').textContent = String(Math.floor((diff % 86400000) / 3600000)).padStart(2,'0');
      document.getElementById('cd-mins').textContent  = String(Math.floor((diff % 3600000) / 60000)).padStart(2,'0');
      document.getElementById('cd-secs').textContent  = String(Math.floor((diff % 60000) / 1000)).padStart(2,'0');
    }

    /* Auto-start countdown if date is hardcoded above */
    if (targetDate) { tick(); countdownInterval = setInterval(tick, 1000); }
let playing = false;

function toggleVinyl() {
  const audio = document.getElementById('vinylAudio');
  const vinyl = document.getElementById('vinyl');
  const btn = document.getElementById('playBtn');

  playing = !playing;

  if (playing) {
    audio.play();
    vinyl.style.animationPlayState = 'running';
    btn.textContent = '⏸ pause';
  } else {
    audio.pause();
    vinyl.style.animationPlayState = 'paused';
    btn.textContent = '▶ play';
  }
}
