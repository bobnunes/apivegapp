const express = require('express');
const authMiddleware = require('../middlewares/auth');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');
const Marca = require('../models/marca');

function generateToken(params = {}) {
    return jwt.sign(params, authConfig.SECRET, {
        expiresIn: 60 * 60,
    });
}

//Exibe toda a lista de marcas de forma pública
router.get('/', async (req, res) => {
    try {
        const marca = await Marca.findAll();
        if (marca == "") {
            return res.json({ mensagem: "Não existe nenhuma marca cadastrada" });
        } else {
            return res.json({ marca });
        }
    } catch (err) {
        return res.json({ mensagem: err })
    }
});

//Exibe um item específico da lista de marcas de forma pública
router.get('/:idMarca', async (req, res) => {
    try {
        const marca = await Marca.findOne({
            where: {
                id: req.params.idMarca
            }
        });

        if (marca == null) {
            res.json({ message: "Essa marca não existe" });
        } else {
            res.send({marca});
        }
    } catch (err) {
        res.status(400).send({ error: 'Erro ao carregar marca' });

    }
});

router.use(authMiddleware); //A partir da Middleware só executa a rota com autenticação
router.post('/cadastro', async (req, res) => {

    try {

        const marca = {
            nome: req.body.nome,
        }

        if (await Marca.findOne({ where: { nome: req.body.nome } }))
            return res.status(400).send({ error: 'Essa marca já existe' });

        await Marca.create(marca);
        return res.send({ marca });

    } catch (err) {
        return res.status(400).send({
            error: 'Registration failed',
            err: err,
        });
    }
});

//Deleta uma marca específica
router.delete('/:nomeMarca', async (req, res) => {

    try {
        const marca = await Marca.findOne({
            where: {
                nome: req.params.nomeMarca
            }
        });

        if (marca == null) {
            res.json({ message: "Essa marca não existe" });
        } else {
            await Marca.destroy({ where: { nome: req.params.nomeMarca } });
            res.json({ mensagem: "Marca deletada com sucesso" })
        }

    } catch (err) {
        return res.send({ error: 'Erro ao excluir' });
    }


});

//Altera dados de uma marca
router.patch('/:nomeMarca', async (req, res) => {

    try {
        const marca = await Marca.findOne({
            where: {nome: req.params.nomeMarca}
        })

        if (marca.nome != '' || marca.nome != null) {
            await marca.update({ nome: req.body.nome });
            return res.send({marca});
        } else {
            return res.send({ mensagem: "Essa marca não foi encontrada" });
        }


    } catch (err) {
        return res.status(400).send({
            error: 'Registration failed',
            err: err,
        });
    }

});


module.exports = app => app.use('/marca', router);