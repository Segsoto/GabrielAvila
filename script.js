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

const categories = [...document.querySelectorAll('.category')];
const filters = [...document.querySelectorAll('.subcategory')];
const cards = [...document.querySelectorAll('.photo-card')];
const gallery = document.getElementById('gallery');
const empty = document.getElementById('empty-gallery');
const emptyTitle = document.getElementById('empty-title');
const emptyMessage = document.getElementById('empty-message');
const footballFilters = document.getElementById('football-filters');
const note = document.getElementById('portfolio-note');
let category = 'futbol';
let filter = 'todos';

function renderGallery() {
  const isFootball = category === 'futbol';
  footballFilters.hidden = !isFootball;
  gallery.hidden = !isFootball;
  note.hidden = !isFootball || filter !== 'todos';
  let visible = 0;
  cards.forEach(card => {
    const show = isFootball && (filter === 'todos' || card.dataset.group === filter);
    card.hidden = !show;
    if (show) visible++;
  });
  empty.hidden = visible > 0;
  if (!visible) {
    emptyTitle.textContent = isFootball ? 'Galería por completar' : 'Wekfest';
    emptyMessage.textContent = isFootball
      ? 'Aún no hay fotografías identificadas para esta sección.'
      : 'La selección de automovilismo estará disponible cuando se incorporen las fotografías de Wekfest.';
  }
}

categories.forEach(button => button.addEventListener('click', () => {
  category = button.dataset.category;
  categories.forEach(item => { const active = item === button; item.classList.toggle('active', active); item.setAttribute('aria-pressed', String(active)); });
  renderGallery();
}));
filters.forEach(button => button.addEventListener('click', () => {
  filter = button.dataset.filter;
  filters.forEach(item => { const active = item === button; item.classList.toggle('active', active); item.setAttribute('aria-pressed', String(active)); });
  renderGallery();
}));
renderGallery();

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
