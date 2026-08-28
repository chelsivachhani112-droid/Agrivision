// Advanced AI Monitoring System with Structured Response Format
// Location-aware advisory and multi-language support

class AIMonitoringSystem {
    constructor() {
        this.responses = this.loadStructuredResponses();
        this.cropDatabase = this.loadCropDatabase();
    }

    // Load structured responses based on the AgryNova system
    loadStructuredResponses() {
        return {
            'hi': {
                'crop': {
                    answer: 'आपके क्षेत्र के लिए गेहूं, चावल, और मक्का उपयुक्त हैं।',
                    englishAnswer: 'Wheat, rice, and corn are suitable for your region.',
                    why: 'आपके क्षेत्र की मिट्टी और मौसम इन फसलों के लिए अनुकूल है।',
                    englishWhy: 'Your region\'s soil and climate are suitable for these crops.',
                    whatToDo: [
                        'गेहूं के लिए: अक्टूबर-नवंबर में बुवाई करें',
                        'चावल के लिए: जून-जुलाई में बुवाई करें',
                        'मक्का के लिए: जुलाई-अगस्त में बुवाई करें'
                    ],
                    englishWhatToDo: [
                        'For wheat: Sow in October-November',
                        'For rice: Sow in June-July',
                        'For corn: Sow in July-August'
                    ],
                    when: 'वर्तमान मौसम के अनुसार बुवाई समय।',
                    englishWhen: 'Sowing time according to current season.',
                    caution: 'मिट्टी परीक्षण कराएं और स्थानीय कृषि विभाग से सलाह लें।',
                    englishCaution: 'Get soil testing done and consult local agriculture department.'
                },
                'disease': {
                    answer: 'फसल रोग के लिए: एकीकृत कीट प्रबंधन अपनाएं।',
                    englishAnswer: 'For crop diseases: Adopt integrated pest management.',
                    why: 'रासायनिक उपचार से पहले जैविक नियंत्रण प्रभावी होता है।',
                    englishWhy: 'Biological control is effective before chemical treatment.',
                    whatToDo: [
                        'प्रतिरोधी किस्में लगाएं',
                        'फसल रोटेशन का पालन करें',
                        'समय पर कवकनाशक छिड़काव करें',
                        'जैविक नियंत्रण का उपयोग करें'
                    ],
                    englishWhatToDo: [
                        'Plant resistant varieties',
                        'Follow crop rotation',
                        'Timely fungicide spray',
                        'Use biological control'
                    ],
                    when: 'रोग के पहले लक्षणों पर।',
                    englishWhen: 'At first symptoms of disease.',
                    caution: 'गंभीर मामलों में कृषि विशेषज्ञ से सलाह लें।',
                    englishCaution: 'Consult agricultural expert for severe cases.'
                },
                'irrigation': {
                    answer: 'सिंचाई के लिए: ड्रिप सिंचाई सबसे कुशल है।',
                    englishAnswer: 'For irrigation: Drip irrigation is most efficient.',
                    why: 'ड्रिप सिंचाई पानी बचाती है और फसल को बेहतर पानी देती है।',
                    englishWhy: 'Drip irrigation saves water and gives crops better water supply.',
                    whatToDo: [
                        'सुबह या शाम को सिंचाई करें',
                        'मिट्टी की नमी की निगरानी करें',
                        'फसल की जरूरत के अनुसार सिंचाई करें',
                        'वर्षा के पूर्वानुमान को ध्यान में रखें'
                    ],
                    englishWhatToDo: [
                        'Irrigate in morning or evening',
                        'Monitor soil moisture',
                        'Irrigate according to crop needs',
                        'Consider rainfall forecast'
                    ],
                    when: 'मिट्टी की नमी 30% से कम होने पर।',
                    englishWhen: 'When soil moisture drops below 30%.',
                    caution: 'अधिक सिंचाई से जड़ सड़ सकती है।',
                    englishCaution: 'Excess irrigation can cause root rot.'
                },
                'fertilizer': {
                    answer: 'उर्वरक के लिए: मिट्टी परीक्षण कराएं।',
                    englishAnswer: 'For fertilizer: Get soil testing done.',
                    why: 'मिट्टी परीक्षण से सही उर्वरक की मात्रा पता चलती है।',
                    englishWhy: 'Soil testing reveals the right fertilizer amount.',
                    whatToDo: [
                        'मिट्टी परीक्षण कराएं',
                        'NPK अनुपात का पालन करें',
                        'जैविक उर्वरक का उपयोग करें',
                        'सही समय पर उर्वरक लगाएं'
                    ],
                    englishWhatToDo: [
                        'Get soil testing done',
                        'Follow NPK ratio',
                        'Use organic fertilizers',
                        'Apply fertilizer at right time'
                    ],
                    when: 'बुवाई से पहले और फसल के विकास के दौरान।',
                    englishWhen: 'Before sowing and during crop growth.',
                    caution: 'अधिक उर्वरक से पर्यावरण हो सकता है।',
                    englishCaution: 'Excess fertilizer can cause pollution.'
                },
                'weather': {
                    answer: 'वर्तमान मौसम अधिकांश फसलों के लिए अनुकूल है।',
                    englishAnswer: 'Current weather is favorable for most crops.',
                    why: 'तापमान और नमी सामान्य सीमा में हैं।',
                    englishWhy: 'Temperature and humidity are in normal range.',
                    whatToDo: [
                        'फसल की निगरानी जारी रखें',
                        'मौसम में बदलाव के लिए तैयार रहें',
                        'आवश्यकता के अनुसार सिंचाई समायोजित करें'
                    ],
                    englishWhatToDo: [
                        'Continue crop monitoring',
                        'Be prepared for weather changes',
                        'Adjust irrigation as needed'
                    ],
                    when: 'नियमित रूप से।',
                    englishWhen: 'Regularly.',
                    caution: 'अचान मौसम बदलाव के लिए तैयार रहें।',
                    englishCaution: 'Be prepared for sudden weather changes.'
                }
            },
            'en': {
                'crop': {
                    answer: 'Wheat, rice, and corn are suitable for your region.',
                    englishAnswer: 'Wheat, rice, and corn are suitable for your region.',
                    why: 'Your region\'s soil and climate are suitable for these crops.',
                    englishWhy: 'Your region\'s soil and climate are suitable for these crops.',
                    whatToDo: [
                        'For wheat: Sow in October-November',
                        'For rice: Sow in June-July',
                        'For corn: Sow in July-August'
                    ],
                    englishWhatToDo: [
                        'For wheat: Sow in October-November',
                        'For rice: Sow in June-July',
                        'For corn: Sow in July-August'
                    ],
                    when: 'Sowing time according to current season.',
                    englishWhen: 'Sowing time according to current season.',
                    caution: 'Get soil testing done and consult local agriculture department.',
                    englishCaution: 'Get soil testing done and consult local agriculture department.'
                },
                'disease': {
                    answer: 'For crop diseases: Adopt integrated pest management.',
                    englishAnswer: 'For crop diseases: Adopt integrated pest management.',
                    why: 'Biological control is effective before chemical treatment.',
                    englishWhy: 'Biological control is effective before chemical treatment.',
                    whatToDo: [
                        'Plant resistant varieties',
                        'Follow crop rotation',
                        'Timely fungicide spray',
                        'Use biological control'
                    ],
                    englishWhatToDo: [
                        'Plant resistant varieties',
                        'Follow crop rotation',
                        'Timely fungicide spray',
                        'Use biological control'
                    ],
                    when: 'At first symptoms of disease.',
                    englishWhen: 'At first symptoms of disease.',
                    caution: 'Consult agricultural expert for severe cases.',
                    englishCaution: 'Consult agricultural expert for severe cases.'
                },
                'irrigation': {
                    answer: 'For irrigation: Drip irrigation is most efficient.',
                    englishAnswer: 'For irrigation: Drip irrigation is most efficient.',
                    why: 'Drip irrigation saves water and gives crops better water supply.',
                    englishWhy: 'Drip irrigation saves water and gives crops better water supply.',
                    whatToDo: [
                        'Irrigate in morning or evening',
                        'Monitor soil moisture',
                        'Irrigate according to crop needs',
                        'Consider rainfall forecast'
                    ],
                    englishWhatToDo: [
                        'Irrigate in morning or evening',
                        'Monitor soil moisture',
                        'Irrigate according to crop needs',
                        'Consider rainfall forecast'
                    ],
                    when: 'When soil moisture drops below 30%.',
                    englishWhen: 'When soil moisture drops below 30%.',
                    caution: 'Excess irrigation can cause root rot.',
                    englishCaution: 'Excess irrigation can cause root rot.'
                },
                'fertilizer': {
                    answer: 'For fertilizer: Get soil testing done.',
                    englishAnswer: 'For fertilizer: Get soil testing done.',
                    why: 'Soil testing reveals the right fertilizer amount.',
                    englishWhy: 'Soil testing reveals the right fertilizer amount.',
                    whatToDo: [
                        'Get soil testing done',
                        'Follow NPK ratio',
                        'Use organic fertilizers',
                        'Apply fertilizer at right time'
                    ],
                    englishWhatToDo: [
                        'Get soil testing done',
                        'Follow NPK ratio',
                        'Use organic fertilizers',
                        'Apply fertilizer at right time'
                    ],
                    when: 'Before sowing and during crop growth.',
                    englishWhen: 'Before sowing and during crop growth.',
                    caution: 'Excess fertilizer can cause pollution.',
                    englishCaution: 'Excess fertilizer can cause pollution.'
                },
                'weather': {
                    answer: 'Current weather is favorable for most crops.',
                    englishAnswer: 'Current weather is favorable for most crops.',
                    why: 'Temperature and humidity are in normal range.',
                    englishWhy: 'Temperature and humidity are in normal range.',
                    whatToDo: [
                        'Continue crop monitoring',
                        'Be prepared for weather changes',
                        'Adjust irrigation as needed'
                    ],
                    englishWhatToDo: [
                        'Continue crop monitoring',
                        'Be prepared for weather changes',
                        'Adjust irrigation as needed'
                    ],
                    when: 'Regularly.',
                    englishWhen: 'Regularly.',
                    caution: 'Be prepared for sudden weather changes.',
                    englishCaution: 'Be prepared for sudden weather changes.'
                }
            }
        };
    }

