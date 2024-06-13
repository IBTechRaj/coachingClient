import React from "react";
import { Routes, Route } from "react-router-dom";
import MyClasses from './MyClasses'
import MyDoubts from './MyDoubts'
import MyProgs from './MyProgs'
import MyTests from './MyTests'
import MyPayment from './MyPayment'
import Test from './Test'
import MyFeedback from './MyFeedback'
import ChangePassword from "./ChangePassword";
// import Git from '../pages/Git'
// import Home from '../pages/Home'
// import Java from '../pages/Java'
// import Node from '../pages/Node'
// import Php from '../pages/Php'
// import PageReact from '../pages/PageReact'

const NavPage = () => {
    return (
        <React.Fragment>
            <section className=' py-5 text-center' style={{ height: 'auto' }} >

                <h5 className="py-5"> Dashboard</h5>
                <Routes>

                    {/* <Route path="/" element={<Home />} /> */}
                    <Route path="/dashpage/myclasses" element={<MyClasses />} />
                    <Route path="/DashPage/mytests" element={<MyTests />} />
                    <Route path="/DashPage/myprogs" element={<MyProgs />} />
                    <Route path="/dashpage/mydoubts" element={<MyDoubts />} />
                    <Route path="/dashpage/test" element={<Test />} />
                    <Route path="/dashpage/mypayment" element={<MyPayment />} />
                    <Route path="/dashpage/myfeedback" element={<MyFeedback />} />
                    <Route path="/dashpage/changePassword" element={<ChangePassword />} />
                    {/* <Route path="/git" element={<Git />} />
                    <Route path="/node" element={<Node />} />
                    <Route path="/react" element={<PageReact />} />
                    <Route path="/angular" element={<Angular />} /> */}
                </Routes>
            </section>
        </React.Fragment>
    );
};

export default NavPage;