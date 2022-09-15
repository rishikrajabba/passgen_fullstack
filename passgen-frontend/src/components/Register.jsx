
import React,{useState} from 'react';
import "./Register.css";
import axios from '../axios';
var registered = false;
function Register(props) {
    const [usercred,setusercred] = useState({
        username:"",
        password:""
    });
    const [userfound,setuserfound] = useState(false);
    function handlechange(event)
    {
        const name = event.target.name;
        const value = event.target.value;
        if(name==="user")
        {
            setusercred((prev)=>{
                return({
                    username:value,
                    password:prev.password
                })
            })
        }
        else if(name==="pass")
        {
            setusercred((prev)=>{
                return({
                    username:prev.username,
                    password:value
                })
            })
        }
    }
    function handlesubmit(event)
    {
        axios.post("/userregister",usercred,{
            headers:{
                'content_type':'application/json'
            }
        }).then((response)=>{
            const decide = response.data.message;
            if(decide)
            {
                registered=true;
                props.history.push("/");
            }
            else
            {
                setuserfound(true);
            }
        }).catch((err)=>{
            console.log(err);
            props.history.push("/");
        })
        event.preventDefault();
    }
    return (
        <div className="register">
            <div className="reg_container">
                <h1>Register</h1>
                <form onSubmit={handlesubmit}>
                    <input onChange={handlechange} name="user" type="text" placeholder="username" required/>
                    <input onChange={handlechange} name="pass" type="password" placeholder="password" required minLength="8" />
                    <button className="submitbtn">Register</button>
                    {userfound? <div>
                        <p>user name already taken</p>
                    </div>:null}
                </form>
            </div>
        </div>
    )
}

export default Register;
export {registered};
