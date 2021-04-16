const express = require('express');
const mongoose = require('mongoose');
const Cors = require('cors');

const Cards = require('./dbCards.js');

//App Config
const app = express();
const port = process.env.PORT || 8001;
const connection_url = 'mongodb+srv://admin:A_!d8ddVJuGfazX@cluster0.0zmea.mongodb.net/tinderdb?retryWrites=true&w=majority'

//Middlewares
app.use(express.json());
app.use(Cors());

//DB Config
mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

//  A_!d8ddVJuGfazX- DB Password

//API Endpoints
app.get('/', (req, res) => res.status(200).send('Hello'));

app.post('/tinder/cards', (req, res) => {
    const dbCard = req.body;

    Cards.create(dbCard, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send(data);
        }
    });
});

app.get('/tinder/cards', (req, res) => {
    Cards.find((err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    });
});

//Listener
app.listen(port, () => console.log(`Listening on port: ${port}`));