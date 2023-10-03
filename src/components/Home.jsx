import React, { useState, useEffect } from "react";
import './home.css';
import './navbar.css'
import axios from 'axios'
import feedbackData from "../feedbackData";
// import '../index.css'
import { TextField, Stack, Button, Checkbox } from "@mui/material";
// import Grid from '@mui/material/Grid'
import Grid from '@mui/material/Unstable_Grid2'
import { blue } from "@mui/material/colors";
import img1 from '../assets/images/image1.webp'
import coach from '../assets/images/coach.jpg'
import { StrikethroughS, StrikethroughSTwoTone } from "@mui/icons-material";
import Spinner from './Spinner'

function Home(signedIn, setSignedIn) {

  const [students, setStudents] = useState([])

  let content = '';
  useEffect(() => {
    const jwt = localStorage.getItem('token')
    console.log('jwt', jwt)
    const baseUrl = (process.env.REACT_APP_SERVER) ? `https://coaching-q9o7.onrender.com` : `http://localhost:3001`

    axios.get(`${baseUrl}/students`, {
      headers: {
        'Content-Type': 'application/json',
        // 'origin': 'http://localhost:3000',
        // 'token': token.token,
        // 'token': `${jwt}`,
        // Authorization: `Bearer ${jwt}`
      },
    })
      .then(response => {
        console.log('students', response.data);
        setStudents(response.data)

      })
      .catch(error => {
        console.error(error);
      });
  }, [])

  const handleSubmit = () => {
    console.log('submitted')
  }
  // console.log('hom', signedIn) 
  console.log('stu', students)
  return (
    <div id="header">
      <div className="container-fluid homepage__gradient">
        <div className="row justify-content-center  bg-white " style={{ marginTop: 0 }}>
          {/* <div className="col-lg-7"> */}
          <p className="a" style={{ color: 'blue', fontSize: 64, }}> The C Learning Hub</p>

        </div>
        <div className="row">

          <div className="col-6 px-5" style={{ height: 400, color: 'black' }}>
            {/* "Master C Programming Online" */}
            <p className="a text-center">Learn C Language Coding from Scratch</p>

            <p className="text-center a" style={{ fontSize: 24, marginLeft: 100 }}>Discover the world of programming through C with our interactive course</p>


          </div>
          <div className="col-6" style={{ backgroundImage: "image1.webp" }}>
            <img src={img1} alt="" height="400" />
          </div>
        </div>






        <div className="row py-5">
          <div className="col-4 ">
            <div className="card-a " style={{ marginTop: 100 }}>
              <div className="mx-auto"> <i className="material-icons" style={{ fontSize: 60, color: '#0076F9' }}>cloud</i></div>
              <div className="card-content" > Interactive Course</div>
              <div style={{ margin: 50 }}>Facilitates students to clear doubts on the spot enabling them to move forward confidently</div>
            </div>
          </div>

          <div className="col-4 ">
            <div className="card-a " style={{ height: 400, marginLeft: 100 }}>
              <div className="mx-auto"> <i className="material-icons" style={{ fontSize: 60, color: '#0076F9' }}>cloud</i></div>
              <div className="card-content"> Assessment Tests</div>
              <div style={{ margin: 50 }}>To help students test their understanding and focus more on the required areas</div>
            </div>
          </div>

          <div className="col-4 ">
            <div className="card-a " style={{ height: 400, marginTop: 100, marginLeft: 100 }}>
              <div className="mx-auto"> <i className="material-icons" style={{ fontSize: 60, color: '#0076F9' }}>cloud</i></div>
              <div className="card-content"> Topicwise Exercises</div>
              <div style={{ margin: 50 }}>To gain understanding on all the concepts and put their into practice</div>
            </div>
          </div>

          {/* <div className="col-4">
            <p className="a card-a " style={{ height: 400, color: 'black' }}>Benefits of the course</p>
          </div>
          <div className="col-4 ">
            <p className="a card-a " style={{ height: 400, color: 'black', marginTop: 100 }}>Benefits of the course</p>
          </div> */}
        </div>
        <div className="row my-5">
          <div className="col-12 px-5 my-5" style={{ height: 400, color: 'black' }}>
            <p className="a text-center my-5">Features of the Course</p>
            <div className=" card-full navbar__gradient" style={{ height: 450, marginBottom: 100 }}>
              <div className="b" style={{ margin: 'auto', fontSize: 36 }}>
                <p className="mx-auto"> <i className="material-icons" style={{ fontSize: 60, color: 'red' }}>check</i>
                  Beginner-friendly lessons for all skill levels</p>
                <p className="mx-auto"> <i className="material-icons" style={{ fontSize: 60, color: 'red' }}>check</i>Hands-on coding exercises</p>
                <p className="mx-auto"> <i className="material-icons" style={{ fontSize: 60, color: 'red' }}>check</i>Experienced instructors with real-world expertise</p>
                <p className="mx-auto"> <i className="material-icons" style={{ fontSize: 60, color: 'red' }}>check</i>Flexible scheduling to fit your busy life</p>
              </div>
              <div style={{ margin: 'auto' }}>
                <button className="cta" onClick={handleSubmit}>Enroll Now</button>
              </div>
            </div>
          </div>
        </div>


        <div className="row my-5 py-5">
          <div className="col-8 offset-2 px-5 my-5 py-5" style={{ height: 600, color: 'black' }}>
            {/* "Master C Programming Online" */}
            <p className="a text-center  py-5">Course Content</p>
            <div className=" card-full my-3" style={{ backgroundColor: 'white', color: 'black' }}>
              <div className="b" style={{ margin: 'auto', fontSize: 36 }}>
                <p><i className="material-icons" style={{ fontSize: 40, color: 'red' }}>arrow_forward_ios</i>Fundamentals of C</p>
                <p><i className="material-icons" style={{ fontSize: 40, color: 'red' }}>arrow_forward_ios</i>Data Types and Variables</p>
                <p><i className="material-icons" style={{ fontSize: 40, color: 'red' }}>arrow_forward_ios</i>Control Flow</p>
                <p><i className="material-icons" style={{ fontSize: 40, color: 'red' }}>arrow_forward_ios</i>Functions and Pointers</p>
                <p><i className="material-icons" style={{ fontSize: 40, color: 'red' }}>arrow_forward_ios</i>Structures</p>
                <p><i className="material-icons" style={{ fontSize: 40, color: 'red' }}>arrow_forward_ios</i>File Handling</p>
              </div>
              <div style={{ margin: 'auto' }}>
                <button className="cta" onClick={handleSubmit}>Enroll Now</button>
              </div>
            </div>
          </div>
        </div>








        {/* <div className="row py-5">
          <div className="col-6 ">
            <p className="a card " style={{ backgroundColor: ' #A1D2FA', height: 400, color: 'black' }}>Meet the Instructor</p>
          </div>
          <div className="col-5 card">
            <div className="b">
              <p>Beginner-friendly lessons for all skill levels</p>
              <p>Hands-on coding exercises and projects</p>
              <p>Experienced instructors with real-world expertise</p>
              <p>Flexible scheduling to fit your busy life</p>
            </div>
            <div>
              <button className="cta" onClick={handleSubmit}>Enroll Now</button>
            </div>
          </div>
        </div> */}
        <div className="row my-5">
          <div className="col-12 px-5 my-5">
            <p className="a text-center my-1"> How does it work</p>
            <div className="card-full navbar__gradient" style={{ height: 600, marginTop: 60 }}>
              <div className="b" style={{ margin: 'auto', fontSize: 30 }}>
                {/* <div className="mx-auto"> <i className="material-icons" style={{ fontSize: 60, color: 'blue' }}>cloud</i></div> */}
                {/* <div className="card-full-content text-center" style={{ fontSize: 64 }}> How does it work </div> */}
                <p><i className="material-icons" style={{ fontSize: 48, color: 'red' }}>keyboard_double_arrow_right</i>Register on line</p>
                <p><i className="material-icons" style={{ fontSize: 48, color: 'red' }}>keyboard_double_arrow_right</i>We will announce the starting date of the next batch</p>
                <p><i className="material-icons" style={{ fontSize: 48, color: 'red' }}>keyboard_double_arrow_right</i>We will also inform you by email</p>
                <p><i className="material-icons" style={{ fontSize: 48, color: 'red' }}>keyboard_double_arrow_right</i>Join the course paying fee online</p>
                <p><i className="material-icons" style={{ fontSize: 48, color: 'red' }}>keyboard_double_arrow_right</i>We will send a zoom link to all those who join </p>
                <p><i className="material-icons" style={{ fontSize: 48, color: 'red' }}>keyboard_double_arrow_right</i>Join the class on the given link</p>
                <p><i className="material-icons" style={{ fontSize: 48, color: 'red' }}>keyboard_double_arrow_right</i>Browse your Dashboard for all the activity that starts happening</p>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="row py-5">
          <div className="col-6">
            <p className="a card " style={{ height: 400, color: 'black' }}>Course Highlights</p>
          </div>
          <div className="col-5 card" style={{ backgroundColor: ' #A1D2FA', height: 400 }}>
            <div className="b">
              <p>Fundamentals of C</p>
              <p>Data Types and Variables</p>
              <p>Control Flow</p>
              <p>Functions and Pointers</p>
              <p>Structures</p>
              <p>File Handling</p>
            </div>
          </div>
        </div> */}

        <div className="row">
          <div className="col-6" >
            <p className="a card " style={{ backgroundColor: ' #A1D2FA', height: 400, color: 'black' }}>Meet the Instructor</p>
          </div>

          <div className="col-5 card" style={{ height: 400 }}>
            <div className="text-center my-1">
              <img style={{ borderRadius: '50%', borderStyle: '5px solid red', width: "150px", height: "150px" }} src={coach} alt="NoImg" />
            </div>

            <div className="b" style={{ marginTop: 20, textAlign: 'center' }}>
              <h3 style={{ textDecoration: 'underline' }}>Usha Madam</h3>
              <p>An ex-NIIT faculty with passion to teach, who trained hundreds of Engineering students along with others during the past several years in the cities of Vijayawada and Hyderabad </p>

            </div>
            {/* <div>
              <button className="cta" onClick={handleSubmit}>Enroll Now</button>
            </div> */}
          </div>
        </div>


        <div className="row my-5">
          <div className="col-12 text-center"><p style={{ fontSize: 48 }}>Here is what our students are saying !  </p>
          </div>


          <div className="row py-5">

            {/* {content = students.length === 0 ? (
              <div className="justify-content-center">
                <Spinner />
              </div>
            ) : ( */}
            <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>

              {content = students.length === 0 ?
                <div className="d-flex justify-content-center">
                  <Spinner />
                </div> : (
                  students.map((student, index) => {
                    return (
                      <div key={index}>
                        <div className="testimonial-card " style={{ marginTop: 50 }}>
                          <div className="text-center my-1">
                            <img style={{ borderRadius: '50%', borderStyle: '5px solid red', width: "80px", height: "80px" }} src={student.get_image_url} alt="NoImg" />
                          </div>
                          <p className="testimonial-content" >{student.first_name + ' ' + student.last_name}</p>
                          <span>{student.study}</span>
                          <span>{student.institution}</span>
                          <div style={{ margin: 50 }}>"{student.feedback}"</div>
                        </div>
                      </div>
                    )
                  })

                )}
            </Grid>
            {/* )} */}
          </div>






          {/* <div className="testimonial-card " style={{ marginTop: 100 }}>
                <div className="text-center my-1">
                  <img style={{ borderRadius: '50%', borderStyle: '5px solid red', width: "80px", height: "80px" }} src={coach} alt="NoImg" />
                </div>
                   <div className="testimonial-content" > Interactive Course</div>
                <div style={{ margin: 50 }}>Facilitates students to clear doubts on the spot enabling them to move forward confidently</div>
              </div> */}
        </div>

        {/* <div className="col-4 ">
              <div className="testimonial-card " style={{ height: 400, marginLeft: 100 }}>
                <div className="mx-auto"> <i className="material-icons" style={{ fontSize: 60, color: '#0076F9' }}>cloud</i></div>
                <div className="testimonial-content"> Assessment Tests</div>
                <div style={{ margin: 50 }}>Facilitates students to clear doubts on the spot enabling them to move forward confidently</div>
              </div>
            </div> */}

        {/* <div className="col-4 ">
              <div className="testimonial-card " style={{ height: 400, marginTop: 100, marginLeft: 100 }}>
                <div className="mx-auto"> <i className="material-icons" style={{ fontSize: 60, color: '#0076F9' }}>cloud</i></div>
                <div className="testimonial-content"> Topicwise Exercises</div>
                <div style={{ margin: 50 }}>Facilitates students to clear doubts on the spot enabling them to move forward confidently</div>
              </div>
            </div> */}


        {/* <div className="row">
          <div className="col-6 px-5" style={{ backgroundColor: ' #A1D2FA', height: 400, color: 'black' }}>
            <p className="a">Meet the Instructor</p>
          </div>
          <div className="col-6">
            <div className="b" style={{ marginTop: 100 }}>
              <p>An ex-NIIT faculty who handled several batches of Engineering students and employess and trained more than </p>

            </div>
            <div>
              <button className="cta" onClick={handleSubmit}>Enroll Now</button>
            </div>
          </div>
        </div>
        <div><button className="cta" onClick={handleSubmit}>Enroll Now</button></div> */}


        {/* <div><h3>Visuals</h3></div> */}



        <div className="row my-5">
          <div className="col-8 offset-2 px-5" style={{ height: 600, color: 'black' }}>
            <p className="a text-center  py-5">Pricing</p>
            <div className=" card-full my-3 navbar__gradient" style={{ backgroundColor: 'white', color: 'black' }}>
              <div className="b pricing" style={{ margin: 'auto', fontSize: 36 }}>
                <h3 className="text-center">Course Fee</h3>
                <h3 className="pricing text-center" style={{ textDecoration: 'line-through' }}> Rs.4,000</h3>
                <h1 className="pricing" style={{ fontSize: 64, color: 'yellow' }}>Introductory offer Rs.3000</h1>
              </div>
              <div style={{ margin: 'auto' }}>
                <button className="cta" onClick={handleSubmit}>Enroll Now</button>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-10 offset-1 px-5 my-5" style={{ height: 700, color: 'black' }}>
            {/* "Master C Programming Online" */}
            <p className="a text-center  py-5">F A Q</p>
            <div className=" card-full my-3" style={{ backgroundColor: 'white', color: 'black', height: 600 }}>
              <div style={{ margin: 'auto', fontSize: 24 }}>
                <h3><i className="material-icons" style={{ fontSize: 48, color: 'red' }}>question_mark</i> "Is prior programming experience required" </h3>
                <p>No, previous programming experience is not at all required. You will learn everything from scratch.</p>
                <h3><i className="material-icons" style={{ fontSize: 48, color: 'red' }}>question_mark</i> "How does the online learning process work"</h3>
                <p>For every session, a zoom link will be provided. You will listen to the lecture, note the doubts if any, and at the end you can clarify everything. </p>
                <h3><i className="material-icons" style={{ fontSize: 48, color: 'red' }}>question_mark</i> "Are there any hands-on sessions"</h3>
                <p>Yes, after finishing each topic there would be programs to make the concepts understandable. Each program would be explained so that students understand the code line by line. </p>

              </div>
              <div style={{ margin: 'auto' }}>
                <button className="cta" onClick={handleSubmit}>Enroll Now</button>
              </div>
            </div>
          </div>
        </div>




        {/* <div><h3>Contact</h3>
          <h3>9849578298</h3></div> */}
      </div>
    </div >
  );
}

export default Home;

// <div className="row py-5">
//   <div className="col-12 " style={{ display: 'flex', flexDirection: 'row', maxWidth: 900 }}>
//     {feedbackData.map((item, index) => {
//       return (
//         <div key={index}>
//           <div className="testimonial-card " style={{ marginTop: 100 }}>
//             <div className="text-center my-1">
//               <img style={{ borderRadius: '50%', borderStyle: '5px solid red', width: "80px", height: "80px" }} src={coach} alt="NoImg" />
//             </div>
//             <p className="testimonial-content" >{item.name}</p>
//             <span>{item.studyRole}</span>
//             <span>{item.collegeOffice}</span>
//             <div style={{ margin: 50 }}>"{item.comment}"</div>
//           </div>
//         </div>
//       )
//     })
//     }
//   </div>
// </div>