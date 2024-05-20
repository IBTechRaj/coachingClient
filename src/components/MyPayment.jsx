import React, { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';

function MyPayment() {

    const [image, setImage] = useState({ preview: '', raw: '' })
    const [student, setStudent] = useState('Unpaid')

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

    }, [])

    // useEffect(() => {
    //     const jwt = localStorage.getItem('token')
    //     console.log('jwt', jwt)
    //     const studentsUrl = (process.env.REACT_APP_SERVER) ? `https://coaching-q9o7.onrender.com/students/${student.id}` : `http://localhost:3001/students/${student.id}`

    //     axios.get(`${baseUrl}/students`, {
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //     })
    //         .then(response => {
    //             console.log('students', response.data);
    //             setStudent(response.data)

    //         })
    //         .catch(error => {
    //             console.error(error);
    //         });
    // }, [])
    // const onImageChange = (event) => {
    //     setImage({
    //         preview: URL.createObjectURL(event.target.files[0]),
    //         raw: event.target.files[0]
    //     })
    // }
    return (
        <Container className="py-2" style={{ height: '100vh' }}>
            {console.log('ss', student.student_status)}
            <h3 style={{ color: student.student_status == 1 ? 'green' : 'red' }}> Payment Status : {student.student_status == 1 ? 'Paid' : 'Unpaid'} </h3>

            <hr></hr>

            <Row className=" col-8 offset-2 justify-content-center">
                <div className="justify-content-center">
                    <h5> You can make payment by one of the modes given below</h5>
                </div>
                <div className="justify-content-center">
                    <h5> After making payment, send a screenshot of the payment to the WhatsApp number given below</h5>
                </div>
            </Row>
            <hr></hr>
            <Row className=" col-8 offset-2 justify-content-center">
                <div className="text-center mx-5 my-2">
                    <h5> Google Pay/Phone Pay  : +91 98495 78298 RajaSekhar K</h5>
                </div>
                <div className="text-center mx-2">
                    <h5>Paypal : +91 98495 78298 RajaSekhar K</h5>
                </div>
                {/* <Row>
                    <p className="fst-italic my-5"> In case of any problem please contact krs30018@gmail.com</p>
                </Row> */}
                {/* <label className=" my-5">
                    <input type="file"
                        accept="image/*"
                        multiple={false}
                        onChange={onImageChange}

                    />
                    <img style={{ height: '150px', width: '100px' }} src={image.preview} alt="Upload Image" />
                </label> */}
            </Row>
            {/* <Row>
                <p className="fst-italic my-5"> In case of any problem please contact krs30018@gmail.com</p>
            </Row> */}
        </Container>
    );
}

export default MyPayment;