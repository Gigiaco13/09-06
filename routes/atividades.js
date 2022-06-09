var usuarios = require('../models/usuarios')
var atividades = require('../models/atividades')


module.exports = (app)=>{
    app.post('/atividades',async(req,res)=>{
        var dados = req.body
        //return console.log(dados)
        //conectar com o databese
        const databese = require("../config/database")()
        //gravar as informações do formulário no database
        var gravar = await new atividades({
            data:dados.data,
            tipo:dados.tipo,
            entrega:dados.entrega,
            disciplina:dados.disciplina,
            instrucoes:dados.orientaçoes,
            usuario:dados.id,
            titulo:dados.titulo
        }).save()
       
        //recarregar a página atividades
        res.redirect('/atividades?id='+dados.id)
    })
    app.get('/atividades',async(req,res)=>{
        //listar todas as ativiades do usúario logado
        var user = req.query.id
        if(!user){
            res.redirect("/login")
        }

        var dadosUser = await usuarios.findOne({_id:user})
        var dadosAtividades = await atividades.find({usuario:user}).sort({data:1})

            res.render('atividades.ejs',{nome:dadosUser.nome,id:dadosUser._id,lista:dadosAtividades})
            
    })
    app.get('/excluir',async(req,res)=>{
        //qual o documento será excluído da collection atividades???
        var doc = req.query.id
        console.log(doc)
        //excluir o documento
        var excluir = await atividades.findOneAndDelete({
            _id:doc
    })
    //voltar para a lista de atividades
   res.redirect('/atividades?id='+excluir.usuario)
})
}