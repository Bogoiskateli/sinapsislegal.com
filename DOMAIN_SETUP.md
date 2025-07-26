# Configuración del Dominio - sinapsislegal.com

## Configuración DNS

### Registro A (IPv4)
```
Tipo: A
Nombre: @
Valor: [IP_DEL_SERVIDOR]
TTL: 3600
```

### Registro CNAME (www)
```
Tipo: CNAME
Nombre: www
Valor: sinapsislegal.com
TTL: 3600
```

### Registro MX (Email)
```
Tipo: MX
Nombre: @
Valor: mail.sinapsislegal.com
Prioridad: 10
TTL: 3600
```

### Registro TXT (SPF)
```
Tipo: TXT
Nombre: @
Valor: "v=spf1 include:_spf.google.com ~all"
TTL: 3600
```

### Registro TXT (DMARC)
```
Tipo: TXT
Nombre: _dmarc
Valor: "v=DMARC1; p=quarantine; rua=mailto:dmarc@sinapsislegal.com"
TTL: 3600
```

## Configuración de Email

### Crear Cuentas de Email
1. **contacto@sinapsislegal.com** - Email principal
2. **admin@sinapsislegal.com** - Panel de administración
3. **soporte@sinapsislegal.com** - Soporte técnico
4. **dmarc@sinapsislegal.com** - Reportes DMARC

### Configuración SMTP
```php
// En backend/config.php
define('SMTP_HOST', 'mail.sinapsislegal.com');
define('SMTP_PORT', 587);
define('SMTP_USER', 'contacto@sinapsislegal.com');
define('SMTP_PASS', '[PASSWORD_DE_EMAIL]');
```

## Configuración SSL

### Certificado SSL
- Instalar certificado SSL gratuito (Let's Encrypt)
- Configurar redirección HTTP a HTTPS
- Verificar que todas las URLs usen HTTPS

### Headers de Seguridad
```apache
# En .htaccess
Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
Header always set X-Content-Type-Options nosniff
Header always set X-Frame-Options SAMEORIGIN
Header always set X-XSS-Protection "1; mode=block"
```

## Configuración del Hosting

### Estructura de Directorios
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
chmod 644 *.html *.css *.js *.xml *.txt
chmod 644 backend/*.php
chmod 755 backend/
chmod 755 backend/admin/
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

## Configuración de Procesadores de Pago

### Stripe
1. Crear cuenta en [stripe.com](https://stripe.com)
2. Obtener claves API para México
3. Configurar webhooks:
   - URL: `https://sinapsislegal.com/backend/payment-integration.php?action=stripe_webhook`
   - Eventos: `checkout.session.completed`, `payment_intent.payment_failed`

### PayPal
1. Crear cuenta en [paypal.com](https://paypal.com)
2. Obtener credenciales para México
3. Configurar webhooks:
   - URL: `https://sinapsislegal.com/backend/payment-integration.php?action=paypal_webhook`
   - Eventos: `PAYMENT.CAPTURE.COMPLETED`, `PAYMENT.CAPTURE.DENIED`

### MercadoPago
1. Crear cuenta en [mercadopago.com.mx](https://mercadopago.com.mx)
2. Obtener credenciales de producción
3. Configurar webhooks:
   - URL: `https://sinapsislegal.com/backend/payment-integration.php?action=mercadopago_webhook`

## Configuración de Google Services

### Google Analytics
1. Crear cuenta en [analytics.google.com](https://analytics.google.com)
2. Configurar propiedad para sinapsislegal.com
3. Agregar código de seguimiento en `<head>` de todas las páginas

### Google Search Console
1. Verificar propiedad en [search.google.com](https://search.google.com)
2. Subir sitemap.xml
3. Configurar parámetros de URL

### Google My Business
1. Crear perfil de negocio
2. Verificar ubicación
3. Agregar información de contacto

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
# Script de backup diario
#!/bin/bash
DATE=$(date +%Y%m%d)
mysqldump -u sinapsislegal_user -p[PASSWORD] sinapsislegal_db > backup_db_$DATE.sql
tar -czf backup_files_$DATE.tar.gz public_html/
```

### Almacenamiento
- Backup local diario
- Backup en la nube semanal
- Retención de 30 días

## Configuración de Seguridad

### Firewall
- Configurar WAF (Web Application Firewall)
- Bloquear IPs maliciosas
- Limitar intentos de login

### Rate Limiting
```apache
# En .htaccess
<IfModule mod_evasive20.c>
    DOSHashTableSize 3097
    DOSPageCount 2
    DOSSiteCount 50
    DOSPageInterval 1
    DOSSiteInterval 1
    DOSBlockingPeriod 10
</IfModule>
```

## Configuración de Rendimiento

### Caché
```apache
# En .htaccess
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType application/javascript "access plus 1 month"
    ExpiresByType image/png "access plus 1 month"
    ExpiresByType image/jpg "access plus 1 month"
    ExpiresByType image/jpeg "access plus 1 month"
    ExpiresByType image/gif "access plus 1 month"
    ExpiresByType image/svg+xml "access plus 1 month"
</IfModule>
```

### Compresión
```apache
# En .htaccess
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>
```

## Checklist de Verificación

### Antes del Lanzamiento
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

### Después del Lanzamiento
- [ ] Probar todos los formularios
- [ ] Verificar pagos de prueba
- [ ] Revisar logs de error
- [ ] Configurar alertas
- [ ] Optimizar rendimiento
- [ ] Configurar SEO

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