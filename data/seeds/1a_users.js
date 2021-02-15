
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { username: "Bob", password: "askldj askldjklsajdlkasj dklsajkldjaskljdsklajdklasjkldjsa!@#!@$!" },
        { username: "Rick", password: "sd SADSALK@#$IO!KL@ !@$KL!M<SFA!@#!@$!" },
      ]);
    });
};
