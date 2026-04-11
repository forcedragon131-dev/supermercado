const { Sale, User, SaleDetail, Product } = require('../models');

const calculateTotal = (details) => {
  return details.reduce((acc, item) => acc + (Number(item.quantity) * Number(item.price)), 0);
};

exports.getAll = async (req, res, next) => {
  try {
    const sales = await Sale.findAll({
      include: [
        { model: User, as: 'user' },
        {
          model: SaleDetail,
          as: 'details',
          include: [{ model: Product, as: 'product' }],
        },
      ],
    });
    res.json({ success: true, data: sales });
  } catch (error) {
    next(error);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const sale = await Sale.findByPk(req.params.id, {
      include: [
        { model: User, as: 'user' },
        {
          model: SaleDetail,
          as: 'details',
          include: [{ model: Product, as: 'product' }],
        },
      ],
    });

    if (!sale) {
      return res.status(404).json({ success: false, message: 'Venta no encontrada' });
    }

    res.json({ success: true, data: sale });
  } catch (error) {
    next(error);
  }
};

exports.create = async (req, res, next) => {
  const transaction = await Sale.sequelize.transaction();
  try {
    const { userId, date, details = [] } = req.body;

    if (!details.length) {
      await transaction.rollback();
      return res.status(400).json({ success: false, message: 'La venta debe incluir al menos un detalle' });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      await transaction.rollback();
      return res.status(400).json({ success: false, message: 'El usuario asociado no existe' });
    }

    for (const item of details) {
      const product = await Product.findByPk(item.productId);
      if (!product) {
        await transaction.rollback();
        return res.status(400).json({ success: false, message: `El producto con id ${item.productId} no existe` });
      }
      if (product.stock < item.quantity) {
        await transaction.rollback();
        return res.status(400).json({ success: false, message: `Stock insuficiente para el producto ${product.name}` });
      }
    }

    const total = calculateTotal(details);

    const sale = await Sale.create({ userId, date, total }, { transaction });

    for (const item of details) {
      await SaleDetail.create({
        saleId: sale.id,
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
      }, { transaction });

      const product = await Product.findByPk(item.productId);
      await product.update({ stock: product.stock - item.quantity }, { transaction });
    }

    await transaction.commit();

    const createdSale = await Sale.findByPk(sale.id, {
      include: [
        { model: User, as: 'user' },
        {
          model: SaleDetail,
          as: 'details',
          include: [{ model: Product, as: 'product' }],
        },
      ],
    });

    res.status(201).json({
      success: true,
      message: 'Venta creada correctamente',
      data: createdSale,
    });
  } catch (error) {
    await transaction.rollback();
    next(error);
  }
};

exports.update = async (req, res, next) => {
  const transaction = await Sale.sequelize.transaction();
  try {
    const sale = await Sale.findByPk(req.params.id, {
      include: [{ model: SaleDetail, as: 'details' }],
    });

    if (!sale) {
      await transaction.rollback();
      return res.status(404).json({ success: false, message: 'Venta no encontrada' });
    }

    const { userId, date, details = [] } = req.body;

    if (!details.length) {
      await transaction.rollback();
      return res.status(400).json({ success: false, message: 'La venta debe incluir al menos un detalle' });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      await transaction.rollback();
      return res.status(400).json({ success: false, message: 'El usuario asociado no existe' });
    }

    for (const oldDetail of sale.details) {
      const product = await Product.findByPk(oldDetail.productId);
      await product.update({ stock: product.stock + oldDetail.quantity }, { transaction });
    }

    await SaleDetail.destroy({ where: { saleId: sale.id }, transaction });

    for (const item of details) {
      const product = await Product.findByPk(item.productId);
      if (!product) {
        await transaction.rollback();
        return res.status(400).json({ success: false, message: `El producto con id ${item.productId} no existe` });
      }
      if (product.stock < item.quantity) {
        await transaction.rollback();
        return res.status(400).json({ success: false, message: `Stock insuficiente para el producto ${product.name}` });
      }
    }

    const total = calculateTotal(details);
    await sale.update({ userId, date, total }, { transaction });

    for (const item of details) {
      await SaleDetail.create({
        saleId: sale.id,
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
      }, { transaction });

      const product = await Product.findByPk(item.productId);
      await product.update({ stock: product.stock - item.quantity }, { transaction });
    }

    await transaction.commit();

    const updatedSale = await Sale.findByPk(sale.id, {
      include: [
        { model: User, as: 'user' },
        {
          model: SaleDetail,
          as: 'details',
          include: [{ model: Product, as: 'product' }],
        },
      ],
    });

    res.json({ success: true, message: 'Venta actualizada correctamente', data: updatedSale });
  } catch (error) {
    await transaction.rollback();
    next(error);
  }
};

exports.remove = async (req, res, next) => {
  const transaction = await Sale.sequelize.transaction();
  try {
    const sale = await Sale.findByPk(req.params.id, {
      include: [{ model: SaleDetail, as: 'details' }],
    });

    if (!sale) {
      await transaction.rollback();
      return res.status(404).json({ success: false, message: 'Venta no encontrada' });
    }

    for (const detail of sale.details) {
      const product = await Product.findByPk(detail.productId);
      await product.update({ stock: product.stock + detail.quantity }, { transaction });
    }

    await SaleDetail.destroy({ where: { saleId: sale.id }, transaction });
    await sale.destroy({ transaction });
    await transaction.commit();

    res.json({ success: true, message: 'Venta eliminada correctamente' });
  } catch (error) {
    await transaction.rollback();
    next(error);
  }
};
