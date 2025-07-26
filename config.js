// Configuración de Sinapsis Legal
// Modifica estos valores para personalizar el sitio web

const CONFIG = {
    // Información de la empresa
    company: {
        name: "Sinapsis Legal",
        tagline: "Especialistas en registro de marcas ante el IMPI",
        description: "Registro de marcas en México ante el IMPI. Servicios legales especializados en propiedad intelectual.",
        phone: "+52 (55) 1234-5678",
        email: "contacto@sinapsislegal.com",
        address: "Ciudad de México, México",
        website: "https://www.sinapsislegal.com"
    },

    // Colores del sitio
    colors: {
        primary: "#1a5f7a",
        secondary: "#2c8ba8",
        accent: "#f8fafc",
        text: "#333333",
        textLight: "#666666",
        white: "#ffffff",
        dark: "#1a1a1a"
    },

    // Precios de servicios
    pricing: {
        basicSearch: {
            name: "Búsqueda Básica",
            price: "Gratis",
            currency: "MXN",
            description: "Evaluación inicial de tu marca"
        },
        completeRegistration: {
            name: "Registro Completo",
            price: "8,500",
            currency: "MXN",
            description: "Registro completo ante el IMPI"
        },
        consultation: {
            name: "Consultoría Especializada",
            price: "2,500",
            currency: "MXN",
            description: "Asesoría legal personalizada"
        },
        additionalServices: {
            renewal: {
                name: "Renovación de Marcas",
                price: "3,500",
                currency: "MXN"
            },
            legalDefense: {
                name: "Defensa Legal",
                price: "5,000",
                currency: "MXN"
            },
            international: {
                name: "Registro Internacional",
                price: "15,000",
                currency: "MXN",
                note: "Desde"
            },
            monitoring: {
                name: "Vigilancia de Marcas",
                price: "1,500",
                currency: "MXN",
                period: "/mes"
            }
        }
    },

    // Servicios principales
    services: [
        {
            icon: "fas fa-gavel",
            title: "Abogados Mexicanos Especializados",
            description: "Hemos registrado miles de marcas para empresas de todos los tamaños. Representamos clientes en toda la República Mexicana y alrededor del mundo.",
            link: "#nosotros"
        },
        {
            icon: "fas fa-robot",
            title: "Búsqueda de Marcas con IA",
            description: "Las búsquedas de marcas potenciadas por inteligencia artificial son más rápidas, precisas y detectan más problemas que cualquier abogado solo.",
            link: "#"
        },
        {
            icon: "fas fa-search",
            title: "Búsqueda Gratuita Antes de Empezar",
            description: "Obtén una evaluación de riesgo gratuita antes de registrarte y pagar por servicios. Te respondemos con tus resultados en un día hábil.",
            link: "#"
        }
    ],

    // Testimonios
    testimonials: [
        {
            text: "Ha sido realmente fácil usar este servicio para registrar mi marca. Han sido excelentes respondiendo preguntas.",
            author: "Ana Ouzoonian",
            position: "Fundadora, MoodConnect LLC"
        },
        {
            text: "Siempre servicio súper rápido - ¡gracias!",
            author: "Luis Knowler",
            position: "CEO, Distinctive Wash Ltd."
        },
        {
            text: "He estado trabajando con ellos por un año. Mi registro de marca fue suave y rápido. Bien organizado y rápido para responder.",
            author: "Aasma Aziz",
            position: "Fundadora, Aasma's Dream"
        },
        {
            text: "Te agradezco mucho tu atención pronta al manejar mi renovación de marca. Mucho respeto por tu profesionalismo.",
            author: "Paulina Morales",
            position: "CEO, Mabrak Music, Inc."
        }
    ],

    // Artículos del blog
    blogPosts: [
        {
            icon: "fas fa-shopping-cart",
            title: "Consultas de marcas para negocios de e-commerce",
            description: "Guía completa para proteger tu marca en el comercio electrónico."
        },
        {
            icon: "fas fa-leaf",
            title: "Registro de marcas veganas: guía para nuevas marcas",
            description: "Todo lo que necesitas saber sobre marcas en la industria vegana."
        },
        {
            icon: "fas fa-gem",
            title: "Por qué la protección de marca es crucial para diseñadores de joyería",
            description: "Protege tus diseños únicos en la industria de la joyería."
        }
    ],

    // Preguntas frecuentes
    faqs: [
        {
            question: "¿Cuánto tiempo toma el registro de una marca?",
            answer: "El proceso completo ante el IMPI toma aproximadamente 6-8 meses, dependiendo de la complejidad del caso y si hay oposiciones."
        },
        {
            question: "¿Qué incluye el precio del registro completo?",
            answer: "Incluye búsqueda exhaustiva, preparación de documentos, presentación ante el IMPI, seguimiento del trámite y respuesta a oficios oficiales."
        },
        {
            question: "¿Puedo registrar mi marca en múltiples clases?",
            answer: "Sí, cada clase adicional tiene un costo adicional de $1,500 MXN por clase."
        },
        {
            question: "¿Qué pasa si mi marca es rechazada?",
            answer: "Te ayudamos a analizar las razones del rechazo y a preparar una respuesta o modificación de la solicitud sin costo adicional."
        }
    ],

    // Redes sociales
    socialMedia: {
        facebook: "https://facebook.com/sinapsislegal",
        twitter: "https://twitter.com/sinapsislegal",
        linkedin: "https://linkedin.com/company/sinapsislegal",
        instagram: "https://instagram.com/sinapsislegal"
    },

    // Configuración del sitio
    site: {
        title: "Sinapsis Legal - Registro de Marcas en México | IMPI",
        description: "Registro de marcas en México ante el IMPI. Servicios legales especializados en propiedad intelectual. Consulta gratuita.",
        keywords: "registro de marcas, IMPI, propiedad intelectual, marcas México, abogados marcas",
        language: "es",
        timezone: "America/Mexico_City"
    },

    // Configuración de formularios
    forms: {
        searchForm: {
            fields: [
                { name: "companyName", label: "Nombre de la Empresa", type: "text", required: true },
                { name: "trademarkName", label: "Nombre de la Marca", type: "text", required: true },
                { name: "email", label: "Correo Electrónico", type: "email", required: true },
                { name: "phone", label: "Teléfono", type: "tel", required: false },
                { name: "description", label: "Descripción del Producto/Servicio", type: "textarea", required: true }
            ]
        }
    },

    // Configuración de animaciones
    animations: {
        enabled: true,
        duration: 600,
        easing: "ease"
    },

    // Configuración de contacto
    contact: {
        officeHours: "Lunes a Viernes: 9:00 AM - 6:00 PM",
        emergencyPhone: "+52 (55) 1234-5678",
        supportEmail: "soporte@sinapsislegal.com"
    }
};

// Exportar configuración para uso en otros archivos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
} else {
    window.CONFIG = CONFIG;
} 