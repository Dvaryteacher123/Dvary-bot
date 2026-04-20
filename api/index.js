const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors());
app.use(bodyParser.json());

// Database ya muda
let transactions = [];

// Inaruhusu kuonyesha faili la index.html kama "Home Page"
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
});

// Webhook ya kupokea SMS kutoka kwenye simu yako
app.post('/api/webhook', (req, res) => {
    const smsBody = req.body.message || ""; 
    const txnMatch = smsBody.match(/[A-Z0-9]{10}/); 
    
    if (txnMatch && (smsBody.includes("2000") || smsBody.includes("2,000"))) {
        const txnId = txnMatch[0];
        if (!transactions.includes(txnId)) {
            transactions.push(txnId);
        }
    }
    res.status(200).send("SMS Imepokelewa");
});

// Sehemu ya kuhakiki muamala
app.get('/api/verify', (req, res) => {
    const customerTxn = req.query.txnId;
    if (transactions.includes(customerTxn)) {
        res.json({ 
            status: "success", 
            link: "https://whatsapp.com/channel/0029VbBaKXB1t90W0S24QU0m" 
        });
    } else {
        res.json({ 
            status: "failed", 
            message: "Muamala haujapatikana! Hakikisha umelipa 2000 na uandike ID kwa usahihi." 
        });
    }
});

module.exports = app;
