const mongoose = require('mongoose')

let conn

// criando uma conexão ou trazendo a conexão criada anteriormente
// design pattern chamado Singleton
const connection = () => {
    if (conn) {
        return conn
    }

    // lembrar de não deixar informações sensíveis hardcoded. Trabalhar com o pacote dotenv
    // em casos de mongoDB com usuário e senha, utilizar este modelo:
    // mongodb://usuario:senha@127.0.0.1:27017/local
    conn = mongoose.connect('mongodb://127.0.0.1:27017/local');
}

module.exports = connection
