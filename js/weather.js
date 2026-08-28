// Weather and AQI Integration with Location-Aware Advisory
// AgryNova enhanced weather system

const WEATHER_API_KEY = 'YOUR_OPENWEATHER_API_KEY';
const WEATHER_API_BASE = 'https://api.openweathermap.org/data/2.5';
const AQI_API_BASE = 'https://api.waqi.info';
const DEFAULT_CITY = 'Delhi';

// Load weather data with location awareness
async function loadWeatherData() {
    try {
        // Get farmer profile for location
        const farmerProfile = window.getFarmerProfile ? window.getFarmerProfile() : null;
        let city = DEFAULT_CITY;
        
        if (farmerProfile && farmerProfile.district) {
            city = `${farmerProfile.district}, India`;
        }
        
        // Check if API key is configured
        if (WEATHER_API_KEY === 'YOUR_OPENWEATHER_API_KEY') {
            console.log('Weather API key not configured, using mock data');
            if (!window.mockDataNotified) {
                showNotification('Using demo weather data', 'info');
                window.mockDataNotified = true;
            }
            loadMockWeatherData(city);
            return;
        }
        
        // Fetch current weather
        const weatherResponse = await fetch(
            `${WEATHER_API_BASE}/weather?q=${city}&units=metric&appid=${WEATHER_API_KEY}`
        );
        
        if (!weatherResponse.ok) {
            throw new Error('Weather data fetch failed');
        }
        
        const weatherData = await weatherResponse.json();
        
        // Update UI with weather data
        updateWeatherUI(weatherData);
        
        // Fetch AQI data for the location
        await loadAQIData(weatherData.coord.lat, weatherData.coord.lon);
        
        // Generate weather-based advisory
        generateWeatherAdvisory(weatherData, farmerProfile);
        
    } catch (error) {
        console.log('Using mock weather data due to error');
        const farmerProfile = window.getFarmerProfile ? window.getFarmerProfile() : null;
        let city = DEFAULT_CITY;
        if (farmerProfile && farmerProfile.district) {
            city = `${farmerProfile.district}, India`;
        }
        loadMockWeatherData(city);
    }
}

// Update weather UI
function updateWeatherUI(data) {
    // Update main weather card
    const mainTemp = document.getElementById('mainTemp');
    const weatherDesc = document.getElementById('weatherDesc');
    const locationName = document.getElementById('locationName');
    
    if (mainTemp) {
        mainTemp.textContent = `${Math.round(data.main.temp)}°C`;
    }
    
    if (weatherDesc) {
        weatherDesc.textContent = capitalizeFirstLetter(data.weather[0].description);
    }
    
    if (locationName) {
        locationName.textContent = `${data.name}, India`;
    }
    
    // Update weather details
    const humidity = document.getElementById('humidity');
    const windSpeed = document.getElementById('windSpeed');
    const pressure = document.getElementById('pressure');
    
    if (humidity) {
        humidity.textContent = `${data.main.humidity}%`;
    }
    
    if (windSpeed) {
        windSpeed.textContent = `${Math.round(data.wind.speed * 3.6)} km/h`;
    }
    
    if (pressure) {
        pressure.textContent = `${data.main.pressure} hPa`;
    }
    
    // Update weather icon
    updateWeatherIcon(data.weather[0].main);
}

// Update weather icon
function updateWeatherIcon(weatherMain) {
    const weatherIcon = document.querySelector('.weather-icon i');
    if (!weatherIcon) return;
    
    const iconMap = {
        'Clear': 'fa-sun',
        'Clouds': 'fa-cloud',
        'Rain': 'fa-cloud-rain',
        'Drizzle': 'fa-cloud-rain',
        'Thunderstorm': 'fa-bolt',
        'Snow': 'fa-snowflake',
        'Mist': 'fa-smog',
        'Fog': 'fa-smog',
        'Haze': 'fa-smog'
    };
    
    const iconClass = iconMap[weatherMain] || 'fa-cloud';
    weatherIcon.className = `fas ${iconClass}`;
}

// Load AQI data
async function loadAQIData(lat, lon) {
    try {
        const AQI_API_TOKEN = 'YOUR_AQI_API_TOKEN';
        
        if (AQI_API_TOKEN === 'YOUR_AQI_API_TOKEN') {
            loadMockAQIData();
            return;
        }
        
        const response = await fetch(
            `${AQI_API_BASE}/feed/geo:${lat};${lon}/?token=${AQI_API_TOKEN}`
        );
        
        if (!response.ok) {
            throw new Error('AQI data fetch failed');
        }
        
        const aqiData = await response.json();
        updateAQIUI(aqiData);
        
    } catch (error) {
        loadMockAQIData();
    }
}

// Update AQI UI
function updateAQIUI(data) {
    const aqiValue = document.getElementById('aqiValue');
    const aqiLevel = document.getElementById('aqiLevel');
    const pm25 = document.getElementById('pm25');
    const pm10 = document.getElementById('pm10');
    const o3 = document.getElementById('o3');
    
    if (aqiValue && data.data) {
        const aqi = data.data.aqi;
        aqiValue.textContent = aqi;
        
        if (aqiLevel) {
            aqiLevel.textContent = getAQIStatus(aqi);
            aqiLevel.className = `aqi-level ${getAQIClass(aqi)}`;
        }
        
        // Update pollutant values if available
        if (data.data.iaqi) {
            if (pm25 && data.data.iaqi.pm25) {
                pm25.textContent = `${data.data.iaqi.pm25.v} µg/m³`;
            }
            if (pm10 && data.data.iaqi.pm10) {
                pm10.textContent = `${data.data.iaqi.pm10.v} µg/m³`;
            }
            if (o3 && data.data.iaqi.o3) {
                o3.textContent = `${data.data.iaqi.o3.v} ppb`;
            }
        }
    }
}

