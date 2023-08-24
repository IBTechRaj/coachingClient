import React, { useState, useEffect } from "react";
import { TextField, Stack, Button, Checkbox } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom"
import axios from 'axios'
import './style.css'

const Profile = ({ signedIn, setSignedIn }) => {


    const navigate = useNavigate();
    const [isDisabled, setIsDisabled] = useState(true)

    const [student, setStudent] = useState({})
    const [email, setEmail] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [mobile, setMobile] = useState("")
    const [city, setCity] = useState("")
    const [country, setCountry] = useState("")
    const [uniqid, setUniqid] = useState("")
    const [id, setId] = useState(0)
    const [image, setImage] = useState({ preview: '', raw: '' })
    const onImageChange = (event) => {
        setImage({
            preview: URL.createObjectURL(event.target.files[0]),
            raw: event.target.files[0]
        })
    }

    useEffect(() => {
        const jwt = localStorage.getItem('token')
        console.log('jwt', jwt)

        axios.get('http://localhost:3001/students/profile', {
            headers: {
                'Content-Type': 'application/json',
                'token': `${jwt}`,
                Authorization: `Bearer ${jwt}`
            },
        })
            .then(response => {
                console.log('ress', response.data);
                setStudent(response.data)
                setFirstName(response.data.first_name)
                setLastName(response.data.last_name)
                setEmail(response.data.email)
                setMobile(response.data.mobile)
                setCity(response.data.city)
                setCountry(response.data.country)
                setId(response.data.id)
                setSignedIn(true)
            })
            .catch(error => {
                console.error(error);
            });
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault()
        if (!isDisabled) {
            console.log('updating', student.id)
            const formData = new FormData();
            formData.append('mobile', mobile)
            formData.append('city', city)
            formData.append('country', country)
            if (image.raw)
                formData.append('image', image.raw)


            const jwt = localStorage.getItem('token');

            const studentsUrl = (process.env.REACT_APP_SERVER) ? `https://groomwell-backend.onrender.com/salons` : `http://localhost:3001/students/${student.id}`

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
                    console.log('res', res)
                    alert(res.message)

                    setIsDisabled(!isDisabled)
                    navigate('/dashboard', { replace: true });
                })
                .catch((err) => alert(err));
        }
        else {
            setIsDisabled(!isDisabled)
        }
    }
    return (
        <>
            <form onSubmit={handleSubmit} >
                <div className="container  py-5">
                    {console.log(isDisabled)}
                    <div className="row">
                        <div className="col-12">
                            <div className="panel panel-default">
                                <div className="panel-heading text-center py-1">
                                    <h4 className="panel-title">Profile</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">

                            <div className="panel panel-default">
                                <div className="panel-body text-center">
                                    <img style={{ borderRadius: '50%', borderStyle: '5px solid red', width: "150px", height: "150px" }} src={student.get_image_url} alt="NoImg" />
                                    {/* <img src={student.get_image_url} className="img-circle profile-avatar" alt="User avatar" /> */}
                                    {!(isDisabled) ? (
                                        <input type="file"
                                            accept="image/*"
                                            multiple={false}
                                            onChange={onImageChange}
                                        />
                                    ) : (null)}

                                </div>
                            </div>
                        </div>
                        <div className="col-9" >
                            <div className="panel-body">

                                {/* <div className="form-group"> */}
                                <label className="col-sm-2 control-label">First name</label>
                                <div className="col-sm-10">
                                    <input type="text"
                                        className="form-control"
                                        readOnly={isDisabled}

                                        variant='outlined'
                                        color='secondary'
                                        label="First Name"
                                        onChange={event => setFirstName(event.target.value)}
                                        value={firstName}
                                        required
                                    />
                                </div>
                                {/* </div> */}
                                <div className="form-group">
                                    <label className="col-sm-2 control-label">Last Name</label>
                                    <div className="col-sm-10">
                                        <input type="text"
                                            className="form-control"
                                            readOnly={isDisabled}
                                            variant='outlined'
                                            color='secondary'
                                            label="Last Name"
                                            onChange={event => setLastName(event.target.value)}
                                            value={lastName}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="col-sm-2 control-label">Email </label>
                                    <div className="col-sm-10">
                                        <input type="tel"
                                            className="form-control"
                                            readOnly={true}
                                            variant='outlined'
                                            color='secondary'
                                            // label="Email"
                                            onChange={event => setEmail(event.target.value)}
                                            value={email}
                                            required
                                        />
                                    </div>
                                </div>


                                <div className="form-group">
                                    <label className="col-sm-2 control-label">Mobile </label>
                                    <div className="col-sm-10">
                                        <input type="tel"
                                            className="form-control"
                                            readOnly={isDisabled}
                                            variant='outlined'
                                            color='secondary'
                                            // label="Mobile"
                                            onChange={event => setMobile(event.target.value)}
                                            value={mobile}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-sm-2 control-label">City </label>
                                    <div className="col-sm-10">
                                        <input type="tel"
                                            className="form-control"
                                            readOnly={isDisabled}
                                            variant='outlined'
                                            color='secondary'
                                            // label="City"
                                            onChange={event => setCity(event.target.value)}
                                            value={city}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-sm-2 control-label">Country </label>
                                    <div className="col-sm-10">
                                        <input type="tel"
                                            className="form-control"
                                            readOnly={isDisabled}
                                            variant='outlined'
                                            color='secondary'
                                            // label="Country"
                                            onChange={event => setCountry(event.target.value)}
                                            value={country}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>



                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="d-grid gap-2 col-6 mx-auto">
                                <button className="btn btn-primary btn-block" type="submit" onClick={handleSubmit}>
                                    {isDisabled ? 'Edit ' : 'Save'}
                                </button>
                                {/* <button class="btn btn-primary" type="button">Button</button> */}
                            </div>
                        </div>
                    </div>

                </div>
            </form>
        </>
    )
}

