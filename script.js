// Navbar scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 30);
});

// Hamburger
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  const s = hamburger.querySelectorAll('span');
  s[0].style.transform = open ? 'rotate(45deg) translate(5px,5px)' : '';
  s[1].style.opacity   = open ? '0' : '';
  s[2].style.transform = open ? 'rotate(-45deg) translate(5px,-5px)' : '';
});
document.querySelectorAll('.nav-link').forEach(l => {
  l.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.querySelectorAll('span').forEach(s => { s.style.transform=''; s.style.opacity=''; });
  });
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) { e.preventDefault(); window.scrollTo({ top: t.getBoundingClientRect().top + scrollY - navbar.offsetHeight, behavior: 'smooth' }); }
  });
});

// Scroll reveal
const style = document.createElement('style');
style.textContent = '.revealed { opacity:1 !important; transform:translateY(0) !important; }';
document.head.appendChild(style);

const obs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('revealed'); obs.unobserve(e.target); } });
}, { threshold: 0.07 });

document.querySelectorAll('.thali-card, .dish-row, .contact-item, .pillar, .strip-item').forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(12px)';
  el.style.transition = `opacity 0.4s ease ${i * 0.03}s, transform 0.4s ease ${i * 0.03}s`;
  obs.observe(el);
});

window.dispatchEvent(new Event('scroll'));
