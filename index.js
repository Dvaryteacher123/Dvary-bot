const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// 🔐 PASSWORD YAKO (Itumie hii kuingia au badilisha hapa)
const PASSWORD = "dvary77"; 

// 📺 SEHEMU YA KUONGEZA VIDEO ZAKO (Ongeza hapa chini unavyotaka)
const VIDEOS = [
    { 
        title: "Karibu Dvary-Bot Vault", 
        url: "https://www.w3schools.com/html/mov_bbb.mp4" 
    },
    { 
        title: "Video ya Pili: Street Wisdom", 
        url: "https://www.w3schools.com/html/movie.mp4" 
    }
    // Ukitaka kuongeza ya tatu, weka mkato (,) hapo juu kisha nakili mstari huu hapa chini:
    // { title: "Jina la Video", url: "Link ya Video hapa" }
];

app.get('/', (req, res) => {
    let pass = req.query.password;

    // 1. UKURASA WA PASSWORD (LOGIN)
    if (pass !== PASSWORD) {
        return res.send(`
            <body style="background:#000; color:#25d366; font-family:sans-serif; text-align:center; padding-top:100px; margin:0;">
                <h1 style="font-size:28px; letter-spacing:2px;">🔐 DVARY PRIVATE VAULT</h1>
                <p style="color:#888; margin-bottom:30px;">Ingiza Password Kuona Video Zangu</p>
                <form action="/" method="GET">
                    <input type="password" name="password" placeholder="Neno la siri..." 
                        style="padding:15px; border-radius:10px; border:1px solid #25d366; width:80%; max-width:300px; background:#111; color:#fff; font-size:16px; outline:none;">
                    <br><br>
                    <button type="submit" 
                        style="padding:12px 40px; background:#25d366; color:#000; font-weight:bold; border:none; border-radius:8px; cursor:pointer; font-size:16px; transition:0.3s;">
                        INGIA SASA
                    </button>
                </form>
                <p style="margin-top:100px; color:#444; font-size:11px;">© 2026 DVARY MANYAMA PROJECTS</p>
            </body>
        `);
    }

    // 2. UKURASA WA VIDEO (BAADA YA LOGIN)
    let videoCards = VIDEOS.map((v, index) => `
        <div style="background:#161b22; margin-bottom:25px; padding:15px; border-radius:15px; border:1px solid #30363d; text-align:left;">
            <h3 style="color:#25d366; margin-top:0;">🎥 ${v.title}</h3>
            <video width="100%" controls style="border-radius:12px; background:#000; box-shadow: 0 5px 15px rgba(0,0,0,0.5);">
                <source src="${v.url}" type="video/mp4">
                Browser yako haikubali video.
            </video>
            <p style="color:#555; font-size:12px; margin-top:10px; margin-bottom:0;">Video #${index + 1}</p>
        </div>
    `).join('');

    res.send(`
        <body style="background:#0d1117; color:#fff; font-family:sans-serif; margin:0; padding:20px;">
            <div style="max-width:600px; margin:auto;">
                <header style="text-align:center; margin-bottom:40px; border-bottom:1px solid #30363d; padding-bottom:20px;">
                    <h1 style="color:#25d366; margin-bottom:5px;">DVARY VIDEO VAULT</h1>
                    <p style="color:#8b949e; margin:0;">Karibu kwenye stoo ya siri ya Dvary</p>
                </header>
                
                ${videoCards}

                <footer style="text-align:center; margin-top:50px; padding:20px; color:#444; font-size:12px;">
                    <p>Ukitaka kurudi nyuma, funga browser au Clear Cache.</p>
                </footer>
            </div>
        </body>
    `);
});

app.listen(PORT, () => console.log("System is Online!"));
