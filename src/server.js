const express = require('express')
const fs = require('fs')
const cors = require("cors")


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    return res.send('Received a GET HTTP method');
});

app.post('/players', cors(), (req, res) => {
    let players

    try {
        const data = fs.readFileSync('226.json', 'utf8')
        console.log(data)
        players = JSON.parse(data)
    } catch (err) {
        console.error(err)
    }

    let nome = "ninguém"
    let kills = "0"

    players.forEach(element => {
        if (req.body.number == element.Colocacao) {
            nome = element.Jogador
            kills = element.queimadas
        }
    });

    return res.send(`O grande ${nome} que queimou ${kills} otários`);
});

app.listen(4000, () =>
    console.log(`Example app listening on port 4000`),
);