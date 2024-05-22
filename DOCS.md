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

__WARNING: Debug mode is still experimental and many known bugs exist, that may result in freezing your browser window. Use at your own risk.__

In order to perform diagnostics or to study the game's internal functions, developers can access debug mode. In debug mode, the square numbers are visible on each square, with the squares containing a mine having their number in red. Additionally, the mine locations can be chosen before the start of the game. Game stats are not accessible and __results are not counted__ while in debug mode.

In order to access debug mode add simply add __#debug__ at the end of the game's URL. Here is a link that will take you to debug mode: [https://emojiminesweeper.com#debug](https://emojiminesweeper.com#debug)

## Feature List

### Levels / Themes

- Four levels: beginner, intermediate, expert, custom
- Ability to create custom level by choosing dimensions and number of mines
- Custom level modal
- Six themes: mine, flower, mushroom, bear, surf, and Japan
- Dark mode

### Emoji

- Emoji images of the __Segoe UI Emoji font__ are used to ensure uniformity in all platforms

### UI/UX

- Ten emoji buttons
- The whole UI and all button actions can be triggered using keyboard shortcuts
- Levels can be changed using the buttons or keyboard shortcuts
- Themes can be switched using a button or keyboard shortcuts
- New game with button or keyboard shortcut
- Flag mode (for touchscreens) can be toggled using a button or keyboard shortcuts
- Cursor becomes crosshair when flag mode is enabled
- Level and theme preferences are saved
- Dark mode can be switched using a button or keyboard shortcuts

### Mines

- Random mine allocation on load
- Ensure that the first click is never on a mine by moving the mine randomly to another square if the first click is on a mine

### Flagging

- Ability to flag possible location of mines
- Revealed squares cannot be flagged
- Whenever a square is revealed it stops being flagged
- Number of remaining mines becomes red if there are more flagged squares than the number of mines
- Support for chording using middle-click

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
- Header wave animation on win

### Stats

- Games played, games won, winning percentage, and best time are saved on local storage
- Separate stats for the three levels (beginner, intermediate, expert)
- Stats modal containing the aforementioned values
- Stats modal smooth animation
- Checks for null values

### Other

- Debug mode
- Easy to adjust canvas for different square sizes (no hard-coded values)
- Help modal
- Board fade-in effect
- Extensive commenting to make the project's code accessible for beginners
- Extensive documentation
