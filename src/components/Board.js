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
      board.style.height = "317px"; // canvas size - 0.6px
      break;
    case "intermediate":
      board.style.height = "541px";
      break;
    case "expert":
      board.style.height = "541px";
      break;
  }

  return board;
}
