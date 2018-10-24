const fs = require('fs');

module.exports = form_html;

function form_html(req, res, payload, cb) {
    read_form_html(function(data) {
        cb(null, data, 'text/html');
    });
}

function read_form_html(callback) {
    fs.readFile("./public/form.html", "utf8", function (err, data) {
        if (err) {
            console.log("ReadFile error");
        }
        else {
            callback(data);
        }
    });
}