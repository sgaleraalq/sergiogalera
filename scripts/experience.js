const experience    = "/static/json/experience.json";
const component     = "/components/html/experience_container.html"; 

document.addEventListener('DOMContentLoaded', async function(){
    const data = await loadData(experience);
    loadTimeline(data);
    loadExperience(data);
})


function loadTimeline(data) {
    const timeline = document.querySelector("#timeline");

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

    const firstYear = Math.min(...experienceYears, ...intershipYears);
    const now = new Date().getFullYear();

    loadTimelineItem(experienceYears, "timeline-experience-item", firstYear, now);
    loadTimelineItem(intershipYears, "timeline-experience-item", firstYear, now);
}

function loadTimelineItem(yearList, element, firstYear, now) {
    yearList.forEach(year => {
        console.log(year)
        const yearElement = document.createElement("div");
        yearElement.classList.add(element);

        // Position percentage of the year
        const percentage = (year - firstYear) / (now - firstYear) * 100;
        yearElement.style.left = `${percentage}%`;
        yearElement.style.marginLeft = "-15px";
        yearElement.setAttribute("data-year", year);

        timeline.appendChild(yearElement);
    })
}

function loadExperience(data){

}