import React from 'react'
import sidebarData from '../sidebarData'
import { NavLink } from "react-router-dom";

const SidePage = () => {
    const activeLink = 'hover:bg-red-500 mt-7 pl-7 w-full h-14 flex justify-start items-center text-white text-2xl space-x-1 font-bold bg-red-500'
    const normalLink = 'hover:bg-red-500 pl-7 mt-7 w-full h-14 flex justify-start items-center text-white text-2xl space-x-1 font-bold'

    return (
        <React.Fragment>
            <section className='bg-secondary py-3' style={{ height: '800px' }}>
                {/* <h1> This is sidepage</h1> */}
                <div >
                    {
                        sidebarData.map((item, index) => {
                            return (

                                <div key={index}>
                                    <div className='hover:bg-red-500 pl-5 mt-7 w-full justify-start items-center  text-white text-2xl fpace-x-1 font-bold'></div>
                                    <NavLink to={item.path}
                                        className={({ isActive }) =>
                                            isActive ? activeLink : normalLink}

                                    >
                                        <span>{item.icon}</span>
                                        <span>{item.title}</span>
                                    </NavLink>
                                    {/* <span>{item.title}</span> */}

                                </div>
                            )
                        })
                    }

                </div>
            </section>
        </React.Fragment>
    )
}

export default SidePage