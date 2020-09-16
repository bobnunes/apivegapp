const express = require('express');
const authMiddleware = require('../middlewares/auth');
const router = express.Router();
const { sequelize } = require('../models/index');
const marca = require('../models/marca');


//Exibe toda a lista de produtos de forma pública
router.get('/', async (req, res) => {
    try {
        const produto = await sequelize.models.produto.findAll({
            include: { 
                    association: 'categoria',
                    association: 'marcas'
                }
        });
        if (produto == "") {
            return res.json({ mensagem: "Não existe nenhum produto cadastrado" });
        } else {
            return res.json({ produto });
        }
    } catch (err) {
        return res.json({ mensagem: err })
    }
});

//Exibe um item específico da lista de produtos de forma pública
router.get('/:nomeProduto', async (req, res) => {
    try {
        const produto = await sequelize.models.produto.findOne({
            where: {
                id: req.params.nomeProduto
            },
            include: {
                association: 'categoria',
                association: 'marcas'
            }
        });

        if (produto == null) {
            res.json({ message: "Esse produto não existe" });
        } else {
            res.send({produto});
        }
    } catch (err) {
        res.status(400).send({ error: 'Erro ao carregar produto' });

    }
});

//router.use(authMiddleware); //A partir da Middleware só executa a rota com autenticação
router.post('/cadastro', async (req, res) => {

    try {
         const { nome, marcas, categoria } = req.body;
         const marc = await sequelize.models.marca.findAll({where: {
             id: marcas
         }})
         const categ = await sequelize.models.categoria.findAll({where: {
            id: categoria
        }});

        const prod = await sequelize.models.produto.create({
            nome: nome
            });        
            await prod.addMarcas(marc)
            await prod.addCategoria(categ)
         
         return res.json({ prod });

    } catch (err) {
        return res.status(400).send({
            error: 'Registration failed',
            err: err,
        });
    }
});

//Deleta um produto específico
router.delete('/:produtoId', async (req, res) => {

    try {
        const produto = await sequelize.models.produto.findOne({
            where: {
                id: req.params.produtoId
            }
        });

        if (produto == null) {
            res.json({ message: "Esse produto não existe" });
        } else {
            await sequelize.models.produto.destroy({ where: { id: req.params.produtoId } });
            res.json({ mensagem: "Produto deletado com sucesso" })
        }

    } catch (err) {
        return res.send({ error: 'Erro ao excluir' });
    }


});

//Altera dados de um produto
router.patch('/:produtoId', async (req, res) => {

    try {
        const produto = await sequelize.models.produto.findOne({
            where: {id: req.params.produtoId}
        })

        if (produto.nome != '' || produto.nome != null) {
            await sequelize.models.produto.update({ nome: req.body.nome });
            return res.send({produto});
        } else {
            return res.send({ mensagem: "Esse produto não foi encontrado" });
        }


    } catch (err) {
        return res.status(400).send({
            error: 'Erro inesperado',
            err: err,
        });
    }

});


module.exports = app => app.use('/produto', router);