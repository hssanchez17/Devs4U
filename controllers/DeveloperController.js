const model=require('../models');
const passport=require('passport');
const bcrypt = require('bcryptjs');
module.exports={

    associate(email) {
        model.User.findAll({
            where: {
             email:email
            }
          }).then(function(user){
              model.developer.create({
                  userId:user[0].id,
                  workHours:0,
                  developerType:'',
                  expierece:''
              })
          })
    },
}
