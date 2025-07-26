# Guía de Despliegue - sinapsislegal.com

## Configuración del Dominio

### DNS Records
Configura estos registros en tu proveedor de DNS:

```
A Record:
- Nombre: @
- Valor: [IP_DEL_SERVIDOR]
- TTL: 3600

CNAME Record:
- Nombre: www
- Valor: sinapsislegal.com
- TTL: 3600

MX Record:
- Nombre: @
- Valor: mail.sinapsislegal.com
- Prioridad: 10
- TTL: 3600

TXT Records:
- Nombre: @
- Valor: "v=spf1 include:_spf.google.com ~all"

- Nombre: _dmarc
- Valor: "v=DMARC1; p=quarantine; rua=mailto:dmarc@sinapsislegal.com"
```

## Configuración del Hosting

### Estructura de Archivos
```
public_html/
├── index.html
├── precios.html
├── contacto.html
├── styles.css
├── script.js
├── .htaccess
├── sitemap.xml
├── robots.txt
├── sinapsislegal-config.php
├── DOMAIN_SETUP.md
├── DEPLOYMENT-SINAPSISLEGAL.md
└── backend/
    ├── config.php
    ├── process.php
    ├── database.sql
    ├── payment-integration.php
    └── admin/
        └── index.php
```

### Permisos de Archivos
```bash
# Archivos principales
chmod 644 *.html *.css *.js *.xml *.txt *.php

# Directorios
chmod 755 backend/
chmod 755 backend/admin/

# Directorios de logs y uploads
mkdir -p backend/logs
mkdir -p backend/uploads
chmod 755 backend/logs/
chmod 755 backend/uploads/
```

## Configuración de Base de Datos

### Crear Base de Datos
```sql
CREATE DATABASE sinapsislegal_db;
CREATE USER 'sinapsislegal_user'@'localhost' IDENTIFIED BY '[PASSWORD_FUERTE]';
GRANT ALL PRIVILEGES ON sinapsislegal_db.* TO 'sinapsislegal_user'@'localhost';
FLUSH PRIVILEGES;
```

### Importar Esquema
```bash
mysql -u sinapsislegal_user -p sinapsislegal_db < backend/database.sql
```

### Configurar Conexión
Editar `backend/config.php`:
```php
define('DB_HOST', 'localhost');
define('DB_NAME', 'sinapsislegal_db');
define('DB_USER', 'sinapsislegal_user');
define('DB_PASS', '[TU_PASSWORD]');
```

## Configuración de Email

### Crear Cuentas de Email
1. **contacto@sinapsislegal.com** - Email principal
2. **admin@sinapsislegal.com** - Panel de administración
3. **soporte@sinapsislegal.com** - Soporte técnico

### Configurar SMTP
En `backend/config.php`:
```php
define('SMTP_HOST', 'mail.sinapsislegal.com');
define('SMTP_PORT', 587);
define('SMTP_USER', 'contacto@sinapsislegal.com');
define('SMTP_PASS', '[PASSWORD_DE_EMAIL]');
```

## Configuración de SSL

