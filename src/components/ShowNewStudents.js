
import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';
// import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
// import TextField from '@mui/material/TextField';
import Row from 'react-bootstrap/Row';
// import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
// import MiscellaneousServicesOutlinedIcon from '@mui/icons-material/MiscellaneousServicesOutlined';
// import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

export default function ShowNewStudents(props) {

    const [studentsData, setStudentsData] = useState(null);

    // const usersUrl = (process.env.REACT_APP_SERVER) ? `https://motorwash-backend-lfxt.onrender.com/list_users/` : `http://localhost:3001/list_users/`
    const studentsUrl = (process.env.REACT_APP_SERVER) ? `https://coaching-q9o7.onrender.com/students/get_new_students` : `http://localhost:3001/students/get_new_students`
    const studentDelUrl = (process.env.REACT_APP_SERVER) ? `https://coaching-q9o7.onrender.com/students/` : `http://localhost:3001/students/`

    const getUsers = () => {
        axios.get(studentsUrl,)
            .then(response => {
                console.log('users.dat', response.data)
                setStudentsData(response.data)
            })
    }
    useEffect(() => {

        getUsers()
    }, [])


    const theme = createTheme();

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(
                studentDelUrl + id
            );
            getUsers()
        } catch (err) {
            console.log('e', err.message)
            // setError(err.message);
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="lg">
                <CssBaseline />



                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >

                </Box>
                <Row className="justify-content-center"> <h3 className='text-center'>List of New Students</h3>
                    {studentsData ?

                        (<table>
                            <thead>
                                <tr>
                                    {/* <th>Sl.</th> */}
                                    <th>Pic</th>
                                    <th>Last Name</th>
                                    <th>Last Name</th>
                                    <th>Email</th>
                                    <th>Mobile</th>
                                    <th>City</th>
                                    <th>Country</th>
                                    <th>Study</th>
                                    <th>College</th>
                                    <th>Activated</th>
                                    <th>Status</th>
                                    <th>Batch</th>
                                </tr>
                            </thead>
                            <tbody>
                                {studentsData && studentsData.map(stu => {
                                    return (

                                        <tr key={stu.email}>
                                            {/* {console.log(prog.id)} */}
                                            <td className="text-center my-1">
                                                <img style={{ borderRadius: '50%', borderStyle: '5px solid red', width: "80px", height: "80px" }} src={stu.get_image_url} alt="NoImg" />
                                            </td>
                                            <td>{stu.first_name}</td>
                                            <td>{stu.last_name}</td>
                                            <td>{stu.email}</td>
                                            <td>{stu.mobile}</td>
                                            <td>{stu.city}</td>
                                            <td>{stu.country}</td>
                                            <td>{stu.study}</td>
                                            <td>{stu.institution}</td>
                                            <td>{stu.activated ? 'Yes' : 'No'}</td>
                                            <td>{stu.student_status}</td>
                                            <td>{stu.student_batch}</td>
                                            {/* <Button onClick={() => handleDelete(stu.id)}>Delete</Button> */}
                                            {/* <td><textarea type="text"
                                                rows="6"
                                                className="form-control"

                                                variant='outlined'
                                                color='secondary'
                                                name='solution' */}

                                            {/* onChange={event => setSolution(event.target.value)} */}
                                            {/* value={solution} */}

                                            {/* /></td> */}
                                            {/* <td><button type="submit" onClick={event => handleSubmit(event, prog.id)}>Update</button></td> */}
                                            {/* <td>{session.topics}</td> */}
                                            {/* <td>{session.password}</td> */}
                                            {/* <td>{session.email}</td> */}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                        ) : (
                            <p> No new student</p>
                        )
                    }

                </Row>
                {/* <div>
                    <h3 className='text-center'>List of New Students</h3>
                    <ul>
                        {studentsData &&
                            studentsData.map(({ id, first_name, last_name, email, mobile, city, country, study, institution, activated, student_status }) => (
                                <li key={id}>
                                    <p> FN: {first_name},  {'   '} LN: {last_name}, {'   '} Email: {email}, {' '} Mobile: {mobile},{' '} City: {city},{' '} Country: {country},{' '} Study: {study},{' '} College: {institution}, {''} Active: {activated ? 'True' : 'False'}, {''} Status:{student_status}
                                      
                                    </p>
                                </li>

                            ))}
                    </ul>
                </div> */}

                <Button
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={props.onClose}
                >
                    Exit
                </Button>
                {/* </Box> */}

            </Container>
        </ThemeProvider >
    )
}
