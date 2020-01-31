// eslint-disable-next-line import/no-extraneous-dependencies
import { Sequelize } from 'sequelize';
import databaseConfing from '../config/database';
import User from '../app/models/User';

const models = [User];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfing);

    models.map((model) => model.init(this.connection));
  }
}

export default new Database();
