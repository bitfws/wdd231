import modal from './modal.js';
import fetchingData from './getData.js';
('./getData.js');

export default async function showDiscover() {
  const discover = document.querySelector('#discover');

  try {
    const response = await fetchingData('data/places.json');

    response.forEach((place) => {
      const card = document.createElement('div');
      card.classList.add('card');
      card.style.cursor = 'pointer';

      const img = document.createElement('img');
      img.src = `images/${place.image_url}`;
      img.alt = `${place.name}`;
      img.loading = 'lazy';
      img.width = 300;
      img.height = 300;

      card.addEventListener('click', () => {
        modal(place);
      });

      const name = document.createElement('h3');
      name.textContent = place.name;

      const address = document.createElement('p');
      address.textContent = place.location;

      const hr = document.createElement('hr');

      const highlight = document.createElement('p');
      highlight.textContent = place.highlight;

      const difficulty = document.createElement('p');
      difficulty.textContent = place.difficulty;

      card.append(img, name, address, hr, highlight, hr, difficulty);
      discover.appendChild(card);
    });
  } catch (error) {
    console.error('Error fetching the data:', error);
    const errorMessage = document.createElement('p');
    errorMessage.textContent =
      "Sorry, we couldn't load the places data. Please try again later.";
    discover.appendChild(errorMessage);
  }
}
