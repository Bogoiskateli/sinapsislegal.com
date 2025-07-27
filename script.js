/*
 * Sinapsis Legal - JavaScript principal
 * Incluye funcionalidad de menú móvil con hamburger
 * Última actualización: Menú móvil funcional
 */

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navButtons = document.querySelector('.nav-buttons');
    const body = document.body;

    // Crear overlay para cerrar el menú
    const overlay = document.createElement('div');
    overlay.className = 'mobile-menu-overlay';
    body.appendChild(overlay);

    if (hamburger && navMenu && navButtons) {
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            navButtons.classList.toggle('active');
            overlay.classList.toggle('active');
            body.style.overflow = body.style.overflow === 'hidden' ? '' : 'hidden';
        });

        // Cerrar menú al hacer click en el overlay
        overlay.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            navButtons.classList.remove('active');
            overlay.classList.remove('active');
            body.style.overflow = '';
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-menu a, .nav-buttons button').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                navButtons.classList.remove('active');
                overlay.classList.remove('active');
                body.style.overflow = '';
            });
        });

        // Cerrar menú al hacer scroll
        window.addEventListener('scroll', function() {
            if (navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                navButtons.classList.remove('active');
                overlay.classList.remove('active');
                body.style.overflow = '';
            }
        });
    }
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Header Background on Scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = '#ffffff';
        header.style.backdropFilter = 'none';
    }
});

// Animate Elements on Scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.feature-card, .testimonial-card, .blog-card');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Form Handling for Search
document.addEventListener('DOMContentLoaded', function() {
    const searchButtons = document.querySelectorAll('.btn-primary');
    
    searchButtons.forEach(button => {
        if (button.textContent.includes('Búsqueda')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                showSearchModal();
            });
        }
    });
});

