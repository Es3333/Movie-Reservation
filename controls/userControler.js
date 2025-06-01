const UserModel = require('../models/user.model')
const Jwt = require('jsonwebtoken')
const bycrypt = require('bcryptjs')


exports.signUp = async (req,res)=>{

const {name, email, password, role} = req.body
    try {
        const existingUser = await UserModel.findOne({
            where :{email}
        })
        if (existingUser){
            return    res.json ({message : 'already exist'})
        }
        const Hpassword = await bycrypt.hash(password,10)
        const data = await UserModel.create({
            name,
            email,
            password : Hpassword ,
            role
        })
        res.json(data)
    }
    catch (err){
    res.json({message : err})
    }

}

exports.login = async (req,res)=>{
    const {email ,password} =req.body
    try {
        const name = await UserModel.findOne({
            Where: email
        })

        if (!name){
            return res.json({message : 'wrong email or password'})
        }
        const Match = await bycrypt.compare(password ,name.password)
        if(!Match){
            return res.json({message : 'wrong email or password'})

        }
        const token = await Jwt.sign(
            {id :name.id, role : name.role},
            'fkdlps'
        )
res.json(token)
    }
    catch (err){
        res.json({message : err})
    }
}

