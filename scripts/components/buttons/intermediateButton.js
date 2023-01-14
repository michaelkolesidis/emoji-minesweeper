export default function IntermediateButton() {
  // Button
  const intermediateButton = document.createElement("div");
  intermediateButton.className = `emoji-button`;
  intermediateButton.innerHTML = `2️⃣`;
  if (level === "intermediate") {
    intermediateButton.classList.add("emoji-button-clicked");
  }

  // Functionality
  intermediateButton.addEventListener("click", () => {
    if (level !== "intermediate") {
      localStorage.setItem("level", "intermediate");
      window.location.reload();
    }
  });

  return intermediateButton;
}
