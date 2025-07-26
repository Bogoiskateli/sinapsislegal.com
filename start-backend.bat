@echo off
echo ========================================
echo    Sinapsis Legal - Backend Server
echo ========================================
echo.

echo Verificando PHP...
php -v >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ PHP no está instalado o no está en el PATH
    echo Por favor instala XAMPP o configura PHP
    pause
    exit /b 1
)

echo ✅ PHP encontrado
echo.

echo Verificando archivos del backend...
if not exist "backend\config.php" (
    echo ❌ Archivo backend\config.php no encontrado
    echo Asegúrate de estar en el directorio correcto
    pause
    exit /b 1
)

echo ✅ Archivos del backend encontrados
echo.

echo Creando directorios necesarios...
if not exist "backend\logs" mkdir "backend\logs"
if not exist "backend\uploads" mkdir "backend\uploads"
echo ✅ Directorios creados
echo.

echo ========================================
echo    Iniciando servidor PHP...
echo ========================================
echo.
echo 🌐 URL del sitio: http://localhost:8000
echo 🔧 Backend: http://localhost:8000/backend/process.php
echo ⚙️ Admin: http://localhost:8000/backend/admin/
echo 🧪 Test: http://localhost:8000/test-backend.php
echo.
echo Presiona Ctrl+C para detener el servidor
echo.

php -S localhost:8000

pause 