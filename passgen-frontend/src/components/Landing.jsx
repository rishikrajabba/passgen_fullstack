import React from 'react'
import "./Landing.css"
function Landing(props) {
    function handleclick()
    {
        props.history.push("/generate")
    }
    return (
        <div className="Landing">
            <div className="container">
                <h1 className="landing_heading">
                    PASSGEN
                </h1>
                <p className="landingdes">
                    welcome user , you are at the right site for creating strong passwords. go register yourself to save your passwords for future purposes
                </p>
                <button onClick={handleclick} className="landing_btn">Generate password</button>
            </div>

        </div>
    )
}

export default Landing;