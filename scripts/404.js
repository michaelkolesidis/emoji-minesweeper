/*
 *  Emoji Minesweeper
 *  Copyright (c) 2023 Michael Kolesidis
 *  GNU Affero General Public License v3.0
 *
 * 404.js generates a custom 404 - Not Found page
 */

document.body.innerHTML = `
    <img 
        src="../assets/woodmark.svg" 
        style="width: 300px; 
               margin: 20px;" 
        alt="Emoji Minesweeper logo and woodmark"
    >`;
document.body.innerHTML += `
    <h1 
        style="margin-top: 20px; font-size: 100px"
    >
        404
    <h1>`;
document.body.innerHTML += `
    <h2 
        style="margin-bottom: 60px; font-size: 20px"
    >
        Nothing to see here!
    <h2>`;
document.body.innerHTML += `
    <a 
        href="https://emojiminesweeper.com/"
    >
        <button  
            style="font-size: 30px; font-weight: 600"
        >
            Back to Game
        </button>
    </a>`;
