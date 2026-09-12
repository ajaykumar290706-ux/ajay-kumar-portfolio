const body = document.body;
const themeToggle = document.querySelector('.theme-toggle');
const menuToggle = document.querySelector('.menu-toggle');
const desktopNav = document.querySelector('.desktop-nav');
const backToTop = document.querySelector('.back-to-top');
const filterTabs = document.querySelectorAll('.filter-tab');
const projectCards = document.querySelectorAll('.project-card');
const contactForm = document.querySelector('.contact-form');
const formStatus = document.querySelector('.form-status');

const savedTheme = localStorage.getItem('ajay-theme');
if (savedTheme === 'dark') {
  body.classList.add('dark-mode');
  body.dataset.theme = 'dark';
}

function updateThemeLabel() {
  const isDark = body.classList.contains('dark-mode');
  themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
}

updateThemeLabel();
themeToggle.addEventListener('click', () => {
  const isDark = body.classList.toggle('dark-mode');
  body.dataset.theme = isDark ? 'dark' : 'light';
  localStorage.setItem('ajay-theme', isDark ? 'dark' : 'light');
  updateThemeLabel();
});

menuToggle.addEventListener('click', () => {
  const isOpen = desktopNav.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

desktopNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    desktopNav.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

filterTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const filter = tab.dataset.filter;
    filterTabs.forEach((item) => item.classList.toggle('active', item === tab));
    projectCards.forEach((card) => {
      const matches = filter === 'all' || card.dataset.category === filter;
      card.classList.toggle('is-hidden', !matches);
    });
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

window.addEventListener('scroll', () => {
  backToTop.classList.toggle('visible', window.scrollY > 600);
}, { passive: true });

backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const submitButton = contactForm.querySelector('button[type="submit"]');
  submitButton.disabled = true;
  submitButton.innerHTML = 'Message ready to send <span>✓</span>';
  formStatus.textContent = 'Thanks, Ajay will get back to you soon. (Demo form)';
  contactForm.reset();
  window.setTimeout(() => {
    submitButton.disabled = false;
    submitButton.innerHTML = 'Send message <span>↗</span>';
  }, 3500);
});
