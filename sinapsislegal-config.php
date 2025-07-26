<?php
/**
 * Configuración Específica para sinapsislegal.com
 * Archivo de configuración para el dominio principal
 */

// Configuración del dominio
define('DOMAIN_NAME', 'sinapsislegal.com');
define('SITE_URL', 'https://sinapsislegal.com');
define('ADMIN_URL', 'https://sinapsislegal.com/backend/admin/');

// Configuración de email del dominio
define('CONTACT_EMAIL', 'contacto@sinapsislegal.com');
define('ADMIN_EMAIL', 'admin@sinapsislegal.com');
define('SUPPORT_EMAIL', 'soporte@sinapsislegal.com');
define('DMARC_EMAIL', 'dmarc@sinapsislegal.com');

// Configuración de redes sociales
define('FACEBOOK_URL', 'https://facebook.com/sinapsislegal');
define('TWITTER_URL', 'https://twitter.com/sinapsislegal');
define('LINKEDIN_URL', 'https://linkedin.com/company/sinapsislegal');
define('INSTAGRAM_URL', 'https://instagram.com/sinapsislegal');

// Configuración de Google Services
define('GOOGLE_ANALYTICS_ID', 'G-XXXXXXXXXX'); // Reemplazar con ID real
define('GOOGLE_TAG_MANAGER_ID', 'GTM-XXXXXXX'); // Reemplazar con ID real
define('GOOGLE_SEARCH_CONSOLE_VERIFICATION', 'verification_code'); // Reemplazar con código real

// Configuración de Facebook Pixel
define('FACEBOOK_PIXEL_ID', 'XXXXXXXXXX'); // Reemplazar con ID real

// Configuración de WhatsApp Business
define('WHATSAPP_NUMBER', '+525512345678'); // Reemplazar con número real
define('WHATSAPP_MESSAGE', 'Hola, me interesa el registro de marcas');

// Configuración de ubicación
define('OFFICE_ADDRESS', 'Av. Insurgentes Sur 1234, Col. Del Valle, CDMX');
define('OFFICE_PHONE', '+52 (55) 1234-5678');
define('OFFICE_HOURS', 'Lunes a Viernes: 9:00 AM - 6:00 PM');

// Configuración de servicios y precios
$SERVICES_CONFIG = [
    'basic_search' => [
        'name' => 'Búsqueda Básica',
        'price' => 0,
        'currency' => 'MXN',
        'description' => 'Búsqueda inicial de marca en bases de datos del IMPI',
        'features' => [
            'Búsqueda inicial',
            'Reporte básico',
            'Respuesta en 24h'
        ]
    ],
    'complete_registration' => [
        'name' => 'Registro Completo',
        'price' => 8500,
        'currency' => 'MXN',
        'description' => 'Registro completo de marca ante el IMPI',
        'features' => [
            'Búsqueda exhaustiva',
            'Preparación de documentos',
            'Presentación ante IMPI',
            'Seguimiento completo'
        ]
    ],
    'consultation' => [
        'name' => 'Consultoría Especializada',
        'price' => 2500,
        'currency' => 'MXN',
        'description' => 'Asesoría legal personalizada',
        'features' => [
            'Asesoría legal',
            'Revisión de documentos',
            'Estrategia de protección'
        ]
    ],
    'renewal' => [
        'name' => 'Renovación de Marcas',
        'price' => 3500,
        'currency' => 'MXN',
        'description' => 'Renovación de registros de marca',
        'features' => [
            'Verificación de vencimiento',
            'Preparación de renovación',
            'Presentación ante IMPI'
        ]
    ],
    'legal_defense' => [
        'name' => 'Defensa Legal',
        'price' => 5000,
        'currency' => 'MXN',
        'description' => 'Representación en oposiciones y cancelaciones',
        'features' => [
            'Análisis del caso',
            'Preparación de defensa',
            'Representación legal'
        ]
    ],
    'international' => [
        'name' => 'Registro Internacional',
        'price' => 15000,
        'currency' => 'MXN',
        'description' => 'Registro de marcas en otros países',
        'features' => [
            'Análisis de jurisdicciones',
            'Preparación de solicitudes',
            'Coordinación internacional'
        ]
    ],
    'monitoring' => [
        'name' => 'Vigilancia de Marcas',
        'price' => 1500,
        'currency' => 'MXN',
        'description' => 'Monitoreo de marcas similares',
        'features' => [
            'Monitoreo continuo',
            'Alertas automáticas',
            'Reportes mensuales'
        ]
    ]
];

