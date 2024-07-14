import { getWord } from "./api.js";
import { createModal } from "./modal.js";

// Getting all the keys for the keyboard
const keys = document.querySelectorAll(".key");
// Get the word tiles
const image = document.querySelector(".hangman");
const wordContainer = document.querySelector(".word-container");
let tiles;
const modalContainer = document.querySelector(".modal-container");
let gameInfo ={
  win: null,
  word: '',
  attempts: 0,
  wrongLetters: [],
  guessedLetters: [],
}

// Function that cure the word obtained from the API
function cureWord(word) {
  // The received word is a array
  word = word[0]
  // We normalize the word to remove accents and diacritics
  return word.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

//Function to generate the word tiles
async function generateWordTiles(wordContainer) {
  const word = await getWord();
  gameInfo.word = cureWord(word);
  console.log(gameInfo.word);
  gameInfo.word.split("").forEach(() => {
    let tile = document.createElement("div");
    tile.classList.add("tile");
    wordContainer.appendChild(tile);
  });
  tiles = document.querySelectorAll(".tile");
}
generateWordTiles(wordContainer);


// Function to check if all the tiles have been guessed
function guessedAllLetters() {
  return Array.from(tiles).every((tile) =>
    tile.classList.contains("guessed-letter"))
  
}
//Function to handle the KeyEvents
function handleKeys(letter, key) {
  // Receives the letter wich is a string and the key wich is a nodeElement
    if (gameInfo.word.includes(letter)) {
      for (let i = 0; i < gameInfo.word.length; i++) {
        if (gameInfo.word[i] == letter) {
          tiles[i].textContent = letter.toUpperCase();
          tiles[i].classList.add("guessed-letter");
          key.classList.add("guessed-letter");
          gameInfo.guessedLetters.push(letter.toUpperCase());
        }
      }
      if (guessedAllLetters()) {
        gameInfo.win = true;
        createModal(gameInfo, modalContainer)
      }
    } else {
      key.classList.add("wrong-letter");
      image.src = "./svgs/hangman-" + gameInfo.attempts + ".svg";
      gameInfo.wrongLetters.push(letter.toUpperCase());
      gameInfo.attempts++;
      if (gameInfo.attempts == 6) {
        gameInfo.win = false;
      createModal(gameInfo, modalContainer)
      }
    }
  
}


// Event listeners for the keyboard keys on te interface
keys.forEach((key) => {
  key.addEventListener("click", (e) => {
    if (
      !e.target.classList.contains("wrong-letter") &&
      !e.target.classList.contains("guessed-letter") &&
      !guessedAllLetters() &&
      gameInfo.win == null
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
    !guessedAllLetters() &&
    gameInfo.win == null
  ) {
    handleKeys(letter, key);
  }
});
