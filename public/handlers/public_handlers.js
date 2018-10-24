const h_index_html = require('./index_html');
const h_form_html = require('./form_html');
const h_index_js = require('./index_js');
const h_form_js = require('./form_js');
const h_site_css = require('./site_css');


module.exports = {
    index_html,
    form_html,
    index_js,
    form_js,
    site_css
};

function index_html(req, res, payload, cb) {
    h_index_html(req, res, payload, cb);
}

function form_html(req, res, payload, cb) {
    h_form_html(req, res, payload, cb);
}

function index_js(req, res, payload, cb) {
    h_index_js(req, res, payload, cb);
}

function form_js(req, res, payload, cb) {
    h_form_js(req, res, payload, cb);
}

function site_css(req, res, payload, cb) {
    h_site_css(req, res, payload, cb);
}