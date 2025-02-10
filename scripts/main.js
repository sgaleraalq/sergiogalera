// import lottie from 'lottie-web';

async function loadData(file_name) {
  try {
      const response = await fetch(file_name);
      if (!response.ok) {
          throw new Error(`Error en la solicitud: ${response.statusText}`);
      }
      const data = await response.json();
      return data;
  } catch (error) {
      console.error("Error: ", error);
  }
}

async function loadComponent(component) {
  try {
      const response = await fetch(component);
      if (!response.ok) {
          throw new Error(`Error en la solicitud: ${response.statusText}`);
      }
      const text = await response.text();
      return text;
  } catch (error) {
      console.error("Error: ", error);
  }
}

const header = document.querySelector('.header-container');
const headerHeight = header.offsetHeight;

let lastScrollPosition = 0;
window.addEventListener('scroll', () => {
  const currentScrollPosition = window.scrollY;

  if (currentScrollPosition <= headerHeight) {
    header.style.transform = `translateY(-${currentScrollPosition}px)`;
  } else {
    header.style.transform = `translateY(-${headerHeight}px)`;
  }

  if (currentScrollPosition < lastScrollPosition) {
    header.style.transform = 'translateY(0)';
  }

  lastScrollPosition = currentScrollPosition;
});

// Añadimos un eventListener a los botones de navegación
const webNavBtns = document.querySelectorAll('.website-navigation-ref');
webNavBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        console.log(headerHeight);
        header.style.transform = `translateY(-${headerHeight}px)`;
    });
});



// // MOBILE MANAGEMENT
// // const mobileMenuVisible = false;
// const lottieAnimation = lottie.loadAnimation({
//   container: document.getElementById('mobile-navigation-animation'),
//   renderer: 'svg',
//   loop: false,
//   autoplay: false,
//   path: '/static/lottie/lottie_menu_to_cross.json',
// })

// // document.getElementById("mobile-navigation-animation").addEventListener("click", () => {
// //   animation.goToAndPlay(0, true); // Reproducir desde el inicio
// // });