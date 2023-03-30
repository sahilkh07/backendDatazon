const bcrypt=require("bcrypt")
const jwt=require('jsonwebtoken')
require('dotenv').config()

const {User} =require('../models/user.model')

const {Router}=require('express')
const userRouter=Router()


userRouter.post('/register',async(req,res)=>{
    try{
        const payload=req.body
        const user = await User.findOne({email:payload.email})

        if(user){
            return res.send({msg:"Please Login,User Already Exist"})
        }else{
        const hashPasword=await bcrypt.hashSync(payload.password,8)
           payload.password=hashPasword;
           const newUser=new User(payload)
           await newUser.save()
           return res.json({msg:"User Registered",user:newUser})
        }
    }catch(err){
        res.send({msg:err.message})

    }
})


userRouter.post('/login',async(req,res)=>{
    try {
        const payload=req.body;
        const user= await User.findOne({email:payload.email})
        if(!user) return res.send("Please Signup First")

        const isPasswordCorrect=await bcrypt.compareSync(
            payload.password,user.password
        )
        if(isPasswordCorrect){
            const token =await jwt.sign({userId:user._id},process.env.JWT_SECRET_KEY)
            res.json({msg:"Login Success",token})
        }else{
            res.json({msg:"Invalid Credentials"})
        }
    } catch (error) {
        res.send(error.message)
        
    }
})

module.exports={userRouter}