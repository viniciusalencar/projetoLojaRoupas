const Produto = require('../models/Produto');

const controller = {};

controller.novo = async function (req, res) {
    try {


        Produto.create(req.body);
        res.status(201).send('');
    }

    catch (erro) {
        console.error(erro);
        res.sendStatus(500).end();

    }
}

controller.listar = async function (req, res) {
    try {
        const produtos = await Produto.find()
        .populate('fornecedor')
        res.send(produtos);

    }
    catch (erro) {
        console.error(erro);
        res.sendStatus(500).end();
    }
}
controller.obterUm = async function (req, res) {
    const id = req.params.id;
    try {
        const produto = await Produto.findById(id);
        if (produto) {
            res.send(produto);
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
        const produto = await Produto.findByIdAndUpdate(id, req.body);
        if (produto) {
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
        const produto = await Produto.findByIdAndDelete(id);
        if(produto){
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
