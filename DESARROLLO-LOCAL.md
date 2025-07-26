# Desarrollo Local - Sinapsis Legal

## 🚀 Iniciar el Proyecto Localmente

### **Opción 1: Usando el Script de Windows (Recomendado)**

1. **Doble clic en el archivo:**
   ```
   start-dev.bat
   ```

2. **O desde PowerShell:**
   ```powershell
   .\start-dev.bat
   ```

### **Opción 2: Usando npm**

```powershell
npm run dev:windows
```

### **Opción 3: Comando Directo**

```powershell
netlify dev
```

## 🌐 URLs de Desarrollo

Una vez iniciado el servidor:

- **Sitio Web:** http://localhost:8888
- **Funciones API:** http://localhost:9999
- **Endpoint de API:** http://localhost:8888/.netlify/functions/api

## 🔧 Solución de Problemas

### **Error 404 en API**

Si ves errores 404 en la consola del navegador:

1. **Verificar que Netlify CLI esté instalado:**
   ```powershell
   netlify --version
   ```

2. **Si no está instalado:**
   ```powershell
   npm install -g netlify-cli
   ```

3. **Instalar dependencias del proyecto:**
   ```powershell
   npm install
   ```

4. **Reiniciar el servidor:**
   - Presiona `Ctrl+C` para detener
   - Ejecuta `netlify dev` nuevamente

### **Error de Puerto en Uso**

Si el puerto 8888 está ocupado:

1. **Cambiar puerto en `netlify.toml`:**
   ```toml
   [dev]
     port = 8889  # Cambiar a otro puerto
   ```

2. **O usar puerto automático:**
   ```powershell
   netlify dev --port 0
   ```

### **Error de Funciones**

Si las funciones no cargan:

1. **Verificar estructura de archivos:**
   ```
   netlify/
   └── functions/
       └── api.js
   ```

2. **Verificar dependencias en `package.json`:**
   ```json
   {
     "dependencies": {
       "conekta": "^4.0.0",
       "mysql2": "^3.0.0",
       "nodemailer": "^6.0.0"
     }
   }
   ```

## 📝 Logs de Desarrollo

### **Logs del Servidor**
- El servidor mostrará logs en la consola
- Incluye información sobre funciones cargadas
- Muestra errores de API

### **Logs del Navegador**
- Abre las herramientas de desarrollador (F12)
- Ve a la pestaña "Console"
- Revisa errores y warnings

## 🧪 Probar Funcionalidades

### **1. Página Principal**
- Ir a http://localhost:8888
- Verificar que carga correctamente

### **2. Sistema de Pagos**
- Ir a http://localhost:8888/precios.html
- Hacer clic en "Seleccionar" en cualquier plan
- Verificar que aparece el modal de Conekta

### **3. API de Conekta**
- En la consola del navegador, verificar que no hay errores 404
- El modal debe cargar la configuración de Conekta

## 🔄 Reiniciar Servidor

Para reiniciar el servidor:

1. **Detener:** `Ctrl+C` en la consola
2. **Iniciar:** `netlify dev` o `.\start-dev.bat`

## 📱 Probar en Móvil

Para probar en tu móvil:

1. **Obtener IP local:**
   ```powershell
   ipconfig
   ```

2. **Buscar tu IP (ejemplo: 192.168.1.100)**

3. **Acceder desde móvil:**
   ```
   http://192.168.1.100:8888
   ```

## 🚨 Problemas Comunes

### **"netlify no se reconoce"**
```powershell
npm install -g netlify-cli
```

### **"Puerto ya en uso"**
```powershell
netlify dev --port 8889
```

### **"Error 404 en API"**
- Verificar que `netlify/functions/api.js` existe
- Reiniciar el servidor
- Verificar logs en consola

### **"Error de Conekta"**
- Verificar llaves en `backend/conekta-config.js`
- Verificar que las funciones cargan correctamente

---

**¡Con estos pasos tu proyecto debería funcionar correctamente en desarrollo local!** 🎉 