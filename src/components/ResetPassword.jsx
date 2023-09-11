import React, { useState } from 'react'
import { TextField, Button } from "@mui/material";

import PasswordChecklist from "react-password-checklist";
import { useSearchParams, useNavigate } from "react-router-dom";

const ResetPassword = (props) => {

    const [token, setToken] = useState('');

    const [searchParams, setSearchParams] = useSearchParams()

    const baseURL = (process.env.REACT_APP_SERVER) ? `https://coaching-q9o7.onrender.com/` : `http://localhost:3001/`

    const [password, setPassword] = useState('')
    const [passwordAgain, setPasswordAgain] = useState("")
    // const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [email, setEmail] = useState('')
    // const [token, setToken] = useState('')
    const navigate = useNavigate();

    const tokenData = {
        token: searchParams.get('token')
    }
    console.log('tk', searchParams.get('token'))
    localStorage.setItem("token", searchParams.get('token'));
    // const location = useLocation()
    // const token = location.state



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

    const handleSubmitResetPassword = (event) => {
        event.preventDefault()

        const jwt = localStorage.getItem('token');
        const credentials = {
            email: email,
            password: password
        }
        if (password !== passwordAgain) {
            alert("Passwords don't match");

        } else {
            fetch(`${baseURL}/reset_password`, {
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
                    console.log('pr', data)
                    if (data) {
                        alert('Password Reset Successful!')
                        navigate('/StudentLogin')
                        // navigate('/Home', { replace: true });
                    } else {
                        alert('There is some error. Pl contact customer care')

                    }


                    // history.push('/')
                })
                .catch(console.log)
        }

    }
    return (
        <>
            <h1 className='text-center'>Reset Password</h1>
            {console.log('token', searchParams.get('token'))}
            <div className="row py-5">
                <div className="col-md-4"></div>

                <div className='col-md-4'>
                    <h5 className='text-center'>Create your new password</h5>
                    <form autoComplete="off" onSubmit={handleSubmitResetPassword}>
                        <h2 className='py-3 text-center'>Reset Password</h2>
                        {/* <div> <p className='text-center' style={{ color: 'red' }}> {errorMessage}</p></div> */}
                        {/* <div> <p className='text-center' style={{ color: 'green' }}> {message}</p></div> */}

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
                        <PasswordChecklist
                            rules={["capital", "match", "specialChar", "minLength", "number"]}
                            minLength={8}
                            value={password}
                            valueAgain={passwordAgain}
                            onChange={(isValid) => { }}
                        />
                        <Button variant="contained" color="primary" type="submit">Reset My Password</Button>
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

            {/* <h1 className='text-center py-3'>Reset Password:</h1>

            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '60vh',
                }}
            >
                <form onSubmit={handleSubmit}>
                   
                    <input
                        className="form-control py-2" required id="email" onChange={event => {
                            setEmail(event.target.value)
                        }} name="email" placeholder="Email" type="email" value={email} />
                    <input
                        className="form-control py-2" required id="password" onChange={event => {
                            setPassword(event.target.value)
                        }}
                        name="password" placeholder="New Password" type="password" value={password} />

                    <input
                        className="form-control py-2" required id="password_confirmation" onChange={event => {
                            setPasswordConfirmation(event.target.value)
                        }} name="password_confirmation" placeholder="New Password confirmation" type="password" value={passwordConfirmation} />
                    <input className="text-center btn btn-primary" type="submit" />
                </form>
            </div> */}

        </>
    )
}

export default ResetPassword