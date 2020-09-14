'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class produtoMarca extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  produtoMarca.init({
    produtoId: DataTypes.INTEGER,
    marcaId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'produtoMarca',
  });
  return produtoMarca;
};