import { Router } from "express";
import { readMayorFiles } from "../utils/mayors.js"
import { writeFileSync } from "fs"

const router = Router();

router.get("/create/:id", (req, res) => {
    const data = `color: "&e"\nname: "Milei"\ntexture: "ewogICJ0aW1lc3RhbXAiIDogMTcwMzM3ODQ2MDMxNiwKICAicHJvZmlsZUlkIiA6ICI2ZDFlNjJmYzU1MjE0NTQ1OTdjMDM3YWI0Mzg3YzVlMiIsCiAgInByb2ZpbGVOYW1lIiA6ICJNaWxlaUxvdmVyIiwKICAidGV4dHVyZXMiIDogewogICAgIlNLSU4iIDogewogICAgICAidXJsIiA6ICJodHRwOi8vdGV4dHVyZXMubWluZWNyYWZ0Lm5ldC90ZXh0dXJlLzU0NzQ0MWFkZWMyOGRjZTJmZDQ4YWVkYWJjOGNhNGMzZTVhZTk4OTBlZGI5OWRlNTNiZTk0Y2M4NDU4MWU2ZGYiCiAgICB9CiAgfQp9"\nskin-npc: "MileiLover"\neffect-lore:\n  - "Viva la libertad carajo"\neffects:\n  - id: multiply_drop\n    args:\n      value: 10.0\n    triggers:\n      - player_fish\n`
    writeFileSync(`./mayors/milei${req.params.id}.yml`, data + "")
    res.redirect("/")
})

export { router }