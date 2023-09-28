import { createMatrix, matrix} from "./matrix.js"
import { createElement } from "./helpers.js";
import { Menu } from "./menu.js";
import { Stopwatch } from "./timer.js"
import { cellSound, bombSound  } from "./audio.js"
import {App} from "./app.js"

let app = new App(10, 10, 10, 0,)
app.startGame(app.width, app.height, app.bombs)
app.createMenu()
app.addListeners()
// let stopwatch = new Stopwatch("stopwatch");
// stopwatch.start()
app.isWin()
app.createStopwatch()

console.log(matrix)
// localStorage.setItem("res", 1) 
app.getResultsfromLocal()
console.log(app)