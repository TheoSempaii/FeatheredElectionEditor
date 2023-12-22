import { Args } from "./Args.js"

export class Effect {
    constructor(content = {}) {
        this["id"] = ""
        this["args"] = []
        this["triggers"] = []

        if (typeof (content) == "object") {
            this["id"] = content["id"] || this["id"]
            if (content["triggers"] && Array.isArray(content["triggers"])) this["triggers"] = content["triggers"].reduce((prev, current) => {
                if (typeof (current) == "string") prev.push(current)
                return prev
            }, [])


            if (content["args"] && typeof (content["args"]) == "object") this["args"] = Object.keys(content["args"]).reduce((prev, current) => {

                if (current.toUpperCase() == current) content["args"][current] = { key: current, value: content["args"][current], complexType: true }
                else content["args"][current] = { key: current, value: content["args"][current], complexType: false }
                prev.push(new Args(content["args"][current]))
                return prev
            }, [])



        }
    }
}