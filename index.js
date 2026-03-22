const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// WEKA PASSWORD YAKO HAPA
const MY_PASSWORD = "dvary77"; 

// LINK ZA VIDEO ZAKO (Weka link za video kutoka TikTok, Drive, au GitHub)
const MY_VIDEOS = [
    { title: "Goli la Leo", url: "https://www.w3schools.com/html/mov_bbb.mp4" },
    { title: "Skills za Mpira", url: "https://www.w3schools.com/html/movie.mp4" }
];

app.get('/', (req, res) => {
    let pass = req.query.password;

    if (pass !== MY_PASSWORD) {
        return res.send(`
            <body style="background:#000; color:#25d366; font-family:sans-serif; text-align:center; padding-top:100px;">
                <h1>🔐 DVARY PRIVATE VAULT</h1>
                <p style="color:#fff;">Ingiza Password Kuona Video</p>
                <form action="/" method="GET">
                    <input type="password" name="password" placeholder="Password..." style="padding:12px; border-radius:5px; border:none;"><br><br>
                    <button type="submit" style="padding:10px 20px; background:#25d366; color:#000; font-weight:bold; border:none; cursor:pointer;">FUNGUA</button>
                </form>
             body>
        `);
    }

    // Kama Password ni sahihi, onyesha Video na Sehemu ya Pairing
    let videoHtml = MY_VIDEOS.map(v => `
        <div style="margin-bottom:20px; border:1px solid #333; padding:10px; border-radius:10px;">
            <h3>${v.title}</h3>
            <video width="100%" controls style="border-radius:10px;">
                <source src="${v.url}" type="video/mp4">
            </video>
        </div>
    `).join('');

    res.send(`
        <body style="background:#0d1117; color:#fff; font-family:sans-serif; padding:20px; text-align:center;">
            <h1 style="color:#25d366;">✅ KARIBU DVARY</h1>
            <hr border="1" color="#333">
            
            <div style="max-width:500px; margin:auto;">
                ${videoHtml}
            </div>

            <div style="margin-top:50px; background:#161b22; padding:20px; border-radius:15px; border:1px dashed #25d366;">
                <h2>🤖 DVARY-BOT PAIRING</h2>
                <p>Nenda <a href="/pair" style="color:#25d366;">HAPA</a> Kupata Kodi ya WhatsApp</p>
            </div>
        </body>
    `);
});

// Sehemu ya Pairing Code (Ipo vilevile tulivyopanga mwanzo)
app.get('/pair', (req, res) => {
    res.send("Hapa ndipo utaweka namba yako ya pairing... (Kodi inaendelea hapa)");
});

app.listen(PORT, () => console.log("Vault is Live!"));
