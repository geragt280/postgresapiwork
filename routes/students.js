const express = require('express');
const pool = require('../connection/db');

const studentRouter = express.Router();

studentRouter.use((req, res, next) =>{
    console.log('Student manupulate Time: ', new Date().toISOString());
    next();
});


studentRouter.get('/',async (req, res) => {
    try {
        const student = await pool.query('SELECT * FROM students ORDER BY student_id;');
        res.status(200).json({
            status: 200,
            response: student.rows,
            type:student.command,
            message: 'students selected'
        });
    } catch (error) {
        res.status(400).json({
            status: 400,
            response: error.message,
        });
    }
});

studentRouter.get('/:student_id',async (req, res) => {
    try {
        const student = await pool.query(`SELECT * FROM students WHERE student_id=${req.params.student_id};`);
        res.status(200).json({
            status: 200,
            response: student.rows[0],
            type:student.command,
            message: 'specific student selected'
        });
    } catch (error) {
        res.status(400).json({
            status: 400,
            response: error.message,
        });
    }
});

studentRouter.post('/addstudent',async (req, res) => {
    try {
        const { student_name, student_contact } = req.body;
        const student = await pool.query(`INSERT INTO students (student_name, student_contact) VALUES ('${student_name}', '${student_contact}') RETURNING *;`);
        res.status(200).json({
            status: 200,
            response: student.rows[0],
            type:student.command,
            message: 'student information inserted'
        });
    } catch (error) {
        res.status(400).json({
            status: 400,
            response: error.message,
        });
    }
});

studentRouter.put('/editstudent',async (req, res) => {
    try {
        const { student_id, student_name, student_contact } = req.body;
        const student = await pool.query(`UPDATE students SET student_name = '${student_name}', student_contact = '${student_contact}' WHERE student_id=${student_id} RETURNING *;`);
        res.status(200).json({
            status: 200,
            response: student.rows,
            type:student.command,
            message: 'student information updated'
        });
    } catch (error) {
        res.status(400).json({
            status: 400,
            response: error.message,
        });
    }
});


module.exports = studentRouter;