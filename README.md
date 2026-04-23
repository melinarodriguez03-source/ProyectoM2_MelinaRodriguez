# Proyecto M2 - API REST para Blog

## Descripción del Proyecto

API REST desarrollada con **Express.js** y **PostgreSQL** para gestionar un blog. Permite crear, leer, actualizar y eliminar autores y posts con validación de datos, manejo de errores centralizado y documentación interactiva con Swagger UI.

### Características
- ✅ API RESTful completa para autores y posts
- ✅ Validación de datos con sanitización
- ✅ Manejo centralizado de errores
- ✅ Documentación OpenAPI con Swagger UI
- ✅ Tests unitarios con Vitest y Supertest
- ✅ Base de datos PostgreSQL con relaciones
- ✅ Variables de entorno con dotenv

---

## Requisitos Previos

- **Node.js** v18+ 
- **PostgreSQL** v12+
- **npm** o **yarn**

---

## Instalación y Ejecución Local

### 1. Clonar el Repositorio
```bash
git clone <url-del-repositorio>
cd Proyecto\ M2
```

### 2. Instalar Dependencias
```bash
npm install
```

### 3. Configurar Variables de Entorno

Crear un archivo `.env` en la raíz del proyecto:

```env
# .env
PORT=3000
DATABASE_URL=postgresql://postgres:password@localhost:5432/blog_db
NODE_ENV=development
```

**Variables explicadas:**
- `PORT`: Puerto donde se ejecutará el servidor (default: 3000)
- `DATABASE_URL`: Cadena de conexión a PostgreSQL
- `NODE_ENV`: Ambiente (development/production)

### 4. Crear la Base de Datos

Abrir psql y ejecutar:

```sql
CREATE DATABASE blog_db;
```

### 5. Ejecutar el Script de Setup SQL

Con la base de datos creada, ejecutar:

```bash
node src/db/test-connection.js
```

Luego ejecutar el SQL manualmente o usar:

```bash
psql -U postgres -d blog_db -f src/db/setup.sql
```

Este script creará las tablas `authors` y `posts` con datos de prueba.

### 6. Iniciar el Servidor

**Modo Desarrollo** (con auto-reload):
```bash
npm run dev
```

**Modo Producción**:
```bash
npm start
```

El servidor estará disponible en: `http://localhost:3000`

---

## Cómo Ejecutar los Tests

### Ejecutar todos los tests
```bash
npm test
```

### Ejecutar tests en modo watch
```bash
npm test -- --watch
```

### Generar reporte de coverage
```bash
npm run test:coverage
```

### Ejecutar tests con UI interactiva
```bash
npm run test:ui
```

**Archivos de test incluidos:**
- `src/test/app.test.js` - Tests de la aplicación principal
- `src/test/authors.test.js` - Tests del módulo de autores
- `src/test/posts.test.js` - Tests del módulo de posts
- `src/test/errorHandler.test.js` - Tests del manejador de errores
- `src/test/validators.test.js` - Tests de validación

---

## Documentación OpenAPI (Swagger UI)

La API incluye documentación interactiva con **Swagger UI**.

### Acceder a la Documentación

Una vez que el servidor está en ejecución, visita:

```
http://localhost:3000/api-docs
```

**Endpoints disponibles:**

- **Autores**
  - `GET /api/authors` - Listar todos los autores
  - `GET /api/authors/:id` - Obtener un autor específico
  - `POST /api/authors` - Crear nuevo autor
  - `PUT /api/authors/:id` - Actualizar autor
  - `DELETE /api/authors/:id` - Eliminar autor

- **Posts**
  - `GET /api/posts` - Listar todos los posts
  - `GET /api/posts/:id` - Obtener un post específico
  - `POST /api/posts` - Crear nuevo post
  - `PUT /api/posts/:id` - Actualizar post
  - `DELETE /api/posts/:id` - Eliminar post

El archivo `openapi.yaml` contiene la definición completa de la API.

---

## Deployment en Railway

### 1. Preparar el Proyecto

Asegurarse de que el `package.json` tenga los scripts necesarios:
```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "node --watch server.js"
  }
}
```

### 2. Variables de Entorno en Railway

