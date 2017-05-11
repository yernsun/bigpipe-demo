'use strict';
const http = require('http');
const url = require('url');
const path = require('path');
let server = http.createServer(function (req, res) {
    Object.assign(req, url.parse(req.url, true));
    req.path = req.pathname;



    // 路由
    try {
        require(path.join(__dirname, 'router', getRouter(req.path)))(req, res);
    }
    catch (e) {
        res.writeHead(404, {
            'Content-Type': 'text/plain'
        });
        res.end('Error 404');
    }

    res.flush = (blocks) => {

    };


    //    res.writeHead(200, {
    //        'Content-type': 'text/html'
    //    });




    //    let blocks = makeBlocks();
    //
    //    for (let i = 0; i < 10; i++) {
    //        setTimeout(() => {
    //            res.write(blocks[i]);
    //        }, 500 * i);
    //    }
    //    setTimeout(function () {
    //        res.end('-');
    //    }, 5000);



});

server.listen(process.env.PORT || 8000, '127.0.0.1', function () {
    console.log('mock 服务器为：http://127.0.0.1:' + server.address().port);
});


function getRouter(pathname) {
    if (pathname === '/') {
        return 'home';
    }
    else{
        return  pathname.replace(/^\/?(\w+).*$/i, '$1');
    }
}

function makeBlocks() {
    let blocks = [];
    for (let i = 0; i < 10; i++) {
        blocks.push(`<div>Block: ${i}</div>`);
    }
    return blocks;
}

function getPagelet(id) {
    let ts = Math.random() * 100;
    // 定时器，模拟异步数据
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // 模拟接口异常
            ts > 97 ? resolve({

            }) : reject({
                errorNo: 504,
                errorMsg: 'Time out'
            });
        }, ts);

    });
}
