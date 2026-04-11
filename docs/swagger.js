const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Supermercado',
      version: '1.0.0',
      description: 'API REST para la gestión de productos, proveedores, usuarios, ventas y detalle de ventas.',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor local',
      },
    ],
    components: {
      schemas: {
        Provider: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            name: { type: 'string', example: 'Distribuidora Central' },
            phone: { type: 'string', example: '3001234567' },
            email: { type: 'string', example: 'contacto@proveedor.com' },
            city: { type: 'string', example: 'Medellín' },
          },
        },
        Product: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            name: { type: 'string', example: 'Arroz' },
            description: { type: 'string', example: 'Arroz premium de 500g' },
            price: { type: 'number', example: 4500 },
            stock: { type: 'integer', example: 100 },
            providerId: { type: 'integer', example: 1 },
          },
        },
        User: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            name: { type: 'string', example: 'María Gómez' },
            email: { type: 'string', example: 'maria@correo.com' },
            role: { type: 'string', example: 'cajero' },
          },
        },
        SaleDetailInput: {
          type: 'object',
          properties: {
            productId: { type: 'integer', example: 1 },
            quantity: { type: 'integer', example: 2 },
            price: { type: 'number', example: 4500 },
          },
        },
        Sale: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            userId: { type: 'integer', example: 1 },
            date: { type: 'string', example: '2026-03-25' },
            total: { type: 'number', example: 9000 },
          },
        },
        SaleCreate: {
          type: 'object',
          properties: {
            userId: { type: 'integer', example: 1 },
            date: { type: 'string', example: '2026-03-25' },
            details: {
              type: 'array',
              items: { $ref: '#/components/schemas/SaleDetailInput' },
            },
          },
        },
        SaleDetail: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            saleId: { type: 'integer', example: 1 },
            productId: { type: 'integer', example: 1 },
            quantity: { type: 'integer', example: 2 },
            price: { type: 'number', example: 4500 },
          },
        },
      },
    },
    paths: {
      '/api/providers': {
        get: { tags: ['Providers'], summary: 'Listar proveedores', responses: { 200: { description: 'OK' } } },
        post: {
          tags: ['Providers'],
          summary: 'Crear proveedor',
          requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/Provider' } } } },
          responses: { 201: { description: 'Creado' } },
        },
      },
      '/api/providers/{id}': {
        get: { tags: ['Providers'], summary: 'Obtener proveedor por id', parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }], responses: { 200: { description: 'OK' }, 404: { description: 'No encontrado' } } },
        put: { tags: ['Providers'], summary: 'Actualizar proveedor', parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }], requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/Provider' } } } }, responses: { 200: { description: 'Actualizado' } } },
        delete: { tags: ['Providers'], summary: 'Eliminar proveedor', parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }], responses: { 200: { description: 'Eliminado' } } },
      },
      '/api/products': {
        get: { tags: ['Products'], summary: 'Listar productos', responses: { 200: { description: 'OK' } } },
        post: { tags: ['Products'], summary: 'Crear producto', requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/Product' } } } }, responses: { 201: { description: 'Creado' } } },
      },
      '/api/products/{id}': {
        get: { tags: ['Products'], summary: 'Obtener producto por id', parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }], responses: { 200: { description: 'OK' } } },
        put: { tags: ['Products'], summary: 'Actualizar producto', parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }], requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/Product' } } } }, responses: { 200: { description: 'Actualizado' } } },
        delete: { tags: ['Products'], summary: 'Eliminar producto', parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }], responses: { 200: { description: 'Eliminado' } } },
      },
      '/api/users': {
        get: { tags: ['Users'], summary: 'Listar usuarios', responses: { 200: { description: 'OK' } } },
        post: { tags: ['Users'], summary: 'Crear usuario', requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/User' } } } }, responses: { 201: { description: 'Creado' } } },
      },
      '/api/users/{id}': {
        get: { tags: ['Users'], summary: 'Obtener usuario por id', parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }], responses: { 200: { description: 'OK' } } },
        put: { tags: ['Users'], summary: 'Actualizar usuario', parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }], requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/User' } } } }, responses: { 200: { description: 'Actualizado' } } },
        delete: { tags: ['Users'], summary: 'Eliminar usuario', parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }], responses: { 200: { description: 'Eliminado' } } },
      },
      '/api/sales': {
        get: { tags: ['Sales'], summary: 'Listar ventas', responses: { 200: { description: 'OK' } } },
        post: { tags: ['Sales'], summary: 'Crear venta', requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/SaleCreate' } } } }, responses: { 201: { description: 'Creada' } } },
      },
      '/api/sales/{id}': {
        get: { tags: ['Sales'], summary: 'Obtener venta por id', parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }], responses: { 200: { description: 'OK' } } },
        put: { tags: ['Sales'], summary: 'Actualizar venta', parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }], requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/SaleCreate' } } } }, responses: { 200: { description: 'Actualizada' } } },
        delete: { tags: ['Sales'], summary: 'Eliminar venta', parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }], responses: { 200: { description: 'Eliminada' } } },
      },
      '/api/sale-details': {
        get: { tags: ['Sale Details'], summary: 'Listar detalles de venta', responses: { 200: { description: 'OK' } } },
        post: { tags: ['Sale Details'], summary: 'Crear detalle de venta', requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/SaleDetail' } } } }, responses: { 201: { description: 'Creado' } } },
      },
      '/api/sale-details/{id}': {
        get: { tags: ['Sale Details'], summary: 'Obtener detalle por id', parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }], responses: { 200: { description: 'OK' } } },
        put: { tags: ['Sale Details'], summary: 'Actualizar detalle', parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }], requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/SaleDetail' } } } }, responses: { 200: { description: 'Actualizado' } } },
        delete: { tags: ['Sale Details'], summary: 'Eliminar detalle', parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }], responses: { 200: { description: 'Eliminado' } } },
      },
    },
  },
  apis: [],
};

module.exports = swaggerJsdoc(options);
