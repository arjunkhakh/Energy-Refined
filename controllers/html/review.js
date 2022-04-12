const router = require('express').Router()
const { Review, User, Product } = require('../../models');
const withAuth = require('../../utils/auth');
const { route } = require('./homepage');

router.post('/review', withAuth, async (req, res) => {
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

router.delete('/review/:id', withAuth, async (req, res) => {
    try {
      const reviewData = await Review.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
          product_id: req.params.product_id,
        },
      });
  
      if (!reviewData) {
        res.status(404).json({ message: 'No review found with this id!' });
        return;
      }
  
      res.status(200).json(reviewData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

// edit review



module.exports = router;