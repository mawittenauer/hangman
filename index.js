const hangmanWords = require('./hangmanWords');
const cors = require('cors');
const express = require('express');

const app = express();
app.use(cors());

app.get('/', (req, res) => {
    let solution = hangmanWords[Math.floor(Math.random()*hangmanWords.length)];
    res.json(solution);
});

app.listen(3002, () => {
    console.log('API listening on port 5000');
});
