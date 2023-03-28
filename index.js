const express= require("express")
const fs=require('fs')

const app =express()

app.get('/men',(req,res)=>{
    const dataStream = fs.createReadStream('./mensdatas1.json')
    dataStream.pipe(res)
})

app.listen(4500,()=>{
    console.log("listening")
})