// Search Modal
function showSearchModal() {
    const modal = document.createElement('div');
    modal.className = 'search-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h2>Búsqueda Gratuita de Marca</h2>
            <p>Completa el formulario y te responderemos en un día hábil.</p>
            <form id="searchForm">
                <div class="form-group">
                    <label for="companyName">Nombre de la Empresa</label>
                    <input type="text" id="companyName" name="companyName" required>
                </div>
                <div class="form-group">
                    <label for="trademarkName">Nombre de la Marca</label>
                    <input type="text" id="trademarkName" name="trademarkName" required>
                </div>
                <div class="form-group">
                    <label for="email">Correo Electrónico</label>
                    <input type="email" id="email" name="email" required>
                </div>
                <div class="form-group">
                    <label for="phone">Teléfono</label>
                    <input type="tel" id="phone" name="phone">
                </div>
                <div class="form-group">
                    <label for="description">Descripción del Producto/Servicio</label>
                    <textarea id="description" name="description" rows="4" required></textarea>
                </div>
                <button type="submit" class="btn-primary">Enviar Búsqueda</button>
            </form>
        </div>
    `;

    // Add modal styles
    const modalStyles = document.createElement('style');
    modalStyles.textContent = `
        .search-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
        }
        
        .modal-content {
            background: white;
            padding: 2rem;
            border-radius: 12px;
            max-width: 500px;
            width: 90%;
            max-height: 90vh;
            overflow-y: auto;
            position: relative;
        }
        
        .close-modal {
            position: absolute;
            top: 1rem;
            right: 1rem;
            font-size: 1.5rem;
            cursor: pointer;
            color: #666;
        }
        
        .close-modal:hover {
            color: #1a5f7a;
        }
        
        .form-group {
            margin-bottom: 1.5rem;
        }
        
        .form-group label {
            display: block;
            margin-bottom: 0.5rem;
            font-weight: 600;
            color: #333;
        }
        
        .form-group input,
        .form-group textarea {
            width: 100%;
            padding: 0.75rem;
            border: 2px solid #e2e8f0;
            border-radius: 8px;
            font-size: 1rem;
            transition: border-color 0.3s ease;
        }
        
        .form-group input:focus,
        .form-group textarea:focus {
            outline: none;
            border-color: #1a5f7a;
        }
        
        .modal-content h2 {
            color: #1a5f7a;
            margin-bottom: 1rem;
        }
        
        .modal-content p {
            color: #666;
            margin-bottom: 2rem;
        }
    `;

    document.head.appendChild(modalStyles);
    document.body.appendChild(modal);

    // Close modal functionality
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
    });

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });

    // Form submission
    const form = modal.querySelector('#searchForm');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        formData.append('action', 'trademark_search');
        
        // Basic validation
        const data = Object.fromEntries(formData);
        if (!data.companyName || !data.trademarkName || !data.email || !data.description) {
            showNotification('Por favor completa todos los campos requeridos.', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showNotification('Por favor ingresa un email válido.', 'error');
            return;
        }
        
        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Buscando...';
        submitBtn.disabled = true;
        
        // Submit to backend
        fetch('/.netlify/functions/api', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                action: 'trademark_search',
                ...data
            })
        })
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.innerHTML = `
                    <div style="text-align: center; padding: 2rem;">
                        <i class="fas fa-check-circle" style="font-size: 3rem; color: #1a5f7a; margin-bottom: 1rem;"></i>
                        <h3 style="color: #1a5f7a; margin-bottom: 1rem;">¡Búsqueda Enviada!</h3>
                        <p style="color: #666;">${result.message}</p>
                    </div>
                `;
                
                modal.querySelector('.modal-content').innerHTML = '';
                modal.querySelector('.modal-content').appendChild(successMessage);
                
                // Show results if available
                if (result.data && result.data.results) {
                    setTimeout(() => {
                        showSearchResults(result.data.results);
                    }, 2000);
                }
                
                // Close modal after 3 seconds
                setTimeout(() => {
                    document.body.removeChild(modal);
                }, 3000);
            } else {
                showNotification(result.message || 'Error al realizar la búsqueda.', 'error');
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showNotification('Error de conexión. Por favor intenta nuevamente.', 'error');
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        });
    });
}

// Pricing Button Handler
document.addEventListener('DOMContentLoaded', function() {
    const pricingButtons = document.querySelectorAll('.btn-secondary');
    
    pricingButtons.forEach(button => {
        if (button.textContent.includes('Precios')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                showPricingModal();
            });
        }
    });
});

// Pricing Modal
function showPricingModal() {
    const modal = document.createElement('div');
    modal.className = 'pricing-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h2>Nuestros Precios</h2>
            <div class="pricing-grid">
                <div class="pricing-card">
                    <h3>Búsqueda Básica</h3>
                    <div class="price">Gratis</div>
                    <ul>
                        <li>Búsqueda inicial de marca</li>
                        <li>Reporte básico de riesgo</li>
                        <li>Respuesta en 1 día hábil</li>
                    </ul>
                    <button class="btn-primary" data-plan="free" data-amount="0">Comenzar</button>
                </div>
                <div class="pricing-card featured">
                    <h3>Registro Completo</h3>
                    <div class="price">$8,500 MXN</div>
                    <ul>
                        <li>Búsqueda exhaustiva</li>
                        <li>Preparación de solicitud</li>
                        <li>Presentación ante IMPI</li>
                        <li>Seguimiento completo</li>
                    </ul>
                    <button class="btn-primary" data-plan="registro" data-amount="8500">Seleccionar</button>
                </div>
                <div class="pricing-card">
                    <h3>Consultoría</h3>
                    <div class="price">$2,500 MXN</div>
                    <ul>
                        <li>Asesoría legal especializada</li>
                        <li>Revisión de documentos</li>
                        <li>Estrategia de protección</li>
                    </ul>
                    <button class="btn-primary" data-plan="consultoria" data-amount="2500">Consultar</button>
                </div>
            </div>
        </div>
    `;

    // Add pricing modal styles
    const modalStyles = document.createElement('style');
    modalStyles.textContent = `
        .pricing-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
        }
        
        .pricing-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 2rem;
            margin-top: 2rem;
        }
        
        .pricing-card {
            background: white;
            padding: 2rem;
            border-radius: 12px;
            text-align: center;
            border: 2px solid #e2e8f0;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .pricing-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
        }
        
        .pricing-card.featured {
            border-color: #1a5f7a;
            transform: scale(1.05);
        }
        
        .pricing-card h3 {
            color: #1a5f7a;
            margin-bottom: 1rem;
        }
        
        .price {
            font-size: 2rem;
            font-weight: 700;
            color: #1a5f7a;
            margin-bottom: 1.5rem;
        }
        
        .pricing-card ul {
            list-style: none;
            margin-bottom: 2rem;
        }
        
        .pricing-card ul li {
            padding: 0.5rem 0;
            color: #666;
        }
        
        .pricing-card ul li:before {
            content: "✓";
            color: #1a5f7a;
            font-weight: bold;
            margin-right: 0.5rem;
        }
    `;

    document.head.appendChild(modalStyles);
    document.body.appendChild(modal);

    // Close modal functionality
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
    });

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });

    // Add event listeners to pricing buttons
    const pricingButtons = modal.querySelectorAll('.btn-primary');
    pricingButtons.forEach(button => {
        button.addEventListener('click', function() {
            const plan = this.getAttribute('data-plan');
            const amount = parseFloat(this.getAttribute('data-amount'));
            
            if (plan === 'free') {
                showNotification('Redirigiendo a búsqueda gratuita...', 'info');
                setTimeout(() => {
                    document.body.removeChild(modal);
                    showSearchModal();
                }, 1000);
            } else {
                showConektaPaymentModal(plan, amount);
            }
        });
    });
}

// Logo fallback handling
document.addEventListener('DOMContentLoaded', function() {
    const logoImages = document.querySelectorAll('.logo-image');
    
    logoImages.forEach(img => {
        img.addEventListener('error', function() {
            // Hide broken image
            this.style.display = 'none';
            // Show text fallback
            const logoContainer = this.closest('.logo');
            if (logoContainer) {
                logoContainer.classList.add('no-logo');
            }
        });
        
        img.addEventListener('load', function() {
            // Hide text fallback when logo loads successfully
            const logoContainer = this.closest('.logo');
            if (logoContainer) {
                logoContainer.classList.remove('no-logo');
            }
        });
    });
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Counter animation for trust section
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current);
                setTimeout(updateCounter, 20);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    });
}

// Trigger counter animation when trust section is visible
const trustSection = document.querySelector('.trust');
if (trustSection) {
    const trustObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                trustObserver.unobserve(entry.target);
            }
        });
    });
    
    trustObserver.observe(trustSection);
}

