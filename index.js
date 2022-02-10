import express from "express";
import cors from 'cors'
import Mongoose from "mongoose";


//importing otherFiles
import route from './routes/Routes.js';

//express app
const app = express()


app.use(express.json());
app.use(express.urlencoded({extended:false}))
//applying all midlewares
app.use(cors({
    origin: '*'
})); //for cross testing 
app.use("/post",route) //for routes under /post



//dataBase url
const CONNECTION_url = 'mongodb+srv://guddu:gudduthebloger@cluster0.cxfiw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

//port
const PORT = 8000  || process.env.PORT 
const date = new Date();
//connecting to dataBase and also connecting to server or port
Mongoose.connect(CONNECTION_url)
    .then(()=>{
        app.listen(PORT,()=>{
            console.log(`listening on port : ${PORT}`);
        })
    })
    .catch(error => {
        console.log(error.message)
    })



//basic routes
app.get('/',(req,res)=>{
    res.send(`<h1>Working since ${date}</h1>`)
    console.log('hit on home')
})


















