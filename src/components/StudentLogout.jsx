import React, { useState } from "react";
import { TextField, Stack, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom"

const StudentLogout = ({ signedIn, setSignedIn }) => {
    const [showMessage, setShowMessage] = useState(false)
    // const [password, setPassword] = useState("")
    // const [emailError, setEmailError] = useState(false)
    // const [passwordError, setPasswordError] = useState(false)
    // const [errorMessage, setErrorMessage] = useState('')
    // const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault()
        const jwt = localStorage.getItem('token')
        const logoutUrl = (process.env.REACT_APP_SERVER) ? `https://motorwash-backend-lfxt.onrender.com/logout` : `http://localhost:3001/students/logout`
        fetch(logoutUrl, {
            method: "post",
            headers: {
                "token": `${jwt}`,
                'Access-Control-Allow-Credentials': 'true',
                "Content-Type": "application/json",
                'origin': 'http://localhost:3000',
            },

        })
            .then((res) => res.json())
            .then(res => {
                console.log('res', res)
                // if (res.ok) {
                setSignedIn(false)
                setShowMessage(true)
                localStorage.clear()
                console.log('logout')
                // } else {
                // setErrorMessage(res.errors)
                // console.log(res.errors); // Process the response data here
                // }
            })
            .catch(error => {
                // Handle error
                console.log('error');
            });

    }



    return (
        <>
            <div className="row py-5">
                <div className="col-md-3"></div>

                <div className='col-md-6'>
                    {/* {setSignedIn(false)} */}


                    {console.log('pre', signedIn)}
                    {(signedIn) ?

                        (<Button variant="contained" color="primary" type="submit" onClick={handleSubmit}>Are you sure to logout ?</Button>)
                        :
                        (<h5 >Logged out successfully</h5>)}
                    {console.log('aft', signedIn)}
                    <small>? <Link to="/StudentLogin">Login again</Link></small>
                </div>

                <div className="col-md-3"></div>
            </div>
        </>
    );
}

export default StudentLogout;

