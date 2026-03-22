const { 
    default: makeWASocket, 
    useMultiFileAuthState, 
    DisconnectReason, 
    delay, 
    useSingleFileAuthState 
} = require("@whiskeysockets/baileys");
const pino = require("pino");
const http = require('http');
const readline = require('readline');

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const question = (text) => new Promise((resolve) => rl.question(text, resolve));

// Group lako la Auto-Join
const GROUP_LINK = 'https://chat.whatsapp.com/CBesZJA02UVCwcGdzdeyeJ';

async function startDvaryBot() {
    const { state, saveCreds } = await useMultiFileAuthState('session');
    
    // Inazuia Render isizime
    http.createServer((req, res) => {
        res.write("Dvary-Bot Pairing Mode is Active!");
        res.end();
    }).listen(process.env.PORT || 3000);

    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: false, // Tunatumia Pairing Code badala ya QR
        logger: pino({ level: "silent" }),
    });

    // KAMA HAUJAUNGANISHWA (Huna Session), ITAOMBA NAMBA YA SIMU
    if (!sock.authState.creds.registered) {
        console.log("--------------------------------------------------");
        console.log("INGIZA NAMBA YAKO YA SIMU (Mfano: 255718XXXXXX)");
        const phoneNumber = await question('Namba: ');
        const code = await sock.requestPairingCode(phoneNumber.trim());
        console.log(`\n👉 PAIRING CODE YAKO NI: ${code}\n`);
        console.log("Ingiza hiyo kodi kwenye WhatsApp yako (Linked Devices > Link with phone number)");
        console.log("--------------------------------------------------");
    }

    sock.ev.on("connection.update", async (update) => {
        const { connection, lastDisconnect } = update;
        if (connection === "open") {
            console.log("✅ Dvary-Bot Imeunganishwa Kikamilifu!");
            try {
                const groupCode = GROUP_LINK.split('https://chat.whatsapp.com/')[1].split('?')[0];
                await sock.groupAcceptInvite(groupCode);
                console.log("🚀 Mtumiaji ameingizwa kwenye group automatically!");
            } catch (e) { console.log("Group Join Error: " + e); }
        }
        if (connection === "close") {
            const shouldReconnect = lastDisconnect.error?.output?.statusCode !== DisconnectReason.loggedOut;
            if (shouldReconnect) startDvaryBot();
        }
    });

    sock.ev.on("creds.update", saveCreds);
}

startDvaryBot();
