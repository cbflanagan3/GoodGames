const express = require('express');
const Sequelize = require('sequelize');
const path = require('path');
const dotenv = require('dotenv');
const cors =  require('cors');
const bodyParser = require('body-parser');
const {gameRouter, userRouter} = require('./routes');
const {seed, models: {User}} = require('./db');

const app = express();

const PORT = process.env.PORT || 3000;

dotenv.config();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../dist')));
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, "../assets")));

app.use('/api', require('./routes'));

// app.use((err, req, res, next)=> {
//     console.error(err);
//     res.status(500).send({ message: err.message });
//   });

app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"), (err) => {
      if (err) {
        res.status(500).send(err);
      }
    });
  });

const startServer = () => new Promise((res) => {
    app.listen(PORT, () => {
        console.log(`Server is now listening on PORT:${PORT}`);
    })
})



seed(false).then(startServer);

