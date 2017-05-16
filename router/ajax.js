'use strict';
const fs = require('fs');
const path = require('path');

const html = require('./template');


module.exports = function (req, res) {
//let pipeData = getPipeData();
    if (req.query.block) {
        return getPipeData(req.query.block).then((rs) => {
            res.setHeader('content-type', 'json;charset=utf-8');
            res.end(JSON.stringify(rs));
        });
    }

    res.write(html);
    let blocks = getPipeData();
    let size = 3;
    for (let i = 0; i < size; i++) {
        res.write(`
<script>
                   fetch('?block=${i}').then(function(res){
return res.json();
}).then(function(json){
 document.getElementById('pagelet-${i}').innerHTML = json.data;
})</script>
        `);
    }

    res.end('</html>');
}



function getPipeData(index) {
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
    if(index){
        return blocks[index];
    }
    return blocks;
    
}