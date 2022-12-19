<div align="center">
  <img height="100px" src="./assets/logo.png" /><br>
  <br><br>
  <img src="./screenshots/win-ss.png" /><br>
</div>

<h3 align="center">Minesweeper made with 😄 😵 💣 💥 🚩 and ❤️ <br><a target="_blank" href="https://minesweeper-emoji.netlify.app/">Try me!</a><h3>



[![Netlify Status](https://api.netlify.com/api/v1/badges/b318a02a-0a7e-483e-a046-547a1a3ac6ae/deploy-status)](https://app.netlify.com/sites/minesweeper-emoji/deploys)

  
  
## Technologies Used
<a href="https://p5js.org/"><img src="https://github.com/michaelkolesidis/tech-icons/blob/main/icons/p5js/p5js.svg" height="50px"/></a>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<a href="https://en.wikipedia.org/wiki/JavaScript"><img src="https://github.com/michaelkolesidis/tech-icons/blob/main/icons/javascript/javascript-original.svg" height="50px" /></a>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<a href="https://en.wikipedia.org/wiki/CSS"><img src="https://github.com/michaelkolesidis/tech-icons/blob/main/icons/css3/css3-plain.svg" height="50px" /></a>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<a href="https://en.wikipedia.org/wiki/HTML"><img src="https://github.com/michaelkolesidis/tech-icons/blob/main/icons/html5/html5-plain.svg" height="50px" /></a>


[p5.js](https://p5js.org/)

[JavaScript](https://en.wikipedia.org/wiki/JavaScript)

[CSS](https://en.wikipedia.org/wiki/CSS)

[HTML](https://en.wikipedia.org/wiki/HTML)


  
## Description
The classic Minesweeper game reimagined and implemented with emojis. It is an example of object-oriented JavaScript: each Cell is an instance of the class Cell. Mines are allocated randomly on page load. 



## Features
### Mines
* Random mine 💣 allocation on load
* Ensure that the first click is never on a mine 💣
* Fixed (15) total number of mines 💣

### Flagging
* Ability to flag 🚩 possible location of mines
* Revealed cells cannot be flagged 🚩
* Whenever a cell is revealed it stops being flagged ⬜

### Endgame
* Empty cells become a grinning face with smiling eyes 😄 if the game is won or a dizzy face 😵 if the game is lost
* Different emoji for detonated mine 💥 (the mine the user clicked) and revealed mines 💣 (the rest of the mines)

### Indicators
* Number of initial and remaining mines 💣 indicator
* Number of reamining mines 💣 becomes red if there are more flagged cells than the number of mines 🚩
* Timer indicator ⌛ activated on first click and stopping on game end

### Stats
* Games played, games won and best time are saved on local storage
* Stats panel containing the aformentioned values
* Stats panel smooth animation
* Checks for null values

### Other
* Animated header on hover
* Animated footer logo on hover

### Emojis
The following emojis are used in the game:

😄 😵 🔲 💣 💥 🚩 ⬜️ 1️⃣ 2️⃣ 3️⃣ 4️⃣ 5️⃣ 6️⃣ 7️⃣ 8️⃣ ⌛



## Controls
  
* Left-click to reveal cell<br>
* Right-click to flag
* New Game button restarts the game
* Stats button toggles the stats panel 

  

## Screenshots:
  
#### Win
<img src="./screenshots/win-ss.png" />
  
#### Loss  
<img src="./screenshots/loss-ss.png" />

#### Idle  
<img src="./screenshots/idle-ss.png" />

#### More flags than mines
<img src="./screenshots/flags-ss.png" />
  
#### Stats panel
<img src="./screenshots/stats-ss.png" />
  


## License

<a href="https://www.gnu.org/licenses/gpl-3.0.html"><img src="https://upload.wikimedia.org/wikipedia/commons/9/93/GPLv3_Logo.svg" height="100px" /></a>

Copyright (c) 2022 Michael Kolesidis<br>
Licensed under the [GNU General Public License v3.0](https://www.gnu.org/licenses/gpl-3.0.html).
