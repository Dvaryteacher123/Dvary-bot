const fs = require("fs")

module.exports = async (sock, msg, args) => {
    let menu = `
🤖 *JIMMY BOT*

📌 COMMANDS:
.ping
.menu
`

    await sock.sendMessage(msg.key.remoteJid, {
        image: fs.readFileSync("./bot.jpg"),
        caption: menu
    })
}
