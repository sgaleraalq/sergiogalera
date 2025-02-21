
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


document.addEventListener('DOMContentLoaded', () => {
  initWebsite();
  initObservers();
  // disableAnimations();
});

function initWebsite() {
  const logoAnimationDuration     = 3500; 
  const introAnimationContainer   = document.querySelector('.intro-animation-container');
  const introLogo                 = document.querySelector('.intro-video');

  setTimeout(() => {
    introLogo.classList.add('shrink');
  }, 3300);

  setTimeout(() => {
    introAnimationContainer.style.display   = 'none';
    initAnimations();
  }, logoAnimationDuration);
}

const animationDownInterval = 100;
function initAnimations() {
  document.body.style.overflowY = "auto";
  const logoContainer = document.querySelector(".logo-container");

  if (!logoContainer) return;

  setTimeout(() => {
    logoContainer.classList.add("show");

    logoContainer.addEventListener("transitionend",() => {
        showNavBtns();
      },
      { once: true }
    );
  }, animationDownInterval);
}

function showNavBtns() {
  const webNav                = document.querySelector(".website-navigation");
  const mobNav                = document.querySelector(".mobile-navigation-button");
  const docNavigation         = document.querySelector(".website-list");
  const resumeBtn             = document.querySelector(".website-navigation-resume");
  const mainContent           = document.querySelector(".main-content");
  const socialMediaContainer  = document.querySelector(".framer.social-media-container");
  
  if (!webNav || getComputedStyle(webNav).display === "none") {
    resumeBtn.classList.add("show");
    mainContent.style.display = "block";
    socialMediaContainer.classList.add("show");
    mobNav.classList.add("show");
    return;
  }

  const navItems = Array.from(docNavigation.children);

  navItems.forEach((child, index) => {
    setTimeout(() => {
      child.classList.add("show");

      if (index === navItems.length - 1) {
        child.addEventListener("transitionend",() => {
            resumeBtn.classList.add("show");
            mainContent.style.display = "block";
            socialMediaContainer.classList.add("show");
          },
          { once: true }
        );
      }
    }, animationDownInterval * index);
  });
}


function initObservers() {
  initObserverByElement(".about-me-description-container");
  initObserverByElement(".experience-main-container");
  initObserverByElement(".other-projects-title");
  initObserverByElement(".other-projects-list-container");
  initObserverByElement(".contact-main-container");
}


function initObserverByElement(container, isDiv = false) {
  let div

  console.log(container, isDiv);
  if (!isDiv){
    div = document.querySelector(container);
  } else {
    div = container;
  }

  const divObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        divObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  divObserver.observe(div);
}




// ALLOW DISABELING FOR DEVELOPMENT
function disableAnimations() {
  const mainContent                       = document.querySelector('.main-content');
  const introAnimationContainer           = document.querySelector('.intro-animation-container');
  document.body.style.overflowY           = "auto";
  introAnimationContainer.style.display   = 'none';
  mainContent.style.display               = 'block';

  function removeAnimation(component){
    component.style.opacity = "1";
    component.style.transform = "translateY(0px)";
    component.style.animation = "slideIn 0s ease forwards";
  }
  const selectors = [
    ".introduction",
    ".intro-title",
    ".intro-subtitle",
    ".intro-description-container",
    ".intro-button-container",
    ".about-me-description-container",
    ".experience-main-container",
    ".main-container",
    ".other-projects-title",
    ".other-projects-list-container"
  ];
  const animatedComp = document.querySelectorAll(selectors.join(", "));
  
  animatedComp.forEach(element => {
    removeAnimation(element);
  });

  const logoContainer                     = document.querySelector('.logo-container');
  const webNavElements                    = document.querySelectorAll('.website-list-element');
  const resumeBtn                         = document.querySelector('.website-navigation-resume');
  webNavElements.forEach( element => {
      removeAnimation(element);
  });
  removeAnimation(logoContainer);
  removeAnimation(resumeBtn);

}