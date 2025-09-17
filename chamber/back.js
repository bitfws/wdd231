 <script>
    // 🔹 OpenWeatherMap API setup
    const apiKey = "YOUR_API_KEY"; // <-- pon aquí tu API key
    const city = "Salt Lake City"; // <-- cambia por la ciudad de la cámara
    const units = "imperial"; // "imperial" = °F, "metric" = °C

    // Current weather
    async function getWeather() {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`);
      const data = await response.json();

      const weatherDiv = document.getElementById("current-weather");
      weatherDiv.innerHTML = `
        <p><strong>${Math.round(data.main.temp)}°F</strong></p>
        <p>${data.weather[0].description}</p>
        <p>High: ${Math.round(data.main.temp_max)}°F | Low: ${Math.round(data.main.temp_min)}°F</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Sunrise: ${new Date(data.sys.sunrise * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
        <p>Sunset: ${new Date(data.sys.sunset * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
      `;
    }

    // 3-day forecast
    async function getForecast() {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`);
      const data = await response.json();

      const forecastDiv = document.getElementById("weather-forecast");
      forecastDiv.innerHTML = "";

      // Filtramos solo 1 por día (12:00:00)
      const dailyForecasts = data.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 3);

      dailyForecasts.forEach(day => {
        const date = new Date(day.dt_txt);
        const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
        forecastDiv.innerHTML += `<p>${dayName}: <strong>${Math.round(day.main.temp)}°F</strong></p>`;
      });
    }

    // 🔹 JSON de miembros (ejemplo)
    const members = [
      {
        "name": "Tech Solutions Inc.",
        "logo": "https://via.placeholder.com/60",
        "phone": "123-456-7890",
        "address": "123 Main St, City",
        "website": "https://techsolutions.com",
        "membership": "Gold"
      },
      {
        "name": "Creative Designs",
        "logo": "https://via.placeholder.com/60",
        "phone": "987-654-3210",
        "address": "456 Oak St, City",
        "website": "https://creativedesigns.com",
        "membership": "Silver"
      },
      {
        "name": "Local Market",
        "logo": "https://via.placeholder.com/60",
        "phone": "555-123-4567",
        "address": "789 Pine St, City",
        "website": "https://localmarket.com",
        "membership": "Bronze"
      }
    ];

    // Mostrar 2-3 miembros aleatorios Gold/Silver
    function displaySpotlights() {
      const spotlightDiv = document.getElementById("spotlights");
      spotlightDiv.innerHTML = "";

      // Filtramos solo Gold o Silver
      const filtered = members.filter(m => m.membership === "Gold" || m.membership === "Silver");

      // Mezclamos y tomamos 2-3
      const shuffled = filtered.sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 2) + 2);

      shuffled.forEach(member => {
        spotlightDiv.innerHTML += `
          <div class="spotlight-card">
            <img src="${member.logo}" alt="${member.name}">
            <div>
              <h4>${member.name}</h4>
              <p>${member.membership} Member</p>
              <p>${member.phone}</p>
              <p>${member.address}</p>
              <a href="${member.website}" target="_blank">Visit Website</a>
            </div>
          </div>
        `;
      });
    }

    // Ejecutar funciones
    getWeather();
    getForecast();
    displaySpotlights();
  </script>