import { readFileSync, readdirSync } from "fs"
import { parse, resolve } from "path"
import * as yaml from "yaml"

function readMayorFiles() {
    const files = readdirSync(resolve("./input"))

    const parsed = files.map(v => {
        const file = resolve("./input/" + v)
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
 * @returns 
 */
function validateMayorFile(data, filename) {
    const returnData = yaml.parse(data, { encoding: "utf8" })
    returnData.filename = filename
    return returnData
}

export { readMayorFiles }