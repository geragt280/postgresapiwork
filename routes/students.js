const express = require('express');
const db = require('../connection/db');
const StudentQuries = require('../queries/studentQuries');

const studentRouter = express.Router();

studentRouter.use((req, res, next) =>{
    console.log('Student manupulate Time: ', new Date().toISOString());
    next();
});


studentRouter.get('/',async (req, res) => {
    try {
        const allstudents = await StudentQuries.getAllStudents();
        // const student = await pool.query('SELECT * FROM students ORDER BY student_id;');
        res.status(200).json({
            status: 200,
            response: allstudents,
            type:"SELECT",
            message: 'students successfully selected'
        });
    } catch (error) {
        res.status(400).json({
            status: 400,
            response: error.message,
        });
    }
});

studentRouter.get('/:student_id_name',async (req, res) => {
    try {
        var singlestudent = null;
        if (isNaN(req.params.student_id_name)) {
            singlestudent = await StudentQuries.getSpecificStudentByName(req.params.student_id_name);
        }
        else
            singlestudent = await StudentQuries.getSpecificStudent(req.params.student_id_name);
        // const student = await pool.query(`SELECT * FROM students WHERE student_id=${req.params.student_id};`);
        res.status(200).json({
            status: 200,
            response: singlestudent,
            type:"SELECT",
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
        if(student_name && student_contact){
            const newstudent = await StudentQuries.addStudent(student_name, student_contact);
            // const student = await pool.query(`INSERT INTO students (student_name, student_contact) VALUES ('${student_name}', '${student_contact}') RETURNING *;`);
            res.status(200).json({
                status: 200,
                response: newstudent,
                type:"INSERT",
                message: 'student information inserted'
            });
        }
        else{
            res.status(400).json({
                status: 400,
                response: "student_name, student_contact can not be empty",
            });
        }

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
        if (student_id && student_name && student_contact) {
            const editstudent = await StudentQuries.editStudent(student_id, student_name, student_contact);
            // const student = await pool.query(`UPDATE students SET student_name = '${student_name}', student_contact = '${student_contact}' WHERE student_id=${student_id} RETURNING *;`);
            res.status(200).json({
                status: 200,
                response: editstudent,
                type:"UPDATE",
                message: 'student information updated'
            });
        }
        else{
            res.status(400).json({
                status: 400,
                response: "student_id, student_name, student_contact can not be empty",
            });
        }
    } catch (error) {
        res.status(400).json({
            status: 400,
            response: error.message,
        });
    }
});


module.exports = studentRouter;