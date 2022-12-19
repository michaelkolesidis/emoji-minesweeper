// if (cells[num].minesAround === 0) {
//   // Recursively reveal neighbors
//   let neighbors = getNeighbors(cells[num], cells);
//   console.log(neighbors);
//   neighbors.forEach((c) => {
//     if (!c.revealed) {
//       revealCell(c.num);
//       if (c.flagged) {
//         c.flagged = false;
//         // flaggedCells -= 1;
//       }
//     }
//   });
// }

// (useContext?)
// const map = neighbors.map(neighbor => {
//   if (
//     !neighbor.flagged &&
//     !neighbor.revealed &&
//     (neighbor.neighbors === 0 || !neighbor.bomb)
//   ) {
//     neighbor.revealed = true;
//     if (neighbor.neighbors === 0) {
//       revealNeighbors(minefield, neighbor);
//     }
//   }
//   return neighbor;
// });



// console.log(neighborsNumbers)

// const map = neighbors.map(neighbor => {
//   if (
//     !neighbor.flagged &&
//     !neighbor.revealed &&
//     (neighbor.neighbors === 0 || !neighbor.mine)
//   ) {
//     neighbor.revealed = true;
//     if (neighbor.neighbors === 0) {
//       revealCell(neighbor.num);
//     }
//   }
//   console.log(neighbor)
//   return neighbor;
// });
// }

// FINAL (wrong)
// if (cells[num].minesAround === 0) {
//   console.log("2")
//   let neighbors = getNeighbors(cells[num], cells);
//   // console.log(neighbors);
//   neighbors.forEach(nCell => {
//     console.log("3")
//     if (!nCell.revealed && nCell.minesAround === 0) {
//       console.log("4")
//       setCells((prevCells) =>
//       prevCells.map((cell) => {
//         return cell.num === nCell.num
//           ? { ...cell, revealed: true}
//           : cell;
//       }))
//     }

//       revealCell(nCell.num)
//     // return cell.revealed ? {...cell} : {...cell, revealed: true};
//   })
// }
