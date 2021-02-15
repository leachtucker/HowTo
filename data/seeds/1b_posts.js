
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('posts').del()
    .then(function () {
      // Inserts seed entries
      return knex('posts').insert([
        { title: 'How To Relax', description: 'Relaxing can be hard. Use these steps from a relaxation guru to level up!', materials: 'Just yourself', instructions: 'Follow the listed steps', user_id: 1 }
      ]);
    });
};
