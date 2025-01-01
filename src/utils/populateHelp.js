/*
 *  Emoji Minesweeper
 *  Copyright (c) Michael Kolesidis <michael.kolesidis@gmail.com>
 *  GNU Affero General Public License v3.0
 *
 *  Populates the help page
 */

document.body.innerHTML = /* html */ `
<header>
  <img src="../assets/logo.svg" alt="Emoji Minesweeper logo and wordmark" />
  <h1>Emoji Minesweeper Help</h1>
</header>
<div id="help-page">
  <div>
    <img src="./screenshots/win_mines_v8c.png" alt="Win mines" />
    <img src="./screenshots/win_flowers_v8c.png" alt="Win flowers" />
  </div>

  <p>
    Emoji Minesweeper is a <strong>logic puzzle game</strong>, a variant of the
    classic
    <a href="https://en.wikipedia.org/wiki/Minesweeper_(video_game)"
      >minesweeper game</a
    >
    reimagined and implemented using <strong>emoji</strong>! It features a
    <strong>grid of clickable squares</strong>, with hidden
    <strong>mines</strong> (or flowers) scattered throughout the board. Safe
    squares have <strong>numbers</strong> telling you how many mines touch the
    square. If there is no number, the square doesn't touch any mine. You can
    use the number clues to solve the game by opening all of the safe squares.
    If you click on a mine you <strong>lose</strong> the game!
  </p>

  <p>
    Emoji Minesweeper <strong>always makes the first click safe</strong>. You
    open squares with the <strong>left mouse button</strong> and put flags on
    mines with the <strong>right mouse button</strong>.
  </p>

  <p>
    The game ends when all safe squares have been opened (<strong>win</strong>)
    or when a square containing a mine is opened (<strong>loss</strong>). If you
    win, the empty square get filled with happy faces 😄, and if you lose they
    get filled with sad faces 😵.
  </p>

  <p>
    There are <strong>four levels</strong> (beginner, intermediate, expert, and
    custom) and <strong>six themes</strong> (mine 💣, flower 🌺, mushroom 🍄,
    bear 🐻, surf 🏄, and Japan 🏯) to choose from.
  </p>

  <p>Lastly, players can choose between light ☀️ and dark 🌔 mode.</p>

  <h2>How to Play</h2>

  <img src="./screenshots/idle_v8c.png" alt="Idle" />

  <p>
    This is the user interface of Emoji Minesweeper. Such a colorful
    amalgamation of emoji! On the top, you can see a grid of squares: the board.
    The black square button emoji 🔲 means that the square has not been opened
    yet. <strong>Left-click on any square to open it</strong>, and start the
    game. You don't have to worry about your first move, as we have made sure
    that your first square can never contain a mine (actually it can, but if
    that's the case, we relocate the mine to another square so fast that you
    don't even realize it - you can thank us later). Right below the board you
    can find three counters.
  </p>

  <p>
    On the left you can find the <strong>mine counter</strong> 💣. It shows the
    number of mines on the board without flags (we will talk about flagging
    shortly).
  </p>

  <p>
    In the middle, next to the abacus 🧮 you can find the
    <strong>moves counter</strong>. It keeps track of how many moves you have
    made since the beginning of each game. By <em>moves</em> we mean all the
    clicks (left and right) or taps you have made on the board.
  </p>

  <p>
    Finally, on the right, you can find an ⌛ hourglass and, more importantly,
    the <strong>time counter</strong>, keeping track of time: seconds passed
    since you opened the first square. Now let's go back to our game.
  </p>

  <img src="./screenshots/board_v8.png" alt="Board" />

  <p>
    After you click on a square, you will get something like this. When you open
    a square that does not touch any mines, it will be opened and the adjacent
    squares will automatically be opened in all directions until reaching
    squares that contain numbers. A common strategy for starting games is to
    <strong
      >randomly click until you get a big opening with lots of numbers</strong
    >.
  </p>

  <p>
    The empty squares ⬜️ are safe squares that do not touch any mines. Some
    safe squares have numbers telling you how many mines touch the square. The
    numbered squares can be either 1️⃣, 2️⃣, 3️⃣, 4️⃣, 5️⃣, 6️⃣, 7️⃣, 8️⃣. Why don't we
    have nine as well? Because
    <strong>each square can be touched by eight squares at most</strong>. Most
    squares are touched by eight other squares. If a square is located on the
    border of the board, it is touched by six other squares (as one of its sides
    is not touched by anything), and if a square is located in one of the four
    corners of the board, it is touched by only three other squares. Let's see
    an example.
  </p>

  <img src="./screenshots/section_v8.png" alt="Section" />

  <p>
    Let's focus on the 1️⃣ square in the middle. It is touched by eight other
    squares (oh, by the way, diagonal squares count as well). We can observe
    that all its surrounding squares <strong>but one</strong> have been opened
    and are safe. On its left, we can see three empty squares and on its top,
    bottom, and right we can see four numbered squares and a closed one. Since
    its number is 1️⃣, it has to be touched by exactly one mine.
    <strong
      >Thus, we can safely assume that the closed square will contain a
      mine</strong
    >.
  </p>

  <img src="./screenshots/flag_v8.png" alt="Flag" />

  <p>
    In order to make our life easier, and keep track of the squares containing
    mines, we can <strong>right-click</strong> on these squares and flag them 🚩
    using a red flag.
  </p>

  <img src="./screenshots/too_many_flags_v8.png" alt="Too many flags" />

  <p>
    Be careful, because if you flag more squares than the total number of mines,
    you won't be able to finish the game, until you unflag some squares.
    Fortunately, we've got you covered on that too, as the
    <strong>mine counter will turn red</strong> if you do so.
  </p>

  <img src="./screenshots/x_mark_v8.png" alt="X Marked" />

  <p>
    If you click on a mine you lose the game. If you had wrongly flagged any
    squares as mines they will be marked with an ❌, to help you identify your
    mistakes.
  </p>

  <img src="./screenshots/loss_mines_v8.png" alt="Loss mine" />

  <p>Yeah, losing looks like this.</p>

  <img src="./screenshots/loss_flowers_v8.png" alt="Loss flower" />

  <p>Or like this.</p>

  <img src="./screenshots/loss_mushroom_v8.png" alt="Loss mushroom" />

  <p>
    Or like this. Not too bad, huh? In order to win a game, you need to open all
    the safe squares. When you win or lose a game you need to start a new one.
    You can achieve that by clicking on the 🆕 button or by pressing the
    <em>N key</em>.
  </p>

  <img src="./screenshots/stats_v8.png" alt="Stats" />

  <p>
    In order to keep track of how good (or bad) you are doing, the game keeps
    your stats. To open the stats modal, click the 📊 button. Stats include
    metrics such as games played, games won, percentage of wins, best time, and
    best moves and are kept separately for each level. Don't worry if you are
    not doing that well, as you can always clear your data by clicking on the
    <em>Clear</em> button, located inside the stats modal. You can also toggle
    the stats modal by pressing the <em>S key</em>.
  </p>

  <img src="./screenshots/new_record_v8.png" alt="New Record" />

  <p>
    If you do a new best time or win the game by fewer moves than ever before,
    not only are your stats updated accordingly, but empty squares become the
    partying emoji 🥳. The respective counters turn gold as well. In these
    examples, the player achieved both a new time record and a moves record,
    thus both counters have turned gold.
  </p>

  <p>
    There are four difficulty levels, with different board sizes and numbers of
    mines. Along with the classic and predetermined beginner, intermediate, and
    expert levels, there's a custom level as well, giving players the ability to
    set the dimensions of the board, as well as the number of mines. Custom levels allow you to create boards as large as 100x100. Mines must cover at least 2.5% of the squares, or 5% for boards larger than 60x60. If the number of mines you choose falls below the minimum requirement, it will automatically adjust to meet the necessary threshold.
  </p>

  <table>
    <thead>
      <tr>
        <th>Level</th>
        <th>Dimensions</th>
        <th>Mines</th>
        <th>% of Mines</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Beginner</td>
        <td>9x9</td>
        <td>10</td>
        <td>~12.34%</td>
      </tr>
      <tr>
        <td>Intermediate</td>
        <td>16x16</td>
        <td>40</td>
        <td>~15.63%</td>
      </tr>
      <tr>
        <td>Expert</td>
        <td>30x16</td>
        <td>99</td>
        <td>~20.63%</td>
      </tr>
    </tbody>
  </table>

  <p>
    You can use the level buttons 1️⃣2️⃣3️⃣*️⃣ to switch between levels. You can
    also use the <em>keyboard keys 1, 2, 3, and 4</em>.
  </p>
  <p>
    If you click the <strong>*️⃣</strong> button, the custom level modal will
    appear.
  </p>

  <img src="./screenshots/custom_modal_v8.png" alt="Custom modal" />

  <p>
    Here you can choose the width, the height, and the number of mines for your
    desired custom level. When you click Submit, your custom level will appear!
  </p>

  <img src="./screenshots/custom_v8.png" alt="Custom level" />

  <p>
    This is a custom level featuring 9 columns, 15 rows, and 6 mines. Quite
    long, isn't it?
  </p>

  <h3>End modal</h3>

  <img src="./screenshots/end_stats_v8b.png" alt="End modal" />

  <p>
    When a game is won, a modal containing stats about the current game appears.
    Let's see what's included:
  </p>

  <h4>Time</h4>
  <p>
    The time it took to finish the game in seconds, from opening the first
    square until the last. It is the same time visible in the time counter, but
    now it is not rounded and is displayed in precision with up to three decimal
    digits.
  </p>

  <h4>3BV</h4>
  <p>
    3BV is the minimum number of clicks required to complete a board without
    using flags. The higher it is, the more difficult the game is.
  </p>

  <h4>3BV/s</h4>
  <p>
    3BV divided by the amount of seconds needed to finish the game. It indicates
    the amount of 3BV that a player solves per second and is meant as a
    speed-measuring statistic. For an expert game, a 3BV/s of 2 is considered to
    be high, while a 3BV/s of 3 is considered to be very high. For an
    intermediate game, a 3BV/s of 3 is considered to be high, while a 3BV/s of 4
    is considered to be very high. The world record 3BV/s for intermediate and
    expert are 7.89 and 6.11 respectively.
  </p>

  <h4>Moves</h4>
  <p>
    How many moves you have made from the beginning of the game until its end.
    Every click over the area of the board counts, even those clicks which don't
    make sense in Minesweeper, like clicking in an already opened opening, or a
    right-click on a number. The clicks that make sense are known as active
    clicks, while those that don't make any sense are known as wasted clicks.
  </p>

  <h4>Efficiency</h4>
  <p>
    Efficiency is the 3BV of a board divided by the number of moves (clicks or
    taps) used to solve it. The fewer clicks used, the higher the efficiency. An
    efficiency of 100% means you solved a 3BV 50 board in 50 clicks. The only
    way to gain efficiency is to chord. Efficiency is lost by placing flags,
    wasting clicks, or clicking cells that would be revealed by an opening. By
    combining NF technique and smart chording you can get more than 100%
    efficiency.
  </p>

  <h3>Themes</h3>
  <p>
    The game features six themes with different emoji sets to choose from. Apart
    from the classic mine theme 💣 and the peaceful and relaxing flower theme
    🌺, you can find a mushroom theme 🍄, a bear theme 🐻, a surf theme 🏄, and
    a Japan theme 🏯. You can use the theme button 💣/🌺/🍄/🐻/🏄/🏯 to switch
    between themes, or use the
    <em>left and right arrows</em> on your keyboard. These are the rest of the
    themes:
  </p>

  <img src="./screenshots/win_mushroom_v8.png" alt="Win mushroom theme" />

  <p>The mushroom theme.</p>

  <img src="./screenshots/win_bear_v8.png" alt="Win bear theme" />

  <p>The bear theme.</p>

  <img src="./screenshots/win_surf_v8.png" alt="Win surf theme" />

  <p>The surf theme.</p>

  <img src="./screenshots/win_japan_v8.png" alt="Win Japan theme" />

  <p>
    And the Japan theme. I bet you can't decide which one to pick! Your level
    and theme preferences are saved in your computer, so your next game always
    starts with the lastly used configuration.
  </p>

  <img src="./screenshots/help_v8b.png" alt="Help modal" />

  <p>
    If you forget the basic controls you can click the help button ❔ to toggle
    the help modal. You can also toggle the help modal by pressing the
    <em>H</em> key.
  </p>

  <p>
    Clicking on the flag button 🚩 will toggle flag mode. This will enable you
    to flag squares by touching them, or by left-clicking on them. You can also
    toggle flag mode by pressing the <em>F</em> key. You might want to use this
    if you are on a phone or tablet. If, on the other hand, you are on a
    computer, the cursor will be changed to a <strong>crosshair</strong>, to
    inform you that flag mode is enabled.
  </p>

  <img
    src="./screenshots/dark_win_flowers_v8.png"
    alt="Dark mode win flowers theme"
  />
  <img
    src="./screenshots/dark_loss_flowers_v8.png"
    alt="Dark mode loss flowers theme"
  />

  <p>
    Clicking on the <strong>☀️/🌔</strong> button allows players to choose
    between light and dark mode. You can also switch between dark and light by
    pressing the <em>D</em> key. Quite useful for those long night sessions!
  </p>

  <p>
    Lastly, we should mention the concept of <strong>chording</strong>. When an
    uncovered square with a number has exactly the correct number of adjacent
    squares flagged, performing a click using the mouse's wheel (or middle
    button) on it will uncover all unmarked squares. This is called a
    <strong>chord</strong>. It is a basic technique that allows players to clear
    squares using flags, and the reason why flagging styles are often more
    efficient than non-flagging ones.
  </p>

  <h3>Summary</h3>
  <ul>
    <li><strong>Left-click</strong> to open a square</li>
    <li>
      <strong>Right-click</strong> to flag a square (that you think contains a
      mine)
    </li>
    <li><strong>Middle-click</strong> for chording</li>
    <li>💣 Mines counter</li>
    <li>🧮 Moves counter</li>
    <li>⌛ Time counter</li>
    <li>🆕 restarts the game</li>
    <li>
      1️⃣2️⃣3️⃣*️⃣ buttons switch between <strong>levels</strong> (beginner,
      intermediate, expert, and custom)
    </li>
    <li>📊 button toggles the <strong>stats modal</strong></li>
    <li>
      💣/🌺/🍄/🐻/🏄/🏯 button switches between
      <strong>themes</strong> (mine, flower, mushroom, bear, surf, and Japan)
    </li>
    <li>❔ button toggles the <strong>help modal</strong></li>
    <li>🚩 button toggles <strong>flag mode</strong> (for touchscreens)</li>
    <li>☀️/🌔 button toggles <strong>dark mode</strong></li>
    <li>
      There is an <strong>Easter egg</strong> in the game, can you find it?
    </li>
  </ul>

  <h3>Keyboard Controls</h3>
  <table>
    <thead>
      <tr>
        <th>Key</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Ν</td>
        <td>New game (current level and theme)</td>
      </tr>
      <tr>
        <td>S</td>
        <td>Open/close stats modal</td>
      </tr>
      <tr>
        <td>1</td>
        <td>Switch to beginner level</td>
      </tr>
      <tr>
        <td>2</td>
        <td>Switch to intermediate level</td>
      </tr>
      <tr>
        <td>3</td>
        <td>Switch to expert level</td>
      </tr>
      <tr>
        <td>4</td>
        <td>Switch to custom level</td>
      </tr>
      <tr>
        <td>Left Arrow</td>
        <td>Switch to next theme</td>
      </tr>
      <tr>
        <td>Right Arrow</td>
        <td>Switch to previous theme</td>
      </tr>
      <tr>
        <td>H</td>
        <td>Open/close help modal</td>
      </tr>
      <tr>
        <td>F</td>
        <td>Toggle flag mode</td>
      </tr>
      <tr>
        <td>D</td>
        <td>Toggle dark mode</td>
      </tr>
    </tbody>
  </table>

  <h3>More Screenshots</h3>

  <h4>Intermediate Level</h4>
  <img src="./screenshots/intermediate_v8.png" alt="Intermediate Level" />

  <h4>Expert Level</h4>
  <img src="./screenshots/expert_v8.png" alt="Expert Level" />

  <h3>Emoji</h3>
  <p>The following emoji are used throughout the game:</p>
  <p id="emoji-list">
    🔲 ⬜️ 🔳 ⬛ 🆕 1️⃣ 2️⃣ 3️⃣ 4️⃣ 5️⃣ 6️⃣ 7️⃣ 8️⃣ *️⃣ 📊 ↕️ ↔️ 🚩 ⌛ 🧮 ❔ ❌ 🥳 ☀️ 🌔
  </p>

  <h3>Themes & Emoji Sets</h3>
  <table>
    <thead>
      <tr>
        <th>Theme</th>
        <th>Game Title</th>
        <th>Emoji Set</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Mine</td>
        <td>Emoji Minesweeper</td>
        <td>💣 💥 😄 😵</td>
      </tr>
      <tr>
        <td>Flower</td>
        <td>Emoji Flower Field</td>
        <td>🌺 🐛 😊 😔</td>
      </tr>
      <tr>
        <td>Mushroom</td>
        <td>Emoji Mushroom Picker</td>
        <td>🍄 🦄 😎 😵‍💫</td>
      </tr>
      <tr>
        <td>Bear</td>
        <td>Emoji Bearspotting</td>
        <td>🐻 🐾 🌳 🪵</td>
      </tr>
      <tr>
        <td>Surf</td>
        <td>Emoji Surfsweeper</td>
        <td>🏄 🦑 🌊 🦈</td>
      </tr>
      <tr>
        <td>Japan</td>
        <td>絵文字マインスイーパー</td>
        <td>🏯 👺 🌸 😖</td>
      </tr>
    </tbody>
  </table>

  <h3>Emoji Font</h3>
  <p>
    The emoji font used in the game is the
    <strong>Segoe UI Emoji font</strong> that can be found
    <a
      href="https://web.archive.org/web/20240420021127/https://learn.microsoft.com/en-us/typography/font-list/segoe-ui-emoji"
      target="_blank"
      >here</a
    >. If you are running Windows 11, this font family is already installed on
    your computer. If you are running Linux, you can install and use the Segoe
    UI font family by following these
    <a
      href="https://web.archive.org/web/20240221061513/https://vyshnav.xyz/blog/windows-11-emojis-on-linux"
      target="_blank"
      >instructions</a
    >.
  </p>

  <h3>Emoji History</h3>

  <img src="./assets/pocket_bell_emoji.png" alt="Pocket Bell Emoji" />

  <p>
    The first ever modern emoji existed on a device that came even before
    phones. In 1995, Japanese Telecom Company NTT DoCoMo made the first emoji
    available on its Pocket Bell pager model. As you can see, Emoji Minesweeper
    is using some of these very first emoji!
  </p>

  <p>
    You can find more information about the history of emoji
    <a
      href="https://web.archive.org/web/20230116030836/https://gem-ship-blog.com/blog/the-story-behind-emojis-1"
      target="_blank"
      >here</a
    >.
  </p>

  <h3>International Campaign to Ban Landmines</h3>

  <img src="./assets/icbl_logo.png" alt="ICBL Logo" />

  <p>
    Antipersonnel landmines are explosive devices designed to be detonated by
    the presence, proximity, or contact of a person. Placed under or on the
    ground, they can lie dormant for years and even decades until a person or
    animal triggers their detonating mechanism.
  </p>

  <p>
    Incapable of distinguishing between the footfall of a soldier and that of a
    child, antipersonnel mines cannot be aimed. They indiscriminately kill or
    injure civilians, aid workers, peacekeepers, and soldiers alike. They pose a
    threat to the safety of civilians during conflicts and long afterwards.
  </p>

  <p>
    The
    <a href="http://www.icbl.org/" target="_blank"
      >International Campaign to Ban Landmines (ICBL)</a
    >
    is a coalition of non-governmental organizations whose stated objective is a
    world free of anti-personnel mines and cluster munitions, where mine and
    cluster munitions survivors see their rights respected and can lead
    fulfilling lives.
    <strong
      >We urge you to visit their website, get informed, and support their work
      in any way possible.</strong
    >
  </p>

  <p>
    The ICBL, in close partnership with a small number of states, the ICRC, and
    the UN, put in motion what was later known as the “Ottawa Process” that led
    to the adoption of the
    <a
      href="https://web.archive.org/web/20240511072517/https://www.icbl.org/en-gb/the-treaty/treaty-status.aspx"
      target="_blank"
      >Mine Ban Treaty</a
    >
    in September 1997. The Mine Ban Treaty, which includes a comprehensive ban
    on all antipersonnel mines as well as several measures to redress the harm
    from past use, was adopted in Oslo (Norway) in September 1997, and opened
    for signature on 3 December 1997 in Ottawa (Canada).
  </p>

  <h3>License</h3>

  <a href="https://www.gnu.org/licenses/agpl-3.0.html">
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/0/06/AGPLv3_Logo.svg"
      height="100px"
      style="max-width: 100%"
    />
  </a>

  <p>
    Copyright (c) Michael Kolesidis<br />
    Licensed under the
    <a href="https://www.gnu.org/licenses/agpl-3.0.html" target="_blank"
      >GNU Affero General Public License v3.0</a
    >.
  </p>
</div>
`;
