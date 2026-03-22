const { default: makeWASocket, useMultiFileAuthState, delay, makeCacheableSignalKeyStore } = require("@whiskeysockets/baileys");
const pino = require("pino");

async function startDvaryBot() {
    const { state, saveCreds } = await useMultiFileAuthState('./session');
    
    const dvary = makeWASocket({
        auth: state,
        printQRInTerminal: false, // Tunatumia Pairing Code badala ya QR
        logger: pino({ level: "silent" }),
        browser: ["Ubuntu", "Chrome", "20.0.04"]
    });

    // HAPA NDIPO PAIRING CODE INATENGENEZWA
    if (!dvary.authState.creds.registered) {
        let phoneNumber = "255694670587"; // Namba yako
        let code = await dvary.requestPairingCode(phoneNumber);
        console.log(`YOUR PAIRING CODE: ${code}`);
    }

    dvary.ev.on("creds.update", saveCreds);

    dvary.ev.on("messages.upsert", async (m) => {
        const msg = m.messages[0];
        if (!msg.message) return;
        const text = msg.message.conversation || msg.message.extendedTextMessage?.text;

        // UKIANDIKA .menu ILETE ILE LIST YAKO KALI
        if (text === ".menu") {
            const menuText = `
╭━━───────────────➤─➤
┃    *𝗗𝗩𝗔𝗥𝗬-𝗕𝗢𝗧 𝗩10* 🚀
┃
┃➤🗿 𝚄𝚂𝙴𝚁 : Dvary manyama
┃➤📉 𝚅𝙴𝚁𝚂 : 10.0
┃➤⚙️ 𝙿𝚁𝙴𝙵𝙸𝚇 : .
┃➤👨🏽‍💻 𝙳𝙴𝚅 : DVARY AI SYSTEM
╰━━───────────────➤─➤

*OWNER MENU*👤
─➤ .alive
─➤ .owner
─➤ .runtime

*GROUP MENU*👥
─➤ .antilink
─➤ .kick
─➤ .promote

*PREMIUM UNBAN*🎭
─➤ .unban_wa
─➤ .numspam
            `;
            await dvary.sendMessage(msg.key.remoteJid, { text: menuText });
        }
    });
}

startDvaryBot();
