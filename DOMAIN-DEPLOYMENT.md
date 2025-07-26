# 🚀 Despliegue en sinapsislegal.com - Guía Completa

## 📋 Checklist de Preparación

### **✅ Archivos Listos:**
- ✅ `index.html` - Página principal
- ✅ `precios.html` - Página de precios y pagos
- ✅ `servicios.html` - Página de servicios
- ✅ `contacto.html` - Página de contacto
- ✅ `styles.css` - Estilos completos
- ✅ `script.js` - Funcionalidades JavaScript
- ✅ `conekta.js` - Integración de pagos
- ✅ `netlify/functions/api.js` - Backend API
- ✅ `netlify/functions/conekta-config.js` - Configuración Conekta
- ✅ `netlify.toml` - Configuración Netlify
- ✅ `package.json` - Dependencias Node.js
- ✅ `LOGOSNPSLGL.png` - Logo de la empresa

## 🌐 Paso 1: Crear Cuenta en Netlify

### **1.1 Ir a Netlify:**
- Visita: https://netlify.com
- Haz clic en "Sign up"
- Usa tu cuenta de GitHub, GitLab o email

### **1.2 Verificar Cuenta:**
- Confirma tu email
- Completa el perfil básico

## 📁 Paso 2: Subir el Proyecto

### **Opción A: Drag & Drop (Más Fácil)**

1. **Preparar archivos:**
   - Abre la carpeta `C:\Users\diego\2WEBSITE`
   - Selecciona TODOS los archivos y carpetas
   - Asegúrate de incluir:
     - `index.html`
     - `precios.html`
     - `servicios.html`
     - `contacto.html`
     - `styles.css`
     - `script.js`
     - `conekta.js`
     - `LOGOSNPSLGL.png`
     - `netlify/` (carpeta completa)
     - `netlify.toml`
     - `package.json`

2. **Subir a Netlify:**
   - Ve a https://app.netlify.com
   - Arrastra la carpeta completa al área de "Drag and drop your site output folder here"
   - Espera a que se procese

### **Opción B: Git (Recomendado para actualizaciones)**

1. **Crear repositorio en GitHub:**
   - Ve a https://github.com
   - Crea nuevo repositorio: `sinapsislegal-website`
   - Sube todos los archivos

2. **Conectar en Netlify:**
   - En Netlify, haz clic en "New site from Git"
   - Selecciona GitHub
   - Elige tu repositorio
   - Configura build settings:
     - Build command: `npm install`
     - Publish directory: `.`

## ⚙️ Paso 3: Configurar Variables de Entorno

### **3.1 Ir a Configuración del Sitio:**
- En tu sitio de Netlify, ve a "Site settings"
- Busca "Environment variables"

### **3.2 Agregar Variables:**
```
CONEKTA_PRIVATE_KEY = key_lBBN2nnZHXyXiaiCY4mHne9
CONEKTA_PUBLIC_KEY = key_JBz73eqOQwH5gRgim311F52
NODE_VERSION = 18
```

## 🌍 Paso 4: Configurar Dominio Personalizado

### **4.1 En Netlify:**
- Ve a "Domain settings"
- Haz clic en "Add custom domain"
- Escribe: `sinapsislegal.com`
- Haz clic en "Verify"

### **4.2 Configurar DNS:**
Netlify te dará estos registros DNS para configurar en tu proveedor de dominio:

```
Type: A
Name: @
Value: 75.2.60.5

Type: CNAME
Name: www
Value: tu-sitio.netlify.app
```

### **4.3 En tu Proveedor de Dominio:**
1. Ve al panel de control de tu dominio
2. Busca "DNS Management" o "Nameservers"
3. Agrega los registros que te dio Netlify
4. Espera 24-48 horas para propagación

## 🔧 Paso 5: Configurar HTTPS

### **5.1 SSL Automático:**
- Netlify configura SSL automáticamente
- Ve a "Domain settings" > "HTTPS"
- Verifica que esté activado

### **5.2 Forzar HTTPS:**
- En "Domain settings" > "HTTPS"
- Activa "Force HTTPS"

## 📧 Paso 6: Configurar Formularios

### **6.1 Activar Formularios:**
- Ve a "Site settings" > "Forms"
- Verifica que los formularios estén activos

### **6.2 Configurar Notificaciones:**
- En "Forms" > "Form notifications"
- Agrega tu email para recibir mensajes

## 🧪 Paso 7: Probar el Sitio

### **7.1 Verificar Funcionalidades:**
- ✅ Página principal carga
- ✅ Navegación funciona
- ✅ Formulario de contacto
- ✅ Página de precios
- ✅ Sistema de pagos
- ✅ Página de servicios

### **7.2 URLs de Prueba:**
- https://sinapsislegal.com
- https://sinapsislegal.com/precios.html
- https://sinapsislegal.com/servicios.html
- https://sinapsislegal.com/contacto.html

## 🔄 Paso 8: Actualizaciones Futuras

### **Para actualizar el sitio:**
1. Modifica los archivos localmente
2. Sube los cambios a Netlify (drag & drop o Git)
3. Netlify actualiza automáticamente

## 🚨 Solución de Problemas

### **Error: "Functions not found"**
- Verifica que la carpeta `netlify/functions/` esté incluida
- Revisa que `package.json` tenga las dependencias correctas

### **Error: "Domain not found"**
- Verifica los registros DNS
- Espera 24-48 horas para propagación

### **Error: "Payment not working"**
- Verifica las variables de entorno de Conekta
- Revisa la consola del navegador

## 📞 Soporte

### **Recursos Útiles:**
- Netlify Docs: https://docs.netlify.com
- Conekta Docs: https://developers.conekta.com
- Status Netlify: https://status.netlify.com

---

## 🎉 ¡Tu Sitio Estará Disponible en:
### **https://sinapsislegal.com**

**¡Listo para recibir clientes!** 🚀 