En el dashboard de Railway, agregar las siguientes variables:

```
PORT=3000
NODE_ENV=production
DATABASE_URL=postgresql://user:password@localhost:5432/blog_db
```

**Nota**: Railway proporciona automáticamente `DATABASE_URL` si usas su servicio de PostgreSQL.

### 3. URLs en Railway

- **Public URL** (acceso desde internet):
  ```
  https://<app-name>.railway.app
  ```
  
- **Internal URL** (acceso desde otros servicios Railway):
  ```
  http://<app-name>:3000
  ```

### 4. Conectar Base de Datos en Railway

1. Crear un plugin PostgreSQL en el proyecto Railway
2. Railway asignará automáticamente `DATABASE_URL`
3. Ejecutar las migraciones SQL en el dashboard de Railway o vía CLI

### 5. Deploy

```bash
# Instalar Railway CLI
npm install -g @railway/cli

# Login
railway login

# Iniciar proyecto
railway init

# Deploy
railway up
```

Alternativamente, conectar el repositorio GitHub directamente en el dashboard de Railway para despliegue automático.

---

## Registro del Uso de AI en el Proyecto

### Herramientas de IA Utilizadas

- **GitHub Copilot**: Asistencia en la generación de código, completación de funciones y estructura del proyecto.
- **ChatGPT/Claude**: 
  - Consultas sobre arquitectura REST y best practices
  - Generación de validadores de datos
  - Creación de scripts SQL de setup
  - Redacción de documentación Este README.md
  - Configuración de tests con Vitest

### Contribuciones de AI

- ✅ Generación de controladores y servicios
- ✅ Implementación de validadores de datos
- ✅ Estructura de rutas y middleware
- ✅ Configuración de tests automáticos
- ✅ Definición OpenAPI/Swagger
- ✅ Documentación técnica

### Responsabilidad del Desarrollador

- ✅ Revisión y validación de todo el código generado
- ✅ Pruebas manuales y unitarias
- ✅ Decisiones arquitectónicas finales
- ✅ Ajustes y mejoras específicas del proyecto
- ✅ Implementación de lógica de negocio

---

## Estructura del Proyecto

```
Proyecto M2/
├── src/
│   ├── controllers/      # Controladores de rutas
│   ├── db/              # Configuración y setup de BD
│   ├── middleware/      # Middleware (manejo de errores)
│   ├── routes/          # Definición de rutas
│   ├── services/        # Lógica de negocio
│   └── test/            # Tests automáticos
├── app.js               # Configuración de Express
├── server.js            # Punto de entrada
├── validators.js        # Validadores de datos
├── vitest.config.js     # Configuración de tests
├── openapi.yaml         # Documentación OpenAPI
├── .env.example         # Variables de entorno ejemplo
└── README.md            # Este archivo
```

---

## Scripts Disponibles

| Script | Descripción |
|--------|-------------|
| `npm start` | Inicia el servidor en modo producción |
| `npm run dev` | Inicia el servidor en modo desarrollo con auto-reload |
| `npm test` | Ejecuta los tests |
| `npm run test:coverage` | Genera reporte de cobertura |
| `npm run test:ui` | Abre UI interactiva de tests |

---

## Solución de Problemas

### Error: "Cannot find module"
- Verificar que todas las rutas en imports usen `src/` correctamente
- Ejecutar `npm install` nuevamente

### Error: "database does not exist"
- Crear la base de datos: `CREATE DATABASE blog_db;`
- Ejecutar el script SQL: `psql -U postgres -d blog_db -f src/db/setup.sql`

### Error de conexión a PostgreSQL
- Verificar que PostgreSQL esté ejecutándose
- Validar `DATABASE_URL` en `.env`
- Ejecutar: `node src/db/test-connection.js`

### Tests fallando
- Asegurarse que la base de datos de test existe
- Limpiar node_modules: `rm -rf node_modules && npm install`
- Ejecutar: `npm test -- --reporter=verbose`

---

## Contacto y Soporte

Para preguntas o problemas, contactar al equipo de desarrollo.

---

**Última actualización**: Abril 2026  
**Versión**: 1.0.0  
**Licencia**: ISC
