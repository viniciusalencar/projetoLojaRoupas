const mongoose = require ('mongoose');

// URI = UNIVERSAL RESOURCE IDENTIFIER
module.exports = function (uri) {
    mongoose.connect (uri, { useNewUrlParser: true });

    mongoose.set('useCreateIndex', true);

    mongoose.set('useFindAndModify', false);

    mongoose.connection.on('connected', function () {
        console.log ('***** Mongoose! conectado a ' + uri);
    });

    mongoose.connection.on('disconnected', function () {
        console.log ('***** Mongoose! Desconectado a ' + uri);
    });

    mongoose.connection.on ('error', function (error) {
        console.log ('***** Mongoose! Erro: ' + error);
    });

    // Capturamos um sinal de encerramento (SIGINT), CTRL + C
    process.on('SIGINT', function () {
        mongoose.connection.close(function () {
            console.log ('***** Mongoose! Desconectado pelo término da aplicação!')
            // 0 indica que a finalização ocorreu sem erros
            process.exit(0);
        });


    });

}