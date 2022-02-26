const express = require('express');
const cors = require('cors');
// const pool = require('./connection/db');
const bookRouter = require('./routes/book');
const studentRouter = require('./routes/students');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/books',bookRouter);
app.use('/students', studentRouter)

app.get('/', (req, res) => {
    res.send('use main link as localhost:5000/ \n with books to managa books and students to manage students.'
    + ' \n e.g: localhost:5000/books \n localhost:5000/books/addbook or editbook  \n localhost:5000/students \n localhost:5000/students/addstudent or editstudents ');
});


app.listen(5000, () => {
    console.log('listening to http://localhost:5000');
})