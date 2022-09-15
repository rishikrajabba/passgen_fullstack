import React, { useEffect, useState } from 'react';
import "./Passcodes.css";
import axios from "../axios.js";
import {loggedin} from "./Login"

function Passcodes(props) {
    const [passcodes,setpasscodes] = useState([]);
    if(!loggedin)
            {
                props.history.push("/login");
            }

        useEffect(()=>{
        
                axios.get("/getpasscodes")
                .then((data)=>{
                    setpasscodes(data.data);
                    console.log(data);
                })
                .catch((err)=>{
                    setpasscodes([]);
                    console.log(err);
                })
            
        },[]);
    function handle_delete(event)
        {
            const value = event.target.value;
            axios.post("/deletepasscode",{
                val:value
            },{
                headers:{
                    'content_type':'application/json'
                }
            }).then((data)=>{
                setpasscodes(data.data);
            }).catch((err)=>{
                console.log(err);
            })
        }
    const length = passcodes.length;
    return (
        <div className="passcodes">
            {length!=0? 
                passcodes.map((element)=>{
                return(
                    <div className="passcodes_card">
                    <h1>{element.gen_username}</h1>
                    <h1>{element.gen_password}</h1>
                    <button onClick={handle_delete} value={element._id} className="delbtn" >Delete</button>
                    </div>                    
                );
            }):<h1 className="warning">No passwords stored</h1>}
        </div>
    )
}

export default Passcodes;
