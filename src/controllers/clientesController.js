const Clientes = require('../models/clientesSchema')

exports.post = (req,res) => {
    let cliente = new Clientes(req.body)
    cliente.save(function (err){
        if (err){
            return res.status(500).send(err)
        }
        return res.status(201).send({
            status: "true",
            mensagem: "Aluna incluida com sucesso"
        }) 
    })
}

exports.get = (req,res) => {
    Clientes.find(function (error, clientes){
        if (error) res.status(500).send(error)
        res.status(200).send(clientes)
    })
}

exports.getCompradores = (req, res) => {
    //forma com find no banco
    //Client.find({comprou: true}, function (error, clientes){
        // if (error) res.status(500).send(error)    
    // res.status(200).send(clientes)

    // })
    Clientes.find(function (error, clientes){
        if (error) res.status(500).send(error)
        const compra = clientes.filter(cliente => cliente.comprou == true)
        const compradores = compra.map(({nome , email}) => ({nome , email})) //descontrução para atribuir as duas propriedades no mesmo objeto
        res.status(200).send(compradores)
    })
}

exports.getCPF = (req, res) => {
    const cpf = req.params.cpf
    Clientes.find({cpf}, function (error,clientes){
        if (error) res.status(500).send(error)
        res.status(200).send(clientes)
    })
}

exports.update = (req,res) => {
    if(!validaFormulario(req.body)) return res.status(400).send({mensagem: "campos invalidos"})

    Clientes.update(
        {cpf : req.params.cpf},
        {$set : req.body},
        {upsert : true},
        function (err) {
            if (err) return res.status(500).send({message : err})
            res.status(200).send({message : "Atualizado com sucesso"})
        })
}
//para validar o que estou inserindo no banco - tme que instalar o joi

const validaFormulario = (campos) => {
    const schema = {
        nome: Joi.string().min(1).required(), //joi eh uma biblioteca, string eh o tipo, min eh a qtdade minima de caracteres
        email: Joi.string().min(1).required() //required eh a obrigatoriedade
    }
    const validation = Joi.validate(campos, schema) // declaro o que eu quero validar, determina obrigatoriedade
    if (validation.error) {
        return false
    }
}

//passar mais de um parametro - nao muda nada no router, fica da mesma forma, o que muda eh a url da requisição. Não precisa declarar na rota

exports.getVariosFiltros = (req,res) => 
{
    const filter = req.query
    Clientes.find(filter, function (err, clientes){
        if(err) res.status(500).send(err)
        res.status(200).send(clientes)
    })
}
//rota somente no postman: localhost:3000/clientes?comprou=true&&estadoCivel=casada

exports.deletarCliente = (req,res) => {
    const cpf = req.params.cpf
    Clientes.find({cpf}, function (error,cliente) {
        if (error) res.status(500).send(error)
        
        if(cliente.length == 0) {
            return res.status(200).send({mensagem: `Cliente ${cliente} não encontrado`})
        }
        res.status(200).send(cliente)

        cliente.remove(function(err){
            if(!err) {
                res.status(204).send({mensagem: `Cliente ${cliente} foi removido com sucesso `})
            }

        })
    })
}
