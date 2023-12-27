import { Router } from "express";
import { readMayorFiles } from "../utils/mayors.js"
import yaml from "yaml"

const router = Router();

router.get("/", (req, res) => {
    const mayors = readMayorFiles()
    res.render("main", { mayors: mayors })
})

router.post("/yaml", (req, res) => {
    res.send({
        response: yaml.stringify(req.body) || ""
    })
})


export { router }