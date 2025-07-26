// Configuración de Conekta para Sinapsis Legal
// Reemplaza estas llaves con las tuyas reales de Conekta

const conektaConfig = {
    // Llave pública (para el frontend)
    publicKey: 'key_JBz73eqOQwH5gRgim311F52', // Llave pública de Conekta
    
    // Llave privada (para el backend - solo en servidor)
    privateKey: 'key_lBBN2nnZHXyXiaiCY4mHne9', // Llave privada de Conekta
    
    // Configuración de la API
    apiVersion: '2.0.0',
    
    // Configuración de locales
    locale: 'es',
    
    // Configuración de moneda por defecto
    defaultCurrency: 'MXN',
    
    // Configuración de planes de pago
    plans: {
        'registro': {
            name: 'Registro Completo de Marca',
            amount: 8500,
            currency: 'MXN',
            description: 'Registro completo de marca ante el IMPI'
        },
        'consultoria': {
            name: 'Consultoría Legal',
            amount: 2500,
            currency: 'MXN',
            description: 'Asesoría legal especializada'
        }
    },
    
    // Configuración de webhooks (opcional)
    webhooks: {
        enabled: false,
        url: 'https://sinapsislegal.com/.netlify/functions/webhook',
        events: ['charge.paid', 'charge.failed', 'order.paid', 'order.expired']
    }
};

// Exportar configuración
module.exports = conektaConfig; 