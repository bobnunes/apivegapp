const express = require('express');
const router = express.Router();
const Categoria = require('../models/categoria');
const authMiddleware = require('../middlewares/auth');

//Exibe toda a lista de Categorias de forma pública
router.get('/', async (req, res) => {
    try {
        const categoria = await Categoria.findAll();
        if (categoria == "") {
            return res.json({ mensagem: "Não existe nenhum categoria cadastrado" });
        } else {
            return res.json({ categoria });
        }
    } catch (err) {
        return res.json({ mensagem: err })
    }
});

//Exibe um item específico da lista de categorias de forma pública
router.get('/:nomeCategoria', async (req, res) => {
    try {
        const categoria = await Categoria.findOne({
            where: {
                nome: req.params.nomeCategoria
            }
        });

        if (categoria == null) {
            res.json({ message: "Esse categoria não existe" });
        } else {
            res.send({categoria});
        }
    } catch (err) {
        res.status(400).send({ error: 'Erro ao carregar categoria' });

    }
});


// Comentar post depois de criar as categorias

router.use(authMiddleware);
router.post('/cadastro', async (req, res) => {

    try {
        const categoria = {
            nome: req.body.nome,
        }

        if (await Categoria.findOne({ where: { nome: req.body.nome } }))
            return res.status(400).send({ error: 'Esse categoria já existe' });

        await Categoria.create(categoria);
        return res.send({ categoria });

    } catch (err) {
        return res.status(400).send({
            error: 'Registration failed',
            err: err,
        });
    }
});
module.exports = app => app.use('/categoria', router);