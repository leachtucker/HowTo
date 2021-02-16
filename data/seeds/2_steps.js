
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('steps').del()
    .then(function () {
      // Inserts seed entries
      return knex('steps').insert([
        { step_name: 'Breathe', step_number: 1, post_id: 1 },
        { step_name: 'Do something you enjoy', step_number: 2, post_id: 1 },
        { step_name: 'Go on a walk', step_number: 3, post_id: 1 },
      ]);
    });
};
