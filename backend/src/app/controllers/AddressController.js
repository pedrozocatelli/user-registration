import * as Yup from 'yup';
import Address from '../models/Address';

class AddressController {
  async store(req, res, id) {
    const schema = Yup.object().shape({
      cep: Yup.string().required(),
      city: Yup.string().required(),
      state: Yup.string().required(),
      neighborhood: Yup.string().required(),
      address: Yup.string().required(),
      number: Yup.string().required(),
      complement: Yup.string().required(),
      type: Yup.string().required()
    });

    const addressess = req.body.addresses.map(address => {
      async function loadAddresses() {
        if (!(await schema.isValid(address))) {
          return res.status(400).json({ error: 'Validation Fails' });
        }

        const addressExists = await Address.findOne({
          where: {
            user_id: id,
            city: address.city,
            cep: address.cep,
            state: address.state,
            address: address.address,
            number: address.number
          }
        });

        address.user_id = req.user_id;
        const { cep, city } = await Address.create(address);
      }
      loadAddresses();
    });
    return true;
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      cep: Yup.string().required(),
      city: Yup.string().required(),
      state: Yup.string().required(),
      neighborhood: Yup.string().required(),
      address: Yup.string().required(),
      number: Yup.string().required(),
      complement: Yup.string().required(),
      type: Yup.string().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    const addressFind = await Address.findByPk(req.body.id);
    const { address, number, user_id } = req.body;
    console.log(req.body.id);

    if (address !== addressFind.address || number !== addressFind.number) {
      const adressExists = await Address.findOne({
        where: { user_id: user_id, address: address, number: number }
      });
      if (adressExists) {
        return res.status(400).json({ error: 'Adress already exists' });
      }
    }
    try {
      const { cep, city, state, neighborhood } = await addressFind.update(
        req.body
      );
      return res.json({
        cep,
        city,
        state,
        neighborhood,
        address,
        number
      });
    } catch (err) {
      console.log(err);
    }
  }

  async index(req, res) {
    const addresses = await Address.findAll({
      where: { user_id: req.params.id }
    });
    return res.json(addresses);
  }

  async delete(req, res) {
    const adress = await Address.findByPk(req.params.id);

    await adress.destroy(req.params.id);

    return res.json();
  }
}

export default new AddressController();
