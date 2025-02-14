
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
    description.textContent = _screensObject[_screenSelected].description;
}
