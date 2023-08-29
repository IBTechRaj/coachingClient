import React from "react";
import { NavLink } from "react-router-dom";

import user1 from "../assets/images/users/user4.jpg";
import {
  Navbar,
  Collapse,
  Nav,
  NavItem,
  NavbarBrand,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  Button,
} from "reactstrap";

// import { ReactComponent as Logo } from './Logo.jpeg'

const Navigation = ({ signedIn, setSignedIn }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const Handletoggle = () => {
    setIsOpen(!isOpen);
  };
  // console.log('i', signedIn)

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
              {/* {console.log('x', signedIn)} */}
            </ul>
          </div>
          <Dropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle color="transparent">
              <img
                src={user1}
                alt="profile"
                className="rounded-circle"
                width="30"
              ></img>
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem header>Info</DropdownItem>
              <DropdownItem >
                <NavLink
                  to="/DashPage"
                >
                  My Dashboard
                </NavLink>
              </DropdownItem>
              <DropdownItem>
                <NavLink
                  to="/Profile"
                >
                  Edit Profile
                </NavLink></DropdownItem>
              <DropdownItem divider />
              <DropdownItem>My Balance</DropdownItem>
              <DropdownItem>Inbox</DropdownItem>
              <DropdownItem>Logout</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </nav>
    </div>
  );
}

export default Navigation;