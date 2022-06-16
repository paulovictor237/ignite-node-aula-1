import express from 'express';

const app = express();


app.get("/",(req,res)=>{
  res.status(200).json({massage:'hello-world'})
})


app.listen(3333);