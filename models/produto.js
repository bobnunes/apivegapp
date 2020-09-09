const sequelize = require('../database/db');
const Sequelize = require('sequelize');
const db = require('../config/db');


const Produto = sequelize.define('produtos', {
    nome: {
        type: Sequelize.STRING,
        require: true
    },

});
Produto.associate = (models) => {
    Produto.belongsTo(models.categorias, {
        through: 'produtoMarcaCategorias',
        as: 'categorias',
        foreingKey: 'produtoId'
    });
    Produto.belongsToMany(models.marcas, {
        through: 'produtoMarcaCategorias',
        as: 'marcas',
        foreingKey: 'produtoId'
    });
  };
//Produto.sync()
module.exports = Produto; 
