import { config } from "dotenv"
import { selectMode } from "./utils/modeSelector.js"
import * as jsonMessageDefault from "./messages/consoleResponses.json" assert {type: "json"}
config()

global.messages = jsonMessageDefault["default"][process.env.lang]
global.renderedApp = null
global.renderBoxes = []

selectMode()