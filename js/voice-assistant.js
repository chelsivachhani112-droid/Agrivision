// Advanced Voice Assistant with Multi-language Support
// Flexible language detection and structured responses

class VoiceAssistant {
    constructor() {
        this.isListening = false;
        this.recognition = null;
        this.synthesis = window.speechSynthesis;
        this.currentLanguage = 'hi-IN';
        this.voiceAssistantData = this.loadVoiceAssistantData();
        
        this.initializeSpeechRecognition();
        this.initializeSpeechSynthesis();
    }

    // Initialize speech recognition
    initializeSpeechRecognition() {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            this.recognition = new SpeechRecognition();
            
            this.recognition.continuous = true;
            this.recognition.interimResults = true;
            this.recognition.lang = this.currentLanguage;
            
            this.recognition.onstart = () => {
                this.isListening = true;
                this.updateVoiceUI(true);
                showNotification('Voice assistant activated - Speak in any language', 'info');
            };
            
            this.recognition.onend = () => {
                this.isListening = false;
                this.updateVoiceUI(false);
            };
            
            this.recognition.onresult = (event) => {
                const transcript = this.processTranscript(event);
                this.updateTranscriptUI(transcript);
                
                if (event.results[0].isFinal) {
                    this.processVoiceCommand(transcript);
                }
            };
            
            this.recognition.onerror = (event) => {
                if (event.error !== 'not-allowed' && event.error !== 'no-speech') {
                    console.error('Speech recognition error:', event.error);
                }
                this.isListening = false;
                this.updateVoiceUI(false);
                
                if (event.error === 'not-allowed') {
                    showNotification('Microphone access denied. Please enable microphone permissions.', 'error');
                }
            };
        } else {
            console.warn('Speech recognition not supported in this browser');
            showNotification('Voice recognition not supported in this browser', 'warning');
        }
    }

    // Initialize speech synthesis
    initializeSpeechSynthesis() {
        if ('speechSynthesis' in window) {
            if (this.synthesis.onvoiceschanged !== undefined) {
                this.synthesis.onvoiceschanged = () => {
                    this.voices = this.synthesis.getVoices();
                };
            }
        }
    }

    // Process transcript
    processTranscript(event) {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
            transcript += event.results[i][0].transcript;
        }
        return transcript.trim();
    }

    // Start voice assistant
    startListening() {
        if (this.recognition && !this.isListening) {
            try {
                this.recognition.start();
            } catch (error) {
                console.error('Error starting speech recognition:', error);
            }
        }
    }

    // Stop voice assistant
    stopListening() {
        if (this.recognition && this.isListening) {
            this.recognition.stop();
        }
    }

    // Toggle voice assistant
    toggleListening() {
        if (this.isListening) {
            this.stopListening();
            showNotification('Voice assistant deactivated', 'info');
        } else {
            this.startListening();
        }
    }

    // Update voice UI
    updateVoiceUI(isActive) {
        const voiceBtns = document.querySelectorAll('.voice-btn, .voice-btn-small');
        
        voiceBtns.forEach(btn => {
            if (isActive) {
                btn.style.background = 'linear-gradient(135deg, #D32F2F, #C62828)';
                btn.style.animation = 'pulse 1.5s infinite';
            } else {
                btn.style.background = 'linear-gradient(135deg, #2E7D32, #43A047)';
                btn.style.animation = 'none';
            }
        });
    }

    // Update transcript UI
    updateTranscriptUI(transcript) {
        const chatInput = document.getElementById('chatInput');
        if (chatInput) {
            chatInput.value = transcript;
        }
    }

    // Process voice command with language detection
    async processVoiceCommand(transcript) {
        // Detect language from transcript
        const detectedLang = window.languageDetector ? 
            window.languageDetector.detectLanguage(transcript) : 
            'hi';
        
        // Update language for recognition
        this.updateLanguage(detectedLang);
        
        // Get farmer profile for location-aware responses
        const farmerProfile = window.getFarmerProfile ? window.getFarmerProfile() : null;
        
        // Generate response using AI monitoring system
        if (window.aiMonitoringSystem) {
            const response = window.aiMonitoringSystem.processChatMessage(transcript, detectedLang, farmerProfile);
            
            // Add to chat
            if (window.addStructuredChatMessage) {
                window.addStructuredChatMessage(response, detectedLang);
            }
            
            // Speak the answer
            this.speakResponse(response.answer, detectedLang);
        }
    }

    // Speak response
    speakResponse(text, langCode) {
        if (this.synthesis) {
            this.synthesis.cancel();
            
            const utterance = new SpeechSynthesisUtterance(text);
            
            // Map language code to speech synthesis language
            const langMap = {
                'hi': 'hi-IN',
                'en': 'en-IN',
                'bn': 'bn-IN',
                'te': 'te-IN',
                'ta': 'ta-IN',
                'mr': 'mr-IN',
                'gu': 'gu-IN',
                'kn': 'kn-IN',
                'ml': 'ml-IN',
                'pa': 'pa-IN'
            };
            
            utterance.lang = langMap[langCode] || 'hi-IN';
            utterance.rate = 0.9;
            utterance.pitch = 1;
            
            if (this.voices) {
                const voice = this.voices.find(v => v.lang === utterance.lang);
                if (voice) {
                    utterance.voice = voice;
                }
            }
            
            this.synthesis.speak(utterance);
        }
    }

    // Update language
    updateLanguage(langCode) {
        const languageMap = {
            'hi': 'hi-IN',
            'en': 'en-IN',
            'bn': 'bn-IN',
            'te': 'te-IN',
            'ta': 'ta-IN',
            'mr': 'mr-IN',
            'gu': 'gu-IN',
            'kn': 'kn-IN',
            'ml': 'ml-IN',
            'pa': 'pa-IN'
        };
        
        this.currentLanguage = languageMap[langCode] || 'hi-IN';
        
        if (this.recognition) {
            this.recognition.lang = this.currentLanguage;
        }
        
        this.voiceAssistantData = this.loadVoiceAssistantData(langCode);
    }

    // Load voice assistant data based on language
    loadVoiceAssistantData(langCode = 'hi') {
        const data = {
            'hi': {
                'मौसम': 'वर्तमान मौसम अधिकांश फसलों के लिए उपयुक्त है। तापमान मध्यम है और नमी का स्तर अच्छा है।',
                'फसल': 'आपके क्षेत्र के लिए गेहूं, चावल, और मक्का उपयुक्त हैं।',
                'रोग': 'मैं फसल रोगों की पहचान करने में मदद कर सकता हूं। कृपया रोग पहचान अनुभाग में प्रभावित पौधे की तस्वीर अपलोड करें।',
                'मिट्टी': 'मिट्टी का स्वास्थ्य खेती के लिए महत्वपूर्ण है। नियमित परीक्षण और उचित उर्वरक से इष्टतम मिट्टी स्थितियां बनी रहती हैं।',
                'पानी': 'पानी प्रबंधन फसल के प्रकार और विकास चरण पर निर्भर करता है। पानी दक्षता के लिए ड्रिप सिंचाई की सिफारिश करता हूं।',
                'कीट': 'कीट नियंत्रण के लिए, मैं एकीकृत कीट प्रबंधन की सिफारिश करता हूं।',
                'उर्वरक': 'उर्वरक आवश्यकताएं फसल और मिट्टी की स्थितियों के आधार पर भिन्न होती हैं।',
                'फसल कटाई': 'फसल कटाई का समय फसल की किस्म और बढ़ने की स्थितियों पर निर्भर करता है।',
                'कीमत': 'फसल की कीमतें बाजार की स्थितियों के आधार पर बदलती हैं।',
                'मदद': 'मैं मौसम की जानकारी, फसल प्रबंधन, रोग पहचान, मिट्टी का स्वास्थ्य और सामान्य खेती सलाह में मदद कर सकता हूं।'
            },
            'en': {
                'weather': 'Current weather is suitable for most crops. Temperature is moderate with good humidity levels.',
                'crop': 'For crop recommendations, consider soil type, season, and water availability.',
                'disease': 'I can help identify crop diseases. Upload an image in the disease detection section.',
                'soil': 'Soil health is crucial for farming. Regular testing and proper fertilization help maintain optimal conditions.',
                'water': 'Water management depends on crop type and growth stage. Drip irrigation is recommended for efficiency.',
                'pest': 'For pest control, integrated pest management combining biological, cultural, and chemical methods is recommended.',
                'fertilizer': 'Fertilizer requirements vary by crop and soil conditions. Soil testing is recommended for precise application.',
                'harvest': 'Harvest timing depends on crop variety and growing conditions. Monitor maturity indicators.',
                'price': 'Crop prices fluctuate based on market conditions. Check local mandi prices for current rates.',
                'help': 'I can help with weather information, crop management, disease detection, soil health, and general farming advice.'
            }
        };
        
        return data[langCode] || data['hi'];
    }
}

// Initialize voice assistant
let voiceAssistant;

document.addEventListener('DOMContentLoaded', function() {
    voiceAssistant = new VoiceAssistant();
    
    // Setup voice buttons
    const voiceBtns = document.querySelectorAll('.voice-btn');
    voiceBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            voiceAssistant.toggleListening();
        });
    });
    
    const voiceBtnSmall = document.querySelector('.voice-btn-small');
    if (voiceBtnSmall) {
        voiceBtnSmall.addEventListener('click', toggleVoiceInput);
    }
});

// Global functions
function startVoiceAssistant() {
    if (voiceAssistant) {
        voiceAssistant.startListening();
        scrollToSection('assistant');
    }
}

function toggleVoiceInput() {
    if (voiceAssistant) {
        voiceAssistant.toggleListening();
    }
}

function updateVoiceAssistantLanguage(langCode) {
    if (voiceAssistant) {
        voiceAssistant.updateLanguage(langCode);
    }
}

// Export for global access
window.startVoiceAssistant = startVoiceAssistant;
window.toggleVoiceInput = toggleVoiceInput;
window.updateVoiceAssistantLanguage = updateVoiceAssistantLanguage;