    // Load crop database for recommendations
    loadCropDatabase() {
        return {
            'wheat': {
                name: 'गेहूं (Wheat)',
                seasons: ['rabi'],
                temperature: '15-25°C',
                rainfall: '450-650mm',
                soilTypes: ['alluvial', 'loam'],
                duration: '90-120 days'
            },
            'rice': {
                name: 'चावल (Rice)',
                seasons: ['kharif'],
                temperature: '25-35°C',
                rainfall: '1000-1500mm',
                soilTypes: ['clay', 'loam'],
                duration: '120-150 days'
            },
            'corn': {
                name: 'मक्का (Corn)',
                seasons: ['kharif', 'rabi'],
                temperature: '20-30°C',
                rainfall: '500-800mm',
                soilTypes: ['sandy', 'loam'],
                duration: '80-100 days'
            },
            'potato': {
                name: 'आलू (Potato)',
                seasons: ['rabi'],
                temperature: '15-20°C',
                rainfall: '500-700mm',
                soilTypes: ['sandy', 'loam'],
                duration: '90-120 days'
            }
        };
    }

    // Initialize crop monitoring
    initializeCropMonitoring() {
        // Can be expanded to show monitoring data in UI
    }

    // Process chat message with structured response
    processChatMessage(message, language = 'hi', farmerProfile = null) {
        const lowerMessage = message.toLowerCase();
        const responses = this.responses[language] || this.responses['hi'];
        
        // Add location context to response
        const locationContext = farmerProfile ? 
            `Considering your location in ${farmerProfile.district}, ${farmerProfile.state}` : 
            'Based on general conditions';

        // Check for specific keywords
        for (const [keyword, response] of Object.entries(responses)) {
            if (keyword !== 'default' && lowerMessage.includes(keyword)) {
                // Add location context to answer
                const enhancedResponse = {
                    ...response,
                    answer: `${response.answer} (${locationContext})`,
                    englishAnswer: `${response.englishAnswer} (${locationContext})`
                };
                return enhancedResponse;
            }
        }

        // Check for English keywords if Hindi not found
        if (language === 'hi') {
            const englishResponses = this.responses['en'];
            for (const [keyword, response] of Object.entries(englishResponses)) {
                if (keyword !== 'default' && lowerMessage.includes(keyword)) {
                    return {
                        ...response,
                        answer: `${response.answer} (${locationContext})`,
                        englishAnswer: `${response.englishAnswer} (${locationContext})`
                    };
                }
            }
        }

        // Default response
        return {
            answer: `मैं कृषि से संबंधित प्रश्नों के उत्तर दे सकता हूं: फसलें, मौसम, मिट्टी, सिंचाई, उर्वरक, कीट और रोग नियंत्रण। (${locationContext})`,
            englishAnswer: `I can answer questions related to: crops, weather, soil, irrigation, fertilizer, pest and disease control. (${locationContext})`,
            why: 'यह सभी कृषि गतिविधियां महत्वपूर्ण हैं।',
            englishWhy: 'All these agricultural activities are important.',
            whatToDo: [
                'अपना प्रश्न विशिष्ट रूप से पूछें',
                'अपना स्थान प्रोफाइल में सेट करें',
                'विस्तृत जानकारी के लिए स्थानीय कृषि विभाग से संपर्क करें'
            ],
            englishWhatToDo: [
                'Ask your question specifically',
                'Set your location in profile',
                'Contact local agriculture department for detailed information'
            ],
            when: 'किसी भी समय।',
            englishWhen: 'Anytime.',
            caution: 'विस्तृत जानकारी के लिए कृषि विशेषज्ञ से सलाह लें।',
            englishCaution: 'Consult agricultural expert for detailed information.'
        };
    }

