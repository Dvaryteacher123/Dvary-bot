const { default: makeWASocket, useMultiFileAuthState, delay } = require("@whiskeysockets/baileys");
const pino = require("pino");
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', async (req, res) => {
    let num = req.query.number;
    if (!num) {
        return res.send(`
            <body style="background:#000; color:#fff; font-family:sans-serif; text-align:center; padding-top:50px;">
                <h1>Dvary-Bot Pairing</h1>
                <p>Ingiza namba yako kuanzia 255 (mfano: 255718XXXXXX)</p>
                <form action="/" method="GET">
                    <input type="text" name="number" placeholder="255..." style="padding:10px; width:250px; border-radius:5px;"><br><br>
                    <button type="submit" style="padding:10px 20px; background:#25d366; color:#fff; border:none; border-radius:5px; cursor:pointer;">GET PAIRING CODE</button>
                </form>
            </body>
        `);
    }

    // Sehemu ya kutoa kodi
    const { state } = await useMultiFileAuthState('temp_session');
    const sock = makeWASocket({
        auth: state,
        logger: pino({ level: "silent" }),
        browser: ["Dvary-Bot", "Chrome", "1.0.0"]
    });

    try {
        await delay(2000);
        let code = await sock.requestPairingCode(num);
        res.send(`
            <body style="background:#000; color:#fff; font-family:sans-serif; text-align:center; padding-top:50px;">
                <h1>Dvary-Bot Pairing</h1>
                <div style="background:#222; padding:20px; display:inline-block; border-radius:10px; border:2px solid #25d366;">
                    <h2 style="color:#25d366;">KODI YAKO NI:</h2>
                    <h1 style="letter-spacing:5px;">${code}</h1>
                </div>
                <p>Nakili kodi hii na uiweke kwenye WhatsApp yako (Linked Devices)</p>
                <a href="/" style="color:#25d366;">Jaribu namba nyingine</a>
            </body>
        `);
    } catch (e) {
        res.send("Kuna kosa limetokea. Hakikisha namba imeanza na 255.");
    }
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
