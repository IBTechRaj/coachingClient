import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './test.css'

export default function Test() {
    let i = 0
    const questions = [
        {
            questionText: 'What is the C built in library function to find the length of a string?',
            answerOptions: [
                { answerText: 'strcmp()', isCorrect: false },
                { answerText: 'strcat()', isCorrect: false },
                { answerText: 'strlen()', isCorrect: true },
                { answerText: 'strfindlen()', isCorrect: false },
            ],
        },
        {
            questionText: 'The symbols used to comment multiple lines in a C program source code?',
            answerOptions: [
                { answerText: '///', isCorrect: false },
                { answerText: '/* ... */', isCorrect: true },
                { answerText: '//', isCorrect: false },
                { answerText: '#', isCorrect: false },
            ],
        },
        {
            questionText: 'The for... loop is used to ?',
            answerOptions: [
                { answerText: 'execute a line or block of code multiple times', isCorrect: true },
                { answerText: 'execute a block of code once', isCorrect: false },
                { answerText: 'skip several lines of code', isCorrect: false },
                { answerText: 'quit the program', isCorrect: false },
            ],
        },
        {
            questionText: 'What is an array in a C program?',
            answerOptions: [
                { answerText: 'a list of numbers', isCorrect: false },
                { answerText: 'a group of alphabets', isCorrect: false },
                { answerText: 'a group of words written in a sorted order', isCorrect: false },
                { answerText: 'is used to store more than one data items of similar type', isCorrect: true },
            ],
        },
        {
            questionText: 'What does the library function malloc() do?',
            answerOptions: [
                { answerText: 'it initializes memory to 0', isCorrect: false },
                { answerText: 'it allocates memory', isCorrect: true },
                { answerText: 'it adds more memory', isCorrect: false },
                { answerText: 'none of the above', isCorrect: false },
            ],
        },
        {
            questionText: 'What is type casting in C ?',
            answerOptions: [
                { answerText: 'it is the process of converting one data type to another data type ', isCorrect: true },
                { answerText: 'it is the process of defining a data type', isCorrect: false },
                { answerText: 'it is the process of combing all data types into one', isCorrect: false },
                { answerText: 'none of the above', isCorrect: false },
            ],
        },
        {
            questionText: 'What is a pointer in C ?',
            answerOptions: [
                { answerText: 'it is a variable that points to the starting point of the program ', isCorrect: false },
                { answerText: 'it is a construct which enables inserting more than one decimal in a number', isCorrect: false },
                { answerText: 'A pointer is a variable that stores the memory address of another variable as its value', isCorrect: true },
                { answerText: 'none of the above', isCorrect: false },
            ],
        },
        {
            questionText: 'What are format specifiers in C ?',
            answerOptions: [
                { answerText: 'Format specifiers are used only to input data in a specific format ', isCorrect: false },
                { answerText: 'Format specifiers are used to input or output data in a specified format', isCorrect: true },
                { answerText: 'Format specifiers are used only to output data in a specified format', isCorrect: false },
                { answerText: 'Format specifiers have nothing to do with input or output', isCorrect: false },
            ],
        },
        {
            questionText: 'How do you create a new data type in C ?',
            answerOptions: [
                { answerText: 'By using the keyword Deftype ', isCorrect: false },
                { answerText: 'By using the keyword Typedef', isCorrect: true },
                { answerText: 'Bu using some special definitions', isCorrect: false },
                { answerText: 'We cannot create new data type in C', isCorrect: false },
            ],
        },
        {
            questionText: 'What will a Return statement do in a C program ?',
            answerOptions: [
                { answerText: 'It closes the program execution ', isCorrect: false },
                { answerText: 'It starts executing again the block of code from which it is called', isCorrect: false },
                { answerText: 'It causes the program to halt temporarily', isCorrect: false },
                { answerText: 'It ends the execution of a function, and returns control to the calling function.', isCorrect: true },
            ],
        },
    ];

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [score, setScore] = useState(0);

    const handleAnswerOptionClick = (isCorrect) => {
        if (isCorrect) {
            setScore(score + 1);
        }

        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questions.length) {
            setCurrentQuestion(nextQuestion);
        } else {
            setShowScore(true);
        }
    };
    return (
        <Container className="py-5">
            <div className="app py-5">

                {showScore ? (
                    <div className='score-section py-5'>
                        You scored {score} out of {questions.length}
                    </div>
                ) : (
                    <>
                        <div className='question-section py-5'>
                            <div className='question-count py-5'>
                                <span>Question {currentQuestion + 1}</span>/{questions.length}
                            </div>
                            <div className='question-text'>{questions[currentQuestion].questionText}</div>
                        </div>
                        <div className='answer-section'>
                            {questions[currentQuestion].answerOptions.map((answerOption) => (
                                <button key={i++} onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}>{answerOption.answerText}</button>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </Container>
    );
}