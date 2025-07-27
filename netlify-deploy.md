# 🚀 Guía de Despliegue en Netlify - Sinapsis Legal

## Opción 1: Reemplazo Completo (Recomendado)

### Paso 1: Preparar Archivos para Netlify

#### 1.1 Crear archivo `netlify.toml`
```toml
[build]
  publish = "."
  command = ""

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "18"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Content-Security-Policy = "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com https://www.paypal.com https://www.mercadopago.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://api.stripe.com https://api.paypal.com https://api.mercadopago.com;"
```

#### 1.2 Crear archivo `_redirects`
```
/*    /index.html   200
```

#### 1.3 Crear archivo `_headers`
```
/*
  X-Frame-Options: DENY
  X-XSS-Protection: 1; mode=block
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com https://www.paypal.com https://www.mercadopago.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://api.stripe.com https://api.paypal.com https://api.mercadopago.com;
```

### Paso 2: Subir Archivos a Netlify

#### 2.1 Método Drag & Drop
1. **Abre Netlify Dashboard**
2. **Ve a tu proyecto:** `magenta-horse-e08699`
3. **Haz clic en "Deploys"** en el sidebar
4. **Arrastra toda la carpeta del proyecto** al área de deploy
5. **Espera a que se complete el deploy**

#### 2.2 Método Git (Recomendado)
1. **Crea un repositorio en GitHub/GitLab**
2. **Sube tu código:**
```bash
git init
git add .
git commit -m "Initial commit - Sinapsis Legal"
git branch -M main
git remote add origin https://github.com/tu-usuario/sinapsislegal.git
git push -u origin main
```
3. **Conecta Netlify con tu repositorio**
4. **Configura el deploy automático**

### Paso 3: Configurar Variables de Entorno

En Netlify Dashboard → Site settings → Environment variables:

```
STRIPE_PUBLIC_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
PAYPAL_CLIENT_ID=...
PAYPAL_CLIENT_SECRET=...
MP_PUBLIC_KEY=...
MP_ACCESS_TOKEN=...
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=contacto@sinapsislegal.com
SMTP_PASS=tu_password_app
JWT_SECRET=tu_jwt_secret_muy_seguro
```

### Paso 4: Configurar Base de Datos

#### 4.1 Opción A: Base de Datos Externa
- **PlanetScale** (MySQL)
- **Supabase** (PostgreSQL)
- **MongoDB Atlas**

#### 4.2 Opción B: Netlify Functions + Base de Datos
Crear archivo `netlify/functions/api.js`:
```javascript
const { MongoClient } = require('mongodb');

exports.handler = async (event, context) => {
  // Tu lógica de API aquí
};
```

## Opción 2: Reemplazo Manual por Archivos

### Paso 1: Descargar Archivos Actuales
1. **Ve a "Deploys"** en Netlify
2. **Descarga el último deploy**
3. **Guarda una copia de seguridad**

### Paso 2: Reemplazar Archivos
1. **Elimina todos los archivos** del deploy actual
2. **Sube los nuevos archivos** uno por uno o en lote
3. **Verifica que no falten archivos importantes**

### Paso 3: Verificar Despliegue
1. **Revisa los logs** del deploy
2. **Prueba el sitio** en `sinapsislegal.com`
3. **Verifica funcionalidades** principales

## Opción 3: Usando Netlify CLI

### Instalación
```bash
npm install -g netlify-cli
```

### Login y Deploy
```bash
# Login a Netlify
netlify login

# Inicializar proyecto
netlify init

# Deploy
netlify deploy --prod
```

## Configuración Específica para Sinapsis Legal

### 1. Configurar Dominio Personalizado
1. **Ve a "Domain management"**
2. **Verifica que `sinapsislegal.com` esté configurado**
3. **Configura SSL automático**

### 2. Configurar Formularios
1. **Ve a "Forms"** en el sidebar
2. **Verifica que los formularios se detecten**
3. **Configura notificaciones por email**

### 3. Configurar Funciones Serverless
Si usas Netlify Functions para el backend:

```javascript
// netlify/functions/process-form.js
exports.handler = async (event, context) => {
  // Procesar formularios
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Success' })
  };
};
```

## Verificación Post-Deploy

### 1. Pruebas Básicas
- [ ] Página principal carga correctamente
- [ ] Formularios funcionan
- [ ] Búsqueda de marcas funciona
- [ ] Diseño responsive
- [ ] SEO meta tags

### 2. Pruebas de Funcionalidad
- [ ] Contacto envía emails
- [ ] Búsqueda guarda datos
- [ ] Pagos procesan correctamente
- [ ] Panel admin accesible

### 3. Pruebas de Rendimiento
- [ ] Página carga rápido
- [ ] Imágenes optimizadas
- [ ] CSS/JS minificados
- [ ] Cache configurado

## Solución de Problemas

### Error: Build Failed
- Revisa logs de build
- Verifica sintaxis de archivos
- Comprueba dependencias

### Error: 404 en Rutas
- Verifica archivo `_redirects`
- Configura SPA routing

### Error: Variables de Entorno
- Verifica nombres exactos
- Revisa valores secretos
- Prueba en modo desarrollo

### Error: Base de Datos
- Verifica conexión
- Comprueba credenciales
- Revisa firewall/red

## Comandos Útiles

### Verificar Estado
```bash
netlify status
netlify sites:list
```

### Ver Logs
```bash
netlify logs
netlify functions:logs
```

### Rollback
```bash
netlify rollback
```

## Configuración de Monitoreo

### 1. Google Analytics
```html
<!-- En el head de index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
```

### 2. Uptime Monitoring
- **Netlify Analytics** (incluido)
- **UptimeRobot** (gratis)
- **Pingdom** (pago)

### 3. Error Tracking
- **Sentry** (gratis para proyectos pequeños)
- **LogRocket** (pago)

---

**Nota**: Recuerda que Netlify es principalmente para sitios estáticos. Para funcionalidades de backend complejas, considera usar Netlify Functions o una base de datos externa. 