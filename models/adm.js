'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class adm extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  adm.init({
    nome: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'adm',
  });
  adm.prototype.toJSON =  function () {
    var values = Object.assign({}, this.get());
  
    delete values.senha;
    return values;
  }
  return adm;
};