// Enhanced API Configuration for KisanMitra
// Including Google APIs and modern integrations

const API_CONFIG = {
    // Weather API Configuration
    weather: {
        baseUrl: 'https://api.openweathermap.org/data/2.5',
        apiKey: 'YOUR_OPENWEATHER_API_KEY', // Replace with your actual API key
        endpoints: {
            current: '/weather',
            forecast: '/forecast',
            geocoding: '/geo/1.0'
        },
        defaultCity: 'Delhi',
        units: 'metric'
    },
    
    // Google APIs Configuration
    google: {
        // Google Translate API
        translate: {
            apiKey: 'YOUR_GOOGLE_TRANSLATE_API_KEY',
            baseUrl: 'https://translation.googleapis.com/language/translate/v2'
        },
        
        // Google Maps Geocoding API
        maps: {
            apiKey: 'YOUR_GOOGLE_MAPS_API_KEY',
            baseUrl: 'https://maps.googleapis.com/maps/api'
        },
        
        // Google Cloud Vision API (for enhanced disease detection)
        vision: {
            apiKey: 'YOUR_GOOGLE_VISION_API_KEY',
            baseUrl: 'https://vision.googleapis.com/v1/images:annotate'
        },
        
        // Google Natural Language API (for better chat understanding)
        language: {
            apiKey: 'YOUR_GOOGLE_LANGUAGE_API_KEY',
            baseUrl: 'https://language.googleapis.com/v1/documents'
        }
    },
    
    // AQI API Configuration
    aqi: {
        baseUrl: 'https://api.waqi.info',
        apiKey: 'YOUR_AQI_API_TOKEN',
        endpoints: {
            feed: '/feed',
            search: '/search'
        }
    },
    
    // PlantVillage Dataset API Configuration
    plantVillage: {
        modelEndpoint: 'YOUR_ML_MODEL_ENDPOINT',
        diseases: {
            tomato: ['bacterial_spot', 'early_blight', 'late_blight', 'leaf_mold', 'septoria_leaf_spot'],
            potato: ['early_blight', 'late_blight'],
            corn: ['common_rust', 'northern_leaf_blight', 'gray_leaf_spot'],
            wheat: ['rust', 'smut', 'blast'],
            rice: ['blast', 'bacterial_leaf_blight', 'sheath_blight']
        }
    },
    
    // Kaggle Dataset Integration
    kaggle: {
        datasets: {
            cropYield: 'Crop Yield Prediction Dataset',
            soilClassification: 'Soil Classification Dataset',
            pestData: 'Agricultural Pest Dataset',
            weatherData: 'Historical Weather Data for Agriculture'
        },
        localDataPath: '/data/kaggle_datasets/'
    },
    
    // Voice and Language APIs
    voice: {
        speechRecognition: {
            enabled: true,
            continuous: true,
            interimResults: true
        },
        speechSynthesis: {
            enabled: true,
            lang: 'hi-IN'
        },
        supportedLanguages: {
            'hi': 'हिंदी (Hindi)',
            'en': 'English',
            'bn': 'বাংলা (Bengali)',
            'te': 'తెలుగు (Telugu)',
            'ta': 'தமிழ் (Tamil)',
            'mr': 'मराठी (Marathi)',
            'gu': 'ગુજરાતી (Gujarati)',
            'kn': 'ಕನ್ನಡ (Kannada)',
            'ml': 'മലയാളം (Malayalam)',
            'pa': 'ਪੰਜਾਬੀ (Punjabi)'
        }
    },
    
    // AI/ML Model Configuration
    ai: {
        cropDiseaseModel: {
            endpoint: 'YOUR_CROP_DISEASE_MODEL_ENDPOINT',
            confidenceThreshold: 0.7
        },
        recommendationEngine: {
            endpoint: 'YOUR_RECOMMENDATION_ENGINE_ENDPOINT',
            refreshInterval: 300000
        },
        chatAssistant: {
            endpoint: 'YOUR_CHAT_ASSISTANT_ENDPOINT',
            model: 'agricultural-assistant-v1'
        }
    },
    
    // Monitoring and Alerts
    monitoring: {
        refreshInterval: 60000,
        alertThresholds: {
            soilMoisture: { critical: 20, warning: 30 },
            waterLevel: { critical: 30, warning: 50 },
            pestRisk: { critical: 'high', warning: 'moderate' },
            cropHealth: { critical: 50, warning: 70 }
        }
    },
    
    // Location Services
    location: {
        enableGeolocation: true,
        defaultLocation: {
            lat: 28.6139,
            lon: 77.2090,
            city: 'Delhi',
            country: 'India'
        }
    }
};

