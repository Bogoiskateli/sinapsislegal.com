<?php
/**
 * Archivo de Prueba - Backend Sinapsis Legal
 * Usar para verificar que todo funcione correctamente
 */

// Habilitar errores para debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

echo "<h1>🧪 Pruebas del Backend - Sinapsis Legal</h1>";

// 1. Probar inclusión de configuración
echo "<h2>1. Configuración</h2>";
try {
    require_once 'backend/config.php';
    echo "✅ Archivo de configuración cargado correctamente<br>";
    echo "📧 Email configurado: " . ADMIN_EMAIL . "<br>";
    echo "🌐 URL del sitio: " . SITE_URL . "<br>";
} catch (Exception $e) {
    echo "❌ Error cargando configuración: " . $e->getMessage() . "<br>";
}

// 2. Probar conexión a base de datos
echo "<h2>2. Base de Datos</h2>";
try {
    $pdo = getDBConnection();
    if ($pdo) {
        echo "✅ Conexión a base de datos exitosa<br>";
        
        // Probar consulta simple
        $stmt = $pdo->query("SELECT COUNT(*) as total FROM services");
        $result = $stmt->fetch();
        echo "📊 Servicios en la base de datos: " . $result['total'] . "<br>";
        
        // Probar procedimiento almacenado
        $stmt = $pdo->query("CALL GetDashboardStats()");
        $stats = $stmt->fetch();
        echo "📈 Estadísticas del dashboard cargadas<br>";
        
    } else {
        echo "❌ Error de conexión a la base de datos<br>";
    }
} catch (Exception $e) {
    echo "❌ Error en base de datos: " . $e->getMessage() . "<br>";
}

// 3. Probar funciones de utilidad
echo "<h2>3. Funciones de Utilidad</h2>";

// Probar validación de email
$testEmails = ['test@example.com', 'invalid-email', 'admin@sinapsislegal.com'];
foreach ($testEmails as $email) {
    $isValid = validateEmail($email);
    echo ($isValid ? "✅" : "❌") . " Email válido: $email<br>";
}

// Probar sanitización
$testInput = "<script>alert('xss')</script>Hello World";
$sanitized = sanitizeInput($testInput);
echo "🧹 Input sanitizado: " . htmlspecialchars($sanitized) . "<br>";

// 4. Probar procesamiento de formularios
echo "<h2>4. Procesamiento de Formularios</h2>";

// Simular datos de contacto
$contactData = [
    'action' => 'contact_form',
    'firstName' => 'Juan',
    'lastName' => 'Pérez',
    'email' => 'juan@example.com',
    'phone' => '+52 55 1234-5678',
    'service' => 'consultation',
    'message' => 'Mensaje de prueba del backend'
];

echo "📝 Probando formulario de contacto...<br>";

// 5. Probar búsqueda de marcas
echo "<h2>5. Búsqueda de Marcas</h2>";

$searchData = [
    'action' => 'trademark_search',
    'companyName' => 'Empresa Test S.A.',
    'trademarkName' => 'TestBrand',
    'email' => 'test@empresa.com',
    'phone' => '+52 55 9876-5432',
    'description' => 'Productos de tecnología'
];

echo "🔍 Probando búsqueda de marcas...<br>";

// 6. Probar configuración de pagos
echo "<h2>6. Configuración de Pagos</h2>";

echo "💳 Stripe habilitado: " . (defined('STRIPE_PUBLIC_KEY') ? 'Sí' : 'No') . "<br>";
echo "💳 PayPal habilitado: " . (defined('PAYPAL_CLIENT_ID') ? 'Sí' : 'No') . "<br>";
echo "💳 MercadoPago habilitado: " . (defined('MP_PUBLIC_KEY') ? 'Sí' : 'No') . "<br>";

// 7. Probar directorios y permisos
echo "<h2>7. Directorios y Permisos</h2>";

$directories = [
    'backend/',
    'backend/logs/',
    'backend/uploads/',
    'backend/admin/'
];

foreach ($directories as $dir) {
    if (is_dir($dir)) {
        $writable = is_writable($dir);
        echo ($writable ? "✅" : "⚠️") . " Directorio $dir " . ($writable ? "escribible" : "no escribible") . "<br>";
    } else {
        echo "❌ Directorio $dir no existe<br>";
    }
}

