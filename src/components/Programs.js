import * as React from 'react';
import { useState, useEffect } from 'react'
import axios from 'axios';
// import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
// import MiscellaneousServicesOutlinedIcon from '@mui/icons-material/MiscellaneousServicesOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';


export default function Programs(props) {
    const [programNumber, setProgramNumber] = useState(0)
    // const [sessionDate, setSessionDate] = useState("")
    const [task, setTask] = useState('')
    const [programData, setProgramData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [batchData, setBatchData] = useState(null);

    const [batch, setBatch] = useState('');

    const programsUrl = (process.env.REACT_APP_SERVER) ? `https://coaching-q9o7.onrender.com/programs/` : `http://localhost:3001/programs/`
    const programAddUrl = (process.env.REACT_APP_SERVER) ? `https://coaching-q9o7.onrender.com/programs/` : `http://localhost:3001/programs/`
    const programDelUrl = (process.env.REACT_APP_SERVER) ? `https://coaching-q9o7.onrender.com/programs/` : `http://localhost:3001/programs/`
    const programSendUrl = (process.env.REACT_APP_SERVER) ? `https://coaching-q9o7.onrender.com/student_programs/` : `http://localhost:3001/student_programs/`
    const batchUrl = (process.env.REACT_APP_SERVER) ? `https://coaching-q9o7.onrender.com/students/getbatch` : `http://localhost:3001/students/getbatch`

    const jwt = localStorage.getItem('token');

    const getBatch = (batch) => {
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
    const getPrograms = () => {
        axios.get(programsUrl, {
            headers: { Authorization: `Bearer ${jwt}` },
        })
            .then(response => {
                console.log('prog.dat', response.data)
                setProgramData(response.data)
                console.log('prog', programData)
            })
    }
    useEffect(() => {

        getPrograms()
        { getBatch() }
    }, [])


    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(
                programDelUrl + id
            );
            getPrograms()
            setError(null);
        } catch (err) {
            // console.log('e', err.message)
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    const handleSendTask = async (progNum, task) => {
        for (var i = 0; i < batchData.length; i++) {
            try {
                let response = await axios.post(programSendUrl,
                    // "https://email-finder.herokuapp.com/find",
                    {
                        student_id: batchData[i].id,
                        program_number: progNum,
                        task: task,
                        solution: ""
                    }
                );
                if (response.status === 500) {
                    alert('This program already sent')
                } else {
                    console.log(response.data);
                }
            } catch (error) {
                alert('This program already sent')
                console.log("no email found ", i);
            }
            console.log("axios request done");
        }
    };
    // const handleSendTask = async (id) => {

    // batchData &&
    // batchData.map(({ id, email }) => (
    // <li key={id}>
    //     <h5>{id} {email} </h5>
    // </li>




    // let student_program = {
    //     student_id: id,
    //     program_number: programNumber,
    //     task: task,
    // }
    // try {
    // let response = await axios.post(
    // programSendUrl, student_program
    // )
    // setError(null);
    // } catch (err) {
    // console.log('e', err.message)
    // setError(err.message);
    // } finally {
    // setLoading(false);
    // }

    // ))
    // }

    const handleProgramSubmit = (e) => {
        e.preventDefault();
        const program = {
            // student_id: id,
            program_number: programNumber,
            task: task,
        }
        axios.post(programAddUrl, program, {
            headers: { Authorization: `Bearer ${jwt}` },
        })
            .then(response => {
                if (response.status === 201) {
                    setProgramNumber(programNumber + 1)
                    setTask('')
                    getPrograms()
                }
                else {
                    alert('Program number should be unique')
                }
            }).catch((error) => {
                if (error.response) {
                    alert('Program number should be unique')
                    // console.log('err', error.response.data); // => the response payload 
                }
            });

    };

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
                        Add/Delete Your Program Details
                    </Typography>

                    <hr></hr>
                    Give batch number to send the program exercises to students
                    <TextField
                        required
                        // fullWidth
                        type="number"
                        // id="duration"
                        label="Batch Number"
                        value={batch}
                        onChange={event => {
                            setBatch(event.target.value)
                        }}
                    />
                    <Button variant="contained" sx={{ mt: 2, mb: 1 }} onClick={() => getBatch(batch)}>Show batch List</Button>
                    <Typography component="div" variant="subtitle1">
                        <ul>
                            {batchData &&
                                batchData.map(({ id, email }) => (
                                    <li key={id}>
                                        <h5>{id} {email} </h5>
                                    </li>

                                ))}

                        </ul>
                    </Typography>
                    <hr></hr>
                    <Typography component="div" variant="subtitle1">
                        <ul>
                            {programData &&
                                programData.map(({ id, program_number, task }) => (
                                    <li key={id}>
                                        <h5> {program_number}, {'   '}  {task} <Button onClick={() => handleDelete(id)}>Delete</Button><Button onClick={() => handleSendTask(program_number, task)}>Send Task</Button></h5>
                                    </li>

                                ))}

                        </ul>
                    </Typography>
                </Box>
                {/* batchData.map( ( {id} )=>(
                console.log(student.id)) */}
                <Box component="form" noValidate onSubmit={handleProgramSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={6} sm={3} md={2}>
                            <TextField
                                required
                                fullWidth
                                type="number"
                                // id="service_name"
                                label="Program Number"
                                value={programNumber}
                                onChange={event => {
                                    setProgramNumber(event.target.value)
                                }}
                            />
                        </Grid>
                        {/* <Grid item xs={6} sm={3} md={2}>
                            <TextField
                                required
                                fullWidth
                                type="date"
                                // id="duration"
                                label="Session Date"
                                value={sessionDate}
                                onChange={event => {
                                    setSessionDate(event.target.value)
                                }}
                            />
                        </Grid> */}
                        <Grid item xs={24} sm={12} md={8}>
                            <TextField
                                required
                                fullWidth
                                // id="price"
                                label="Task"
                                value={task}
                                onChange={event => {
                                    setTask(event.target.value)
                                }}
                            />
                        </Grid>


                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Add
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