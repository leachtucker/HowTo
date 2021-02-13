const db = require('../../data/dbConfig');

// Returns an array of all steps
function get() {
    return db('steps');
}

module.exports = {
    get
}