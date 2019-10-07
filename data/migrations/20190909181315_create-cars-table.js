
exports.up = function (knex) {
    // the change we want to make to our schema
    return knex.schema.createTable('cars', tbl => {
        tbl.increments();
        tbl.string('VIN')
            .unique()
            .notNullable();
        tbl.string('make', 40)
            .notNullable();
        tbl.string('model', 40)
            .notNullable();
        tbl.string('mileage')
            .notNullable();
        tbl.string('transmission type');
        tbl.string('status of the title');
    })
};

exports.down = function (knex) {
    // undoing that change
    return knex.schema.dropTableIfExists('cars');
  
};
