const http = require('http');
const fs = require('fs');

const articles = require('./articles/handlers/articles_handler');
const comments = require('./comments/handlers/comments_handler');
const logs_handler = require('./logs_handler');
const public = require('./public/handlers/public_handlers')
const json_tryparse = require('./helpers/jsonparse_helper');
let logs = require("./logs.json");

const hostname = '127.0.0.1';
const port = 3000;

const handlers = {
  '/sum': sum,
  '/api/articles/readall': articles.readall,
  '/api/articles/read': articles.read,
  '/api/articles/update': articles.update,
  '/api/articles/create': articles.create,
  '/api/articles/delete': articles.delet,
  '/api/comments/create': comments.create,
  '/api/comments/delete': comments.delet,
  '/api/logs':logs_handler,
  '/': public.index_html,
  '/index.html': public.index_html,
  '/form.html': public.form_html,
  '/index.js': public.index_js,
  '/form.js': public.form_js,
  '/site.css': public.site_css
};

const server = http.createServer((req, res) => {
  parseBodyJson(req, (err, payload) => {
    const handler = getHandler(req.url);

    handler(req, res, payload, (err, result, typecontent) => {
      if (err) {
        res.statusCode = err.code;
        res.setHeader('Content-Type', 'application/json');
        res.end( JSON.stringify(err) );
        return;
      }

      res.statusCode = 200;

      res.setHeader('Access-Control-Allow-Origin', '*');
            if (typecontent == undefined)
            {
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(result));
               }
            else {
                res.setHeader('Content-Type', typecontent);
                res.end(result);
              }
    });
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

function getHandler(url) {
  return handlers[url] || notFound;
}

function sum(req, res, payload, cb) {
  const result = { c: payload.a + payload.b };

  cb(null, result);
}

function notFound(req, res, payload, cb) {
  cb({ code: 404, message: 'Not found'});
  let d = new Date();
  logs.push({date : d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate() + "-" + d.getHours() + ":" + d.getMinutes(), code: 404, message: 'Not found'});
  fs.writeFile("./logs.json", JSON.stringify(logs), "utf8", function () { });
}

function parseBodyJson(req, cb) {
  let body = [];

  req.on('data', function(chunk) {
    body.push(chunk);
  }).on('end', function() {
    body = Buffer.concat(body).toString();
    let d = new Date();
    logs.push({date : d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate() + "-" + d.getHours() + ":" + d.getMinutes(), req : json_tryparse(body)});
    fs.writeFile("./logs.json", JSON.stringify(logs), "utf8", function () { });
    try {
      params = JSON.parse(body);
   }
    catch(err) {
      params = {};
    }
    cb(null, params);
  });
}