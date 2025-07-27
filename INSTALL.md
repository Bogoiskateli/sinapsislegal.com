# Guía de Instalación - Sinapsis Legal

## Requisitos del Sistema

### Servidor Web
- **Apache** 2.4+ o **Nginx** 1.18+
- **PHP** 7.4+ (recomendado 8.0+)
- **MySQL** 5.7+ o **MariaDB** 10.3+

### Extensiones PHP Requeridas
- `pdo_mysql`
- `json`
- `mbstring`
- `openssl`
- `curl`
- `fileinfo`
- `gd` (para procesamiento de imágenes)

### Espacio en Disco
- Mínimo: 100MB
- Recomendado: 500MB+

## Pasos de Instalación

### 1. Preparación del Servidor

#### Para XAMPP/WAMP/MAMP (Desarrollo Local)
1. Descarga e instala XAMPP desde [https://www.apachefriends.org/](https://www.apachefriends.org/)
2. Inicia Apache y MySQL
3. Coloca los archivos en la carpeta `htdocs` (XAMPP) o `www` (WAMP)

#### Para Hosting Compartido
1. Sube todos los archivos al directorio raíz de tu hosting
2. Asegúrate de que PHP tenga las extensiones requeridas habilitadas

### 2. Configuración de la Base de Datos

#### Crear Base de Datos
1. Accede a phpMyAdmin o tu gestor de base de datos
2. Crea una nueva base de datos llamada `sinapsis_legal`
3. Importa el archivo `backend/database.sql`

#### Configurar Conexión
1. Edita el archivo `backend/config.php`
2. Actualiza las credenciales de la base de datos:

```php
define('DB_HOST', 'localhost');
define('DB_NAME', 'sinapsis_legal');
define('DB_USER', 'tu_usuario');
define('DB_PASS', 'tu_password');
```

### 3. Configuración del Procesador de Pagos

#### Stripe (Recomendado)
1. Crea una cuenta en [https://stripe.com/](https://stripe.com/)
2. Obtén tus claves API (pública y secreta)
3. Actualiza en `backend/config.php`:

```php
define('STRIPE_PUBLIC_KEY', 'pk_test_tu_clave_publica');
define('STRIPE_SECRET_KEY', 'sk_test_tu_clave_secreta');
```

#### PayPal (Alternativa)
1. Crea una cuenta en [https://developer.paypal.com/](https://developer.paypal.com/)
2. Obtén tus credenciales de API
3. Actualiza en `backend/config.php`:

```php
define('PAYPAL_CLIENT_ID', 'tu_client_id');
define('PAYPAL_CLIENT_SECRET', 'tu_client_secret');
```

#### MercadoPago (Para México)
1. Crea una cuenta en [https://www.mercadopago.com.mx/](https://www.mercadopago.com.mx/)
2. Obtén tus credenciales de API
3. Actualiza en `backend/config.php`:

```php
define('MP_PUBLIC_KEY', 'TEST-tu_public_key');
define('MP_ACCESS_TOKEN', 'TEST-tu_access_token');
```

### 4. Configuración de Email

#### Gmail SMTP (Recomendado)
1. Habilita la verificación en dos pasos en tu cuenta de Gmail
2. Genera una contraseña de aplicación
3. Actualiza en `backend/config.php`:

```php
define('SMTP_HOST', 'smtp.gmail.com');
define('SMTP_PORT', 587);
define('SMTP_USER', 'tu_email@gmail.com');
define('SMTP_PASS', 'tu_password_de_aplicacion');
```

### 5. Configuración de Seguridad

#### JWT Secret
1. Genera una clave secreta segura:
```bash
openssl rand -base64 32
```
2. Actualiza en `backend/config.php`:
```php
define('JWT_SECRET', 'tu_clave_secreta_generada');
```

#### Configuración del Sitio
1. Actualiza la URL del sitio en `backend/config.php`:
```php
define('SITE_URL', 'https://www.tudominio.com');
define('ADMIN_EMAIL', 'admin@tudominio.com');
```

### 6. Permisos de Archivos

#### Crear Directorios
```bash
mkdir backend/logs
mkdir backend/uploads
chmod 755 backend/logs
chmod 755 backend/uploads
```

#### Permisos de Archivos
```bash
chmod 644 backend/config.php
chmod 644 .htaccess
```

### 7. Configuración del Panel de Administración

#### Acceso al Panel
1. URL: `https://tudominio.com/backend/admin/`
2. Credenciales por defecto:
   - Email: `admin@sinapsislegal.com`
   - Password: `admin123`

#### Cambiar Contraseña
1. Accede al panel de administración
2. Ve a Configuración > Usuarios
3. Cambia la contraseña del administrador

### 8. Verificación de la Instalación

#### Pruebas Básicas
1. **Frontend**: Visita tu dominio principal
2. **Formulario de Contacto**: Envía un mensaje de prueba
3. **Búsqueda de Marca**: Realiza una búsqueda gratuita
4. **Panel Admin**: Accede al panel de administración

#### Verificar Logs
1. Revisa `backend/logs/` para errores
2. Verifica que los archivos de log se estén creando

## Configuración Avanzada

### Integración con APIs del IMPI
Para integrar con las APIs oficiales del IMPI:

1. Obtén credenciales de acceso a las APIs del IMPI
2. Actualiza la función `simulateTrademarkSearch()` en `backend/process.php`
3. Implementa las llamadas reales a las APIs

### Configuración de SSL
1. Instala un certificado SSL en tu servidor
2. Actualiza todas las URLs para usar HTTPS
3. Configura redirecciones HTTP a HTTPS

### Optimización de Rendimiento
1. Habilita compresión GZIP
2. Configura caché del navegador
3. Optimiza imágenes
4. Minifica CSS y JavaScript

### Backup Automático
1. Configura backup automático de la base de datos
2. Programa backup de archivos
3. Almacena backups en ubicación segura

## Solución de Problemas

### Error de Conexión a Base de Datos
- Verifica credenciales en `backend/config.php`
- Asegúrate de que MySQL esté ejecutándose
- Verifica que la base de datos existe

### Error 500 - Internal Server Error
- Revisa logs de error de PHP
- Verifica permisos de archivos
- Comprueba sintaxis de archivos PHP

### Formularios No Funcionan
- Verifica que `backend/process.php` sea accesible
- Revisa logs de error
- Comprueba configuración de CORS

### Emails No Se Envían
- Verifica configuración SMTP
- Comprueba credenciales de email
- Revisa logs de error de email

### Panel de Administración No Accede
- Verifica que la base de datos esté configurada
- Comprueba credenciales de administrador
- Revisa permisos de archivos

## Mantenimiento

### Actualizaciones Regulares
1. Mantén PHP actualizado
2. Actualiza extensiones de seguridad
3. Revisa logs regularmente
4. Haz backup antes de actualizaciones

### Monitoreo
1. Configura alertas de error
2. Monitorea uso de recursos
3. Revisa estadísticas de tráfico
4. Verifica funcionamiento de formularios

### Seguridad
1. Cambia contraseñas regularmente
2. Mantén certificados SSL actualizados
3. Revisa logs de acceso
4. Actualiza dependencias

## Soporte

### Recursos Adicionales
- [Documentación de PHP](https://www.php.net/docs.php)
- [Documentación de MySQL](https://dev.mysql.com/doc/)
- [Documentación de Stripe](https://stripe.com/docs)
- [Documentación de PayPal](https://developer.paypal.com/docs/)

### Contacto
Para soporte técnico o consultas:
- Email: soporte@sinapsislegal.com
- Teléfono: +52 (55) 1234-5678

---

**Nota**: Esta guía asume que tienes conocimientos básicos de administración de servidores web. Si necesitas ayuda adicional, considera contratar un administrador de sistemas o consultar con tu proveedor de hosting. 