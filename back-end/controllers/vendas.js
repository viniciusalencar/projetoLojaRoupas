const Vendas = require('../models/Vendas');

const controller = {};

controller.novo = async function (req, res) {
    try {


        Vendas.create(req.body);
        res.status(201).send('');
    }

    catch (erro) {
        console.error(erro);
        res.sendStatus(500).end();

    }
}

controller.listar = async function (req, res) {
    try {
        const vendas = await Vendas.find()
        .populate('produto')
        .populate('itemvenda')
        .populate('cliente')
        .populate('vendedor')
        res.send(vendas);

    }
    catch (erro) {
        console.error(erro);
        res.sendStatus(500).end();
    }
}
controller.obterUm = async function (req, res) {
    const id = req.params.id;
    try {
        const vendas = await Vendas.findById(id);
        if (vendas) {
            res.send(vendas);
        }
        else {
            res.sendStatus(404).end();
        }
    }
    catch (erro) {
        console.error(erro);
        res.sendStatus(500).end();
    }
}
controller.atualizar = async function (req, res) {
    const id = req.body._id;
    try {
        const vendas = await Vendas.findByIdAndUpdate(id, req.body);
        if (vendas) {
            res.sendStatus(204).end();
        }
        else {
            res.sendStatus(404).end();
        }
    }   
    catch (erro) {
        console.error(erro);
        res.sendStatus(500).end();
    } 
}
controller.excluir = async function(req, res){
    const id = req.body._id;
    try{
        const vendas = await Vendas.findByIdAndDelete(id);
        if(vendas){
            res.sendStatus(204).end();
        }
        else {
                res.sendStatus(404).end();
        }
    }
    catch(erro) {
        console.error(erro);
        res.sendStatus(500).end;
    }
}
module.exports = controller;
