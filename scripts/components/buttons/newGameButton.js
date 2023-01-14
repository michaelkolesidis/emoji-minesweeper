export default function NewGameButton() {
  // Button
  const newGameButton = document.createElement("button");
  newGameButton.setAttribute("id", "new-game-button");
  newGameButton.innerHTML = `New Game`;

  // Functionality
  newGameButton.addEventListener("click", () => {
    window.location.reload();
  });

  return newGameButton;
}
