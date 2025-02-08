const experience    = "/static/json/experience.json";
const component     = "/components/html/experience_container.html"; 

let data;
let _selectedExperience;

let firstYear;
const now = new Date().getFullYear();
function calculatePercentage(year) { return (year - firstYear) / (now - firstYear) * 100; }

// Selected Experience listener for changing in value
Object.defineProperty(window, 'selectedExperience', {
    get: function() {
        return _selectedExperience;
    },
    set: function(value) {
        _selectedExperience = value;
        onExperienceChange(value);
    }
});

function onExperienceChange(){
    resetAllColors();
    resetAllSelections();
    loadTimelineBackground();
}

// When document is ready load components
document.addEventListener('DOMContentLoaded', async function(){
    data = await loadData(experience);
    const lastYear = Math.max(...data.map(experience => experience.startYear));
    
    loadTimelineItems(data);
    window.selectedExperience = data.find(experience => experience.startYear === lastYear);
    loadExperience();
})


// START TIMELINE FUNCTIONS
function loadTimelineItems(data) {
    let experienceYears = [];
    let intershipYears = [];

    // Get all the years of experience and interships
    data.forEach(experience => {
        if (experience.isExperience){
            experienceYears.push(experience.startYear);
        } else {
            intershipYears.push(experience.startYear);
        }
    });

    firstYear = Math.min(...experienceYears, ...intershipYears);

    loadTimelineItem(experienceYears, "timeline-experience-item", firstYear, now);
    loadTimelineItem(intershipYears,  "timeline-internship-item", firstYear, now);
}

function loadTimelineItem(yearList, element, firstYear, now) {
    const timeline = document.querySelector("#timeline");
    yearList.forEach(year => {
        const yearElement = document.createElement("div");
        yearElement.classList.add(element);

        // Position percentage of the year
        const percentage = calculatePercentage(year);
        yearElement.style.left = `${percentage}%`;
        yearElement.style.marginLeft = "-15px";
        yearElement.setAttribute("data-year", year);
        yearElement.addEventListener("click", function(){
            window.selectedExperience = data.find(experience => experience.startYear === year);
        });

        timeline.appendChild(yearElement);
    })
}

function resetAllColors() {
    const allExperiences = document.querySelectorAll(".timeline-experience-item");
    allExperiences.forEach(experience => experience.style.background = "white"); // Reset all experiences colors

    const allInternships = document.querySelectorAll(".timeline-internship-item");
    allInternships.forEach(internship => internship.style.borderTopColor = "white"); // Reset all internships colors

    const timelineArrow = document.querySelector("#timeline-arrow");
    timelineArrow.style.transition = 'none';
    timelineArrow.style.borderLeftColor = "white"; // Reset arrow color
}

function resetAllSelections() {
    document.querySelectorAll(".timeline-experience-item, .timeline-internship-item")
        .forEach(item => item.classList.remove("selected"));
}

// Loads color for timeline background
function loadTimelineBackground() {
    const timeline = document.querySelector("#timeline-background");
    timeline.style.transition = 'none';
    timeline.style.width = "0%";
    timeline.style.left = "0%";

    if (window.selectedExperience.isExperience){
        const selectedExperience = document.querySelector(`.timeline-experience-item[data-year="${window.selectedExperience.startYear}"]`);
        selectedExperience.classList.add("selected"); // Year visible
        selectedExperience.style.background = "var(--main-orange)";

        const firstPercentage = calculatePercentage(window.selectedExperience.startYear);
        const secondPercentage = window.selectedExperience.finishYear === "now" ? 100 : calculatePercentage(window.selectedExperience.finishYear);
        setTimeout(() => {
            timeline.style.transition = 'width 1.5s ease-in-out';
            timeline.style.left = `${firstPercentage}%`;
            timeline.style.width = `${secondPercentage - firstPercentage}%`;
        }, 10);

        if (secondPercentage === 100) {
            colorArrow();
        }
    } else {        
        const selectedInternship = document.querySelector(`.timeline-internship-item[data-year="${window.selectedExperience.startYear}"]`);
        selectedInternship.classList.add("selected"); // Year visible
        selectedInternship.style.borderTopColor = "var(--main-orange)";
    }
}

function colorArrow(){
    const timelineArrow = document.querySelector("#timeline-arrow");
    setTimeout(() => {
        timelineArrow.style.transition = 'border-left-color 0.5s ease-in-out';
        timelineArrow.style.borderLeftColor = "var(--main-orange)";
    }, 1300);
}
// FINISH TIMELINE FUNCTIONS


// START EXPERIENCE FUNCTIONSf
async function loadExperience(){
    const experienceDescriptionContainer = document.getElementById("experience-description-container");

    const template = await loadComponent(component);
    const tempContainer = document.createElement("div");
    tempContainer.classList.add("exp-container");

    tempContainer.innerHTML = template;

    // Agregar el nodo al contenedor principal
    experienceDescriptionContainer.appendChild(tempContainer);

    console.log(tempContainer)
}