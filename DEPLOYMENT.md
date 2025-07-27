# Guía de Despliegue - Sinapsis Legal

Esta guía te ayudará a desplegar el sitio web de Sinapsis Legal en diferentes plataformas de hosting.

## 📋 Requisitos Previos

- Cuenta en un proveedor de hosting
- Dominio configurado (opcional pero recomendado)
- Acceso FTP/SFTP o panel de control del hosting

## 🚀 Opciones de Despliegue

### 1. Hosting Compartido (cPanel, Plesk, etc.)

**Pasos:**
1. Accede a tu panel de control del hosting
2. Ve a "Administrador de archivos" o "File Manager"
3. Navega a la carpeta `public_html` o `www`
4. Sube todos los archivos del proyecto
5. Configura el dominio si es necesario

**Archivos a subir:**
```
index.html
precios.html
contacto.html
styles.css
script.js
config.js
sitemap.xml
robots.txt
.htaccess
README.md
```

### 2. Netlify (Recomendado para sitios estáticos)

**Pasos:**
1. Ve a [netlify.com](https://netlify.com) y crea una cuenta
2. Haz clic en "New site from Git" o "Deploy manually"
3. Si usas Git: conecta tu repositorio
4. Si despliegas manualmente: arrastra la carpeta del proyecto
5. Configura el dominio personalizado si lo tienes

**Ventajas:**
- Despliegue automático desde Git
- HTTPS gratuito
- CDN global
- Formularios integrados

### 3. Vercel

**Pasos:**
1. Ve a [vercel.com](https://vercel.com) y crea una cuenta
2. Conecta tu repositorio de Git
3. Vercel detectará automáticamente que es un sitio estático
4. Configura el dominio personalizado

### 4. GitHub Pages

**Pasos:**
1. Sube el código a un repositorio de GitHub
2. Ve a Settings > Pages
3. Selecciona la rama principal como fuente
4. Configura el dominio personalizado si lo tienes

### 5. AWS S3 + CloudFront

**Pasos:**
1. Crea un bucket en S3
2. Sube todos los archivos al bucket
3. Configura el bucket para hosting de sitios web
4. Crea una distribución de CloudFront
5. Configura el dominio personalizado

## 🔧 Configuración Post-Despliegue

### 1. Configurar Dominio

Si tienes un dominio personalizado:

1. **DNS Configuration:**
   ```
   A Record: @ → IP del servidor
   CNAME: www → tu-dominio.com
   ```

2. **SSL Certificate:**
   - La mayoría de proveedores modernos incluyen SSL gratuito
   - Para hosting compartido, activa SSL desde el panel de control

### 2. Configurar Formularios

Los formularios actuales son simulados. Para funcionalidad real:

**Opción A: Netlify Forms**
- Los formularios funcionan automáticamente en Netlify
- Ve a Site settings > Forms para ver las submisiones

**Opción B: EmailJS**
```javascript
// Agregar en script.js
emailjs.init("YOUR_USER_ID");
```

**Opción C: Backend propio**
- Crear API endpoint para procesar formularios
- Usar servicios como Formspree, Getform, o similar

### 3. Configurar Analytics

**Google Analytics:**
1. Crea una cuenta en Google Analytics
2. Obtén el código de seguimiento
3. Agrega el script en el `<head>` de todas las páginas

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### 4. Configurar Search Console

1. Ve a [Google Search Console](https://search.google.com/search-console)
2. Agrega tu propiedad
3. Verifica la propiedad (usando HTML tag o archivo)
4. Envía el sitemap.xml

## 📊 Monitoreo y Mantenimiento

### 1. Verificaciones Regulares

- **Rendimiento:** Usa Google PageSpeed Insights
- **SEO:** Monitorea Search Console
- **Funcionalidad:** Prueba formularios y enlaces
- **Seguridad:** Mantén actualizado el .htaccess

### 2. Actualizaciones

**Contenido:**
- Actualiza precios en `config.js`
- Modifica información de contacto
- Agrega nuevos testimonios o servicios

**Técnico:**
- Actualiza dependencias si las usas
- Revisa logs de errores
- Optimiza imágenes regularmente

### 3. Backup

- Haz backup regular de todos los archivos
- Guarda copias en Git o servicio de backup
- Documenta cambios importantes

## 🛠️ Solución de Problemas

### Problemas Comunes

1. **Formularios no funcionan:**
   - Verifica configuración de backend
   - Revisa consola del navegador
   - Prueba en diferentes navegadores

2. **Páginas no cargan:**
   - Verifica rutas de archivos
   - Revisa configuración de .htaccess
   - Comprueba permisos de archivos

3. **SEO no funciona:**
   - Verifica sitemap.xml
   - Revisa meta tags
   - Comprueba robots.txt

4. **Rendimiento lento:**
   - Optimiza imágenes
   - Habilita compresión
   - Usa CDN

## 📞 Soporte

Para problemas técnicos:
- Revisa la documentación del proveedor de hosting
- Consulta logs de errores
- Contacta al soporte técnico del hosting

## 🔄 Actualizaciones Futuras

Para agregar nuevas páginas:
1. Crea el archivo HTML
2. Actualiza la navegación
3. Agrega al sitemap.xml
4. Actualiza robots.txt si es necesario
5. Prueba enlaces y funcionalidad

---

**¡Tu sitio web de Sinapsis Legal está listo para el mundo!** 🌟 