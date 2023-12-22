import { config } from "dotenv"
import express, { urlencoded, json, raw } from "express"
import { readdirSync } from "fs"
import { resolve } from "path"
import { readMayorFiles } from "./utils/mayors.js"
import ejs from "ejs"

async function createApp() {
    console.time("Server started in")

    config()

    const app = express()

    app.use(json())
    app.use(urlencoded({ extended: true }))
    app.use(raw())

    app.use("/css", express.static(resolve("./src/public/css")));
    app.use("/img", express.static(resolve("./src/public/img")));



    app.set('view engine', 'ejs')
    app.set('views', resolve("./src/public/views"))


    const routes = readdirSync(resolve("./src/routes"))

    await Promise.all(routes.map(async v => {
        const imported = await import("./routes/" + v)
        app.use(imported.router)
    }))



    app.listen(80, () => {
        console.timeEnd("Server started in")
        console.log("Server listening on port 80")
    })


}

createApp()