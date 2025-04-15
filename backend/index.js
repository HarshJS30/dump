const express = require('express');
require("dotenv").config();
const {PrismaClient} = require('@prisma/client')
const cors = require('cors');
const prisma = new PrismaClient();
const app = express();
app.use(express.json())
const port = 3000;

app.use(cors({
    origin: 'http://localhost:5173'
}));

app.get("/",(req,res)=>{
    res.send("Welcome to prisma")
})

app.listen(port,()=>{
    console.log(`Listening on ${port}`)
})

//Post Route

app.post('/post',async (req,res)=>{
    try{
        const {title,content} = req.body;
        if(!title || !content){
           return res.status(400).json({message:"Input field missing."})
        }

        const dump = await prisma.post.create({
            data:{title, content}
        })
        return res.status(200).json({message:"Dumped this dump.", data: dump})
    }catch(err){
        return res.status(500).json({ message: "Something went wrong", error: err.message });
    }
})

//Get Route

app.get('/post', async(req,res)=>{
    try{
        const dumps = await prisma.post.findMany();
        return res.status(200).json({data:dumps})
    }catch(error){
        return res.status(500).json({ message: "Error fetching dumps" });
    }
})
app.get('/post/:id', async(req,res)=>{
    const {id} = req.params;
    try{
        const dump = await prisma.post.findUnique({
            where: {id: id}
        })
        if (dump){
            return res.status(200).json(dump)
        }else{
            return res.status(404).json({message:"Error, Not Found"})
        }
    }catch(err){
        console.error(err);
        return res.status(500).json({message:"Error"})
    }
})
