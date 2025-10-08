import fetchingData from './getData.js';

export default async function showDiscover(){
    const discover = document.getElementById('discover')
    const places = await fetchingData('../data/places.json').then(result => result)

    places.forEach(place => {
    const card = document.createElement('div');
    card.classList.add('card');

    const img = document.createElement('img');
    img.src = `images/${place.image_url}`;
    img.alt = `${place.name} Avatar`;
    img.loading = 'lazy';
    img.width = 200;
    img.height = 200;

    const name = document.createElement('h3');
    name.textContent = place.name;

    const address = document.createElement('p');
    address.textContent = place.location;

    const hr = document.createElement('hr');

    const highlight = document.createElement('p');
    highlight.textContent = place.highlight;

    const difficulty = document.createElement('p');
    difficulty.textContent = place.difficulty;


    card.append(img, name, address, hr, highlight, difficulty);
    discover.appendChild(card);
    });

}