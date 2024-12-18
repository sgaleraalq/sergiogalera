const header = document.querySelector('.header-container');
const headerHeight = header.offsetHeight;

window.addEventListener('scroll', () => {
  const currentScrollPosition = window.scrollY;

  if (currentScrollPosition <= headerHeight) {
    // Desplaza el encabezado hacia arriba proporcionalmente al scroll
    header.style.transform = `translateY(-${currentScrollPosition}px)`;
  } else {
    // Cuando el scroll excede la altura del encabezado, escóndelo completamente
    header.style.transform = `translateY(-${headerHeight}px)`;
  }
});
