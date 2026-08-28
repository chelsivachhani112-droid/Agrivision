// Camera Handler for Live Photo Scanning
// Real-time camera access and photo capture

class CameraHandler {
    constructor() {
        this.stream = null;
        this.videoElement = null;
        this.canvasElement = null;
        this.isCameraOpen = false;
    }

    // Initialize camera
    async initCamera() {
        try {
            // Check if camera is available
            if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                throw new Error('Camera not supported in this browser');
            }

            // Request camera access
            this.stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    facingMode: 'environment', // Use back camera on mobile
                    width: { ideal: 1280 },
                    height: { ideal: 720 }
                }
            });

            this.isCameraOpen = true;
            return this.stream;

        } catch (error) {
            console.error('Camera initialization error:', error);
            throw error;
        }
    }

    // Start camera feed
    async startCamera(videoElementId) {
        try {
            this.videoElement = document.getElementById(videoElementId);
            if (!this.videoElement) {
                throw new Error('Video element not found');
            }

            // Initialize camera
            this.stream = await this.initCamera();

            // Set video source
            this.videoElement.srcObject = this.stream;
            this.videoElement.play();

            return true;

        } catch (error) {
            console.error('Error starting camera:', error);
            showNotification('Camera access denied. Please enable camera permissions.', 'error');
            return false;
        }
    }

    // Capture photo from camera
    capturePhoto() {
        if (!this.videoElement || !this.stream) {
            showNotification('Camera not active', 'error');
            return null;
        }

        // Create canvas for capture
        const canvas = document.createElement('canvas');
        canvas.width = this.videoElement.videoWidth;
        canvas.height = this.videoElement.videoHeight;

        const context = canvas.getContext('2d');
        context.drawImage(this.videoElement, 0, 0, canvas.width, canvas.height);

        // Convert to blob
        return new Promise((resolve) => {
            canvas.toBlob((blob) => {
                resolve({
                    blob: blob,
                    dataUrl: canvas.toDataURL('image/jpeg', 0.8)
                });
            }, 'image/jpeg', 0.8);
        });
    }

    // Stop camera
    stopCamera() {
        if (this.stream) {
            this.stream.getTracks().forEach(track => track.stop());
            this.stream = null;
        }

        if (this.videoElement) {
            this.videoElement.srcObject = null;
        }

        this.isCameraOpen = false;
    }

    // Check camera status
    isActive() {
        return this.isCameraOpen;
    }
}

// Global camera handler instance
let cameraHandler;

document.addEventListener('DOMContentLoaded', function() {
    cameraHandler = new CameraHandler();
});

// Functions for global access
async function openLiveCamera() {
    try {
        // Hide upload area
        const uploadArea = document.getElementById('uploadArea');
        const cameraView = document.getElementById('cameraView');
        const detectionResult = document.getElementById('detectionResult');

        if (uploadArea) uploadArea.style.display = 'none';
        if (detectionResult) detectionResult.style.display = 'none';
        if (cameraView) cameraView.style.display = 'block';

        // Start camera
        const success = await cameraHandler.startCamera('cameraFeed');
        
        if (success) {
            showNotification('Camera started. Point at crop for scanning.', 'info');
        }

    } catch (error) {
        console.error('Error opening camera:', error);
        showNotification('Could not open camera. Please check permissions.', 'error');
        resetDetection();
    }
}

async function capturePhoto() {
    try {
        showNotification('Capturing photo...', 'info');
        
        const photoData = await cameraHandler.capturePhoto();
        
        if (photoData) {
            // Stop camera
            cameraHandler.stopCamera();
            
            // Hide camera view
            const cameraView = document.getElementById('cameraView');
            if (cameraView) cameraView.style.display = 'none';
            
            // Process the captured photo
            processCapturedPhoto(photoData);
        }

    } catch (error) {
        console.error('Error capturing photo:', error);
        showNotification('Could not capture photo. Please try again.', 'error');
    }
}

function closeCamera() {
    cameraHandler.stopCamera();
    
    // Reset UI
    const cameraView = document.getElementById('cameraView');
    const uploadArea = document.getElementById('uploadArea');
    
    if (cameraView) cameraView.style.display = 'none';
    if (uploadArea) uploadArea.style.display = 'block';
    
    showNotification('Camera closed', 'info');
}

async function processCapturedPhoto(photoData) {
    try {
        // Show detection result with loading
        const detectionResult = document.getElementById('detectionResult');
        const uploadedImage = document.getElementById('uploadedImage');
        const diseaseStatus = document.getElementById('diseaseStatus');
        const scanAnimation = document.getElementById('scanAnimation');

        if (detectionResult) detectionResult.style.display = 'flex';
        if (uploadedImage) uploadedImage.src = photoData.dataUrl;
        if (diseaseStatus) {
            diseaseStatus.className = 'disease-status';
            diseaseStatus.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>Scanning...</span>';
        }
        if (scanAnimation) scanAnimation.style.display = 'block';

        // Convert blob to file for processing
        const file = new File([photoData.blob], 'captured-photo.jpg', { type: 'image/jpeg' });
        
        // Process with crop detection
        if (window.cropDiseaseDetector) {
            const result = await window.cropDiseaseDetector.analyzeCropImage(file);
            window.cropDiseaseDetector.updateAnalysisUI(result);
        }

        // Hide scan animation
        if (scanAnimation) scanAnimation.style.display = 'none';

    } catch (error) {
        console.error('Error processing captured photo:', error);
        showNotification('Error processing photo. Please try again.', 'error');
        resetDetection();
    }
}

// Export functions
window.openLiveCamera = openLiveCamera;
window.capturePhoto = capturePhoto;
window.closeCamera = closeCamera;