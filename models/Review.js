const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  rating: { type: Number, required: true },
  title: { type: String, required: true },
  experience: { type: String, required: true },
  age: { type: String, required: true },
  concern: { type: String, required: true },
  recommend: { type: String, required: true },
  likes: { type: Number, default: 0 },
  unlikes: { type: Number, default: 0 },
  created: { type: Date, default: Date.now },
});

const Review = mongoose.model("Review2", reviewSchema);
module.exports = Review;
