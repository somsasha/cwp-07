const fs = require('fs');

module.exports = index_html;

function index_html(req, res, payload, cb) {
    read_index_html(function(data) {
        cb(null, data, 'text/html');
    });
}

function read_index_html(callback) {
    fs.readFile("./public/index.html", "utf8", function (err, data) {
        if (err) {
            console.log("ReadFile error");
        }
        else {
            callback(data);
        }
    });
}