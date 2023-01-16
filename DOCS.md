# Emoji Minesweeper Docs

Here you can find additional information about Emoji Minesweeper.

## Feature List

### Levels / Themes

* Three levels: beginner, intermediate, expert
* Five themes: mine, flower, mushroom, bear and sea

### UI/UX

* Levels can be changed using the buttons or keyboard shortcuts
* Themes can be switched using a button or keyboard shortcuts
* New game with button or keyboard shortcut
* Flag mode for touchscreens
* Cursor becomes crosshair when flag mode is enabled
* Level and theme preferences are saved

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