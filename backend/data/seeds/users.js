
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del().truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { username: 'bob', password: 'bob1234' },
        { username: 'john', password: 'john1234' }
      ]);
    });
};
