export class Args {
    constructor(content) {

        this["key"] = ""
        this["value"] = ""
        this["complexType"] = false

        if (typeof content == "object") {
            this["key"] = content["key"] || this["key"]
            this["complexType"] = content["complexType"] || this["complexType"]

            if (typeof (content["value"]) == "object" && this["complexType"]) {
                this["value"] = {}
                Object.keys(content["value"]).map(v => {
                    this["value"][v] = content["value"][v]
                })
            } else {
                this["value"] = content["value"] || this["value"]
            }
        }

    }
}