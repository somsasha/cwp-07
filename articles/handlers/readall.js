const fs = require('fs');
let articles = require("../articles.json");
let logs = require("../../logs.json");
module.exports = readall;

const sortFieldDefault = "date";
const sortOrderDefault = "desc";
const pageDefault = 1;
const limitDefault = 10;
const includeDepsDefault = true;

function readall(req, res, payload, cb) {
    let d = new Date();
    let sortField;
    let sortOrder;
    let limit;
    let page;
    let Deps;

    if (payload.sortField === undefined) {
        sortField = sortFieldDefault;
    }
    else {
        sortField = payload.sortField;
    }
    if (payload.sortOrder === undefined) {
        sortOrder = sortOrderDefault;
    }
    else {
        sortOrder = payload.sortOrder;
    }
    if (payload.page === undefined) {
        page = pageDefault;
    }
    else {
        page = payload.page;
    }
    if (payload.limit === undefined) {
        limit = limitDefault;
    }
    else {
        limit = payload.limit;
    }
    if (payload.includeDeps === undefined) {
        Deps = includeDepsDefault;
    }
    else {
        Deps = payload.includeDeps;
    }
    let a = 1;
    if ((articles.length / limit ^ 0) === articles.length / limit)
        a = 0;
    let pages = Math.floor(articles.length / limit) + a;
    if (page > pages || page < 1) {
        cb(null, "error");
        logs.push({date : d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate() + "-" + d.getHours() + ":" + d.getMinutes(), msg : "error"});
        fs.writeFile("../../logs.json", JSON.stringify(logs), "utf8", function () { });    
        return;
    }

    if (limit >= articles.length) {
        resultArticles(0, articles.length, function (res) {
            for (let i = 0; i < res.length; i++) {
                if (!Deps) {
                    res[i].comment = undefined;
                }
            }
            res.sort((a, b) => {
                if (a[sortField] > b[sortField]) {
                    return sortOrder === "asc" ? 1 : -1;
                }
                else {
                    return sortOrder === "asc" ? -1 : 1;
                }
            });

            let result = {
                "meta": {
                    "page: ": page,
                    "pages: ": pages,
                    "count: ": articles.length,
                    "limit: ": limit
                },
                "items": res
            }
            cb(null, result);
            logs.push({date : d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate() + "-" + d.getHours() + ":" + d.getMinutes(), msg : "readed"});
            fs.writeFile("../../logs.json", JSON.stringify(logs), "utf8", function () { });    
        }
    );
    }
    else {
        let whereStart = (limit * page) - limit;
        let whereEnd = articles.length;
        if (page !== pages) {
            whereEnd = page * limit;
        }
        resultArticles(whereStart, whereEnd, function (res) {
                for (let i = 0; i < res.length; i++) {
                    if (!Deps) {
                        res[i].comment = undefined;
                    }
                }
                res.sort((a, b) => {
                    if (a[sortField] > b[sortField]) {
                        return sortOrder === "asc" ? 1 : -1;
                    }
                    else {
                        return sortOrder === "asc" ? -1 : 1;
                    }
                });

                let result = {
                    "meta": {
                        "page: ": page,
                        "pages: ": pages,
                        "count: ": articles.length,
                        "limit: ": limit
                    },
                    "items": res
                }
                cb(null, result);
                logs.push({date : d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate() + "-" + d.getHours() + ":" + d.getMinutes(), msg : "readed"});
                fs.writeFile("../../logs.json", JSON.stringify(logs), "utf8", function () { });        
            }
        );
    }
}

function resultArticles(whereStart, whereEnd, callback) {
    let result = [];
    for (i = whereStart; i < whereEnd; i++) {
        result.push(articles[i]);
        if (i + 1 == whereEnd) {
            callback(result);
        }
    }
}