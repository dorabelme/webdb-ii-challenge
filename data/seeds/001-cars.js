
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cars').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cars').insert([
        { VIN: '1234567890', make: 'Tesla', model: 'Model 3', mileage: '100', 'transmission type': 'automatic' },
        { VIN: '3456782345', make: 'Tesla', model: 'Model S', mileage: '0', 'transmission type': 'automatic', 'status of the title': 'new'},
        { VIN: '6789456326', make: 'Tesla', model: 'Model X', mileage: '50', 'transmission type': 'automatic' },

      ]);
    });
};
