const db = require('../connection/db');

class StudentQuries{

    async getAllStudents(){
        const selectResponse = await db('students').select('*').orderBy('student_id');
        return selectResponse;
    }

    async getSpecificStudent(student_id){
        const selectResponse = await db('students').select('*').where('student_id', '=', student_id);
        return selectResponse[0];
    }

    async getSpecificStudentByName(student_name){
        const selectResponse = await db('students').select('*').where('student_name', '=', student_name);
        return selectResponse[0];
    }

    async addStudent(student_name, student_contact){
        const insertResponse = await db('students').insert({
            student_name,
            student_contact
        }).returning("*");
        // console.log(insertResponse[0]);
        return insertResponse[0];
    }

    async editStudent(student_id, student_name, student_contact){
        const editResponse = await db('students').where('student_id', '=', student_id)
        .update({
            student_name, student_contact
        }).returning('*');
        return editResponse[0];
    }

}

module.exports = new StudentQuries();