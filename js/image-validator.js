// Image Validator for Crop Detection
// Validates if uploaded image is actually a crop/plant image

class ImageValidator {
    constructor() {
        this.nonCropKeywords = [
            'person', 'human', 'man', 'woman', 'girl', 'boy', 'child',
            'car', 'vehicle', 'bike', 'motorcycle', 'truck',
            'building', 'house', 'room', 'indoors',
            'animal', 'dog', 'cat', 'cow', 'buffalo', 'horse',
            'food', 'cooking', 'kitchen', 'plate',
            'sky', 'cloud', 'landscape', 'mountain',
            'road', 'street', 'city', 'urban',
            'selfie', 'portrait', 'face'
        ];
        
        this.cropKeywords = [
            'plant', 'leaf', 'leaves', 'stem', 'fruit', 'vegetable',
            'crop', 'wheat', 'rice', 'corn', 'maize', 'soybean',
            'tomato', 'potato', 'onion', 'garlic', 'ginger',
            'farm', 'field', 'agriculture', 'farming',
            'soil', 'dirt', 'garden', 'greenhouse',
            'seed', 'seedling', 'sprout', 'flower',
            'pest', 'disease', 'fungus', 'insect',
            'harvest', 'irrigation', 'tractor'
        ];
    }

    // Validate if image appears to be a crop/plant image
    // This is a simplified validation - in production, use actual ML model
    async validateImage(file) {
        return new Promise((resolve) => {
            // First check file type
            if (!file.type.startsWith('image/')) {
                resolve({
                    isValid: false,
                    reason: 'not_image',
                    message: 'Please upload an image file (कृपया छवि फ़ाइल अपलोड करें)'
                });
                return;
            }

            // Check file size
            if (file.size > 10 * 1024 * 1024) { // 10MB limit
                resolve({
                    isValid: false,
                    reason: 'too_large',
                    message: 'File size must be less than 10MB (फ़ाइल का आकार 10MB से कम होना चाहिए)'
                });
                return;
            }

            // Read image for basic validation
            const reader = new FileReader();
            
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    // Basic image validation
                    const isValid = this.performBasicValidation(img);
                    
                    if (isValid) {
                        resolve({
                            isValid: true,
                            message: 'Image uploaded successfully'
                        });
                    } else {
                        resolve({
                            isValid: false,
                            reason: 'not_crop',
                            message: 'Please upload a clear crop/plant photo (कृपया स्पष्ट फसल/पौधे की तस्वीर अपलोड करें)'
                        });
                    }
                };
                
                img.onerror = () => {
                    resolve({
                        isValid: false,
                        reason: 'invalid_image',
                        message: 'Invalid image file (अमान्य छवि फ़ाइल)'
                    });
                };
                
                img.src = e.target.result;
            };
            
            reader.readAsDataURL(file);
        });
    }

    // Basic image validation (simplified)
    performBasicValidation(img) {
        // Check image dimensions
        if (img.width < 100 || img.height < 100) {
            return false; // Too small to be useful
        }

        // Check aspect ratio (crop photos usually have certain ratios)
        const aspectRatio = img.width / img.height;
        if (aspectRatio < 0.2 || aspectRatio > 5) {
            return false; // Unusual aspect ratio
        }

        // In production, you would use ML model to classify the image
        // For now, we'll assume most images are crops to avoid false negatives
        return true;
    }

    // Show alert for invalid image
    showInvalidImageAlert(validationResult) {
        const existingAlert = document.querySelector('.image-alert');
        if (existingAlert) {
            existingAlert.remove();
        }

        const alertDiv = document.createElement('div');
        alertDiv.className = 'image-alert';
        
        const alertTypes = {
            'not_image': 'error',
            'too_large': 'warning',
            'invalid_image': 'error',
            'not_crop': 'warning'
        };

        alertDiv.innerHTML = `
            <div class="alert-content">
                <i class="fas ${alertTypes[validationResult.reason] === 'error' ? 'fa-times-circle' : 'fa-exclamation-triangle'}"></i>
                <span>${validationResult.message}</span>
                <button class="alert-close" onclick="this.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;

        document.body.appendChild(alertDiv);

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (alertDiv.parentNode) {
                alertDiv.style.animation = 'fadeOut 0.3s ease';
                setTimeout(() => alertDiv.remove(), 300);
            }
        }, 5000);
    }
}

// Global image validator instance
let imageValidator;

document.addEventListener('DOMContentLoaded', function() {
    imageValidator = new ImageValidator();
});

// Export functions
window.validateImage = (file) => imageValidator.validateImage(file);
window.showInvalidImageAlert = (result) => imageValidator.showInvalidImageAlert(result);