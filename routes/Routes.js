import express from "express";
import { getPost, createPost, registerLogic, loginLogic  } from "../controller/Post.js";

const route = express.Router();

route.get('/',getPost)
route.post('/',createPost)
route.post('/register',registerLogic)
route.post('/login',loginLogic)


route.post('/test',(req,res)=>{
    console.log(req.body);
    res.send('<h1>hello world</h1>')
})

export default route;

