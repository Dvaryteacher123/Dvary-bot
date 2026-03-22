const { default: makeWASocket, useMultiFileAuthState } = require("@adiwajshing/baileys")
const TelegramBot = require("node-telegram-bot-api")
const express = require("express")

const app = express()

const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN
const OWNER_NUMBER = "2557XXXXXXXX"

const bot = new TelegramBot(TELEGRAM_TOKEN, { polling: true })

let sock

async function startSock() {
    const { state, saveCreds } = await useMultiFileAuthState("session")

    sock = makeWASocket({
        auth: state,
        printQRInTerminal: false
    })

    sock.ev.on("creds.update", saveCreds)

    sock.ev.on("connection.update", async (update) => {
        const { connection } = update

        if (connection === "open") {
            console.log("✅ WhatsApp Connected")
        }

        if (connection === "close") {
            startSock()
        }
    })

    // 🔥 HAPA NDIO PAIR CODE
    if (!sock.authState.creds.registered) {
        const code = await sock.requestPairingCode(OWNER_NUMBER)
        console.log("PAIR CODE:", code)
    }
}

startSock()

bot.on("message", async (msg) => {
    if (!msg.text) return

    await sock.sendMessage(
        OWNER_NUMBER + "@s.whatsapp.net",
        { text: msg.text }
    )

    bot.sendMessage(msg.chat.id, "✅ Imetumwa WhatsApp")
})

app.get("/", (req, res) => {
    res.send("Bot is running 🚀")
})

app.listen(process.env.PORT || 3000)
