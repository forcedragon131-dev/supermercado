require('dotenv').config();
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./docs/swagger');
const routes = require('./routes');
const { sequelize } = require('./models');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'API de supermercado funcionando correctamente',
    documentation: '/api-docs',
  });
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api', routes);
app.use(errorHandler);

sequelize.authenticate()
  .then(() => {
    console.log('Conexión a PostgreSQL establecida correctamente.');
    return sequelize.sync({ alter: true });
  })
  .then(() => {
    console.log('Modelos sincronizados correctamente.');
    app.listen(PORT, () => {
      console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
  console.error('No se pudo iniciar la aplicación:');
  console.error(error);
});
