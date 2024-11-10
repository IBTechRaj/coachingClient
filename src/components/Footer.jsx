import React from "react";

import { NavLink } from "react-router-dom";
function Footer() {
  return (
    <div className="footer" style={{ display: 'flex', flexDirection: 'column' }}>
      <footer className="py-2 bg-dark">
        <div className="container-fluid">
          <p className="m-0 text-center text-white">
            Copyright &copy;The C Learning Hub
          </p>
        </div>
        <div> <p className="text-center" ><NavLink to="/PrivacyPolicy" >Privacy Policy</NavLink></p>
          <p className="text-center" ><NavLink to="/AboutUs" >About Us</NavLink></p>
          <p className="text-center" ><NavLink to="/Terms" >Terms  & Conditions</NavLink></p></div>
      </footer>
    </div>
  );
}

export default Footer;