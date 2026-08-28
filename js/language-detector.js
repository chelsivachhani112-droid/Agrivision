// Language Detector for Flexible Language Input
// Automatically detects and processes text in multiple languages

class LanguageDetector {
    constructor() {
        this.languagePatterns = {
            'hi': /[\u0900-\u097F]/, // Hindi Devanagari
            'bn': /[\u0980-\u09FF]/, // Bengali
            'te': /[\u0C00-\u0C7F]/, // Telugu
            'ta': /[\u0B80-\u0BFF]/, // Tamil
            'mr': /[\u0900-\u097F]/, // Marathi (uses Devanagari)
            'gu': /[\u0A80-\u0AFF]/, // Gujarati
            'kn': /[\u0C80-\u0CFF]/, // Kannada
            'ml': /[\u0D00-\u0D7F]/, // Malayalam
            'pa': /[\u0A00-\u0A7F]/, // Punjabi Gurmukhi
            'en': /[a-zA-Z]/ // English
        };

        this.languageNames = {
            'hi': 'हिंदी (Hindi)',
            'bn': 'বাংলা (Bengali)',
            'te': 'తెలుగు (Telugu)',
            'ta': 'தமிழ் (Tamil)',
            'mr': 'मराठी (Marathi)',
            'gu': 'ગુજરાતી (Gujarati)',
            'kn': 'ಕನ್ನಡ (Kannada)',
            'ml': 'മലയാളം (Malayalam)',
            'pa': 'ਪੰਜਾਬੀ (Punjabi)',
            'en': 'English'
        };
    }

    // Detect language from text
    detectLanguage(text) {
        let detectedLang = 'en'; // Default to English
        let maxMatches = 0;

        for (const [lang, pattern] of Object.entries(this.languagePatterns)) {
            const matches = (text.match(pattern) || []).length;
            if (matches > maxMatches) {
                maxMatches = matches;
                detectedLang = lang;
            }
        }

        return detectedLang;
    }

    // Get language name
    getLanguageName(langCode) {
        return this.languageNames[langCode] || langCode;
    }

    // Check if text contains multiple languages
    isMixedLanguage(text) {
        const detectedLanguages = new Set();
        
        for (const [lang, pattern] of Object.entries(this.languagePatterns)) {
            if (pattern.test(text)) {
                detectedLanguages.add(lang);
            }
        }

        return detectedLanguages.size > 1;
    }

    // Clean and normalize text
    normalizeText(text) {
        // Remove extra spaces
        text = text.trim().replace(/\s+/g, ' ');
        
        // Remove special characters except common punctuation
        text = text.replace(/[^\w\s\u0900-\u097F\u0980-\u09FF\u0C00-\u0C7F\u0B80-\u0BFF\u0A80-\u0AFF\u0C80-\u0CFF\u0D00-\u0D7F\u0A00-\u0A7F.,!?;:']/g, '');
        
        return text;
    }

    // Detect if text is English (for fallback)
    isEnglish(text) {
        const englishPattern = /^[a-zA-Z\s.,!?;:'"-]+$/;
        return englishPattern.test(text);
    }

    // Get confidence score for language detection
    getLanguageConfidence(text, detectedLang) {
        const totalChars = text.length;
        const pattern = this.languagePatterns[detectedLang];
        const matches = (text.match(pattern) || []).length;
        
        return totalChars > 0 ? (matches / totalChars) : 0;
    }
}

// Global language detector instance
let languageDetector;

document.addEventListener('DOMContentLoaded', function() {
    languageDetector = new LanguageDetector();
});

// Flexible search handler
document.addEventListener('DOMContentLoaded', function() {
    const flexibleSearch = document.getElementById('flexibleSearch');
    if (flexibleSearch) {
        flexibleSearch.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                handleFlexibleSearch(this.value);
            }
        });
    }
});

// Handle flexible language search
function handleFlexibleSearch(query) {
    if (!query || query.trim() === '') return;

    // Detect language
    const detectedLang = languageDetector.detectLanguage(query);
    const langName = languageDetector.getLanguageName(detectedLang);

    // Update language indicator
    const languageIndicator = document.getElementById('currentLanguage');
    if (languageIndicator) {
        languageIndicator.innerHTML = `<span>Detected: ${langName}</span>`;
    }

    // Normalize text
    const normalizedQuery = languageDetector.normalizeText(query);

    // Send to AI assistant
    const chatInput = document.getElementById('chatInput');
    if (chatInput) {
        chatInput.value = normalizedQuery;
        sendMessage(detectedLang);
    }

    // Clear search
    if (flexibleSearch) {
        flexibleSearch.value = '';
    }

    showNotification(`Processing in ${langName}...`, 'info');
}

// Export functions
window.handleFlexibleSearch = handleFlexibleSearch;