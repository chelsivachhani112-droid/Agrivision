// Enhanced Crop Disease Detection with Structured Response Format
// AgryNova AI-powered disease detection system

class CropDiseaseDetector {
    constructor() {
        this.diseaseDatabase = this.loadDiseaseDatabase();
        this.uploadedImage = null;
    }

    // Load comprehensive disease database with structured responses
    loadDiseaseDatabase() {
        return {
            // Tomato diseases
            'tomato_bacterial_spot': {
                name: 'टमाटर बैक्टीरियल स्पॉट (Tomato Bacterial Spot)',
                englishName: 'Tomato Bacterial Spot',
                answer: 'टमाटर बैक्टीरियल स्पॉट है। पत्तियों पर छोटे पानी-भरे धब्बे दिखाई दे रहे हैं।',
                englishAnswer: 'This is tomato bacterial spot. Small water-soaked spots are visible on leaves.',
                why: 'यह बैक्टीरियल संक्रमण है जो गीली और गर्म जलवायु में फैलता है।',
                englishWhy: 'This is a bacterial infection that spreads in wet and warm conditions.',
                whatToDo: [
                    'संक्रमित पत्तियों को हटा दें और नष्ट कर दें',
                    'तांबा-आधारित कवकनाशक का छिड़काव करें',
                    'पौधों के बीच उचित दूरी बनाएं',
                    'सिंचाई को कम करें और हवादारी बेहतर करें'
                ],
                englishWhatToDo: [
                    'Remove and destroy infected leaves',
                    'Apply copper-based fungicide spray',
                    'Maintain proper spacing between plants',
                    'Reduce irrigation and improve air circulation'
                ],
                when: 'बीमारी के पहले लक्षणों पर उपचार शुरू करें।',
                englishWhen: 'Start treatment at first signs of disease.',
                caution: 'गंभीर मामलों में कृषि विशेषज्ञ से सलाह लें।',
                englishCaution: 'Consult agricultural expert for severe cases.',
                severity: 'moderate'
            },
            'tomato_early_blight': {
                name: 'टमाटर अर्ली ब्लाइट (Tomato Early Blight)',
                englishName: 'Tomato Early Blight',
                answer: 'टमाटर अर्ली ब्लाइट है। पत्तियों पर गहरे सकेंद्रिक छल्ले हैं।',
                englishAnswer: 'This is tomato early blight. Dark concentric rings are visible on leaves.',
                why: 'यह कवक संक्रमण है जो उच्च नमी और गर्म तापमान में होता है।',
                englishWhy: 'This is a fungal infection that occurs in high humidity and warm temperatures.',
                whatToDo: [
                    'संक्रमित पत्तियों को हटा दें',
                    'क्लोरोथालोनिल या मैनकोज़ेब कवकनाशक लगाएं',
                    'पौधों के नीचे पानी न जमे',
                    'फसल अवशेष को नष्ट करें'
                ],
                englishWhatToDo: [
                    'Remove infected leaves',
                    'Apply chlorothalonil or mancozeb fungicide',
                    'Avoid water at base of plants',
                    'Destroy crop residues'
                ],
                when: 'लक्षण दिखते ही उपचार शुरू करें।',
                englishWhen: 'Start treatment as soon as symptoms appear.',
                caution: 'रोकथाम के लिए प्रतिरोधी किस्में लगाएं।',
                englishCaution: 'Plant resistant varieties for prevention.',
                severity: 'moderate'
            },
            'tomato_late_blight': {
                name: 'टमाटर लेट ब्लाइट (Tomato Late Blight)',
                englishName: 'Tomato Late Blight',
                answer: 'टमाटर लेट ब्लाइट है। यह एक गंभीर बीमारी है।',
                englishAnswer: 'This is tomato late blight. This is a serious disease.',
                why: 'यह विनाशकारी कवक है जो ठंडे और गीले मौसम में फैलता है।',
                englishWhy: 'This is a destructive fungus that spreads in cool and wet conditions.',
                whatToDo: [
                    'तुरंत कवकनाशक लगाएं (फ़ंगसाइड, मैनकोज़ेब)',
                    'संक्रमित पौधे हटा दें और नष्ट करें',
                    'ऊपर से सिंचाई से बचें',
                    'अच्छी हवादारी सुनिश्चित करें'
                ],
                englishWhatToDo: [
                    'Apply fungicide immediately (fungicide, mancozeb)',
                    'Remove and destroy infected plants',
                    'Avoid overhead irrigation',
                    'Ensure good air circulation'
                ],
                when: 'तुरंत कार्रवाई करें - यह तेजी से फैलता है।',
                englishWhen: 'Act immediately - this spreads rapidly.',
                caution: 'यह बीमारी पूरी फसल को नष्ट कर सकती है।',
                englishCaution: 'This disease can destroy the entire crop.',
                severity: 'severe'
            },
            // Wheat diseases
            'wheat_rust': {
                name: 'गेहूं रस्ट (Wheat Rust)',
                englishName: 'Wheat Rust',
                answer: 'गेहूं रस्ट है। पत्तियों पर भूरे-नारंगी पुस्त हैं।',
                englishAnswer: 'This is wheat rust. Brown-orange pustules are on leaves.',
                why: 'यह कवक संक्रमण है जो ठंडे और गीले मौसम में होता है।',
                englishWhy: 'This is a fungal infection that occurs in cool and wet conditions.',
                whatToDo: [
                    'प्रतिरोधी किस्में लगाएं',
                    'समय पर कवकनाशक छिड़काव करें',
                    'गहरी जुताई करें',
                    'फसल अवशेष नष्ट करें'
                ],
                englishWhatToDo: [
                    'Plant resistant varieties',
                    'Timely fungicide spray',
                    'Deep ploughing',
                    'Destroy crop residues'
                ],
                when: 'लक्षण दिखते ही उपचार करें।',
                englishWhen: 'Treat as soon as symptoms appear.',
                caution: 'गंभीर संक्रमण से उपज में कमी हो सकती है।',
                englishCaution: 'Severe infection can reduce yield.',
                severity: 'moderate'
            },
            // Rice diseases
            'rice_blast': {
                name: 'चावल ब्लास्ट (Rice Blast)',
                englishName: 'Rice Blast',
                answer: 'चावल ब्लास्ट है। यह एक गंभीर बीमारी है।',
                englishAnswer: 'This is rice blast. This is a serious disease.',
                why: 'यह कवक संक्रमण है जो उच्च नमी में फैलता है।',
                englishWhy: 'This is a fungal infection that spreads in high humidity.',
                whatToDo: [
                    'प्रतिरोधी किस्में लगाएं',
                    'उचित नाइट्रोजन प्रबंधन',
                    'कवकनाशक उपचार',
                    'बीज उपचार करें'
                ],
                englishWhatToDo: [
                    'Plant resistant varieties',
                    'Proper nitrogen management',
                    'Fungicide treatment',
                    'Seed treatment'
                ],
                when: 'बीज बुवाई से पहले और बीमारी के लक्षणों पर।',
                englishWhen: 'Before sowing and at disease symptoms.',
                caution: 'यह उपज में 50% तक कमी कर सकता है।',
                englishCaution: 'This can reduce yield by up to 50%.',
                severity: 'severe'
            }
        };
    }

