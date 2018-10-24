const h_create = require('./create');
const h_delete = require('./delete');

module.exports = {
    create,
    delet
};

function create(req, res, payload, cb) {
    h_create(req, res, payload, cb);
}

function delet(req, res, payload, cb) {
    h_delete(req, res, payload, cb);
}