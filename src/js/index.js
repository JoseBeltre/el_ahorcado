// Getting all the keys for the keyboard
const keys = document.querySelectorAll('.key');
// Get the word tiles
const image = document.querySelector('.hangman');
const wordContainer = document.querySelector('.word-container');
const todayWord = 'amorsote';
const splittedWord = todayWord.split('');
let attempts = 0;
let tiles;

//Function to generate the word tiles
function generateWordTiles(word, wordContainer){
  splittedWord.forEach(letter => {
    let tile = document.createElement('div')
    tile.classList.add('tile')
    wordContainer.appendChild(tile)
  });
}

function handleClick(letter, key) {
  if (attempts <= 5) {
    if (todayWord.includes(letter)) {
      for (let i = 0; i < splittedWord.length; i++) {
        if (splittedWord[i] == letter) {
          tiles[i].textContent = letter.toUpperCase();
          tiles[i].classList.add('guessed-letter')
          key.classList.add('guessed-letter')
        }
      }
    } else {
      key.classList.add('wrong-letter');
      attempts++;
      image.src = './svgs/hangman-' + attempts + '.svg';
    }
  }

}
function guessedAllLetters() {
  return Array.from(tiles).every(tile => tile.classList.contains('guessed-letter'))

}

document.addEventListener('DOMContentLoaded', () =>{
  generateWordTiles(todayWord, wordContainer)
  tiles = document.querySelectorAll('.tile');

  keys.forEach(key => {
    key.addEventListener('click', (e) => {
      if (!e.target.classList.contains('wrong-letter') && !e.target.classList.contains('guessed-letter')  && !guessedAllLetters()) {
        handleClick(key.textContent.toLowerCase(), e.target)
      }
    })
  })
  document.addEventListener('keydown', e => {
    let letter = e.key.toLowerCase();
    let key;
    for (let i = 0; i < keys.length; i++) {
      if (keys[i].textContent.toLowerCase() == letter) {
        key = keys[i]
        break
      }
      
    }
    if (key && !key.classList.contains('wrong-letter') && !key.classList.contains('guessed-letter')  && !guessedAllLetters()) {
      handleClick(letter, key)
    }
    
  })
})

// Function to update the word display



// Function to handle keyboard events
