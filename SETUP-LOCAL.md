# Configuración Local - Sinapsis Legal Backend

## Opción 1: XAMPP (Windows)

### Instalación
1. Descarga XAMPP desde [https://www.apachefriends.org/](https://www.apachefriends.org/)
2. Instala XAMPP en tu computadora
3. Inicia XAMPP Control Panel

### Configuración
1. **Iniciar Servicios:**
   - Apache: Click en "Start"
   - MySQL: Click en "Start"

2. **Colocar Archivos:**
   - Copia todos los archivos a `C:\xampp\htdocs\sinapsislegal\`
   - Estructura:
   ```
   C:\xampp\htdocs\sinapsislegal\
   ├── index.html
   ├── precios.html
   ├── contacto.html
   ├── styles.css
   ├── script.js
   ├── backend\
   │   ├── config.php
   │   ├── process.php
   │   ├── database.sql
   │   └── admin\
   │       └── index.php
   ```

3. **Configurar Base de Datos:**
   - Abre http://localhost/phpmyadmin
   - Crea nueva base de datos: `sinapsislegal_db`
   - Importa `backend/database.sql`

4. **Configurar Conexión:**
   - Edita `backend/config.php`:
   ```php
   define('DB_HOST', 'localhost');
   define('DB_NAME', 'sinapsislegal_db');
   define('DB_USER', 'root');
   define('DB_PASS', ''); // XAMPP no tiene password por defecto
   ```

5. **Acceder al Sitio:**
   - Frontend: http://localhost/sinapsislegal/
   - Backend: http://localhost/sinapsislegal/backend/process.php
   - Admin: http://localhost/sinapsislegal/backend/admin/

## Opción 2: WAMP (Windows)

### Instalación
1. Descarga WAMP desde [https://www.wampserver.com/](https://www.wampserver.com/)
2. Instala WAMP
3. Inicia WAMP

### Configuración
1. **Colocar Archivos:**
   - Copia a `C:\wamp64\www\sinapsislegal\`

2. **Configurar Base de Datos:**
   - Abre http://localhost/phpmyadmin
   - Crea base de datos e importa SQL

3. **Acceder:**
   - http://localhost/sinapsislegal/

## Opción 3: MAMP (Mac)

### Instalación
1. Descarga MAMP desde [https://www.mamp.info/](https://www.mamp.info/)
2. Instala MAMP
3. Inicia MAMP

### Configuración
1. **Colocar Archivos:**
   - Copia a `/Applications/MAMP/htdocs/sinapsislegal/`

2. **Configurar Base de Datos:**
   - Abre http://localhost:8888/phpMyAdmin
   - Crea base de datos e importa SQL

3. **Acceder:**
   - http://localhost:8888/sinapsislegal/

## Opción 4: Servidor PHP Integrado

### Comando Terminal
```bash
# Navegar al directorio del proyecto
cd /path/to/sinapsislegal

# Iniciar servidor PHP
php -S localhost:8000

# O con IP específica
php -S 0.0.0.0:8000
```

### Acceder
- Frontend: http://localhost:8000
- Backend: http://localhost:8000/backend/process.php

## Opción 5: Docker (Avanzado)

### Crear Dockerfile
```dockerfile
FROM php:8.1-apache

# Instalar extensiones PHP
RUN docker-php-ext-install pdo pdo_mysql

# Copiar archivos
COPY . /var/www/html/

# Configurar Apache
RUN a2enmod rewrite

# Exponer puerto
EXPOSE 80
```

### Comandos Docker
```bash
# Construir imagen
docker build -t sinapsislegal .

# Ejecutar contenedor
docker run -p 8080:80 sinapsislegal

# Acceder
http://localhost:8080
```

## Configuración de Base de Datos Local

### Crear Base de Datos
```sql
-- En phpMyAdmin o MySQL CLI
CREATE DATABASE sinapsislegal_db;
USE sinapsislegal_db;

-- Importar esquema
SOURCE backend/database.sql;
```

### Configurar Usuario
```sql
-- Crear usuario (opcional)
CREATE USER 'sinapsislegal_user'@'localhost' IDENTIFIED BY 'password123';
GRANT ALL PRIVILEGES ON sinapsislegal_db.* TO 'sinapsislegal_user'@'localhost';
FLUSH PRIVILEGES;
```

## Configuración de Email Local

### Para Desarrollo Local
```php
// En backend/config.php
define('EMAIL_SERVICE_ENABLED', false); // Deshabilitar emails en desarrollo
```

### Para Testing con Mailtrap
```php
// En backend/config.php
define('SMTP_HOST', 'smtp.mailtrap.io');
define('SMTP_PORT', 2525);
define('SMTP_USER', 'tu_mailtrap_user');
define('SMTP_PASS', 'tu_mailtrap_pass');
```

## Configuración de Procesadores de Pago Local

### Modo Test
```php
// En backend/config.php
define('STRIPE_PUBLIC_KEY', 'pk_test_...');
define('STRIPE_SECRET_KEY', 'sk_test_...');
define('PAYPAL_MODE', 'sandbox');
define('MP_PUBLIC_KEY', 'TEST-...');
```

## Verificación del Backend

### 1. Probar Conexión a Base de Datos
```php
// Crear archivo: test-db.php
<?php
require_once 'backend/config.php';

$pdo = getDBConnection();
if ($pdo) {
    echo "✅ Conexión a base de datos exitosa";
} else {
    echo "❌ Error de conexión a base de datos";
}
?>
```

### 2. Probar Procesamiento de Formularios
```bash
# Usar curl para probar
curl -X POST http://localhost/sinapsislegal/backend/process.php \
  -d "action=contact_form" \
  -d "firstName=Test" \
  -d "lastName=User" \
  -d "email=test@example.com" \
  -d "service=consultation" \
  -d "message=Test message"
```

### 3. Verificar Logs
```bash
# Revisar logs de PHP
tail -f /var/log/apache2/error.log  # Linux
tail -f C:\xampp\apache\logs\error.log  # Windows XAMPP
```

## Solución de Problemas

### Error de Conexión a Base de Datos
- Verificar que MySQL esté ejecutándose
- Verificar credenciales en `backend/config.php`
- Verificar que la base de datos existe

### Error 500 - Internal Server Error
- Revisar logs de error de PHP
- Verificar permisos de archivos
- Verificar sintaxis de archivos PHP

### Formularios No Funcionan
- Verificar que `backend/process.php` sea accesible
- Revisar configuración de CORS
- Verificar logs de error

### Panel de Administración No Accede
- Verificar que la base de datos esté configurada
- Verificar credenciales de administrador
- Revisar permisos de archivos

## Comandos Útiles

### Verificar PHP
```bash
php -v
php -m  # Ver extensiones instaladas
```

### Verificar MySQL
```bash
mysql -u root -p
SHOW DATABASES;
```

### Verificar Apache
```bash
# Linux
sudo systemctl status apache2

# Windows (XAMPP)
# Ver en XAMPP Control Panel
```

## Configuración de Desarrollo

### Habilitar Errores
```php
// En backend/config.php para desarrollo
error_reporting(E_ALL);
ini_set('display_errors', 1);
```

### Configurar Logs
```php
// En backend/config.php
define('LOG_ENABLED', true);
define('LOG_PATH', '../logs/');
```

---

**Nota**: Para desarrollo local, usa siempre claves de prueba (test/sandbox) para los procesadores de pago. 