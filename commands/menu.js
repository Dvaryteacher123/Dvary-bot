module.exports = {
    name: "menu",
    execute: async (sock, msg) => {

        const menu = `
╭━━───────────────➤
┃ 🤖 *JIMMY MD BOT*
┃ Prefix: .
╰━━───────────────➤

👤 OWNER
.owner
.ping

📂 DOWNLOAD
.play
.tiktok

🎮 FUN
.meme

🌐 SYSTEM
.ai
.weather

⚙️ OTHER
.sticker
        `
        await sock.sendMessage(msg.key.remoteJid, { text: menu })
    }
}
