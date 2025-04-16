// outcome.js
document.addEventListener("DOMContentLoaded", () => {
    // Retrieve data from localStorage
    const savedData = JSON.parse(localStorage.getItem("travelData")) || {};
  
    // Populate summary
    const tripTitleEl = document.getElementById("trip-title");
    const tripDatesEl = document.getElementById("trip-dates");
    const tripInterestsEl = document.getElementById("trip-interests");
  
    tripTitleEl.textContent = `${savedData.destination || "Your"} Trip Plan`;
    tripDatesEl.textContent = formatDateRange(savedData.startDate, savedData.endDate);
    tripInterestsEl.textContent = savedData.interests
      ? `Interests: ${savedData.interests.join(", ")}`
      : "No interests selected.";
  
    // Tab switching logic
    const tabLinks = document.querySelectorAll(".tab-link");
    const tabContents = document.querySelectorAll(".tab-content");
  
    tabLinks.forEach((link) => {
      link.addEventListener("click", () => {
        // Remove active from all
        tabLinks.forEach((btn) => btn.classList.remove("active"));
        tabContents.forEach((content) => content.classList.add("hidden"));
  
        // Activate current
        link.classList.add("active");
        const targetTab = link.getAttribute("data-tab");
        document.getElementById(targetTab).classList.remove("hidden");
      });
    });

    // Initialize all features
    initializeTabs();
    generateItinerary(savedData);
    generateWeather(savedData);
    setupShareButtons();
    setupExportCards();
    initializeMap(savedData);
  });
  
  function formatDateRange(start, end) {
    if (!start || !end) return "";
    const startObj = new Date(start);
    const endObj = new Date(end);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return `${startObj.toLocaleDateString(undefined, options)} - ${endObj.toLocaleDateString(undefined, options)}`;
  }
  
  // Tab initialization function
  function initializeTabs() {
    const tabLinks = document.querySelectorAll(".tab-link");
    const tabContents = document.querySelectorAll(".tab-content");
  
    tabLinks.forEach((link) => {
      link.addEventListener("click", () => {
        tabLinks.forEach((btn) => btn.classList.remove("active"));
        tabContents.forEach((content) => content.classList.add("hidden"));
  
        link.classList.add("active");
        const targetTab = link.getAttribute("data-tab");
        document.getElementById(targetTab).classList.remove("hidden");
  
        // Special handling for map tab
        if (targetTab === 'map') {
          initializeMap(JSON.parse(localStorage.getItem("travelData")));
        }
      });
    });
  }
  
  // Generate itinerary content
  function generateItinerary(data) {
    const itineraryContent = document.querySelector('.itinerary-content');
    if (!itineraryContent) return;
  
    const startDate = new Date(data.startDate);
    const endDate = new Date(data.endDate);
    const dayCount = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
  
    const itinerary = Array.from({ length: dayCount }, (_, index) => {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + index);
      
      return {
        day: index + 1,
        date: currentDate.toLocaleDateString(undefined, { month: 'long', day: 'numeric' }),
        activities: generateDayActivities(data.interests, index),
        weather: generateWeatherData(currentDate)
      };
    });
  
    itineraryContent.innerHTML = itinerary.map(day => `
      <div class="day-card">
        <div class="day-header">
          <h3 class="day-title">Day ${day.day} - ${day.date}</h3>
          <div class="day-weather">
            <i class="fas ${day.weather.icon}"></i>
            <span>${day.weather.temp}</span>
          </div>
        </div>
        <div class="timeline">
          ${day.activities.map(activity => `
            <div class="timeline-item">
              <div class="time">${activity.time}</div>
              <h4>${activity.title}</h4>
              <p>${activity.description}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `).join('');
  }
  
  // Generate weather information
  function generateWeather(data) {
    const weatherContent = document.querySelector('.weather-content');
    if (!weatherContent) return;
  
    const startDate = new Date(data.startDate);
    const endDate = new Date(data.endDate);
    const dayCount = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
  
    const weatherData = Array.from({ length: dayCount }, (_, index) => {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + index);
      return generateWeatherData(currentDate);
    });
  
    weatherContent.innerHTML = weatherData.map(day => `
      <div class="weather-card">
        <div class="weather-date">${day.date}</div>
        <i class="fas ${day.icon} weather-icon-large"></i>
        <div class="weather-temp">${day.temp}</div>
        <div class="weather-details">
          <div>
            <i class="fas fa-wind"></i>
            <span>${day.wind}</span>
          </div>
          <div>
            <i class="fas fa-tint"></i>
            <span>${day.humidity}</span>
          </div>
        </div>
      </div>
    `).join('');
  }
  
  // Initialize map
  function initializeMap(data) {
    const mapContainer = document.getElementById('map-container');
    if (!mapContainer) return;
  
    // Create a placeholder map interface
    mapContainer.innerHTML = `
      <div style="width: 100%; height: 100%; background: #f0f0f0; display: flex; flex-direction: column; align-items: center; justify-content: center;">
        <i class="fas fa-map-marked-alt" style="font-size: 48px; color: #7237be; margin-bottom: 1rem;"></i>
        <p>Map of ${data.destination}</p>
        <p style="font-size: 0.9rem; color: #666;">Interactive map will be available soon</p>
      </div>
    `;
  }
  
  // Set up share buttons
  function setupShareButtons() {
    const shareButtons = document.querySelectorAll('.share-button');
    const tripData = JSON.parse(localStorage.getItem("travelData"));
    
    shareButtons.forEach(button => {
      button.addEventListener('click', () => {
        const shareText = `Check out my trip to ${tripData.destination}!`;
        const shareUrl = encodeURIComponent(window.location.href);
        
        let shareLink = '';
        switch(button.classList[1]) {
          case 'facebook':
            shareLink = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;
            break;
          case 'twitter':
            shareLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${shareUrl}`;
            break;
          case 'whatsapp':
            shareLink = `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + window.location.href)}`;
            break;
          case 'email':
            shareLink = `mailto:?subject=${encodeURIComponent(shareText)}&body=${encodeURIComponent('Check out my travel itinerary: ' + window.location.href)}`;
            break;
        }
        
        if (shareLink) window.open(shareLink, '_blank');
      });
    });
  }
  
  // Set up export functionality
  function setupExportCards() {
    const exportCards = document.querySelectorAll('.export-card');
    
    exportCards.forEach(card => {
      card.addEventListener('click', () => {
        const format = card.querySelector('.export-title').textContent;
        exportItinerary(format.toLowerCase());
      });
    });
  }
  
  // Helper function: Generate daily activities
  function generateDayActivities(interests = [], dayIndex) {
    // Here you can generate more personalized activities based on interests
    const defaultActivities = [
      { time: '09:00', title: 'Breakfast', description: 'Start your day with local cuisine' },
      { time: '10:30', title: 'Morning Activity', description: 'Explore local attractions' },
      { time: '13:00', title: 'Lunch Break', description: 'Try local specialties' },
      { time: '15:00', title: 'Afternoon Activity', description: 'Cultural experience' },
      { time: '19:00', title: 'Dinner', description: 'Evening dining experience' }
    ];
    return defaultActivities;
  }
  
  // Helper function: Generate weather data
  function generateWeatherData(date) {
    const weatherTypes = [
      { temp: '25°C', condition: 'Sunny', icon: 'fa-sun' },
      { temp: '22°C', condition: 'Partly Cloudy', icon: 'fa-cloud-sun' },
      { temp: '20°C', condition: 'Cloudy', icon: 'fa-cloud' }
    ];
    const randomWeather = weatherTypes[Math.floor(Math.random() * weatherTypes.length)];
    
    return {
      date: date.toLocaleDateString(undefined, { month: 'long', day: 'numeric' }),
      ...randomWeather,
      wind: `${Math.floor(Math.random() * 20 + 5)} km/h`,
      humidity: `${Math.floor(Math.random() * 30 + 50)}%`
    };
  }
  
  // Helper function: Export itinerary
  function exportItinerary(format) {
    const tripData = JSON.parse(localStorage.getItem("travelData"));
    alert(`Exporting ${tripData.destination} trip itinerary as ${format}...\nThis feature will be available soon!`);
  }
  