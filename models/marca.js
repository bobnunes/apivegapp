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
        through: 'produtoMarcas',
        as: 'produtos',
        foreingKey: 'marcaId'
    });
  };
//Marca.sync({force: true})
module.exports = Marca;
