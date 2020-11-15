const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Create Schema

const LocationSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },

  description: {
    type: String,
    required: true,
  },

  adresse: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  capacity: {
    type: Number,
    required: true,
  },

  date: {
    type: Date,
    default: Date.now,
  },
})

module.exports = Location = mongoose.model('location', LocationSchema)
