import React, { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
import axios from 'axios';

function MyPayment() {

    const [image, setImage] = useState({ preview: '', raw: '' })
    const [student, setStudent] = useState({})
    const baseUrl = (process.env.REACT_APP_SERVER) ? `https://coaching-q9o7.onrender.com` : `http://localhost:3001`
    // const studentUpdUrl = (process.env.REACT_APP_SERVER) ? `https://coaching-q9o7.onrender.com/students/` : `http://localhost:3001/students/`
    const jwt = localStorage.getItem('token')
    // Razorpay code below

    const [amount, setAmount] = useState(0);
    const [orderId, setOrderId] = useState('');
    const [studentStatus, setStudentStatus] = useState(student?.student_status || null)
    const [disabled, setDisabled] = useState(student?.student_status || null)

    useEffect(() => {
        const jwt = localStorage.getItem('token')



        if (jwt !== null) {
            axios.get(`${baseUrl}/students/profile`, {
                headers: {
                    'Content-Type': 'application/json',
                    'token': `${jwt}`,
                    Authorization: `Bearer ${jwt}`
                },
            })
                .then(response => {
                    // console.log('ue ress', response.data.student_status);
                    setStudent(response.data)
                    setStudentStatus(response.data.student_status);
                    setDisabled(response.data.student_status);

                    // console.log('ue ss', student.student_status)
                })
                .catch(error => {
                    console.error(error);
                })
        }
        // if (student?.student_status) {
        //     setStudentStatus(response.data.student_status);
        //     setDisabled(response.data.student_status);
        // }
        // console.log('ue ss,s.ss', studentStatus, student.student_status)

        // console.log('ue dd,d.dd', disabled, student.student_status)
    }, [])


    const handlePayment = async () => {


        try {


            const response = await axios.post(`${baseUrl}/api/v1/payments`, { amount, email: student.email, name: student.first_name + ' ' + student.last_name, mobile: student.mobile });
            const { order_id, key, currency } = response.data;
            // console.log('resp', response)






            const options = {
                key,
                amount: amount * 100,
                currency,
                name: student.name,
                description: "C Course Fee",
                order_id,
                // handler: function (response) {
                //     alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
                // },
                handler: async function (response) {
                    // console.log('raz res', response)

                    alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
                    const jwt = localStorage.getItem('token');
                    const updresp = await axios.patch(
                        `${baseUrl}/students/${student.id}`,
                        { student_status: 1 },
                        { headers: { "Authorization": `Bearer ${jwt}` } }
                    )
                    // console.log('upd', updresp)
                    // console.log('updresp', updresp.data.data.attributes.student_status)
                    setStudentStatus(updresp.data.data.attributes.student_status)
                    setDisabled(updresp.data.data.attributes.student_status)
                    // const updresp = await axios.patch(
                    //     `${baseUrl}` + student.id,
                    //     { student_status: 1 },
                    //     { headers: { "Authorization": `Bearer ${jwt}` } }
                    // )
                    // console.log('upd', updresp)
                    // console.log('updresp', updresp.data.data.attributes.student_status)
                    // setStudentStatus(updresp.data.data.attributes.student_status)
                    // setDisabled(updresp.data.data.attributes.student_status)

                    // const updresp = await axios.patch(
                    //     studentUpdUrl + student.id,
                    //     { student_status: 1 },
                    //     { headers: { "Authorization": `Bearer ${jwt}` } }
                    // )
                    // console.log('updresp', updresp.data.student_status)
                    // setStudentStatus()
                    // Send payment ID back to the Rails server to update status
                    await axios.post(`${baseUrl}/api/v1/payments/update_payment_status`, {
                        order_id: order_id,
                        razorpay_payment_id: response.razorpay_payment_id
                    });
                },

                prefill: {
                    name: student.name,
                    email: student.email,
                    contact: student.mobile
                },
                theme: {
                    color: "#3399cc"
                }
            };

            const rzp1 = new window.Razorpay(options);
            rzp1.open();
        } catch (error) {
            console.error("Payment initiation failed:", error);
        }
    };
    // Razorpay code above




    return (
        <Container className="py-2" style={{ height: '100vh' }}>

            {/* {                console.log('ss', student)} */}


            {/* <h3 style={{ color: student.student_status == 1 ? 'green' : 'red' }}> Payment Status : {student.student_status == 1 ? 'Paid' : 'Unpaid'} </h3> */}
            <h3 style={{ color: studentStatus == 1 ? 'green' : 'red' }}> Payment Status : {studentStatus == 1 ? 'Paid' : 'Unpaid'} </h3>

            <hr></hr>
            <div className="row col-12" >
                <div className="col-2"></div>
                <div className="col-4  justify-start " >

                    <h5 className=" control-label text-left" >   Course Name        </h5>


                    <h5 className=" control-label text-left">Student Name         </h5>

                    <h5 className=" control-label text-left">Student Email        </h5>



                    <h5 className=" control-label text-left">Course Fee         </h5>

                    {/* <Row className=" col-8 offset-2 justify-content-center">
                <div className="justify-content-center">
                    <h5> You can make payment by one of the modes given below</h5>
                </div>
                <div className="justify-content-center">
                    <h5> After making payment, send a screenshot of the payment to the WhatsApp number given below</h5>
                </div>
            </Row> */}
                    {/* <hr></hr> */}
                    {/* <Row className=" col-8 offset-2 justify-content-center">
                <div className="text-center mx-5 my-2">
                    <h5> Google Pay/Phone Pay  : +91 98495 78298 RajaSekhar K</h5>
                </div>
                <div className="text-center mx-2">
                    <h5>Paypal : +91 98495 78298 RajaSekhar K</h5>
                </div>
            </Row> */}
                    {/* <Row> */}
                </div>
                {/* <div className="col-1"></div> */}
                <div className="col-4 justify-start" >

                    <h5 className=" control-label text-left">   :    C Programming Language</h5>


                    <h5 className=" control-label text-left">   :    {student.first_name + ' ' + student.last_name}</h5>


                    <h5 className=" control-label text-left">  : {student.email}</h5>



                    <h5 className=" control-label text-left">  : Rs.3,000</h5>

                    {/* <Row className=" col-8 offset-2 justify-content-center">
                <div className="justify-content-center">
                    <h5> You can make h3ayment by one of the modes given below</h5>
                </div>
                <div className="justify-content-center">
                    <h5> After making h3ayment, send a screenshot of the h3ayment to the WhatsAh3 number given below</h5>
                </div>
            </Row> */}
                    {/* <hr></hr> */}
                    {/* <Row className=" col-8 offset-2 justify-content-center">
                <div className="text-center mx-5 my-2">
                    <h5> Google h3ay/h3hone h3ay  : +91 98495 78298 RajaSekhar K</h5>
                </div>
                <div className="text-center mx-2">
                    <h5>h3ayh3al : +91 98495 78298 RajaSekhar K</h5>
                </div>
            </Row> */}
                    {/* <Row> */}
                </div>
                <div className="col-1"></div>
            </div>
            <input
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="py-2"
            />
            <hr></hr>
            <div className="row justify-content-center">

                {/* <hr></hr> */}
                <button disabled={disabled} className="my-5 btn btn-success cta " onClick={handlePayment}>Pay Now</button>
            </div>
            {/* </Row> */}
        </Container>
    );
}

export default MyPayment;