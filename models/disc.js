const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const discSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  disc: {
    type: Number,
    required: true
  },
  subtitle: String,
  episodeStart: String,
  episodeEnd: String,
  movie: String,
  rating: String,
  xbox: String
});

const Disc = mongoose.model('Disc', discSchema);

module.exports = Disc;
