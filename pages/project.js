
const projectsPath = "/pages/projects/";
const projectId = new URLSearchParams(window.location.search).get("projectId");

document.addEventListener('DOMContentLoaded', async function() {
    await loadProject();
});


async function loadProject() {
    const data = await loadData(projectsPath + projectId + "/description.json");

    document.querySelector(".title-text").textContent = data.title;
    document.querySelector(".title-logo").src = data.logo;
}