    // Generate crop recommendations based on profile
    generateCropRecommendations(profile) {
        if (!profile || !profile.state) {
            return this.getDefaultRecommendations();
        }

        const recommendations = [];
        const currentSeason = this.getCurrentSeason();
        
        // Get suitable crops for the season
        for (const [cropKey, cropData] of Object.entries(this.cropDatabase)) {
            if (cropData.seasons.includes(currentSeason)) {
                // Check if soil type matches
                if (!profile.soilType || cropData.soilTypes.includes(profile.soilType) || cropData.soilTypes.includes('loam')) {
                    recommendations.push({
                        ...cropData,
                        reason: `Suitable for ${currentSeason} season in ${profile.state}`,
                        match: 'high'
                    });
                }
            }
        }

        return recommendations.length > 0 ? recommendations : this.getDefaultRecommendations();
    }

    // Get current season
    getCurrentSeason() {
        const month = new Date().getMonth();
        if (month >= 9 && month <= 11) return 'rabi'; // Oct-Dec
        if (month >= 6 && month <= 9) return 'kharif'; // Jul-Sep
        return 'summer'; // Mar-Jun
    }

    // Get default recommendations
    getDefaultRecommendations() {
        return [
            {
                ...this.cropDatabase['wheat'],
                reason: 'Suitable for current season in most regions',
                match: 'medium'
            },
            {
                ...this.cropDatabase['rice'],
                reason: 'Good water availability in most areas',
                match: 'medium'
            },
            {
                ...this.cropDatabase['corn'],
                reason: 'Versatile crop suitable for various conditions',
                match: 'medium'
            }
        ];
    }
}

