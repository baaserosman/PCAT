//! 3rd party modules
const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override');
//! Modules in the core structure of Node
const ejs = require('ejs');

//! my own created files
const photoController = require('./controllers/photoControllers');
const pageController = require('./controllers/pageController');

const app = express();

//* Connect DB
mongoose.connect(
  'mongodb+srv://bascher:7TiYrO7UQ30nTkpR@cluster0.7wsf8t9.mongodb.net/pcat-db?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify: false,
  }
).then(() => {
  console.log("db connected");
}).catch((err) => {
  console.log(err);
})

//* TEMPLATE ENGINE
app.set('view engine', 'ejs');

//* MIDDLEWARES
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(methodOverride('_method' , { 
  methods : [ "POST", "GET"]
}));

//* ROUTES
app.get('/', photoController.getAllPhotos);
app.get('/photos/:id', photoController.getPhoto);
app.post('/photos', photoController.createPhoto);
app.put('/photos/:id', photoController.updatePhoto);
app.delete('/photos/:id', photoController.deletePhoto);


app.get('/about', pageController.getAboutPage);
app.get('/add', pageController.getAddPage);
app.get('/photos/edit/:id', pageController.getEditPage);


//! **************************************************************
//* --------------------------------------------------------------
//! **************************************************************
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
