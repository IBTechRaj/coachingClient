import * as React from 'react';
import { useState, useEffect } from 'react'
import axios from 'axios';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';


export default function Batch(props) {
    // const [sessionNumber, setSessionNumber] = useState("")
    // const [sessionDate, setSessionDate] = useState("")
    // const [topics, setTopics] = useState("0")
    const [batchData, setBatchData] = useState(null);
    const [email, setEmail] = useState('');
    const [batch, setBatch] = useState('');


    const batchUrl = (process.env.REACT_APP_SERVER) ? `https://coaching-q9o7.onrender.com/students/getbatch` : `http://localhost:3001/students/getbatch`
    const batchUpdUrl = (process.env.REACT_APP_SERVER) ? `https://coaching-q9o7.onrender.com/students/update_batch` : `http://localhost:3001/students/update_batch`
    // const batchGetUrl = (process.env.REACT_APP_SERVER) ? `https://coaching-q9o7.onrender.com/students/get_student` : `http://localhost:3001/students/get_student`
    // const courseAddUrl = (process.env.REACT_APP_SERVER) ? `https://coaching-q9o7.onrender.com/courses/` : `http://localhost:3001/courses/`
    // const courseDelUrl = (process.env.REACT_APP_SERVER) ? `https://coaching-q9o7.onrender.com/courses/` : `http://localhost:3001/courses/`



    const jwt = localStorage.getItem('token');

    const getBatch = () => {
        const get_data = {
            student_batch: batch,
        }
        axios.get(batchUrl, {
            headers: { Authorization: `Bearer ${jwt}` },
            params: { student_batch: batch, }

        })
            .then(response => {
                console.log('rr', response)
                console.log('batch.dat', response.data)
                setBatchData(response.data)
                // console.log('course', courseData)
            })
    }
    // useEffect(() => {

    //     getBatch()
    // }, [])

    // const course = {
    //     session_number: sessionNumber,
    //     session_date: sessionDate,
    //     topics: topics,
    // }
    const data = {
        email: email,
        student_batch: batch,
    }
    const handleUpdate = async (e) => {
        e.preventDefault()
        console.log('e b', email, batch)
        const response = await axios.patch(
            batchUpdUrl, data,
            {
                headers: { Authorization: `Bearer ${jwt}` },
            })
            .then(response => {
                setEmail('')
                console.log('res', response.data)
            })

        getBatch()
    }

    const theme = createTheme();

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xl">
                <CssBaseline />



                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >

                    <Typography component="h1" variant="h5">
                        Add Students to a Batch
                    </Typography>

                    <hr></hr>
                    <TextField
                        required
                        fullWidth
                        type="number"
                        // id="duration"
                        label="Batch Number"
                        value={batch}
                        onChange={event => {
                            setBatch(event.target.value)
                        }}
                    />
                    <Typography component="div" variant="subtitle1">
                        <ul>
                            {batchData &&
                                batchData.map(({ id, student_batch, email, first_name }) => (
                                    <li key={id}>
                                        <h5>    {email} {'           '} {student_batch} </h5>
                                        {/* <Button onClick={() => handleUpdate(id)}>Update Batch</Button> */}
                                    </li>

                                ))}
                        </ul>
                    </Typography>
                </Box>

                <Box component="form" noValidate onSubmit={handleUpdate} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={6} sm={3} md={2}>
                            <TextField
                                required
                                fullWidth
                                type="text"
                                // id="service_name"
                                label="Email"
                                value={email}
                                onChange={event => {
                                    setEmail(event.target.value)
                                }}
                            />
                        </Grid>
                        {/* <Grid item xs={6} sm={3} md={2}>
                            <TextField
                                required
                                fullWidth
                                type="number"
                                // id="duration"
                                label="Batch Number"
                                value={batch}
                                onChange={event => {
                                    setBatch(event.target.value)
                                }}
                            />
                        </Grid> */}



                    </Grid>
                    {console.log('e b', email, batch)}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Update
                    </Button>
                    <Typography component="div" variant="subtitle1">
                        When you finish, click on Exit
                    </Typography>

                    <Button
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={props.onClose}
                    >
                        Exit
                    </Button>
                </Box>

            </Container>
        </ThemeProvider >
    )
}