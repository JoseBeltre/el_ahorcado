import { getWord } from "./api.js";

// Getting all the keys for the keyboard
const keys = document.querySelectorAll(".key");
// Get the word tiles
const image = document.querySelector(".hangman");
const wordContainer = document.querySelector(".word-container");
let todayWord;
let attempts = 0;
let tiles;


//Function to generate the word tiles
async function generateWordTiles(wordContainer) {
  todayWord = await getWord();
  todayWord = todayWord[0]
  console.log('Today\'s Word:', todayWord);
  todayWord.split("").forEach(() => {
    let tile = document.createElement("div");
    tile.classList.add("tile");
    wordContainer.appendChild(tile);
  });
  tiles = document.querySelectorAll(".tile");
}
generateWordTiles(wordContainer);


//Function to handle the KeyEvents
function handleKeys(letter, key) {
  // Receives the letter wich is a string and the key wich is a nodeElement
  if (attempts <= 5) {
    //We first need to know if we still have attempts left
    if (todayWord.includes(letter)) {
      for (let i = 0; i < todayWord.length; i++) {
        if (todayWord[i] == letter) {
          tiles[i].textContent = letter.toUpperCase();
          tiles[i].classList.add("guessed-letter");
          key.classList.add("guessed-letter");
        }
      }
    } else {
      key.classList.add("wrong-letter");
      attempts++;
      image.src = "./svgs/hangman-" + attempts + ".svg";
    }
  }
}

// Function to check if all the tiles have been guessed
function guessedAllLetters() {
  return Array.from(tiles).every((tile) =>
    tile.classList.contains("guessed-letter"),
  );
}

// Event listeners for the keyboard keys on te interface
keys.forEach((key) => {
  key.addEventListener("click", (e) => {
    console.log(e.target)
    if (
      !e.target.classList.contains("wrong-letter") &&
      !e.target.classList.contains("guessed-letter") &&
      !guessedAllLetters()
    ) {
      handleKeys(key.textContent.toLowerCase(), e.target);
    }
  });
});

// Event listener for the keyboard keys in case of pressing the actually Keyboards keys
document.addEventListener("keydown", (e) => {
  let letter = e.key.toLowerCase();
  let key;
  for (let i = 0; i < keys.length; i++) {
    if (keys[i].textContent.toLowerCase() == letter) {
      key = keys[i];
      break;
    }
  }
  if (
    key &&
    !key.classList.contains("wrong-letter") &&
    !key.classList.contains("guessed-letter") &&
    !guessedAllLetters()
  ) {
    handleKeys(letter, key);
  }
});
