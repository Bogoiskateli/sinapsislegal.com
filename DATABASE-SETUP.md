# Configuración de Base de Datos - Sinapsis Legal

## 🗄️ Opciones de Base de Datos

### **Opción 1: Modo Desarrollo (Recomendado para Pruebas)**

El sistema actual funciona en **modo simulado** para desarrollo:
- ✅ **No requiere base de datos real**
- ✅ **Pagos simulados** funcionan perfectamente
- ✅ **Tokens de Conekta** simulados
- ✅ **Listo para producción** cuando se configure MySQL

### **Opción 2: MySQL Local (Para Desarrollo Completo)**

Si quieres usar una base de datos real:

#### **1. Instalar MySQL:**
```bash
# Windows (usando Chocolatey)
choco install mysql

# O descargar desde: https://dev.mysql.com/downloads/mysql/
```

#### **2. Crear Base de Datos:**
```sql
CREATE DATABASE sinapsislegal_db;
USE sinapsislegal_db;
```

#### **3. Ejecutar Script SQL:**
```bash
mysql -u root -p sinapsislegal_db < backend/database.sql
```

#### **4. Configurar Variables de Entorno:**
Crear archivo `.env` en la raíz:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_password
DB_NAME=sinapsislegal_db
```

### **Opción 3: Base de Datos en la Nube**

#### **PlanetScale (Gratis):**
1. Crear cuenta en [planetscale.com](https://planetscale.com)
2. Crear nueva base de datos
3. Obtener credenciales de conexión
4. Configurar variables de entorno

#### **Railway (Gratis):**
1. Crear cuenta en [railway.app](https://railway.app)
2. Crear servicio MySQL
3. Obtener credenciales
4. Configurar variables de entorno

## 🔧 Configuración Actual

### **Modo Desarrollo (Actual):**
- ✅ **Pagos simulados** funcionando
- ✅ **Tokens simulados** de Conekta
- ✅ **Sin dependencias** de base de datos
- ✅ **Listo para pruebas**

### **Para Activar Base de Datos Real:**

1. **Editar `netlify/functions/api.js`:**
   ```javascript
   // Descomentar estas líneas:
   // let connection;
   // try {
   //   connection = await mysql.createConnection(dbConfig);
   //   // ... resto del código de base de datos
   ```

2. **Configurar variables de entorno en Netlify:**
   - `DB_HOST`
   - `DB_USER`
   - `DB_PASSWORD`
   - `DB_NAME`

## 📊 Estructura de la Base de Datos

### **Tablas Principales:**
- `payments` - Registro de pagos
- `users` - Usuarios del sistema
- `contact_messages` - Mensajes de contacto
- `trademark_searches` - Búsquedas de marcas
- `activity_logs` - Logs de actividad

### **Script SQL:**
Ver archivo `backend/database.sql` para la estructura completa.

## 🚀 Estado Actual del Proyecto

### **✅ Funcionando:**
- ✅ Frontend completo
- ✅ Sistema de pagos con Conekta
- ✅ Tokens simulados
- ✅ Validación de formularios
- ✅ Diseño responsive
- ✅ Backend con Netlify Functions

### **🔄 Para Producción:**
- 🔄 Configurar base de datos real
- 🔄 Activar Conekta real (no simulado)
- 🔄 Configurar variables de entorno
- 🔄 Desplegar en Netlify

## 🎯 Próximos Pasos

1. **Probar el sistema actual** (modo simulado)
2. **Configurar base de datos** si es necesario
3. **Activar Conekta real** para producción
4. **Desplegar en Netlify**

---

**¡El sistema está funcionando perfectamente en modo desarrollo!** 🎉 