// FAQ Functionality
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
});

// Contact Form Functionality
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            formData.append('action', 'contact_form');
            const data = Object.fromEntries(formData);
            
            // Basic validation
            if (!data.firstName || !data.lastName || !data.email || !data.service || !data.message) {
                showNotification('Por favor completa todos los campos requeridos.', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                showNotification('Por favor ingresa un email válido.', 'error');
                return;
            }
            
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;
            
            // Submit to backend
            fetch('/.netlify/functions/api', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    action: 'contact_form',
                    ...data
                })
            })
            .then(response => response.json())
            .then(result => {
                if (result.success) {
                    showNotification(result.message, 'success');
                    contactForm.reset();
                } else {
                    showNotification(result.message || 'Error al enviar el mensaje.', 'error');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                showNotification('Error de conexión. Por favor intenta nuevamente.', 'error');
            })
            .finally(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
        });
    }
});

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add notification styles
    if (!document.querySelector('#notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 10000;
                max-width: 400px;
                animation: slideIn 0.3s ease;
            }
            
            .notification-content {
                display: flex;
                align-items: center;
                padding: 1rem;
                border-radius: 8px;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
                color: white;
            }
            
            .notification-success .notification-content {
                background: #10b981;
            }
            
            .notification-error .notification-content {
                background: #ef4444;
            }
            
            .notification-info .notification-content {
                background: #1a5f7a;
            }
            
            .notification-content i {
                margin-right: 0.75rem;
                font-size: 1.2rem;
            }
            
            .notification-content span {
                flex: 1;
                font-weight: 500;
            }
            
            .notification-close {
                background: none;
                border: none;
                color: white;
                font-size: 1.5rem;
                cursor: pointer;
                margin-left: 0.75rem;
                opacity: 0.8;
                transition: opacity 0.3s ease;
            }
            
            .notification-close:hover {
                opacity: 1;
            }
            
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(styles);
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Function to show search results
function showSearchResults(results) {
    // Create modal for results
    const modal = document.createElement('div');
    modal.className = 'search-results-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h2>Resultados de Búsqueda</h2>
            <div class="search-results">
                <div class="result-summary">
                    <h3>Resumen</h3>
                    <p><strong>Marca:</strong> ${results.trademark_name || 'N/A'}</p>
                    <p><strong>Nivel de Riesgo:</strong> ${results.risk_level || 'N/A'}/5</p>
                    <p><strong>Marcas Similares:</strong> ${results.similar_trademarks ? results.similar_trademarks.length : 0}</p>
                </div>
                
                ${results.similar_trademarks && results.similar_trademarks.length > 0 ? `
                <div class="similar-trademarks">
                    <h3>Marcas Similares Encontradas</h3>
                    <div class="trademark-list">
                        ${results.similar_trademarks.map(tm => `
                            <div class="trademark-item">
                                <h4>${tm.name || 'N/A'}</h4>
                                <p><strong>Titular:</strong> ${tm.owner || 'N/A'}</p>
                                <p><strong>Estado:</strong> ${tm.status || 'N/A'}</p>
                                <p><strong>Similitud:</strong> ${tm.similarity || 'N/A'}%</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
                ` : ''}
                
                <div class="recommendations">
                    <h3>Recomendaciones</h3>
                    <ul>
                        ${results.recommendations ? results.recommendations.map(rec => `<li>${rec}</li>`).join('') : '<li>No hay recomendaciones disponibles</li>'}
                    </ul>
                </div>
            </div>
        </div>
    `;
    
    // Add styles for search results modal
    const modalStyles = document.createElement('style');
    modalStyles.textContent = `
        .search-results-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
        }
        
        .search-results {
            max-height: 70vh;
            overflow-y: auto;
        }
        
        .result-summary {
            background: #f8f9fa;
            padding: 1.5rem;
            border-radius: 8px;
            margin-bottom: 2rem;
        }
        
        .result-summary h3 {
            color: #1a5f7a;
            margin-bottom: 1rem;
        }
        
        .similar-trademarks {
            margin-bottom: 2rem;
        }
        
        .similar-trademarks h3 {
            color: #1a5f7a;
            margin-bottom: 1rem;
        }
        
        .trademark-list {
            display: grid;
            gap: 1rem;
        }
        
        .trademark-item {
            background: white;
            padding: 1rem;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
        }
        
        .trademark-item h4 {
            color: #1a5f7a;
            margin-bottom: 0.5rem;
        }
        
        .trademark-item p {
            margin: 0.25rem 0;
            color: #666;
        }
        
        .recommendations {
            background: #e8f4f8;
            padding: 1.5rem;
            border-radius: 8px;
        }
        
        .recommendations h3 {
            color: #1a5f7a;
            margin-bottom: 1rem;
        }
        
        .recommendations ul {
            list-style: none;
            padding: 0;
        }
        
        .recommendations ul li {
            padding: 0.5rem 0;
            color: #333;
            position: relative;
            padding-left: 1.5rem;
        }
        
        .recommendations ul li:before {
            content: "→";
            color: #1a5f7a;
            position: absolute;
            left: 0;
            font-weight: bold;
        }
    `;
    
    document.head.appendChild(modalStyles);
    document.body.appendChild(modal);
    
    // Close modal functionality
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.addEventListener('click', () => {
        modal.remove();
    });
    
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.remove();
        }
    });
}

