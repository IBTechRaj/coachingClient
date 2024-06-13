import React, { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from "axios";
import './sessionStyle.css'
import './Lecture'
import Lecture from "./Lecture";
import CourseBook from "./CourseBook"

function MyClasses() {

    const [student, setStudent] = useState('Unpaid')
    const [sessionsData, setSessionsData] = useState()
    const [sessionNumber, setSessionNumber] = useState("")
    const [sessionDate, setSessionDate] = useState("")
    const [topics, setTopics] = useState("0")
    const [lessonId, setLessonId] = useState()

    useEffect(() => {
        const jwt = localStorage.getItem('token')
        console.log('jwt=p', jwt)
        const baseUrl = (process.env.REACT_APP_SERVER) ? `https://coaching-q9o7.onrender.com` : `http://localhost:3001`

        if (jwt !== null) {
            axios.get(`${baseUrl}/students/profile`, {
                headers: {
                    'Content-Type': 'application/json',
                    'token': `${jwt}`,
                    Authorization: `Bearer ${jwt}`
                },
            })
                .then(response => {
                    console.log('ress', response.data);
                    setStudent(response.data)

                    console.log('ss', student)
                })
                .catch(error => {
                    console.error(error);
                })
        }
        if (student.student_status !== 1)
            axios.get(`${baseUrl}/courses/`, {
                headers: {
                    'Content-Type': 'application/json',
                    'token': `${jwt}`,
                    Authorization: `Bearer ${jwt}`
                },
            }).then(res => {
                console.log('clsdat', res.data)
                setSessionsData(res.data)
            })
    }, [])

    return (
        <Container className="py-2" style={{ height: 'auto' }}>
            <h3 color="blue">My Classes</h3>
            <Row>

                {sessionsData ?

                    (<table>
                        <thead>
                            <tr>
                                <th>Session No.</th>
                                <th>Session Date</th>
                                <th>Topics</th>
                                <th>CourseBook</th>
                                <th>LessonVideo</th>
                                {/* <th>Email</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {sessionsData && sessionsData.map(session => {
                                return (
                                    <tr key={session.session_number}>
                                        <td>{session.session_number}</td>
                                        <td>{session.session_date}</td>
                                        <td>{session.topics}</td>
                                        <td><CourseBook /></td>
                                        <td><Lecture lessonId={session.lesson_video} /></td>
                                        {/* <td> <Button onClick={() => showVideo(stu.id)}>View Lecture</Button></td> */}
                                        {/* <td>{session.password}</td> */}
                                        {/* <td>{session.email}</td> */}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    ) : (
                        <p>There is no classes information yet. Once you join a batch you can see the details here</p>
                    )
                }
            </Row>



            {/* const Table = ({data}) => { */}
            {/* return ( */}

            {/* ); */}
            {/* } */}

            <hr></hr>

            <Row className="justify-content-center">

                {/* <p>There is no classes information yet. Once you join a batch you can see the details here</p> */}
            </Row>
        </Container>
    );
}

export default MyClasses;