let currentSlide = 0;
const track = document.getElementById("carouselTrack");
const totalSlides = track.children.length;

function updateSlide() {
  const width = track.clientWidth;
  track.style.transform = `translateX(-${currentSlide * width}px)`;
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  updateSlide();
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  updateSlide();
}

setInterval(nextSlide, 4000);

// Calificación por estrellas después del comentario
let selectedRating = 0;
let comentarioPendiente = null;

function solicitarCalificacion() {
  const nombre = document.getElementById("nombre").value.trim();
  const texto = document.getElementById("comentario").value.trim();

  if (nombre && texto) {
    comentarioPendiente = { nombre, texto };
    document.getElementById("rating").style.display = "flex";
  }
}

document.querySelectorAll('#rating span').forEach(star => {
  star.addEventListener('click', () => {
    selectedRating = parseInt(star.getAttribute('data-value'));
    if (comentarioPendiente) {
      agregarComentarioConEstrellas();
    }
  });

  star.addEventListener('mouseover', () => {
    const val = parseInt(star.getAttribute('data-value'));
    highlightStars(val);
  });

  star.addEventListener('mouseout', () => {
    highlightStars(selectedRating);
  });
});

function highlightStars(value) {
  document.querySelectorAll('#rating span').forEach(star => {
    const starValue = parseInt(star.getAttribute('data-value'));
    star.classList.toggle('selected', starValue <= value);
  });
}

function agregarComentarioConEstrellas() {
  const { nombre, texto } = comentarioPendiente;

  const estrellas = '★'.repeat(selectedRating) + '☆'.repeat(5 - selectedRating);
  const comentarios = document.getElementById("comentarios");
  const nuevo = document.createElement("div");
  nuevo.className = "comment-box";
  nuevo.innerHTML = `<strong>${nombre}</strong>: ${texto}<br><span style="color:gold; font-size: 18px;">${estrellas}</span>`;
  comentarios.appendChild(nuevo);

  // Limpiar
  document.getElementById("nombre").value = "";
  document.getElementById("comentario").value = "";
  document.getElementById("rating").style.display = "none";
  selectedRating = 0;
  comentarioPendiente = null;
  highlightStars(0);
}
