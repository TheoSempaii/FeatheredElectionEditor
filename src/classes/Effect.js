
export class Effect {
    constructor(content = {}) {
        this["id"] = content.id || ""
        this["args"] = content.args || []
        this["triggers"] = content.triggers || []

        /*
        if (typeof (content) == "object") {
            this["id"] = content["id"] || this["id"]
            if (content["triggers"] && Array.isArray(content["triggers"])) this["triggers"] = content["triggers"].reduce((prev, current) => {
                if (typeof (current) == "string") prev.push(current)
                return prev
            }, [])


            if (content["args"] && typeof (content["args"]) == "object") this["args"] = Object.keys(content["args"]).reduce((prev, current) => {

                if (current.toUpperCase() == current) content["args"][current] = { key: current, value: content["args"][current], complexType: true }
                else content["args"][current] = { key: current, value: content["args"][current], complexType: false }
                const args = new Args(content["args"][current])

                prev.push(new Args(content["args"][current]))
                return prev
            }, [])

        if (content["args"] && typeof (content["args"]) == "object") {
            console.log(content["args"])
        }

    }

    */

    }
}