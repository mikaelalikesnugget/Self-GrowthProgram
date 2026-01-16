// ===========================
// Chatbot Functionality
// ===========================

const chatbotResponses = {
    'hello': "Hiii! 👋 I'm so happy to meet you! I'm Wellness Buddy, and I'm here to help you discover everything amazing about our wellness platform. What can I tell you about?",
    'hi': "Hey! 😊 Great to see you! I'm Wellness Buddy, your friendly wellness companion. What would you like to know?",
    'what is wellness hub': "Oh, I love this question! 💖 Wellness Hub is an AI-powered platform designed specially for youths and students like you who want to take control of their health and wellness. We help with mental health, fitness, nutrition, and better sleep - all personalized just for you!",
    'programs': "Ohhh yes! We have the BEST programs! 🌟\n\n1. 🧠 MindEase - Manage stress & anxiety\n2. 💪 MoveSmartAI - Achieve your fitness goals\n3. 🥗 NutriPal - Eat better with smart nutrition tips\n4. 😴 Sleep with Melo - Sleep like a dream!\n\nEach one is designed with YOU in mind!",
    'features': "We're so proud of our features! ✨\n✓ Personalized guidance just for YOU\n✓ Available 24/7 whenever you need support\n✓ Super practical, easy-to-follow tips\n✓ Designed for busy students\n✓ Powered by smart AI technology\n\nWe've thought of everything to make your wellness journey smooth!",
    'how to start': "Yayyy! I'm so excited for you! 🎉 Getting started is super easy:\n\n1. Head to our Programs section\n2. Pick the wellness area you want to focus on\n3. Click 'Launch' and you're in!\n\nEach program has its own amazing chatbot ready to help. You've got this! 💪",
    'contact': "Want to reach out? We'd love to hear from you! 💬\n\nYou can:\n📧 Contact us through the Contact section\n💌 Fill out our feedback form on this page\n🤝 Share your thoughts directly with us!\n\nWe really care about your feedback!",
    'cost': "Great question! 💰 Wellness Hub is designed to be super affordable and accessible for ALL students. Quality wellness guidance shouldn't break the bank! Check out our Programs section for more details. We believe everyone deserves wellness support! 💖",
    'support': "Aww, I'm here for you! 💕 Whether you need help navigating, have questions about programs, or just want to chat about wellness - I'm your buddy! What's on your mind?",
    'thank you': "Awww, you're so sweet! 🥰 It makes me SO happy to help! That's what I'm here for - to support your wellness journey. Come back and chat anytime! 💖",
    'help': "Of course! I'm here to help! 😊 Here's what I can chat with you about:\n\n💖 Wellness Hub overview\n🎯 Our amazing programs\n⭐ Cool features\n🚀 How to get started\n📧 Contact information\n\nJust ask away! I'm always excited to help! 🌟"
};

function toggleChatbot() {
    const chatbot = document.getElementById('chatbotWidget');
    chatbot.classList.toggle('active');
    
    if (chatbot.classList.contains('active')) {
        document.getElementById('userInput').focus();
    }
}

function sendMessage() {
    const userInput = document.getElementById('userInput');
    const message = userInput.value.trim();
    
    if (message === '') return;
    
    // Display user message
    displayMessage(message, 'user');
    userInput.value = '';
    
    // Generate bot response
    setTimeout(() => {
        const response = getBotResponse(message);
        displayMessage(response, 'bot');
    }, 500);
}

