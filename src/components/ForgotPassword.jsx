import React, { useState } from 'react'
// import { Redirect } from 'react-router-dom'
import { NavLink } from "react-router-dom";
import { TextField, Button } from "@mui/material";

// import { HashLink as Link } from 'react-router-hash-link';
// import PasswordReset from './PasswordReset'

const ForgotPassword = () => {

    const [email, setEmail] = useState("")
    // const [forgotEmail, setForgotEmail] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [message, setMessage] = useState('')
    const emdata = {
        email: email
    }
    // let history = useHistory()
    function Center({ children }) {
        return (
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '50vh',
                }}
            >
                {children}
            </div>
        );
    }

    const handleSubmitForgotPassword = async (event) => {
        event.preventDefault();
        setMessage('')
        setErrorMessage('')
        const forgotUrl = (process.env.REACT_APP_SERVER) ? `https://groomwell-backend.onrender.com/forgot_password` : `http://localhost:3001/forgot_password`

        // console.log('forgot 1', forgotUrl)

        try {
            fetch(forgotUrl, {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(emdata)
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log('res', data)
                    if (data.message) {
                        setMessage(data.message)
                        console.log('msg', data)
                        // console.log("forgot email posted", res)
                        // alert('Password reset link sent to your email');
                        // history.push('/')

                        // return res.json();
                    } else {
                        console.log('err', data.errors)
                        setErrorMessage(data.errors)
                        // alert(res.errors);
                        // history.push('/')
                        // throw new Error(res);
                    }

                })
            // .then((data) => {
            // console.log('d', data)
            // })
            // .then((json) => console.dir(json))
        }
        catch (error) {
            // console.log('Err: ', error);
        }
    }

    return (
        <>

            <h1 className='text-center'>Forgot Password</h1>

            <div className="row py-5">
                <div className="col-md-4"></div>

                <div className='col-md-4'>
                    <h5 className='text-center'>Enter your email address below to receive a password reset link.</h5>
                    <form autoComplete="off" onSubmit={handleSubmitForgotPassword}>
                        <h2 className='py-3 text-center'>Forgot Password</h2>
                        <div> <p className='text-center' style={{ color: 'red' }}> {errorMessage}</p></div>
                        <div> <p className='text-center' style={{ color: 'green' }}> {message}</p></div>

                        <div> <p className='text-center' style={{ color: 'red' }}> </p></div>
                        <TextField
                            label="Email"
                            onChange={e => setEmail(e.target.value)}
                            required
                            variant="outlined"
                            color="secondary"
                            type="email"
                            sx={{ mb: 3 }}
                            fullWidth
                            value={email}
                        // error={emailError}
                        />
                        {/* <TextField
                            label="Password"
                            onChange={e => setPassword(e.target.value)}
                            required
                            variant="outlined"
                            color="secondary"
                            type="password"
                            value={password}
                            error={passwordError}
                            fullWidth
                            sx={{ mb: 3 }}
                        /> */}

                        <Button variant="contained" color="primary" type="submit">Send Reset Link</Button>
                    </form>
                    {/* <small>Need an account? <NavLink to="/StudentSignup">Register here</NavLink></small> */}
                </div>

                <div className="col-md-3"></div>
            </div>




            {/* <p className='px-5'>We shall send Reset Password Link to this email if it is valid.

                After you receive the reset link, click here to < NavLink
                    to='/PasswordReset'
                    color='black'
                >
                    Reset Password</NavLink > .</p> */}

        </>
    )
}

export default ForgotPassword