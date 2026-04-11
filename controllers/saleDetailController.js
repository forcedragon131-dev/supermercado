const { SaleDetail, Sale, Product } = require('../models');

exports.getAll = async (req, res, next) => {
  try {
    const details = await SaleDetail.findAll({
      include: [
        { model: Sale, as: 'sale' },
        { model: Product, as: 'product' },
      ],
    });
    res.json({ success: true, data: details });
  } catch (error) {
    next(error);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const detail = await SaleDetail.findByPk(req.params.id, {
      include: [
        { model: Sale, as: 'sale' },
        { model: Product, as: 'product' },
      ],
    });
    if (!detail) {
      return res.status(404).json({ success: false, message: 'Detalle de venta no encontrado' });
    }
    res.json({ success: true, data: detail });
  } catch (error) {
    next(error);
  }
};

exports.create = async (req, res, next) => {
  try {
    const sale = await Sale.findByPk(req.body.saleId);
    const product = await Product.findByPk(req.body.productId);

    if (!sale) {
      return res.status(400).json({ success: false, message: 'La venta asociada no existe' });
    }

    if (!product) {
      return res.status(400).json({ success: false, message: 'El producto asociado no existe' });
    }

    const detail = await SaleDetail.create(req.body);
    res.status(201).json({ success: true, message: 'Detalle de venta creado correctamente', data: detail });
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const detail = await SaleDetail.findByPk(req.params.id);
    if (!detail) {
      return res.status(404).json({ success: false, message: 'Detalle de venta no encontrado' });
    }

    if (req.body.saleId) {
      const sale = await Sale.findByPk(req.body.saleId);
      if (!sale) {
        return res.status(400).json({ success: false, message: 'La venta asociada no existe' });
      }
    }

    if (req.body.productId) {
      const product = await Product.findByPk(req.body.productId);
      if (!product) {
        return res.status(400).json({ success: false, message: 'El producto asociado no existe' });
      }
    }

    await detail.update(req.body);
    res.json({ success: true, message: 'Detalle de venta actualizado correctamente', data: detail });
  } catch (error) {
    next(error);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const detail = await SaleDetail.findByPk(req.params.id);
    if (!detail) {
      return res.status(404).json({ success: false, message: 'Detalle de venta no encontrado' });
    }
    await detail.destroy();
    res.json({ success: true, message: 'Detalle de venta eliminado correctamente' });
  } catch (error) {
    next(error);
  }
};
