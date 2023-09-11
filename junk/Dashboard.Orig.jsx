import React, { useState, useEffect } from "react";
// import { TextField, Stack, Button, Checkbox } from "@mui/material";
import { NavLink } from "react-router-dom"
import axios from 'axios'
import './style.css'

const Dashboard = ({ signedIn, setSignedIn }) => {

    const [student, setStudent] = useState({})
    // const [email, setEmail] = useState("")
    // const [firstName, setFirstName] = useState("")
    // const [lastName, setLastName] = useState("")
    // const [mobile, setMobile] = useState("")
    // const [city, setCity] = useState("")
    // const [country, setCountry] = useState("")
    // const [uniqid, setUniqid] = useState("")
    // const [id, setId] = useState(0)

    // const [file, setFile] = useState();
    // function handleChange(e) {
    //     console.log(e.target.files);
    //     setFile(URL.createObjectURL(e.target.files[0]));
    // }




    // const [email, setEmail] = useState("")
    // const [firstName, setFirstName] = useState("")
    // const [lastName, setLastName] = useState("")
    // const [mobile, setMobile] = useState("")
    // const [city, setCity] = useState("")
    // const [country, setCountry] = useState("")
    // const [uniqid, setUniqid] = useState("")
    // const [id, setId] = useState(0)
    // const [isLoading, setIsLoading] = useState(true)

    // const [emailError, setEmailError] = useState(false)
    // const [passwordError, setPasswordError] = useState(false)

    const [image, setImage] = useState({ preview: '', raw: '' })
    // const location = useLocation()
    // const token = location.state

    // const onImageChange = (event) => {
    //     setImage({
    //         preview: URL.createObjectURL(event.target.files[0]),
    //         raw: event.target.files[0]
    //     })
    // }
    // const handleSubmit = (event) => {
    //     event.preventDefault()

    //     setEmailError(false)
    //     setPasswordError(false)

    //     if (email === '') {
    //         setEmailError(true)
    //     }
    //     // }
    //     const formData = new FormData();
    //     formData.append('mobile', mobile)
    //     formData.append('city', city)
    //     formData.append('country', country)
    //     formData.append('image', image.raw)


    //     const jwt = localStorage.getItem('token');

    //     const studentsUrl = (process.env.REACT_APP_SERVER) ? `https://groomwell-backend.onrender.com/salons` : `http://localhost:3001/students/${id}`

    //     fetch(studentsUrl, {
    //         headers: {
    //             "Authorization": `Bearer ${jwt}`,
    //             "Accept": "application/json"
    //         },
    //         method: 'PATCH',
    //         body: formData
    //     })
    //         .then((res) => res.json())
    //         .then((res) => {
    //             // console.log('res', res)
    //             // setSpSalonId(res.id)
    //             // console.log('salon id', spSalonId)
    //             alert("Your profile details uploaded successfully!")
    //             // setSalonsBtn(!salonsBtn)

    //         })
    //         .catch((err) => alert(err));
    // }



    useEffect(() => {
        const jwt = localStorage.getItem('token')

        axios.get('http://localhost:3001/students/profile', {
            headers: {
                'Content-Type': 'application/json',
                // 'origin': 'http://localhost:3000',
                'token': `${jwt}`,
                Authorization: `Bearer ${jwt}`
            },
        })
            .then(response => {
                console.log('profile', response.data);
                // setFirstName(response.data.first_name)
                // setLastName(response.data.last_name)
                // setEmail(response.data.email)
                // setUniqid(response.data.uniq_id)
                // setId(response.data.id)
                setStudent(response.data)
                setSignedIn(true)

            })
            .catch(error => {
                console.error(error);
            });
    }, [])




    return (
        <>
            <div className="row py-3">
                <div className="col-md-3 py-5" style={{ borderRadius: '50%', borderStyle: '5px solid red' }}>

                    {/* <img style={{ borderRadius: '50%', borderStyle: '5px solid red' }} src={student.data.attributes.get_image_url} alt="NoImg" /> */}
                    <NavLink className="nav-link" to="/Profile">
                        Profile
                        <span className="sr-only">(current)</span>
                    </NavLink>
                </div>
                <div className='col-md-6'>
                    <h2 className="text-center py-5">Dashboard</h2>


                    <br></br>
                    <label>First Name:
                        {student.first_name}
                    </label> <br></br><label>Last Name:
                        {/* {student.data.attributes.last_name} */}
                    </label><br></br> <label>Email:
                        {/* {student.data.attributes.email} */}
                    </label><br></br>
                    {/* <label>Image:
                        <img src={student.get_image_url} />
                    </label><br></br> */}



                </div>
                <div className="col-md-3 py-5 align-items-end" >
                    {/* <img src={student.get_image_url} /> */}
                    {console.log('stuy', student)}
                    <img style={{ borderRadius: '50%', borderStyle: '5px solid red' }} src={student.get_image_url} alt="NoImg" />

                </div>

            </div >
        </>
    );
}

export default Dashboard