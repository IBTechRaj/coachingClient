import { React, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from 'axios'

import profile from "../assets/images/users/blank_profile.png";
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
import { CheckBoxOutlineBlank } from "@mui/icons-material";

// import { ReactComponent as Logo } from './Logo.jpeg'

const Navigation = ({ signedIn, setSignedIn }) => {
  console.log('nav', signedIn)
  const [isOpen, setIsOpen] = useState(false);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const Handletoggle = () => {
    setIsOpen(!isOpen);
  };
  // console.log('i', signedIn)

  const [student, setStudent] = useState({})
  const [email, setEmail] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [mobile, setMobile] = useState("")
  const [city, setCity] = useState("")
  const [country, setCountry] = useState("")
  const [uniqid, setUniqid] = useState("")
  const [id, setId] = useState(0)
  const [image, setImage] = useState({ preview: '', raw: '' })
  const onImageChange = (event) => {
    setImage({
      preview: URL.createObjectURL(event.target.files[0]),
      raw: event.target.files[0]
    })
  }

  useEffect(() => {
    const jwt = localStorage.getItem('token')
    console.log('jwt', (jwt !== null))

    if (jwt !== null) {
      axios.get('http://localhost:3001/students/profile', {
        headers: {
          'Content-Type': 'application/json',
          'token': `${jwt}`,
          Authorization: `Bearer ${jwt}`
        },
      })
        .then(response => {
          console.log('ress', response.data);
          setStudent(response.data)
          setFirstName(response.data.first_name)
          setLastName(response.data.last_name)
          setEmail(response.data.email)
          setMobile(response.data.mobile)
          setCity(response.data.city)
          setCountry(response.data.country)
          setId(response.data.id)
          setSignedIn(true)
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [])

  return (
    <div className="navigation fixed-top">
      <nav className="navbar navbar-expand navbar-light bg-primary">
        <div className="container">

          <NavLink className="navbar-brand mr-auto text-white" to="/">
            {/* <img src={window.location.origin + '/public/JoyAndFellowshipLogo.jpeg'} alt="" /> */}
            Learn C
          </NavLink>

          <div>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <NavLink className="nav-link text-white" to="/">
                  Home
                  {/* <span className="sr-only">(current)</span> */}
                </NavLink>
              </li>
              <li className="nav-item text-white">
                <NavLink className="nav-link text-white" to="/StudentSignup">
                  Signup
                  {/* <span className="sr-only">(current)</span> */}
                </NavLink>
              </li>
              {(signedIn) ? (
                <li className="nav-item">


                  <NavLink className="nav-link text-white" to="/StudentLogout">
                    Logout
                    {/* <span className="sr-only">(current)</span> */}
                  </NavLink>
                </li>
              ) : (
                <li>
                  <NavLink className="nav-link text-white" to="/StudentLogin">
                    Login
                    {/* <span className="sr-only">(current)</span> */}
                  </NavLink>
                </li>
              )
              }
              {/* {console.log('x', signedIn)} */}
            </ul>
          </div>
          <Dropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle color="transparent">
              {(signedIn) ?
                (
                  <img
                    src={student.get_image_url}
                    alt=""
                    className="rounded-circle"
                    width="30"
                  ></img>
                ) : (
                  null
                )}
            </DropdownToggle>
            <DropdownMenu>
              {/* <DropdownItem header>Info</DropdownItem> */}
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
              {/* <DropdownItem>My Balance</DropdownItem>
              <DropdownItem>Inbox</DropdownItem> */}
              <DropdownItem>
                {(signedIn) ? (
                  'Logout'
                ) : (
                  'Login')
                }</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </nav >
    </div >
  );
}

export default Navigation;