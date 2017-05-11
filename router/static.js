const fs = require('fs');
const path = require('path');

module.exports = function (req, res) {
    let file = path.join(path.dirname(__dirname), req.pathname);


    if (req.pathname.substr(-1) === '/') {
        file = path.join(file, 'index.html');
    }

    fs.readFile(file, 'binary', function (err, data) {
        if (err) {
            throw 'Not found';
        }
        else {
            res.setHeader('Content-Type', getContentType(file));
            res.setHeader('Content-Length', data.length);
            res.write(data, 'binary');
            res.end();
        }
    });
};

function getContentType(name) {
    return {
        'css': 'text/css',
        'html': 'text/html',
        'js': 'application/javascript',
        'json': 'application/json'
    }[path.extname(name).substr(1)] || 'text/plain';
}
