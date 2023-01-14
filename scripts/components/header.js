export default function Header(title) {
  const header = document.createElement("div");
  header.className = `header`;

  let titleCharacters = title.split("");
  for (let i = 0; i < titleCharacters.length; i++) {
    if (titleCharacters[i] === " ") {
      titleCharacters[i] = "&nbsp;";
    }
    header.innerHTML += `<span style="--i:${i}">${titleCharacters[i]}</span>`;
  }

  header.style.fontSize = "31px";

  return header;
}
