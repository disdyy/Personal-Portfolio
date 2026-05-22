document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelectorAll('.nav a');
  const year = document.getElementById('year');
  const progressBar = document.getElementById('progress-bar');
  const progressCount = document.getElementById('progress-count');
  const welcomeScreen = document.getElementById('welcome-screen');

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      const isOpen = document.body.classList.toggle('nav-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        document.body.classList.remove('nav-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const revealElements = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealElements.forEach((element) => observer.observe(element));
  } else {
    revealElements.forEach((element) => element.classList.add('visible'));
  }

  if (welcomeScreen && progressBar && progressCount) {
    let count = 1;
    const timer = window.setInterval(() => {
      count += 4;
      const progress = Math.min(count, 100);
      progressBar.style.width = `${progress}%`;
      progressCount.textContent = `${progress}%`;

      if (progress >= 100) {
        window.clearInterval(timer);
        window.setTimeout(() => welcomeScreen.classList.add('hide'), 260);
      }
    }, 18);

    window.setTimeout(() => welcomeScreen.classList.add('hide'), 1600);
  }
});
