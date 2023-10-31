import React, { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import axios from 'axios'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function MyFeedback() {

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
                    console.log('fdb', response.data);
                    setStudent(response.data)
                    setId(response.data.id)

                    // setSignedIn(true)
                })
                .catch(error => {
                    console.error(error);
                })
        }
        else {
            // navigate('/StudentLogin')
        }

    }, [])

    const [feedback, setFeedback] = useState('')
    const [student, setStudent] = useState({})
    const [id, setId] = useState()

    const handleSubmit = (event) => {
        event.preventDefault()
        const jwt = localStorage.getItem('token');
        const formData = new FormData();
        formData.append('feedback', feedback)

        const studentsUrl = (process.env.REACT_APP_SERVER) ? `https://coaching-q9o7.onrender.com/students/${student.id}` : `http://localhost:3001/students/${student.id}`

        fetch(studentsUrl, {
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
                alert('Feedback submitted successfully')
                // alert(res.meta.message)

                // setIsDisabled(!isDisabled)
                // navigate('/dashboard', { replace: true });
            })
            .catch((err) => alert(err));


    }
    return (
        <Container className="py-2">
            <h3 color="blue">Feedback</h3>
            {/* <Row>
                <Col>Task</Col><Col>Code</Col>
            </Row> */}
            <hr></hr>

            <Row className="justify-content-center">

                <p> We appreciate your genuine feedback. It will help future students and also us to improve the quality of the course</p>
            </Row>

            <div className="col-10 offset-1" >
                <div className="panel-body my-5">




                    <div className="form-group">
                        <label className="col-sm-4 control-label">Feedback</label>
                        <div className="col-sm-10 offset-1 my-5">
                            <textarea type="text"
                                rows="6"
                                className="form-control"

                                variant='outlined'
                                color='secondary'
                                // label="Country"
                                onChange={event => setFeedback(event.target.value)}
                                value={feedback}
                                required
                            />
                        </div>
                    </div>
                </div>
                <div className="row py-2">
                    <div className="col-12">
                        <div className="d-grid gap-2 col-6 mx-auto">
                            <button className="btn btn-primary btn-block" style={{ backgroundColor: '#4E1CBE' }} type="submit" onClick={handleSubmit}>
                                Submit{/* {isDisabled ? 'Edit ' : 'Save'} */}
                            </button>
                            {/* <button class="btn btn-primary" type="button">Button</button> */}
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
}

export default MyFeedback;