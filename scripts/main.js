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



/**
 * Timeline
 */
function createTimelineItems() {
  const timelineContainer = document.getElementById('experience-timeline');
  const timelineExperiences = [
    { id: 'biochemistry-degree', startYear: 2015, finishYear: 2019, isExperience: true, contentId: 'experience-biochemistry-degree' },
    { id: 'bioinformatics-master', startYear: 2020, finishYear: 2022, isExperience: true, contentId: 'experience-bioinformatics-master' },
    { id: 'nasertic', startYear: 2022, finishYear: 'now', isExperience: true, contentId: 'experience-nasertic' },
    { id: 'ucl-internship', startYear: 2018, finishYear: 2018, isExperience: false, contentId: 'internship-ucl' },
    { id: 'qiagen-project', startYear: 2021, finishYear: 2021, isExperience: false, contentId: 'internship-qiagen-project' },
  ];

  // Elimina elementos previos
  const timelineItems = timelineContainer.querySelectorAll('.timeline-item');
  timelineItems.forEach(item => item.remove());

  // Crea nuevos elementos
  timelineExperiences.forEach(item => {
    const startingPerc = calculateStartingPercentage(item.startYear);

    const timelineItem = document.createElement('div');
    timelineItem.classList.add('timeline-item');
    timelineItem.id = item.id;
    timelineItem.style.left = `${startingPerc}%`;
    timelineItem.setAttribute('data-content-id', item.contentId); // Añade el atributo data-content-id

    const timelineCircle = document.createElement('div');
    timelineCircle.classList.add(item.isExperience ? 'timeline-circle' : 'internship-pointer');
    timelineCircle.setAttribute('data-year', item.startYear);
    timelineCircle.setAttribute('finish-year', item.finishYear);

    timelineItem.appendChild(timelineCircle);
    timelineContainer.appendChild(timelineItem);
  });
}

createTimelineItems();

document.getElementById('experience-timeline').addEventListener('click', (e) => {
  const timelineItem = e.target.closest('.timeline-item');
  if (!timelineItem) return;

  const year = timelineItem.querySelector('.timeline-circle').getAttribute('data-year');
  const finishYear = timelineItem.querySelector('.timeline-circle').getAttribute('finish-year');

  const startingYearPerc = calculateStartingPercentage(year);
  const finishYearPerc = finishYear === "now" ? 100 : calculateStartingPercentage(finishYear);

  cleanAllColors();
  paintTimelineBar(startingYearPerc, finishYearPerc);
  paintCircle(timelineItem.id);

  // Usa el atributo data-content-id
  const contentId = timelineItem.getAttribute('data-content-id');
  displayExperienceContent(contentId);
});

function displayExperienceContent(contentId) {
  // Oculta todo el contenido
  document.querySelectorAll('.experience-content-container > div').forEach(item => {
    item.style.display = 'none';
  });

  // Muestra el contenido correspondiente
  const content = document.getElementById(contentId);
  console.log("Displaying content:", content);
  if (content) {
    content.style.display = 'block';
  } else {
    console.warn(`No content found for ID: ${contentId}`);
  }
}

function calculateStartingPercentage(year) {
  const currentYear = new Date().getFullYear();
  const startingYear = 2015;

  if (year < startingYear) return 0;
  if (year === 'now') return 100;

  return ((year - startingYear) / (currentYear - startingYear)) * 100;
}

function cleanAllColors() {
  document.querySelectorAll('.timeline-circle').forEach(circle => {
    circle.style.backgroundColor = '#ddd';
  });

  document.getElementById('timeline-bar').style.setProperty('--arrow-color', '#ddd');

  const timelineBar = document.getElementById('timeline-bar-background');
  
  timelineBar.style.transition = 'none';
  timelineBar.style.width = '0%';
  timelineBar.offsetHeight;

  timelineBar.style.transition = 'width 2.5s ease-in-out';
}

function paintTimelineBar(startingYearPerc, finishYearPerc) {
  const timelineBar = document.getElementById('timeline-bar-background');
  const timeline = document.getElementById('timeline-bar');

  timelineBar.style.transition = 'none';
  timelineBar.style.left = `${startingYearPerc}%`;
  timelineBar.offsetHeight;
  timelineBar.style.transition = 'width 2.5s ease-in-out';
  timelineBar.style.width = `${finishYearPerc - startingYearPerc}%`;

  if (finishYearPerc === 100) {
    setTimeout(() => {
      timeline.style.setProperty('--arrow-color', 'var(--main-soft-blue)');
    }, (1.8*1000));
  }
}


function paintCircle(itemId) {
  const circle = document.querySelector(`#${itemId} .timeline-circle`);
  if (circle) {
    circle.style.backgroundColor = 'var(--main-soft-blue)';
  }
}


document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".experience-timeline-list li");

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        const item = entry.target;

        // Añadimos la clase "visible" de forma secuencial con un retraso
        setTimeout(() => {
          item.classList.add("visible");
        }, index * 300); // Retraso de 300 ms por cada elemento

        // Deja de observar el elemento para evitar que se reanime
        observer.unobserve(item);
      }
    });
  });

  items.forEach((item) => observer.observe(item));
});