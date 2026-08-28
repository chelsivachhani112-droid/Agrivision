# Setup Guide - Smart Farming AI

## 🚀 Quick Start

The Smart Farming AI website works immediately with **demo data** so you can test all features without any configuration. 

## 📋 Current Status

- ✅ **Website is fully functional** with mock/demonstration data
- ✅ **All features work** including voice assistant, disease detection, AI monitoring
- ✅ **No API keys required** for initial testing and demonstration

## 🔧 Optional: Configure Real API Keys

To get real-time weather, AQI, and live data, you can optionally configure API keys:

### 1. Weather API (OpenWeatherMap)

1. Visit [OpenWeatherMap.org](https://openweathermap.org/api)
2. Sign up for a free account
3. Get your API key from the dashboard
4. Edit `api/config.js` and replace:
   ```javascript
   apiKey: 'YOUR_OPENWEATHER_API_KEY'
   ```
   with your actual key:
   ```javascript
   apiKey: 'your_actual_api_key_here'
   ```

### 2. AQI API (WAQI)

1. Visit [WAQI.info](https://aqicn.org/api/)
2. Sign up for a free API token
3. Edit `api/config.js` and replace:
   ```javascript
   apiKey: 'YOUR_AQI_API_TOKEN'
   ```
   with your actual token:
   ```javascript
   apiKey: 'your_actual_token_here'
   ```

### 3. Custom ML Model (Optional)

For production-grade disease detection, you can deploy your own ML model:

1. Train a model using PlantVillage dataset
2. Deploy it as a web service
3. Edit `api/config.js` and replace:
   ```javascript
   modelEndpoint: 'YOUR_ML_MODEL_ENDPOINT'
   ```
   with your model's URL:
   ```javascript
   modelEndpoint: 'https://your-model-url.com/predict'
   ```

## 🎯 Features That Work Without API Keys

- ✅ **Voice Assistant** - Full multi-language support
- ✅ **AI Chat** - Intelligent farming advice
- ✅ **Disease Detection** - Simulated AI analysis
- ✅ **Crop Monitoring** - Soil health, water management, pest control
- ✅ **Dashboard** - All statistics and recommendations
- ✅ **Responsive Design** - Mobile and desktop friendly

## 📱 Testing the Website

1. **Open the website** in your browser
2. **Try the voice assistant** - Click the microphone button
3. **Upload crop images** - Test disease detection
4. **Chat with AI** - Ask farming questions
5. **Explore the dashboard** - Check all monitoring features

## 🌍 Supported Languages for Voice Assistant

- English, Hindi (हिंदी), Bengali (বাংলা), Telugu (తెలుగు), Tamil (தமிழ்)
- Marathi (मराठी), Gujarati (ગુજરાતી), Kannada (ಕನ್ನड), Malayalam (മലയാളം), Punjabi (ਪੰਜਾਬੀ)

## 💡 Tips for Best Experience

1. **Allow microphone access** when prompted for voice features
2. **Use a modern browser** (Chrome, Firefox, Safari, Edge)
3. **Test on different devices** - website is fully responsive
4. **Try different languages** - voice assistant supports 10 Indian languages

## 🐛 Troubleshooting

### Console Errors
- If you see console errors about missing API keys, this is normal when using demo data
- The app automatically falls back to mock data when API keys aren't configured

### Voice Assistant Not Working
- Ensure microphone permissions are allowed
- Check if your browser supports Web Speech API
- Try using a different browser if needed

### Images Not Uploading
- Ensure you're uploading image files (JPG, PNG)
- Check file size is under 5MB
- Try a different image format

## 📞 Need Help?

The website includes built-in help:
- Use the AI chat assistant to ask questions
- Check the README.md for detailed documentation
- Review inline code comments for technical details

---

**Note:** The website is designed to work perfectly for demonstration and testing purposes without any API configuration. Real-time data integration is optional for production use.