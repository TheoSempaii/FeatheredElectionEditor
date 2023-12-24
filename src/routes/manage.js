import { Router } from "express";
import { readMayorFiles } from "../utils/mayors.js"
import fetch from 'node-fetch';
const router = Router();
import { getProfileData, saveMayor } from "../utils/mayors.js"
import { Mayor } from "../classes/mayor.js";

router.get("/manage/:id", async (req, res) => {
    const mayors = readMayorFiles()
    if (isNaN(req.params.id) || !mayors[Number(req.params.id)]) return res.redirect("/")
    res.render("manage", { mayors: mayors, mayor: mayors[req.params.id], pageid: req.params.id })
})


router.post("/manage/:id", async (req, res) => {
    const mayors = readMayorFiles()
    if (isNaN(req.params.id) || !mayors[Number(req.params.id)]) return res.redirect("/")
    const skinData = await getProfileData(req.body['skin-npc'])
    req.body.texture = skinData.properties.find(e => e.name == "textures").value
    req.body.filename = mayors[Number(req.params.id)].filename
    req.body["effect-lore"] = req.body["effect-lore"].split("\n")
    const mayor = new Mayor(req.body)
    await saveMayor(mayor)
    res.send({ message: "ok" })
})



export { router }