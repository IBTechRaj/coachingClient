import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function MyProgs() {
    return (
        <Container className="py-2">
            <h3 color="blue">My Programs</h3>
            <Row>
                <Col>Task</Col><Col>Code</Col>
            </Row>
            <hr></hr>

            <Row className="justify-content-center">

                <p> Once you join a batch you will get program exercises here</p>
            </Row>
        </Container>
    );
}

export default MyProgs;