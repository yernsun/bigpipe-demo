'use strict';
const fs = require('fs');
const path = require('path');

const html = require('./template');


module.exports = function (req, res) {
    let path = req.path.replace(/\/*flush\/?/i, '');
    let startTimer = +new Date;
    res.setHeader('content-type', 'text/html;charset=utf-8');

    res.getResponseText = (rs) => {
        let className = rs.firstScreen ? 'color:red' : '';
        return '<div style="' + className + '">' + rs.data + '响应时间' + (new Date - startTimer) + '</div>';
    }

    // 执行对应的接口
    (map[path] || map['index'])(req, res);
};


const map = {
    bigpipe(req, res) {
            res.write(html);
            let blocks = getPipeData();
            for (let k in blocks) {
                blocks[k].then((rs) => {
                    res.write(`
                    <script>insertPagelet({id:'pagelet-${k}' ,'html':'${rs.data}'})</script>
                    `);
                });
            }
            Promise.all(blocks).then(() => {
                res.end('</html>');
            });
        },
        order(req, res) {
            let blocks = getBlocks();
            let pipes = [];
            for (let k in blocks) {
                blocks[k].then((rs) => {
                    pipes[k] = rs;
                });
            }
            Promise.all(blocks).then(() => {
                let text = '';
                pipes.forEach((pipe) => {
                    text += res.getResponseText(pipe);
                });
                res.end(text);
            });


        },

        // 随机
        random(req, res) {
            let blocks = getBlocks();

            for (let k in blocks) {
                blocks[k].then((rs) => {
                    res.write(res.getResponseText(rs));
                }).catch((rs) => {
                    console.warn(rs);
                });
            }
            Promise.all(blocks).then(() => {
                res.end();
            });
        }
};



function getPipeData() {
    let blocks = [];
    let size = 3;
    let responseTimer = [2, 5, 7].sort(() => {
        return Math.random(+new Date) > 0.5
    });
    for (let i = 0; i < size; i++) {
        blocks.push(new Promise((resolve, reject) => {
            let timer = Math.max(Math.random(+new Date) * 1000 % 1000, 200);
            setTimeout(function () {
                resolve({
                    errorNo: 0,
                    errorMsg: 'success',
                    data: '数据块' + i
                });
                // 模拟后端接口任意时间返回
            }, responseTimer[i]*100);
        }));
    }
    return blocks;
}

function getBlocks() {
    let blocks = [];
    let size = 15;
    for (let i = 0; i < size; i++) {
        let firstScreen = false;
        blocks.push(new Promise((resolve, reject) => {
            let timer = Math.max(Math.random(+new Date) * 1000 % 1000, 200);

            if (i < 5 || i > size - 5) {
                timer = i * 10;
                firstScreen = true;
            }
            setTimeout(function () {
                resolve({
                    errorNo: 0,
                    errorMsg: 'success',
                    data: 'Block ' + i,
                    firstScreen: firstScreen
                });
                // 模拟后端接口任意时间返回
            }, timer);
        }));
    }
    return blocks;
}