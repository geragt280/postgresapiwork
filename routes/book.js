const express = require('express');
const pool = require('../connection/db');
const bookRouter = express.Router();
const BookQuries = require('../queries/bookQuries');

// middleware that is specific to this router
bookRouter.use((req, res, next) => {
  console.log('Book manupulate Time: ', new Date().toISOString());
  next();
})
// define the home page route
bookRouter.get('/', async (req, res) => {
    try {
        const allbooks = await BookQuries.getAllBooks();
        // const allbooks = await pool.query(`SELECT * FROM books`);
        res.status(200).json({
            status:200,
            response: allbooks,
            type: "SELECT",
            message: 'data successfully selected'
        });
    } catch (error) {
        res.status(400).json({
            status: 400,
            reponse: error.message,
        });
    }
});
bookRouter.get('/:id', async (req, res) => {
    try {
        // const singlebooks = await pool.query(`SELECT * FROM books WHERE book_id=${req.params.id}`);
        res.status(200).json({
            status:200,
            response: singlebooks.rows,
            type: singlebooks.command,
            message: 'specific data successfully selected'
        });
    } catch (error) {
        res.status(400).json({
            status: 400,
            reponse: error.message,
        });
    }
})
// define the about route
bookRouter.post('/addbook', async (req, res) => {
    try {
        console.log(req.body);
        const { book_name, book_author } = req.body;
        const newbook = await BookQuries.addBook(book_name, book_author);
        // const newbook = await pool.query(`INSERT INTO books (book_name, book_author) VALUES ('${book_name}', '${book_author}') RETURNING *;`);
        // res.send('Book added:', newbook.rows[0]);
        res.status(200).json({
            status: 200,
            reponse: newbook,
            type: "INSERT",
            message: 'data successfully inserted'
        });
    } catch (error) {
        res.status(400).json({
            status: 400,
            reponse: error.message,
        });
    }
});

bookRouter.put('/editbook', async (req, res) => {
    try {
        console.log(req.body);
        const { book_id, book_name, book_author } = req.body;
        // const editbook = await pool.query(`UPDATE books
        // SET book_name = '${book_name}',
        // book_author = '${book_author}'
        // WHERE book_id=${book_id} RETURNING *;`);
        res.status(200).json({
            status:200,
            response: editbook.rows[0],
            type: editbook.command,
            message: 'data successfully updated'
        });
    } catch (error) {
        res.status(400).json({
            status: 400,
            reponse: error.message,
        });
    }
})

module.exports = bookRouter;