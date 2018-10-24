const fs = require('fs');
let articles = require("../articles.json");
let logs = require("../../logs.json");
module.exports = delet;

function delet(req, res, payload, cb) {
    let d = new Date();
    ExistID(payload.id).then(
        exist => {
            articles.splice(articles.findIndex(index => index.id === payload.id), 1);
            fs.writeFile("./articles/articles.json", JSON.stringify(articles), "utf8", function () {
            });
            cb(null, {"msg": "Delete success"});
            logs.push({date : d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate() + "-" + d.getHours() + ":" + d.getMinutes(), msg : "deleted"});
            fs.writeFile("./logs.json", JSON.stringify(logs), "utf8", function () { });    
        },
        error => {
            cb({code: 404, message: 'Not found'});
            logs.push({date : d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate() + "-" + d.getHours() + ":" + d.getMinutes(), msg : "error"});
            fs.writeFile("./logs.json", JSON.stringify(logs), "utf8", function () { });    
        })
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