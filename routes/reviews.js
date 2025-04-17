const express = require("express");
const Review = require("../models/Review");

const router = express.Router();

// Get all reviews
router.get("/reviews", async (req, res) => {
  try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Post a review
router.post("/reviews", async (req, res) => {
  const { name, email, rating, title, experience, age, concern, recommend } =
    req.body;

  const newReview = new Review({
    name,
    email,
    rating,
    title,
    experience,
    age,
    concern,
    recommend,
  });

  try {
    const savedReview = await newReview.save();
    res.status(201).json(savedReview);
  } catch (error) {
    console.error("Error submitting review:", error);
    res.status(500).json({ message: "Error submitting review" });
  }
});

// Toggle Like
router.post("/reviews/:id/like", async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: "Review not found" });

    const { currentAction } = req.body;

    if (currentAction === "like") {
      // If user already liked, undo like
      review.likes = Math.max(review.likes - 1, 0);
    } else {
      // User switching from unlike to like
      if (currentAction === "unlike") {
        review.unlikes = Math.max(review.unlikes - 1, 0);
      }
      review.likes += 1;
    }

    await review.save();
    res.json(review);
  } catch (error) {
    console.error("Error updating like:", error);
    res.status(500).json({ message: "Error updating like" });
  }
});

// Toggle Unlike
router.post("/reviews/:id/unlike", async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: "Review not found" });

    const { currentAction } = req.body;

    if (currentAction === "unlike") {
      // If user already unliked, undo unlike
      review.unlikes = Math.max(review.unlikes - 1, 0);
    } else {
      // User switching from like to unlike
      if (currentAction === "like") {
        review.likes = Math.max(review.likes - 1, 0);
      }
      review.unlikes += 1;
    }

    await review.save();
    res.json(review);
  } catch (error) {
    console.error("Error updating dislike:", error);
    res.status(500).json({ message: "Error updating dislike" });
  }
});

module.exports = router;
