//! 3rd party modules
const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override');
//! Modules in the core structure of Node
const ejs = require('ejs');
const path = require('path');
const fs = require('fs');
//! my own created files
const Photo = require('./models/Photo');

const app = express();

//* Connect DB
mongoose.connect('mongodb://localhost/pcat-test-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//* TEMPLATE ENGINE
app.set('view engine', 'ejs');

//* MIDDLEWARES
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(methodOverride('_method'));

//* ROUTES
app.get('/', async (req, res) => {
  // res.sendFile(path.resolve(__dirname, "temp/index.html"))
  const photos = await Photo.find({}).sort('-dateCreated');
  res.render('index', {
    photos,
  });
});
//? Photo'ya tıklandığında gönderilen id yi yakalamak için parametre olarak id veriyorum. Herhangi bir isim de veribilirdik.
//? req.params.id ile parametre olarak gönderilen id'yi yakalıyoruz. http://expressjs.com/en/5x/api.html#req.params
app.get('/photos/:id', async (req, res) => {
  // console.log(req.params.id);
  // res.render('about');
  const photo = await Photo.findById(req.params.id);
  res.render('photo', {
    photo,
  });
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/add', (req, res) => {
  res.render('add');
});

app.post('/photos', async (req, res) => {
  // console.log(req.files.image);
  // await Photo.create(req.body)
  // res.redirect("/")

  const uploadDir = 'public/uploads';

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  let uploadeImage = req.files.image;
  let uploadPath = __dirname + '/public/uploads/' + uploadeImage.name;

  uploadeImage.mv(uploadPath, async () => {
    await Photo.create({
      ...req.body,
      image: '/uploads/' + uploadeImage.name,
    });
    res.redirect('/');
  });
});

app.get('/photos/edit/:id', async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id });
  res.render('edit', {
    photo,
  });
});


app.put('/photos/:id', async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id });
  photo.title = req.body.title;
  photo.description = req.body.description;
  photo.save();

  res.redirect(`/photos/${req.params.id}`);
});



//* --------------------------------------------------------------

const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
