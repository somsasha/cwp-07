const fs = require('fs');
let logs = require("./logs.json");

module.exports = out;

function out(req, res, payload, cb) {
    let d = new Date();
    let result;
    result = logs;
    cb(null, result);
    logs.push({date : d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate() + "-" + d.getHours() + ":" + d.getMinutes(), msg : "logs uploaded"});
    fs.writeFile("./logs.json", JSON.stringify(logs), "utf8", function () { });   
}