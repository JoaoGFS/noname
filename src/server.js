const express = require('express')
const fs = require('fs')
const cors = require("cors")

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

function myCors(req, res, nxt) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.header('Access-Control-Allow-Headers',
        'Access-Control-Allow-Origin, Content-Type, Accept, Accept-Language, Origin, User-Agent');
    if (req.method === 'OPTIONS') {
        res.sendStatus(204);
    }
    else {
        nxt();
    }
}

app.use(myCors)

app.get('/', (req, res) => {
    return res.send("GET");
});

app.post('/table', (req, res) => {
    let players

    try {
        const data = fs.readFileSync('226.json', 'utf8')
        console.log(data)
        players = JSON.parse(data)
    } catch (err) {
        console.error(err)
    }

    return res.send(players);
});

app.listen(4000, () =>
    console.log(`Example app listening on port 4000`),
);