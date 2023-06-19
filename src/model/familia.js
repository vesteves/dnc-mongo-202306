const mongoose = require('mongoose')
const conn = require('../../config/mongo')

conn()
// Schema: estrutura da nossa collection
const familiaSchema = mongoose.Schema({
    nome: String,
    idade: Number,
    profissao: String,
}, {
    // opção necessária para criar os fields createdAt e updatedAt automaticamente
    timestamps: true
})

// criação do modelo que será responsável em conversar com nossa collection
// primeiro parâmetro: nome da collection
// segundo parâmetro: a estrutura criada acima
const familiaModel = mongoose.model('familias', familiaSchema)

module.exports = familiaModel