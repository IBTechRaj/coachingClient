
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
import React, { useState } from 'react'
import { TextField, Button } from "@mui/material";

import PasswordChecklist from "react-password-checklist";
// import { useSearchParams, useNavigate } from "react-router-dom";

function ChangePassword() {

    const baseURL = (process.env.REACT_APP_SERVER) ? `https://coaching-q9o7.onrender.com/` : `http://localhost:3001/`

    const [currentPassword, setCurrentPassword] = useState("")
    const [password, setPassword] = useState('')
    const [passwordAgain, setPasswordAgain] = useState("")


    const handleSubmitChangePassword = (event) => {
        event.preventDefault()

        const jwt = localStorage.getItem('token');
        const credentials = {
            // email: email,

            password: password
        }
        if (password !== passwordAgain) {
            alert("Passwords don't match");

        } else {
            fetch(`${baseURL}/change_password`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${jwt}`,
                    'token': `${jwt}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(credentials)
            })
                .then(res => res.json())
                .then(data => {
                    // console.log('pr', data)
                    if (data) {
                        alert(data.message)
                        // navigate('/StudentLogin')
                        // navigate('/Home', { replace: true });
                    } else {
                        alert('There is some error. Pl contact customer care')

                    }

                })
                .catch(console.log)
        }

    }


    return (
        <>
            <h1 className='text-center'>Change Password</h1>
            {/* {console.log('token', searchParams.get('token'))} */}
            <div className="row ">
                <div className="col-md-3"></div>

                <div className='col-md-6'>
                    {/* <h5 className='text-center'>Create your new password</h5> */}
                    <form autoComplete="off" onSubmit={handleSubmitChangePassword}>
                        {/* <h2 className='py-3 text-center'>Reset Password</h2> */}
                        {/* <div> <p className='text-center' style={{ color: 'red' }}> {errorMessage}</p></div> */}
                        {/* <div> <p className='text-center' style={{ color: 'green' }}> {message}</p></div> */}

                        <div> <p className='text-center' style={{ color: 'red' }}> </p></div>
                        <TextField
                            label="Current Password"
                            onChange={e => setCurrentPassword(e.target.value)}
                            required
                            variant="outlined"
                            color="secondary"
                            type="password"
                            value={currentPassword}
                            fullWidth
                            sx={{ mb: 3 }}
                        />

                        <TextField
                            label="New Password"
                            onChange={e => setPassword(e.target.value)}
                            required
                            variant="outlined"
                            color="secondary"
                            type="password"
                            value={password}
                            fullWidth
                            sx={{ mb: 3 }}
                        />

                        <TextField
                            label="Confirm Password"
                            onChange={e => setPasswordAgain(e.target.value)}
                            required
                            variant="outlined"
                            color="secondary"
                            type="password"
                            value={passwordAgain}
                            fullWidth
                            sx={{ mb: 3 }}
                        />

                        <Button variant="contained" color="primary" type="submit">Change My Password</Button>
                    </form>
                    {/* <small>Need an account? <NavLink to="/StudentSignup">Register here</NavLink></small> */}
                    <div className='text-left py-4'>    <PasswordChecklist
                        rules={["capital", "match", "specialChar", "minLength", "number"]}
                        minLength={8}
                        value={password}
                        valueAgain={passwordAgain}
                        onChange={(isValid) => { }}
                    /></div>
                </div>

                <div className="col-md-3"></div>
            </div>





        </>
        // <Container className="py-5">
        //     <h3 color="blue">Password Change</h3>

        //     <hr></hr>

        //     <Row className="justify-content-center">

        //         <p> You can see your periodical test results here</p>
        //     </Row>
        // </Container>
    );
}

export default ChangePassword;



// const [token, setToken] = useState('');

// const [searchParams, setSearchParams] = useSearchParams()

