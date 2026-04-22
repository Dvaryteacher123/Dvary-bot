import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ message: 'Method Not Allowed' });

    const { fullSms } = req.body;
    if (!fullSms) return res.status(400).json({ success: false, message: "SMS haipo!" });

    // Tunachukua ID pekee (Neno la kwanza la SMS)
    const userTxnId = fullSms.split(" ")[0].toUpperCase();

    // TUNAKAGUA SUPABASE: Lazima ID iwepo na iwe 'unused'
    const { data, error } = await supabase
        .from('payments')
        .select('*')
        .eq('txn_id', userTxnId)
        .eq('status', 'unused')
        .single();

    if (data) {
        // Ipo! Tunaifunga isitumiwe tena
        await supabase.from('payments').update({ status: 'used' }).eq('txn_id', userTxnId);
        
        return res.status(200).json({ 
            success: true, 
            link: "https://whatsapp.com/channel/0029VbBaKXB1t90W0S24QU0m" 
        });
    } else {
        // ID haipo au imeshatumika
        return res.status(400).json({ 
            success: false, 
            message: "Namba ya muamala haipo au imeshatumika! Hakikisha ume-copy SMS yote." 
        });
    }
}
