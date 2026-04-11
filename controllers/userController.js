const { User } = require('../models');

exports.getAll = async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.json({ success: true, data: users });
  } catch (error) {
    next(error);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
    }
    res.json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

exports.create = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ success: true, message: 'Usuario creado correctamente', data: user });
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
    }
    await user.update(req.body);
    res.json({ success: true, message: 'Usuario actualizado correctamente', data: user });
  } catch (error) {
    next(error);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
    }
    await user.destroy();
    res.json({ success: true, message: 'Usuario eliminado correctamente' });
  } catch (error) {
    next(error);
  }
};
