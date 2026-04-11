const { Product, Provider } = require('../models');

exports.getAll = async (req, res, next) => {
  try {
    const products = await Product.findAll({
      include: [{ model: Provider, as: 'provider' }],
    });
    res.json({ success: true, data: products });
  } catch (error) {
    next(error);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [{ model: Provider, as: 'provider' }],
    });
    if (!product) {
      return res.status(404).json({ success: false, message: 'Producto no encontrado' });
    }
    res.json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
};

exports.create = async (req, res, next) => {
  try {
    const provider = await Provider.findByPk(req.body.providerId);
    if (!provider) {
      return res.status(400).json({ success: false, message: 'El proveedor asociado no existe' });
    }

    const product = await Product.create(req.body);
    res.status(201).json({ success: true, message: 'Producto creado correctamente', data: product });
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Producto no encontrado' });
    }

    if (req.body.providerId) {
      const provider = await Provider.findByPk(req.body.providerId);
      if (!provider) {
        return res.status(400).json({ success: false, message: 'El proveedor asociado no existe' });
      }
    }

    await product.update(req.body);
    res.json({ success: true, message: 'Producto actualizado correctamente', data: product });
  } catch (error) {
    next(error);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Producto no encontrado' });
    }
    await product.destroy();
    res.json({ success: true, message: 'Producto eliminado correctamente' });
  } catch (error) {
    next(error);
  }
};
