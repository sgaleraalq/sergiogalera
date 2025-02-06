async function loadData(file_name) {
    try {
        const response = await fetch(`/static/${file_name}`);
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

async function loadProjects() {
    const projectsContainer = document.getElementById("projects-list-container");

    const data = await loadData("projects.json");
    console.log(data); 

    // Cargar la plantilla projects_container.html
    const template = await loadComponent();

    data.forEach((project, index) => {
        const tempContainer = document.createElement("div");
        tempContainer.innerHTML = template;

        // MAIN IMAGE
        const mainImage = tempContainer.querySelector(".project-image");
        mainImage.src = project.image;
        // TODO
        // mainImage.onerror = function() {
        //     this.src = "/static/images/projects/error_image.png";
        // };

        // TECHNOLOGY CONTAINER
        displayTechnology(tempContainer.querySelector(".technology-container"), project.technology, project.technology_url);

        // TEXT CONTAINERS
        tempContainer.querySelector("#title").textContent = project.title;
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
        displayLinks(linksContainer, project.explanation_url, "ic_go.svg");
        
        // IF PROJECT IS ODD, REVERSE THE CONTAINERS
        if (index % 2 == 1) {
            tempContainer.querySelector(".main-container").classList.add("reverse");
            tempContainer.querySelector(".info-container").classList.add("reverse");
            tempContainer.querySelector(".technology-container").classList.add("reverse");
            tempContainer.querySelector(".skills-container").classList.add("reverse");
            tempContainer.querySelector(".description-container").classList.add("reverse");
            tempContainer.querySelector(".project-image").classList.add("reverse");
            tempContainer.querySelector(".title").classList.add("reverse");
        }
        projectsContainer.innerHTML += tempContainer.innerHTML;

    })
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
        if (icon != "ic_go.svg") anchor.target = "_blank"; // Open in a new tab if not explanation link
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
    const data = await loadData("other_projects.json");
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
    });
}


// Ejecutar cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", async function () {
    loadProjects();
    loadOtherProjects();
});