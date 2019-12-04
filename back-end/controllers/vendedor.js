const Vendedor = require('../models/Vendedor');

const controller = {};

controller.novo = async function (req, res) {
    try {


        Vendedor.create(req.body);
        res.status(201).send('');
    }

    catch (erro) {
        console.error(erro);
        res.sendStatus(500).end();

    }
}

controller.listar = async function (req, res) {
    try {
        const vendedores = await Vendedor.find();
        res.send(vendedores);

    }
    catch (erro) {
        console.error(erro);
        res.sendStatus(500).end();
    }
}
controller.obterUm = async function (req, res) {
    const id = req.params.id;
    try {
        const vendedor = await Vendedor.findById(id);
        if (vendedor) {
            res.send(vendedor);
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
        const vendedor = await Vendedor.findByIdAndUpdate(id, req.body);
        if (vendedor) {
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
        const vendedor = await Vendedor.findByIdAndDelete(id);
        if(vendedor){
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
