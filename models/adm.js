const sequelize = require('../database/db');
const Sequelize = require('sequelize');

const Adm = sequelize.define( 'adms', {
    nome: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    senha: {
        type: Sequelize.STRING,
    },
    
});
Adm.prototype.toJSON =  function () {
    var values = Object.assign({}, this.get());
  
    delete values.senha;
    return values;
  }
//Adm.sync({force: true})
module.exports = Adm;
