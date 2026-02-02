// Modern Portfolio JavaScript for 2025
// Initialize EmailJS with your user ID
(function() {
    // Replace with your actual EmailJS user ID
    emailjs.init("jz0p_XUpBXR_gPiaH");
})();

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animations
    AOS.init({
        duration: 800,
        easing: 'ease',
        once: true
    });

    // Add background to navbar initially
    const header = document.querySelector('header');
    header.classList.add('scrolled');

    // Loading screen
    setTimeout(() => {
        document.querySelector('.loading-screen').style.opacity = '0';
        setTimeout(() => {
            document.querySelector('.loading-screen').style.display = 'none';
        }, 500);
    }, 1500);
    
    // Update progress bar
    const updateProgress = () => {
        const progressBar = document.querySelector('.progress');
        let width = 0;
        const interval = setInterval(() => {
            if (width >= 100) {
                clearInterval(interval);
            } else {
                width++;
                progressBar.style.width = width + '%';
            }
        }, 10);
    };
    updateProgress();    // Typewriter effect
    const typewriterText = document.getElementById('typewriter-text');
    
    // Only run the typewriter effect if the element exists
    if (typewriterText) {
        const texts = ['Software Developer'];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;

        function typeEffect() {
            // Check if element still exists (in case it gets removed from DOM)
            if (!document.getElementById('typewriter-text')) return;
            
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                typewriterText.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else {
                typewriterText.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 150;
            }

            if (!isDeleting && charIndex === currentText.length) {
                isDeleting = true;
                typingSpeed = 1500; // Pause at end
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typingSpeed = 500; // Pause before typing next
            }

            setTimeout(typeEffect, typingSpeed);
        }
        
        // Start the typewriter effect
        typeEffect();
    }

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Navbar active state on scroll
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(navItem => {
            navItem.classList.remove('active');
            if (navItem.getAttribute('href').substring(1) === current) {
                navItem.classList.add('active');
            }
        });
    });

    // Skills tab switching
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(btn => btn.classList.remove('active'));
            btn.classList.add('active');
            
            const tabId = btn.getAttribute('data-tab');
            
            tabContents.forEach(content => {
                content.classList.remove('active');
            });
            
            document.getElementById(`${tabId}-content`).classList.add('active');
        });
    });

    // Dark/Light theme toggle
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        
        if (body.classList.contains('dark-mode')) {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('theme', 'dark');
        } else {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', 'light');
        }
    });
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

    // Back to top button
    const backToTop = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Custom cursor
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    document.addEventListener('mousemove', e => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        setTimeout(() => {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        }, 100);
    });

    // Contact form functionality
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Remove previous messages
            const previousMessages = document.querySelectorAll('.form-message');
            previousMessages.forEach(msg => msg.remove());
            
            // Create loading message
            const loadingMessage = document.createElement('div');
            loadingMessage.className = 'form-message';
            loadingMessage.textContent = 'Sending your message...';
            contactForm.appendChild(loadingMessage);
            
            // Email method using EmailJS
            const templateParams = {
                name: name,
                email: email,
                subject: subject,
                message: message
            };
            
            // Replace with your actual EmailJS service ID and template ID
            emailjs.send('service_z9n8irk', 'template_hvibt8a', templateParams)
                .then(function() {
                    // Remove loading message
                    loadingMessage.remove();
                    
                    // Create success message
                    const successMessage = document.createElement('div');
                    successMessage.className = 'form-message success';
                    successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Your message has been sent successfully!';
                    contactForm.appendChild(successMessage);
                    
                    // Clear form fields
                    contactForm.reset();
                })
                .catch(function(error) {
                    console.error('EmailJS error:', error);
                    
                    // Try Google Sheets method as fallback
                    submitToGoogleSheet(name, email, subject, message, loadingMessage);
                });
        });
    }
    
    // Function to submit to Google Sheets
    function submitToGoogleSheet(name, email, subject, message, loadingElement) {
        // Replace with your actual Google Sheets Web App URL
        const scriptURL = 'https://script.google.com/macros/s/AKfycbwv2CxJeIUHPOePkPu_3ZH3pAMqv1eHqHaKVzXNBmNsGSzzVr4AVFE_72IWLqB83TXesg/exec';
        
        // Create form data
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('subject', subject);
        formData.append('message', message);
        formData.append('timestamp', new Date().toISOString());
        
        // Send data to Google Sheets
        fetch(scriptURL, { method: 'POST', body: formData })
            .then(response => {
                // Remove loading message
                if (loadingElement) loadingElement.remove();
                
                // Create success message
                const successMessage = document.createElement('div');
                successMessage.className = 'form-message success';
                successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Your message has been sent successfully!';
                contactForm.appendChild(successMessage);
                
                // Clear form fields
                contactForm.reset();
            })
            .catch(error => {
                // Remove loading message
                if (loadingElement) loadingElement.remove();
                
                // Create error message
                const errorMessage = document.createElement('div');
                errorMessage.className = 'form-message error';
                errorMessage.innerHTML = '<i class="fas fa-exclamation-circle"></i> There was a problem sending your message. Please try again.';
                contactForm.appendChild(errorMessage);
                
                console.error('Error submitting to Google Sheets:', error);
            });
    }
});