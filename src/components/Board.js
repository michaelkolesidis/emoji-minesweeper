/*
 *  Emoji Minesweeper
 *  Copyright (c) 2024 Michael Kolesidis
 *  GNU Affero General Public License v3.0
 *
 */

export default function Board() {
  const board = document.createElement("div");
  board.setAttribute("id", "board");
  switch (level) {
    case "beginner":
      board.style.height = "328px";
      break;
    case "intermediate":
      board.style.height = "560px";
      break;
    case "expert":
      board.style.height = "560px";
      break;
  }

  return board;
}