export default Profile

//     < form
// className = "myForm container"
// noValidate
// autoComplete = "on"
// onSubmit = { updateSalonDetails }
//     >


//         <label>
//           Name of the Salon
//           <input
//             type="text"
//             name="name"

//             onBlur={form.handleBlurEvent}
//             onChange={form.handleChangeEvent}
//             // onBlur={form.handleBlurEvent}
//             // onChange={handleInputChange}
//             value={fields.name ? fields.name : salonData.name}
//           />
//         </label>
//         <label className="error">
//           {errors.name ? errors.name : ""}
//         </label>



//         <label>
//           Email
//           <input
//             type="email"
//             name="email"
//             onBlur={form.handleBlurEvent}
//             onChange={form.handleChangeEvent}
//             // onBlur={form.handleBlurEvent}
//             // onChange={handleInputChange}
//             value={fields.email ? fields.email : salonData.email}
//           />
//         </label>
//         <label className="error">
//           {errors.email ? errors.email : ""}
//         </label>



//         <label>
//           Address 1
//           <input
//             type="text"
//             name="address1"
//             onBlur={form.handleBlurEvent}
//             onChange={form.handleChangeEvent}
//             // onBlur={form.handleBlurEvent}
//             // onChange={handleInputChange}
//             value={fields.address1 ? fields.address1 : salonData.address1}
//           />
//         </label>
//         <label className="error">
//           {errors.address1 ? errors.address1 : ""}
//         </label>




//         <label>
//           Closes
//           <input
//             type="time"
//             name="closes"
//             onBlur={form.handleBlurEvent}
//             onChange={form.handleChangeEvent}
//             // onBlur={form.handleBlurEvent}
//             // onChange={handleInputChange}
//             value={fields.closes ? fields.closes : salonData.closes}
//           />
//         </label>
//         <label className="error">
//           {errors.closes ? errors.closes : ""}
//         </label>



//         <label>
//           Weekly Holiday
//           <select
//             id="weekday"
//             name="weekday"
//             onBlur={form.handleBlurEvent}
//             onChange={form.handleChangeEvent}
//             value={fields.weekday ? fields.weekday : salonData.weekday}
//           // onChange={handleInputChange}
//           // onBlur={form.handleBlurEvent}
//           >
//             <option value="">Select</option>
//             <option value={1}>Sunday</option>
//             <option value={2}>Monday</option>
//             <option value={3}>Tuesday</option>
//             <option value={4}>Wednesday</option>
//             <option value={5}>Thursday</option>
//             <option value={6}>Friday</option>
//             <option value={7}>Saturday</option>
//           </select>
//         </label>
//         <label className="error">
//           {errors.weekday ? errors.weekday : ""}
//         </label>


//         <label>
//           Image Upload
//           <input type="file"
//             accept="image/*"
//             multiple={false}
//             onChange={onImageChange}
//           />
//         </label>


//         <button type="submit"
//           // disabled={salonsBtn}
//           onClick={updateSalonDetails}
//         >
//           Update Salon  </button>



//         <button
//           type="submit"
//           onClick={onClose}
//         >
//           Exit
//         </button>

//       </form >             

