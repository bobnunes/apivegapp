const express = require('express');
const authMiddleware = require('../middlewares/auth');
const Adm = require('../models/adm');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

function generateToken(params = {}) {
    return jwt.sign(params, authConfig.SECRET, {
        expiresIn: 60 * 60,
    });
}
//router.use(authMiddleware); //A partir da Middleware só executa a rota com autenticação
//Exibe toda a lista de administradores de forma pública
router.get('/',authMiddleware, async (req, res) => {
    try{
        const adm = await Adm.findAll(

        );
        if(adm==""){
            return res.json({ mensagem: "Não existe nenhum administrador cadastrado" });
        }else{
            return res.json({ adm });
        }
    }catch(err){
        return res.json({ mensagem: err })
    }
});
    
//Exibe um item específico da lista de produtos de forma pública
router.get('/:admId',authMiddleware, async (req, res) => {
    try {
        const adm = await Adm.findOne({ 
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


router.post('/cadastrar',authMiddleware, async (req, res) => {

    try {

        const adm = {
            nome: req.body.nome,
            email: req.body.email,
            senha: req.body.senha
        }


        if (await Adm.findOne({
            where:{ 
                email: req.body.email 
            } 
        }))
            return res.status(400).send({ error: 'Esse administrador já existe' });
            
            const hash = bcrypt.hashSync(adm.senha, 10);
            adm.senha = hash;
            await Adm.create(adm);
            
            adm.senha = undefined;
            
        
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
router.delete('/deletar/:admId',authMiddleware, async (req, res) => {

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
router.patch('/alterar/:admId',authMiddleware, async (req, res) => {
    
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