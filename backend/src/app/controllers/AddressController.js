import * as Yup from 'yup';
import Address from '../models/Address';

class AddressController {
  /**
   * Função de Create do Endereço
   */
  async store(req, res, id) {
    const schema = Yup.object().shape({
      cep: Yup.string().required(),
      city: Yup.string().required(),
      state: Yup.string().required(),
      neighborhood: Yup.string().required(),
      address: Yup.string().required(),
      number: Yup.string().required(),
      type: Yup.string().required()
    });

    /**
     * Itera por todos os endereços, cria eles no DB de acordo com o usuário
     */
    const addressess = req.body.addresses.map(address => {
      async function loadAddresses() {
        try {
          // if (!(await schema.isValid(address))) {
          //   return res.status(400).json({ error: 'Validação Falhou' });
          // }

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
        } catch (error) {
          console.log(error);
        }
      }
      loadAddresses();
    });
    return true;
  }

  /**
   * Função de Update do Endereço
   */
  async update(req, res, id) {
    const schema = Yup.object().shape({
      cep: Yup.string().required(),
      city: Yup.string().required(),
      state: Yup.string().required(),
      neighborhood: Yup.string().required(),
      address: Yup.string().required(),
      number: Yup.string().required(),
      type: Yup.string().required()
    });

    /**
     * Itera por todos os endereços e faz o update
     */
    const addressess = req.body.addresses.map(address => {
      async function loadAddresses() {
        try {
          // if (!(await schema.isValid(address))) {
          //   return res.status(400).json({ error: 'Validação Falhou' });
          // }

          const addressFind = await Address.findByPk(address.id);

          if (addressFind) {
            const { cep, city } = await addressFind.update(address);
          }
        } catch (error) {
          console.log(error);
        }
      }
      loadAddresses();
    });
  }

  /**
   * Busca por um endereço em específico, de acordo com o Id
   */
  async index(req, res) {
    const addresses = await Address.findAll({
      where: { user_id: req.params.id }
    });
    return res.json(addresses);
  }

  /**
   * Deleta um Endereço
   */
  async delete(req, res) {
    const adress = await Address.findByPk(req.params.id);

    await adress.destroy(req.params.id);

    return res.json();
  }
}

export default new AddressController();