// Conekta Payment Modal
async function showConektaPaymentModal(plan, amount) {
    // Verificar que Conekta.js esté cargado
    if (typeof Conekta === 'undefined') {
        console.error('Conekta.js no está cargado');
        showNotification('Error: Conekta.js no está disponible. Recarga la página.', 'error');
        return;
    }
    
    // Obtener configuración de Conekta del backend
    let conektaConfig;
    try {
        const response = await fetch('/.netlify/functions/api', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                action: 'get_conekta_config'
            })
        });
        
        const result = await response.json();
        if (result.success) {
            conektaConfig = result;
        } else {
            throw new Error('Error al obtener configuración de Conekta');
        }
    } catch (error) {
        console.error('Error:', error);
        showNotification('Error al cargar configuración de pagos.', 'error');
        return;
    }

    const planNames = {
        'registro': 'Registro Completo de Marca',
        'consultoria': 'Consultoría Legal'
    };

    const modal = document.createElement('div');
    modal.className = 'conekta-payment-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <span class="close-modal">&times;</span>
                <h2>${planNames[plan]}</h2>
                <div class="amount-display">$${amount.toLocaleString('es-MX')} MXN</div>
                <div class="security-badge">Pago 100% seguro con Conekta</div>
            </div>
            
            <div class="modal-body">
                <div class="benefits-section">
                    <h4>Beneficios Incluidos</h4>
                    <div class="benefits-grid">
                        <div class="benefit-item">Reporte de riesgo detallado</div>
                        <div class="benefit-item">Respuesta en 24 horas</div>
                        <div class="benefit-item">Búsqueda exhaustiva IMPI</div>
                        <div class="benefit-item">Preparación de documentos</div>
                        <div class="benefit-item">Seguimiento completo</div>
                        <div class="benefit-item">Soporte legal especializado</div>
                    </div>
                </div>
                
                <form id="conektaPaymentForm">
                    <div class="form-section">
                        <h4>Información Personal</h4>
                        <div class="form-grid">
                            <div class="form-group">
                                <label for="customerName">Nombre Completo</label>
                                <input type="text" id="customerName" name="customerName" required>
                            </div>
                            <div class="form-group">
                                <label for="customerEmail">Correo Electrónico</label>
                                <input type="email" id="customerEmail" name="customerEmail" required>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="customerPhone">Teléfono</label>
                            <input type="tel" id="customerPhone" name="customerPhone" required>
                        </div>
                    </div>
                    
                    <div class="form-section payment-section">
                        <h4>Información de Pago</h4>
                        <div class="form-group">
                            <label for="cardNumber">Número de Tarjeta</label>
                            <input type="text" id="cardNumber" name="cardNumber" placeholder="1234 5678 9012 3456" required>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label for="cardExpiry">Fecha de Expiración</label>
                                <div class="expiry-inputs">
                                    <input type="text" id="expMonth" name="expMonth" placeholder="MM" maxlength="2" required>
                                    <span>/</span>
                                    <input type="text" id="expYear" name="expYear" placeholder="YY" maxlength="2" required>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="cardCvc">Código de Seguridad</label>
                                <input type="text" id="cardCvc" name="cardCvc" placeholder="123" maxlength="4" required>
                            </div>
                        </div>
                    </div>
                    
                    <button type="submit" class="payment-button">
                        Pagar $${amount.toLocaleString('es-MX')} MXN
                    </button>
                    
                    <div class="security-info">
                        <div class="security-badges">
                            <span>Pago 100% seguro</span>
                        </div>
                        <div>Tu información está protegida con encriptación SSL de 256 bits</div>
                    </div>
                </form>
            </div>
        </div>
    `;

    // Add Conekta payment modal styles
    const modalStyles = document.createElement('style');
    modalStyles.textContent = `
        .conekta-payment-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, rgba(44, 62, 80, 0.95), rgba(52, 73, 94, 0.95));
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            backdrop-filter: blur(10px);
        }
        
        .modal-content {
            background: linear-gradient(145deg, #ffffff, #f8f9fa);
            border-radius: 20px;
            width: 95%;
            max-width: 600px;
            max-height: 95vh;
            overflow: hidden;
            box-shadow: 0 25px 80px rgba(0, 0, 0, 0.4);
            border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .modal-header {
            background: linear-gradient(135deg, #2c3e50, #34495e);
            padding: 25px 30px;
            color: white;
            text-align: center;
            position: relative;
        }
        
        .modal-header h2 {
            margin: 0 0 10px 0;
            font-size: 28px;
            font-weight: 800;
            text-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }
        
        .amount-display {
            font-size: 36px;
            font-weight: 900;
            color: #f39c12;
            margin: 10px 0;
            text-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }
        
        .security-badge {
            color: rgba(255, 255, 255, 0.8);
            font-size: 14px;
            margin-top: 10px;
        }
        
        .close-modal {
            position: absolute;
            top: 20px;
            right: 25px;
            background: rgba(255, 255, 255, 0.2);
            border: none;
            font-size: 20px;
            cursor: pointer;
            color: white;
            width: 35px;
            height: 35px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: all 0.3s ease;
            backdrop-filter: blur(10px);
        }
        
        .close-modal:hover {
            background: rgba(255,255,255,0.3);
            transform: scale(1.1);
        }
        
        .modal-body {
            padding: 30px;
            max-height: 70vh;
            overflow-y: auto;
        }
        
        .benefits-section {
            background: linear-gradient(135deg, #e8f5e8, #f0f9f0);
            padding: 25px;
            border-radius: 15px;
            margin-bottom: 25px;
            border-left: 5px solid #27ae60;
            box-shadow: 0 4px 15px rgba(39, 174, 96, 0.1);
        }
        
        .benefits-section h4 {
            margin: 0 0 20px 0;
            color: #2c3e50;
            font-size: 18px;
            display: flex;
            align-items: center;
        }
        
        .benefits-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
        }
        
        .benefit-item {
            display: flex;
            align-items: center;
            color: #34495e;
            font-size: 14px;
        }
        
        .benefit-item::before {
            content: "✓";
            color: #27ae60;
            margin-right: 8px;
            font-weight: bold;
        }
        
        .form-section {
            background: linear-gradient(135deg, #f8f9fa, #ffffff);
            padding: 25px;
            border-radius: 15px;
            border: 2px solid #e9ecef;
            box-shadow: 0 4px 15px rgba(0,0,0,0.05);
            margin-bottom: 20px;
        }
        
        .form-section h4 {
            margin: 0 0 20px 0;
            color: #2c3e50;
            font-size: 18px;
            display: flex;
            align-items: center;
        }
        
        .payment-section {
            background: linear-gradient(135deg, #fff8f0, #fff5e6);
            border: 2px solid #ffeaa7;
            box-shadow: 0 4px 15px rgba(243, 156, 18, 0.1);
        }
        
        .form-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin-bottom: 20px;
        }
        
        .form-group {
            margin-bottom: 20px;
        }
        
        .form-group label {
            display: block;
            margin-bottom: 8px;
            color: #2c3e50;
            font-weight: 600;
            font-size: 14px;
        }
        
        .form-group input {
            width: 100%;
            padding: 15px;
            border: 2px solid #e0e0e0;
            border-radius: 12px;
            font-size: 15px;
            transition: all 0.3s ease;
            box-sizing: border-box;
            background: white;
        }
        
        .form-group input:focus {
            border-color: #3498db;
            box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
            outline: none;
        }
        
        .payment-section .form-group input:focus {
            border-color: #f39c12;
            box-shadow: 0 0 0 3px rgba(243, 156, 18, 0.1);
        }
        
        .form-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
        }
        
        .expiry-inputs {
            display: flex;
            gap: 10px;
            align-items: center;
        }
        
        .expiry-inputs input {
            flex: 1;
            text-align: center;
        }
        
        .expiry-inputs span {
            color: #7f8c8d;
            font-size: 18px;
            font-weight: bold;
        }
        
        #cardNumber {
            letter-spacing: 1px;
            font-family: monospace;
        }
        
        .payment-button {
            background: linear-gradient(135deg, #27ae60, #2ecc71);
            color: white;
            padding: 20px;
            border: none;
            border-radius: 15px;
            font-size: 20px;
            font-weight: 800;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 8px 25px rgba(39, 174, 96, 0.3);
            margin-top: 10px;
            text-transform: uppercase;
            letter-spacing: 1px;
            width: 100%;
            position: relative;
            overflow: hidden;
        }
        
        .payment-button:hover {
            transform: translateY(-3px);
            box-shadow: 0 12px 35px rgba(39, 174, 96, 0.4);
        }
        
        .payment-button::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
            transition: left 0.5s;
        }
        
        .payment-button:hover::before {
            left: 100%;
        }
        
        .security-info {
            text-align: center;
            color: #7f8c8d;
            font-size: 12px;
            margin-top: 15px;
            padding: 15px;
            background: rgba(127, 140, 141, 0.1);
            border-radius: 10px;
        }
        
        .security-badges {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            margin-bottom: 5px;
        }
        
        .security-badges span:nth-child(1),
        .security-badges span:nth-child(3) {
            color: #27ae60;
        }
        
        @media (max-width: 768px) {
            .modal-content {
                width: 98%;
                margin: 10px;
            }
            
            .benefits-grid {
                grid-template-columns: 1fr;
            }
            
            .form-grid {
                grid-template-columns: 1fr;
            }
            
            .form-row {
                grid-template-columns: 1fr;
            }
        }
    `;

    document.head.appendChild(modalStyles);
    document.body.appendChild(modal);

    // Close modal functionality
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });

    // Handle form submission
    const form = modal.querySelector('#conektaPaymentForm');
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Validate form
        const requiredFields = {
            'Nombre Completo': data.customerName,
            'Correo Electrónico': data.customerEmail,
            'Teléfono': data.customerPhone,
            'Número de Tarjeta': data.cardNumber,
            'Mes de Expiración': data.expMonth,
            'Año de Expiración': data.expYear,
            'Código de Seguridad': data.cardCvc
        };
        
        const missingFields = Object.entries(requiredFields)
            .filter(([field, value]) => !value || value.trim() === '')
            .map(([field]) => field);
        
        if (missingFields.length > 0) {
            showNotification(`Por favor completa: ${missingFields.join(', ')}`, 'error');
            return;
        }
        
        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Procesando pago...';
        submitBtn.disabled = true;
        
        try {
            // Create Conekta token
            const tokenId = await createConektaToken(data);
            
            // Process payment
            const paymentData = {
                amount: amount,
                currency: 'MXN',
                description: planNames[plan],
                customer: {
                    name: data.customerName,
                    email: data.customerEmail,
                    phone: data.customerPhone
                },
                paymentMethod: {
                    type: 'card',
                    tokenId: tokenId
                },
                service: plan
            };
            
            const response = await fetch('/.netlify/functions/api', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    action: 'conekta_payment',
                    ...paymentData
                })
            });
            
            const result = await response.json();
            
            if (result.success) {
                showNotification(`¡Pago exitoso! ID: ${result.paymentId}`, 'success');
                setTimeout(() => {
                    document.body.removeChild(modal);
                    // Opcional: Redirigir a página de confirmación
                    // window.location.href = '/confirmacion.html';
                }, 3000);
            } else {
                showNotification(result.error || 'Error al procesar el pago.', 'error');
            }
        } catch (error) {
            console.error('Error:', error);
            showNotification('Error de conexión. Por favor intenta nuevamente.', 'error');
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}

// Create Conekta token using Conekta.js
async function createConektaToken(cardData) {
    return new Promise((resolve, reject) => {
        // Check if Conekta is loaded
        if (typeof Conekta === 'undefined') {
            console.error('Conekta.js no está cargado');
            reject(new Error('Conekta.js no está disponible'));
            return;
        }
        
        try {
            // Initialize Conekta with public key
            Conekta.setPublicKey('key_JBz73eqOQwH5gRgim311F52');
            
            // Create token with card data
            Conekta.Token.create({
                card: {
                    number: cardData.cardNumber.replace(/\s/g, ''),
                    name: cardData.customerName,
                    cvc: cardData.cardCvc,
                    exp_month: cardData.expMonth,
                    exp_year: '20' + cardData.expYear
                }
            }, function(token) {
                console.log('Token created successfully:', token.id);
                resolve(token.id);
            }, function(error) {
                console.error('Error creating token:', error);
                reject(error);
            });
        } catch (error) {
            console.error('Error initializing Conekta:', error);
            reject(error);
        }
    });
}

// Modal para Declaración de Uso
function showDeclarationModal() {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>Declaración de Uso</h2>
                <button class="close-modal">&times;</button>
            </div>
            <div class="modal-body">
                <div class="service-info">
                    <h3>Servicio: Declaración de Uso</h3>
                    <p class="price-info">Precio: $1,100 MXN + IVA</p>
                    <p class="price-note">(Tarifa IMPI: $985)</p>
                </div>
                <form id="declarationForm">
                    <div class="form-group">
                        <label for="declarationName">Nombre completo:</label>
                        <input type="text" id="declarationName" name="name" required>
                    </div>
                    <div class="form-group">
                        <label for="declarationEmail">Email:</label>
                        <input type="email" id="declarationEmail" name="email" required>
                    </div>
                    <div class="form-group">
                        <label for="declarationPhone">Teléfono:</label>
                        <input type="tel" id="declarationPhone" name="phone" required>
                    </div>
                    <div class="form-group">
                        <label for="declarationMarca">Marca a declarar:</label>
                        <input type="text" id="declarationMarca" name="marca" required>
                    </div>
                    <div class="form-group">
                        <label for="declarationRegistro">Número de registro IMPI:</label>
                        <input type="text" id="declarationRegistro" name="registro" required>
                    </div>
                    <div class="form-group">
                        <label for="declarationMensaje">Mensaje adicional:</label>
                        <textarea id="declarationMensaje" name="mensaje" rows="4"></textarea>
                    </div>
                    <button type="submit" class="btn-primary">Solicitar Declaración</button>
                </form>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Close modal functionality
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
    });

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });

    // Handle form submission
    const form = modal.querySelector('#declarationForm');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Enviando solicitud...';
        submitBtn.disabled = true;
        
        try {
            const response = await fetch('/.netlify/functions/api', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    action: 'contact_form',
                    service: 'declaracion_uso',
                    ...data
                })
            });
            
            const result = await response.json();
            
            if (result.success) {
                showNotification('Solicitud enviada exitosamente. Te contactaremos pronto.', 'success');
                setTimeout(() => {
                    document.body.removeChild(modal);
                }, 2000);
            } else {
                showNotification(result.error || 'Error al enviar la solicitud.', 'error');
            }
        } catch (error) {
            console.error('Error:', error);
            showNotification('Error de conexión. Por favor intenta nuevamente.', 'error');
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}

// Modal para Respuesta a Requerimientos IMPI
function showRequirementsModal() {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>Respuesta a Requerimientos IMPI</h2>
                <button class="close-modal">&times;</button>
            </div>
            <div class="modal-body">
                <div class="service-info">
                    <h3>Servicio: Respuesta a Requerimientos</h3>
                    <p class="price-info">Precio: $1,200 - $2,500 MXN + IVA</p>
                    <p class="price-note">(Tarifa IMPI: $377.89)</p>
                    <p class="service-description">El precio varía según la complejidad del requerimiento.</p>
                </div>
                <form id="requirementsForm">
                    <div class="form-group">
                        <label for="requirementsName">Nombre completo:</label>
                        <input type="text" id="requirementsName" name="name" required>
                    </div>
                    <div class="form-group">
                        <label for="requirementsEmail">Email:</label>
                        <input type="email" id="requirementsEmail" name="email" required>
                    </div>
                    <div class="form-group">
                        <label for="requirementsPhone">Teléfono:</label>
                        <input type="tel" id="requirementsPhone" name="phone" required>
                    </div>
                    <div class="form-group">
                        <label for="requirementsMarca">Marca afectada:</label>
                        <input type="text" id="requirementsMarca" name="marca" required>
                    </div>
                    <div class="form-group">
                        <label for="requirementsTipo">Tipo de requerimiento:</label>
                        <select id="requirementsTipo" name="tipo" required>
                            <option value="">Selecciona el tipo</option>
                            <option value="oficio">Oficio de observaciones</option>
                            <option value="requerimiento">Requerimiento de información</option>
                            <option value="suspension">Suspensión de trámite</option>
                            <option value="otro">Otro</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="requirementsDescripcion">Descripción del requerimiento:</label>
                        <textarea id="requirementsDescripcion" name="descripcion" rows="4" required></textarea>
                    </div>
                    <div class="form-group">
                        <label for="requirementsMensaje">Información adicional:</label>
                        <textarea id="requirementsMensaje" name="mensaje" rows="3"></textarea>
                    </div>
                    <button type="submit" class="btn-primary">Consultar Requerimiento</button>
                </form>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Close modal functionality
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
    });

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });

    // Handle form submission
    const form = modal.querySelector('#requirementsForm');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Enviando consulta...';
        submitBtn.disabled = true;
        
        try {
            const response = await fetch('/.netlify/functions/api', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    action: 'contact_form',
                    service: 'respuesta_requerimientos',
                    ...data
                })
            });
            
            const result = await response.json();
            
            if (result.success) {
                showNotification('Consulta enviada exitosamente. Te contactaremos para evaluar el requerimiento.', 'success');
                setTimeout(() => {
                    document.body.removeChild(modal);
                }, 2000);
            } else {
                showNotification(result.error || 'Error al enviar la consulta.', 'error');
            }
        } catch (error) {
            console.error('Error:', error);
            showNotification('Error de conexión. Por favor intenta nuevamente.', 'error');
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
} 

// Modal para Oposición a Marcas
function showOppositionModal() {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>Oposición a Marcas</h2>
                <button class="close-modal">&times;</button>
            </div>
            <div class="modal-body">
                <div class="service-info">
                    <h3>Servicio: Oposición a Marcas</h3>
                    <p class="price-info">Precio: $8,999 MXN + IVA</p>
                </div>
                <form id="oppositionForm">
                    <div class="form-group">
                        <label for="oppositionName">Nombre completo:</label>
                        <input type="text" id="oppositionName" name="name" required>
                    </div>
                    <div class="form-group">
                        <label for="oppositionEmail">Email:</label>
                        <input type="email" id="oppositionEmail" name="email" required>
                    </div>
                    <div class="form-group">
                        <label for="oppositionPhone">Teléfono:</label>
                        <input type="tel" id="oppositionPhone" name="phone" required>
                    </div>
                    <div class="form-group">
                        <label for="oppositionMarca">Tu marca registrada:</label>
                        <input type="text" id="oppositionMarca" name="marca" required>
                    </div>
                    <div class="form-group">
                        <label for="oppositionSolicitud">Marca a oponerse:</label>
                        <input type="text" id="oppositionSolicitud" name="solicitud" required>
                    </div>
                    <div class="form-group">
                        <label for="oppositionMotivos">Motivos de oposición:</label>
                        <textarea id="oppositionMotivos" name="motivos" rows="4" required></textarea>
                    </div>
                    <div class="form-group">
                        <label for="oppositionMensaje">Información adicional:</label>
                        <textarea id="oppositionMensaje" name="mensaje" rows="3"></textarea>
                    </div>
                    <button type="submit" class="btn-primary">Solicitar Oposición</button>
                </form>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Close modal functionality
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
    });

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });

    // Handle form submission
    const form = modal.querySelector('#oppositionForm');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Enviando solicitud...';
        submitBtn.disabled = true;
        
        try {
            const response = await fetch('/.netlify/functions/api', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    action: 'contact_form',
                    service: 'oposicion_marcas',
                    ...data
                })
            });
            
            const result = await response.json();
            
            if (result.success) {
                showNotification('Solicitud enviada exitosamente. Te contactaremos pronto.', 'success');
                setTimeout(() => {
                    document.body.removeChild(modal);
                }, 2000);
            } else {
                showNotification(result.error || 'Error al enviar la solicitud.', 'error');
            }
        } catch (error) {
            console.error('Error:', error);
            showNotification('Error de conexión. Por favor intenta nuevamente.', 'error');
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}

// Modal para Registro Internacional
function showInternationalModal() {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>Registro Internacional</h2>
                <button class="close-modal">&times;</button>
            </div>
            <div class="modal-body">
                <div class="service-info">
                    <h3>Servicio: Registro Internacional</h3>
                    <p class="price-info">Precio: $12,999 MXN + IVA</p>
                    <p class="service-description">Protección de tu marca en múltiples países.</p>
                </div>
                <form id="internationalForm">
                    <div class="form-group">
                        <label for="internationalName">Nombre completo:</label>
                        <input type="text" id="internationalName" name="name" required>
                    </div>
                    <div class="form-group">
                        <label for="internationalEmail">Email:</label>
                        <input type="email" id="internationalEmail" name="email" required>
                    </div>
                    <div class="form-group">
                        <label for="internationalPhone">Teléfono:</label>
                        <input type="tel" id="internationalPhone" name="phone" required>
                    </div>
                    <div class="form-group">
                        <label for="internationalMarca">Marca a registrar:</label>
                        <input type="text" id="internationalMarca" name="marca" required>
                    </div>
                    <div class="form-group">
                        <label for="internationalPaises">Países de interés:</label>
                        <textarea id="internationalPaises" name="paises" rows="3" placeholder="Ej: Estados Unidos, Canadá, España, Francia..." required></textarea>
                    </div>
                    <div class="form-group">
                        <label for="internationalProductos">Productos/servicios:</label>
                        <textarea id="internationalProductos" name="productos" rows="3" required></textarea>
                    </div>
                    <div class="form-group">
                        <label for="internationalMensaje">Información adicional:</label>
                        <textarea id="internationalMensaje" name="mensaje" rows="3"></textarea>
                    </div>
                    <button type="submit" class="btn-primary">Consultar Registro</button>
                </form>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Close modal functionality
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
    });

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });

    // Handle form submission
    const form = modal.querySelector('#internationalForm');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Enviando consulta...';
        submitBtn.disabled = true;
        
        try {
            const response = await fetch('/.netlify/functions/api', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    action: 'contact_form',
                    service: 'registro_internacional',
                    ...data
                })
            });
            
            const result = await response.json();
            
            if (result.success) {
                showNotification('Consulta enviada exitosamente. Te contactaremos para evaluar tu registro internacional.', 'success');
                setTimeout(() => {
                    document.body.removeChild(modal);
                }, 2000);
            } else {
                showNotification(result.error || 'Error al enviar la consulta.', 'error');
            }
        } catch (error) {
            console.error('Error:', error);
            showNotification('Error de conexión. Por favor intenta nuevamente.', 'error');
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
} 

// Modal para Constitución de Empresa SAS
function showConstitutionModal() {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>Constitución de Empresa SAS</h2>
                <button class="close-modal">&times;</button>
            </div>
            <div class="modal-body">
                <div class="service-info">
                    <h3>Servicio: Constitución SAS 100% en Línea</h3>
                    <p class="price-info">Precio: Desde $2,999 MXN + IVA</p>
                    <p class="service-description">Constitución de Sociedad por Acciones Simplificada de forma rápida y segura.</p>
                </div>
                <form id="constitutionForm">
                    <div class="form-group">
                        <label for="constitutionName">Nombre completo:</label>
                        <input type="text" id="constitutionName" name="name" required>
                    </div>
                    <div class="form-group">
                        <label for="constitutionEmail">Email:</label>
                        <input type="email" id="constitutionEmail" name="email" required>
                    </div>
                    <div class="form-group">
                        <label for="constitutionPhone">Teléfono:</label>
                        <input type="tel" id="constitutionPhone" name="phone" required>
                    </div>
                    <div class="form-group">
                        <label for="constitutionEmpresa">Nombre de la empresa:</label>
                        <input type="text" id="constitutionEmpresa" name="empresa" required>
                    </div>
                    <div class="form-group">
                        <label for="constitutionSocios">Número de socios:</label>
                        <select id="constitutionSocios" name="socios" required>
                            <option value="">Seleccionar</option>
                            <option value="1">1 socio</option>
                            <option value="2">2 socios</option>
                            <option value="3">3 socios</option>
                            <option value="4">4 socios</option>
                            <option value="5+">5 o más socios</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="constitutionActividad">Actividad económica principal:</label>
                        <textarea id="constitutionActividad" name="actividad" rows="3" placeholder="Describe la actividad principal de tu empresa..." required></textarea>
                    </div>
                    <div class="form-group">
                        <label for="constitutionPlan">Plan de servicio:</label>
                        <select id="constitutionPlan" name="plan" required>
                            <option value="">Seleccionar plan</option>
                            <option value="basico">Proceso 100% Digital - $2,999</option>
                            <option value="express">Constitución Express - $4,999</option>
                            <option value="completo">Paquete Completo - $8,999</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="constitutionMensaje">Información adicional:</label>
                        <textarea id="constitutionMensaje" name="mensaje" rows="3"></textarea>
                    </div>
                    <button type="submit" class="btn-primary">Comenzar Constitución</button>
                </form>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Close modal functionality
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
    });

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });

    // Handle form submission
    const form = modal.querySelector('#constitutionForm');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Enviando solicitud...';
        submitBtn.disabled = true;
        
        try {
            const response = await fetch('/.netlify/functions/api', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    action: 'contact_form',
                    service: 'constitucion_sas',
                    ...data
                })
            });
            
            const result = await response.json();
            
            if (result.success) {
                showNotification('Solicitud enviada exitosamente. Te contactaremos para continuar con la constitución de tu empresa.', 'success');
                setTimeout(() => {
                    document.body.removeChild(modal);
                }, 2000);
            } else {
                showNotification(result.error || 'Error al enviar la solicitud.', 'error');
            }
        } catch (error) {
            console.error('Error:', error);
            showNotification('Error de conexión. Por favor intenta nuevamente.', 'error');
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
} 