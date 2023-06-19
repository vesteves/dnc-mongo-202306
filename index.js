const express = require('express')
const mongoose = require('mongoose')
const app = express()
const familiaModel = require('./src/model/familia')

app.use(express.json())

/**
 * Rota que irá cadastrar novos membros na família
 * 
 * GET http://localhost:8080/familias
 * Exemplo de requisição
    {
        "nome": "Carol",
        "idade": 20,
        "profissao": "Designer"
    }
 */
app.post('/familias', async (req, res) => {
    // Forma de cadastrar um documento criando uma nova instância do Modelo
    // const membro = new familiaModel()
    // membro.nome = req.body.nome
    // membro.idade = req.body.idade
    // membro.profissao = req.body.profissao
    // const response = await membro.save()

    // Forma de cadastrar um documento diretamente pelo método create do Modelo
    const novoMembro = await familiaModel.create({
        nome: req.body.nome,
        idade: req.body.idade,
        profissao: req.body.profissao,
    })

    return res.status(200).json({
        data: novoMembro
    })
})

/**
 * Rota para trazer todos os documents de uma collection ou documentos filtrados por idade
 * maior que a idade definida pelo cliente
 * 
 * GET http://localhost:8080/familias
 * GET http://localhost:8080/familias?idade=10
 */
app.get('/familias', async (req, res) => {
    if (req.query.idade) {
        // forma de criar um filtro usando o método gt sem where
        const membros = await familiaModel.find({}).gt('idade', req.query.idade)
        
        // forma de criar um filtro usando o método gt com where separado
        // const membros = await familiaModel.find({}).where('idade').gt(req.query.idade)

        return res.status(200).json({
            data: membros
        })
    }
    const membros = await familiaModel.find({})

    return res.status(200).json({
        data: membros
    })
})

/**
 * Rota para trazer um document específico
 * 
 * http://localhost:8080/familias/648f53935742667185d636d2
 */
app.get('/familias/:id', async (req, res) => {
    try {
        const membro = await familiaModel.findById(req.params.id)
        return res.status(200).json({
            data: membro
        })    
    }
    catch (error) {
        return res.status(400).json({
            data: {},
            message: 'Não foi possível encontrar este ID'
        })
    }
})

/**
 * Rota para atualizar um document específico
 * 
 * PUT ou PATCH http://localhost:8080/familias/648f53935742667185d636d2
 * Exemplo de request
 * 
    {
        "profissao": "DBA"
    }
 */
app.put('/familias/:id', async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).json({
            data: {},
            message: 'O id não correspondo a um ObjectId válido'
        })
    }
    const membro = await familiaModel.updateOne({ _id: req.params.id }, req.body)

    return res.status(200).json({
        data: membro
    })
})

/**
 * Rota para remover um document específico
 * 
 * Exemplo de request
 * DELETE http://localhost:8080/familias/648f53935742667185d636d2
 * 
 */
app.delete('/familias/:id', async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).json({
            data: {},
            message: 'O id não correspondo a um ObjectId válido'
        })
    }

    const membro = await familiaModel.deleteOne({ _id: req.params.id })

    return res.status(200).json({
        data: membro
    });
})

// iniciando o servidor
app.listen(8080, () => {
    console.log('Servidor operacional!')
})