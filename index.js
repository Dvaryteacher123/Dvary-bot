const express = require('express');
const path = require('path');
const { default: makeWASocket, useMultiFileAuthState, delay, makeCacheableSignalKeyStore } = require("@whiskeysockets/baileys");
const pino = require("pino");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));

async function startDvaryBot() {
    const { state, saveCreds } = await useMultiFileAuthState('./session');
    
    const dvary = makeWASocket({
        auth: state,
        printQRInTerminal: false,
        logger: pino({ level: "silent" }),
        browser: ["Ubuntu", "Chrome", "20.0.04"]
    });

    dvary.ev.on("creds.update", saveCreds);

    // API ya kuomba kodi
    app.get('/get-code', async (req, res) => {
        let num = req.query.number;
        if (!num) return res.status(400).json({ error: "Weka namba!" });
        
        try {
            let code = await dvary.requestPairingCode(num);
            res.json({ code: code });
        } catch (err) {
            res.status(500).json({ error: "Jaribu tena baada ya muda kidogo." });
        }
    });

    // Amri (Commands) za Menu
    dvary.ev.on("messages.upsert", async (m) => {
        const msg = m.messages[0];
        if (!msg.message || msg.key.fromMe) return;
        const text = msg.message.conversation || msg.message.extendedTextMessage?.text || "";

        if (text.toLowerCase() === ".menu") {
            const menuText = `╭━━───────────────➤─➤\n┃    *𝗗𝗩𝗔𝗥𝗬-𝗕𝗢𝗧 𝗩10* 🚀\n┃\n┃➤🗿 𝚄𝚂𝙴𝚁 : Dvary manyama\n┃➤📉 𝚅𝙴𝚁𝚂 : 10.0\n┃➤⚙️ 𝙿𝚁𝙴𝙵𝙸𝚇 : .\n┃➤👨🏽‍💻 𝙳𝙴𝚅 : DVARY AI SYSTEM\n╰━━───────────────➤─➤\n\n*OWNER MENU*👤\n─➤ .alive\n─➤ .owner\n─➤ .runtime\n\n*GROUP MENU*👥\n─➤ .antilink\n─➤ .kick\n─➤ .promote\n\n*PREMIUM UNBAN*🎭\n─➤ .unban_wa\n─➤ .numspam`;
            await dvary.sendMessage(msg.key.remoteJid, { text: menuText });
        }
    });
}

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

startDvaryBot();
