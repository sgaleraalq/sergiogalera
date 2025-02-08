const projects      = "/static/json/projects.json";
const otherProjects = "/static/json/other_projects.json";

import { loadData, loadComponent } from "/scripts/main.js";

async function loadProjects() {
    const projectsContainer = document.getElementById("projects-list-container");

    const data = await loadData(projects);

    // Cargar la plantilla projects_container.html
    const template = await loadComponent();

    data.forEach((project, index) => {
        const tempContainer = document.createElement("div");
        tempContainer.innerHTML = template;

        // MAIN IMAGE
        const mainImage = tempContainer.querySelector(".project-image");
        mainImage.src = project.image;
        mainImage.onload = function () {};
        mainImage.onerror = function() { loadErrorImage(this) };
        mainImage.addEventListener("mouseenter", function(){ changeImage(this, project.gif) });
        mainImage.addEventListener("mouseleave", function(){ changeImage(this, project.image) });
        mainImage.addEventListener("animationend", function(){ changeImage(this, project.image) });
        mainImage.addEventListener("click", function(){ navigateToProject(project.id) });

        // CONTENEDORES Y DATOS
        displayTechnology(tempContainer.querySelector(".technology-container"), project.technology);
        tempContainer.querySelector("#title").textContent = project.title;
        tempContainer.querySelector("#description").innerHTML = project.description.replace(/\n/g, '<br>');

        // Agregar skills
        project.skills.forEach(skill => {
            const skillElement = document.createElement("p");
            skillElement.classList.add("skill");
            skillElement.textContent = skill;
            tempContainer.querySelector(".skills-container").appendChild(skillElement);
        });

        // LINKS CONTAINER
        const linksContainer = tempContainer.querySelector(".links-container");
        displayLinks(linksContainer, project.github_url, "ic_github.svg");
        displayLinks(linksContainer, project.playstore_url, "ic_playstore.svg");
        displayLinks(linksContainer, project.explanation_url, "ic_go.svg");

        // Alternar orden si el índice es impar
        if (index % 2 === 1) {
            tempContainer.querySelectorAll(".main-container, .info-container, .technology-container, .skills-container, .description-container, .project-image, .title")
                .forEach(el => el.classList.add("reverse"));
        }

        projectsContainer.appendChild(tempContainer);
    });
}

function navigateToProject(projectId) {
    if (projectId == "personal_portfolio") {
        window.location.reload();
    } else {
        const url = `/projects/${projectId}`;
        window.location.href = url;
    }
}

function loadErrorImage(imageElement) {
    // Crear un contenedor de error
    const errorContainer = document.createElement("div");
    errorContainer.classList.add("error-container");

    // Crear la imagen de error
    const errorImage = document.createElement("img");
    errorImage.src = "/static/icons/ic_error.svg";
    errorImage.alt = "Imagen no disponible";
    errorImage.classList.add("error-image");

    // Crear el mensaje de error
    const errorMessage = document.createElement("p");
    errorMessage.textContent = "No se pudo cargar la imagen.";
    errorMessage.classList.add("error-message");

    // Agregar la imagen y el mensaje al contenedor
    errorContainer.appendChild(errorImage);
    errorContainer.appendChild(errorMessage);

    // Reemplazar la imagen en el DOM
    imageElement.replaceWith(errorContainer);
}

function changeImage(imageElement, newSrc) {
    if (!newSrc || imageElement.src === newSrc) return;

    fetch(newSrc, { method: "HEAD" })
        .then(response => {
            if (response.ok) {
                imageElement.src = newSrc;
            }
        })
        .catch(error => console.error("Error verificando la imagen:", error));
}

function displayTechnology(container, technology) {
    const icons = {
        "android": {
            "icon": "/static/icons/ic_android.svg",
            "alt": "Android",
        },
        "web": {
            "icon": "/static/icons/ic_web.svg",
            "alt": "Website",
        }
    }

    const icon = container.querySelector("img");
    const techText = container.querySelector("#technology");

    let iconSrc, iconAlt;
    switch (technology.toLowerCase()) {
        case "android":
            iconSrc = icons.android.icon;
            iconAlt = icons.android.alt;
            break;
        case "website":
            iconSrc = icons.web.icon;
            iconAlt = icons.web.alt;
            break;
        default:
            iconSrc = "";
            iconAlt = "";
            break;
    }

    icon.src = iconSrc;
    icon.alt = iconAlt;
    techText.textContent = technology;
}


function displayLinks(container, link, icon) {
    if (link && link.trim() !== "") {
        // Create link and open in a new tab
        const anchor = document.createElement("a");
        anchor.href = link;
        if (icon != "ic_go.svg") anchor.target = "_blank";
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


async function loadOtherProjects() {
    const data = await loadData(otherProjects);
    const container = document.getElementById("other-projects-list-container");

    container.innerHTML = "";

    data.forEach(project => {
        const projectElement = document.createElement("div");
        projectElement.classList.add("other-project-card");

        const languageIcons = {
            "Python": "/static/icons/ic_python.svg",
            "JavaScript": "/static/icons/ic_javascript.svg",
            "Java": "/static/icons/ic_java.svg",
            "Kotlin": "/static/icons/ic_kotlin.svg"
        };

        const languagesHTML = project.programming_languages
            .map(lang => `<img src="${languageIcons[lang] || '/static/icons/default.svg'}" alt="${lang}" title="${lang}" class="language-icon">`)
            .join("");

        projectElement.innerHTML = `
            <a href="${project.link}" target="_blank" class="project-link">
                <img src="${project.image}" alt="${project.name}" class="other-project-image">
                <h3>${project.name}</h3>
                <p>${project.description}</p>
                <div class="languages-container">${languagesHTML}</div>
            </a>
        `;

        container.appendChild(projectElement);

        if (project.compress) {
            const imgElement = projectElement.querySelector(".other-project-image");
            if (imgElement) {
                imgElement.classList.add("compressed");
            }
        }
    });
}


// Ejecutar cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", async function () {
    await loadProjects();
    await loadOtherProjects();
    checkAndToggleReverseClass();
});


function checkAndToggleReverseClass() {
    const mediaQuery = window.matchMedia('(max-width: 1800px)');
    const reverseElements = document.querySelectorAll('.reverse');

    function handleMediaChange(e) {
        if (e.matches) {
            reverseElements.forEach(element => element.classList.remove('reverse'));
        } else {
            reverseElements.forEach(element => element.classList.add('reverse'));
        }
    }

    // Ejecutar al cargar la página
    handleMediaChange(mediaQuery);

    // Escuchar cambios en el tamaño de la ventana
    mediaQuery.addEventListener('change', handleMediaChange);
}

window.addEventListener('resize', checkAndToggleReverseClass);
window.addEventListener('load', checkAndToggleReverseClass);