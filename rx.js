// Retrieve data from localStorage or initialize an empty array
const STORAGE_KEY = 'animeList';
let animeList = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

// DOM elements
const animeForm = document.getElementById('anime-form');
const animeListContainer = document.getElementById('anime-list');
const filterGenre = document.getElementById('filter-genre');

// Event listeners
animeForm.addEventListener('submit', handleAddAnime);
filterGenre.addEventListener('change', loadAnimeList);

// Load anime list from localStorage and apply the selected filter
function loadAnimeList() {
  animeListContainer.innerHTML = ''; // Clear current list
  const genreFilter = filterGenre.value;

  // Filter anime by selected genre
  const filteredAnime = genreFilter
    ? animeList.filter(anime => anime.genres.includes(genreFilter))
    : animeList;

  filteredAnime.forEach((anime, index) => {
    const animeCard = createAnimeCard(anime, index);
    animeListContainer.appendChild(animeCard);
  });
}

// Create an individual anime card element
function createAnimeCard(anime, index) {
  const animeCard = document.createElement('div');
  animeCard.classList.add('anime-card');

  animeCard.innerHTML = `
    <img src="${anime.image}" alt="${anime.title}">
    <h3>${anime.title}</h3>
    <p>${anime.description}</p>
    <p><strong>Rating:</strong> ${anime.rating}</p>
    <p><strong>Genres:</strong> ${anime.genres.join(', ')}</p>
    <div class="actions">
      <button class="edit" onclick="handleEditAnime(${index})">Edit</button>
      <button onclick="handleDeleteAnime(${index})">Delete</button>
    </div>
  `;
  
  return animeCard;
}

// Handle the form submission to add a new anime
function handleAddAnime(event) {
  event.preventDefault(); // Prevent page refresh on form submit

  const newAnime = getAnimeFromForm();
  if (validateAnime(newAnime)) {
    animeList.push(newAnime);
    saveAnimeList();
    animeForm.reset(); // Reset the form after adding
    loadAnimeList(); // Reload the anime list to reflect the new entry
  } else {
    alert('Please fill out all fields with valid data!');
  }
}

// Retrieve anime data from the form
function getAnimeFromForm() {
  const title = document.getElementById('title').value.trim();
  const description = document.getElementById('description').value.trim();
  const rating = parseInt(document.getElementById('rating').value);
  const genres = Array.from(document.getElementById('genre').selectedOptions).map(option => option.value);
  const image = document.getElementById('image').value.trim();

  return { title, description, rating, genres, image };
}

// Validate the anime form data before adding it
function validateAnime(anime) {
  return anime.title && anime.description && anime.rating >= 1 && anime.rating <= 10 && anime.genres.length > 0 && anime.image;
}

// Save the anime list to localStorage
function saveAnimeList() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(animeList));
  } catch (error) {
    console.error('Failed to save anime list to localStorage', error);
  }
}

// Handle anime deletion
function handleDeleteAnime(index) {
  animeList.splice(index, 1); // Remove the anime from the array
    saveAnimeList();}
