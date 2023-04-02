const {BagModel}=require("../models/bag.model")
const {Router}=require("express")


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
    res.send("Item updated")
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

module.exports={cartRouter}