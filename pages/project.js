
const projectsPath = "/static/projects/";
const projectId = new URLSearchParams(window.location.search).get("projectId");

document.addEventListener('DOMContentLoaded', async function() {
    await loadProject();
});


async function loadProject() {
    const data = await loadData(projectsPath + projectId + "/description.json");

    const title     = data.title;
    const logo      = data.logo;
}