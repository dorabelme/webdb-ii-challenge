
exports.up = function (knex) {
    // the change we want to make to our schema
    return knex.schema.createTable('cars', tbl => {
        tbl.increments();
        tbl.text('VIN')
            .unique()
            .notNullable();
        tbl.text('make', 40)
            .notNullable();
        tbl.text('model', 40)
            .notNullable();
        tbl.text('mileage')
            .notNullable();
        tbl.text('transmission type');
        tbl.text('status of the title');
    })
};

exports.down = function (knex) {
    // undoing that change
    return knex.schema.dropTableIfExists('cars');
  
};
