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
}

export default User;
