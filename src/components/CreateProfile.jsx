import React, { useState, useEffect } from "react";
import { TextField, Stack, Button, Checkbox } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom"
import axios from 'axios'
import './style.css'

const CreateProfile = ({ signedIn, setSignedIn }) => {
    console.log('cre Prof', signedIn)


    const navigate = useNavigate();
    // const [file, setFile] = useState();
    // function handleChange(e) {
    //     console.log(e.target.files);
    //     setFile(URL.createObjectURL(e.target.files[0]));
    // }


    const [student, setStudent] = useState({})


    const [email, setEmail] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [mobile, setMobile] = useState("")
    const [city, setCity] = useState("")
    const [country, setCountry] = useState("")
    const [uniqid, setUniqid] = useState("")
    const [id, setId] = useState(0)
    const [study, setStudy] = useState('')
    const [institution, setInstitution] = useState('')
    const [work, setWork] = useState('')
    const [office, setOffice] = useState('')
    // const [isLoading, setIsLoading] = useState(true)

    // const [emailError, setEmailError] = useState(false)
    // const [passwordError, setPasswordError] = useState(false)

    const [image, setImage] = useState({ preview: '', raw: '' })
    const location = useLocation()
    const token = location.state
    console.log('t', token)
    if (token) {
        localStorage.setItem("token", token.token);
    }
    const onImageChange = (event) => {
        setImage({
            preview: URL.createObjectURL(event.target.files[0]),
            raw: event.target.files[0]
        })
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        console.log('h', student.id)
        const formData = new FormData();
        formData.append('mobile', mobile)
        formData.append('city', city)
        formData.append('country', country)
        formData.append('study', study)
        formData.append('institution', institution)
        formData.append('work', work)
        formData.append('office', office)
        formData.append('image', image.raw)


        const jwt = localStorage.getItem('token');

        const studentsUrl = (process.env.REACT_APP_SERVER) ? `https://coaching-q9o7.onrender.com/students/${student.id}` : `http://localhost:3001/students/${student.id}`

        fetch(studentsUrl, {
            headers: {
                "Authorization": `Bearer ${jwt}`,
                "Accept": "application/json"
            },
            method: 'PATCH',
            body: formData
        })
            .then((res) => res.json())
            .then((res) => {
                alert("Your profile created successfully!")
                navigate('/dashpage', { replace: true });
            })
            .catch((err) => alert(err));
    }



    useEffect(() => {
        const jwt = localStorage.getItem('token')
        console.log('jwt', jwt)
        const baseUrl = (process.env.REACT_APP_SERVER) ? `https://coaching-q9o7.onrender.com` : `http://localhost:3001`

        axios.get(`${baseUrl}/students/send_names`, {
            headers: {
                'Content-Type': 'application/json',
                // 'origin': 'http://localhost:3000',
                // 'token': token.token,
                'token': `${jwt}`,
                Authorization: `Bearer ${jwt}`
            },
        })
            .then(response => {
                console.log('ress', response.data);
                setStudent(response.data)
                setSignedIn(true)
            })
            .catch(error => {
                console.error(error);
            });
    }, [])




    return (
        <>
            <div className="row py-5">
                <div className="col-md-3 py-5" style={{ borderRadius: '50%', borderStyle: '5px solid red' }}>
                    {/* <img className="circle"
                        alt="ad-img"

                        src={image}
                    /> */}
                    {/* <input type="file" onChange={handleChange} />
                    <img style={{ borderRadius: '50%', borderStyle: '5px solid red' }} src={file} /> */}

                    <label>
                        <input type="file"
                            accept="image/*"
                            multiple={false}
                            onChange={onImageChange}
                        />

                        <img style={{ borderRadius: '50%', borderStyle: '5px solid red' }} src={image.preview} alt="Upload Image" />
                    </label>
                    {/* <img
                        alt="ad-img"
                        width={100}
                        height={100}
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS1hIjBaj0A0XNB_xAozRAcFs6Gr0DQhWTGiQ&usqp=CAU"
                        style={{ display: isLoading ? "none" : "block" }}
                        onLoad={onLoad}
                    /> */}
                </div>
                {/* {console.log('tok', token)} */}
                <div className='col-md-6 py-5'>
                    <h2 className="text-center py-5">Profile</h2>
                    <form onSubmit={handleSubmit} action={<Link to="/login" />}>
                        <Stack spacing={1} direction="row" sx={{ marginBottom: 0 }}>

                            {/* <label>First Name */}
                            <TextField
                                type="text"
                                variant='outlined'
                                color='secondary'
                                label="First Name"
                                // onChange={e => setFirstName(e.target.value)}
                                value={student.first_name}
                                readOnly={false}
                                fullWidth
                            // required
                            />
                            {/* </label> */}
                            {/* <label>Last Name */}
                            <TextField
                                type="text"
                                variant='outlined'
                                color='secondary'
                                label="Last Name"
                                // onChange={e => setLastName(e.target.value)}
                                value={student.last_name}
                                readOnly={false}
                                fullWidth
                                required
                            />
                            {/* </label> */}
                        </Stack>
                        {/* <label>Email */}
                        <TextField
                            type="email"
                            variant='outlined'
                            color='secondary'
                            label="Email"
                            onChange={e => setEmail(e.target.value)}
                            value={student.email}
                            readOnly={false}
                            fullWidth
                            required
                            sx={{ mb: 4 }}
                        />
                        {/* </label> */}
                        <TextField
                            type="text"
                            variant='outlined'
                            color='secondary'
                            label="City"
                            onChange={e => setCity(e.target.value)}
                            value={student.city}
                            required
                            fullWidth
                            sx={{ mb: 4 }}
                        />
                        <TextField
                            type="text"
                            variant='outlined'
                            color='secondary'
                            label="Mobile"
                            onChange={e => setMobile(e.target.value)}
                            value={student.mobile}
                            required
                            fullWidth
                            sx={{ mb: 4 }}
                        />
                        <TextField
                            type="text"
                            variant='outlined'
                            color='secondary'
                            label="Country"
                            onChange={e => setCountry(e.target.value)}
                            value={student.country}
                            required
                            fullWidth
                            sx={{ mb: 4 }}
                        />
                        <TextField
                            type="text"
                            variant='outlined'
                            color='secondary'
                            label="Study"
                            onChange={e => setStudy(e.target.value)}
                            value={student.study}
                            required
                            fullWidth
                            sx={{ mb: 4 }}
                        />
                        <TextField
                            type="text"
                            variant='outlined'
                            color='secondary'
                            label="Institution"
                            onChange={e => setInstitution(e.target.value)}
                            value={student.institution}
                            required
                            fullWidth
                            sx={{ mb: 4 }}
                        />
                        <TextField
                            type="text"
                            variant='outlined'
                            color='secondary'
                            label="Job Role"
                            onChange={e => setWork(e.target.value)}
                            value={student.work}
                            required
                            fullWidth
                            sx={{ mb: 4 }}
                        />
                        <TextField
                            type="text"
                            variant='outlined'
                            color='secondary'
                            label="Office"
                            onChange={e => setOffice(e.target.value)}
                            value={student.office}
                            required
                            fullWidth
                            sx={{ mb: 4 }}
                        />
                        {/* <Checkbox /> I agree to Terms and Conditions<br></br> */}
                        <Button variant="contained" color="primary" type="submit">Create Profile</Button>
                    </form>
                </div>

                <div className="col-md-3 py-5">
                    <label>Uniq Id :
                        <input
                            type="text"
                            name="Uniq Id"
                            value={student.uniq_id}
                            readOnly={true}
                        // onChange={e => setUniqid(e.target.value)}
                        />
                    </label>
                    {/* <TextField
                        type='text'
                        label="Uniq Id"
                        defaultValue='2017-05-24'
                        variant='outlined'
                        inputProps={
                            { readOnly: true, }
                        }
                    /> */}
                </div>
            </div >
        </>
    );
}

export default CreateProfile;