// Initialize AI monitoring system
let aiMonitoringSystem;

document.addEventListener('DOMContentLoaded', function() {
    aiMonitoringSystem = new AIMonitoringSystem();
    
    // Initialize monitoring
    aiMonitoringSystem.initializeCropMonitoring();
    
    // Setup chat input
    const chatInput = document.getElementById('chatInput');
    const sendBtn = document.querySelector('.send-btn');
    
    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleSendMessage();
            }
        });
    }
    
    if (sendBtn) {
        sendBtn.addEventListener('click', handleSendMessage);
    }
});

// Handle send message with structured response
function handleSendMessage() {
    const chatInput = document.getElementById('chatInput');
    if (!chatInput) return;
    
    const message = chatInput.value.trim();
    if (!message) return;
    
    // Get farmer profile for location-aware responses
    const farmerProfile = window.getFarmerProfile ? window.getFarmerProfile() : null;
    
    // Detect language from message
    const detectedLang = window.languageDetector ? 
        window.languageDetector.detectLanguage(message) : 
        (farmerProfile ? farmerProfile.language : 'hi');
    
    // Add user message to chat
    addChatMessage(message, 'user');
    
    // Clear input
    chatInput.value = '';
    
    // Generate AI response with structured format
    try {
        const response = aiMonitoringSystem.processChatMessage(message, detectedLang, farmerProfile);
        
        // Add AI response to chat with structured format
        setTimeout(() => {
            addStructuredChatMessage(response, detectedLang);
        }, 500);
    } catch (error) {
        console.error('Error processing chat message:', error);
        addChatMessage('क्षमा करें, मैं आपके संदेश को संसाधित करने में त्रुटि का सामना कर रहा हूं। कृपया पुनः प्रयास करें।', 'ai');
    }
}

