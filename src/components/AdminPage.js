import React, { useState } from 'react'

import { Container, Row } from 'react-bootstrap'

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
// import ServiceDetails from './ServiceDetails'
// import ServiceAgents from './ServiceAgents'
import ShowStudents from './ShowStudents'
// import Bookings from './Bookings'
// import AddAreas from './AddAreas'

export default function AdminPage(props) {
    console.log('prop', props)
    const [showServices, setShowServices] = useState(false)
    const [showServiceAgents, setShowServiceAgents] = useState(false)
    const [showStudents, setShowStudents] = useState(false)
    const [showBookings, setShowBookings] = useState(false)

    const [showAddAreas, setShowAddAreas] = useState(false)

    const closeServices = () => {
        setShowServices(false)
    };
    const closeServiceAgents = () => {
        setShowServiceAgents(false)
    };
    const closeStudents = () => {
        setShowStudents(false)
    };
    const closeBookings = () => {
        setShowBookings(false)
    };

    const closeAddAreas = () => {
        setShowAddAreas(false)
    };

    return (
        <div>
            <Container className="container">
                <Row className="row text-right">
                    <div className="section-header">
                        <h5 className=" text-right " style={{ color: 'black' }}>Logged In: {props.clientName}</h5>
                    </div>
                </Row>
                <Row className="row">
                    <div className="section-header">
                        <h2 className="section-title text-center wow fadeInDown mt-3" style={{ color: 'black' }}>Admin Dashboard</h2>
                    </div>
                </Row>

                <ButtonGroup variant="contained" size="large" aria-label="outlined primary button group">


                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, mr: 5, ml: 5 }}
                        onClick={() => {
                            // setShowServices(true)
                            // setShowBookings(false)
                            // setShowServiceAgents(false)
                            setShowStudents(false)
                        }}
                    >
                        Manage Services
                    </Button>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, mr: 5, ml: 5 }}
                        onClick={() => {
                            // setShowServiceAgents(true)
                            // setShowServices(false)
                            // setShowBookings(false)
                            setShowStudents(false)
                        }}
                    >
                        Manage Service Agents
                    </Button>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, mr: 5, ml: 5 }}
                        onClick={() => {
                            setShowStudents(true)
                            // setShowServices(false)
                            // setShowBookings(false)
                            // setShowServiceAgents(false)
                        }}
                    >
                        List Users
                    </Button>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, mr: 5, ml: 5 }}
                        onClick={() => {
                            // setShowBookings(true)
                            // setShowServices(false)
                            // setShowServiceAgents(false)
                            setShowStudents(false)
                        }}
                    >
                        View Bookings
                    </Button>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, mr: 5, ml: 5 }}
                        onClick={() => {
                            // setShowAddAreas(true)
                            // setShowServices(false)
                            // setShowBookings(false)
                            // setShowServiceAgents(false)
                            setShowStudents(false)
                        }}
                    >
                        Add Areas
                    </Button>
                </ButtonGroup>


                {/* {showServices &&
                    <ServiceDetails onClose={closeServices} />
                }
                {showServiceAgents &&
                    <ServiceAgents onClose={closeServiceAgents} />
                } */}
                {showStudents &&
                    <ShowStudents onClose={closeStudents} />
                }
                {/* {showBookings &&
                    <Bookings onClose={closeBookings} />
                }

                {showAddAreas &&
                    <AddAreas onClose={closeAddAreas} />
                } */}
            </Container>
        </div >
    )
}