// Get AQI status
function getAQIStatus(aqi) {
    if (aqi <= 50) return 'Good';
    if (aqi <= 100) return 'Moderate';
    if (aqi <= 150) return 'Unhealthy for Sensitive';
    if (aqi <= 200) return 'Unhealthy';
    if (aqi <= 300) return 'Very Unhealthy';
    return 'Hazardous';
}

// Get AQI class for styling
function getAQIClass(aqi) {
    if (aqi <= 50) return 'good';
    if (aqi <= 100) return 'moderate';
    return 'poor';
}

// Generate weather-based farming advisory
function generateWeatherAdvisory(weatherData, farmerProfile) {
    const temp = weatherData.main.temp;
    const humidity = weatherData.main.humidity;
    const weatherCondition = weatherData.weather[0].main.toLowerCase();
    
    let advisories = [];
    
    // Temperature-based advisories
    if (temp > 35) {
        advisories.push({
            icon: 'fa-temperature-high',
            message: 'High temperature: Ensure adequate irrigation and consider shade nets',
            hindiMessage: 'उच्च तापमान: पर्याप्त सिंचाई सुनिश्चित करें और छाया जाल पर विचार करें'
        });
    } else if (temp < 10) {
        advisories.push({
            icon: 'fa-temperature-low',
            message: 'Low temperature: Protect sensitive crops from frost damage',
            hindiMessage: 'कम तापमान: संवेदनशील फसलों को पाला से बचाएं'
        });
    }
    
    // Humidity-based advisories
    if (humidity > 80) {
        advisories.push({
            icon: 'fa-tint',
            message: 'High humidity: Risk of fungal diseases, ensure proper ventilation',
            hindiMessage: 'उच्च नमी: फंगल रोगों का जोखिम, उचित हवादारी सुनिश्चित करें'
        });
    } else if (humidity < 30) {
        advisories.push({
            icon: 'fa-tint',
            message: 'Low humidity: Increase irrigation frequency to prevent water stress',
            hindiMessage: 'कम नमी: पानी के तनाव को रोकने के लिए सिंचाई की आवृत्ति बढ़ाएं'
        });
    }
    
    // Weather condition-based advisories
    if (weatherCondition.includes('rain')) {
        advisories.push({
            icon: 'fa-cloud-rain',
            message: 'Rain expected: Reduce irrigation, good time for planting if soil suitable',
            hindiMessage: 'बारिश की उम्मीद: सिंचाई कम करें, मिट्टी उपयुक्त हो तो बुवाई का अच्छा समय'
        });
    } else if (weatherCondition.includes('clear')) {
        advisories.push({
            icon: 'fa-sun',
            message: 'Clear weather: Good conditions for field activities and pesticide application',
            hindiMessage: 'स्पष्ट मौसम: क्षेत्र गतिविधियों और कीटनाशक अनुप्रयोग के लिए अच्छी स्थितियां'
        });
    }
    
    // Add profile-specific advisories
    if (farmerProfile && farmerProfile.currentCrop) {
        if (farmerProfile.currentCrop.toLowerCase().includes('rice') && temp < 20) {
            advisories.push({
                icon: 'fa-exclamation-triangle',
                message: 'Low temperature for rice: Monitor crops closely, consider protection measures',
                hindiMessage: 'चावल के लिए कम तापमान: फसलों की निकट से निगरानी करें, सुरक्षा उपायों पर विचार करें'
            });
        }
    }
    
    // Update advisory UI
    updateAdvisoryUI(advisories);
}

// Update advisory UI
function updateAdvisoryUI(advisories) {
    const advisoryContent = document.getElementById('weatherAdvisory');
    if (!advisoryContent) return;
    
    if (advisories.length === 0) {
        advisories.push({
            icon: 'fa-check-circle',
            message: 'Weather conditions are favorable for most farming activities',
            hindiMessage: 'मौसम की स्थितियां अधिकांश कृषि गतिविधियों के लिए अनुकूल हैं'
        });
    }
    
    advisoryContent.innerHTML = advisories.map(adv => `
        <div class="advisory-item">
            <i class="fas ${adv.icon}"></i>
            <span>${adv.message}<br><small class="english-text">${adv.hindiMessage}</small></span>
        </div>
    `).join('');
}

// Mock weather data (consistent - doesn't change daily)
function loadMockWeatherData(city = 'Delhi') {
    // Use consistent mock data - don't randomize
    const mockWeatherData = {
        main: {
            temp: 28,
            humidity: 65,
            pressure: 1013,
            feels_like: 30
        },
        weather: [{
            description: 'partly cloudy',
            main: 'Clouds'
        }],
        wind: {
            speed: 3.33
        },
        visibility: 10000,
        coord: {
            lat: 28.6139,
            lon: 77.2090
        },
        name: city
    };
    
    updateWeatherUI(mockWeatherData);
    loadMockAQIData();
    
    // Generate consistent advisory (not random)
    const farmerProfile = window.getFarmerProfile ? window.getFarmerProfile() : null;
    generateWeatherAdvisory(mockWeatherData, farmerProfile);
}

// Mock AQI data
function loadMockAQIData() {
    const mockAQIData = {
        data: {
            aqi: 85,
            iaqi: {
                pm25: { v: 35 },
                pm10: { v: 45 },
                o3: { v: 20 }
            }
        }
    };
    
    updateAQIUI(mockAQIData);
}

// Utility function
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Export functions
window.loadWeatherData = loadWeatherData;