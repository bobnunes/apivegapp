const express = require('express');
const authMiddleware = require('../middlewares/auth');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');
const { sequelize } = require('../models/index');

function generateToken(params = {}) {
    return jwt.sign(params, authConfig.SECRET, {
        expiresIn: 60 * 60,
    });
}
//router.use(authMiddleware); //A partir da Middleware só executa a rota com autenticação
//Exibe toda a lista de administradores de forma pública
router.get('/', async (req, res) => {
    try{
        const adm = await sequelize.models.adm.findAll();

        if(adm==""){
            return res.json({ mensagem: "Não existem administradores cadastrados!" });
        }
        
            return res.json({ adm });
        
    }catch(err){
        return res.json({ mensagem: err })
    }
});
    
//Exibe um item específico da lista de produtos de forma pública
router.get('/:admId', async (req, res) => {
    try {
        const adm = await sequelize.models.adm.findOne({ 
            where:{
                id: req.params.admId 
            }
        });
            
        if(adm==null){
            res.json({ message: "Esse administrador não existe"});
        }else{
            res.send({adm});
        }
    } catch (err) {
        res.status(400).send({ error: 'Erro ao carregar administrador' });
        
    }
});


router.post('/cadastrar', async (req, res) => {

    try {

        const adm = {
            nome: req.body.nome,
            email: req.body.email,
            senha: req.body.senha
        }

        if (await sequelize.models.adm.findOne({
            where:{ 
                email: req.body.email 
            } 
        }))
            return res.status(400).send({ error: 'Esse administrador já existe' });
            
        await sequelize.models.adm.create(adm)
            
        //adm.senha = undefined;
            
        
        return res.json({
            adm,
            token: generateToken({ id: adm.id }),
        });
        

    } catch (err) {
        return res.status(400).send({ 
            error: 'Registration failed',
            err: err, });
    }
});
router.post('/autenticar', async (req, res) => {

    const {email, senha} = req.body;
    const adm = await Adm.findOne({
        where:{ 
            email: req.body.email
        } 
    })

    if(!adm)
        return res.status(400).send({ error: 'User not found' });
    
    if(!await bcrypt.compare(senha, adm.senha)){
        return res.status(400).send({ error: 'Invalid password' });
    };
    res.send({ 
        adm,
        token: generateToken({ _id: adm.id }),
    });
});

//Deleta um produo específico
router.delete('/deletar/:admId', async (req, res) => {

    try {
        const adm = await Adm.findOne({ 
            where:{
                id: req.params.admId }
            });
        if(adm==null){
            res.json({ message: "Esse administrador não existe"});
        }else{
            await Adm.destroy({ 
                where: {
                    id: req.params.admId
                }
            });
            res.json({ mensagem: "Administrador deletado com sucesso"})
        }
        
    } catch (err) {
        return res.send({ error: 'Erro ao excluir' });
    }
    
   
});

//Altera dados de um produto
router.patch('/alterar/:admId', async (req, res) => {
    
    const novoAdm = {
        nome: req.body.nome,
        email: req.body.email,
        senha: req.body.senha
    }
    try {
        const adm = await Adm.findOne({
            where:{ 
                id: req.params.admId
            } 
        })
        
        if(adm==null){
            
            res.json({ message: "Esse administrador não existe"});
        }else{
            
            const hash = bcrypt.hashSync(novoAdm.senha, 10);
            novoAdm.senha = hash;
            await adm.update(novoAdm);
        }
        
            
        return res.send(adm);
        
        

    } catch (err) {
        return res.status(400).send({ 
            error: 'Registration failed',
            err: err, });
    }
    
});


module.exports = app => app.use('/adm', router);