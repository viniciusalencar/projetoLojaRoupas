const mongoose = require('mongoose');

const mongooseSeq = require('mongoose-sequence')(mongoose);

const schema = mongoose.Schema({

    nome_vendedor: {
        type: String,
        required: true
    },
    cpf: {
        type: String,
        required: true,
        index: {unique:true}
    },
    rg: {
        type: String,
        required: true
    },
    data_nascimento: {
        type: Date,
        required: true
    },
    endereco: {
        type: String,
        required: true
    },
    telefone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    setor: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Vendedor', schema, 'vendedores');
