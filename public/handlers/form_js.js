const fs = require('fs');

module.exports = form_js;

function form_js(req, res, payload, cb) {
    read_form_js(function(data) {
        cb(null, data, 'text/html');
    });
}

function read_form_js(callback) {
    fs.readFile("./public/form.js", "utf8", function (err, data) {
        if (err) {
            console.log("ReadFile error");
        }
        else {
            callback(data);
        }
    });
}