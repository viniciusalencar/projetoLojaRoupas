const mongoose = require('mongoose');

const mongooseSeq = require('mongoose-sequence')(mongoose);

const schema = mongoose.Schema({

    quantidade: {
        type: Number,
        required: true
    },
    desconto: {
        type: String
    },
    vendas: {
        type: mongoose.ObjectId,
        ref: 'Vendas'
    }
});

module.exports = mongoose.model('Itemvenda', schema, 'itemvendas');
