const {BagModel}=require("../models/bag.model")
const {Router}=require("express")

const {SaveModel} =require('../models/save.model')
const cartRouter=Router()

cartRouter.get('/',async(req,res)=>{
    try {
        const {userId}=req.body
     
        const data = await BagModel.find({userId})
        res.send({data,msg:"Your Items"})

    } catch (error) {
        res.send(error.message)
        
    }
})



cartRouter.post('/',async(req,res)=>{
try {
    const data = req.body
    const newPost= new BagModel(data)
    await newPost.save()
    res.send({msg:"Posted Data"})
} catch (error) {
    res.send(error.message)
}
})

cartRouter.patch('/update/:id',async(req,res)=>{
try {
    const data = req.body;
    const _id = req.params.id;
    const updated =await BagModel.findByIdAndUpdate({_id},data)
    res.send({msg:"Item updated",updated})
} catch (error) {
    res.send(error.message)
}
})

cartRouter.delete('/delete/:id',async(req,res)=>{
try {
    const _id = req.params.id;
    const deleted=await BagModel.findByIdAndDelete({_id})
    if(deleted){
        res.send("Item Delted")
    }else{
        res.send("Item Not Found ")
    }
} catch (error) {
    res.send(error.message)
}
})
cartRouter.post('/save',async(req,res)=>{
    try {
        const data = req.body
        const newPost= new SaveModel(data)
        await newPost.save()
        res.send({msg:"Posted Data"})
    } catch (error) {
        res.send(error.message)
    }

})
cartRouter.get('/saveget',async(req,res)=>{
try {
    const data =await SaveModel.find()
    res.send(data)
} catch (error) {
    res.send(error.message)
    
}
})
cartRouter.delete('/savedelete',async(req,res)=>{
try {
    const _id =req.params.id 
    const data = await SaveModel.findByIdAndDelete({_id})
    res.send(data)
} catch (error) {
    res.send(error.message)
    
}
})

module.exports={cartRouter}