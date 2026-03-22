const { default: makeWASocket, useMultiFileAuthState, delay, fetchLatestBaileysVersion } = require("@whiskeysockets/baileys");
const pino = require("pino");
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', async (req, res) => {
    let num = req.query.number;
    if (!num) {
        return res.send(`
            <body style="background:#0d1117; color:#58a6ff; font-family:sans-serif; text-align:center; padding-top:50px;">
                <h1 style="color:#238636;">DVARY-BOT V30</h1>
                <p>Weka namba yako kuanzia 255 (Bila +)</p>
                <form action="/" method="GET">
                    <input type="text" name="number" placeholder="2557XXXXXXXX" style="padding:12px; width:280px; border-radius:8px; border:1px solid #30363d; background:#161b22; color:#fff;"><br><br>
                    <button type="submit" style="padding:10px 25px; background:#238636; color:#fff; border:none; border-radius:5px; font-weight:bold; cursor:pointer;">PATA KODI</button>
                </form>
            </body>
        `);
    }

    num = num.replace(/[^0-9]/g, '');
    const { state, saveCreds } = await useMultiFileAuthState('session');
    const { version } = await fetchLatestBaileysVersion();

    const sock = makeWASocket({
        auth: state,
        version,
        logger: pino({ level: "silent" }),
        // Hapa ndipo muhimu: Lazima iwe "Chrome" na toleo jipya
        browser: ["Ubuntu", "Chrome", "122.0.0"] 
    });

    try {
        await delay(2000);
        let code = await sock.requestPairingCode(num);
        res.send(`
            <body style="background:#0d1117; color:#fff; font-family:monospace; text-align:center; padding-top:40px;">
                <div style="border:1px solid #238636; display:inline-block; padding:20px; text-align:left; border-radius:10px;">
                    <p>┌ ❏ ◆ ⌜𝗣𝗔𝗜𝗥𝗜𝗡𝗚 𝗖𝗢𝗗𝗘⌟ ◆</p>
                    <p>│</p>
                    <p>├◆ <span style="font-size:35px; color:#238636; font-weight:bold; letter-spacing:5px;">${code}</span></p>
                    <p>│</p>
                    <p>└ ❏</p>
                    <p>✅ INGIZA KODI HII WHATSAPP YAKO SASA HIVI!</p>
                </div>
            </body>
        `);
    } catch (e) {
        res.send("Kuna shida kidogo. Jaribu tena baada ya sekunde 10.");
    }
});

app.listen(PORT, () => console.log("Bot ipo Online!"));
