// script.js
async function searchRepositories() {
    const username = document.getElementById('username-input').value;
    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos`);
        if (!response.ok) {
            throw new Error('Failed to fetch repositories');
        }
        const repositories = await response.json();
        displayRepositories(repositories);
    } catch (error) {
        document.getElementById('error-message').textContent = error.message;
        document.getElementById('error-message').style.display = 'block';
        clearGallery();
    }
}

function displayRepositories(repositories) {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = '';
    repositories.forEach(repo => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <h3>${repo.name}</h3>
            <p>${repo.description || 'No description'}</p>
            <a href="${repo.html_url}" target="_blank">View on GitHub</a>
        `;
        gallery.appendChild(card);
    });
}

function clearGallery() {
    document.getElementById('gallery').innerHTML = '';
}
