
//referência dos módulos.
var express = require("express");
var app = express();
var mongoxlsx = require('mongo-xlsx');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
//url do baco de dados remoto.
const url = "mongodb://portal_saude:tcc2portalsaude@ds111993.mlab.com:11993/tcc";
//criando a conexão com o banco de dados.
mongoose.connect(url);

var db = mongoose.connection;

db.on('error', console.error);
db.once('open', function (callback) {
  console.log("Conexao com o banco aberta.");
});
//criando o schema do banco de dados, funciona da mesma forma que criar um model de um objeto.
var Schema = mongoose.Schema;

var postoSchema = new Schema({
  cod: String,
  nome: String,
  regiao: String,
  endereco: String,
  telefones: String,
  acolhimento: String,
  farmacia: String,
  position: String
});
var usuarioSchema = new Schema({

  idendereco: String,
  login: String,
  senha: String,
  email: String,
  nome: String,
  sobrenome: String,
  dataNascimento: String,
  perfil: Number,
  cpf: String,
  celular: String,
  dependentes: [{
    nome: String,
    sobrenome: String,
    cpf: String,
    parentesco: String
  }]

});
var vacinaSchema = new Schema({
  cod: Number,
  nome: String,
  idade: Number,
  tipoIdade: String,
  doses: Number
});

var vacinaCartaoSchema = new Schema({
  idPaciente: String,
  nome: String,
  data: String,
  lote: String,
  dose: Number
});
var enderecoSchema = new Schema({

  rua: String,
  numero: Number,
  bairro: String,
  complemento: String,
  regiao: String,
});
mongoose.Promise = global.Promise;
// mongoose.createConnection(url, {
//   useMongoClient: true  
// });


//função que executa a busca dos postos com base na região selecionada.
app.get("/Regiao/:id", function (req, res) {
  var Posto = mongoose.model("Posto", postoSchema);
  Posto.find({ regiao: req.params.id }, function (err, result) {
    if (err)
      console.log(err);
    console.log(result);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.end(JSON.stringify(result));
  });
});



app.get("/Usuario/:login", function (req, res) {
  var User = mongoose.model("Usuario", usuarioSchema);
  User.find({ login: req.params.login }, function (err, result) {
    if (err)
      console.log(err);
    console.log(result);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.end(JSON.stringify(result));
  });
});


app.get("/Usuario/Email/:email", function (req, res) {
  var User = mongoose.model("Usuario", usuarioSchema);
  User.find({ email: req.params.email }, function (err, result) {
    if (err)
      console.log(err);
    console.log(result);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.end(JSON.stringify(result));
  });
});

app.get("/Vacinas/", function (req, res) {
  var Vacina = mongoose.model("Vacina", vacinaSchema);
  Vacina.find({}, function (err, result) {
    if (err)
      console.log(err);
    console.log(result);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.end(JSON.stringify(result));
  });
});

app.post("/Usuario/Register", function (req, res) {
  var User = mongoose.model("Usuario", usuarioSchema);
  var Endereco = mongoose.model("Endereco", enderecoSchema);
  var body = req.body;



  var endereco = new Endereco({

    rua: body.endereco.rua,
    numero: body.endereco.numero,
    bairro: body.endereco.bairro,
    complemento: body.endereco.complemento,
    regiao: body.endereco.regiao.nome,
  });
  endereco.save(function (err, documentEnd) {
    if (err)
      console.log(err);
    console.log("saved");
    var usuario = new User({

      login: body.login,
      senha: body.senha,
      email: body.email,
      nome: body.nome,
      sobrenome: body.sobrenome,
      dataNascimento: body.datanascimento,
      cpf: body.cpf,
      celular: body.celular,
      perfil: 1,
      idendereco: documentEnd._id,
      dependentes: []
    });
    usuario.save(function (err, documentUser) {
      if (err)
        console.log(err);
      console.log("saved");
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.send(documentUser);
    });
  });
})

app.post("/Vacinas/Register", function (req, res) {
  var VacinaCartao = mongoose.model("VacinaCartao", vacinaCartaoSchema);
  var body = req.body;
  var vacinaCartao = new VacinaCartao({
    idPaciente: body.idpaciente,
    nome: body.nome,
    data: body.data,
    lote: body.lote,
    dose: body.dose
  });
  vacinaCartao.save(function (err, document) {
    if (err)
      console.log(err);
    else
      console.log("saved");
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send(document);
  });
})

//função que cria a tabela no banco. A tabela é criada a partir de um arquivo xls. 
app.get("/CreatePostos/", function (req, res) {
  console.log("connected");
  var Posto = mongoose.model("Posto", postoSchema);
  var model = null;
  var ods = './Base de Postos de Saude.ods';

  mongoxlsx.xlsx2MongoData(ods, model, function (err, data) {
    console.log('start');
    data[0].forEach(function (element) {
      var posto = new Posto({
        cod: element.Cod,
        nome: element.Nome,
        regiao: element.Regiao,
        endereco: element.Endereco,
        telefones: element.Telefones,
        acolhimento: element.Acolhimento,
        farmacia: element.Farmacia,
        position: element.Position
      });

      posto.save(function (err) {
        if (err)
          return handleError(err);
        console.log("saved");

      })
    }, this);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.end(JSON.stringify("Created"));
  });
});
app.get("/CreateUsers/", function (req, res) {
  console.log("connected");
  var User = mongoose.model("Usuario", usuarioSchema);

  var usuario = new User({
    id: 1,
    login: "sdm",
    senha: "x",
    email: "sdm@sdm.com",
    nome: "Saulo",
    sobrenome: "Daniel Medeiros",
    dataNascimento: "15-02-1994",
    cpf: "109.683.476-65",
    celular: "996137099",
    perfil: 1,
    endereco: {
      rua: "Vitória",
      numero: 146,
      bairro: "Santa Cruz",
      complemento: "",
      regiao: "Nordeste",
    },
    dependentes: []
  });
  usuario.save(function (err) {
    if (err)
      return handleError(err);
    console.log("saved");
  })
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify("Created"));
});
// app.get("/CreateVacinas/", function (req, res) {
//   console.log("connected");
//   var Vacina = mongoose.model("Vacina", vacinaSchema);
//   var model = null;
//   var ods = './Base de Vacinas.ods';

//   mongoxlsx.xlsx2MongoData(ods, model, function (err, data) {
//     console.log('start');
//     console.log(data);
//     data.forEach(function (element) {
//       var vacina = new Vacina({
//         cod: element.Cod,
//         nome: element.Nome,
//         idade: element.Idade,
//         tipoIdade: element.TipoIdade,
//         doses: element.Doses
//       });

//       vacina.save(function (err) {
//         if (err)
//           return handleError(err);
//         console.log("saved");

//       })
//     }, this);
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.end(JSON.stringify("Created"));
//   });
// });

var server = app.listen(3000, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("app listening at http://%s:%s", host, port)
});



