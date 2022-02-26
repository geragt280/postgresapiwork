const db = require('../connection/db');

class BookQuries{

    async getAllBooks(){
        const selectResponse = await db('books').select('*').orderBy('book_id');
        return selectResponse;
    }

    async getSpecificBook(book_id){
        const selectResponse = await db('books').select('*').where('book_id', '=', book_id);
        return selectResponse[0];
    }

    async getSpecificBookByName(book_name){
        const selectResponse = await db('books').select('*').where('book_name', '=', book_name);
        return selectResponse[0];
    }

    async addBook(book_namer, book_authorr){
        const insertResponse = await db('books').insert({
            book_name: book_namer,
            book_author: book_authorr
        }).returning("*");
        // console.log(insertResponse[0]);
        return insertResponse[0];
    }

    async editBook(book_id, book_name, book_author){
        const editResponse = await db('books').where('book_id', '=', book_id)
        .update({
            book_name, book_author
        }).returning('*');
        return editResponse[0];
    }

}

module.exports = new BookQuries();