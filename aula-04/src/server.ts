import express from 'express'

const app = express()

app.get("/",(req,res)=>{
  return res.json({message:"hello-world"})
})

app.listen(3333,()=>{
  console.log("server is runnig! http://localhost:3333")
})