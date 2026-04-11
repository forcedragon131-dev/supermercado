# Entregable completo - Actividad colaborativa I

## 1. Qué pide exactamente la actividad
Según el documento de la actividad, el backend debe cumplir con lo siguiente:

1. Desarrollar una API REST para un supermercado.
2. Usar Node.js, Express.js, PostgreSQL y Sequelize.
3. Implementar arquitectura MVC estricta.
4. Crear las entidades:
   - Productos
   - Usuarios
   - Proveedores
   - Ventas
   - DetalleVenta
5. Definir correctamente sus relaciones.
6. Implementar CRUD completo para cada entidad.
7. Validar:
   - precio mayor a 0
   - stock no negativo
   - email único
   - total de venta calculado automáticamente
8. Inicializar servidor, conexión a BD y rutas desde `server.js`.
9. Responder siempre en formato JSON.
10. Documentar con Swagger.
11. Tener repositorio GitHub público.
12. Incluir README con:
   - nombres completos
   - responsabilidades
   - instrucciones de ejecución
   - ejemplos de endpoints
13. Ejecutarse con:
   - `npm install`
   - `npm start`

---

## 2. Qué contiene este entregable
Este entregable ya incluye:

- Estructura MVC completa.
- Modelos Sequelize por entidad.
- Relaciones entre modelos.
- Controladores separados con lógica de negocio.
- Rutas separadas por entidad.
- Middleware para manejo de errores.
- Swagger UI para documentación.
- README completo.
- Archivo `.env.example`.
- `package.json` listo.
- `server.js` inicializando servidor, BD y rutas.

---

## 3. Estructura final del proyecto
```bash
supermercado-backend/
├── config/
│   └── database.js
├── controllers/
│   ├── productController.js
│   ├── providerController.js
│   ├── saleController.js
│   ├── saleDetailController.js
│   └── userController.js
├── docs/
│   └── swagger.js
├── middlewares/
│   └── errorHandler.js
├── models/
│   ├── index.js
│   ├── product.js
│   ├── provider.js
│   ├── sale.js
│   ├── saleDetail.js
│   └── user.js
├── routes/
│   ├── index.js
│   ├── productRoutes.js
│   ├── providerRoutes.js
│   ├── saleDetailRoutes.js
│   ├── saleRoutes.js
│   └── userRoutes.js
├── .env.example
├── .gitignore
├── ENTREGABLE_COMPLETO.md
├── package.json
├── README.md
└── server.js
```

---

## 4. Paso a paso para entregarlo correctamente

### Paso 1. Crear la base de datos en PostgreSQL
Crear una base de datos llamada, por ejemplo:

```sql
CREATE DATABASE supermercado_db;
```

### Paso 2. Configurar variables de entorno
Copiar `.env.example` y crear un archivo `.env` con estos datos:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=supermercado_db
DB_USER=postgres
DB_PASSWORD=postgres
```

### Paso 3. Instalar dependencias
```bash
npm install
```

### Paso 4. Ejecutar el proyecto
```bash
npm start
```

### Paso 5. Verificar funcionamiento
Abrir en el navegador:
- API: `http://localhost:3000/`
- Swagger: `http://localhost:3000/api-docs`

### Paso 6. Subir a GitHub público
Subir esta carpeta a un repositorio público.

### Paso 7. Completar README antes de entregar
Reemplazar en `README.md`:
- nombres reales de los integrantes
- responsabilidades reales de cada uno

### Paso 8. Asegurar commits verificables
Cada integrante debe hacer al menos un commit desde su cuenta.

---

## 5. Checklist final contra los requisitos

### Requisitos técnicos
- [x] Node.js
- [x] Express.js
- [x] PostgreSQL
- [x] Sequelize ORM
- [x] Arquitectura MVC estricta

### Entidades
- [x] Productos
- [x] Usuarios
- [x] Proveedores
- [x] Ventas
- [x] DetalleVenta

### Relaciones
- [x] Proveedor → Productos
- [x] Usuario → Ventas
- [x] Venta → DetalleVenta
- [x] Producto → DetalleVenta

### CRUD por entidad
- [x] GET all
- [x] GET by id
- [x] POST
- [x] PUT
- [x] DELETE

### Validaciones mínimas
- [x] Precio mayor a 0
- [x] Stock no negativo
- [x] Email único
- [x] Total calculado automáticamente

### Entrada principal
- [x] Servidor Express
- [x] Conexión a base de datos
- [x] Rutas

### Documentación
- [x] Swagger
- [x] README con estructura requerida

### Penalizaciones evitadas
- [x] Sin lógica de negocio en rutas
- [x] Modelos con relaciones definidas
- [x] Respuestas JSON
- [x] Proyecto estructurado para ejecutar correctamente
- [x] Listo para repositorio público

---

## 6. Observaciones importantes para que no te bajen puntos
1. Cambia los nombres genéricos del README por los nombres reales.
2. Sube el repositorio en modo público, no privado.
3. Asegúrate de que todos hagan commits.
4. Prueba mínimo un POST, un GET y un DELETE en Swagger antes de entregar.
5. No muevas lógica de negocio a las rutas, ya está correctamente en controladores.

---

## 7. Conclusión
Este entregable ya está construido siguiendo lo que exige la actividad. Solo faltaría personalizar nombres, crear la base de datos local, configurar el `.env`, instalar dependencias, probar y subirlo al repositorio público.
