export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { fullSms } = req.body;

        // Tunachukua ID kutoka kwenye SMS aliyopaste mteja
        const userTxnId = fullSms.split(" ")[0];

        // Tunakagua kama hii ID ipo kwenye kumbukumbu zetu
        // (Hapa unatakiwa uunganishe na Supabase/Database yako)
        const muamalaHalali = true; // Hapa tutaweka kodi ya kucheki database

        if (muamalaHalali) {
            return res.status(200).json({ 
                success: true, 
                link: "https://whatsapp.com/channel/0029VbBaKXB1t90W0S24QU0m" 
            });
        } else {
            return res.status(400).json({ 
                success: false, 
                message: "Muamala huu haujapatikana au ni wa uongo!" 
            });
        }
    }
}

