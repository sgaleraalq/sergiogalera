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

    // for (let index = 0; index < data.length; index++) {
    //     const project = data[index];

    //     // Solo procesar el primer proyecto
    //     if (index === 0) {
    //         const tempContainer = document.createElement("div");
    //         tempContainer.innerHTML = template;

    //         const title = tempContainer.querySelector("#title");
    //         title.textContent = project.title;  // Cambiar el texto del título

    //         // If project is reversed
    //         if (project.reverse) {
    //             tempContainer.querySelector(".main-container").classList.add("reverse")
    //         }

    //         // Añadir el contenido al contenedor
    //         projectsContainer.innerHTML += tempContainer.innerHTML;

    //         break;  // Detener la iteración después del primer elemento
    //     }

    //     if (index % 2 == 1) {
    //         tempContainer.querySelector(".main-container").classList.add("reverse")
    //     }
    // }

    data.forEach((project, index) => {
        const tempContainer = document.createElement("div");
        tempContainer.innerHTML = template;


        const title = tempContainer.querySelector("#title")
        title.textContent = project.title

        
        if (index % 2 == 1) {
            tempContainer.querySelector(".main-container").classList.add("reverse")
            tempContainer.querySelector(".info-container").classList.add("reverse")
            tempContainer.querySelector(".technology-container").classList.add("reverse")
            tempContainer.querySelector(".skills-container").classList.add("reverse")
            tempContainer.querySelector(".project-image").classList.add("reverse")
            tempContainer.querySelector(".title").classList.add("reverse")
            tempContainer.querySelector(".description").classList.add("reverse")
        }
        projectsContainer.innerHTML += tempContainer.innerHTML;

    })
});