    // Analyze crop image
    async analyzeCropImage(imageFile) {
        return new Promise((resolve) => {
            const reader = new FileReader();
            
            reader.onload = (e) => {
                this.uploadedImage = e.target.result;
                
                // Simulate AI analysis with realistic timing
                const processingTime = Math.random() * 2000 + 1500;
                
                setTimeout(() => {
                    const analysisResult = this.simulateDiseaseAnalysis();
                    resolve(analysisResult);
                }, processingTime);
            };
            
            reader.readAsDataURL(imageFile);
        });
    }

    // Simulate disease analysis
    simulateDiseaseAnalysis() {
        const diseaseKeys = Object.keys(this.diseaseDatabase);
        const isHealthy = Math.random() > 0.5; // 50% chance of being healthy
        
        if (isHealthy) {
            return {
                healthy: true,
                confidence: 0.90,
                answer: 'कोई बीमारी नहीं पाई गई। पौधा स्वस्थ प्रतीत होता है।',
                englishAnswer: 'No disease detected. Plant appears healthy.',
                why: 'पौधे पर किसी भी रोग या कीट के लक्षण नहीं हैं।',
                englishWhy: 'No disease or pest symptoms are visible on the plant.',
                whatToDo: [
                    'नियमित निगरानी जारी रखें',
                    'उचित सिंचाई और उर्वरक जारी रखें',
                    'रोकथाम के लिए अच्छी कृषि प्रथाएं अपनाएं'
                ],
                englishWhatToDo: [
                    'Continue regular monitoring',
                    'Maintain proper irrigation and fertilization',
                    'Follow good agricultural practices for prevention'
                ],
                when: 'नियमित रूप से निगरानी करें।',
                englishWhen: 'Monitor regularly.',
                caution: 'स्वस्थ पौधे को स्वस्थ रखने के लिए अच्छी देखभाल जारी रखें।',
                englishCaution: 'Continue good care to keep the plant healthy.'
            };
        } else {
            const randomDiseaseKey = diseaseKeys[Math.floor(Math.random() * diseaseKeys.length)];
            const disease = this.diseaseDatabase[randomDiseaseKey];
            const confidence = (Math.random() * 0.2 + 0.8).toFixed(2); // 80-100% confidence
            
            return {
                healthy: false,
                disease: disease,
                confidence: confidence,
                diseaseKey: randomDiseaseKey
            };
        }
    }

