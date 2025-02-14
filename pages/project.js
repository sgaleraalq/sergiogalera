
const projectsPath = "/pages/projects/";
const projectId = new URLSearchParams(window.location.search).get("projectId");

document.addEventListener('DOMContentLoaded', async function() {
    await loadProject();
});

let _screensObject = {};
let _screenSelected = null;

async function loadProject() {
    const data = await loadData(projectsPath + projectId + "/description.json");

    document.querySelector(".title-text").textContent = data.title;
    document.querySelector(".title-logo").src = data.logo;


    // Selecting first screen to display
    _screensObject = data.screens[0];
    
    loadScreenBtns(data);
}

function loadScreenBtns(data) {
    // Screen container
    const screensContainer = document.querySelector(".description-screens");
    screensContainer.innerHTML = "";

    // Create a button for each screen
    Object.entries(_screensObject).forEach(([key, screenData]) => {
        const button = document.createElement("div");
        button.classList.add("screen-btn");
        button.setAttribute("data-screen", key);

        button.innerHTML = `
            <div class="screen-icon-container">
                <img src="${screenData.img}" alt="${key}" class="screen-icon">
            </div>
            <p class="screen-text">${key.charAt(0).toUpperCase() + key.slice(1)}</p>
        `;

        // On screen changed event
        button.addEventListener("click", () => {
            window.screenSelected = key;
        });

        // Add screen
        screensContainer.appendChild(button);
    });

    // Select first screen on load
    window.screenSelected = Object.keys(data.screens[0])[0];
}


// Selected Experience listener for changing in value
Object.defineProperty(window, 'screenSelected', {
    get: function() {
        return _screenSelected;
    },
    set: function(value) {
        _screenSelected = value;
        onScreenChanged(value);
    }
}); 

function onScreenChanged(screen) {
    console.log("Selecting screen: ", screen);
    removeSelectedAttributed();
    loadScreenGif();
    selectScreenBtn();
    changeDescription();
}

function removeSelectedAttributed() {
    document.querySelectorAll(".screen-btn").forEach(btn => {
        btn.classList.remove("selected");
    });
}

function loadScreenGif() {
    const gif = _screensObject[_screenSelected].gif;
    document.querySelector(".mobile-content").src = gif;
}

function selectScreenBtn(){
    const btn = document.querySelector(`.screen-btn[data-screen="${_screenSelected}"]`);
    btn.classList.add("selected");
}


function changeDescription() {
    const description = document.querySelector(".description-text");
    description.innerHTML = "";

    const descArray = _screensObject[_screenSelected].description;
    let list = null;

    descArray.forEach(line => {
        // Handles images if present in the description text
        if (line.includes("<img class='description-icon'") && !line.startsWith(" - ")) {
            const paragraph = document.createElement("p");
            paragraph.classList.add("text");
            paragraph.innerHTML = line.replace(/^ - /, "");
            description.appendChild(paragraph);
        }
        // When line is part of a list
        else if (line.startsWith(" - ")) {
            if (!list) {
                list = document.createElement("ul");
                list.classList.add("description-list");
                description.appendChild(list);
            }

            const listItem = document.createElement("li");
            listItem.innerHTML = line.replace(/^ - /, "");
            list.appendChild(listItem);
        } else {
            // Handles text, no list or images included
            const paragraph = document.createElement("p");
            paragraph.classList.add("text");
            paragraph.textContent = line;
            description.appendChild(paragraph);
            
            // Reset list
            list = null;
        }
    });
}
