import React, { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios'

function MyProgs() {

    const [student, setStudent] = useState({})
    const [progsData, setProgsData] = useState()
    const [solution, setSolution] = useState()
    const [sessionDate, setSessionDate] = useState("")
    const [topics, setTopics] = useState("0")


    const baseUrl = (process.env.REACT_APP_SERVER) ? `https://coaching-q9o7.onrender.com` : `http://localhost:3001`

    useEffect(() => {
        const jwt = localStorage.getItem('token')
        console.log('jwt=p', jwt)

        if (jwt !== null) {
            axios.get(`${baseUrl}/students/profile`, {
                headers: {
                    'Content-Type': 'application/json',
                    'token': `${jwt}`,
                    Authorization: `Bearer ${jwt}`
                },
            })
                .then(response => {
                    console.log('resst', response.data);
                    setStudent(response.data)
                    if (response.data.student_status === 1) {
                        console.log('stu', student)
                        axios.get(`${baseUrl}/student_programs/get_my_progs/${response.data.id}`, {
                            headers: {
                                'Content-Type': 'application/json',
                                'token': `${jwt}`,
                                Authorization: `Bearer ${jwt}`
                            },
                        }).then(res => {
                            console.log('prgdat', res.data)
                            setProgsData(res.data)

                            setSolution(res.data.solution)
                        })
                    }
                    console.log('ss', student)
                })
                .catch(error => {
                    console.log('err', error);
                })
        }

    }, [])

    const handleSubmit = (event, id) => {
        // event.preventDefault()
        const jwt = localStorage.getItem('token');
        const formData = new FormData();
        formData.append('solution', solution)
        // const progData = {
        //     solution: solution
        // }

        const studentProgsUrl = (process.env.REACT_APP_SERVER) ? `https://coaching-q9o7.onrender.com/student_programs/${id}` : `http://localhost:3001/student_programs/${id}`

        fetch(studentProgsUrl, {
            headers: {
                "Authorization": `Bearer ${jwt}`,
                "Accept": "application/json"
            },
            method: 'PATCH',
            body: formData
        })
            .then((res) => res.json())
            .then((res) => {
                console.log('res', res)
                // alert('Your Code updated successfully')

            })
            .catch((err) => alert(err));
        axios.get(`${baseUrl}/student_programs/get_my_progs/${student.id}`, {
            headers: {
                'Content-Type': 'application/json',
                'token': `${jwt}`,
                Authorization: `Bearer ${jwt}`
            },
        }).then(res => {
            console.log('prgdat', res.data)
            setProgsData(res.data)

            setSolution('')
        })
    }

    return (
        <Container className="py-2">
            <h3 color="blue">My Programs</h3>
            {/* <Row>
                <Col>Task</Col><Col>Code</Col>
            </Row> */}
            <hr></hr>

            <Row className="justify-content-center">
                {progsData ?

                    (<table>
                        <thead>
                            <tr>
                                <th>Serial No.</th>
                                <th>Task</th>
                                <th>Prev Solution</th>
                                <th>New Solution</th>
                                <th>Update</th>
                            </tr>
                        </thead>
                        <tbody>
                            {progsData && progsData.map(prog => {
                                return (

                                    <tr key={prog.program_number}>
                                        {console.log(prog.id)}
                                        <td>{prog.program_number}</td>
                                        <td>{prog.task}</td>
                                        <td>{prog.solution}</td>
                                        <td><textarea type="text"
                                            rows="6"
                                            className="form-control"

                                            variant='outlined'
                                            color='secondary'
                                            name='solution'
                                            // label="your solution"
                                            onChange={event => setSolution(event.target.value)}
                                            value={solution}
                                        // required
                                        /></td>
                                        <td><button type="submit" onClick={event => handleSubmit(event, prog.id)}>Update</button></td>
                                        {/* <td>{session.topics}</td> */}
                                        {/* <td>{session.password}</td> */}
                                        {/* <td>{session.email}</td> */}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    ) : (
                        <p> Once you join a batch you will get program exercises here</p>
                    )
                }

            </Row>
        </Container>
    );
}

export default MyProgs;