const sequelize = require('../database/db');
const Sequelize = require('sequelize');
const db = require('../config/db');


const Produto = sequelize.define('produtos', {
    nome: {
        type: Sequelize.STRING,
        require: true
    },
    categoriaId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'categorias',
          key: 'id'
        },
        allowNull: false
      },

});
Produto.associate = (models) => {
    Produto.belongsTo(models.categorias, {
        through: 'produtoMarcas',
        as: 'categorias',
        foreingKey: 'produtoId'
    });
    Produto.belongsToMany(models.marcas, {
        through: 'produtoMarcas',
        as: 'marcas',
        foreingKey: 'produtoId'
    });
  };
//Produto.sync({force: true})
module.exports = Produto; 
