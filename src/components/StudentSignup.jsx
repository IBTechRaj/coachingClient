import React, { useState } from 'react';
import { TextField, Button, Stack, Checkbox } from '@mui/material';
import { Link } from "react-router-dom"
import axios from 'axios'
// import { ClassNames } from '@emotion/react';


const StudentSignup = ({ signedIn, setSignedIn }) => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    // const [dateOfBirth, setDateOfBirth] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [message, setMessage] = useState('')


    // axios.get(servicesUrl, {
    //     headers: { Authorization: `Bearer ${jwt}` },
    // })
    //     .then(response => {
    //         // console.log('res.dat', response.data)
    //         setServiceData(response.data)
    //     })

    const handleClick = () => {
        const jwt = localStorage.getItem('token')
        console.log('em', email)
        const payload = {
            "email": email,
        }
        axios.get('http://localhost:3001/students/resend_email', { params: payload }, {
            headers: {
                'Content-Type': 'application/json',
                'origin': 'http://localhost:3000',
                Authorization: `Bearer ${jwt}`
            },
        })
            .then(response => {
                // Handle successful response
                console.log(response.data);
                setMessage(response.data.message)
            })
            .catch(error => {
                // Handle error
                console.error(error);
            });
    };

    function handleSubmit(event) {
        event.preventDefault();
        setErrorMessage('')
        // console.log(firstName, lastName, email, password)

        if (password === passwordConfirmation) {
            console.log('signing up')
            const signUpUrl = (process.env.REACT_APP_SERVER) ? `https://motorwash-backend-lfxt.onrender.com/signup` : `http://localhost:3001/students`
            fetch(signUpUrl, {
                method: "post",
                headers: {
                    'Access-Control-Allow-Credentials': 'true',
                    "Content-Type": "application/json",
                    'origin': 'http://localhost:3000',
                },
                body: JSON.stringify({
                    "email": email,
                    "password": password,
                    "first_name": firstName,
                    "last_name": lastName,
                }),
            })
                .then((res) => res.json())
                .then(res => {
                    // console.log('res', res)
                    if (res.data) {
                        setSignedIn(true)
                        setFirstName('')
                        setLastName('')
                        setEmail('')
                        setPassword('')
                        setPasswordConfirmation('')
                        localStorage.setItem("token", res.meta.token);
                        console.log('s', res.meta.token);
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
        else {
            console.log('Passwords should match')
        }
    }
    if (signedIn)
        return (
            <>
                {/* style={{ maxWidth: 600, marginLeft: 100, padding: 20 }}  <br /> */}
                <div className="row py-5 justify-content-center">
                    <h3> You are almost there!</h3>
                </div>
                <div className="row py-5 justify-content-center" style={{ marginTop: 30, marginLeft: 300, marginRight: 300 }}>
                    <h3> Please check your email to verify and complete your sign up.


                        If you don't see it,  you may need to check your spam folder.
                        Still can't find the email?
                    </h3>
                </div >
                <div className="row py-5 justify-content-center" style={{ marginTop: 0, marginLeft: 300, marginRight: 300 }}>
                    <h3>
                        Click here to   <Link to="#" onClick={handleClick}>Resend Email</Link>

                    </h3>

                    <div> <p className='text-center' style={{ color: 'green', fontSize: 24, fontWeight: 600 }}> {message}</p></div>
                </div >
                {/* {
                    setTimeout(() => {
                        setSignedIn(false)
                    }
                        , 3000)
                } */}
            </>
        )
    else
        return (
            // <React.Fragment>
            <>

                <div className="row py-5">
                    <div className="col-md-3"></div>

                    <div className='col-md-6'>

                        <h2 className='py-3 text-center'>Signup</h2>
                        <p className='text-center' style={{ fontSize: 24 }}>Create Your Account as a Student</p>
                        <div> <p className='text-center' style={{ color: 'red' }}> {errorMessage}</p></div>
                        <form onSubmit={handleSubmit} action={<Link to="/login" />}>
                            <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                                {/* <div> */}

                                {/* <button onClick={fetchData}>Fetch Data</button> */}
                                {/* </div> */}

                                <TextField
                                    type="text"
                                    variant='outlined'
                                    color='secondary'
                                    label="First Name"
                                    onChange={e => setFirstName(e.target.value)
                                    }
                                    value={firstName}
                                    fullWidth
                                    required
                                />
                                <TextField
                                    type="text"
                                    variant='outlined'
                                    color='secondary'
                                    label="Last Name"
                                    onChange={e => setLastName(e.target.value)}
                                    value={lastName}
                                    fullWidth
                                    required
                                />
                            </Stack>
                            <TextField
                                type="email"
                                variant='outlined'
                                color='secondary'
                                label="Email"
                                onChange={e => setEmail(e.target.value)}
                                value={email}
                                fullWidth
                                required
                                sx={{ mb: 4 }}
                            />
                            <TextField
                                type="password"
                                variant='outlined'
                                color='secondary'
                                label="Create Password"
                                onChange={e => setPassword(e.target.value)}
                                value={password}
                                required
                                fullWidth
                                sx={{ mb: 4 }}
                            />
                            <TextField
                                type="password"
                                variant='outlined'
                                color='secondary'
                                label="Re-enter Password"
                                onChange={e => setPasswordConfirmation(e.target.value)}
                                value={passwordConfirmation}
                                required
                                fullWidth
                                sx={{ mb: 4 }}
                            />
                            <Checkbox /> I agree to Terms and Conditions<br></br>
                            <Button variant="contained" color="primary" type="submit">Sign up</Button>
                        </form>
                        <small>Already have an account? <Link to="/StudentLogin">Login Here</Link></small>
                    </div>
                    <div className="col-md-3"></div>
                </div>
            </>
            // </React.Fragment>
        )

}

export default StudentSignup;
