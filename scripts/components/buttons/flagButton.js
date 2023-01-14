export default function FlagButton() {
  // Button
  const flagButton = document.createElement("div");
  flagButton.className = `emoji-button`;
  flagButton.innerHTML = `🚩`;

  // Functionality
  let flagMode = false;
  flagButton.addEventListener("click", () => {
    if (flagMode) {
      localStorage.setItem("flagMode", "false");
      flagButton.classList.remove("emoji-button-clicked");
      flagMode = false;
    } else {
      localStorage.setItem("flagMode", "true");
      flagButton.classList.add("emoji-button-clicked");
      flagMode = true;
    }
  });

  return flagButton;
}
