// File: api/verify.js
let confirmedPayments = new Set(); // Hifadhi ya muda (Memory)

export default async function handler(req, res) {
    // 1. POKELEA SMS KUTOKA SMS FORWARDER
    if (req.method === 'POST') {
        const { message } = req.body; 
        
        // Inatafuta ID ya muamala (Herufi na namba 10 za kwanza)
        const match = message.match(/[A-Z0-9]{10}/);
        if (match) {
            confirmedPayments.add(match[0]);
            console.log("Muamala Mpya Umesajiliwa: " + match[0]);
            return res.status(200).json({ status: "Received" });
        }
        return res.status(400).json({ error: "No ID found in SMS" });
    }

    // 2. HAKIKI ID KUTOKA KWA MTEJA
    if (req.method === 'GET') {
        const { id } = req.query;
        if (confirmedPayments.has(id)) {
            return res.status(200).json({ verified: true });
        } else {
            return res.status(404).json({ verified: false });
        }
    }
}
