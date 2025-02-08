const experience    = "/static/json/experience.json";
const component     = "/components/html/experience_container.html"; 

document.addEventListener('DOMContentLoaded', async function(){
    const data = await loadData(experience);
    loadTimeline(data);
    loadExperience(data);
})


function loadTimeline(data) {
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

    
}

function loadExperience(data){

}