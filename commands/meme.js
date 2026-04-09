const axios = require("axios")

module.exports = {
    name: "meme",
    execute: async (sock, msg) => {
        const res = await axios.get("https://meme-api.com/gimme")

        await sock.sendMessage(msg.key.remoteJid, {
            image: { url: res.data.url },
            caption: res.data.title
        })
    }
}
