import React, { useState, useEffect } from 'react'
import { NavLink } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import { useSearchParams } from 'react-router-dom'
// import queryString from 'query-string'

const StudentEmailVerified = (props) => {

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
      <div className='row py-5  justify-content-center' style={{ margin: 100 }}>
        <h1 style={{ fontSize: 36, color: 'green', margin: 200 }}> Email Verification Sucess !</h1>
        <h3>
          {/* <NavLink className="nav-link" to="/Profile"
            style={{
              fontSize: 36, color: 'white', backgroundColor: 'blue', borderRadius: 8,
              padding: '0.2em 1em', textDecoration: 'none'
            }}>
            Continue
          </NavLink> */}
          <NavLink className="nav-link" to="/CreateProfile" state={tokenData}
            style={{
              fontSize: 36, color: 'white', backgroundColor: 'blue', borderRadius: 8,
              padding: '0.2em 1em', textDecoration: 'none'
            }}>
            Continue
          </NavLink>
        </h3>
      </div>

    </>
  )
}
export default StudentEmailVerified;