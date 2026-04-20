const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

// Huu ndio ulinzi wa CORS - tunaufungua wote
app.use(cors({ origin: '*' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let transactions = [];

app.get('/', (req, res) => {
    res.send("Dvary Server is Live! Chaji ya Elia: 6%");
});

// Tunabadilisha iweze kupokea kila aina ya data (JSON au URL Encoded)
app.post('/api/webhook', (req, res) => {
    console.log("Data imeingia:", req.body);
    const smsBody = req.body.message || req.body.text || "";
    const txnMatch = smsBody.match(/[A-Z0-9]{10}/);
    
    if (txnMatch) {
        transactions.push(txnMatch[0]);
        return res.status(200).json({ status: "ok" });
    }
    res.status(400).send("No ID found");
});

app.get('/api/verify', (req, res) => {
    const txn = req.query.txnId;
    if (transactions.includes(txn)) {
        res.json({ status: "success", link: "https://whatsapp.com/channel/0029VbBaKXB1t90W0S24QU0m" });
    } else {
        res.json({ status: "failed", message: "ID haipo! Jaribu tena." });
    }
});

module.exports = app;
