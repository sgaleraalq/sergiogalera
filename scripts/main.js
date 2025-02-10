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
let headerHeight = header.offsetHeight;
let lastScrollPosition = 0;
let isClicked = false;

// Evento de scroll
window.addEventListener('scroll', () => {
  const currentScrollPosition = window.scrollY;

  if (!isClicked) {
    if (currentScrollPosition <= headerHeight) {
      header.style.transform = `translateY(-${currentScrollPosition}px)`;
    } else {
      header.style.transform = `translateY(-${headerHeight}px)`;
    }

    if (currentScrollPosition < lastScrollPosition) {
      header.style.transform = 'translateY(0)';
    }
  }

  lastScrollPosition = currentScrollPosition;
});

// Añadir eventListener a los botones de navegación
const webNavBtns = document.querySelectorAll('.website-navigation-ref');
webNavBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    hideHeaderWhileScrollingUp();
  });
});




// MOBILE MANAGEMENT
const mobileMenuBtn = document.querySelector('.mobile-navigation-button');
const mobileMenu = document.querySelector('.mobile-menu');
const lottieContainer = document.getElementById('mobile-menu-btn');
let mobileMenuBtnClickable = true;
const mobileNavElements = document.querySelectorAll('.mobile-nav-element');

let isMenuOpen = false;

mobileMenuBtn.addEventListener('click', () => {
  if (!mobileMenuBtnClickable) return;
  mobileMenuBtnClickable = false;

  // Manage states
  if (isMenuOpen) {
      document.body.style.overflow = 'auto';
      mobileMenu.classList.remove('visible');
      mobileMenu.classList.add('hidden');
      lottieContainer.setDirection(-1); 
  } else {
      document.body.style.overflow = 'hidden';
      mobileMenu.classList.remove('hidden');
      mobileMenu.classList.add('visible');
      lottieContainer.setDirection(1); 
  }

  lottieContainer.play();
  isMenuOpen = !isMenuOpen;

  setTimeout(() => {
      mobileMenuBtnClickable = true;
  }, 1000);
});


mobileNavElements.forEach((navElement) => {
  navElement.addEventListener('click', () => {
      const target = navElement.getAttribute('data-target');
      
      // Hacer scroll hacia el destino
      const targetElement = document.querySelector(target);
      if (targetElement) {
          document.body.style.overflow = 'auto';
          mobileMenu.classList.remove('visible');
          mobileMenu.classList.add('hidden');
          targetElement.scrollIntoView({ behavior: 'smooth' });
          lottieContainer.setDirection(-1);
          hideHeaderWhileScrollingUp();
      }
  });
});

function hideHeaderWhileScrollingUp() {
  header.style.transform = `translateY(-${headerHeight}px)`;
  isClicked = true;

  setTimeout(() => {
    isClicked = false;
  }, 1000);
}