const sequelize = require('../database/db');
const Sequelize = require('sequelize');

const Categoria = sequelize.define( 'categorias', {
    nome: {
        type: Sequelize.STRING
    },
    
});
Categoria.associate = (models) => {
    Categoria.hasMany(models.produtos, {
        through: 'produtoMarcaCategorias',
        as: 'produtos',
        foreingKey: 'categoriaId'
    });
  };
//Categoria.sync()
module.exports = Categoria;
