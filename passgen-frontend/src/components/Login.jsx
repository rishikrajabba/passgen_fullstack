import React,{useState} from 'react';
import "./Login.css";
import axios from "../axios.js";
var loggedin = false;
function Login(props) {
    const [usercred,setusercred] = useState({
        username:"",
        password:""
    });
    const [err,setErr] = useState(false);
    function handlechange(event)
    {
        const name = event.target.name;
        const value = event.target.value;
        if(name==="user")
        {
            setusercred((prev)=>{
                return(
                    {
                        username:value,
                        password:prev.password
                    }
                );
            })
        }  
        else if(name==="pass")
        {
            setusercred((prev)=>{
                return(
                    {
                        username:prev.username,
                        password:value
                    }
                );
            })
        } 
    }
    function handlesubmit(e)
    {
        e.preventDefault();
        axios.post("/userlogin",usercred,{
            headers:{
                'content_type':'application/json'
            }
        }).then((response)=>{
            const decider = response.data.message;
            if(decider)
            {
                loggedin=true;
                props.history.push("/passcodes");
            }
            else{
                setErr(true);
            }
        }).catch((err)=>{
            console.log(err);
            props.history.push("/register")
        })
    }
    return (
        <div className="login">
            <div className="login_container">
                <h1>Login</h1>
                <form onSubmit={handlesubmit}>
                    <input name="user" onChange={handlechange} type="text" placeholder="username" required/>
                    <input name="pass" minLength="8" onChange={handlechange} type="password" placeholder="password" required/>
                    <button className="submitbtn" type="submit">submit</button>
                    {err? <div>
                        password incorrect
                    </div>:null}
                </form>
            </div>
        </div>
    )
}

export default Login;
export {loggedin};
