let projectsData

fetch("../static/projects.json")
    .then((response) => response.json())
    .then((data) => {
        projectsData = data;
    })
    .catch((error) => console.log("Error: ", error));



    function displayProjects() {
        console.log("Displaying projects..."); // Verifica que la función se llame
        const projectsContainer = document.getElementById("projects-list-container");
        
        if (!projectsContainer) {
            console.error("projects-list-container not found!"); // Verifica que el contenedor exista
            return;
        }
    
        fetch("../components/html/projects_container.html")
            .then((response) => response.text())
            .then((data) => {
                console.log("Data loaded:", data); // Verifica que los datos se carguen
                const tempDiv = document.createElement("div");
                tempDiv.innerHTML = data;
                projectsContainer.appendChild(tempDiv.firstElementChild);
            })
            .catch((error) => {
                console.error("Error loading projects:", error); // Captura errores
            });
    }
    
    document.addEventListener('DOMContentLoaded', displayProjects);