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
    const [ newLikeId ] = await db('likes').insert({ user_id, post_id }).returning('like_id');

    if (!newLikeId) {
        Promise.reject(null);
    }

    const newLike = await db('likes').where({ like_id: newLikeId });

    return Promise.resolve(newLike);
}

module.exports = {
    get,
    findByPostId,
    findByUserId,
    findByPostUser,
    insert
}