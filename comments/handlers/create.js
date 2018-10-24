const fs = require('fs');
let articles = require("../../articles/articles.json");
let logs = require("../../logs.json");
module.exports = create;

function create(req, res, payload, cb) {
    let d = new Date();
    let exist = 0;
    if (payload.articleId !== undefined || payload.text !== undefined || payload.author !== undefined) {
        for (i = 0; i < articles.length; i++) {
            if (articles[i].id == payload.articleId) {
                payload.id = articles[i].comment.length == undefined ? 1 : (articles[i].comment.length);
                payload.date = d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate();
                articles[i].comment.push(payload);
                exist = 1;
                fs.writeFile("./articles/articles.json", JSON.stringify(articles), "utf8", function () { });
                cb(null, "created");
                logs.push({date : d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate() + "-" + d.getHours() + ":" + d.getMinutes(), msg : "created"});
                fs.writeFile("./logs.json", JSON.stringify(logs), "utf8", function () { });                
            }
            if (i == articles.length && exist == 0) {
                cb({code: 404, message: 'Not found'});
                logs.push({date : d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate() + "-" + d.getHours() + ":" + d.getMinutes(), msg : "error"});
                fs.writeFile("./logs.json", JSON.stringify(logs), "utf8", function () { });                
            }
        }
    }
    else {
        cb(null, "{code: 400, message: Request invalid}");
        logs.push({date : d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate() + "-" + d.getHours() + ":" + d.getMinutes(), msg : "error"});
        fs.writeFile("./logs.json", JSON.stringify(logs), "utf8", function () { });        
    }
}