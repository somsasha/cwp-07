const fs = require('fs');
let articles = require("../../articles/articles.json");
let logs = require("../../logs.json");
module.exports = delet;

function delet(req, res, payload, cb) {
    let d = new Date();
    ExistCommentID( payload.id, payload.articleId).then(
        exist => {
            fs.writeFile("./articles/articles.json", JSON.stringify(articles), "utf8", function () { });
            cb(null, {"msg": "Delete success"});
            logs.push({date : d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate() + "-" + d.getHours() + ":" + d.getMinutes(), msg : "deleted"});
            fs.writeFile("../../logs.json", JSON.stringify(logs), "utf8", function () { });            
        },
        error => {
            cb({code: 404, message: 'Not found'});
            logs.push({date : d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate() + "-" + d.getHours() + ":" + d.getMinutes(), msg : "error"});
            fs.writeFile("./logs.json", JSON.stringify(logs), "utf8", function () { });            
        })
}

function ExistCommentID(id, articleId) { 
    return new Promise((resolve, reject) => {
        let existArc = 0;
        let exist = 0;
        for (i = 0; i < articles.length; i++) {
            if (articles[i].id == articleId) {
                for (j = 0; j < articles[i].comment.length; j++) {
                    if (articles[i].comment[j].id == id) {
                        articles[i].comment.splice(j, 1);
                        resolve("exist");
                        existArc = 1;
                    }
                    if (j == articles.length && existArc == 0) {
                        reject("error");
                    }
                }
                exist = 1;
            }
            if (i == articles.length && exist == 0) {
                reject("error");
            }
        }
    })
}