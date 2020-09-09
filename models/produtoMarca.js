const sequelize = require('../database/db');
const Sequelize = require('sequelize');


const ProdutoMarcaCategoria = sequelize.define('produtoMarcaCategorias', {
    produtoId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'produtos',
          key: 'id'
        },
        allowNull: false
      },
      marcaId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'marcas',
          key: 'id'
        },
        allowNull: false
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
//ProdutoMarcaCategoria.sync()
module.exports = ProdutoMarcaCategoria; 
