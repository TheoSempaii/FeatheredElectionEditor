import blessed from "blessed"
import { readMayorFiles } from "./mayors.js"

function renderApp() {

    const screen = blessed.screen({
        smartCSR: true
    });

    global.renderedApp = screen

    const titleBox = blessed.box({
        content: messages.mainTitle,
        tags: true,
        border: {
            type: 'line'
        },
        width: '80%',
        height: '10%',
        left: 'center',
        top: '5%',
        align: 'center',
        valign: 'middle',
        style: {
            border: {
                fg: 'white'
            }
        }
    })

    const contentBox = blessed.box({
        content: messages.loading,
        tags: true,
        border: {
            type: 'line'
        },
        width: '80%',
        left: 'center',
        top: '15%',
        align: 'center',
        valign: 'middle',
        style: {
            border: {
                fg: 'white'
            }
        }
    })

    global.renderBoxes = [titleBox, contentBox]

    screen.append(titleBox);
    screen.append(contentBox);

    screen.render();
    renderMayorSelector()
    return screen
}

/** 
 * @param {string} value
*/
function renderUpdate(value) {
    if (!global.renderedApp) return false
    global.renderBoxes[1].setContent(value)
    global.renderedApp.render()
    return true
}

function renderMayorSelector() {
    const mayors = readMayorFiles()
    const messageContent = `${mayors.reduce((prev, current, index) => {
        if (!current) return prev += `{yellow-fg}[${index + 1}] Create new{/yellow-fg}\n`
        return prev += `{green-fg}[${index + 1}] ${current.filename}{/green-fg}\n`
    }, "")}\n${messages.mainSelector}`
    renderUpdate(messageContent)

}

export { renderApp, renderUpdate }