// ==========================
// JS GLOBAL
// ==========================

// CONFIGURACIÓN
const WA_NUMBER = '573152349836'; // Número de WhatsApp (57 + número sin espacios)


// UTILIDADES
const $  = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

// ==========================
// HEADER OCULTAR / MOSTRAR AL SCROLL
// ==========================
let lastScroll = 0;
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > lastScroll && currentScroll > 100) {
    // bajando -> ocultar
    header.classList.add("hide");
  } else {
    // subiendo -> mostrar
    header.classList.remove("hide");
  }

  lastScroll = currentScroll;
});









// ==========================
// JS INICIO
// ==========================

// FUNCION DE CARRUSEL HORIZONTAL
const slides = $$('.slide');
const dots   = $$('.dot');
let currentIndex = 0;

function showSlide(index) {
  const slidesContainer = $('.slides');
  if (slidesContainer) slidesContainer.style.transform = `translateX(-${index * 100}%)`;

  slides.forEach((s, i) => s.classList.toggle('active', i === index));
  dots.forEach((d, i) => d.classList.toggle('active', i === index));

  currentIndex = index;
}

// Controles del slider principal
$('.prev')?.addEventListener('click', () => {
  let index = currentIndex - 1;
  if (index < 0) index = slides.length - 1;
  showSlide(index);
});

$('.next')?.addEventListener('click', () => {
  let index = (currentIndex + 1) % slides.length;
  showSlide(index);
});

dots.forEach((dot, i) => dot.addEventListener('click', () => showSlide(i)));

// Auto slide (5 seg.)
setInterval(() => {
  let index = (currentIndex + 1) % slides.length;
  showSlide(index);
}, 5000);


// CARRUSEL BENEFICIOS

document.addEventListener("DOMContentLoaded", () => {
  const benefits = $$('.benefit2');
  const prevBtn  = $('.prev2');
  const nextBtn  = $('.next2');
  const dots2    = $$('.dot2');
  let currentBenefit = 0;

  function showBenefit(index) {
    if (index < 0) index = benefits.length - 1;
    if (index >= benefits.length) index = 0;

    currentBenefit = index;
    benefits.forEach((b, i) => b.classList.toggle("active", i === index));
    dots2.forEach((d, i) => d.classList.toggle("active", i === index));
  }

  prevBtn?.addEventListener("click", () => showBenefit(currentBenefit - 1));
  nextBtn?.addEventListener("click", () => showBenefit(currentBenefit + 1));
  dots2.forEach((dot, i) => dot.addEventListener("click", () => showBenefit(i)));

  showBenefit(0); // Mostrar el primero al cargar
});










// ==========================
// JS NOSOTROS
// ==========================

// CARRUSEL NOSOTROS
document.addEventListener("DOMContentLoaded", () => {
  const nSlides = $$('.carousel-slide');
  const nDots   = $$('.carousel-dots .dot');
  const prevBtn = $('.carousel-prev');
  const nextBtn = $('.carousel-next');
  let nIndex = 0;

  function showNSlide(index) {
    if (index < 0) index = nSlides.length - 1;
    if (index >= nSlides.length) index = 0;

    nSlides.forEach((s, i) => s.classList.toggle('active', i === index));
    nDots.forEach((d, i) => d.classList.toggle('active', i === index));
    nIndex = index;
  }

  prevBtn?.addEventListener('click', () => showNSlide(nIndex - 1));
  nextBtn?.addEventListener('click', () => showNSlide(nIndex + 1));
  nDots.forEach((dot, i) => dot.addEventListener('click', () => showNSlide(i)));

  // Auto slide (3 seg.)
  setInterval(() => showNSlide(nIndex + 1), 3000);

  showNSlide(0);
});










document.addEventListener("DOMContentLoaded", () => {
  const mainImage = document.querySelector(".main-image");
  const thumbnails = document.querySelectorAll(".thumbnail");
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImage");

  let currentIndex = 0;

  // Cambiar imagen al dar click en miniatura
  thumbnails.forEach((thumb, index) => {
    thumb.addEventListener("click", () => {
      currentIndex = index;
      mainImage.src = thumb.src;
      thumbnails.forEach(t => t.classList.remove("active"));
      thumb.classList.add("active");
    });
  });

  // Abrir modal al dar click en imagen principal
  mainImage.addEventListener("click", () => {
    modal.style.display = "flex"; // se muestra solo al hacer click
    modalImg.src = mainImage.src;
  });

  // Cerrar modal al tocar fuera de la imagen
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
  });

  // Swipe para móvil (opcional)
  let startX = 0;
  mainImage.addEventListener("touchstart", e => startX = e.touches[0].clientX);
  mainImage.addEventListener("touchend", e => {
    let endX = e.changedTouches[0].clientX;
    if (endX - startX > 40) {
      currentIndex = (currentIndex - 1 + thumbnails.length) % thumbnails.length;
    } else if (startX - endX > 40) {
      currentIndex = (currentIndex + 1) % thumbnails.length;
    } else {
      return;
    }
    mainImage.src = thumbnails[currentIndex].src;
    thumbnails.forEach(t => t.classList.remove("active"));
    thumbnails[currentIndex].classList.add("active");
  });
});






