const fs = require('fs');
let articles = require("../articles.json");
let logs = require("../../logs.json");

module.exports = create;

function create(req, res, payload, cb) {
    let d = new Date();
    if (payload.title !== undefined || payload.text !== undefined || payload.author !== undefined) {
        payload.id = articles.length + 1;
        payload.comment = [];
        payload.date = d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate();
        articles.push(payload);
        fs.writeFile("./articles/articles.json", JSON.stringify(articles), "utf8", function () {
        });
        cb(null, "created");
        logs.push({date : d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate() + "-" + d.getHours() + ":" + d.getMinutes(), msg : "created"});
        fs.writeFile("./logs.json", JSON.stringify(logs), "utf8", function () { });
    }
    else {
        cb(null, "{code: 400, message: Request invalid}");
        logs.push({date : d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate() + "-" + d.getHours() + ":" + d.getMinutes(), msg : "error"});
        fs.writeFile("./logs.json", JSON.stringify(logs), "utf8", function () { });
    }
}