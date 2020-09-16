'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class produtoMarca extends Model {
    
    static associate(models) {
      
    }
  };
  produtoMarca.init({
    produtoId: DataTypes.INTEGER,
    marcaId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'produtoMarca',
  });
  return produtoMarca;
};