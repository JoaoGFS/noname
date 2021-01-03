const express = require('express')
const fs = require('fs')


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    return res.send('Received a GET HTTP method');
});

app.post('/', (req, res) => {
    let players

    try {
        const data = fs.readFileSync('226.json', 'utf8')
        console.log(data)
        players = JSON.parse(data)
    } catch (err) {
        console.error(err)
    }

    let sopm = "ninguém"

    players.forEach(element => {
        if (req.body.number == element.Colocacao) {
            sopm = element.Jogador
        }
    });

    return res.send(`O grande ${sopm}`);
});

app.put('/', (req, res) => {
    return res.send('Received a PUT HTTP method');
});

app.delete('/', (req, res) => {
    return res.send('Received a DELETE HTTP method');
});

app.listen(4000, () =>
    console.log(`Example app listening on port 4000`),
);