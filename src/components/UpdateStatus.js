
import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';
// import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
// import TextField from '@mui/material/TextField';
// import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
// import MiscellaneousServicesOutlinedIcon from '@mui/icons-material/MiscellaneousServicesOutlined';
// import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

export default function UpdateStatus(props) {

    const [studentsData, setStudentsData] = useState(null);

    // const usersUrl = (process.env.REACT_APP_SERVER) ? `https://motorwash-backend-lfxt.onrender.com/list_users/` : `http://localhost:3001/list_users/`
    const studentsUrl = (process.env.REACT_APP_SERVER) ? `https://coaching-q9o7.onrender.com/students` : `http://localhost:3001/students`
    const studentUpdUrl = (process.env.REACT_APP_SERVER) ? `https://coaching-q9o7.onrender.com/students/` : `http://localhost:3001/students/`

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

    const handleUpdate = async (id) => {
        const jwt = localStorage.getItem('token');
        try {
            const response = await axios.patch(
                studentUpdUrl + id,
                { student_status: 1 },
                { headers: { "Authorization": `Bearer ${jwt}` } }
            )
            getUsers()
            // fetch(studentUpdUrl + id, {
            //     headers: {
            //         "Authorization": `Bearer ${jwt}`,
            //         "Accept": "application/json"
            //     },
            //     method: 'PATCH',
            //     status: 1
            // })


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
                <div>
                    <h3 className='text-center'>Update Payment</h3>
                    <h5 className='text-center py-5 fw-bolder'>This will update payment status and student status is set 1 (student in the current batch)</h5>
                    <ul>
                        {studentsData &&
                            studentsData.map(({ id, first_name, last_name, email, student_status }) => (
                                <li key={id}>
                                    <p> First Name: {first_name},  {'   '} Last Name: {last_name}, {'   '} Email: {email}, (' ') Status: {student_status} <Button onClick={() => handleUpdate(id)}>Update</Button>
                                    </p>
                                </li>

                            ))}
                    </ul>
                </div>

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
