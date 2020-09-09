const sequelize = require('../database/db');
const Sequelize = require('sequelize');

const Marca = sequelize.define( 'marcas', {
    nome: {
        type: Sequelize.STRING,
        require: true
    },
});
Marca.associate = (models) => {
    Marca.belongsToMany(models.produtos, {
        through: 'produtoMarcaCategorias',
        as: 'produtos',
        foreingKey: 'marcaId'
    });
  };
  //Marca.sync()
module.exports = Marca;
