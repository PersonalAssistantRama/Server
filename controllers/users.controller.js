const User = require('../models/users')
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET

module.exports={
  signUp:(req,res)=>{
    let hash = bcrypt.hashSync(req.body.password,salt)
    let newUser ={
      username:req.body.username,
      password: hash,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      gender: req.body.gender,
      wakeUpTime: req.body.wakeUpTime,
      sleepTime: req.body.sleepTime
    }
    User.findOne({
      username:req.body.username
    }).then(data=>{
      if(data){
        res.status(400).json({
          message:"username already registered!!"
        })
      }else{
        let user = new User(newUser)
        user.save().then(dataUser=>{
          console.log("===>",dataUser)
          if(dataUser){
            let token = jwt.sign({id:dataUser._id,username:dataUser.username}, secret)
            res.status(201).json({
              message:"user is created",
              data:{
                user:dataUser,
                token :token
              }
            })
          }else{
            res.status(406).json({
              message:"something wrong"
            })
          }
        }).catch(err=>{
            console.log(err)
            res.status(404).send(err.message)
          })
      }
    }).catch(error =>{
      res.status(404).json({
        error
      })
    })
    
  },
  signIn:(req,res)=>{
    console.log("ini sign in ",req.body)
    User.findOne({
      username:req.body.username
    })
    .exec()
    .then(dataUser=>{
      if(dataUser){
        console.log("ini data user===",dataUser)
        let checkPass = bcrypt.compareSync(req.body.password,dataUser.password)
        if(checkPass){
          let token = jwt.sign({id:dataUser._id,username:dataUser.username}, secret)
          res.status(200).json({
            message:"login success",
            data:{
              user: dataUser,
              token :token
            }
          })
        }else{
          res.status(400).json({
            message:"username/password is wrong!!"
          })
        }
      }else{
        res.status(400).json({
          message:"sign in failed!"
        })
      }
    })

  }
}