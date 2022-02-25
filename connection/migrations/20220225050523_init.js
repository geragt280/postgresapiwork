/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
    return knex.schema
    .createTable('books', function (table) {
       table.increments('book_id');
       table.string('book_name', 255).notNullable();
       table.string('book_author', 255).notNullable();
       table.timestamps(true, true);
    })
    .createTable('students', function (table) {
        table.increments('student_id');
        table.string('student_name', 255).notNullable();
        table.string('student_contact', 255).notNullable();
        table.timestamps(true, true);
     })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("books").dropTable("students");
};