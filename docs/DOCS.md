# Emoji Minesweeper Documentation 🤓

Welcome to the Emoji Minesweeper Docs.
Here you can find additional information for nerds!

## Technologies Used

<a href="https://p5js.org/"><img src="https://github.com/michaelkolesidis/tech-icons/blob/main/icons/p5js/p5js.svg" height="50px"/></a>

[p5.js](https://p5js.org/) is a JavaScript library for creative coding, with a focus on making coding accessible and inclusive for artists, designers, educators, beginners, and anyone else. It can be used to create anything, from simple visuals to fully-fledged games like this one!

<a href="https://en.wikipedia.org/wiki/JavaScript"><img src="https://github.com/michaelkolesidis/tech-icons/blob/main/icons/javascript/javascript-original.svg" height="50px" /></a>

[JavaScript](https://en.wikipedia.org/wiki/JavaScript) is the programming language of the web. It started as a language confined in browsers, but it is now used almost everywhere.

<a href="https://en.wikipedia.org/wiki/CSS"><img src="https://github.com/michaelkolesidis/tech-icons/blob/main/icons/css3/css3-plain.svg" height="50px" /></a>

[CSS](https://en.wikipedia.org/wiki/CSS) is a style sheet language that describes the appearance and presentation of documents and apps.

<a href="https://en.wikipedia.org/wiki/HTML"><img src="https://github.com/michaelkolesidis/tech-icons/blob/main/icons/html5/html5-plain.svg" height="50px" /></a>

[HTML](https://en.wikipedia.org/wiki/HTML) is the standard markup language for documents designed to be displayed in a web browser. It is used in every website and web app.

## Architecture

The game logic and anything that happens inside the board is written in p5.js. The board is drawn inside a [canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) element, with the help of the p5.js library. Multiple programming paradigms are used, such as the object-oriented paradigm, as each square is an instance of the class Square. The rest of the UI is written in vanilla JavaScript. Everything was written from scratch, with the whole project having only one dependency (p5.js).

## Debug Mode

In order to perform diagnostics or to study the game's internal functions, developers can access debug mode. In debug mode, the square numbers are visible on each square, with the squares containing a mine having their number in red. Additionally, the mine locations can be forced with the Forcer tool. Game stats are not accessible and __results are not counted__ while in debug mode; clicking the stats button displays a short message instead of opening the stats modal.

In order to access debug mode simply add __#debug__ at the end of the game's URL. The Forcer appears immediately when the hash is added, so refreshing the page is not required. Here is a link that will take you to debug mode: [https://thumbfeed.com/emoji-minesweeper/#debug](https://thumbfeed.com/emoji-minesweeper/#debug)

The Forcer accepts square numbers separated by spaces, commas, or semicolons. Click Submit or press Enter while focused in the input to apply the forced mines. If the forced mine count and current board dimensions match beginner, intermediate, or expert, the game stays on or switches to that standard level. Otherwise, the current dimensions are saved as a custom level with the forced mine count.

## Feature List

### Levels / Themes

- Four levels: beginner, intermediate, expert, custom
- Ability to create custom level by choosing dimensions and number of mines
- Pressing `5` opens the custom level modal, focuses the columns input, and Enter advances through columns, rows, mines, then submits
- Custom configurations that match beginner, intermediate, or expert automatically switch to the matching standard level
- Custom level modal
- Custom levels support 7x7 through 100x100 boards, with mines clamped to at least 10% of the board
- Six themes: mine, flower, mushroom, bear, surf, and Japan
- Dark mode

### Emoji

- Emoji images of the __Segoe UI Emoji font__ are used to ensure uniformity in all platforms

### UI/UX

- Ten emoji buttons
- The whole UI and all button actions can be triggered using keyboard shortcuts
- Levels can be changed using the buttons or keyboard shortcuts
- Themes can be switched using a button or keyboard shortcuts
- Theme picker menu opens with desktop right-click or mobile long press on the theme button
- New game with button or keyboard shortcut
- Touch controls use long-press to flag squares
- Desktop keyboard mode toggles with `K`; typed cell numbers plus Enter open/chord, typed cell numbers plus `F` flag/unflag, and Esc clears the typed number
- Sound can be toggled using the speaker button
- Level and theme preferences are saved
- Dark mode can be switched using a button or keyboard shortcuts
- Intermediate, expert, and custom controls are desktop-only and show a short message when unavailable
- Custom level and debug mode stats attempts show a short message instead of opening an unavailable stats modal

### Mines

- Random mine allocation on load
- Ensure that the first click is never on a mine by moving the mine randomly to another square if the first click is on a mine

### Flagging

- Ability to flag possible location of mines
- Revealed squares cannot be flagged
- Whenever a square is revealed it stops being flagged
- Number of remaining mines becomes red if there are more flagged squares than the number of mines
- Support for chording using left-click or middle-click on an open numbered square

### Counters

- Mine counter showing the number of mines without flags
- Mine counter becomes red if there are more flagged squares than the number of mines
- Timer counter shows your time since opening the first square in seconds, gets activated on first click and stops when the game finishes
- Moves counter

### Game End

- Empty squares become a grinning face with smiling eyes if the game is won or a dizzy face if the game is lost (according to selected theme)
- Different emoji for detonated mine (the mine the player clicked) and revealed mines (the rest of the mines)
- Empty squares become a partying face emoji and time counter turns gold when the player has made a new best time or a new moves recorded
- Header becomes yellow when the player has made a new best time or a new moves recorded
- Wrongly flagged squares are marked with an X when the played loses
- Header wave animation on every win
- After a win, the end modal can be reopened after closing by clicking or tapping anywhere inside the board

### Stats

- Games played, games won, winning percentage, and best time are saved on local storage
- Separate stats for the three levels (beginner, intermediate, expert)
- Custom levels and debug mode do not save stats
- Stats modal containing the aforementioned values, total time, and total moves
- Stats modal does not open in custom levels or debug mode and shows a message instead
- Stats modal smooth animation
- Checks for null values
- 3BV, 3BV/s, efficiency, moves, time after every game won

### Other

- Debug mode
- Debug mode can be entered by adding `#debug` without refreshing
- Debug Forcer can force mines by button click or Enter key
- Debug Forcer switches to custom if the forced mine count does not match the active standard board configuration
- Easy to adjust canvas for different square sizes (no hard-coded values)
- Help modal
- Board fade-in effect
- Extensive commenting to make the project's code accessible for beginners
- Extensive documentation
- Press C and see what happens! 😜 (Thanks for reading through all the documentation!)
