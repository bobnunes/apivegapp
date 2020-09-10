const sequelize = require('../database/db');
const Sequelize = require('sequelize');


const ProdutoMarca = sequelize.define('produtoMarcas', {
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
});
//ProdutoMarca.sync({force: true})
module.exports = ProdutoMarca; 
