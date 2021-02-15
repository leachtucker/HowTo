const db = require('../../data/dbConfig');

// Returns an array of all steps
function get() {
    return db('steps');
}

function findById(step_id) {
    return db('steps').where({ step_id }).first();
}

async function insert(stepData) {
    const [ newStepId ] = await db('steps').insert(stepData).returning('step_id');

    if(!newStepId) {
        return Promise.reject(null);
    }

    const newStep = await findById(newStepId);

    return Promise.resolve(newStep);
}

async function update(step_id, changes) {
    const changedRecords = await db('steps').where({ step_id }).update(changes);

    if (!changedRecords) {
        return Promise.reject(null);
    }

    const updatedStep = await findById(step_id);

    return Promise.resolve(updatedStep);
}

module.exports = {
    get,
    findById,
    insert,
    update
}