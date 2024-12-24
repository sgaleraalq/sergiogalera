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
    { id: 'biochemistry-degree', startYear: 2015, finishYear: 2019, isExperience: true },
    { id: 'bioinformatics-master', startYear: 2020, finishYear: 2022, isExperience: true },
    { id: 'nasertic', startYear: 2022, finishYear: 'now', isExperience: true },
    { id: 'ucl-internship', startYear: 2018, finishYear: 2018, isExperience: false },
    { id: 'qiagen-project', startYear: 2021, finishYear: 2021, isExperience: false }
  ];

  const timelineItems = timelineContainer.querySelectorAll('.timeline-item');
  timelineItems.forEach(item => item.remove());

  timelineExperiences.forEach(item => {
    const startingPerc = calculateStartingPercentage(item.startYear);

    const timelineItem = document.createElement('div');
    timelineItem.classList.add('timeline-item');
    timelineItem.id = item.id;
    timelineItem.style.left = `${startingPerc}%`;

    const timelineCircle = document.createElement('div');
    timelineCircle.classList.add(item.isExperience ? 'timeline-circle' : 'internship-pointer');
    timelineCircle.setAttribute('data-year', item.startYear);
    timelineCircle.setAttribute('finish-year', item.finishYear);

    timelineItem.appendChild(timelineCircle);
    timelineContainer.appendChild(timelineItem);
  });
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
}

function paintTimelineBar(startingYearPerc, finishYearPerc) {
  const timelineBar = document.getElementById('timeline-bar-background');
  timelineBar.style.background = `linear-gradient(to right, #ddd ${startingYearPerc}%, #42c9b3 ${startingYearPerc}%, #42c9b3 ${finishYearPerc}%, #ddd ${finishYearPerc}%)`;
  if (finishYearPerc === 100) {
    timelineBar.style.background = `linear-gradient(to right, #ddd ${startingYearPerc}%, #42c9b3 ${startingYearPerc}%)`;
  }
}

function paintCircle(itemId) {
  const circle = document.querySelector(`#${itemId} .timeline-circle`);
  if (circle) {
    circle.style.backgroundColor = '#42c9b3';
  }
}

document.getElementById('experience-timeline').addEventListener('click', (e) => {
  const timelineItem = e.target.closest('.timeline-item');
  if (timelineItem) {
    const year = timelineItem.querySelector('.timeline-circle').getAttribute('data-year');
    const finishYear = timelineItem.querySelector('.timeline-circle').getAttribute('finish-year');

    const startingYearPerc = calculateStartingPercentage(year);
    const finishYearPerc = finishYear === "now" ? 100 : calculateStartingPercentage(finishYear);

    cleanAllColors();
    paintTimelineBar(startingYearPerc, finishYearPerc);
    paintCircle(timelineItem.id);
  }
});

createTimelineItems();



