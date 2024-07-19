// const gameInfo = {
//   // Modal configuration properties
//   win: false,
//   word: "Aguacate",
//   attempts: 4,
//   wrongLetters: [],
//   guessedLetters: [],
// };
export const modal = {
  results(gameInfo, container) {
    // Implement modal creation logic here
    gameInfo.word = gameInfo.word.toUpperCase();
    const title = gameInfo.win ? "¡Has adivinado la palabra" : "Has perdido";
    const winMessages = [
      "¡Lo has logrado!",
      "¡Eres increíble!",
      "Estaba díficil, pero lo lograste 😋",
      "¿Cómo? 😐",
      "¡Que crack!",
      "Mi mami lo haría más rápido 🤭",
      "Estaba fácil",
      "¡Mira mamá, sin manos! 🤗",
    ];
    const loseMessages = [
      "Sigue intentando",
      "No te rindas",
      "Intenta de nuevo",
      "No lo dejes de intentar",
      "Estabamos tan cerca",
      "Para la próxima",
      "Ánimos, podemos volver a intentarlo",
      "Eres malísimo loco 😂",
      "Esa si que estaba díficil 🤕",
    ];
    const message = gameInfo.win
      ? winMessages[Math.floor(Math.random() * winMessages.length)]
      : loseMessages[Math.floor(Math.random() * winMessages.length)];
    const color = {
      primary: gameInfo.win ? "text-green-400" : "text-red-400",
      secondary: gameInfo.win ? "dark:text-green-200" : "dark:text-red-300",
      background: gameInfo.win ? "bg-green-400" : "bg-red-400",
    };
    console.log(gameInfo);
    let modal = document.createElement("div");
    modal.classList.add("modal");
    let modalInnerHTML = `
            <h3 class="uppercase ${color.primary} font-bold  text-2xl leading-5 ">${title}</h3>
            <p class="text-sm ${color.secondary} ">${message}</p>
            <p class="">La palabra era <span class="font-bold  uppercase dark:tracking-wide text-orange-400">${gameInfo.word}</span></p>
            <table class="game-stats w-full  my-3">
              <tr>
                <th class="w-[50%] ${color.secondary} dark:font-semibold dark:tracking-wide">Letra</th>
                <th class="w-[50%] ${color.secondary} dark:font-semibold dark:tracking-wide">Adivinado</th>
              </tr>`;
    for (let i = 0; i < gameInfo.word.length; i++) {
      modalInnerHTML += `
                  <tr>
                    <td class="uppercase">${gameInfo.word[i]}</td>`;
      if (gameInfo.guessedLetters.includes(gameInfo.word[i])) {
        modalInnerHTML += `
                    <td>✅</td>
                  </tr>
                `;
      } else {
        modalInnerHTML += `
                    <td>❌</td>
                  </tr>
                `;
      }
    }
    modalInnerHTML += `
            </table>
            <div class="">
              <h4 class="${color.secondary} font-semibold">Palabras incorrectas</h4>`;
    if (gameInfo.wrongLetters.length > 0) {
      gameInfo.wrongLetters.forEach((letter) => {
        modalInnerHTML += `
                <span class="text-red-400 font-semibold uppercase">${letter}</span>
                `;
        if (letter != gameInfo.wrongLetters[gameInfo.wrongLetters.length - 1]) {
          modalInnerHTML += ` - `;
        }
      });
    } else {
      modalInnerHTML += `
                <p class="${color.secondary}">No hubo errores, tremendo.</p>
              `;
    }
    modalInnerHTML += `
            </div>
            <a href="./" class="w-full block p-1 ${color.background} mt-4 rounded-md text-white font-semibold ">Volver a jugar</a>
  `;
    container.style.visibility = "visible";
    modal.innerHTML = modalInnerHTML;
    container.appendChild(modal);
    setTimeout(() => {
      modal.classList.add("modal-enter");
    }, 10);
  },
  stats(userInfo, container) {
    const modal = document.createElement("div");
    modal.classList.add("modal", "overflow-hidden", 'p-0');
    let modalInnerHTML = `
          <div class="bg-primary flex  ps-4 text-white items-center justify-between ">
            <h1 class=" font-bold uppercase tracking-wide text-xl">
              Estadisticas
            </h1>
            <button title="Cerrar" class="flex items-center justify-center py-1.5 px-2 hover:bg-red-400 transition-colors close-modal">
              <span class="material-symbols-outlined" >
                close
                </span>
            </button>
          </div>
          <div class="p-5 ">
            <ul>
              <li class="text-left ">
                <h4 class="font-semibold uppercase text-primary tracking-wide">Victorias</h4>
                <p class="ps-1.5 text-sm">${userInfo.wins} Palabras adivinadas.</p>
              </li>
              <li class="text-left ">
                <h4 class="font-semibold uppercase text-primary tracking-wide">DERROTAS</h4>
                <p class="ps-1.5 text-sm">${userInfo.losses} Partidas perdidas.</p>
              </li>
              <li class="text-left ">
                <h4 class="font-semibold uppercase text-primary tracking-wide">PARTIDAS JUGADAS</h4>
                <p class="ps-1.5 text-sm">${userInfo.gamesPlayed} Partidas jugadas.</p>
              </li>
              <li class="text-left ">
                <h4 class="font-semibold uppercase text-primary tracking-wide">RACHA ACTUAL</h4>
                <p class="ps-1.5 text-sm">${userInfo.currentStreak.streak} Victorias en fila.</p>
              </li>
              <li class="text-left ">
                <h4 class="font-semibold uppercase text-primary tracking-wide">RACHA MÁS LARGA</h4>
                <p class="ps-1.5 text-sm">${userInfo.longestStreak.streak} Victorias en fila.</p>
              </li>
            </ul>
          </div>
    `
    container.classList.toggle('invisible');
    modal.innerHTML = modalInnerHTML;
    container.appendChild(modal);
    setTimeout(() => {
      modal.classList.add("modal-enter");
    }, 10);
    document.querySelector(".close-modal").addEventListener("click", () => {
      this.close()
      container.classList.toggle('invisible');
    })
  },
  close() {
    const modal = document.querySelector(".modal");
    modal.classList.remove("modal-enter");
    setTimeout(() => {
      modal.remove();
    }, 500);
  }
};