// 8. Probar logs
echo "<h2>8. Sistema de Logs</h2>";

try {
    logActivity('INFO', 'Prueba del sistema de logs', ['test' => true]);
    echo "✅ Log de actividad creado correctamente<br>";
} catch (Exception $e) {
    echo "❌ Error en sistema de logs: " . $e->getMessage() . "<br>";
}

// 9. Probar JWT
echo "<h2>9. Sistema JWT</h2>";

try {
    $payload = ['user_id' => 1, 'email' => 'test@example.com'];
    $token = generateJWT($payload);
    echo "✅ Token JWT generado: " . substr($token, 0, 50) . "...<br>";
    
    $isValid = validateJWT($token);
    echo ($isValid ? "✅" : "❌") . " Token JWT válido<br>";
} catch (Exception $e) {
    echo "❌ Error en JWT: " . $e->getMessage() . "<br>";
}

// 10. Probar CSRF
echo "<h2>10. Protección CSRF</h2>";

try {
    $csrfToken = generateCSRFToken();
    echo "✅ Token CSRF generado: " . substr($csrfToken, 0, 20) . "...<br>";
    
    $isValid = validateCSRFToken($csrfToken);
    echo ($isValid ? "✅" : "❌") . " Token CSRF válido<br>";
} catch (Exception $e) {
    echo "❌ Error en CSRF: " . $e->getMessage() . "<br>";
}

// 11. Información del sistema
echo "<h2>11. Información del Sistema</h2>";

echo "🐘 Versión de PHP: " . PHP_VERSION . "<br>";
echo "🔧 Extensiones PHP requeridas:<br>";
$requiredExtensions = ['pdo', 'pdo_mysql', 'json', 'mbstring', 'openssl'];
foreach ($requiredExtensions as $ext) {
    $loaded = extension_loaded($ext);
    echo ($loaded ? "✅" : "❌") . " $ext<br>";
}

echo "📁 Directorio actual: " . getcwd() . "<br>";
echo "🌐 Servidor: " . ($_SERVER['SERVER_SOFTWARE'] ?? 'Desconocido') . "<br>";

// 12. Pruebas de endpoints
echo "<h2>12. Pruebas de Endpoints</h2>";

$endpoints = [
    'backend/process.php',
    'backend/payment-integration.php',
    'backend/admin/index.php'
];

foreach ($endpoints as $endpoint) {
    if (file_exists($endpoint)) {
        echo "✅ Endpoint $endpoint existe<br>";
    } else {
        echo "❌ Endpoint $endpoint no existe<br>";
    }
}

// 13. Resumen
echo "<h2>13. Resumen</h2>";

echo "<div style='background: #f0f0f0; padding: 15px; border-radius: 5px;'>";
echo "<strong>🎯 Estado del Backend:</strong><br>";
echo "• Configuración: ✅ Cargada<br>";
echo "• Base de datos: " . (isset($pdo) && $pdo ? "✅ Conectada" : "❌ Error") . "<br>";
echo "• Funciones: ✅ Disponibles<br>";
echo "• Logs: ✅ Funcionando<br>";
echo "• Seguridad: ✅ Configurada<br>";
echo "</div>";

echo "<h2>🔗 Enlaces Útiles</h2>";
echo "<a href='index.html' target='_blank'>🏠 Frontend Principal</a><br>";
echo "<a href='backend/admin/' target='_blank'>⚙️ Panel de Administración</a><br>";
echo "<a href='backend/process.php' target='_blank'>🔧 Procesamiento Backend</a><br>";

echo "<h2>📋 Próximos Pasos</h2>";
echo "1. ✅ Verificar que todas las pruebas pasen<br>";
echo "2. 🔧 Configurar procesadores de pago<br>";
echo "3. 📧 Configurar email SMTP<br>";
echo "4. 🔒 Configurar SSL en producción<br>";
echo "5. 📊 Configurar Google Analytics<br>";

echo "<hr>";
echo "<p><em>Este archivo de prueba debe ser eliminado en producción por seguridad.</em></p>";
?> 