// Configuración de SEO
$SEO_CONFIG = [
    'title' => 'Sinapsis Legal - Especialistas en Registro de Marcas ante el IMPI',
    'description' => 'Somos especialistas en registro de marcas ante el IMPI. Búsqueda gratuita, registro completo y asesoría legal especializada. Protege tu marca en México.',
    'keywords' => 'registro de marcas, IMPI, marcas comerciales, propiedad intelectual, México, búsqueda de marcas, consultoría legal',
    'author' => 'Sinapsis Legal',
    'robots' => 'index, follow',
    'canonical' => SITE_URL,
    'og_title' => 'Sinapsis Legal - Registro de Marcas IMPI',
    'og_description' => 'Especialistas en registro de marcas ante el IMPI. Búsqueda gratuita y registro completo.',
    'og_image' => SITE_URL . '/images/og-image.jpg',
    'og_type' => 'website',
    'twitter_card' => 'summary_large_image',
    'twitter_site' => '@sinapsislegal'
];

// Configuración de contenido
$CONTENT_CONFIG = [
    'hero_title' => 'Protege tu Marca en México',
    'hero_subtitle' => 'Especialistas en registro de marcas ante el IMPI. Búsqueda gratuita y registro completo.',
    'hero_cta' => 'Búsqueda Gratuita',
    'hero_cta_secondary' => 'Ver Precios',
    
    'trust_title' => '¿Por qué elegir Sinapsis Legal?',
    'trust_subtitle' => 'Más de 500 marcas registradas exitosamente',
    
    'features_title' => 'Nuestros Servicios',
    'features_subtitle' => 'Soluciones completas para la protección de tu marca',
    
    'testimonials_title' => 'Lo que dicen nuestros clientes',
    'testimonials_subtitle' => 'Experiencias reales de empresas que confían en nosotros',
    
    'cta_title' => '¿Listo para proteger tu marca?',
    'cta_subtitle' => 'Comienza con una búsqueda gratuita y descubre si tu marca está disponible',
    'cta_button' => 'Comenzar Ahora',
    
    'blog_title' => 'Blog Legal',
    'blog_subtitle' => 'Artículos y noticias sobre propiedad intelectual',
    
    'footer_description' => 'Sinapsis Legal es una firma especializada en registro de marcas ante el IMPI. Protegemos tu propiedad intelectual con profesionalismo y experiencia.'
];

// Configuración de contactos
$CONTACTS_CONFIG = [
    'phone' => '+52 (55) 1234-5678',
    'whatsapp' => '+52 55 1234-5678',
    'email' => 'contacto@sinapsislegal.com',
    'address' => 'Av. Insurgentes Sur 1234, Col. Del Valle, CDMX',
    'hours' => 'Lunes a Viernes: 9:00 AM - 6:00 PM',
    'emergency_phone' => '+52 55 9876-5432'
];

// Configuración de redes sociales
$SOCIAL_CONFIG = [
    'facebook' => [
        'url' => 'https://facebook.com/sinapsislegal',
        'icon' => 'fab fa-facebook-f',
        'name' => 'Facebook'
    ],
    'twitter' => [
        'url' => 'https://twitter.com/sinapsislegal',
        'icon' => 'fab fa-twitter',
        'name' => 'Twitter'
    ],
    'linkedin' => [
        'url' => 'https://linkedin.com/company/sinapsislegal',
        'icon' => 'fab fa-linkedin-in',
        'name' => 'LinkedIn'
    ],
    'instagram' => [
        'url' => 'https://instagram.com/sinapsislegal',
        'icon' => 'fab fa-instagram',
        'name' => 'Instagram'
    ],
    'youtube' => [
        'url' => 'https://youtube.com/@sinapsislegal',
        'icon' => 'fab fa-youtube',
        'name' => 'YouTube'
    ]
];

