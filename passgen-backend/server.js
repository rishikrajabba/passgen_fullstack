import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser  from "body-parser";
import User ,{Genpass} from "./model.js";
import dotenv from "dotenv";
dotenv.config();


const app = express();
const port = process.env.PORT||5000;
app.use(cors({
    origin:process.env.FRONTEND_CONNECTION_URL
}));
app.use(bodyParser.urlencoded({extended:1}));
app.use(bodyParser.json({extended:1}));


/*monngoose setup */
const mongoose_connection_url = process.env.MONGOOSE_CONNECTION_URL;
mongoose.connect(mongoose_connection_url,{useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify:false});

var username="";

app.post("/userlogin",(req,res)=>{
    const user_name = req.body.username;
    const pass_word = req.body.password;
    User.findOne({username:user_name},(err,results)=>{
        if(err)
        {
            res.status(400).json({message:"database error"});
        }
        else{
            if(results)
            {
                if(results.password===pass_word)
                {
                    username=user_name;
                    res.status(200).json({message:true});
                }
                else
                {
                    res.status(200).json({message:false});
                }
            }
            else
            {
                res.status(400).json({message:"user not found"});
            }
        }
    })
});

app.post("/storepassword",(req,res)=>{
    const uname = req.body.username;
    const pass = req.body.genpass;
    User.findOne({username:username},(err,results)=>{
        if(err)
        {
            res.status(400).json({message:"internal database error"});
        }
        else
        {
            if(results)
            {
                const new_password = new Genpass ({
                    gen_username:uname,
                    gen_password:pass
                })
                new_password.save();
                results.generatedpasswords.push(new_password);
                results.save();
            }
            else
            {
                res.status(200).json("user not found");
            }
        }
    })
    res.status(200).json({message:"ok"})
});
app.get("/getpasscodes",(req,res)=>{
    User.findOne({username:username},(err,results)=>{
        if(err)
        {
            res.status(400).json({message:"internal database error"});
        }
        else
        {
            if(results)
            {
                res.status(200).send(results.generatedpasswords);
            }
            else{
                res.status(200).send([]);
            }
        }
    })
})
app.post("/deletepasscode",(req,res)=>{
    const value = req.body.val;
    console.log(value);
    Genpass.findByIdAndRemove({_id:value},function(err,result){
        if(err)
        {
            res.status(400).json({message:"internal databse error"});
        }
        else
        {
            User.findOne({username:username},(err,results)=>{
                if(err)
                {
                    res.status(200).json({message:"internal databse error"})
                }
                else
                {
                    const length = results.generatedpasswords.length;
                    for(var i=0;i<length;i++)
                    {
                        if(results.generatedpasswords[i]._id==value)
                        {
                            results.generatedpasswords.splice(i,1);
                            break;
                        }
                    }
                    results.save();
                    res.status(200).send(results.generatedpasswords);
                }
            })
        }
    })
    
})
app.post("/userregister",function(req,res){
    const user_name = req.body.username;
    const pass_word = req.body.password;
    User.findOne({username:user_name},(err,results)=>{
        if(err)
        {
            res.status(400).json({message:"internal databse error"});
        }
        else
        {
            if(results)
            {
                res.status(200).json({message:false})
            }
            else
            {
                const new_user = new User({
                    username:user_name,
                    password:pass_word,
                    generatedpasswords:[]
                });
                new_user.save();
                res.status(200).json({message:true});
            }
        }
    })
})

app.get("/",(req,res)=>{
    res.send("<h1>i am up and running</h1>")
})
app.listen(port,function(){
    console.log("server is up and running")
})