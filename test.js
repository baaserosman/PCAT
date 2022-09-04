const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//* Connect DB
mongoose.connect('mongodb://localhost/pcat-test-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//* Create Schema
const PhotoSchema = new Schema({
  title: String,
  description: String,
});

const Photo = mongoose.model('Photo', PhotoSchema);

//* CREATE
// Photo.create({
//   title: 'Photo Title 2',
//   description: 'Photo description 2 lorem ipsum',
// });

//* READ
Photo.find({}, (err, data) => {
  console.log(data);
});

//* UPDATE
// const id = '631442a4c46191300bc57d4e';

// Photo.findByIdAndUpdate(
//   id,
//   {
//     title: 'Photo Title 1111 updated',
//     description: 'Photo description 1111 update',
//   },
//   {
//     new : true
//   },
//   (err, data) => {
//     console.log(data);
//   }
// );

//* DELETE
const id = '631442a4c46191300bc57d4e';
Photo.findByIdAndDelete(id, (err, data) => {
    console.log("Photo is deleted...");
});
