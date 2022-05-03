const router = require("express").Router();
const { Review } = require("../../models");
const withAuth = require("../../utils/auth");

// Add a review to a product (POST /api/reviews/:id)
router.post("/", withAuth, async (req, res) => {
  try {
    const newReview = await Review.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newReview);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Delete a review (DELETE /api/reviews/:reviewId)
router.delete("/:reviewId", withAuth, async (req, res) => {
  try {
    const reviewData = await Review.destroy({
      where: {
        id: req.params.reviewId,
        user_id: req.session.user_id,
      },
    });

    if (!reviewData) {
      res.status(404).json({ message: "No review found with this id!" });
      return;
    }

    res.status(200).json(reviewData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// edit review (PUT /api/reviews/:reviewId)
router.put("/:reviewId", withAuth, async (req, res) => {
  try {
    const reviewData = await Review.update({
      where: {
        id: req.params.reviewId,
        user_id: req.session.user_id,
      },
    });

    if (!reviewData) {
      res.status(404).json({ message: "No review found with this id!" });
      return;
    }

    res.status(200).json(reviewData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
