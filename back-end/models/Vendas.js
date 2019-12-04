const mongoose = require('mongoose');

const mongooseSeq = require('mongoose-sequence')(mongoose);

const schema = mongoose.Schema({

    nota_fiscal: {
        type: Number,
        required: true
    },
    data_venda: {
        type: Date,
        required: true
    },
    produto: {
        type: mongoose.ObjectId,
        ref: 'Produto'
    },
    itemvenda: {
        type: mongoose.ObjectId,
        ref: 'Itemvenda'
    },
    cliente: {
        type: mongoose.ObjectId,
        ref: 'Cliente'
    },
    vendedor: {
        type: mongoose.ObjectId,
        ref: 'Vendedor'
    }

});

module.exports = mongoose.model('Vendas', schema, 'vendas');
