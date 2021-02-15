
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('likes').del()
    .then(function () {
      // Inserts seed entries
      return knex('likes').insert([
        { post_id: 1, user_id: 1 },
        { post_id: 1, user_id: 2 },
      ]);
    });
};
