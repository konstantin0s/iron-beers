const express = require('express');
const hbs = require('hbs');
const app = express();
const path = require('path');
const axios = require('axios');
require('dotenv');

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/beers', (req, res, next) => {
  axios.get('https://api.punkapi.com/v2/beers')
    .then((response) => {
      let beersArray = [];
      response.data.map((beers) => {
        beersArray.push(beers);
      })
      res.render('beers', { beers: beersArray })
    })
    .catch((err) => {
      console.log(err);
    });

});

hbs.registerPartials(__dirname + '/views/partials');

app.get('/randomBeer', (req, res, next) => {
  axios.get('https://api.punkapi.com/v2/beers')
    .then((response) => {
      let beersArray = [];
      response.data.map((beer) => {
        beersArray.push(beer);
      })
      var randomIndex = Math.floor((Math.random() * 20) + 1);
      res.render('randomBeer', { beer: beersArray[randomIndex] });
    })
    .catch((err) => {
      console.log(err);
    });
});


const port = process.env.port || 5000;
app.listen(5000, () => {
  console.log(`Server started on port ${port}`);
});