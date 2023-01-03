![Emoji Minesweeper woodmark](./assets/woodmark_light.svg#gh-dark-mode-only)
![Emoji Minesweeper woodmark](./assets/woodmark.svg#gh-light-mode-only)

### Minesweeper made with emojis. The most fun way to play minesweeper!

![Win mines](./screenshots/win_mines.png)
![Win flowers](./screenshots/win_flowers.png)




## [Play!](https://www.emojiminesweeper.com/)

Emoji Minesweeper is a **logic puzzle game**, a variant of the classic [minesweeper game](https://en.wikipedia.org/wiki/Minesweeper_(video_game))  reimagined and implemented using **emojis**! It features a **grid of clickable squares**, with hidden **mines** (or flowers) scattered throughout the board. Safe squares have **numbers** telling you how many mines touch the square. If there is no number, the square doesn't touch any mine. You can use the number clues to solve the game by opening all of the safe squares. If you click on a mine you **lose** the game!

Emoji Minesweeper **always makes the first click safe**. You open squares with the **left mouse button** and put flags on mines with the **right mouse button**. 

The game ends when all safe squares have been opened (**win**) or when a square containing a mine is opened (**loss**). If you win, the empty square get filled with happy faces 😄, and if you loose they get filled with sad faces 😵.

There are **three levels** (beginner, intermediate, and expert) and **two modes** (flower mode and mine mode) to choose from.




## Technologies Used

<a href="https://p5js.org/"><img src="https://github.com/michaelkolesidis/tech-icons/blob/main/icons/p5js/p5js.svg" height="50px"/></a>

[p5.js](https://p5js.org/) is a JavaScript library for creative coding, with a focus on making coding accessible and inclusive for artists, designers, educators, beginners, and anyone else. It can be used to create anything, from simple visuals to fully-fledged games like this one!


<a href="https://en.wikipedia.org/wiki/JavaScript"><img src="https://github.com/michaelkolesidis/tech-icons/blob/main/icons/javascript/javascript-original.svg" height="50px" /></a>

[JavaScript](https://en.wikipedia.org/wiki/JavaScript) is the programming language of the web. It started as a language confined in browsers, but it is now used almost everywhere.

<a href="https://en.wikipedia.org/wiki/CSS"><img src="https://github.com/michaelkolesidis/tech-icons/blob/main/icons/css3/css3-plain.svg" height="50px" /></a>

[CSS](https://en.wikipedia.org/wiki/CSS) is a style sheet language that describes the appearance and presentation of documents and apps.

<a href="https://en.wikipedia.org/wiki/HTML"><img src="https://github.com/michaelkolesidis/tech-icons/blob/main/icons/html5/html5-plain.svg" height="50px" /></a>

[HTML](https://en.wikipedia.org/wiki/HTML) is the standard markup language for documents designed to be displayed in a web browser. It is used in every website and web app.

### Architecture
The game logic and anything that happens inside the board is written in p5.js. The board is drawn inside a [canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) element, with the help of the p5.js library. The object-oriented JavaScript paradigm is used, as each square is an instance of the class Square. The rest of the UI is written in vanilla JavaScript. Everything was written from scratch, with the whole project having only one dependency (p5.js). 

### Server 
***Coming Soon:*** We are currently building our server, which will give players the ability to create an account, save stats and get ranked among other players worldwide! The repository of the server can be found [here](https://github.com/mamarmar/emoji-minesweeper-server).




## How to Play

![Idle](./screenshots/idle.png)

This is the user interface of Emoji Minesweeper. Such a colorful amalgamation or emojis! On the top, you can see a grid of squares: the board. The black square button emoji 🔲 means that the square has not been opened yet. **Left-click on any square to open it**, and start the game. You don't have to worry about your first move, as we have made sure that your first square can never contain a mine (actually it can, but if  that's the case, we relocate the mine to another square so fast that you don't even realize it - you can thank us later). Right below the board you can find three counters. 

On the left you can find the **mine counter** 💣. It shows the number of mines in the board without flags (we will talk about flagging shortly). 

In the middle, next to the abacus 🧮 you can find the **moves counter**. It keeps track of how many moves you have made since the beginning of each game. By *moves* we mean all the clicks (left and right) you have made on closed squares.

Finally, on the right, you can find an ⌛ hourglass and, more importantly, the **time counter**, keeping track of time: seconds passed since you opened the first square. Now let's go back to our game. 

![Board](./screenshots/board.png)

After you click on a square, you will get something like this. When you open a square that does not touch any mines, it will be opened and the adjacent squares will automatically by opened in all directions until reaching squares that contain numbers. A common strategy for starting games is to **randomly click until you get a big opening with lots of numbers**. 

The empty squares ⬜️ are safe squares that do not touch any mines. Some safe squares have numbers telling you how many mines touch the square. The numbered squares can be either 1️⃣, 2️⃣, 3️⃣, 4️⃣, 5️⃣, 6️⃣, 7️⃣, 8️⃣. Why don't we have nine as well? Because **each square can be touched by eight square at most**. Most squares are touched by eight other squares. If a square is located on the border of the board, it is touched by six other squares (as one of is sides is not touched by anything), and if a square is located in one of the four corners of the board, it is touched by only three other squares. Let's see an example.

![Section](./screenshots/section.png)

Let's focus on the 1️⃣ square in the middle. It is touched by eight other squares (oh, by the way, diagonal squares count as well). We can observe that all its surrounding squares **but one** have been opened and are safe. On its left, we can see three empty squares and on its top, bottom and right we can see four numbered squares and a closed one. Since it's number is 1️⃣, it has to be touched by exactly one mine. **Thus, we can safely assume that the closed square will contain a mine**.

![Flag](./screenshots/flag.png)

In order to make our life easier, and keep track of the squares containing mines, we can **right-click** on these squares and flag them 🚩 using a red flag.

![Too many flags](./screenshots/too_many_flags.png)

Be careful, because if you flag more squares than the total number of mines, you won't be able to finish the game, until you unflag some squares. Fortunately, we've got you covered on that too, as the **mine counter will turn red** if you do so.

If you click on a mine you lose the game. If you had wrongly flagged any squares as mines they will be marked with an ❌, to help you identify your mistakes. 

![Loss mine](./screenshots/loss_mines.png)
![Loss flower](./screenshots/loss_flowers.png)

Losing looks like this. Not too bad, huh? In order to win a game, you need to open all the safe squares. When you win or lose a game you need to start a new one. You can achieve that by clicking on the *New Game* button or by pressing the *N key*.

![Stats](./screenshots/stats.png)

In order to keep track of how good (or bad) you are doing the game keeps your stats. To open the stats modal click on the *Stats* button. Stats include metrics such as games played, games won, percentage of wins, best time and best moves and are kept separately for each level. Don't worry if you are not doing that well, as you can always clear your data by clicking on the *Clear Data* button, located inside the stats modal.

![New Record](./screenshots/new_record.png)

If you do a new best time or win the game by the less moves than ever before, not only are your stats updated accordingly, but empty squares become the partying emoji 🥳. The respective counters turn gold as well. In this examples, the player achieved both a new time record and a moves record, thus both counters have turned gold. 

There are three difficulty levels, with different board sizes and numbers of mines.

| Level        | Dimensions | Mines | % of Mines |
| -----------: |:----------:|:-----:|:----------:|
| Beginner     | 9x9        | 10    | ~12.34%    |
| Intermediate | 16x16      | 40    | ~15.63%     |
| Expert       | 30x16      | 99    | ~20.63%    |

You can use the level buttons 1️⃣2️⃣3️⃣ to switch between levels. You can also use the *keyboard keys 1,2 and 3*.

The game features the classic mine mode 💣 and the more peaceful and relaxing flower mode 🌺. You can use the mode button 💣/🌺 to switch between modes, or use the *left and right arrows* on your keyboard. 

Your level and mode preferences are saved in your computer, so your next game always starts with the lastly used configuration.

![New Record](./screenshots/help.png)

If you forget the basic controls you can click the help button ❔to toggle the help modal. Clicking on the flag button 🚩 will toggle flag mode. This will enable you to flag squares by touching them, or by left-clicking on them. You might want to use this if you are on a phone or tablet.

### Summary
* **Left-click** to open a square square
* **Right-click** to flag a square (that you think it) contains a mine
* 💣 Mines counter
* 🧮 Moves counter
* ⌛ Time counter
* *New Game* button restarts the game
* *Stats* button toggles the **stats modal **
* 1️⃣2️⃣3️⃣ buttons switch between **levels** (beginner, intermediate, and expert)
* 💣/🌺 button switches between **modes** (mine and flower)
* ❔button toggles the **help modal**
* 🚩 button toggles **flag mode** (for touchscreens)

### Keyboard Controls
| Key           | Action                             |
| :-----------: |:---------------------------------- |
| Ν             | New game (current level and mode)  |
| Left Arrow    | Switch to flower mode              |
| Right Arrow   | Switch to mine mode                |
| 1             | Switch to beginner level           |
| 2             | Switch to intermediate level       |
| 3             | Switch to expert level             |
  



## Feature List
### Levels / Modes
* Three levels: beginner, intermediate, expert
* Two modes: flower mode, mine mode

### UI/UX
* Levels can be changed using the buttons or keyboard shortcuts
* Flower and mine modes can be toggled using a button or keyboard shortcuts
* New game with button or keyboard shortcut
* Flag mode for touchscreens
* Level and mode preferences are saved

### Mines
* Random mine allocation on load
* Ensure that the first click is never on a mine

### Flagging
* Ability to flag possible location of mines
* Revealed squares cannot be flagged
* Whenever a square is revealed it stops being flagged
* Number of remaining mines becomes red if there are more flagged squares than the number of mines

### Counters 
* Mine counter showing the number of mines without flags
* Mine counter becomes red if there are more flagged squares than the number of mines
* Timer counter shows your time since opening the first square in seconds, gets activated on first click and stops when the game finishes
* Moves counter

### Endgame
* Empty squares become a grinning face with smiling eyes if the game is won or a dizzy face if the game is lost
* Different emoji for detonated mine (the mine the player clicked) and revealed mines (the rest of the mines)
* Empty squares become a partying face emoji and time counter turns gold when the player has made a new best time
* Empty squares become a partying face emoji and moves turns gold when the player has made a new moves recorded
* Wrongly flagged squares are marked with an X when the played loses

### Stats
* Games played, games won, winning percentage, and best time are saved on local storage
* Separate stats for the three levels (beginner, intermediate, expert)
* Stats modal containing the aforementioned values
* Stats modal smooth animation
* Checks for null values

### Other
* Easy to adjust canvas for different square sizes (no hard-coded values)
* Help modal
* Board fade-in effect
* Animated header on hover
* Animated footer logo on hover
* Extensive commenting to make the project's code accessible for beginners
* Extensive documentation




## More Screenshots
### Intermediate Level
![Intermediate Level](./screenshots/intermediate.png)

### Expert Level
![Expert Level](./screenshots/expert.png)




## Emojis
The following emojis are used throughout the game:

😄 😵 🥳 🔲 💣 💥 🚩 ❌ ⬜️ 1️⃣ 2️⃣ 3️⃣ 4️⃣ 5️⃣ 6️⃣ 7️⃣ 8️⃣ ⌛ 🧮 ❔

The following emojis are used in flower mode only:

😊 😔 🌺 🐛

The suggested emoji font for the game is the **Segoe UI Emoji font** that can be found [here](https://learn.microsoft.com/en-us/typography/font-list/segoe-ui-emoji). If you are running Windows 11, this font family is already installed on your computer. If you are running Linux, you can install and use the Segoe UI font family by following these [instructions](https://vyshnav.xyz/blog/windows-11-emojis-on-linux).




## Contributors
* [Michael Kolesidis](https://github.com/michaelkolesidis/)
* [Margarita Marmaridou](https://github.com/mamarmar/)
* You can be on this list, too! 




## Backers

The costs are still minimal (domain name and server) and are paid for by us to offer you a great game and (hopefully) some fun moments. For the time being, we are not accepting any form of financial backing, but if in the future costs increase and/or you would like to support the future development or the game, or just say thank you for our effort, we might give you a way to show your support. Stay tuned!

PS. If someone asks you for any sort of financial backing/donations/payments, you should know that we have **not** asked for it, and your money will not benefit the contributors of the project.




## International Campaign to Ban Landmines
Antipersonnel landmines are explosive devices designed to be detonated by the presence, proximity, or contact of a person. Placed under or on the ground, they can lie dormant for years and even decades until a person or animal triggers their detonating mechanism.

Incapable of distinguishing between the footfall of a soldier and that of a child, antipersonnel mines cannot be aimed. They indiscriminately kill or injure civilians, aid workers, peacekeepers, and soldiers alike. They pose a threat to the safety of civilians during conflicts and long afterwards.

![ICBL Logo](./assets/icbl_logo.png)

The **[International Campaign to Ban Landmines (ICBL)](http://www.icbl.org/)** is a coalition of non-governmental organizations whose stated objective is a world free of anti-personnel mines and cluster munitions, where mine and cluster munitions survivors see their rights respected and can lead fulfilling lives. **We urge you to visit their website, get informed, and support their work in any way possible.**

The ICBL, in close partnership with a small number of states, the ICRC, and the UN, put in motion what was later known as the “Ottawa Process” that led to the adoption of the [Mine Ban Treaty](http://www.icbl.org/en-gb/the-treaty/treaty-status.aspx) in September 1997. The Mine Ban Treaty, which includes a comprehensive ban on all antipersonnel mines as well as several measures to redress the harm from past use, was adopted in Oslo (Norway) in September 1997, and opened for signature on 3 December 1997 in Ottawa (Canada.)




## License

<a href="https://www.gnu.org/licenses/agpl-3.0.html"><img src="https://upload.wikimedia.org/wikipedia/commons/0/06/AGPLv3_Logo.svg" height="100px" /></a>

Copyright (c) 2023 Michael Kolesidis<br>
Licensed under the [GNU Affero General Public License v3.0](https://www.gnu.org/licenses/agpl-3.0.html).