    // Update UI with structured response format
    updateAnalysisUI(result) {
        const uploadArea = document.getElementById('uploadArea');
        const cameraView = document.getElementById('cameraView');
        const detectionResult = document.getElementById('detectionResult');
        const uploadedImage = document.getElementById('uploadedImage');
        const diseaseStatus = document.getElementById('diseaseStatus');
        const diseaseName = document.getElementById('diseaseName');
        const confidenceLevel = document.getElementById('confidenceLevel');
        const confidenceValue = document.getElementById('confidenceValue');
        const scanAnimation = document.getElementById('scanAnimation');

        // Hide upload and camera
        if (uploadArea) uploadArea.style.display = 'none';
        if (cameraView) cameraView.style.display = 'none';
        
        // Show result
        if (detectionResult) detectionResult.style.display = 'flex';
        
        if (uploadedImage && this.uploadedImage) {
            uploadedImage.src = this.uploadedImage;
        }

        // Hide scan animation
        if (scanAnimation) scanAnimation.style.display = 'none';

        if (result.healthy) {
            if (diseaseStatus) {
                diseaseStatus.className = 'disease-status success';
                diseaseStatus.innerHTML = '<i class="fas fa-check-circle"></i><span>स्वस्थ पौधा (Healthy Plant)</span>';
            }
            if (diseaseName) {
                diseaseName.textContent = 'कोई बीमारी नहीं (No Disease)';
                diseaseName.style.color = '#2E7D32';
            }
            if (confidenceLevel) {
                confidenceLevel.style.width = `${result.confidence * 100}%`;
                confidenceLevel.style.background = 'linear-gradient(135deg, #2E7D32, #43A047)';
            }
            if (confidenceValue) {
                confidenceValue.textContent = `${(result.confidence * 100).toFixed(0)}%`;
            }

            // Update structured response
            this.updateStructuredResponse(result);

        } else {
            const severityClass = result.disease.severity;
            
            if (diseaseStatus) {
                diseaseStatus.className = `disease-status ${severityClass === 'severe' ? 'danger' : severityClass === 'moderate' ? 'warning' : 'success'}`;
                diseaseStatus.innerHTML = '<i class="fas fa-exclamation-triangle"></i><span>बीमारी पाई गई (Disease Detected)</span>';
            }
            if (diseaseName) {
                diseaseName.textContent = result.disease.name;
                diseaseName.style.color = this.getSeverityColor(result.disease.severity);
            }
            if (confidenceLevel) {
                confidenceLevel.style.width = `${result.confidence * 100}%`;
                confidenceLevel.style.background = this.getSeverityGradient(result.disease.severity);
            }
            if (confidenceValue) {
                confidenceValue.textContent = `${(result.confidence * 100).toFixed(0)}%`;
            }

            // Update structured response
            this.updateStructuredResponse(result);
        }

        // Show notification
        if (result.healthy) {
            showNotification('विश्लेषण पूर्ण: पौधा स्वस्थ है!', 'success');
        } else {
            showNotification(`विश्लेषण पूर्ण: ${result.disease.englishName} पाया गया`, 'warning');
        }
    }

