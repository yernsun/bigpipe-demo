const fs = require('fs');
const path = require('path');

module.exports = function (req, res) {
    res.end(`
    <a href="/ajax">ajax</a>
    <a href="/bigpipe">BigPipe</a>
    `);
};
