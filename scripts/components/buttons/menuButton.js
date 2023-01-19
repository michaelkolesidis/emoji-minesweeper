// Menu button

export default function menuButton() {
  // Button
  const menuButton = document.createElement("div");
  menuButton.classList.add("emoji-button");
  menuButton.setAttribute("id", "menu-button");
  menuButton.innerHTML = `👤`;

  // Functionality

  return menuButton;
}