// Configuración de tracking
$TRACKING_CONFIG = [
    'google_analytics' => [
        'enabled' => true,
        'id' => GOOGLE_ANALYTICS_ID,
        'debug' => false
    ],
    'google_tag_manager' => [
        'enabled' => true,
        'id' => GOOGLE_TAG_MANAGER_ID
    ],
    'facebook_pixel' => [
        'enabled' => true,
        'id' => FACEBOOK_PIXEL_ID
    ],
    'hotjar' => [
        'enabled' => false,
        'id' => 'XXXXXXX'
    ]
];

// Configuración de seguridad
$SECURITY_CONFIG = [
    'recaptcha' => [
        'enabled' => true,
        'site_key' => '6LcXXXXXXXXXX', // Reemplazar con clave real
        'secret_key' => '6LcXXXXXXXXXX' // Reemplazar con clave real
    ],
    'rate_limiting' => [
        'enabled' => true,
        'max_requests' => 100,
        'time_window' => 3600
    ],
    'backup' => [
        'enabled' => true,
        'frequency' => 'daily',
        'retention' => 30
    ]
];

// Función para obtener configuración
function getDomainConfig($key = null) {
    global $SERVICES_CONFIG, $SEO_CONFIG, $CONTENT_CONFIG, $CONTACTS_CONFIG, $SOCIAL_CONFIG, $TRACKING_CONFIG, $SECURITY_CONFIG;
    
    $config = [
        'services' => $SERVICES_CONFIG,
        'seo' => $SEO_CONFIG,
        'content' => $CONTENT_CONFIG,
        'contacts' => $CONTACTS_CONFIG,
        'social' => $SOCIAL_CONFIG,
        'tracking' => $TRACKING_CONFIG,
        'security' => $SECURITY_CONFIG
    ];
    
    if ($key === null) {
        return $config;
    }
    
    return $config[$key] ?? null;
}

// Función para obtener URL completa
function getFullUrl($path = '') {
    return SITE_URL . '/' . ltrim($path, '/');
}

// Función para obtener URL de contacto
function getContactUrl($type = 'email') {
    switch ($type) {
        case 'phone':
            return 'tel:' . CONTACTS_CONFIG['phone'];
        case 'whatsapp':
            return 'https://wa.me/' . str_replace(['+', ' ', '-'], '', CONTACTS_CONFIG['whatsapp']) . '?text=' . urlencode(WHATSAPP_MESSAGE);
        case 'email':
        default:
            return 'mailto:' . CONTACT_EMAIL;
    }
}

// Función para verificar si es el dominio principal
function isMainDomain() {
    return $_SERVER['HTTP_HOST'] === DOMAIN_NAME || $_SERVER['HTTP_HOST'] === 'www.' . DOMAIN_NAME;
}

// Función para obtener configuración de SEO
function getSEOConfig($page = 'home') {
    global $SEO_CONFIG;
    
    $pageConfig = [
        'home' => [
            'title' => $SEO_CONFIG['title'],
            'description' => $SEO_CONFIG['description'],
            'keywords' => $SEO_CONFIG['keywords']
        ],
        'precios' => [
            'title' => 'Precios de Registro de Marcas - Sinapsis Legal',
            'description' => 'Conoce nuestros precios para registro de marcas ante el IMPI. Búsqueda gratuita, registro completo desde $8,500 MXN.',
            'keywords' => 'precios registro marcas, costos IMPI, tarifas propiedad intelectual'
        ],
        'contacto' => [
            'title' => 'Contacto - Sinapsis Legal',
            'description' => 'Contacta con nuestros especialistas en registro de marcas. Consulta gratuita y asesoría personalizada.',
            'keywords' => 'contacto registro marcas, consulta IMPI, asesoría legal'
        ]
    ];
    
    return $pageConfig[$page] ?? $pageConfig['home'];
}

?> 