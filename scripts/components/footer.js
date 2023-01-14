export default function Footer() {
  const footer = document.createElement("footer");
  footer.innerHTML += `
    <p>© 2023 Licensed under the 
      <a 
        href="https://www.gnu.org/licenses/agpl-3.0.html" 
        target="_blank">
          GNU AGPL
      </a>
       | 
      <a 
        href="https://github.com/michaelkolesidis/emoji-minesweeper" 
        target="_blank">
          GitHub
      </a>
    </p>`;

  return footer;
}
