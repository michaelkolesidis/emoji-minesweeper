/*
 *  Emoji Minesweeper
 *  Copyright (c) 2024 Michael Kolesidis
 *  GNU Affero General Public License v3.0
 *
 * { CURRENTLY NOT IN USE! }
 */

const favicon = (emoji) => {
  const favicon =
    document.querySelector("link[rel*='icon']") ||
    document.createElement("link");
  if (theme === "mine") {
    favicon.rel = "icon";
    favicon.href = "../assets/favicon.ico";
    document.getElementsByTagName("head")[0].appendChild(favicon);
  } else {
    favicon.rel = "icon";
    favicon.href = `data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>${emoji}</text></svg>`;
    document.getElementsByTagName("head")[0].appendChild(favicon);
  }
};

export default favicon;
