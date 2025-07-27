#!/bin/bash

echo "========================================"
echo "   Sinapsis Legal - Backend Server"
echo "========================================"
echo

# Verificar PHP
echo "Verificando PHP..."
if ! command -v php &> /dev/null; then
    echo "❌ PHP no está instalado"
    echo "Por favor instala PHP:"
    echo "  Ubuntu/Debian: sudo apt install php php-mysql"
    echo "  macOS: brew install php"
    exit 1
fi

echo "✅ PHP encontrado: $(php -v | head -n 1)"
echo

# Verificar archivos del backend
echo "Verificando archivos del backend..."
if [ ! -f "backend/config.php" ]; then
    echo "❌ Archivo backend/config.php no encontrado"
    echo "Asegúrate de estar en el directorio correcto"
    exit 1
fi

echo "✅ Archivos del backend encontrados"
echo

# Crear directorios necesarios
echo "Creando directorios necesarios..."
mkdir -p backend/logs
mkdir -p backend/uploads
chmod 755 backend/logs
chmod 755 backend/uploads
echo "✅ Directorios creados"
echo

# Verificar permisos
echo "Verificando permisos..."
if [ ! -w "backend/logs" ]; then
    echo "⚠️  El directorio backend/logs no es escribible"
    chmod 755 backend/logs
fi

if [ ! -w "backend/uploads" ]; then
    echo "⚠️  El directorio backend/uploads no es escribible"
    chmod 755 backend/uploads
fi

echo "✅ Permisos verificados"
echo

echo "========================================"
echo "   Iniciando servidor PHP..."
echo "========================================"
echo
echo "🌐 URL del sitio: http://localhost:8000"
echo "🔧 Backend: http://localhost:8000/backend/process.php"
echo "⚙️  Admin: http://localhost:8000/backend/admin/"
echo "🧪 Test: http://localhost:8000/test-backend.php"
echo
echo "Presiona Ctrl+C para detener el servidor"
echo

# Iniciar servidor PHP
php -S localhost:8000 