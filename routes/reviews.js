const express = require("express");
const Review = require("../models/Review");

const router = express.Router();

// Route to fetch all reviews
router.get("/reviews", async (req, res) => {
  try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Route to submit a new review
router.post("/reviews", async (req, res) => {
  const {
    name,
    email,
    rating,
    page,
    title,
    experience,
    age,
    concern,
    recommend,
  } = req.body;

  // Create a new review
  const newReview = new Review({
    name,
    email,
    rating,
    page,
    title,
    experience,
    age,
    concern,
    recommend,
  });

  try {
    // Save the review to the database
    const savedReview = await newReview.save();
    res.status(201).json(savedReview);
  } catch (error) {
    console.error("Error submitting review:", error);
    res.status(500).json({ message: "Error submitting review" });
  }
});
// Like a review
router.post("/reviews/:id/like", async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: "Review not found" });

    review.likes += 1;
    await review.save();
    res.json(review);
  } catch (error) {
    console.error("Error liking review:", error);
    res.status(500).json({ message: "Error updating like" });
  }
});

// Unlike a review
router.post("/reviews/:id/unlike", async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: "Review not found" });

    review.unlikes += 1;
    await review.save();
    res.json(review);
  } catch (error) {
    console.error("Error disliking review:", error);
    res.status(500).json({ message: "Error updating dislike" });
  }
});

module.exports = router;
