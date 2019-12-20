const model=require('../models');

module.exports={

    guardarUsuario(req,res,usuarioId){
        model.Freelancer.create({
            usuarioId:usuarioId,
            tiempoExperiencia:req.body.tiempoExperiencia,
            tipoFreelancer: req.body.tipoFreelancer,
            status: req.body.status
          })
          .then(function(){ res.send(200,{message:'El usuario se ha creado correctamente'})})
          .catch(err => res.status(400).json('Error: ' + err));
    },
    consultarPerfil(req,res){
        model.User.findAll({
            where: {id: req.user.id},
            include:['freelancer']
        })
        .then(function(freelancer){ res.send(freelancer)})
        .catch(err => res.status(400).json('Error: ' + err));
    }



}