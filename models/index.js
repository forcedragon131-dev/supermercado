const sequelize = require('../config/database');
const Provider = require('./provider');
const Product = require('./product');
const User = require('./user');
const Sale = require('./sale');
const SaleDetail = require('./saleDetail');

Provider.hasMany(Product, { foreignKey: 'providerId', as: 'products' });
Product.belongsTo(Provider, { foreignKey: 'providerId', as: 'provider' });

User.hasMany(Sale, { foreignKey: 'userId', as: 'sales' });
Sale.belongsTo(User, { foreignKey: 'userId', as: 'user' });

Sale.hasMany(SaleDetail, { foreignKey: 'saleId', as: 'details', onDelete: 'CASCADE' });
SaleDetail.belongsTo(Sale, { foreignKey: 'saleId', as: 'sale' });

Product.hasMany(SaleDetail, { foreignKey: 'productId', as: 'saleDetails' });
SaleDetail.belongsTo(Product, { foreignKey: 'productId', as: 'product' });

module.exports = {
  sequelize,
  Provider,
  Product,
  User,
  Sale,
  SaleDetail,
};