function handleEnter(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

function displayMessage(message, sender) {
    const messagesContainer = document.getElementById('chatbotMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = sender === 'user' ? 'user-message' : 'bot-message';
    
    const messageParagraph = document.createElement('p');
    messageParagraph.textContent = message;
    messageDiv.appendChild(messageParagraph);
    
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function getBotResponse(userMessage) {
    const lowerMessage = userMessage.toLowerCase();
    
    // Check for exact or partial matches
    for (const [key, response] of Object.entries(chatbotResponses)) {
        if (lowerMessage.includes(key)) {
            return response;
        }
    }
    
    // Default responses with personality
    const defaultResponses = [
        "Ooh, that's an interesting question! 🤔 I'm not sure I have all the details on that, but you can ask me about our programs, features, or how to get started! What else can I help with?",
        "Hmm, that's a new one for me! 😄 But I'm here to help with Wellness Hub stuff! Try asking me about our programs or features - I promise I know those by heart! 💖",
        "I love your curiosity! ✨ That's a bit outside my wheelhouse, but I'd love to chat about our wellness programs instead! Want to know more?",
        "You've got me thinking! 🌟 I specialize in Wellness Hub knowledge, but ask me anything about that and I'm your buddy! 💪"
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}

// ===========================
// Carousel Functionality
// ===========================

let currentSlideIndex = 1;
let autoPlayInterval;

function showSlide(n) {
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');

    if (n > slides.length) {
        currentSlideIndex = 1;
    }
    if (n < 1) {
        currentSlideIndex = slides.length;
    }

    slides.forEach(slide => {
        slide.style.display = 'none';
    });

    indicators.forEach(indicator => {
        indicator.classList.remove('active');
    });

    if (slides[currentSlideIndex - 1]) {
        slides[currentSlideIndex - 1].style.display = 'block';
    }
    if (indicators[currentSlideIndex - 1]) {
        indicators[currentSlideIndex - 1].classList.add('active');
    }
}

function changeSlide(n) {
    clearInterval(autoPlayInterval);
    showSlide(currentSlideIndex += n);
    startAutoPlay();
}

function currentSlide(n) {
    clearInterval(autoPlayInterval);
    showSlide(currentSlideIndex = n);
    startAutoPlay();
}

function startAutoPlay() {
    autoPlayInterval = setInterval(() => {
        showSlide(currentSlideIndex += 1);
    }, 5000);
}

// Initialize carousel
document.addEventListener('DOMContentLoaded', () => {
    showSlide(currentSlideIndex);
    startAutoPlay();
});

// ===========================
// Navigation Active Link Handler
// ===========================

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function() {
        // Remove active class from all links
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        // Add active class to clicked link
        this.classList.add('active');
    });
});

// Update active link on scroll
window.addEventListener('scroll', () => {
    let current = '';
    
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ===========================
// Smooth Scroll Behavior
// ===========================

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

// ===========================
// Intersection Observer for Fade-in Effects
// ===========================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe feature cards and program cards
document.querySelectorAll('.feature-card, .program-card, .why-card, .contact-item').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// ===========================
// Mobile Menu Toggle
// ===========================

const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Close menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// ===========================
// Button Hover Effects
// ===========================

document.querySelectorAll('.program-button:not(.coming-soon)').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// ===========================
// CTA Button Click Handler
// ===========================

const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
    ctaButton.addEventListener('click', function() {
        const programsSection = document.querySelector('#programs');
        if (programsSection) {
            programsSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
}

// ===========================
// Page Load Animation
// ===========================

window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// ===========================
// Add Active Styling to CSS
// ===========================

// Add CSS for active nav link
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        background-color: rgba(255, 255, 255, 0.2);
        border-bottom: 2px solid var(--white);
    }
    
    .feature-card,
    .program-card,
    .why-card,
    .contact-item {
        opacity: 1;
    }
`;
document.head.appendChild(style);

// ===========================
// Analytics & Tracking
// ===========================

// Track which programs users click on
document.querySelectorAll('.program-button').forEach(button => {
    button.addEventListener('click', function(e) {
        const programName = this.closest('.program-card').querySelector('.program-header h3').textContent;
        console.log('User clicked on: ' + programName);
        
        // You can add tracking code here (Google Analytics, etc.)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'program_click', {
                'program_name': programName
            });
        }
    });
});

// ===========================
// Accessibility Enhancements
// ===========================

// Add keyboard navigation support
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        // Can be used to close any modals in the future
    }
});

// ===========================
// Performance: Lazy Load Images (if any added in future)
// ===========================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.src = entry.target.dataset.src;
                observer.unobserve(entry.target);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

console.log('Wellness Hub - JavaScript loaded successfully! 🌟');