// API Helper Functions with Google Integration
class APIHelper {
    static async fetchWithTimeout(url, options = {}, timeout = 10000) {
        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), timeout);
        
        try {
            const response = await fetch(url, {
                ...options,
                signal: controller.signal
            });
            clearTimeout(id);
            return response;
        } catch (error) {
            clearTimeout(id);
            throw error;
        }
    }
    
    static async handleAPIError(error) {
        console.error('API Error:', error);
        
        if (error.name === 'AbortError') {
            throw new Error('Request timeout. Please try again.');
        }
        
        if (error.response) {
            throw new Error(`API Error: ${error.response.status} - ${error.response.statusText}`);
        }
        
        throw error;
    }
    
    static getWeatherUrl(city) {
        const { baseUrl, apiKey, endpoints, units } = API_CONFIG.weather;
        return `${baseUrl}${endpoints.current}?q=${city}&units=${units}&appid=${apiKey}`;
    }
    
    static getAQIUrl(lat, lon) {
        const { baseUrl, apiKey, endpoints } = API_CONFIG.aqi;
        return `${baseUrl}${endpoints.feed}/geo:${lat};${lon}/?token=${apiKey}`;
    }
    
    // Google Translate API
    static async translateText(text, targetLang = 'hi') {
        const { apiKey, baseUrl } = API_CONFIG.google.translate;
        
        if (apiKey === 'YOUR_GOOGLE_TRANSLATE_API_KEY') {
            console.log('Google Translate API not configured, using local translation');
            return text; // Return original text if API not configured
        }
        
        try {
            const response = await fetch(`${baseUrl}?key=${apiKey}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    q: text,
                    target: targetLang,
                    format: 'text'
                })
            });
            
            const data = await response.json();
            return data.data.translations[0].translatedText;
        } catch (error) {
            console.error('Translation error:', error);
            return text; // Return original text on error
        }
    }
    
    // Google Maps Geocoding
    static async getLocationCoordinates(location) {
        const { apiKey, baseUrl } = API_CONFIG.google.maps;
        
        if (apiKey === 'YOUR_GOOGLE_MAPS_API_KEY') {
            return API_CONFIG.location.defaultLocation;
        }
        
        try {
            const response = await fetch(`${baseUrl}/geocode/json?address=${encodeURIComponent(location)}&key=${apiKey}`);
            const data = await response.json();
            
            if (data.results && data.results.length > 0) {
                const { lat, lng } = data.results[0].geometry.location;
                return { lat, lon: lng, city: location };
            }
            
            return API_CONFIG.location.defaultLocation;
        } catch (error) {
            console.error('Geocoding error:', error);
            return API_CONFIG.location.defaultLocation;
        }
    }
    
    static getDefaultLocation() {
        return API_CONFIG.location.defaultLocation;
    }
}

// Configuration validation
function validateConfig() {
    const warnings = [];
    
    if (API_CONFIG.weather.apiKey === 'YOUR_OPENWEATHER_API_KEY') {
        warnings.push('Weather API key not configured. Using mock data.');
    }
    
    if (API_CONFIG.aqi.apiKey === 'YOUR_AQI_API_TOKEN') {
        warnings.push('AQI API token not configured. Using mock data.');
    }
    
    if (API_CONFIG.google.translate.apiKey === 'YOUR_GOOGLE_TRANSLATE_API_KEY') {
        warnings.push('Google Translate API not configured. Using local translations.');
    }
    
    if (API_CONFIG.plantVillage.modelEndpoint === 'YOUR_ML_MODEL_ENDPOINT') {
        warnings.push('ML model endpoint not configured. Using simulated disease detection.');
    }
    
    if (warnings.length > 0) {
        console.warn('API Configuration Warnings:', warnings);
    }
    
    return warnings;
}

// Initialize configuration
document.addEventListener('DOMContentLoaded', function() {
    validateConfig();
});

// Export for use in other modules
window.API_CONFIG = API_CONFIG;
window.APIHelper = APIHelper;