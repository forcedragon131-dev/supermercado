# Backend de Supermercado - Node.js + Express + PostgreSQL

## Integrantes
Juan Jose Loaiza Gutierrez
Willfran Alexander Castro Muñoz
Juan Jose Pinzon Hernandez
## Responsabilidades
- Integrante 1,2,3: configuración inicial del proyecto y conexión a base de datos.
- Integrante 1,2,3: modelos Sequelize y relaciones.
- Integrante 1,2,3: controladores, validaciones y lógica de negocio.
- Integrante 1,2,3: documentación Swagger, pruebas y README.

## Descripción
Este proyecto implementa una API REST para la gestión de un supermercado usando arquitectura MVC estricta. Permite administrar productos, proveedores, usuarios, ventas y detalle de ventas.

## Tecnologías utilizadas
- Node.js
- Express.js
- PostgreSQL
- Sequelize ORM
- Swagger UI

## Estructura del proyecto
```bash
supermercado-backend/
├── config/
├── controllers/
├── docs/
├── middlewares/
├── models/
├── routes/
├── .env.example
├── .gitignore
├── package.json
├── README.md
└── server.js
```

## Requisitos previos
- Node.js instalado
- PostgreSQL instalado y en ejecución
- Base de datos creada en PostgreSQL

## Configuración
1. Clonar el repositorio.
2. Entrar a la carpeta del proyecto.
3. Copiar el archivo `.env.example` y renombrarlo como `.env`.
4. Configurar las credenciales de la base de datos.

## Variables de entorno
```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=supermercado_db
DB_USER=postgres
DB_PASSWORD=postgres
```

## Instrucciones de ejecución
```bash
npm install
npm start
```

## Endpoints obligatorios
### Providers
- GET `/api/providers`
- GET `/api/providers/:id`
- POST `/api/providers`
- PUT `/api/providers/:id`
- DELETE `/api/providers/:id`

### Products
- GET `/api/products`
- GET `/api/products/:id`
- POST `/api/products`
- PUT `/api/products/:id`
- DELETE `/api/products/:id`

### Users
- GET `/api/users`
- GET `/api/users/:id`
- POST `/api/users`
- PUT `/api/users/:id`
- DELETE `/api/users/:id`

### Sales
- GET `/api/sales`
- GET `/api/sales/:id`
- POST `/api/sales`
- PUT `/api/sales/:id`
- DELETE `/api/sales/:id`

### Sale Details
- GET `/api/sale-details`
- GET `/api/sale-details/:id`
- POST `/api/sale-details`
- PUT `/api/sale-details/:id`
- DELETE `/api/sale-details/:id`

## Ejemplos de requests
### Crear proveedor
```json
{
  "name": "Distribuidora Central",
  "phone": "3001234567",
  "email": "contacto@proveedor.com",
  "city": "Medellín"
}
```

### Crear producto
```json
{
  "name": "Arroz",
  "description": "Arroz premium de 500g",
  "price": 4500,
  "stock": 100,
  "providerId": 1
}
```

### Crear usuario
```json
{
  "name": "María Gómez",
  "email": "maria@correo.com",
  "role": "cajero"
}
```

### Crear venta
```json
{
  "userId": 1,
  "date": "2026-03-25",
  "details": [
    {
      "productId": 1,
      "quantity": 2,
      "price": 4500
    }
  ]
}
```

## Validaciones implementadas
- Precio del producto mayor a 0.
- Stock del producto no negativo.
- Email único en usuarios.
- Total de venta calculado automáticamente.
- Verificación de existencia de relaciones.
- Verificación de stock suficiente en ventas.

## Swagger
La documentación se encuentra disponible en:
- `http://localhost:3000/api-docs`

## Notas importantes
- Todas las respuestas están en formato JSON.
- La lógica de negocio está ubicada en controladores.
- Las relaciones están definidas en Sequelize.
- El proyecto está listo para ejecutarse con `npm install` y `npm start`.
