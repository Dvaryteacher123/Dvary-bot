const axios = require('axios');

module.exports = async (req, res) => {
    const { url, type } = req.query;
    if (!url) return res.status(400).json({ error: "No URL" });

    try {
        // Tunatumia API ya haraka ya 'Loke-Downloader'
        const response = await axios.get(`https://api.loke-downloader.biz/api/all?url=${encodeURIComponent(url)}`);
        const data = response.data;

        let downloadUrl = "";
        if (type === 'audio') {
            downloadUrl = data.mp3 || data.audio;
        } else {
            downloadUrl = data.mp4 || data.video;
        }

        res.status(200).json({ downloadUrl });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch data" });
    }
};
