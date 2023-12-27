import { Router } from "express";
import { readMayorFiles } from "../utils/mayors.js"
import fetch from 'node-fetch';
const router = Router();
import { getProfileData, saveMayor } from "../utils/mayors.js"
import { Mayor } from "../classes/mayor.js";
import yaml from "yaml"

router.get("/manage/:id", async (req, res) => {
    let mayors = readMayorFiles()
    if (isNaN(req.params.id) || !mayors[Number(req.params.id)]) return res.redirect("/")
    mayors = mayors.filter(x => x != null)
    mayors = mayors.map(x => {
        x.effects = x.effects.map(v => {
            v.yaml = yaml.stringify(v)
            return v
        })
        return x
    })
    res.render("manage", { mayors: mayors, mayor: mayors[req.params.id], pageid: req.params.id })
})


router.post("/manage/:id", async (req, res) => {
    const mayors = readMayorFiles()
    if (isNaN(req.params.id) || !mayors[Number(req.params.id)]) return res.redirect("/")
    const skinData = await getProfileData(req.body['skin-npc'])
    req.body.texture = skinData.properties.find(e => e.name == "textures").value
    req.body.filename = mayors[Number(req.params.id)].filename
    req.body["effect-lore"] = req.body["effect-lore"].split("\n")
    if (skinData.id == "default") req.body['skin-npc'] = "MileiLover"
    req.body.effects = req.body.effects.map(e => {
        return yaml.parse(e)
    })
    const mayor = new Mayor(req.body)
    await saveMayor(mayor)
    res.send(mayor)

})





export { router }