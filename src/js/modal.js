// const options = {
//   // Modal configuration properties
//   win: false,
//   word: "Aguacate",
//   attempts: 4,
//   wrongLetters: [],
//   guessedLetters: [],
// };

export function createModal(options, container) {
  // Implement modal creation logic here
  options.word = options.word.toUpperCase()
  const title = options.win ? "¡Has adivinado la palabra" : "Has perdido";
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
  const message = options.win
    ? winMessages[Math.floor(Math.random() * winMessages.length)]
    : loseMessages[Math.floor(Math.random() * winMessages.length)];
  const color = {
    primary: options.win ? "text-green-400" : "text-red-400",
    secondary: options.win ? "dark:text-green-200" : "dark:text-red-300",
    background: options.win ? "bg-green-400" : "bg-red-400",
  };
  console.log(options)
  let modal = document.createElement("div");
  modal.classList.add('modal');
  let modalInnerHTML = `
            <h3 class="uppercase ${color.primary} font-bold  text-2xl leading-5 ">${title}</h3>
            <p class="text-sm ${color.secondary} ">${message}</p>
            <p class="">La palabra era <span class="font-bold  uppercase dark:tracking-wide text-orange-400">${options.word}</span></p>
            <table class="game-stats w-full  my-3">
              <tr>
                <th class="w-[50%] ${color.secondary} dark:font-semibold dark:tracking-wide">Letra</th>
                <th class="w-[50%] ${color.secondary} dark:font-semibold dark:tracking-wide">Adivinado</th>
              </tr>`;
              for (let i = 0; i < options.word.length; i++) {
                modalInnerHTML += `
                  <tr>
                    <td class="uppercase">${options.word[i]}</td>`;
                if (options.guessedLetters.includes(options.word[i])) {
                  modalInnerHTML += `
                    <td>✅</td>
                  </tr>
                `
                } else {
                  modalInnerHTML += `
                    <td>❌</td>
                  </tr>
                `
                }
              }
            modalInnerHTML += `
            </table>
            <div class="">
              <h4 class="${color.secondary} font-semibold">Palabras incorrectas</h4>`
            if (options.wrongLetters.length > 0) {
              options.wrongLetters.forEach(letter => {
                modalInnerHTML += `
                <span class="text-red-400 font-semibold uppercase">${letter}</span>
                `
                if (letter != options.wrongLetters[options.wrongLetters.length - 1]) {
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
  container.style.visibility = 'visible';
  modal.innerHTML = modalInnerHTML;
  container.appendChild(modal);
  setTimeout(() => {
    modal.classList.add('modal-enter')
  }, 10);
}
