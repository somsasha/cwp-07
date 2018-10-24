const fs = require('fs');

module.exports = index_js;

function index_js(req, res, payload, cb) {
    read_index_js(function(data) {
        cb(null, data, 'text/html');
    });
}

function read_index_js(callback) {
    fs.readFile("./public/app.js", "utf8", function (err, data) {
        if (err) {
            console.log("ReadFile error");
        }
        else {
            callback(data);
        }
    });
}