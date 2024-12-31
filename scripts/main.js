const header = document.querySelector('.header-container');
const headerHeight = header.offsetHeight;
const timelineExperiences = [
  { id: 'biochemistry-degree', startYear: 2015, finishYear: 2019, isExperience: true, contentId: 'experience-biochemistry-degree' },
  { id: 'bioinformatics-master', startYear: 2020, finishYear: 2022, isExperience: true, contentId: 'experience-bioinformatics-master' },
  { id: 'nasertic', startYear: 2022, finishYear: 'now', isExperience: true, contentId: 'experience-nasertic' },
  { id: 'ucl-internship', startYear: 2018, finishYear: 2018, isExperience: false, contentId: 'internship-ucl' },
  { id: 'qiagen-project', startYear: 2021, finishYear: 2021, isExperience: false, contentId: 'internship-qiagen-project' },
];
const timelineBarColor = 'var(--main-orange)';
document.querySelector('.timeline-bar-background').style.backgroundColor = timelineBarColor;

let isExperienceNotLoaded = true;


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


document.addEventListener('DOMContentLoaded', () => {
  const experienceDiv = document.getElementById('experience-content-container');

  // Crear el IntersectionObserver
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.intersectionRatio === 1 && isExperienceNotLoaded) {
        isExperienceNotLoaded = false;
        const lastExperience = timelineExperiences.find(item => item.finishYear === 'now'); 
        const startingYearPerc = calculateStartingPercentage(lastExperience.startYear);
        const finishYearPerc = calculateStartingPercentage(lastExperience.finishYear);
        const timelineItem = document.getElementById(lastExperience.id);
        initExperienceContent(timelineItem, startingYearPerc, finishYearPerc);
      }
    });
  }, {
    threshold: [0, 1]
  });

  // Observar el elemento
  observer.observe(experienceDiv);
});

document.getElementById('experience-timeline').addEventListener('click', (e) => {
  const timelineItem = e.target.closest('.timeline-item');
  if (!timelineItem) return;

  let year, finishYear, startingYearPerc, finishYearPerc;

  // Comprobamos si el clic fue sobre un timeline-circle o internship-item
  switch (true) {
    case e.target.closest('.timeline-circle') !== null:
      document.querySelectorAll('.internship-pointer').forEach(pointer => pointer.classList.remove('clicked'));
      year = timelineItem.querySelector('.timeline-circle').getAttribute('data-year');
      finishYear = timelineItem.querySelector('.timeline-circle').getAttribute('finish-year');
      startingYearPerc = calculateStartingPercentage(year);
      finishYearPerc = finishYear === "now" ? 100 : calculateStartingPercentage(finishYear);
      break;

      case e.target.closest('.internship-pointer') !== null:
        document.querySelectorAll('.internship-pointer').forEach(pointer => pointer.classList.remove('clicked'));
        const internshipPointer = e.target.closest('.internship-pointer');
        internshipPointer.classList.add('clicked');   
        year = timelineItem.querySelector('.internship-pointer').getAttribute('data-year');
        finishYear = timelineItem.querySelector('.internship-pointer').getAttribute('finish-year');
        startingYearPerc = calculateStartingPercentage(year);
        finishYearPerc = finishYear === "now" ? 100 : calculateStartingPercentage(finishYear);
        break;
    default:
      return;
  }

  initExperienceContent(timelineItem, startingYearPerc, finishYearPerc);
});


/**
 * Timeline
 */
function createTimelineItems() {
  const timelineContainer = document.getElementById('experience-timeline');

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

function initExperienceContent(experience, startingYearPerc, finishYearPerc) {
  const contentId = experience.getAttribute('data-content-id');

  document.querySelectorAll('.timeline-item').forEach(item => {
    item.classList.remove('selected');
  });

  experience.classList.add('selected');

  cleanAllColors();
  paintTimelineBar(startingYearPerc, finishYearPerc);
  paintCircle(experience.id);
  displayExperienceTitle(contentId);
  displayExperienceContent(contentId);
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
      timeline.style.setProperty('--arrow-color', timelineBarColor);
    }, (1.8*1000));
  }
}

function paintCircle(itemId) {
  const circle = document.querySelector(`#${itemId} .timeline-circle`);
  if (circle) {
    circle.style.backgroundColor = timelineBarColor;
  }
}

function displayExperienceTitle(contentId) {
  document.querySelectorAll('.experience-title').forEach(title => {
    title.classList.remove('visible');
  });

  document.querySelectorAll('.experience-labour').forEach(labour => {
    labour.classList.remove('visible');
  });

  const content = document.getElementById(contentId);
  const title = content.querySelector('.experience-title');
  const experienceLabour = content.querySelector('.experience-labour');

  if (title) {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          title.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    });

    observer.observe(title);
  }

  if (experienceLabour) {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            experienceLabour.classList.add('visible');
          }, 500)
          observer.unobserve(entry.target);
        }
      });
    });

    observer.observe(experienceLabour);
  }
}

function displayExperienceContent(contentId) {
  document.querySelectorAll('.experience-content-container > div').forEach(item => {
    item.style.display = 'none';
  });

  const content = document.getElementById(contentId);
  if (content) {
    const items = content.querySelectorAll(".experience-timeline-list li");
    items.forEach(item => {
      item.classList.remove("visible");
    });

    content.style.display = 'block';

    const initialDelay = 1250; 
    const itemDelay = 750;

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          const item = entry.target;

          setTimeout(() => {
            setTimeout(() => {
              item.classList.add("visible");
            }, index * itemDelay);
          }, initialDelay);

          observer.unobserve(item);
        }
      });
    });

    items.forEach(item => observer.observe(item));
  } else {
    console.warn(`No content found for ID: ${contentId}`);
  }
}


createTimelineItems();