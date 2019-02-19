
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();
const beers = require('./beers.json');

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));



app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/beers', (req, res, next) => {
  punkAPI.getBeers()
  .then(beers => {
    console.log(beers[0])
    res.render('beers', {beers})
  })
  .catch(err => {
    console.log(err)
  //  res.render('page500')
  })
});

/*
app.get('/beers', (req, res, next) => {
  res.render('beers', {beers})
});
*/
hbs.registerPartials(__dirname + '/views/partials');
/*
app.get('/randomBeer', (req,res) => {
  punkAPI.getRandom()
  .then(beers => {
    res.render('randomBeer', {
      beer: beers[0]
    })
  })
})

*/
app.listen(3000, ()=> {
  console.log("listening");
});
