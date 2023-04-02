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
            return res.status(400).send({msg:"Please Login,User Already Exist"})
        }else{
        const hashPasword=await bcrypt.hashSync(payload.password,8)
           payload.password=hashPasword;
           const newUser=new User(payload)
           await newUser.save()
           return res.status(200).json({msg:"User Registered",user:newUser})
        }
    }catch(err){
        res.status(400).send({msg:err.message})

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

userRouter.get('/',async(req,res)=>{
    try {
        let data = await User.find()
        res.send(data)
    } catch (error) {
     res.send(error)   
    }
})

userRouter.patch('/update/:id',async(req,res)=>{
try {
    const{id}=req.params
    let data = await User.findOne(id)
    res.send(data)
    
} catch (error) {
    res.send(error)
}
})

module.exports={userRouter}