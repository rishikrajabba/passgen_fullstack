import axios from '../axios';
import React, { useState } from 'react'
import "./Gnerate.css";
import { loggedin } from './Login';
import { registered } from './Register';
const alpha = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz";
const alphanumeric = "1234567890"+alpha+"1234567890";
const alphanumericspecial = "!@#$%^&*()"+alphanumeric+"!@#$%^&*()";

function Generate(props) {
    const [clicked,setclcked] = useState(false);
    const [Generatedpassword,setgen] = useState("generated password");
    const [passstate,setpasstate] = useState({
        length:0,
        strength:"weak",
    });
    const [cred,setcred] = useState({
        username:"",
        genpass:"",
    });
    function handlechange(event)
    {
        const name = event.target.name;
        const value = event.target.value;
        if(name==="length")
        {
            setpasstate((prev)=>{
                return({
                    length:value,
                    strength:prev.strength
                });
            })
        }
        else{
            setpasstate((prev)=>{
                return({
                    length:prev.length,
                    strength:value
                })
            })
        }
    }
    function generate(event)
    {
        var result="";
        event.preventDefault();
        const length = passstate.length;
        const strength = passstate.strength;
        if(strength==="weak")
        {
            const strlen = alpha.length;
            for(let i=0;i<length;i++)
            {
               let index =  Math.floor(Math.random() * strlen);
               result+=alpha[index];
            }
            setgen(result); 
            setclcked(true);           
        }
        else if(strength==="normal")
        {
            const strlen = alphanumeric.length;
            for(var i=0;i<length;i++)
            {
                let index  = Math.floor(Math.random()*strlen);
                result+=alphanumeric[index];
            }
            setgen(result);
            setclcked(true);
        }
        else {
            const strlen = alphanumericspecial.length;
            for(var i=0;i<length;i++)
            {
                let index  = Math.floor(Math.random()*strlen);
                result+=alphanumericspecial[index];
            }
            setgen(result);
            setclcked(true);
        }
    }
    function handlestore(e)
    {
        
        if(loggedin||registered)
        {
            const password = Generatedpassword;
            console.log(password)
            var user_credentials = {
                username:cred.username,
                genpass:password
            }
            axios.post("/storepassword",user_credentials,{
                headers:{
                    'content_type':'application/json'
                }
            }).then((data)=>{
                alert("stored");
                console.log(data.data.message);
            }).catch((err)=>{
                alert("not stored");
                console.log(err)
            });
            e.preventDefault();
        }
        else
        {
            props.history.push("/login");
        }
    }
    
    function usernamechange(event)
    {
        const name = event.target.name;
        if(name=="username")
        {
            setcred(()=>{
                return(
                    {
                        username:event.target.value,
                        genpass:Generatedpassword
                    }
                );
            })
        }

    }
    return (
        <div className="generate">
            <div className="generate_container">
                <form className="generate_form" onSubmit={generate}>
                <input className="generate_length" onChange={handlechange} type="number" min="8" placeholder="Password length" required name="length"/>
                    <div className="strength">
                        <div className="generate_flexer">
                        <label htmlFor="strength">Weak</label>
                        <input onChange={handlechange} type="radio" value="weak" name="strength" required/>
                        </div>
                        <div className="generate_flexer">
                        <label htmlFor="strength">Normal</label>
                        <input onChange={handlechange} type="radio" value="normal" name="strength"/>
                        </div>
                        <div className="generate_flexer">
                        <label htmlFor="strength">Strong</label>
                        <input onChange={handlechange} type="radio" value="strong" name="strength"/>
                        </div>
                    </div>
                    <button className="submitbtn">generate</button> 
                </form>
                <h1 className="result">{Generatedpassword}</h1>
            {clicked? <form onSubmit={handlestore} className="cred">
                <input onChange={usernamechange} type="text" name="username" placeholder="username" required/> <button className="submitbtn" type="submit" >Store</button>
            </form>:null}

            </div>
        </div>
    )
}

export default Generate;