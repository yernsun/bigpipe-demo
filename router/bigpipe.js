'use strict';
const fs = require('fs');
const path = require('path');

const html = require('./template');


module.exports = function (req, res) {
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

}

function getPipeData() {
    let blocks = [];
    let size = 3;
    let responseTimer = [1.5,1,2.5].sort(() => {
//        return Math.random(+new Date) > 0.5
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
            }, responseTimer[i] * 100);
        }));
    }
    return blocks;
}