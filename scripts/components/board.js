export default function Board(parent) {
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
