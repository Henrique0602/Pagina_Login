//requisitando os modulos

const mongoose=require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");

// configurando o express para o postman e para usar a pagina

const app = express();
app.use(bodyParser.urlencoded({extended : true}));
const port =3000;

// configurando o banco de dados
mongoose.connect("mongodb://127.0.0.1:27017/birgostore",
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}); 

// criando a model a do seu projeto

const UsuarioSchema = new  mongoose.Schema({

    Nome : {type : String},
    Senha : {type : String}
});

const Usuario = mongoose.model("Usuario",UsuarioSchema);

//configuração dos roteamentos 
//cadastroUsuario

app.post("/index" , async(req , res)=>{
    const Nome = req.body.Nome;
    const Senha = req.body.Senha

    //validação de campos

    if(Nome==null || Senha==null){
        return res.status(400).json({error : "Preencher todos os campos"});

    }

    //teste de duplicação
    const SenhaErrada = await Usuario.findOne({Senha : Senha});

    if(SenhaErrada){
        return res.status(400).json({error : "A senha informada não existe"});
    }

    const usuario = new Usuario({
        Nome : Nome,
        Senha : Senha,
    });

try{
    const newUsuario = await usuario.save();
    res.json({error : null, msg : "Cadastro ok ", UsuarioId : newUsuario._id});
}catch (error) {}

});

// segunda model 

const registroSchema = new  mongoose.Schema({

    Nome : {type : String},
    Senha : {type : String},
    Email : {type : String},
    CEP   :   {type: String}
});

const usuario = mongoose.model("usuario",registroSchema);

//configuração dos roteamentos 
//cadastroUsuario

app.post("/registro" , async(req , res)=>{
    const Nome = req.body.Nome;
    const Senha = req.body.Senha;
    const Email = req.body.Email;
    const CEP = req.body.CEP

    //validação de campos

    if(Nome==null || Senha==null || Email==null || CEP==null ){
        return res.status(400).json({error : "Preencher todos os campos"});

    }

    //teste de duplicação

    const usuario2 = new usuario({
        Nome : Nome,
        Senha : Senha,
        Email : Email,
        CEP : CEP
    });

try{
    const newUsuario = await usuario2.save();
    res.json({error : null, msg : "Cadastro ok ", UsuarioId : newUsuario._id});
}catch (error) {}

});

// terceira model

const esqueceuSchema = new  mongoose.Schema({

    Nome : {type : String},
    Senha : {type : String},
    Email : {type : String},
    CEP   :   {type: String}
});

const USuario = mongoose.model("USuario",esqueceuSchema);

//configuração dos roteamentos 
//cadastroUsuario

app.post("/esqueceu" , async(req , res)=>{
    const Senha = req.body.Senha;
    const NewSenha = req.body.NewSenha

    //validação de campos

    if( Senha==null || NewSenha==null ){
        return res.status(400).json({error : "Preencher todos os campos"});

    }

    //teste de duplicação

    const SenhaErrada = await Usuario.findOne({Senha : Senha});

    if(SenhaErrada){
        return res.status(400).json({error : "A senha informada não existe"});
    }

    const usuario3 = new USuario({
        Senha : Senha,
        NewSenha : NewSenha
    });

try{
    const newUsuario = await usuario3.save();
    res.json({error : null, msg : "Cadastro ok ", UsuarioId : newUsuario._id});
}catch (error) {}

});

//rota de get de formulario

app.get("/registro", async(req, res)=>{
    res.sendFile(__dirname + "/registro.html")
});
  
app.get("/index", async(req, res)=>{
      res.sendFile(__dirname + "/index.html")
});
  
app.get("/esqueceu", async(req, res)=>{
    res.sendFile(__dirname + "/esqueceu.html")
});


app.listen(port, ()=>{
    console.log(`Servidor rodando na porta ${port}`)
})