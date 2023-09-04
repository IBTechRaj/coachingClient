import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function MyTests() {
    return (
        <Container className="py-2">
            <h3 color="blue">My Tests</h3>

            <hr></hr>

            <Row className="justify-content-center">

                <p> You can see your periodical test results here</p>
            </Row>
        </Container>
    );
}

export default MyTests;