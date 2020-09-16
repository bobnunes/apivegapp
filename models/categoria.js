'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class categoria extends Model {
    
    static associate(models) {
      categoria.hasMany(models.produto, { foreignKey: 'categoriaId', as: 'produtos' } )
    }
  };
  categoria.init({
    nome: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'categoria',
  });
  return categoria;
};