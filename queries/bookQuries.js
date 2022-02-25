const db = require('../connection/db');

class BookQuries{

    async getAllBooks(){
        const selectResponse = await db('books').select('*');
        return selectResponse;
    }

    async addBook(book_name, book_author){
        const insertResponse = await db('books').insert({
            book_name,
            book_author
        }).returning('*').toString();
        return insertResponse;
    }

    editBook(){

    }

}

module.exports = new BookQuries();