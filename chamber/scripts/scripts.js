'use strict';

document.addEventListener('DOMContentLoaded', () => {
  // CONSTANTS
  const pageName = document.title.split(' | ')[1];

  (function defaultActions() {
    // title
    const title = document.querySelector('.currentPageTitle');
    if (title) title.textContent = pageName;

    // current page selection and Toggle navigation
    document.querySelectorAll('nav a').forEach((pageLink) => {
      if (pageLink.textContent.toLowerCase() === pageName.toLowerCase()) {
        pageLink.classList.add('active');
      } else {
        pageLink.classList.remove('active');
      }
    });

    // nav
    const nav = document.getElementById('menu');
    const menuMobile = document.getElementById('menu-mobile');

    menuMobile.setAttribute('aria-controls', 'menu');
    menuMobile.setAttribute('aria-label', 'Toggle navigation menu');

    menuMobile.addEventListener('click', () => {
      const expanded = menuMobile.getAttribute('aria-expanded') === 'true';
      menuMobile.setAttribute('aria-expanded', !expanded);

      if (!expanded) {
        menuMobile.textContent = 'X';
        nav.style.display = 'flex';
        nav.style.top = '0px';
      } else {
        menuMobile.textContent = '☰';
        nav.style.display = 'none';
        nav.style.top = '-100vw';
      }
    });

    // footer data
    const currentYearSpan = document.getElementById('currentyear');
    if (currentYearSpan) {
      currentYearSpan.textContent = `© ${new Date().getFullYear()} Timbuktu Chamber of Commerce`;
    }

    const lastModifiedP = document.getElementById('lastModified');
    if (lastModifiedP) {
      lastModifiedP.textContent = `Last Modification: ${document.lastModified}`;
    }
  })();

  switch (pageName.toLowerCase()) {
    case 'discover':
      showDiscover();
      break;
    case 'directory':
      showDirectory();
      break;
    case 'join':
      showJoin();
      break;

    default: // home
      showHome();
      break;
  }
});

// views
async function showHome() {
  const members = await fetchingData('data/members.json');

  const filteredMembers = members.filter(member => ['Active', 'gold', 'silver'].includes(member.membership_level));

  const numToDisplay = Math.min(3, filteredMembers.length);
  const selectedMembers = getRandomMembers(filteredMembers, numToDisplay);

  getWeather();
  getForecast();

  const businessCards = document.getElementById('business-cards');
  businessCards.innerHTML = '';

  const fragment = document.createDocumentFragment();

  selectedMembers.forEach(({ name, address, phone, website, image, additional_info, membership_level }) => {
    const card = document.createElement('div');
    card.classList.add('card');

    if (membership_level === 'gold') {
      card.style.border = '5px solid gold';
    } else if (membership_level === 'silver') {
      card.style.border = '5px solid silver';
    }

    const cardTitle = document.createElement('div');
    cardTitle.classList.add('card-title');

    const nameElement = document.createElement('h3');
    nameElement.textContent = name;

    const slogan = document.createElement('p');
    slogan.textContent = additional_info || 'Información adicional no disponible.';

    cardTitle.append(nameElement, slogan);

    const cardBusinessData = document.createElement('div');
    cardBusinessData.classList.add('card-business-data');

    const img = document.createElement('img');
    img.src = image ? `images/${image}` : 'default-avatar.png';
    img.alt = `${name} Avatar`;
    img.loading = 'lazy';
    img.width = 200;
    img.height = 200;

    const businessInfo = document.createElement('div');
    businessInfo.classList.add('business-info');

    const addressElement = document.createElement('p');
    addressElement.innerHTML = `<strong>EMAIL:</strong> ${address}`;

    const phoneElement = document.createElement('p');
    phoneElement.innerHTML = `<strong>PHONE:</strong> ${phone}`;

    const websiteElement = document.createElement('a');
    websiteElement.href = website;
    websiteElement.target = '_blank';
    websiteElement.rel = 'noopener noreferrer';
    websiteElement.innerHTML = `<strong>URL:</strong> ${website}`;

    businessInfo.append(addressElement, phoneElement, websiteElement);
    cardBusinessData.append(img, businessInfo);

    const hr = document.createElement('hr');
    card.append(cardTitle, hr, cardBusinessData);
    fragment.appendChild(card);
  });

  businessCards.appendChild(fragment);
}

function getRandomMembers(members, count) {
  const shuffled = [...members].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}


function showDiscover() {}

async function showDirectory() {
  const members = await fetchingData('data/members.json').then(
    (result) => result
  );

  const view_selector = document.getElementById('view_selector');
  const content = document.getElementById('content');

  Array.from(view_selector.children).forEach((button) => {
    button.addEventListener('click', () => {
      content.classList.remove('grid', 'list');

      if (button.textContent === 'Grid') {
        content.classList.add('grid');
      } else {
        content.classList.add('list');
      }
    });
  });

  content.innerHTML = '';

  members.forEach((member) => {
    const card = document.createElement('div');
    card.classList.add('card');

    const img = document.createElement('img');
    img.src = `images/${member.image}`;
    img.alt = `${member.name} Avatar`;
    img.loading = 'lazy';
    img.width = 200;
    img.height = 200;

    const name = document.createElement('h3');
    name.textContent = member.name;

    const address = document.createElement('p');
    address.textContent = member.address;

    const phone = document.createElement('p');
    phone.textContent = member.phone;

    const website = document.createElement('a');
    website.href = member.website;
    website.target = '_blank';
    website.rel = 'noopener noreferrer';
    website.textContent = 'Details';

    card.append(img, name, address, phone, website);
    content.appendChild(card);
  });
}

function showJoin() {}

// fetch
async function fetchingData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (err) {
    console.error('Error fetching data:', err);
    return null;
  }
}

const apiKey = '1183fada8366d9a690ff687ffe563315';
const city = 'Salt Lake City';
const units = 'imperial';

async function getWeather() {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`
  );
  const data = await response.json();

  const weatherDiv = document.getElementById('current-weather');
  weatherDiv.innerHTML = `
        <h2>Current Weather</h2>
        <div>
          <img src=http://openweathermap.org/img/wn/${
            data.weather[0].icon
          }.png alt='weather icon' loading="lazy">
          <section>
          <p><strong>${Math.round(data.main.temp)}°F</strong></p>
          <p>${data.weather[0].description}</p>
          <p>High: ${Math.round(data.main.temp_max)}°F | Low: ${Math.round(
    data.main.temp_min
  )}°F</p>
          <p>Humidity: ${data.main.humidity}%</p>
          <p>Sunrise: ${new Date(data.sys.sunrise * 1000).toLocaleTimeString(
            [],
            {
              hour: '2-digit',
              minute: '2-digit',
            }
          )}</p>
          <p>Sunset: ${new Date(data.sys.sunset * 1000).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}</p>
          </section>
        </div>
        `;
}

async function getForecast() {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`
  );
  const data = await response.json();

  const forecastDiv = document.getElementById('weather-forecast');
  forecastDiv.innerHTML = '';
  forecastDiv.innerHTML += '<h2>Weather Forecast</h2>';

  const dailyForecasts = data.list
    .filter((item) => item.dt_txt.includes('12:00:00'))
    .slice(0, 3);

  dailyForecasts.forEach((day) => {
    const date = new Date(day.dt_txt);
    const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
    forecastDiv.innerHTML += `<p>${dayName}: <strong>${Math.round(
      day.main.temp
    )}°F</strong></p>`;
  });
}
