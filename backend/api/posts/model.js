const db = require('../../data/dbConfig');

function findById(id) {
    return db('posts').where('id', id);
}

function getPosts() {
    return db('posts');
}

async function insertPost(postData) {
    const [ newPostId ] = await db('posts').insert(postData);

    const newPost = findById(newPostId);

    return Promise.resolve(newPost);
}

module.exports = {
    findById,
    getPosts,
    insertPost
}