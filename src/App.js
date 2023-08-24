import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import {
  Navigation,
  Footer,
  StudentLogin,
  StudentLogout,
  Home,
  Profile,
  CreateProfile,
  StudentSignup,
  StudentEmailVerified,
  Dashboard,
  MyDash

} from "./components";

export default function App() {
  const [signedIn, setSignedIn] = useState(false)
  return (
    <div >
      {/* <Router> */}
      <Navigation signedIn={signedIn} setSignedIn={setSignedIn} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/StudentSignup" element={<StudentSignup signedIn={signedIn} setSignedIn={setSignedIn} />} />
        <Route path="/StudentEmailVerified" element={<StudentEmailVerified />} />
        <Route path="/StudentLogin" element={<StudentLogin signedIn={signedIn} setSignedIn={setSignedIn} />} />
        <Route path="/StudentLogout" element={<StudentLogout signedIn={signedIn} setSignedIn={setSignedIn} />} />
        <Route path="/CreateProfile" element={<CreateProfile signedIn={signedIn} setSignedIn={setSignedIn} />} />
        <Route path="/Profile" element={<Profile signedIn={signedIn} setSignedIn={setSignedIn} />} />
        <Route path="/Dashboard" element={<Dashboard signedIn={signedIn} setSignedIn={setSignedIn} />} />
        <Route path="/MyDash" element={<MyDash signedIn={signedIn} setSignedIn={setSignedIn} />} />

      </Routes>
      <Footer />
      {/* </Router> */}
    </div>
  )
}