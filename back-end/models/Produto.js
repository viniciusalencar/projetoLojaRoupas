const mongoose = require('mongoose');

const mongooseSeq = require('mongoose-sequence')(mongoose);

const schema = mongoose.Schema({

    nome_produto: {
        type: String,
        required: true
    },
    codigo_barra: {
        type: Number,
        required: true
    },
    preco: {
        type: Number,
        required: true

    },
    prateleira: {
        type: String,
        required: true
    },
    tipo: { // saia, vestido, blusa, calça, etc
        type: String,
        required: true
    },
    fornecedor: {
        type: mongoose.ObjectId,
        ref: 'Fornecedor'
    }
});

module.exports = mongoose.model('Produto', schema, 'produtos');
