const hangmanWords = require('./hangmanWords');
const express = require('express');

const app = express();

app.get('/', (req, res) => {
    let solution = hangmanWords[Math.floor(Math.random()*hangmanWords.length)];
    res.json(solution);
});

app.listen(3000, () => {
    console.log('API listening on port 3000');
});
