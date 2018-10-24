const fs = require('fs');
let articles = require("../articles.json");
let logs = require("../../logs.json");
module.exports = read;

function read(req, res, payload, cb) {
    let d = new Date();
    let result;
    for (i = 0; i < articles.length; i++) {
        if (articles[i].id == payload.id) {
            result = articles[i];
        }
    }
    cb(null, result);
    logs.push({date : d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate() + "-" + d.getHours() + ":" + d.getMinutes(), msg : "readed"});
    fs.writeFile("./logs.json", JSON.stringify(logs), "utf8", function () { });    
}