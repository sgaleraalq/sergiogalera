
fetch("../static/projects.json")
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
    })
    .catch((error) => console.log("Error: ", error));