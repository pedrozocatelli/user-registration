import Sequelize, { Model } from 'sequelize';

class Address extends Model {
  static init(sequelize) {
    super.init(
      {
        cep: Sequelize.STRING,
        city: Sequelize.STRING,
        state: Sequelize.STRING,
        neighborhood: Sequelize.STRING,
        address: Sequelize.STRING,
        number: Sequelize.STRING,
        complement: Sequelize.STRING,
        type: Sequelize.STRING,
        main: Sequelize.BOOLEAN
      },
      {
        sequelize
      }
    );
    return this;
  }
  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  }
}

export default Address;
