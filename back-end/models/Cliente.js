const mongoose = require('mongoose');

const mongooseSeq = require('mongoose-sequence')(mongoose);

const schema = mongoose.Schema({

    nome_cliente: {
        type: String,
        required: true
    },
    cnpj_cpf: {
        type: String,
        required: true,
        index: {unique:true}
    },
    endereco: {
        type: String,
        required: true
    },
    telefone: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Cliente', schema, 'clientes');
