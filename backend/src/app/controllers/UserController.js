import * as Yup from 'yup';
import User from '../models/User';
import AddressController from '../controllers/AddressController';
import { Op } from 'sequelize';

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      cpf: Yup.string().required(),
      telephone: Yup.string().required(),
      email: Yup.string()
        .email()
        .required()
    });

    const validarCpf = require('validar-cpf');
    const cpfValido = validarCpf(req.body.cpf);

    if (!(await schema.isValid(req.body)) || !cpfValido) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    const userExists = await User.findOne({
      where: {
        [Op.or]: [
          { email: req.body.email },
          { telephone: req.body.telephone },
          { cpf: req.body.cpf }
        ]
      }
    });

    if (userExists) {
      return res.status(400).json({ error: 'User already exists' });
    }

    try {
      const { id, name, cpf, telephone, email } = await User.create(req.body);

      AddressController.store(req, res, id);

      req.user_id = id;
      return res.json({
        id,
        name,
        cpf,
        telephone,
        email
      });
    } catch (err) {
      console.log(err);
    }
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      telephone: Yup.string()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }
    const { email, telephone } = req.body;
    const user = await User.findByPk(req.body.id);

    if (email !== user.email || telephone !== user.telephone) {
      const userExists = await User.findOne({
        where: { email: req.body.email, telephone: req.body.telephone }
      });
      if (userExists) {
        return res.status(400).json({ error: 'User already exists' });
      }
    }

    const { id, name } = await user.update(req.body);
    return res.json({
      id,
      name,
      email,
      telephone
    });
  }

  async index(req, res) {
    const users = await User.findAll({
      attributes: ['id', 'name', 'cpf', 'telephone', 'email']
    });
    return res.json(users);
  }

  async delete(req, res) {
    const user = await User.findByPk(req.params.id);

    await user.destroy(req.params.id);

    return res.json();
  }
}

export default new UserController();
