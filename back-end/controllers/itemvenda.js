const Itemvenda = require('../models/Itemvenda');

const controller = {};

controller.novo = async function (req, res) {
    try {


        Itemvenda.create(req.body);
        res.status(201).send('');
    }

    catch (erro) {
        console.error(erro);
        res.sendStatus(500).end();

    }
}

controller.listar = async function (req, res) {
    try {
        const itemvendas = await Itemvenda.find()
        .populate('vendas')
        res.send(itemvendas);


    }
    catch (erro) {
        console.error(erro);
        res.sendStatus(500).end();
    }
}
controller.obterUm = async function (req, res) {
    const id = req.params.id;
    try {
        const itemvenda = await Itemvenda.findById(id);
        if (itemvenda) {
            res.send(itemvenda);
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
        const itemvenda = await Itemvenda.findByIdAndUpdate(id, req.body);
        if (itemvenda) {
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
        const itemvenda = await Itemvenda.findByIdAndDelete(id);
        if(itemvenda){
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