// Add chat message
function addChatMessage(message, sender) {
    const chatMessages = document.getElementById('chatMessages');
    if (!chatMessages) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    messageDiv.innerHTML = `
        <div class="message-avatar">
            <i class="fas ${sender === 'ai' ? 'fa-robot' : 'fa-user'}"></i>
        </div>
        <div class="message-content">
            <p>${message}</p>
        </div>
    `;
    
    chatMessages.appendChild(messageDiv);
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Add structured chat message (AgryNova format)
function addStructuredChatMessage(response, language) {
    const chatMessages = document.getElementById('chatMessages');
    if (!chatMessages) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ai-message`;
    
    const structuredHTML = `
        <div class="message-avatar">
            <i class="fas fa-robot"></i>
        </div>
        <div class="message-content structured-content">
            <div class="response-section">
                <h5><i class="fas fa-check-circle"></i> ANSWER | उत्तर</h5>
                <p>${response.answer}</p>
                <small class="english-text">${response.englishAnswer}</small>
            </div>
            
            <div class="response-section">
                <h5><i class="fas fa-question-circle"></i> WHY | क्यों</h5>
                <p>${response.why}</p>
                <small class="english-text">${response.englishWhy}</small>
            </div>
            
            <div class="response-section">
                <h5><i class="fas fa-tasks"></i> WHAT TO DO | क्या करें</h5>
                <ol>
                    ${response.whatToDo.map((item, index) => {
                        const englishItem = response.englishWhatToDo[index];
                        return `<li>${item}<br><small class="english-text">${englishItem}</small></li>`;
                    }).join('')}
                </ol>
            </div>
            
            <div class="response-section">
                <h5><i class="fas fa-clock"></i> WHEN | कब</h5>
                <p>${response.when}</p>
                <small class="english-text">${response.englishWhen}</small>
            </div>
            
            <div class="response-section caution">
                <h5><i class="fas fa-exclamation-triangle"></i> CAUTION | सावधानी</h5>
                <p>${response.caution}</p>
                <small class="english-text">${response.englishCaution}</small>
            </div>
        </div>
    `;
    
    messageDiv.innerHTML = structuredHTML;
    chatMessages.appendChild(messageDiv);
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Quick question handler
function askQuestion(question) {
    const chatInput = document.getElementById('chatInput');
    if (chatInput) {
        chatInput.value = question;
        handleSendMessage();
    }
}

// Update crop recommendations based on profile
function updateCropRecommendations(profile) {
    const recommendations = aiMonitoringSystem.generateCropRecommendations(profile);
    
    // Update UI with recommendations
    const cropRecommendations = document.getElementById('cropRecommendations');
    if (cropRecommendations) {
        cropRecommendations.innerHTML = recommendations.map(crop => `
            <div class="recommendation-card">
                <div class="crop-icon ${this.getCropIconClass(crop.name)}">
                    <i class="fas ${this.getCropIcon(crop.name)}"></i>
                </div>
                <div class="crop-details">
                    <h3>${crop.name}</h3>
                    <p class="crop-reason">${crop.reason}</p>
                    <div class="crop-stats">
                        <span><i class="fas fa-thermometer-half"></i> ${crop.temperature}</span>
                        <span><i class="fas fa-tint"></i> ${crop.rainfall}</span>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

// Helper functions for crop icons
function getCropIcon(cropName) {
    const icons = {
        'गेहूं': 'fa-bread-slice',
        'wheat': 'fa-bread-slice',
        'चावल': 'fa-bowl-rice',
        'rice': 'fa-bowl-rice',
        'मक्का': 'fa-corn',
        'corn': 'fa-corn',
        'आलू': 'fa-carrot',
        'potato': 'fa-carrot'
    };
    return icons[cropName] || 'fa-seedling';
}

function getCropIconClass(cropName) {
    const classes = {
        'गेहूं': 'wheat',
        'wheat': 'wheat',
        'चावल': 'rice',
        'rice': 'rice',
        'मक्का': 'corn',
        'corn': 'corn',
        'आलू': 'potato',
        'potato': 'potato'
    };
    return classes[cropName] || 'crops';
}

// Export functions
window.sendMessage = handleSendMessage;
window.addChatMessage = addChatMessage;
window.askQuestion = askQuestion;
window.updateCropRecommendations = updateCropRecommendations;
window.initializeCropMonitoring = () => {
    if (aiMonitoringSystem) {
        aiMonitoringSystem.initializeCropMonitoring();
    }
};