const h_readall = require('./readall');
const h_create = require('./create');
const h_delete = require('./delete');
const h_read = require('./read');
const h_update = require('./update');

module.exports = {
    readall,
    read,
    create,
    update,
    delet
};

function read(req, res, payload, cb) {
    h_read(req, res, payload, cb);
}

function readall(req, res, payload, cb) {
    h_readall(req, res, payload, cb);
}

function create(req, res, payload, cb) {
    h_create(req, res, payload, cb);
}

function update(req, res, payload, cb) {
    h_update(req, res, payload, cb);
}

function delet(req, res, payload, cb) {
    h_delete(req, res, payload, cb);
}