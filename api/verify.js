import { Redis } from '@upstash/redis'

const redis = Redis.fromEnv()

export default async function handler(req, res) {
    const userIp = req.headers['x-forwarded-for'] || 'anonymous';

    // 1. POKELEA SMS KUTOKA SMS FORWARDER (POST)
    if (req.method === 'POST') {
        const message = req.body.message || "";
        // Inatafuta ID za Vodacom/Tigo/Airtel (Herufi na Namba 10-12)
        const match = message.match(/[A-Z0-9]{10,12}/);
        
        if (match) {
            const transId = match[0];
            // Tunahifadhi ID kama 'valid' kwa masaa 24
            await redis.set(`id:${transId}`, 'valid', { ex: 86400 });
            return res.status(200).json({ status: "SUCCESS", saved: transId });
        }
        return res.status(400).json({ error: "No ID found in SMS" });
    }

    // 2. HAKIKI ID KUTOKA KWA MTEJA (GET)
    if (req.method === 'GET') {
        const { id } = req.query;
        if (!id) return res.status(400).json({ error: "ID is required" });

        // KIHIZI (Rate Limiting): Zuia mtu anayejaribu ID za uongo hovyo
        const attempts = await redis.get(`limit:${userIp}`) || 0;
        if (attempts >= 5) {
            return res.status(429).json({ error: "Umejaribu mara nyingi mno. Subiri dakika 15." });
        }

        const status = await redis.get(`id:${id}`);

        if (status === 'valid') {
            // ID ni ya kweli! Ikiandikwa mara moja, tunaifuta isitumike tena (Security)
            await redis.del(`id:${id}`);
            return res.status(200).json({ verified: true });
        } else {
            // ID ni ya uongo: Ongeza hesabu ya majaribio ya uongo ya huyu mteja
            await redis.incr(`limit:${userIp}`);
            await redis.expire(`limit:${userIp}`, 900); // Zuio la dakika 15
            return res.status(404).json({ verified: false });
        }
    }
}
 
