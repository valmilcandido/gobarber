/* eslint-disable linebreak-style */
import Sequelize from 'sequelize';
import mongoose from 'mongoose';


import databaseConfig from '../config/database';

import User from '../app/models/Users';
import File from '../app/models/File';
import Appointment from '../app/models/Appointment';

const models = [User, File, Appointment];

class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map((model) => model.init(this.connection))
      .map((model) => model.associate && model.associate(this.connection.models));
  }

  mongo() {
    this.mongoConnection = mongoose.connect(
      'mongodb://192.168.99.100/gobarber',
      { useNewUrlParser: true, useFindAndModify: true },
    );
  }
}

export default new Database();
