import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function MyDoubts() {
    return (
        <Container className="py-2">
            <h3 color="blue">My Queries</h3>
            <Row>
                <Col>Session</Col><Col>Date</Col><Col>Query</Col>
            </Row>
            <hr></hr>

            <Row className="justify-content-center">

                <p> Once you join a batch you can note your queries here</p>
            </Row>
        </Container>
    );
}

export default MyDoubts;