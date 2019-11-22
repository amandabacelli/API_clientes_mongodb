const express = require("express")
const mongoose = require("mongoose")
const bodyParse = require("body-parser")
const app = express()

mongoose.connect("mongodb://localhost:27017/clientes", {useNewUrlParser:true, useUnifiedTopology:true})

let db = mongoose.connection
db.on("error", console.log.bind(console, "connection error"))
db.once("open", function (){
    console.log("conexão feita com sucesso")
})

// const index = require("./routes/index")
const clientes = require("./routes/clientesRouter")

app.use(bodyParse.json())
// app.use("/", index) //não precisa ter
app.use("/clientes", clientes)//todas as rotas começam com /clientes


module.exports = app
