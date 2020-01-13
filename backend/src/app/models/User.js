import Sequelize, { Model } from 'sequelize';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        cpf: Sequelize.STRING,
        telephone: Sequelize.STRING,
        email: Sequelize.STRING
      },
      {
        sequelize
      }
    );
    return this;
  }
  static associate(models) {
    this.hasMany(models.Address, { foreignKey: 'user_id', as: 'addresses' });
  }
}

export default User;
