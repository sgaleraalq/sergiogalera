
document.addEventListener('DOMContentLoaded', async function() {
    await loadProject();
});


async function loadProject() {
    const data = await loadData("/static/projects/gaztelu_bira/description.json");
    console.log(data);
}