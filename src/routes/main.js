import { Router } from "express";
import { readMayorFiles } from "../utils/mayors.js"

const router = Router();

router.get("/", (req, res) => {
    const mayors = readMayorFiles()
    res.render("main", { mayors: mayors })
})

export { router }