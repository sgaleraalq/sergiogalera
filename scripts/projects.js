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


        // TEXT CONTAINERS
        tempContainer.querySelector("#title").textContent = project.title;
        tempContainer.querySelector("#technology").textContent = project.technology;
        tempContainer.querySelector("#description").textContent = project.description;
        tempContainer.querySelector("#description").innerHTML = project.description.replace(/\n/g, '<br>');
        
        // PROJECTS CONTAINER
        project.skills.forEach(skill => {
            const skillElement = document.createElement("p");
            skillElement.classList.add("skill");
            skillElement.textContent = skill;
            tempContainer.querySelector(".skills-container").appendChild(skillElement);
        })

        // LINKS CONTAINER
        const linksContainer = tempContainer.querySelector(".links-container");
        displayLinks(linksContainer, project.github_url, "ic_github.svg");
        displayLinks(linksContainer, project.playstore_url, "ic_playstore.svg");
        
        // IF PROJECT IS ODD, REVERSE THE CONTAINERS
        if (index % 2 == 1) {
            tempContainer.querySelector(".main-container").classList.add("reverse");
            tempContainer.querySelector(".info-container").classList.add("reverse");
            tempContainer.querySelector(".technology-container").classList.add("reverse");
            tempContainer.querySelector(".skills-container").classList.add("reverse");
            tempContainer.querySelector(".project-image").classList.add("reverse");
            tempContainer.querySelector(".title").classList.add("reverse");
            tempContainer.querySelector(".description").classList.add("reverse");
        }
        projectsContainer.innerHTML += tempContainer.innerHTML;

    })
});


function displayLinks(container, link, icon) {
    if (link && link.trim() !== "") {
        // Create link and open in a new tab
        const anchor = document.createElement("a");
        anchor.href = link;
        anchor.target = "_blank";
        anchor.classList.add("link"); 

        // Adds icon to website
        const img = document.createElement("img");
        img.src = `/static/icons/${icon}`; 
        img.alt = icon.split(".")[0];
        img.classList.add("svg");

        anchor.appendChild(img);
        container.appendChild(anchor);
    }
}
