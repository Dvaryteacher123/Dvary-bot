const apiKey = 'ZiD7h5dr9A5Xx1lmQVbwlDREBnlDNo8O3GigN9NYVxCa6Cn3NUm1ws3a';

async function tafutaPicha() {
    const query = document.getElementById('search-input').value;
    const resultsDiv = document.getElementById('results');
    
    if (!query) return alert('Tafadhali andika neno la kutafuta!');
    
    resultsDiv.innerHTML = '<p>Inatafuta...</p>';

    try {
        const response = await fetch(`https://api.pexels.com/v1/search?query=${query}&per_page=15`, {
            headers: {
                Authorization: apiKey
            }
        });

        const data = await response.json();
        resultsDiv.innerHTML = '';

        if (data.photos.length === 0) {
            resultsDiv.innerHTML = '<p>Hakuna picha zilizopatikana.</p>';
            return;
        }

        data.photos.forEach(photo => {
            const imgContainer = document.createElement('div');
            imgContainer.className = 'img-item';
            imgContainer.innerHTML = `
                <img src="${photo.src.medium}" alt="${photo.alt}">
                <a href="${photo.src.original}" download target="_blank">Download</a>
            `;
            resultsDiv.appendChild(imgContainer);
        });
    } catch (error) {
        resultsDiv.innerHTML = '<p>Tatizo la mtandao!</p>';
    }
}

// Hii inafanya kitufe cha "Tafuta" kifanye kazi
document.getElementById('search-btn').addEventListener('click', tafutaPicha);
