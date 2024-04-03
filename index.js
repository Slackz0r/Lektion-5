const API_URL = "https://swapi.dev/api/people";

// getData();

class Character {
  constructor(
    name,
    gender,
    height,
    mass,
    hairColor,
    skinColor,
    eyeColor,
    starring,
    image
  ) {
    this.name = name;
    this.gender = gender;
    this.height = height;
    this.mass = mass;
    this.hair_color = hairColor;
    this.skin_color = skinColor;
    this.eye_color = eyeColor;
    this.films = starring;
    this.image = image;
  }
}

//Select
let firstSelect = document.querySelector("#char1");
let secondSelect = document.querySelector("#char2");

// Buttons + Container
let firstButton = document.querySelector("#generateOne");
let oneCharContainer = document.querySelector(".firstChar");
let secondButton = document.querySelector("#generateTwo");
let twoCharContainer = document.querySelector(".secondChar");

//ARRAYS
let firstList = [];
let secondList = [];

//EVENT LISTENERS
firstButton.addEventListener("click", async () => {
  firstList = [];
  oneCharContainer.innerHTML = "";
  let firstChar = "firstCharacter";
  getCharacter(firstSelect, firstList, oneCharContainer, firstChar);
});

secondButton.addEventListener("click", async () => {
  secondList = [];
  twoCharContainer.innerHTML = "";
  let secondChar = "secondCharacter";
  getCharacter(secondSelect, secondList, twoCharContainer, secondChar);
});

let getCharacter = async (selected, array, container, string) => {
  let selectedCharacter = selected.value;
  //Skickar SelectedCharacter1 till getData och blir "selectedCharacter"
  let character = await getData(selectedCharacter);

  let characterInstance = new Character(
    character.name,
    character.gender,
    parseInt(character.height),
    parseInt(character.mass),
    character.hair_color,
    character.skin_color,
    character.eye_color,
    character.films,
    character.image
  );
  console.log(characterInstance);

  let myH2 = document.createElement("h2");
  myH2.innerText = `${character.name}`;

  let genderText = document.createElement("p");
  genderText.innerHTML = `Gender: ${character.gender}`;

  let heightText = document.createElement("p");
  heightText.innerText = `Height: ${character.height}`;
  heightText.classList.add(string);

  let massText = document.createElement("p");
  massText.innerText = `Weight: ${character.mass}`;

  let hairText = document.createElement("p");
  hairText.innerText = `Hair color: ${character.hair_color}`;

  let skinText = document.createElement("p");
  skinText.innerText = `Skin color: ${character.skin_color}`;

  let eyeText = document.createElement("p");
  eyeText.innerText = `Eye color: ${character.eye_color}`;

  let filmText = document.createElement("p");
  filmText.innerText = `Amount of films: ${character.films.length}`;

  let image = document.createElement("img");
  image.height = 100;
  image.width = 100;
  if (character.name == "Luke Skywalker") {
    image.src = "/images/Luke_skywalker.webp";
  } else {
    image.src = "/images/R2-D2.jpg";
  }

  container.append(
    myH2,
    genderText,
    heightText,
    massText,
    hairText,
    skinText,
    eyeText,
    filmText,
    image
  );
  array.push(characterInstance);
};

//Render char. SelectedCharacter = Luke, R2-D2
let getData = async (selectedCharacter) => {
  try {
    let response = await axios.get(API_URL, {
      params: { search: selectedCharacter },
    });
    let characterData = response.data.results[0];

    console.log(selectedCharacter);
    //Return tillåter oss att använda en karaktär med getData funktionen.
    return characterData;
  } catch (err) {
    console.log("Error fetching data: ", err);
  }
};

//COMPARE
document.querySelector("#btn").addEventListener("click", () => {
  console.log(firstList, secondList);
  console.log(firstList[0].height, secondList[0].height);
  //HEIGHT CHECK
  let heightBar1 = document.querySelector(".firstCharacter");
  let heightBar2 = document.querySelector(".secondCharacter");
  if (firstList[0].height > secondList[0].height) {
    console.log(heightBar1);
    heightBar1.style.background = "green";
  } else if (firstList[0].height < secondList[0].height) {
    heightBar2.style.background = "green";
  }
  // WEIGHT CHECK

  if (firstList[0].weight > secondList[0].weight) {
    massText.style.color = "green";
  }
  //AMOUT OF MOVIES
  // same gender?
  //Same haircolor
  //same skincolor
});
// let character = new Character(
//   characterData.name,
//   characterData.gender,
//   characterData.height,
//   characterData.mass,
//   characterData.hair_color,
//   characterData.skin_color,
//   characterData.eye_color,
//   characterData.films,
//   characterData.image
// );
