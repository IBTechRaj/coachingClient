import React from "react";
import { NavLink } from "react-router-dom";
// import { ReactComponent as Logo } from './Logo.jpeg'

const Navigation = ({ signedIn, setSignedIn }) => {

  console.log('i', signedIn)

  return (
    <div className="navigation fixed-top">
      <nav className="navbar navbar-expand navbar-light bg-light">
        <div className="container">

          <NavLink className="navbar-brand mr-auto" to="/">
            {/* <img src={window.location.origin + '/public/JoyAndFellowshipLogo.jpeg'} alt="" /> */}
            Learn C
          </NavLink>

          <div>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  Home
                  <span className="sr-only">(current)</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/StudentSignup">
                  StudentSignup
                  <span className="sr-only">(current)</span>
                </NavLink>
              </li>
              {(signedIn) ? (
                <li className="nav-item">


                  <NavLink className="nav-link" to="/StudentLogout">
                    Logout
                    <span className="sr-only">(current)</span>
                  </NavLink>
                </li>
              ) : (
                <li>
                  <NavLink className="nav-link" to="/StudentLogin">
                    Login
                    <span className="sr-only">(current)</span>
                  </NavLink>
                </li>
              )
              }
              {console.log('x', signedIn)}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navigation;
{/* <img style={{ borderRadius: '50%', borderStyle: '5px solid red' }} src={image.preview} alt="NoImg" /> */ }