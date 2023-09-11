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
        const logoutUrl = (process.env.REACT_APP_SERVER) ? `https://coaching-q9o7.onrender.com/students/logout` : `http://localhost:3001/students/logout`
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

                <div className='col-md-6 py-5 text-center'>
                    {/* {setSignedIn(false)} */}
                    {/* <h3>Are you sure to logout ?</h3> */}

                    {console.log('pre', signedIn)}
                    {(signedIn) ?
                        (<h3>Are you sure to logout ?</h3>) :
                        null}
                    {(signedIn) ?

                        (
                            <Button variant="contained" color="primary" type="submit" onClick={handleSubmit}>Yes, I want to logout</Button>)
                        :
                        (<h3 >Logged out successfully</h3>)}
                    {console.log('aft', signedIn)}
                    <div className="py-5">
                        <h5 ><Link to="/StudentLogin" style={{ color: 'blue' }}>Login again</Link></h5>
                    </div>
                </div>

                <div className="col-md-3"></div>
            </div>
        </>
    );
}

export default StudentLogout;

