import React, { useState } from 'react'

import { Container, Row } from 'react-bootstrap'

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
// import ServiceDetails from './ServiceDetails'
// import ServiceAgents from './ServiceAgents'
import ShowStudents from './ShowStudents'
import UpdateStatus from './UpdateStatus'
import UpdateCompletionStatus from './UpdateCompletionStatus'
import Batch from './Batch'
import Course from './Course'
import Programs from './Programs'

export default function AdminPage(props) {
    console.log('prop', props)
    const [showStatus, setShowStatus] = useState(false)
    const [showCompletionStatus, setShowCompletionStatus] = useState(false)
    const [showPrograms, setShowPrograms] = useState(false)
    const [showStudents, setShowStudents] = useState(false)
    const [showCourse, setShowCourse] = useState(false)
    const [showBatch, setShowBatch] = useState(false)

    const closeStatus = () => {
        setShowStatus(false)
    };

    const closeCompletionStatus = () => {
        setShowCompletionStatus(false)
    };

    const closeStudents = () => {
        setShowStudents(false)
    };

    const closePrograms = () => {
        setShowPrograms(false)
    };

    const closeBatch = () => {
        setShowBatch(false)
    };

    const closeCourse = () => {
        setShowCourse(false)
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
                        <h2 className="section-title text-center wow fadeInDown mt-5" style={{ color: 'black' }}>Admin Dashboard</h2>
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
                            setShowStatus(true)
                        }}
                    >
                        Update Payment Status
                    </Button>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, mr: 5, ml: 5 }}
                        onClick={() => {
                            // setShowServices(true)
                            // setShowBookings(false)
                            // setShowServiceAgents(false)
                            setShowCompletionStatus(true)
                        }}
                    >
                        Update Course Completion
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
                            setShowBatch(true)
                            // setShowServices(false)
                            // setShowServiceAgents(false)
                            // setShowStudents(false)
                        }}
                    >
                        Create Batch
                    </Button>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, mr: 5, ml: 5 }}
                        onClick={() => {
                            setShowCourse(true)
                            // setShowServices(false)
                            // setShowServiceAgents(false)
                            // setShowStudents(false)
                        }}
                    >
                        Create Course
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
                            setShowPrograms(true)
                        }}
                    >
                        Program Exercises
                    </Button>
                </ButtonGroup>


                {showStatus &&
                    <UpdateStatus onClose={closeStatus} />
                }

                {showCompletionStatus &&
                    <UpdateCompletionStatus onClose={closeCompletionStatus} />
                }

                {showStudents &&
                    <ShowStudents onClose={closeStudents} />
                }
                {showBatch &&
                    <Batch onClose={closeBatch} />
                }

                {showCourse &&
                    <Course onClose={closeCourse} />
                }

                {showPrograms &&
                    <Programs onClose={closePrograms} />
                }
            </Container>
        </div >
    )
}
