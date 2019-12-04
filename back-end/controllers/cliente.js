const Cliente = require('../models/Cliente');

const controller = {};

controller.novo = async function (req, res) {
    try {


        Cliente.create(req.body);
        res.status(201).send('');
    }

    catch (erro) {
        console.error(erro);
        res.sendStatus(500).end();

    }
}

controller.listar = async function (req, res) {
    try {
        const clientes = await Cliente.find();
        res.send(clientes);

    }
    catch (erro) {
        console.error(erro);
        res.sendStatus(500).end();
    }
}
controller.obterUm = async function (req, res) {
    const id = req.params.id;
    try {
        const cliente = await Cliente.findById(id);
        if (cliente) {
            res.send(cliente);
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
        const cliente = await Cliente.findByIdAndUpdate(id, req.body);
        if (cliente) {
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
        const cliente = await Cliente.findByIdAndDelete(id);
        if(cliente){
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
