import { Effect } from "./Effect.js"
export class Mayor {
    constructor(content = {}) {
        this["name"] = ""
        this["color"] = ""
        this["texture"] = ""
        this["skin-npc"] = ""
        this["effect-lore"] = []
        this["effects"] = []
        this["filename"] = ""
        if (typeof (content) === "object") {
            this["name"] = content["name"] || this["name"]
            this["color"] = content["color"] || this["color"]
            this["texture"] = content["texture"] || this["texture"]
            this["skin-npc"] = content["skin-npc"] || this["skin-npc"]
            this["effect-lore"] = content["effect-lore"] || this["effect-lore"]
            this["filename"] = content["filename"] || this["filename"]
            if (content["effects"] && Array.isArray(content["effects"])) this["effects"] = content["effects"].reduce((prev, current) => {
                if (typeof (current) == "object") {
                    prev.push(new Effect(current))
                }
                return prev
            }, [])
        }
    }
}