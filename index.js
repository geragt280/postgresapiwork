const express = require('express');
const cors = require('cors');
const pool = require('./connection/db');
const bookRouter = require('./routes/book');
const studentRouter = require('./routes/students');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/books',bookRouter);
app.use('/students', studentRouter)

app.get('/', (req, res) => {
    req.send('Hello world');
});


app.listen(5000, () => {
    console.log('listening to http://localhost:5000');
})