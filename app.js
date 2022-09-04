//! 3rd party modules
const express = require('express');
const mongoose = require('mongoose');
//! Modules in the core structure of Node
const ejs = require('ejs');
const path = require('path');
//! my own created files
const Photo = require('./models/Photo')

const app = express();

//* Connect DB
mongoose.connect('mongodb://localhost/pcat-test-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//* TEMPLATE ENGINE 
app.set("view engine", "ejs");

//* MIDDLEWARES
app.use(express.static('public'));
app.use(express.urlencoded({extended : true}));
app.use(express.json());

//* ROUTES
app.get('/', async (req, res) => {
    // res.sendFile(path.resolve(__dirname, "temp/index.html"))
    const photos = await Photo.find({})
    res.render("index", {
      photos
    })
})
             //? Photo'ya tıklandığında gönderilen id yi yakalamak için parametre olarak id veriyorum. Herhangi bir isim de veribilirdik.
             //? req.params.id ile parametre olarak gönderilen id'yi yakalıyoruz. http://expressjs.com/en/5x/api.html#req.params
app.get('/photos/:id', async (req, res) => {
  // console.log(req.params.id);
  // res.render('about');
  const photo = await Photo.findById(req.params.id)
  res.render("photo", {
    photo
  })
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/add', (req, res) => {
  res.render('add');
});

app.post('/photos', async (req, res) => {
  await Photo.create(req.body)
  res.redirect("/")
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
