// Main JavaScript for AgryNova

document.addEventListener('DOMContentLoaded', function() {
    initializeIcons();
    initializeNavigation();
    initializeProfileModal();
    initializeFarmerProfile();
    initializeSmoothScroll();
    loadDashboardData();
});

// Initialize Icons
function initializeIcons() {
    lucide.createIcons();
}

// Profile Modal Functions
function openProfileModal() {
    const modal = document.getElementById('profileModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        loadFarmerProfile();
    }
}

function closeProfileModal() {
    const modal = document.getElementById('profileModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

function initializeProfileModal() {
    const modal = document.getElementById('profileModal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeProfileModal();
            }
        });
    }

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeProfileModal();
        }
    });
}

// Farmer Profile System
let farmerProfile = {
    state: '',
    district: '',
    village: '',
    language: 'hi',
    soilType: '',
    farmSize: '',
    currentCrop: '',
    irrigationType: ''
};

function initializeFarmerProfile() {
    // Load saved profile from localStorage
    const savedProfile = localStorage.getItem('farmerProfile');
    if (savedProfile) {
        farmerProfile = JSON.parse(savedProfile);
        updateProfileUI();
    }

    // Handle form submission
    const profileForm = document.getElementById('farmerProfileForm');
    if (profileForm) {
        profileForm.addEventListener('submit', handleProfileSave);
    }
}

function loadFarmerProfile() {
    // Populate form with current profile data
    document.getElementById('farmerState').value = farmerProfile.state || '';
    document.getElementById('farmerDistrict').value = farmerProfile.district || '';
    document.getElementById('farmerVillage').value = farmerProfile.village || '';
    document.getElementById('farmerLanguage').value = farmerProfile.language || 'hi';
    document.getElementById('soilType').value = farmerProfile.soilType || '';
    document.getElementById('farmSize').value = farmerProfile.farmSize || '';
    document.getElementById('currentCrop').value = farmerProfile.currentCrop || '';
    document.getElementById('irrigationType').value = farmerProfile.irrigationType || '';
}

function handleProfileSave(e) {
    e.preventDefault();

    // Update profile from form
    farmerProfile = {
        state: document.getElementById('farmerState').value,
        district: document.getElementById('farmerDistrict').value,
        village: document.getElementById('farmerVillage').value,
        language: document.getElementById('farmerLanguage').value,
        soilType: document.getElementById('soilType').value,
        farmSize: document.getElementById('farmSize').value,
        currentCrop: document.getElementById('currentCrop').value,
        irrigationType: document.getElementById('irrigationType').value
    };

    // Save to localStorage
    localStorage.setItem('farmerProfile', JSON.stringify(farmerProfile));

    // Update UI
    updateProfileUI();
    closeProfileModal();
    showNotification('Profile saved successfully! | प्रोफाइल सफलतापूर्वक सहेजी गई!', 'success');

    // Refresh recommendations with new profile data
    if (window.updateCropRecommendations) {
        window.updateCropRecommendations(farmerProfile);
    }
}

function updateProfileUI() {
    // Update location display
    const userLocation = document.getElementById('userLocation');
    if (userLocation && farmerProfile.state && farmerProfile.district) {
        userLocation.innerHTML = `
            <span><i class="fas fa-map-marker-alt"></i> ${farmerProfile.district}, ${farmerProfile.state}</span>
            <button class="btn-small" onclick="openProfileModal()">Edit</button>
        `;
    }

    // Update weather location
    if (farmerProfile.district) {
        const locationName = document.getElementById('locationName');
        if (locationName) {
            locationName.textContent = `${farmerProfile.district}, ${farmerProfile.state}`;
        }
    }
}

function getFarmerProfile() {
    return farmerProfile;
}

// Navigation
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// Smooth Scroll
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Load Dashboard Data
function loadDashboardData() {
    if (window.loadWeatherData) {
        window.loadWeatherData();
    }
    
    if (window.initializeCropMonitoring) {
        window.initializeCropMonitoring();
    }

    // Update crop recommendations based on profile
    if (farmerProfile.state && window.updateCropRecommendations) {
        window.updateCropRecommendations(farmerProfile);
    }
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    const icons = {
        'success': 'fa-check-circle',
        'error': 'fa-times-circle',
        'warning': 'fa-exclamation-triangle',
        'info': 'fa-info-circle'
    };
    
    notification.innerHTML = `
        <i class="fas ${icons[type] || icons.info}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideIn 0.3s ease reverse';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// Weather Refresh
function refreshWeather() {
    showNotification('Refreshing weather data...', 'info');
    if (window.loadWeatherData) {
        window.loadWeatherData();
    }
}

// Export functions for global access
window.openProfileModal = openProfileModal;
window.closeProfileModal = closeProfileModal;
window.scrollToSection = scrollToSection;
window.refreshWeather = refreshWeather;
window.showNotification = showNotification;
window.getFarmerProfile = getFarmerProfile;