const { Provider } = require('../models');

exports.getAll = async (req, res, next) => {
  try {
    const providers = await Provider.findAll();
    res.json({ success: true, data: providers });
  } catch (error) {
    next(error);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const provider = await Provider.findByPk(req.params.id);
    if (!provider) {
      return res.status(404).json({ success: false, message: 'Proveedor no encontrado' });
    }
    res.json({ success: true, data: provider });
  } catch (error) {
    next(error);
  }
};

exports.create = async (req, res, next) => {
  try {
    const provider = await Provider.create(req.body);
    res.status(201).json({ success: true, message: 'Proveedor creado correctamente', data: provider });
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const provider = await Provider.findByPk(req.params.id);
    if (!provider) {
      return res.status(404).json({ success: false, message: 'Proveedor no encontrado' });
    }
    await provider.update(req.body);
    res.json({ success: true, message: 'Proveedor actualizado correctamente', data: provider });
  } catch (error) {
    next(error);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const provider = await Provider.findByPk(req.params.id);
    if (!provider) {
      return res.status(404).json({ success: false, message: 'Proveedor no encontrado' });
    }
    await provider.destroy();
    res.json({ success: true, message: 'Proveedor eliminado correctamente' });
  } catch (error) {
    next(error);
  }
};
