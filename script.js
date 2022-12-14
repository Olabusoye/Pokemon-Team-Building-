/**
 * @param {string} input
 * @returns {Promise<{name: string, image: string, types: string[]}>}
 */
async function getData(input) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${input}`).catch(err => console.log("Error getting data."));
    if (!response.ok) {
        console.log("Search item not found.");
        return null;
    }
    const data = await response.json().catch(err => console.log("Could not get JSON."));

    const types = [];
    data.types.forEach(type => types.push(upperFirstChar(type.type.name))); // ["Electric", "Flying"]
    return {
        name: upperFirstChar(data.name), // Pikachu
        image: data.sprites.front_default, // Img
        types // ["Electric", "Flying"]
    }
}

/**
 * @param {{name: string, image: string, types: string[]}} data
 */
function addCard(data) {
    const searchBox = document.getElementById("search");
    const cards = document.getElementById("slots");
    const card = [...cards.children].find(card => card.classList.contains("empty")); // Find first empty card
    if (card) {
        const cardId = card.id.split("card-")[1];

        const name = document.createElement("h2");
        name.classList.add("name");
        name.innerText = data.name;

        const imageContainer = document.createElement("div");
        imageContainer.classList.add("image");

        const image = document.createElement("img");
        image.src = data.image;
        imageContainer.append(image);

        const infoContainer = document.createElement("div");
        infoContainer.classList.add("info-container");
        const typeElements = [];
        card.classList.add(data.types[0].toLowerCase());
        name.classList.add(data.types[0].toLowerCase());
        data.types.forEach(type => {
            const span = document.createElement("span");
            span.classList.add(type.toLowerCase());
            span.innerText = type;
            typeElements.push(span);
        });
        typeElements.forEach(typeElement => infoContainer.append(typeElement));

        const buttonContainer = document.createElement("div");
        buttonContainer.classList.add("button-container");
        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete");
        deleteButton.innerText = "Delete";
        deleteButton.addEventListener("click", () => deleteCard(cardId));
        buttonContainer.append(deleteButton);

        card.append(name, imageContainer, infoContainer, buttonContainer);
        card.classList.remove("empty");

        searchBox.value = "";
    }
}

/**
 * @param {string} cardId
 */
function deleteCard(cardId) {
    const card = document.getElementById(`card-${cardId}`);
    if (card) {
        card.innerHTML = "";
        card.className = "card empty";
    }
}

/**
 * @param {string} input
 * @returns {string}
 */
function upperFirstChar(input) {
    return input.charAt(0).toUpperCase() + input.slice(1);
}

const form = document.getElementById("search-form");
form.addEventListener("submit", async (e) => {
    const searchBox = document.getElementById("search");
    e.preventDefault();
    searchBox.classList.remove("error");
    const formData = new FormData(form);
    const search = formData.get("search").toLowerCase(); // pikachu
    const data = await getData(search);

    if (data != null) {
        addCard(data);
    } else {
        searchBox.classList.add("error");
    }
});
