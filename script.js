
const fetchAnimeData = async () => {
    try {
        const response = await fetch('https://api.jikan.moe/v4/top/anime');
        const data = await response.json();
        const animeList = data.data;

        displayAnimeList(animeList);
    } catch (error) {
        console.error('Error fetching anime data:', error);
    }
};


const displayAnimeList = (animeList) => {
    const animeListContainer = document.getElementById('animeList');
    animeListContainer.innerHTML = ''; 

    animeList.forEach(anime => {
        const animeCard = document.createElement('div');
        animeCard.classList.add('anime-card');
        animeCard.innerHTML = `
            <img src="${anime.images.jpg.image_url}" alt="${anime.title}">
            <h3>${anime.title}</h3>
            <button onclick="addToFavorites('${anime.mal_id}', '${anime.title}', '${anime.images.jpg.image_url}')">Add to Favorites</button>
        `;
        animeListContainer.appendChild(animeCard);
    });
};


const addToFavorites = (id, title, imageUrl) => {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];


    const anime = { id, title, imageUrl };
    if (!favorites.some(fav => fav.id === id)) {
        favorites.push(anime);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        alert(`${title} has been added to your favorites!`);
    }
};

const displayFavoriteAnimeImages = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const favoriteAnimeImagesContainer = document.getElementById('favoriteAnimeImages');
    favoriteAnimeImagesContainer.innerHTML = ''; // Clear the container

    if (favorites.length === 0) {
        favoriteAnimeImagesContainer.innerHTML = '<p>No favorite anime yet!</p>';
    }

    favorites.forEach(fav => {
        const img = document.createElement('img');
        img.src = fav.imageUrl;
        img.alt = fav.title;
        favoriteAnimeImagesContainer.appendChild(img);
    });
};

if (document.getElementById('animeList')) {
    fetchAnimeData();
}

if (document.getElementById('favoriteAnimeImages')) {
    displayFavoriteAnimeImages();
}
