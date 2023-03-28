const express = require('express');
const { MenModel } = require('../Models/Men.model');






const menRouter = express.Router();



menRouter.get("/", async (req, res) => {
    let {search,min,max} = req.query
    search=search || ""
    min=min || 1
    max=max || 100000
    console.log(search,min,max)
    try{
        let data = await MenModel.find({$and:[{product:{$regex:search, $options: 'i'}},{price:{$gte:min}},{price:{$lte:max}}]})
        res.send(data)
    }catch(err){
        res.send(err.message)
        console.log('err:', err)
    }
})
menRouter.get("/single/:id", async (req, res) => {
    const ID = req.params.id
    try{
        let data = await MenModel.find({_id:ID})
        res.send(data)
    }catch(err){
        res.send(err.message)
        console.log('err:', err)
    }
})
menRouter.get("/brand", async (req, res) => {
    let {brand,min,max} = req.query
    brand=brand || ""
    min=min || 1
    max=max || 100000
    console.log(brand,min,max)
    try{
        let data = await MenModel.find({$and:[{brand:{$regex:brand, $options: 'i'}},{price:{$gte:min}},{price:{$lte:max}}]})
        res.send(data)
    }catch(err){
        res.send(err.message)
        console.log('err:', err)
    }
})

menRouter.post("/", async (req, res) => {
    let payload = req.body
    try{
        let data = new MenModel(payload)
        await data.save();
        res.send("Data Sent successfully!")
    }catch(err){
        console.log('err:', err)
    }
})
menRouter.patch("/:id", async (req, res) => {
    let ID = req.params.id
    let payload = req.body
    try{
        let data = await MenModel.findByIdAndUpdate({_id:ID},payload)
        res.send("Data Updated successfully!")
    }catch(err){
        console.log('err:', err)
    }
})
menRouter.delete("/:id", async (req, res) => {
    let ID = req.params.id
    try{
        let data = await MenModel.findByIdAndDelete({_id:ID})
        res.send("Data Deleted successfully!")
    }catch(err){
        console.log('err:', err)
    }
    
})




module.exports = {
    menRouter
}