### Instalar Certificado
1. Solicitar certificado SSL gratuito (Let's Encrypt)
2. Configurar redirección HTTP a HTTPS
3. Verificar que todas las URLs usen HTTPS

### Verificar SSL
```bash
# Verificar certificado
openssl s_client -connect sinapsislegal.com:443 -servername sinapsislegal.com

# Verificar redirección
curl -I http://sinapsislegal.com
# Debe redirigir a https://sinapsislegal.com
```

## Configuración de Procesadores de Pago

### Stripe
1. Crear cuenta en [stripe.com](https://stripe.com)
2. Configurar para México
3. Obtener claves API de producción
4. Configurar en `backend/config.php`:
```php
define('STRIPE_PUBLIC_KEY', 'pk_live_...');
define('STRIPE_SECRET_KEY', 'sk_live_...');
```

### PayPal
1. Crear cuenta en [paypal.com](https://paypal.com)
2. Configurar para México
3. Obtener credenciales de producción
4. Configurar en `backend/config.php`:
```php
define('PAYPAL_CLIENT_ID', '...');
define('PAYPAL_CLIENT_SECRET', '...');
define('PAYPAL_MODE', 'live');
```

### MercadoPago
1. Crear cuenta en [mercadopago.com.mx](https://mercadopago.com.mx)
2. Obtener credenciales de producción
3. Configurar en `backend/config.php`:
```php
define('MP_PUBLIC_KEY', 'APP-...');
define('MP_ACCESS_TOKEN', 'APP-...');
```

## Configuración de Google Services

### Google Analytics
1. Crear cuenta en [analytics.google.com](https://analytics.google.com)
2. Configurar propiedad para sinapsislegal.com
3. Obtener ID de seguimiento (G-XXXXXXXXXX)
4. Configurar en `sinapsislegal-config.php`:
```php
define('GOOGLE_ANALYTICS_ID', 'G-XXXXXXXXXX');
```

### Google Search Console
1. Verificar propiedad en [search.google.com](https://search.google.com)
2. Subir sitemap.xml
3. Configurar parámetros de URL

### Google My Business
1. Crear perfil de negocio
2. Verificar ubicación
3. Agregar información de contacto

## Configuración de Seguridad

### JWT Secret
```bash
# Generar clave secreta
openssl rand -base64 32
```

Configurar en `backend/config.php`:
```php
define('JWT_SECRET', '[CLAVE_GENERADA]');
```

### reCAPTCHA
1. Crear cuenta en [google.com/recaptcha](https://google.com/recaptcha)
2. Configurar para sinapsislegal.com
3. Obtener claves
4. Configurar en `sinapsislegal-config.php`:
```php
define('RECAPTCHA_SITE_KEY', '6Lc...');
define('RECAPTCHA_SECRET_KEY', '6Lc...');
```

## Configuración de Monitoreo

### Uptime Monitoring
- Configurar alertas de disponibilidad
- Monitorear tiempo de respuesta
- Alertas de errores 500

### Log Monitoring
- Configurar rotación de logs
- Monitorear errores de PHP
- Alertas de intentos de hackeo

## Configuración de Backup

### Backup Automático
```bash
#!/bin/bash
# backup-sinapsislegal.sh
DATE=$(date +%Y%m%d)
mysqldump -u sinapsislegal_user -p[PASSWORD] sinapsislegal_db > backup_db_$DATE.sql
tar -czf backup_files_$DATE.tar.gz public_html/
# Subir a almacenamiento en la nube
```

### Programar Backup
```bash
# Agregar al crontab
0 2 * * * /path/to/backup-sinapsislegal.sh
```

## Verificación Post-Despliegue

### Checklist de Verificación
- [ ] DNS configurado correctamente
- [ ] SSL instalado y funcionando
- [ ] Base de datos creada y poblada
- [ ] Procesadores de pago configurados
- [ ] Emails funcionando
- [ ] Panel de administración accesible
- [ ] Formularios funcionando
- [ ] Backup configurado
- [ ] Monitoreo activo
- [ ] Google Analytics configurado
- [ ] Search Console verificado

### Pruebas Funcionales
1. **Frontend**: Visitar https://sinapsislegal.com
2. **Formulario de Contacto**: Enviar mensaje de prueba
3. **Búsqueda de Marca**: Realizar búsqueda gratuita
4. **Panel Admin**: Acceder a /backend/admin/
5. **Pagos**: Probar pagos de prueba
6. **Emails**: Verificar envío de confirmaciones

### Pruebas de Seguridad
1. Verificar headers de seguridad
2. Probar protección CSRF
3. Verificar validación de inputs
4. Probar rate limiting
5. Verificar logs de seguridad

## Configuración de SEO

### Meta Tags
Verificar que todas las páginas tengan:
- Title optimizado
- Meta description
- Open Graph tags
- Twitter Card tags

### Sitemap
1. Verificar sitemap.xml
2. Enviar a Google Search Console
3. Configurar actualización automática

### Robots.txt
Verificar que robots.txt permita indexación:
```
User-agent: *
Allow: /
Sitemap: https://sinapsislegal.com/sitemap.xml
```

## Configuración de Rendimiento

### Optimización de Imágenes
- Comprimir imágenes
- Usar formatos WebP
- Configurar lazy loading

### Minificación
- Minificar CSS y JavaScript
- Comprimir archivos
- Configurar caché

### CDN
- Configurar CDN para assets estáticos
- Optimizar entrega de contenido

## Contactos de Emergencia

### Hosting
- Soporte técnico del hosting
- Teléfono de emergencia
- Email de soporte

### Dominio
- Registrar del dominio
- Soporte técnico
- Información de renovación

### Procesadores de Pago
- Stripe: soporte@stripe.com
- PayPal: soporte@paypal.com
- MercadoPago: soporte@mercadopago.com.mx

---

**Nota**: Reemplaza todos los valores entre corchetes `[VALOR]` con la información real de tu hosting y servicios. 