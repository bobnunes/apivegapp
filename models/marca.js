'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class marca extends Model {
    
    static associate(models) {
      marca.belongsToMany(models.produto, { through: 'produtoMarcas', foreignKey: 'marcaId', as: 'produtos' } );
    }
  };
  marca.init({
    nome: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'marca',
  });
  return marca;
};