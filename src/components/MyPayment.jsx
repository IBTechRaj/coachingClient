import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function MyPayment() {
    return (
        <Container className="py-2">
            <h3 color="blue">My Payment</h3>

            <hr></hr>

            <Row className="justify-content-center">
                <div className="justify-content-center">
                    <h5> You can make payment by one of the modes given below</h5>
                </div>
                <div className="justify-content-center"> <h5> After making payment, upload a screenshot of the payment made</h5>
                </div>
            </Row>
            <Row>

            </Row>
        </Container>
    );
}

export default MyPayment;