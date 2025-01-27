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
        console.log("Iniciando carga del componente...");

        // Fetch del archivo HTML
        const response = await fetch("../components/html/projects_container.html");
        console.log("Respuesta del fetch:", response);

        if (!response.ok) {
            throw new Error(`Error al cargar el archivo: ${response.statusText}`);
        }

        // Leer el contenido del archivo
        const componentHTML = await response.text();
        console.log("Contenido cargado del archivo:", componentHTML);

        // Seleccionar el contenedor donde se agregarán los componentes
        const projectsListContainer = document.getElementById("projects-list-container");
        if (!projectsListContainer) {
            console.error("No se encontró el contenedor 'projects-list-container'.");
            return;
        }

        // Agregar el componente 5 veces
        for (let i = 0; i < 5; i++) {
            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = componentHTML;
            projectsListContainer.appendChild(tempDiv.firstElementChild);
        }

        console.log("Componentes añadidos dinámicamente.");
    } catch (error) {
        console.error("Error al cargar el componente:", error);
    }
}

// Ejecutar cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", function () {
    const projectsContainer = document.getElementById("projects-list-container");

    // Cargar el contenido de projects_container.html
    fetch("/components/html/projects_container.html")
        .then(response => {
            if (!response.ok) {
                throw new Error("No se pudo cargar el archivo.");
            }
            return response.text();
        })
        .then(data => {
            // Insertar el contenido en el contenedor
            for (i = 0; i < 5; i++) {
                projectsContainer.innerHTML += data;
            }

        })
        .catch(error => {
            console.error("Error al cargar el contenido:", error);
        });
});

// (async () => {
//     const projects = await loadData();
//     console.log("Proyectos cargados:", projects);
// })();