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
import instructor from '../assets/images/instructor.jpg'
import { Bloodtype, StrikethroughS, StrikethroughSTwoTone } from "@mui/icons-material";
import Spinner from './Spinner'
import { NavLink } from "react-router-dom";

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
          <p className="a" style={{ color: 'blue' }}> The C Learning Hub</p>

        </div>
        <div className="row">

          <div className="col-sm-6 px-5" style={{ height: 400, color: 'black' }}>
            {/* "Master C Programming Online" */}
            <p className="header-1 text-left">Learn C Language Programming from Scratch</p>

            <p className="header-2 text-left " >Discover the world of programming through C with our interactive course</p>


          </div>
          <div className="col-sm-6" style={{ backgroundImage: "image1.webp" }}>
            <img className="imgsize" src={img1} alt="" height="400" />
          </div>
        </div>


        <div className="row col-8 offset-2 py-5 d-flex text-center">
          <div className="b" style={{ margin: 'auto', color: 'blue' }}>
            We shall be launching our first batch from this platform in March 2024.
            Watch out for the starting date  announcement.
          </div>
        </div>



        <div className="row col-10 offset-1 py-5 d-flex justify-content-around">
          <div className="col-sm-4 d-flex justify-content-center">
            <div className="card-a " >
              <div className="mx-auto"> <i className="material-icons" style={{ fontSize: 60, color: '#0076F9' }}>layers</i></div>
              <div className="card-content" > Interactive Course</div>
              <div style={{ margin: 25 }}>Facilitates students to clear doubts on the spot enabling them to move forward confidently</div>
            </div>
          </div>

          <div className="col-sm-4 d-flex justify-content-center ">
            <div className="card-a " >
              {/* style={{ height: 400, marginLeft: 55, marginRight: 0 }} */}
              <div className="mx-auto"> <i className="material-icons" style={{ fontSize: 60, color: '#0076F9' }}>quiz</i></div>
              <div className="card-content"> Assessment Tests</div>
              <div style={{ margin: 50 }}>To help students test their understanding and focus more on the required areas</div>
            </div>
          </div>

          <div className="col-sm-4 d-flex justify-content-center">
            <div className="card-a " >
              {/* style={{ height: 400, marginLeft: 5 }} */}
              <div className="mx-auto"> <i className="material-icons" style={{ fontSize: 60, color: '#0076F9' }}>fitness_center</i></div>
              <div className="card-content"> Topicwise Exercises</div>
              <div style={{ margin: 50 }}>To gain understanding on all the concepts and implement them through programs</div>
            </div>
          </div>

          {/* <div className="col-4">
            <p className="a card-a " style={{ height: 400, color: 'black' }}>Benefits of the course</p>
          </div>
          <div className="col-4 ">
            <p className="a card-a " style={{ height: 400, color: 'black', marginTop: 100 }}>Benefits of the course</p>
          </div> */}
        </div>
        <div className="row">
          <div className="col-12 " style={{ height: 500, color: 'black' }}>
            <p className="a text-center my-3">Features of the Course</p>
            <div className=" card-full navbar__gradient" style={{ height: 600, marginBottom: 100 }}>
              <div className="b" style={{ margin: 'auto' }}>
                <p className="mx-auto"> <i className="material-icons" style={{ fontSize: 36, color: 'red' }}>check</i>
                  Beginner-friendly lessons for all skill levels</p>
                <p className="mx-auto"> <i className="material-icons" style={{ fontSize: 36, color: 'red' }}>check</i>Hands-on coding exercises</p>
                <p className="mx-auto"> <i className="material-icons" style={{ fontSize: 36, color: 'red' }}>check</i>Experienced instructors who simplify the concepts</p>
                <p className="mx-auto"> <i className="material-icons" style={{ fontSize: 36, color: 'red' }}>check</i>Support to  develop own logic to write programs</p>
                <p className="mx-auto"> <i className="material-icons" style={{ fontSize: 36, color: 'red' }}>check</i>Flexible scheduling to fit your busy life</p>
                <p className="mx-auto"> <i className="material-icons" style={{ fontSize: 36, color: 'red' }}>check</i>Students are encouraged to clarify doubts</p>
                <p className="mx-auto"> <i className="material-icons" style={{ fontSize: 36, color: 'red' }}>check</i>Live supervision while students work with programs</p>
              </div>
              <div style={{ margin: 'auto' }}>
                <NavLink to="/StudentSignup" className="btn btn-success cta" >Enroll Now</NavLink>
                {/* <button className="btn btn-success cta" onClick={handleSubmit}>Enroll Now</button> */}
              </div>
            </div>
          </div>
        </div>


        <div className="row my-5 py-5">
          <div className="col-12  my-5 py-5" style={{ height: 950, color: 'black' }}>

            <p className="a text-center  mt-5">Course Content</p>
            <div className=" card-full my-3" style={{ backgroundColor: 'white', color: 'black', height: 900 }}>
              <div className="b" style={{ margin: 'auto' }}>
                <p><i className="material-icons" style={{ fontSize: 24, color: 'red' }}>arrow_forward_ios</i>Introduction to Programming</p>
                <p><i className="material-icons" style={{ fontSize: 24, color: 'red' }}>arrow_forward_ios</i>Features of C Language</p>
                <p><i className="material-icons" style={{ fontSize: 24, color: 'red' }}>arrow_forward_ios</i>Fundamentals of C</p>
                <p><i className="material-icons" style={{ fontSize: 24, color: 'red' }}>arrow_forward_ios</i>Control Flow Statement - If .. else, etc.</p>
                <p><i className="material-icons" style={{ fontSize: 24, color: 'red' }}>arrow_forward_ios</i>Loops</p>
                <p><i className="material-icons" style={{ fontSize: 24, color: 'red' }}>arrow_forward_ios</i>Arrays</p>
                <p><i className="material-icons" style={{ fontSize: 24, color: 'red' }}>arrow_forward_ios</i>Pointers</p>
                <p><i className="material-icons" style={{ fontSize: 24, color: 'red' }}>arrow_forward_ios</i>Functions</p>
                <p><i className="material-icons" style={{ fontSize: 24, color: 'red' }}>arrow_forward_ios</i>Storage Classes</p>
                <p><i className="material-icons" style={{ fontSize: 24, color: 'red' }}>arrow_forward_ios</i>Structures</p>
                <p><i className="material-icons" style={{ fontSize: 24, color: 'red' }}>arrow_forward_ios</i>File Handling</p>
              </div>
              <div style={{ margin: 'auto' }}>
                <NavLink to="/StudentSignup" className="btn btn-success cta" >Enroll Now</NavLink>
                {/* <button className="btn btn-success cta" onClick={handleSubmit}>Enroll Now</button> */}
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
          <div className="col-12  my-5">
            <p className="a text-center my-1"> How does it work</p>
            <div className="card-full navbar__gradient" style={{ height: 600, marginTop: 60 }}>
              <div className="b" style={{ margin: 'auto' }}>
                {/* <div className="mx-auto"> <i className="material-icons" style={{ fontSize: 60, color: 'blue' }}>cloud</i></div> */}
                {/* <div className="card-full-content text-center" style={{ fontSize: 64 }}> How does it work </div> */}
                <p><i className="material-icons" style={{ fontSize: 36, color: 'red' }}>keyboard_double_arrow_right</i>Register on line</p>
                <p><i className="material-icons" style={{ fontSize: 36, color: 'red' }}>keyboard_double_arrow_right</i>We will announce the starting date of the next batch</p>
                <p><i className="material-icons" style={{ fontSize: 36, color: 'red' }}>keyboard_double_arrow_right</i>We will also inform the registered students by email</p>
                <p><i className="material-icons" style={{ fontSize: 36, color: 'red' }}>keyboard_double_arrow_right</i>Join the course paying fee online</p>
                <p><i className="material-icons" style={{ fontSize: 36, color: 'red' }}>keyboard_double_arrow_right</i>We will send a zoom link to all those who join </p>
                <p><i className="material-icons" style={{ fontSize: 36, color: 'red' }}>keyboard_double_arrow_right</i>Join the class using the given link</p>
                <p><i className="material-icons" style={{ fontSize: 36, color: 'red' }}>keyboard_double_arrow_right</i>Browse your Dashboard for all the activity that starts happening</p>
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

          {/* <div className="col-sm-6" style={{ height: 450 }}>
            <p className="a card " style={{ backgroundColor: ' #A1D2FA', height: 450, color: 'black' }}>Meet the Instructor</p>
          </div> */}

          <div className="col-12  " style={{ height: 350, color: 'black' }}>

            <p className="a text-center my-1"> Meet the Instructor</p>
            <div className="card-full " style={{ textAlign: 'center', color: 'black', height: 350 }}>
              <div className="text-center">
                <img className="image" src={instructor} alt="NoImg" />
              </div>
              <h3 style={{ textDecoration: 'underline' }}>Usha Rani Katakamsetty</h3>
              <p style={{ marginTop: 28 }}>An ex-NIIT faculty, expert in C and C++, with a passion to teach,  trained hundreds of Engineering students along with others during the past several years in  Vijayawada and Hyderabad </p>

            </div>
            {/* <div>
              <button className="cta" onClick={handleSubmit}>Enroll Now</button>
            </div> */}
          </div>
        </div>


        <div className="row mt-5">
          <div className="col-12 mt-5 ">
            <p className="a text-center mt-5"> Here's what our students are saying !</p>
          </div>


          <div className="row ">

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
          <div className="col-8 offset-2 px-5" style={{ height: 500, color: 'black' }}>
            <p className="a text-center  py-2">Course Fee</p>
            <div className=" card-full my-3 navbar__gradient" style={{ backgroundColor: 'white', color: 'black', height: 400 }}>
              <div className="b pricing" style={{ margin: 'auto' }}>
                <h3 className="text-center"></h3>
                <h3 className="text-center" style={{ textDecoration: 'line-through' }}> Rs.4,000</h3>
                <h3 className="text-center" style={{ fontWeight: 600 }}>Introductory offer Rs.3000</h3>
              </div>
              <div style={{ margin: 'auto' }}>
                <NavLink to="/StudentSignup" className="btn btn-success cta" >Enroll Now</NavLink>
                {/* <button className="btn btn-success cta" onClick={handleSubmit}>Enroll Now</button> */}
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12 my-3" style={{ height: 700, color: 'black' }}>
            {/* "Master C Programming Online" */}
            <p className="a text-center  py-2">F A Q</p>
            <div className=" card-full" style={{ backgroundColor: 'white', color: 'black', height: 600 }}>
              <div className="c" style={{ margin: 'auto' }}>
                <p style={{ fontWeight: 'bold' }}><i className="material-icons" style={{ color: 'red' }}>question_mark</i> "Is prior programming experience required" </p>
                <p>No, previous programming experience is not at all required. You will be taught everything from scratch.</p>
                <p style={{ fontWeight: 'bold' }}><i className="material-icons" style={{ color: 'red' }}>question_mark</i> "How does the online learning process work"</p>
                <p>For every session, a zoom link will be provided. You will listen to the lecture, note the doubts if any, and at the end you can clarify everything. </p>
                <p style={{ fontWeight: 'bold' }}><i className="material-icons" style={{ color: 'red' }}>question_mark</i> "Are there any hands-on sessions"</p>
                <p>Yes, after finishing each topic students would practice programs to improve their understanding of the concepts. Each program would be explained so that students understand the code line by line. </p>

              </div>
              <div style={{ margin: 'auto' }}>
                <NavLink to="/StudentSignup" className="btn btn-success cta" >Enroll Now</NavLink>
                {/* <NavLink to="/StudentSignup" style={{ color: 'blue' }}>Register here</NavLink> */}
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