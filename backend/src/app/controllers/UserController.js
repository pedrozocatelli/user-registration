import * as Yup from 'yup';
import User from '../models/User';
import Address from '../models/Address';
import AddressController from '../controllers/AddressController';
import { Op } from 'sequelize';
import nodemailer from 'nodemailer';

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

    const userCPF = await User.findOne({
      where: {
        cpf: req.body.cpf
      }
    });

    if (userCPF) {
      return res.status(400).json({ error: 'CPF já cadastrado!' });
    }
    const userEmail = await User.findOne({
      where: {
        email: req.body.email
      }
    });

    if (userEmail) {
      return res.status(400).json({ error: 'Email já cadastrado!' });
    }

    try {
      const { id, name, cpf, telephone, email } = await User.create(req.body);

      AddressController.store(req, res, id);

      req.user_id = id;

      //Trocar para email que desejam testar
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'testenibble@gmail.com',
          pass: 'pedropedro'
        }
      });

      let mailOptions = {
        from: 'testenibble@gmail.com',
        to: 'zocatelli.dev@gmail.com',
        subject: 'Usuário Cadastrado com Sucesso',
        text: 'Usuário : ' + name + ' cadastrado com sucesso!'
      };

      transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

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
      return res.status(400).json({ error: 'Erro na validação dos dados' });
    }
    const { cpf, email } = req.body;
    const user = await User.findByPk(req.body.id);

    if (cpf !== user.cpf) {
      const userCPF = await User.findOne({
        where: { cpf: req.body.cpf }
      });
      if (userCPF) {
        return res.status(400).json({ error: 'CPF Já cadastrado!' });
      }
    }
    if (email !== user.email) {
      const userExists = await User.findOne({
        where: { email: req.body.email }
      });
      if (userExists) {
        return res.status(400).json({ error: 'Email já cadastrado!' });
      }
    }

    const { id, name } = await user.update(req.body);

    AddressController.update(req, res, id);

    return res.json({
      id,
      name,
      email
    });
  }

  async list(req, res) {
    const users = await User.findAll({
      attributes: ['id', 'name', 'cpf', 'telephone', 'email'],
      order: [['id', 'ASC']]
    });
    return res.json(users);
  }

  async delete(req, res) {
    const user = await User.findByPk(req.params.id);

    await user.destroy(req.params.id);

    return res.json();
  }

  async index(req, res) {
    const user = await User.findAll({
      where: { id: req.params.id },
      include: [
        {
          model: Address,
          as: 'addresses'
        }
      ],
      order: [['addresses', 'main', 'DESC']]
    });

    return res.json(user);
  }
}

export default new UserController();
