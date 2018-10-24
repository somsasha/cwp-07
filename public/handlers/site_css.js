const fs = require('fs');

module.exports = site_css;

function site_css(req, res, payload, cb) {
    read_site_css(function(data) {
        cb(null, data, 'text/html');
    });
}

function read_site_css(callback) {
    fs.readFile("./public/site.css", "utf8", function (err, data) {
        if (err) {
            console.log("ReadFile error");
        }
        else {
            callback(data);
        }
    });
}