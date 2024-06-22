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


export default function Course(props) {
    const [sessionNumber, setSessionNumber] = useState("")
    const [sessionDate, setSessionDate] = useState("")
    const [topics, setTopics] = useState("")
    const [lessonVideo, setLessonVideo] = useState()
    const [courseData, setCourseData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const coursesUrl = (process.env.REACT_APP_SERVER) ? `https://coaching-q9o7.onrender.com/courses/` : `http://localhost:3001/courses/`
    const courseAddUrl = (process.env.REACT_APP_SERVER) ? `https://coaching-q9o7.onrender.com/courses/` : `http://localhost:3001/courses/`
    const courseDelUrl = (process.env.REACT_APP_SERVER) ? `https://coaching-q9o7.onrender.com/courses/` : `http://localhost:3001/courses/`


    const jwt = localStorage.getItem('token');

    const getCourses = () => {
        axios.get(coursesUrl, {
            headers: { Authorization: `Bearer ${jwt}` },
        })
            .then(response => {
                setCourseData(response.data)
            })
    }
    useEffect(() => {

        getCourses()
    }, [])
    const course = {
        session_number: sessionNumber,
        session_date: sessionDate,
        topics: topics,
        lesson_video: lessonVideo,
    }

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(
                courseDelUrl + id
            );
            getCourses()
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }
    const handleCourseSubmit = (e) => {
        e.preventDefault();

        axios.post(courseAddUrl, course, {
            headers: { Authorization: `Bearer ${jwt}` },
        })
            .then(response => {
                if (response.status === 201) {
                    setSessionNumber('')
                    setSessionDate('')
                    setTopics('')
                    setLessonVideo('')
                    getCourses()
                }
            })

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
                        Add/Delete Your Session Details
                    </Typography>

                    <hr></hr>
                    <Typography component="div" variant="subtitle1">
                        <ul>
                            {courseData &&
                                courseData.map(({ id, session_number, session_date, topics, lesson_video }) => (
                                    <li key={id}>
                                        <h5> Session: {session_number},  Date: {session_date} ,{'   '} topics: {topics},{' '} video link: {lesson_video} <Button onClick={() => handleDelete(id)}>Delete</Button></h5>
                                    </li>

                                ))}
                        </ul>
                    </Typography>
                </Box>

                <Box component="form" noValidate onSubmit={handleCourseSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={6} sm={3} md={2}>
                            <TextField
                                required
                                fullWidth
                                type="number"
                                // id="service_name"
                                label="Session Number"
                                value={sessionNumber}
                                onChange={event => {
                                    setSessionNumber(event.target.value)
                                }}
                            />
                        </Grid>
                        <Grid item xs={6} sm={3} md={2}>
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
                        </Grid>
                        <Grid item xs={24} sm={12} md={8}>
                            <TextField
                                required
                                fullWidth
                                // id="price"
                                label="Topics"
                                value={topics}
                                onChange={event => {
                                    setTopics(event.target.value)
                                }}
                            />
                        </Grid>
                        <Grid item xs={24} sm={12} md={8}>
                            <TextField
                                required
                                fullWidth
                                // id="price"
                                label="Lesson Video Link"
                                value={lessonVideo}
                                onChange={event => {
                                    setLessonVideo(event.target.value)
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