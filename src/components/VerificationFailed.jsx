import React, { useState } from 'react'
import { NavLink } from "react-router-dom";
// import { TextField, Button } from "@mui/material";
import { useSearchParams } from 'react-router-dom'
import './StudentEmailVerified.css'
// import queryString from 'query-string'

const VerificationFailed = (props) => {

  const [token, setToken] = useState('');

  const [searchParams, setSearchParams] = useSearchParams()

  // const parentToChild = () => {
  //   setToken(searchParams.get('token'));
  // }

  const tokenData = {
    token: searchParams.get('token')
  }
  localStorage.setItem("token", token);

  return (

    <>

      {console.log('token', searchParams.get('token'))}
      <div className='row   justify-content-center' style={{ marginTop: 100 }}>
        <div className='msgsize text-align-center px-1' style={{ color: 'red', margin: '80 20' }}> Email Verification Failed !</div>
        <h3>

          Please contact admin at krs30018@gmail.com
          {/* <NavLink className="nav-link" to="/Profile"
            style={{
              fontSize: 36, color: 'white', backgroundColor: 'blue', borderRadius: 8,
              padding: '0.2em 1em', textDecoration: 'none'
            }}>
            Continue
          </NavLink> */}

        </h3>
      </div>

      <div className='row  justify-content-center msgSize' style={{ margin: 100 }}>
        <NavLink className="nav-link msgsize" to="/Home" state={tokenData}
          style={{
            color: 'white', backgroundColor: 'blue', borderRadius: 8,
            padding: '0.2em 1em', textDecoration: 'none'
          }}>
          {/* Continue */}
        </NavLink>
      </div>

    </>
  )
}
export default VerificationFailed;