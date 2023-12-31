import { readFileSync, readdirSync, writeFileSync } from "fs"
import { parse, resolve } from "path"
import * as yaml from "yaml"
import { Mayor } from "../classes/mayor.js"

function readMayorFiles() {
    const files = readdirSync(resolve("./mayors"))

    const parsed = files.map(v => {
        const file = resolve("./mayors/" + v)
        const fileReaded = readFileSync(file, { encoding: "utf8" })
        return validateMayorFile(fileReaded, v)
    })

    if (parsed.length > 5) return parsed.slice(0, 5)
    else for (let i = parsed.length; i < 5; i++) {
        parsed[i] = null
    }

    return parsed
}

/**
 * 
 * @param {string} data 
 * @param {string} filename 
 */
function validateMayorFile(data, filename) {
    try {
        const returnData = yaml.parse(data, { encoding: "utf8" })
        returnData.filename = filename
        const mayorValue = new Mayor(returnData)
        return mayorValue
    } catch (err) {
        if (err) return null
    }
    return null

}

/**
 * 
 * @param {Mayor} mayor 
 */
async function saveMayor(mayor) {
    const filename = mayor.filename
    delete mayor.filename

    const mayorYaml = yaml.stringify(mayor)
    writeFileSync(`./mayors/${filename}`, mayorYaml)
}

async function getProfileData(id) {
    const response = await fetch("https://mc-heads.net/minecraft/profile/" + id)
    const data = await response.json().catch(err => {
        return {
            id: "default",
            properties: [
                {
                    name: "textures",
                    value: "ewogICJ0aW1lc3RhbXAiIDogMTcwMzQwMDIyOTk1OCwKICAicHJvZmlsZUlkIiA6ICIzYjE4ZTcwZTBiZWY0MTIyYWM0ZTI4NGFkNjA2NzBjYyIsCiAgInByb2ZpbGVOYW1lIiA6ICJNZURpa0dvbjQiLAogICJ0ZXh0dXJlcyIgOiB7CiAgICAiU0tJTiIgOiB7CiAgICAgICJ1cmwiIDogImh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvZjZhMjZmNzcxMTdjNzI3YjBhMTkwODczM2JiZDg3YTFiNzQ2Mjc5MjQyNmY0M2VhZmQ3ZDg5NDdlMjFlNzg5NiIKICAgIH0KICB9Cn0="
                }
            ]
        }
    })
    if (data.id) return data
    else return await getProfileData(id)
}

export { readMayorFiles, getProfileData, validateMayorFile, saveMayor }