import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
// import { Route, Routes, Redirec, NavLink } from "react-router-dom";
// import sidebarData from './sidebarData'
// import Apple from './components/MyClasses'
// import Bat from './components/MyProgs'
// import Camel from './components/MyTests'
import './App.css'
import {
  Navigation,
  Footer,
  StudentLogin,
  StudentLogout,
  Home,
  AdminPage,
  Profile,
  CreateProfile,
  StudentSignup,
  StudentEmailVerified,
  // Dashboard,
  DashPage,
  // Test,
  // Alerts,
  ForgotPassword,
  ResetPassword,
  ChangePassword

} from "./components";
import VerificationFailed from "./components/VerificationFailed";

export default function App() {
  const [signedIn, setSignedIn] = useState(false)
  return (
    <div >
      {/* <Router> */}
      <Navigation signedIn={signedIn} setSignedIn={setSignedIn} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/AdminPage" element={<AdminPage />} />
        <Route path="/StudentSignup" element={<StudentSignup signedIn={signedIn} setSignedIn={setSignedIn} />} />
        <Route path="/StudentEmailVerified" element={<StudentEmailVerified />} />
        <Route path="/VerificationFailed" element={<VerificationFailed />} />
        <Route path="/StudentLogin" element={<StudentLogin signedIn={signedIn} setSignedIn={setSignedIn} />} />
        <Route path="/StudentLogout" element={<StudentLogout signedIn={signedIn} setSignedIn={setSignedIn} />} />
        <Route path="/CreateProfile" element={<CreateProfile signedIn={signedIn} setSignedIn={setSignedIn} />} />
        <Route path="/Profile" element={<Profile signedIn={signedIn} setSignedIn={setSignedIn} />} />
        {/* <Route path="/dashboard" element={<Dashboard signedIn={signedIn} setSignedIn={setSignedIn} />} /> */}
        <Route path="/DashPage/*" element={<DashPage signedIn={signedIn} setSignedIn={setSignedIn} />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/ResetPassword" element={<ResetPassword />} />
        <Route path="/ChangePassword" element={<ChangePassword />} />

        {/* <Route path="/apple" element={<Apple signedIn={signedIn} setSignedIn={setSignedIn} />} /> */}
        {/* <Route path="/bat" element={<Bat signedIn={signedIn} setSignedIn={setSignedIn} />} /> */}
        {/* <Route path="/camel" element={<Camel signedIn={signedIn} setSignedIn={setSignedIn} />} /> */}


      </Routes>
      {/* <div className="sidebar py-5">
        <ul className=" content nav-list py-5">
          {sidebarData.map((item, index) => {
            return (
              <li className="nav-item" key={index}>
                <NavLink to={item.path}
                  className={
                    item.path === item.href
                      ? "active nav-link py-3"
                      : "nav-link text-secondary py-3"
                  }
                >
                  <div className="nav-link-icon">
                    {item.icon}
                  </div>
                  <span>{item.title}</span>
                </NavLink>
              </li>
            )
          })}
        </ul>
      </div> */}
      <Footer />
      {/* </Router> */}
    </div>
  )
}