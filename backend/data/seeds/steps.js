
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('steps').del().truncate()
    .then(function () {
      // Inserts seed entries
      return knex('steps').insert([
        { stepName: 'Breathe', stepNumber: 1, post_id: 1 },
        { stepName: 'Do something you enjoy', stepNumber: 2, post_id: 1 },
        { stepName: 'Go on a walk', stepNumber: 3, post_id: 1 },
      ]);
    });
};
