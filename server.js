'use strict';
const http = require('http');
const url = require('url');
const path = require('path');
let server = http.createServer(function (req, res) {
    Object.assign(req, url.parse(req.url, true));
    req.path = req.pathname;

    let timer = ~~req.query.timer;

    setTimeout(() => {
        // 路由
        try {

            require(path.join(__dirname, 'router', getRouter(req.path)))(req, res);
        }
        catch (e) {
            res.writeHead(404, {
                'Content-Type': 'text/plain'
            });
            res.end('Error 404');
            console.log(e);
        }

        res.flush = (blocks) => {

        };
    }, timer);
});

server.listen(process.env.PORT || 8000, '127.0.0.1', function () {
    console.log('mock 服务器为：http://127.0.0.1:' + server.address().port);
});


function getRouter(pathname) {
    if (pathname === '/') {
        return 'home';
    }
    else {
        return pathname.replace(/^\/?(\w+).*$/i, '$1');
    }
}
