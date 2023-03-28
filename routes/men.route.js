const express = require('express');
const { MenModel } = require('../models/men.model');






const menRouter = express.Router();



menRouter.get("/", async (req, res) => {
    let { search, min, max, page, limit } = req.query;
    search = search || "";
    min = min || 1;
    max = max || 100000;
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 40;
  
    try {
      const count = await MenModel.countDocuments({
        $and: [
          { product: { $regex: search, $options: "i" } },
          { price: { $gte: min, $lte: max } },
        ],
      });
  
      const skip = (page - 1) * limit;
      const totalPages = Math.ceil(count / limit);
      const query={}
  
    //   const query = {
    //     $and: [
    //       { product: { $regex: search, $options: "i" } },
    //       { price: { $gte: min, $lte: max } },
    //     ],
    //   };
  
      const data = await MenModel.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);
  
      res.send({ data, totalPages });
    } catch (err) {
      res.send(err.message);
      console.log("err:", err);
    }
  });
  
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