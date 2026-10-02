const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
menuToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Abrir menú');
}));

const cards = [...document.querySelectorAll('.photo-card')];

const lightbox = document.getElementById('lightbox');
const lightboxImage = lightbox.querySelector('img');
const lightboxCaption = lightbox.querySelector('p');
let currentIndex = 0;
function visibleCards() { return cards.filter(card => !card.hidden); }
function showPhoto(index) {
  const items = visibleCards();
  if (!items.length) return;
  currentIndex = (index + items.length) % items.length;
  const card = items[currentIndex];
  lightboxImage.src = card.dataset.image;
  lightboxImage.alt = card.dataset.alt;
  lightboxCaption.textContent = card.querySelector('.photo-caption strong').textContent;
}
cards.forEach(card => card.addEventListener('click', () => {
  showPhoto(visibleCards().indexOf(card));
  lightbox.showModal();
}));
lightbox.querySelector('.lightbox-close').addEventListener('click', () => lightbox.close());
document.getElementById('prev-photo').addEventListener('click', () => showPhoto(currentIndex - 1));
document.getElementById('next-photo').addEventListener('click', () => showPhoto(currentIndex + 1));
lightbox.addEventListener('click', event => { if (event.target === lightbox) lightbox.close(); });
lightbox.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft') showPhoto(currentIndex - 1);
  if (event.key === 'ArrowRight') showPhoto(currentIndex + 1);
});
document.getElementById('year').textContent = new Date().getFullYear();
