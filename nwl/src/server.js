//modulos: aplicaçõs feitas por terceiros
const express = require("express") //require = função, voc~e pede e ela devolve  require=tira de algum lugar 
const server = express()


//pegar o banco de dados
const db = require("./database/db") //constante recebendo o banco de dados continuamente

//configurar pasta public
server.use(express.static("public"))


//utilizando template engine 
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true //salvando na mémoria sem salvar no cache

})

//confifurar caminhos da minha aplicação
//pagina inicial
//req = pedido
//res = resposta
server.get("/", (req, res) => {
    return res.render("inicio.html", { title: "um titulo" })
})


server.get("/create-point", (req, res) => {


    //req.query: Query strings da nossa url
    console.log(req.query)



    return res.render("create-point.html")
})



//GET: verbo HTTp
server.get("/search", (req, res) => {

    // pegar os dados do banco de dados 
    db.all(`SELECT * FROM places`, function(err, rows) { //trazendo informações //callback
        if (err) {
            return console.log(err)
        }

        const total = rows.length

        //mostrar a pagina html com os dados cadatrados no banco de dados
        return res.render("search-results.html", { places: rows, total: total })
    })



})


//ligar o servidor 
server.listen(3000)

//back criado e server, ultilização de uma aplicação inteligente