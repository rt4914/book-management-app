const { mongoose } = require('../config/mongodb');

const ReviewSchema = new mongoose.Schema({
  book_id: { type: Number, required: true },
  user: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String },
  created_at: { type: Date, default: Date.now },
});

const Review = mongoose.model("Review", ReviewSchema);

module.exports = Review;
