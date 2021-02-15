const db = require('../../data/dbConfig');

function getUsers () {
    return db('users')
        .select('users.id', 'users.username');
}

async function insertUser (userData) {
    const [ newUserId ] = await db('users').insert(userData).returning('user_id');

    if (!newUserId) {
        return Promise.resolve(null);
    }

    const [ newUser ] = await db('users').where('user_id', newUserId).select('user_id', 'username');
    return Promise.resolve(newUser);
}

function findUserByUsername(username) {
    return db('users')
        .where('username', username)
        .first();
}

function findUserById (id) {
    return db('users')
        .where('user_id', id)
        .first();
}


module.exports = {
    getUsers,
    insertUser,
    findUserByUsername,
    findUserById
}