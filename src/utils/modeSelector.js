import { readMayorFiles } from "./mayors.js"
import { } from "readline"
import { renderApp } from "./consoleApp.js"

function selectMode() {
    if (process.env.mode?.toLowerCase() == "console") renderApp()
}

export { selectMode }