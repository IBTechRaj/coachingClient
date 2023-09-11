import React from "react";
// import Navbar from "./Navbar";
import NavPage from "../src/components/NavPage";
import SidePage from '../src/components/SidePage'

const DashPage = () => {
    return (
        <React.Fragment>
            {/* heading section */}
            {/* <section>
                <div>
                    <Navbar />
                </div>
            </section> */}

            {/* sidebar section */}
            <section >
                {/* <h1 className="py-5"> This is dash page</h1> */}
                <div className='grid grid-cols-12'>
                    <div className='col-span-3 bg-black h-screen pl-2 md:col-span-2'>


                        <SidePage />
                    </div>


                    <div className='col-span-9 bg-green-500 h-screen pl-2 md:col-span-10 py-5'>
                        <NavPage />

                    </div>
                </div>
            </section>
        </React.Fragment>
    );
};

export default DashPage;