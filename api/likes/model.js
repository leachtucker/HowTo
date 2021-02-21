const db = require('../../data/dbConfig');

function get() {
    return db('likes');
}

function findByPostId(post_id) {
    return db('likes').where({ post_id }).first();
}

function findByUserId(user_id) {
    return db('likes').where({ user_id });
}

function findByPostUser(post_id, user_id) {
    return db('likes').where({ post_id, user_id }).first();
}

async function insert(post_id, user_id) {
    const newLike = await db('likes').insert({ user_id: user_id, post_id: post_id }).returning('*');

    console.log(newLike)

    if (!newLike) {
        Promise.reject(null);
    }

    return Promise.resolve(newLike);
}

async function del(post_id, user_id) {
    const delRecords = await db('likes').where({ post_id, user_id }).delete();

    if (!delRecords) {
        return Promise.resolve(false);
    }

    return Promise.resolve(true)
}

module.exports = {
    get,
    findByPostId,
    findByUserId,
    findByPostUser,
    insert,
    del
}