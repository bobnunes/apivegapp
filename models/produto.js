'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class produto extends Model {
    
    static associate(models) {
      produto.belongsTo(models.categoria, { foreignKey: 'categoriaId', as: 'categoria' } );
      produto.belongsToMany(models.marca, { through: 'produtoMarcas', foreignKey: 'produtoId', as: 'marcas' } );
  };
    
  };
  produto.init({
    nome: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'produto',
  });
  return produto;
};