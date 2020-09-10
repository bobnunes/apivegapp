const express = require('express');
const authMiddleware = require('../middlewares/auth');
const router = express.Router();
const Produto = require('../models/produto');
const Marca = require('../models/marca');
const ProdutoMarca = require('../models/produtoMarca');

//Exibe toda a lista de produtos de forma pública
router.get('/', async (req, res) => {
    try {
        const produto = await Produto.findAll();
        const produtoMarca = await ProdutoMarca.findAll();
        console.log(produtoMarca);
        if (produto == "") {
            return res.json({ mensagem: "Não existe nenhum produto cadastrado" });
        } else {
            return res.json( produto );
        }
    } catch (err) {
        return res.json({ mensagem: err })
    }
});

//Exibe um item específico da lista de produtos de forma pública
router.get('/:nomeProduto', async (req, res) => {
    try {
        const produto = await Produto.findOne({
            where: {
                id: req.params.nomeProduto
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

        const produto = {
            nome: req.body.nome,
        };

        if (await Produto.findOne({ where: { nome: req.body.nome } }))
            return res.status(400).send({ error: 'Esse produto já existe' });

        await Produto.create(produto);
        

        return res.send(produto);

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
        const produto = await Produto.findOne({
            where: {
                id: req.params.produtoId
            }
        });

        if (produto == null) {
            res.json({ message: "Esse produto não existe" });
        } else {
            await Produto.destroy({ where: { id: req.params.produtoId } });
            res.json({ mensagem: "Produto deletado com sucesso" })
        }

    } catch (err) {
        return res.send({ error: 'Erro ao excluir' });
    }


});

//Altera dados de um produto
router.patch('/:produtoId', async (req, res) => {

    try {
        const produto = await Produto.findOne({
            where: {id: req.params.produtoId}
        })

        if (produto.nome != '' || produto.nome != null) {
            await produto.update({ nome: req.body.nome });
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