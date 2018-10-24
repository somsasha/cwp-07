const fs = require('fs');
let articles = require("../articles.json");
let logs = require("../../logs.json");
module.exports = update;

function update(req, res, payload, cb) {
    let d = new Date();
    if (payload.id !== undefined) {
        ExistID(payload.id).then(
            exist => {
                for (i = 0; i < articles.length; i++) {
                    if (articles[i].id == payload.id) {
                        if (payload.title !== undefined)
                            articles[i].title = payload.title;
                        if (payload.text !== undefined)
                            articles[i].text = payload.text;
                        if (payload.author !== undefined)
                            articles[i].author = payload.author;
                        if (payload.date !== undefined)
                            articles[i].date = payload.date;
                        let result = articles[i];
                        fs.writeFile("./articles/articles.json", JSON.stringify(articles), "utf8", function () {
                        });
                        cb(null, "update");
                        logs.push({date : d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate() + "-" + d.getHours() + ":" + d.getMinutes(), msg : "updated"});
                        fs.writeFile("./logs.json", JSON.stringify(logs), "utf8", function () { });                        
                    }
                }
            },
            error => {
                cb({code: 404, message: 'Not found'});
                logs.push({date : d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate() + "-" + d.getHours() + ":" + d.getMinutes(), msg : "error"});
                fs.writeFile("./logs.json", JSON.stringify(logs), "utf8", function () { });                
            }
        )
    }
    else {
        cb(null, "{code: 400, message: Request invalid}");
        logs.push({date : d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate() + "-" + d.getHours() + ":" + d.getMinutes(), msg : "error"});
        fs.writeFile("./logs.json", JSON.stringify(logs), "utf8", function () { });        
    }
}

function ExistID(id) {
    return new Promise((resolve, reject) => {
        let exist = 0;
        for (i = 0; i < articles.length; i++) {
            if (articles[i].id == id) {
                resolve("exist");
                exist = 1;
            }
            if (i == articles.length && exist == 0) {
                reject("error");
            }
        }
    })
}