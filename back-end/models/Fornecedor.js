const mongoose = require('mongoose');

const mongooseSeq = require('mongoose-sequence')(mongoose);

const schema = mongoose.Schema({

    nome_fornecedor: {
        type: String,
        required: true
    },
    cnpj_cpf: {
        type: String,
        required: true,
        index: {unique:true}
    },
    inscricao_estadual: {
        type: String
    },
    inscricao_municipal: {
        type: String
    },
    endereco: {
        type: String,
        required: true
    },
    telefone: {
        type: String,
        required: true
    },
    rg: {
        type: String
    },

});

module.exports = mongoose.model('Fornecedor', schema, 'fornecedores');
