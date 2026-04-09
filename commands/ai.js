const axios = require("axios")

module.exports = {
    name: "ai",
    execute: async (sock, msg, args) => {
        const q = args.join(" ")
        if (!q) return sock.sendMessage(msg.key.remoteJid, { text: "Uliza swali" })

        const res = await axios.get(`https://api.popcat.xyz/chatbot?msg=${q}&owner=Jimmy&botname=JimmyBot`)
        await sock.sendMessage(msg.key.remoteJid, { text: res.data.response })
    }
}
