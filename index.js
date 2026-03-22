
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
                <p>Ingiza namba yako kuanzia 255</p>
                <form action="/" method="GET">
                    <input type="text" name="number" placeholder="2557XXXXXXXX" style="padding:10px; width:250px;"><br><br>
                    <button type="submit" style="padding:10px 20px; background:#25d366; color:#fff; border:none; cursor:pointer;">GET CODE</button>
                </form>
            </body>
        `);
    }

    const { state } = await useMultiFileAuthState('session');
    const sock = makeWASocket({
        auth: state,
        logger: pino({ level: "silent" }),
        browser: ["Ubuntu", "Chrome", "20.0.0"]
    });

    try {
        await delay(3000);
        let code = await sock.requestPairingCode(num);
        res.send(`
            <body style="background:#000; color:#fff; font-family:sans-serif; text-align:center; padding-top:50px;">
                <h1>KODI YAKO NI:</h1>
                <h1 style="color:#25d366; font-size:50px; letter-spacing:5px;">${code}</h1>
                <p>Ingiza kodi hii kwenye WhatsApp yako (Linked Devices)</p>
                <a href="/" style="color:#fff;">Rudi nyuma</a>
            </body>
        `);
    } catch (e) {
        res.send("Kuna kosa! Hakikisha namba haina alama ya + na uanze na 255.");
    }
});

app.listen(PORT, () => console.log(`Server on port ${PORT}`));