    // Update structured response format
    updateStructuredResponse(result) {
        const answerText = document.getElementById('answerText');
        const whyText = document.getElementById('whyText');
        const whatToDoText = document.getElementById('whatToDoText');
        const whenText = document.getElementById('whenText');
        const cautionText = document.getElementById('cautionText');

        const data = result.healthy ? result : result.disease;

        if (answerText) {
            answerText.innerHTML = `${data.answer}<br><small class="english-text">${data.englishAnswer}</small>`;
        }

        if (whyText) {
            whyText.innerHTML = `${data.why}<br><small class="english-text">${data.englishWhy}</small>`;
        }

        if (whatToDoText) {
            whatToDoText.innerHTML = data.whatToDo.map((item, index) => {
                const englishItem = data.englishWhatToDo[index];
                return `<li>${item}<br><small class="english-text">${englishItem}</small></li>`;
            }).join('');
        }

        if (whenText) {
            whenText.innerHTML = `${data.when}<br><small class="english-text">${data.englishWhen}</small>`;
        }

        if (cautionText) {
            cautionText.innerHTML = `${data.caution}<br><small class="english-text">${data.englishCaution}</small>`;
        }
    }

    // Get severity color
    getSeverityColor(severity) {
        const colors = {
            'mild': '#FF6F00',
            'moderate': '#E65100',
            'severe': '#D32F2F'
        };
        return colors[severity] || '#333';
    }

    // Get severity gradient
    getSeverityGradient(severity) {
        const gradients = {
            'mild': 'linear-gradient(135deg, #FF6F00, #FF8F00)',
            'moderate': 'linear-gradient(135deg, #E65100, #FF6F00)',
            'severe': 'linear-gradient(135deg, #D32F2F, #C62828)'
        };
        return gradients[severity] || 'linear-gradient(135deg, #2E7D32, #43A047)';
    }

    // Reset detection UI
    resetDetectionUI() {
        const uploadArea = document.getElementById('uploadArea');
        const cameraView = document.getElementById('cameraView');
        const detectionResult = document.getElementById('detectionResult');
        
        if (uploadArea) uploadArea.style.display = 'block';
        if (cameraView) cameraView.style.display = 'none';
        if (detectionResult) detectionResult.style.display = 'none';
        
        this.uploadedImage = null;
    }
}

// Initialize crop disease detector
let cropDiseaseDetector;

document.addEventListener('DOMContentLoaded', function() {
    cropDiseaseDetector = new CropDiseaseDetector();
    
    // Setup file input change handler
    const fileInput = document.getElementById('cropImage');
    if (fileInput) {
        fileInput.addEventListener('change', handleFileUpload);
    }
    
    // Setup drag and drop
    const uploadArea = document.getElementById('uploadArea');
    if (uploadArea) {
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.style.borderColor = '#2E7D32';
            uploadArea.style.background = '#C8E6C9';
        });
        
        uploadArea.addEventListener('dragleave', () => {
            uploadArea.style.borderColor = '#e0e0e0';
            uploadArea.style.background = 'transparent';
        });
        
        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.style.borderColor = '#e0e0e0';
            uploadArea.style.background = 'transparent';
            
            const files = e.dataTransfer.files;
            if (files.length > 0 && files[0].type.startsWith('image/')) {
                fileInput.files = files;
                handleFileUpload({ target: fileInput });
            }
        });
    }
});

// Handle file upload
async function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
        showNotification('कृपया छवि फ़ाइल अपलोड करें (Please upload image file)', 'error');
        return;
    }
    
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
        showNotification('फ़ाइल का आकार 5MB से कम होना चाहिए (File size must be less than 5MB)', 'error');
        return;
    }
    
    // Validate if it's a crop image
    if (window.validateImage) {
        const validationResult = await window.validateImage(file);
        
        if (!validationResult.isValid) {
            window.showInvalidImageAlert(validationResult);
            return;
        }
    }
    
    showNotification('फसल छवि का विश्लेषण कर रहा हूं... (Analyzing crop image...)', 'info');
    
    try {
        const result = await cropDiseaseDetector.analyzeCropImage(file);
        cropDiseaseDetector.updateAnalysisUI(result);
    } catch (error) {
        console.error('Error analyzing crop image:', error);
        showNotification('छवि विश्लेषण में त्रुटि। कृपया पुनः प्रयास करें। (Error analyzing image. Please try again.)', 'error');
        cropDiseaseDetector.resetDetectionUI();
    }
}

// Reset detection function
function resetDetection() {
    if (cropDiseaseDetector) {
        cropDiseaseDetector.resetDetectionUI();
    }
}

// Export for global access
window.resetDetection = resetDetection;
window.cropDiseaseDetector = cropDiseaseDetector;