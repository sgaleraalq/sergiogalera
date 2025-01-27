async function loadData() {
    try {
        const response = await fetch("../static/projects.json");
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error: ", error);
    }
}

async function loadComponent() {
    try {
        const response = await fetch("/components/html/projects_container.html");
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.statusText}`);
        }
        const text = await response.text();
        return text;
    } catch (error) {
        console.error("Error: ", error);
    }
}


// Ejecutar cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", async function () {
    const projectsContainer = document.getElementById("projects-list-container");

    const data = await loadData();
    console.log(data); 

    // Cargar la plantilla projects_container.html
    const template = await loadComponent();

    data.forEach((project, index) => {
        const tempContainer = document.createElement("div");
        tempContainer.innerHTML = template;


        const title = tempContainer.querySelector("#title")
        title.textContent = project.title
        

        projectsContainer.innerHTML += tempContainer.innerHTML;
    })
});