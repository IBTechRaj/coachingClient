import React, { useState, useEffect } from "react";
import axios from 'axios'
// import Navbar from "./Navbar";
import NavPage from "./NavPage";
import SidePage from './SidePage'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const DashPage = (signedIn, setSignedIn) => {

    const [student, setStudent] = useState({})
    const [email, setEmail] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [mobile, setMobile] = useState("")
    const [city, setCity] = useState("")
    const [country, setCountry] = useState("")
    const [uniqid, setUniqid] = useState("")
    const [id, setId] = useState(0)
    const [image, setImage] = useState({ preview: '', raw: '' })
    const onImageChange = (event) => {
        setImage({
            preview: URL.createObjectURL(event.target.files[0]),
            raw: event.target.files[0]
        })
    }
    useEffect(() => {
        const jwt = localStorage.getItem('token')
        console.log('jwt', jwt)

        axios.get('http://localhost:3001/students/profile', {
            headers: {
                'Content-Type': 'application/json',
                'token': `${jwt}`,
                Authorization: `Bearer ${jwt}`
            },
        })
            .then(response => {
                console.log('ress', response.data);
                setStudent(response.data)
                setFirstName(response.data.first_name)
                setLastName(response.data.last_name)
                setEmail(response.data.email)
                setMobile(response.data.mobile)
                setCity(response.data.city)
                setCountry(response.data.country)
                setId(response.data.id)
                setSignedIn(true)
            })
            .catch(error => {
                console.error(error);
            });
    }, [])

    return (
        <Container fluid>

            <Row>
                <Col xs={3} className="py-3">

                    <div style={{ minHeight: '800px' }}>

                        <div className="panel-body text-center pt-5">
                            {/* <img src={image.raw} alt="user" width="50" className="rounded-circle" /> */}
                            <img style={{ borderRadius: '50%', borderStyle: '5px solid red', width: "150px", height: "150px" }} src={student.get_image_url} alt="NoImg" />

                        </div>
                        <div className="bg-dark text-white p-2 opacity-75">Steave Rojer</div>
                        {/* </div> */}
                        <SidePage />
                    </div>
                </Col>

                <Col xs={9} style={{ height: '100%' }}>

                    <NavPage />
                </Col>
            </Row>








        </Container >
    );
};

export default DashPage;