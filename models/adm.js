'use strict';
const bcrypt = require('bcryptjs');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class adm extends Model {
    
    static associate(models) {
      // define association here
    }
  };
  adm.init({
    nome: DataTypes.STRING,
    email: DataTypes.STRING,
    senha: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'adm',
  });
  adm.beforeCreate((adm, options) => {

    return bcrypt.hash(adm.senha, 10)
        .then(hash => {
            adm.senha = hash;
        })
        .catch(err => { 
            throw new Error(); 
        });
  });
  return adm;
};
