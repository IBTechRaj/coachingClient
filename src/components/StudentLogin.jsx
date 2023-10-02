import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom"
import { Spinner } from "reactstrap";

const StudentLogin = ({ signedIn, setSignedIn }) => {
    const [loggedInState, setLoggedInState] = useState()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault()
        setLoggedInState("logging in")

        setEmailError(false)
        setPasswordError(false)

        if (email === '') {
            setEmailError(true)
        }
        if (password === '') {
            setPasswordError(true)
        }

        if (email && password) {
            console.log(email, password)
        }
        console.log('Log in')
        const loginUrl = (process.env.REACT_APP_SERVER) ? `https://coaching-q9o7.onrender.com/students/login` : `http://localhost:3001/students/login`
        fetch(loginUrl, {
            method: "post",
            headers: {
                'Access-Control-Allow-Credentials': 'true',
                "Content-Type": "application/json",
                // 'origin': 'http://localhost:3000',
            },
            body: JSON.stringify({
                "email": email,
                "password": password,
            }),
        })
            .then((res) => res.json())
            .then(res => {
                console.log('res', res)
                if (res.data) {
                    setSignedIn(true)
                    localStorage.setItem("token", res.meta.token);
                    console.log('login token', res.meta.token, email);

                    if (email === 'krs30018@gmail.com')
                        navigate('/AdminPage', { replace: true })
                    else {
                        alert("Login success")
                        navigate('/DashPage', { replace: true })
                    }
                } else {
                    setErrorMessage(res.errors)
                    console.log(res.errors); // Process the response data here
                }
            })
            .catch(error => {
                // Handle error
                console.error(error);
            });

    }

    return (
        <>

            {loggedInState === "logging in" ? <Spinner /> : (

                <div className="row py-5" style={{ height: '650px' }}>
                    <div className="col-md-4"></div>

                    <div className='col-md-4'>
                        <form autoComplete="off" onSubmit={handleSubmit}>
                            <h2 className='py-5 text-center'>Login</h2>

                            <div> <p className='text-center' style={{ color: 'red' }}> {errorMessage}</p></div>
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
                                error={emailError}
                            />
                            <TextField
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
                            />
                            <NavLink
                                to='/ForgotPassword'
                                // className='nav-links'
                                style={{ color: 'blue' }}
                            // onClick={
                            //     onCloseLoginModal
                            // }
                            >
                                Forgot Password
                            </NavLink>
                            <Button variant="contained" style={{ backgroundColor: '#4E1CBE', marginTop: 50 }} type="submit">Login</Button>
                        </form>
                        <small>Need an account? <NavLink to="/StudentSignup" style={{ color: 'blue' }}>Register here</NavLink></small>
                    </div>

                    <div className="col-md-3"></div>
                </div>
            )}
        </>
    );
}

export default StudentLogin;

