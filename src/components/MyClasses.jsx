import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function MyClasses() {
    return (
        <Container className="py-2">
            <h3 color="blue">My Classes</h3>
            <Row>
                <Col>Session</Col><Col>Date</Col><Col>Topics</Col>


            </Row>
            <hr></hr>

            <Row className="justify-content-center">

                <p>There is no classes information yet. Once you join a batch you can see the details here</p>
            </Row>
        </Container>
    );
}

export default MyClasses;